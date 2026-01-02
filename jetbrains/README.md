# Stranger Theme for JetBrains IDEs

> 🔦 A dark theme collection inspired by the Netflix series Stranger Things.

[![JetBrains Plugins](https://img.shields.io/jetbrains/plugin/v/com.strangertheme.theme?style=flat-square&label=Version&logo=jetbrains&logoColor=white)](https://plugins.jetbrains.com/plugin/XXXXX-stranger-theme)
[![JetBrains Plugin Downloads](https://img.shields.io/jetbrains/plugin/d/com.strangertheme.theme?style=flat-square&label=Downloads)](https://plugins.jetbrains.com/plugin/XXXXX-stranger-theme)
[![License](https://img.shields.io/github/license/stranger-theme/jetbrains?style=flat-square)](./LICENSE)

![Screenshot](./assets/screenshot.png)

## Install

All instructions can be found at [strangertheme.com](https://strangertheme.com).

### Using the Plugin Marketplace

1. Go to `Settings → Plugins → Marketplace`
2. Search for `Stranger Theme`
3. Click **Install** and restart the IDE
4. Go to `Settings → Appearance & Behavior → Appearance`
5. Select one of the Stranger Theme variants from the Theme dropdown

### Using Git

```bash
git clone https://github.com/stranger-theme/jetbrains.git
cd jetbrains
./gradlew buildPlugin
# Install the plugin from build/distributions/
```

## Supported IDEs

- IntelliJ IDEA
- WebStorm
- PyCharm
- PhpStorm
- RubyMine
- GoLand
- CLion
- DataGrip
- Rider
- Android Studio

**Requires IDE version 2019.1 or later**

## Theme Variants

- **Upside Down** - Dark blue-black with desaturated tones
- **Starcourt** - Vibrant 80s mall aesthetic with neon colors
- **Hawkins** - Small-town America with warm, muted, autumnal colors
- **The Lab** - Clinical, institutional aesthetic with sterile colors
- **Tigers** - School colors with orange/black and vintage academic tones
- **Demogorgon** - Fleshy pinks/reds with dark, organic textures

## Development

```bash
# Build the plugin
./gradlew buildPlugin

# Run a test IDE instance with the plugin
./gradlew runIde
```

## Team

This theme is maintained by the Stranger Theme team and [awesome contributors](https://github.com/stranger-theme/jetbrains/graphs/contributors).

## License

[MIT License](./LICENSE) © Stranger Theme
