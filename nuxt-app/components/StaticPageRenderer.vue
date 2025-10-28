<template>
  <div>
    <div v-if="pending" class="static-page__loading">Loading...</div>
    <div v-else-if="error" class="static-page__error">Unable to load this page content.</div>
    <div v-else v-html="content" />
  </div>
</template>

<script setup lang="ts">
import { useStaticPage } from '~/composables/useStaticPage'

const props = defineProps<{ slug: string }>()

const { content, pending, error } = useStaticPage(props.slug)
</script>
