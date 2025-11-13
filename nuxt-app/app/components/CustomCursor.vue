<template>
  <div>
    <div class="custom-cursor__cursor" ref="cursorRef"></div>
    <div class="custom-cursor__cursor-two" ref="cursorTwoRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorRef = ref<HTMLElement | null>(null)
const cursorTwoRef = ref<HTMLElement | null>(null)

let mouseX = 0
let mouseY = 0
let posX = 0
let posY = 0
let posX2 = 0
let posY2 = 0

onMounted(() => {
  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // Animate cursor position
  const animate = () => {
    // Smooth movement for main cursor (faster response)
    posX += (mouseX - posX) * 0.25
    posY += (mouseY - posY) * 0.25

    // Very fast movement for secondary cursor
    posX2 += (mouseX - posX2) * 0.8
    posY2 += (mouseY - posY2) * 0.8

    if (cursorRef.value) {
      cursorRef.value.style.left = posX + 'px'
      cursorRef.value.style.top = posY + 'px'
    }

    if (cursorTwoRef.value) {
      cursorTwoRef.value.style.left = posX2 + 'px'
      cursorTwoRef.value.style.top = posY2 + 'px'
    }

    requestAnimationFrame(animate)
  }

  animate()

  // Hide default cursor when over document
  document.body.style.cursor = 'none'
})

onUnmounted(() => {
  // Restore default cursor on unmount
  document.body.style.cursor = 'auto'
})
</script>

<style scoped>
.custom-cursor__cursor,
.custom-cursor__cursor-two {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
}

.custom-cursor__cursor {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 50%;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.custom-cursor__cursor-two {
  width: 5px;
  height: 5px;
  background: #333;
  border-radius: 50%;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}
</style>
