# Stranger Theme for Helix

> 🔦 Six dark Helix themes inspired by the series Stranger Things

## Install

Copy the theme files into Helix's user theme directory:

```bash
# macOS / Linux
mkdir -p ~/.config/helix/themes
cp themes/stranger_*.toml ~/.config/helix/themes/
```

On Windows, copy them to `%AppData%\helix\themes\`.

Set the theme in `config.toml`:

```toml
theme = "stranger_starcourt"
```

Or try one in a running editor with `:theme stranger_starcourt`.

## Theme Variants

| Variant | Theme name |
|---|---|
| Upside Down | `stranger_upside_down` |
| Starcourt | `stranger_starcourt` |
| Hawkins | `stranger_hawkins` |
| The Lab | `stranger_the_lab` |
| Tigers | `stranger_tigers` |
| Dimension X | `stranger_dimension_x` |

## Development

The files in `themes/` are generated from `shared/palettes.js`. Do not edit them by hand.

```bash
node scripts/build.js   # or `npm run build` from the repository root
```

## License

[MIT License](../LICENSE) © Stranger Theme
