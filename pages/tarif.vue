<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-12 md:py-16">
      <div class="container text-center">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Создайте свой тариф</h1>
        <p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          Выберите нужные категории и отметки для формирования индивидуального пакета обучения
        </p>
      </div>
    </section>

    <div class="container py-8 md:py-12">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column: Selection Options -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Selected Items Display -->
          <div v-if="selectedItems.length > 0" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Выбрано: {{ selectedItems.length }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in selectedItems"
                :key="item.id"
                class="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {{ item.name }}
                <button @click="toggleItem(item)" class="hover:text-primary-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- Categories Section -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-2">Категории тракториста-машиниста</h2>
            <p class="text-gray-600 text-sm mb-6">Выберите одну или несколько категорий</p>

            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="toggleItem(cat)"
                class="relative px-4 py-3 rounded-xl font-bold text-lg transition-all duration-200 border-2"
                :class="[
                  isSelected(cat)
                    ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-200'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                ]"
              >
                {{ cat.name }}
                <span v-if="isSelected(cat)" class="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <!-- Marks/Endorsements Section -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-2">Отметки (дополнительные квалификации)</h2>
            <p class="text-gray-600 text-sm mb-6">Выберите специализации для расширения квалификации</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                v-for="mark in marks"
                :key="mark.id"
                @click="toggleItem(mark)"
                class="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border-2 text-left"
                :class="[
                  isSelected(mark)
                    ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-200'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50',
                  mark.id === freeGiftId ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
                ]"
              >
                <span class="text-2xl">{{ mark.icon }}</span>
                <span class="font-medium text-sm">{{ mark.name }}</span>
                <span v-if="isSelected(mark)" class="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </span>
                <span v-if="mark.id === freeGiftId" class="absolute -top-2 -left-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Подарок!
                </span>
              </button>
            </div>
          </div>

          <!-- Existing License Toggle -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label class="flex items-center gap-4 cursor-pointer">
              <div class="relative">
                <input
                  type="checkbox"
                  v-model="hasExistingLicense"
                  class="sr-only peer"
                />
                <div class="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 transition-colors"></div>
                <div class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transition-transform peer-checked:translate-x-6"></div>
              </div>
              <div>
                <p class="font-bold text-gray-900">У меня есть права РФ или удостоверение тракториста</p>
                <p class="text-sm text-gray-500">Теория не требуется — скидка 5 000 ₽</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Right Column: Price Summary -->
        <div class="lg:col-span-1">
          <div class="sticky top-4 space-y-6">
            <!-- Price Card -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Ваш тариф</h3>

              <!-- Empty State -->
              <div v-if="selectedItems.length === 0" class="text-center py-8">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <p class="text-gray-500">Выберите категории или отметки</p>
              </div>

              <!-- Price Breakdown -->
              <div v-else class="space-y-4">
                <!-- Selected Items List -->
                <div class="space-y-2 pb-4 border-b border-gray-100">
                  <div
                    v-for="item in selectedItems"
                    :key="item.id"
                    class="flex justify-between items-center text-sm"
                  >
                    <span class="text-gray-600">{{ item.name }}</span>
                    <span class="font-medium" :class="item.id === freeGiftId ? 'text-emerald-600' : 'text-gray-900'">
                      {{ item.id === freeGiftId ? 'Бесплатно' : formatPrice(getItemPrice(item)) }}
                    </span>
                  </div>
                </div>

                <!-- Theory Fee -->
                <div class="flex justify-between items-center text-sm pb-4 border-b border-gray-100">
                  <span class="text-gray-600">Теоретическое обучение</span>
                  <span class="font-medium" :class="hasExistingLicense ? 'text-emerald-600 line-through' : 'text-gray-900'">
                    {{ hasExistingLicense ? '0 ₽' : '5 000 ₽' }}
                  </span>
                </div>

                <!-- Gift Notification -->
                <div v-if="canGetGift && !freeGiftId" class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div class="flex items-start gap-3">
                    <span class="text-2xl">🎁</span>
                    <div>
                      <p class="font-bold text-emerald-800 text-sm">Подарок доступен!</p>
                      <p class="text-emerald-700 text-xs">Выберите ещё одну отметку — она будет бесплатной</p>
                    </div>
                  </div>
                </div>

                <!-- Discount Info -->
                <div v-if="discount > 0" class="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div class="flex items-start gap-3">
                    <span class="text-2xl">💰</span>
                    <div>
                      <p class="font-bold text-amber-800 text-sm">Скидка за объём!</p>
                      <p class="text-amber-700 text-xs">Вы экономите {{ formatPrice(discount) }}</p>
                    </div>
                  </div>
                </div>

                <!-- Total Price -->
                <div class="pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Итого:</span>
                    <div class="text-right">
                      <span v-if="originalPrice > totalPrice" class="text-gray-400 line-through text-sm block">
                        {{ formatPrice(originalPrice) }}
                      </span>
                      <span class="text-2xl font-bold text-primary-600">{{ formatPrice(totalPrice) }}</span>
                    </div>
                  </div>
                </div>

                <!-- CTA Button -->
                <button
                  @click="submitApplication"
                  class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-200"
                >
                  Оформить заявку
                </button>

                <p class="text-xs text-gray-500 text-center">
                  Менеджер свяжется с вами для уточнения деталей
                </p>
              </div>
            </div>

            <!-- Pricing Info -->
            <div class="bg-primary-50 rounded-2xl p-6 border border-primary-100">
              <h4 class="font-bold text-primary-900 mb-3">Как формируется цена</h4>
              <ul class="space-y-2 text-sm text-primary-800">
                <li class="flex items-start gap-2">
                  <span class="text-primary-500 mt-0.5">•</span>
                  <span>1-2 позиции: 10 000 ₽ за каждую</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary-500 mt-0.5">•</span>
                  <span>3-5 позиций: 8 000 ₽ за каждую</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary-500 mt-0.5">•</span>
                  <span>6+ позиций: 6 000 ₽ за каждую</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-emerald-500 mt-0.5">★</span>
                  <span>8+ позиций: одна отметка в подарок!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface SelectableItem {
  id: string
  name: string
  type: 'category' | 'mark'
  icon?: string
  extraCost?: number
}

