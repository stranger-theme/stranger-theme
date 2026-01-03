# Repository Guidelines

## Project Structure & Module Organization

- `shared/palettes.js` is the single source of truth for all theme colors and derived values.
- Platform outputs live in sibling folders: `visual-studio-code/`, `jetbrains/`, `vim/`, `sublime-text/`, `terminal/`, and `hyper/`.
- Platform build scripts are typically in `*/scripts/build.js`, and generated theme assets are under each platform’s `themes/`, `colors/`, or terminal subfolders.
- Static assets and branding live in `assets/`.

## Build, Test, and Development Commands

Run from the repository root:

- `npm run build` — generate all platform themes from `shared/palettes.js`.
- `npm run build:vscode` / `npm run build:jetbrains` / `npm run build:vim` / `npm run build:sublime` / `npm run build:terminal` / `npm run build:hyper` — build a single platform.

Platform-specific development often happens inside each directory (for example, `cd visual-studio-code && npm run build`).

## Coding Style & Naming Conventions

- Keep edits in `shared/palettes.js` and rebuild; do not hand-edit generated files.
- Use existing naming conventions for variants (for example, `Upside Down`, `Starcourt`, `Hawkins`).
- Follow existing JavaScript formatting in the repo; no formatter is enforced.

## Testing Guidelines

- There is no automated test suite. Validate changes by building the relevant platform and checking the generated output.
- For platform validation, open the target editor/terminal and preview the theme after running the build.

## Commit & Pull Request Guidelines

- Recent history uses conventional prefixes like `feat:`, `docs:`, `chore:`, and `refactor:`—match that style.
- PRs should include a clear summary, affected platforms, and screenshots when UI changes are visible.
- Link related issues if applicable and note any required manual validation steps.

## Configuration Notes

- Node.js is required for build scripts; JetBrains packaging uses JDK 11.
- For new variants, add the palette to `shared/palettes.js` and rebuild all platforms.
