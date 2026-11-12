/**
 * Stranger Theme: Dimension X for Hyper Terminal
 * https://github.com/stranger-theme/stranger-theme/tree/main/hyper
 * 
 * Install: Add "hyper-stranger-theme-dimension-x" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#1E1A1A';
const foregroundColor = '#E8D5D5';
const borderColor = '#523535';
const cursorColor = '#E8D5D5';

const colors = {
  black: '#464242',
  red: '#FF6B6B',
  green: '#8FAE7E',
  yellow: '#D19A66',
  blue: '#C678DD',
  magenta: '#FF55AA',
  cyan: '#7FB5B0',
  white: '#E8D5D5',
  lightBlack: '#9A7C7C',
  lightRed: '#FF8989',
  lightGreen: '#ADCC9C',
  lightYellow: '#EFB884',
  lightBlue: '#E496FB',
  lightMagenta: '#FF73C8',
  lightCyan: '#9DD3CE',
  lightWhite: '#FFFFFF',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '#523535',
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
