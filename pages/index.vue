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
  <PricingSection />
  
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
import PricingSection from '~/components/sections/PricingSection.vue'
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


