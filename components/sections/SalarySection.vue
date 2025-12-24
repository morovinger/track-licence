<template>
  <section class="section bg-gradient-to-br from-primary-700 via-primary to-primary-700 text-white overflow-hidden relative">
    <!-- Background decorations -->
    <div class="absolute inset-0">
      <div class="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="animate-slide-in-left">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Зарплаты, о которых мечтают многие
          </h2>
          
          <p class="text-lg text-blue-100 mb-8 leading-relaxed">
            Спецтехника — это не только востребованная профессия, но и стабильный высокий доход. 
            Уже сразу после обучения Вы можете начать зарабатывать от <span class="text-amber-400 font-bold">90 000 ₽</span> в месяц и выше, даже без опыта.
          </p>

          <div class="space-y-6 mb-8">
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 class="text-xl font-bold text-amber-400 mb-3">
                Сколько зарабатывают водители спецтехники?
              </h3>
              <p class="text-blue-100 leading-relaxed">
                Средняя зарплата водителя трактора, экскаватора или погрузчика по России — 
                <span class="font-bold text-white">от 90 000 ₽</span> в месяц. На севере или вахтах — ещё выше.
              </p>
            </div>

            <p class="text-blue-100 leading-relaxed">
              Работа востребована в сельском хозяйстве, строительстве, ЖКХ и логистике. 
              Уже сразу после обучения Вы сможете выйти на стабильный доход.
            </p>

            <p class="text-blue-100 leading-relaxed">
              Получив удостоверение государственного образца, Вы легко найдёте работу в любом регионе России.
            </p>
          </div>

          <button 
            @click="openModal"
            class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0a1744] font-bold text-lg rounded-xl shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.5)] hover:scale-105 transition-all duration-300"
          >
            Начать обучение
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>

        <!-- Image/Illustration -->
        <div class="relative animate-slide-in-right animation-delay-200">
          <div class="relative">
            <!-- Decorative glow -->
            <div class="absolute -inset-4 bg-gradient-to-r from-amber-500/30 to-blue-500/30 rounded-3xl blur-2xl"></div>
            
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10">
              <!-- Worker illustration placeholder -->
              <div class="aspect-square bg-gradient-to-br from-blue-600/30 to-blue-800/30 rounded-2xl flex items-center justify-center">
                <svg class="w-40 h-40 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              <!-- Salary Badge -->
              <div class="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl px-6 py-4 shadow-2xl">
                <span class="block text-2xl md:text-3xl font-black text-[#0a1744]">от 90 000 ₽</span>
                <span class="block text-sm text-[#0a1744]/70 font-medium text-right">/ мес</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}
</script>
