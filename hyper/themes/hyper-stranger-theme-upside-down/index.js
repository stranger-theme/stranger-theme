/**
 * Stranger Theme: Upside Down for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-upside-down" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#0D1117';
const foregroundColor = '#F8F8F2';
const borderColor = '#2A3C4A';
const cursorColor = '#F8F8F2';

const colors = {
  black: '#0D1117',
  red: '#E06C75',
  green: '#98C379',
  yellow: '#E5C07B',
  blue: '#61AFEF',
  magenta: '#C678DD',
  cyan: '#56B6C2',
  white: '#F8F8F2',
  lightBlack: '#5C6370',
  lightRed: '#FE8A93',
  lightGreen: '#B6E197',
  lightYellow: '#FFDE99',
  lightBlue: '#7FCDFF',
  lightMagenta: '#E496FB',
  lightCyan: '#74D4E0',
  lightWhite: '#FFFFFF',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '#2A3C4A',
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
