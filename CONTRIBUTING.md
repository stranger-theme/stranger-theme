# How to Contribute

## Environment

Before you get started, you should have already installed:

* Node.js (for VSCode theme development)
* JDK 11 (for JetBrains theme development)
* Visual Studio Code
* IntelliJ IDEA or another JetBrains IDE

## Getting Started

### For VSCode Theme Development

1. Clone the project
2. Run `npm install` to install dependencies
3. Make changes to the theme files in the `themes` directory
4. Run `npm run build` to build the theme
5. Press F5 to open a new window with your extension loaded
6. Open `File > Preferences > Color Theme` and pick your theme
7. Make adjustments and see the changes in real-time

### For JetBrains Theme Development

1. Clone the project
2. Import this project into IntelliJ IDEA as a Gradle Project
3. Make changes to the theme files in the `src/main/resources/themes` directory
4. Build the project using Gradle
5. Test the theme by installing it from the built JAR file

## Theme Variants

When contributing to the Stranger Things Theme, please ensure your changes maintain the distinctive look and feel of each variant:

- **Upside Down**: Dark blue-black with desaturated tones and occasional glowing elements
- **Starcourt Mall**: Vibrant 80s mall aesthetic with neon pinks, purples, and bright blues
- **Hawkins**: Small-town America with warm, muted, autumnal colors
- **The Lab**: Clinical, institutional aesthetic with sterile whites and cold blues
- **Tigers (Hawkins School)**: School colors with orange/black and vintage academic tones
- **Demogorgon**: Fleshy pinks/reds with dark, organic textures

## Pull Requests

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request with a clear description of the changes

## Style Guidelines

- Follow the existing code style
- Keep color values in the defined palette for each theme variant
- Test your changes in both light and dark environments
- Ensure good contrast ratios for accessibility

## License

By contributing to Stranger Things Theme, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
