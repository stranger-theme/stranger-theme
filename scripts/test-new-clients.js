#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { THEME_PALETTES, getDerivedColors } = require('../shared/palettes');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const ansiNames = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

function snapshot(directories) {
  const files = {};
  function visit(directory) {
    for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else files[file] = read(file);
    }
  }
  directories.forEach(visit);
  return files;
}

const legacyDirectories = [
  'visual-studio-code/themes', 'jetbrains/src/main/resources/themes',
  'vim/colors', 'sublime-text/themes', 'terminal/alacritty', 'terminal/iterm2',
  'terminal/windows-terminal', 'hyper/themes'
];
const legacyBefore = snapshot(legacyDirectories);
const paletteBefore = read('shared/palettes.js');
const build = () => {
  for (const script of ['terminal/scripts/build.js', 'zed/scripts/build.js']) {
    execFileSync(process.execPath, [path.join(root, script)], { stdio: 'pipe' });
  }
};
build();

const variants = Object.entries(THEME_PALETTES);
assert.equal(variants.length, 6);
for (const [id] of variants) {
  const hyperPackage = JSON.parse(read(`hyper/themes/hyper-stranger-theme-${id}/package.json`));
  assert.equal(hyperPackage.version, require('../hyper/package.json').version, 'Hyper package version drift');
}
for (const [directory, extension] of [['ghostty', ''], ['kitty', '.conf'], ['wezterm', '.toml']]) {
  assert.deepEqual(fs.readdirSync(path.join(root, 'terminal', directory)).sort(),
    variants.map(([id]) => `stranger-theme-${id}${extension}`).sort());
}

const family = JSON.parse(read('zed/themes/stranger-theme.json'));
assert.equal(family.$schema, 'https://zed.dev/schema/themes/v0.2.0.json');
assert.equal(family.name, 'Stranger Theme');
assert.equal(family.author, 'Stranger Theme');
assert.deepEqual(family.themes.map(theme => theme.name), variants.map(([, palette]) => palette.name));

