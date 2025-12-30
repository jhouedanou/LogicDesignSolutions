<template>
  <div>
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <Breadcrumb :items="[
            { label: 'Home', to: '/' },
            { label: 'News', to: '/news' },
            ...(post ? [{ label: post.title.rendered }] : [])
          ]" />
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
                  <p v-if="tags.length > 0" class="news-details__tags">
                    <span>Tags:</span>
                    <NuxtLink 
                      v-for="tag in tags" 
                      :key="tag.id" 
                      :to="`/news/tag/${tag.slug}`"
                    >
                      {{ tag.name }}
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
import { ref, computed } from 'vue'
import { useRoute, useHead, useSeoMeta } from '#imports'

const route = useRoute()
const { fetchPost, fetchPosts, fetchTags } = usePosts()

const post = ref<any>(null)
const recentPosts = ref<any[]>([])
const previousPost = ref<any>(null)
const nextPost = ref<any>(null)
const tags = ref<any[]>([])
const loading = ref(true)

// Social sharing URLs
const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `https://logic-design-solutions.com/news/${slug}`
})

const shareTitle = computed(() => {
  return post.value ? post.value.title.rendered.replace(/<[^>]*>/g, '') : 'Logic Design Solutions - News'
})

const shareDescription = computed(() => {
  return post.value ? post.value.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : ''
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
  return `https://wa.me/?text=${encodeURIComponent(shareTitle.value + ' - ' + currentUrl.value)}`
})

const emailShareUrl = computed(() => {
  return `mailto:?subject=${encodeURIComponent(shareTitle.value)}&body=${encodeURIComponent('Check out this article: ' + currentUrl.value)}`
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Load post data immediately (not in onMounted)
const slug = route.params.slug as string

if (slug) {
  try {
    // Charger l'article principal
    const postData = await fetchPost(slug)
    
    if (postData) {
      post.value = postData
      
      // Charger les tags
      if (postData.tags && postData.tags.length > 0) {
        tags.value = await fetchTags(postData.tags)
      }
      
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

// Computed for Open Graph
const ogTitle = computed(() => {
  return post.value ? post.value.title.rendered.replace(/<[^>]*>/g, '') + ' - Logic Design Solutions' : 'News - Logic Design Solutions'
})

const ogDescription = computed(() => {
  return post.value ? post.value.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : 'Logic Design Solutions - News Article'
})

const ogImage = computed(() => {
  return post.value?.featured_media_src_url || 'https://logic-design-solutions.com/wp-content/uploads/2025/12/logo22.png'
})

const ogUrl = computed(() => {
  return `https://logic-design-solutions.com/news/${slug}`
})

// SEO Meta tags
useSeoMeta({
  title: () => ogTitle.value,
  description: () => ogDescription.value,
  ogType: 'article',
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
.news-details__text {
  font-size: 16px;
  line-height: 1.8;
  color: #6e7387;
}

.news-details__text :deep(p) {
  margin-bottom: 20px;
}

.news-details__text :deep(ul),
.news-details__text :deep(ol) {
  margin: 20px 0;
  padding-left: 40px;
  list-style-position: outside;
  overflow: hidden; /* Empêche le float de casser l'indentation */
}

.news-details__text :deep(ul) {
  list-style-type: disc;
}

.news-details__text :deep(ol) {
  list-style-type: decimal;
}

.news-details__text :deep(ul ul),
.news-details__text :deep(ol ul) {
  list-style-type: disc;
  margin: 10px 0;
  padding-left: 25px;
}

.news-details__text :deep(ul ul ul),
.news-details__text :deep(ol ul ul) {
  list-style-type: disc;
}

.news-details__text :deep(li) {
  margin-bottom: 10px;
  display: list-item; /* Force le comportement de liste */
  list-style-position: outside;
}

.news-details__text :deep(strong) {
  color: #0a1f44;
  font-weight: 600;
}

.news-details__text :deep(sup) {
  font-size: 12px;
}

/* Fix pour les listes à côté des images flottantes */
.news-details__text :deep(img[style*="float"]) + ul,
.news-details__text :deep(img[style*="float"]) + ol,
.news-details__text :deep(.wp-block-image) + ul,
.news-details__text :deep(.wp-block-image) + ol {
  overflow: hidden;
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
</style>
