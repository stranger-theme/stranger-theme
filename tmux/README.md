# Stranger Theme for tmux

> 🔦 Six dark tmux status bar and pane themes inspired by the series Stranger Things

Each file sets only colours (status bar, window list, pane borders, messages, copy mode and clock). Your status bar content and layout stay as they are.

## Install

Copy a theme next to your tmux configuration:

```bash
mkdir -p ~/.config/tmux
cp themes/stranger-theme-starcourt.conf ~/.config/tmux/
```

Add this line to the end of `~/.tmux.conf` (or `~/.config/tmux/tmux.conf`):

```tmux
source-file ~/.config/tmux/stranger-theme-starcourt.conf
```

Reload a running server with `tmux source-file ~/.tmux.conf`. Replace `starcourt` with `upside-down`, `hawkins`, `the-lab`, `tigers` or `dimension-x` to choose another variant.

## Development

The files in `themes/` are generated from `shared/palettes.js`. Do not edit them by hand.

```bash
node scripts/build.js   # or `npm run build` from the repository root
```

## License

[MIT License](../LICENSE) © Stranger Theme
