# Stranger Theme for Visual Studio Code

> 🔦 A dark theme collection inspired by the Netflix series Stranger Things.

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/stranger-theme.stranger-theme?style=flat-square&label=Version&logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=stranger-theme.stranger-theme)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/stranger-theme.stranger-theme?style=flat-square&label=Downloads)](https://marketplace.visualstudio.com/items?itemName=stranger-theme.stranger-theme)
[![License](https://img.shields.io/github/license/stranger-theme/visual-studio-code?style=flat-square)](./LICENSE)

![Screenshot](./assets/screenshot.png)

## Install

All instructions can be found at [strangertheme.com](https://strangertheme.com).

### Using the Extension Marketplace

1. Go to `View → Extensions`
2. Search for `Stranger Theme`
3. Click **Install**
4. Go to `Code → Preferences → Color Theme`
5. Select one of the Stranger Theme variants

### Using Git

```bash
git clone https://github.com/stranger-theme/visual-studio-code.git ~/.vscode/extensions/stranger-theme
cd ~/.vscode/extensions/stranger-theme
npm install
npm run build
```

Then restart VS Code and select the theme from `Code → Preferences → Color Theme`.

## Theme Variants

- **Upside Down** - Dark blue-black with desaturated tones inspired by the alternate dimension
- **Starcourt** - Vibrant 80s mall aesthetic with neon pinks and cyans
- **Hawkins** - Small-town America with warm, muted, autumnal colors
- **The Lab** - Clinical, institutional aesthetic with sterile greens and blues
- **Tigers** - Hawkins High School colors with orange/black and vintage academic tones
- **Dimension X** - Fleshy pinks/reds with dark, organic textures

## Development

### Project Structure

```
visual-studio-code/
├── src/
│   └── stranger-theme.yaml   # Base theme source (all variants generated from this)
├── scripts/
│   └── build.js              # Build script to generate JSON themes
├── themes/                    # Generated JSON theme files (do not edit directly)
│   ├── upside-down-color-theme.json
│   ├── starcourt-color-theme.json
│   ├── hawkins-color-theme.json
│   ├── the-lab-color-theme.json
│   ├── tigers-color-theme.json
│   └── dimension-x-color-theme.json
└── package.json
```

### Building

```bash
# Install dependencies
npm install

# Build all theme variants from YAML source
npm run build
```

The build script reads `src/stranger-theme.yaml` and generates 6 different theme variants by applying different color palettes.

### Testing Locally

#### Option 1: Using VS Code Extension Development Host

1. Open this folder in VS Code
2. Press `F5` to launch the Extension Development Host
3. In the new window, go to `Code → Preferences → Color Theme`
4. Select any Stranger Theme variant

#### Option 2: Install from VSIX

```bash
# Build and package the extension
npm run package

# Install the generated .vsix file
code --install-extension stranger-theme-*.vsix
```

#### Option 3: Symlink to Extensions Folder

```bash
# macOS/Linux
ln -s $(pwd) ~/.vscode/extensions/stranger-theme

# Then restart VS Code
```

### Making Changes

1. Edit `src/stranger-theme.yaml` to modify syntax highlighting rules (tokenColors)
2. Edit `scripts/build.js` to modify color palettes for each variant
3. Run `npm run build` to regenerate all themes
4. Press `F5` or reload VS Code to test changes

### Publishing

```bash
# Build and publish to VS Code Marketplace
npm run publish
```

## Team

This theme is maintained by the Stranger Theme team and [awesome contributors](https://github.com/stranger-theme/visual-studio-code/graphs/contributors).

## License

[MIT License](./LICENSE) © Stranger Theme
