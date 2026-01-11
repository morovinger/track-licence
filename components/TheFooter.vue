<template>
  <footer class="text-gray-700">
    <div class="container py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- Logo & Description -->
        <div>
          <NuxtLink to="/" class="inline-flex items-center gap-4 mb-4">
            <NuxtImg
              src="/images/logo_blue.svg"
              alt="ТРАКТОРНЫЕ ПРАВА.РФ"
              class="h-16 w-auto"
            />
            <div class="flex flex-col">
              <span class="text-2xl font-bold text-primary leading-tight uppercase">ТРАКТОРНЫЕ</span>
              <span class="text-2xl font-bold text-primary leading-tight uppercase">ПРАВА.РФ</span>
            </div>
          </NuxtLink>
          <p class="text-gray-600 text-sm leading-relaxed">
            Почему мы №1 в РФ? По результатам внутренних опросов наших студентов, более 97% из них
            рекомендуют нас друзьям и выбирают повторное обучение у нас. Эта формулировка отражает
            субъективное мнение наших учащихся и не является официальным рейтингом.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <a
            href="tel:79014693441"
            class="inline-block text-primary-900 font-bold text-xl mb-4 hover:text-primary-700 transition-colors"
          >
            8 (901) 469 34 41
          </a>

          <!-- Social Links -->
          <div class="flex items-center gap-3 mb-6">
            <a
              href="https://wa.me/79014693441"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href="https://vk.com/tpravarf"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-[#0077FF] rounded-full flex items-center justify-center hover:bg-[#0066DD] transition-colors"
              aria-label="VKontakte"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.033-1.49-1.172-1.744-1.172-.356 0-.458.102-.458.593v1.561c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.684 4 8.157c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.254.745.847 1.32 1.558 1.473 2.049.17.474-.085.72-.576.72z"/>
              </svg>
            </a>
          </div>

          <button
            @click="openModal"
            class="w-full py-3 px-6 bg-primary-600 text-white font-bold text-sm rounded-full hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
          >
            Получить консультацию
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-200">
      <div class="container py-4">
        <p class="text-gray-500 text-xs text-center">
          Мы используем файлы cookie для персонализации сервисов и повышения удобства пользования сайтом.
          Если вы не согласны на их использование, поменяйте настройки браузера.
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
  { label: 'Тракторист B, C, D, E', path: '/vse-kursy' },
  { label: 'Водитель погрузчика', path: '/voditel-pogruzchika' },
  { label: 'Машинист экскаватора', path: '/mashinist-ekskavatora' },
  { label: 'Машинист бульдозера', path: '/mashinist-buldozera' },
  { label: 'Категория А1', path: '/kategoriya-a1' },
  { label: 'Категория А2', path: '/kategoriya-a2' },
]
</script>
