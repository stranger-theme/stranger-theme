# 🔦 Stranger Theme for Sublime Text

A dark theme collection inspired by the Netflix series Stranger Things.

## 🎨 Theme Variants

- **Upside Down** - Dark blue-black with desaturated tones
- **Starcourt** - Vibrant 80s mall aesthetic with neon colors
- **Hawkins** - Small-town America with warm, muted colors
- **The Lab** - Clinical, institutional aesthetic
- **Tigers** - School colors with orange/black tones
- **Dimension X** - Dark red dimension with moody textures

## 📦 Installation

### Using Package Control (Recommended)

1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Select `Package Control: Install Package`
3. Search for `Stranger Theme`
4. Press Enter to install

### Manual Installation

1. Download the `.tmTheme` files from `themes/` folder
2. Open Sublime Text
3. Go to **Preferences → Browse Packages**
4. Create a folder called `Stranger Theme`
5. Copy the `.tmTheme` files into this folder

## ⚙️ Activation

1. Go to **Preferences → Color Scheme**
2. Select one of the Stranger Theme variants

Or add to your settings (`Preferences.sublime-settings`):

```json
{
  "color_scheme": "Packages/Stranger Theme/Stranger-Theme-Starcourt.tmTheme"
}
```

## 🛠️ Building

```bash
# Build themes from shared palettes
npm run build
```

## 📁 Project Structure

```
sublime-text/
├── themes/                           # Generated theme files
│   ├── Stranger-Theme-Upside-Down.tmTheme
│   ├── Stranger-Theme-Starcourt.tmTheme
│   ├── Stranger-Theme-Hawkins.tmTheme
│   ├── Stranger-Theme-The-Lab.tmTheme
│   ├── Stranger-Theme-Tigers.tmTheme
│   └── Stranger-Theme-Dimension-X.tmTheme
├── scripts/
│   └── build.js                      # Build script
└── package.json
```

## 📜 License

[MIT License](../LICENSE) © Stranger Theme
