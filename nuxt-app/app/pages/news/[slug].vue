<template>
  <div>
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <ul class="thm-breadcrumb list-unstyled">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li>-</li>
            <li><NuxtLink to="/news">News</NuxtLink></li>
            <li v-if="post">-</li>
            <li v-if="post">{{ post.title.rendered }}</li>
          </ul>
          <h2 v-if="post" class="page-header__title" v-html="post.title.rendered"></h2>
        </div>
      </div>
    </section>
    <!-- Page Header End -->

    <!-- News Detail Start -->
    <section class="news-details">
      <div class="container">
        <ClientOnly>
          <div v-if="loading" class="text-center" style="padding: 100px 0;">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <div v-else-if="post" class="row">
            <div class="col-xl-8 col-lg-7">
              <div class="news-details__left">
                <div class="news-details__img">
                  <NuxtImg
                    v-if="post.featured_media_src_url"
                    :src="post.featured_media_src_url"
                    :alt="post.title.rendered"
                    width="800"
                    height="600"
                    loading="eager"
                    style="width: 100%; height: auto;"
                  />
                </div>
                <div class="news-details__content">
                  <ul class="news-details__meta list-unstyled">
                    <li>
                      <span class="icon-calendar"></span>
                      {{ formatDate(post.date) }}
                    </li>
                    <li>
                      <span class="icon-user"></span>
                      By Admin
                    </li>
                    <li>
                      <span class="icon-tag"></span>
                      News
                    </li>
                  </ul>
                  <h3 class="news-details__title" v-html="post.title.rendered"></h3>
                  <div class="news-details__text" v-html="post.content.rendered"></div>
                </div>

                <!-- Social Share -->
                <div class="news-details__bottom" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eeeeee;">
                  <p class="news-details__tags">
                    <span>Tags:</span>
                    <a href="#">FPGA</a>
                    <a href="#">NVMe</a>
                    <a href="#">IP</a>
                  </p>
                  <div class="news-details__social-list">
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                    <a href="#"><i class="fab fa-pinterest-p"></i></a>
                  </div>
                </div>

                <!-- Navigation -->
                <div class="news-details__pagenation-box" style="margin-top: 40px;">
                  <ul class="list-unstyled news-details__pagenation">
                    <li v-if="previousPost">
                      <NuxtLink :to="`/news/${previousPost.slug}`">
                        <span class="icon-left-arrow"></span> Previous
                      </NuxtLink>
                    </li>
                    <li v-if="nextPost">
                      <NuxtLink :to="`/news/${nextPost.slug}`">
                        Next <span class="icon-right-arrow"></span>
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-lg-5">
              <div class="sidebar">
                <!-- Recent Posts -->
                <div class="sidebar__single sidebar__post">
                  <h3 class="sidebar__title">Latest News</h3>
                  <ul class="sidebar__post-list list-unstyled">
                    <li v-for="recentPost in recentPosts" :key="recentPost.id">
                      <div class="sidebar__post-image">
                        <NuxtImg
                          v-if="recentPost.featured_media_src_url"
                          :src="recentPost.featured_media_src_url"
                          :alt="recentPost.title.rendered"
                          width="70"
                          height="70"
                          loading="lazy"
                        />
                      </div>
                      <div class="sidebar__post-content">
                        <h3>
                          <NuxtLink :to="`/news/${recentPost.slug}`" v-html="recentPost.title.rendered"></NuxtLink>
                        </h3>
                        <p class="sidebar__post-date">
                          <span class="icon-calendar"></span>
                          {{ formatDate(recentPost.date) }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <!-- Contact CTA -->
                <ClientOnly>
                  <HaveAnyProject />
                </ClientOnly>
              </div>
            </div>
          </div>

          <div v-else class="text-center" style="padding: 100px 0;">
            <h3>Article not found</h3>
            <p>The article you're looking for doesn't exist.</p>
            <NuxtLink to="/news" class="thm-btn">Back to News</NuxtLink>
          </div>
        </ClientOnly>
      </div>
    </section>
    <!-- News Detail End -->

    <!-- Brand Partners -->
    <BrandPartners />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useHead } from '#imports'

const route = useRoute()
const { fetchPost, fetchPosts } = usePosts()

const post = ref<any>(null)
const recentPosts = ref<any[]>([])
const previousPost = ref<any>(null)
const nextPost = ref<any>(null)
const loading = ref(true)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const loadPost = async () => {
  loading.value = true
  const slug = route.params.slug as string
  
  try {
    // Charger l'article principal
    const postData = await fetchPost(slug)
    
    if (postData) {
      post.value = postData
      
      // Charger les articles récents
      const recentData = await fetchPosts(1, 5)
      recentPosts.value = recentData.posts.filter((p: any) => p.id !== postData.id).slice(0, 4)
      
      // Charger tous les posts pour la navigation
      const allPostsData = await fetchPosts(1, 100)
      const allPosts = allPostsData.posts
      const currentIndex = allPosts.findIndex((p: any) => p.id === postData.id)
      
      if (currentIndex > 0) {
        previousPost.value = allPosts[currentIndex - 1]
      }
      if (currentIndex < allPosts.length - 1) {
        nextPost.value = allPosts[currentIndex + 1]
      }
    }
  } catch (error) {
    console.error('Error loading post:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadPost()
})

useHead(() => ({
  title: post.value ? `${post.value.title.rendered} - Logic Design Solutions` : 'News - Logic Design Solutions',
  meta: [
    { 
      name: 'description', 
      content: post.value ? post.value.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : 'Logic Design Solutions - News Article' 
    }
  ]
}))
</script>

<style scoped>
.news-details__text {
  font-size: 16px;
  line-height: 1.8;
  color: #6e7387;
}

.news-details__text :deep(p) {
  margin-bottom: 20px;
}

.news-details__text :deep(ul) {
  margin: 20px 0;
  padding-left: 25px;
}

.news-details__text :deep(li) {
  margin-bottom: 10px;
}

.news-details__text :deep(strong) {
  color: #0a1f44;
  font-weight: 600;
}

.news-details__text :deep(sup) {
  font-size: 12px;
}

.sidebar__post-list {
  list-style: none;
  padding: 0;
}

.sidebar__post-list li {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eeeeee;
}

.sidebar__post-list li:first-child {
  padding-top: 0;
}

.sidebar__post-list li:last-child {
  border-bottom: none;
}

.sidebar__post-image {
  flex-shrink: 0;
}

.sidebar__post-image img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
}

.sidebar__post-content h3 {
  font-size: 16px;
  margin-bottom: 5px;
  line-height: 1.4;
}

.sidebar__post-date {
  font-size: 13px;
  color: #6e7387;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
