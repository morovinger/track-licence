<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Banner -->
    <section class="bg-hero-gradient py-16 md:py-24">
      <div class="container-custom text-center text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Политика конфиденциальности</h1>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto card p-8 md:p-12">
          <div class="prose prose-lg max-w-none">
            <h2 class="text-2xl font-bold text-primary-500 mb-4">1. Общие положения</h2>
            <p class="text-gray-700 mb-6">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты АНО ДПО «Псковский 
              учебно-образовательный центр» информации о физических лицах, которая может быть получена при 
              использовании сайта тракторные-права.рф.
            </p>

            <h2 class="text-2xl font-bold text-primary-500 mb-4">2. Сбор информации</h2>
            <p class="text-gray-700 mb-4">Мы собираем следующую информацию:</p>
            <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Имя и контактные данные (телефон, email)</li>
              <li>Информация о выбранных курсах обучения</li>
              <li>Техническая информация о посещении сайта (cookies, IP-адрес)</li>
            </ul>

            <h2 class="text-2xl font-bold text-primary-500 mb-4">3. Использование информации</h2>
            <p class="text-gray-700 mb-4">Собранная информация используется для:</p>
            <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Связи с клиентами по вопросам обучения</li>
              <li>Оформления договоров на обучение</li>
              <li>Улучшения качества сервиса</li>
              <li>Отправки информационных сообщений (с согласия пользователя)</li>
            </ul>

            <h2 class="text-2xl font-bold text-primary-500 mb-4">4. Защита информации</h2>
            <p class="text-gray-700 mb-6">
              Мы принимаем все необходимые меры для защиты персональных данных от несанкционированного доступа, 
              изменения, раскрытия или уничтожения.
            </p>

            <h2 class="text-2xl font-bold text-primary-500 mb-4">5. Файлы cookie</h2>
            <p class="text-gray-700 mb-6">
              Сайт использует файлы cookie для персонализации сервисов и повышения удобства пользования. 
              Вы можете отключить cookies в настройках браузера, однако это может повлиять на функциональность сайта.
            </p>

            <h2 class="text-2xl font-bold text-primary-500 mb-4">6. Контакты</h2>
            <p class="text-gray-700 mb-4">
              По вопросам, связанным с обработкой персональных данных, вы можете обратиться:
            </p>
            <ul class="list-none text-gray-700 space-y-2">
              <li><strong>Телефон:</strong> 8 (901) 469 34 41</li>
              <li><strong>WhatsApp:</strong> +7 (901) 469 34 41</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Политика конфиденциальности - Тракторные Права РФ',
  meta: [
    { name: 'description', content: 'Политика конфиденциальности и обработки персональных данных сайта тракторные-права.рф' }
  ]
})
</script>

