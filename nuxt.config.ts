// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Logic Design Solutions - FPGA Design Services & IP Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP'
        }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/images/favicons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/images/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/images/favicons/favicon-16x16.png' },
        { rel: 'manifest', href: '/assets/images/favicons/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
        }
      ],
      script: [],
      bodyAttrs: {
        class: 'custom-cursor'
      }
    }
  },

  css: [
    '~/assets/vendors/bootstrap/css/bootstrap.min.css',
    '~/assets/vendors/animate/animate.min.css',
    '~/assets/vendors/animate/custom-animate.css',
    '~/assets/vendors/fontawesome/css/all.min.css',
    '~/assets/vendors/jarallax/jarallax.css',
    '~/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css',
    '~/assets/vendors/odometer/odometer.min.css',
    '~/assets/vendors/swiper/swiper.min.css',
    '~/assets/vendors/smartbiz-icons/style.css',
    '~/assets/vendors/owl-carousel/owl.carousel.min.css',
    '~/assets/vendors/owl-carousel/owl.theme.default.min.css',
    '~/assets/vendors/bootstrap-select/css/bootstrap-select.min.css',
    '~/assets/vendors/jquery-ui/jquery-ui.css',
    '~/assets/css/smartbiz.css',
    '~/assets/css/smartbiz-responsive.css',
    '~/assets/css/logic-custom.css'
  ],

  dir: {
    public: 'public'
  },

  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
