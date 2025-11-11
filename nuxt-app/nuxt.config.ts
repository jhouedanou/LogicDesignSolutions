// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // CSS Configuration
  css: [
    // Theme CSS are loaded via default.vue layout
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
    preset: 'netlify',
    prerender: {
      crawlLinks: false,
      routes: ['/', '/about', '/services', '/contact', '/products', '/news', '/faq', '/product-category']
    }
  },

  // Modules
  modules: [],

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
          additionalData: '@use "~/assets/css/_variables.scss" as *;'
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
