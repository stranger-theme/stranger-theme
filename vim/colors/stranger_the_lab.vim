" =============================================================================
" Name:        Stranger Theme: The Lab
" Description: A dark theme inspired by Stranger Things
" Author:      Stranger Theme <https://github.com/stranger-theme>
" License:     MIT
" =============================================================================

" Initialization: {{{

highlight clear
if exists('syntax_on')
  syntax reset
endif

let g:colors_name = 'stranger_the_lab'

if !has('gui_running') && &t_Co < 256
  finish
endif

" }}}
" Color Palette: {{{

let s:bg        = ['#1A1D26', 235]
let s:fg        = ['#E0E5EC', 253]
let s:selection = ['#2A2D36', 239]
let s:comment   = ['#5D6D7E', 244]
let s:cyan      = ['#39CCCC', 117]
let s:green     = ['#2ECC40', 114]
let s:orange    = ['#FF851B', 215]
let s:pink      = ['#7FDBFF', 212]
let s:purple    = ['#B10DC9', 141]
let s:red       = ['#FF4136', 203]
let s:yellow    = ['#FFDC00', 228]

let s:bglight   = ['#2E313A', 236]
let s:bglighter = ['#42454E', 237]
let s:none      = ['NONE', 'NONE']

" }}}
" Helper Function: {{{

function! s:h(scope, fg, ...)
  let l:fg = a:fg
  let l:bg = get(a:, 1, s:none)
  let l:attr = get(a:, 2, '')
  let l:sp = get(a:, 3, '')

  let l:hl = 'highlight ' . a:scope
  let l:hl .= ' guifg=' . l:fg[0] . ' ctermfg=' . l:fg[1]
  let l:hl .= ' guibg=' . l:bg[0] . ' ctermbg=' . l:bg[1]
  let l:hl .= ' gui=' . (l:attr ==# '' ? 'NONE' : l:attr)
  let l:hl .= ' cterm=' . (l:attr ==# '' ? 'NONE' : l:attr)
  if l:sp !=# ''
    let l:hl .= ' guisp=' . l:sp[0]
  endif
  execute l:hl
endfunction

" }}}
" Highlight Groups: {{{

" Editor: {{{
call s:h('Normal', s:fg, s:bg)
call s:h('ColorColumn', s:none, s:bglight)
call s:h('Cursor', s:bg, s:fg)
call s:h('CursorColumn', s:none, s:bglight)
call s:h('CursorLine', s:none, s:bglight)
call s:h('CursorLineNr', s:yellow, s:bglight)
call s:h('Directory', s:cyan)
call s:h('DiffAdd', s:green, s:none)
call s:h('DiffChange', s:orange, s:none)
call s:h('DiffDelete', s:red, s:none)
call s:h('DiffText', s:fg, s:none)
call s:h('EndOfBuffer', s:bg)
call s:h('ErrorMsg', s:red, s:none, 'bold')
call s:h('VertSplit', s:selection)
call s:h('WinSeparator', s:selection)
call s:h('Folded', s:comment, s:bglight)
call s:h('FoldColumn', s:comment, s:bg)
call s:h('SignColumn', s:none, s:bg)
call s:h('IncSearch', s:bg, s:orange)
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
endif

" }}}

" }}}

" vim: fdm=marker:
