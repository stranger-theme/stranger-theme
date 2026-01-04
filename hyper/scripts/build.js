#!/usr/bin/env node

/**
 * Build script for Stranger Theme - Hyper Terminal
 * Generates JavaScript plugin files for all theme variants
 */

const fs = require('fs');
const path = require('path');

// Import shared palettes
const { THEME_PALETTES, adjustColor, getDerivedColors } = require('../../shared/palettes');

const THEMES_DIR = path.join(__dirname, '..', 'themes');

/**
 * Generate Hyper theme JS plugin content
 */
function generateHyperTheme(themeId, palette) {
  const c = getDerivedColors(palette.base);
  const displayName = palette.displayName;
  
  return `/**
 * Stranger Theme: ${displayName} for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-${themeId}" to your plugins in ~/.hyper.js
 */

const backgroundColor = '${c.BG}';
const foregroundColor = '${c.FG}';
const borderColor = '${c.SELECTION}';
const cursorColor = '${c.FG}';

const colors = {
  black: '${c.ANSI_BLACK}',
  red: '${c.ANSI_RED}',
  green: '${c.ANSI_GREEN}',
  yellow: '${c.ANSI_YELLOW}',
  blue: '${c.ANSI_BLUE}',
  magenta: '${c.ANSI_MAGENTA}',
  cyan: '${c.ANSI_CYAN}',
  white: '${c.ANSI_WHITE}',
  lightBlack: '${c.ANSI_BRIGHT_BLACK}',
  lightRed: '${c.ANSI_BRIGHT_RED}',
  lightGreen: '${c.ANSI_BRIGHT_GREEN}',
  lightYellow: '${c.ANSI_BRIGHT_YELLOW}',
  lightBlue: '${c.ANSI_BRIGHT_BLUE}',
  lightMagenta: '${c.ANSI_BRIGHT_MAGENTA}',
  lightCyan: '${c.ANSI_BRIGHT_CYAN}',
  lightWhite: '${c.ANSI_BRIGHT_WHITE}',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '${c.SELECTION}',
    colors,
    termCSS: \`
      \${config.termCSS || ''}
      .terminal-cursor {
        background-color: \${cursorColor} !important;
      }
    \`,
    css: \`
      \${config.css || ''}
      .tabs_list .tab_tab.tab_active .tab_text {
        background: \${backgroundColor};
      }
      .tab_active:before {
        border-color: \${borderColor};
      }
      .splitpane_divider {
        background-color: \${borderColor} !important;
      }
    \`,
  });
};
`;
}

/**
 * Generate package.json for each Hyper theme
 */
function generatePackageJson(themeId, palette) {
  return {
    name: `hyper-stranger-theme-${themeId}`,
    version: "1.0.2",
    description: `Stranger Theme: ${palette.displayName} for Hyper Terminal`,
    main: "index.js",
    keywords: [
      "hyper",
      "hyper-theme",
      "hyper-plugin",
      "theme",
      "stranger-things",
      "dark-theme"
    ],
    author: "Stranger Theme",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/stranger-theme/hyper"
    }
  };
}

/**
 * Main build function
 */
function build() {
  console.log('Building Stranger Theme for Hyper Terminal...\n');

  // Ensure themes directory exists
  if (!fs.existsSync(THEMES_DIR)) {
    fs.mkdirSync(THEMES_DIR, { recursive: true });
  }

  // Build each theme variant
  for (const [themeId, palette] of Object.entries(THEME_PALETTES)) {
    console.log(`Building ${palette.name}...`);
    
    const themeDir = path.join(THEMES_DIR, `hyper-stranger-theme-${themeId}`);
    
    // Create theme directory
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }
    
    // Generate index.js
    const hyperTheme = generateHyperTheme(themeId, palette);
    const indexFile = path.join(themeDir, 'index.js');
    fs.writeFileSync(indexFile, hyperTheme);
    console.log(`  -> ${indexFile}`);
    
    // Generate package.json
    const packageJson = generatePackageJson(themeId, palette);
    const packageFile = path.join(themeDir, 'package.json');
    fs.writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));
    console.log(`  -> ${packageFile}`);
  }

  console.log('\nBuild complete!');
}

// Run build
build();
