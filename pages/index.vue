<template>
  <!-- Hero Section -->
  <HeroSection
    title="ОБУЧЕНИЕ НА <br> ТРАКТОРНЫЕ ПРАВА"
    :badges="['Быстро', 'Выгодно', 'Легально']"
    price="7 000 ₽"
    cta-text="ОТКРЫТЬ КАТЕГОРИЮ"
    :quick-links="homeQuickLinks"
    badge-position="image"
  />

  <!-- Features / Benefits -->
  <FeaturesSection />

  <!-- Pricing Plans -->
  <section id="pricing" class="section bg-body">
    <div class="container">
      <!-- Section Header -->
      <div class="text-left mb-10">
        <h2 class="section-title">Выбери тариф или создай свой!</h2>
        <p class="text-gray-600 text-lg mt-2">
          При оформлении пакета — <span class="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-1.5 rounded-full font-bold text-base shadow-sm">Экономия до 50%</span>
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <PricingCard
          name="Универсал"
          :price="46000"
          :original-price="48000"
          :features="['Категория B, C, D, E', 'Погрузчик', 'Экскаватор']"
          details-link="/uni"
        />

        <PricingCard
          name="Специалист"
          :price="60000"
          :original-price="72000"
          :features="['Категория B, C, D, E', 'Погрузчик', 'Экскаватор', 'Бульдозер', 'Машинист крана']"
          bonus="A1 в подарок!"
          :popular="true"
          details-link="/spech"
        />

        <PricingCard
          name="Профессионал"
          :price="68000"
          :original-price="80000"
          :features="['Категория B, C, D, E', 'Категория F', 'Погрузчик', 'Экскаватор', 'Бульдозер', 'Машинист крана']"
          bonus="A1 в подарок!"
          details-link="/pro"
        />

        <PricingCard
          name="Мастер"
          :price="89000"
          :original-price="97000"
          :features="['A2, B, C, D, E, F', 'Погрузчик', 'Экскаватор', 'Бульдозер', 'Машинист крана', 'Машинист катка']"
          bonus="A1 в подарок!"
          details-link="/master"
        />
      </div>

      <!-- Custom Tariff CTA -->
      <div class="flex justify-center">
        <NuxtLink
          to="/tarif"
          class="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white text-lg md:text-xl lg:text-2xl font-semibold py-4 px-6 md:px-12 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200 no-underline"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Создать свой тариф
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Popular Courses -->
  <section class="section">
    <div class="container">
      <!-- Section Header -->
      <div class="text-left mb-10">
        <h2 class="section-title">Популярные направления</h2>
        <p class="text-gray-600 text-lg">
          Стоимость указана за одну категорию или отметку.
        </p>
      </div>

      <!-- Courses Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <CourseCard
          title="Тракторист - В, С, D, E"
          price="8 000 ₽*"
          original-price="16 000 ₽"
          description="Тракторы с колесным и гусеничным ходом, мощность которых свыше 4 кВт. *Стоимость указана за одну категорию"
          image-src="/images/cards/bcde.webp"
          details-link="/traktorist-bcde"
        />

        <CourseCard
          title="Категория - F"
          price="8 000 ₽"
          original-price="16 000 ₽"
          description="Комбайны и другая сельскохозяйственная техника с любым видом трансмиссии"
          image-src="/images/cards/f.webp"
          details-link="/kategoriya-f"
        />

        <CourseCard
          title="Водитель погрузчика"
          price="8 000 ₽"
          original-price="16 000 ₽"
          description="Даёт право работы на любых видах погрузчиков от вилочных до телескопических, с мощностью от 3 до 147 кВт"
          image-src="/images/cards/forklift.webp"
          details-link="/voditel-pogruzchika"
        />

        <CourseCard
          title="Машинист экскаватора"
          price="8 000 ₽"
          original-price="16 000 ₽"
          description="Даёт возможность работать на любых экскаваторах, от одноковшового с ковшом 0,15 м³ до роторных"
          image-src="/images/cards/excavator.webp"
          details-link="/mashinist-ekskavatora"
        />

        <CourseCard
          title="Машинист бульдозера"
          price="8 000 ₽"
          original-price="16 000 ₽"
          description="Даёт возможность работы на бульдозерах мощностью от 20 кВт до 150 кВт"
          image-src="/images/cards/bulldozer.webp"
          details-link="/mashinist-buldozera"
        />

        <CourseCard
          title="Машинист катка"
          price="8 000 ₽"
          original-price="16 000 ₽"
          description="Даёт право работы на катках с гладким вальцом и полуприцепных на пневматических шинах массой от 5 тонн"
          image-src="/images/cards/roller.webp"
          details-link="/mashinist-katka"
        />

        <CourseCard
          title="Категория А1"
          price="8 000 ₽"
          original-price="16 000 ₽"
          description="Внедорожный мототранспорт. К этой подкатегории относятся: квадроциклы и снегоходы"
          image-src="/images/cards/a1.webp"
          details-link="/kategoriya-a1"
        />

        <CourseCard
          title="Категория А2"
          price="9 000 ₽"
          original-price="18 000 ₽"
          description="Внедорожные автотранспортные средства массой менее 3,5 тонн такие как багги и трэколы"
          image-src="/images/cards/a2.webp"
          details-link="/kategoriya-a2"
        />

        <!-- View All Card -->
        <NuxtLink
          to="/vse-kursy"
          class="group flex flex-col items-center justify-center min-h-[380px] bg-white rounded-2xl shadow-[0_2px_20px_rgba(10,23,68,0.08)] border border-gray-100 hover:bg-gradient-to-br hover:from-primary hover:to-primary-700 transition-all duration-300 hover:-translate-y-1"
        >
          <div class="w-16 h-16 bg-blue-50 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-4 transition-colors">
            <svg class="w-8 h-8 text-primary-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-primary-900 group-hover:text-white mb-2 transition-colors">
            Все курсы
          </h3>
          <p class="text-gray-500 group-hover:text-white/70 text-center text-sm px-4 transition-colors">
            Ознакомьтесь со всем списком доступных программ
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- How It Works Steps -->
  <StepsSection />

  <!-- Reviews -->
  <ReviewsSection />

  <!-- Salary / Career Info -->
  <SalarySection />

  <!-- Feedback Form -->
  <FeedbackFormSection />

  <!-- FAQ -->
  <FAQSection />
