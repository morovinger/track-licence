<template>
  <section class="section bg-gray-50">
    <div class="container">
      <!-- Section Header -->
      <div class="text-left mb-8">
        <h2 class="section-title">Отзывы</h2>
        <p class="text-gray-600 text-lg">
          Благодарные отклики наших студентов подтверждают высокий стандарт нашей работы
        </p>
      </div>

      <!-- Platform Tabs -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <button
          v-for="tab in platformTabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
          :class="activeTab === tab.id 
            ? 'bg-primary text-white shadow-lg' 
            : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:shadow-sm'"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          <span>{{ tab.label }}</span>
          <span v-if="tab.rating" class="text-amber-400 font-bold">{{ tab.rating }}</span>
        </button>
      </div>

      <!-- Rating Summary -->
      <div class="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-black text-primary-900">5.0</span>
          <span class="text-gray-500">из 5</span>
        </div>
        <div class="flex items-center gap-1">
          <svg v-for="i in 5" :key="i" class="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <span class="text-sm text-gray-500">На основе {{ currentReviewCount }} оценок</span>
      </div>

      <!-- Reviews Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div 
          v-for="review in displayedReviews" 
          :key="review.id"
          class="bg-white rounded-2xl p-5 shadow-[0_2px_20px_rgba(10,23,68,0.06)] border border-gray-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(10,23,68,0.12)] hover:-translate-y-1"
        >
          <!-- Author -->
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <img 
                v-if="review.avatar" 
                :src="review.avatar" 
                :alt="review.author"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-primary-900 font-bold text-lg">{{ review.author.charAt(0) }}</span>
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
          <p class="text-gray-600 text-sm leading-relaxed mb-4" :class="review.expanded ? '' : 'line-clamp-4'">
            {{ review.text }}
          </p>

          <!-- Read More -->
          <button 
            v-if="review.text.length > 150"
            @click="review.expanded = !review.expanded"
            class="text-sm text-primary-700 hover:text-primary-900 font-medium mb-4"
          >
            {{ review.expanded ? 'Свернуть' : 'Читать полностью' }}
          </button>

          <!-- Platform Badge -->
          <a 
            :href="review.platformUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 pt-3 border-t border-gray-100 text-gray-500 hover:text-primary-700 transition-colors"
          >
            <component :is="review.platformIcon" class="w-5 h-5" />
            <span class="text-xs">{{ review.platformName }}</span>
          </a>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="text-center">
        <button 
          v-if="canLoadMore"
          @click="loadMore"
          class="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-700 transition-all"
        >
          Еще
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, type Component } from 'vue'

const activeTab = ref<string>('all')
const itemsPerPage = 6
const currentPage = ref(1)

// Platform icons
const AllIcon: Component = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [
  h('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })
])

const VKIcon: Component = () => h('svg', { fill: '#4680C2', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.033-1.49-1.172-1.744-1.172-.356 0-.458.102-.458.593v1.561c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.684 4 8.157c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.254.745.847 1.32 1.558 1.473 2.049.17.474-.085.72-.576.72z' })
])

const YandexIcon: Component = () => h('svg', { viewBox: '0 0 24 24' }, [
  h('circle', { cx: '12', cy: '12', r: '10', fill: '#FC3F1D' }),
  h('text', { x: '12', y: '16', 'text-anchor': 'middle', fill: 'white', 'font-size': '11', 'font-weight': 'bold' }, 'Я')
])

const AvitoIcon: Component = () => h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
  h('circle', { cx: '12', cy: '12', r: '10', fill: '#00AAFF' }),
  h('text', { x: '12', y: '16', 'text-anchor': 'middle', fill: 'white', 'font-size': '9', 'font-weight': 'bold' }, 'A')
])

const TwoGisIcon: Component = () => h('svg', { viewBox: '0 0 24 24' }, [
  h('circle', { cx: '12', cy: '12', r: '10', fill: '#2DB53A' }),
  h('text', { x: '12', y: '16', 'text-anchor': 'middle', fill: 'white', 'font-size': '7', 'font-weight': 'bold' }, '2GIS')
])

