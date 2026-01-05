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

export const useWPProducts = async (perPage = 100, page = 1) => {
  const data = ref<WordPressProduct[]>([])
  const error = ref<string | null>(null)
  const pending = ref(true)
  const totalCount = ref(0)
  const totalPages = ref(1)

  try {
    const response = await fetch(
      `https://api.logic-design-solutions.com/wp-json/wp/v2/product?per_page=${perPage}&page=${page}&_embed=wp:featuredmedia,wp:term`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const products = await response.json()

    // Ensure products is an array
    if (Array.isArray(products)) {
      console.log(`Fetched ${products.length} products`)
      data.value = products
    } else {
      console.warn('Products response is not an array:', products)
      data.value = []
      throw new Error('Products response is not an array')
    }

    // Get total count from response headers
    const total = response.headers.get('x-wp-total')
    if (total) {
      totalCount.value = parseInt(total)
      const totalPagesHeader = response.headers.get('x-wp-totalpages')
      if (totalPagesHeader) {
        totalPages.value = parseInt(totalPagesHeader)
      }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching products:', error.value)
    data.value = []
  } finally {
    pending.value = false
  }

  return {
    data,
    error,
    pending,
    totalCount,
    totalPages
  }
}
