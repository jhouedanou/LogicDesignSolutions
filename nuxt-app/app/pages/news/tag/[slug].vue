<template>
  <div>
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="container">
        <div class="page-banner__inner">
          <h2>{{ tag ? tag.name : 'Tag' }}</h2>
          <Breadcrumb 
            :items="[
              { label: 'Home', to: '/' },
              { label: 'News', to: '/news' },
              { label: tag ? tag.name : 'Tag' }
            ]"
            separator="/"
          />
        </div>
      </div>
    </section>

    <!-- News Section -->
    <section class="news-page" style="padding-top: 100px; padding-bottom: 100px;">
      <div class="container">
        <ClientOnly>
          <div v-if="loading" style="text-align: center; padding: 50px 0;">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else-if="posts.length === 0" style="text-align: center; padding: 50px 0;">
            <p>Aucun article trouvé pour ce tag.</p>
          </div>
          <div v-else class="row">
            <div v-for="post in posts" :key="post.id" class="col-xl-4 col-lg-4">
              <div class="news-one__single">
                <div class="news-one__img">
                  <img 
                    :src="post.featured_media_src_url || '/assets/images/news/news-default.jpg'" 
                    :alt="post.title?.rendered || 'News'" 
                    style="width: 100%; height: 300px; object-fit: cover;"
                  >
                  <NuxtLink :to="`/news/${post.slug}`">
                    <span class="news-one__plus"></span>
                  </NuxtLink>
                </div>
                <div class="news-one__content">
                  <ul class="list-unstyled news-one__meta">
                    <li>
                      <a href="#"><i class="far fa-user-circle"></i> Admin</a>
                    </li>
                    <li>
                      <span>/</span>
                    </li>
                    <li>
                      <a href="#"><i class="fas fa-comments"></i> 2 Comments</a>
                    </li>
                  </ul>
                  <h3 class="news-one__title">
                    <NuxtLink :to="`/news/${post.slug}`" v-html="post.title?.rendered"></NuxtLink>
                  </h3>
                  <p class="news-one__text" v-html="getExcerpt(post)"></p>
                  <div class="news-one__bottom">
                    <div class="news-one__read-more">
                      <NuxtLink :to="`/news/${post.slug}`">
                        Read More <i class="fa fa-arrow-right"></i>
                      </NuxtLink>
                    </div>
                    <div class="news-one__arrow">
                      <NuxtLink :to="`/news/${post.slug}`">
                        <span class="icon-right-arrow"></span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1 && !loading" class="news-sidebar__pagination" style="margin-top: 50px;">
            <ul class="pg-pagination list-unstyled">
              <li class="prev" :class="{ disabled: currentPage === 1 }">
                <a @click.prevent="goToPage(currentPage - 1)" href="#" aria-label="Previous">
                  <i class="fa fa-angle-left"></i>
                </a>
              </li>
              <li 
                v-for="page in totalPages" 
                :key="page" 
                :class="{ active: page === currentPage }"
              >
                <a @click.prevent="goToPage(page)" href="#">{{ page }}</a>
              </li>
              <li class="next" :class="{ disabled: currentPage === totalPages }">
                <a @click.prevent="goToPage(currentPage + 1)" href="#" aria-label="Next">
                  <i class="fa fa-angle-right"></i>
                </a>
              </li>
            </ul>
          </div>

          <template #fallback>
            <div style="text-align: center; padding: 50px 0;">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { fetchPostsByTag, fetchTag } = usePosts()

const slug = route.params.slug as string
const currentPage = ref(1)
const posts = ref<any[]>([])
const totalPages = ref(1)
const total = ref(0)
const tag = ref<any>(null)
const loading = ref(true)
const perPage = 6

// Load tag and posts
const loadTagAndPosts = async () => {
  loading.value = true
  
  try {
    // First, get the tag by slug
    const tagData = await fetchTag(slug)
    
    if (!tagData) {
      throw new Error('Tag not found')
    }
    
    tag.value = tagData
    
    // Then load posts for this tag
    const page = parseInt(route.query.page as string) || 1
    currentPage.value = page
    
    const result = await fetchPostsByTag(tagData.id, page, perPage)
    posts.value = result.posts
    totalPages.value = result.totalPages
    total.value = result.total
  } catch (error) {
    console.error('Error loading tag or posts:', error)
    posts.value = []
  } finally {
    loading.value = false
  }
}

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

// Get excerpt from content
const getExcerpt = (post: any) => {
  if (post.excerpt?.rendered) {
    return post.excerpt.rendered
  }
  
  if (post.content?.rendered) {
    const div = document.createElement('div')
    div.innerHTML = post.content.rendered
    const text = div.textContent || div.innerText || ''
    return text.substring(0, 150) + '...'
  }
  
  return ''
}

// Navigate to page
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  
  router.push({
    path: route.path,
    query: { page }
  })
}

// Watch for route changes
watch(() => route.query.page, () => {
  loadTagAndPosts()
})

// SEO
useHead({
  title: computed(() => tag.value ? `${tag.value.name} - Logic Design Solutions` : 'Tag - Logic Design Solutions'),
  meta: [
    {
      name: 'description',
      content: computed(() => tag.value?.description || `Articles tagged with ${tag.value?.name || 'this tag'}`)
    }
  ]
})

// Load on mount
onMounted(() => {
  loadTagAndPosts()
})
</script>

<style scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
}

.pg-pagination .disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
