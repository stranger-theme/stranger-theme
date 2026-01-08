<div align="center">

<img src="./assets/stranger-theme-logo.png" alt="Stranger Theme Logo" width="256" />

</div>

# Stranger Theme

> 🔦 A dark theme collection inspired by the famous series Stranger Things

<div align="center">

<a href="https://www.producthunt.com/products/stranger-theme?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-stranger-theme" target="_blank" rel="noopener noreferrer"><img alt="Stranger Theme - Turn your coding environment upside down | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1059824&amp;theme=neutral&amp;t=1767823358022"></a>

</div>

## Theme Variants

Stranger Theme comes in 6 distinct variants, each capturing the essence of different locations and dimensions from the series:

- **Upside Down** - Dark blue-black with desaturated tones
- **Starcourt** - Vibrant 80s mall aesthetic with neon colors
- **Hawkins** - Small-town America with warm, muted, autumnal colors
- **The Lab** - Clinical, institutional aesthetic with sterile colors
- **Tigers** - School colors with orange/black and vintage academic tones
- **Dimension X** - Dark red dimension with moody, organic textures

## Install

Choose your platform:

- [Visual Studio Code](./visual-studio-code)
- [JetBrains IDEs](./jetbrains) (IntelliJ IDEA, PyCharm, WebStorm, etc.)
- [Vim/Neovim](./vim)
- [Sublime Text](./sublime-text)
- [Terminal](./terminal) (Alacritty, iTerm2, Windows Terminal)
- [Hyper](./hyper)

Each platform directory contains installation instructions specific to that environment.

## Color Palette

All 6 theme variants are built from shared color definitions. The example below uses the Upside Down palette (see `shared/palettes.js` for all variants).

| Palette | Hex | RGB | HSL | Color Picker Boxes |
| --- | --- | --- | --- | --- |
| Background | `#0D1117` | 13 17 23 | 216° 28% 7% | <span style="background-color:#0D1117;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Current Line | `#2A3C4A` | 42 60 74 | 206° 28% 23% | <span style="background-color:#2A3C4A;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Selection | `#2A3C4A` | 42 60 74 | 206° 28% 23% | <span style="background-color:#2A3C4A;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Foreground | `#F8F8F2` | 248 248 242 | 60° 30% 96% | <span style="background-color:#F8F8F2;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Comment | `#5C6370` | 92 99 112 | 219° 10% 40% | <span style="background-color:#5C6370;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Cyan | `#56B6C2` | 86 182 194 | 187° 47% 55% | <span style="background-color:#56B6C2;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Green | `#98C379` | 152 195 121 | 95° 38% 62% | <span style="background-color:#98C379;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Orange | `#D19A66` | 209 154 102 | 29° 54% 61% | <span style="background-color:#D19A66;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Pink | `#C678DD` | 198 120 221 | 286° 60% 67% | <span style="background-color:#C678DD;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Purple | `#61AFEF` | 97 175 239 | 207° 82% 66% | <span style="background-color:#61AFEF;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Red | `#E06C75` | 224 108 117 | 355° 65% 65% | <span style="background-color:#E06C75;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |
| Yellow | `#E5C07B` | 229 192 123 | 39° 67% 69% | <span style="background-color:#E5C07B;display:inline-block;width:16px;height:16px;border:1px solid #000;"></span> |

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
