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
 *
 * Slots are syntax roles, so in some variants a slot's hue does not match its name
 * (Dimension X GREEN is brown). A variant can therefore carry an optional `ansi` object
 * next to `base` that replaces normal terminal colours: RED, GREEN, YELLOW, BLUE,
 * MAGENTA, CYAN. Without an override, ANSI blue is PURPLE, ANSI magenta is PINK and the
 * rest use the slot of the same name. Overrides affect only the 16-colour terminal palette
 * (ANSI_* from getDerivedColors), never syntax or UI colours.
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
      COMMENT: '#7A8495',
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
      SELECTION: '#3D3D66',
      COMMENT: '#8C77C3',
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
      SELECTION: '#4D4339',
      COMMENT: '#9E8766',
      CYAN: '#88C0D0',
      GREEN: '#A3BE8C',
      ORANGE: '#D08770',
      PINK: '#D4A574',
      PURPLE: '#B48EAD',
      RED: '#BF616A',
      YELLOW: '#EBCB8B'
    },
    ansi: { BLUE: '#81A1C1', MAGENTA: '#B48EAD' }
  },
  'the-lab': {
    id: 'the-lab',
    name: 'Stranger Theme: The Lab',
    displayName: 'The Lab',
    base: {
      BG: '#1A1D26',
      FG: '#E0E5EC',
      SELECTION: '#3C3F48',
      COMMENT: '#73879C',
      CYAN: '#39CCCC',
      GREEN: '#2ECC40',
      ORANGE: '#FF851B',
      PINK: '#7FDBFF',
      PURPLE: '#B10DC9',
      RED: '#FF4136',
      YELLOW: '#FFDC00'
    },
    ansi: { BLUE: '#7FDBFF', MAGENTA: '#B10DC9' }
  },
  'tigers': {
    id: 'tigers',
    name: 'Stranger Theme: Tigers',
    displayName: 'Tigers',
    base: {
      BG: '#181E18',
      FG: '#F5F5F5',
      SELECTION: '#38463A',
      COMMENT: '#758975',
      CYAN: '#81A2BE',
      GREEN: '#B5BD68',
      ORANGE: '#DE935F',
      PINK: '#FF7F2A',
      PURPLE: '#B294BB',
      RED: '#CC6666',
      YELLOW: '#F0C674'
    },
    ansi: { BLUE: '#81A2BE', MAGENTA: '#B294BB', CYAN: '#8ABEB7' }
  },
  'dimension-x': {
    id: 'dimension-x',
    name: 'Stranger Theme: Dimension X',
    displayName: 'Dimension X',
    base: {
      BG: '#1E1A1A',
      FG: '#E8D5D5',
      SELECTION: '#523535',
      COMMENT: '#9A7C7C',
      CYAN: '#D19A66',
      GREEN: '#8B7355',
      ORANGE: '#FF6B6B',
      PINK: '#E06C75',
      PURPLE: '#C678DD',
      RED: '#FF55AA',
      YELLOW: '#BCA89F'
    },
    ansi: { RED: '#FF6B6B', GREEN: '#8FAE7E', YELLOW: '#D19A66', MAGENTA: '#FF55AA', CYAN: '#7FB5B0' }
  }
};

// Base slot each normal ANSI colour takes when the variant has no `ansi` override for it.
const ANSI_SLOTS = { RED: 'RED', GREEN: 'GREEN', YELLOW: 'YELLOW', BLUE: 'PURPLE', MAGENTA: 'PINK', CYAN: 'CYAN' };

// Overrides keyed by the variant's `base` object, so getDerivedColors(palette.base) finds them.
const ANSI_OVERRIDES = new Map(Object.values(THEME_PALETTES).map(p => [p.base, p.ansi || {}]));

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
 * @param {object} palette - A variant's base colours: THEME_PALETTES[id].base itself, not a copy,
 *   so the variant's ANSI overrides always apply. Anything else throws.
 * @returns {object} Extended palette with derived colors
 */
function getDerivedColors(palette) {
  const overrides = ANSI_OVERRIDES.get(palette);
  if (!overrides) {
    throw new Error('getDerivedColors() takes THEME_PALETTES[id].base (not a copy), so ANSI overrides apply');
  }
  // Normal ANSI colour: the variant's override, else its base slot.
  const ansi = name => overrides[name] || palette[ANSI_SLOTS[name]];
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
    // BG + 40 so ANSI black text stays visible on the terminal background
    ANSI_BLACK: adjustColor(palette.BG, 40),
    ANSI_RED: ansi('RED'),
    ANSI_GREEN: ansi('GREEN'),
    ANSI_YELLOW: ansi('YELLOW'),
    ANSI_BLUE: ansi('BLUE'),
    ANSI_MAGENTA: ansi('MAGENTA'),
    ANSI_CYAN: ansi('CYAN'),
    ANSI_WHITE: palette.FG,
    ANSI_BRIGHT_BLACK: palette.COMMENT,
    ANSI_BRIGHT_RED: adjustColor(ansi('RED'), 30),
    ANSI_BRIGHT_GREEN: adjustColor(ansi('GREEN'), 30),
    ANSI_BRIGHT_YELLOW: adjustColor(ansi('YELLOW'), 30),
    ANSI_BRIGHT_BLUE: adjustColor(ansi('BLUE'), 30),
    ANSI_BRIGHT_MAGENTA: adjustColor(ansi('MAGENTA'), 30),
    ANSI_BRIGHT_CYAN: adjustColor(ansi('CYAN'), 30),
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
  ANSI_SLOTS,
  adjustColor,
  getDerivedColors,
  hexToRgb,
  hexToRgbString,
  hexToNormalizedRgb
};