</template>

<script setup lang="ts">
// Import section components
import HeroSection from '~/components/sections/HeroSection.vue'
import FeaturesSection from '~/components/sections/FeaturesSection.vue'
import PricingCard from '~/components/sections/PricingCard.vue'
import CourseCard from '~/components/sections/CourseCard.vue'
import StepsSection from '~/components/sections/StepsSection.vue'
import ReviewsSection from '~/components/sections/ReviewsSection.vue'
import SalarySection from '~/components/sections/SalarySection.vue'
import FeedbackFormSection from '~/components/sections/FeedbackFormSection.vue'
import FAQSection from '~/components/sections/FAQSection.vue'

// Hero Section quick links
const homeQuickLinks = [
  { label: 'Тракторист', path: '/vse-kursy?filter=tractor' },
  { label: 'Погрузчик', path: '/voditel-pogruzchika' },
  { label: 'Экскаваторщик', path: '/mashinist-ekskavatora' },
  { label: 'Комбайнёр', path: '/kategoriya-f' },
  { label: 'Квадроцикл', path: '/kategoriya-a1' },
  { label: 'Все направления →', path: '/vse-kursy' },
]

// SEO Meta
useHead({
  title: 'Тракторные Права РФ - Обучение на тракторные права от 7000 ₽',
  meta: [
    {
      name: 'description',
      content: 'Обучение на тракторные права в России. Категории B, C, D, E, F. Погрузчик, экскаватор, бульдозер. 99% сдают с первого раза. Стоимость от 7000 ₽.'
    },
    {
      name: 'keywords',
      content: 'тракторные права, удостоверение тракториста, обучение на трактор, категория B трактор, погрузчик права, экскаватор обучение'
    },
    { property: 'og:title', content: 'Тракторные Права РФ - Обучение на тракторные права' },
    { property: 'og:description', content: 'Обучение на тракторные права. Быстро, выгодно, легально. 99% сдают с первого раза.' },
    { property: 'og:type', content: 'website' },
  ]
})
</script>
