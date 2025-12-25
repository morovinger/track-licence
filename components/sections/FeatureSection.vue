<template>
  <div 
    class="group bg-primary rounded-2xl p-5 md:p-6 text-center shadow-[0_2px_20px_rgba(10,23,68,0.08)] hover:shadow-[0_8px_30px_rgba(10,23,68,0.15)] border border-primary-700 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
    :class="animationClass"
  >
    <!-- Icon -->
    <div class="w-12 h-12 mb-4 rounded-xl flex items-center justify-center justify-self-center group-hover:scale-110 transition-transform">
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
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  animationDelay: 0
})

const animationClass = computed(() => 
  props.animationDelay > 0 ? `animation-delay-${props.animationDelay}` : ''
)
</script>

