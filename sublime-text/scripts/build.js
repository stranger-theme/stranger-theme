#!/usr/bin/env node

/**
 * Build script for Stranger Theme - Sublime Text
 * Generates .tmTheme files for all theme variants
 */

const fs = require('fs');
const path = require('path');

// Import shared palettes
const { THEME_PALETTES, adjustColor, getDerivedColors } = require('../../shared/palettes');

const THEMES_DIR = path.join(__dirname, '..', 'themes');

/**
 * Generate Sublime Text tmTheme XML content
 */
function generateTmTheme(themeId, palette) {
  const c = getDerivedColors(palette.base);
  const displayName = palette.displayName;
  
  return `<?xml version="1.0" encoding="UTF-8"?>

<!-- Stranger Theme: ${displayName}
#
# https://github.com/stranger-theme
#
# Copyright 2024-present, All rights reserved
#
# Code licensed under the MIT license
-->

<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>name</key>
\t<string>Stranger Theme: ${displayName}</string>
\t<key>settings</key>
\t<array>
\t\t<dict>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>background</key>
\t\t\t\t<string>${c.BG}</string>
\t\t\t\t<key>caret</key>
\t\t\t\t<string>${c.FG}</string>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.FG}</string>
\t\t\t\t<key>invisibles</key>
\t\t\t\t<string>${c.COMMENT}</string>
\t\t\t\t<key>lineHighlight</key>
\t\t\t\t<string>${c.BGLight}</string>
\t\t\t\t<key>selection</key>
\t\t\t\t<string>${c.SELECTION}</string>
\t\t\t\t<key>findHighlight</key>
\t\t\t\t<string>${c.YELLOW}</string>
\t\t\t\t<key>findHighlightForeground</key>
\t\t\t\t<string>${c.BG}</string>
\t\t\t\t<key>selectionBorder</key>
\t\t\t\t<string>${c.SELECTION}</string>
\t\t\t\t<key>activeGuide</key>
\t\t\t\t<string>${c.PINK}B0</string>
\t\t\t\t<key>bracketsForeground</key>
\t\t\t\t<string>${c.FG}A5</string>
\t\t\t\t<key>bracketsOptions</key>
\t\t\t\t<string>underline</string>
\t\t\t\t<key>bracketContentsForeground</key>
\t\t\t\t<string>${c.FG}A5</string>
\t\t\t\t<key>bracketContentsOptions</key>
\t\t\t\t<string>underline</string>
\t\t\t\t<key>tagsOptions</key>
\t\t\t\t<string>stippled_underline</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Comment</string>
\t\t\t<key>scope</key>
\t\t\t<string>comment</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.COMMENT}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>italic</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>String</string>
\t\t\t<key>scope</key>
\t\t\t<string>string</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.YELLOW}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Number</string>
\t\t\t<key>scope</key>
\t\t\t<string>constant.numeric</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.PURPLE}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Built-in constant</string>
\t\t\t<key>scope</key>
\t\t\t<string>constant.language</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.PURPLE}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>User-defined constant</string>
\t\t\t<key>scope</key>
\t\t\t<string>constant.character, constant.other</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.PURPLE}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Variable</string>
\t\t\t<key>scope</key>
\t\t\t<string>variable</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.FG}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Keyword</string>
\t\t\t<key>scope</key>
\t\t\t<string>keyword</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.PINK}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Storage</string>
\t\t\t<key>scope</key>
\t\t\t<string>storage</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.PINK}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Storage type</string>
\t\t\t<key>scope</key>
\t\t\t<string>storage.type</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.CYAN}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>italic</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Class name</string>
\t\t\t<key>scope</key>
\t\t\t<string>entity.name.class</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.CYAN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Inherited class</string>
\t\t\t<key>scope</key>
\t\t\t<string>entity.other.inherited-class</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.CYAN}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>italic</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Function name</string>
\t\t\t<key>scope</key>
\t\t\t<string>entity.name.function</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.GREEN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Function argument</string>
\t\t\t<key>scope</key>
\t\t\t<string>variable.parameter</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.ORANGE}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>italic</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Tag name</string>
\t\t\t<key>scope</key>
\t\t\t<string>entity.name.tag</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.PINK}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Tag attribute</string>
\t\t\t<key>scope</key>
\t\t\t<string>entity.other.attribute-name</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.GREEN}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>italic</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Library function</string>
\t\t\t<key>scope</key>
\t\t\t<string>support.function</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.GREEN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Library constant</string>
\t\t\t<key>scope</key>
\t\t\t<string>support.constant</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.PURPLE}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Library class/type</string>
\t\t\t<key>scope</key>
\t\t\t<string>support.type, support.class</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.CYAN}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>italic</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Library variable</string>
\t\t\t<key>scope</key>
\t\t\t<string>support.other.variable</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.FG}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Invalid</string>
\t\t\t<key>scope</key>
\t\t\t<string>invalid</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.FG}</string>
\t\t\t\t<key>background</key>
\t\t\t\t<string>${c.RED}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Invalid deprecated</string>
\t\t\t<key>scope</key>
\t\t\t<string>invalid.deprecated</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.FG}</string>
\t\t\t\t<key>background</key>
\t\t\t\t<string>${c.ORANGE}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>JSON String</string>
\t\t\t<key>scope</key>
\t\t\t<string>meta.structure.dictionary.json string.quoted.double.json</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.YELLOW}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>JSON Property</string>
\t\t\t<key>scope</key>
\t\t\t<string>support.type.property-name.json</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.CYAN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Markdown Heading</string>
\t\t\t<key>scope</key>
\t\t\t<string>markup.heading</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.GREEN}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>bold</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Markdown Bold</string>
\t\t\t<key>scope</key>
\t\t\t<string>markup.bold</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.ORANGE}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>bold</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Markdown Italic</string>
\t\t\t<key>scope</key>
\t\t\t<string>markup.italic</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.YELLOW}</string>
\t\t\t\t<key>fontStyle</key>
\t\t\t\t<string>italic</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Markdown Code</string>
\t\t\t<key>scope</key>
\t\t\t<string>markup.raw</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.GREEN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Markdown Link</string>
\t\t\t<key>scope</key>
\t\t\t<string>markup.underline.link</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.CYAN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Diff Header</string>
\t\t\t<key>scope</key>
\t\t\t<string>meta.diff, meta.diff.header</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.COMMENT}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Diff Deleted</string>
\t\t\t<key>scope</key>
\t\t\t<string>markup.deleted</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.RED}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Diff Inserted</string>
\t\t\t<key>scope</key>
\t\t\t<string>markup.inserted</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.GREEN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>Diff Changed</string>
\t\t\t<key>scope</key>
\t\t\t<string>markup.changed</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.ORANGE}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>CSS Property</string>
\t\t\t<key>scope</key>
\t\t\t<string>support.type.property-name.css</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.CYAN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>CSS Selector</string>
\t\t\t<key>scope</key>
\t\t\t<string>entity.other.attribute-name.class.css, entity.other.attribute-name.id.css</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.GREEN}</string>
\t\t\t</dict>
\t\t</dict>
\t\t<dict>
\t\t\t<key>name</key>
\t\t\t<string>JSX Component</string>
\t\t\t<key>scope</key>
\t\t\t<string>support.class.component</string>
\t\t\t<key>settings</key>
\t\t\t<dict>
\t\t\t\t<key>foreground</key>
\t\t\t\t<string>${c.CYAN}</string>
\t\t\t</dict>
\t\t</dict>
\t</array>
</dict>
</plist>
`;
}

/**
 * Main build function
 */
function build() {
  console.log('Building Stranger Theme for Sublime Text...\n');

  // Ensure themes directory exists
  if (!fs.existsSync(THEMES_DIR)) {
    fs.mkdirSync(THEMES_DIR, { recursive: true });
  }

  // Build each theme variant
  for (const [themeId, palette] of Object.entries(THEME_PALETTES)) {
    console.log(`Building ${palette.name}...`);
    
    const tmTheme = generateTmTheme(themeId, palette);
    const displayName = palette.displayName.replace(/ /g, '-');
    const outputFile = path.join(THEMES_DIR, `Stranger-Theme-${displayName}.tmTheme`);
    
    fs.writeFileSync(outputFile, tmTheme);
    console.log(`  -> ${outputFile}`);
  }

  console.log('\nBuild complete!');
}

// Run build
build();
