# Тракторные Права РФ - Website

Современный веб-сайт для образовательного центра "Тракторные-права.РФ", созданный на Nuxt 4 с Tailwind CSS.

## 🚀 Технологии

- **Framework**: [Nuxt 4](https://nuxt.com/) с Vue 3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [@nuxt/content](https://content.nuxt.com/) для Nuxt Studio
- **Images**: [@nuxt/image](https://image.nuxt.com/)
- **Typography**: [Montserrat](https://fonts.google.com/specimen/Montserrat)

## 📁 Структура проекта

```
track-licence/
├── assets/
│   └── css/
│       └── main.css          # Tailwind base styles & custom components
├── components/
│   ├── TheHeader.vue         # Header with navigation
│   ├── TheFooter.vue         # Footer
│   ├── MobileNav.vue         # Mobile navigation drawer
│   ├── ContactModal.vue      # Contact form modal
│   └── sections/
│       ├── HeroSection.vue       # Hero banner
│       ├── FeaturesSection.vue   # 4 benefit cards
│       ├── PricingSection.vue    # Pricing plans
│       ├── CoursesSection.vue    # Popular courses grid
│       ├── StepsSection.vue      # How it works timeline
│       ├── ReviewsSection.vue    # Reviews carousel
│       ├── SalarySection.vue     # Career/salary info
│       └── FAQSection.vue        # FAQ accordion (content-driven)
├── content/
│   └── faq/                  # FAQ content (Nuxt Content / Nuxt Studio)
│       ├── 1.praktika.md
│       ├── 2.srok-deystviya.md
│       ├── 3.zamena-utm.md
│       └── ...
├── layouts/
│   └── default.vue           # Default layout
├── pages/
│   ├── index.vue             # Landing page
│   ├── courses.vue           # All courses
│   ├── about.vue             # About page
│   ├── blog.vue              # Blog (placeholder)
│   └── privacy.vue           # Privacy policy
├── nuxt.config.ts            # Nuxt configuration
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## 📝 Nuxt Content / Nuxt Studio

FAQ вопросы хранятся в директории `content/faq/` как markdown файлы. Это позволяет редактировать контент через Nuxt Studio без изменения кода.

### Формат FAQ файла

```markdown
---
title: Заголовок вопроса
order: 1
link: https://example.com  # опционально
linkText: Текст ссылки     # опционально
---

Текст ответа с поддержкой **markdown** форматирования.

- Списки
- Работают

1. Нумерованные
2. Тоже
```

## 🎨 Дизайн-система

### Цвета

- **Primary (Navy Blue)**: `#0B1A54` - основной брендовый цвет
- **Accent (Blue)**: `#1E4BCC` - акцентный синий для градиентов
- **Gold**: `#F5A623` - для CTA кнопок и цен

### Шрифты

- **Montserrat**: основной шрифт (400, 500, 600, 700, 800, 900)

### Компоненты

Готовые классы в `assets/css/main.css`:

- `.btn-primary` - основная CTA кнопка (золотой градиент)
- `.btn-secondary` - вторичная кнопка (синий)
- `.btn-outline` - кнопка с обводкой
- `.card` - карточка с тенью
- `.section-title` - заголовок секции
- `.price-current` / `.price-old` - стилизация цен

## 🛠️ Разработка

### Установка зависимостей

```bash
npm install
```

### Запуск dev-сервера

```bash
npm run dev
```

Сайт будет доступен на `http://localhost:3000`

### Сборка для production

```bash
npm run build
```

### Предпросмотр production сборки

```bash
npm run preview
```

## 📝 Nuxt Studio

Проект настроен для работы с [Nuxt Studio](https://nuxt.studio/). Контент можно редактировать через визуальный редактор.

## 🔗 Оригинальный сайт

Миграция с: https://тракторные-права.рф/

## 📄 Страницы (TODO)

- [x] `/` - Главная страница
- [ ] `/courses` - Все курсы
- [ ] `/traktorist-b`, `/traktorist-c`, etc. - Страницы категорий
- [ ] `/voditel-pogruzchika` - Водитель погрузчика
- [ ] `/mashinist-ekskavatora` - Машинист экскаватора
- [ ] `/blog` - Блог
- [ ] `/about` - О компании
- [ ] `/documents` - Документы
- [ ] `/privacy` - Политика конфиденциальности

## 📞 Контакты

- Телефон: 8 (901) 469 34 41
- WhatsApp: https://wa.me/79014693441
- VK: https://vk.com/tpravarf
