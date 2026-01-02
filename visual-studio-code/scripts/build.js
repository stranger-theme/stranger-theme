#!/usr/bin/env node

/**
 * Build script for Stranger Theme
 * Compiles YAML theme sources to JSON theme files
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', 'src');
const THEMES_DIR = path.join(__dirname, '..', 'themes');

// Theme palettes for each variant
const THEME_PALETTES = {
  'upside-down': {
    name: 'Stranger Theme: Upside Down',
    base: {
      BG: '#0D1117',
      FG: '#F8F8F2',
      SELECTION: '#2A3C4A',
      COMMENT: '#5C6370',
      CYAN: '#56B6C2',
      GREEN: '#98C379',
      ORANGE: '#D19A66',
      PINK: '#C678DD',
      PURPLE: '#61AFEF',
      RED: '#E06C75',
      YELLOW: '#E5C07B'
    }
  },
  'starcourt': {
    name: 'Stranger Theme: Starcourt',
    base: {
      BG: '#1A1A2E',
      FG: '#EAEAEA',
      SELECTION: '#2E2E4A',
      COMMENT: '#6B5B95',
      CYAN: '#00CED1',
      GREEN: '#00FA9A',
      ORANGE: '#FFB347',
      PINK: '#FF1493',
      PURPLE: '#BA55D3',
      RED: '#FF6B6B',
      YELLOW: '#FFD700'
    }
  },
  'hawkins': {
    name: 'Stranger Theme: Hawkins',
    base: {
      BG: '#2C2218',
      FG: '#E8DCC8',
      SELECTION: '#3C3228',
      COMMENT: '#6B5B45',
      CYAN: '#88C0D0',
      GREEN: '#A3BE8C',
      ORANGE: '#D08770',
      PINK: '#D4A574',
      PURPLE: '#B48EAD',
      RED: '#BF616A',
      YELLOW: '#EBCB8B'
    }
  },
  'the-lab': {
    name: 'Stranger Theme: The Lab',
    base: {
      BG: '#1A1D26',
      FG: '#E0E5EC',
      SELECTION: '#2A2D36',
      COMMENT: '#5D6D7E',
      CYAN: '#39CCCC',
      GREEN: '#2ECC40',
      ORANGE: '#FF851B',
      PINK: '#7FDBFF',
      PURPLE: '#B10DC9',
      RED: '#FF4136',
      YELLOW: '#FFDC00'
    }
  },
  'tigers': {
    name: 'Stranger Theme: Tigers',
    base: {
      BG: '#1A1A1A',
      FG: '#F5F5F5',
      SELECTION: '#2A2A2A',
      COMMENT: '#5C5C5C',
      CYAN: '#81A2BE',
      GREEN: '#B5BD68',
      ORANGE: '#DE935F',
      PINK: '#FF7F2A',
      PURPLE: '#B294BB',
      RED: '#CC6666',
      YELLOW: '#F0C674'
    }
  },
  'dimension-x': {
    name: 'Stranger Theme: Dimension X',
    base: {
      BG: '#1E1A1A',
      FG: '#E8D5D5',
      SELECTION: '#3E2A2A',
      COMMENT: '#5C4A4A',
      CYAN: '#D19A66',
      GREEN: '#8B7355',
      ORANGE: '#FF6B6B',
      PINK: '#E06C75',
      PURPLE: '#C678DD',
      RED: '#FF55AA',
      YELLOW: '#BCA89F'
    }
  }
};

/**
 * Read and parse YAML file
 */
function readYaml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.load(content);
}

/**
 * Replace color placeholders in a string
 */
function replaceColorPlaceholders(str, palette) {
  const colorMap = {
    'BG': palette.BG,
    'FG': palette.FG,
    'SELECTION': palette.SELECTION,
    'COMMENT': palette.COMMENT,
    'CYAN': palette.CYAN,
    'GREEN': palette.GREEN,
    'ORANGE': palette.ORANGE,
    'PINK': palette.PINK,
    'PURPLE': palette.PURPLE,
    'RED': palette.RED,
    'YELLOW': palette.YELLOW,
    'WHITE': '#FFFFFF',
    'LineHighlight': adjustColor(palette.BG, 20),
    'NonText': palette.FG + '1A',
    'BGLighter': adjustColor(palette.BG, 40),
    'BGLight': adjustColor(palette.BG, 20),
    'BGDark': adjustColor(palette.BG, -10),
    'BGDarker': adjustColor(palette.BG, -20),
    'TEMP_QUOTES': adjustColor(palette.YELLOW, -10),
    'TEMP_PROPERTY_QUOTES': adjustColor(palette.CYAN, 10)
  };
  
  // Replace all {{PLACEHOLDER}} patterns
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return colorMap[key] || match;
  });
}

/**
 * Replace color references in an object
 */
function replaceColors(obj, palette) {
  if (typeof obj === 'string') {
    return replaceColorPlaceholders(obj, palette);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => replaceColors(item, palette));
  }
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceColors(value, palette);
    }
    return result;
  }
  return obj;
}

/**
 * Adjust color brightness
 */
function adjustColor(hex, amount) {
  const color = hex.replace('#', '');
  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase();
}

/**
 * Build a theme from YAML source
 */
function buildTheme(sourceYaml, themeName, palette) {
  // Create base theme structure
  const theme = {
    name: palette.name,
    type: 'dark',
    semanticHighlighting: true,
    colors: {},
    tokenColors: []
  };

  // Process colors
  if (sourceYaml.colors) {
    for (const [key, value] of Object.entries(sourceYaml.colors)) {
      theme.colors[key] = replaceColors(value, palette.base);
    }
  }

  // Process tokenColors
  if (sourceYaml.tokenColors) {
    theme.tokenColors = sourceYaml.tokenColors.map(token => {
      const processed = {
        settings: {}
      };
      
      if (token.name) {
        processed.name = token.name;
      }
      
      if (token.scope) {
        processed.scope = token.scope;
      }
      
      if (token.settings) {
        if (token.settings.foreground) {
          processed.settings.foreground = replaceColors(token.settings.foreground, palette.base);
        }
        if (token.settings.fontStyle) {
          processed.settings.fontStyle = token.settings.fontStyle;
        }
        if (token.settings.background) {
          processed.settings.background = replaceColors(token.settings.background, palette.base);
        }
      }
      
      return processed;
    });
  }

  return theme;
}

/**
 * Main build function
 */
function build() {
  console.log('Building Stranger Theme...\n');

  // Ensure themes directory exists
  if (!fs.existsSync(THEMES_DIR)) {
    fs.mkdirSync(THEMES_DIR, { recursive: true });
  }

  // Read base YAML
  const sourceFile = path.join(SRC_DIR, 'stranger-theme.yaml');
  if (!fs.existsSync(sourceFile)) {
    console.error('Source file not found:', sourceFile);
    process.exit(1);
  }

  const sourceYaml = readYaml(sourceFile);

  // Build each theme variant
  for (const [themeId, palette] of Object.entries(THEME_PALETTES)) {
    console.log(`Building ${palette.name}...`);
    
    const theme = buildTheme(sourceYaml, themeId, palette);
    const outputFile = path.join(THEMES_DIR, `${themeId}-color-theme.json`);
    
    fs.writeFileSync(outputFile, JSON.stringify(theme, null, 2));
    console.log(`  -> ${outputFile}`);
  }

  console.log('\nBuild complete!');
}

// Run build
build();
