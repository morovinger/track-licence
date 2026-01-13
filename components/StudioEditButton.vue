<template>
  <a
    v-if="isAuthenticated"
    href="/_studio"
    class="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
    title="Edit in Studio"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
    <span class="text-sm font-medium">Edit</span>
  </a>
</template>

<script setup lang="ts">
const isAuthenticated = ref(false)

onMounted(async () => {
  try {
    const response = await $fetch('/__nuxt_studio/auth/session', {
      credentials: 'include'
    })
    isAuthenticated.value = !!response
  } catch {
    isAuthenticated.value = false
  }
})
</script>
