<div align="center">

<img src="./assets/stranger-theme-banner.png" alt="Stranger Theme: six dark variants for 12 editors and terminals" width="100%" />

</div>

# Stranger Theme

> 🔦 A dark theme collection inspired by the famous series Stranger Things

<div align="center">

<a href="https://www.producthunt.com/products/stranger-theme?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-stranger-theme" target="_blank" rel="noopener noreferrer"><img alt="Stranger Theme - Turn your coding environment upside down | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1059824&amp;theme=neutral&amp;t=1767823358022"></a>

</div>

## Theme Variants

Stranger Theme comes in 6 distinct variants, each capturing the essence of different locations and dimensions from the series:

<table>
  <tr>
    <td width="50%" valign="top">
      <img src="./assets/screenshots/upside-down.png" alt="Upside Down variant: editor, file explorer and terminal on a blue-black background" />
      <br /><strong>Upside Down</strong><br />Dark blue-black with desaturated tones
    </td>
    <td width="50%" valign="top">
      <img src="./assets/screenshots/starcourt.png" alt="Starcourt variant: editor, file explorer and terminal in neon pink, cyan and yellow on deep navy" />
      <br /><strong>Starcourt</strong><br />Vibrant 80s mall aesthetic with neon colors
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="./assets/screenshots/hawkins.png" alt="Hawkins variant: editor, file explorer and terminal in muted autumn tones on warm brown" />
      <br /><strong>Hawkins</strong><br />Small-town America with warm, muted, autumnal colors
    </td>
    <td width="50%" valign="top">
      <img src="./assets/screenshots/the-lab.png" alt="The Lab variant: editor, file explorer and terminal in saturated primary colors on slate" />
      <br /><strong>The Lab</strong><br />Clinical, institutional aesthetic with sterile colors
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="./assets/screenshots/tigers.png" alt="Tigers variant: editor, file explorer and terminal with orange accents on green-black" />
      <br /><strong>Tigers</strong><br />School colors with orange/black and vintage academic tones
    </td>
    <td width="50%" valign="top">
      <img src="./assets/screenshots/dimension-x.png" alt="Dimension X variant: editor, file explorer and terminal in reds and browns on near-black" />
      <br /><strong>Dimension X</strong><br />Dark red dimension with moody, organic textures
    </td>
  </tr>
</table>

<sub>Previews are rendered from the generated VS Code theme files with <code>npm run screenshots</code>.</sub>

## Install

Choose your platform:

- [Visual Studio Code](./visual-studio-code)
- [JetBrains IDEs](./jetbrains) (IntelliJ IDEA, PyCharm, WebStorm, etc.)
- [Vim/Neovim](./vim)
- [Sublime Text](./sublime-text)
- [Terminal](./terminal) (Alacritty, iTerm2, Windows Terminal, Ghostty, Kitty, WezTerm)
- [Hyper](./hyper)
- [Zed](./zed)

Each platform directory contains installation instructions specific to that environment.

## Color Palette

All 6 theme variants are built from shared color definitions. The example below uses the Upside Down palette (see `shared/palettes.js` for all variants).

| Palette | Hex | RGB | HSL | Swatch |
| --- | --- | --- | --- | --- |
| Background | `#0D1117` | 13 17 23 | 216° 28% 7% | <img src="assets/palette/0D1117.svg" width="16" height="16" alt="#0D1117"> |
| Current Line | `#21252B` | 33 37 43 | 216° 13% 15% | <img src="assets/palette/21252B.svg" width="16" height="16" alt="#21252B"> |
| Selection | `#2A3C4A` | 42 60 74 | 206° 28% 23% | <img src="assets/palette/2A3C4A.svg" width="16" height="16" alt="#2A3C4A"> |
| Foreground | `#F8F8F2` | 248 248 242 | 60° 30% 96% | <img src="assets/palette/F8F8F2.svg" width="16" height="16" alt="#F8F8F2"> |
| Comment | `#7A8495` | 122 132 149 | 218° 11% 53% | <img src="assets/palette/7A8495.svg" width="16" height="16" alt="#7A8495"> |
| Cyan | `#56B6C2` | 86 182 194 | 187° 47% 55% | <img src="assets/palette/56B6C2.svg" width="16" height="16" alt="#56B6C2"> |
| Green | `#98C379` | 152 195 121 | 95° 38% 62% | <img src="assets/palette/98C379.svg" width="16" height="16" alt="#98C379"> |
| Orange | `#D19A66` | 209 154 102 | 29° 54% 61% | <img src="assets/palette/D19A66.svg" width="16" height="16" alt="#D19A66"> |
| Pink | `#C678DD` | 198 120 221 | 286° 60% 67% | <img src="assets/palette/C678DD.svg" width="16" height="16" alt="#C678DD"> |
| Purple | `#61AFEF` | 97 175 239 | 207° 82% 66% | <img src="assets/palette/61AFEF.svg" width="16" height="16" alt="#61AFEF"> |
| Red | `#E06C75` | 224 108 117 | 355° 65% 65% | <img src="assets/palette/E06C75.svg" width="16" height="16" alt="#E06C75"> |
| Yellow | `#E5C07B` | 229 192 123 | 39° 67% 69% | <img src="assets/palette/E5C07B.svg" width="16" height="16" alt="#E5C07B"> |

## Development

### Building Themes

All themes are generated from shared color palettes in `shared/palettes.js`:

```bash
# Build all platforms
npm run build

# Build specific platforms
npm run build:vscode
npm run build:jetbrains
npm run build:vim
npm run build:sublime
npm run build:terminal
npm run build:hyper
npm run build:zed

# Validate the four new clients, all six variants, and unchanged legacy output
npm test

# Re-render the README previews after a palette change (macOS + Google Chrome; run `npm install` first)
npm run screenshots
```

### Adding a New Variant

1. Add the new palette to `shared/palettes.js`
2. Run `npm run build` from the root directory
3. All platforms will automatically generate the new variant

For detailed architecture and development guidelines, see [CLAUDE.md](./CLAUDE.md).

## Contributing

Contributions are welcome! See our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Setting up your development environment
- Making changes to themes
- Submitting pull requests
- Adding support for new platforms

## Team

This theme is maintained by [@tcvieira](https://github.com/tcvieira) and [contributors](https://github.com/stranger-theme/stranger-theme/graphs/contributors).

## License

[MIT License](./LICENSE) © Stranger Theme
