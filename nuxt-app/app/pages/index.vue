<template>
  <div class="custom-cursor">
    <!--Start Preloader-->
    <div v-if="isLoading" class="loader js-preloader">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!--End Preloader-->

    <div class="page-wrapper">
      <header class="main-header-two">
        <!-- <div class="main-header-two__top">
                <div class="main-header-two__top-inner">
                    <ul class="list-unstyled main-header-two__contact-list">
                        <li>
                            <div class="icon">
                                <i class="icon-location-1"></i>
                            </div>
                            <div class="text">
                                <p>105 Boulevard de la Résistance, 93460 Gournay sur Marne, France</p>
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <i class="icon-mail-1"></i>
                            </div>
                            <div class="text">
                                <p><a href="tel:+33145922447">Phone: +33 (0)1 45 92 24 47</a></p>
                            </div>
                        </li>
                    </ul>
                    <div class="main-header-two__top-right">
                        <div class="main-header-two__top-opening-hours">
                            <div class="main-header-two__top-opening-hours-icon">
                                <span class="icon-clock"></span>
                            </div>
                            <p class="main-header-two__top-opening-hours-text">FPGA & IP Design Experts
                            </p>
                        </div>
                        <ul class="main-header-two__social list-unstyled">
                            <li>
                                <a href="#"><span class="icon-facebook-app-symbol"></span></a>
                            </li>
                            <li>
                                <a href="#"><span class="icon-social"></span></a>
                            </li>
                            <li>
                                <a href="#"><span class="icon-instagram"></span></a>
                            </li>
                            <li>
                                <a href="#"><span class="icon-linkedin"></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> -->
        <AppMenu />
      </header>

      <div class="stricky-header stricked-menu main-menu main-menu-two">
        <div class="sticky-header__content"></div><!-- /.sticky-header__content -->
      </div><!-- /.stricky-header -->

      <!-- Main Sllider Start -->
      <section class="main-slider-two">
        <div class="main-slider-two__carousel owl-carousel owl-theme thm-owl__carousel"
          data-owl-options='{"loop": true, "items": 1, "navText": ["<span class=\"icon-left-arrow\"></span>","<span class=\"icon-right-arrow\"></span>"], "margin": 0, "dots": true, "nav": false, "animateOut": "slideOutDown", "animateIn": "fadeIn", "active": true, "smartSpeed": 1000, "autoplay": true, "autoplayTimeout": 7000, "autoplayHoverPause": false}'>

          <div v-for="(slide, index) in slides" :key="slide.id" :class="`item main-slider-two__slide-${index + 1}`">
            <div class="main-slider-two__bg"
              :style="`background-image: url(${slide.image});`">
            </div><!-- /.slider-one__bg -->
            <NuxtImg
              :src="slide.image"
              :alt="slide.title"
              preset="lcp"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              :preload="index === 0"
              style="position: absolute; width: 100%; height: 100%; object-fit: cover; top: 0; left: 0; z-index: -1; opacity: 0;"
            />
            <div class="main-slider-two__shape-1"></div>
            <div class="main-slider-two__shape-2"></div>
            <div class="main-slider-two__shape-3"><img src="/assets/images/shapes/slider-v2-shape1.png" alt="">
            </div>
            <div class="container">
              <div class="main-slider-two__content">
                <p class="main-slider-two__sub-title">{{ slide.subtitle }}</p>
                <h2 class="main-slider-two__title" v-html="slide.title"></h2>
                <div class="main-slider-two__btn-box">
                  <a :href="slide.link" class="main-slider-two__btn thm-btn">{{ slide.linkText }}<span
                      class="icon-right-arrow"></span></a>
                </div>
              </div>
              <!-- Video hidden -->
            </div>
          </div>
        </div>
      </section>
      <!--Main Sllider Start -->

      <!--About Two Start -->
      <section class="about-two">
        <div class="shape1 rotate-me"><img src="/assets/images/shapes/about-v2-shape1.png" alt=""></div>
        <div class="container">
          <div class="row">
            <div class="col-xl-6">
              <div class="about-two__content">
                <ClientOnly>
                  <div class="section-title text-left">
                    <div class="section-title__tagline-box">
                      <p class="section-title__tagline" v-html="aboutWidgetContent || about?.tagline"></p>
                    </div>
                    <h2 class="section-title__title" v-html="aboutTitleWidget || about?.title"></h2>
                  </div>
                  <div class="about-two__content-title">
                    <h3 v-html="aboutContentTitleWidget || about?.contentTitle"></h3>
                  </div>
                  <div class="about-two__content-text">
                    <p v-html="aboutDescriptionWidget || about?.description"></p>
                  </div>
                  <div class="about-two__content-inner">
                    <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6">
                        <ul class="about-two__list list-unstyled">
                          <li v-for="(feature, index) in leftFeatures" :key="index">
                            <div class="icon">
                              <span class="icon-arrows"></span>
                            </div>
                            <div class="text">
                              <p align="justify">{{ feature }}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6">
                        <ul class="about-two__list two list-unstyled">
                          <li v-for="(feature, index) in rightFeatures" :key="index">
                            <div class="icon">
                              <span class="icon-arrows"></span>
                            </div>
                            <div class="text">
                              <p align="justify">{{ feature }}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- Statistics removed -->
                  <div class="about-two__content-btn">
                    <NuxtLink to="/products" class="thm-btn">{{ about?.cta }}<span
                          class="icon-right-arrow"></span></NuxtLink>
                  </div>
                </ClientOnly>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="about-two__img">
                <ClientOnly>
                  <div class="about-two__img-award">
                    <div class="icon">
                      <span class="icon-badge"></span>
                    </div>
                    <h3><span v-html="awardWidget || about?.award"></span> <br><span v-html="companyNameWidget || about?.companyName"></span></h3>
                  </div>
                  <div class="about-two__img-inner">
                    <img v-if="awardImageUrl" :src="awardImageUrl" alt="Award Image" style="border-radius: 10px;">
                    <!-- Video hidden -->
                    <div class="about-two__img-line about-two__img-line1"></div>
                    <div class="about-two__img-line about-two__img-line2"></div>
                  </div>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--About Two End -->

      <!--Services Two Start -->
      <section class="services-two">
        <div class="services-two__bg-shape"
          style="background-image: url(/assets/images/shapes/services-two-bg-shape.png);"></div>
        <div class="container">
          <ClientOnly>
            <div class="section-title-two text-center">
              <div class="section-title-two__tagline-box">
                <p class="section-title-two__tagline" v-html="whatWeDoWidget || 'What we do'"></p>
              </div>
              <h2 class="section-title-two__title" v-html="newsFromTitleWidget || 'Recent <span>News</span> From<br> Blog Latest News'"></h2>
            </div>
          </ClientOnly>
          <div class="services-two__bottom">
            <div class="services-two__carousel owl-carousel owl-theme thm-owl__carousel" data-owl-options='{
              "loop": true,
              "autoplay": true,
              "margin": 30,
              "nav": true,
              "dots": false,
              "smartSpeed": 500,
              "autoplayTimeout": 10000,
              "navText": ["<span class=\"icon-left-arrow\"></span>","<span class=\"icon-right-arrow\"></span>"],
              "responsive": {
                "0": {
                  "items": 1
                },
                "768": {
                  "items": 1
                },
                "992": {
                  "items": 1
                },
                "1200": {
                  "items": 1
                },
                "1350": {
                  "items": 2
                }
              }
            }'>
              <!--Services Two Single Start-->
              <div v-for="product in products.slice(0, 4)" :key="product.id" class="item">
                <div class="services-two__single">
                  <div class="services-two__img-box">
                    <div class="services-two__img">
                      <img :src="product.image" :alt="product.title">
                    </div>
                  </div>
                  <div class="services-two__content">
                    <div class="services-two__icon">
                      <span class="icon-teamwork"></span>
                      <div class="services-two__icon-shape"></div>
                    </div>
                    <h3 class="services-two__title"><NuxtLink :to="`/product-detail?id=${product.id}`">{{ product.title }}</NuxtLink></h3>
                    <p class="services-two__text">{{ product.excerpt }}</p>
                    <NuxtLink :to="`/product-detail?id=${product.id}`" class="services-two__btn">Read More<span
                        class="icon-right-arrow"></span></NuxtLink>
                  </div>
                </div>
              </div>
              <!--Services Two Single End-->
            </div>
          </div>
        </div>
      </section>
      <!--Services Two End -->


      <!--Brand Two Start-->
      <BrandPartners />
      <!--Brand Two End-->

      <!--Google Map Start-->
      <section class="google-map">
        <iframe
          :src="googleMapSrc"
          class="google-map__one" allowfullscreen></iframe>
      </section>
      <!--Google Map End-->

      <AppFooter />

    </div><!-- /.page-wrapper -->


    <div class="mobile-nav__wrapper">
      <div class="mobile-nav__overlay mobile-nav__toggler"></div>
      <!-- /.mobile-nav__overlay -->
      <div class="mobile-nav__content">
        <span class="mobile-nav__close mobile-nav__toggler"><i class="fa fa-times"></i></span>

        <div class="logo-box">
          <NuxtLink to="/" style="font-size: 24px; font-weight: 700; font-style: italic; color: #000;">LogicDesignSolutions</NuxtLink>
        </div>
        <!-- /.logo-box -->
        <div class="mobile-nav__container"></div>
        <!-- /.mobile-nav__container -->

        <ul class="mobile-nav__contact list-unstyled">
          <li>
            <i class="fa fa-envelope"></i>
            <a href="mailto:contact@logic-design-solutions.com">contact@logic-design-solutions.com</a>
          </li>
          <li>
            <i class="fa fa-phone-alt"></i>
            <a href="tel:+33145922447">+33 (0)1 45 92 24 47</a>
          </li>
        </ul><!-- /.mobile-nav__contact -->
        <div class="mobile-nav__top">
          <div class="mobile-nav__social">
            <a href="#" class="fab fa-twitter"></a>
            <a href="#" class="fab fa-facebook-square"></a>
            <a href="#" class="fab fa-pinterest-p"></a>
            <a href="#" class="fab fa-instagram"></a>
          </div><!-- /.mobile-nav__social -->
        </div><!-- /.mobile-nav__top -->



      </div>
      <!-- /.mobile-nav__content -->
    </div>
    <!-- /.mobile-nav__wrapper -->

    <div class="search-popup">
      <div class="search-popup__overlay search-toggler"></div>
      <!-- /.search-popup__overlay -->
      <div class="search-popup__content">
        <form action="#">
          <label for="search" class="sr-only">search here</label><!-- /.sr-only -->
          <input type="text" id="search" placeholder="Search Here..." />
          <button type="submit" aria-label="search submit" class="thm-btn">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <!-- /.search-popup__content -->
    </div>
    <!-- /.search-popup -->

    <a href="#" data-target="html" class="scroll-to-target scroll-to-top"><i class="fas fa-arrow-up"></i></a>

    <!-- Custom Cursor Component -->
    <CustomCursor />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useHead, useContent, useSlides } from '#imports'

