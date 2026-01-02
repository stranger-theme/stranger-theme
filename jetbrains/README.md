<div align="center">

<img src="../stranger-theme/assets/stranger-theme-logo.png" alt="Stranger Theme Logo" width="256" />

</div>

# Stranger Theme for JetBrains

> 🔦 A dark theme collection for IntelliJ IDEA, PyCharm, WebStorm, and all JetBrains IDEs inspired by the famous series Stranger Things

[![JetBrains Plugins](https://img.shields.io/jetbrains/plugin/v/com.strangertheme.theme?style=flat-square&label=Version&logo=jetbrains&logoColor=white)](https://plugins.jetbrains.com/plugin/XXXXX-stranger-theme)
[![JetBrains Plugin Downloads](https://img.shields.io/jetbrains/plugin/d/com.strangertheme.theme?style=flat-square&label=Downloads)](https://plugins.jetbrains.com/plugin/XXXXX-stranger-theme)
[![License](https://img.shields.io/github/license/stranger-theme/jetbrains?style=flat-square)](./LICENSE)

## Install

#### Via Plugin Marketplace

1. Open **Settings/Preferences** → **Plugins**
2. Click **Marketplace** tab
3. Search for `Stranger Theme`
4. Click **Install** → **Restart IDE**
5. Go to **Settings/Preferences** → **Appearance & Behavior** → **Appearance**
6. Select your preferred Stranger Theme variant from the **Theme** dropdown

#### Manual Installation

1. Download the latest `.jar` from [Releases](https://github.com/stranger-theme/stranger-theme/releases)
2. Open **Settings/Preferences** → **Plugins** → ⚙️ → **Install Plugin from Disk**
3. Select the downloaded file
4. Restart your IDE

## Theme Variants

- **Upside Down** - Dark blue-black with desaturated tones
- **Starcourt** - Vibrant 80s mall aesthetic with neon colors
- **Hawkins** - Small-town America with warm, muted, autumnal colors
- **The Lab** - Clinical, institutional aesthetic with sterile colors
- **Tigers** - School colors with orange/black and vintage academic tones
- **Dimension X** - Dark red dimension with moody, organic textures

## Supported IDEs

All JetBrains IDEs version 2019.1+ are supported:

- IntelliJ IDEA
- PyCharm
- WebStorm
- PhpStorm
- RubyMine
- GoLand
- CLion
- DataGrip
- Rider
- Android Studio

## Development

### Building from Source

```bash
npm install
npm run build    # Generates .theme.json and Scheme.xml files
```

### Gradle Build

```bash
./gradlew buildPlugin    # Creates plugin JAR
./gradlew runIde        # Test in IDE instance
```

## Contributing

Contributions are welcome! See the main repository's [Contributing Guide](../stranger-theme/CONTRIBUTING.md).

## Team

This theme is maintained by [@tcvieira](https://github.com/tcvieira) and [contributors](https://github.com/stranger-theme/stranger-theme/graphs/contributors).

## License

[MIT License](./LICENSE) © Stranger Theme
