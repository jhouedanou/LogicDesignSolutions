export const usePosts = () => {
  const fetchPosts = async (page: number = 1, perPage: number = 6) => {
    try {
      const response = await fetch(
        `https://logic-design-solutions.com/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`)
      }
      
      const posts = await response.json()
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
      const total = parseInt(response.headers.get('X-WP-Total') || '0')
      
      return {
        posts,
        totalPages,
        total,
        currentPage: page
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      return {
        posts: [],
        totalPages: 1,
        total: 0,
        currentPage: 1
      }
    }
  }
  
  const fetchPost = async (slug: string) => {
    try {
      const response = await fetch(
        `https://logic-design-solutions.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status}`)
      }
      
      const posts = await response.json()
      return posts[0] || null
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  }
  
  return {
    fetchPosts,
    fetchPost
  }
}
