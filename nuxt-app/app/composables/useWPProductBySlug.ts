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
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
      taxonomy: string
    }>>
  }
}

export const useWPProductBySlug = async (slug: string) => {
  const data = ref<WordPressProduct | null>(null)
  const error = ref<string | null>(null)
  const pending = ref(true)

  if (!slug || slug === 'undefined' || !slug.trim()) {
    console.warn('useWPProductBySlug called with invalid slug:', slug)
    error.value = 'Invalid slug provided'
    pending.value = false
    return { data, error, pending }
  }

  try {
    const response = await fetch(
      `https://api.logic-design-solutions.com/wp-json/wp/v2/product?slug=${encodeURIComponent(slug)}&_embed`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    const products = await response.json()
    
    // WordPress returns an array when searching by slug
    if (Array.isArray(products) && products.length > 0) {
      data.value = products[0]
    } else {
      error.value = 'Product not found'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching product by slug:', error.value)
  } finally {
    pending.value = false
  }

  return {
    data,
    error,
    pending
  }
}
