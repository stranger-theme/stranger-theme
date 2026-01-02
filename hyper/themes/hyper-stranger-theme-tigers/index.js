/**
 * Stranger Theme: Tigers for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-tigers" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#1A1A1A';
const foregroundColor = '#F5F5F5';
const borderColor = '#2A2A2A';
const cursorColor = '#F5F5F5';

const colors = {
  black: '#1A1A1A',
  red: '#CC6666',
  green: '#B5BD68',
  yellow: '#F0C674',
  blue: '#B294BB',
  magenta: '#FF7F2A',
  cyan: '#81A2BE',
  white: '#F5F5F5',
  lightBlack: '#5C5C5C',
  lightRed: '#EA8484',
  lightGreen: '#D3DB86',
  lightYellow: '#FFE492',
  lightBlue: '#D0B2D9',
  lightMagenta: '#FF9D48',
  lightCyan: '#9FC0DC',
  lightWhite: '#FFFFFF',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '#2A2A2A',
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
