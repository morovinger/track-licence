<template>
  <section class="section">
    <div class="container">
      <div class="bg-gradient-to-br from-primary to-primary-700 rounded-2xl px-6 py-12 md:px-12 md:py-16">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8">
          Оставить заявку
        </h2>

        <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="Ваше имя"
            class="w-full sm:w-auto sm:flex-1 px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-colors text-base"
          />
          <input
            v-model="form.phone"
            type="tel"
            required
            placeholder="8 000 000 00-00"
            class="w-full sm:w-auto sm:flex-1 px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-colors text-base"
          />
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full sm:w-auto px-8 py-4 bg-white text-primary-900 font-bold rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-base"
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
        </form>

        <p class="text-white/60 text-sm text-center mt-6">
          Нажимая на кнопку «Отправить заявку», Вы соглашаетесь с
          <NuxtLink to="/privacy" class="text-white/80 underline hover:text-white transition-colors">
            Политикой конфиденциальности
          </NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  phone: '',
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Reset form
  form.name = ''
  form.phone = ''

  isSubmitting.value = false

  alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
}
</script>
