#!/usr/bin/env node

/**
 * Build script for Stranger Theme - Terminal Themes
 * Generates themes for Alacritty, iTerm2, and Windows Terminal
 */

const fs = require('fs');
const path = require('path');

// Import shared palettes
const { THEME_PALETTES, adjustColor, getDerivedColors, hexToNormalizedRgb } = require('../../shared/palettes');

const OUTPUT_DIRS = {
  alacritty: path.join(__dirname, '..', 'alacritty'),
  iterm2: path.join(__dirname, '..', 'iterm2'),
  windowsTerminal: path.join(__dirname, '..', 'windows-terminal')
};

/**
 * Generate Alacritty theme (TOML format)
 */
function generateAlacrittyTheme(themeId, palette) {
  const c = getDerivedColors(palette.base);
  const displayName = palette.displayName;
  
  return `# Stranger Theme: ${displayName} for Alacritty
# https://github.com/stranger-theme/alacritty

[colors.primary]
background = "${c.BG}"
foreground = "${c.FG}"
bright_foreground = "#ffffff"

[colors.cursor]
text = "${c.BG}"
cursor = "${c.FG}"

[colors.vi_mode_cursor]
text = "CellBackground"
cursor = "CellForeground"

[colors.selection]
text = "CellForeground"
background = "${c.SELECTION}"

[colors.normal]
black = "${c.ANSI_BLACK}"
red = "${c.ANSI_RED}"
green = "${c.ANSI_GREEN}"
yellow = "${c.ANSI_YELLOW}"
blue = "${c.ANSI_BLUE}"
magenta = "${c.ANSI_MAGENTA}"
cyan = "${c.ANSI_CYAN}"
white = "${c.ANSI_WHITE}"

[colors.bright]
black = "${c.ANSI_BRIGHT_BLACK}"
red = "${c.ANSI_BRIGHT_RED}"
green = "${c.ANSI_BRIGHT_GREEN}"
yellow = "${c.ANSI_BRIGHT_YELLOW}"
blue = "${c.ANSI_BRIGHT_BLUE}"
magenta = "${c.ANSI_BRIGHT_MAGENTA}"
cyan = "${c.ANSI_BRIGHT_CYAN}"
white = "${c.ANSI_BRIGHT_WHITE}"

[colors.search.matches]
foreground = "${c.SELECTION}"
background = "${c.GREEN}"

[colors.search.focused_match]
foreground = "${c.SELECTION}"
background = "${c.ORANGE}"

[colors.footer_bar]
background = "${c.BG}"
foreground = "${c.FG}"

[colors.hints.start]
foreground = "${c.BG}"
background = "${c.YELLOW}"

[colors.hints.end]
foreground = "${c.YELLOW}"
background = "${c.BG}"
`;
}

/**
 * Generate iTerm2 theme (.itermcolors plist format)
 */
