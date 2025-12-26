<template>
  <!-- Hero Section -->
  <HeroSection 
    title="ОБУЧЕНИЕ НА ТРАКТОРНЫЕ ПРАВА"
    :badges="['Быстро', 'Выгодно', 'Легально']"
    price="7 000 ₽"
    cta-text="ОТКРЫТЬ КАТЕГОРИЮ"
    :quick-links="homeQuickLinks"
  />
  
  <!-- Features / Benefits -->
  <section class="section bg-body -mt-8 md:-mt-12 relative z-10">
    <div class="container">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <FeatureSection
          icon-src="/images/checkmark.svg"
          title="99% сдают с 1 раза"
          description="Благодаря усиленной подготовке наши студенты сдают экзамен с первого раза"
          :animation-delay="100"
        />
        <FeatureSection
          icon-src="/images/pc.svg"
          title="Обучение без границ"
          description="Учитесь на любом устройстве в удобное для вас время на нашей платформе"
          :animation-delay="200"
        />
        <FeatureSection
          icon-src="/images/percentage.svg"
          title="Больше категорий - больше выгода"
          description="При обучении на несколько категорий действует система скидок — до 12 000 ₽"
          :animation-delay="300"
        />
        <FeatureSection
          icon-src="/images/person.svg"
          title="Сопроводим от заявки до прав"
          description="Личный менеджер и наставники помогут вам на каждом этапе — от заявки до получения прав"
          :animation-delay="400"
        />
      </div>
    </div>
  </section>
  
  <!-- Pricing Plans -->
  <section id="pricing" class="section bg-body">
    <div class="container">
      <!-- Section Header -->
      <div class="text-left mb-12">
        <h2 class="section-title">Выбери тариф или создай свой</h2>
        <p class="text-gray-600 text-lg">
          При оформлении пакета — <span class="inline-block bg-red-500 text-white px-4 py-1 rounded-full font-bold">Экономия до 50%</span>
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <PricingCard
          name="Универсал"
          :price="46000"
          :original-price="48000"
          :features="['Категория B, C, D, E', 'Погрузчик', 'Экскаватор']"
          details-link="/tariff/universal"
          :animation-delay="100"
        />
        
        <PricingCard
          name="Специалист"
          :price="60000"
          :original-price="72000"
          :features="['Категория B, C, D, E', 'Погрузчик', 'Экскаватор', 'Бульдозер', 'Машинист крана']"
          bonus="A1 в подарок!"
          :popular="true"
          details-link="/tariff/specialist"
          :animation-delay="200"
        />
        
        <PricingCard
          name="Профессионал"
          :price="68000"
          :original-price="80000"
          :features="['Категория B, C, D, E', 'Категория F', 'Погрузчик', 'Экскаватор', 'Бульдозер', 'Машинист крана']"
          bonus="A1 в подарок!"
          details-link="/tariff/professional"
          :animation-delay="300"
        />
        
        <PricingCard
          name="Мастер"
          :price="89000"
          :original-price="97000"
          :features="['A2, B, C, D, E, F', 'Погрузчик', 'Экскаватор', 'Бульдозер', 'Машинист крана', 'Машинист катка']"
          bonus="A1 в подарок!"
          details-link="/tariff/master"
          :animation-delay="400"
        />
      </div>

      <!-- Custom Tariff CTA -->
      <NuxtLink 
        to="/tariff-builder"
        class="group flex items-center justify-center gap-4 bg-primary text-white rounded-full py-4 px-8 text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 max-w-md mx-auto"
      >
        <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
          </svg>
        </div>
        <span class="text-lg font-bold">Создать свой тариф</span>
      </NuxtLink>
    </div>
  </section>
  
  <!-- Popular Courses -->
  <CoursesSection />
  
  <!-- How It Works Steps -->
  <StepsSection />
  
  <!-- Reviews -->
  <ReviewsSection />
  
  <!-- Salary / Career Info -->
  <SalarySection />
  
  <!-- FAQ -->
  <FAQSection />
</template>

<script setup lang="ts">
// Import section components
import HeroSection from '~/components/sections/HeroSection.vue'
import FeatureSection from '~/components/sections/FeatureSection.vue'
import PricingCard from '~/components/sections/PricingCard.vue'
import CoursesSection from '~/components/sections/CoursesSection.vue'
import StepsSection from '~/components/sections/StepsSection.vue'
import ReviewsSection from '~/components/sections/ReviewsSection.vue'
import SalarySection from '~/components/sections/SalarySection.vue'
import FAQSection from '~/components/sections/FAQSection.vue'

// Hero Section quick links
const homeQuickLinks = [
  { label: 'Тракторист', path: '/courses?filter=tractor' },
  { label: 'Погрузчик', path: '/voditel-pogruzchika' },
  { label: 'Экскаваторщик', path: '/mashinist-ekskavatora' },
  { label: 'Комбайнёр', path: '/kategoriya-f' },
  { label: 'Квадроцикл', path: '/kategoriya-a1' },
  { label: 'Все направления →', path: '/courses' },
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


