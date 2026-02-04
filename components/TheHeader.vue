<template>
  <header class="mt-1 rounded-2xl bg-primary">
    <div class="container">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="/images/logo.svg" alt="Logo" class="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md">
          <div class="flex flex-col">
            <span class="text-xl md:text-[27px] font-bold text-white leading-tight">ТРАКТОРНЫЕ</span>
            <span class="text-xl md:text-[27px] font-bold text-white leading-tight">ПРАВА.РФ</span>
          </div>
        </NuxtLink>

        <!-- Contact Info & CTA (center-right area) -->
        <div class="hidden md:flex items-center gap-5">
          <div class="text-right">
            <p class="text-xs text-gray-300">Звонок бесплатный</p>
            <a href="tel:79014693441" class="text-lg font-bold text-white hover:text-amber-400 transition-colors">
              8 (901) 469 34 41
            </a>
          </div>
          <button
            @click="openModal"
            class="px-5 py-2.5 bg-transparent border-2 border-white text-white font-bold text-sm rounded-xl hover:bg-white hover:text-primary transition-all"
          >
            Заказать звонок
          </button>
        </div>

        <!-- Burger Menu Button (always visible) -->
        <button
          @click="toggleMobileNav"
          class="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'toggle-nav': []
}>()

const openContactModal = inject<() => void>('openContactModal')

const toggleMobileNav = () => {
  emit('toggle-nav')
}

const openModal = () => {
  openContactModal?.()
}
</script>
