<template>
  <section class="section overflow-hidden">
    <div class="container">
      <!-- Section Header -->
      <div class="text-left mb-12">
        <h2 class="section-title">Всё просто — мы рядом на каждом шаге</h2>
        <p class="text-gray-600 text-lg">
          От заявки до прав — мы поможем, подскажем и всё организуем. Обучение без стресса.
        </p>
      </div>

      <!-- Steps Timeline -->
      <div class="relative max-w-4xl mx-auto">
        <!-- Central Line - Desktop -->
        <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-primary to-emerald-400 transform -translate-x-1/2 hidden md:block rounded-full"></div>

        <!-- Steps -->
        <div class="space-y-6 md:space-y-0">
          <div 
            v-for="(step, index) in steps" 
            :key="step.number"
            class="group/step relative md:grid md:grid-cols-2 md:gap-16 md:py-8"
          >
            <!-- Content Card - Alternating sides -->
            <div 
              :class="[
                'relative',
                index % 2 === 0 ? 'md:col-start-2 md:pl-12' : 'md:col-start-1 md:pr-12'
              ]"
            >
              <div 
                class="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(10,23,68,0.08)] border border-gray-100 transition-all duration-300 group-hover/step:shadow-[0_8px_30px_rgba(10,23,68,0.15)] group-hover/step:-translate-y-1"
                :class="index % 2 === 1 ? 'md:text-right' : ''"
              >
                <!-- Mobile Number -->
                <div class="flex items-center gap-3 mb-3 md:hidden">
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                    :class="getCircleColor(index)"
                  >
                    {{ step.number }}
                  </div>
                  <div class="flex-1 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                </div>

                <h3 class="text-lg font-bold text-primary-900 mb-2">{{ step.title }}</h3>
                <p class="text-gray-500 text-sm leading-relaxed">{{ step.description }}</p>
              </div>
            </div>

            <!-- Number Circle - Desktop -->
            <div 
              class="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-12 h-12 rounded-full items-center justify-center 
                     text-white font-bold text-xl shadow-lg z-10 ring-4 ring-white
                     transition-all duration-300 group-hover/step:scale-110 group-hover/step:shadow-xl"
              :class="getCircleColor(index)"
            >
              {{ step.number }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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

const getCircleColor = (index: number): string => {
  // First and last steps are green, middle steps are blue (matching original design)
  if (index === 0 || index === steps.length - 1) {
    return 'bg-emerald-500'
  }
  return 'bg-primary'
}
</script>
