import { ref } from 'vue'

interface Slide {
  id: number
  title: string
  subtitle: string
  content: string
  image: string
  link: string
  linkText: string
}

export const useSlides = () => {
  const slides = ref<Slide[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchSlides = async () => {
    try {
      loading.value = true
      error.value = null

      // Fetch slides from WordPress API
      const slidesResponse = await fetch(
        'https://api.logic-design-solutions.com/wp-json/wp/v2/slides?per_page=100'
      )

      if (!slidesResponse.ok) {
        throw new Error(`Failed to fetch slides: ${slidesResponse.status}`)
      }

      const slidesData = await slidesResponse.json()

      // Get featured media IDs
      const mediaIds = slidesData
        .filter((slide: any) => slide.featured_media)
        .map((slide: any) => slide.featured_media)

      // Fetch media data for all featured images
      let mediaMap: Record<number, any> = {}

      if (mediaIds.length > 0) {
        const uniqueMediaIds = Array.from(new Set(mediaIds)) // Remove duplicates
        const mediaResponse = await fetch(
          `https://api.logic-design-solutions.com/wp-json/wp/v2/media?include=${uniqueMediaIds.join(',')}`
        )

        if (mediaResponse.ok) {
          const mediaData = await mediaResponse.json()
          // Create a map of media ID to media object
          mediaMap = mediaData.reduce((acc: any, media: any) => {
            acc[media.id] = media
            return acc
          }, {})
        }
      }

      // Transform slides data to match our interface
      slides.value = slidesData.map((slide: any) => {
        const media = mediaMap[slide.featured_media]

        // Extract content from WordPress and clean it
        let contentHtml = slide.content?.rendered?.trim() || ''

        // Remove extra <p> tags and keep only the first paragraph with br tags
        if (contentHtml.includes('<p>')) {
          // Extract the first paragraph and remove the <p> wrapper
          const match = contentHtml.match(/<p>(.*?)<\/p>/s)
          if (match) {
            contentHtml = match[1].trim()
          }
        }

        return {
          id: slide.id,
          title: contentHtml,
          subtitle: slide.acf?.subtitle || slide.title?.rendered || 'FPGA Design Services',
          content: slide.content?.rendered || slide.acf?.content || '',
          image: media?.source_url || '/assets/images/backgrounds/logic-slider-1.webp',
          link: slide.acf?.link || '/products',
          linkText: slide.acf?.link_text || "Let's Work Together"
        }
      })

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching slides:', error.value)
    } finally {
      loading.value = false
    }
  }

  return {
    slides,
    loading,
    error,
    fetchSlides
  }
}
