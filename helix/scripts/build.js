#!/usr/bin/env node

/**
 * Build script for Stranger Theme - Helix
 * Generates themes/stranger_<variant>.toml from shared palettes
 */

const fs = require('fs');
const path = require('path');
const { THEME_PALETTES, getDerivedColors } = require('../../shared/palettes');
const { contrast } = require('../../scripts/contrast');

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
  // The cursor colour is the main cue; the secondary selection is only a step dimmer, as in most bundled themes.
  'ui.selection': { bg: 'bg_light' },
  'ui.selection.primary': { bg: 'selection' },
  'ui.cursor': { fg: 'bg', bg: 'comment' },
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
  // Mode labels and the jump label are filled in per palette by label() below.
  'ui.statusline.normal': null,
  'ui.statusline.insert': null,
  'ui.statusline.select': null,
  'ui.bufferline': { fg: 'comment', bg: 'bg_dark' },
  'ui.bufferline.active': { fg: 'fg', bg: 'bg', underline: { color: 'purple', style: 'line' } },
  'ui.bufferline.background': { bg: 'bg_dark' },
  'ui.popup': { fg: 'fg', bg: 'bg_light' },
  'ui.popup.info': { fg: 'fg', bg: 'bg_light' },
  'ui.picker.header': { fg: 'fg', bg: 'bg_dark', modifiers: ['bold'] },
  'ui.picker.header.column': { fg: 'comment', bg: 'bg_dark' },
  'ui.picker.header.column.active': { fg: 'fg', bg: 'bg_dark', modifiers: ['bold'], underline: { color: 'purple', style: 'line' } },
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
  'ui.virtual.jump-label': null,
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
  // Bold text on an accent: the first accent/ink pair that reaches WCAG AA (4.5:1). Inks other than bg join [palette].
  const inks = { bg: c.BG, bg_darker: c.BGDarker, white: c.ANSI_BRIGHT_WHITE };
  const label = (...accents) => {
    for (const accent of accents) {
      const ink = Object.keys(inks).find(name => contrast(inks[name], colors[accent]) >= 4.5);
      if (ink) {
        colors[ink] = inks[ink];
        return { fg: ink, bg: accent, modifiers: ['bold'] };
      }
    }
    throw new Error(`${palette.name}: no readable label colour on ${accents.join(', ')}`);
  };
  const styles = {
    ...SCOPES,
    'ui.statusline.normal': label('purple', 'cyan'),
    'ui.statusline.insert': label('green', 'yellow'),
    'ui.statusline.select': label('pink', 'orange'),
    'ui.virtual.jump-label': label('pink', 'orange')
  };
  const scopes = Object.entries(styles).map(([scope, style]) => `"${scope}" = ${toml(style)}`);
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
