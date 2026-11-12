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

const { THEME_PALETTES, adjustColor, getDerivedColors } = require('../../shared/palettes.js');

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
    ...getDerivedColors(palette),
    TEMP_QUOTES: adjustColor(palette.YELLOW, -10),
    TEMP_PROPERTY_QUOTES: adjustColor(palette.CYAN, 10)
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

  if (sourceYaml.semanticTokenColors) {
    theme.semanticTokenColors = replaceColors(sourceYaml.semanticTokenColors, palette.base);
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
