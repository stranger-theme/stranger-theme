# Installing Stranger Things Theme

## Visual Studio Code

### Install from Marketplace (recommended)

1. Go to `View -> Command Palette` or press `Ctrl+Shift+P`
2. Then enter `Install Extension`
3. Search for `Stranger Theme`
4. Select it or press Enter to install

### Local testing (VSIX)

Use this if you want to test the extension before publishing.

```bash
cd /path/to/stranger-theme/visual-studio-code
npx vsce package
code --install-extension stranger-theme-1.0.0.vsix
```

### Local testing (Extension Development Host)

Use this if you want to iterate without packaging.

```bash
code --extensionDevelopmentPath=/path/to/stranger-theme/visual-studio-code
```

### Activating theme

Run Visual Studio Code. The Stranger Theme will be available from `File -> Preferences -> Color Theme` dropdown menu.

## JetBrains IDEs

### Install from Marketplace (recommended)

Go to `Plugin Marketplace`, and search `Stranger Theme`, click `Install`.

### Local testing

Build and run a test IDE with the plugin:

```bash
cd /path/to/stranger-theme/jetbrains
./gradlew runIde
```

Or build a ZIP to install manually:

```bash
cd /path/to/stranger-theme/jetbrains
./gradlew buildPlugin
# Install from build/distributions/
```

### Activating UI theme

Go to `Preferences | Appearance & Behavior | Appearance`, select one of the Stranger Things themes from the dropdown menu:
- Stranger Theme: Upside Down
- Stranger Theme: Starcourt
- Stranger Theme: Hawkins
- Stranger Theme: The Lab
- Stranger Theme: Tigers
- Stranger Theme: Demogorgon

### Activating editor color scheme

Go to `Preferences | Editor | Color Scheme`, select the corresponding Stranger Theme scheme from the dropdown menu.

### Notes

- To install this UI plugin, your JetBrains IDE(s) must be **2019.1 or later** and the latest release is recommended.
- If you have ever edited any of the Stranger Theme Color Schemes, you'd better **Restore Defaults** after upgrading.
