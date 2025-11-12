<template>
  <nav class="main-menu main-menu-two">
    <div class="main-menu-two__wrapper">
      <div class="main-menu-two__wrapper-inner">
        <div class="main-menu-two__left">
          <div class="main-menu-two__logo">
            <a href="/" style="font-size: 32px; font-weight: 700; font-style: italic; color: #000;">{{ site?.siteName }}</a>
          </div>
          <div class="main-menu-two__main-menu-box">
            <a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a>
            <ul class="main-menu__list">
              <li v-for="item in navigation?.mainMenu" :key="item.path">
                <a :href="item.path">{{ item.label }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-menu-two__right">
          <div class="main-menu-two__call">
            <div class="main-menu-two__call-icon">
              <span class="icon-telephone-call"></span>
            </div>
            <div v-if="widgetLoading" class="main-menu-two__call-content" style="display: flex; align-items: center; gap: 10px;">
              <div class="spinner-mini"></div>
              <span style="font-size: 12px; color: #666;">Loading...</span>
            </div>
            <div v-else-if="widgetHtml" class="main-menu-two__call-content" v-html="widgetHtml"></div>
          </div>
          <div class="main-menu-two__btn-box">
            <a href="/contact" class="main-menu-two__btn thm-btn">
              {{ site?.contactButtonText }}<span class="icon-right-arrow"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { site, navigation } = useContent()
const { fetchWidgetContent } = useWidgets()
const widgetHtml = ref<string>('')
const widgetLoading = ref<boolean>(true)

onMounted(async () => {
  try {
    widgetLoading.value = true
    // Fetch the custom_html-8 widget content from nouveau-template-01 sidebar
    const content = await fetchWidgetContent('custom_html-8', 'nouveau-template-01')
    widgetHtml.value = content
  } catch (err) {
    console.error('Error loading widget:', err)
  } finally {
    widgetLoading.value = false
  }
})
</script>

<style scoped>
.spinner-mini {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ff6b35;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
