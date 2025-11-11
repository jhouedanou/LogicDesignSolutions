// WordPress API Composables
const WP_API_BASE = 'https://logic-design-solutions.com/wp-json/wp/v2'

export interface WordPressProduct {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  featured_media: number
  excerpt: {
    rendered: string
  }
  product_cat?: number[] // Array of category IDs
  acf?: Record<string, any>
  _links?: {
    'wp:featuredmedia'?: Array<{ href: string }>
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      alt_text?: string
    }>
  }
}

export interface WordPressPost {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  date: string
  modified: string
  _links?: {
    'wp:featuredmedia'?: Array<{ href: string }>
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      alt_text?: string
    }>
  }
}

export interface FeaturedMedia {
  id: number
  media_details?: {
    width: number
    height: number
  }
  source_url: string
  alt_text?: string
}

export interface WordPressProductCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
}

/**
 * Fetch all products from WordPress with pagination
 */
export const useWPProducts = async (perPage = 100, page = 1) => {
  try {
    const response = await fetch(
      `${WP_API_BASE}/product?per_page=${perPage}&page=${page}&_embed`
    )

    // Check for HTTP errors (503, 508, 404, etc.)
    if (!response.ok) {
      console.warn(`WordPress API error: ${response.status} ${response.statusText}`)
      return {
        data: [],
        error: { message: `HTTP ${response.status}`, status: response.status },
        pending: false,
        totalCount: 0,
        totalPages: 1
      }
    }

    // Check if response is JSON (avoid parsing HTML error pages)
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      console.warn('WordPress API returned non-JSON response')
      return {
        data: [],
        error: { message: 'Invalid content type' },
        pending: false,
        totalCount: 0,
        totalPages: 1
      }
    }

    const data = await response.json()
    const totalCount = parseInt(response.headers.get('X-WP-Total') || '0')
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')

    return {
      data: data || [],
      error: null,
      pending: false,
      totalCount,
      totalPages
    }
  } catch (err) {
    console.warn('Error fetching WordPress products:', err instanceof Error ? err.message : err)
    return {
      data: [],
      error: err,
      pending: false,
      totalCount: 0,
      totalPages: 1
    }
  }
}

/**
 * Fetch a single product by ID
 */
export const useWPProduct = async (id: number | string) => {
  // Validate id before making request
  if (!id || id === 'undefined' || (typeof id === 'string' && !id.trim())) {
    console.warn('useWPProduct called with invalid/empty id:', id)
    return {
      data: null,
      error: { message: 'Invalid product ID' },
      pending: false
    }
  }

  try {
    const response = await fetch(
      `${WP_API_BASE}/product/${id}?_embed`
    )

    // Check for HTTP errors (404, 503, 508, etc.)
    if (!response.ok) {
      console.warn(`WordPress API error for product ${id}: ${response.status} ${response.statusText}`)
      return {
        data: null,
        error: { message: `HTTP ${response.status}`, status: response.status },
        pending: false
      }
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      console.warn(`WordPress API returned non-JSON response for product ${id}`)
      return {
        data: null,
        error: { message: 'Invalid content type' },
        pending: false
      }
    }

    const data = await response.json()
    return {
      data: data || null,
      error: null,
      pending: false
    }
  } catch (err) {
    console.warn(`Error fetching WordPress product ${id}:`, err instanceof Error ? err.message : err)
    return {
      data: null,
      error: err,
      pending: false
    }
  }
}

/**
 * Fetch all product categories from WordPress
 */
export const useWPProductCategories = async () => {
  try {
    const response = await fetch(
      `${WP_API_BASE}/product_cat?per_page=100`
    )

    // Check for HTTP errors
    if (!response.ok) {
      console.warn(`WordPress API error: ${response.status} ${response.statusText}`)
      return {
        data: [],
        error: { message: `HTTP ${response.status}` },
        pending: false
      }
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      console.warn('WordPress API returned non-JSON response for categories')
      return {
        data: [],
        error: { message: 'Invalid content type' },
        pending: false
      }
    }

    const data = await response.json()
    return {
      data: Array.isArray(data) ? data : [],
      error: null,
      pending: false
    }
  } catch (err) {
    console.warn('Error fetching WordPress product categories:', err instanceof Error ? err.message : err)
    return {
      data: [],
      error: err,
      pending: false
    }
  }
}

