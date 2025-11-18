<template>
  <div class="news-page">
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <Breadcrumb />
          <h2 class="page-header__title">Latest News</h2>
        </div>
      </div>
    </section>
    <!-- Page Header End -->

    <!-- News Start -->
    <section class="news-details">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-7">
            <div class="section-title text-left" style="margin-bottom: 40px;">
              <div class="section-title__tagline-box">
                <p class="section-title__tagline">Latest Updates</p>
              </div>
              <h2 class="section-title__title">News & Announcements</h2>
            </div>

            <div v-if="pending" class="text-center" style="padding: 60px 40px;">
              <div class="spinner" style="display: inline-block; width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #ff6b35; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
              <p style="color: #666; font-size: 16px;">Loading posts...</p>
            </div>

            <div v-else-if="error" class="text-center" style="padding: 60px 40px; color: red;">
              <p>Error loading posts. Please try again later.</p>
            </div>

            <div v-else class="row">
              <!-- Dynamic News Items -->
              <div 
                v-for="(post, index) in posts" 
                :key="post.id"
                class="col-xl-6 col-lg-12 wow fadeInUp" 
                :data-wow-delay="`${(index % 2 + 1) * 100}ms`" 
                style="margin-bottom: 30px;"
              >
                <div class="row" style="border: 1px solid #eeeeee; padding: 0; margin: 0; height: 100%;">
                  <div class="col-xl-4 col-lg-4" style="padding: 10px;">
                    <div class="news-one__img" style="height: 100%;">
                      <img 
                        :src="getPostImage(post)" 
                        :alt="stripHtml(post.title.rendered)" 
                        style="width: 100%; height: 100%; object-fit: cover;" 
                      />
                    </div>
                  </div>
                  <div class="col-xl-8 col-lg-8" style="padding: 20px;">
                    <ul class="news-one__meta list-unstyled">
                      <li><a href="#">{{ formatDate(post.date) }}</a></li>
                      <li><a href="#">NEWS</a></li>
                    </ul>
                    <h3 class="news-one__title">
                      <a :href="`/news-detail?id=${post.id}`" v-html="post.title.rendered"></a>
                    </h3>
                    <p class="news-one__text">{{ getExcerpt(post) }}</p>
                    <div class="news-one__bottom">
                      <div class="news-one__read-more">
                        <a :href="`/news-detail?id=${post.id}`">Read More <span class="icon-right-arrow"></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            <!-- Pagination -->
            <div v-if="!pending && !error && totalPages > 1" class="news-page__pagination" style="text-align: center; margin-top: 40px;">
              <ul class="pg-pagination list-unstyled" style="display: inline-flex; justify-content: center; gap: 10px;">
                <li class="prev" :class="{ disabled: currentPage === 1 }">
                  <a 
                    :href="currentPage > 1 ? `/news?page=${currentPage - 1}` : '#'" 
                    aria-label="Previous"
                    @click.prevent="currentPage > 1 && navigateToPage(currentPage - 1)"
                  >PREV</a>
                </li>
                <li 
                  v-for="page in totalPages" 
                  :key="page"
                  class="count" 
                  :class="{ active: page === currentPage }"
                >
                  <a 
                    :href="`/news?page=${page}`"
                    @click.prevent="navigateToPage(page)"
                  >{{ String(page).padStart(2, '0') }}</a>
                </li>
                <li class="next" :class="{ disabled: currentPage === totalPages }">
                  <a 
                    :href="currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'" 
                    aria-label="Next"
                    @click.prevent="currentPage < totalPages && navigateToPage(currentPage + 1)"
                  >NEXT</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5">
            <div class="sidebar">
              <!-- Subscribe to Newsletter Sidebar -->
              <ClientOnly>
                <HaveAnyProject 
                  title="Subscribe to"
                  subtitle="Our Newsletter"
                  cta=""
                  buttonText="Subscribe"
                buttonLink="#"
              />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- News End -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useHead, useRoute, navigateTo } from '#imports'

interface WordPressPost {
  id: number
  date: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt?: {
    rendered: string
  }
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      alt_text?: string
    }>
  }
}

// Get current page from query params
const route = useRoute()
const currentPage = ref(parseInt(route.query.page as string) || 1)

// Fetch posts with pagination
const perPage = 6
const posts = ref<WordPressPost[]>([])
const { data: postsData, error, pending, totalCount, totalPages } = await useWPPosts(perPage, currentPage.value)

// Update posts when data is available
watch(postsData, (newData) => {
  if (newData) {
    posts.value = newData
  }
}, { immediate: true })

// Helper functions
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '')
}

const getPostImage = (post: WordPressPost) => {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/images/news/default-news.jpg'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

const getExcerpt = (post: WordPressPost) => {
  const excerpt = stripHtml(post.excerpt?.rendered || '')
  return excerpt.length > 150 ? excerpt.substring(0, 150) + '...' : excerpt
}

const navigateToPage = (page: number) => {
  navigateTo(`/news?page=${page}`)
}

useHead({
  title: 'News - Logic Design Solutions',
  meta: [
    { name: 'description', content: 'Logic Design Solutions - Latest News & Updates' }
  ]
})
</script>

<style scoped>
.news-page {
  width: 100%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.pg-pagination .disabled a {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.pg-pagination .active a {
  background-color: #ff6b35;
  color: white;
  font-weight: bold;
}
</style>
