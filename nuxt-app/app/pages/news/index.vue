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

              <div v-else class="row">
                <div 
                  v-for="(post, index) in posts" 
                  :key="post.id"
                  class="col-xl-6 col-lg-12 wow fadeInUp" 
                  :data-wow-delay="`${(index + 1) * 100}ms`" 
                  style="margin-bottom: 30px;"
                >
                  <div class="row" style="border: 1px solid #eeeeee; padding: 0; margin: 0; height: 100%;">
                    <div class="col-xl-4 col-lg-4" style="padding: 10px;">
                      <div class="news-one__img" style="height: 100%;">
                        <NuxtImg
                          v-if="post.featured_media_src_url"
                          :src="post.featured_media_src_url"
                          :alt="post.title.rendered"
                          width="300"
                          height="400"
                          loading="lazy"
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
                        <NuxtLink :to="`/news/${post.slug}`" v-html="post.title.rendered"></NuxtLink>
                      </h3>
                      <p class="news-one__text">{{ getExcerpt(post.excerpt.rendered) }}</p>
                      <div class="news-one__bottom">
                        <div class="news-one__read-more">
                          <NuxtLink :to="`/news/${post.slug}`">Read More <span class="icon-right-arrow"></span></NuxtLink>
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
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
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
</style>
