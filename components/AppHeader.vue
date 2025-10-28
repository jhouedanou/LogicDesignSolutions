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
                {{ siteConfig.siteName }}
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
const { data: siteConfig } = await useFetch('/api/config/site')
const { data: navigation } = await useFetch('/api/config/navigation')
</script>
