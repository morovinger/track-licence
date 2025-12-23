<template>
  <section class="relative overflow-hidden bg-white">
    <div class="container py-6 md:py-10">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center min-h-[450px] md:min-h-[500px]">
        <!-- Left Content - Text -->
        <div class="lg:w-[50%] flex flex-col justify-center">
          <!-- Top badges inline -->
          <div class="flex flex-wrap gap-3 mb-4">
            <span class="text-[#1a5cd6] font-bold text-xs sm:text-sm uppercase tracking-wider">
              Быстро
            </span>
            <span class="text-[#1a5cd6] font-bold text-xs sm:text-sm uppercase tracking-wider">
              Выгодно
            </span>
            <span class="text-[#1a5cd6] font-bold text-xs sm:text-sm uppercase tracking-wider">
              Легально
            </span>
          </div>

          <!-- Main Title -->
          <div class="mb-6 md:mb-8">
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl font-black text-[#0a1744] leading-[1.15] tracking-tight uppercase">
              ОБУЧЕНИЕ НА<br />
              ТРАКТОРНЫЕ ПРАВА
            </h1>
            <div class="mt-2 md:mt-3">
              <span class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl font-black text-[#1a5cd6]">
                7 000 ₽
              </span>
            </div>
          </div>

          <!-- CTA Button -->
          <button 
            @click="openModal"
            class="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#0a1744] text-white font-bold text-sm md:text-base rounded-full hover:bg-[#132456] transition-colors duration-300 mb-6 md:mb-8 w-fit"
          >
            ОТКРЫТЬ КАТЕГОРИЮ
          </button>

          <!-- Quick Links -->
          <div class="flex flex-wrap gap-2">
            <NuxtLink 
              v-for="link in quickLinks" 
              :key="link.path"
              :to="link.path"
              class="px-3 md:px-4 py-2 bg-white border border-gray-200 hover:border-[#1a5cd6] hover:bg-blue-50 rounded-full text-xs md:text-sm text-gray-700 hover:text-[#1a5cd6] transition-all duration-300"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Right Content - Image with badge -->
        <div class="lg:w-[50%] relative flex items-center justify-center">
          <!-- Number 1 Badge with green dot - positioned at top right -->
          <div class="absolute top-0 md:top-4 right-0 md:right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-lg">
            <span class="w-2 md:w-2.5 h-2 md:h-2.5 bg-green-500 rounded-full"></span>
            <span class="font-bold text-sm md:text-base text-[#0a1744]">№ 1 <span class="font-medium">в РФ</span></span>
          </div>

          <!-- Tractor Image (image already has blue background) -->
          <div class="relative w-full flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src="/images/hero.webp" 
              alt="Обучение на тракторные права"
              class="w-full max-w-[600px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

const quickLinks = [
  { label: 'Тракторист', path: '/courses?filter=tractor' },
  { label: 'Погрузчик', path: '/voditel-pogruzchika' },
  { label: 'Экскаваторщик', path: '/mashinist-ekskavatora' },
  { label: 'Комбайнёр', path: '/kategoriya-f' },
  { label: 'Квадроцикл', path: '/kategoriya-a1' },
  { label: 'Все направления →', path: '/courses' },
]
</script>