definePageMeta({
  layout: false
})

const { hero, about, news, site, brands } = useContent()
const { slides, fetchSlides } = useSlides()
const { products, fetchProducts } = useProducts()
const { fetchMultipleWidgets, fetchWidgetContent } = useWidgets()
const isLoading = ref(true)
const aboutWidgetContent = ref<string>('')
const aboutTitleWidget = ref<string>('')
const aboutContentTitleWidget = ref<string>('')
const aboutDescriptionWidget = ref<string>('')
const awardWidget = ref<string>('')
const companyNameWidget = ref<string>('')
const awardImageUrl = ref<string>('')
const whatWeDoWidget = ref<string>('')
const newsFromTitleWidget = ref<string>('')
const googleMapSrc = ref<string>('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.7967516134676!2d2.5699478999999997!3d48.8561268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e611de797bffff%3A0xea046efe8222fe8!2sLogic%20Design%20Solutions!5e0!3m2!1sfr!2sfr!4v1696521234567!5m2!1sfr!2sfr')
const featuresItems = ref<string[]>([])

// Divide features dynamically into two columns
const midpoint = computed(() => Math.ceil(featuresItems.value.length / 2))
const leftFeatures = computed(() => featuresItems.value.slice(0, midpoint.value))
const rightFeatures = computed(() => featuresItems.value.slice(midpoint.value))

