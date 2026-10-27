# Stranger Theme for Zed

Six dark variants for Zed: Upside Down, Starcourt, Hawkins, The Lab, Tigers, and Dimension X. One theme family file includes editor colors, syntax highlighting, selections, and all 16 terminal ANSI colors from the existing shared palettes.

## Install

Download the Zed archive from [Releases](https://github.com/stranger-theme/stranger-theme/releases), or use this directory in a cloned repository. Run the following commands from the extracted archive directory or this `zed/` directory.

On macOS or Linux:

```bash
mkdir -p ~/.config/zed/themes
cp themes/stranger-theme.json ~/.config/zed/themes/
```

On Windows, copy `themes/stranger-theme.json` into `%USERPROFILE%\AppData\Roaming\Zed\themes\`, creating the directory if needed.

Restart Zed, open the command palette, and run **theme selector: toggle**. Choose **Stranger Theme: Starcourt**, or any other Stranger Theme variant. You can also merge this into your Zed settings:

```json
{
  "theme": {
    "mode": "dark",
    "dark": "Stranger Theme: Starcourt",
    "light": "Stranger Theme: Starcourt"
  }
}
```

This installs the JSON locally. See [Zed local themes](https://zed.dev/docs/themes#local-themes) and the [theme schema](https://zed.dev/schema/themes/v0.2.0.json).

## Build

From this directory:

```bash
npm run build
```

From the repository root:

```bash
npm run build:zed
npm test
```

Edit the generator for mapping changes. Keep color definitions in `shared/palettes.js` and regenerate `themes/stranger-theme.json`.

## License

[MIT License](../LICENSE) © Stranger Theme
