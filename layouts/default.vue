<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <MobileNav v-model:open="mobileNavOpen" />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <TheFooter />
    
    <!-- Contact Form Modal -->
    <ContactModal v-model:open="contactModalOpen" />
  </div>
</template>

<script setup lang="ts">
const mobileNavOpen = ref(false)
const contactModalOpen = ref(false)

// Provide modal control to children
provide('openContactModal', () => {
  contactModalOpen.value = true
})
</script>

