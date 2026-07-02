const API_BASE = 'https://api.logic-design-solutions.com/wp-json/wp/v2'

// La catégorie ne change pas pendant la session : une seule requête suffit
let cachedCategory: any = undefined

export const useBlogPosts = () => {
  const fetchBlogCategory = async () => {
    if (cachedCategory !== undefined) return cachedCategory

    try {
      const response = await fetch(`${API_BASE}/categories?slug=blog`)

      if (!response.ok) {
        throw new Error(`Failed to fetch blog category: ${response.status}`)
      }

      const categories = await response.json()
      cachedCategory = categories[0] || null
      return cachedCategory
    } catch (error) {
      console.error('Error fetching blog category:', error)
      return null
    }
  }

  const fetchBlogPosts = async (page: number = 1, perPage: number = 6) => {
    try {
      const category = await fetchBlogCategory()
      // Tant que la catégorie "blog" n'existe pas côté WordPress, on liste tous les articles
      const categoryFilter = category ? `&categories=${category.id}` : ''

      const response = await fetch(
        `${API_BASE}/posts?page=${page}&per_page=${perPage}&_embed${categoryFilter}`
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.status}`)
      }

      const posts = await response.json()
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
      const total = parseInt(response.headers.get('X-WP-Total') || '0')

      return {
        posts,
        totalPages,
        total,
        currentPage: page,
        category
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      return {
        posts: [],
        totalPages: 1,
        total: 0,
        currentPage: 1,
        category: null
      }
    }
  }

  return {
    fetchBlogCategory,
    fetchBlogPosts
  }
}
