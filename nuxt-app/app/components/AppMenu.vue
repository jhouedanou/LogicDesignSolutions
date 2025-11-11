<template>
  <nav class="main-menu main-menu-two">
    <div class="main-menu-two__wrapper">
      <div class="main-menu-two__wrapper-inner">
        <div class="main-menu-two__left">
          <div class="main-menu-two__logo">
            <a href="/" style="font-size: 32px; font-weight: 700; font-style: italic; color: #000;">{{ site?.siteName }}</a>
          </div>
          <div class="main-menu-two__main-menu-box">
            <a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a>
            <ul class="main-menu__list">
              <li v-for="item in navigation?.mainMenu" :key="item.path">
                <a :href="item.path">{{ item.label }}</a>
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
              <p class="main-menu-two__call-sub-title">{{ site?.callLabel }}</p>
              <h5 class="main-menu-two__call-number">
                <a :href="`tel:${site?.phone?.replace(/\s/g, '')}`">{{ site?.phone }}</a>
              </h5>
            </div>
          </div>
          <div class="main-menu-two__btn-box">
            <a href="/contact" class="main-menu-two__btn thm-btn">
              {{ site?.contactButtonText }}<span class="icon-right-arrow"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { site, navigation } = useContent()
</script>

<style scoped>
/* Laisse les styles du template d'origine fonctionner */
</style>
