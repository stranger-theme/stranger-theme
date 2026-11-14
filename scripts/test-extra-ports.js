#!/usr/bin/env node

// Checks the Gogh scheme files and the Helix, tmux, Warp, macOS Terminal and Windows Terminal fragment outputs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { THEME_PALETTES, getDerivedColors, hexToNormalizedRgb } = require('../shared/palettes');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const list = dir => fs.readdirSync(path.join(root, dir)).sort();
const HEX = /^#[0-9A-F]{6}$/;
const ANSI = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
const variants = Object.entries(THEME_PALETTES);
const snake = id => id.replace(/-/g, '_');
const title = palette => palette.displayName.replace(/ /g, '-');
assert.equal(variants.length, 6);

assert.deepEqual(list('helix/themes'), variants.map(([id]) => `stranger_${snake(id)}.toml`).sort());
assert.deepEqual(list('tmux/themes'), variants.map(([id]) => `stranger-theme-${id}.conf`).sort());
assert.deepEqual(list('terminal/warp'), variants.map(([id]) => `stranger_theme_${snake(id)}.yaml`).sort());
assert.deepEqual(list('terminal/terminal-app'), variants.map(([, p]) => `Stranger-Theme-${title(p)}.terminal`).sort());

for (const [id, palette] of variants) {
  const c = getDerivedColors(palette.base);
  const allowed = new Set(Object.values(c).filter(value => HEX.test(value)));
  const fromPalette = (hex, where) => {
    assert.match(hex, HEX, `${where}: invalid hex ${hex}`);
    assert.ok(allowed.has(hex), `${where}: ${hex} is not in the ${id} palette`);
  };
  const normal = ANSI.map(name => c[`ANSI_${name.toUpperCase()}`]);
  const bright = ANSI.map(name => c[`ANSI_BRIGHT_${name.toUpperCase()}`]);

  // Helix: strict TOML lines, [palette] last, every style colour is a palette name.
  const [scopeText, paletteText] = read(`helix/themes/stranger_${snake(id)}.toml`).split('\n[palette]\n');
  assert.ok(paletteText, `${id}: Helix [palette] table missing`);
  const helixPalette = Object.create(null);
  for (const line of paletteText.trim().split('\n')) {
    const match = /^([a-z_]+) = "(#[0-9A-F]{6})"$/.exec(line);
    assert.ok(match, `${id}: invalid Helix palette line: ${line}`);
    fromPalette(match[2], `${id} Helix palette ${match[1]}`);
    helixPalette[match[1]] = match[2];
  }
  assert.equal(helixPalette.bg, c.BG);
  assert.equal(helixPalette.fg, c.FG);
  const scopes = Object.create(null);
  for (const line of scopeText.split('\n').filter(line => line && !line.startsWith('#'))) {
    const match = /^"([a-z][a-z0-9.-]*)" = (".+"|\{ .+ \})$/.exec(line);
    assert.ok(match, `${id}: invalid Helix scope line: ${line}`);
    assert.equal(scopes[match[1]], undefined, `${id}: duplicate Helix scope ${match[1]}`);
    scopes[match[1]] = match[2];
    const names = match[2].startsWith('"') ? [match[2].slice(1, -1)]
      : [...match[2].matchAll(/\b(?:fg|bg|color) = "([^"]+)"/g)].map(m => m[1]);
    for (const name of names) assert.ok(helixPalette[name], `${id}: Helix ${match[1]} uses unknown colour ${name}`);
  }
  for (const scope of ['ui.background', 'ui.text', 'ui.selection', 'ui.cursorline.primary', 'ui.linenr',
    'ui.statusline', 'ui.popup', 'ui.menu', 'diagnostic.error', 'diagnostic.warning', 'diff.plus', 'diff.minus',
    'diff.delta', 'markup.heading', 'keyword', 'function', 'type', 'string', 'constant', 'comment', 'variable',
    'operator', 'punctuation', 'tag', 'attribute', 'namespace']) {
    assert.ok(scopes[scope], `${id}: Helix scope ${scope} missing`);
  }
  assert.equal(scopes['ui.background'], '{ bg = "bg" }');
  for (const scope of ['ui.cursor', 'ui.selection']) {
    assert.ok(scopes[`${scope}.primary`], `${id}: Helix ${scope}.primary missing`);
    const bg = style => helixPalette[/bg = "([^"]+)"/.exec(style)[1]];
    assert.notEqual(bg(scopes[`${scope}.primary`]), bg(scopes[scope]), `${id}: Helix ${scope}.primary must differ from ${scope}`);
  }
  assert.ok(scopeText.startsWith('# Author : Stranger Theme <contact@strangertheme.com>\n# License: MIT\n'),
    `${id}: Helix author/licence header`);

  // tmux: only `set -g option "value"` lines with palette colours.
  const tmux = {};
  for (const line of read(`tmux/themes/stranger-theme-${id}.conf`).split('\n').filter(l => l && !l.startsWith('#'))) {
    const match = /^set -g ([a-z-]+) "([^"]+)"$/.exec(line);
    assert.ok(match, `${id}: invalid tmux line: ${line}`);
    for (const hex of match[2].match(/#[0-9A-Fa-f]+/g) || []) fromPalette(hex, `${id} tmux ${match[1]}`);
    tmux[match[1]] = match[2];
  }
  for (const option of ['status-style', 'status-left-style', 'status-right-style', 'window-status-style',
    'window-status-current-style', 'pane-border-style', 'pane-active-border-style', 'message-style',
    'mode-style', 'clock-mode-colour']) assert.ok(tmux[option], `${id}: tmux ${option} missing`);

  // Warp: strict YAML lines, ANSI order from getDerivedColors.
  const warp = { normal: {}, bright: {} };
  let block;
  for (const line of read(`terminal/warp/stranger_theme_${snake(id)}.yaml`).split('\n').filter(l => l && !l.startsWith('#'))) {
    let match;
    if (line === 'terminal_colors:') warp.terminal_colors = true;
    else if ((match = /^ {2}(normal|bright):$/.exec(line))) {
      assert.ok(warp.terminal_colors, `${id}: Warp ${match[1]} outside terminal_colors`);
      block = match[1];
    }
    else if ((match = /^ {4}([a-z]+): '(#[0-9A-F]{6})'$/.exec(line))) {
      assert.ok(block, `${id}: Warp colour outside a block`);
      fromPalette(match[2], `${id} Warp ${block}.${match[1]}`);
      warp[block][match[1]] = match[2];
    } else if ((match = /^([a-z_]+): (.+)$/.exec(line))) warp[match[1]] = match[2];
    else assert.fail(`${id}: invalid Warp line: ${line}`);
  }
  assert.equal(warp.name, `'${palette.name}'`);
  assert.equal(warp.background, `'${c.BG}'`);
  assert.equal(warp.foreground, `'${c.FG}'`);
  assert.match(warp.accent, /^'#[0-9A-F]{6}'$/);
  assert.ok(['darker', 'lighter'].includes(warp.details));
  assert.deepEqual(Object.keys(warp.normal), ANSI);
  assert.deepEqual(Object.values(warp.normal), normal, `${id}: Warp normal ANSI`);
  assert.deepEqual(Object.values(warp.bright), bright, `${id}: Warp bright ANSI`);

  // macOS Terminal: every <data> is a keyed NSColor archive holding the expected sRGB components.
  const profile = read(`terminal/terminal-app/Stranger-Theme-${title(palette)}.terminal`);
  assert.match(profile, new RegExp(`<key>name</key>\\n\\t<string>${palette.name}</string>`));
  assert.match(profile, /<key>type<\/key>\n\t<string>Window Settings<\/string>/);
  const colors = Object.fromEntries([...profile.matchAll(/<key>(\w+)<\/key>\n\t<data>([A-Za-z0-9+/=]+)<\/data>/g)]
    .map(([, key, data]) => {
      const archive = Buffer.from(data, 'base64').toString('utf8');
      assert.match(archive, /<string>NSKeyedArchiver<\/string>/);
      assert.match(archive, /<key>NSID<\/key><integer>7<\/integer>/, `${id}: ${key} must be sRGB`);
      const rgb = Buffer.from(/<key>NSRGB<\/key><data>([^<]+)<\/data>/.exec(archive)[1], 'base64').toString('latin1');
      assert.ok(rgb.endsWith('\0'));
      return [key, rgb.slice(0, -1)];
    }));
  const asComponents = hex => Object.values(hexToNormalizedRgb(hex)).join(' ');
  const expected = { BackgroundColor: c.BG, TextColor: c.FG, TextBoldColor: c.FG, CursorColor: c.FG, SelectionColor: c.SELECTION };
  ANSI.forEach((name, index) => {
    const key = name[0].toUpperCase() + name.slice(1);
    expected[`ANSI${key}Color`] = normal[index];
    expected[`ANSIBright${key}Color`] = bright[index];
  });
  assert.deepEqual(Object.keys(colors).sort(), Object.keys(expected).sort(), `${id}: Terminal.app colour keys`);
  for (const [key, hex] of Object.entries(expected)) {
    fromPalette(hex, `${id} Terminal.app ${key}`);
    assert.equal(colors[key], asComponents(hex), `${id}: Terminal.app ${key}`);
  }
}

