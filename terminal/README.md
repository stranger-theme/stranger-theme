<div align="center">

<img src="../stranger-theme/assets/stranger-theme-logo.png" alt="Stranger Theme Logo" width="256" />

</div>

# Stranger Theme for Terminal Emulators

> 🔦 A dark theme collection for Alacritty, iTerm2, and Windows Terminal inspired by the famous series Stranger Things

## Supported Terminals

- [Alacritty](#alacritty)
- [iTerm2](#iterm2)
- [Windows Terminal](#windows-terminal)

## Theme Variants

- **Upside Down** - Dark blue-black with desaturated tones
- **Starcourt** - Vibrant 80s mall aesthetic with neon colors
- **Hawkins** - Small-town America with warm, muted colors
- **The Lab** - Clinical, institutional aesthetic
- **Tigers** - School colors with orange/black tones
- **Dimension X** - Dark red dimension with moody textures

---

## Alacritty

### Install

```bash
# Create themes directory
mkdir -p ~/.config/alacritty/themes

# Copy theme
cp alacritty/stranger-theme-starcourt.toml ~/.config/alacritty/themes/
```

Import in `alacritty.toml`:

```toml
import = ["~/.config/alacritty/themes/stranger-theme-starcourt.toml"]
```

---

## iTerm2

### Install

1. Open **iTerm2** → **Preferences** → **Profiles** → **Colors**
2. Click **Color Presets** → **Import**
3. Select the `.itermcolors` file from `iterm2/` folder
4. Select the imported theme from **Color Presets**

---

## Windows Terminal

### Install

1. Open **Settings** (`Ctrl+,`) → **Open JSON file**
2. Add theme to `schemes` array (paste contents from `windows-terminal/` JSON file)
3. Set your profile:

```json
{
  "profiles": {
    "defaults": {
      "colorScheme": "Stranger Theme: Starcourt"
    }
  }
}
```

---

## Development

### Building from Source

```bash
npm install
npm run build    # Generates themes for all terminals from shared palettes
```

## Contributing

Contributions are welcome! See the main repository's [Contributing Guide](../stranger-theme/CONTRIBUTING.md).

## Team

This theme is maintained by [@tcvieira](https://github.com/tcvieira) and [contributors](https://github.com/stranger-theme/stranger-theme/graphs/contributors).

## License

[MIT License](./LICENSE) © Stranger Theme
