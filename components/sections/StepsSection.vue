<template>
  <section class="section bg-gray-50 overflow-hidden">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="section-title">Всё просто — мы рядом на каждом шаге</h2>
        <p class="section-subtitle mx-auto">
          От заявки до прав — мы поможем, подскажем и всё организуем. Обучение без стресса.
        </p>
      </div>

      <!-- Steps Timeline -->
      <div class="relative max-w-5xl mx-auto">
        <!-- Central Line - Desktop -->
        <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-primary to-amber-400 transform -translate-x-1/2 hidden md:block rounded-full"></div>

        <!-- Steps -->
        <div class="space-y-6 md:space-y-0">
          <div 
            v-for="(step, index) in steps" 
            :key="step.number"
            class="relative md:grid md:grid-cols-2 md:gap-12 animate-slide-up"
            :class="`animation-delay-${(index + 1) * 100}`"
          >
            <!-- Content Card - Alternating sides -->
            <div 
              :class="[
                'relative',
                index % 2 === 0 ? 'md:col-start-1 md:pr-8' : 'md:col-start-2 md:pl-8'
              ]"
            >
              <div 
                class="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(10,23,68,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(10,23,68,0.12)] transition-all duration-300"
                :class="index % 2 === 0 ? 'md:text-right' : ''"
              >
                <!-- Mobile Number -->
                <div class="flex items-center gap-3 mb-3 md:hidden">
                  <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-primary-900 font-bold text-lg shadow-md">
                    {{ step.number }}
                  </div>
                  <div class="flex-1 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
                </div>

                <h3 class="text-xl font-bold text-primary-900 mb-2">{{ step.title }}</h3>
                <p class="text-gray-500 leading-relaxed">{{ step.description }}</p>
              </div>
            </div>

            <!-- Number Circle - Desktop -->
            <div 
              class="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full items-center justify-center 
                     text-primary-900 font-bold text-xl shadow-lg z-10 ring-4 ring-white"
            >
              {{ step.number }}
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <button 
          @click="openModal"
          class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-primary-900 font-bold text-lg rounded-xl shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.5)] hover:scale-105 transition-all duration-300"
        >
          Начать обучение
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

interface Step {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '1',
    title: 'Оставьте заявку',
    description: 'Менеджер свяжется с вами, подберёт подходящую категорию и расскажет обо всех деталях.'
  },
  {
    number: '2',
    title: 'Сбор документов',
    description: 'Подготовьте минимальный пакет — мы подскажем, что нужно.'
  },
  {
    number: '3',
    title: 'Изучение теории',
    description: 'Проходите теорию в удобное время с любого устройства на нашей платформе.'
  },
  {
    number: '4',
    title: 'Экзамен',
    description: 'Сдача теории и практики в присутствии инспектора Гостехнадзора.'
  },
  {
    number: '5',
    title: 'Получение прав',
    description: 'После успешной сдачи — выдача удостоверения в день экзамена.'
  }
]
</script>