for (const [id, palette] of variants) {
  const c = getDerivedColors(palette.base);
  const expectedAnsi = [c.BG, c.RED, c.GREEN, c.YELLOW, c.PURPLE, c.PINK, c.CYAN, c.FG,
    c.COMMENT, c.ANSI_BRIGHT_RED, c.ANSI_BRIGHT_GREEN, c.ANSI_BRIGHT_YELLOW,
    c.ANSI_BRIGHT_BLUE, c.ANSI_BRIGHT_MAGENTA, c.ANSI_BRIGHT_CYAN, '#FFFFFF'];

  const ghostty = read(`terminal/ghostty/stranger-theme-${id}`).split('\n')
    .filter(line => line && !line.startsWith('#'));
  const ghosttyPalette = [];
  const ghosttyOptions = {};
  for (const line of ghostty) {
    const match = /^(palette|[a-z-]+) = (?:(\d+)=)?(#[0-9A-F]{6})$/.exec(line);
    assert.ok(match, `Invalid Ghostty line: ${line}`);
    if (match[1] === 'palette') {
      assert.equal(Number(match[2]), ghosttyPalette.length, `${id}: Ghostty ANSI order`);
      ghosttyPalette.push(match[3]);
    } else {
      assert.equal(match[2], undefined);
      ghosttyOptions[match[1]] = match[3];
    }
  }
  assert.deepEqual(ghosttyPalette, expectedAnsi, `${id}: Ghostty ANSI colors`);
  assert.deepEqual(ghosttyOptions, {
    background: c.BG, foreground: c.FG, 'cursor-color': c.FG, 'cursor-text': c.BG,
    'selection-background': c.SELECTION, 'selection-foreground': c.FG
  });

  const kitty = Object.fromEntries(read(`terminal/kitty/stranger-theme-${id}.conf`).split('\n')
    .filter(line => line && !line.startsWith('#')).map(line => {
      const match = /^([a-z_]+\d*) (#[0-9A-F]{6})$/.exec(line);
      assert.ok(match, `Invalid Kitty line: ${line}`);
      return match.slice(1);
    }));
  assert.deepEqual(Array.from({ length: 16 }, (_, index) => kitty[`color${index}`]), expectedAnsi,
    `${id}: Kitty ANSI colors`);
  assert.equal(Object.keys(kitty).length, 22);
  for (const [key, expected] of Object.entries({
    background: c.BG, foreground: c.FG, cursor: c.FG, cursor_text_color: c.BG,
    selection_background: c.SELECTION, selection_foreground: c.FG
  })) assert.equal(kitty[key], expected, `${id}: Kitty ${key}`);

  const wezterm = {};
  let section;
  for (const line of read(`terminal/wezterm/stranger-theme-${id}.toml`).split('\n')) {
    if (!line || line.startsWith('#')) continue;
    if (line === '[colors]' || line === '[metadata]') {
      section = line.slice(1, -1);
      wezterm[section] = {};
      continue;
    }
    const match = /^([a-z_]+) = (.+)$/.exec(line);
    assert.ok(match && section, `Invalid WezTerm TOML line: ${line}`);
    wezterm[section][match[1]] = JSON.parse(match[2]);
  }
  assert.deepEqual(wezterm.colors, {
    background: c.BG, foreground: c.FG, cursor_bg: c.FG, cursor_fg: c.BG, cursor_border: c.FG,
    selection_bg: c.SELECTION, selection_fg: c.FG,
    ansi: expectedAnsi.slice(0, 8), brights: expectedAnsi.slice(8)
  }, `${id}: WezTerm colors`);
  assert.deepEqual(wezterm.metadata, { name: palette.name, author: 'Stranger Theme' });

  const theme = family.themes.find(theme => theme.name === palette.name);
  assert.equal(theme.appearance, 'dark');
  const style = theme.style;
  for (const key of ['background', 'editor.background', 'editor.gutter.background',
    'terminal.background', 'terminal.ansi.background']) assert.equal(style[key], c.BG, `${id}: Zed ${key}`);
  for (const key of ['text', 'editor.foreground', 'terminal.foreground']) assert.equal(style[key], c.FG);
  assert.equal(style['editor.active_line.background'], c.LineHighlight);
  assert.deepEqual(style.players, [{ cursor: c.FG, background: c.FG, selection: c.SELECTION }]);
  const zedAnsiKeys = [...ansiNames, ...ansiNames.map(name => `bright_${name}`)];
  assert.deepEqual(zedAnsiKeys.map(name => style[`terminal.ansi.${name}`]), expectedAnsi, `${id}: Zed ANSI colors`);
  assert.equal(Object.keys(style).filter(key => key.startsWith('terminal.ansi.')).length, 17);
  for (const [token, color] of Object.entries({
    attribute: c.GREEN, boolean: c.PURPLE, comment: c.COMMENT, 'comment.doc': c.COMMENT,
    constant: c.ORANGE, constructor: c.CYAN, function: c.GREEN, keyword: c.PINK,
    number: c.ORANGE, operator: c.PINK, property: c.CYAN, punctuation: c.FG,
    string: c.YELLOW, 'string.escape': c.PINK, tag: c.PINK, type: c.CYAN, variable: c.FG
  })) assert.equal(style.syntax[token].color, color, `${id}: Zed syntax ${token}`);
  for (const [key, value] of Object.entries(style)) {
    if (key !== 'players' && key !== 'syntax') assert.match(value, /^#[0-9A-F]{6}$/);
  }
}

const newDirectories = ['terminal/ghostty', 'terminal/kitty', 'terminal/wezterm', 'zed/themes'];
const firstBuild = snapshot(newDirectories);
build();
assert.deepEqual(snapshot(newDirectories), firstBuild, 'New output must be deterministic');
assert.deepEqual(snapshot(legacyDirectories), legacyBefore, 'Existing theme assets must stay unchanged');
assert.equal(read('shared/palettes.js'), paletteBefore, 'Shared palettes must stay unchanged');
console.log('Validated six variants for Ghostty, Kitty, WezTerm and Zed, exact ANSI maps, deterministic builds, and unchanged legacy themes.');
