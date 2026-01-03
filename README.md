<div align="center">

<img src="./assets/stranger-theme-logo.png" alt="Stranger Theme Logo" width="256" />

</div>

# Stranger Theme

> 🔦 A dark theme collection inspired by the famous series Stranger Things

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

All 6 theme variants are built from shared color definitions:

| Color | Usage |
| --- | --- |
| Background | Editor/UI background |
| Foreground | Main text color |
| Selection | Selected text/UI elements |
| Comment | Comments and muted text |
| Cyan | Types, classes, tags |
| Green | Functions, strings |
| Orange | Numbers, constants, parameters |
| Pink | Keywords, tags, operators |
| Purple | Special keywords, numbers |
| Red | Errors, deletions |
| Yellow | Strings, warnings |

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
