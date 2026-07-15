<template>
  <div>
    <!-- Page Header Start -->
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <Breadcrumb :items="[
            { label: 'Home', to: '/' },
            { label: 'Blog', to: '/blog' },
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
          <div v-if="loading" class="text-center" style="padding: 100px 0;">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <div v-else-if="post" class="row">
            <div class="col-xl-8 col-lg-7">
              <div class="news-details__left">
                <div v-if="post.featured_media_src_url" class="article-hero">
                  <NuxtImg
                    :src="post.featured_media_src_url"
                    :alt="post.title.rendered"
                    width="1200"
                    height="675"
                    loading="eager"
                    class="article-hero__img"
                  />
                </div>
                <div class="news-details__content">
                  <ul class="article-meta list-unstyled">
                    <li>
                      <span class="icon-calendar"></span>
                      {{ formatDate(post.date) }}
                    </li>
                    <li class="article-meta__dot" aria-hidden="true">·</li>
                    <li>{{ readingTime }} min read</li>
                    <template v-if="authorName">
                      <li class="article-meta__dot" aria-hidden="true">·</li>
                      <li>{{ authorName }}</li>
                    </template>
                    <li v-if="categoryName" class="article-meta__badge">{{ categoryName }}</li>
                  </ul>
                  <h1 class="article-title" v-html="post.title.rendered"></h1>
                  <div class="news-details__text article-body" v-html="post.content.rendered"></div>
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
                <div v-if="previousPost || nextPost" class="article-nav">
                  <NuxtLink v-if="previousPost" :to="`/blog/${previousPost.slug}`" class="article-nav__card article-nav__card--prev">
                    <span class="article-nav__label"><span class="icon-left-arrow"></span> Previous article</span>
                    <span class="article-nav__title" v-html="previousPost.title.rendered"></span>
                  </NuxtLink>
                  <NuxtLink v-if="nextPost" :to="`/blog/${nextPost.slug}`" class="article-nav__card article-nav__card--next">
                    <span class="article-nav__label">Next article <span class="icon-right-arrow"></span></span>
                    <span class="article-nav__title" v-html="nextPost.title.rendered"></span>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-lg-5">
              <div class="sidebar article-sidebar">
                <!-- Recent Posts -->
                <div v-if="recentPosts.length" class="sidebar__single sidebar__post">
                  <h3 class="sidebar__title">Latest Articles</h3>
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
                          <NuxtLink :to="`/blog/${recentPost.slug}`" v-html="recentPost.title.rendered"></NuxtLink>
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
            <NuxtLink to="/blog" class="thm-btn">Back to Blog</NuxtLink>
          </div>
      </div>
    </section>
    <!-- News Detail End -->

    <!-- Brand Partners -->
    <BrandPartners />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useSeoMeta, useAsyncData } from '#imports'

const route = useRoute()
const { fetchPost, fetchTags } = usePosts()
const { fetchBlogPosts, fetchBlogCategory } = useBlogPosts()

const slug = route.params.slug as string

// Article principal rendu côté serveur (SSR) : indispensable pour l'indexation
// et pour que le JSON-LD/style contenus dans le corps sortent dans le HTML initial.
// Restreint à la catégorie Blog tant qu'elle existe côté WordPress.
const { data: post, pending: loading } = await useAsyncData(
  `blog-post-${slug}`,
  async () => {
    const postData = await fetchPost(slug)
    if (!postData) return null
    const category = await fetchBlogCategory()
    if (category && !postData.categories?.includes(category.id)) return null
    return postData
  }
)

const recentPosts = ref<any[]>([])
const previousPost = ref<any>(null)
const nextPost = ref<any>(null)
const tags = ref<any[]>([])

// Social sharing URLs
const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `https://logic-design-solutions.com/blog/${slug}`
})

