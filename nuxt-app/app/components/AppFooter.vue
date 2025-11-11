<template>
  <footer class="site-footer-two">
    <div class="site-footer-two__bottom">
      <div class="container">
        <div class="site-footer-two__bottom-inner">
          <div class="site-footer-two__logo">
            <NuxtLink
              to="/"
              style="font-size: 24px; font-weight: 700; font-style: italic; color: #ffffff;"
            >
              {{ footer.siteName }}
            </NuxtLink>
          </div>
          <p class="site-footer-two__bottom-text">
            {{ footer.copyright }}
            <a v-if="footer.designerName" style="color:#999999;" :href="footer.designerUrl">
              {{ footer.designerName }}
            </a>
          </p>
          <ul v-if="footer.menuItems.length" class="list-unstyled site-footer-two__bottom-menu">
            <li v-for="item in footer.menuItems" :key="item.path">
              <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
            </li>
          </ul>
          <div
            v-if="footer.socialLinks.length"
            class="site-footer-two__social"
            style="display: flex; gap: 15px; justify-content: center;"
          >
            <a
              v-for="social in footer.socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              style="color: #ffffff; font-size: 20px;"
            >
              <i :class="`fab fa-${social.icon}`"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { site, navigation, footer: footerData } = useContent()

const footer = computed(() => {
  return {
    siteName: site.value?.siteName || 'LogicDesignSolutions',
    copyright: footerData.value?.copyright || 'Copyright © Logic Design Solution All Rights Reserved - Design by Digital Consulting',
    designerName: 'Digital Consulting',
    designerUrl: '#',
    menuItems: navigation.value?.footerMenu || [],
    socialLinks: footerData.value?.socialLinks || []
  }
})
</script>
