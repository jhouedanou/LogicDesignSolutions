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
  acf?: Record<string, any>
  _links?: {
    'wp:featuredmedia'?: Array<{ href: string }>
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

/**
 * Fetch all products from WordPress
 */
export const useWPProducts = async () => {
  try {
    const { data, error } = await useFetch<WordPressProduct[]>(
      `${WP_API_BASE}/product?per_page=100&_embed`
    )

    return {
      data: data.value || [],
      error: error.value,
      pending: false
    }
  } catch (err) {
    console.error('Error fetching WordPress products:', err)
    return {
      data: [],
      error: err,
      pending: false
    }
  }
}

/**
 * Fetch a single product by ID
 */
export const useWPProduct = async (id: number | string) => {
  try {
    const { data, error } = await useFetch<WordPressProduct>(
      `${WP_API_BASE}/product/${id}?_embed`
    )

    return {
      data: data.value,
      error: error.value,
      pending: false
    }
  } catch (err) {
    console.error(`Error fetching WordPress product ${id}:`, err)
    return {
      data: null,
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
 * Helper to get featured image URL from embedded media
 */
export const getWPFeaturedImageUrl = (
  item: WordPressProduct | WordPressPost,
  fallbackUrl?: string
): string => {
  try {
    if (item._links?.['wp:featuredmedia']?.[0]) {
      // The featured media is embedded in the response
      return fallbackUrl || '/assets/images/placeholder.jpg'
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
