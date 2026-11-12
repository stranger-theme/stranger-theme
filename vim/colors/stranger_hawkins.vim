" =============================================================================
" Name:        Stranger Theme: Hawkins
" Description: A dark theme inspired by Stranger Things
" Author:      Stranger Theme <https://github.com/stranger-theme>
" License:     MIT
" =============================================================================

" Initialization: {{{

set background=dark
highlight clear
if exists('syntax_on')
  syntax reset
endif

let g:colors_name = 'stranger_hawkins'

if !has('gui_running') && !(exists('&termguicolors') && &termguicolors) && &t_Co < 256
  finish
endif

" }}}
" Color Palette: {{{

let s:bg        = ['#2C2218', 235]
let s:fg        = ['#E8DCC8', 253]
let s:selection = ['#4D4339', 239]
let s:comment   = ['#9E8766', 244]
let s:cyan      = ['#88C0D0', 117]
let s:green     = ['#A3BE8C', 114]
let s:orange    = ['#D08770', 215]
let s:pink      = ['#D4A574', 212]
let s:purple    = ['#B48EAD', 141]
let s:red       = ['#BF616A', 203]
let s:yellow    = ['#EBCB8B', 228]

let s:bglight   = ['#40362C', 236]
let s:bglighter = ['#544A40', 237]
let s:bgdark    = ['#22180E', 234]
let s:none      = ['NONE', 'NONE']

" Subtle accent tints for diff / diagnostic backgrounds
let s:red_bg    = ['#462D27', 52]
let s:green_bg  = ['#413E2D', 22]
let s:orange_bg = ['#4A3428', 58]
let s:orange_hi = ['#654537', 94]
let s:yellow_bg = ['#493B29', 58]
let s:cyan_bg   = ['#3A3A34', 23]
let s:purple_bg = ['#40322E', 54]

" }}}
" Options: {{{

let s:transparent = get(g:, 'stranger_transparent_background', 0)
let s:no_italic   = get(g:, 'stranger_disable_italic', 0)
let s:dim         = get(g:, 'stranger_dim_inactive', 0)
let s:bg_main     = s:transparent ? s:none : s:bg

" }}}
" Helper Function: {{{

