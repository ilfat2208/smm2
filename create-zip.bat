@echo off
chcp 65001 >nul
REM ============================================
REM SocialPilot — Скрипт создания ZIP для деплоя
REM Запуск: create-zip.bat
REM ============================================

echo.
echo 🔨 SocialPilot — Создание ZIP-архива для деплоя
echo ================================================
echo.

REM Проверяем, что dist/ существует
if not exist "dist\" (
    echo ⚠️  Папка dist\ не найдена. Запускаю сборку...
    call npm run build
    echo.
)

REM Удаляем старый архив если есть
if exist "socialpilot-deploy.zip" (
    del socialpilot-deploy.zip
    echo 🗑  Удалён старый архив
)

echo 📦 Упаковываю файлы...
echo.

REM Используем PowerShell для создания ZIP
powershell -Command "Compress-Archive -Path 'dist','src','index.html','package.json','package-lock.json','vite.config.ts','tsconfig.json','tsconfig.app.json','tsconfig.node.json','postcss.config.js','tailwind.config.js','README.md','create-zip.js','create-zip.sh','create-zip.bat' -DestinationPath 'socialpilot-deploy.zip' -Force"

REM Проверяем результат
if exist "socialpilot-deploy.zip" (
    echo.
    echo ✅ ZIP-архив успешно создан!
    echo 📦 Файл: socialpilot-deploy.zip
    echo.
    echo 🚀 Как задеплоить:
    echo    1. Распакуйте архив
    echo    2. Установите зависимости: npm install
    echo    3. Запустите: npm run dev
    echo.
    echo 📂 Или просто загрузите папку dist\ на хостинг!
    echo.
) else (
    echo ❌ Ошибка создания архива.
    echo.
)

pause
