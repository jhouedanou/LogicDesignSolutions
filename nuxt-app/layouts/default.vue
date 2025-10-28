<template>
  <div class="app-root custom-cursor">
    <CustomCursor />
    <AppPreloader />

    <div class="page-wrapper">
      <AppHeader />

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
            {{ site.siteName }}
          </NuxtLink>
        </div>

        <div class="mobile-nav__container"></div>

        <ul class="mobile-nav__contact list-unstyled">
          <li>
            <i class="fa fa-envelope"></i>
            <a :href="`mailto:${site.email}`">{{ site.email }}</a>
          </li>
          <li>
            <i class="fa fa-phone-alt"></i>
            <a :href="`tel:${site.mobileContact.secondaryPhone.replace(/\s/g, '')}`">
              {{ site.mobileContact.secondaryPhone }}
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
import { useFetch, useHead } from '#imports'

const fallbackSite = {
  siteName: 'LogicDesignSolutions',
  email: 'contact@logic-design-solutions.com',
  mobileContact: {
    secondaryEmail: 'contact@logic-design-solutions.com',
    secondaryPhone: '+33 (0)1 45 92 24 47'
  },
  social: [
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'Facebook', icon: 'facebook-square', url: '#' },
    { name: 'Pinterest', icon: 'pinterest-p', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' }
  ]
}

const { data: siteResponse } = useFetch('/api/site-config')

const site = computed(() => ({
  ...fallbackSite,
  ...(siteResponse.value ?? {}),
  mobileContact: {
    ...fallbackSite.mobileContact,
    ...(siteResponse.value?.mobileContact ?? {})
  }
}))

const socialLinks = computed(() => site.value.social ?? fallbackSite.social)

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
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap'
    },
    { rel: 'stylesheet', href: '/assets/vendors/bootstrap/css/bootstrap.min.css' },
    { rel: 'stylesheet', href: '/assets/vendors/animate/animate.min.css' },
    { rel: 'stylesheet', href: '/assets/vendors/animate/custom-animate.css' },
    { rel: 'stylesheet', href: '/assets/vendors/fontawesome/css/all.min.css' },
    { rel: 'stylesheet', href: '/assets/vendors/jarallax/jarallax.css' },
    { rel: 'stylesheet', href: '/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css' },
    { rel: 'stylesheet', href: '/assets/vendors/odometer/odometer.min.css' },
    { rel: 'stylesheet', href: '/assets/vendors/swiper/swiper.min.css' },
    { rel: 'stylesheet', href: '/assets/vendors/smartbiz-icons/style.css' },
    { rel: 'stylesheet', href: '/assets/vendors/owl-carousel/owl.carousel.min.css' },
    { rel: 'stylesheet', href: '/assets/vendors/owl-carousel/owl.theme.default.min.css' },
    { rel: 'stylesheet', href: '/assets/vendors/bootstrap-select/css/bootstrap-select.min.css' },
    { rel: 'stylesheet', href: '/assets/vendors/jquery-ui/jquery-ui.css' },
    { rel: 'stylesheet', href: '/assets/css/smartbiz.css' },
    { rel: 'stylesheet', href: '/assets/css/smartbiz-responsive.css' },
    { rel: 'stylesheet', href: '/assets/css/logic-custom.css' }
  ],
  script: [
    { src: '/assets/vendors/jquery/jquery-3.6.0.min.js', body: true },
    { src: '/assets/vendors/bootstrap/js/bootstrap.bundle.min.js', body: true },
    { src: '/assets/vendors/jarallax/jarallax.min.js', body: true },
    { src: '/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js', body: true },
    { src: '/assets/vendors/jquery-appear/jquery.appear.min.js', body: true },
    { src: '/assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js', body: true },
    { src: '/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js', body: true },
    { src: '/assets/vendors/jquery-validate/jquery.validate.min.js', body: true },
    { src: '/assets/vendors/odometer/odometer.min.js', body: true },
    { src: '/assets/vendors/swiper/swiper.min.js', body: true },
    { src: '/assets/vendors/wnumb/wNumb.min.js', body: true },
    { src: '/assets/vendors/wow/wow.js', body: true },
    { src: '/assets/vendors/isotope/isotope.js', body: true },
    { src: '/assets/vendors/owl-carousel/owl.carousel.min.js', body: true },
    { src: '/assets/vendors/bootstrap-select/js/bootstrap-select.min.js', body: true },
    { src: '/assets/vendors/jquery-ui/jquery-ui.js', body: true },
    { src: '/assets/vendors/jquery.circle-type/jquery.circleType.js', body: true },
    { src: '/assets/vendors/jquery.circle-type/jquery.lettering.min.js', body: true },
    { src: '/assets/js/smartbiz.js', body: true }
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
