<template>
  <section class="section bg-white">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="section-title">Часто задаваемые вопросы</h2>
      </div>

      <!-- Loading state -->
      <div v-if="pending" class="text-center text-gray-500 py-8">
        Загрузка вопросов...
      </div>

      <!-- FAQ Accordion -->
      <div v-else-if="posts?.length" class="max-w-4xl mx-auto space-y-3">
        <div 
          v-for="(item, index) in posts" 
          :key="item.path"
          class="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 transition-colors"
        >
          <!-- Question -->
          <button 
            @click="toggleItem(index)"
            class="w-full flex items-center justify-between p-5 md:p-6 text-left"
          >
            <span class="text-base md:text-lg font-semibold text-gray-800 pr-4">
              {{ item.title }}
            </span>
            <span 
              class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-primary-900 bg-white border border-gray-200 transition-transform duration-300"
              :class="openItems.includes(index) ? 'rotate-45 bg-primary-900 text-white border-[#0a1744]' : ''"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
              </svg>
            </span>
          </button>

          <!-- Answer -->
          <Transition name="accordion">
            <div v-if="openItems.includes(index)" class="overflow-hidden">
              <div class="px-5 md:px-6 pb-5 md:pb-6">
                <ContentRenderer :value="item" class="prose prose-gray max-w-none text-gray-600" />
                <!-- Optional Link -->
                <a 
                  v-if="item.link"
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 mt-4 text-primary-900 font-semibold hover:text-[#1a3a8a] transition-colors"
                >
                  {{ item.linkText || 'Подробнее' }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-8 text-gray-500">
        <p>Вопросы скоро появятся...</p>
      </div>

      <!-- More Questions CTA -->
      <div class="text-center mt-12">
        <p class="text-gray-600 mb-4">Не нашли ответ на свой вопрос?</p>
        <button 
          @click="openModal"
          class="btn-primary"
        >
          Задать вопрос
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openContactModal = inject<() => void>('openContactModal')

const openModal = () => {
  openContactModal?.()
}

const openItems = ref<number[]>([])

const toggleItem = (index: number) => {
  const itemIndex = openItems.value.indexOf(index)
  if (itemIndex > -1) {
    openItems.value.splice(itemIndex, 1)
  } else {
    openItems.value.push(index)
  }
}

// Query FAQ content from collection (same pattern as aoopt-web reference)
const { data: posts, pending } = useAsyncData('faq-items', () => 
  queryCollection('faq').order('order', 'ASC').all()
)
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.prose :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.prose :deep(ol) {
  list-style-type: decimal;
  list-style-position: inside;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.prose :deep(strong) {
  font-weight: 600;
  color: #1f2937;
}

.prose :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.625;
}

.prose :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
