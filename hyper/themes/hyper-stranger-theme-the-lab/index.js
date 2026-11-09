/**
 * Stranger Theme: The Lab for Hyper Terminal
 * https://github.com/stranger-theme/hyper
 * 
 * Install: Add "hyper-stranger-theme-the-lab" to your plugins in ~/.hyper.js
 */

const backgroundColor = '#1A1D26';
const foregroundColor = '#E0E5EC';
const borderColor = '#3C3F48';
const cursorColor = '#E0E5EC';

const colors = {
  black: '#42454E',
  red: '#FF4136',
  green: '#2ECC40',
  yellow: '#FFDC00',
  blue: '#B10DC9',
  magenta: '#7FDBFF',
  cyan: '#39CCCC',
  white: '#E0E5EC',
  lightBlack: '#73879C',
  lightRed: '#FF5F54',
  lightGreen: '#4CEA5E',
  lightYellow: '#FFFA1E',
  lightBlue: '#CF2BE7',
  lightMagenta: '#9DF9FF',
  lightCyan: '#57EAEA',
  lightWhite: '#FFFFFF',
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: config.backgroundColor || backgroundColor,
    foregroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor: backgroundColor,
    selectionColor: '#3C3F48',
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
