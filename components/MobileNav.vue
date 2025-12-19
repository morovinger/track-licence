<template>
  <Transition name="slide">
    <nav 
      v-if="open" 
      class="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:hidden"
    >
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <span class="text-lg font-bold text-primary-500">Меню</span>
          <button 
            @click="emit('update:open', false)"
            class="p-2 text-gray-500 hover:text-primary-500"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <div class="flex-1 overflow-y-auto py-4">
          <h3 class="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Категории и отметки
          </h3>
          <ul class="space-y-1">
            <li v-for="category in categories" :key="category.path">
              <NuxtLink 
                :to="category.path"
                class="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                @click="emit('update:open', false)"
              >
                {{ category.label }}
              </NuxtLink>
            </li>
          </ul>

          <div class="my-4 border-t"></div>

          <ul class="space-y-1">
            <li v-for="item in mainNav" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="block px-4 py-3 font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                @click="emit('update:open', false)"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t bg-gray-50">
          <a 
            href="tel:79014693441" 
            class="flex items-center gap-3 text-primary-500 font-bold"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            8 (901) 469 34 41
          </a>
          <button 
            @click="openModal"
            class="w-full mt-3 btn-primary text-sm py-3"
          >
            Заказать звонок
          </button>
        </div>
      </div>
    </nav>
  </Transition>

  <!-- Overlay -->
  <Transition name="fade">
    <div 
      v-if="open" 
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="emit('update:open', false)"
    />
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  emit('update:open', false)
  openContactModal?.()
}

const categories = [
  { label: 'Тракторист B', path: '/traktorist-b' },
  { label: 'Тракторист C', path: '/traktorist-c' },
  { label: 'Тракторист D', path: '/traktorist-d' },
  { label: 'Тракторист E', path: '/traktorist-e' },
  { label: 'Категория F', path: '/kategoriya-f' },
  { label: 'Категория A I', path: '/kategoriya-a1' },
  { label: 'Категория A II', path: '/kategoriya-a2' },
  { label: 'Водитель погрузчика', path: '/voditel-pogruzchika' },
  { label: 'Машинист экскаватора', path: '/mashinist-ekskavatora' },
  { label: 'Машинист бульдозера', path: '/mashinist-buldozera' },
  { label: 'Машинист катка', path: '/mashinist-katka' },
  { label: 'Машинист крана', path: '/mashinist-krana' },
]

const mainNav = [
  { label: 'Блог', path: '/blog' },
  { label: 'Акции', path: '/services' },
  { label: 'О компании', path: '/about' },
  { label: 'Документы', path: '/documents' },
]
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


