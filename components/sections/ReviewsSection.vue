<template>
  <section class="section bg-gray-50">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center mb-10">
        <h2 class="section-title">Отзывы</h2>
        <p class="section-subtitle mx-auto">
          Благодарные отклики наших студентов подтверждают высокий стандарт нашей работы
        </p>
      </div>

      <!-- Rating Summary -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
        <!-- Overall Rating -->
        <div class="text-center">
          <div class="flex items-baseline justify-center gap-1">
            <span class="text-5xl font-black text-primary-900">5.0</span>
            <span class="text-gray-500">из 5</span>
          </div>
          <div class="flex items-center justify-center gap-1 mt-2">
            <svg v-for="i in 5" :key="i" class="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <p class="text-sm text-gray-500 mt-1">На основе {{ totalReviews }} оценок</p>
        </div>

        <!-- Platform Badges -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a 
            v-for="platform in platforms" 
            :key="platform.name"
            :href="platform.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <component :is="platform.icon" class="w-6 h-6" />
            <span class="text-sm font-medium text-gray-700">{{ platform.name }}</span>
            <span v-if="platform.rating" class="text-sm font-bold text-amber-500">{{ platform.rating }}</span>
          </a>
        </div>
      </div>

      <!-- Reviews Carousel -->
      <div class="relative">
        <div class="overflow-hidden rounded-2xl">
          <div 
            class="flex transition-transform duration-500 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="(slideReviews, slideIndex) in reviewSlides" 
              :key="slideIndex"
              class="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-1"
            >
              <div 
                v-for="review in slideReviews" 
                :key="review.id"
                class="bg-white rounded-2xl p-5 shadow-[0_2px_20px_rgba(10,23,68,0.06)] border border-gray-100"
              >
                <!-- Author -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-primary-900 font-bold text-lg">
                    {{ review.author.charAt(0) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-900 truncate">{{ review.author }}</h4>
                    <div class="flex items-center gap-2">
                      <div class="flex">
                        <svg v-for="i in 5" :key="i" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <span class="text-xs text-gray-400">{{ review.date }}</span>
                    </div>
                  </div>
                </div>

                <!-- Review Text -->
                <p class="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                  {{ review.text }}
                </p>

                <!-- Platform Badge -->
                <div class="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <component :is="review.platformIcon" class="w-5 h-5" />
                  <span class="text-xs text-gray-400">{{ review.platform }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button 
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-900 hover:bg-gray-50 transition-colors hidden lg:flex disabled:opacity-40"
          :disabled="currentSlide === 0"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button 
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-900 hover:bg-gray-50 transition-colors hidden lg:flex disabled:opacity-40"
          :disabled="currentSlide === reviewSlides.length - 1"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Dots -->
        <div class="flex justify-center gap-2 mt-8">
          <button 
            v-for="(_, index) in reviewSlides" 
            :key="index"
            @click="currentSlide = index"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-primary-900 w-8' : 'bg-gray-300 hover:bg-gray-400'"
          />
        </div>
      </div>

      <!-- View More Button -->
      <div class="text-center mt-8">
        <a 
          href="https://yandex.ru/maps/org/26536564008/reviews/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 text-primary-900 font-semibold border-2 border-[#0a1744] rounded-xl hover:bg-primary-900 hover:text-white transition-all"
        >
          Ещё отзывы
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, type Component } from 'vue'

const currentSlide = ref(0)
const totalReviews = 222

// Platform icon components
const YandexIcon: Component = () => h('svg', { viewBox: '0 0 24 24' }, [
  h('circle', { cx: '12', cy: '12', r: '10', fill: '#FF0000' }),
  h('text', { x: '12', y: '16', 'text-anchor': 'middle', fill: 'white', 'font-size': '10', 'font-weight': 'bold' }, 'Я')
])

const VKIcon: Component = () => h('svg', { fill: '#4680C2', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.033-1.49-1.172-1.744-1.172-.356 0-.458.102-.458.593v1.561c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.684 4 8.157c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.254.745.847 1.32 1.558 1.473 2.049.17.474-.085.72-.576.72z' })
])

interface Platform {
  name: string
  url: string
  rating?: string
  icon: Component
}

const platforms: Platform[] = [
  { name: 'Яндекс Карты', url: 'https://yandex.ru/maps/org/26536564008/reviews/', rating: '5.0', icon: YandexIcon },
  { name: 'ВКонтакте', url: 'https://vk.com/topic-208515470_48453719', icon: VKIcon },
]

interface Review {
  id: number
  author: string
  text: string
  date: string
  platform: string
  platformIcon: Component
}

const reviews: Review[] = [
  {
    id: 1,
    author: 'Сеня',
    text: 'Проходил обучение в ноябре в данном центре. Машинист экскаватора, бульдозера. Все прошло замечательно. На все вопросы дали ответы исчерпывающие. Всегда были на связи даже в нерабочее время центра, все прозрачно, доступно, удобно.',
    date: '12 декабря 2025',
    platform: 'Яндекс Карты',
    platformIcon: YandexIcon
  },
  {
    id: 2,
    author: 'Евгений Шевченко',
    text: 'Все отлично! Рекомендую.',
    date: '30 ноября 2025',
    platform: 'Яндекс Карты',
    platformIcon: YandexIcon
  },
  {
    id: 3,
    author: 'Tahir Ergashev',
    text: 'Рекомендуем, всё хорошо и быстро, всё относительно недалеко и учебный центр и полигон для техники. Инструкторы красавчики, умеют доходчиво объяснить 🔥',
    date: '25 ноября 2025',
    platform: 'Яндекс Карты',
    platformIcon: YandexIcon
  },
  {
    id: 4,
    author: 'Евгений Шевченко',
    text: 'Было много вопросов и пару нюансов, менеджер Виктория все объяснила и оперативно все решили, все отлично',
    date: '19 ноября 2025',
    platform: 'ВКонтакте',
    platformIcon: VKIcon
  },
  {
    id: 5,
    author: 'Игорь',
    text: 'Очень внимательный и грамотный персонал, всё отлично. Проходил обучение в этом центре, очень понравилось! Желаю удачи и процветания центру а коллективу всех благ!!!',
    date: '7 ноября 2025',
    platform: 'Яндекс Карты',
    platformIcon: YandexIcon
  },
  {
    id: 6,
    author: 'Донабой Ходжаназаров',
    text: 'Я был в г.Пскове люди как будто из другого мира таких добрых и гостеприимство не было в России.',
    date: '30 октября 2025',
    platform: 'Яндекс Карты',
    platformIcon: YandexIcon
  }
]

// Split reviews into slides of 3
const reviewSlides = computed(() => {
  const slides = []
  for (let i = 0; i < reviews.length; i += 3) {
    slides.push(reviews.slice(i, i + 3))
  }
  return slides
})

const nextSlide = () => {
  if (currentSlide.value < reviewSlides.value.length - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}
</script>
