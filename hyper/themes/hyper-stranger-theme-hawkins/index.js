/**
 * Stranger Theme: Hawkins for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-hawkins" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#2C2218';
const foregroundColor = '#E8DCC8';
const borderColor = '#4D4339';
const cursorColor = '#E8DCC8';

const colors = {
  black: '#544A40',
  red: '#BF616A',
  green: '#A3BE8C',
  yellow: '#EBCB8B',
  blue: '#81A1C1',
  magenta: '#B48EAD',
  cyan: '#88C0D0',
  white: '#E8DCC8',
  lightBlack: '#9E8766',
  lightRed: '#DD7F88',
  lightGreen: '#C1DCAA',
  lightYellow: '#FFE9A9',
  lightBlue: '#9FBFDF',
  lightMagenta: '#D2ACCB',
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
    selectionColor: '#4D4339',
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
