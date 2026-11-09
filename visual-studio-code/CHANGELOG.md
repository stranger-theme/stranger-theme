# Changelog

All notable changes to the Stranger Things Theme will be documented in this file.

## [1.0.4] - 2026-11-09

### Fixed
- VS Code Tigers used a stale palette; it is now generated from the shared palette like every other platform.
- Readable comments in all variants (WCAG 4.5:1 contrast).
- Selection visible over the current line in Starcourt, Hawkins, The Lab, Tigers and Dimension X.
- Visible terminal ANSI black and distinct bright ANSI colors.
- Translucent VS Code find and selection highlights, and palette-based diff and merge colors.

### Changed
- Comment and selection colors are brighter, so every variant looks slightly different.

### Added
- CI checks that generated files are committed and that palettes meet contrast thresholds.

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
