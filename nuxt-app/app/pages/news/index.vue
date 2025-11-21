<template>
  <div class="news-page">
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <Breadcrumb :items="[
            { label: 'Home', to: '/' },
            { label: 'News' }
          ]" />
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

            <ClientOnly>
              <div v-if="loading" class="text-center" style="padding: 50px;">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>

              <div v-else class="row" style="margin: 0 -15px;">
                <div 
                  v-for="(post, index) in posts" 
                  :key="post.id"
                  class="col-xl-6 col-lg-6 col-md-6 col-sm-12 wow fadeInUp" 
                  :data-wow-delay="`${(index + 1) * 100}ms`" 
                  style="margin-bottom: 40px; padding: 0 15px;"
                >
                  <div class="news-item-card" style="border: 1px solid #eeeeee; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); height: 100%; display: flex; flex-direction: column; width: 100%;">
                    <!-- Image en pleine largeur en haut -->
                    <div class="news-one__img" style="width: 100%; height: 200px; overflow: hidden; margin: 0; padding: 0;">
                      <NuxtImg
                        v-if="post.featured_media_src_url"
                        :src="post.featured_media_src_url"
                        :alt="post.title.rendered"
                        width="400"
                        height="200"
                        loading="lazy"
                        style="width: 100%; height: 100%; object-fit: cover; background-color: #f8f9fa; display: block;"
                      />
                    </div>
                    <!-- Contenu en dessous -->
                    <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                      <!-- Cartouche de date en dessous avec primary color -->
                      <div class="date-cartouche" style="display: inline-block; width: fit-content; background-color: var(--lds-primary); color: white; padding: 8px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);">
                        {{ formatDate(post.date) }}
                      </div>
                      <!-- Titre -->
                      <h3 class="news-one__title" style="font-size: 18px; line-height: 1.3; margin-bottom: 12px;">
                        <NuxtLink :to="`/news/${post.slug}`" v-html="post.title.rendered"></NuxtLink>
                      </h3>
                      <!-- Excerpt -->
                      <p class="news-one__text" style="font-size: 14px; line-height: 1.6; color: #666; margin-bottom: 15px; flex-grow: 1;">{{ getExcerpt(post.excerpt.rendered) }}</p>
                      <div class="news-one__bottom" style="margin-top: auto;">
                        <div class="news-one__read-more">
                          <NuxtLink :to="`/news/${post.slug}`" style="font-size: 13px; font-weight: 500; color: #ff6b35; text-decoration: none;">Read More <span class="icon-right-arrow"></span></NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pagination -->
            <div v-if="!loading && totalPages > 1" class="news-page__pagination" style="text-align: center; margin-top: 40px;">
              <ul class="pg-pagination list-unstyled" style="display: inline-flex; justify-content: center; gap: 10px;">
                <li class="prev" :class="{ disabled: currentPage === 1 }">
                  <a @click.prevent="goToPage(currentPage - 1)" href="#" aria-label="Previous">PREV</a>
                </li>
                <li 
                  v-for="page in totalPages" 
                  :key="page"
                  class="count" 
                  :class="{ active: page === currentPage }"
                >
                  <a @click.prevent="goToPage(page)" href="#">{{ String(page).padStart(2, '0') }}</a>
                </li>
                <li class="next" :class="{ disabled: currentPage === totalPages }">
                  <a @click.prevent="goToPage(currentPage + 1)" href="#" aria-label="Next">NEXT</a>
                </li>
              </ul>
            </div>
            </ClientOnly>
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
                buttonLink="/contact"
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
import { ref, onMounted, watch } from 'vue'
import { useHead, useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()
const { fetchPosts } = usePosts()

const posts = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(true)

const loadPosts = async (page: number) => {
  loading.value = true
  const result = await fetchPosts(page, 6)
  posts.value = result.posts
  totalPages.value = result.totalPages
  currentPage.value = result.currentPage
  loading.value = false
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  router.push({ query: { page: page.toString() } })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const getExcerpt = (content: string, maxLength: number = 150) => {
  const text = content.replace(/<[^>]*>/g, '')
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

onMounted(async () => {
  const pageQuery = route.query.page
  const page = pageQuery ? parseInt(pageQuery as string) : 1
  currentPage.value = page
  await loadPosts(page)
})

watch(() => route.query.page, async (newPage) => {
  const page = newPage ? parseInt(newPage as string) : 1
  await loadPosts(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

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

.news-item-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.news-item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.news-one__meta li {
  display: inline-block;
  margin-right: 15px;
  color: #888;
}

.news-one__meta li a {
  color: #888;
  text-decoration: none;
}

.news-one__title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.news-one__title a:hover {
  color: #ff6b35;
}

.news-one__read-more a {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.news-one__read-more a:hover {
  color: #e55a2b;
}

.date-cartouche {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  }
  50% {
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.5);
  }
  100% {
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  }
}

.news-one__category span {
  transition: all 0.3s ease;
}

.news-item-card:hover .news-one__category span {
  background-color: #ff6b35;
  color: white;
}

.news-item-card {
  height: 100% !important;
}
</style>
