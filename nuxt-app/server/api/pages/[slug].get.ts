import { createError } from 'h3'
import { useStorage } from '#imports'

const SUPPORTED_SLUGS = new Set([
  'index',
  'services',
  'contact',
  'profiles',
  'products',
  'product-detail',
  'product-category',
  'news',
  'news-detail',
  'references'
])

const startMarkers = [
  '<!--Page Header Start-->',
  '<!-- Main Sllider Start -->',
  '<section class="main-slider-two"'
]

const endMarkers = ['<!--Site Footer', '<div class="mobile-nav__wrapper">', '<footer class="site-footer-two"']

const replaceHref = (input: string) => {
  return input.replace(/href="(?!https?:)(?!mailto:)(?!tel:)([^"#?]+)\.html"/gi, (_match, slug) => {
    const normalized = slug === 'index' ? '/' : `/${slug}`
    return `href="${normalized}"`
  })
}

const replaceSrc = (input: string) => {
  let output = input.replace(/src="assets\//gi, 'src="/assets/')
  output = output.replace(/url\((['"]?)assets\//gi, 'url($1/assets/')
  return output
}

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params as { slug: string }

  if (!SUPPORTED_SLUGS.has(slug)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Static page for slug "${slug}" not found`
    })
  }

  const fileContent = await readFromServerAssets(slug)

  if (!fileContent) {
    throw createError({
      statusCode: 500,
      statusMessage: `Static page asset for slug "${slug}" is missing`
    })
  }

  let startIndex = -1

  for (const marker of startMarkers) {
    const index = fileContent.indexOf(marker)
    if (index !== -1) {
      startIndex = marker.startsWith('<section') ? index : index + marker.length
      break
    }
  }

  if (startIndex === -1) {
    throw createError({
      statusCode: 500,
      statusMessage: `Unable to locate content start for slug "${slug}"`
    })
  }

  let endIndex = -1
  for (const marker of endMarkers) {
    const index = fileContent.indexOf(marker, startIndex)
    if (index !== -1) {
      endIndex = index
      break
    }
  }

  if (endIndex === -1) {
    throw createError({
      statusCode: 500,
      statusMessage: `Unable to locate content end for slug "${slug}"`
    })
  }

  const rawContent = fileContent.slice(startIndex, endIndex)

  const sanitized = replaceSrc(replaceHref(rawContent))

  return {
    html: sanitized.trim()
  }
})

const readFromServerAssets = async (slug: string) => {
  const storage = useStorage('assets:server')
  const key = `static-pages/${slug}.html`
  const asset = await storage.getItem(key)

  if (!asset) {
    return null
  }

  if (typeof asset === 'string') {
    return asset
  }

  if (typeof asset === 'object' && asset !== null && 'toString' in asset) {
    return (asset as { toString: (encoding?: string) => string }).toString('utf-8')
  }

  return null
}
