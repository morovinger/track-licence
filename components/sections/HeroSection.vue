<template>
  <section :class="['relative', bgClass]">
    <div class="container py-6 md:py-10">
      <div class="flex flex-col lg:flex-row gap-6 items-stretch min-h-[450px] md:min-h-[500px]">
        <!-- Left Content - Text (White Card) -->
        <div class="left lg:w-[50%] flex flex-col justify-center p-6 md:p-10 lg:p-12 bg-white rounded-3xl shadow-lg">
          <!-- Main Title -->
          <div class="mb-6 md:mb-8">
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl font-black text-primary-900 leading-[1.15] tracking-tight uppercase">
              {{ title }}
            </h1>

            <!-- Subtitle (optional) -->
            <p v-if="subtitle" class="mt-3 md:mt-4 text-base md:text-lg text-gray-600">
              {{ subtitle }}
            </p>

            <!-- Price -->
            <div v-if="price" class="mt-2 md:mt-3">
              <span class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl font-black text-[#1a5cd6]">
                {{ price }}
              </span>
              <span v-if="oldPrice" class="ml-3 text-lg md:text-xl text-gray-400 line-through">
                {{ oldPrice }}
              </span>
            </div>
          </div>

          <!-- CTA Button -->
          <button
            @click="handleCtaClick"
            class="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary-900 text-white font-bold text-sm md:text-base rounded-full hover:bg-primary-800 transition-colors duration-300 mb-6 md:mb-8 w-fit"
          >
            {{ ctaText }}
          </button>

          <!-- Quick Links -->
          <div v-if="quickLinks && quickLinks.length > 0" class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              class="px-3 md:px-4 py-2 border border-gray-200 hover:border-[#1a5cd6] hover:bg-blue-50 rounded-full text-xs md:text-sm text-gray-700 hover:text-[#1a5cd6] transition-all duration-300"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Right Content - Image/Slider -->
        <div class="right lg:w-[50%] relative">
          <slot name="right">
            <!-- Number 1 Badge with green dot -->
            <div v-if="showBadge" class="absolute top-0 left-0 z-20 w-max flex items-center gap-2 rounded-full px-3 md:px-4 py-1.5 md:py-2 bg-white shadow-md">
              <span class="w-2 md:w-2.5 h-2 md:h-2.5 bg-green-500 rounded-full"></span>
              <span class="font-bold text-sm md:text-base text-primary-900">{{ badgeText }}</span>
            </div>

            <!-- Slider (Multiple Images) -->
            <template v-if="images && images.length > 1">
              <div class="relative rounded-3xl overflow-hidden">
                <div
                  class="flex transition-transform duration-500 ease-out"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <img
                    v-for="(image, index) in images"
                    :key="index"
                    :src="image"
                    :alt="`${imageAlt} ${index + 1}`"
                    class="w-full flex-shrink-0 h-auto object-cover rounded-3xl"
                  />
                </div>

                <!-- Navigation Arrows -->
                <button
                  @click="prevSlide"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-primary-900 transition-all z-10"
                  aria-label="Previous slide"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  @click="nextSlide"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-primary-900 transition-all z-10"
                  aria-label="Next slide"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <!-- Dots Indicator -->
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  <button
                    v-for="(_, index) in images"
                    :key="index"
                    @click="goToSlide(index)"
                    :class="[
                      'w-2 h-2 rounded-full transition-all',
                      currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
                    ]"
                    :aria-label="`Go to slide ${index + 1}`"
                  />
                </div>
              </div>
            </template>

            <!-- Single Image (Backward Compatible) -->
            <img
              v-else
              :src="imageSrc"
              :alt="imageAlt"
              class="w-full h-auto object-cover rounded-3xl"
            />
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface QuickLink {
  label: string
  path: string
}

interface Props {
  // Text content
  title?: string
  subtitle?: string

  // Pricing
  price?: string
  oldPrice?: string

  // CTA
  ctaText?: string

  // Quick links
  quickLinks?: QuickLink[]

  // Right side (when using default slot)
  imageSrc?: string        // Single image (backward compatible)
  images?: string[]        // Multiple images for slider
  imageAlt?: string
  showBadge?: boolean
  badgeText?: string

  // Styling
  bgClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'ОБУЧЕНИЕ НА\nТРАКТОРНЫЕ ПРАВА',
  price: '7 000 ₽',
  ctaText: 'ОТКРЫТЬ КАТЕГОРИЮ',
  quickLinks: () => [
    { label: 'Тракторист', path: '/vse-kursy?filter=tractor' },
    { label: 'Погрузчик', path: '/voditel-pogruzchika' },
    { label: 'Экскаваторщик', path: '/mashinist-ekskavatora' },
    { label: 'Комбайнёр', path: '/kategoriya-f' },
    { label: 'Квадроцикл', path: '/kategoriya-a1' },
    { label: 'Все направления →', path: '/vse-kursy' },
  ],
  imageSrc: '/images/hero.webp',
  imageAlt: 'Обучение на тракторные права',
  showBadge: true,
  badgeText: '№ 1 в РФ',
  bgClass: 'bg-body',
})

const openContactModal = inject<() => void>('openContactModal')

const handleCtaClick = () => {
  openContactModal?.()
}

// Slider functionality
const currentSlide = ref(0)

const nextSlide = () => {
  if (props.images && props.images.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % props.images.length
  }
}

const prevSlide = () => {
  if (props.images && props.images.length > 0) {
    currentSlide.value = currentSlide.value === 0
      ? props.images.length - 1
      : currentSlide.value - 1
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Auto-play slider (optional)
let autoPlayInterval: NodeJS.Timeout | null = null

onMounted(() => {
  if (props.images && props.images.length > 1) {
    autoPlayInterval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds
  }
})

onUnmounted(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
})
</script>
