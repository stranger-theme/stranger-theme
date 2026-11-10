#!/usr/bin/env node

/**
 * Build script for Stranger Theme - Aggregator submissions
 * Generates the source files upstream scheme collections expect:
 *   - tinted-theming/schemes        -> tinted/base16/*.yaml, tinted/base24/*.yaml
 *   - mbadolato/iTerm2-Color-Schemes -> iterm2-color-schemes/*.yml
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { THEME_PALETTES, adjustColor, getDerivedColors } = require('../../shared/palettes');

const ROOT = path.join(__dirname, '..');
const SOURCE = 'https://github.com/stranger-theme/stranger-theme';
const ANSI_NAMES = ['BLACK', 'RED', 'GREEN', 'YELLOW', 'BLUE', 'MAGENTA', 'CYAN', 'WHITE'];

const luminance = hex => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
};

/**
 * base00-base07 are the shade ramp, base08-base0F the accents (base16 styling guide).
 * base24 adds two darker backgrounds and the six bright ANSI accents.
 */
function tintedColors(c, system) {
  const colors = [
    c.BG, c.BGLight, c.SELECTION, c.COMMENT, adjustColor(c.FG, -48), c.FG, adjustColor(c.FG, 12), '#FFFFFF',
    c.RED, c.ORANGE, c.YELLOW, c.GREEN, c.CYAN, c.PURPLE, c.PINK,
    // base0F is used as text (delimiters, deprecated): ORANGE-40 stays >= 3:1 on BG in every variant.
    adjustColor(c.ORANGE, -40)
  ];
  if (system === 'base24') {
    colors.push(c.BGDark, c.BGDarker, c.ANSI_BRIGHT_RED, c.ANSI_BRIGHT_YELLOW, c.ANSI_BRIGHT_GREEN,
      c.ANSI_BRIGHT_CYAN, c.ANSI_BRIGHT_BLUE, c.ANSI_BRIGHT_MAGENTA);
  }
  return colors;
}

function generateTintedScheme(palette, system) {
  const colors = tintedColors(getDerivedColors(palette.base), system);
  const name = `Stranger Theme ${palette.displayName}`;
  // A dark scheme must run dark -> light across the shade ramp.
  for (let i = 1; i < 8; i++) {
    assert(luminance(colors[i]) >= luminance(colors[i - 1]), `${name}: base0${i} is darker than base0${i - 1}`);
  }
  const lines = colors.map((color, i) =>
    `  base${i.toString(16).toUpperCase().padStart(2, '0')}: "${color.toLowerCase()}"`);
  return `system: "${system}"
name: "${name}"
author: "Stranger Theme (${SOURCE})"
variant: "dark"
palette:
${lines.join('\n')}
`;
}

/** Gogh-style YAML with the iTerm2-Color-Schemes extra keys. */
function generateItermSchemesYaml(palette) {
  const c = getDerivedColors(palette.base);
  const ansi = [...ANSI_NAMES.map(n => c[`ANSI_${n}`]), ...ANSI_NAMES.map(n => c[`ANSI_BRIGHT_${n}`])];
  const entries = [
    ...ansi.map((color, i) => [`color_${String(i + 1).padStart(2, '0')}`, color]),
    ['background', c.BG],
    ['foreground', c.FG],
    ['cursor', c.FG],
    ['cursor_text', c.BG],
    ['selection', c.SELECTION],
    ['selection_text', c.FG],
    ['badge', c.PINK],
    ['link', c.CYAN]
  ];
  return `# ${SOURCE}
name: "Stranger Theme ${palette.displayName}"
${entries.map(([key, color]) => `${`${key}:`.padEnd(16)}"${color.toLowerCase()}"`).join('\n')}
`;
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log(`  -> ${file}`);
}

function build() {
  console.log('Building Stranger Theme aggregator submissions...\n');
  for (const [themeId, palette] of Object.entries(THEME_PALETTES)) {
    console.log(`Building ${palette.name}...`);
    for (const system of ['base16', 'base24']) {
      write(path.join(ROOT, 'tinted', system, `stranger-theme-${themeId}.yaml`), generateTintedScheme(palette, system));
    }
    write(path.join(ROOT, 'iterm2-color-schemes', `Stranger Theme ${palette.displayName}.yml`),
      generateItermSchemesYaml(palette));
  }
  console.log('\nBuild complete!');
}

build();
