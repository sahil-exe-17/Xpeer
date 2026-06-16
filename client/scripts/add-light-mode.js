import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');
const layoutFile = path.join(__dirname, '../src/components/Layout.tsx');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace hardcoded dark mode colors with semantic ones
  content = content.replace(/bg-\[#09090B\]/g, 'bg-surface dark:bg-[#09090B]');
  content = content.replace(/bg-\[#000000\]/g, 'bg-surface-container-low dark:bg-[#000000]');
  content = content.replace(/border-\[#27272A\]/g, 'border-outline-variant dark:border-[#27272A]');
  content = content.replace(/text-\[#A1A1AA\]/g, 'text-on-surface-variant dark:text-[#A1A1AA]');
  
  fs.writeFileSync(filePath, content);
}

fs.readdirSync(pagesDir).forEach(file => {
  if (file.endsWith('.tsx')) {
    replaceInFile(path.join(pagesDir, file));
  }
});

replaceInFile(layoutFile);
console.log('Successfully added dark: classes to all hardcoded colors!');
