/* Offline cache for the app shell. Firestore keeps its own offline copy of the data. */
const VERSION = '__BUILD__';
const CACHE = 'cm-' + VERSION;
const SHELL = ['./', 'index.html', 'app.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('cm-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !FONT_HOSTS.includes(url.hostname)) return;     // Firebase / Google APIs go straight to the network
  if (sameOrigin && url.pathname.startsWith('/__/')) return;          // Firebase Hosting reserved URLs

  // App files (page, script, manifest): network first so a new version shows on the first open;
  // the cached copy is used when offline or when the network takes more than 4 seconds.
  const isApp = sameOrigin && (req.mode === 'navigate' || /\/(index\.html|app\.js|manifest\.webmanifest)?$/.test(url.pathname));
  if (isApp) {
    const key = req.mode === 'navigate' ? 'index.html' : url.pathname.replace(/^\//, '');
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      const net = fetch(url.href, { cache: 'no-cache', credentials: 'same-origin' }).then(res => { if (res.ok) c.put(key, res.clone()); return res; });
      net.catch(() => {});
      const timeout = new Promise(r => setTimeout(r, 4000));
      try {
        const res = await Promise.race([net, timeout]);
        if (res) return res;
      } catch {}
      return (await c.match(key, { ignoreSearch: true })) || net;
    })());
    return;
  }
  // Icons and fonts: cached copy at once, refreshed in the background.
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: sameOrigin });
    const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
