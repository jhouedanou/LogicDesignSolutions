<template>
  <nav class="main-menu main-menu-two">
    <div class="main-menu-two__wrapper">
      <div class="main-menu-two__wrapper-inner">
        <div class="main-menu-two__left">
          <div class="main-menu-two__logo">
            <NuxtLink
              to="/"
              style="font-size: 32px; font-weight: 700; font-style: italic; color: #000;"
            >
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
                <a :href="`tel:${site?.phone.replace(/\s/g, '')}`">{{ site?.phone }}</a>
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
/* Menu styling */
.main-menu-two {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.main-menu-two__wrapper {
  padding: 1rem 0;
}

.main-menu-two__wrapper-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-menu-two__left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.main-menu-two__logo a {
  text-decoration: none;
  color: #000;
}

.main-menu-two__main-menu-box {
  display: flex;
  align-items: center;
}

.mobile-nav__toggler {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 1rem;
}

.main-menu__list {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.main-menu__list a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.main-menu__list a:hover,
.main-menu__list a.router-link-active {
  color: #f02b59;
}

.main-menu-two__right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.main-menu-two__call {
  display: flex;
  align-items: center;
  gap: 10px;
}

.main-menu-two__call-icon {
  font-size: 20px;
  color: #f02b59;
}

.main-menu-two__call-content p {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.main-menu-two__call-number {
  margin: 0;
  font-size: 16px;
}

.main-menu-two__call-number a {
  color: #000;
  text-decoration: none;
  font-weight: 600;
}

.main-menu-two__btn {
  padding: 10px 20px;
  background: #f02b59;
  color: white !important;
  border-radius: 5px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;
}

.main-menu-two__btn:hover {
  background: #d91a45;
}

@media (max-width: 768px) {
  .mobile-nav__toggler {
    display: block;
  }

  .main-menu-two__wrapper-inner {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .main-menu__list {
    gap: 1rem;
    font-size: 14px;
  }

  .main-menu-two__right {
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
