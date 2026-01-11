<template>
  <div class="min-h-screen bg-[#f0f4fa]">
    <!-- Header Section -->
    <section class="bg-gradient-to-br from-[#123f90] to-[#0056D2] py-12 md:py-16">
      <div class="container">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-6 h-0.5 bg-white/60"></span>
          <span class="text-white/80 text-sm uppercase tracking-wider">Каталог</span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">Все курсы</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          Выберите направление обучения для получения удостоверения тракториста-машиниста
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-8 md:py-12">
      <div class="container">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2 mb-8">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            class="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            :class="[
              activeFilter === filter.value
                ? 'bg-[#123f90] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <NuxtLink
            v-for="course in filteredCourses"
            :key="course.slug"
            :to="`/${course.slug}`"
            class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="course.image"
                :alt="course.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <!-- Content -->
            <div class="p-5">
              <h3 class="text-lg font-bold text-[#123f90] uppercase mb-2 group-hover:text-[#0056D2] transition-colors">
                {{ course.title }}
              </h3>
              <p class="text-[#4a4a4a] text-sm leading-relaxed line-clamp-2">
                {{ course.description }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCourses.length === 0" class="text-center py-16">
          <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p class="text-gray-500 text-lg">Курсы не найдены</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const activeFilter = ref('all')

const filters = [
  { label: 'Все', value: 'all' },
  { label: 'Категории', value: 'categories' },
  { label: 'Отметки', value: 'marks' },
]

interface Course {
  slug: string
  title: string
  description: string
  image: string
  filterCategory: string
}

const allCourses: Course[] = [
  // Tractor Categories
  {
    slug: 'traktorist-b',
    title: 'Тракторист B',
    description: 'Гусеничные и колёсные машины с двигателем мощностью до 25,7 кВт (5–35 л.с.)',
    image: '/images/cards/traktorist-b.webp',
    filterCategory: 'categories'
  },
  {
    slug: 'traktorist-c',
    title: 'Тракторист C',
    description: 'Колёсные машины с двигателем мощностью от 25,7 до 110,3 кВт (35–150 л.с.)',
    image: '/images/cards/traktorist-c.webp',
    filterCategory: 'categories'
  },
  {
    slug: 'traktorist-d',
    title: 'Тракторист D',
    description: 'Колёсные машины с двигателем мощностью свыше 110,3 кВт (110+ л.с.)',
    image: '/images/cards/traktorist-d.webp',
    filterCategory: 'categories'
  },
  {
    slug: 'traktorist-e',
    title: 'Тракторист E',
    description: 'Гусеничные машины с двигателем мощностью свыше 25,7 кВт (35+ л.с.)',
    image: '/images/cards/traktorist-e.webp',
    filterCategory: 'categories'
  },
  {
    slug: 'kategoriya-f',
    title: 'Категория F',
    description: 'Самоходные сельскохозяйственные машины (комбайны и др.)',
    image: '/images/cards/kategoriya-f.webp',
    filterCategory: 'categories'
  },
  {
    slug: 'kategoriya-a1',
    title: 'Категория A I',
    description: 'Внедорожные мототранспортные средства (квадроциклы, снегоходы)',
    image: '/images/cards/kategoriya-a1.webp',
    filterCategory: 'categories'
  },
  {
    slug: 'kategoriya-a2',
    title: 'Категория A II',
    description: 'Внедорожные автотранспортные средства разрешённой массой до 3,5 тонн',
    image: '/images/cards/kategoriya-a2.webp',
    filterCategory: 'categories'
  },
  // Marks (Отметки)
  {
    slug: 'voditel-pogruzchika',
    title: 'Водитель погрузчика',
    description: 'Погрузчики мощностью от 3 до 147 кВт (вилочные, фронтальные, телескопические)',
    image: '/images/cards/pogruzchik.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-ekskavatora',
    title: 'Машинист экскаватора',
    description: 'Одноковшовые, многоковшовые и роторные экскаваторы',
    image: '/images/cards/ekskavator.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-avtogrejdera',
    title: 'Машинист автогрейдера',
    description: 'Автогрейдеры для планировки и профилирования дорог',
    image: '/images/cards/avtogrejder.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-buldozera',
    title: 'Машинист бульдозера',
    description: 'Колёсные и гусеничные бульдозеры мощностью 20–150 кВт',
    image: '/images/cards/buldozer.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-frezy',
    title: 'Машинист фрезы дорожной',
    description: 'Дорожные фрезы для снятия асфальтового покрытия',
    image: '/images/cards/freza.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-burovoj',
    title: 'Машинист буровой установки',
    description: 'Буровые установки для геологоразведки и строительства',
    image: '/images/cards/burovaya.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-trelevochnoj',
    title: 'Машинист трелёвочной машины',
    description: 'Трелёвочные машины для лесозаготовительных работ',
    image: '/images/cards/trelevochnaya.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-kopra',
    title: 'Машинист копра',
    description: 'Копровые установки для забивки свай',
    image: '/images/cards/kopr.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-peregruzchika',
    title: 'Машинист перегружателя',
    description: 'Перегружатели для погрузочно-разгрузочных работ',
    image: '/images/cards/peregruzchik.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-katka',
    title: 'Машинист катка',
    description: 'Дорожные катки массой от 5 тонн для уплотнения грунта и асфальта',
    image: '/images/cards/katok.webp',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-krana',
    title: 'Машинист крана',
    description: 'Башенные, гусеничные и автомобильные краны',
    image: '/images/cards/kran.webp',
    filterCategory: 'marks'
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
    { name: 'description', content: 'Полный каталог курсов обучения на право управления тракторами и спецтехникой. Категории B, C, D, E, F, A1, A2 и отметки машиниста.' }
  ]
})
</script>
