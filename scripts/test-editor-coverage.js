#!/usr/bin/env node

// Coverage checks for the generated VS Code themes and JetBrains editor schemes.
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { THEME_PALETTES, getDerivedColors } = require('../shared/palettes');

const ANSI = ['BLACK', 'RED', 'GREEN', 'YELLOW', 'BLUE', 'MAGENTA', 'CYAN', 'WHITE'];
const pascalWord = w => w[0] + w.slice(1).toLowerCase();
// JetBrains console attribute for each ANSI_* key (normal, then bright).
const JB_ANSI = {
  BLACK: ['BLACK', 'DARKGRAY'], RED: ['RED', 'RED_BRIGHT'], GREEN: ['GREEN', 'GREEN_BRIGHT'],
  YELLOW: ['YELLOW', 'YELLOW_BRIGHT'], BLUE: ['BLUE', 'BLUE_BRIGHT'], MAGENTA: ['MAGENTA', 'MAGENTA_BRIGHT'],
  CYAN: ['CYAN', 'CYAN_BRIGHT'], WHITE: ['GRAY', 'WHITE']
};

const ROOT = path.join(__dirname, '..');
const HEX = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/;

const SEMANTIC_SELECTORS = [
  'parameter', 'property', 'enumMember', 'namespace', 'class', 'interface', 'type',
  'typeParameter', 'function', 'method', 'macro', 'decorator', 'variable.readonly',
  '*.defaultLibrary'
];

const COLOR_KEYS = [
  'editorWarning.foreground', 'problemsWarningIcon.foreground',
  'minimap.findMatchHighlight', 'minimapSlider.background',
  'editorInlayHint.foreground', 'editorInlayHint.parameterForeground',
  'testing.iconPassed', 'testing.iconFailed', 'testing.runAction', 'testing.peekBorder',
  'debugToolBar.background', 'debugIcon.breakpointForeground', 'debugConsole.errorForeground',
  'scmGraph.foreground1', 'notebook.cellBorderColor', 'symbolIcon.classForeground',
  'charts.red', 'editorGhostText.foreground', 'editorStickyScroll.background',
  'terminalCursor.foreground', 'sash.hoverBorder', 'mergeEditor.change.background',
  'gitDecoration.addedResourceForeground', 'gitDecoration.stageModifiedResourceForeground',
  'gitDecoration.stageDeletedResourceForeground', 'chat.requestBackground', 'inlineChat.background'
];

const WARNING_KEYS = [
  'editorWarning.foreground', 'editorOverviewRuler.warningForeground', 'list.warningForeground',
  'problemsWarningIcon.foreground', 'minimap.warningHighlight', 'debugConsole.warningForeground'
];

const JB_OPTIONS = [
  'CONSOLE_BLACK_OUTPUT', 'CONSOLE_GRAY_OUTPUT', 'CONSOLE_DARKGRAY_OUTPUT', 'CONSOLE_WHITE_OUTPUT',
  'CONSOLE_RED_BRIGHT_OUTPUT', 'CONSOLE_GREEN_BRIGHT_OUTPUT', 'CONSOLE_YELLOW_BRIGHT_OUTPUT',
  'CONSOLE_BLUE_BRIGHT_OUTPUT', 'CONSOLE_MAGENTA_BRIGHT_OUTPUT', 'CONSOLE_CYAN_BRIGHT_OUTPUT',
  'CONSOLE_SYSTEM_OUTPUT', 'CONSOLE_USER_INPUT',
  'INLAY_DEFAULT', 'INLAY_TEXT_WITHOUT_BACKGROUND', 'INLINE_PARAMETER_HINT',
  'INLINE_PARAMETER_HINT_CURRENT', 'INLINE_PARAMETER_HINT_HIGHLIGHTED',
  'BREAKPOINT_ATTRIBUTES', 'EXECUTIONPOINT_ATTRIBUTES', 'DEBUGGER_INLINED_VALUES',
  'DEBUGGER_INLINED_VALUES_MODIFIED', 'DEBUGGER_INLINED_VALUES_EXECUTION_LINE',
  'LOG_ERROR_OUTPUT', 'LOG_WARNING_OUTPUT', 'LOG_INFO_OUTPUT', 'LOG_DEBUG_OUTPUT',
  'LOG_VERBOSE_OUTPUT', 'LOG_EXPIRED_ENTRY', 'CODE_LENS_BORDER_COLOR'
];

