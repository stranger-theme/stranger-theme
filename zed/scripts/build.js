#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { THEME_PALETTES, getDerivedColors } = require('../../shared/palettes');

const themes = Object.values(THEME_PALETTES).map(palette => {
  const c = getDerivedColors(palette.base);
  const style = {
    background: c.BG,
    'surface.background': c.BGDark,
    'elevated_surface.background': c.BGLight,
    border: c.SELECTION,
    'border.focused': c.PURPLE,
    text: c.FG,
    'text.muted': c.COMMENT,
    'text.accent': c.CYAN,
    'element.background': c.BG,
    'element.hover': c.BGLight,
    'element.selected': c.SELECTION,
    'panel.background': c.BGDark,
    'status_bar.background': c.BGDark,
    'title_bar.background': c.BGDark,
    'toolbar.background': c.BG,
    'tab_bar.background': c.BGDark,
    'tab.active_background': c.BG,
    'tab.inactive_background': c.BGDark,
    'editor.background': c.BG,
    'editor.foreground': c.FG,
    'editor.gutter.background': c.BG,
    'editor.line_number': c.COMMENT,
    'editor.active_line_number': c.FG,
    'editor.active_line.background': c.LineHighlight,
    'editor.document_highlight.read_background': c.SELECTION,
    'editor.document_highlight.write_background': c.SELECTION,
    'editor.indent_guide': c.SELECTION,
    'search.match_background': c.SELECTION,
    'terminal.background': c.BG,
    'terminal.foreground': c.FG,
    'terminal.bright_foreground': c.ANSI_BRIGHT_WHITE,
    'terminal.ansi.background': c.BG,
    error: c.RED,
    warning: c.YELLOW,
    success: c.GREEN,
    info: c.CYAN,
    created: c.GREEN,
    modified: c.ORANGE,
    deleted: c.RED,
    players: [{ cursor: c.FG, background: c.FG, selection: c.SELECTION }],
    syntax: {
      attribute: { color: c.GREEN },
      boolean: { color: c.PURPLE },
      comment: { color: c.COMMENT, font_style: 'italic' },
      'comment.doc': { color: c.COMMENT, font_style: 'italic' },
      constant: { color: c.ORANGE },
      constructor: { color: c.CYAN },
      function: { color: c.GREEN },
      keyword: { color: c.PINK },
      number: { color: c.ORANGE },
      operator: { color: c.PINK },
      property: { color: c.CYAN },
      punctuation: { color: c.FG },
      string: { color: c.YELLOW },
      'string.escape': { color: c.PINK },
      tag: { color: c.PINK },
      type: { color: c.CYAN },
      variable: { color: c.FG }
    }
  };

  for (const name of ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']) {
    style[`terminal.ansi.${name}`] = c[`ANSI_${name.toUpperCase()}`];
    style[`terminal.ansi.bright_${name}`] = c[`ANSI_BRIGHT_${name.toUpperCase()}`];
  }
  return { name: palette.name, appearance: 'dark', style };
});

const outputDir = path.join(__dirname, '..', 'themes');
fs.mkdirSync(outputDir, { recursive: true });
const outputFile = path.join(outputDir, 'stranger-theme.json');
fs.writeFileSync(outputFile, JSON.stringify({
  $schema: 'https://zed.dev/schema/themes/v0.2.0.json',
  name: 'Stranger Theme',
  author: 'Stranger Theme',
  themes
}, null, 2) + '\n');
console.log(`Built ${themes.length} Zed themes: ${outputFile}`);
