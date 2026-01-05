<template>
  <div class="product-detail-page">
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <Breadcrumb :items="[
            { label: 'Home', to: '/' },
            { label: 'Products', to: '/products' },
            { label: productTitle }
          ]" />
          <h2 class="page-header__title">{{ productTitle }}</h2>
        </div>
      </div>
    </section>
    <!--Page Header End-->

    <!--Product Details Start-->
    <section class="news-details">
      <div class="container">
        <div v-if="pending" class="text-center" style="padding: 60px;">
          <p>Loading product details...</p>
        </div>

        <div v-else-if="error || !product" class="text-center" style="padding: 60px; color: red;">
          <p>Product not found or error loading details.</p>
          <NuxtLink to="/products" class="thm-btn" style="margin-top: 20px;">
            Back to Products<span class="icon-right-arrow"></span>
          </NuxtLink>
        </div>

        <div v-else class="row">
          <div class="col-xl-8 col-lg-7">
            <div class="news-details__left">
              <div class="news-details__content">
                <!-- Product Categories Badge -->
                <div v-if="productCategories.length > 0" style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                  <p class="news-details__text-1" style="margin: 0;">
                    <span 
                      v-for="(cat, index) in productCategories" 
                      :key="cat.id"
                      style="color: var(--lds-primary); font-weight: bold;"
                    >
                      {{ cat.name }}<span v-if="index < productCategories.length - 1"> / </span>
                    </span>
                  </p>
                </div>

                <ClientOnly>
                  <!-- Product Title -->
                  <h3 v-if="product" class="news-details__title-1" v-html="product.title.rendered"></h3>
                  
                  <!-- Featured Image -->
                  <div v-if="productImage" style="float: left; width: 50%; margin-right: 30px; margin-bottom: 20px;">
                    <NuxtImg
                      :src="productImage"
                      :alt="stripHtml(product.title.rendered)"
                      preset="featured"
                      loading="eager"
                      style="width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
                    />
                  </div>
                  
                  <!-- Product Content (Dynamic from WordPress) -->
                  <div v-if="product" class="news-details__text-1" v-html="product.content.rendered"></div>

                  <div style="clear: both;"></div>
                </ClientOnly>
              </div>

              <ClientOnly>
                <div class="news-details__bottom" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eeeeee;">
                  <p v-if="productCategories.length > 0" class="news-details__tags">
                    <span>Categories:</span>
                    <NuxtLink 
                      v-for="cat in productCategories" 
                      :key="cat.id"
                      :to="`/products?cat=${cat.id}`"
                    >
                      {{ cat.name }}
                    </NuxtLink>
                  </p>
                  <div class="share-section" style="margin-top: 20px;">
                    <span style="font-weight: 600; color: #0a1f44; margin-right: 15px;">Share:</span>
                    <div class="social-share-buttons" style="display: inline-flex; gap: 10px;">
                      <a :href="facebookShareUrl" target="_blank" rel="noopener noreferrer" title="Share on Facebook" class="share-btn share-btn--facebook">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                      <a :href="twitterShareUrl" target="_blank" rel="noopener noreferrer" title="Share on X (Twitter)" class="share-btn share-btn--twitter">
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a :href="linkedinShareUrl" target="_blank" rel="noopener noreferrer" title="Share on LinkedIn" class="share-btn share-btn--linkedin">
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                      <a :href="whatsappShareUrl" target="_blank" rel="noopener noreferrer" title="Share on WhatsApp" class="share-btn share-btn--whatsapp">
                        <i class="fab fa-whatsapp"></i>
                      </a>
                      <a :href="emailShareUrl" title="Share via Email" class="share-btn share-btn--email">
                        <i class="fas fa-envelope"></i>
                      </a>
                      <a href="#" @click.prevent="copyLink" title="Copy Link" class="share-btn share-btn--copy">
                        <i class="fas fa-link"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </ClientOnly>

              <div class="news-details__pagenation-box">
                <ul class="list-unstyled news-details__pagenation">
                  <li v-if="previousProduct">
                    Previous Product
                    <NuxtLink :to="`/products/${previousProduct.slug}`" style="margin-left: 10px;" v-html="previousProduct.title.rendered"></NuxtLink>
                  </li>
                  <li v-if="nextProduct">
                    Next Product
                    <NuxtLink :to="`/products/${nextProduct.slug}`" style="margin-left: 10px;" v-html="nextProduct.title.rendered"></NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5">
            <div class="sidebar">
              <!-- Related Products -->
              <ClientOnly>
                <div v-if="relatedProducts.length > 0" class="sidebar__single sidebar__post">
                  <h3 class="sidebar__title">Related Products</h3>
                  <ul class="sidebar__post-list list-unstyled">
                    <li v-for="relProd in relatedProducts.slice(0, 3)" :key="relProd.id">
                      <div class="sidebar__post-image">
                        <NuxtImg
                          :src="getProductImage(relProd)"
                          :alt="stripHtml(relProd.title.rendered)"
                          preset="thumbnail"
                          loading="lazy"
                          style="width: 70px; height: 70px; object-fit: cover; border-radius: 5px;"
                        />
                      </div>
                      <div class="sidebar__post-content">
                        <h3>
                          <NuxtLink :to="`/products/${relProd.slug}`" v-html="relProd.title.rendered"></NuxtLink>
                        </h3>
                      </div>
                    </li>
                  </ul>
                </div>
              </ClientOnly>

              <!-- Product Categories from API -->
              <ClientOnly>
                <div v-if="allCategories && allCategories.length > 0" class="sidebar__single sidebar__category">
                  <h3 class="sidebar__title">Product Categories</h3>
                  <ul class="sidebar__category-list list-unstyled">
                    <li 
                      v-for="category in allCategories" 
                      :key="category.id"
                      :class="{ active: productCategories.some((pc: any) => pc.id === category.id) }"
                    >
                      <NuxtLink :to="`/products?cat=${category.id}`">
                        {{ category.name }}<span>({{ category.count }})</span>
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </ClientOnly>

              <!-- Contact CTA -->
              <ClientOnly>
                <HaveAnyProject />
              </ClientOnly>

              <!-- Product Categories as Tags -->
              <div v-if="productCategories.length > 0" class="sidebar__single sidebar__tags">
                <h3 class="sidebar__title">Product Categories</h3>
                <div class="sidebar__tags-list">
                  <NuxtLink 
                    v-for="cat in productCategories" 
                    :key="cat.id"
                    :to="`/products?cat=${cat.id}`"
                  >
                    {{ cat.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Product Details End-->
  </div>
</template>

<script setup lang="ts">
import { useHead, navigateTo, useSeoMeta } from '#imports'
import { ref, computed } from 'vue'

// Types
interface WordPressProduct {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt?: { rendered: string }
  product_cat?: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
      taxonomy: string
    }>>
  }
}

