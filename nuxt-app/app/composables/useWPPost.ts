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

export const useWPPost = async (postId: string) => {
  const data = ref<WordPressPost | null>(null)
  const error = ref<string | null>(null)
  const pending = ref(true)

  try {
    const response = await fetch(
      `https://api.logic-design-solutions.com/wp-json/wp/v2/posts/${postId}?_embed`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`)
    }

    data.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching post:', error.value)
  } finally {
    pending.value = false
  }

  return {
    data,
    error,
    pending
  }
}
