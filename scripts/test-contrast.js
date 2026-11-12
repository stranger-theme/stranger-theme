#!/usr/bin/env node

// WCAG 2.x contrast checks for every palette in shared/palettes.js.
const assert = require('node:assert/strict');
const { THEME_PALETTES, adjustColor, getDerivedColors } = require('../shared/palettes');
const { contrast } = require('./contrast');

const ACCENTS = ['CYAN', 'GREEN', 'ORANGE', 'PINK', 'PURPLE', 'RED', 'YELLOW'];
const BRIGHT_PAIRS = ['BLACK', 'RED', 'GREEN', 'YELLOW', 'BLUE', 'MAGENTA', 'CYAN', 'WHITE'];

const failures = [];
const rows = [];

for (const { id, base } of Object.values(THEME_PALETTES)) {
  const derived = getDerivedColors(base);
  const checks = [
    ['FG/BG', base.FG, base.BG, 7],
    ['COMMENT/BG', base.COMMENT, base.BG, 4.5],
    ...ACCENTS.map(name => [`${name}/BG`, base[name], base.BG, 3]),
    ['FG/SELECTION', base.FG, base.SELECTION, 4.5],
    ['SELECTION/LineHighlight', base.SELECTION, adjustColor(base.BG, 20), 1.2],
    ['ANSI_BLACK/BG', derived.ANSI_BLACK, base.BG, 1.5]
  ];

  const row = { id };
  for (const [label, fg, bg, min] of checks) {
    const ratio = contrast(fg, bg);
    row[label] = ratio.toFixed(2);
    if (ratio < min) failures.push(`${id}: ${label} ${fg} on ${bg} = ${ratio.toFixed(2)} < ${min}`);
  }
  rows.push(row);

  for (const name of BRIGHT_PAIRS) {
    const normal = derived[`ANSI_${name}`];
    const bright = derived[`ANSI_BRIGHT_${name}`];
    if (normal.toUpperCase() === bright.toUpperCase()) {
      failures.push(`${id}: ANSI_BRIGHT_${name} equals ANSI_${name} (${bright})`);
    }
  }
}

console.table(rows.map(({ id, ...ratios }) => ({
  variant: id,
  fg: ratios['FG/BG'],
  comment: ratios['COMMENT/BG'],
  minAccent: Math.min(...ACCENTS.map(name => Number(ratios[`${name}/BG`]))).toFixed(2),
  fgSel: ratios['FG/SELECTION'],
  selLine: ratios['SELECTION/LineHighlight'],
  ansiBlack: ratios['ANSI_BLACK/BG']
})));

assert.deepEqual(failures, [], `Contrast checks failed:\n  ${failures.join('\n  ')}`);
console.log(`Contrast OK: ${rows.length} variants meet WCAG thresholds.`);
