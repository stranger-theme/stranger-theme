#!/usr/bin/env node

/**
 * Build script for Stranger Theme - JetBrains
 * Generates .theme.json and Scheme.xml files for all theme variants
 */

const fs = require('fs');
const path = require('path');

// Import shared palettes
const { THEME_PALETTES, adjustColor } = require('../../shared/palettes');

const THEMES_DIR = path.join(__dirname, '..', 'themes');

/**
 * Convert hex to JetBrains color format (6 hex digits without #)
 */
function toJBColor(hex) {
  return hex.replace('#', '').toLowerCase();
}

/**
 * Generate the UI theme JSON file
 */
function generateThemeJson(themeId, palette) {
  const colors = palette.base;
  const bgLight = adjustColor(colors.BG, 20);
  const bgLighter = adjustColor(colors.BG, 40);
  
  return {
    name: palette.name,
    dark: true,
    author: "Stranger Theme",
    editorScheme: `/themes/${themeId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Scheme.xml`,
    ui: {
      "*": {
        background: colors.BG,
        foreground: colors.FG,
        infoForeground: colors.COMMENT,
        selectionBackground: colors.SELECTION,
        selectionForeground: colors.FG,
        selectionInactiveBackground: bgLight,
        disabledForeground: colors.COMMENT,
        disabledBackground: colors.BG,
        inactiveBackground: colors.BG,
        errorForeground: colors.RED,
        borderColor: colors.BG,
        separatorColor: colors.BG
      },
      ActionButton: {
        hoverBackground: colors.SELECTION,
        hoverBorderColor: colors.SELECTION,
        pressedBackground: colors.SELECTION,
        pressedBorderColor: colors.SELECTION
      },
      Button: {
        startBackground: colors.SELECTION,
        endBackground: colors.SELECTION,
        startBorderColor: colors.SELECTION,
        endBorderColor: colors.SELECTION,
        focusedBorderColor: colors.PINK,
        default: {
          foreground: colors.FG,
          startBackground: colors.PINK,
          endBackground: colors.PINK,
          startBorderColor: colors.PINK,
          endBorderColor: colors.PINK,
          focusedBorderColor: colors.CYAN
        }
      },
      Borders: {
        color: colors.BG,
        ContrastBorderColor: colors.BG
      },
      ComboBox: {
        nonEditableBackground: colors.BG,
        ArrowButton: {
          iconColor: colors.FG,
          disabledIconColor: colors.COMMENT,
          nonEditableBackground: colors.BG
        }
      },
      CompletionPopup: {
        matchForeground: colors.CYAN,
        selectionBackground: colors.SELECTION,
        selectionInactiveBackground: bgLight
      },
      Component: {
        errorFocusColor: colors.RED,
        inactiveErrorFocusColor: colors.RED,
        warningFocusColor: colors.YELLOW,
        inactiveWarningFocusColor: colors.YELLOW
      },
      Counter: {
        background: colors.SELECTION,
        foreground: colors.FG
      },
      "DebuggerPopup.borderColor": colors.BG,
      "DebuggerTabs.selectedBackground": colors.SELECTION,
      DragAndDrop: {
        areaBackground: colors.BG,
        areaBorderColor: colors.SELECTION
      },
      Editor: {
        background: colors.BG,
        foreground: colors.FG,
        shortcutForeground: colors.CYAN
      },
      EditorPane: {
        inactiveBackground: colors.BG,
        inactiveForeground: colors.COMMENT
      },
      EditorTabs: {
        selectedBackground: colors.SELECTION,
        selectedForeground: colors.FG,
        inactiveUnderlineColor: colors.COMMENT,
        underlineColor: colors.PINK,
        underlinedTabBackground: colors.SELECTION,
        hoverBackground: bgLight,
        hoverForeground: colors.FG
      },
      FileColor: {
        Yellow: colors.YELLOW + "1A",
        Green: colors.GREEN + "1A",
        Blue: colors.CYAN + "1A",
        Violet: colors.PINK + "1A",
        Orange: colors.ORANGE + "1A",
        Rose: colors.PINK + "1A"
      },
      Link: {
        activeForeground: colors.CYAN,
        hoverForeground: colors.CYAN,
        pressedForeground: colors.CYAN,
        visitedForeground: colors.PINK
      },
      List: {
        background: colors.BG,
        foreground: colors.FG,
        selectionBackground: colors.SELECTION,
        selectionForeground: colors.FG,
        selectionInactiveBackground: bgLight,
        selectionInactiveForeground: colors.FG
      },
      Menu: {
        background: colors.BG,
        foreground: colors.FG,
        selectionBackground: colors.SELECTION,
        selectionForeground: colors.FG,
        disabledBackground: colors.BG,
        disabledForeground: colors.COMMENT,
        acceleratorForeground: colors.COMMENT,
        acceleratorSelectionForeground: colors.FG,
        borderColor: colors.BG,
        separatorColor: colors.BG
      },
      Notification: {
        background: colors.BG,
        borderColor: colors.SELECTION,
        errorBackground: colors.BG,
        errorBorderColor: colors.RED,
        errorForeground: colors.FG
      },
      ProgressBar: {
        background: colors.BG,
        foreground: colors.PINK,
        indeterminateStartColor: colors.PINK,
        indeterminateEndColor: colors.CYAN,
        progressColor: colors.PINK,
        trackColor: colors.SELECTION
      },
      ScrollBar: {
        background: colors.BG,
        hoverThumbColor: colors.SELECTION,
        thumbColor: colors.SELECTION,
        trackColor: colors.BG
      },
      SearchMatch: {
        endBackground: colors.PINK,
        startBackground: colors.PINK
      },
      TabbedPane: {
        background: colors.BG,
        underlineColor: colors.PINK,
        hoverColor: colors.SELECTION,
        focusColor: colors.SELECTION
      },
      Table: {
        background: colors.BG,
        foreground: colors.FG,
        gridColor: colors.BG,
        selectionBackground: colors.SELECTION,
        selectionForeground: colors.FG,
        stripeColor: bgLight
      },
      TextField: {
        background: colors.BG,
        foreground: colors.FG,
        selectionBackground: colors.SELECTION,
        selectionForeground: colors.FG,
        caretForeground: colors.FG
      },
      ToolWindow: {
        Button: {
          selectedBackground: colors.SELECTION,
          selectedForeground: colors.FG,
          hoverBackground: colors.SELECTION
        },
        Header: {
          background: colors.BG,
          borderColor: colors.BG,
          inactiveBackground: colors.BG
        },
        HeaderTab: {
          hoverBackground: colors.SELECTION,
          selectedBackground: colors.SELECTION,
          underlineColor: colors.PINK
        }
      },
      Tree: {
        background: colors.BG,
        foreground: colors.FG,
        selectionBackground: colors.SELECTION,
        selectionForeground: colors.FG,
        selectionInactiveBackground: bgLight,
        modifiedItemForeground: colors.CYAN
      },
      ValidationTooltip: {
        errorBackground: colors.RED,
        errorBorderColor: colors.RED,
        warningBackground: colors.YELLOW,
        warningBorderColor: colors.YELLOW
      },
      VersionControl: {
        GitLog: {
          headIconColor: colors.GREEN,
          localBranchIconColor: colors.GREEN,
          otherIconColor: colors.COMMENT,
          remoteBranchIconColor: colors.PINK,
          tagIconColor: colors.YELLOW
        }
      },
      WelcomeScreen: {
        background: colors.BG,
        borderColor: colors.BG,
        separatorColor: colors.BG,
        Projects: {
          background: colors.BG,
          selectionBackground: colors.SELECTION,
          selectionInactiveBackground: bgLight
        }
      }
    },
    icons: {
      ColorPalette: {
        "Actions.Blue": colors.CYAN,
        "Actions.Green": colors.GREEN,
        "Actions.Grey": colors.COMMENT,
        "Actions.Red": colors.RED,
        "Actions.Yellow": colors.YELLOW,
        "Objects.Blue": colors.CYAN,
        "Objects.Green": colors.GREEN,
        "Objects.Grey": colors.COMMENT,
        "Objects.Pink": colors.PINK,
        "Objects.Purple": colors.PURPLE,
        "Objects.Red": colors.RED,
        "Objects.Yellow": colors.YELLOW
      }
    }
  };
}

