<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Features / Benefits -->
    <FeaturesSection />
    
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
  </div>
</template>

<script setup lang="ts">
// Import section components
import HeroSection from '~/components/sections/HeroSection.vue'
import FeaturesSection from '~/components/sections/FeaturesSection.vue'
import PricingSection from '~/components/sections/PricingSection.vue'
import CoursesSection from '~/components/sections/CoursesSection.vue'
import StepsSection from '~/components/sections/StepsSection.vue'
import ReviewsSection from '~/components/sections/ReviewsSection.vue'
import SalarySection from '~/components/sections/SalarySection.vue'
import FAQSection from '~/components/sections/FAQSection.vue'

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

