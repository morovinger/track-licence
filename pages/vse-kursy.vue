<template>
  <div class="min-h-screen bg-[#f0f4fa]">
    <!-- Header Section -->
    <section class="bg-gradient-to-br from-primary-900 to-primary-800 py-12 md:py-16">
      <div class="container">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-6 h-0.5 bg-white/60"></span>
          <span class="text-white/80 text-sm uppercase tracking-wider">Каталог</span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Все курсы</h1>
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
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
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
            class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Image -->
            <div class="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700 overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-6xl">{{ course.icon }}</span>
              </div>
              <!-- Badge -->
              <div class="absolute top-3 left-3">
                <span class="inline-block px-3 py-1 bg-white/90 text-primary-700 text-xs font-bold rounded-full">
                  {{ course.badge }}
                </span>
              </div>
              <!-- Price Badge -->
              <div class="absolute bottom-3 right-3">
                <span class="inline-block px-3 py-1.5 bg-amber-400 text-amber-900 text-sm font-bold rounded-lg shadow-lg">
                  {{ course.price }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5">
              <h3 class="text-lg font-bold text-primary-900 uppercase mb-2 group-hover:text-primary-600 transition-colors">
                {{ course.title }}
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
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

    <!-- CTA Section -->
    <section class="py-12 bg-white">
      <div class="container">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Не нашли нужный курс?</h2>
          <p class="text-white/90 mb-6 max-w-xl mx-auto">
            Создайте свой индивидуальный тариф с нужными категориями и отметками
          </p>
          <NuxtLink
            to="/tarif"
            class="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            Создать свой тариф
          </NuxtLink>
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
  { label: 'Пакеты', value: 'packages' },
]

interface Course {
  slug: string
  title: string
  price: string
  description: string
  badge: string
  icon: string
  filterCategory: string
}

const allCourses: Course[] = [
  // Tractor Categories
  {
    slug: 'traktorist-b',
    title: 'Тракторист категории B',
    price: '8 000 ₽',
    description: 'Колёсные и гусеничные машины мощностью до 25,7 кВт',
    badge: 'Категория B',
    icon: '🚜',
    filterCategory: 'categories'
  },
  {
    slug: 'traktorist-c',
    title: 'Тракторист категории C',
    price: '8 000 ₽',
    description: 'Колёсные машины мощностью от 25,7 до 110,3 кВт',
    badge: 'Категория C',
    icon: '🚜',
    filterCategory: 'categories'
  },
  {
    slug: 'traktorist-d',
    title: 'Тракторист категории D',
    price: '8 000 ₽',
    description: 'Колёсные машины мощностью свыше 110,3 кВт',
    badge: 'Категория D',
    icon: '🚜',
    filterCategory: 'categories'
  },
  {
    slug: 'traktorist-e',
    title: 'Тракторист категории E',
    price: '8 000 ₽',
    description: 'Гусеничные машины мощностью свыше 25,7 кВт',
    badge: 'Категория E',
    icon: '🚜',
    filterCategory: 'categories'
  },
  {
    slug: 'kategoriya-f',
    title: 'Категория F',
    price: '8 000 ₽',
    description: 'Комбайны и самоходная сельскохозяйственная техника',
    badge: 'Категория F',
    icon: '🌾',
    filterCategory: 'categories'
  },
  {
    slug: 'kategoriya-a1',
    title: 'Категория A I',
    price: '8 000 ₽',
    description: 'Внедорожные мототранспортные средства — квадроциклы и снегоходы',
    badge: 'Категория A I',
    icon: '🏍️',
    filterCategory: 'categories'
  },
  {
    slug: 'kategoriya-a2',
    title: 'Категория A II',
    price: '9 000 ₽',
    description: 'Внедорожные автотранспортные средства до 3,5 тонн',
    badge: 'Категория A II',
    icon: '🚙',
    filterCategory: 'categories'
  },
  // Marks (Отметки)
  {
    slug: 'voditel-pogruzchika',
    title: 'Водитель погрузчика',
    price: '8 000 ₽',
    description: 'Вилочные, фронтальные и телескопические погрузчики',
    badge: 'Отметка',
    icon: '🚜',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-ekskavatora',
    title: 'Машинист экскаватора',
    price: '8 000 ₽',
    description: 'Одноковшовые, многоковшовые и роторные экскаваторы',
    badge: 'Отметка',
    icon: '🏗️',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-avtogrejdera',
    title: 'Машинист автогрейдера',
    price: '8 000 ₽',
    description: 'Автогрейдеры для планировки и профилирования дорог',
    badge: 'Отметка',
    icon: '🛤️',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-buldozera',
    title: 'Машинист бульдозера',
    price: '8 000 ₽',
    description: 'Колёсные и гусеничные бульдозеры мощностью 20-150 кВт',
    badge: 'Отметка',
    icon: '🚧',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-frezy',
    title: 'Машинист фрезы дорожной',
    price: '8 000 ₽',
    description: 'Дорожные фрезы для снятия асфальтового покрытия',
    badge: 'Отметка',
    icon: '⚙️',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-burovoj',
    title: 'Машинист буровой установки',
    price: '8 000 ₽',
    description: 'Буровые установки для геологоразведки и строительства',
    badge: 'Отметка',
    icon: '🔩',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-trelevochnoj',
    title: 'Машинист трелёвочной машины',
    price: '8 000 ₽',
    description: 'Трелёвочные машины для лесозаготовительных работ',
    badge: 'Отметка',
    icon: '🌲',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-kopra',
    title: 'Машинист копра',
    price: '8 000 ₽',
    description: 'Копровые установки для забивки свай',
    badge: 'Отметка',
    icon: '🔨',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-peregruzchika',
    title: 'Машинист перегружателя',
    price: '8 000 ₽',
    description: 'Перегружатели для погрузочно-разгрузочных работ',
    badge: 'Отметка',
    icon: '📦',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-katka',
    title: 'Машинист катка',
    price: '8 000 ₽',
    description: 'Дорожные катки для уплотнения грунта и асфальта',
    badge: 'Отметка',
    icon: '🛞',
    filterCategory: 'marks'
  },
  {
    slug: 'mashinist-krana',
    title: 'Машинист крана',
    price: '8 000 ₽',
    description: 'Башенные, гусеничные и автомобильные краны',
    badge: 'Отметка',
    icon: '🏗️',
    filterCategory: 'marks'
  },
  // Packages (Пакеты)
  {
    slug: 'uni',
    title: 'Пакет «Универсал»',
    price: '46 000 ₽',
    description: '6 удостоверений: категории B, C, D, E + погрузчик + экскаватор',
    badge: 'Пакет',
    icon: '📦',
    filterCategory: 'packages'
  },
  {
    slug: 'spech',
    title: 'Пакет «Специалист»',
    price: '60 000 ₽',
    description: '8 удостоверений + категория A1 в подарок',
    badge: 'Популярный',
    icon: '⭐',
    filterCategory: 'packages'
  },
  {
    slug: 'pro',
    title: 'Пакет «Профессионал»',
    price: '68 000 ₽',
    description: '9 удостоверений включая категорию F + A1 в подарок',
    badge: 'Пакет',
    icon: '🏆',
    filterCategory: 'packages'
  },
  {
    slug: 'master',
    title: 'Пакет «Мастер»',
    price: '89 000 ₽',
    description: '12 удостоверений — все категории и основные отметки',
    badge: 'Максимальный',
    icon: '👑',
    filterCategory: 'packages'
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
