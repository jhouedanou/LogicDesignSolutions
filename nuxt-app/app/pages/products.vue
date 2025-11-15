<template>
  <div class="products-page">
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <Breadcrumb />
          <h2 class="page-header__title">Our Products</h2>
        </div>
      </div>
    </section>
    <!-- Page Header End -->

    <!-- Products Start -->
    <section class="news-details">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-7">
            <div class="section-title text-left" style="margin-bottom: 40px;">
              <div class="section-title__tagline-box">
                <p class="section-title__tagline">IP Solutions Portfolio</p>
              </div>
              <h2 class="section-title__title">FPGA IP Cores & Solutions</h2>
              <p style="margin-top: 20px;">Discover our comprehensive range of proven IP cores for FPGA designs. Each IP solution is thoroughly tested and optimized for performance, reliability, and ease of integration.</p>
            </div>

            <div v-if="pending" class="text-center" style="padding: 60px 40px;">
              <div class="spinner" style="display: inline-block; width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #ff6b35; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
              <p style="color: #666; font-size: 16px;">Loading products...</p>
            </div>

            <div v-else-if="error" class="text-center" style="padding: 40px; color: red;">
              <p>Error loading products. Please try again later.</p>
            </div>

            <div v-else>
              <!-- Filter indicator -->
              <div v-if="selectedCategory" class="filter-indicator" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #ff6b35; border-radius: 4px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-weight: 600;">
                    Filtered by: {{ getCategoryName(selectedCategory) }} 
                    <span style="color: #666;">({{ filteredCount }} products)</span>
                  </span>
                  <a @click.prevent="clearFilter" href="#" style="color: #ff6b35; text-decoration: none; font-weight: 600;">
                    Clear Filter ✕
                  </a>
                </div>
              </div>

              <!-- Products Grid with transition -->
              <transition-group name="fade-products" tag="div" class="row">
                <div 
                  v-for="(product, index) in paginatedProducts" 
                  :key="product.id"
                  class="col-xl-4 col-lg-6 col-md-6 product-item"
                >
                  <div class="news-one__single">
                    <div class="news-one__img-box product-card-img-box">
                      <div class="news-one__img product-card-img">
                        <NuxtLink :to="`/product-detail?id=${product.id}`">
                          <NuxtImg
                            :src="getProductImage(product)"
                            :alt="stripHtml(product.title.rendered)"
                            preset="productThumb"
                            loading="lazy"
                            sizes="xs:100vw sm:100vw md:50vw lg:33vw"
                          />
                        </NuxtLink>
                      </div>
                    </div>
                    <div class="news-one__content">
                      <h3 class="news-one__title">
                        <ClientOnly>
                          <NuxtLink :to="`/product-detail?id=${product.id}`" v-html="getProductTitle(product)"></NuxtLink>
                        </ClientOnly>
                      </h3>
                    </div>
                  </div>
                </div>
              </transition-group>

              <!-- No results message -->
              <div v-if="paginatedProducts.length === 0" class="text-center" style="padding: 60px 20px;">
                <i class="fas fa-inbox" style="font-size: 64px; color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: #666; font-size: 24px; margin-bottom: 10px;">No products found</h3>
                <p style="color: #999;">Try selecting a different category</p>
              </div>
            </div>

            <!-- Pagination Dynamique -->
            <div v-if="filteredPages > 1" class="news-page__pagination" style="text-align: center; margin-top: 40px;">
              <ul class="pg-pagination list-unstyled" style="display: inline-flex; justify-content: center; gap: 10px;">
                <li class="prev" :class="{ disabled: currentPage === 1 }">
                  <a @click.prevent="goToPage(currentPage - 1)" href="#" aria-label="Previous">PREV</a>
                </li>
                <li 
                  v-for="page in pageNumbers" 
                  :key="page"
                  class="count" 
                  :class="{ active: currentPage === page }"
                >
                  <a @click.prevent="goToPage(page)" href="#">{{ String(page).padStart(2, '0') }}</a>
                </li>
                <li class="next" :class="{ disabled: currentPage === filteredPages }">
                  <a @click.prevent="goToPage(currentPage + 1)" href="#" aria-label="Next">NEXT</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5">
            <div class="sidebar">
              <!-- Product Categories Dynamiques -->
              <div class="sidebar__single sidebar__category">
                <h3 class="sidebar__title">Product Categories</h3>
                <ul class="sidebar__category-list list-unstyled">
                  <li :class="{ active: !selectedCategory }">
                    <a @click.prevent="filterByCategory(null)" href="#">
                      All Products<span>({{ totalCount }})</span>
                    </a>
                  </li>
                  <li 
                    v-for="category in categories" 
                    :key="category.id" 
                    v-show="category.count > 0"
                    :class="{ active: selectedCategory === category.id }"
                  >
                    <a @click.prevent="filterByCategory(category.id)" href="#">
                      {{ category.name }}<span>({{ category.count }})</span>
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Custom IP Solution CTA -->
              <div class="sidebar__single have-any-project">
                <div class="have-any-project__bg" style="background-image: url(/assets/images/backgrounds/contact-us-bg.jpg);"></div>
                <h3 class="have-any-project__title">
                  Need Custom<br /> IP Solution?<br /> Contact Us
                </h3>
                <div class="have-any-project__btn-box">
                  <NuxtLink to="/contact" class="have-any-project__btn thm-btn">
                    Get Quote<span class="icon-right-arrow"></span>
                  </NuxtLink>
                </div>
              </div>

              <!-- Popular Tags -->
              <div class="sidebar__single sidebar__tags">
                <h3 class="sidebar__title">Popular Tags</h3>
                <div class="sidebar__tags-list">
                  <a href="#">NVMe</a>
                  <a href="#">SATA</a>
                  <a href="#">PCIe</a>
                  <a href="#">ARINC 429</a>
                  <a href="#">Ethernet</a>
                  <a href="#">FAT32</a>
                  <a href="#">EXFAT</a>
                  <a href="#">Gen4</a>
                  <a href="#">Gen5</a>
                  <a href="#">10G</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Products End -->
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Types are defined in types/global.d.ts
type WordPressProduct = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt?: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
  }
}

