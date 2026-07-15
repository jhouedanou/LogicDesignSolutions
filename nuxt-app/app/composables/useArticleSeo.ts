import { computed, type Ref } from 'vue'
import { useHead } from '#imports'

const SITE_URL = 'https://logic-design-solutions.com'
const FALLBACK_OG_IMAGE = 'https://api.logic-design-solutions.com/wp-content/uploads/2025/12/logo22.png'

/**
 * SEO par article (WordPress headless) :
 * - canonical pilotable via champ dédié (ACF `canonical_url`, meta, ou Yoast), sinon URL du site
 * - image OG pilotable via champ dédié (ACF `og_image`, Yoast), sinon featured image
 * - JSON-LD injecté dans le <head> depuis un champ dédié (ACF/meta `seo_jsonld`).
 *   Les <script type="application/ld+json"> présents dans le corps de l'article ne sont
 *   PAS retirés : ils sont rendus tels quels via v-html côté SSR.
 */
export const useArticleSeo = (post: Ref<any>, basePath: string, slug: string) => {
  const canonical = computed(() => {
    const p = post.value
    return (
      p?.acf?.canonical_url ||
      p?.meta?.canonical_url ||
      p?.yoast_head_json?.canonical ||
      `${SITE_URL}${basePath}/${slug}`
    )
  })

  const ogImage = computed(() => {
    const p = post.value
    const acfImage = p?.acf?.og_image
    return (
      (typeof acfImage === 'string' ? acfImage : acfImage?.url) ||
      p?.meta?.og_image ||
      p?.yoast_head_json?.og_image?.[0]?.url ||
      p?.featured_media_src_url ||
      FALLBACK_OG_IMAGE
    )
  })

  const jsonLdBlocks = computed<string[]>(() => {
    const p = post.value
    if (!p) return []
    const blocks: string[] = []
    const dedicated = p.acf?.seo_jsonld || p.meta?.seo_jsonld
    if (dedicated) {
      blocks.push(typeof dedicated === 'string' ? dedicated : JSON.stringify(dedicated))
    }
    return blocks
  })

  useHead({
    link: [{ rel: 'canonical', href: () => canonical.value }],
    script: () =>
      jsonLdBlocks.value.map((json, i) => ({
        key: `article-jsonld-${i}`,
        type: 'application/ld+json',
        innerHTML: json
      }))
  })

  return { canonical, ogImage }
}
