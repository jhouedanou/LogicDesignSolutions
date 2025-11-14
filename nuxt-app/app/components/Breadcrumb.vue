<template>
  <ul class="thm-breadcrumb list-unstyled">
    <li v-for="(item, index) in items" :key="index">
      <NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
      <span v-else>{{ item.label }}</span>
      <span v-if="index < items.length - 1" class="separator">{{ separator }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  items: BreadcrumbItem[]
  separator?: string
}

withDefaults(defineProps<Props>(), {
  separator: '-'
})
</script>

<style scoped>
.separator {
  margin: 0 5px;
}
</style>
