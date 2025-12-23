<template>
  <section :class="['relative', bgClass]">
    <div class="container py-6 md:py-10">
      <div class="flex flex-col lg:flex-row items-stretch min-h-[450px] md:min-h-[500px] bg-white rounded-2xl overflow-hidden shadow-lg">
        <!-- Left Content - Text -->
        <div class="left lg:w-[50%] flex flex-col justify-center p-6 md:p-10 lg:p-12">
          <!-- Top badges inline -->
          <div v-if="badges && badges.length > 0" class="flex flex-wrap gap-3 mb-4">
            <span 
              v-for="(badge, index) in badges" 
              :key="index"
              class="text-[#1a5cd6] font-bold text-xs sm:text-sm uppercase tracking-wider"
            >
              {{ badge }}
            </span>
          </div>

          <!-- Main Title -->
          <div class="mb-6 md:mb-8">
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl font-black text-[#0a1744] leading-[1.15] tracking-tight uppercase">
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
            class="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#0a1744] text-white font-bold text-sm md:text-base rounded-full hover:bg-[#132456] transition-colors duration-300 mb-6 md:mb-8 w-fit"
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

        <!-- Right Content - Slot for flexibility (image, slider, etc.) -->
        <div class="right lg:w-[50%] relative flex items-center justify-center p-6 md:p-10 lg:p-12 bg-gradient-to-br from-[#1e5dbf] to-[#1a5cd6]">
          <slot name="right">
            <!-- Default: Image with badge -->
            <div class="relative w-full">
              <!-- Number 1 Badge with green dot -->
              <div v-if="showBadge" class="absolute -top-6 left-0 z-20 w-max flex items-center gap-2 rounded-full px-3 md:px-4 py-1.5 md:py-2 bg-white shadow-md">
                <span class="w-2 md:w-2.5 h-2 md:h-2.5 bg-green-500 rounded-full"></span>
                <span class="font-bold text-sm md:text-base text-[#0a1744]">{{ badgeText }}</span>
              </div>

              <!-- Image -->
              <div class="relative w-full flex items-center justify-center">
                <img 
                  :src="imageSrc" 
                  :alt="imageAlt"
                  class="w-full max-w-[600px] h-auto object-contain"
                />
              </div>
            </div>
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
  badges?: string[]
  
  // Pricing
  price?: string
  oldPrice?: string
  
  // CTA
  ctaText?: string
  
  // Quick links
  quickLinks?: QuickLink[]
  
  // Right side (when using default slot)
  imageSrc?: string
  imageAlt?: string
  showBadge?: boolean
  badgeText?: string
  
  // Styling
  bgClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'ОБУЧЕНИЕ НА\nТРАКТОРНЫЕ ПРАВА',
  badges: () => ['Быстро', 'Выгодно', 'Легально'],
  price: '7 000 ₽',
  ctaText: 'ОТКРЫТЬ КАТЕГОРИЮ',
  quickLinks: () => [
    { label: 'Тракторист', path: '/courses?filter=tractor' },
    { label: 'Погрузчик', path: '/voditel-pogruzchika' },
    { label: 'Экскаваторщик', path: '/mashinist-ekskavatora' },
    { label: 'Комбайнёр', path: '/kategoriya-f' },
    { label: 'Квадроцикл', path: '/kategoriya-a1' },
    { label: 'Все направления →', path: '/courses' },
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
</script>
