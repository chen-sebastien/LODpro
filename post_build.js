import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy images to dist/images
if (fs.existsSync('images')) {
  copyDir('images', 'dist/images');
  console.log('Copied images/ to dist/images/');
}

// Copy all .glb files in root to dist/
const rootFiles = fs.readdirSync('.');
rootFiles.forEach(file => {
  if (file.endsWith('.glb')) {
    fs.copyFileSync(file, path.join('dist', file));
    console.log(`Copied ${file} to dist/`);
  }
});

