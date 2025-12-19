<template>
  <section class="section bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-10">
        <h2 class="section-title">Популярные направления</h2>
        <p class="section-subtitle mx-auto">
          Стоимость указана за одну категорию или отметку
        </p>
      </div>

      <!-- Courses Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div 
          v-for="(course, index) in courses" 
          :key="course.slug"
          class="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(10,23,68,0.08)] hover:shadow-[0_8px_30px_rgba(10,23,68,0.15)] border border-gray-100 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
          :class="`animation-delay-${(index % 4 + 1) * 100}`"
        >
          <!-- Image -->
          <div class="relative h-44 bg-gradient-to-br from-[#1a3a8a] to-[#0a1744] overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- Icon -->
              <component :is="course.icon" class="w-20 h-20 text-white/25" />
            </div>
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0a1744]/60 to-transparent"></div>
            <!-- Category Label -->
            <span class="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {{ course.category }}
            </span>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="text-lg font-bold text-[#0a1744] mb-2 group-hover:text-[#1a3a8a] transition-colors leading-tight">
              {{ course.title }}
            </h3>

            <!-- Price -->
            <div class="flex items-baseline gap-2 mb-3">
              <span class="text-xl font-bold text-amber-500">{{ course.price }}</span>
              <span class="text-sm text-gray-400 line-through">{{ course.originalPrice }}</span>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
              {{ course.description }}
            </p>

            <!-- Actions -->
            <div class="flex gap-2">
              <NuxtLink 
                :to="`/${course.slug}`"
                class="flex-1 py-2.5 px-3 text-sm font-semibold text-[#0a1744] bg-transparent border-2 border-[#0a1744] rounded-xl text-center hover:bg-[#0a1744] hover:text-white transition-all"
              >
                Подробнее
              </NuxtLink>
              <button 
                @click="openModal"
                class="flex-1 py-2.5 px-3 text-sm font-semibold text-[#0a1744] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl hover:shadow-lg transition-all"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>

        <!-- View All Card -->
        <NuxtLink 
          to="/courses"
          class="group flex flex-col items-center justify-center min-h-[380px] bg-white rounded-2xl shadow-[0_2px_20px_rgba(10,23,68,0.08)] border border-gray-100 hover:bg-gradient-to-br hover:from-[#0d2063] hover:to-[#0a1744] transition-all duration-300 hover:-translate-y-1"
        >
          <div class="w-16 h-16 bg-blue-50 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-4 transition-colors">
            <svg class="w-8 h-8 text-[#0a1744] group-hover:text-white transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-[#0a1744] group-hover:text-white mb-2 transition-colors">
            Все курсы
          </h3>
          <p class="text-gray-500 group-hover:text-white/70 text-center text-sm px-4 transition-colors">
            Ознакомьтесь со всем списком доступных программ
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, type Component } from 'vue'

const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

// Course icon components
const TractorIcon: Component = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M20 11H6V6h10.5L18 3H8c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v7h2v-3h16v3h2v-7c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' })
])

const CombineIcon: Component = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v9h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2V7c0-1.1-.9-2-2-2zM8 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z' })
])

const LoaderIcon: Component = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z' })
])

const ExcavatorIcon: Component = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M4 15v4h4v-4H4zm5 0v4h4v-4H9zm5 0v4h4v-4h-4zm5 0v4h4v-4h-4zM4 10v4h4v-4H4zm5 0v4h4v-4H9zm5 0v4h4v-4h-4zm5 0v4h4v-4h-4zM4 5v4h4V5H4zm5 0v4h4V5H9z' })
])

const BulldozerIcon: Component = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M18 4H6v4H4v8h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2V8h-2V4zm-2 14H8v-2h8v2z' })
])

const RollerIcon: Component = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' })
])

const QuadIcon: Component = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' })
])

const VehicleIcon: Component = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z' })
])

interface Course {
  slug: string
  title: string
  price: string
  originalPrice: string
  description: string
  category: string
  icon: Component
}

const courses: Course[] = [
  {
    slug: 'traktorist-bcde',
    title: 'Тракторист - В, С, D, E',
    price: '7 000 ₽*',
    originalPrice: '14 000 ₽',
    description: 'Тракторы с колесным и гусеничным ходом, мощность которых свыше 4 кВт',
    category: 'Тракторист',
    icon: TractorIcon
  },
  {
    slug: 'kategoriya-f',
    title: 'Категория - F',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Комбайны и другая сельскохозяйственная техника с любым видом трансмиссии',
    category: 'Комбайн',
    icon: CombineIcon
  },
  {
    slug: 'voditel-pogruzchika',
    title: 'Водитель погрузчика',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Даёт право работы на любых видах погрузчиков от вилочных до телескопических',
    category: 'Спецтехника',
    icon: LoaderIcon
  },
  {
    slug: 'mashinist-ekskavatora',
    title: 'Машинист экскаватора',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Даёт возможность работать на любых экскаваторах, от одноковшового до роторных',
    category: 'Спецтехника',
    icon: ExcavatorIcon
  },
  {
    slug: 'mashinist-buldozera',
    title: 'Машинист бульдозера',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Даёт возможность работы на бульдозерах мощностью от 20 кВт до 150 кВт',
    category: 'Спецтехника',
    icon: BulldozerIcon
  },
  {
    slug: 'mashinist-katka',
    title: 'Машинист катка',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Даёт право работы на катках с гладким вальцом и полуприцепных на пневматических шинах',
    category: 'Спецтехника',
    icon: RollerIcon
  },
  {
    slug: 'kategoriya-a1',
    title: 'Категория А1',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Внедорожный мототранспорт: квадроциклы и снегоходы',
    category: 'Мототехника',
    icon: QuadIcon
  },
  {
    slug: 'kategoriya-a2',
    title: 'Категория А2',
    price: '8 000 ₽',
    originalPrice: '12 000 ₽',
    description: 'Внедорожные автотранспортные средства массой менее 3,5 тонн (багги, трэколы)',
    category: 'Внедорожники',
    icon: VehicleIcon
  }
]
</script>
