<div align="center">

<img src="../assets/stranger-theme-logo.png" alt="Stranger Theme Logo" width="256" />

</div>

# Stranger Theme for Hyper

> 🔦 A dark theme collection for Hyper Terminal inspired by the famous series Stranger Things

## Install

#### Using Hyper CLI

```bash
hyper i hyper-stranger-theme-starcourt
```

#### Manual Installation

1. Edit `~/.hyper.js`
2. Add theme to `plugins` array:

```javascript
module.exports = {
  plugins: [
    'hyper-stranger-theme-starcourt'
  ],
};
```

3. Restart Hyper

#### Local Installation (Development)

```bash
# Copy theme to local plugins
cp -r themes/hyper-stranger-theme-starcourt ~/.hyper_plugins/local/
```

Add to `localPlugins` in `~/.hyper.js`:

```javascript
module.exports = {
  localPlugins: [
    'hyper-stranger-theme-starcourt'
  ],
};
```

## Theme Variants

Each variant is published as a separate npm package:

- `hyper-stranger-theme-upside-down` - Dark blue-black with desaturated tones
- `hyper-stranger-theme-starcourt` - Vibrant 80s mall aesthetic with neon colors
- `hyper-stranger-theme-hawkins` - Small-town America with warm, muted colors
- `hyper-stranger-theme-the-lab` - Clinical, institutional aesthetic
- `hyper-stranger-theme-tigers` - School colors with orange/black tones
- `hyper-stranger-theme-dimension-x` - Dark red dimension with moody textures

## Development

### Building from Source

```bash
npm install
npm run build    # Generates Hyper plugin packages from shared palettes
```

Each theme is a standalone npm package with:
- `index.js` - Theme colors and CSS
- `package.json` - npm metadata

## Contributing

Contributions are welcome! See the main repository's [Contributing Guide](../CONTRIBUTING.md).

## Team

This theme is maintained by [@tcvieira](https://github.com/tcvieira) and [contributors](https://github.com/stranger-theme/stranger-theme/graphs/contributors).

## License

[MIT License](./LICENSE) © Stranger Theme
