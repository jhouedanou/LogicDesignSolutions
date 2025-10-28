<template>
  <div class="app-layout">
    <LayoutPreloader />
    <LayoutHeader />
    <main class="main-content">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
// Layout setup
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Logic Design Solutions` : 'Logic Design Solutions'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
