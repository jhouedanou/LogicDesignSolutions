<template>
  <div class="product-detail-page">
    <!-- Page Header Start -->
    <section class="page-header">
            <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.png)">
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <ul class="thm-breadcrumb list-unstyled">
                        <li><a href="/">Home</a></li>
                        <li>-</li>
                        <li><a href="/products">Products</a></li>
                        <li>-</li>
                        <li>Product Details</li>
                    </ul>
                    <h2 class="page-header__title">Product Details</h2>
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

                                <!-- Product Title -->
                                <h3 class="news-details__title-1" v-html="product.title.rendered"></h3>
                                
                                <!-- Featured Image -->
                                <div v-if="productImage" style="float: left; width: 50%; margin-right: 30px; margin-bottom: 20px;">
                                    <img 
                                        :src="productImage" 
                                        :alt="stripHtml(product.title.rendered)" 
                                        style="width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
                                    >
                                </div>
                                
                                <!-- Product Content (Dynamic from WordPress) -->
                                <div class="news-details__text-1" v-html="product.content.rendered"></div>

                                <div style="clear: both;"></div>
                            </div>

                            <div class="news-details__bottom">
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
                                <div class="news-details__social-list">
                                    <a href="#" @click.prevent="shareOnFacebook"><i class="fab fa-facebook"></i></a>
                                    <a href="#" @click.prevent="shareOnTwitter"><i class="fab fa-twitter"></i></a>
                                    <a href="#" @click.prevent="shareOnLinkedIn"><i class="fab fa-linkedin"></i></a>
                                    <a href="#" @click.prevent="copyLink"><i class="fab fa-link"></i></a>
                                </div>
                            </div>

                            <div class="news-details__pagenation-box">
                                <ul class="list-unstyled news-details__pagenation">
                                    <li>Previous Product
                                        <a href="#" style="margin-left: 10px;">NVME HOST ZYNQ ULTRASCALE PLUS IP</a>
                                    </li>
                                    <li>Next Product
                                        <a href="#" style="margin-left: 10px;">ARTIX Ultra Scale Plus NVME HOST IP</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-5">
                        <div class="sidebar">
                            <!-- Related Products -->
                            <div v-if="relatedProducts.length > 0" class="sidebar__single sidebar__post">
                                <h3 class="sidebar__title">Related Products</h3>
                                <ul class="sidebar__post-list list-unstyled">
                                    <li v-for="relProd in relatedProducts.slice(0, 3)" :key="relProd.id">
                                        <div class="sidebar__post-image">
                                            <img 
                                                :src="getProductImage(relProd)" 
                                                :alt="stripHtml(relProd.title.rendered)"
                                                style="width: 70px; height: 70px; object-fit: cover; border-radius: 5px;"
                                            >
                                        </div>
                                        <div class="sidebar__post-content">
                                            <h3>
                                                <NuxtLink :to="`/product-detail?id=${relProd.id}`" v-html="relProd.title.rendered"></NuxtLink>
                                            </h3>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <!-- Product Categories from API -->
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

                            <!-- Contact CTA -->
                            <div class="sidebar__single have-any-project">
                                <div class="have-any-project__bg"
                                    style="background-image: url(/assets/images/backgrounds/contact-us-bg.jpg);">
                                </div>
                                <h3 class="have-any-project__title">Need Custom
                                    <br> IP Solution?
                                    <br> Contact Us
                                </h3>
                                <div class="have-any-project__btn-box">
                                    <NuxtLink to="/contact" class="have-any-project__btn thm-btn">
                                        Get Quote<span class="icon-right-arrow"></span>
                                    </NuxtLink>
                                </div>
                            </div>

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
import { useHead } from '#imports'

// Types are defined in types/global.d.ts
type WordPressProduct = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt?: { rendered: string }
  product_cat?: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
  }
}

type WordPressProductCategory = {
  id: number
  name: string
  count: number
}

const route = useRoute()
const productId = route.query.id as string

if (!productId) {
  navigateTo('/products')
}

// Fetch product details
const { data: product, error, pending } = await useWPProduct(productId)

// Fetch all categories to match with product
const { data: allCategories } = await useWPProductCategories()

// Get product categories
const productCategories = computed(() => {
  if (!product || !product.product_cat || !allCategories) return []
  return allCategories.filter((cat: WordPressProductCategory) => 
    product.product_cat!.includes(cat.id)
  )
})

// Get product image
const productImage = computed(() => {
  if (!product) return ''
  if (product._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return product._embedded['wp:featuredmedia'][0].source_url
  }
  return '/assets/images/news/placeholder-product.jpg'
})

// Fetch related products (same category)
const relatedProducts = ref<WordPressProduct[]>([])
if (product && productCategories.value.length > 0) {
  const categoryId = productCategories.value[0]!.id
  const { data: categoryProducts } = await useWPProducts(6, 1)
  relatedProducts.value = categoryProducts.filter((p: WordPressProduct) => 
    p.id !== product.id && p.product_cat?.includes(categoryId)
  )
}

// Helper function to get product image from embedded data
const getProductImage = (prod: WordPressProduct): string => {
  if (prod._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return prod._embedded['wp:featuredmedia'][0].source_url
  }
  return '/assets/images/news/placeholder-product.jpg'
}

// Helper function to strip HTML
const stripHtml = (html: string): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Social sharing functions
const shareOnFacebook = () => {
  const url = window.location.href
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

const shareOnTwitter = () => {
  const url = window.location.href
  const text = product ? stripHtml(product.title.rendered) : 'Check out this product'
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = window.location.href
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Set page title
useHead({
  title: product ? `${stripHtml(product.title.rendered)} - Logic Design Solutions` : 'Product Details',
  meta: [
    {
      name: 'description',
      content: product ? stripHtml(product.excerpt?.rendered || '') : 'Product details'
    }
  ]
})
</script>
