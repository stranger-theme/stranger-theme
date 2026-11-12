#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { THEME_PALETTES } = require('../shared/palettes.js');

const DIR = path.join(__dirname, '..', 'visual-studio-code');
const readJson = file => JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));

const rules = theme => [...theme.tokenColors.map(r => r.settings), ...Object.values(theme.semanticTokenColors || {})];
const hasItalic = o => Boolean(o) && typeof o.fontStyle === 'string' && /\bitalic\b/.test(o.fontStyle);

// Independent reference: the base theme with italic removed and the name changed.
function expectedNoItalics(base) {
  const copy = JSON.parse(JSON.stringify(base));
  copy.name = `${base.name} (No Italics)`;
  for (const o of rules(copy)) {
    if (o && typeof o.fontStyle === 'string') {
      o.fontStyle = o.fontStyle.split(/\s+/).filter(s => s && s !== 'italic').join(' ');
    }
  }
  return copy;
}

const themeFiles = fs.readdirSync(path.join(DIR, 'themes')).filter(f => f.endsWith('.json'));
assert.equal(themeFiles.length, 12, 'expected twelve theme files');

for (const id of Object.keys(THEME_PALETTES)) {
  const base = readJson(`themes/${id}-color-theme.json`);
  const plain = readJson(`themes/${id}-no-italics-color-theme.json`);

  assert.ok(rules(base).some(hasItalic), `${id}: base theme has no italics to remove`);
  assert.ok(!rules(plain).some(hasItalic), `${id}: italic left in the No Italics theme`);
  assert.deepEqual(plain, expectedNoItalics(base), `${id}: No Italics theme differs from base beyond italic and name`);
}

const listed = readJson('package.json').contributes.themes;
assert.equal(listed.length, 12, 'package.json must list twelve themes');
assert.equal(new Set(listed.map(t => t.path)).size, 12, 'theme paths must be unique');
for (const t of listed) assert.ok(fs.existsSync(path.join(DIR, t.path)), `missing ${t.path}`);

console.log('Validated twelve VS Code themes, including the six No Italics variants.');
