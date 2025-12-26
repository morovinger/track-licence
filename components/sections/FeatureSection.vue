<template>
  <div 
    class="bg-primary rounded-2xl p-5 md:p-6 text-center shadow-[0_2px_20px_rgba(10,23,68,0.08)] border border-primary-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(10,23,68,0.15)]"
  >
    <!-- Icon -->
    <div class="w-12 h-12 mb-4 rounded-xl flex items-center justify-center justify-self-center">
      <NuxtImg 
        :src="iconSrc" 
        :alt="title"
        class="w-full"
        :style="{ filter: 'brightness(0) invert(1)' }"
      />
    </div>

    <!-- Title -->
    <h3 class="text-base md:text-lg font-bold text-white mb-2 leading-tight">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-gray-200 text-sm leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  iconSrc: string
  title: string
  description: string
}

defineProps<Props>()
</script>

