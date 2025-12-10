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
                  {{ siteConfig.siteName }}
                </span>
              </NuxtLink>
            </div>
            <div class="main-menu-two__main-menu-box">
              <a href="#" class="mobile-nav__toggler">
                <i class="fa fa-bars"></i>
              </a>
              <ul class="main-menu__list">
                <li v-for="item in navigation" :key="item.path">
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
                <p class="main-menu-two__call-sub-title">{{ siteConfig.callUs }}</p>
                <h5 class="main-menu-two__call-number">
                  <a :href="`tel:${siteConfig.phone.replace(/\s/g, '')}`">
                    {{ siteConfig.phone }}
                  </a>
                </h5>
              </div>
            </div>
            <div class="main-menu-two__btn-box">
              <NuxtLink to="/contact" class="main-menu-two__btn thm-btn">
                {{ siteConfig.contactButtonText }}
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
import { ref, onMounted } from 'vue'

const { data: siteConfig } = await useFetch('/api/config/site')
const { data: navigation } = await useFetch('/api/config/navigation')

// Récupérer le logo depuis l'API WordPress
const logoUrl = ref('')
const logoAlt = ref('Logo')
const logoWidth = ref(290)
const logoHeight = ref(39)

const fetchLogo = async () => {
  try {
    console.log('🔍 Fetching logo from API...')
    const response = await fetch('https://logic-design-solutions.com/wp-json/custom/v1/widgets')

    console.log('📡 API Response status:', response.status)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    console.log('📄 Content-Type:', contentType)

    if (!contentType || !contentType.includes('application/json')) {
      console.warn('⚠️ API response is not JSON')
      return
    }

    const data = await response.json()
    console.log('📦 Full API data:', data)
    console.log('🎯 zone-logo-sidebar:', data['zone-logo-sidebar'])

    if (data['zone-logo-sidebar'] && data['zone-logo-sidebar'].length > 0) {
      const logoWidget = data['zone-logo-sidebar'][0]
      console.log('🖼️ Logo widget:', logoWidget)

      if (logoWidget.content) {
        logoUrl.value = logoWidget.content.url || ''
        logoAlt.value = logoWidget.content.alt || 'Logo'
        logoWidth.value = logoWidget.content.width || 290
        logoHeight.value = logoWidget.content.height || 39

        console.log('✅ Logo loaded successfully:', {
          url: logoUrl.value,
          alt: logoAlt.value,
          width: logoWidth.value,
          height: logoHeight.value
        })
      } else {
        console.warn('⚠️ logoWidget.content is missing')
      }
    } else {
      console.warn('⚠️ zone-logo-sidebar is empty or missing')
    }
  } catch (error) {
    console.error('❌ Error fetching logo:', error)
  }
}

// Charger le logo au montage du composant
onMounted(() => {
  fetchLogo()
})
</script>