const shareTitle = computed(() => {
  return post.value ? post.value.title.rendered.replace(/<[^>]*>/g, '') : 'Logic Design Solutions - Blog'
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

const readingTime = computed(() => {
  const text = (post.value?.content?.rendered || '').replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
})

const authorName = computed(() => post.value?._embedded?.author?.[0]?.name || null)

const categoryName = computed(() => {
  const terms = post.value?._embedded?.['wp:term']?.[0]
  return terms && terms.length > 0 ? terms[0].name : null
})

// Données secondaires (sidebar, tags, navigation) chargées côté client :
// pas de valeur SEO, on garde le TTFB serveur minimal
onMounted(async () => {
  const postData = post.value
  if (!postData) return

  try {
    if (postData.tags && postData.tags.length > 0) {
      tags.value = await fetchTags(postData.tags)
    }

    const recentData = await fetchBlogPosts(1, 5)
    recentPosts.value = recentData.posts.filter((p: any) => p.id !== postData.id).slice(0, 4)

    const allPostsData = await fetchBlogPosts(1, 100)
    const allPosts = allPostsData.posts
    const currentIndex = allPosts.findIndex((p: any) => p.id === postData.id)

    if (currentIndex > 0) {
      previousPost.value = allPosts[currentIndex - 1]
    }
    if (currentIndex >= 0 && currentIndex < allPosts.length - 1) {
      nextPost.value = allPosts[currentIndex + 1]
    }
  } catch (error) {
    console.error('Error loading sidebar data:', error)
  }
})

// Computed for Open Graph
const ogTitle = computed(() => {
  return post.value ? post.value.title.rendered.replace(/<[^>]*>/g, '') + ' - Logic Design Solutions' : 'Blog - Logic Design Solutions'
})

const ogDescription = computed(() => {
  return post.value ? post.value.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : 'Logic Design Solutions - Blog Article'
})

// Canonical + image OG pilotables par article (ACF/meta/Yoast, fallback featured image)
// + injection du champ JSON-LD dédié (seo_jsonld) dans le <head>
const { canonical, ogImage } = useArticleSeo(post, '/blog', slug)

const ogUrl = computed(() => canonical.value)

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
/* ---- En-tête d'article ---- */
.article-hero {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
}

.article-hero__img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #6e7387;
  padding: 0;
}

.article-meta li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.article-meta__dot {
  color: #c3c8d4;
}

.article-meta__badge {
  background-color: #ff6b35;
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 8px;
}

.article-title {
  font-size: 34px;
  line-height: 1.2;
  color: #0a1f44;
  font-weight: 700;
  margin-bottom: 30px;
}

/* ---- Corps d'article (v-html WordPress) ---- */
.article-body {
  font-size: 17px;
  line-height: 1.75;
  color: #4a5065;
  max-width: 740px;
}

.article-body :deep(p) {
  margin-bottom: 22px;
}

.article-body :deep(a) {
  color: #ff6b35;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.article-body :deep(a:hover) {
  border-bottom-color: #ff6b35;
}

.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  color: #0a1f44;
  font-weight: 700;
  line-height: 1.3;
  scroll-margin-top: 110px; /* ancres du sommaire sous le header sticky */
}

.article-body :deep(h2) {
  font-size: 26px;
  margin: 48px 0 18px;
  padding-bottom: 12px;
  position: relative;
}

.article-body :deep(h2)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 32px;
  height: 3px;
  background-color: #ff6b35;
  border-radius: 2px;
}

.article-body :deep(h3) {
  font-size: 21px;
  margin: 36px 0 14px;
}

.article-body :deep(h4) {
  font-size: 18px;
  margin: 28px 0 12px;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin: 20px 0;
  padding-left: 40px;
  list-style-position: outside;
  overflow: hidden;
}

.article-body :deep(ul) {
  list-style-type: disc;
}

.article-body :deep(ol) {
  list-style-type: decimal;
}

.article-body :deep(ul ul),
.article-body :deep(ol ul) {
  list-style-type: disc;
  margin: 10px 0;
  padding-left: 25px;
}

.article-body :deep(li) {
  margin-bottom: 10px;
  display: list-item;
  list-style-position: outside;
}

.article-body :deep(strong) {
  color: #0a1f44;
  font-weight: 600;
}

.article-body :deep(sup) {
  font-size: 12px;
}

