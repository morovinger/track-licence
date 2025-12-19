<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Banner -->
    <section class="bg-hero-gradient py-16 md:py-24">
      <div class="container-custom text-center text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Блог</h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Полезные статьи и новости о получении тракторных прав
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center py-16">
          <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-primary-500 mb-4">Раздел в разработке</h2>
          <p class="text-gray-600 max-w-md mx-auto">
            Скоро здесь появятся полезные статьи о получении тракторных прав, подготовке к экзаменам и работе на спецтехнике.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Блог - Тракторные Права РФ',
  meta: [
    { name: 'description', content: 'Полезные статьи и новости о получении тракторных прав и работе на спецтехнике.' }
  ]
})
</script>


