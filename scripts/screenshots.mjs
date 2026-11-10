#!/usr/bin/env node
// Renders README preview images from the generated VS Code themes:
// HTML mock of a VS Code window -> headless Chrome screenshot.
// Run: npm run screenshots   (needs Google Chrome; CHROME_PATH overrides the path)
// Regenerate on macOS: the mock uses system fonts, so other platforms produce different pixels.
// ImageMagick (`magick`) is optional and only makes the PNGs smaller.

import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, existsSync, statSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHighlighter } from 'shiki';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const THEMES_DIR = join(ROOT, 'visual-studio-code', 'themes');
const OUT_DIR = join(ROOT, 'assets', 'screenshots');
const SAMPLE = readFileSync(join(ROOT, 'scripts', 'screenshot-sample.ts'), 'utf8').replace(/\n$/, '');
const IDS = ['upside-down', 'starcourt', 'hawkins', 'the-lab', 'tigers', 'dimension-x'];
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const CURRENT_LINE = 24; // 1-based line with the cursor
const SELECTION = { line: 21, text: 'this.readings' }; // visible selection range

if (!existsSync(CHROME)) {
  console.error(`Google Chrome not found at "${CHROME}". Install it or set CHROME_PATH.`);
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// First key present in the theme wins; a missing chain is a bug in this script, not a reason to invent a color.
function palette(colors, fallbacksUsed) {
  return (...keys) => {
    const hit = keys.find((k) => colors[k]);
    if (!hit) throw new Error(`No color for any of: ${keys.join(', ')}`);
    if (hit !== keys[0]) fallbacksUsed.add(`${keys[0]} -> ${hit}`);
    return colors[hit];
  };
}

function codeHtml(lines) {
  const selStart = lines[SELECTION.line - 1].map((t) => t.content).join('').indexOf(SELECTION.text);
  if (selStart < 0) throw new Error(`Selection text not found on line ${SELECTION.line}`);
  const selEnd = selStart + SELECTION.text.length;

  return lines.map((tokens, i) => {
    const n = i + 1;
    let col = 0;
    let html = '';
    for (const t of tokens) {
      const style = [`color:${t.color}`];
      if (t.fontStyle & 1) style.push('font-style:italic');
      if (t.fontStyle & 2) style.push('font-weight:bold');
      if (t.fontStyle & 4) style.push('text-decoration:underline');
      const cut = n === SELECTION.line
        ? [0, selStart - col, selEnd - col, t.content.length].map((x) => Math.max(0, Math.min(t.content.length, x)))
        : [0, 0, 0, t.content.length];
      const parts = [t.content.slice(cut[0], cut[1]), t.content.slice(cut[1], cut[2]), t.content.slice(cut[2], cut[3])];
      parts.forEach((p, k) => {
        if (p) html += `<span class="${k === 1 ? 'sel' : ''}" style="${style.join(';')}">${esc(p)}</span>`;
      });
      col += t.content.length;
    }
    const cls = n === CURRENT_LINE ? 'line current' : 'line';
    const cursor = n === CURRENT_LINE ? '<span class="cursor"></span>' : '';
    return `<div class="${cls}"><span class="ln">${n}</span><span class="code">${cursor}${html || ' '}</span></div>`;
  }).join('');
}

const icon = {
  files: '<path d="M7 3h7l5 5v13H7z M14 3v5h5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
  branch: '<circle cx="7" cy="5" r="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="8" r="2"/><path d="M7 7v10M17 10c0 4-10 3-10 7"/>',
  debug: '<path d="M7 4l12 8-12 8z"/>',
  ext: '<path d="M4 4h7v7H4zM13 13h7v7h-7zM4 13h7v7H4zM15 3l5 5-5 5-5-5z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  account: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 15-5 16 0"/>',
};
const svg = (name, size = 24) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">${icon[name]}</svg>`;

function pageHtml(theme, lines) {
  const fallbacksUsed = new Set();
  const c = palette(theme.colors, fallbacksUsed);
  const name = theme.name.replace(/^Stranger Theme:\s*/, '');
  const ansi = (k) => c(`terminal.ansi${k}`);
  const ANSI = ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'];

  const fg = c('foreground', 'editor.foreground');
  const border = c('editorGroup.border', 'panel.border');
  const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1280px; height: 800px; overflow: hidden; background: ${c('editor.background')}; }
  body { font: 13px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; color: ${fg};
    display: grid; grid-template-rows: 30px 1fr 22px; -webkit-font-smoothing: antialiased; }
  .mono { font-family: Menlo, "SF Mono", Monaco, monospace; font-size: 13px; line-height: 18px; }
  .title { background: ${c('titleBar.activeBackground')}; color: ${c('titleBar.activeForeground')};
    display: flex; align-items: center; justify-content: center; position: relative; font-size: 12.5px;
    border-bottom: 1px solid ${c('titleBar.border', 'editorGroup.border')}; }
  .dots { position: absolute; left: 12px; display: flex; gap: 8px; }
  .dots i { width: 12px; height: 12px; border-radius: 50%; background: ${c('titleBar.inactiveForeground', 'titleBar.activeForeground')}; opacity: .55; }
  .main { display: grid; grid-template-columns: 48px 232px 1fr; min-height: 0; }
  .activity { background: ${c('activityBar.background')}; color: ${c('activityBar.inactiveForeground')};
    display: flex; flex-direction: column; align-items: center; padding-top: 4px; }
  .activity div { width: 48px; height: 48px; display: grid; place-items: center; position: relative; }
  .activity .on { color: ${c('activityBar.foreground')}; box-shadow: inset 2px 0 ${c('activityBar.activeBorder', 'activityBar.foreground')}; }
  .activity .badge { position: absolute; right: 7px; bottom: 8px; min-width: 16px; height: 16px; border-radius: 8px;
    font-size: 9px; line-height: 16px; text-align: center; font-weight: 600;
    background: ${c('activityBarBadge.background')}; color: ${c('activityBarBadge.foreground')}; }
  .activity .spacer { flex: 1; height: auto; }
  .side { background: ${c('sideBar.background')}; color: ${c('sideBar.foreground', 'foreground')};
    border-right: 1px solid ${c('sideBar.border', 'editorGroup.border')}; display: flex; flex-direction: column; }
  .side h2 { font-size: 11px; font-weight: 400; letter-spacing: .04em; padding: 0 20px; height: 35px; line-height: 35px;
    color: ${c('sideBarTitle.foreground')}; }
  .sect { font-size: 11px; font-weight: 700; height: 22px; line-height: 22px; padding-left: 6px;
    background: ${c('sideBarSectionHeader.background')}; color: ${c('sideBarSectionHeader.foreground', 'sideBarTitle.foreground')};
    border-top: 1px solid ${c('sideBarSectionHeader.border', 'editorGroup.border')}; }
  .tree { flex: 1; }
  .row { height: 22px; line-height: 22px; display: flex; gap: 6px; white-space: nowrap; }
  .row .chev { width: 10px; text-align: center; opacity: .8; }
  .row .ext { width: 14px; font-size: 10px; font-weight: 700; text-align: center; }
  .row .deco { margin-left: auto; padding-right: 14px; font-size: 11px; }
  .row.active { background: ${c('list.activeSelectionBackground')}; color: ${c('list.activeSelectionForeground')};
    outline: 1px solid ${c('list.focusOutline', 'focusBorder')}; outline-offset: -1px; }
  .row.hover { background: ${c('list.hoverBackground')}; }
  .mod { color: ${c('gitDecoration.modifiedResourceForeground')}; }
  .untr { color: ${c('gitDecoration.untrackedResourceForeground')}; }
  .ign { color: ${c('gitDecoration.ignoredResourceForeground')}; }
  .work { display: grid; grid-template-rows: 35px 22px 1fr 180px; min-width: 0; min-height: 0; }
  .tabs { background: ${c('editorGroupHeader.tabsBackground')}; display: flex; }
  .tab { width: 150px; display: flex; align-items: center; gap: 6px; padding: 0 12px; font-size: 13px;
    background: ${c('tab.inactiveBackground')}; color: ${c('tab.inactiveForeground')}; border-right: 1px solid ${c('tab.border')}; }
  .tab.on { background: ${c('tab.activeBackground')}; color: ${c('tab.activeForeground')};
    box-shadow: inset 0 1px ${c('tab.activeBorderTop', 'focusBorder')}; }
  .tab .x { margin-left: auto; opacity: .7; }
  .crumbs { background: ${c('breadcrumb.background', 'editor.background')}; color: ${c('breadcrumb.foreground')};
    padding-left: 16px; line-height: 22px; font-size: 12.5px; }
  .crumbs b { font-weight: 400; color: ${c('breadcrumb.focusForeground', 'breadcrumb.foreground')}; }
  .editor { background: ${c('editor.background')}; color: ${c('editor.foreground')}; overflow: hidden; position: relative; }
  .line { height: 18px; display: flex; white-space: pre; }
  .ln { width: 58px; padding-right: 22px; text-align: right; color: ${c('editorLineNumber.foreground')}; flex: none; }
  .current { box-shadow: inset 0 0 0 2px ${c('editor.lineHighlightBorder', 'editor.lineHighlightBackground')};
    ${theme.colors['editor.lineHighlightBackground'] ? `background: ${theme.colors['editor.lineHighlightBackground']};` : ''} }
  .current .ln { color: ${c('editorLineNumber.activeForeground')}; }
  .code { position: relative; }
  .sel { background: ${c('editor.selectionBackground')}; }
  .cursor { position: absolute; left: ${'    this.emit'.length}ch; top: 0; width: 2px; height: 18px;
    background: ${c('editorCursor.foreground', 'editor.foreground')}; }
  .panel { background: ${c('panel.background')}; border-top: 1px solid ${c('panel.border')}; display: flex; flex-direction: column; }
  .ptabs { height: 35px; display: flex; gap: 22px; padding-left: 20px; align-items: center; font-size: 11px; letter-spacing: .04em;
    color: ${c('panelTitle.inactiveForeground')}; }
  .ptabs .on { color: ${c('panelTitle.activeForeground')}; box-shadow: 0 1px ${c('panelTitle.activeBorder')}; padding-bottom: 3px; }
  .term { background: ${c('terminal.background', 'panel.background')}; color: ${c('terminal.foreground')}; padding: 2px 20px; flex: 1; white-space: pre; }
  .term .sw { display: inline-block; width: 26px; height: 13px; margin-right: 4px; vertical-align: -2px; border-radius: 2px; }
  .term .block { display: inline-block; width: 8px; height: 15px; vertical-align: -3px; background: ${c('terminalCursor.foreground', 'terminal.foreground')}; }
  .status { background: ${c('statusBar.background')}; color: ${c('statusBar.foreground')}; display: flex; font-size: 12px;
    line-height: 22px; border-top: 1px solid ${c('statusBar.border', 'statusBar.background')}; }
  .status span { padding: 0 9px; white-space: nowrap; }
  .status .remote { background: ${c('statusBarItem.remoteBackground')}; color: ${c('statusBarItem.remoteForeground')}; padding: 0 12px; }
  .status .grow { flex: 1; }
  .status .theme { background: ${c('statusBarItem.prominentBackground')}; font-weight: 600; }
  `;

  const t = (k, s, extra = '') => `<span style="color:${ansi(k)};${extra}">${esc(s)}</span>`;
  const swatches = (prefix) => ANSI.map((k) => `<span class="sw" style="background:${ansi(prefix + k)}"></span>`).join('');
  const prompt = `${t('Green', 'radio-kit')} ${t('Blue', 'git:(')}${t('Red', 'main')}${t('Blue', ')')} ${t('Magenta', '$')} `;
  const terminal = [
    `${prompt}npm test`,
    `${t('Black', ' PASS ', `background:${ansi('Green')};font-weight:bold`)} ${t('BrightBlack', 'src/')}${t('BrightWhite', 'channel.test.ts', 'font-weight:bold')}`,
    `  ${t('Green', '✓')} ${t('White', 'scans clean readings')} ${t('BrightBlack', '(12 ms)')}`,
    `  ${t('BrightGreen', '✓')} ${t('White', 'rejects a bad callsign')} ${t('BrightBlack', '(3 ms)')}`,
    `  ${t('Yellow', '○')} ${t('BrightYellow', 'skipped')} ${t('White', 'muted channel')}  ${t('BrightRed', '⚠')} ${t('Red', '1 deprecation')}`,
    `${t('BrightWhite', 'Tests:', 'font-weight:bold')} ${t('BrightGreen', '2 passed')}, ${t('BrightYellow', '1 skipped')}  ${t('Cyan', 'Time:')} ${t('BrightCyan', '0.84 s')}  ${t('BrightBlue', 'Coverage:')} ${t('BrightMagenta', '91.2%')}`,
    `${prompt}${swatches('')} ${swatches('Bright')}<span class="block"></span>`,
  ].join('\n');

  const rows = [
    ['▸', '', '.github', ''],
    ['▾', '', 'src', ''],
    ['', 'TS', 'channel.ts', 'M', 'active mod'],
    ['', 'TS', 'channel.test.ts', 'U', 'untr'],
    ['', 'TS', 'types.ts', ''],
    ['▸', '', 'node_modules', '', 'ign'],
    ['', '{}', 'package.json', '', 'hover'],
    ['', 'TS', 'tsconfig.json', ''],
    ['', 'ⓘ', 'README.md', ''],
  ];
  const tree = rows.map(([chev, ext, label, deco, cls = '']) => {
    const indent = ext && label !== 'package.json' && label !== 'tsconfig.json' && label !== 'README.md' ? 36 : 20;
    const extColor = ext === 'TS' ? c('terminal.ansiBlue') : c('terminal.ansiYellow');
    return `<div class="row ${cls}" style="padding-left:${chev ? 8 : indent}px">${chev ? `<span class="chev">${chev}</span>` : ''}`
      + `${ext ? `<span class="ext" style="color:${extColor}">${ext}</span>` : ''}<span>${label}</span>`
      + `${deco ? `<span class="deco">${deco}</span>` : ''}</div>`;
  }).join('');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(name)}</title><style>${css}</style></head><body>
<div class="title"><div class="dots"><i></i><i></i><i></i></div>channel.ts — radio-kit — ${esc(theme.name)}</div>
<div class="main">
  <div class="activity">
    <div class="on">${svg('files')}</div><div>${svg('search')}</div><div>${svg('branch')}<span class="badge">2</span></div>
    <div>${svg('debug')}</div><div>${svg('ext')}</div><div class="spacer"></div><div>${svg('account')}</div><div>${svg('gear')}</div>
  </div>
  <div class="side">
    <h2>EXPLORER</h2>
    <div class="sect">▾ RADIO-KIT</div>
    <div class="tree">${tree}</div>
    <div class="sect">▸ OUTLINE</div>
    <div class="sect">▸ TIMELINE</div>
  </div>
  <div class="work">
    <div class="tabs">
      <div class="tab on"><span style="color:${c('terminal.ansiBlue')};font-size:10px;font-weight:700">TS</span>channel.ts<span class="x">×</span></div>
      <div class="tab"><span style="color:${c('terminal.ansiBlue')};font-size:10px;font-weight:700">TS</span>types.ts</div>
    </div>
    <div class="crumbs">src › channel.ts › <b>Channel</b> › scan</div>
    <div class="editor mono">${codeHtml(lines)}</div>
    <div class="panel">
      <div class="ptabs"><span>PROBLEMS</span><span>OUTPUT</span><span>DEBUG CONSOLE</span><span class="on">TERMINAL</span></div>
      <div class="term mono">${terminal}</div>
    </div>
  </div>
</div>
<div class="status">
  <span class="remote">⇄</span><span>⎇ main*</span><span>⊗ 0 ⚠ 1</span><span class="grow"></span>
  <span>Ln ${CURRENT_LINE}, Col 14</span><span>Spaces: 2</span><span>UTF-8</span><span>LF</span><span>TypeScript</span>
  <span class="theme">${esc(theme.name)}</span>
</div>
</body></html>`;
  return { html, fallbacksUsed };
}

