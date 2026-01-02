/**
 * Stranger Theme: Dimension X for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-dimension-x" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#1E1A1A';
const foregroundColor = '#E8D5D5';
const borderColor = '#3E2A2A';
const cursorColor = '#E8D5D5';

const colors = {
  black: '#1E1A1A',
  red: '#FF55AA',
  green: '#8B7355',
  yellow: '#BCA89F',
  blue: '#C678DD',
  magenta: '#E06C75',
  cyan: '#D19A66',
  white: '#E8D5D5',
  lightBlack: '#5C4A4A',
  lightRed: '#FF73C8',
  lightGreen: '#A99173',
  lightYellow: '#DAC6BD',
  lightBlue: '#E496FB',
  lightMagenta: '#FE8A93',
  lightCyan: '#EFB884',
  lightWhite: '#FFFFFF',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '#3E2A2A',
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
