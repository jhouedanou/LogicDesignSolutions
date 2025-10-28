'use strict'

const fs = require('fs')
const path = require('path')

const SLUGS = [
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
]

const START_MARKERS = [
  '<!--Page Header Start-->',
  '<!-- Main Sllider Start -->',
  '<section class="main-slider-two"'
]

const END_MARKERS = ['<!--Site Footer', '<div class="mobile-nav__wrapper">', '<footer class="site-footer-two"']

const rootDir = path.resolve(__dirname, '..', '..')
const targetDir = path.resolve(__dirname, '..', 'server', 'assets', 'static-pages')

const ensureTargetDir = () => {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
}

const replaceHref = (input) => {
  return input.replace(/href="(?!https?:)(?!mailto:)(?!tel:)([^"#?]+)\.html"/gi, (_match, slug) => {
    const normalized = slug === 'index' ? '/' : `/${slug}`
    return `href="${normalized}"`
  })
}

const replaceSrc = (input) => {
  let output = input.replace(/src="assets\//gi, 'src="/assets/')
  output = output.replace(/url\((['"]?)assets\//gi, 'url($1/assets/')
  return output
}

const extractContent = (html, slug) => {
  let startIndex = -1

  for (const marker of START_MARKERS) {
    const index = html.indexOf(marker)
    if (index !== -1) {
      startIndex = marker.startsWith('<section') ? index : index + marker.length
      break
    }
  }

  if (startIndex === -1) {
    throw new Error(`Unable to locate content start marker for slug "${slug}"`)
  }

  let endIndex = -1
  for (const marker of END_MARKERS) {
    const index = html.indexOf(marker, startIndex)
    if (index !== -1) {
      endIndex = index
      break
    }
  }

  if (endIndex === -1) {
    throw new Error(`Unable to locate content end marker for slug "${slug}"`)
  }

  const raw = html.slice(startIndex, endIndex)
  return replaceSrc(replaceHref(raw)).trim()
}

const sync = () => {
  ensureTargetDir()

  for (const slug of SLUGS) {
    const sourcePath = path.resolve(rootDir, `${slug}.html`)
    const targetPath = path.resolve(targetDir, `${slug}.html`)

    if (!fs.existsSync(sourcePath)) {
      console.warn(`Skipping ${slug}: missing source file at ${sourcePath}`)
      continue
    }

    const html = fs.readFileSync(sourcePath, 'utf-8')
    const content = extractContent(html, slug)
    fs.writeFileSync(targetPath, content, 'utf-8')
    console.log(`✓ Synced ${slug} → ${path.relative(rootDir, targetPath)}`)
  }
}

sync()