const themes = IDS.map((id) => {
  const theme = JSON.parse(readFileSync(join(THEMES_DIR, `${id}-color-theme.json`), 'utf8'));
  return { id, theme };
});
const highlighter = await createHighlighter({ themes: themes.map((x) => x.theme), langs: ['typescript'] });
const hasMagick = (() => { try { execFileSync('magick', ['-version'], { stdio: 'ignore' }); return true; } catch { return false; } })();

mkdirSync(OUT_DIR, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'stranger-shots-'));
try {
  for (const { id, theme } of themes) {
    const { tokens } = highlighter.codeToTokens(SAMPLE, { lang: 'typescript', theme: theme.name });
    const { html, fallbacksUsed } = pageHtml(theme, tokens);
    const htmlPath = join(tmp, `${id}.html`);
    const out = join(OUT_DIR, `${id}.png`);
    writeFileSync(htmlPath, html);
    rmSync(out, { force: true });
    // Chrome logs harmless noise on stderr every run, so it is shown only when the render fails.
    const chrome = spawnSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
      '--disable-background-networking', '--disable-extensions', `--user-data-dir=${join(tmp, 'profile')}`,
      '--force-device-scale-factor=2', '--window-size=1280,800', `--screenshot=${out}`, pathToFileURL(htmlPath).href,
    ], { stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8', timeout: 60_000 });
    if (chrome.error || chrome.status !== 0 || !existsSync(out)) {
      throw new Error(`Chrome did not render ${id} (exit ${chrome.status}): ${chrome.error?.message ?? ''}\n${chrome.stderr ?? ''}`);
    }
    if (hasMagick) execFileSync('magick', [out, '-strip', '-define', 'png:compression-level=9', '-define', 'png:compression-filter=2', out]);
    const kb = Math.round(statSync(out).size / 1024);
    const fb = fallbacksUsed.size ? `  fallbacks: ${[...fallbacksUsed].join(', ')}` : '';
    console.log(`✓ ${id}.png (${kb} KB)${fb}`);
  }
} finally {
  highlighter.dispose();
  rmSync(tmp, { recursive: true, force: true });
}
