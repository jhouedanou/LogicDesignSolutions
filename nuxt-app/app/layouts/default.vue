<template>
  <div class="app-root custom-cursor">
    <CustomCursor />
    <AppPreloader />

    <div class="page-wrapper">
      <header class="main-header-two">
        <AppMenu />
      </header>

      <div class="stricky-header stricked-menu main-menu main-menu-two">
        <div class="sticky-header__content"></div>
      </div>

      <main class="main-content">
        <slot />
      </main>

      <AppFooter />
    </div>

    <div class="mobile-nav__wrapper">
      <div class="mobile-nav__overlay mobile-nav__toggler"></div>
      <div class="mobile-nav__content">
        <span class="mobile-nav__close mobile-nav__toggler">
          <i class="fa fa-times"></i>
        </span>

        <div class="logo-box">
          <NuxtLink
            to="/"
            style="font-size: 24px; font-weight: 700; font-style: italic; color: #000;"
          >
            {{ site?.siteName }}
          </NuxtLink>
        </div>

        <div class="mobile-nav__container"></div>

        <ul class="mobile-nav__contact list-unstyled">
          <li>
            <i class="fa fa-envelope"></i>
            <a :href="`mailto:${site?.email}`">{{ site?.email }}</a>
          </li>
          <li>
            <i class="fa fa-phone-alt"></i>
            <a :href="`tel:${site?.phone?.replace(/\s/g, '')}`">
              {{ site?.phone }}
            </a>
          </li>
        </ul>

        <div class="mobile-nav__top">
          <div class="mobile-nav__social">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :class="`fab fa-${social.icon}`"
            ></a>
          </div>
        </div>
      </div>
    </div>

    <div class="search-popup">
      <div class="search-popup__overlay search-toggler"></div>
      <div class="search-popup__content">
        <form action="#">
          <label for="search" class="sr-only">search here</label>
          <input id="search" type="text" placeholder="Search Here..." />
          <button type="submit" aria-label="search submit" class="thm-btn">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>

    <a href="#" data-target="html" class="scroll-to-target scroll-to-top">
      <i class="fas fa-arrow-up"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#imports'

const { site, footer } = useContent()

const socialLinks = computed(() => footer.value?.socialLinks ?? [])

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Logic Design Solutions` : 'Logic Design Solutions'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Logic Design Solutions - FPGA Design Services & IP Solutions' }
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/images/favicons/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/images/favicons/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/images/favicons/favicon-16x16.png' },
    { rel: 'manifest', href: '/assets/images/favicons/site.webmanifest' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
    },
    { rel: 'stylesheet', href: '/assets/css/merged-vendors.min.css' }
  ],
  script: [
    { src: '/assets/js/merged-vendors.min.js', async: true }
  ]
})
</script>

<style scoped>
.app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
