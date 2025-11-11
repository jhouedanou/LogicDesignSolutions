<template>
  <div v-if="isLoading" class="loader js-preloader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  // Hide preloader after a short delay to ensure content is ready
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>
