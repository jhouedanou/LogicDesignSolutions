<template>
  <nav class="main-menu main-menu-two">
    <div class="main-menu-two__wrapper">
      <div class="main-menu-two__wrapper-inner">
        <div class="main-menu-two__left">
          <div class="main-menu-two__logo">
            <a href="/">
              <img v-if="logoUrl" :src="logoUrl" alt="Logo" style="max-height: 60px; width: auto;" />
              <span v-else style="font-size: 32px; font-weight: 700; font-style: italic; color: #000;">{{ siteData.siteName }}</span>
            </a>
          </div>
          <div class="main-menu-two__main-menu-box">
            <a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a>
            <ul class="main-menu__list">
              <li v-for="item in menuItems" :key="item.path">
                <a :href="item.path">{{ item.label }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-menu-two__right">
          <div class="main-menu-two__search-box">
            <a href="#" class="main-menu-two__search search-toggler" aria-label="Rechercher">
              <i class="icon-search"></i>
            </a>
          </div>
          <div class="main-menu-two__call">
            <div class="main-menu-two__call-icon">
              <span class="icon-telephone-call"></span>
            </div>
            <div class="main-menu-two__call-content">
              <p class="main-menu-two__call-sub-title">{{ siteData.callLabel }}</p>
              <h5 class="main-menu-two__call-number">
                <a :href="`tel:${siteData.phone.replace(/\s/g, '')}`">{{ siteData.phone }}</a>
              </h5>
            </div>
          </div>
          <div class="main-menu-two__btn-box">
            <a href="/contact" class="main-menu-two__btn thm-btn">
              {{ siteData.contactButtonText }}<span class="icon-right-arrow"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFetch } from '#imports'

// Logo depuis l'API WordPress avec cache
const { data: widgetsData } = useFetch<Record<string, any>>('https://api.logic-design-solutions.com/wp-json/custom/v1/widgets', {
  key: 'widgets-logo-menu',
  default: () => ({}),
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] || nuxtApp.static.data[key]
})

const logoUrl = computed(() => {
  if (widgetsData.value?.['zone-logo-sidebar']?.[0]?.content?.url) {
    return widgetsData.value['zone-logo-sidebar'][0].content.url
  }
  return null
})

// Valeurs par défaut affichées immédiatement
const fallbackSite = {
  siteName: 'LogicDesignSolutions',
  callLabel: 'Call Us',
  phone: '+33 (0)1 45 92 24 47',
  contactButtonText: 'Contact Us'
}

const fallbackMenu = [
  { label: 'HOME', path: '/' },
  { label: 'PROFILES', path: '/profiles' },
  { label: 'PRODUCTS', path: '/products' },
  { label: 'SERVICES', path: '/services' },
  { label: 'NEWS', path: '/news' },
  { label: 'REFERENCES', path: '/references' }
]

// Récupération depuis l'API avec valeurs par défaut immédiates (pas de loading visible)
const { data: siteResponse } = useFetch('/api/site-config', {
  key: 'site-config-menu',
  default: () => fallbackSite
})

const { data: menuResponse } = useFetch('/api/menu', {
  key: 'menu-config',
  default: () => ({ items: fallbackMenu })
})

// Computed qui fusionne les valeurs par défaut avec celles de l'API
const siteData = computed(() => ({
  ...fallbackSite,
  ...(siteResponse.value ?? {})
}))

const menuItems = computed(() => menuResponse.value?.items ?? fallbackMenu)
</script>