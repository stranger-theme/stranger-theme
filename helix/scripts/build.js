#!/usr/bin/env node

/**
 * Build script for Stranger Theme - Helix
 * Generates themes/stranger_<variant>.toml from shared palettes
 */

const fs = require('fs');
const path = require('path');
const { THEME_PALETTES, getDerivedColors } = require('../../shared/palettes');

const OUTPUT_DIR = path.join(__dirname, '..', 'themes');

// Scope -> style. A string is a foreground palette name; an object is a Helix style table.
const SCOPES = {
  // Syntax
  attribute: 'green',
  type: 'cyan',
  'type.builtin': 'cyan',
  constructor: 'cyan',
  constant: 'orange',
  'constant.numeric': 'orange',
  'constant.builtin.boolean': 'purple',
  'constant.character.escape': 'pink',
  string: 'yellow',
  'string.regexp': 'red',
  'string.special': 'pink',
  comment: { fg: 'comment', modifiers: ['italic'] },
  'comment.unused': 'comment',
  variable: 'fg',
  'variable.builtin': 'purple',
  'variable.parameter': 'orange',
  'variable.other.member': 'cyan',
  label: 'purple',
  punctuation: 'fg',
  keyword: 'pink',
  operator: 'pink',
  function: 'green',
  'function.macro': 'purple',
  tag: 'pink',
  namespace: 'cyan',
  special: 'purple',

  // Markup
  'markup.heading': { fg: 'purple', modifiers: ['bold'] },
  'markup.list': 'orange',
  'markup.bold': { modifiers: ['bold'] },
  'markup.italic': { modifiers: ['italic'] },
  'markup.strikethrough': { modifiers: ['crossed_out'] },
  'markup.link.url': { fg: 'cyan', underline: { style: 'line' } },
  'markup.link.text': 'pink',
  'markup.quote': { fg: 'comment', modifiers: ['italic'] },
  'markup.raw': 'green',

  // Diff
  'diff.plus': 'green',
  'diff.minus': 'red',
  'diff.delta': 'cyan',
  'diff.delta.moved': 'purple',
  'diff.delta.conflict': 'orange',

  // Interface
  'ui.background': { bg: 'bg' },
  'ui.background.separator': 'selection',
  'ui.text': 'fg',
  'ui.text.focus': { fg: 'fg', bg: 'bg_light' },
  'ui.text.inactive': 'comment',
  'ui.text.info': 'fg',
  'ui.text.directory': 'cyan',
  // Primary cursor and selection are the bright ones; the fallbacks style the secondary ones.
  'ui.selection': { bg: 'bg_lighter' },
  'ui.selection.primary': { bg: 'selection' },
  'ui.cursor': { fg: 'bg', bg: 'comment' },
  'ui.cursor.normal': { fg: 'bg', bg: 'comment' },
  'ui.cursor.insert': { fg: 'bg', bg: 'comment' },
  'ui.cursor.select': { fg: 'bg', bg: 'comment' },
  'ui.cursor.primary': { fg: 'bg', bg: 'fg' },
  'ui.cursor.match': { fg: 'yellow', modifiers: ['bold'] },
  'ui.cursorline.primary': { bg: 'bg_light' },
  'ui.cursorline.secondary': { bg: 'bg_dark' },
  'ui.gutter': { bg: 'bg' },
  'ui.gutter.selected': { bg: 'bg_light' },
  'ui.linenr': 'comment',
  'ui.linenr.selected': 'fg',
  'ui.debug.breakpoint': 'red',
  'ui.debug.active': 'yellow',
  'ui.highlight': { bg: 'selection' },
  'ui.highlight.frameline': { bg: 'bg_lighter' },
  'ui.statusline': { fg: 'fg', bg: 'bg_dark' },
  'ui.statusline.separator': { fg: 'comment', bg: 'bg_dark' },
  'ui.statusline.inactive': { fg: 'comment', bg: 'bg_dark' },
  'ui.statusline.normal': { fg: 'bg', bg: 'purple', modifiers: ['bold'] },
  'ui.statusline.insert': { fg: 'bg', bg: 'green', modifiers: ['bold'] },
  'ui.statusline.select': { fg: 'bg', bg: 'pink', modifiers: ['bold'] },
  'ui.bufferline': { fg: 'comment', bg: 'bg_dark' },
  'ui.bufferline.active': { fg: 'fg', bg: 'bg', underline: { color: 'purple', style: 'line' } },
  'ui.bufferline.background': { bg: 'bg_dark' },
  'ui.popup': { fg: 'fg', bg: 'bg_light' },
  'ui.popup.info': { fg: 'fg', bg: 'bg_light' },
  'ui.picker.header': { modifiers: ['bold'] },
  'ui.picker.header.column': 'comment',
  'ui.picker.header.column.active': { fg: 'purple', modifiers: ['bold'], underline: { style: 'line' } },
  'ui.window': 'selection',
  'ui.help': { fg: 'fg', bg: 'bg_light' },
  'ui.menu': { fg: 'fg', bg: 'bg_light' },
  'ui.menu.selected': { fg: 'fg', bg: 'selection' },
  'ui.menu.scroll': { fg: 'comment', bg: 'bg_light' },
  'ui.virtual.whitespace': 'selection',
  'ui.virtual.indent-guide': 'selection',
  'ui.virtual.ruler': { bg: 'bg_light' },
  'ui.virtual.inlay-hint': 'comment',
  'ui.virtual.wrap': 'comment',
  'ui.virtual.jump-label': { fg: 'pink', modifiers: ['bold'] },
  tabstop: { modifiers: ['italic'], underline: { color: 'orange', style: 'line' } },

  // Diagnostics (gutter, then editing area)
  error: 'red',
  warning: 'yellow',
  info: 'cyan',
  hint: 'comment',
  'diagnostic.error': { underline: { color: 'red', style: 'curl' } },
  'diagnostic.warning': { underline: { color: 'yellow', style: 'curl' } },
  'diagnostic.info': { underline: { color: 'cyan', style: 'curl' } },
  'diagnostic.hint': { underline: { color: 'comment', style: 'curl' } },
  'diagnostic.unnecessary': { modifiers: ['dim'] },
  'diagnostic.deprecated': { modifiers: ['crossed_out'] }
};

