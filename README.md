[![Netlify Status](https://api.netlify.com/api/v1/badges/55a263f4-bfea-4b71-83f0-d422089db859/deploy-status)](https://app.netlify.com/sites/charming-marshmallow-76f3f5/deploys)

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

## Используемые технологии

1. Node v16 + Express
2. Handlebars
3. Parcel + Parcel Transformer HBS
4. ESLint, StyleLint а также плагины: **stylelint-scss**, **typescript-eslint**. Правила наследованы от инструкций [Google](https://github.com/google/eslint-config-google), а также [Prettier](https://github.com/prettier/stylelint-config-prettier) для устранения конфликтов с дополнением IDE Prettier.
5. UUID

## Установка

`npm run dev` - запуск версии для разработчика на порту `1234`

`npm run build` - сборка стабильной версии проекта

`npm run start` - запуск Node на порту `3000`

`npm run lint` - вывод ошибок

`npm run lint:fix` - исправление ошибок в автоматическим режиме

## Ссылки

Макеты: [Figma](https://www.figma.com/file/IZNg4gYpnw1PjPAJbxXlKZ/ChatScript)

Ссылка на рабочий проект: [Netlify](https://charming-marshmallow-76f3f5.netlify.app)
