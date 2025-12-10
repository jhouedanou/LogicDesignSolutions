<template>
  <div>
<section class="page-header">
            <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)">
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
                                <p v-if="postTags.length > 0" class="news-details__tags">
                                    <span>Tags:</span>
                                    <a v-for="tag in postTags" :key="tag.id" :href="`/news?tag=${tag.slug}`">{{ tag.name }}</a>
                                </p>
                                <div class="news-details__social-list">
                                    <a :href="facebookShareUrl" target="_blank" rel="noopener noreferrer" title="Partager sur Facebook"><i class="fab fa-facebook"></i></a>
                                    <a :href="twitterShareUrl" target="_blank" rel="noopener noreferrer" title="Partager sur Twitter/X"><i class="fab fa-twitter"></i></a>
                                    <a :href="linkedinShareUrl" target="_blank" rel="noopener noreferrer" title="Partager sur LinkedIn"><i class="fab fa-linkedin"></i></a>
                                    <a :href="whatsappShareUrl" target="_blank" rel="noopener noreferrer" title="Partager sur WhatsApp"><i class="fab fa-whatsapp"></i></a>
                                    <a :href="emailShareUrl" title="Partager par email"><i class="fas fa-envelope"></i></a>
                                </div>
                            </div>

                            <div v-if="previousPost || nextPost" class="news-details__pagenation-box">
                                <ul class="list-unstyled news-details__pagenation">
                                    <li v-if="previousPost">
                                        Previous Article
                                        <a :href="`/news/${previousPost.slug}`" style="margin-left: 10px;" v-html="previousPost.title.rendered"></a>
                                    </li>
                                    <li v-if="nextPost">
                                        Next Article
                                        <a :href="`/news/${nextPost.slug}`" style="margin-left: 10px;" v-html="nextPost.title.rendered"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-5">
                        <div class="sidebar">
                            <div class="sidebar__single sidebar__search">
                                <form @submit.prevent class="sidebar__search-form" style="position: relative;">
                                    <input 
                                      type="search" 
                                      placeholder="Search news..." 
                                      v-model="searchQuery"
                                      @input="onSearchInput"
                                      @focus="showSuggestions = true"
                                      @blur="hideSuggestionsDelayed"
                                    >
                                    <button type="submit"><i class="icon-search-1"></i></button>
                                    
                                    <!-- Suggestions dropdown -->
                                    <div
                                      v-if="showSuggestions && searchQuery.length >= 2 && filteredPosts.length > 0"
                                      class="search-suggestions"
                                      style="position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 100; max-height: 300px; overflow-y: auto;"
                                    >
                                      <a
                                        v-for="suggestion in filteredPosts"
                                        :key="suggestion.id"
                                        :href="`/news/${suggestion.slug}`"
                                        class="suggestion-item"
                                        style="display: block; padding: 12px 15px; border-bottom: 1px solid #f0f0f0; text-decoration: none; color: #333; transition: background 0.2s; cursor: pointer;"
                                        @click.prevent="goToPost(suggestion.slug)"
                                      >
                                        <span style="font-size: 14px; font-weight: 500;" v-html="highlightMatch(suggestion.title.rendered)"></span>
                                        <span style="display: block; font-size: 11px; color: #999; margin-top: 4px;">{{ formatSearchDate(suggestion.date) }}</span>
                                      </a>
                                    </div>
                                    
                                    <!-- No results message -->
                                    <div 
                                      v-if="showSuggestions && searchQuery.length >= 2 && filteredPosts.length === 0 && !searchLoading" 
                                      style="position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; padding: 15px; text-align: center; color: #999; font-size: 13px; z-index: 100;"
                                    >
                                      No results found for "{{ searchQuery }}"
                                    </div>
                                </form>
                            </div>

                            <!-- Related News Section -->
                            <div v-if="relatedPosts.length > 0" class="sidebar__single sidebar__post">
                                <h3 class="sidebar__title">Related News</h3>
                                <ul class="sidebar__post-list list-unstyled">
                                    <li v-for="relatedPost in relatedPosts" :key="relatedPost.id">
                                        <div class="sidebar__post-image" style="width: 80px; height: 80px; flex-shrink: 0; overflow: hidden; border-radius: 4px;">
                                            <img 
                                              :src="getRelatedPostImage(relatedPost)" 
                                              :alt="stripHtml(relatedPost.title.rendered)"
                                              style="width: 100%; height: 100%; object-fit: cover;"
                                            >
                                        </div>
                                        <div class="sidebar__post-content" style="margin-left: 15px;">
                                            <h4 style="font-size: 14px; line-height: 1.4; margin: 0 0 5px 0;">
                                                <a :href="`/news/${relatedPost.slug}`" v-html="relatedPost.title.rendered" style="color: #333; text-decoration: none;"></a>
                                            </h4>
                                            <span style="font-size: 12px; color: #999;">{{ formatSearchDate(relatedPost.date) }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
<HaveAnyProject />
                        
                            <!-- <div class="sidebar__single sidebar__tags">
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
                            </div> -->
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
interface WordPressTag {
  id: number
  name: string
  slug: string
}

interface WordPressPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt?: { rendered: string }
  date: string
  featured_media: number
  tags?: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      alt_text?: string
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
      taxonomy: string
    }>>
  }
}

