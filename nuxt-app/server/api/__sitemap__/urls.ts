import { defineSitemapEventHandler } from '#imports'

interface SitemapUrl {
  loc: string
  lastmod?: string
  priority?: number
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
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
    { loc: '/references', priority: 0.7, changefreq: 'monthly' },
    { loc: '/profiles', priority: 0.7, changefreq: 'monthly' },
    { loc: '/contact', priority: 0.8, changefreq: 'monthly' },
    { loc: '/faq', priority: 0.6, changefreq: 'monthly' }
  ]
  
  urls.push(...staticPages)
  
  // Fetch news posts from WordPress
  try {
    const newsResponse = await fetch('https://logic-design-solutions.com/wp-json/wp/v2/posts?per_page=100&_fields=slug,modified')
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
    const productsResponse = await fetch('https://logic-design-solutions.com/wp-json/wp/v2/product?per_page=100&_fields=slug,modified')
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
