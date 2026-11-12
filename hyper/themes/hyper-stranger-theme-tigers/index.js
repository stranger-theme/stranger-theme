/**
 * Stranger Theme: Tigers for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-tigers" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#181E18';
const foregroundColor = '#F5F5F5';
const borderColor = '#38463A';
const cursorColor = '#F5F5F5';

const colors = {
  black: '#404640',
  red: '#CC6666',
  green: '#B5BD68',
  yellow: '#F0C674',
  blue: '#81A2BE',
  magenta: '#B294BB',
  cyan: '#8ABEB7',
  white: '#F5F5F5',
  lightBlack: '#758975',
  lightRed: '#EA8484',
  lightGreen: '#D3DB86',
  lightYellow: '#FFE492',
  lightBlue: '#9FC0DC',
  lightMagenta: '#D0B2D9',
  lightCyan: '#A8DCD5',
  lightWhite: '#FFFFFF',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '#38463A',
    colors,
    termCSS: `
      ${config.termCSS || ''}
      .terminal-cursor {
        background-color: ${cursorColor} !important;
      }
    `,
    css: `
      ${config.css || ''}
      .tabs_list .tab_tab.tab_active .tab_text {
        background: ${backgroundColor};
      }
      .tab_active:before {
        border-color: ${borderColor};
      }
      .splitpane_divider {
        background-color: ${borderColor} !important;
      }
    `,
  });
};