function! s:h(scope, fg, ...)
  let l:fg = a:fg
  let l:bg = get(a:, 1, s:none)
  let l:attr = get(a:, 2, '')
  let l:sp = get(a:, 3, [])
  if s:no_italic
    let l:attr = join(filter(split(l:attr, ','), 'v:val !=# "italic"'), ',')
  endif

  let l:hl = 'highlight ' . a:scope
  let l:hl .= ' guifg=' . l:fg[0] . ' ctermfg=' . l:fg[1]
  let l:hl .= ' guibg=' . l:bg[0] . ' ctermbg=' . l:bg[1]
  let l:hl .= ' gui=' . (l:attr ==# '' ? 'NONE' : l:attr)
  let l:hl .= ' cterm=' . (l:attr ==# '' ? 'NONE' : l:attr)
  if !empty(l:sp)
    let l:hl .= ' guisp=' . l:sp[0]
  endif
  execute l:hl
endfunction

" }}}
" Highlight Groups: {{{

" Editor: {{{
call s:h('Normal', s:fg, s:bg_main)
if s:dim
  call s:h('NormalNC', s:fg, s:bgdark)
elseif s:transparent
  call s:h('NormalNC', s:fg, s:none)
endif
call s:h('ColorColumn', s:none, s:bglight)
call s:h('Cursor', s:bg, s:fg)
call s:h('CursorColumn', s:none, s:bglight)
call s:h('CursorLine', s:none, s:bglight)
call s:h('CursorLineNr', s:yellow, s:bglight)
call s:h('Directory', s:cyan)
call s:h('DiffAdd', s:none, s:green_bg)
call s:h('DiffChange', s:none, s:orange_bg)
call s:h('DiffDelete', s:red, s:red_bg)
call s:h('DiffText', s:fg, s:orange_hi, 'bold')
call s:h('EndOfBuffer', s:bg)
call s:h('ErrorMsg', s:red, s:none, 'bold')
call s:h('VertSplit', s:selection)
call s:h('WinSeparator', s:selection)
call s:h('Folded', s:comment, s:bglight)
call s:h('FoldColumn', s:comment, s:bg_main)
call s:h('SignColumn', s:none, s:bg_main)
call s:h('IncSearch', s:bg, s:orange)
call s:h('CurSearch', s:bg, s:orange, 'bold')
call s:h('LineNr', s:comment)
call s:h('MatchParen', s:green, s:none, 'bold')
call s:h('ModeMsg', s:fg)
call s:h('MoreMsg', s:cyan)
call s:h('NonText', s:comment)
call s:h('Pmenu', s:fg, s:bglight)
call s:h('PmenuSel', s:fg, s:selection)
call s:h('PmenuSbar', s:none, s:bglight)
call s:h('PmenuThumb', s:none, s:selection)
call s:h('Question', s:cyan)
call s:h('Search', s:bg, s:yellow)
call s:h('SpecialKey', s:comment)
call s:h('SpellBad', s:red, s:none, 'undercurl', s:red)
call s:h('SpellCap', s:yellow, s:none, 'undercurl', s:yellow)
call s:h('SpellLocal', s:cyan, s:none, 'undercurl', s:cyan)
call s:h('SpellRare', s:pink, s:none, 'undercurl', s:pink)
call s:h('StatusLine', s:fg, s:bglight)
call s:h('StatusLineNC', s:comment, s:bglight)
call s:h('TabLine', s:comment, s:bglight)
call s:h('TabLineFill', s:none, s:bglight)
call s:h('TabLineSel', s:fg, s:bg)
call s:h('Title', s:green, s:none, 'bold')
call s:h('Visual', s:none, s:selection)
call s:h('VisualNOS', s:none, s:selection)
call s:h('WarningMsg', s:yellow)
call s:h('WildMenu', s:bg, s:cyan)
call s:h('NormalFloat', s:fg, s:bglight)
call s:h('FloatBorder', s:comment, s:bglight)
call s:h('FloatTitle', s:cyan, s:bglight, 'bold')
" }}}

" Syntax: {{{
call s:h('Comment', s:comment, s:none, 'italic')
call s:h('Constant', s:purple)
call s:h('String', s:yellow)
call s:h('Character', s:yellow)
call s:h('Number', s:purple)
call s:h('Boolean', s:purple)
call s:h('Float', s:purple)
call s:h('Identifier', s:fg)
call s:h('Function', s:green)
call s:h('Statement', s:pink)
call s:h('Conditional', s:pink)
call s:h('Repeat', s:pink)
call s:h('Label', s:pink)
call s:h('Operator', s:pink)
call s:h('Keyword', s:pink)
call s:h('Exception', s:pink)
call s:h('PreProc', s:pink)
call s:h('Include', s:pink)
call s:h('Define', s:pink)
call s:h('Macro', s:pink)
call s:h('PreCondit', s:pink)
call s:h('Type', s:cyan)
call s:h('StorageClass', s:cyan)
call s:h('Structure', s:cyan)
call s:h('Typedef', s:cyan)
call s:h('Special', s:pink)
call s:h('SpecialChar', s:pink)
call s:h('Tag', s:cyan)
call s:h('Delimiter', s:fg)
call s:h('SpecialComment', s:comment, s:none, 'italic')
call s:h('Debug', s:red)
call s:h('Underlined', s:cyan, s:none, 'underline')
call s:h('Ignore', s:comment)
call s:h('Error', s:red, s:none, 'bold')
call s:h('Todo', s:yellow, s:none, 'bold,italic')
call s:h('Bold', s:none, s:none, 'bold')
call s:h('Italic', s:none, s:none, 'italic')
" }}}

" Diagnostics (Neovim): {{{
if has('nvim')
  call s:h('DiagnosticError', s:red)
  call s:h('DiagnosticWarn', s:yellow)
  call s:h('DiagnosticInfo', s:cyan)
  call s:h('DiagnosticHint', s:purple)
  call s:h('DiagnosticOk', s:green)
  call s:h('DiagnosticUnderlineError', s:none, s:none, 'undercurl', s:red)
  call s:h('DiagnosticUnderlineWarn', s:none, s:none, 'undercurl', s:yellow)
  call s:h('DiagnosticUnderlineInfo', s:none, s:none, 'undercurl', s:cyan)
  call s:h('DiagnosticUnderlineHint', s:none, s:none, 'undercurl', s:purple)
  call s:h('DiagnosticUnderlineOk', s:none, s:none, 'undercurl', s:green)
  call s:h('DiagnosticVirtualTextError', s:red, s:red_bg)
  call s:h('DiagnosticVirtualTextWarn', s:yellow, s:yellow_bg)
  call s:h('DiagnosticVirtualTextInfo', s:cyan, s:cyan_bg)
  call s:h('DiagnosticVirtualTextHint', s:purple, s:purple_bg)
  call s:h('DiagnosticVirtualTextOk', s:green, s:green_bg)
  call s:h('DiagnosticSignError', s:red, s:bg_main)
  call s:h('DiagnosticSignWarn', s:yellow, s:bg_main)
  call s:h('DiagnosticSignInfo', s:cyan, s:bg_main)
  call s:h('DiagnosticSignHint', s:purple, s:bg_main)
  call s:h('DiagnosticSignOk', s:green, s:bg_main)
endif
" }}}

" Treesitter: {{{
if has('nvim')
  highlight! link @comment Comment
  highlight! link @constant Constant
  highlight! link @string String
  highlight! link @character Character
  highlight! link @number Number
  highlight! link @boolean Boolean
  highlight! link @float Float
  highlight! link @function Function
  highlight! link @function.builtin Function
  highlight! link @function.macro Macro
  highlight! link @parameter Identifier
  highlight! link @parameter.reference Identifier
  highlight! link @method Function
  highlight! link @field Identifier
  highlight! link @property Identifier
  highlight! link @constructor Type
  highlight! link @conditional Conditional
  highlight! link @repeat Repeat
  highlight! link @label Label
  highlight! link @operator Operator
  highlight! link @keyword Keyword
  highlight! link @keyword.function Keyword
  highlight! link @keyword.operator Operator
  highlight! link @keyword.return Keyword
  highlight! link @exception Exception
  highlight! link @variable Identifier
  highlight! link @variable.builtin Special
  highlight! link @type Type
  highlight! link @type.builtin Type
  highlight! link @type.qualifier Keyword
  highlight! link @include Include
  highlight! link @namespace Type
  highlight! link @text Normal
  highlight! link @text.strong Bold
  highlight! link @text.emphasis Italic
  highlight! link @text.underline Underlined
  highlight! link @text.title Title
  highlight! link @text.literal String
  highlight! link @text.uri Underlined
  highlight! link @tag Tag
  highlight! link @tag.attribute Identifier
  highlight! link @tag.delimiter Delimiter
  highlight! link @punctuation Delimiter
  highlight! link @punctuation.bracket Delimiter
  highlight! link @punctuation.delimiter Delimiter
  highlight! link @punctuation.special Special

  " Modern captures (nvim-treesitter >= 0.9 / Neovim 0.10)
  highlight! link @module Type
  highlight! link @module.builtin Special
  highlight! link @attribute PreProc
  highlight! link @constant.builtin Constant
  highlight! link @constant.macro Macro
  highlight! link @number.float Float
  highlight! link @string.regexp SpecialChar
  highlight! link @string.escape SpecialChar
  highlight! link @string.special Special
  highlight! link @variable.member Identifier
  highlight! link @variable.parameter Identifier
  highlight! link @function.call Function
  highlight! link @function.method Function
  highlight! link @function.method.call Function
  highlight! link @type.definition Typedef
  highlight! link @keyword.conditional Conditional
  highlight! link @keyword.repeat Repeat
  highlight! link @keyword.import Include
  highlight! link @keyword.exception Exception
  highlight! link @keyword.directive PreProc
  highlight! link @markup.heading Title
  highlight! link @markup.italic Italic
  highlight! link @markup.strong Bold
  highlight! link @markup.underline Underlined
  highlight! link @markup.link Underlined
  highlight! link @markup.link.url Underlined
  highlight! link @markup.link.label Special
  highlight! link @markup.raw String
  highlight! link @markup.list Special
  highlight! link @markup.quote Comment
  highlight! link @comment.todo Todo
  highlight! link @comment.note DiagnosticInfo
  highlight! link @comment.warning DiagnosticWarn
  highlight! link @comment.error DiagnosticError

  " LSP semantic tokens
  highlight! link @lsp.type.class Type
  highlight! link @lsp.type.enum Type
  highlight! link @lsp.type.interface Type
  highlight! link @lsp.type.namespace @module
  highlight! link @lsp.type.parameter @variable.parameter
  highlight! link @lsp.type.property @property
  highlight! link @lsp.type.function Function
  highlight! link @lsp.type.method Function
  highlight! link @lsp.type.macro Macro
  highlight! link @lsp.type.decorator @attribute
  highlight! link @lsp.type.enumMember @constant
  highlight! link @lsp.type.struct Type
  highlight! link @lsp.type.type Type
  highlight! link @lsp.type.typeParameter Type
  highlight! link @lsp.type.builtinType @type.builtin
  highlight! link @lsp.type.variable @variable
  highlight! link @lsp.type.keyword Keyword
  highlight! link @lsp.type.modifier Keyword
  highlight! link @lsp.type.operator Operator
  highlight! link @lsp.type.string String
  highlight! link @lsp.type.number Number
  highlight! link @lsp.type.regexp @string.regexp
  highlight! link @lsp.type.event Identifier
  highlight! link @lsp.typemod.function.defaultLibrary @function.builtin
  highlight! link @lsp.typemod.variable.defaultLibrary @variable.builtin
  highlight! link @lsp.typemod.variable.readonly @constant
  call s:h('@lsp.mod.deprecated', s:none, s:none, 'strikethrough')

  " HTML/JSX
  call s:h('@tag.html', s:pink)
  call s:h('@tag.attribute.html', s:green, s:none, 'italic')
  call s:h('@tag.javascript', s:pink)
  call s:h('@tag.tsx', s:pink)
  
  " Custom components (React)
  call s:h('@constructor.tsx', s:cyan)
  call s:h('@constructor.javascript', s:cyan)
endif
" }}}

" Plugins: {{{

" GitGutter
call s:h('GitGutterAdd', s:green)
call s:h('GitGutterChange', s:orange)
call s:h('GitGutterDelete', s:red)

" NERDTree
call s:h('NERDTreeDir', s:cyan)
call s:h('NERDTreeDirSlash', s:cyan)
call s:h('NERDTreeFile', s:fg)
call s:h('NERDTreeExecFile', s:green)
call s:h('NERDTreeOpenable', s:orange)
call s:h('NERDTreeClosable', s:orange)
call s:h('NERDTreeCWD', s:pink)

" Telescope (Neovim)
if has('nvim')
  call s:h('TelescopeBorder', s:comment)
  call s:h('TelescopePromptBorder', s:comment)
  call s:h('TelescopeResultsBorder', s:comment)
  call s:h('TelescopePreviewBorder', s:comment)
  call s:h('TelescopeMatching', s:cyan)
  call s:h('TelescopePromptPrefix', s:pink)
  call s:h('TelescopeSelection', s:fg, s:selection)
endif

" nvim-cmp (Neovim)
if has('nvim')
  call s:h('CmpItemAbbr', s:fg)
  call s:h('CmpItemAbbrMatch', s:cyan, s:none, 'bold')
  call s:h('CmpItemAbbrMatchFuzzy', s:cyan, s:none, 'bold')
  call s:h('CmpItemKind', s:pink)
  call s:h('CmpItemMenu', s:comment)
  call s:h('CmpItemAbbrDeprecated', s:comment, s:none, 'strikethrough')
  call s:h('CmpItemKindFunction', s:green)
  call s:h('CmpItemKindMethod', s:green)
  call s:h('CmpItemKindCopilot', s:green)
  call s:h('CmpItemKindClass', s:cyan)
  call s:h('CmpItemKindConstructor', s:cyan)
  call s:h('CmpItemKindInterface', s:cyan)
  call s:h('CmpItemKindStruct', s:cyan)
  call s:h('CmpItemKindEnum', s:cyan)
  call s:h('CmpItemKindTypeParameter', s:cyan)
  call s:h('CmpItemKindModule', s:cyan)
  call s:h('CmpItemKindFile', s:cyan)
  call s:h('CmpItemKindFolder', s:cyan)
  call s:h('CmpItemKindVariable', s:fg)
  call s:h('CmpItemKindField', s:fg)
  call s:h('CmpItemKindProperty', s:fg)
  call s:h('CmpItemKindReference', s:fg)
  call s:h('CmpItemKindConstant', s:purple)
  call s:h('CmpItemKindEnumMember', s:purple)
  call s:h('CmpItemKindValue', s:purple)
  call s:h('CmpItemKindUnit', s:purple)
  call s:h('CmpItemKindKeyword', s:pink)
  call s:h('CmpItemKindOperator', s:pink)
  call s:h('CmpItemKindEvent', s:pink)
  call s:h('CmpItemKindSnippet', s:yellow)
  call s:h('CmpItemKindText', s:yellow)
  call s:h('CmpItemKindColor', s:orange)
endif

" GitSigns (Neovim)
if has('nvim')
  highlight! link GitSignsAdd GitGutterAdd
  highlight! link GitSignsChange GitGutterChange
  highlight! link GitSignsDelete GitGutterDelete
  highlight! link GitSignsAddNr GitGutterAdd
  highlight! link GitSignsChangeNr GitGutterChange
  highlight! link GitSignsDeleteNr GitGutterDelete
  highlight! link GitSignsAddLn DiffAdd
  highlight! link GitSignsChangeLn DiffChange
  highlight! link GitSignsDeleteLn DiffDelete
  highlight! link GitSignsCurrentLineBlame Comment
endif

" nvim-tree and neo-tree (Neovim)
if has('nvim')
  highlight! link NvimTreeNormal Normal
  highlight! link NvimTreeWinSeparator WinSeparator
  highlight! link NvimTreeFolderName Directory
  highlight! link NvimTreeEmptyFolderName Directory
  call s:h('NvimTreeOpenedFolderName', s:cyan, s:none, 'bold')
  call s:h('NvimTreeFolderIcon', s:cyan)
  call s:h('NvimTreeRootFolder', s:pink, s:none, 'bold')
  call s:h('NvimTreeIndentMarker', s:selection)
  call s:h('NvimTreeExecFile', s:green)
  call s:h('NvimTreeSpecialFile', s:yellow)
  call s:h('NvimTreeSymlink', s:cyan)
  call s:h('NvimTreeGitNew', s:green)
  call s:h('NvimTreeGitDirty', s:orange)
  call s:h('NvimTreeGitDeleted', s:red)
  call s:h('NvimTreeGitMerge', s:red, s:none, 'bold')
  highlight! link NeoTreeNormal Normal
  highlight! link NeoTreeNormalNC Normal
  highlight! link NeoTreeWinSeparator WinSeparator
  highlight! link NeoTreeFloatBorder FloatBorder
  highlight! link NeoTreeDirectoryName Directory
  call s:h('NeoTreeDirectoryIcon', s:cyan)
  call s:h('NeoTreeRootName', s:pink, s:none, 'bold')
  call s:h('NeoTreeFileName', s:fg)
  call s:h('NeoTreeIndentMarker', s:selection)
  call s:h('NeoTreeDimText', s:comment)
  call s:h('NeoTreeGitAdded', s:green)
  call s:h('NeoTreeGitUntracked', s:green)
  call s:h('NeoTreeGitModified', s:orange)
  call s:h('NeoTreeGitDeleted', s:red)
  call s:h('NeoTreeGitConflict', s:red, s:none, 'bold')
endif

" indent-blankline v3 (Ibl*) and v2 (IndentBlankline*)
if has('nvim')
  call s:h('IblIndent', s:selection)
  call s:h('IblWhitespace', s:selection)
  call s:h('IblScope', s:comment)
  highlight! link IndentBlanklineChar IblIndent
  highlight! link IndentBlanklineSpaceChar IblWhitespace
  highlight! link IndentBlanklineContextChar IblScope
endif

" which-key (Neovim)
if has('nvim')
  call s:h('WhichKey', s:pink)
  call s:h('WhichKeyGroup', s:cyan)
  call s:h('WhichKeyDesc', s:fg)
  call s:h('WhichKeySeparator', s:comment)
  call s:h('WhichKeyValue', s:comment)
  highlight! link WhichKeyNormal NormalFloat
  highlight! link WhichKeyFloat NormalFloat
  highlight! link WhichKeyBorder FloatBorder
endif

" Trouble (Neovim)
if has('nvim')
  highlight! link TroubleNormal Normal
  highlight! link TroubleNormalNC Normal
  call s:h('TroubleText', s:fg)
  call s:h('TroubleCount', s:pink, s:bglight, 'bold')
  call s:h('TroubleFile', s:cyan)
  call s:h('TroubleIndent', s:selection)
  call s:h('TroublePos', s:comment)
  call s:h('TroubleSource', s:comment)
  call s:h('TroubleCode', s:comment)
endif

" blink.cmp (Neovim)
if has('nvim')
  highlight! link BlinkCmpMenu Pmenu
  highlight! link BlinkCmpMenuBorder FloatBorder
  highlight! link BlinkCmpMenuSelection PmenuSel
  highlight! link BlinkCmpLabel CmpItemAbbr
  highlight! link BlinkCmpLabelMatch CmpItemAbbrMatch
  highlight! link BlinkCmpLabelDeprecated CmpItemAbbrDeprecated
  highlight! link BlinkCmpSource CmpItemMenu
  highlight! link BlinkCmpKind CmpItemKind
  highlight! link BlinkCmpKindFunction CmpItemKindFunction
  highlight! link BlinkCmpKindMethod CmpItemKindMethod
  highlight! link BlinkCmpKindCopilot CmpItemKindCopilot
  highlight! link BlinkCmpKindClass CmpItemKindClass
  highlight! link BlinkCmpKindConstructor CmpItemKindConstructor
  highlight! link BlinkCmpKindInterface CmpItemKindInterface
  highlight! link BlinkCmpKindStruct CmpItemKindStruct
  highlight! link BlinkCmpKindEnum CmpItemKindEnum
  highlight! link BlinkCmpKindTypeParameter CmpItemKindTypeParameter
  highlight! link BlinkCmpKindModule CmpItemKindModule
  highlight! link BlinkCmpKindFile CmpItemKindFile
  highlight! link BlinkCmpKindFolder CmpItemKindFolder
  highlight! link BlinkCmpKindVariable CmpItemKindVariable
  highlight! link BlinkCmpKindField CmpItemKindField
  highlight! link BlinkCmpKindProperty CmpItemKindProperty
  highlight! link BlinkCmpKindReference CmpItemKindReference
  highlight! link BlinkCmpKindConstant CmpItemKindConstant
  highlight! link BlinkCmpKindEnumMember CmpItemKindEnumMember
  highlight! link BlinkCmpKindValue CmpItemKindValue
  highlight! link BlinkCmpKindUnit CmpItemKindUnit
  highlight! link BlinkCmpKindKeyword CmpItemKindKeyword
  highlight! link BlinkCmpKindOperator CmpItemKindOperator
  highlight! link BlinkCmpKindEvent CmpItemKindEvent
  highlight! link BlinkCmpKindSnippet CmpItemKindSnippet
  highlight! link BlinkCmpKindText CmpItemKindText
  highlight! link BlinkCmpKindColor CmpItemKindColor
  highlight! link BlinkCmpDoc NormalFloat
  highlight! link BlinkCmpDocBorder FloatBorder
  highlight! link BlinkCmpSignatureHelp NormalFloat
  highlight! link BlinkCmpSignatureHelpBorder FloatBorder
  call s:h('BlinkCmpGhostText', s:comment)
endif

" lazy.nvim UI (Neovim)
if has('nvim')
  highlight! link LazyNormal NormalFloat
  call s:h('LazyButton', s:fg, s:selection)
  call s:h('LazyButtonActive', s:bg, s:pink, 'bold')
  call s:h('LazyH1', s:bg, s:pink, 'bold')
  call s:h('LazyH2', s:cyan, s:none, 'bold')
  call s:h('LazySpecial', s:pink)
  call s:h('LazyProgressDone', s:green)
  call s:h('LazyProgressTodo', s:selection)
  call s:h('LazyComment', s:comment)
  call s:h('LazyDimmed', s:comment)
  call s:h('LazyProp', s:comment)
  call s:h('LazyValue', s:yellow)
  call s:h('LazyReasonPlugin', s:green)
  call s:h('LazyReasonEvent', s:orange)
  call s:h('LazyReasonKeys', s:pink)
  call s:h('LazyReasonCmd', s:cyan)
  highlight! link LazyUrl Underlined
endif

" nvim-dap (Neovim)
if has('nvim')
  call s:h('DapBreakpoint', s:red)
  call s:h('DapBreakpointCondition', s:orange)
  call s:h('DapBreakpointRejected', s:comment)
  call s:h('DapLogPoint', s:cyan)
  call s:h('DapStopped', s:green)
  call s:h('DapStoppedLine', s:none, s:green_bg)
endif

" }}}

" }}}

" Terminal Colors: {{{
if has('nvim')
  let g:terminal_color_0 = '#544A40'
  let g:terminal_color_1 = '#BF616A'
  let g:terminal_color_2 = '#A3BE8C'
  let g:terminal_color_3 = '#EBCB8B'
  let g:terminal_color_4 = '#81A1C1'
  let g:terminal_color_5 = '#B48EAD'
  let g:terminal_color_6 = '#88C0D0'
  let g:terminal_color_7 = '#E8DCC8'
  let g:terminal_color_8 = '#9E8766'
  let g:terminal_color_9 = '#DD7F88'
  let g:terminal_color_10 = '#C1DCAA'
  let g:terminal_color_11 = '#FFE9A9'
  let g:terminal_color_12 = '#9FBFDF'
  let g:terminal_color_13 = '#D2ACCB'
  let g:terminal_color_14 = '#A6DEEE'
  let g:terminal_color_15 = '#FFFFFF'
elseif has('terminal')
  let g:terminal_ansi_colors = ['#544A40', '#BF616A', '#A3BE8C', '#EBCB8B', '#81A1C1', '#B48EAD', '#88C0D0', '#E8DCC8', '#9E8766', '#DD7F88', '#C1DCAA', '#FFE9A9', '#9FBFDF', '#D2ACCB', '#A6DEEE', '#FFFFFF']
endif
" }}}

" vim: fdm=marker:
