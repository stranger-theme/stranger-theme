# How to Contribute

Every theme file is generated. `shared/palettes.js` is the single source of truth for colours, and each client has a `scripts/build.js` that turns those palettes into its own format.

## Setup

* Node.js and `npm install` in the repo root
* `cd visual-studio-code && npm ci` once, so the VS Code build has its dependencies
* JDK 11 only if you work on the JetBrains plugin packaging

## Making a change

1. Fork the repository and create a branch.
2. Edit the **source**, never a generated file:
   * colours: `shared/palettes.js`
   * how a client maps colours: that client's `scripts/build.js`
   * VS Code token and UI rules: `visual-studio-code/src/stranger-theme.yaml`
3. From the repo root run `npm run build`, then `npm test`.
4. Commit the regenerated files together with your source change. CI fails if `npm run build` changes anything.
5. Open a pull request with before/after screenshots of the affected app and variant.

Generated output lives in `visual-studio-code/themes/`, `jetbrains/themes/`, `vim/colors/`, `sublime-text/themes/`, `terminal/*/`, `hyper/themes/`, `zed/themes/` and `aggregators/`. Edits there are overwritten by the next build.

## Add support for a new app

1. Copy a small client as the template: `zed/`, or the Kitty writer in `terminal/scripts/build.js`.
2. Add a build script that reads `shared/palettes.js` and writes one file per variant.
3. Register the client in `scripts/build-all.js` (and a `build:<app>` script in the root `package.json` if it has its own directory).
4. Add a README with install steps and a screenshot.
5. Run `npm run build` and `npm test`.

## Theme Variants

Keep the character of each variant:

- **Upside Down**: dark blue-black, desaturated, occasional glowing elements
- **Starcourt Mall**: vibrant 80s mall, neon pinks, purples and bright blues
- **Hawkins**: small-town America, warm, muted, autumnal
- **The Lab**: clinical, sterile whites and cold blues
- **Tigers (Hawkins School)**: orange and black with vintage academic tones
- **Dimension X**: dark red dimension, moody, organic textures

## Style Guidelines

- Keep colours inside the palette; derive extra shades with `getDerivedColors()` or `adjustColor()`
- Keep text readable: `npm test` checks contrast ratios
- Check your change in the real app, for every variant it touches

## License

By contributing to Stranger Theme, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
