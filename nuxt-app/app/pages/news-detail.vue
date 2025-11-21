<template>
  <div>
<section class="page-header">
            <div 
              class="page-header-bg" 
              :style="{
                'background-image': post && postImage ? `url(${postImage})` : 'url(/assets/images/backgrounds/logic-slider-2.webp)',
                'background-size': 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat'
              }"
            >
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <Breadcrumb :items="[
                        { label: 'Home', to: '/' },
                        { label: 'News', to: '/news' },
                        { label: postTitle }
                    ]" />
                    <h2 class="page-header__title">{{ postTitle }}</h2>
                </div>
            </div>
        </section>
        <!--Page Header End-->

        <!--News Details Start-->
        <section class="news-details">
            <div class="container">
                <div v-if="pending" class="text-center" style="padding: 60px;">
                    <div class="spinner" style="display: inline-block; width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #ff6b35; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
                    <p style="color: #666; font-size: 16px;">Loading post...</p>
                </div>

                <div v-else-if="error || !post" class="text-center" style="padding: 60px; color: red;">
                    <p>Post not found or error loading details.</p>
                    <a href="/news" class="thm-btn" style="margin-top: 20px;">
                        Back to News<span class="icon-right-arrow"></span>
                    </a>
                </div>

                <div v-else class="row">
                    <div class="col-xl-8 col-lg-7">
                        <div class="news-details__left">
                            <div class="news-details__content">
                                <h3 class="news-details__title-1" v-html="post.title.rendered"></h3>
                                
                                <div v-html="post.content.rendered" class="news-content"></div>
                            </div>

                            <div class="news-details__bottom">
                                <p class="news-details__tags">
                                    <span>Tags:</span>
                                    <a href="#">NVMe</a>
                                    <a href="#">Gen5</a>
                                    <a href="#">AGILEX 7</a>
                                    <a href="#">Intel</a>
                                    <a href="#">FPGA</a>
                                </p>
                                <div class="news-details__social-list">
                                    <a href="#"><i class="fab fa-facebook"></i></a>
                                    <a href="#"><i class="fab fa-twitter"></i></a>
                                    <a href="#"><i class="fab fa-linkedin"></i></a>
                                    <a href="#"><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>

                            <div v-if="previousPost || nextPost" class="news-details__pagenation-box">
                                <ul class="list-unstyled news-details__pagenation">
                                    <li v-if="previousPost">
                                        Previous Article
                                        <a :href="`/news-detail?id=${previousPost.id}`" style="margin-left: 10px;" v-html="previousPost.title.rendered"></a>
                                    </li>
                                    <li v-if="nextPost">
                                        Next Article
                                        <a :href="`/news-detail?id=${nextPost.id}`" style="margin-left: 10px;" v-html="nextPost.title.rendered"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-5">
                        <div class="sidebar">
                            <div class="sidebar__single sidebar__search">
                                <form action="#" class="sidebar__search-form">
                                    <input type="search" placeholder="Search news...">
                                    <button type="submit"><i class="icon-search-1"></i></button>
                                </form>
                            </div>

                            <div class="sidebar__single have-any-project">
                                <div class="have-any-project__bg"
                                    style="background-image: url(/assets/images/backgrounds/contact-us-bg.jpg);">
                                </div>
                                <h3 class="have-any-project__title">Subscribe to
                                    <br> Our Newsletter
                                </h3>
                                <div class="have-any-project__btn-box">
                                    <NuxtLink to="/contact" class="have-any-project__btn thm-btn">Subscribe<span
                                            class="icon-right-arrow"></span></NuxtLink>
                                </div>
                            </div>

                            <div class="sidebar__single sidebar__tags">
                                <h3 class="sidebar__title">Popular Tags</h3>
                                <div class="sidebar__tags-list">
                                    <a href="#">NVMe</a>
                                    <a href="#">FPGA</a>
                                    <a href="#">IP Core</a>
                                    <a href="#">ARINC 429</a>
                                    <a href="#">Gen5</a>
                                    <a href="#">AMD</a>
                                    <a href="#">Intel</a>
                                    <a href="#">Release</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--News Details End-->
    </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

// Types
interface WordPressPost {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt?: { rendered: string }
  date: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      alt_text?: string
    }>
  }
}

const route = useRoute()
const postId = route.query.id as string

// Initialize post
const post = ref<WordPressPost | null>(null)
const error = ref<any>(null)
const pending = ref(true)

// Initialize adjacent posts
const previousPost = ref<WordPressPost | null>(null)
const nextPost = ref<WordPressPost | null>(null)

// Fetch post if ID is valid
if (postId && postId !== 'undefined' && postId.trim()) {
  try {
    const { data: postData, error: postError, pending: postPending } = await useWPPost(postId)
    post.value = postData.value
    error.value = postError.value
    pending.value = postPending.value

    // Fetch all posts to find previous and next
    if (post.value) {
      try {
        const { data: allPostsData } = await useWPPosts(100, 1) // Fetch a large number to get all posts
        if (allPostsData.value) {
          const currentIndex = allPostsData.value.findIndex((p: WordPressPost) => p.id === post.value!.id)
          
          if (currentIndex !== -1) {
            // Previous post is the one after in the array (newer post)
            if (currentIndex > 0) {
              const prevPost = allPostsData.value[currentIndex - 1]
              if (prevPost) previousPost.value = prevPost
            }
            
            // Next post is the one before in the array (older post)
            if (currentIndex < allPostsData.value.length - 1) {
              const nxtPost = allPostsData.value[currentIndex + 1]
              if (nxtPost) nextPost.value = nxtPost
            }
          }
        }
      } catch (navError) {
        console.error('Error loading adjacent posts:', navError)
      }
    }
  } catch (e) {
    error.value = e
    pending.value = false
  }
} else {
  // No ID provided, redirect to news page
  navigateTo('/news')
}

// Get post title
const postTitle = computed(() => {
  if (!post.value) return 'News Details'
  return stripHtml(post.value.title.rendered)
})

// Get post image
const postImage = computed(() => {
  if (!post.value) return ''
  if (post.value._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post.value._embedded['wp:featuredmedia'][0].source_url
  }
  return ''
})

// Helper function to strip HTML
const stripHtml = (html: string): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: months[date.getMonth()]
  }
}

// Set page title and meta
useHead({
  title: post.value ? `${stripHtml(post.value.title.rendered)} - Logic Design Solutions` : 'News Details',
  meta: [
    {
      name: 'description',
      content: post.value ? stripHtml(post.value.excerpt?.rendered || '') : 'News details'
    }
  ]
})
</script>

<style scoped>
.news-content :deep(p) {
  margin-bottom: 20px;
  line-height: 1.8;
}

.news-content :deep(h2),
.news-content :deep(h3),
.news-content :deep(h4) {
  margin-top: 30px;
  margin-bottom: 15px;
}

.news-content :deep(img) {
  max-width: 100%;
  height: auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
