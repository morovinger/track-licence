<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0d2063] to-[#0a1744] rounded-lg flex items-center justify-center shadow-md">
            <svg class="w-6 h-6 md:w-7 md:h-7 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H6V6h10.5L18 3H8c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v7h2v-3h16v3h2v-7c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-base md:text-lg font-bold text-[#0a1744] leading-tight">ТРАКТОРНЫЕ</span>
            <span class="text-base md:text-lg font-bold text-[#0a1744] leading-tight">ПРАВА.РФ</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-8">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="nav-link"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Contact Info & CTA -->
        <div class="hidden md:flex items-center gap-5">
          <div class="text-right">
            <p class="text-xs text-gray-400">Звонок бесплатный</p>
            <a href="tel:79014693441" class="text-base font-bold text-[#0a1744] hover:text-[#1a3a8a] transition-colors">
              8 (901) 469 34 41
            </a>
          </div>
          <button 
            @click="openModal"
            class="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0a1744] font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Заказать звонок
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileNav"
          class="lg:hidden p-2 text-[#0a1744]"
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
interface NavItem {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'Главная', path: '/' },
  { label: 'Все курсы', path: '/courses' },
  { label: 'Тарифы', path: '/#pricing' },
  { label: 'Блог', path: '/blog' },
  { label: 'О компании', path: '/about' },
]

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
