/**
 * Stranger Theme - Shared Color Palettes
 * 
 * This module defines the color palettes for all 6 Stranger Theme variants.
 * These palettes are used by build scripts across all platforms (VSCode, JetBrains, Vim, etc.)
 * 
 * Each palette includes:
 * - BG: Background color
 * - FG: Foreground (text) color
 * - SELECTION: Selection highlight color
 * - COMMENT: Comment text color
 * - CYAN: Cyan accent (types, classes)
 * - GREEN: Green accent (functions, strings)
 * - ORANGE: Orange accent (numbers, constants)
 * - PINK: Pink accent (keywords, tags)
 * - PURPLE: Purple accent (special keywords)
 * - RED: Red accent (errors, deletions)
 * - YELLOW: Yellow accent (strings, warnings)
 */

const THEME_PALETTES = {
  'upside-down': {
    id: 'upside-down',
    name: 'Stranger Theme: Upside Down',
    displayName: 'Upside Down',
    base: {
      BG: '#0D1117',
      FG: '#F8F8F2',
      SELECTION: '#2A3C4A',
      COMMENT: '#5C6370',
      CYAN: '#56B6C2',
      GREEN: '#98C379',
      ORANGE: '#D19A66',
      PINK: '#C678DD',
      PURPLE: '#61AFEF',
      RED: '#E06C75',
      YELLOW: '#E5C07B'
    }
  },
  'starcourt': {
    id: 'starcourt',
    name: 'Stranger Theme: Starcourt',
    displayName: 'Starcourt',
    base: {
      BG: '#1A1A2E',
      FG: '#EAEAEA',
      SELECTION: '#2E2E4A',
      COMMENT: '#6B5B95',
      CYAN: '#00CED1',
      GREEN: '#00FA9A',
      ORANGE: '#FFB347',
      PINK: '#FF1493',
      PURPLE: '#BA55D3',
      RED: '#FF6B6B',
      YELLOW: '#FFD700'
    }
  },
  'hawkins': {
    id: 'hawkins',
    name: 'Stranger Theme: Hawkins',
    displayName: 'Hawkins',
    base: {
      BG: '#2C2218',
      FG: '#E8DCC8',
      SELECTION: '#3C3228',
      COMMENT: '#6B5B45',
      CYAN: '#88C0D0',
      GREEN: '#A3BE8C',
      ORANGE: '#D08770',
      PINK: '#D4A574',
      PURPLE: '#B48EAD',
      RED: '#BF616A',
      YELLOW: '#EBCB8B'
    }
  },
  'the-lab': {
    id: 'the-lab',
    name: 'Stranger Theme: The Lab',
    displayName: 'The Lab',
    base: {
      BG: '#1A1D26',
      FG: '#E0E5EC',
      SELECTION: '#2A2D36',
      COMMENT: '#5D6D7E',
      CYAN: '#39CCCC',
      GREEN: '#2ECC40',
      ORANGE: '#FF851B',
      PINK: '#7FDBFF',
      PURPLE: '#B10DC9',
      RED: '#FF4136',
      YELLOW: '#FFDC00'
    }
  },
  'tigers': {
    id: 'tigers',
    name: 'Stranger Theme: Tigers',
    displayName: 'Tigers',
    base: {
      BG: '#181E18',
      FG: '#F5F5F5',
      SELECTION: '#283228',
      COMMENT: '#5C6C5C',
      CYAN: '#81A2BE',
      GREEN: '#B5BD68',
      ORANGE: '#DE935F',
      PINK: '#FF7F2A',
      PURPLE: '#B294BB',
      RED: '#CC6666',
      YELLOW: '#F0C674'
    }
  },
  'dimension-x': {
    id: 'dimension-x',
    name: 'Stranger Theme: Dimension X',
    displayName: 'Dimension X',
    base: {
      BG: '#1E1A1A',
      FG: '#E8D5D5',
      SELECTION: '#3E2A2A',
      COMMENT: '#5C4A4A',
      CYAN: '#D19A66',
      GREEN: '#8B7355',
      ORANGE: '#FF6B6B',
      PINK: '#E06C75',
      PURPLE: '#C678DD',
      RED: '#FF55AA',
      YELLOW: '#BCA89F'
    }
  }
};

/**
 * Adjust color brightness
 * @param {string} hex - Hex color (e.g., '#FF0000')
 * @param {number} amount - Amount to adjust (-255 to 255)
 * @returns {string} Adjusted hex color
 */
function adjustColor(hex, amount) {
  const color = hex.replace('#', '');
  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase();
}

/**
 * Get derived colors from a palette
 * @param {object} palette - Base palette colors
 * @returns {object} Extended palette with derived colors
 */
function getDerivedColors(palette) {
  return {
    ...palette,
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    LineHighlight: adjustColor(palette.BG, 20),
    NonText: palette.FG + '1A',
    BGLighter: adjustColor(palette.BG, 40),
    BGLight: adjustColor(palette.BG, 20),
    BGDark: adjustColor(palette.BG, -10),
    BGDarker: adjustColor(palette.BG, -20),
    // ANSI colors for terminal
    ANSI_BLACK: palette.BG,
    ANSI_RED: palette.RED,
    ANSI_GREEN: palette.GREEN,
    ANSI_YELLOW: palette.YELLOW,
    ANSI_BLUE: palette.PURPLE,
    ANSI_MAGENTA: palette.PINK,
    ANSI_CYAN: palette.CYAN,
    ANSI_WHITE: palette.FG,
    ANSI_BRIGHT_BLACK: palette.COMMENT,
    ANSI_BRIGHT_RED: adjustColor(palette.RED, 30),
    ANSI_BRIGHT_GREEN: adjustColor(palette.GREEN, 30),
    ANSI_BRIGHT_YELLOW: adjustColor(palette.YELLOW, 30),
    ANSI_BRIGHT_BLUE: adjustColor(palette.PURPLE, 30),
    ANSI_BRIGHT_MAGENTA: adjustColor(palette.PINK, 30),
    ANSI_BRIGHT_CYAN: adjustColor(palette.CYAN, 30),
    ANSI_BRIGHT_WHITE: '#FFFFFF'
  };
}

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color
 * @returns {object} RGB object {r, g, b}
 */
function hexToRgb(hex) {
  const color = hex.replace('#', '');
  const num = parseInt(color, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Convert hex to RGB string
 * @param {string} hex - Hex color
 * @returns {string} RGB string "r, g, b"
 */
function hexToRgbString(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
}

/**
 * Convert hex to normalized RGB (0-1 range) for iTerm2
 * @param {string} hex - Hex color
 * @returns {object} Normalized RGB {r, g, b}
 */
function hexToNormalizedRgb(hex) {
  const { r, g, b } = hexToRgb(hex);
  return {
    r: r / 255,
    g: g / 255,
    b: b / 255
  };
}

module.exports = {
  THEME_PALETTES,
  adjustColor,
  getDerivedColors,
  hexToRgb,
  hexToRgbString,
  hexToNormalizedRgb
};
