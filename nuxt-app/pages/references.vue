<template>
  <div v-if="content" v-html="content" />
</template>

<script setup lang="ts">
import { useHead } from '#imports'

import { useStaticPage } from '~/composables/useStaticPage'

const { content } = useStaticPage('references')

useHead({
  title: 'References'
})
</script>
