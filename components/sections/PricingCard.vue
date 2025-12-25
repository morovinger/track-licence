<template>
  <div 
    class="relative group animate-slide-up"
    :class="animationClass"
  >
    <!-- Card -->
    <div 
      class="relative h-full rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 bg-primary text-white shadow-xl p-6"
      :class="popular ? 'pt-12' : ''"
    >
      <!-- Popular Badge -->
      <div 
        v-if="popular"
        class="absolute top-0 right-0 w-32 h-32 overflow-hidden"
      >
        <div class="absolute top-6 -right-8 w-40 bg-gradient-to-r from-amber-400 to-yellow-500 text-primary-900 text-center py-2 text-sm font-bold transform rotate-45 shadow-lg">
          Хит
        </div>
      </div>

      <!-- Plan Name -->
      <h3 class="text-xl font-bold mb-4 text-white uppercase">
        {{ name }}
      </h3>

      <!-- Pricing -->
      <div class="mb-6">
        <span class="text-3xl font-black text-white">
          {{ formatPrice(price) }}
        </span>
        <span class="text-base line-through ml-2 text-gray-400">
          {{ formatPrice(originalPrice) }}
        </span>
      </div>

      <!-- Features List -->
      <ul class="space-y-3 mb-6">
        <li 
          v-for="feature in features" 
          :key="feature"
          class="flex items-start gap-2 text-sm text-gray-200"
        >
          <svg 
            class="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          <span>{{ feature }}</span>
        </li>
        <li 
          v-if="bonus"
          class="flex items-center gap-2 text-sm font-semibold bg-white/10 rounded-lg px-3 py-2"
        >
          <svg class="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
          </svg>
          <span class="text-white">{{ bonus }}</span>
        </li>
      </ul>

      <!-- Action Buttons -->
      <div class="space-y-2">
        <button 
          @click="openModal"
          class="w-full py-3 px-4 rounded-full font-bold text-sm transition-all duration-300 bg-gradient-to-r from-amber-400 to-yellow-500 text-primary-900 hover:shadow-lg hover:scale-105 uppercase"
        >
          Записаться
        </button>
        <NuxtLink 
          :to="detailsLink"
          class="block w-full text-center py-2 text-sm font-medium transition-colors border-2 border-white rounded-full text-white hover:bg-white hover:text-primary uppercase"
        >
          Подробнее
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  price: number
  originalPrice: number
  features: string[]
  bonus?: string
  popular?: boolean
  detailsLink: string
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  animationDelay: 0,
  popular: false
})

const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

const animationClass = computed(() => 
  props.animationDelay > 0 ? `animation-delay-${props.animationDelay}` : ''
)
</script>

