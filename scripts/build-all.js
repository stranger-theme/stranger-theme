#!/usr/bin/env node

/**
 * Master build script for Stranger Theme
 * Builds all platform themes from shared color palettes
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.join(__dirname, '..');

// Platforms to build (in order)
const PLATFORMS = [
  { name: 'Visual Studio Code', dir: 'visual-studio-code' },
  { name: 'JetBrains', dir: 'jetbrains' },
  { name: 'Vim/Neovim', dir: 'vim' },
  { name: 'Sublime Text', dir: 'sublime-text' },
  { name: 'Terminal (Alacritty, iTerm2, Windows Terminal)', dir: 'terminal' },
  { name: 'Hyper', dir: 'hyper' }
];

/**
 * Run build for a single platform
 */
function buildPlatform(platform) {
  const platformDir = path.join(ROOT_DIR, platform.dir);
  const buildScript = path.join(platformDir, 'scripts', 'build.js');
  
  if (!fs.existsSync(buildScript)) {
    console.log(`  ⚠️  Skipping ${platform.name} - no build script found`);
    return false;
  }
  
  try {
    execSync(`node ${buildScript}`, { 
      cwd: platformDir,
      stdio: 'pipe'
    });
    return true;
  } catch (error) {
    console.error(`  ❌ Error building ${platform.name}:`);
    console.error(error.message);
    return false;
  }
}

/**
 * Count generated files in a directory
 */
function countFiles(dir, extensions = []) {
  if (!fs.existsSync(dir)) return 0;
  
  let count = 0;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isDirectory()) {
      count += countFiles(path.join(dir, item.name), extensions);
    } else if (extensions.length === 0 || extensions.some(ext => item.name.endsWith(ext))) {
      count++;
    }
  }
  
  return count;
}

/**
 * Main build function
 */
function build() {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           🔦 STRANGER THEME - BUILD ALL                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  
  const startTime = Date.now();
  let successCount = 0;
  let failCount = 0;
  const results = [];
  
  for (const platform of PLATFORMS) {
    process.stdout.write(`Building ${platform.name}...`);
    
    const success = buildPlatform(platform);
    
    if (success) {
      successCount++;
      console.log(' ✅');
      results.push({ platform: platform.name, status: 'success' });
    } else {
      failCount++;
      results.push({ platform: platform.name, status: 'failed' });
    }
  }
  
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('');
  console.log('════════════════════════════════════════════════════════════════');
  console.log('');
  console.log('📊 Build Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  if (failCount > 0) {
    console.log(`   ❌ Failed: ${failCount}`);
  }
  console.log(`   ⏱️  Time: ${elapsed}s`);
  console.log('');
  
  // Count generated files
  console.log('📁 Generated Files:');
  console.log(`   • VS Code:          ${countFiles(path.join(ROOT_DIR, 'visual-studio-code/themes'), ['.json'])} themes`);
  console.log(`   • JetBrains:        ${countFiles(path.join(ROOT_DIR, 'jetbrains/themes'), ['.json', '.xml'])} files`);
  console.log(`   • Vim:              ${countFiles(path.join(ROOT_DIR, 'vim/colors'), ['.vim'])} colorschemes`);
  console.log(`   • Sublime Text:     ${countFiles(path.join(ROOT_DIR, 'sublime-text/themes'), ['.tmTheme'])} themes`);
  console.log(`   • Alacritty:        ${countFiles(path.join(ROOT_DIR, 'terminal/alacritty'), ['.toml'])} themes`);
  console.log(`   • iTerm2:           ${countFiles(path.join(ROOT_DIR, 'terminal/iterm2'), ['.itermcolors'])} themes`);
  console.log(`   • Windows Terminal: ${countFiles(path.join(ROOT_DIR, 'terminal/windows-terminal'), ['.json'])} themes`);
  console.log(`   • Hyper:            ${countFiles(path.join(ROOT_DIR, 'hyper/themes'))} plugins`);
  console.log('');
  
  if (failCount > 0) {
    process.exit(1);
  }
}

// Run build
build();
