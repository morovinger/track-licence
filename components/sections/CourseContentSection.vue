<template>
  <section class="section bg-white rounded-3xl">
    <div class="container">
      <div class="w-full">
        <!-- Section Title -->
        <h2 class="text-2xl md:text-3xl font-bold text-primary-900 mb-6">
          {{ title }}
        </h2>

        <!-- Content Container -->
        <div class="relative">
          <!-- Content with collapse/expand -->
          <div
            ref="contentRef"
            class="prose prose-lg max-w-none text-gray-700 overflow-hidden transition-all duration-500"
            :class="isExpanded ? 'max-h-none' : 'max-h-[200px]'"
          >
            <ContentRenderer v-if="course" :value="course" />
          </div>

          <!-- Gradient Overlay (when collapsed) -->
          <div
            v-if="!isExpanded && needsExpansion"
            class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"
          />
        </div>

        <!-- Read More / Read Less Button -->
        <div v-if="needsExpansion" class="flex justify-center mt-8">
          <button
            @click="toggleExpand"
            class="read-more-btn bg-[#28a745] text-white px-10 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#218838] hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            {{ isExpanded ? 'Свернуть' : 'Читать полностью' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  course?: any
}

const props = withDefaults(defineProps<Props>(), {
  title: 'О курсе'
})

const isExpanded = ref(false)
const needsExpansion = ref(false)
const contentRef = ref<HTMLElement | null>(null)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// Check if content needs expansion on mount
onMounted(() => {
  if (contentRef.value) {
    // Check if content height exceeds the collapsed height (200px)
    needsExpansion.value = contentRef.value.scrollHeight > 200
  }
})
</script>

<style scoped>
.prose :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.75;
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

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(strong) {
  font-weight: 600;
  color: #1f2937;
}

.prose :deep(h3) {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0a1744;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose :deep(h4) {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0a1744;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}
</style>
