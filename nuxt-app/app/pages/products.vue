<template>
  <div class="products-page">
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.png)"></div>
      <div class="container">
        <div class="page-header__inner">
          <ul class="thm-breadcrumb list-unstyled">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li>-</li>
            <li>Products</li>
          </ul>
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

            <div v-if="pending" class="text-center" style="padding: 40px;">
              <p>Loading products...</p>
            </div>

            <div v-else-if="error" class="text-center" style="padding: 40px; color: red;">
              <p>Error loading products. Please try again later.</p>
            </div>

            <div v-else class="row">
              <!-- Dynamic Products from WordPress API -->
              <div 
                v-for="(product, index) in products" 
                :key="product.id"
                class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" 
                :data-wow-delay="`${(index % 3 + 1) * 100}ms`"
              >
                <div class="news-one__single">
                  <div class="news-one__img-box">
                    <div class="news-one__img">
                      <NuxtLink :to="`/product-detail?id=${product.id}`">
                        <img 
                          :src="getProductImage(product)" 
                          :alt="stripHtml(product.title.rendered)" 
                        />
                      </NuxtLink>
                    </div>
                  </div>
                  <div class="news-one__content">
                    <h3 class="news-one__title">
                      <NuxtLink :to="`/product-detail?id=${product.id}`" v-html="product.title.rendered"></NuxtLink>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination Dynamique -->
            <div v-if="totalPages > 1" class="news-page__pagination" style="text-align: center; margin-top: 40px;">
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
                <li class="next" :class="{ disabled: currentPage === totalPages }">
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
                  <li v-for="category in categories" :key="category.id" v-show="category.count > 0">
                    <NuxtLink :to="`/product-category?cat=${category.id}`">
                      {{ category.name }}<span>({{ category.count }})</span>
                    </NuxtLink>
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
import type { WordPressProduct, WordPressProductCategory } from '~/composables/useWordPressAPI'

useHead({
  title: 'Products - Logic Design Solutions',
  meta: [
    {
      name: 'description',
      content: 'Logic Design Solutions - FPGA IP Cores: NVMe, SATA, ARINC 429, Ethernet'
    }
  ]
})

// Get current page from query params
const route = useRoute()
const currentPage = ref(parseInt(route.query.page as string) || 1)
const perPage = 9 // 3 colonnes x 3 lignes

// Fetch products and categories in parallel
const [productsResult, categoriesResult] = await Promise.all([
  useWPProducts(perPage, currentPage.value),
  useWPProductCategories()
])

const products = ref<WordPressProduct[]>(productsResult.data || [])
const categories = ref<WordPressProductCategory[]>(categoriesResult.data || [])
const totalPages = ref(productsResult.totalPages || 1)
const totalCount = ref(productsResult.totalCount || 0)
const error = ref(productsResult.error)
const pending = ref(false)

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
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Navigate to page
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  navigateTo(`/products?page=${page}`)
}
</script>

<style scoped>
.products-page {
  width: 100%;
}
</style>
