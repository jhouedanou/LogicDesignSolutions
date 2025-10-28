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
              {{ footerConfig.siteName }}
            </NuxtLink>
          </div>
          <p class="site-footer-two__bottom-text">
            {{ footerConfig.copyright }}
            <a style="color:#999999;" :href="footerConfig.designerUrl">
              {{ footerConfig.designerName }}
            </a>
          </p>
          <ul class="list-unstyled site-footer-two__bottom-menu">
            <li v-for="item in footerConfig.menuItems" :key="item.path">
              <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
            </li>
          </ul>
          <div
            class="site-footer-two__social"
            style="display: flex; gap: 15px; justify-content: center;"
          >
            <a
              v-for="social in footerConfig.socialLinks"
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
const { data: footerConfig } = await useFetch('/api/config/footer')
</script>