function toml(value) {
  if (typeof value === 'string') return `"${value}"`;
  if (Array.isArray(value)) return `[${value.map(toml).join(', ')}]`;
  return `{ ${Object.entries(value).map(([k, v]) => `${k} = ${toml(v)}`).join(', ')} }`;
}

function generateHelixTheme(palette) {
  const c = getDerivedColors(palette.base);
  const colors = {
    bg: c.BG, bg_dark: c.BGDark, bg_light: c.BGLight, bg_lighter: c.BGLighter, fg: c.FG, selection: c.SELECTION,
    comment: c.COMMENT, cyan: c.CYAN, green: c.GREEN, orange: c.ORANGE, pink: c.PINK,
    purple: c.PURPLE, red: c.RED, yellow: c.YELLOW
  };
  const scopes = Object.entries(SCOPES).map(([scope, style]) => `"${scope}" = ${toml(style)}`);
  // [palette] must come last: it captures every key after its header.
  return `# Author : Stranger Theme <contact@strangertheme.com>
# License: MIT
# ${palette.name} for Helix
${scopes.join('\n')}

[palette]
${Object.entries(colors).map(([name, hex]) => `${name} = "${hex}"`).join('\n')}
`;
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
for (const [themeId, palette] of Object.entries(THEME_PALETTES)) {
  const file = path.join(OUTPUT_DIR, `stranger_${themeId.replace(/-/g, '_')}.toml`);
  fs.writeFileSync(file, generateHelixTheme(palette));
  console.log(`  -> ${file}`);
}
