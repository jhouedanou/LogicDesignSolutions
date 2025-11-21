<template>
  <header class="main-header-two">
    <nav class="main-menu main-menu-two">
      <div class="main-menu-two__wrapper">
        <div class="main-menu-two__wrapper-inner">
          <div class="main-menu-two__left">
            <div class="main-menu-two__logo">
              <NuxtLink
                to="/"
                style="font-size: 32px; font-weight: 700; font-style: italic; color: #000;"
              >
                {{ site.siteName }}
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
                <p class="main-menu-two__call-sub-title" v-html="callLabelWidget || site.callLabel"></p>
                <h5 class="main-menu-two__call-number">
                  <a :href="`tel:${site.phone.replace(/\s/g, '')}`" v-html="phoneWidget || site.phone"></a>
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
  { label: 'REFERENCES', path: '/references' }
]

const fallbackSite = {
  siteName: 'LogicDesignSolutions',
  callLabel: 'Call Us',
  phone: '+33 (0)1 45 92 24 47',
  contactButtonText: 'Contact Us'
}

// Cache global pour éviter les rechargements
const headerCache = {
  callLabelWidget: '',
  phoneWidget: '',
  loaded: false,
  loading: false
}

const { data: menuResponse } = useFetch('/api/menu', { 
  key: 'app-menu',
  default: () => ({ items: fallbackMenu })
})

const { data: siteResponse } = useFetch('/api/site-config', {
  key: 'site-config',
  default: () => fallbackSite
})

const { fetchWidgetContent } = useWidgets()

const menuItems = computed(() => menuResponse.value?.items ?? fallbackMenu)
const callLabelWidget = ref<string>(headerCache.callLabelWidget)
const phoneWidget = ref<string>(headerCache.phoneWidget)

const site = computed(() => ({
  ...fallbackSite,
  ...(siteResponse.value ?? {})
}))

// Cache des widgets pour éviter les rechargements
const loadWidgets = async () => {
  // Si déjà chargé ou en cours de chargement, ne rien faire
  if (headerCache.loaded || headerCache.loading) {
    callLabelWidget.value = headerCache.callLabelWidget
    phoneWidget.value = headerCache.phoneWidget
    return
  }
  
  headerCache.loading = true
  
  try {
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Widget loading timeout')), 5000)
    )
    
    const loadPromises = Promise.all([
      fetchWidgetContent('custom_html-10', 'nouveau-template-01'),
      fetchWidgetContent('custom_html-11', 'nouveau-template-01')
    ])
    
    const [callLabelContent, phoneContent] = await Promise.race([loadPromises, timeoutPromise])
    
    // Mettre en cache
    headerCache.callLabelWidget = callLabelContent || ''
    headerCache.phoneWidget = phoneContent || ''
    headerCache.loaded = true
    
    // Mettre à jour les refs
    callLabelWidget.value = headerCache.callLabelWidget
    phoneWidget.value = headerCache.phoneWidget
  } catch (err) {
    console.error('Error loading widgets:', err)
    // Cache les valeurs par défaut en cas d'erreur
    headerCache.callLabelWidget = ''
    headerCache.phoneWidget = ''
    headerCache.loaded = true
    
    callLabelWidget.value = headerCache.callLabelWidget
    phoneWidget.value = headerCache.phoneWidget
  } finally {
    headerCache.loading = false
  }
}

// Charger seulement si pas encore en cache
onMounted(() => {
  if (!headerCache.loaded && !headerCache.loading) {
    loadWidgets()
  } else {
    // Utiliser le cache immédiatement
    callLabelWidget.value = headerCache.callLabelWidget
    phoneWidget.value = headerCache.phoneWidget
  }
})
</script>
