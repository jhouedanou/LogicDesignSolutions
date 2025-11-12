import { ref } from 'vue'

interface Product {
  id: number
  title: string
  excerpt: string
  image: string
  link: string
}

export const useProducts = () => {
  const products = ref<Product[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    try {
      loading.value = true
      error.value = null

      // Fetch products from WordPress API
      const productsResponse = await fetch(
        'https://logic-design-solutions.com/wp-json/wp/v2/product?per_page=100'
      )

      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products: ${productsResponse.status}`)
      }

      const productsData = await productsResponse.json()

      // Get featured media IDs
      const mediaIds = productsData
        .filter((product: any) => product.featured_media)
        .map((product: any) => product.featured_media)

      // Fetch media data for all featured images
      let mediaMap: Record<number, any> = {}

      if (mediaIds.length > 0) {
        const uniqueMediaIds = Array.from(new Set(mediaIds))
        const mediaResponse = await fetch(
          `https://logic-design-solutions.com/wp-json/wp/v2/media?include=${uniqueMediaIds.join(',')}`
        )

        if (mediaResponse.ok) {
          const mediaData = await mediaResponse.json()
          mediaMap = mediaData.reduce((acc: any, media: any) => {
            acc[media.id] = media
            return acc
          }, {})
        }
      }

      // Transform products data to match our interface
      products.value = productsData.map((product: any) => {
        const media = mediaMap[product.featured_media]

        // Clean excerpt by removing HTML tags
        let excerpt = product.excerpt?.rendered || ''
        excerpt = excerpt.replace(/<[^>]*>/g, '').substring(0, 120)

        return {
          id: product.id,
          title: product.title?.rendered || 'Product',
          excerpt: excerpt + '...',
          image: media?.source_url || '/assets/images/news/news-1.jpg',
          link: product.link || '#'
        }
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching products:', error.value)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts
  }
}
