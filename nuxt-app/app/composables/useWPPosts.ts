import { ref } from 'vue'

interface WordPressPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt?: { rendered: string }
  date: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      alt_text?: string
    }>
  }
}

export const useWPPosts = async (perPage = 10, page = 1) => {
  const data = ref<WordPressPost[]>([])
  const error = ref<string | null>(null)
  const pending = ref(true)
  const totalCount = ref(0)
  const totalPages = ref(0)

  try {
    const response = await fetch(
      `https://api.logic-design-solutions.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`)
    }

    data.value = await response.json()
    
    // Get pagination info from headers
    const total = response.headers.get('X-WP-Total')
    const pages = response.headers.get('X-WP-TotalPages')
    
    totalCount.value = total ? parseInt(total) : data.value.length
    totalPages.value = pages ? parseInt(pages) : 1
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching posts:', error.value)
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
