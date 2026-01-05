<template>
  <header class="main-header-two">
    <nav class="main-menu main-menu-two">
      <div class="main-menu-two__wrapper">
        <div class="main-menu-two__wrapper-inner">
          <div class="main-menu-two__left">
            <div class="main-menu-two__logo">
              <NuxtLink to="/">
                <img
                  v-if="logoUrl"
                  :src="logoUrl"
                  :alt="logoAlt"
                  :width="logoWidth"
                  :height="logoHeight"
                />
                <span
                  v-else
                  style="font-size: 32px; font-weight: 700; font-style: italic; color: #000;"
                >
                  {{ site.siteName }}
                </span>
              </NuxtLink>
            </div>
            <div class="main-menu-two__main-menu-box">
              <a href="#" class="mobile-nav__toggler">
                <i class="fa fa-bars"></i>
              </a>
              <ul class="main-menu__list">
                <li v-for="item in menuItems" :key="item.path">
                  <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="main-menu-two__right">
            <div class="main-menu-two__call">
              <div class="main-menu-two__call-icon">
                <span class="icon-telephone-call"></span>
              </div>
              <div class="main-menu-two__call-content">
                <p class="main-menu-two__call-sub-title">{{ site.callLabel }}</p>
                <h5 class="main-menu-two__call-number">
                  <a :href="`tel:${site.phone.replace(/\s/g, '')}`">{{ site.phone }}</a>
                </h5>
              </div>
            </div>
            <div class="main-menu-two__btn-box">
              <NuxtLink to="/contact" class="main-menu-two__btn thm-btn">
                {{ site.contactButtonText }}
                <span class="icon-right-arrow"></span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="stricky-header stricked-menu main-menu main-menu-two">
    <div class="sticky-header__content"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useFetch } from '#imports'

const fallbackMenu = [
  { label: 'HOME', path: '/' },
  { label: 'PROFILES', path: '/profiles' },
  { label: 'PRODUCTS', path: '/products' },
  { label: 'SERVICES', path: '/services' },
  { label: 'NEWS', path: '/news' },
  { label: 'REFERENCES', path: '/references' },
  { label: 'CONTACT', path: '/contact' }
]

const fallbackSite = {
  siteName: 'LogicDesignSolutions',
  callLabel: 'Call Us',
  phone: '+33 (0)1 45 92 24 47',
  contactButtonText: 'Contact Us'
}

const { data: menuResponse } = useFetch('/api/menu', { key: 'menu' })
const { data: siteResponse, status: siteStatus } = useFetch('/api/site-config', { key: 'site-config' })

const menuItems = computed(() => menuResponse.value?.items ?? fallbackMenu)

const site = computed(() => ({
  ...fallbackSite,
  ...(siteResponse.value ?? {})
}))

// Récupérer le logo depuis l'API WordPress
const logoUrl = ref('')
const logoAlt = ref('Logic Design Solutions')
const logoWidth = ref(290)
const logoHeight = ref(39)

// URL du logo par défaut en cas d'erreur
const defaultLogoUrl = 'https://api.logic-design-solutions.com/wp-content/uploads/2025/12/logo22.png'

const fetchLogo = async () => {
  try {
    const response = await fetch('https://api.logic-design-solutions.com/wp-json/custom/v1/widgets')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      // Utiliser le logo par défaut
      logoUrl.value = defaultLogoUrl
      return
    }

    const data = await response.json()

    if (data['zone-logo-sidebar'] && data['zone-logo-sidebar'].length > 0) {
      const logoWidget = data['zone-logo-sidebar'][0]

      if (logoWidget.content && logoWidget.content.url) {
        logoUrl.value = logoWidget.content.url
        logoAlt.value = logoWidget.content.alt || 'Logic Design Solutions'
        logoWidth.value = logoWidget.content.width || 290
        logoHeight.value = logoWidget.content.height || 39
      } else {
        // Utiliser le logo par défaut
        logoUrl.value = defaultLogoUrl
      }
    } else {
      // Utiliser le logo par défaut
      logoUrl.value = defaultLogoUrl
    }
  } catch (error) {
    console.error('Error fetching logo:', error)
    // Utiliser le logo par défaut en cas d'erreur
    logoUrl.value = defaultLogoUrl
  }
}

// Charger le logo au montage du composant
onMounted(() => {
  fetchLogo()
})
</script>
