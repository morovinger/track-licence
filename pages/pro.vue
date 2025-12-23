<template>
  <!-- Hero with custom content for "Профессионал" package -->
  <HeroSection
    title="Пакет Профессионал"
    subtitle="Максимально полное обучение на всю линейку востребованной спецтехники с получением 9 квалификаций"
    :badges="['Подходит без опыта', 'Практика на настоящей технике', 'Экзамен с инспектором Гостехнадзор', 'Высокий % сдачи']"
    price="59 000 ₽"
    old-price="68 000 ₽"
    cta-text="Записаться на курс"
    :quick-links="[]"
    bg-class="bg-body"
    show-badge
    badge-text="№ 1 в РФ"
    image-src="/images/hero.webp"
    image-alt="Пакет Профессионал"
  />

  <!-- Package Includes Section -->
  <section class="section bg-white">
    <div class="container">
      <div class="text-center mb-12">
        <h2 class="section-title">В этот пакет входит</h2>
        <p class="section-subtitle mx-auto">
          Все направления оформляются по одной заявке
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <!-- Category Cards -->
        <div
          v-for="category in packageCategories"
          :key="category.id"
          class="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(10,23,68,0.08)] hover:shadow-[0_8px_30px_rgba(10,23,68,0.15)] border border-gray-100 transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Image -->
          <div class="relative h-44 bg-gradient-to-br from-[#1a3a8a] to-[#0a1744] overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-20 h-20 text-white/25" fill="currentColor" viewBox="0 0 24 24">
                <path :d="category.icon" />
              </svg>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0a1744]/60 to-transparent"></div>
            
            <!-- Badge -->
            <span
              v-if="category.badge"
              class="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0a1744] text-xs font-bold rounded-full"
            >
              {{ category.badge }}
            </span>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="text-lg font-bold text-[#0a1744] mb-2 leading-tight">
              {{ category.name }}
            </h3>
            <p class="text-sm text-gray-500 leading-relaxed">
              {{ category.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Package Details Section -->
  <section class="section bg-gray-50">
    <div class="container max-w-4xl">
      <h2 class="section-title text-center mb-8">Пакетное обучение «Профессионал»</h2>
      
      <div class="prose prose-lg max-w-none space-y-6 text-gray-700">
        <p class="text-lg">
          Пакет <strong>«Профессионал»</strong> — это <strong>максимально полное обучение</strong> 
          на всю линейку востребованной спецтехники с получением <strong>9 квалификаций</strong>:
        </p>

        <ul class="list-disc pl-6 space-y-2">
          <li>Тракторист категории B, C, D, E</li>
          <li>Категория F — машинист комбайна</li>
          <li>Водитель погрузчика</li>
          <li>Машинист экскаватора</li>
          <li>Машинист бульдозера</li>
          <li>Машинист крана (крановщик)</li>
        </ul>

        <p class="text-amber-600 font-semibold">
          <strong>Бонус: категория A1 — в подарок</strong> (внедорожные мотосредства — квадроциклы и снегоходы).
        </p>

        <div class="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 class="text-xl font-bold text-[#0a1744] mb-4">Какая техника входит в обучение</h3>
          <ul class="space-y-2 text-gray-700">
            <li><strong>Категория B</strong> — мини-тракторы от 4 до 25,7 кВт</li>
            <li><strong>Категория C</strong> — колёсные тракторы 25,7–110,3 кВт</li>
            <li><strong>Категория D</strong> — тяжёлые трактора свыше 110,3 кВт</li>
            <li><strong>Категория E</strong> — гусеничная техника от 25,7 кВт</li>
            <li><strong>Категория F</strong> — зерноуборочные и кормоуборочные комбайны</li>
            <li><strong>Погрузчики</strong> — вилочные, фронтальные, телескопические</li>
            <li><strong>Экскаваторы</strong> — ковшовые и роторные, объём ковша от 0,15 м³</li>
            <li><strong>Бульдозеры</strong> — от 20 до 150 кВт, с навесным отвалом</li>
            <li><strong>Краны</strong> — башенные, гусеничные, автомобильные</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <FAQSection />
</template>

<script setup lang="ts">
import HeroSection from '~/components/sections/HeroSection.vue'
import FAQSection from '~/components/sections/FAQSection.vue'

// SEO Meta
useHead({
  title: 'Пакет Профессионал - Обучение на спецтехнику | Тракторные Права РФ',
  meta: [
    { 
      name: 'description', 
      content: 'Пакет Профессионал - полное обучение на 9 категорий спецтехники за 59 000 ₽. Тракторист, погрузчик, экскаватор, бульдозер, кран. А1 в подарок!' 
    },
  ]
})

const packageCategories = [
  {
    id: 'b',
    name: 'Тракторист B',
    description: 'Гусеничная и колесная техника от 4 до 25,7 кВт (5 - 35 л.c.)',
    icon: 'M20 11H6V6h10.5L18 3H8c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v7h2v-3h16v3h2v-7c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'
  },
  {
    id: 'c',
    name: 'Тракторист C',
    description: 'Колесная техника от 25,7 кВ до 110,3 кВ (35 - 150 л.c.)',
    icon: 'M20 11H6V6h10.5L18 3H8c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v7h2v-3h16v3h2v-7c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'
  },
  {
    id: 'd',
    name: 'Тракторист D',
    description: 'Колесная техника свыше 110,3 кВ (от 110 л.с.)',
    icon: 'M20 11H6V6h10.5L18 3H8c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v7h2v-3h16v3h2v-7c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'
  },
  {
    id: 'e',
    name: 'Тракторист E',
    description: 'Гусеничная техника свыше 25,7 кВ (от 35 л.c.)',
    icon: 'M20 11H6V6h10.5L18 3H8c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v7h2v-3h16v3h2v-7c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'
  },
  {
    id: 'a1',
    name: 'Категория A I',
    description: 'Внедорожный мототранспорт: квадроциклы и снегоходы',
    icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
    badge: 'В подарок'
  },
  {
    id: 'f',
    name: 'Категория F',
    description: 'Комбайны и другая сельскохозяйственная техника с любыми видом трансмиссии',
    icon: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v9h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2V7c0-1.1-.9-2-2-2zM8 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'
  },
  {
    id: 'loader',
    name: 'Водитель погрузчика',
    description: 'Даёт право работы на любых видах погрузчиков от вилочных до телескопических',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'
  },
  {
    id: 'excavator',
    name: 'Машинист экскаватора',
    description: 'Даёт возможность работать на любых экскаваторах, от одноковшового до роторных',
    icon: 'M4 15v4h4v-4H4zm5 0v4h4v-4H9zm5 0v4h4v-4h-4zm5 0v4h4v-4h-4zM4 10v4h4v-4H4zm5 0v4h4v-4H9zm5 0v4h4v-4h-4zm5 0v4h4v-4h-4zM4 5v4h4V5H4zm5 0v4h4V5H9z'
  },
  {
    id: 'bulldozer',
    name: 'Машинист бульдозера',
    description: 'Даёт возможность работы на бульдозерах мощностью от 20 кВт до 150 кВт',
    icon: 'M18 4H6v4H4v8h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2V8h-2V4zm-2 14H8v-2h8v2z'
  },
  {
    id: 'crane',
    name: 'Машинист крана',
    description: 'Подробнее об обучении на крановщика',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  }
]
</script>

