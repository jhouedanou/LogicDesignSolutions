// Global type declarations for external libraries and composables

import type { Ref } from 'vue'

declare global {
  interface Window {
    jQuery: any
    $: any
    Swiper: any
  }
}

// Module augmentation for WordPress API composables
declare module '~/composables/useWordPressAPI' {
  export interface WordPressProduct {
    id: number
    title: { rendered: string }
    content: { rendered: string }
    featured_media: number
    excerpt: { rendered: string }
    product_cat?: number[]
    acf?: Record<string, any>
    _links?: {
      'wp:featuredmedia'?: Array<{ href: string }>
    }
    _embedded?: {
      'wp:featuredmedia'?: Array<{
        id: number
        source_url: string
        alt_text?: string
      }>
    }
  }

  export interface WordPressPost {
    id: number
    title: { rendered: string }
    content: { rendered: string }
    excerpt: { rendered: string }
    featured_media: number
    date: string
    modified: string
    _links?: {
      'wp:featuredmedia'?: Array<{ href: string }>
    }
    _embedded?: {
      'wp:featuredmedia'?: Array<{
        id: number
        source_url: string
        alt_text?: string
      }>
    }
  }

  export interface FeaturedMedia {
    id: number
    media_details?: { width: number; height: number }
    source_url: string
    alt_text?: string
  }

  export interface WordPressProductCategory {
    id: number
    count: number
    description: string
    link: string
    name: string
    slug: string
    taxonomy: string
    parent: number
  }

  export function useWPProducts(perPage?: number, page?: number): Promise<{
    data: WordPressProduct[]
    error: any
    pending: boolean
    totalCount: number
    totalPages: number
  }>

  export function useWPProduct(id: number | string): Promise<{
    data: WordPressProduct | null
    error: any
    pending: boolean
  }>

  export function useWPProductCategories(): Promise<{
    data: WordPressProductCategory[]
    error: any
    pending: boolean
  }>

  export function useWPPosts(perPage?: number): Promise<{
    data: WordPressPost[]
    error: any
    pending: boolean
  }>

  export function useWPPost(id: number | string): Promise<{
    data: WordPressPost | null
    error: any
    pending: boolean
  }>

  export function useWPMediaLibrary(perPage?: number, page?: number): Promise<{
    data: FeaturedMedia[]
    error: any
    pending: boolean
    totalCount: number
    totalPages: number
  }>

  export function buildMediaCache(): Promise<Map<number, string>>

  export function getWPFeaturedImageUrl(
    item: WordPressProduct | WordPressPost,
    mediaCache?: Map<number, string>
  ): Promise<string>
}

// Declare useContent composable
declare module '#app' {
  interface NuxtApp {
    $useContent: typeof useContent
  }
}

interface HeroContent {
  title: string
  subtitle: string
  description: string
  cta: string
  image: string
}

interface AboutFeature {
  id: number
  title: string
  description: string
}

interface AboutContent {
  tagline: string
  title: string
  contentTitle: string
  description: string
  features: AboutFeature[]
  cta: string
  award: string
  companyName: string
}

interface BrandsContent {
  title: string
  description: string
  partners: Array<Record<string, any>>
}

declare global {
  function useContent(): {
    hero: Ref<HeroContent>
    about: Ref<AboutContent>
    news: Ref<Array<Record<string, any>>>
    brands: Ref<BrandsContent>
    site: Ref<{
      siteName: string
      email: string
      phone: string
      address: string
      description: string
      callLabel: string
      contactButtonText: string
    }>
    navigation: Ref<{
      mainMenu: Array<{ label: string; path: string }>
      footerMenu: Array<{ title: string; url: string }>
    }>
    footer: Ref<{
      copyright: string
      socialLinks: Array<{ name: string; url: string; icon: string }>
    }>
  }
}

export {}
