# Changelog

All notable changes to the Stranger Things Theme will be documented in this file.

## [1.1.0] - 2026-11-12

### Added
- VS Code: "No Italics" variants of all six themes, generated from the same source with italic removed from every token and semantic rule.
- Helix, tmux, Warp and macOS Terminal themes for all six variants, plus a Windows Terminal fragment that installs all six schemes from one file.
- Neovim: the repository root ships `colors/` and `lua/`, so lazy.nvim, packer and vim-plug install the theme with no `rtp` setting. New `require('stranger-theme').setup()`, lualine themes, and highlight groups for gitsigns, nvim-tree, neo-tree, indent-blankline, which-key, Trouble, blink.cmp, lazy.nvim and nvim-dap.
- Vim/Neovim options for a transparent background, no italics and dimmed inactive windows. The default look is unchanged.
- VS Code: explicit semantic token colours, and themed minimap, inlay hints, Testing, debug, Source Control graph, merge editor, notebooks, symbol icons, charts and chat.
- JetBrains: the console and built-in terminal use all 16 palette ANSI colours; themed inlay hints, breakpoints, debugger values and log levels.
- A generated colour specification in `docs/SPEC.md`, with `docs/palettes.json` for tools.
- `stranger-theme-palette` npm package for web authors and port writers: the six palettes as typed JS (CommonJS and ESM), CSS custom properties per variant or switched by `data-stranger-theme`, a Tailwind colour map and Shiki themes. Published from `palette/` by the release workflow.
- Instructions for using the Sublime Text themes with bat and delta.
- GitHub issue forms and a pull request checklist.

### Fixed
- Alacritty, iTerm2 and Hyper theme files link to their real folder in the repository; the header pointed at pages that do not exist.
- VS Code: warnings are orange everywhere; the editor squiggle used cyan.
- README palette table shows its colour swatches on GitHub.
- CONTRIBUTING.md describes the real build workflow.
- Terminal ANSI colours in The Lab, Hawkins, Tigers and Dimension X now match their names (for example Dimension X green was brown), in every terminal, Vim/Neovim, VS Code, JetBrains, Zed and the aggregator schemes; editor syntax and UI colours are unchanged.

## [1.0.6] - 2026-11-11

### Added
- Sublime Text: `sublime-text/repository.json` lets Package Control install the release package, which now includes the LICENSE.
- Scheme files for theme aggregators (tinted-theming base16/base24, iTerm2-Color-Schemes) are generated from the shared palettes under `aggregators/`, for submission to those collections.

### Fixed
- Sublime Text README shows the `color_scheme` path used by a Package Control install.

### Changed
- README previews for the six variants are rendered from the shipped theme files.
- Every client is on the same version again. The VS Code extension has been on 1.0.6 since 2026-11-10 and is unchanged.

## [1.0.5] - 2026-11-10

### Changed
- New Stranger Theme banner on the README and marketplace pages.
- Hyper theme packages ship a README on npm and link to the main repository.

## [1.0.4] - 2026-11-09

### Fixed
- VS Code Tigers used a stale palette; it is now generated from the shared palette like every other platform.
- Readable comments in all variants (WCAG 4.5:1 contrast).
- Selection visible over the current line in Starcourt, Hawkins, The Lab, Tigers and Dimension X.
- Visible terminal ANSI black and distinct VS Code bright ANSI colors.
- Translucent VS Code find and selection highlights, and palette-based diff and merge colors.
- Neovim lazy.nvim installation snippet.
- Neovim diagnostics, floating windows and modern treesitter groups.
- Vim colorschemes failed to load in Vim (E691), and were skipped with `termguicolors` in terminals reporting fewer than 256 colors.
- Readable Alacritty search match text.

### Changed
- Comment and selection colors are brighter, so every variant looks slightly different.

### Added
- CI checks that generated files are committed and that palettes meet contrast thresholds.

## [1.0.3] - 2026-10-27

### Added
- Six existing variants for Ghostty, Kitty, WezTerm and Zed, with installation guides and release downloads.
- Checks for ANSI colors, deterministic generation and preservation of existing themes.

### Fixed
- Installable JetBrains release archive and public release channel.
- Marketplace publication sequencing, shared VSIX publication and visible npm publishing failures.
- Deterministic JetBrains scheme metadata and Hyper package version synchronization.
- Smaller VS Code package without development scripts or redundant screenshots.

## [1.0.0] - 2025-12-30

### Added
- Initial release with six theme variants:
  - Upside Down: Dark blue-black with desaturated tones
  - Starcourt Mall: Vibrant 80s mall aesthetic with neon colors
  - Hawkins: Small-town America with warm, muted, autumnal colors
  - The Lab: Clinical, institutional aesthetic with sterile colors
  - Tigers (Hawkins School): School colors with orange/black
  - Dimension X (formerly Demogorgon): Fleshy pinks/reds with dark, organic textures
- Support for Visual Studio Code
- Support for JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, etc.)
- Complete documentation and contribution guidelines