interface PlatformTab {
  id: string
  label: string
  rating?: string
  icon: Component
}

const platformTabs: PlatformTab[] = [
  { id: 'all', label: 'Все отзывы', rating: '5.0', icon: AllIcon },
  { id: 'vk', label: 'вконтакте', icon: VKIcon },
  { id: 'yandex', label: 'Карты', rating: '5.0', icon: YandexIcon },
  { id: 'avito', label: 'Avito', icon: AvitoIcon },
  { id: '2gis', label: '2ГИС', rating: '5.0', icon: TwoGisIcon },
]

interface Review {
  id: number
  author: string
  avatar?: string
  text: string
  date: string
  platform: string
  platformName: string
  platformIcon: Component
  platformUrl: string
  expanded?: boolean
}

const reviews = reactive<Review[]>([
  // Yandex Maps reviews
  {
    id: 1,
    author: 'Сеня',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/40841/0k-6/islands-200',
    text: 'Проходил обучение в ноябре в данном центре. Машинист экскаватора, бульдозера. Все прошло замечательно. На все вопросы дали ответы исчерпывающие. Всегда были на связи даже в нерабочее время центра, все прозрачно, доступно, удобно.',
    date: '12 декабря 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 2,
    author: 'Евгений Шевченко',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/68143/0k-4/islands-200',
    text: 'Все отлично',
    date: '30 ноября 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 3,
    author: 'tahir ergashev',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/29310/SgMJzHMxuIMMzRYSsZMOPdgE-1/islands-200',
    text: 'Рекомендуем, всё хорошо и быстро, всё относительно недалеко и учебный центр и полигон для техники. Инструкторы красавчики, умеют доходчиво объяснить 🔥',
    date: '25 ноября 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  // VK review
  {
    id: 4,
    author: 'Евгений Шевченко',
    avatar: 'https://sun9-66.userapi.com/s/v1/ig2/cbkOStGx80hK2QvVB5DpyJO1nOAjHxBKCEacqc8QTFW937mdBcqq6_Y_AInzGdq-yyQq6N8RiLLF3DEFT4fDhrYE.jpg?quality=95&crop=481,802,957,957&as=100x100&ava=1',
    text: 'Было много вопросов и пару нюансов, менеджер Виктория все объяснила и оперативно все решили, все отлично',
    date: '19 ноября 2025',
    platform: 'vk',
    platformName: 'ВКонтакте',
    platformIcon: VKIcon,
    platformUrl: 'https://vk.com/topic-208515470_48453719'
  },
  {
    id: 5,
    author: 'Игорь',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/45566/jgsGewj5YKRNrGJ0g0JEzuyxvE-1/islands-200',
    text: 'Очень внимательный и грамотный персонал, всё отлично. Проходил обучение в этом центре, очень понравилось! Желаю удачи и процветания центру а коллективу всех благ!!!',
    date: '7 ноября 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 6,
    author: 'Донабой Ходжаназаров',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/26311/0u-1/islands-200',
    text: 'Я был в г.Пскове люди как будто из другого мира таких добрых и гостеприимство не было в России. Учился в данном центре, очень понравилось!',
    date: '30 октября 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  // More VK reviews
  {
    id: 7,
    author: 'Ramazonov Pm',
    avatar: 'https://sun9-88.userapi.com/s/v1/ig2/ZIMhON0inA0MAFQ3nYjV8L5NeCnDX8gATGa3-k3ayc9ULB7jfHci8uGLjSKU_GLMsKFY5aJ_JnlWvBkisTXsc9YU.jpg?quality=95&crop=1,640,1919,1919&as=100x100&ava=1',
    text: 'Нету слов просто на высшем уровни 🙏',
    date: '22 июля 2025',
    platform: 'vk',
    platformName: 'ВКонтакте',
    platformIcon: VKIcon,
    platformUrl: 'https://vk.com/topic-208515470_48453719'
  },
  {
    id: 8,
    author: 'Лара Шиловская',
    text: 'Хотелось бы выразить большую благодарность учебному центру. Всё доступно и оперативно. Рекомендую.',
    date: '17 июля 2025',
    platform: 'vk',
    platformName: 'ВКонтакте',
    platformIcon: VKIcon,
    platformUrl: 'https://vk.com/topic-208515470_48453719'
  },
  {
    id: 9,
    author: 'Вячеслав Караичев',
    text: 'Доброе утро. Спасибо большое за проделанную работу. Всё было 🔥 мне понравилось. Особая благодарность Даниилу. Буду рекомендовать Вас коллегам 👍👍👍',
    date: '17 июля 2025',
    platform: 'vk',
    platformName: 'ВКонтакте',
    platformIcon: VKIcon,
    platformUrl: 'https://vk.com/topic-208515470_48453719'
  },
  // More Yandex reviews
  {
    id: 10,
    author: 'Павел Павел',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/40841/0k-6/islands-200',
    text: 'Отличное место, проходил обучение на тракторные права категории D, коллектив отличный доброжелательный.',
    date: '16 октября 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 11,
    author: 'Харисов Решаль',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/54535/wX1mrNKYB82IVE93zcxkO1Bg-1/islands-200',
    text: 'Всё классно что обещали выполнили',
    date: '25 сентября 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 12,
    author: 'Роман Дорожки',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/53031/0k-1/islands-200',
    text: 'Учился на тракториста-машиниста. Хорошее учебное заведение, отличная команда, индивидуальный подход, специалист вел вплоть до получения удостоверения. Рекомендую👍',
    date: '8 сентября 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 13,
    author: 'vlad.potapov86',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/26057/0l-2/islands-200',
    text: 'Учебный центр зарекомендовал себя надежным партнером! Однако успех куется собственным трудом! Рекомендую, ребята стараются помочь вам получить тракторные права!',
    date: '4 сентября 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 14,
    author: 'Elena',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/35885/Rfh1bSWbriufzXd3b9m4D5LIZec-1571969171/islands-200',
    text: 'Добрый день. Всё прошло хорошо и цены приемлемые. Большое спасибо Александру менеджеру, всё время на связи. Быстро помогают решать вопросы, если что-то не понятно. Рекомендую данный учебный центр!!!',
    date: '24 августа 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 15,
    author: 'Tojiqul Kenjaev',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/29310/UOChyf7QaJIFa4pBAk4veKKgLKE-1/islands-200',
    text: 'Хороший Автошколы',
    date: '20 августа 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 16,
    author: 'Виктор Молодов',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/47747/0r-1/islands-200',
    text: 'Спасибо огромное за помощь! По началу, конечно, были некоторые сомнения, но документы были оформлены и получены вовремя, никакого обмана. Еще раз огромное спасибо!',
    date: '16 августа 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 17,
    author: 'FISHER Mc.Cane',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/34189/APDu6OwGzMhsZ3aLFVh4PdZClQ8-1/islands-200',
    text: 'Доброе утро, проходил обучение в данном учебном заведении, отличная подготовка, персонал профессионалы, отдельное спасибо Александру менеджеру, все разложил по полкам и максимально понятно.',
    date: '13 августа 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 18,
    author: 'Фуркат Машарипов',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/47747/0r-2/islands-200',
    text: 'Здравствуйте отличные учебный центр спасибо Александру помог получить удостоверение а так все команда молодцы👍',
    date: '11 августа 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 19,
    author: 'Сергей З.',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/27232/TsSCvOiBYnrI564aU56vUFSFe4-1/islands-200',
    text: 'Благодарю вас за хорошее обучение, буду всем рекомендовать. Всем Бог в помощь',
    date: '29 июля 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 20,
    author: 'Григорий Лунгу',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/26311/0s-1/islands-200',
    text: 'Всем добрый день, хороший учебный центр получил документы быстро без проблем, особенно больше спасибо Виктории, рекомендую всем',
    date: '20 июля 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  {
    id: 21,
    author: 'александр фролов',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/25358/psdk6RmYU5FEL4jLZzztrsU-1/islands-200',
    text: 'Все супер, подскажут, покажут, все объяснят, все расскажут',
    date: '19 июля 2025',
    platform: 'yandex',
    platformName: 'Яндекс Карты',
    platformIcon: YandexIcon,
    platformUrl: 'https://yandex.ru/maps/org/26536564008/reviews/'
  },
  // Avito reviews
  {
    id: 22,
    author: 'Кирилл',
    text: 'Сделка состоялась «Обучение на тракторные права». Все хорошо! Все быстро и оперативно!',
    date: '29 декабря 2023',
    platform: 'avito',
    platformName: 'Avito',
    platformIcon: AvitoIcon,
    platformUrl: 'https://www.avito.ru/brands/i355789182/all/predlozheniya_uslug'
  },
  {
    id: 23,
    author: 'Анатолий',
    text: 'Сделка состоялась «Обучение на тракторные права». Всё отлично',
    date: '15 декабря 2023',
    platform: 'avito',
    platformName: 'Avito',
    platformIcon: AvitoIcon,
    platformUrl: 'https://www.avito.ru/brands/i355789182/all/predlozheniya_uslug'
  },
  // 2GIS reviews
  {
    id: 24,
    author: 'Елена Масникова',
    text: 'Все понятно, доступно. Спасибо.',
    date: '12 октября 2024',
    platform: '2gis',
    platformName: '2GIS',
    platformIcon: TwoGisIcon,
    platformUrl: 'https://2gis.ru/pskov/firm/70000001053865775/tab/reviews'
  },
  {
    id: 25,
    author: 'Сергей Давидюк',
    text: 'Могут все!',
    date: '3 сентября 2023',
    platform: '2gis',
    platformName: '2GIS',
    platformIcon: TwoGisIcon,
    platformUrl: 'https://2gis.ru/pskov/firm/70000001053865775/tab/reviews'
  },
  // More VK reviews
  {
    id: 26,
    author: 'Наталья Григорьева',
    text: 'Спасибо большое за вашу работу и помощь. Особая благодарность Светлане. Буду Вас рекомендовать 🤗',
    date: '30 июня 2025',
    platform: 'vk',
    platformName: 'ВКонтакте',
    platformIcon: VKIcon,
    platformUrl: 'https://vk.com/topic-208515470_48453719'
  },
  {
    id: 27,
    author: 'Андрей Андрей',
    text: 'Огромное спасибо, всем, в особенности менеджера Анатолия, всё сделал профессионально и качественно!!! Под ключ с отправкой за 7 дней в Москве, просто супер команда!!! Теперь только с Вами, удачи ребята, спасибо!!!',
    date: '6 июня 2025',
    platform: 'vk',
    platformName: 'ВКонтакте',
    platformIcon: VKIcon,
    platformUrl: 'https://vk.com/topic-208515470_48453719'
  }
])

const filteredReviews = computed(() => {
  if (activeTab.value === 'all') {
    return reviews
  }
  return reviews.filter(r => r.platform === activeTab.value)
})

const displayedReviews = computed(() => {
  return filteredReviews.value.slice(0, currentPage.value * itemsPerPage)
})

const canLoadMore = computed(() => {
  return displayedReviews.value.length < filteredReviews.value.length
})

const currentReviewCount = computed(() => {
  if (activeTab.value === 'all') return 222
  if (activeTab.value === 'yandex') return 217
  if (activeTab.value === 'vk') return filteredReviews.value.length
  if (activeTab.value === 'avito') return 2
  if (activeTab.value === '2gis') return 3
  return filteredReviews.value.length
})

const loadMore = () => {
  currentPage.value++
}

// Reset page when tab changes
watch(activeTab, () => {
  currentPage.value = 1
})
</script>
