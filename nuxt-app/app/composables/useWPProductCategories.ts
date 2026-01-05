import { ref } from 'vue'

interface WordPressProductCategory {
  id: number
  name: string
  count: number
}

export const useWPProductCategories = async () => {
  const data = ref<WordPressProductCategory[]>([])
  const error = ref<string | null>(null)
  const pending = ref(true)

  try {
    const response = await fetch(
      'https://api.logic-design-solutions.com/wp-json/wp/v2/product_cat?per_page=100'
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }

    data.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching categories:', error.value)
  } finally {
    pending.value = false
  }

  return {
    data,
    error,
    pending
  }
}
