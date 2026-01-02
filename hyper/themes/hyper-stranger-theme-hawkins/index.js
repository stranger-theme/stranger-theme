/**
 * Stranger Theme: Hawkins for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-hawkins" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#2C2218';
const foregroundColor = '#E8DCC8';
const borderColor = '#3C3228';
const cursorColor = '#E8DCC8';

const colors = {
  black: '#2C2218',
  red: '#BF616A',
  green: '#A3BE8C',
  yellow: '#EBCB8B',
  blue: '#B48EAD',
  magenta: '#D4A574',
  cyan: '#88C0D0',
  white: '#E8DCC8',
  lightBlack: '#6B5B45',
  lightRed: '#DD7F88',
  lightGreen: '#C1DCAA',
  lightYellow: '#FFE9A9',
  lightBlue: '#D2ACCB',
  lightMagenta: '#F2C392',
  lightCyan: '#A6DEEE',
  lightWhite: '#FFFFFF',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '#3C3228',
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
