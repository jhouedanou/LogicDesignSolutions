<template>
  <StaticPageRenderer slug="news" />
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'News'
})
</script>
