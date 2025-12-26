<template>
  <div 
    class="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(10,23,68,0.08)] border border-gray-100"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      <NuxtImg 
        :src="imageSrc" 
        :alt="title"
        class="w-full h-full object-cover object-center"
      />
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-primary-900 mb-3 leading-tight">
        {{ title }}
      </h3>

      <!-- Price -->
      <div class="flex items-baseline gap-3 mb-3">
        <span class="text-2xl font-bold text-amber-500">{{ price }}</span>
        <span class="text-base text-gray-400 line-through">{{ originalPrice }}</span>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3 min-h-[3.75rem]">
        {{ description }}
      </p>

      <!-- Actions -->
      <div class="flex gap-3">
        <NuxtLink 
          :to="detailsLink"
          class="flex-1 py-2.5 px-4 text-sm font-semibold text-primary-900 bg-transparent border-2 border-primary-900 rounded-full text-center hover:bg-primary-900 hover:text-white transition-all"
        >
          Подробнее
        </NuxtLink>
        <button 
          @click="openModal"
          class="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-primary-900 rounded-full hover:bg-primary-700 transition-all"
        >
          Записаться
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  price: string
  originalPrice: string
  description: string
  imageSrc: string
  detailsLink: string
}

defineProps<Props>()

const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}
</script>

