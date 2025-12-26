<template>
  <section class="section bg-white rounded-2xl">
    <div class="container">
      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- Left Content -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-primary-900 mb-6 leading-tight">
            Зарплаты, о которых мечтают многие
          </h2>
          
          <p class="text-lg text-gray-700 mb-6 leading-relaxed">
            Спецтехника — это не только востребованная профессия, но и стабильный высокий доход. 
            Уже сразу после обучения Вы можете начать зарабатывать от 
            <strong class="text-primary-900">90 000 ₽</strong> в месяц и выше, даже без опыта.
          </p>

          <h3 class="text-xl font-bold text-primary-900 mb-4">
            Сколько зарабатывают водители спецтехники?
          </h3>
          
          <p class="text-gray-700 mb-4 leading-relaxed">
            Средняя зарплата водителя трактора, экскаватора или погрузчика по России — 
            <strong class="text-primary-900">от 90 000 ₽</strong> в месяц. На севере или вахтах — еще выше.
          </p>

          <p class="text-gray-700 mb-4 leading-relaxed">
            Работа востребована в сельском хозяйстве, строительстве, ЖКХ и логистике. 
            Уже сразу после обучения Вы сможете выйти на стабильный доход.
          </p>

          <p class="text-gray-700 leading-relaxed">
            Получив удостоверение государственного образца, Вы легко найдете работу в любом регионе России.
          </p>
        </div>

        <!-- Right Side - Image -->
        <div class="relative">
          <NuxtImg
            src="/images/review.webp"
            alt="Зарплаты водителей спецтехники"
            class="w-full h-auto rounded-2xl shadow-[0_2px_20px_rgba(10,23,68,0.08)]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No modal needed for this section
</script>
