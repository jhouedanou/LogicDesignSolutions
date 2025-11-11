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

          <div v-for="slide in hero?.slides" :key="slide.id" class="item" :class="`main-slider-two__slide-${slide.id}`">
            <div class="main-slider-two__bg"
              :style="`background-image: url(${slide.image});`">
            </div><!-- /.slider-one__bg -->
            <div class="main-slider-two__shape-1"></div>
            <div class="main-slider-two__shape-2"></div>
            <div class="main-slider-two__shape-3"><img src="/assets/images/shapes/slider-v2-shape1.png" alt="">
            </div>
            <div class="container">
              <div class="main-slider-two__content">
                <p class="main-slider-two__sub-title">{{ slide.subtitle }}</p>
                <h2 class="main-slider-two__title" v-html="slide.title"></h2>
                <div class="main-slider-two__btn-box">
                  <NuxtLink to="/products" class="main-slider-two__btn thm-btn">{{ slide.cta }}<span
                        class="icon-right-arrow"></span></NuxtLink>
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
                <div class="section-title text-left">
                  <div class="section-title__tagline-box">
                    <p class="section-title__tagline">{{ about?.tagline }}</p>
                  </div>
                  <h2 class="section-title__title">{{ about?.title }}</h2>
                </div>
                <div class="about-two__content-title">
                  <h3>{{ about?.contentTitle }}</h3>
                </div>
                <div class="about-two__content-text">
                  <p>
                    {{ about?.description }}
                  </p>
                </div>
                <div class="about-two__content-inner">
                  <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6">
                      <ul class="about-two__list list-unstyled">
                        <li v-for="feature in about?.features?.slice(0, 2)" :key="feature.id">
                          <div class="icon">
                            <span class="icon-arrows"></span>
                          </div>
                          <div class="text">
                            <p align="justify">{{ feature.text }}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6">
                      <ul class="about-two__list two list-unstyled">
                        <li v-for="feature in about?.features?.slice(2, 4)" :key="feature.id">
                          <div class="icon">
                            <span class="icon-arrows"></span>
                          </div>
                          <div class="text">
                            <p align="justify">{{ feature.text }}</p>
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
              </div>
            </div>
            <div class="col-xl-6">
              <div class="about-two__img">
                <div class="about-two__img-award">
                  <div class="icon">
                    <span class="icon-badge"></span>
                  </div>
                  <h3>{{ about?.award }} <br>{{ about?.companyName }}</h3>
                </div>
                <div class="about-two__img-inner">
                  <img src="/assets/images/resources/im1.jpeg" alt="Image" style="border-radius: 10px;">
                  <!-- Video hidden -->
                  <div class="about-two__img-line about-two__img-line1"></div>
                  <div class="about-two__img-line about-two__img-line2"></div>
                </div>
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
          <div class="section-title-two text-center">
            <div class="section-title-two__tagline-box">
              <p class="section-title-two__tagline">{{ news?.tagline }}</p>
            </div>
            <h2 class="section-title-two__title">{{ news?.title }}</h2>
          </div>
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
              <div v-for="article in news?.articles" :key="article.id" class="item">
                <div class="services-two__single">
                  <div class="services-two__img-box">
                    <div class="services-two__img">
                      <img :src="article.image" :alt="article.title">
                    </div>
                  </div>
                  <div class="services-two__content">
                    <div class="services-two__icon">
                      <span v-if="article.id % 2 === 0" class="icon-coin-stack"></span>
                      <span v-else class="icon-teamwork"></span>
                      <div class="services-two__icon-shape"></div>
                    </div>
                    <h3 class="services-two__title"><NuxtLink to="/news">{{ article.title }}</NuxtLink></h3>
                    <p class="services-two__text">{{ article.description }}</p>
                    <NuxtLink to="/news" class="services-two__btn">{{ article.cta }}<span
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
      <section class="brand-one brand-two">
        <div class="container">
          <div class="section-title-two text-center">
            <!-- Tagline removed -->
            <h2 class="section-title-two__title">{{ brands?.title }}</h2>
          </div>
          <p class="brand-two__text">{{ brands?.description }}</p>
          <div class="brand-one__inner">
            <div class="thm-swiper__slider swiper-container" data-swiper-options='{"spaceBetween": 100,
            "slidesPerView": 3,
            "loop": true,
            "navigation": {
              "nextEl": "#brand-one__swiper-button-next",
              "prevEl": "#brand-one__swiper-button-prev"
            },
            "autoplay": { "delay": 5000 },
            "breakpoints": {
              "0": {
                "spaceBetween": 30,
                "slidesPerView": 1
              },
              "375": {
                "spaceBetween": 30,
                "slidesPerView": 1
              },
              "575": {
                "spaceBetween": 50,
                "slidesPerView": 2
              },
              "767": {
                "spaceBetween": 50,
                "slidesPerView": 2
              },
              "991": {
                "spaceBetween": 80,
                "slidesPerView": 3
              },
              "1199": {
                "spaceBetween": 100,
                "slidesPerView": 3
              }
            }}'>
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img src="/assets/images/brand/AMD_Embedded_Select.png" alt="AMD Embedded Select Partner">
                </div><!-- /.swiper-slide -->
                <div class="swiper-slide">
                  <img src="/assets/images/brand/Member-Badge-1-1.png" alt="Intel Partner">
                </div><!-- /.swiper-slide -->
                <div class="swiper-slide">
                  <img src="/assets/images/brand/image001.png" alt="Technology Partner">
                </div><!-- /.swiper-slide -->
                <div class="swiper-slide">
                  <img src="/assets/images/brand/AMD_Embedded_Select.png" alt="AMD Embedded Select Partner">
                </div><!-- /.swiper-slide -->
                <div class="swiper-slide">
                  <img src="/assets/images/brand/Member-Badge-1-1.png" alt="Intel Partner">
                </div><!-- /.swiper-slide -->
                <div class="swiper-slide">
                  <img src="/assets/images/brand/image001.png" alt="Technology Partner">
                </div><!-- /.swiper-slide -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--Brand Two End-->

      <!--Google Map Start-->
      <section class="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.7967516134676!2d2.5699478999999997!3d48.8561268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e611de797bffff%3A0xea046efe8222fe8!2sLogic%20Design%20Solutions!5e0!3m2!1sfr!2sfr!4v1696521234567!5m2!1sfr!2sfr"
          class="google-map__one" allowfullscreen></iframe>
      </section>
      <!--Google Map End-->

      <!--Site Footer Two Start-->
      <footer class="site-footer-two">
        <div class="site-footer-two__bottom">
          <div class="container">
            <div class="site-footer-two__bottom-inner">
              <div class="site-footer-two__logo">
                <NuxtLink to="/" style="font-size: 24px; font-weight: 700; font-style: italic; color: #ffffff;">LogicDesignSolutions</NuxtLink>
              </div>
              <p class="site-footer-two__bottom-text">Copyright © Logic Design Solution
                All
                Rights Reserved - Design by <a style="color:#999999;"  href="">Digital Consulting</a></p>
              <ul class="list-unstyled site-footer-two__bottom-menu">
                <li><NuxtLink to="/profiles">Profiles</NuxtLink></li>
                <li><NuxtLink to="/products">Products</NuxtLink></li>
                <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
              </ul>
              <div class="site-footer-two__social" style="display: flex; gap: 15px; justify-content: center;">
                <a href="#" style="color: #ffffff; font-size: 20px;"><i class="fab fa-facebook"></i></a>
                <a href="#" style="color: #ffffff; font-size: 20px;"><i class="fab fa-twitter"></i></a>
                <a href="#" style="color: #ffffff; font-size: 20px;"><i class="fab fa-linkedin"></i></a>
                <a href="#" style="color: #ffffff; font-size: 20px;"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!--Site Footer End-->

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
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'