/**
 * Fetch all posts (news/articles)
 */
export const useWPPosts = async (perPage = 10, page = 1) => {
  try {
    const { data, error } = await useFetch<WordPressPost[]>(
      `${WP_API_BASE}/posts?per_page=${perPage}&page=${page}&_embed&orderby=date&order=desc`
    )

    return {
      data: data.value || [],
      error: error.value,
      pending: false
    }
  } catch (err) {
    console.error('Error fetching WordPress posts:', err)
    return {
      data: [],
      error: err,
      pending: false
    }
  }
}

/**
 * Fetch a single post by ID
 */
export const useWPPost = async (id: number | string) => {
  try {
    const { data, error } = await useFetch<WordPressPost>(
      `${WP_API_BASE}/posts/${id}?_embed`
    )

    return {
      data: data.value,
      error: error.value,
      pending: false
    }
  } catch (err) {
    console.error(`Error fetching WordPress post ${id}:`, err)
    return {
      data: null,
      error: err,
      pending: false
    }
  }
}

/**
 * Fetch featured media details
 */
export const useWPMedia = async (mediaId: number) => {
  try {
    const { data, error } = await useFetch<FeaturedMedia>(
      `${WP_API_BASE}/media/${mediaId}`
    )

    return {
      data: data.value,
      error: error.value,
      pending: false
    }
  } catch (err) {
    console.error(`Error fetching WordPress media ${mediaId}:`, err)
    return {
      data: null,
      error: err,
      pending: false
    }
  }
}

/**
 * Fetch all media from WordPress (with pagination support)
 */
export const useWPMediaLibrary = async (perPage = 100, page = 1) => {
  try {
    const { data, error } = await useFetch<FeaturedMedia[]>(
      `${WP_API_BASE}/media?per_page=${perPage}&page=${page}`
    )

    return {
      data: data.value || [],
      error: error.value,
      pending: false
    }
  } catch (err) {
    console.error('Error fetching WordPress media library:', err)
    return {
      data: [],
      error: err,
      pending: false
    }
  }
}

/**
 * Build a media cache map (id -> source_url) for fast lookup
 */
export const buildMediaCache = async () => {
  const mediaCache: Record<number, string> = {}
  
  try {
    let page = 1
    let hasMore = true
    
    while (hasMore && page <= 5) { // Limite à 5 pages pour éviter trop d'appels
      const { data } = await useWPMediaLibrary(100, page)
      
      if (data && data.length > 0) {
        data.forEach((media: FeaturedMedia) => {
          if (media.id && media.source_url) {
            mediaCache[media.id] = media.source_url
          }
        })
        
        hasMore = data.length === 100
        page++
      } else {
        hasMore = false
      }
    }
  } catch (err) {
    console.error('Error building media cache:', err)
  }
  
  return mediaCache
}

/**
 * Helper to get featured image URL from embedded media or cache
 */
export const getWPFeaturedImageUrl = (
  item: WordPressProduct | WordPressPost,
  mediaCache?: Record<number, string>,
  fallbackUrl?: string
): string => {
  try {
    // Try to get from _embedded first (if using ?_embed)
    if (item._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return item._embedded['wp:featuredmedia'][0].source_url
    }
    
    // Try to get from media cache if available
    if (mediaCache && item.featured_media) {
      const cachedUrl = mediaCache[item.featured_media]
      if (cachedUrl) {
        return cachedUrl
      }
    }
    
    return fallbackUrl || '/assets/images/placeholder.jpg'
  } catch {
    return fallbackUrl || '/assets/images/placeholder.jpg'
  }
}

/**
 * Helper to strip HTML tags from content
 */
export const stripHtmlTags = (html: string): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Helper to truncate text
 */
export const truncateText = (text: string, length: number = 150): string => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
