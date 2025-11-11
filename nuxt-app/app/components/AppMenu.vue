<template>
  <nav class="main-menu main-menu-two">
    <div class="main-menu-two__wrapper">
      <div class="main-menu-two__wrapper-inner">
        <div class="main-menu-two__left">
          <div class="main-menu-two__logo">
            <NuxtLink to="/" class="logo-link">
              {{ site?.siteName }}
            </NuxtLink>
          </div>
          <div class="main-menu-two__main-menu-box">
            <a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a>
            <ul class="main-menu__list">
              <li v-for="item in navigation?.mainMenu" :key="item.path">
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
              <p class="main-menu-two__call-sub-title">{{ site?.callLabel }}</p>
              <h5 class="main-menu-two__call-number">
                <a :href="`tel:${site?.phone?.replace(/\s/g, '')}`">{{ site?.phone }}</a>
              </h5>
            </div>
          </div>
          <div class="main-menu-two__btn-box">
            <NuxtLink to="/contact" class="main-menu-two__btn thm-btn">
              {{ site?.contactButtonText }}
              <span class="icon-right-arrow"></span>
            </NuxtLink>
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
.main-menu-two__wrapper-inner {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  padding: 15px 0 !important;
}

.main-menu-two__left {
  display: flex !important;
  align-items: center !important;
  gap: 40px !important;
  flex: 1 !important;
}

.main-menu-two__logo {
  flex-shrink: 0 !important;
}

.logo-link {
  font-size: 32px !important;
  font-weight: 700 !important;
  font-style: italic !important;
  color: #000 !important;
  text-decoration: none !important;
  white-space: nowrap !important;
}

.main-menu-two__main-menu-box {
  flex: 1 !important;
}

.main-menu__list {
  display: flex !important;
  align-items: center !important;
  gap: 30px !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.main-menu__list li {
  margin: 0 !important;
  padding: 0 !important;
}

.main-menu__list li a {
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #000 !important;
  text-decoration: none !important;
  padding: 10px 5px !important;
  display: block !important;
  white-space: nowrap !important;
}

.main-menu__list li a:hover {
  color: #ff6b35 !important;
}

.main-menu-two__right {
  display: flex !important;
  align-items: center !important;
  gap: 30px !important;
  flex-shrink: 0 !important;
}

.main-menu-two__call {
  display: flex !important;
  align-items: center !important;
  gap: 15px !important;
}

.main-menu-two__call-icon {
  font-size: 32px !important;
  color: #ff6b35 !important;
}

.main-menu-two__call-content {
  display: flex !important;
  flex-direction: column !important;
  gap: 5px !important;
}

.main-menu-two__call-sub-title {
  font-size: 12px !important;
  margin: 0 !important;
  color: #666 !important;
}

.main-menu-two__call-number {
  font-size: 16px !important;
  font-weight: 700 !important;
  margin: 0 !important;
}

.main-menu-two__call-number a {
  color: #000 !important;
  text-decoration: none !important;
}

.main-menu-two__btn-box {
  flex-shrink: 0 !important;
}

@media (max-width: 1199px) {
  .main-menu__list {
    display: none !important;
  }
  
  .mobile-nav__toggler {
    display: block !important;
  }
}

@media (min-width: 1200px) {
  .mobile-nav__toggler {
    display: none !important;
  }
}
</style>