function generateITermTheme(themeId, palette) {
  const c = getDerivedColors(palette.base);
  const displayName = palette.displayName;
  
  // Helper to generate color dict
  function colorDict(hex) {
    const rgb = hexToNormalizedRgb(hex);
    return `\t<dict>
\t\t<key>Alpha Component</key>
\t\t<real>1</real>
\t\t<key>Blue Component</key>
\t\t<real>${rgb.b}</real>
\t\t<key>Color Space</key>
\t\t<string>sRGB</string>
\t\t<key>Green Component</key>
\t\t<real>${rgb.g}</real>
\t\t<key>Red Component</key>
\t\t<real>${rgb.r}</real>
\t</dict>`;
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>

<!-- Stranger Theme: ${displayName} for iTerm2
#
# https://github.com/stranger-theme/iterm
-->

<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>Ansi 0 Color</key>
${colorDict(c.ANSI_BLACK)}
\t<key>Ansi 1 Color</key>
${colorDict(c.ANSI_RED)}
\t<key>Ansi 2 Color</key>
${colorDict(c.ANSI_GREEN)}
\t<key>Ansi 3 Color</key>
${colorDict(c.ANSI_YELLOW)}
\t<key>Ansi 4 Color</key>
${colorDict(c.ANSI_BLUE)}
\t<key>Ansi 5 Color</key>
${colorDict(c.ANSI_MAGENTA)}
\t<key>Ansi 6 Color</key>
${colorDict(c.ANSI_CYAN)}
\t<key>Ansi 7 Color</key>
${colorDict(c.ANSI_WHITE)}
\t<key>Ansi 8 Color</key>
${colorDict(c.ANSI_BRIGHT_BLACK)}
\t<key>Ansi 9 Color</key>
${colorDict(c.ANSI_BRIGHT_RED)}
\t<key>Ansi 10 Color</key>
${colorDict(c.ANSI_BRIGHT_GREEN)}
\t<key>Ansi 11 Color</key>
${colorDict(c.ANSI_BRIGHT_YELLOW)}
\t<key>Ansi 12 Color</key>
${colorDict(c.ANSI_BRIGHT_BLUE)}
\t<key>Ansi 13 Color</key>
${colorDict(c.ANSI_BRIGHT_MAGENTA)}
\t<key>Ansi 14 Color</key>
${colorDict(c.ANSI_BRIGHT_CYAN)}
\t<key>Ansi 15 Color</key>
${colorDict(c.ANSI_BRIGHT_WHITE)}
\t<key>Background Color</key>
${colorDict(c.BG)}
\t<key>Badge Color</key>
${colorDict(c.PINK)}
\t<key>Bold Color</key>
${colorDict(c.FG)}
\t<key>Cursor Color</key>
${colorDict(c.FG)}
\t<key>Cursor Guide Color</key>
${colorDict(c.SELECTION)}
\t<key>Cursor Text Color</key>
${colorDict(c.BG)}
\t<key>Foreground Color</key>
${colorDict(c.FG)}
\t<key>Link Color</key>
${colorDict(c.CYAN)}
\t<key>Selected Text Color</key>
${colorDict(c.FG)}
\t<key>Selection Color</key>
${colorDict(c.SELECTION)}
</dict>
</plist>
`;
}

/**
 * Generate Windows Terminal theme (JSON format)
 */
function generateWindowsTerminalTheme(themeId, palette) {
  const c = getDerivedColors(palette.base);
  
  return {
    name: palette.name,
    cursorColor: c.FG,
    selectionBackground: c.SELECTION,
    background: c.BG,
    foreground: c.FG,
    black: c.ANSI_BLACK,
    blue: c.ANSI_BLUE,
    cyan: c.ANSI_CYAN,
    green: c.ANSI_GREEN,
    purple: c.ANSI_MAGENTA,
    red: c.ANSI_RED,
    white: c.ANSI_WHITE,
    yellow: c.ANSI_YELLOW,
    brightBlack: c.ANSI_BRIGHT_BLACK,
    brightBlue: c.ANSI_BRIGHT_BLUE,
    brightCyan: c.ANSI_BRIGHT_CYAN,
    brightGreen: c.ANSI_BRIGHT_GREEN,
    brightPurple: c.ANSI_BRIGHT_MAGENTA,
    brightRed: c.ANSI_BRIGHT_RED,
    brightWhite: c.ANSI_BRIGHT_WHITE,
    brightYellow: c.ANSI_BRIGHT_YELLOW
  };
}

/**
 * Main build function
 */
function build() {
  console.log('Building Stranger Theme for Terminal Emulators...\n');

  // Ensure output directories exist
  for (const dir of Object.values(OUTPUT_DIRS)) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Build each theme variant
  for (const [themeId, palette] of Object.entries(THEME_PALETTES)) {
    console.log(`Building ${palette.name}...`);
    const fileBase = `stranger-theme-${themeId}`;
    const displayName = palette.displayName.replace(/ /g, '-');
    
    // Alacritty
    const alacrittyTheme = generateAlacrittyTheme(themeId, palette);
    const alacrittyFile = path.join(OUTPUT_DIRS.alacritty, `${fileBase}.toml`);
    fs.writeFileSync(alacrittyFile, alacrittyTheme);
    console.log(`  -> ${alacrittyFile}`);
    
    // iTerm2
    const itermTheme = generateITermTheme(themeId, palette);
    const itermFile = path.join(OUTPUT_DIRS.iterm2, `Stranger-Theme-${displayName}.itermcolors`);
    fs.writeFileSync(itermFile, itermTheme);
    console.log(`  -> ${itermFile}`);
    
    // Windows Terminal
    const wtTheme = generateWindowsTerminalTheme(themeId, palette);
    const wtFile = path.join(OUTPUT_DIRS.windowsTerminal, `${fileBase}.json`);
    fs.writeFileSync(wtFile, JSON.stringify(wtTheme, null, 2));
    console.log(`  -> ${wtFile}`);
  }

  console.log('\nBuild complete!');
}

// Run build
build();
