import { ref } from 'vue'

interface WordPressProduct {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt?: { rendered: string }
  product_cat?: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
  }
}

export const useWPProduct = async (productId: string) => {
  const data = ref<WordPressProduct | null>(null)
  const error = ref<string | null>(null)
  const pending = ref(true)

  try {
    const response = await fetch(
      `https://logic-design-solutions.com/wp-json/wp/v2/product/${productId}?_embed`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    data.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching product:', error.value)
  } finally {
    pending.value = false
  }

  return {
    data,
    error,
    pending
  }
}
