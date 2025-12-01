import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const srcAssetsDir = path.join(projectRoot, 'src', 'assets');
const distAssetsDir = path.join(projectRoot, 'dist', 'assets');

// 재귀적으로 디렉토리와 파일 복사
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  
  files.forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

try {
  copyDir(srcAssetsDir, distAssetsDir);
  console.log('Assets copied successfully');
} catch (err) {
  console.error('Error copying assets:', err.message);
  process.exit(1);
}