interface WordPressProductCategory {
  id: number
  name: string
  count: number
}

const route = useRoute()
const slug = route.params.slug as string

// Initialize product as null
const product = ref<WordPressProduct | null>(null)
const error = ref<string | null>(null)
const pending = ref(true)
const allCategories = ref<WordPressProductCategory[]>([])
const allProducts = ref<WordPressProduct[]>([])

// Previous and next products
const previousProduct = ref<WordPressProduct | null>(null)
const nextProduct = ref<WordPressProduct | null>(null)

// Only fetch if slug is defined and valid
if (slug && slug !== 'undefined' && slug.trim()) {
  const { data: prodData, error: prodError, pending: prodPending } = await useWPProductBySlug(slug)
  product.value = prodData.value
  error.value = prodError.value
  pending.value = prodPending.value

  // Fetch all categories to match with product
  const { data: categoriesData } = await useWPProductCategories()
  allCategories.value = categoriesData.value || []

  // Fetch all products for navigation and related products
  if (product.value) {
    const { data: productsData } = await useWPProducts(100, 1)
    if (productsData.value) {
      allProducts.value = productsData.value
      
      // Find current product index
      const currentIndex = productsData.value.findIndex((p: WordPressProduct) => p.id === product.value!.id)
      
      if (currentIndex !== -1) {
        // Previous product
        if (currentIndex > 0) {
          const prevProd = productsData.value[currentIndex - 1]
          if (prevProd) previousProduct.value = prevProd
        }
        // Next product
        if (currentIndex < productsData.value.length - 1) {
          const nxtProd = productsData.value[currentIndex + 1]
          if (nxtProd) nextProduct.value = nxtProd
        }
      }
    }
  }
} else {
  // Slug is missing, redirect to products page
  navigateTo('/products')
}

// Helper function to strip HTML
const stripHtml = (html: string): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

// Get product categories
const productCategories = computed(() => {
  if (!product.value || !product.value.product_cat || !allCategories.value) return []
  return allCategories.value.filter((cat: WordPressProductCategory) =>
    product.value!.product_cat!.includes(cat.id)
  )
})

// Get product title
const productTitle = computed(() => {
  if (!product.value) return 'Product Details'
  return stripHtml(product.value.title.rendered)
})

