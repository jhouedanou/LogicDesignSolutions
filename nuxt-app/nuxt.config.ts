// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // CSS Configuration
  css: [
    '@/assets/css/main.css'
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
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
        { rel: 'stylesheet', href: '/assets/vendors/bootstrap/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/assets/vendors/animate/animate.min.css' },
        { rel: 'stylesheet', href: '/assets/vendors/animate/custom-animate.css' },
        { rel: 'stylesheet', href: '/assets/vendors/fontawesome/css/all.min.css' },
        { rel: 'stylesheet', href: '/assets/vendors/jarallax/jarallax.css' },
        { rel: 'stylesheet', href: '/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css' },
        { rel: 'stylesheet', href: '/assets/vendors/odometer/odometer.min.css' },
        { rel: 'stylesheet', href: '/assets/vendors/swiper/swiper.min.css' },
        { rel: 'stylesheet', href: '/assets/vendors/smartbiz-icons/style.css' },
        { rel: 'stylesheet', href: '/assets/vendors/owl-carousel/owl.carousel.min.css' },
        { rel: 'stylesheet', href: '/assets/vendors/owl-carousel/owl.theme.default.min.css' },
        { rel: 'stylesheet', href: '/assets/vendors/bootstrap-select/css/bootstrap-select.min.css' },
        { rel: 'stylesheet', href: '/assets/vendors/jquery-ui/jquery-ui.css' },
        { rel: 'stylesheet', href: '/assets/css/smartbiz.css' },
        { rel: 'stylesheet', href: '/assets/css/smartbiz-responsive.css' },
        { rel: 'stylesheet', href: '/assets/css/logic-custom.css' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'assets/images/favicons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'assets/images/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'assets/images/favicons/favicon-16x16.png' },
        { rel: 'manifest', href: 'assets/images/favicons/site.webmanifest' }
      ],
      script: [
        { src: '/assets/vendors/jquery/jquery-3.6.0.min.js', async: false },
        { src: '/assets/vendors/bootstrap/js/bootstrap.bundle.min.js', async: false },
        { src: '/assets/vendors/jarallax/jarallax.min.js', async: false },
        { src: '/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js', async: false },
        { src: '/assets/vendors/jquery-appear/jquery.appear.min.js', async: false },
        { src: '/assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js', async: false },
        { src: '/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js', async: false },
        { src: '/assets/vendors/jquery-validate/jquery.validate.min.js', async: false },
        { src: '/assets/vendors/odometer/odometer.min.js', async: false },
        { src: '/assets/vendors/swiper/swiper.min.js', async: false },
        { src: '/assets/vendors/wnumb/wNumb.min.js', async: false },
        { src: '/assets/vendors/wow/wow.js', async: false },
        { src: '/assets/vendors/isotope/isotope.js', async: false },
        { src: '/assets/vendors/owl-carousel/owl.carousel.min.js', async: false },
        { src: '/assets/vendors/bootstrap-select/js/bootstrap-select.min.js', async: false },
        { src: '/assets/vendors/jquery-ui/jquery-ui.js', async: false },
        { src: '/assets/vendors/jquery.circle-type/jquery.circleType.js', async: false },
        { src: '/assets/vendors/jquery.circle-type/jquery.lettering.min.js', async: false },
        { src: '/assets/js/smartbiz.js', async: false }
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
      crawlLinks: true,
      routes: ['/', '/about', '/services', '/contact']
    }
  },

  // Modules
  modules: [],

  // Directory Configuration
  srcDir: 'app',

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
