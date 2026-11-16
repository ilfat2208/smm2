/**
 * Скрипт для создания ZIP-архива проекта для деплоя
 * Запуск: node create-zip.cjs
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const OUTPUT_FILE = 'socialpilot-deploy.zip';

// Файлы и папки для включения в архив
const INCLUDE = [
  'dist/',
  'src/',
  'index.html',
  'package.json',
  'package-lock.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'postcss.config.js',
  'tailwind.config.js',
  'eslint.config.js',
  'README.md',
  'create-zip.cjs',
  'create-zip.sh',
  'create-zip.bat',
];

// Создаём output stream
const output = fs.createWriteStream(OUTPUT_FILE);
const archive = archiver('zip', { zlib: { level: 9 } });

// События
output.on('close', () => {
  const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log('');
  console.log('✅ ZIP-архив успешно создан!');
  console.log(`📦 Файл: ${OUTPUT_FILE}`);
  console.log(`📏 Размер: ${sizeMB} MB`);
  console.log(`📊 Сжатые данные: ${archive.pointer()} байт`);
  console.log('');
  console.log('🚀 Как задеплоить:');
  console.log('   1. Распакуйте архив: unzip socialpilot-deploy.zip');
  console.log('   2. Установите зависимости: npm install');
  console.log('   3. Запустите dev-сервер: npm run dev');
  console.log('   4. Или загрузите папку dist/ на хостинг');
  console.log('');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Добавляем файлы и папки
INCLUDE.forEach((item) => {
  const fullPath = path.join(__dirname, item);
  if (fs.existsSync(fullPath)) {
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      archive.directory(item, item);
      console.log(`  📁 Добавлена папка: ${item}`);
    } else {
      archive.file(item, { name: item });
      console.log(`  📄 Добавлен файл: ${item}`);
    }
  } else {
    console.log(`  ⚠️  Пропущен (не найден): ${item}`);
  }
});

// Добавляем .gitignore если есть
if (fs.existsSync(path.join(__dirname, '.gitignore'))) {
  archive.file('.gitignore', { name: '.gitignore' });
}

console.log('');
console.log('🔨 Создаю ZIP-архив...');
console.log('');

archive.finalize();
