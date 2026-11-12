# stranger-theme-palette

The six [Stranger Theme](https://github.com/stranger-theme/stranger-theme) palettes (Upside Down, Starcourt, Hawkins, The Lab, Tigers, Dimension X) for web pages and theme ports: JS data with types, CSS custom properties, a Tailwind colour map and Shiki themes.

```sh
npm install stranger-theme-palette
```

Variant ids: `upside-down`, `starcourt`, `hawkins`, `the-lab`, `tigers`, `dimension-x`.

## JavaScript and TypeScript

```js
import { palettes, variants } from 'stranger-theme-palette';
// const { palettes, variants } = require('stranger-theme-palette');

palettes.hawkins.base.PINK;        // '#D4A574'
palettes.hawkins.derived.BGLight;  // raised surface
palettes.hawkins.ansi.BRIGHT_RED;  // terminal colour 9
variants;                          // ['upside-down', 'starcourt', ...]
```

Each variant has `base` (BG, FG, SELECTION, COMMENT, CYAN, GREEN, ORANGE, PINK, PURPLE, RED, YELLOW), `derived` (WHITE, BLACK, LineHighlight, NonText, BGLighter, BGLight, BGDark, BGDarker) and `ansi` (the 16 terminal colours in order). Types `VariantId`, `BaseColorName`, `DerivedColorName`, `AnsiColorName` and `Variant` are exported. The raw data is also available as `stranger-theme-palette/palettes.json`.

Slots are roles, not hue names: keywords use PINK, functions GREEN, types CYAN, strings YELLOW, numbers PURPLE. See the [specification](https://github.com/stranger-theme/stranger-theme/blob/main/docs/SPEC.md).

## CSS custom properties

One variant on `:root`:

```css
@import 'stranger-theme-palette/css/hawkins.css';

body { background: var(--stranger-bg); color: var(--stranger-fg); }
a { color: var(--stranger-cyan); }
```

All six, switched with an attribute:

```css
@import 'stranger-theme-palette/css/all.css';
```

```html
<html data-stranger-theme="starcourt">
```

Variables: `--stranger-bg`, `--stranger-fg`, `--stranger-selection`, `--stranger-comment`, `--stranger-cyan`, `--stranger-green`, `--stranger-orange`, `--stranger-pink`, `--stranger-purple`, `--stranger-red`, `--stranger-yellow`, `--stranger-white`, `--stranger-black`, `--stranger-line-highlight`, `--stranger-non-text`, `--stranger-bg-lighter`, `--stranger-bg-light`, `--stranger-bg-dark`, `--stranger-bg-darker` and `--stranger-ansi-0` to `--stranger-ansi-15`.

## Tailwind CSS

`stranger-theme-palette/tailwind` exports `{ colors: { stranger: { <variant>: { ... } } } }` and does not import Tailwind:

```js
// tailwind.config.js
const stranger = require('stranger-theme-palette/tailwind');

module.exports = {
  theme: { extend: { colors: stranger.colors } }
};
```

```html
<div class="bg-stranger-hawkins-bg text-stranger-hawkins-pink">...</div>
```

Colour keys match the CSS variable names without the `--stranger-` prefix (`bg`, `pink`, `line-highlight`, `ansi-0`, ...). With Tailwind v4, import a CSS file above and reference the variables, for example `bg-(--stranger-bg)`.

## Shiki

`stranger-theme-palette/shiki/<variant>.json` is the VS Code theme and loads in Shiki as-is:

```js
import { createHighlighter } from 'shiki';
import hawkins from 'stranger-theme-palette/shiki/hawkins.json' with { type: 'json' };

const highlighter = await createHighlighter({ themes: [hawkins], langs: ['ts'] });
const html = highlighter.codeToHtml('const x = 1', { lang: 'ts', theme: hawkins.name });
```

## License

MIT
