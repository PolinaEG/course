# Школа: инструкция по применению

## Деплой на Railway

### 1. Загрузите проект на GitHub
- Создайте новый репозиторий на github.com
- Загрузите все файлы этого архива (server.js, package.json, папку public)

### 2. Подключите к Railway
- Зайдите на railway.app
- New Project → Deploy from GitHub repo
- Выберите ваш репозиторий

### 3. Добавьте API-ключ
- В Railway откройте ваш проект → Variables
- Добавьте переменную:
  - Name: ANTHROPIC_API_KEY
  - Value: ваш ключ (sk-ant-api03-...)

### 4. Готово!
Railway автоматически запустит сервер. Вы получите ссылку вида:
https://your-project.railway.app

Эту ссылку можно вставить на Тильду как iframe или отправлять напрямую.

## Структура файлов
- server.js — сервер, принимает запросы и проксирует их в Anthropic API
- package.json — зависимости
- public/index.html — сам курс
