#!/bin/bash
# ============================================
# SocialPilot — Скрипт создания ZIP для деплоя
# Запуск: bash create-zip.sh
# ============================================

echo ""
echo "🔨 SocialPilot — Создание ZIP-архива для деплоя"
echo "================================================"
echo ""

# Проверяем, что dist/ существует
if [ ! -d "dist" ]; then
    echo "⚠️  Папка dist/ не найдена. Запускаю сборку..."
    npm run build
    echo ""
fi

# Удаляем старый архив если есть
if [ -f "socialpilot-deploy.zip" ]; then
    rm socialpilot-deploy.zip
    echo "🗑  Удалён старый архив"
fi

# Создаём ZIP
echo "📦 Упаковываю файлы..."
echo ""

zip -r socialpilot-deploy.zip \
    dist/ \
    src/ \
    index.html \
    package.json \
    package-lock.json \
    vite.config.ts \
    tsconfig.json \
    tsconfig.app.json \
    tsconfig.node.json \
    postcss.config.js \
    tailwind.config.js \
    README.md \
    create-zip.js \
    create-zip.sh \
    create-zip.bat \
    2>/dev/null

# Проверяем результат
if [ -f "socialpilot-deploy.zip" ]; then
    SIZE=$(du -h socialpilot-deploy.zip | cut -f1)
    echo ""
    echo "✅ ZIP-архив успешно создан!"
    echo "📦 Файл: socialpilot-deploy.zip"
    echo "📏 Размер: $SIZE"
    echo ""
    echo "🚀 Как задеплоить:"
    echo "   1. Распакуйте: unzip socialpilot-deploy.zip"
    echo "   2. Установите зависимости: npm install"
    echo "   3. Запустите: npm run dev"
    echo ""
    echo "📂 Или просто загрузите папку dist/ на хостинг!"
    echo ""
else
    echo "❌ Ошибка создания архива. Проверьте, что zip установлен."
    echo "   Ubuntu/Debian: sudo apt install zip"
    echo "   macOS: brew install zip"
    echo ""
fi