type WordPressProductCategory = {
  id: number
  name: string
  count: number
}

useHead({
  title: 'Products - Logic Design Solutions',
  meta: [
    {
      name: 'description',
      content: 'Logic Design Solutions - FPGA IP Cores: NVMe, SATA, ARINC 429, Ethernet'
    }
  ]
})

// Get current page and category from query params
const route = useRoute()
const router = useRouter()
const currentPage = ref(parseInt(route.query.page as string) || 1)
const selectedCategory = ref<number | null>(route.query.cat ? parseInt(route.query.cat as string) : null)
const perPage = 9 // 3 colonnes x 3 lignes

// Fetch categories first
const { data: categoriesData } = await useWPProductCategories()
const categories = ref<WordPressProductCategory[]>(categoriesData.value || [])

// Reactive state
const allProducts = ref<WordPressProduct[]>([])
const error = ref<any>(null)
const pending = ref(false)
const totalPages = ref(1)
const totalCount = ref(0)

// Filter products by selected category
const products = computed(() => {
  if (!selectedCategory.value) {
    return allProducts.value
  }
  
  return allProducts.value.filter((product: any) => {
    return product.product_cat?.includes(selectedCategory.value)
  })
})

// Filtered products count for pagination
const filteredCount = computed(() => products.value.length)
const filteredPages = computed(() => Math.ceil(filteredCount.value / perPage))

// Paginated products
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return products.value.slice(start, end)
})

