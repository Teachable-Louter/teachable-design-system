import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

// 번들된 파일들
const filesToFix = [
  path.join(distDir, 'index.esm.js'),
  path.join(distDir, 'index.cjs.js'),
];

filesToFix.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // ../../assets/ 경로를 ./assets/로 수정
    content = content.replace(/from ['"]\.\.\/\.\.\/assets\//g, "from './assets/");
    content = content.replace(/import\(['"]\.\.\/\.\.\/assets\//g, "import('./assets/");
    
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Fixed asset paths in ${path.basename(file)}`);
  }
});
