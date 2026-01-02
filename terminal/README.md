# 🔦 Stranger Theme for Terminal Emulators

A dark theme collection inspired by the Netflix series Stranger Things for terminal emulators.

## 🎨 Theme Variants

- **Upside Down** - Dark blue-black with desaturated tones
- **Starcourt** - Vibrant 80s mall aesthetic with neon colors
- **Hawkins** - Small-town America with warm, muted colors
- **The Lab** - Clinical, institutional aesthetic
- **Tigers** - School colors with orange/black tones
- **Dimension X** - Dark red dimension with moody textures

## 📦 Supported Terminals

- [Alacritty](#alacritty)
- [iTerm2](#iterm2)
- [Windows Terminal](#windows-terminal)

---

## Alacritty

### Installation

1. Copy the theme file to your Alacritty config directory:

```bash
# Create themes directory
mkdir -p ~/.config/alacritty/themes

# Copy theme (example: Starcourt)
cp alacritty/stranger-theme-starcourt.toml ~/.config/alacritty/themes/
```

2. Import in your `alacritty.toml`:

```toml
import = ["~/.config/alacritty/themes/stranger-theme-starcourt.toml"]
```

### Available Files

- `stranger-theme-upside-down.toml`
- `stranger-theme-starcourt.toml`
- `stranger-theme-hawkins.toml`
- `stranger-theme-the-lab.toml`
- `stranger-theme-tigers.toml`
- `stranger-theme-dimension-x.toml`

---

## iTerm2

### Installation

1. Open iTerm2
2. Go to **Preferences → Profiles → Colors**
3. Click **Color Presets** dropdown → **Import**
4. Select the `.itermcolors` file
5. Select the imported theme from **Color Presets**

### Available Files

- `Stranger-Theme-Upside-Down.itermcolors`
- `Stranger-Theme-Starcourt.itermcolors`
- `Stranger-Theme-Hawkins.itermcolors`
- `Stranger-Theme-The-Lab.itermcolors`
- `Stranger-Theme-Tigers.itermcolors`
- `Stranger-Theme-Dimension-X.itermcolors`

---

## Windows Terminal

### Installation

1. Open Windows Terminal
2. Open Settings (`Ctrl+,`)
3. Click **Open JSON file** (bottom left)
4. Add the theme to the `schemes` array:

```json
{
  "schemes": [
    // ... existing schemes ...
    // Paste the contents of the .json file here
  ]
}
```

5. Set your profile to use the theme:

```json
{
  "profiles": {
    "defaults": {
      "colorScheme": "Stranger Theme: Starcourt"
    }
  }
}
```

### Available Files

- `stranger-theme-upside-down.json`
- `stranger-theme-starcourt.json`
- `stranger-theme-hawkins.json`
- `stranger-theme-the-lab.json`
- `stranger-theme-tigers.json`
- `stranger-theme-dimension-x.json`

---

## 🛠️ Building

```bash
# Build all terminal themes from shared palettes
npm run build
```

## 📁 Project Structure

```
terminal/
├── alacritty/              # Alacritty themes (.toml)
├── iterm2/                 # iTerm2 themes (.itermcolors)
├── windows-terminal/       # Windows Terminal themes (.json)
├── scripts/
│   └── build.js            # Build script
└── package.json
```

## 📜 License

[MIT License](../LICENSE) © Stranger Theme
