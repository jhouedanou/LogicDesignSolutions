<template>
  <ul class="thm-breadcrumb list-unstyled">
    <li v-for="(item, index) in breadcrumbItems" :key="index">
      <a v-if="item.to && index < breadcrumbItems.length - 1" :href="item.to">{{ item.label }}</a>
      <span v-else>{{ item.label }}</span>
      <span v-if="index < breadcrumbItems.length - 1" class="separator">{{ separator }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  items?: BreadcrumbItem[]
  separator?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: undefined,
  separator: '-'
})

const route = useRoute()

// Generate breadcrumb automatically from route if items not provided
const breadcrumbItems = computed(() => {
  // If items are explicitly provided, use them
  if (props.items && props.items.length > 0) {
    return props.items
  }

  // Auto-generate from route path
  const items: BreadcrumbItem[] = [{ label: 'Home', to: '/' }]
  
  const pathSegments = route.path.split('/').filter(Boolean)
  
  if (pathSegments.length === 0) {
    return items // Just Home for index page
  }
  
  pathSegments.forEach((segment, index) => {
    // Convert segment to readable label (e.g., "product-detail" -> "Product Detail")
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    const isLast = index === pathSegments.length - 1
    const path = '/' + pathSegments.slice(0, index + 1).join('/')
    
    items.push({
      label,
      to: isLast ? undefined : path // Last item has no link
    })
  })
  
  return items
})
</script>

<style lang="scss" scoped>

.thm-breadcrumb {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  list-style: none;
    padding:4px 10px;
  margin: 1em 0;
  ul{
    padding:4px;
  }
}

.thm-breadcrumb li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.thm-breadcrumb li a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.thm-breadcrumb li a:hover {
  color: var(--lds-primary, #00A8E1);
}

.separator {
  margin: 0 5px;
  color: inherit;
}
</style>