/* Tableaux (specs, comparatifs) */
.article-body :deep(table) {
  display: block;
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  margin: 28px 0;
  font-size: 15px;
}

.article-body :deep(table th) {
  background-color: #0a1f44;
  color: #ffffff;
  font-weight: 600;
  text-align: left;
  padding: 12px 16px;
  white-space: nowrap;
}

.article-body :deep(table td) {
  padding: 11px 16px;
  border-bottom: 1px solid #e8eaf0;
  color: #4a5065;
}

.article-body :deep(table tbody tr:nth-child(even)) {
  background-color: #f7f8fb;
}

/* Encadrés / citations */
.article-body :deep(blockquote) {
  background-color: #f4f5f8;
  border-left: 3px solid #ff6b35;
  border-radius: 0 6px 6px 0;
  padding: 20px 24px;
  margin: 28px 0;
  color: #0a1f44;
}

.article-body :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

/* Code (public ingénieurs) */
.article-body :deep(code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 14px;
  background-color: #f4f5f8;
  color: #0a1f44;
  padding: 2px 6px;
  border-radius: 4px;
}

.article-body :deep(pre) {
  background-color: #0a1f44;
  color: #e8eaf0;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 28px 0;
  font-size: 14px;
  line-height: 1.6;
}

.article-body :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
}

/* Images du contenu */
.article-body :deep(figure) {
  margin: 28px 0;
}

.article-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}

.article-body :deep(figcaption) {
  text-align: center;
  font-size: 13px;
  color: #8a90a3;
  margin-top: 10px;
}

/* FAQ en <details> */
.article-body :deep(details) {
  border: 1px solid #e8eaf0;
  border-radius: 6px;
  padding: 14px 18px;
  margin: 12px 0;
}

.article-body :deep(summary) {
  color: #0a1f44;
  font-weight: 600;
  cursor: pointer;
}

.article-body :deep(hr) {
  border: 0;
  border-top: 1px solid #e8eaf0;
  margin: 36px 0;
}

/* Fix pour les listes à côté des images flottantes */
.article-body :deep(img[style*="float"]) + ul,
.article-body :deep(img[style*="float"]) + ol,
.article-body :deep(.wp-block-image) + ul,
.article-body :deep(.wp-block-image) + ol {
  overflow: hidden;
}

.article-body :deep(::selection) {
  background-color: rgba(255, 107, 53, 0.2);
}

/* ---- Navigation précédent / suivant ---- */
.article-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 40px;
}

.article-nav__card {
  display: block;
  border: 1px solid #e8eaf0;
  border-radius: 8px;
  padding: 18px 20px;
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.article-nav__card:hover {
  border-color: #ff6b35;
  box-shadow: 0 4px 14px rgba(10, 31, 68, 0.08);
}

.article-nav__card--next {
  text-align: right;
  grid-column: 2;
}

.article-nav__card--prev {
  grid-column: 1;
}

.article-nav__label {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8a90a3;
  margin-bottom: 6px;
}

.article-nav__title {
  display: block;
  color: #0a1f44;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.4;
}

@media (max-width: 575px) {
  .article-nav {
    grid-template-columns: 1fr;
  }
  .article-nav__card--next {
    grid-column: auto;
    text-align: left;
  }
  .article-title {
    font-size: 26px;
  }
}

/* ---- Sidebar sticky ---- */
@media (min-width: 992px) {
  .article-sidebar {
    position: sticky;
    top: 100px;
  }
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

/* Social Share Buttons : sobres par défaut, couleur de la marque au survol */
.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #eef1f6;
  color: #0a1f44;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
  color: #ffffff;
}

.share-btn--facebook:hover {
  background: #1877f2;
}

.share-btn--twitter:hover {
  background: #000000;
}

.share-btn--linkedin:hover {
  background: #0a66c2;
}

.share-btn--whatsapp:hover {
  background: #25d366;
}

.share-btn--email:hover {
  background: #ff6b35;
}

.share-btn--copy:hover {
  background: #6c757d;
}
</style>
