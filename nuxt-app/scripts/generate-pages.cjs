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

const TITLES = {
  index: 'Logic Design Solutions - FPGA Design Services & IP Solutions',
  services: 'Services - Logic Design Solutions',
  contact: 'Contact Us - Logic Design Solutions',
  profiles: 'Company Profile - Logic Design Solutions',
  products: 'Products - Logic Design Solutions',
  'product-detail': 'Kintex Ultra Scale Plus NVMe Host IP - Logic Design Solutions',
  'product-category': 'NVMe Host IP - Product Category - Logic Design Solutions',
  news: 'News - Logic Design Solutions',
  'news-detail': 'Gen 5 NVMe Host IP on AGILEX 7 R-Tile - Logic Design Solutions',
  references: 'References - Logic Design Solutions'
}

const DESCRIPTIONS = {
  index: 'Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP',
  services: 'Logic Design Solutions - FPGA Design Services & IP Solutions',
  contact: 'Contact Logic Design Solutions - Get in touch with our FPGA experts',
  profiles: 'Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP',
  products: 'Logic Design Solutions - FPGA IP Cores: NVMe, SATA, ARINC 429, Ethernet',
  'product-detail': 'Kintex Ultra Scale Plus NVMe Host IP - High-performance NVMe IP solution for FPGA applications',
  'product-category': 'NVMe Host IP Solutions - High-performance NVMe IP cores for FPGA applications',
  news: 'Logic Design Solutions - Latest News & Updates',
  'news-detail': 'Logic Design Solutions - News Details',
  references: 'Logic Design Solutions - Our References & History'
}

const START_MARKERS = [
  '<!--Page Header Start-->',
  '<!-- Main Sllider Start -->',
  '<section class="main-slider-two"'
]

const END_MARKERS = ['<!--Site Footer', '<div class="mobile-nav__wrapper">', '<footer class="site-footer-two"']

const rootDir = path.resolve(__dirname, '..')
const pagesDir = path.resolve(rootDir, 'app/pages')
const sourceRoot = path.resolve(rootDir, '..')

const ensureSubDir = () => {
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true })
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

const escapeVueTemplate = (html) => {
  // Escape curly braces that Vue would interpret as expressions
  return html.replace(/\{\{/g, '{{ "{{" }}').replace(/\}\}/g, '{{ "}}" }}')
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
    throw new Error(`Unable to locate content start for slug "${slug}"`)
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
    throw new Error(`Unable to locate content end for slug "${slug}"`)
  }

  const raw = html.slice(startIndex, endIndex)
  return escapeVueTemplate(replaceSrc(replaceHref(raw)).trim())
}

const wrapContent = (slug, html) => {
  const block = [
    '<template>',
    `  <ClientOnly>`,
    `    <div class="static-page static-page--${slug.replace(/[^a-z0-9-]/gi, '-')}">`,
    html,
    '    </div>',
    '  </ClientOnly>',
    '</template>',
    '',
    '<script setup lang="ts">',
    "import { useHead } from '#imports'",
    '',
    'useHead({',
    `  title: '${TITLES[slug] ?? 'Logic Design Solutions'}',`,
    '  meta: [',
    `    { name: 'description', content: '${DESCRIPTIONS[slug] ?? 'Logic Design Solutions'}' }`,
    '  ]',
    '})',
    '</script>',
    ''
  ]

  return `${block.join('\n')}`
}

ensureSubDir()

for (const slug of SLUGS) {
  const srcPath = path.resolve(sourceRoot, `${slug}.html`)
  const outPath = path.resolve(pagesDir, `${slug === 'index' ? 'index' : slug}.vue`)

  if (!fs.existsSync(srcPath)) {
    console.warn(`Missing fragment for ${slug}, skipping`)
    continue
  }

  const html = fs.readFileSync(srcPath, 'utf-8')
  const extracted = extractContent(html, slug)
  const content = wrapContent(slug, extracted)

  fs.writeFileSync(outPath, `${content}\n`, 'utf-8')
  console.log(`✓ Generated ${path.relative(rootDir, outPath)}`)
}
