[![Netlify Status](https://api.netlify.com/api/v1/badges/55a263f4-bfea-4b71-83f0-d422089db859/deploy-status)](https://app.netlify.com/sites/charming-marshmallow-76f3f5/deploys)

[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)]

## Описание

Проект веб-мессенджера курса Яндекс.Практикум - Мидл Фронтенд Разработчик 2022.

### Страницы

1. [Авторизация](https://charming-marshmallow-76f3f5.netlify.app)
2. [Регистрация](https://charming-marshmallow-76f3f5.netlify.app/register)
3. [Список чатов](https://charming-marshmallow-76f3f5.netlify.app/chats)
4. [Профиль пользователя](https://charming-marshmallow-76f3f5.netlify.app/profile)
5. [Страница 404](https://charming-marshmallow-76f3f5.netlify.app/404)
6. [Страница 500](https://charming-marshmallow-76f3f5.netlify.app/500)

### Спринт 1

Период с 11.07 по 24.07.2022

Создание и настройка нового проекта с использованием шаблонизатора Handlebars и компилятора Parcel, верстка страниц с помощью Figma, публикация проекта на Netlify.

### Спринт 2

Период с 24.07 по 07.08.2022

Типизация проекта с помощью TypeScript. Разбивка проекта на компоненты и блоки через Block и EventBus. Подключение линтеров Eslint, Stylelint для улучшения читабельности кода.

### Спринт 3

Период с 12.09 по 25.09.2022

Подключен API для авторизации, регистрации, списка чатов и профиля.
Настроен роутинг.

### Спринт 4

Период с 26.09 по 15.10.2022

Добавлен тестинг, Parcel заменен на Webpack, создан Dockerfile для контейнеризации приложения и выгрузки на Heroku.

## Используемые технологии

1. Node v16 + Express
2. Handlebars
3. Webpack (а также webpack-cli и webpack-dev-server)
4. ESLint, StyleLint а также плагины: **stylelint-scss**, **typescript-eslint**. Правила наследованы от инструкций [Google](https://github.com/google/eslint-config-google), а также [Prettier](https://github.com/prettier/stylelint-config-prettier) для устранения конфликтов с дополнением IDE Prettier.
5. UUID для создания рандомных ID компонентам.
6. Husky для контроля коммитов. Запускает проверку линтинга и тестов перед коммитом.
7. Mocha и Chai для проведения тестов сборки.
8. Docker для контейнеризации приложения и дальнейшей выгрузки на Heroku.

## Установка

`npm run dev` - запуск webpack-dev-сервера для разработки на порту `3000`

`npm run build:dev` - сборка проекта для разработки (без минификации, с хэшем)
`npm run build` - сборка минифицированной статической версии проекта, готовой для выгрузки

`npm run start` - сборка минифицированной версии проекта и запуска Node Express на порту `3000`

`npm run lint` - вывод ошибок

`npm run lint:fix` - исправление ошибок в автоматическим режиме

`npm run test` - запускает тесты файлов с типом `\*.test.ts` с помощью Mocha

## Ссылки

Макеты: [Figma](https://www.figma.com/file/IZNg4gYpnw1PjPAJbxXlKZ/ChatScript)

Ссылка на рабочий проект: [Netlify](https://charming-marshmallow-76f3f5.netlify.app)

Ссыла на рабочий проект: [Heroku](https://chatscript.herokuapp.com)
