<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <NuxtLink to="/" class="logo">
          <img src="/logo.png" alt="Logo" />
        </NuxtLink>

        <ul class="nav-menu" :class="{ active: isMenuOpen }">
          <li v-for="item in menuItems" :key="item.path">
            <NuxtLink :to="item.path" @click="closeMenu">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <button class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const menuItems = ref([
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' }
])

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo img {
  height: 50px;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  color: #3498db;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: #333;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: #fff;
    padding: 1rem;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
  }

  .nav-menu.active {
    max-height: 300px;
  }
}
</style>