// Windows Terminal fragment: six uniquely named schemes, identical to the per-variant files.
const fragment = JSON.parse(read('terminal/windows-terminal/fragment/stranger-theme.json'));
assert.deepEqual(Object.keys(fragment), ['schemes']);
assert.equal(fragment.schemes.length, 6);
assert.equal(new Set(fragment.schemes.map(scheme => scheme.name)).size, 6, 'Fragment scheme names must be unique');
for (const [id, palette] of variants) {
  const scheme = fragment.schemes.find(s => s.name === palette.name);
  assert.deepEqual(scheme, JSON.parse(read(`terminal/windows-terminal/stranger-theme-${id}.json`)), `${id}: fragment scheme`);
  const allowed = new Set(Object.values(getDerivedColors(palette.base)));
  for (const [key, value] of Object.entries(scheme)) {
    if (key !== 'name') assert.ok(HEX.test(value) && allowed.has(value), `${id}: fragment ${key} ${value}`);
  }
}

// Gogh: filename equals name, no underscore, dark, 19 uppercase colours from the derived ANSI palette.
assert.deepEqual(list('aggregators/gogh'), variants.map(([, p]) => `Stranger Theme ${p.displayName}.yml`).sort());
for (const [id, palette] of variants) {
  const c = getDerivedColors(palette.base);
  const ansi = [...ANSI.map(n => c[`ANSI_${n.toUpperCase()}`]), ...ANSI.map(n => c[`ANSI_BRIGHT_${n.toUpperCase()}`])];
  const file = `Stranger Theme ${palette.displayName}.yml`;
  const gogh = Object.fromEntries([...read(`aggregators/gogh/${file}`).matchAll(/^(\w+): '([^']*)'/gm)].map(m => m.slice(1)));
  assert.equal(`${gogh.name}.yml`, file, `${id}: Gogh filename must equal name`);
  assert.ok(!gogh.name.includes('_'), `${id}: Gogh name has an underscore`);
  assert.equal(gogh.variant, 'dark');
  assert.equal(gogh.author_name, 'Stranger Theme');
  assert.equal(gogh.author_url, 'https://strangertheme.com');
  const expected = Object.fromEntries([...ansi.map((hex, i) => [`color_${String(i + 1).padStart(2, '0')}`, hex]),
    ['background', c.BG], ['foreground', c.FG], ['cursor', c.FG]]);
  for (const [key, hex] of Object.entries(expected)) {
    assert.match(gogh[key] || '', HEX, `${id}: Gogh ${key} must be uppercase #RRGGBB`);
    assert.equal(gogh[key], hex.toUpperCase(), `${id}: Gogh ${key}`);
  }
}

console.log('Validated Gogh, Helix, tmux, Warp, macOS Terminal and the Windows Terminal fragment for six variants.');
