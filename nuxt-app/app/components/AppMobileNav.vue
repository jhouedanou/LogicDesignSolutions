<template>
  <div class="mobile-nav__wrapper" :class="{ expanded: isOpen }">
    <div class="mobile-nav__overlay mobile-nav__toggler" @click.prevent="close"></div>
    <!-- /.mobile-nav__overlay -->
    <div class="mobile-nav__content">
      <span class="mobile-nav__close mobile-nav__toggler" @click.prevent="close">
        <i class="fa fa-times"></i>
      </span>

      <div class="logo-box">
        <NuxtLink to="/" style="font-size: 24px; font-weight: 700; font-style: italic; color: #000;">
          {{ site.siteName }}
        </NuxtLink>
      </div>
      <!-- /.logo-box -->

      <!-- Le menu est rendu par Vue : le thème le clonait auparavant en jQuery,
           ce qui copiait une liste encore vide tant que /_api/menu n'avait pas répondu. -->
      <div class="mobile-nav__container">
        <ul class="main-menu__list">
          <li v-for="item in menuItems" :key="item.path">
            <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <!-- /.mobile-nav__container -->

      <ul class="mobile-nav__contact list-unstyled">
        <li>
          <i class="fa fa-envelope"></i>
          <a :href="`mailto:${site.email}`">{{ site.email }}</a>
        </li>
        <li>
          <i class="fa fa-phone-alt"></i>
          <a :href="`tel:${site.phone.replace(/\s/g, '')}`">{{ site.phone }}</a>
        </li>
      </ul>
      <!-- /.mobile-nav__contact -->

      <div class="mobile-nav__top">
        <div class="mobile-nav__social">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            :class="social.icon"
            :aria-label="social.name"
          ></a>
        </div>
        <!-- /.mobile-nav__social -->
      </div>
      <!-- /.mobile-nav__top -->
    </div>
    <!-- /.mobile-nav__content -->
  </div>
  <!-- /.mobile-nav__wrapper -->
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from '#imports'

const { isOpen, close } = useMobileNav()
const { site, footer } = useContent()

const socialLinks = computed(() => footer.value?.socialLinks ?? [])

// Source de menu partagée avec AppMenu.vue (requête dédupliquée sur la clé 'menu-config')
const menuItems = useMenuItems()

if (import.meta.client) {
  // Verrou de scroll, repris du comportement jQuery supprimé de smartbiz.js.
  // `immediate` pour que l'état du body reste correct même sur une instance
  // fraîchement montée (l'état d'ouverture est partagé via useState).
  watch(isOpen, (value) => {
    document.body.classList.toggle('locked', value)
  }, { immediate: true })

  // Fermeture automatique lors d'une navigation entre pages d'un même layout
  const route = useRoute()
  watch(() => route.fullPath, close)

  // La home utilise `layout: false` : passer d'une page à l'autre démonte ce
  // composant et en monte un nouveau, si bien que le watcher ci-dessus ne se
  // déclenche jamais. Une instance qui se monte doit donc toujours partir fermée.
  onMounted(close)

  onBeforeUnmount(() => {
    document.body.classList.remove('locked')
  })
}
</script>
