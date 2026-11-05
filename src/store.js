/* Firebase connection: login, offline cache, live sync.
 * Exposes a tiny store with the same shape the app already uses:
 *   store.collection(name).doc(id).set(body) / .delete()
 *   store.collection(name).onSnapshot(next, error)
 */
import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
  connectAuthEmulator, browserLocalPersistence, setPersistence,
} from 'firebase/auth';
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager, connectFirestoreEmulator,
  collection, doc, setDoc, deleteDoc, onSnapshot,
} from 'firebase/firestore';
import config from './firebase-config.js';

export const configured = !!(config.apiKey && config.projectId);

let auth = null, fs = null;
const writeErrorHandlers = [];
export const onWriteError = fn => writeErrorHandlers.push(fn);

if (configured) {
  const app = initializeApp(config);
  auth = getAuth(app);
  fs = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
  // Local testing against the Firebase emulators: open the app with ?emulator
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('emulator')) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(fs, '127.0.0.1', 8080);
  }
  setPersistence(auth, browserLocalPersistence).catch(() => {});
}

export const watchAuth = cb => configured ? onAuthStateChanged(auth, cb) : cb(null);
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const resetPassword = email => sendPasswordResetEmail(auth, email);
export const currentEmail = () => auth?.currentUser?.email || '';

/* Writes resolve at once: Firestore applies them to the local cache immediately
 * (so the UI and other tabs update offline) and sends them when the network is back. */
const fire = p => { p.catch(e => writeErrorHandlers.forEach(fn => fn(e && e.code))); return Promise.resolve(); };

export const store = {
  collection(name) {
    return {
      doc: id => ({
        set: body => fire(setDoc(doc(fs, name, id), body)),
        delete: () => fire(deleteDoc(doc(fs, name, id))),
      }),
      onSnapshot: (next, error) => onSnapshot(collection(fs, name), { includeMetadataChanges: true },
        snap => next({
          docs: snap.docs.map(d => ({ id: d.id, exists: true, data: () => d.data() })),
          metadata: { fromCache: snap.metadata.fromCache, hasPendingWrites: snap.metadata.hasPendingWrites },
        }),
        e => error && error({ code: e.code, message: e.message })),
    };
  },
};
