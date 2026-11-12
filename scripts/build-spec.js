#!/usr/bin/env node

// Writes docs/SPEC.md and docs/palettes.json from shared/palettes.js.
// Only prose and rules are written by hand; every colour value is computed.
const fs = require('node:fs');
const path = require('node:path');
const { THEME_PALETTES, adjustColor, getDerivedColors, hexToRgb } = require('../shared/palettes');
const { contrast } = require('./contrast');

const DOCS = path.join(__dirname, '..', 'docs');
const ACCENTS = ['CYAN', 'GREEN', 'ORANGE', 'PINK', 'PURPLE', 'RED', 'YELLOW'];

// Role of each base slot, read from visual-studio-code/src/stranger-theme.yaml and vim/scripts/build.js.
const ROLES = [
  ['BG', 'Editor and terminal background', 'editor.background, Normal'],
  ['FG', 'Default text, identifiers, punctuation and delimiters', 'variables, Identifier, Delimiter'],
  ['SELECTION', 'Selection and highlight surface, never text', 'editor.selectionBackground, Visual'],
  ['COMMENT', 'Comments, line numbers, secondary UI text, inactive elements', 'comments, doc comments, editorLineNumber, breadcrumb'],
  ['CYAN', 'Types and classes, tags in Vim, links and underlined text, built-ins and inherited classes (italic)', 'class names, Type, Structure, links, bracket level 3'],
  ['GREEN', 'Functions and methods, attribute names, decorators', 'function calls, HTML attributes, decorators, MatchParen'],
  ['ORANGE', 'Function parameters (italic), changed or searched text, JSDoc parameters', 'parameters, DiffChange, IncSearch, bold markup'],
  ['PINK', 'Keywords, storage, operators, preprocessor, HTML tags, escape sequences', 'keyword, storage.type, Statement, PreProc, tags'],
  ['PURPLE', 'Constants, numbers, booleans, markup headings', 'constant.numeric, Number, Boolean, headings'],
  ['RED', 'Errors, invalid input, deletions, unexpected brackets', 'Error, ErrorMsg, DiagnosticError, removed lines'],
  ['YELLOW', 'Strings and characters, to-do markers, warnings, quotes in prose', 'String, Character, Todo, blockquotes']
];

// Rule that derives each non-base, non-ANSI key of getDerivedColors().
const DERIVED_RULES = {
  WHITE: 'Fixed #FFFFFF',
  BLACK: 'Fixed #000000',
  LineHighlight: 'BG + 20 per channel (clamped to 0-255)',
  NonText: 'FG at 10% alpha (FG + "1A")',
  BGLighter: 'BG + 40 per channel',
  BGLight: 'BG + 20 per channel',
  BGDark: 'BG - 10 per channel',
  BGDarker: 'BG - 20 per channel'
};

// [ANSI name, source slot, per-channel adjustment]; null slot means fixed white.
const ANSI = [
  ['BLACK', 'BG', 40], ['RED', 'RED', 0], ['GREEN', 'GREEN', 0], ['YELLOW', 'YELLOW', 0],
  ['BLUE', 'PURPLE', 0], ['MAGENTA', 'PINK', 0], ['CYAN', 'CYAN', 0], ['WHITE', 'FG', 0],
  ['BRIGHT_BLACK', 'COMMENT', 0], ['BRIGHT_RED', 'RED', 30], ['BRIGHT_GREEN', 'GREEN', 30],
  ['BRIGHT_YELLOW', 'YELLOW', 30], ['BRIGHT_BLUE', 'PURPLE', 30], ['BRIGHT_MAGENTA', 'PINK', 30],
  ['BRIGHT_CYAN', 'CYAN', 30], ['BRIGHT_WHITE', null, 0]
];

// Nominal hue (degrees) of each accent name, used only to flag slots whose hue disagrees with their name.
const NOMINAL_HUE = { RED: 0, ORANGE: 30, YELLOW: 50, GREEN: 120, CYAN: 180, PURPLE: 270, PINK: 320 };
const HUE_TOLERANCE = 30;

const hueDist = (a, b) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));

function hsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [R, G, B] = [r, g, b].map(v => v / 255);
  const max = Math.max(R, G, B), min = Math.min(R, G, B), d = max - min;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === R) h = ((G - B) / d + 6) % 6;
    else if (max === G) h = (B - R) / d + 2;
    else h = (R - G) / d + 4;
  }
  return { h: Math.round(h * 60) % 360, s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hueName(h) {
  return Object.entries(NOMINAL_HUE).sort((a, b) => hueDist(h, a[1]) - hueDist(h, b[1]))[0][0];
}

function variantData({ id, name, displayName, base }) {
  const all = getDerivedColors(base);
  const derived = {};
  for (const key of Object.keys(all)) {
    if (key in base || key.startsWith('ANSI_')) continue;
    if (!DERIVED_RULES[key]) throw new Error(`build-spec: no rule documented for derived key ${key}`);
    derived[key] = all[key];
  }
  const ansi = {};
  for (const [n, slot, delta] of ANSI) {
    const expected = slot ? adjustColor(base[slot], delta) : '#FFFFFF';
    if (all[`ANSI_${n}`].toUpperCase() !== expected.toUpperCase()) {
      throw new Error(`build-spec: ANSI_${n} no longer derives from ${slot}${delta ? ` + ${delta}` : ''}`);
    }
    ansi[n] = all[`ANSI_${n}`];
  }
  return { id, name, displayName, base: { ...base }, derived, ansi };
}

function allData() {
  return Object.fromEntries(Object.values(THEME_PALETTES).map(p => [p.id, variantData(p)]));
}

const rating = r => (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : 'fail');
const row = cells => `| ${cells.join(' | ')} |`;
const table = (head, rows) => [row(head), row(head.map(() => '---')), ...rows.map(row)].join('\n');

function colourRow(slot, hex) {
  if (hex.length !== 7) return [slot, `\`${hex}\``, 'n/a (alpha)', 'n/a'];
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = hsl(hex);
  return [slot, `\`${hex}\``, `${r}, ${g}, ${b}`, `${h}, ${s}%, ${l}%`];
}

function variantSection(v) {
  const contrastRows = ['FG', 'COMMENT', ...ACCENTS].map(slot => {
    const r = contrast(v.base[slot], v.base.BG);
    return [slot, `\`${v.base[slot]}\``, r.toFixed(2), rating(r)];
  });
  const mismatches = ACCENTS.map(slot => {
    const { h } = hsl(v.base[slot]);
    return hueDist(h, NOMINAL_HUE[slot]) > HUE_TOLERANCE
      ? `- \`${slot}\` (\`${v.base[slot]}\`, hue ${h} degrees) reads as ${hueName(h).toLowerCase()}.`
      : null;
  }).filter(Boolean);

  return [
    `## ${v.displayName}`,
    '',
    `Theme name: \`${v.name}\`. Variant id: \`${v.id}\`.`,
    '',
    '### Base palette',
    '',
    table(['Slot', 'Hex', 'RGB', 'HSL'], Object.entries(v.base).map(([k, hex]) => colourRow(k, hex))),
    '',
    '### Derived UI colours',
    '',
    table(['Key', 'Hex', 'RGB', 'HSL', 'Rule'], Object.entries(v.derived).map(([k, hex]) => [...colourRow(k, hex), DERIVED_RULES[k]])),
    '',
    '### ANSI',
    '',
    table(['Index', 'ANSI colour', 'Hex', 'Source'], ANSI.map(([n, slot, delta], i) => [
      i, n.toLowerCase().replace('_', ' '), `\`${v.ansi[n]}\``,
      slot ? `${slot}${delta ? ` + ${delta}` : ''}` : 'fixed white'
    ])),
    '',
    '### Contrast against BG',
    '',
    table(['Slot', 'Hex', 'Ratio', 'WCAG'], contrastRows),
    '',
    'Accents are held to the 3:1 non-text and large-text threshold by `scripts/test-contrast.js`; the table reports the stricter text levels (AAA 7:1, AA 4.5:1).',
    '',
    '### Name and hue',
    '',
    mismatches.length ? mismatches.join('\n') : 'Every accent slot reads as its own name.',
    ''
  ].join('\n');
}

function renderSpec(data) {
  const variants = Object.values(data);
  return [
    '# Stranger Theme specification',
    '',
    '<!-- Generated by scripts/build-spec.js from shared/palettes.js. Do not edit. -->',
    '',
    'Every value below is computed from `shared/palettes.js`, the single source of truth for all ports.',
    'Machine-readable data lives in [`palettes.json`](palettes.json).',
    '',
    '## Overview',
    '',
    `Stranger Theme ships ${variants.length} dark variants that share one set of 11 slots.`,
    '',
    ...variants.map(v => `- **${v.displayName}** (\`${v.id}\`): background \`${v.base.BG}\`, text \`${v.base.FG}\`.`),
    '',
    '## Colour roles',
    '',
    'Slots are roles, not hue names. A port assigns by role and takes the hex from the palette.',
    '',
    table(['Slot', 'Role', 'Example tokens'], ROLES),
    '',
    ...variants.map(variantSection),
    '## Rules for ports',
    '',
    '- Never hard-code hex values. Read them from `shared/palettes.js` (or `docs/palettes.json`) and regenerate.',
    '- Map by role: keywords use PINK, functions GREEN, types CYAN, strings YELLOW, numbers and constants PURPLE, parameters ORANGE, errors RED, comments COMMENT, plain text FG.',
    '- Editors: BG is the editor background, BGLight and BGLighter are raised surfaces, LineHighlight is the current line, SELECTION is the selection background, NonText is whitespace and rulers.',
    '- Terminals: foreground is FG, background is BG, selection is SELECTION. ANSI blue comes from PURPLE and ANSI magenta from PINK. ANSI black is BG + 40 so it stays visible, ANSI bright black is COMMENT, bright colours are the normal colour + 30, bright white is fixed white.',
    '- Italic: comments, function parameters, inherited classes and language built-ins, HTML attribute names in Vim, prose emphasis and blockquotes.',
    '- Bold: errors, markup headings and strong text, the `new` keyword, to-do markers, matched characters in completion menus.',
    '- Underline: links and underlined text only.',
    ''
  ].join('\n');
}

function build() {
  const data = allData();
  fs.mkdirSync(DOCS, { recursive: true });
  fs.writeFileSync(path.join(DOCS, 'palettes.json'), JSON.stringify(data, null, 2) + '\n');
  fs.writeFileSync(path.join(DOCS, 'SPEC.md'), renderSpec(data));
}

module.exports = { allData, renderSpec };

if (require.main === module) {
  build();
  console.log('Wrote docs/SPEC.md and docs/palettes.json');
}
