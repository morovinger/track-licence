<template>
  <section class="section bg-body -mt-8 md:-mt-12 relative z-10">
    <div class="container">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-primary rounded-2xl p-5 md:p-6 text-center shadow-[0_2px_20px_rgba(10,23,68,0.08)] border border-primary-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(10,23,68,0.15)]"
        >
          <!-- Icon -->
          <div class="w-12 h-12 mb-4 rounded-xl flex items-center justify-center justify-self-center">
            <NuxtImg
              :src="feature.icon"
              :alt="feature.title"
              class="w-full"
              :style="{ filter: 'brightness(0) invert(1)' }"
            />
          </div>

          <!-- Title -->
          <h3 class="text-base md:text-lg font-bold text-white mb-2 leading-tight">
            {{ feature.title }}
          </h3>

          <!-- Description -->
          <p class="text-gray-200 text-sm leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: '/images/checkmark.svg',
    title: '99% сдают с 1 раза',
    description: 'Благодаря усиленной подготовке наши студенты сдают экзамен с первого раза'
  },
  {
    icon: '/images/pc.svg',
    title: 'Обучение без границ',
    description: 'Учитесь на любом устройстве в удобное для вас время на нашей платформе'
  },
  {
    icon: '/images/percentage.svg',
    title: 'Больше категорий - больше выгода',
    description: 'При обучении на несколько категорий действует система скидок — до 12 000 ₽'
  },
  {
    icon: '/images/person.svg',
    title: 'Сопроводим от заявки до прав',
    description: 'Личный менеджер и наставники помогут вам на каждом этапе — от заявки до получения прав'
  }
]
</script>
