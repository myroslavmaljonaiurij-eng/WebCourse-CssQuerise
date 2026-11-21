# css-modern-catalog — Techno Stan

Навчальний проєкт до курсової роботи **«Сучасні можливості CSS: Container Queries, Subgrid і CSS Nesting у практичній верстці»** (група 31-КН).

Це верстка чотиристорінкового інтернет-магазину техніки **Techno Stan** на чистих HTML, CSS і мінімумі JavaScript, без фреймворків і збирачів. Поруч лежить **legacy-версія «до»**: той самий дизайн на плоскому CSS з `@media`, без нових можливостей. Вона потрібна для порівняння.

Сайт: https://myroslavmaljonaiurij-eng.github.io/WebCourse-CssQuerise/css-modern-catalog/index.html

## Мета проєкту

Показати на практиці, як три сучасні можливості CSS спрощують верстку:

| Можливість | Що вирішує | Де застосовано |
|---|---|---|
| **Container Queries** | Картка змінює вигляд залежно від ширини *контейнера*, а не вікна | `card.css`, `grid.css` (`container: card / inline-size`) |
| **Subgrid** | Елементи вкладених блоків вирівнюються по спільних рядках батьківської сітки | категорії, нотатки товару, FAQ, поля форми, характеристики |
| **CSS Nesting** | Стани й модифікатори пишуться всередині блоку, без дублювання селекторів | `button.css`, `header.css`, `footer.css`, `pages.css` та ін. |

## Сторінки

| Файл | Опис |
|---|---|
| `index.html` | Головна: hero, переваги, категорії, сітка товарів, promo-банер, розсилка |
| `catalog.html` | Каталог: бокова панель фільтрів, перемикання «сітка / список», сортування |
| `product.html` | Сторінка товару Sonic Pro: галерея, характеристики, вибір кількості, блок «Good together» |
| `contact.html` | Форма зворотного зв'язку, контакти, швидкі відповіді (FAQ) |

## Де саме використано можливості

### Container Queries
- Кожен `<li>` у `.grid-cards` оголошується контейнером: `container: card / inline-size`.
- `@container card (min-width: 28rem)`: картка стає горизонтальною (зображення зліва, текст справа). Це спрацьовує, коли в каталозі ввімкнено вигляд «Список».
- `@container card (max-width: 13rem)`: у вузькій картці ховаються опис і рейтинг, зменшується заголовок.

### Subgrid
- `.category` у `grid.css`: номер, назва й опис вирівнюються по рядках між картками.
- `.note` у `grid.css`: заголовки й тексти блоку «The details make the difference».
- `.specs__item` у `pages.css`: значення й підписи характеристик.
- `.faq__item` у `pages.css`: заголовки, тексти й посилання FAQ.
- `.form__field` у `form.css`: підпис, поле й підказка вирівняні в обох колонках форми.

### CSS Nesting
- Модифікатори й стани вкладені у блок: `.btn { &.btn--primary { &:hover {…} } }`.
- Вкладені елементи БЕМ-блоків: `.header`, `.nav`, `.footer`, `.card`, `.filter`, `.form`.
- Стани, псевдоелементи й медіазапити всередині правил: `&:hover`, `&::after`, `&[aria-current="page"]`.

### Інші сучасні можливості (допоміжні)
`:has()` (мобільне меню за `aria-expanded`), `color-mix()`, `clamp()`, `min()`, логічні властивості (`margin-inline`, `padding-block`), `text-wrap: balance | pretty`, `:user-invalid`, `100dvh`, `aspect-ratio`, `accent-color`.

## Структура проєкту

