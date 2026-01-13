<template>
  <div v-if="course">
    <!-- Hero Section -->
    <HeroSection
      :title="course.hero?.title"
      :subtitle="course.hero?.subtitle"
      :price="course.hero?.price"
      :old-price="course.hero?.oldPrice"
      :cta-text="course.hero?.ctaText"
      :images="course.hero?.images"
      :badge-text="course.hero?.badgeText"
    />

    <!-- Features / Benefits (static - same for all courses) -->
    <FeaturesSection />

    <!-- Course Content (expandable) -->
    <CourseContentSection
      v-if="course.courseContent"
      :title="course.courseContent.title"
      :content="course.courseContent.content"
    />

    <!-- Credentials Section (static) -->
    <CredentialsSection />

    <!-- Steps Section (static) -->
    <StepsSection />

    <!-- Reviews (static) -->
    <ReviewsSection />

    <!-- Salary Section (static) -->
    <SalarySection />

    <!-- FAQ Section (static) -->
    <FAQSection />
  </div>

  <!-- 404 Fallback -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary-900 mb-4">404</h1>
      <p class="text-gray-600 mb-6">Страница не найдена.</p>
      <NuxtLink to="/" class="text-primary hover:underline">
        Вернуться на главную
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/sections/HeroSection.vue'
import FeaturesSection from '~/components/sections/FeaturesSection.vue'
import CourseContentSection from '~/components/sections/CourseContentSection.vue'
import CredentialsSection from '~/components/sections/CredentialsSection.vue'
import StepsSection from '~/components/sections/StepsSection.vue'
import ReviewsSection from '~/components/sections/ReviewsSection.vue'
import SalarySection from '~/components/sections/SalarySection.vue'
import FAQSection from '~/components/sections/FAQSection.vue'

const route = useRoute()
const slug = route.params.slug as string

// Fetch course data from Nuxt Content v3
const { data: course } = await useAsyncData(`course-${slug}`, () =>
  queryCollection('courses').where('slug', '=', slug).first()
)

// 404 if course not found
if (!course.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

// SEO
useHead({
  title: course.value?.seo?.title || course.value?.title,
  meta: [
    {
      name: 'description',
      content: course.value?.seo?.description || course.value?.description
    }
  ]
})
</script>
