# Используем образ Node.js на основе Alpine
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем только package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Удаляем кэш npm, чтобы уменьшить размер образа (опционально)
RUN npm cache clean --force

# Запускаем приложение, используя локальную версию Angular CLI через npx
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
