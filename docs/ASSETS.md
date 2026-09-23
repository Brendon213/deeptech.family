# Assets manifest

Дата: 2026-09-23

Цель: зафиксировать, какие визуальные ресурсы нужны для точного переноса текущего deeptech.family.

## 1. Обязательные assets

### Логотип / wordmark

Нужны:
- основной логотип DEEP TECH в SVG;
- светлая версия для тёмного фона, если в оригинале используется отдельный вариант;
- тёмная версия для светлого фона, если в оригинале используется отдельный вариант.

Путь:
- `public/assets/brand/logo.svg`
- `public/assets/brand/logo-light.svg`
- `public/assets/brand/logo-dark.svg`

Статус: точные исходники пока не извлечены.

### Favicon

Нужны:
- favicon.svg или favicon.ico;
- apple-touch-icon.png, если он есть в текущем проекте.

Путь:
- `public/assets/brand/favicon.svg`
- `public/assets/brand/apple-touch-icon.png`

Статус: требуется извлечь из оригинала.

### Шрифты

Текущий сайт собран на Tilda. Tilda поддерживает Tilda Sans, Google Fonts, Adobe Fonts и пользовательские WOFF/WOFF2, поэтому факт использования Tilda сам по себе не подтверждает конкретный шрифт сайта.

Нужно определить точные:
- font-family заголовков;
- font-family основного текста;
- используемые веса;
- реальные WOFF/WOFF2, если шрифт загружен локально.

Папка:
- `public/assets/fonts/`

Предпочтительные имена:
- `heading-regular.woff2`
- `heading-semibold.woff2`
- `heading-bold.woff2`
- `body-regular.woff2`
- `body-medium.woff2`

Не загружать Tilda Sans только потому, что сайт работает на Tilda. Сначала подтвердить фактический font-family.

## 2. Иконки

Для текущей структуры лендинга нужны как минимум категории иконок:

### Контакты
- phone;
- email;
- telegram.

Пути:
- `public/assets/icons/phone.svg`
- `public/assets/icons/email.svg`
- `public/assets/icons/telegram.svg`

### UI
- arrow-right;
- chevron / arrow для CTA и маршрутов;
- menu;
- close;
- language / globe, только если такая иконка реально используется в оригинале.

Пути:
- `public/assets/icons/arrow-right.svg`
- `public/assets/icons/menu.svg`
- `public/assets/icons/close.svg`
- `public/assets/icons/globe.svg`

### Секционные иконки
Если в оригинале у Challenges, Ecosystem, Routes или Infrastructure есть отдельные SVG/PNG-иконки, их переносить по одной на сущность, а не перерисовывать случайными иконками.

Пример:
- `public/assets/icons/challenges/`
- `public/assets/icons/ecosystem/`
- `public/assets/icons/routes/`
- `public/assets/icons/infrastructure/`

Статус: конкретные файлы требуют извлечения из оригинала.

## 3. Изображения

По публичному текстовому обходу обязательные контентные изображения не подтверждены.

Но Tilda часто использует background-image и Zero Block assets, которые не видны как отдельный текстовый контент.

Проверить и извлечь:

### Hero
- hero background;
- декоративную графику;
- mockup/illustration, если она есть;
- gradient/background texture, если это bitmap/SVG, а не CSS.

Папка:
- `public/assets/images/hero/`

### Challenges
- фоновые изображения карточек, если используются;
- декоративные элементы.

Папка:
- `public/assets/images/challenges/`

### Ecosystem
- иллюстрации/обложки для 6 модулей, если есть.

Папка:
- `public/assets/images/ecosystem/`

### Infrastructure
- изображения/обложки Academy, Advisors, Accelerator, Events, если используются.

Папка:
- `public/assets/images/infrastructure/`

### General
- background textures;
- section separators;
- decorative blobs;
- screenshots;
- partner/company logos.

Папки:
- `public/assets/images/backgrounds/`
- `public/assets/images/decor/`
- `public/assets/images/logos/`

## 4. Что не надо сохранять как image

Если элемент оригинала реализован обычным CSS, переносить его как CSS, а не скриншотом:

- градиенты;
- однотонные фоны;
- рамки;
- тени;
- border-radius;
- простые линии;
- стандартные стрелки, если они корректно воспроизводятся SVG/CSS.

## 5. Форматы

Предпочтения:

- логотип и простые иконки: SVG;
- фотографии: WebP/AVIF;
- PNG только при необходимости прозрачности или если оригинал невозможно безопасно конвертировать;
- шрифты: WOFF2;
- favicon: SVG/ICO в зависимости от оригинала.

## 6. Правила именования

Использовать:
- lowercase;
- kebab-case;
- смысловые названия;
- без `img1`, `photo2`, `icon-new-final`.

Пример:

```text
public/assets/
├── brand/
│   ├── logo.svg
│   ├── logo-light.svg
│   ├── logo-dark.svg
│   ├── favicon.svg
│   └── apple-touch-icon.png
├── fonts/
├── icons/
│   ├── phone.svg
│   ├── email.svg
│   ├── telegram.svg
│   ├── arrow-right.svg
│   ├── menu.svg
│   ├── close.svg
│   ├── challenges/
│   ├── ecosystem/
│   ├── routes/
│   └── infrastructure/
└── images/
    ├── hero/
    ├── challenges/
    ├── ecosystem/
    ├── infrastructure/
    ├── backgrounds/
    ├── decor/
    └── logos/
```

## 7. Статусы

Использовать три статуса:

- `confirmed` — файл подтверждён в оригинальном сайте;
- `required-to-extract` — категория явно нужна, но конкретный исходник ещё не извлечён;
- `optional` — добавляется только если реально присутствует в оригинале.

## 8. Текущий реестр

| Asset | Статус | Комментарий |
|---|---|---|
| основной logo/wordmark | required-to-extract | нужен для Header/Footer |
| light logo | optional | только если отдельный исходник есть в оригинале |
| dark logo | optional | только если отдельный исходник есть в оригинале |
| favicon | required-to-extract | извлечь из текущего сайта |
| apple touch icon | optional | если используется |
| heading font | required-to-extract | точный font-family пока не подтверждён |
| body font | required-to-extract | точный font-family пока не подтверждён |
| phone icon | required-to-extract | если оригинал использует SVG/иконку |
| email icon | required-to-extract | если оригинал использует SVG/иконку |
| Telegram icon | required-to-extract | если оригинал использует SVG/иконку |
| menu/close | required-to-extract | нужны для mobile nav |
| route arrows | required-to-extract | если это отдельные SVG |
| Hero visual | required-to-extract | проверить background/Zero Block |
| section card visuals | optional | только если есть в оригинале |
| partner/company logos | optional | только если есть в оригинале |
| decorative backgrounds | optional | извлечь только реальные assets |

## 9. Следующий шаг

На следующем этапе нужно извлечь реальные URL/файлы из опубликованной Tilda-страницы и заполнить этот манифест фактическими именами и источниками.

До этого нельзя подменять оригинальные assets случайными изображениями или универсальными icon packs.
