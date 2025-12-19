<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Banner -->
    <section class="bg-hero-gradient py-16 md:py-24">
      <div class="container-custom text-center text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Все курсы</h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Ознакомьтесь со всем списком доступных программ обучения на право управления самоходными машинами
        </p>
      </div>
    </section>

    <!-- Courses List -->
    <section class="section">
      <div class="container-custom">
        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-8">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            @click="activeFilter = filter.value"
            class="px-6 py-2 rounded-full text-sm font-medium transition-all"
            :class="activeFilter === filter.value 
              ? 'bg-primary-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="course in filteredCourses" 
            :key="course.slug"
            class="card overflow-hidden"
          >
            <!-- Image Placeholder -->
            <div class="h-48 bg-gradient-to-br from-primary-400 to-accent-600 flex items-center justify-center">
              <svg class="w-20 h-20 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H6V6h10.5L18 3H8c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v7h2v-3h16v3h2v-7c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>

            <div class="p-6">
              <span class="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full mb-3">
                {{ course.category }}
              </span>
              
              <h3 class="text-xl font-bold text-primary-500 mb-2">{{ course.title }}</h3>
              
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ course.description }}</p>

              <div class="flex items-baseline gap-2 mb-4">
                <span class="text-2xl font-bold text-gold-500">{{ course.price }}</span>
                <span class="text-sm text-gray-400 line-through">{{ course.originalPrice }}</span>
              </div>

              <div class="flex gap-2">
                <NuxtLink 
                  :to="`/${course.slug}`"
                  class="flex-1 btn-outline text-sm py-2"
                >
                  Подробнее
                </NuxtLink>
                <button 
                  @click="openModal"
                  class="flex-1 btn-secondary text-sm py-2"
                >
                  Записаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

const activeFilter = ref('all')

const filters = [
  { label: 'Все', value: 'all' },
  { label: 'Тракторист', value: 'tractor' },
  { label: 'Спецтехника', value: 'special' },
  { label: 'Мототехника', value: 'moto' },
]

interface Course {
  slug: string
  title: string
  price: string
  originalPrice: string
  description: string
  category: string
  filterCategory: string
}

const allCourses: Course[] = [
  {
    slug: 'traktorist-b',
    title: 'Тракторист категории B',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Колесные тракторы мощностью до 25,7 кВт',
    category: 'Тракторист',
    filterCategory: 'tractor'
  },
  {
    slug: 'traktorist-c',
    title: 'Тракторист категории C',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Колесные тракторы мощностью от 25,7 до 77,2 кВт',
    category: 'Тракторист',
    filterCategory: 'tractor'
  },
  {
    slug: 'traktorist-d',
    title: 'Тракторист категории D',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Колесные тракторы мощностью свыше 77,2 кВт',
    category: 'Тракторист',
    filterCategory: 'tractor'
  },
  {
    slug: 'traktorist-e',
    title: 'Тракторист категории E',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Гусеничные тракторы всех мощностей',
    category: 'Тракторист',
    filterCategory: 'tractor'
  },
  {
    slug: 'kategoriya-f',
    title: 'Категория F (Комбайн)',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Комбайны и сельскохозяйственная техника',
    category: 'Комбайн',
    filterCategory: 'tractor'
  },
  {
    slug: 'voditel-pogruzchika',
    title: 'Водитель погрузчика',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Вилочные, телескопические погрузчики',
    category: 'Спецтехника',
    filterCategory: 'special'
  },
  {
    slug: 'mashinist-ekskavatora',
    title: 'Машинист экскаватора',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Одноковшовые и роторные экскаваторы',
    category: 'Спецтехника',
    filterCategory: 'special'
  },
  {
    slug: 'mashinist-buldozera',
    title: 'Машинист бульдозера',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Бульдозеры мощностью от 20 до 150 кВт',
    category: 'Спецтехника',
    filterCategory: 'special'
  },
  {
    slug: 'mashinist-katka',
    title: 'Машинист катка',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Дорожные катки различных типов',
    category: 'Спецтехника',
    filterCategory: 'special'
  },
  {
    slug: 'mashinist-krana',
    title: 'Машинист крана',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Грузоподъёмные краны различных типов',
    category: 'Спецтехника',
    filterCategory: 'special'
  },
  {
    slug: 'kategoriya-a1',
    title: 'Категория А1 (Квадроцикл)',
    price: '7 000 ₽',
    originalPrice: '14 000 ₽',
    description: 'Квадроциклы и снегоходы',
    category: 'Мототехника',
    filterCategory: 'moto'
  },
  {
    slug: 'kategoriya-a2',
    title: 'Категория А2',
    price: '8 000 ₽',
    originalPrice: '12 000 ₽',
    description: 'Внедорожные автотранспортные средства (багги, трэколы)',
    category: 'Внедорожники',
    filterCategory: 'moto'
  },
]

const filteredCourses = computed(() => {
  if (activeFilter.value === 'all') {
    return allCourses
  }
  return allCourses.filter(c => c.filterCategory === activeFilter.value)
})

useHead({
  title: 'Все курсы - Тракторные Права РФ',
  meta: [
    { name: 'description', content: 'Полный список курсов обучения на право управления самоходными машинами и спецтехникой.' }
  ]
})
</script>