definePageMeta({
  layout: false
})

const { hero, about, news, site, brands } = useContent()
const isLoading = ref(true)

onMounted(() => {
  // Hide preloader after content is ready
  setTimeout(() => {
    isLoading.value = false
  }, 500)

  // Initialize Owl Carousel after DOM is ready
  if (typeof window !== 'undefined' && (window as any).$) {
    const $ = (window as any).$

    // Wait for owl carousel script to be loaded
    const initCarousel = () => {
      if ($.fn.owlCarousel) {
        $('.main-slider-two__carousel').owlCarousel({
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
      } else {
        setTimeout(initCarousel, 100)
      }
    }

    setTimeout(initCarousel, 500)
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
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
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
    { src: '/assets/vendors/jquery/jquery-3.6.0.min.js' },
    { src: '/assets/vendors/bootstrap/js/bootstrap.bundle.min.js' },
    { src: '/assets/vendors/jarallax/jarallax.min.js' },
    { src: '/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js' },
    { src: '/assets/vendors/jquery-appear/jquery.appear.min.js' },
    { src: '/assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js' },
    { src: '/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js' },
    { src: '/assets/vendors/jquery-validate/jquery.validate.min.js' },
    { src: '/assets/vendors/odometer/odometer.min.js' },
    { src: '/assets/vendors/swiper/swiper.min.js' },
    { src: '/assets/vendors/wnumb/wNumb.min.js' },
    { src: '/assets/vendors/wow/wow.js' },
    { src: '/assets/vendors/isotope/isotope.js' },
    { src: '/assets/vendors/owl-carousel/owl.carousel.min.js' },
    { src: '/assets/vendors/bootstrap-select/js/bootstrap-select.min.js' },
    { src: '/assets/vendors/jquery-ui/jquery-ui.js' },
    { src: '/assets/vendors/jquery.circle-type/jquery.circleType.js' },
    { src: '/assets/vendors/jquery.circle-type/jquery.lettering.min.js' },
    { src: '/assets/js/smartbiz.js' }
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