```
css-modern-catalog/
├── index.html
├── catalog.html
├── product.html
├── contact.html
│
├── css/
│   ├── base/
│   │   ├── reset.css           # скидання стилів
│   │   ├── variables.css       # CSS-змінні: кольори, відступи, шрифти
│   │   └── typography.css
│   ├── layout/
│   │   ├── header.css
│   │   ├── footer.css          # розсилка + футер
│   │   ├── grid.css            # сітки, Subgrid, Container Query контейнери
│   │   └── pages.css           # блоки сторінок: hero, товар, контакти, FAQ
│   ├── components/
│   │   ├── card.css            # Container Queries
│   │   ├── button.css          # Nesting
│   │   ├── filters.css
│   │   └── form.css            # Subgrid
│   └── main.css                # точка входу, @import усіх файлів
│
├── js/
│   ├── main.js                 # меню, фільтри, кількість, вигляд, демо-форми
│   └── products.js
│
├── assets/
│   ├── images/                 # sonic-pro, novabook-air-14, pulse-watch, orbit-mini, workspace
│
├── legacy/                     # версія «до» для порівняння
│   ├── index.html
│   └── css/style.css           # плоский CSS + @media
│
├── .gitignore
├── README.md
└── LICENSE
```

## Порядок підключення CSS

Стилі підключаються однією стрічкою `css/main.css`. Порядок імпортів визначає каскад:

1. `base/`: reset → variables → typography
2. `layout/`: grid → header → footer → pages
3. `components/`: button → card → filters → form

## Запуск

Збирання не потрібне. Варіанти:

```bash
# 1. Просто відкрити index.html у браузері
# 2. Або запустити локальний сервер (рекомендовано)
python -m http.server 8000
# → http://localhost:8000
```

Також підійде розширення **Live Server** у VS Code.

## JavaScript (`js/main.js`)

Скрипт мінімальний і не залежить від бібліотек:

- мобільне меню: перемикає `aria-expanded`, а CSS реагує через `:has()`; закривається по `Esc` і при переході на десктоп;
- панель фільтрів у каталозі: на десктопі завжди відкрита, на мобільних згорнута;
- лічильник кількості на сторінці товару з перерахунком ціни на кнопці «Add to bag»;
- перемикання вигляду каталогу «сітка / список» з запам'ятовуванням у `localStorage`;
- демо-форми (розсилка, контакти): без бекенду показують підтвердження.

## Legacy-версія («до»)

Папка `legacy/` містить головну сторінку, переписану **без** нових можливостей:

| Було (сучасна версія) | Стало (legacy) |
|---|---|
| Container Queries | `@media` за шириною вікна |
| Subgrid | `flex` + рівна висота карток |
| CSS Nesting | плоскі повні селектори (БЕМ) |
| `:has()` для меню | клас `.is-open`, який ставить скрипт |
| `grid auto-fit` | `flex-wrap` з фіксованими `flex-basis` |

Порівняння кількості рядків, повторень і поведінки при зміні ширини контейнера описане в курсовій.

## Адаптивність

Брейкпоінти: `64rem` (legacy: планшет), `56rem` (меню, одна колонка для hero / товару / контактів / каталогу), `48rem` (футер), `40rem` (форма), `36rem` (legacy: мобільний).

## Підтримка браузерів

Потрібні браузери, що підтримують Container Queries, Subgrid і CSS Nesting (Chrome / Edge 120+, Safari 16.4+ / 17.2+ для Nesting, Firefox 117+ / 121+). Точні версії варто звірити на [caniuse.com](https://caniuse.com) перед захистом.

## Доступність

- семантичні теги (`header`, `nav`, `main`, `section`, `aside`, `footer`);
- `aria-current`, `aria-expanded`, `aria-label`, `aria-pressed`;
- клас `.visually-hidden` для підписів полів;
- видимий `:focus-visible`;
- `prefers-reduced-motion` вимикає анімації.

## Відомі нюанси

- У `contact.html` і `catalog.html` підключено `js/main.js`; у структурі згадано також `js/product.js`, але його логіка вже в `main.js`, тому окремий файл не потрібен.
- Зображення в `assets/images/` мають збігатися з назвами в HTML. У структурі помилка `nobabook-air-14.jpg`, а в коді `novabook-air-14.jpg`.
- У legacy-версії шляхи до сторінок і зображень починаються з `../`.
- Форми не мають бекенду: це лише демонстрація.

## Автор

Студент Мальони Мирослава групи 31-КН. Курсова робота з теми «Сучасні можливості CSS: Container Queries, Subgrid і CSS Nesting у практичній верстці».

## Ліцензія

Навчальний проєкт. Ліцензію вказано у файлі `LICENSE` (необов'язково).
