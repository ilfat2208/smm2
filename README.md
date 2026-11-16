# 🚀 SocialPilot — AI SMM Automation Platform

Платформа для автоматизации социальных сетей с AI-генерацией контента.

## ✨ Возможности

- 📊 **Дашборд** — общая статистика по всем соцсетям
- 📅 **Планировщик** — расписание публикаций по дням и платформам
- 🤖 **AI Генератор** — создание постов с помощью нейросети
- 👥 **Аккаунты** — управление подключёнными профилями
- 📈 **Аналитика** — графики роста, вовлечённости, охвата
- 💬 **Сообщения** — переписка с подписчиками + AI-автоответы
- 📬 **Рассылки** — массовые уведомления по базе
- ⚙️ **Настройки** — интеграции API, параметры AI, уведомления

## 🛠 Технологии

- React 18 + TypeScript
- Vite (сборщик)
- Tailwind CSS (стили)
- Recharts (графики)
- Lucide React (иконки)

## 📦 Запуск

### Требования
- Node.js 18+
- npm 9+

### Установка

```bash
# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev

# Собрать production-версию
npm run build
```

После `npm run dev` откройте http://localhost:5173

## 🌐 Деплой

Папка `dist/` содержит готовую статическую сборку. Загрузите её на:
- **Netlify** — drag-and-drop на netlify.com
- **Vercel** — `vercel deploy`
- **GitHub Pages** — ветка `gh-pages`
- Любой другой статический хостинг

## 📁 Структура

```
├── src/
│   ├── App.tsx          # Главный компонент приложения
│   ├── main.tsx         # Точка входа
│   └── index.css        # Глобальные стили
├── dist/                # Production-сборка (после npm run build)
├── index.html           # HTML-шаблон
├── package.json         # Зависимости
└── vite.config.ts       # Конфигурация Vite
```

## 🔌 Поддерживаемые платформы

- Instagram (Graph API)
- Telegram (Bot API)
- Twitter/X (API v2)
- LinkedIn (Marketing API)
- YouTube (Data API v3)

## 💡 Примечание

Это демонстрационный UI-прототип. Для реальной работы необходимо:
1. Подключить backend-сервер
2. Получить API-ключи от соцсетей
3. Интегрировать LLM (OpenAI, Anthropic, etc.)
4. Настроить базу данных для хранения аккаунтов и контента

## 📦 Создание ZIP для деплоя

### Windows
```
Дважды кликните на create-zip.bat
```

### macOS / Linux
```bash
chmod +x create-zip.sh
bash create-zip.sh
```

### Через Node.js (любая ОС)
```bash
node create-zip.js
```

Результат — файл `socialpilot-deploy.zip` в корне проекта.

## 🌐 Деплой из ZIP

### Netlify (самый простой)
1. Распакуйте `socialpilot-deploy.zip`
2. Зайдите на [app.netlify.com/drop](https://app.netlify.com/drop)
3. Перетащите папку `dist/` в браузер
4. Готово! Получите публичную ссылку

### Vercel
```bash
npm i -g vercel
vercel deploy --prod
```

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
# Затем в Settings → Pages → Source: gh-pages
```

### Любой хостинг (Apache/Nginx)
Просто загрузите содержимое папки `dist/` в корень веб-сервера.

## 📄 Лицензия

MIT
