<template>
  <footer class="bg-gradient-to-br from-[#0a1744] via-[#0d2063] to-[#0a1744] text-white">
    <div class="container-custom py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Logo & Description -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-md">
              <svg class="w-6 h-6 text-[#0a1744]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H6V6h10.5L18 3H8c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v7h2v-3h16v3h2v-7c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-base font-bold text-white leading-tight">ТРАКТОРНЫЕ</span>
              <span class="text-base font-bold text-white leading-tight">ПРАВА.РФ</span>
            </div>
          </NuxtLink>
          <p class="text-blue-200 text-sm leading-relaxed">
            Почему мы №1 в РФ? По результатам внутренних опросов наших студентов, более 97% из них 
            рекомендуют нас друзьям и выбирают повторное обучение у нас.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-base font-semibold mb-4 text-amber-400">Навигация</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <NuxtLink 
                :to="link.path" 
                class="text-blue-200 hover:text-amber-400 transition-colors text-sm"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-base font-semibold mb-4 text-amber-400">Популярные категории</h3>
          <ul class="space-y-2">
            <li v-for="category in popularCategories" :key="category.path">
              <NuxtLink 
                :to="category.path" 
                class="text-blue-200 hover:text-amber-400 transition-colors text-sm"
              >
                {{ category.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-base font-semibold mb-4 text-amber-400">Контакты</h3>
          <div class="space-y-4">
            <a 
              href="tel:79014693441" 
              class="flex items-center gap-3 text-amber-400 font-bold text-lg hover:text-amber-300 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              8 (901) 469 34 41
            </a>

            <!-- Social Links -->
            <div class="flex items-center gap-3">
              <a 
                href="https://wa.me/79014693441" 
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a 
                href="https://vk.com/tpravarf" 
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="VKontakte"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.033-1.49-1.172-1.744-1.172-.356 0-.458.102-.458.593v1.561c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.684 4 8.157c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.254.745.847 1.32 1.558 1.473 2.049.17.474-.085.72-.576.72z"/>
                </svg>
              </a>
            </div>

            <button 
              @click="openModal"
              class="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0a1744] font-bold text-sm rounded-xl hover:shadow-lg transition-all"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="container-custom py-4">
        <p class="text-blue-300/60 text-sm text-center md:text-left">
          Мы используем файлы cookie для персонализации сервисов и повышения удобства пользования сайтом.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

const quickLinks = [
  { label: 'Главная', path: '/' },
  { label: 'Блог', path: '/blog' },
  { label: 'Акции', path: '/services' },
  { label: 'Политика конфиденциальности', path: '/privacy' },
  { label: 'Сведения об организации', path: '/documents' },
  { label: 'О компании', path: '/about' },
]

const popularCategories = [
  { label: 'Тракторист B, C, D, E', path: '/courses' },
  { label: 'Водитель погрузчика', path: '/voditel-pogruzchika' },
  { label: 'Машинист экскаватора', path: '/mashinist-ekskavatora' },
  { label: 'Машинист бульдозера', path: '/mashinist-buldozera' },
  { label: 'Категория А1', path: '/kategoriya-a1' },
  { label: 'Категория А2', path: '/kategoriya-a2' },
]
</script>
