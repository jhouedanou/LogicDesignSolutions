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
import { computed } from 'vue'
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

const { data: menuResponse } = useFetch('/api/menu', { 
  key: 'app-menu',
  default: () => ({ items: fallbackMenu })
})

const { data: siteResponse } = useFetch('/api/site-config', {
  key: 'site-config',
  default: () => fallbackSite
})

const menuItems = computed(() => menuResponse.value?.items ?? fallbackMenu)

const site = computed(() => ({
  ...fallbackSite,
  ...(siteResponse.value ?? {})
}))
</script>
