<template>
  <div class="news-page">
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <Breadcrumb :items="[
            { label: 'Home', to: '/' },
            { label: 'Blog' }
          ]" />
          <h2 class="page-header__title">Blog</h2>
        </div>
      </div>
    </section>
    <!-- Page Header End -->

    <!-- Blog Start -->
    <section class="news-details">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-7">
            <div class="section-title text-left" style="margin-bottom: 40px;">
              <div class="section-title__tagline-box">
                <p class="section-title__tagline">Insights & Articles</p>
              </div>
              <h2 class="section-title__title">From Our Blog</h2>
            </div>

              <div v-if="loading" class="text-center" style="padding: 50px;">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>

              <div v-else-if="posts.length === 0" class="text-center" style="padding: 50px;">
                <h3>No articles yet</h3>
                <p>Check back soon for new content.</p>
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
                    <div class="news-one__img" style="width: 100%; margin: 0; padding: 0; background-color: #f8f9fa;">
                      <NuxtImg
                        v-if="post.featured_media_src_url"
                        :src="post.featured_media_src_url"
                        :alt="post.title.rendered"
                        width="400"
                        loading="lazy"
                        style="width: 100%; height: auto; display: block;"
                      />
                    </div>
                    <!-- Contenu en dessous -->
                    <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                        <!-- Cartouche de date avec primary color -->
                        <div class="date-cartouche" style="display: inline-block; width: fit-content; background-color: var(--lds-primary); color: white; padding: 8px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);">
                          {{ formatDate(post.date) }}
                        </div>
                        <!-- Catégorie -->
                        <span v-if="getCategoryName(post)" class="category-badge" style="display: inline-block; background-color: #f4f5f8; color: #0a1f44; padding: 8px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                          {{ getCategoryName(post) }}
                        </span>
                      </div>
                      <!-- Titre -->
                      <h3 class="news-one__title" style="font-size: 18px; line-height: 1.3; margin-bottom: 12px;">
                        <NuxtLink :to="`/blog/${post.slug}`" v-html="post.title.rendered"></NuxtLink>
                      </h3>
                      <!-- Excerpt -->
                      <p class="news-one__text" style="font-size: 14px; line-height: 1.6; color: #666; margin-bottom: 15px; flex-grow: 1;">{{ getExcerpt(post.excerpt.rendered) }}</p>
                      <div class="news-one__bottom" style="margin-top: auto;">
                        <div class="news-one__read-more">
                          <NuxtLink :to="`/blog/${post.slug}`" style="font-size: 13px; font-weight: 500; color: #ff6b35; text-decoration: none;">Read More <span class="icon-right-arrow"></span></NuxtLink>
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
    <!-- Blog End -->
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useHead, useRoute, useRouter, useAsyncData } from '#imports'

const route = useRoute()
const router = useRouter()
const { fetchBlogPosts } = useBlogPosts()

const currentPage = computed(() => {
  const page = parseInt(route.query.page as string)
  return Number.isNaN(page) || page < 1 ? 1 : page
})

// Listing rendu côté serveur (SSR) pour l'indexation, re-fetch au changement de page
const { data: blogData, pending: loading } = await useAsyncData(
  'blog-list',
  () => fetchBlogPosts(currentPage.value, 6),
  { watch: [currentPage] }
)

const posts = computed(() => blogData.value?.posts || [])
const totalPages = computed(() => blogData.value?.totalPages || 1)

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

const getCategoryName = (post: any) => {
  const terms = post._embedded?.['wp:term']?.[0]
  return terms && terms.length > 0 ? terms[0].name : null
}

watch(currentPage, () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

useHead({
  title: 'Blog - Logic Design Solutions',
  meta: [
    { name: 'description', content: 'Logic Design Solutions - Blog, Insights & Articles' }
  ],
  link: [
    { rel: 'canonical', href: 'https://logic-design-solutions.com/blog' }
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

.news-item-card:hover .category-badge {
  background-color: #ff6b35;
  color: white;
}

.news-item-card {
  height: 100% !important;
}
</style>
