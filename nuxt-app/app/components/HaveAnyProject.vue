<template>
  <div class="sidebar__single have-any-project">
    <div class="have-any-project__bg"
      style="background-image: url(/assets/images/backgrounds/contact-us-bg.jpg);">
    </div>
    <h3 class="have-any-project__title">
      {{ title || 'Need Custom' }}
      <br> {{ subtitle || 'IP Solution?' }}
      <br> {{ cta || 'Contact Us' }}
    </h3>
    <div class="have-any-project__btn-box">
      <NuxtLink :to="buttonLink || '/contact'" class="have-any-project__btn thm-btn">
        {{ buttonText || 'Get Quote' }}<span class="icon-right-arrow"></span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  cta?: string
  buttonText?: string
  buttonLink?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Need Custom',
  subtitle: 'IP Solution?',
  cta: 'Contact Us',
  buttonText: 'Get Quote',
  buttonLink: '/contact'
})
</script>
