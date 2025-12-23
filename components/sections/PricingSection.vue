<template>
  <section id="pricing" class="section bg-gray-50">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="section-title">Выбери тариф или создай свой</h2>
        <p class="section-subtitle mx-auto">
          При оформлении пакета — Экономия до <span class="text-amber-500 font-bold">47 000 ₽</span>
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div 
          v-for="(plan, index) in plans" 
          :key="plan.name"
          class="relative group animate-slide-up"
          :class="`animation-delay-${(index + 1) * 100}`"
        >
          <!-- Card -->
          <div 
            class="relative h-full rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2"
            :class="plan.popular 
              ? 'bg-gradient-to-b from-[#0d2063] to-[#0a1744] text-white shadow-xl' 
              : 'bg-white border border-gray-100 shadow-md'"
          >
            <!-- Popular Badge -->
            <div 
              v-if="plan.popular"
              class="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0a1744] text-center py-2 text-sm font-bold"
            >
              Хит
            </div>

            <div :class="plan.popular ? 'pt-12 p-6' : 'p-6'">
              <!-- Plan Name -->
              <h3 
                class="text-xl font-bold mb-4"
                :class="plan.popular ? 'text-white' : 'text-[#0a1744]'"
              >
                {{ plan.name }}
              </h3>

              <!-- Pricing -->
              <div class="mb-6">
                <span 
                  class="text-3xl font-black"
                  :class="plan.popular ? 'text-amber-400' : 'text-amber-500'"
                >
                  {{ formatPrice(plan.price) }}
                </span>
                <span 
                  class="text-base line-through ml-2"
                  :class="plan.popular ? 'text-gray-400' : 'text-gray-400'"
                >
                  {{ formatPrice(plan.originalPrice) }}
                </span>
              </div>

              <!-- Features List -->
              <ul class="space-y-3 mb-6">
                <li 
                  v-for="feature in plan.features" 
                  :key="feature"
                  class="flex items-start gap-2 text-sm"
                  :class="plan.popular ? 'text-gray-200' : 'text-gray-600'"
                >
                  <svg 
                    class="w-5 h-5 flex-shrink-0 mt-0.5" 
                    :class="plan.popular ? 'text-green-400' : 'text-green-500'"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>{{ feature }}</span>
                </li>
                <li 
                  v-if="plan.bonus"
                  class="flex items-start gap-2 text-sm font-semibold"
                  :class="plan.popular ? 'text-amber-400' : 'text-amber-600'"
                >
                  <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{{ plan.bonus }}</span>
                </li>
              </ul>

              <!-- Action Buttons -->
              <div class="space-y-2">
                <button 
                  @click="openModal"
                  class="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300"
                  :class="plan.popular 
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0a1744] hover:shadow-lg' 
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0a1744] hover:shadow-lg'"
                >
                  Записаться
                </button>
                <NuxtLink 
                  :to="plan.detailsLink"
                  class="block w-full text-center py-2 text-sm font-medium transition-colors"
                  :class="plan.popular 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-500 hover:text-[#0a1744]'"
                >
                  Подробнее
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Tariff CTA -->
      <NuxtLink 
        to="/tariff-builder"
        class="group block bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <div class="flex items-center justify-center gap-4">
          <div class="w-14 h-14 bg-gradient-to-br from-[#0d2063] to-[#0a1744] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-[#0a1744]">Создать свой тариф</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

interface Plan {
  name: string
  price: number
  originalPrice: number
  features: string[]
  bonus?: string
  popular?: boolean
  detailsLink: string
}

const plans: Plan[] = [
  {
    name: 'Универсал',
    price: 40000,
    originalPrice: 45000,
    features: [
      'Категория B, C, D, E',
      'Погрузчик',
      'Экскаватор'
    ],
    detailsLink: '/tariff/universal'
  },
  {
    name: 'Специалист',
    price: 52000,
    originalPrice: 60000,
    features: [
      'Категория B, C, D, E',
      'Погрузчик',
      'Экскаватор',
      'Бульдозер',
      'Машинист крана'
    ],
    bonus: 'A1 в подарок!',
    popular: true,
    detailsLink: '/tariff/specialist'
  },
  {
    name: 'Профессионал',
    price: 59000,
    originalPrice: 68000,
    features: [
      'Категория B, C, D, E',
      'Категория F',
      'Погрузчик',
      'Экскаватор',
      'Бульдозер',
      'Машинист крана'
    ],
    bonus: 'A1 в подарок!',
    detailsLink: '/tariff/professional'
  },
  {
    name: 'Мастер',
    price: 73000,
    originalPrice: 120000,
    features: [
      'A2, B, C, D, E, F',
      'Погрузчик',
      'Экскаватор',
      'Бульдозер',
      'Машинист крана',
      'Машинист катка'
    ],
    bonus: 'A1 в подарок!',
    detailsLink: '/tariff/master'
  }
]
</script>
