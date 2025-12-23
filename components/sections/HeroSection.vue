<template>
  <section class="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0a1744] via-[#0d2063] to-[#0a1744]">
      <!-- Animated gradient overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,75,204,0.3)_0%,_transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(30,75,204,0.2)_0%,_transparent_50%)]"></div>
      
      <!-- Subtle pattern -->
      <div class="absolute inset-0 opacity-5" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    </div>

    <div class="container relative z-10 py-8 md:py-16 lg:py-20">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">
        <!-- Left Content -->
        <div class="text-white">
          <!-- Number 1 Badge - Mobile only -->
          <div class="lg:hidden flex items-center gap-3 mb-6">
            <div class="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
              <span class="text-2xl font-black text-[#0a1744] leading-none">№ 1</span>
              <span class="text-[10px] font-bold text-[#0a1744]">в РФ</span>
            </div>
          </div>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2 md:gap-3 mb-6">
            <span class="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              Быстро
            </span>
            <span class="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              Выгодно
            </span>
            <span class="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              Легально
            </span>
          </div>

          <!-- Main Title -->
          <div class="mb-8">
            <span class="block text-base md:text-lg text-blue-200 mb-2">ОБУЧЕНИЕ НА</span>
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              ТРАКТОРНЫЕ ПРАВА
              <span class="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
                7 000 ₽
              </span>
            </h1>
          </div>

          <!-- CTA Button -->
          <button 
            @click="openModal"
            class="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-[#0a1744] font-bold text-lg rounded-xl shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.5)] hover:scale-105 transition-all duration-300 mb-8"
          >
            ОТКРЫТЬ КАТЕГОРИЮ
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>

          <!-- Quick Links -->
          <div class="flex flex-wrap gap-2 md:gap-3">
            <NuxtLink 
              v-for="link in quickLinks" 
              :key="link.path"
              :to="link.path"
              class="px-4 py-2 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-lg text-sm transition-all duration-300"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Right Content - Image & Badge -->
        <div class="relative hidden lg:block">
          <!-- Number 1 Badge -->
          <div class="absolute -top-4 right-8 z-20">
            <div class="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-2xl animate-pulse-soft">
              <span class="text-4xl font-black text-[#0a1744] leading-none">№ 1</span>
              <span class="text-sm font-bold text-[#0a1744]">в РФ</span>
            </div>
          </div>

          <!-- Tractor Image Container -->
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-transparent rounded-3xl blur-2xl"></div>
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/30 to-blue-800/30 flex items-center justify-center">
                <!-- Tractor SVG Illustration -->
                <svg class="w-full h-full p-8 text-white/30" viewBox="0 0 200 120" fill="currentColor">
                  <!-- Tractor body -->
                  <rect x="60" y="30" width="80" height="45" rx="8" fill="currentColor"/>
                  <!-- Cabin -->
                  <rect x="75" y="10" width="35" height="25" rx="5" fill="currentColor" opacity="0.8"/>
                  <!-- Front wheel -->
                  <circle cx="50" cy="85" r="20" stroke="currentColor" stroke-width="6" fill="none"/>
                  <circle cx="50" cy="85" r="8" fill="currentColor"/>
                  <!-- Back wheel -->
                  <circle cx="130" cy="85" r="28" stroke="currentColor" stroke-width="8" fill="none"/>
                  <circle cx="130" cy="85" r="12" fill="currentColor"/>
                  <!-- Exhaust -->
                  <rect x="125" y="15" width="8" height="20" rx="2" fill="currentColor" opacity="0.6"/>
                </svg>
                <span class="absolute bottom-4 left-4 text-white/40 text-sm">Обучение на тракторные права</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Wave -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg class="w-full h-16 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="white">
        <path d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,75 1440,50 L1440,100 L0,100 Z"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

const quickLinks = [
  { label: 'Тракторист', path: '/courses?filter=tractor' },
  { label: 'Погрузчик', path: '/voditel-pogruzchika' },
  { label: 'Экскаваторщик', path: '/mashinist-ekskavatora' },
  { label: 'Комбайнёр', path: '/kategoriya-f' },
  { label: 'Квадроцикл', path: '/kategoriya-a1' },
  { label: 'Все направления →', path: '/courses' },
]
</script>
