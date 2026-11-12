#!/usr/bin/env node

/**
 * Build script for Stranger Theme - tmux
 * Generates themes/stranger-theme-<variant>.conf from shared palettes
 */

const fs = require('fs');
const path = require('path');
const { THEME_PALETTES, getDerivedColors } = require('../../shared/palettes');

const OUTPUT_DIR = path.join(__dirname, '..', 'themes');

function generateTmuxTheme(palette) {
  const c = getDerivedColors(palette.base);
  return `# ${palette.name} for tmux
set -g status-style "fg=${c.FG},bg=${c.BGDark}"
set -g status-left-style "fg=${c.BG},bg=${c.PINK},bold"
set -g status-right-style "fg=${c.BG},bg=${c.PURPLE}"
set -g window-status-style "fg=${c.COMMENT},bg=${c.BGDark}"
set -g window-status-current-style "fg=${c.BG},bg=${c.CYAN},bold"
set -g pane-border-style "fg=${c.SELECTION}"
set -g pane-active-border-style "fg=${c.PINK}"
set -g message-style "fg=${c.FG},bg=${c.SELECTION}"
set -g message-command-style "fg=${c.FG},bg=${c.SELECTION}"
set -g mode-style "fg=${c.FG},bg=${c.SELECTION}"
set -g clock-mode-colour "${c.PINK}"
`;
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
for (const [themeId, palette] of Object.entries(THEME_PALETTES)) {
  const file = path.join(OUTPUT_DIR, `stranger-theme-${themeId}.conf`);
  fs.writeFileSync(file, generateTmuxTheme(palette));
  console.log(`  -> ${file}`);
}