function pascal(id) {
  return id.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('');
}

// Minimal well-formedness check for the scheme XML: every byte is a tag or text,
// attributes are double-quoted, tags nest and close, and there is one root element.
function assertWellFormedXml(xml, file) {
  const body = xml.replace(/^<\?xml[^?]*\?>\s*/, '');
  const token = /<(\/?)([A-Za-z_][\w.-]*)((?:\s+[\w.-]+="[^"<&]*")*)\s*(\/?)>|([^<]+)/gy;
  const stack = [];
  let roots = 0;
  let pos = 0;
  let m;
  while (pos < body.length && (m = token.exec(body))) {
    pos = token.lastIndex;
    const [, closing, name, , selfClosing, text] = m;
    if (text !== undefined) {
      assert.ok(stack.length || !text.trim(), `${file}: text outside the root element`);
      continue;
    }
    if (closing) {
      assert.equal(stack.pop(), name, `${file}: unexpected </${name}>`);
      continue;
    }
    if (!stack.length) roots++;
    if (!selfClosing) stack.push(name);
  }
  assert.equal(pos, body.length, `${file}: malformed markup at offset ${pos}`);
  assert.deepEqual(stack, [], `${file}: unclosed <${stack.at(-1)}>`);
  assert.equal(roots, 1, `${file}: expected one root element`);
}

let checked = 0;
for (const id of Object.keys(THEME_PALETTES)) {
  const file = `visual-studio-code/themes/${id}-color-theme.json`;
  const theme = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));

  assert.ok(theme.semanticTokenColors, `${file}: semanticTokenColors missing`);
  for (const sel of SEMANTIC_SELECTORS) {
    assert.ok(sel in theme.semanticTokenColors, `${file}: semantic selector ${sel} missing`);
  }
  for (const [sel, value] of Object.entries(theme.semanticTokenColors)) {
    const fg = typeof value === 'string' ? value : value.foreground;
    assert.match(fg, HEX, `${file}: semanticTokenColors ${sel} = ${fg}`);
  }
  for (const [key, value] of Object.entries(theme.colors)) {
    assert.match(value, HEX, `${file}: colors ${key} = ${value}`);
  }
  for (const key of COLOR_KEYS) {
    assert.ok(key in theme.colors, `${file}: ${key} missing`);
  }
  const warnings = new Set(WARNING_KEYS.map(k => theme.colors[k]));
  assert.equal(warnings.size, 1, `${file}: warning colours disagree: ${[...warnings].join(', ')}`);

  const scheme = `jetbrains/src/main/resources/themes/${pascal(id)}Scheme.xml`;
  const xml = fs.readFileSync(path.join(ROOT, scheme), 'utf8');
  assertWellFormedXml(xml, scheme);
  for (const name of JB_OPTIONS) {
    assert.ok(xml.includes(`<option name="${name}"`), `${scheme}: ${name} missing`);
  }

  // Terminal colours come from ANSI_*, chart (UI) colours from the base slots.
  const base = THEME_PALETTES[id].base;
  const c = getDerivedColors(base);
  for (const name of ANSI) {
    assert.equal(theme.colors[`terminal.ansi${pascalWord(name)}`], c[`ANSI_${name}`], `${file}: terminal.ansi${pascalWord(name)}`);
    assert.equal(theme.colors[`terminal.ansiBright${pascalWord(name)}`], c[`ANSI_BRIGHT_${name}`], `${file}: terminal.ansiBright${pascalWord(name)}`);
    JB_ANSI[name].forEach((option, bright) => {
      const hex = c[`ANSI_${bright ? 'BRIGHT_' : ''}${name}`].slice(1).toLowerCase();
      assert.ok(xml.includes(`<option name="CONSOLE_${option}_OUTPUT">\n      <value>\n        <option name="FOREGROUND" value="${hex}"/>`),
        `${scheme}: CONSOLE_${option}_OUTPUT is not ${hex}`);
    });
  }
  for (const [chart, slot] of Object.entries({ red: 'RED', blue: 'PURPLE', yellow: 'YELLOW', orange: 'ORANGE', green: 'GREEN', purple: 'PINK' })) {
    assert.equal(theme.colors[`charts.${chart}`], base[slot], `${file}: charts.${chart}`);
  }
  checked++;
}

console.log(`editor coverage OK for ${checked} variants`);