// Categories
const categories: SelectableItem[] = [
  { id: 'cat-b', name: 'B', type: 'category' },
  { id: 'cat-c', name: 'C', type: 'category' },
  { id: 'cat-d', name: 'D', type: 'category' },
  { id: 'cat-e', name: 'E', type: 'category' },
  { id: 'cat-f', name: 'F', type: 'category' },
  { id: 'cat-a1', name: 'A I', type: 'category' },
  { id: 'cat-a2', name: 'A II', type: 'category', extraCost: 1000 },
]

// Marks/Endorsements
const marks: SelectableItem[] = [
  { id: 'mark-loader', name: 'Водитель погрузчика', type: 'mark', icon: '🚜' },
  { id: 'mark-excavator', name: 'Машинист экскаватора', type: 'mark', icon: '🏗️' },
  { id: 'mark-grader', name: 'Машинист автогрейдера', type: 'mark', icon: '🛤️' },
  { id: 'mark-bulldozer', name: 'Машинист бульдозера', type: 'mark', icon: '🚧' },
  { id: 'mark-milling', name: 'Машинист фрезы дорожной', type: 'mark', icon: '⚙️' },
  { id: 'mark-drilling', name: 'Машинист буровой установки', type: 'mark', icon: '🔩' },
  { id: 'mark-skidder', name: 'Машинист трелёвочной машины', type: 'mark', icon: '🌲' },
  { id: 'mark-piledriver', name: 'Машинист копра', type: 'mark', icon: '🔨' },
  { id: 'mark-reloader', name: 'Машинист перегружателя', type: 'mark', icon: '📦' },
  { id: 'mark-roller', name: 'Машинист катка', type: 'mark', icon: '🛞' },
  { id: 'mark-crane', name: 'Машинист крана', type: 'mark', icon: '🏗️' },
]

const selectedIds = ref<Set<string>>(new Set())
const hasExistingLicense = ref(false)
const freeGiftId = ref<string | null>(null)

const selectedItems = computed(() => {
  const allItems = [...categories, ...marks]
  return allItems.filter(item => selectedIds.value.has(item.id))
})

const selectedCount = computed(() => selectedIds.value.size)

const canGetGift = computed(() => {
  // Can get gift if 8+ items selected and at least one category
  const hasCategory = selectedItems.value.some(item => item.type === 'category')
  return selectedCount.value >= 8 && hasCategory
})

const isSelected = (item: SelectableItem) => selectedIds.value.has(item.id)

const toggleItem = (item: SelectableItem) => {
  const newSet = new Set(selectedIds.value)

  if (newSet.has(item.id)) {
    newSet.delete(item.id)
    // If removing the free gift, clear it
    if (freeGiftId.value === item.id) {
      freeGiftId.value = null
    }
  } else {
    // Check if this should be a free gift
    if (canGetGift.value && !freeGiftId.value && item.type === 'mark') {
      freeGiftId.value = item.id
    }
    newSet.add(item.id)
  }

  selectedIds.value = newSet

  // Recalculate free gift eligibility
  if (!canGetGift.value) {
    freeGiftId.value = null
  }
}

const getBasePrice = (count: number): number => {
  if (count <= 2) return 10000
  if (count <= 5) return 8000
  return 6000
}

const getItemPrice = (item: SelectableItem): number => {
  const basePrice = getBasePrice(selectedCount.value)
  return basePrice + (item.extraCost || 0)
}

const originalPrice = computed(() => {
  // Calculate price as if each item was 10000 (no volume discount)
  let total = selectedItems.value.reduce((sum, item) => {
    return sum + 10000 + (item.extraCost || 0)
  }, 0)

  // Add theory fee
  if (!hasExistingLicense.value) {
    total += 5000
  }

  return total
})

const totalPrice = computed(() => {
  const count = selectedCount.value
  if (count === 0) return 0

  let total = 0

  selectedItems.value.forEach(item => {
    // Skip free gift
    if (item.id === freeGiftId.value) return
    total += getItemPrice(item)
  })

  // Add theory fee if no existing license
  if (!hasExistingLicense.value && count > 0) {
    total += 5000
  }

  return total
})

const discount = computed(() => {
  return originalPrice.value - totalPrice.value
})

const formatPrice = (price: number): string => {
  return price.toLocaleString('ru-RU') + ' ₽'
}

const submitApplication = () => {
  // Could integrate with a modal or form submission
  alert('Заявка будет отправлена. Менеджер свяжется с вами в ближайшее время.')
}

// SEO
useHead({
  title: 'Создать свой тариф - Тракторные Права РФ',
  meta: [
    {
      name: 'description',
      content: 'Создайте индивидуальный тариф на обучение. Выберите нужные категории и отметки тракториста-машиниста.'
    }
  ]
})
</script>

<style scoped>
/* Custom checkbox toggle styles */
input:checked + div {
  @apply bg-primary-600;
}

input:checked + div + div {
  @apply translate-x-6;
}
</style>
