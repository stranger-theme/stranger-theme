<div align="center">

<img src="../assets/stranger-theme-logo.png" alt="Stranger Theme Logo" width="256" />

</div>

# Stranger Theme for Visual Studio Code

> 🔦 A dark theme collection inspired by the famous series Stranger Things

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/stranger-theme.stranger-theme?style=flat-square&label=Version&logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=stranger-theme.stranger-theme)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/stranger-theme.stranger-theme?style=flat-square&label=Downloads)](https://marketplace.visualstudio.com/items?itemName=stranger-theme.stranger-theme)
[![License](https://img.shields.io/github/license/stranger-theme/visual-studio-code?style=flat-square)](./LICENSE)

## Install

#### Extension Marketplace

1. Open **Extensions** sidebar: `View → Extensions`
2. Search for `Stranger Theme`
3. Click **Install** → **Reload**
4. Open **Command Palette**: `Cmd/Ctrl + Shift + P`
5. Type **Color Theme** and select your preferred variant

#### Command Line

```bash
code --install-extension stranger-theme.stranger-theme
```

## Theme Variants

- **Upside Down** - Dark blue-black with desaturated tones
- **Starcourt** - Vibrant 80s mall aesthetic with neon colors
- **Hawkins** - Small-town America with warm, muted, autumnal colors
- **The Lab** - Clinical, institutional aesthetic with sterile colors
- **Tigers** - School colors with orange/black and vintage academic tones
- **Dimension X** - Dark red dimension with moody, organic textures

## Development

### Building from Source

```bash
npm install
npm run build    # Compiles YAML source to JSON themes
npm run package  # Creates VSIX package
```

The build process generates theme files from `src/stranger-theme.yaml` using color palettes from `../shared/palettes.js`.

### Testing Locally

Press `F5` to launch the Extension Development Host, then select your theme from `Code → Preferences → Color Theme`.

### Publishing

```bash
npm run publish
```

See the [VS Code Publishing Documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) for credentials setup.

## Contributing

Contributions are welcome! See the main repository's [Contributing Guide](../CONTRIBUTING.md).

## Team

This theme is maintained by [@tcvieira](https://github.com/tcvieira) and [contributors](https://github.com/stranger-theme/stranger-theme/graphs/contributors).

## License

[MIT License](./LICENSE) © Stranger Theme
