<template>
  <section class="section bg-white -mt-8 md:-mt-12 relative z-10">
    <div class="container-custom">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="group bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_20px_rgba(10,23,68,0.08)] hover:shadow-[0_8px_30px_rgba(10,23,68,0.15)] border border-gray-100 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
          :class="`animation-delay-${(index + 1) * 100}`"
        >
          <!-- Icon -->
          <div class="w-14 h-14 mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <component :is="feature.icon" class="w-7 h-7 text-[#0d2063]" />
          </div>

          <!-- Title -->
          <h3 class="text-base md:text-lg font-bold text-[#0a1744] mb-2 leading-tight">
            {{ feature.title }}
          </h3>

          <!-- Description -->
          <p class="text-gray-500 text-sm leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

// Icon components
const SuccessIcon = () => h('svg', { 
  class: 'w-7 h-7', 
  fill: 'none', 
  stroke: 'currentColor', 
  viewBox: '0 0 24 24' 
}, [
  h('path', { 
    'stroke-linecap': 'round', 
    'stroke-linejoin': 'round', 
    'stroke-width': '2', 
    d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' 
  })
])

const DeviceIcon = () => h('svg', { 
  class: 'w-7 h-7', 
  fill: 'none', 
  stroke: 'currentColor', 
  viewBox: '0 0 24 24' 
}, [
  h('path', { 
    'stroke-linecap': 'round', 
    'stroke-linejoin': 'round', 
    'stroke-width': '2', 
    d: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
  })
])

const DiscountIcon = () => h('svg', { 
  class: 'w-7 h-7', 
  fill: 'none', 
  stroke: 'currentColor', 
  viewBox: '0 0 24 24' 
}, [
  h('path', { 
    'stroke-linecap': 'round', 
    'stroke-linejoin': 'round', 
    'stroke-width': '2', 
    d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' 
  })
])

const SupportIcon = () => h('svg', { 
  class: 'w-7 h-7', 
  fill: 'none', 
  stroke: 'currentColor', 
  viewBox: '0 0 24 24' 
}, [
  h('path', { 
    'stroke-linecap': 'round', 
    'stroke-linejoin': 'round', 
    'stroke-width': '2', 
    d: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' 
  })
])

interface Feature {
  icon: ReturnType<typeof h>
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: SuccessIcon,
    title: '99% сдают с 1 раза',
    description: 'Благодаря усиленной подготовке наши студенты сдают экзамен с первого раза'
  },
  {
    icon: DeviceIcon,
    title: 'Обучение без границ',
    description: 'Учитесь на любом устройстве в удобное для вас время на нашей платформе'
  },
  {
    icon: DiscountIcon,
    title: 'Больше категорий - больше выгода',
    description: 'При обучении на несколько категорий действует система скидок — до 12 000 ₽'
  },
  {
    icon: SupportIcon,
    title: 'Сопроводим от заявки до прав',
    description: 'Личный менеджер и наставники помогут вам на каждом этапе — от заявки до получения прав'
  }
]
</script>