onMounted(async () => {
  try {
    // Fetch slides, partners, and products from API
    await Promise.all([fetchSlides(), fetchProducts()])

    // Load about section widgets in batch
    const widgets = await fetchMultipleWidgets(
      [
        'custom_html-9',   // tagline
        'custom_html-12',  // title
        'custom_html-14',  // contentTitle
        'custom_html-15',  // description
        'text-3',          // features
        'custom_html-17',  // award
        'custom_html-18',  // company name
        'media_image-2',   // award image
        'custom_html-19',  // "What we do"
        'custom_html-20',  // "Recent News From"
        'custom_html-23'   // google map iframe
      ],
      'nouveau-template-01'
    )

    aboutWidgetContent.value = widgets['custom_html-9']
    aboutTitleWidget.value = widgets['custom_html-12']
    aboutContentTitleWidget.value = widgets['custom_html-14']
    aboutDescriptionWidget.value = widgets['custom_html-15']
    awardWidget.value = widgets['custom_html-17']
    companyNameWidget.value = widgets['custom_html-18']
    whatWeDoWidget.value = widgets['custom_html-19']
    newsFromTitleWidget.value = widgets['custom_html-20']

    // Extract iframe src from Google Map widget
    const googleMapContent = widgets['custom_html-23']
    if (googleMapContent && typeof googleMapContent === 'string') {
      const srcRegex = /src=["']([^"']+)["']/i
      const match = googleMapContent.match(srcRegex)
      if (match && match[1]) {
        googleMapSrc.value = match[1]
      }
    }

    // Extract image URL from widget content
    const imageContent = widgets['media_image-2']
    if (imageContent && typeof imageContent === 'object' && imageContent.url) {
      awardImageUrl.value = imageContent.url
    } else if (imageContent && typeof imageContent === 'string') {
      try {
        const imageData = JSON.parse(imageContent)
        if (imageData.url) {
          awardImageUrl.value = imageData.url
        } else if (imageData.content && imageData.content.url) {
          awardImageUrl.value = imageData.content.url
        }
      } catch (parseErr) {
        if (imageContent.startsWith('http')) {
          awardImageUrl.value = imageContent
        }
      }
    }

    // Parse features from HTML
    const featuresContent = widgets['text-3']
    if (featuresContent) {
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
      const matches: RegExpMatchArray[] = Array.from(featuresContent.matchAll(liRegex)) as RegExpMatchArray[]
      featuresItems.value = matches.map((match) => {
        return (match[1] || '').replace(/<[^>]*>/g, '').trim()
      })
    }

    // Wait for DOM to be fully rendered
    await nextTick()
    
    // Hide preloader only after ALL content is loaded
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
    
    // Hide preloader even on error to avoid infinite loading
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }

  // Initialize Owl Carousel with robust retry logic
  if (typeof window !== 'undefined') {
    const initCarousels = (attempts = 0) => {
      const $ = (window as any).$

      if (!$ || !$.fn.owlCarousel) {
        if (attempts < 20) {
          // Retry up to 20 times (2 seconds total)
          setTimeout(() => initCarousels(attempts + 1), 100)
        }
        return
      }

      try {
        // Destroy existing carousels if they exist
        const mainCarousel = $('.main-slider-two__carousel')
        const servicesCarousel = $('.services-two__carousel')
        const brandCarousel = $('.brand-one__carousel')

        if (mainCarousel.hasClass('owl-loaded')) {
          mainCarousel.trigger('destroy.owl.carousel')
        }
        if (servicesCarousel.hasClass('owl-loaded')) {
          servicesCarousel.trigger('destroy.owl.carousel')
        }
        if (brandCarousel.hasClass('owl-loaded')) {
          brandCarousel.trigger('destroy.owl.carousel')
        }

        // Initialize main slider carousel
        mainCarousel.owlCarousel({
          loop: true,
          items: 1,
          navText: ['<span class="icon-left-arrow"></span>', '<span class="icon-right-arrow"></span>'],
          margin: 0,
          dots: true,
          nav: false,
          animateOut: 'slideOutDown',
          animateIn: 'fadeIn',
          active: true,
          smartSpeed: 1000,
          autoplay: true,
          autoplayTimeout: 7000,
          autoplayHoverPause: false
        })

        // Initialize services carousel
        servicesCarousel.owlCarousel({
          loop: true,
          autoplay: true,
          margin: 30,
          nav: true,
          dots: false,
          smartSpeed: 500,
          autoplayTimeout: 10000,
          navText: ['<span class="icon-left-arrow"></span>', '<span class="icon-right-arrow"></span>'],
          responsive: {
            0: { items: 1 },
            768: { items: 1 },
            992: { items: 1 },
            1200: { items: 1 },
            1350: { items: 2 }
          }
        })

        // Initialize partners/brands carousel
        brandCarousel.owlCarousel({
          loop: true,
          items: 3,
          margin: 100,
          dots: true,
          nav: false,
          autoplay: true,
          autoplayTimeout: 5000,
          smartSpeed: 1000,
          responsive: {
            0: { items: 1, margin: 30 },
            375: { items: 1, margin: 30 },
            575: { items: 2, margin: 50 },
            767: { items: 2, margin: 50 },
            991: { items: 3, margin: 80 },
            1199: { items: 3, margin: 100 }
          }
        })
      } catch (error) {
        console.error('Error initializing Owl Carousel:', error)
      }
    }

    // Start initialization after a delay to ensure DOM is ready
    setTimeout(() => initCarousels(), 1500)
  }
})

useHead({
  title: 'Logic Design Solutions - FPGA Design Services & IP Solutions',
  meta: [
    {
      name: 'description',
      content: 'Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP'
    }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      media: 'print',
      onload: "this.media='all'"
    },
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
    { rel: 'stylesheet', href: '/assets/css/logic-custom.css' }
  ],
  script: [
    { src: '/assets/js/merged-vendors.min.js' }
  ]
})
</script>

<style scoped>
.custom-cursor {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.page-wrapper {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Slider Height Limit */
.main-slider-two {
  max-height: 100vh;
  overflow: hidden;
}

.main-slider-two .item {
  height: 100vh;
  display: flex;
  align-items: center;
}

/* Brand/Partners Carousel Height */
.brand-one__carousel .item {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-one__carousel .item img {
  max-height: 90px;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.main-slider-two__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.custom-cursor__cursor,
.custom-cursor__cursor-two {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
}

.custom-cursor__cursor {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 50%;
  top: 0;
  left: 0;
}

.custom-cursor__cursor-two {
  width: 5px;
  height: 5px;
  background: #333;
  border-radius: 50%;
  top: 0;
  left: 0;
}
</style>
