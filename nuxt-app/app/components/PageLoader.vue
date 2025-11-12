<template>
  <div v-if="isLoading" class="page-loader js-preloader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const router = useRouter()

// Listen to route changes
router.beforeEach((to, from, next) => {
  // Don't show loader if navigating to the same route
  if (to.path !== from.path) {
    isLoading.value = true
  }
  next()
})

router.afterEach(() => {
  // Hide loader after navigation completes
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.page-loader div {
  width: 15px;
  height: 15px;
  margin: 0 8px;
  background-color: #ff6b35;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.page-loader div:nth-child(1) {
  animation-delay: -0.32s;
}

.page-loader div:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
