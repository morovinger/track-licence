<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Banner -->
    <section class="bg-hero-gradient py-16 md:py-24">
      <div class="container text-center text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">О компании</h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          АНО ДПО «Псковский учебно-образовательный центр» — №1 в России по обучению на тракторные права
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container">
        <div class="max-w-4xl mx-auto">
          <!-- About -->
          <div class="card p-8 mb-8">
            <h2 class="text-2xl font-bold text-primary-500 mb-6">Почему мы №1 в РФ?</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              По результатам внутренних опросов наших студентов, более <strong>97%</strong> из них рекомендуют нас друзьям 
              и выбирают повторное обучение у нас. Эта формулировка отражает субъективное мнение наших учащихся.
            </p>
            <p class="text-gray-700 leading-relaxed mb-4">
              Образовательный центр «Тракторные-права.РФ» обладает всеми необходимыми документами для ведения 
              образовательной деятельности, включая государственную лицензию.
            </p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="card p-6 text-center">
              <div class="text-4xl font-black text-gold-500 mb-2">99%</div>
              <div class="text-gray-600 text-sm">Сдают с 1 раза</div>
            </div>
            <div class="card p-6 text-center">
              <div class="text-4xl font-black text-gold-500 mb-2">222+</div>
              <div class="text-gray-600 text-sm">Положительных отзывов</div>
            </div>
            <div class="card p-6 text-center">
              <div class="text-4xl font-black text-gold-500 mb-2">10+</div>
              <div class="text-gray-600 text-sm">Категорий обучения</div>
            </div>
            <div class="card p-6 text-center">
              <div class="text-4xl font-black text-gold-500 mb-2">97%</div>
              <div class="text-gray-600 text-sm">Рекомендуют нас</div>
            </div>
          </div>

          <!-- License -->
          <div class="card p-8 mb-8">
            <h2 class="text-2xl font-bold text-primary-500 mb-6">Лицензия</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Информацию о лицензии учебного центра можно проверить на официальном веб-сайте 
              Федеральной службы по надзору в области образования и науки.
            </p>
            <a 
              href="https://islod.obrnadzor.gov.ru/rlic/details/53689dae-e80f-c0ba-c887-d89b8a2e13e5/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary inline-flex items-center gap-2"
            >
              Проверить лицензию
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>

          <!-- Contact -->
          <div class="card p-8">
            <h2 class="text-2xl font-bold text-primary-500 mb-6">Контакты</h2>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Телефон (бесплатный)</p>
                  <a href="tel:79014693441" class="text-xl font-bold text-primary-500 hover:text-accent-500">
                    8 (901) 469 34 41
                  </a>
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">WhatsApp</p>
                  <a href="https://wa.me/79014693441" target="_blank" class="text-xl font-bold text-green-600 hover:text-green-700">
                    Написать в WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'О компании - Тракторные Права РФ',
  meta: [
    { name: 'description', content: 'АНО ДПО Псковский учебно-образовательный центр. Лицензированный образовательный центр по обучению на тракторные права.' }
  ]
})
</script>


