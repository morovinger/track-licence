<template>
  <section :class="['relative', bgClass]">
    <div class="container pt-4 pb-12">
      <div class="flex flex-col lg:flex-row gap-5 items-stretch">
        <!-- Left Content - Text (White Card) -->
        <div class="left lg:w-[50%] flex flex-col p-5 md:p-6 bg-white rounded-[30px] shadow-lg">
          <!-- Badge (№ 1 в РФ) - content position -->
          <div v-if="showBadge && badgePosition === 'content'" class="flex items-center justify-center gap-1.5">
            <span class="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            <span class="font-bold text-sm text-[#333]">{{ badgeText }}</span>
          </div>

          <!-- Inner content wrapper, vertically centered -->
          <div class="flex-grow flex flex-col justify-center">
            <!-- Main Title -->
            <h1 class="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-extrabold text-[#1d2e53] leading-[1.2] uppercase" v-html="title">
            </h1>

            <!-- Price -->
            <div v-if="price" class="mt-2">
              <span class="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-extrabold text-[#123f90]">
                {{ price }}
              </span>
              <span v-if="oldPrice" class="ml-2 text-base md:text-lg text-[#4a4a4a] line-through">
                {{ oldPrice }}
              </span>
            </div>

            <!-- Subtitle -->
            <p v-if="subtitle" class="mt-2 text-sm text-[#4a4a4a]">
              {{ subtitle }}
            </p>

            <!-- CTA + Urgency -->
            <div class="flex flex-col items-center mt-6">
              <button
                @click="handleCtaClick"
                class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#123f90] to-[#0056D2] text-white font-bold text-[clamp(17px,1.6vw,21px)] rounded-full hover:opacity-90 transition-all duration-300"
              >
                {{ ctaText }}
              </button>
              <p v-if="urgencyText" class="mt-2 text-sm text-gray-500">
                {{ urgencyText }}
              </p>
            </div>

            <!-- Features/Badges (for course pages) -->
            <div v-if="features && features.length > 0" class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="feature in features"
                :key="feature"
                class="px-4 py-3 bg-[#f1f5fb] rounded-[30px] text-sm text-gray-800"
              >
                {{ feature }}
              </span>
            </div>
          </div>

          <!-- Quick Links (for home page) - pinned to bottom -->
          <div v-if="quickLinks && quickLinks.length > 0 && !(features && features.length > 0)" class="flex flex-wrap justify-evenly gap-3 mt-auto">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              class="px-4 py-3 bg-[#f1f5fb] hover:bg-[#dce9ff] rounded-[30px] text-sm text-gray-800 hover:text-[#123f90] transition-all duration-300"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Right Content - Image/Slider -->
        <div class="right lg:w-[50%] relative">
          <!-- Badge (№ 1 в РФ) - image position -->
          <div v-if="showBadge && badgePosition === 'image'" class="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <span class="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            <span class="font-bold text-sm text-[#333]">{{ badgeText }}</span>
          </div>
          <slot name="right">
            <!-- Slider (Multiple Images) -->
            <template v-if="images && images.length > 1">
              <div class="relative rounded-[30px] overflow-hidden h-full">
                <div
                  class="flex transition-transform duration-500 ease-out h-full"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <img
                    v-for="(image, index) in images"
                    :key="index"
                    :src="image"
                    :alt="`${imageAlt} ${index + 1}`"
                    class="w-full flex-shrink-0 h-full object-cover"
                  />
                </div>

                <!-- Navigation Arrows -->
                <button
                  @click="prevSlide"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-primary-900 transition-all z-10"
                  aria-label="Previous slide"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  @click="nextSlide"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-primary-900 transition-all z-10"
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
              class="w-full h-full object-cover rounded-[30px]"
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
  urgencyText?: string

  // Features (course pages)
  features?: string[]

  // Quick links (home page)
  quickLinks?: QuickLink[]

  // Right side (when using default slot)
  imageSrc?: string        // Single image (backward compatible)
  images?: string[]        // Multiple images for slider
  imageAlt?: string
  showBadge?: boolean
  badgeText?: string
  badgePosition?: 'content' | 'image'

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
  badgePosition: 'content',
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
