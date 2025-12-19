<template>
  <Transition name="modal">
    <div 
      v-if="open" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click.self="emit('update:open', false)"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <!-- Modal -->
      <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slide-up">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-xl font-bold text-primary-500">Заказать звонок</h3>
          <button 
            @click="emit('update:open', false)"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <p class="text-gray-600 text-sm mb-4">
            Оформить заказ еще никогда не было так просто! Введите данные ниже, а остальное оставьте нам!
          </p>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Ваше имя
            </label>
            <input 
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Введите имя"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <input 
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div>
            <label for="course" class="block text-sm font-medium text-gray-700 mb-1">
              Интересующий курс
            </label>
            <select 
              id="course"
              v-model="form.course"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">Выберите курс</option>
              <option value="tractor-bcde">Тракторист B, C, D, E</option>
              <option value="category-f">Категория F (Комбайн)</option>
              <option value="loader">Водитель погрузчика</option>
              <option value="excavator">Машинист экскаватора</option>
              <option value="bulldozer">Машинист бульдозера</option>
              <option value="roller">Машинист катка</option>
              <option value="a1">Категория А1 (Квадроцикл)</option>
              <option value="a2">Категория А2</option>
              <option value="package">Пакетное обучение</option>
            </select>
          </div>

          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Отправка...
            </span>
            <span v-else>Оставить заявку</span>
          </button>

          <p class="text-xs text-gray-500 text-center">
            Нажимая на кнопку, Вы соглашаетесь с 
            <NuxtLink to="/privacy" class="text-primary-500 hover:underline">
              Политикой конфиденциальности
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const form = reactive({
  name: '',
  phone: '',
  course: '',
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Reset form
  form.name = ''
  form.phone = ''
  form.course = ''
  
  isSubmitting.value = false
  emit('update:open', false)
  
  // Could show success toast here
  alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>

