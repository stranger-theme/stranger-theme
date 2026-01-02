# 🔦 Stranger Theme for Vim/Neovim

A dark colorscheme collection inspired by the Netflix series Stranger Things.

## 🎨 Theme Variants

- `stranger_upside_down` - Dark blue-black with desaturated tones
- `stranger_starcourt` - Vibrant 80s mall aesthetic with neon colors
- `stranger_hawkins` - Small-town America with warm, muted colors
- `stranger_the_lab` - Clinical, institutional aesthetic
- `stranger_tigers` - School colors with orange/black tones
- `stranger_dimension_x` - Dark red dimension with moody textures

## 📦 Installation

### Using vim-plug

```vim
Plug 'stranger-theme/stranger-theme', { 'rtp': 'vim' }
```

### Using packer.nvim (Neovim)

```lua
use { 'stranger-theme/stranger-theme', rtp = 'vim' }
```

### Using lazy.nvim (Neovim)

```lua
{
  'stranger-theme/stranger-theme',
  config = function()
    vim.cmd('colorscheme stranger_starcourt')
  end,
}
```

### Manual Installation

Copy the colorscheme files to your colors directory:

```bash
# Vim
mkdir -p ~/.vim/colors
cp vim/colors/*.vim ~/.vim/colors/

# Neovim
mkdir -p ~/.config/nvim/colors
cp vim/colors/*.vim ~/.config/nvim/colors/
```

## ⚙️ Usage

Add to your `.vimrc` or `init.vim`:

```vim
" Enable true colors (recommended)
set termguicolors

" Set colorscheme
colorscheme stranger_starcourt
```

For Neovim with Lua (`init.lua`):

```lua
vim.opt.termguicolors = true
vim.cmd('colorscheme stranger_starcourt')
```

## 🛠️ Building

```bash
# Build colorschemes from shared palettes
npm run build
```

## 📁 Project Structure

```
vim/
├── colors/                    # Generated colorschemes
│   ├── stranger_upside_down.vim
│   ├── stranger_starcourt.vim
│   ├── stranger_hawkins.vim
│   ├── stranger_the_lab.vim
│   ├── stranger_tigers.vim
│   └── stranger_dimension_x.vim
├── scripts/
│   └── build.js               # Build script
└── package.json
```

## 🔌 Plugin Support

The theme includes highlight groups for popular plugins:

- **Treesitter** (Neovim) - Enhanced syntax highlighting
- **Telescope** (Neovim) - Fuzzy finder
- **nvim-cmp** (Neovim) - Completion
- **NERDTree** - File explorer
- **GitGutter** - Git diff signs

## 📜 License

[MIT License](../LICENSE) © Stranger Theme
