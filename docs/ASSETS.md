# Реестр assets текущего deeptech.family

Дата проверки: 2026-09-23

Источник: [https://deeptech.family/](https://deeptech.family/)
Проверено на опубликованной странице и в её публичных ресурсах. В репозиторий добавлены только файлы, которые удалось связать с реально отрендеренным DOM или с успешно загруженным stylesheet Google Fonts.

## Что подтверждено на источнике

- Wordmark — текстовые узлы `DT` и `DEEP TECH BRICS+` в Header и `DEEP TECH` в Footer. Отдельного файла логотипа нет.
- На странице нет `<img>` и внешних изображений. Обнаружен один canvas-фон (`fixed inset-0 w-full h-full pointer-events-none`); его точки/линии и CSS-градиенты не являются переносимыми image assets.
- CSS страницы не содержит `url(...)` для фоновых или секционных изображений.
- В закрытом состоянии страницы отрендерены 40 inline SVG Lucide. При открытии мобильного меню `menu` заменяется на подтверждённый `close` (`inline-svg:2675e09848999860`); вместе оба состояния дают 41 наблюдаемый ресурс и 27 уникальных геометрий.
- Карусель Infrastructure проверена во всех 4 состояниях точек. Состояния показывают только текстовые карточки: `Deep Tech Academy / Deep Tech Advisors / Deep Tech Accelerator / Deep Tech Events`; `Глобальная сеть / Создатель партнёрства / Go-To-Market / Витрина запросов`; `Платёжные шлюзы / Юридический блок / Бухгалтерия и учёт / GR и институты`; `Deep Tech Media / Бизнес-стек и лиды / Финансовые ресурсы / Веб-инфраструктура`. Во всех состояниях `img/video/source=0`, дополнительные фоновые media URL и новые SVG не появляются. Кнопки перелистывания используют подтверждённые `chevron-left.svg` и `chevron-right.svg`.
- В `<head>` подключён Google Fonts stylesheet для Inter. В браузере stylesheet завершил загрузку (`document.fonts.status=loaded`, `document.fonts.check('16px Inter')=true`, 49 face declarations); вычисленный `font-family` элементов страницы начинается с `Inter`. Наблюдаемые веса: 400, 500, 600 и 700.
- `GET https://deeptech.family/vite.svg` отвечает 404. В `<head>` нет `apple-touch-icon` или `manifest`.
- `og:image` и `twitter:image` указывают на `https://deeptech.family/og-image.jpg`, но источник отвечает 404. Файл не добавлен.
- JSON-LD `Organization.logo` объявляет `https://deeptech.family/logo.png`, но источник отвечает 404. Файл не добавлен.

Статический список `font-family` сам по себе не считался достаточным подтверждением: для Inter дополнительно проверены состояние `document.fonts` и вычисленные стили живой страницы. Это подтверждает загрузку набора объявленных face и запрос `Inter` вычисленными стилями, но не утверждает, какой subset-файл обслужил каждый отдельный glyph.

## Локальные подтверждённые файлы

### Шрифты

Оба файла — точные ответы `font/woff2` с URL, указанными в загруженном stylesheet [Inter](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap). В stylesheet один и тот же URL используется для всех объявленных весов соответствующего subset; на странице реально наблюдались веса 400/500/600/700.

| Файл | Статус | Subset | Источник | SHA-256 |
|---|---|---|---|---|
| `public/assets/fonts/inter-cyrillic.woff2` | confirmed | cyrillic | `https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2` | `71D5EE93CC1E9F1D520A3A8B66456DE18C7879D8DF09D57FCD2EAFF75FEF0075` |
| `public/assets/fonts/inter-latin.woff2` | confirmed | latin | `https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2` | `3100E775E8616CD2611BEECFA23A4263D7037586789B43F035236A2E6FBD4C62` |

Кириллический и Latin subsets достаточны для фактически присутствующих русских и ASCII/Latin текстов. Greek, Vietnamese и latin-ext subsets в локальный реестр не включены: соответствующие диапазоны не требовались наблюдаемым контентом.

### Inline SVG, дедуплицированные по геометрии

Каждый файл ниже содержит исходные SVG-геометрию, размеры, `viewBox` и stroke-атрибуты. Удалены только runtime-атрибуты `class` и `code-path`; `aria-hidden` и геометрия сохранены. `inline-svg:<id>` — имя ресурса из публичного capture manifest страницы.

| Файл | Статус | Источник и исходный code-path |
|---|---|---|
| `public/assets/icons/arrow-right.svg` | confirmed | `inline-svg:82d68a99b284d1d6` — `src/sections/Hero.tsx:53:13`; повторы: `0565f37a0e5ff108`, `28f073888f75a412`, `40fc554fb300466c`, `6f6c5cfe8be15bdc`, `74f839ffa0c883d6`, `e894fbdc1794d94f`, `ab853868ae34d005` — RoleSelection/Infrastructure |
| `public/assets/icons/globe.svg` | confirmed | `5748890c0d1b0ab5` — `src/components/Navigation.tsx:83:17`; повтор `de2dfee05c238603` — `src/sections/RoleSelection.tsx:49:21` |
| `public/assets/icons/menu.svg` | confirmed | `251531e740d09869` — `src/components/Navigation.tsx:108:41` |
| `public/assets/icons/close.svg` | confirmed | `inline-svg:2675e09848999860` — открытое мобильное меню, `src/components/Navigation.tsx:108:23` |
| `public/assets/icons/building-2.svg` | confirmed | `f24c385422b06e2e` — `src/sections/Hero.tsx:72:15`; повтор `7dcfa72a20b5ed6c` — `src/sections/RoleSelection.tsx:49:21` |
| `public/assets/icons/landmark.svg` | confirmed | `985b16fce150e741` — `src/sections/Hero.tsx:72:15`; повтор `0634e5e5e90516ec` — `src/sections/EcosystemModules.tsx:45:19` |
| `public/assets/icons/cpu.svg` | confirmed | `91a4ae56395845e9` — `src/sections/Hero.tsx:72:15`; повтор `cfc6e127549695bb` — `src/sections/RoleSelection.tsx:49:21` |
| `public/assets/icons/chart-column.svg` | confirmed | `65b38c2509f3a768` — `src/sections/Hero.tsx:72:15` |
| `public/assets/icons/timer.svg` | confirmed | `7e24ca547761ae78` — `src/sections/Problems.tsx:53:21` |
| `public/assets/icons/trending-down.svg` | confirmed | `8303feea8bf49c58` — `src/sections/Problems.tsx:53:21` |
| `public/assets/icons/circle-dashed.svg` | confirmed | `437d3aff295eedaf` — `src/sections/Problems.tsx:53:21` |
| `public/assets/icons/gauge.svg` | confirmed | `db4e07bc0b87ee8d` — `src/sections/Problems.tsx:53:21` |
| `public/assets/icons/arrow-down.svg` | confirmed | `14a9af4e80c7554e` — `src/sections/EntryForm.tsx:97:13` |
| `public/assets/icons/phone.svg` | confirmed | `ea2458dde7164c45` — `src/sections/EntryForm.tsx:112:17`; повтор `7b311e8157ac2c15` — `src/sections/Contacts.tsx:70:15` |
| `public/assets/icons/message-circle.svg` | confirmed | `a73c03aa41cacfac` — `src/sections/EntryForm.tsx:112:17`; повтор `6075fc5bda854994` — `src/sections/Contacts.tsx:70:15` |
| `public/assets/icons/mail.svg` | confirmed | `8bcd6f02bf87ae65` — `src/sections/EntryForm.tsx:112:17`; повтор `efd0bc1eef6e47a9` — `src/sections/Contacts.tsx:70:15` |
| `public/assets/icons/target.svg` | confirmed | `15c3e989e42d7a27` — `src/sections/EcosystemModules.tsx:45:19` |
| `public/assets/icons/users.svg` | confirmed | `a63200b188f27d48` — `src/sections/EcosystemModules.tsx:45:19` |
| `public/assets/icons/graduation-cap.svg` | confirmed | `d5769da3d39b8680` — `src/sections/EcosystemModules.tsx:45:19` |
| `public/assets/icons/radio.svg` | confirmed | `67e229554b4f500d` — `src/sections/EcosystemModules.tsx:45:19` |
| `public/assets/icons/trending-up.svg` | confirmed | `79ef1491645af82a` — `src/sections/EcosystemModules.tsx:45:19` |
| `public/assets/icons/code-xml.svg` | confirmed | `16c2dd22541bf2cf` — `src/sections/RoleSelection.tsx:49:21` |
| `public/assets/icons/briefcase.svg` | confirmed | `1e298395a89c8aeb` — `src/sections/RoleSelection.tsx:49:21` |
| `public/assets/icons/handshake.svg` | confirmed | `1584b6195f0d0e28` — `src/sections/RoleSelection.tsx:49:21` |
| `public/assets/icons/chevron-left.svg` | confirmed | `0cf292a9e38474e1` — `src/sections/Infrastructure.tsx:51:17` |
| `public/assets/icons/chevron-right.svg` | confirmed | `9ce2e0b9b438622a` — `src/sections/Infrastructure.tsx:61:17` |
| `public/assets/icons/map-pin.svg` | confirmed | `0f334192c2405819` — `src/sections/Contacts.tsx:70:15` |

`message-circle.svg` — фактически используемый универсальный Lucide-значок Telegram-контакта; отдельного Telegram brand SVG на странице нет. Аналогично `mail.svg` и `phone.svg` — фактические inline icons для контактов.

## Не добавлялось из-за отсутствия подтверждённого файла

| Категория | Статус | Доказательство |
|---|---|---|
| Отдельный logo/wordmark SVG | confirmed (text/CSS) | Wordmark отрендерен как текст `DT` / `DEEP TECH BRICS+`; `<img>`/внешний logo SVG отсутствует |
| `public/assets/brand/favicon.svg` или `.ico` | required-to-extract | HTML ссылается на `/vite.svg`, но `GET https://deeptech.family/vite.svg` = 404 |
| `public/assets/brand/apple-touch-icon.png` | optional | `link[rel=apple-touch-icon]` отсутствует |
| Hero/section raster images | optional | `document.images.length=0`; media URLs не обнаружены |
| Background/texture/partner logos | optional | один canvas и CSS-градиенты; CSS capture содержит 0 `url(...)` |
| `og-image.jpg` / Twitter image | optional | заявленный `https://deeptech.family/og-image.jpg` = 404 |
| JSON-LD `Organization.logo` | required-to-extract | заявленный `https://deeptech.family/logo.png` = 404 |

## Проверка происхождения

Capture manifest публичной страницы зафиксировал 40 SVG в закрытом состоянии и 40 SVG в открытом мобильном состоянии; только `menu`/`close` меняются местами. Две таблицы стилей загружены, `/vite.svg` не загрузился. При переносе runtime `class`/`code-path` не используются как часть графики и удалены только для возможности автономно хранить SVG; исходная геометрия не перерисовывалась и не заменялась icon pack. Приложение и его исходники в этой ветке не изменялись.


## Реализация canvas-фона в новом сайте

Публичный оригинал подтверждает один canvas-слой с сетью светящихся точек и соединяющих линий. Это не image asset.

В новом проекте эффект реализован кодом:
- `components/NetworkBackground.tsx`;
- подключён к секции `Challenges`;
- canvas не перехватывает события мыши;
- плотность точек адаптируется к размеру секции;
- учитывается `prefers-reduced-motion`;
- цвет и интенсивность вынесены в реализацию и должны уточняться при последующей визуальной сверке.

Не заменять этот эффект статичным PNG/GIF.
