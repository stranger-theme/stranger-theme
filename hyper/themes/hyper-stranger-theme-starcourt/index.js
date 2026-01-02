/**
 * Stranger Theme: Starcourt for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-starcourt" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#1A1A2E';
const foregroundColor = '#EAEAEA';
const borderColor = '#2E2E4A';
const cursorColor = '#EAEAEA';

const colors = {
  black: '#1A1A2E',
  red: '#FF6B6B',
  green: '#00FA9A',
  yellow: '#FFD700',
  blue: '#BA55D3',
  magenta: '#FF1493',
  cyan: '#00CED1',
  white: '#EAEAEA',
  lightBlack: '#6B5B95',
  lightRed: '#FF8989',
  lightGreen: '#1EFFB8',
  lightYellow: '#FFF51E',
  lightBlue: '#D873F1',
  lightMagenta: '#FF32B1',
  lightCyan: '#1EECEF',
  lightWhite: '#FFFFFF',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '#2E2E4A',
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
