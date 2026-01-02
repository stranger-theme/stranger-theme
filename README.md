# 🔦 Stranger Theme

> A dark theme collection inspired by the famous series Stranger Things. One theme. All platforms.

## 🎨 Theme Variants

All platforms include these 6 theme variants:

- **Upside Down** - Dark blue-black with desaturated tones
- **Starcourt** - Vibrant 80s mall aesthetic with neon colors  
- **Hawkins** - Small-town America with warm, muted, autumnal colors
- **The Lab** - Clinical, institutional aesthetic with sterile colors
- **Tigers** - School colors with orange/black and vintage academic tones
- **Dimension X** - Dark red dimension with moody, organic textures

## 📦 Supported Platforms

### IDEs & Editors

| Platform | Directory | Build Command |
| -------- | --------- | ------------- |
| Visual Studio Code | [visual-studio-code](./visual-studio-code) | `npm run build` |
| JetBrains IDEs | [jetbrains](./jetbrains) | `npm run build` |
| Vim/Neovim | [vim](./vim) | `npm run build` |
| Sublime Text | [sublime-text](./sublime-text) | `npm run build` |

### Terminals

| Platform | Directory | Build Command |
| -------- | --------- | ------------- |
| Alacritty | [terminal/alacritty](./terminal/alacritty) | `npm run build` (in terminal/) |
| iTerm2 | [terminal/iterm2](./terminal/iterm2) | `npm run build` (in terminal/) |
| Windows Terminal | [terminal/windows-terminal](./terminal/windows-terminal) | `npm run build` (in terminal/) |
| Hyper | [hyper](./hyper) | `npm run build` |

## 🏗️ Project Structure

```
stranger-theme/
├── shared/                  # Shared color palettes for all platforms
│   └── palettes.js
├── visual-studio-code/      # VS Code extension
├── jetbrains/               # JetBrains plugin
├── vim/                     # Vim/Neovim colorschemes
├── sublime-text/            # Sublime Text themes
├── terminal/                # Terminal themes
│   ├── alacritty/
│   ├── iterm2/
│   └── windows-terminal/
├── hyper/                   # Hyper terminal themes
└── stranger-theme/          # Documentation and specs
```

## 🛠️ Building All Themes

Each platform has its own build script that generates themes from the shared color palettes:

```bash
# Build all platforms
cd visual-studio-code && npm run build
cd jetbrains && npm run build
cd vim && npm run build
cd sublime-text && npm run build
cd terminal && npm run build
cd hyper && npm run build
```

## 🎯 Adding a New Theme Variant

1. Add the new palette to `shared/palettes.js`
2. Run the build script in each platform directory
3. All platforms will automatically generate the new variant

## 🚀 Contributing

Want to add support for a new platform? Check out the [contribution guidelines](./stranger-theme/CONTRIBUTING.md).

## 📜 License

[MIT License](./stranger-theme/LICENSE) © Stranger Theme
