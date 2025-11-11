// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // CSS Configuration
  css: [
    '~/assets/css/merged-vendors.min.css',
    '~/assets/scss/main.scss'
  ],

  // App Configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Logic Design Solutions',
      meta: [
        { name: 'description', content: 'Professional web development and digital solutions' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  // Runtime Configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },

  // TypeScript Configuration
  typescript: {
    strict: true,
    typeCheck: false
  },

  // Experimental Features
  experimental: {
    payloadExtraction: true,
    viewTransition: true
  },

  // Build Configuration
  build: {
    transpile: []
  },

  // Router Configuration
  router: {
    options: {
      strict: true
    }
  },

  // Nitro Configuration (Server)
  nitro: {
    compressPublicAssets: true,
    preset: 'netlify-static',
    prerender: {
      crawlLinks: false,
      routes: ['/', '/about', '/services', '/contact', '/products', '/news', '/faq', '/product-category']
    }
  },

  // Modules
  modules: [
    '@nuxt/image'
  ],

  // Image Configuration
  image: {
    format: ['webp', 'jpeg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    presets: {
      thumbnail: {
        modifiers: {
          format: 'webp',
          width: 300,
          height: 300,
          quality: 80
        }
      },
      productThumb: {
        modifiers: {
          format: 'webp',
          width: 150,
          quality: 75,
          fit: 'cover'
        }
      },
      productCard: {
        modifiers: {
          format: 'webp',
          width: 212,
          quality: 80,
          fit: 'cover'
        }
      },
      card: {
        modifiers: {
          format: 'webp',
          width: 500,
          height: 350,
          quality: 80
        }
      },
      hero: {
        modifiers: {
          format: 'webp',
          width: 1200,
          height: 600,
          quality: 80
        }
      },
      featured: {
        modifiers: {
          format: 'webp',
          width: 1920,
          height: 1080,
          quality: 80
        }
      }
    }
  },

  // Directory Configuration
  srcDir: 'app',

  // Imports Configuration
  imports: {
    dirs: [
      '../composables/**'
    ]
  },

  // Vite Configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router']
          }
        }
      }
    }
  }
})
