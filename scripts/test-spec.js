#!/usr/bin/env node

// docs/SPEC.md and docs/palettes.json must match shared/palettes.js.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { THEME_PALETTES } = require('../shared/palettes');
const { allData, renderSpec } = require('./build-spec');

const docs = path.join(__dirname, '..', 'docs');
const data = allData();
const spec = fs.readFileSync(path.join(docs, 'SPEC.md'), 'utf8');

assert.deepEqual(JSON.parse(fs.readFileSync(path.join(docs, 'palettes.json'), 'utf8')), data, 'docs/palettes.json is out of sync');
assert.equal(spec, renderSpec(data), 'docs/SPEC.md is out of sync; run npm run build');
assert.equal(Object.keys(THEME_PALETTES).length, 6, 'expected six variants');

for (const [id, { displayName, base }] of Object.entries(THEME_PALETTES)) {
  const start = spec.indexOf(`\n## ${displayName}\n`);
  assert.notEqual(start, -1, `missing section for ${displayName}`);
  const end = spec.indexOf('\n## ', start + 1);
  const section = spec.slice(start, end === -1 ? undefined : end);
  const v = data[id];
  assert.deepEqual(v.base, base, `${displayName}: base mismatch`);
  for (const hex of [...Object.values(v.base), ...Object.values(v.derived), ...Object.values(v.ansi)]) {
    assert.ok(section.includes(hex), `${displayName}: ${hex} missing from SPEC.md`);
  }
}
console.log('Spec OK: SPEC.md and palettes.json match shared/palettes.js.');
