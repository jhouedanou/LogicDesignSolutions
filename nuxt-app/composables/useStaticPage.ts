import { computed } from 'vue'

import { useFetch } from '#imports'

export const useStaticPage = (slug: string) => {
  const { data, pending, error, refresh } = useFetch<{ html: string }>(`/api/pages/${slug}`, {
    transform: (payload) => payload.html
  })

  const content = computed(() => data.value ?? '')

  return {
    content,
    pending,
    error,
    refresh
  }
}