// Get product image
const productImage = computed(() => {
  if (!product.value) return ''
  if (product.value._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return product.value._embedded['wp:featuredmedia'][0].source_url
  }
  return '/assets/images/news/placeholder-product.jpg'
})

// Related products (same category, excluding current)
const relatedProducts = computed(() => {
  if (!product.value || productCategories.value.length === 0 || allProducts.value.length === 0) return []
  const categoryId = productCategories.value[0]?.id
  if (!categoryId) return []
  return allProducts.value.filter((p: WordPressProduct) =>
    p.id !== product.value!.id && p.product_cat?.includes(categoryId)
  ).slice(0, 3)
})

// Helper function to get product image from embedded data
const getProductImage = (prod: WordPressProduct): string => {
  if (prod._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return prod._embedded['wp:featuredmedia'][0].source_url
  }
  return '/assets/images/news/placeholder-product.jpg'
}

// Social sharing URLs
const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `https://logic-design-solutions.com/products/${slug}`
})

const shareTitle = computed(() => {
  return product.value?.title?.rendered ? stripHtml(product.value.title.rendered) : 'Product'
})

const shareExcerpt = computed(() => {
  return product.value?.excerpt?.rendered ? stripHtml(product.value.excerpt.rendered).substring(0, 150) : ''
})

const facebookShareUrl = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`
})

const twitterShareUrl = computed(() => {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(shareTitle.value)}`
})

const linkedinShareUrl = computed(() => {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`
})

const whatsappShareUrl = computed(() => {
  return `https://wa.me/?text=${encodeURIComponent(shareTitle.value + ' ' + currentUrl.value)}`
})

const emailShareUrl = computed(() => {
  return `mailto:?subject=${encodeURIComponent(shareTitle.value)}&body=${encodeURIComponent(shareExcerpt.value + '\n\nView product: ' + currentUrl.value)}`
})

const copyLink = async () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(currentUrl.value)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }
}

// Computed for Open Graph
const ogTitle = computed(() => {
  return product.value ? `${stripHtml(product.value.title.rendered)} - Logic Design Solutions` : 'Product Details'
})

const ogDescription = computed(() => {
  return product.value ? stripHtml(product.value.excerpt?.rendered || '').substring(0, 160) : 'FPGA IP Core and Design Solutions'
})

const ogImage = computed(() => {
  return productImage.value || 'https://api.logic-design-solutions.com/wp-content/uploads/2025/12/logo22.png'
})

const ogUrl = computed(() => {
  return `https://logic-design-solutions.com/products/${slug}`
})

// SEO Meta tags
useSeoMeta({
  title: () => ogTitle.value,
  description: () => ogDescription.value,
  ogType: 'product',
  ogTitle: () => ogTitle.value,
  ogDescription: () => ogDescription.value,
  ogImage: () => ogImage.value,
  ogUrl: () => ogUrl.value,
  ogSiteName: 'Logic Design Solutions',
  twitterCard: 'summary_large_image',
  twitterTitle: () => ogTitle.value,
  twitterDescription: () => ogDescription.value,
  twitterImage: () => ogImage.value,
})
</script>

<style scoped>
/* Social Share Buttons */
.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.share-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  color: #ffffff;
}

.share-btn--facebook {
  background: #1877f2;
}
.share-btn--facebook:hover {
  background: #0d65d9;
}

.share-btn--twitter {
  background: #000000;
}
.share-btn--twitter:hover {
  background: #333333;
}

.share-btn--linkedin {
  background: #0a66c2;
}
.share-btn--linkedin:hover {
  background: #084d93;
}

.share-btn--whatsapp {
  background: #25d366;
}
.share-btn--whatsapp:hover {
  background: #1da851;
}

.share-btn--email {
  background: #ff6b35;
}
.share-btn--email:hover {
  background: #e55a2b;
}

.share-btn--copy {
  background: #6c757d;
}
.share-btn--copy:hover {
  background: #5a6268;
}

/* Fix pour les listes dans le contenu produit */
.news-details__text-1 :deep(ul),
.news-details__text-1 :deep(ol) {
  margin: 20px 0;
  padding-left: 40px;
  list-style-position: outside;
  overflow: hidden;
}

.news-details__text-1 :deep(ul) {
  list-style-type: disc;
}

.news-details__text-1 :deep(ol) {
  list-style-type: decimal;
}

.news-details__text-1 :deep(ul ul),
.news-details__text-1 :deep(ol ul) {
  list-style-type: disc;
  margin: 10px 0;
  padding-left: 25px;
}

.news-details__text-1 :deep(li) {
  margin-bottom: 10px;
  display: list-item;
  list-style-position: outside;
}
</style>
