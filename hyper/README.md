# 🔦 Stranger Theme for Hyper Terminal

A dark theme collection inspired by the Netflix series Stranger Things for Hyper Terminal.

## 🎨 Theme Variants

- `hyper-stranger-theme-upside-down` - Dark blue-black with desaturated tones
- `hyper-stranger-theme-starcourt` - Vibrant 80s mall aesthetic with neon colors
- `hyper-stranger-theme-hawkins` - Small-town America with warm, muted colors
- `hyper-stranger-theme-the-lab` - Clinical, institutional aesthetic
- `hyper-stranger-theme-tigers` - School colors with orange/black tones
- `hyper-stranger-theme-dimension-x` - Dark red dimension with moody textures

## 📦 Installation

### Using npm (Recommended)

```bash
# Install your preferred variant
hyper i hyper-stranger-theme-starcourt
```

### Manual Installation

1. Open your Hyper config file (`~/.hyper.js`)
2. Add the theme to your plugins array:

```javascript
module.exports = {
  // ...
  plugins: [
    'hyper-stranger-theme-starcourt'
    // or any other variant
  ],
  // ...
};
```

3. Restart Hyper

### Local Installation (Development)

1. Copy the theme folder to Hyper's local plugins:

```bash
# Example: Starcourt theme
cp -r themes/hyper-stranger-theme-starcourt ~/.hyper_plugins/local/
```

2. Add to `localPlugins` in `~/.hyper.js`:

```javascript
module.exports = {
  localPlugins: [
    'hyper-stranger-theme-starcourt'
  ],
};
```

## 🛠️ Building

```bash
# Build all Hyper themes from shared palettes
npm run build
```

## 📁 Project Structure

```
hyper/
├── themes/
│   ├── hyper-stranger-theme-upside-down/
│   │   ├── index.js
│   │   └── package.json
│   ├── hyper-stranger-theme-starcourt/
│   │   ├── index.js
│   │   └── package.json
│   └── ...
├── scripts/
│   └── build.js              # Build script
└── package.json
```

## 🎯 Theme Structure

Each Hyper theme is a standalone npm package containing:

- `index.js` - Theme colors and CSS customizations
- `package.json` - Package metadata for npm publishing

## 📜 License

[MIT License](../LICENSE) © Stranger Theme
