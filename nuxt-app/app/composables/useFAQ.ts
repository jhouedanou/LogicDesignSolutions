interface FAQEntry {
  id: number
  date: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  slug: string
  status: string
  type: string
}

export const useFAQ = () => {
  const entries = ref<FAQEntry[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchFAQEntries = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://api.logic-design-solutions.com/wp-json/wp/v2/faq-entry?per_page=100&orderby=date&order=desc')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch FAQ entries: ${response.status}`)
      }

      const data = await response.json()
      entries.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching FAQ entries:', err)
    } finally {
      loading.value = false
    }
  }

  const stripHtml = (html: string): string => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '').trim()
  }

  return {
    entries,
    loading,
    error,
    fetchFAQEntries,
    stripHtml
  }
}