import { defineSitemapEventHandler } from '#imports'

interface SitemapUrl {
  loc: string
  lastmod?: string
  priority?: number
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

const WP_API = 'https://api.logic-design-solutions.com/wp-json/wp/v2'

/**
 * Le cache LiteSpeed de WordPress indexe les réponses REST sur la query string exacte.
 * Sans paramètre variable, le sitemap reçoit indéfiniment une réponse figée
 * (ex : 1 article de blog au lieu de 20). Le paramètre `_cb` force une lecture fraîche
 * à chaque régénération du sitemap.
 */
async function wpFetch(path: string) {
  const separator = path.includes('?') ? '&' : '?'
  return fetch(`${WP_API}${path}${separator}_cb=${Date.now()}`, {
    headers: { 'Cache-Control': 'no-cache' }
  })
}

export default defineSitemapEventHandler(async () => {
  const urls: SitemapUrl[] = []
  
  // Static pages
  const staticPages: SitemapUrl[] = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/about', priority: 0.8, changefreq: 'monthly' },
    { loc: '/services', priority: 0.8, changefreq: 'monthly' },
    { loc: '/products', priority: 0.9, changefreq: 'weekly' },
    { loc: '/news', priority: 0.9, changefreq: 'daily' },
    { loc: '/blog', priority: 0.9, changefreq: 'daily' },
    { loc: '/references', priority: 0.7, changefreq: 'monthly' },
    { loc: '/profiles', priority: 0.7, changefreq: 'monthly' },
    { loc: '/contact', priority: 0.8, changefreq: 'monthly' },
    { loc: '/faq', priority: 0.6, changefreq: 'monthly' }
  ]
  
  urls.push(...staticPages)

  // Résoudre la catégorie "Blog" pour séparer blog et news
  let blogCategoryId: number | null = null
  try {
    const catResponse = await wpFetch('/categories?slug=blog&_fields=id')
    if (catResponse.ok) {
      const categories = await catResponse.json()
      blogCategoryId = categories[0]?.id ?? null
    }
  } catch (error) {
    console.error('Error fetching blog category for sitemap:', error)
  }

  // Fetch blog posts (catégorie Blog) from WordPress
  if (blogCategoryId) {
    try {
      const blogResponse = await wpFetch(`/posts?per_page=100&categories=${blogCategoryId}&_fields=slug,modified`)
      if (blogResponse.ok) {
        const posts = await blogResponse.json()
        for (const post of posts) {
          urls.push({
            loc: `/blog/${post.slug}`,
            lastmod: post.modified,
            priority: 0.8,
            changefreq: 'weekly'
          })
        }
      }
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error)
    }
  }

  // Fetch news posts from WordPress (hors catégorie Blog pour éviter les doublons)
  try {
    const excludeFilter = blogCategoryId ? `&categories_exclude=${blogCategoryId}` : ''
    const newsResponse = await wpFetch(`/posts?per_page=100${excludeFilter}&_fields=slug,modified`)
    if (newsResponse.ok) {
      const posts = await newsResponse.json()
      for (const post of posts) {
        urls.push({
          loc: `/news/${post.slug}`,
          lastmod: post.modified,
          priority: 0.7,
          changefreq: 'weekly'
        })
      }
    }
  } catch (error) {
    console.error('Error fetching news for sitemap:', error)
  }
  
  // Fetch products from WordPress
  try {
    const productsResponse = await wpFetch('/product?per_page=100&_fields=slug,modified')
    if (productsResponse.ok) {
      const products = await productsResponse.json()
      for (const product of products) {
        urls.push({
          loc: `/products/${product.slug}`,
          lastmod: product.modified,
          priority: 0.8,
          changefreq: 'weekly'
        })
      }
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }
  
  return urls
})
