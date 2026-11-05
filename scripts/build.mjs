// Bundles src/app.js (+ Firebase SDK) into web/app.js and writes web/sw.js with a fresh cache version.
import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// For local emulator tests: CONFIG_FILE=/path/to/test-config.js npm run build
const configFile = process.env.CONFIG_FILE;
const plugins = configFile ? [{ name: 'config', setup(b) { b.onResolve({ filter: /firebase-config\.js$/ }, () => ({ path: configFile })); } }] : [];

await build({
  entryPoints: ['src/app.js'], bundle: true, format: 'esm', target: ['es2020'], plugins,
  minify: true, sourcemap: true, outfile: 'web/app.js', logLevel: 'info',
});
const hash = createHash('sha256')
  .update(await readFile('web/app.js')).update(await readFile('web/index.html'))
  .digest('hex').slice(0, 12);
const sw = (await readFile('src/sw.js', 'utf8')).replace('__BUILD__', hash);
await writeFile('web/sw.js', sw);
console.log('build', hash);
