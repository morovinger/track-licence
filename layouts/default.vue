<template>
  <div class="container min-h-screen flex flex-col">
    <TheHeader @toggle-nav="mobileNavOpen = !mobileNavOpen" />
    <MobileNav v-model:open="mobileNavOpen" />
    
    <main class="flex-1 bg-body">
      <slot />
    </main>
    
    <TheFooter />
    
    <!-- Contact Form Modal -->
    <ContactModal v-model:open="contactModalOpen" />

    <!-- Studio Edit Button (shows when authenticated) -->
    <StudioEditButton />
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
