#!/usr/bin/env node

// palette/ npm package: generated files match the palette and only whitelisted files are packed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.join(__dirname, '..');
const PKG = path.join(ROOT, 'palette');
const DIST = path.join(PKG, 'dist');
const read = file => fs.readFileSync(path.join(DIST, file), 'utf8');
const docs = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'palettes.json'), 'utf8'));
const ids = Object.keys(docs);
assert.equal(ids.length, 6, 'expected six variants');

for (const f of ['palettes.json', 'index.js', 'index.mjs', 'index.d.ts', 'tailwind.js', 'css/all.css',
  ...ids.flatMap(id => [`css/${id}.css`, `shiki/${id}.json`])]) {
  assert.ok(fs.existsSync(path.join(DIST, f)), `palette/dist/${f} missing`);
}

assert.deepEqual(JSON.parse(read('palettes.json')), docs, 'palette/dist/palettes.json differs from docs/palettes.json');

// Every --stranger-* value is a colour of that variant; spot-check names against slots.
function checkVars(css, v, where) {
  const vars = Object.fromEntries([...css.matchAll(/--stranger-([\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]));
  const all = [...Object.values(v.base), ...Object.values(v.derived), ...Object.values(v.ansi)];
  assert.equal(Object.keys(vars).length, Object.keys(v.base).length + Object.keys(v.derived).length + 16, `${where}: variable count`);
  for (const [name, value] of Object.entries(vars)) assert.ok(all.includes(value), `${where}: --stranger-${name} ${value} is not a palette hex`);
  for (const [slot, hex] of Object.entries(v.base)) assert.equal(vars[slot.toLowerCase()], hex, `${where}: --stranger-${slot.toLowerCase()}`);
  assert.equal(vars['line-highlight'], v.derived.LineHighlight, `${where}: --stranger-line-highlight`);
  assert.equal(vars['bg-lighter'], v.derived.BGLighter, `${where}: --stranger-bg-lighter`);
  Object.values(v.ansi).forEach((hex, i) => assert.equal(vars[`ansi-${i}`], hex, `${where}: --stranger-ansi-${i}`));
  return vars;
}
const allCss = read('css/all.css');
for (const id of ids) {
  const own = checkVars(read(`css/${id}.css`), docs[id], `css/${id}.css`);
  const block = allCss.match(new RegExp(`\\[data-stranger-theme="${id}"\\] \\{([^}]*)\\}`));
  assert.ok(block, `css/all.css: no block for ${id}`);
  assert.deepEqual(checkVars(block[1], docs[id], `css/all.css ${id}`), own, `css/all.css ${id} differs from css/${id}.css`);
  assert.deepEqual(JSON.parse(read(`shiki/${id}.json`)),
    JSON.parse(fs.readFileSync(path.join(ROOT, 'visual-studio-code', 'themes', `${id}-color-theme.json`), 'utf8')), `shiki/${id}.json differs from the VS Code theme`);
}

const tailwind = require(path.join(DIST, 'tailwind.js'));
assert.deepEqual(Object.keys(tailwind.colors.stranger), ids, 'tailwind.js variants');
for (const id of ids) assert.equal(tailwind.colors.stranger[id].pink, docs[id].base.PINK, `tailwind.js ${id}.pink`);

const dts = read('index.d.ts');
for (const id of ids) assert.ok(dts.includes(`'${id}'`), `index.d.ts does not mention ${id}`);

const pkg = JSON.parse(fs.readFileSync(path.join(PKG, 'package.json'), 'utf8'));
assert.equal(pkg.version, require('../package.json').version, 'palette/package.json version must equal the root version');

const allowed = new Set(['package.json', ...pkg.files]);
const [packed] = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json'], { cwd: PKG, encoding: 'utf8' }));
for (const { path: file } of packed.files) {
  assert.ok(allowed.has(file) || allowed.has(file.split('/')[0]), `npm pack would include ${file}`);
}
assert.ok(packed.files.some(f => f.path === 'dist/index.d.ts'), 'npm pack is missing dist/');

(async () => {
  const cjs = require(path.join(DIST, 'index.js'));
  const esm = await import(pathToFileURL(path.join(DIST, 'index.mjs')).href);
  assert.deepEqual(cjs.palettes, docs, 'index.js palettes');
  assert.deepEqual(cjs.variants, ids, 'index.js variants');
  assert.equal(esm.palettes, cjs.palettes, 'index.mjs and index.js disagree');
  assert.deepEqual(esm.variants, cjs.variants, 'index.mjs and index.js disagree on variants');
  console.log(`Palette package OK: ${packed.files.length} files packed for ${ids.length} variants.`);
})().catch(err => { console.error(err); process.exit(1); });