/**
 * Generate the editor color scheme XML file
 */
function generateSchemeXml(themeId, palette) {
  const colors = palette.base;
  const bgLight = adjustColor(colors.BG, 20);
  const bgLighter = adjustColor(colors.BG, 40);
  
  // Convert colors to JB format (no #)
  const c = {
    BG: toJBColor(colors.BG),
    FG: toJBColor(colors.FG),
    SELECTION: toJBColor(colors.SELECTION),
    COMMENT: toJBColor(colors.COMMENT),
    CYAN: toJBColor(colors.CYAN),
    GREEN: toJBColor(colors.GREEN),
    ORANGE: toJBColor(colors.ORANGE),
    PINK: toJBColor(colors.PINK),
    PURPLE: toJBColor(colors.PURPLE),
    RED: toJBColor(colors.RED),
    YELLOW: toJBColor(colors.YELLOW),
    BGLight: toJBColor(bgLight),
    BGLighter: toJBColor(bgLighter)
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<scheme name="${palette.name}" version="142" parent_scheme="Darcula">
  <metaInfo>
    <property name="created">${new Date().toISOString().split('T')[0]}T00:00:00</property>
    <property name="ide">idea</property>
    <property name="ideVersion">2023.3.0.0</property>
    <property name="modified">${new Date().toISOString().split('T')[0]}T00:00:00</property>
    <property name="originalScheme">${palette.name}</property>
  </metaInfo>
  <colors>
    <option name="ADDED_LINES_COLOR" value="${c.GREEN}"/>
    <option name="ANNOTATIONS_COLOR" value="${c.COMMENT}"/>
    <option name="CARET_COLOR" value="${c.FG}"/>
    <option name="CARET_ROW_COLOR" value="${c.BGLight}"/>
    <option name="CONSOLE_BACKGROUND_KEY" value="${c.BG}"/>
    <option name="DELETED_LINES_COLOR" value="${c.RED}"/>
    <option name="DIFF_SEPARATORS_BACKGROUND" value="${c.BGLight}"/>
    <option name="DOCUMENTATION_COLOR" value="${c.BGLight}"/>
    <option name="ERROR_HINT" value="${c.RED}"/>
    <option name="FILESTATUS_ADDED" value="${c.GREEN}"/>
    <option name="FILESTATUS_COPIED" value="${c.GREEN}"/>
    <option name="FILESTATUS_DELETED" value="${c.RED}"/>
    <option name="FILESTATUS_MERGED" value="${c.PURPLE}"/>
    <option name="FILESTATUS_MODIFIED" value="${c.CYAN}"/>
    <option name="FILESTATUS_NOT_CHANGED_IMMEDIATE" value="${c.PURPLE}"/>
    <option name="FILESTATUS_UNKNOWN" value="${c.ORANGE}"/>
    <option name="GUTTER_BACKGROUND" value="${c.BG}"/>
    <option name="INDENT_GUIDE" value="${c.BGLight}"/>
    <option name="INFORMATION_HINT" value="${c.BGLight}"/>
    <option name="LINE_NUMBERS_COLOR" value="${c.COMMENT}"/>
    <option name="LINE_NUMBER_ON_CARET_ROW_COLOR" value="${c.FG}"/>
    <option name="LOOKUP_COLOR" value="${c.BGLight}"/>
    <option name="METHOD_SEPARATORS_COLOR" value="${c.BGLight}"/>
    <option name="MODIFIED_LINES_COLOR" value="${c.CYAN}"/>
    <option name="NOTIFICATION_BACKGROUND" value="${c.BGLight}"/>
    <option name="RECENT_LOCATIONS_SELECTION" value="${c.SELECTION}"/>
    <option name="RIGHT_MARGIN_COLOR" value="${c.BGLight}"/>
    <option name="SELECTED_INDENT_GUIDE" value="${c.COMMENT}"/>
    <option name="SELECTION_BACKGROUND" value="${c.SELECTION}"/>
    <option name="SELECTION_FOREGROUND" value="${c.FG}"/>
    <option name="TEARLINE_COLOR" value="${c.BGLight}"/>
    <option name="WHITESPACES" value="${c.COMMENT}"/>
  </colors>
  <attributes>
    <option name="ANNOTATION_ATTRIBUTE_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
      </value>
    </option>
    <option name="ANNOTATION_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.GREEN}"/>
      </value>
    </option>
    <option name="BAD_CHARACTER">
      <value>
        <option name="FOREGROUND" value="${c.RED}"/>
        <option name="EFFECT_COLOR" value="${c.RED}"/>
        <option name="EFFECT_TYPE" value="2"/>
      </value>
    </option>
    <option name="BREADCRUMBS_CURRENT">
      <value>
        <option name="FOREGROUND" value="${c.FG}"/>
        <option name="BACKGROUND" value="${c.SELECTION}"/>
      </value>
    </option>
    <option name="BREADCRUMBS_DEFAULT">
      <value>
        <option name="FOREGROUND" value="${c.COMMENT}"/>
      </value>
    </option>
    <option name="CONSOLE_BLUE_OUTPUT">
      <value>
        <option name="FOREGROUND" value="${c.PURPLE}"/>
      </value>
    </option>
    <option name="CONSOLE_CYAN_OUTPUT">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
      </value>
    </option>
    <option name="CONSOLE_ERROR_OUTPUT">
      <value>
        <option name="FOREGROUND" value="${c.RED}"/>
      </value>
    </option>
    <option name="CONSOLE_GREEN_OUTPUT">
      <value>
        <option name="FOREGROUND" value="${c.GREEN}"/>
      </value>
    </option>
    <option name="CONSOLE_MAGENTA_OUTPUT">
      <value>
        <option name="FOREGROUND" value="${c.PINK}"/>
      </value>
    </option>
    <option name="CONSOLE_NORMAL_OUTPUT">
      <value>
        <option name="FOREGROUND" value="${c.FG}"/>
      </value>
    </option>
    <option name="CONSOLE_RED_OUTPUT">
      <value>
        <option name="FOREGROUND" value="${c.RED}"/>
      </value>
    </option>
    <option name="CONSOLE_YELLOW_OUTPUT">
      <value>
        <option name="FOREGROUND" value="${c.YELLOW}"/>
      </value>
    </option>
    <option name="DEFAULT_BLOCK_COMMENT">
      <value>
        <option name="FOREGROUND" value="${c.COMMENT}"/>
        <option name="FONT_TYPE" value="2"/>
      </value>
    </option>
    <option name="DEFAULT_CLASS_NAME">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
      </value>
    </option>
    <option name="DEFAULT_CLASS_REFERENCE">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
      </value>
    </option>
    <option name="DEFAULT_CONSTANT">
      <value>
        <option name="FOREGROUND" value="${c.PURPLE}"/>
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT">
      <value>
        <option name="FOREGROUND" value="${c.COMMENT}"/>
        <option name="FONT_TYPE" value="2"/>
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT_TAG">
      <value>
        <option name="FOREGROUND" value="${c.PINK}"/>
        <option name="FONT_TYPE" value="3"/>
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT_TAG_VALUE">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
        <option name="FONT_TYPE" value="2"/>
      </value>
    </option>
    <option name="DEFAULT_FUNCTION_CALL">
      <value>
        <option name="FOREGROUND" value="${c.GREEN}"/>
      </value>
    </option>
    <option name="DEFAULT_FUNCTION_DECLARATION">
      <value>
        <option name="FOREGROUND" value="${c.GREEN}"/>
      </value>
    </option>
    <option name="DEFAULT_GLOBAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="${c.PURPLE}"/>
      </value>
    </option>
    <option name="DEFAULT_IDENTIFIER">
      <value>
        <option name="FOREGROUND" value="${c.FG}"/>
      </value>
    </option>
    <option name="DEFAULT_INSTANCE_FIELD">
      <value>
        <option name="FOREGROUND" value="${c.PURPLE}"/>
      </value>
    </option>
    <option name="DEFAULT_INSTANCE_METHOD">
      <value>
        <option name="FOREGROUND" value="${c.GREEN}"/>
      </value>
    </option>
    <option name="DEFAULT_INTERFACE_NAME">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
      </value>
    </option>
    <option name="DEFAULT_INVALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="${c.RED}"/>
        <option name="EFFECT_COLOR" value="${c.RED}"/>
        <option name="EFFECT_TYPE" value="2"/>
      </value>
    </option>
    <option name="DEFAULT_KEYWORD">
      <value>
        <option name="FOREGROUND" value="${c.PINK}"/>
      </value>
    </option>
    <option name="DEFAULT_LABEL">
      <value>
        <option name="FOREGROUND" value="${c.PINK}"/>
      </value>
    </option>
    <option name="DEFAULT_LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="${c.COMMENT}"/>
        <option name="FONT_TYPE" value="2"/>
      </value>
    </option>
    <option name="DEFAULT_LOCAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="${c.FG}"/>
      </value>
    </option>
    <option name="DEFAULT_METADATA">
      <value>
        <option name="FOREGROUND" value="${c.YELLOW}"/>
      </value>
    </option>
    <option name="DEFAULT_NUMBER">
      <value>
        <option name="FOREGROUND" value="${c.PURPLE}"/>
      </value>
    </option>
    <option name="DEFAULT_OPERATION_SIGN">
      <value>
        <option name="FOREGROUND" value="${c.PINK}"/>
      </value>
    </option>
    <option name="DEFAULT_PARAMETER">
      <value>
        <option name="FOREGROUND" value="${c.ORANGE}"/>
        <option name="FONT_TYPE" value="2"/>
      </value>
    </option>
    <option name="DEFAULT_PARENTHS">
      <value>
        <option name="FOREGROUND" value="${c.FG}"/>
      </value>
    </option>
    <option name="DEFAULT_PREDEFINED_SYMBOL">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
      </value>
    </option>
    <option name="DEFAULT_SEMICOLON">
      <value>
        <option name="FOREGROUND" value="${c.FG}"/>
      </value>
    </option>
    <option name="DEFAULT_STATIC_FIELD">
      <value>
        <option name="FOREGROUND" value="${c.PURPLE}"/>
        <option name="FONT_TYPE" value="2"/>
      </value>
    </option>
    <option name="DEFAULT_STATIC_METHOD">
      <value>
        <option name="FOREGROUND" value="${c.GREEN}"/>
        <option name="FONT_TYPE" value="2"/>
      </value>
    </option>
    <option name="DEFAULT_STRING">
      <value>
        <option name="FOREGROUND" value="${c.YELLOW}"/>
      </value>
    </option>
    <option name="DEFAULT_TAG">
      <value>
        <option name="FOREGROUND" value="${c.PINK}"/>
      </value>
    </option>
    <option name="DEFAULT_TEMPLATE_LANGUAGE_COLOR">
      <value>
        <option name="BACKGROUND" value="${c.BGLight}"/>
      </value>
    </option>
    <option name="DEFAULT_VALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="${c.PINK}"/>
      </value>
    </option>
    <option name="DEPRECATED_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.COMMENT}"/>
        <option name="EFFECT_COLOR" value="${c.COMMENT}"/>
        <option name="EFFECT_TYPE" value="3"/>
      </value>
    </option>
    <option name="ERRORS_ATTRIBUTES">
      <value>
        <option name="EFFECT_COLOR" value="${c.RED}"/>
        <option name="ERROR_STRIPE_COLOR" value="${c.RED}"/>
        <option name="EFFECT_TYPE" value="2"/>
      </value>
    </option>
    <option name="FOLDED_TEXT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.COMMENT}"/>
        <option name="BACKGROUND" value="${c.BGLight}"/>
      </value>
    </option>
    <option name="HTML_ATTRIBUTE_NAME">
      <value>
        <option name="FOREGROUND" value="${c.GREEN}"/>
        <option name="FONT_TYPE" value="2"/>
      </value>
    </option>
    <option name="HTML_ATTRIBUTE_VALUE">
      <value>
        <option name="FOREGROUND" value="${c.YELLOW}"/>
      </value>
    </option>
    <option name="HTML_CUSTOM_TAG_NAME">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
      </value>
    </option>
    <option name="HTML_TAG_NAME">
      <value>
        <option name="FOREGROUND" value="${c.PINK}"/>
      </value>
    </option>
    <option name="HYPERLINK_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.CYAN}"/>
        <option name="EFFECT_COLOR" value="${c.CYAN}"/>
        <option name="EFFECT_TYPE" value="1"/>
      </value>
    </option>
    <option name="IDENTIFIER_UNDER_CARET_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="${c.SELECTION}"/>
        <option name="ERROR_STRIPE_COLOR" value="${c.PURPLE}"/>
      </value>
    </option>
    <option name="INFO_ATTRIBUTES">
      <value>
        <option name="EFFECT_COLOR" value="${c.CYAN}"/>
        <option name="ERROR_STRIPE_COLOR" value="${c.CYAN}"/>
        <option name="EFFECT_TYPE" value="2"/>
      </value>
    </option>
    <option name="INJECTED_LANGUAGE_FRAGMENT">
      <value>
        <option name="BACKGROUND" value="${c.BGLight}"/>
      </value>
    </option>
    <option name="MATCHED_BRACE_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.FG}"/>
        <option name="BACKGROUND" value="${c.SELECTION}"/>
        <option name="FONT_TYPE" value="1"/>
      </value>
    </option>
    <option name="NOT_USED_ELEMENT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.COMMENT}"/>
      </value>
    </option>
    <option name="SEARCH_RESULT_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="${c.SELECTION}"/>
        <option name="ERROR_STRIPE_COLOR" value="${c.PURPLE}"/>
      </value>
    </option>
    <option name="TEXT">
      <value>
        <option name="FOREGROUND" value="${c.FG}"/>
        <option name="BACKGROUND" value="${c.BG}"/>
      </value>
    </option>
    <option name="TODO_DEFAULT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.YELLOW}"/>
        <option name="FONT_TYPE" value="3"/>
        <option name="ERROR_STRIPE_COLOR" value="${c.YELLOW}"/>
      </value>
    </option>
    <option name="WARNING_ATTRIBUTES">
      <value>
        <option name="EFFECT_COLOR" value="${c.YELLOW}"/>
        <option name="ERROR_STRIPE_COLOR" value="${c.YELLOW}"/>
        <option name="EFFECT_TYPE" value="2"/>
      </value>
    </option>
    <option name="WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="${c.SELECTION}"/>
        <option name="ERROR_STRIPE_COLOR" value="${c.PURPLE}"/>
      </value>
    </option>
    <option name="WRONG_REFERENCES_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${c.RED}"/>
      </value>
    </option>
  </attributes>
</scheme>
`;
}

/**
 * Get the XML filename for a theme
 */
function getSchemeFileName(themeId) {
  const parts = themeId.split('-');
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Scheme.xml';
}

/**
 * Get the JSON filename for a theme
 */
function getThemeFileName(themeId) {
  const parts = themeId.split('-');
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + '.theme.json';
}

/**
 * Main build function
 */
function build() {
  console.log('Building Stranger Theme for JetBrains...\n');

  // Ensure themes directory exists
  if (!fs.existsSync(THEMES_DIR)) {
    fs.mkdirSync(THEMES_DIR, { recursive: true });
  }

  // Build each theme variant
  for (const [themeId, palette] of Object.entries(THEME_PALETTES)) {
    console.log(`Building ${palette.name}...`);
    
    // Generate theme JSON
    const themeJson = generateThemeJson(themeId, palette);
    const themeFile = path.join(THEMES_DIR, getThemeFileName(themeId));
    fs.writeFileSync(themeFile, JSON.stringify(themeJson, null, 2));
    console.log(`  -> ${themeFile}`);
    
    // Generate scheme XML
    const schemeXml = generateSchemeXml(themeId, palette);
    const schemeFile = path.join(THEMES_DIR, getSchemeFileName(themeId));
    fs.writeFileSync(schemeFile, schemeXml);
    console.log(`  -> ${schemeFile}`);
  }

  console.log('\nBuild complete!');
}

// Run build
build();
