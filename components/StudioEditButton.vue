<template>
  <a
    v-if="shouldShowButton"
    href="/_studio"
    class="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
    :title="buttonTitle"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
    <span class="text-sm font-medium">{{ buttonText }}</span>
  </a>
</template>

<script setup lang="ts">
import { StudioAuthManager, type StudioAuthState } from '~/services/studio/StudioAuthManager'

const route = useRoute()
const authManager = new StudioAuthManager()

const authState = ref<StudioAuthState>('unknown')

const isStudioExplicitlyEnabled = computed(() => {
  const value = route.query.studio
  return value === '1' || value === 'true'
})

const shouldShowButton = computed(() => {
  // If you're already authenticated, show it always.
  // If you're not authenticated, you can still opt-in for visibility via `?studio=1`
  // to start the OAuth flow from the UI.
  return authState.value === 'authenticated' || isStudioExplicitlyEnabled.value
})

const buttonText = computed(() => (authState.value === 'authenticated' ? 'Edit' : 'Login'))
const buttonTitle = computed(() =>
  authState.value === 'authenticated' ? 'Edit in Studio' : 'Login to Studio'
)

onMounted(async () => {
  authState.value = await authManager.resolveAuthState()
})
</script>