// Load products function
const loadProducts = async () => {
  pending.value = true
  error.value = null

  try {
    // Load enough products to handle filtering (100 products)
    const { data, error: fetchError, totalCount: count, totalPages: pages } = await useWPProducts(100, 1)

    console.log('Products loaded:', data.value)
    console.log('Total count:', count.value)

    allProducts.value = data.value || []
    totalCount.value = count.value || 0
    totalPages.value = pages.value || 1
    error.value = fetchError.value

    console.log('All products set:', allProducts.value.length)
  } catch (e) {
    error.value = e
    console.error('Error loading products:', e)
  } finally {
    pending.value = false
  }
}

// Initial load
try {
  await loadProducts()
} catch (e) {
  console.error('Failed to load products:', e)
}

// Helper function to get product title reliably
const getProductTitle = (product: WordPressProduct): string => {
  // Try different title locations
  if (product.title?.rendered) {
    return product.title.rendered
  } else if (typeof product.title === 'string') {
    return product.title
  }
  return 'Untitled Product'
}

// Helper function to get product image from embedded data
const getProductImage = (product: WordPressProduct): string => {
  // Try to get embedded media first
  if (product._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return product._embedded['wp:featuredmedia'][0].source_url
  }

  // Fallback to placeholder
  return '/assets/images/news/placeholder-product.jpg'
}

// Helper function to strip HTML
const stripHtml = (html: string): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

// Helper function to get excerpt
const getExcerpt = (product: WordPressProduct): string => {
  if (!product.excerpt?.rendered) return ''
  const text = stripHtml(product.excerpt.rendered)
  return text.length > 120 ? text.substring(0, 120) + '...' : text
}

// Generate page numbers array for pagination
const pageNumbers = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(filteredPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Navigate to page (WITHOUT page reload)
const goToPage = (page: number) => {
  if (page < 1 || page > filteredPages.value) return
  
  currentPage.value = page
  
  // Update URL without reloading
  const query: Record<string, string> = { page: String(page) }
  if (selectedCategory.value) {
    query.cat = String(selectedCategory.value)
  }
  
  router.push({ path: '/products', query })
  
  // Smooth scroll to top of products grid
  const element = document.querySelector('.news-details')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Filter by category (WITHOUT page reload)
const filterByCategory = (categoryId: number | null) => {
  selectedCategory.value = categoryId
  currentPage.value = 1
  
  // Update URL without reloading
  const query: Record<string, string> = {}
  if (categoryId) {
    query.cat = String(categoryId)
  }
  
  router.push({ path: '/products', query })
}

// Clear filter
const clearFilter = () => {
  filterByCategory(null)
}

// Get category name by ID
const getCategoryName = (categoryId: number): string => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.name || 'Unknown'
}

// Watch for route changes (back/forward navigation)
watch(() => route.query, (newQuery) => {
  currentPage.value = parseInt(newQuery.page as string) || 1
  selectedCategory.value = newQuery.cat ? parseInt(newQuery.cat as string) : null
})
</script>

<style scoped>
.products-page {
  width: 100%;
}

/* Sidebar category styling */
.sidebar__category-list li {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.sidebar__category-list li.active {
  background: linear-gradient(90deg, rgba(255, 107, 53, 0.1) 0%, transparent 100%);
  border-left: 3px solid #ff6b35;
  padding-left: 12px;
}

.sidebar__category-list li.active a {
  color: #ff6b35 !important;
  font-weight: 700;
}

.sidebar__category-list li a {
  cursor: pointer;
  transition: color 0.3s ease;
}

.sidebar__category-list li:hover a {
  color: #ff6b35 !important;
}

/* Filter indicator animation */
.filter-indicator {
  animation: slideInFromTop 0.4s ease-out;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Product transition animations */
.fade-products-enter-active,
.fade-products-leave-active {
  transition: all 0.4s ease;
}

.fade-products-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.fade-products-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

.fade-products-move {
  transition: transform 0.4s ease;
}

.product-item {
  transition: all 0.3s ease;
}

/* Loading state for pending */
.products-loading {
  position: relative;
}

.products-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* Spinner animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Smooth pagination transitions */
.pg-pagination li a {
  transition: all 0.3s ease;
}

.pg-pagination li.active a {
  transform: scale(1.1);
}
</style>