const route = useRoute()
const postId = route.query.id as string

// Redirect old URLs to new slug-based URLs
// This will be done after fetching the post to get its slug

// Initialize post
const post = ref<WordPressPost | null>(null)
const error = ref<any>(null)
const pending = ref(true)

// Initialize adjacent posts
const previousPost = ref<WordPressPost | null>(null)
const nextPost = ref<WordPressPost | null>(null)

// Search functionality
const searchQuery = ref('')
const showSuggestions = ref(false)
const searchLoading = ref(false)
const allPosts = ref<WordPressPost[]>([])

// Related posts (excluding current post)
const relatedPosts = computed(() => {
  if (!post.value || allPosts.value.length === 0) return []
  return allPosts.value
    .filter(p => p.id !== post.value!.id)
    .slice(0, 4) // Show max 4 related posts
})

// Get tags from post
const postTags = computed(() => {
  if (!post.value?._embedded?.['wp:term']) return []
  // wp:term contains arrays of terms, tags are usually in the second array (index 1)
  // but we filter by taxonomy to be sure
  const allTerms = post.value._embedded['wp:term'].flat()
  return allTerms.filter(term => term.taxonomy === 'post_tag')
})

// Social sharing URLs
const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `https://logic-design-solutions.com/news/${post.value?.slug || postId}`
})

const shareTitle = computed(() => {
  return post.value?.title?.rendered ? stripHtml(post.value.title.rendered) : 'News'
})

const shareExcerpt = computed(() => {
  return post.value?.excerpt?.rendered ? stripHtml(post.value.excerpt.rendered).substring(0, 150) : ''
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
  return `mailto:?subject=${encodeURIComponent(shareTitle.value)}&body=${encodeURIComponent(shareExcerpt.value + '\n\nLire l\'article: ' + currentUrl.value)}`
})

// Filtered posts based on search query
const filteredPosts = computed(() => {
  if (searchQuery.value.length < 2) return []
  const query = searchQuery.value.toLowerCase()
  return allPosts.value
    .filter(p => {
      const title = stripHtml(p.title.rendered).toLowerCase()
      const excerpt = stripHtml(p.excerpt?.rendered || '').toLowerCase()
      return title.includes(query) || excerpt.includes(query)
    })
    .slice(0, 5) // Limit to 5 suggestions
})

// Search input handler
const onSearchInput = () => {
  showSuggestions.value = true
}

// Hide suggestions with delay (to allow click on suggestion)
const hideSuggestionsDelayed = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// Navigate to post
const goToPost = (postSlug: string) => {
  showSuggestions.value = false
  navigateTo(`/news/${postSlug}`)
}

// Highlight matching text
const highlightMatch = (text: string) => {
  if (searchQuery.value.length < 2) return text
  const cleanText = stripHtml(text)
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return cleanText.replace(regex, '<mark style="background: #fff3cd; padding: 0 2px;">$1</mark>')
}

// Format date for search results
const formatSearchDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

// Get related post image
const getRelatedPostImage = (relatedPost: WordPressPost) => {
  if (relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return relatedPost._embedded['wp:featuredmedia'][0].source_url
  }
  return '/assets/images/news/default-news.jpg'
}

// Fetch post if ID is valid
if (postId && postId !== 'undefined' && postId.trim()) {
  try {
    const { data: postData, error: postError, pending: postPending } = await useWPPost(postId)
    post.value = postData.value
    error.value = postError.value
    pending.value = postPending.value

    // Redirect to new slug-based URL if post loaded successfully
    if (post.value?.slug) {
      navigateTo(`/news/${post.value.slug}`, { replace: true, redirectCode: 301 })
    }

    // Fetch all posts to find previous and next
    if (post.value) {
      try {
        const { data: allPostsData } = await useWPPosts(100, 1) // Fetch a large number to get all posts
        if (allPostsData.value) {
          // Store all posts for search and related posts
          allPosts.value = allPostsData.value
          
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

/* Search suggestions */
.suggestion-item:hover {
  background-color: #f8f9fa !important;
}

.suggestion-item:last-child {
  border-bottom: none !important;
}

/* Related posts */
.sidebar__post-list li {
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar__post-list li:last-child {
  border-bottom: none;
}

.sidebar__post-list li:hover h4 a {
  color: #ff6b35 !important;
}
</style>
