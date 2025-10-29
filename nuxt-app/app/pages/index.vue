<template>
  <div class="custom-cursor">
    <!-- Custom Cursor -->
    <div class="custom-cursor__cursor"></div>
    <div class="custom-cursor__cursor-two"></div>

    <!-- Preloader -->
    <AppPreloader />

    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <!-- Header -->
      <AppHeader />

      <!-- Main Slider Start -->
      <section class="main-slider-two">
        <div
          class="main-slider-two__carousel owl-carousel owl-theme thm-owl__carousel"
          data-owl-options='{"loop": true, "items": 1, "navText": ["<span class=\"icon-left-arrow\"></span>","<span class=\"icon-right-arrow\"></span>"], "margin": 0, "dots": true, "nav": false, "animateOut": "slideOutDown", "animateIn": "fadeIn", "active": true, "smartSpeed": 1000, "autoplay": true, "autoplayTimeout": 7000, "autoplayHoverPause": false}'
        >
          <!-- Slide 1 -->
          <div class="item main-slider-two__slide-1">
            <div
              class="main-slider-two__bg"
              style="background-image: url(/assets/images/backgrounds/logic-slider-1.png);"
            ></div>
            <div class="main-slider-two__shape-1"></div>
            <div class="main-slider-two__shape-2"></div>
            <div class="main-slider-two__shape-3">
              <img src="/assets/images/shapes/slider-v2-shape1.png" alt="" />
            </div>
            <div class="container">
              <div class="main-slider-two__content">
                <p class="main-slider-two__sub-title">FPGA Design Services</p>
                <h2 class="main-slider-two__title">
                  Discover our <br />
                  product lines <br />
                  and IP solutions
                </h2>
                <div class="main-slider-two__btn-box">
                  <NuxtLink to="/products" class="main-slider-two__btn thm-btn">
                    Let's Work Together
                    <span class="icon-right-arrow"></span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="item main-slider-two__slide-2">
            <div
              class="main-slider-two__bg"
              style="background-image: url(/assets/images/backgrounds/logic-slider-2.png);"
            ></div>
            <div class="main-slider-two__shape-1"></div>
            <div class="main-slider-two__shape-2"></div>
            <div class="main-slider-two__shape-3">
              <img src="/assets/images/shapes/slider-v2-shape1.png" alt="" />
            </div>
            <div class="container">
              <div class="main-slider-two__content">
                <p class="main-slider-two__sub-title">FPGA Design Services</p>
                <h2 class="main-slider-two__title">
                  Discover our <br />
                  product lines <br />
                  and IP solutions
                </h2>
                <div class="main-slider-two__btn-box">
                  <NuxtLink to="/products" class="main-slider-two__btn thm-btn">
                    Let's Work Together
                    <span class="icon-right-arrow"></span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="item main-slider-two__slide-3">
            <div
              class="main-slider-two__bg"
              style="background-image: url(/assets/images/backgrounds/logic-slider-3.png);"
            ></div>
            <div class="main-slider-two__shape-1"></div>
            <div class="main-slider-two__shape-2"></div>
            <div class="main-slider-two__shape-3">
              <img src="/assets/images/shapes/slider-v2-shape1.png" alt="" />
            </div>
            <div class="container">
              <div class="main-slider-two__content">
                <p class="main-slider-two__sub-title">FPGA Design Services</p>
                <h2 class="main-slider-two__title">
                  Discover our <br />
                  product lines <br />
                  and IP solutions
                </h2>
                <div class="main-slider-two__btn-box">
                  <NuxtLink to="/products" class="main-slider-two__btn thm-btn">
                    Let's Work Together
                    <span class="icon-right-arrow"></span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Main Slider End -->

      <!-- About Two Start -->
      <section class="about-two">
        <div class="shape1 rotate-me">
          <img src="/assets/images/shapes/about-v2-shape1.png" alt="" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-xl-6">
              <div class="about-two__content">
                <div class="section-title text-left">
                  <div class="section-title__tagline-box">
                    <p class="section-title__tagline">About Us</p>
                  </div>
                  <h2 class="section-title__title">We help to get Solutions!</h2>
                </div>
                <div class="about-two__content-title">
                  <h3>
                    professional activities to produce and sell goods or
                    services for profit.
                  </h3>
                </div>
                <div class="about-two__content-text">
                  <p>
                    Logic Design Solutions provides FPGA Design Services,
                    NVMe IP, SATA IP, RECORDER IP, ARINC 429 IP, and DO254
                    methodology to FPGA customers. We engage our self to be
                    your high standard quality solutions provider for FPGA IP
                    and Design Services.
                  </p>
                </div>
                <div class="about-two__content-inner">
                  <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6">
                      <ul class="about-two__list list-unstyled">
                        <li>
                          <div class="icon">
                            <span class="icon-arrows"></span>
                          </div>
                          <div class="text">
                            <p align="justify">
                              Logic Design Solutions has a deep knowledge of
                              FPGA & IP design...
                            </p>
                          </div>
                        </li>
                        <li>
                          <div class="icon">
                            <span class="icon-arrows"></span>
                          </div>
                          <div class="text">
                            <p align="justify">
                              Logic Design Solutions develops IP for FPGA, like
                              NVMe IP, SATA IP, Recorder IP...
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6">
                      <ul class="about-two__list two list-unstyled">
                        <li>
                          <div class="icon">
                            <span class="icon-arrows"></span>
                          </div>
                          <div class="text">
                            <p align="justify">
                              Customers' Logic Design Solutions are provided
                              with a phone hotline and e-mail support to
                              answer...
                            </p>
                          </div>
                        </li>
                        <li>
                          <div class="icon">
                            <span class="icon-arrows"></span>
                          </div>
                          <div class="text">
                            <p align="justify">
                              Logic Design Solutions' IP are an excellent
                              value. Our competitive pricing enables customers
                              to decide...
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="about-two__content-btn">
                  <NuxtLink to="/products" class="thm-btn">
                    Learn About Us
                    <span class="icon-right-arrow"></span>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="about-two__img">
                <div class="about-two__img-award">
                  <div class="icon">
                    <span class="icon-badge"></span>
                  </div>
                  <h3>
                    Since 1994 <br />
                    Logic Design Solutions
                  </h3>
                </div>
                <div class="about-two__img-inner">
                  <img
                    src="/assets/images/resources/im1.jpeg"
                    alt="Image"
                    style="border-radius: 10px;"
                  />
                  <div class="about-two__img-line about-two__img-line1"></div>
                  <div class="about-two__img-line about-two__img-line2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- About Two End -->

      <!-- Services Two Start -->
      <section class="services-two">
        <div
          class="services-two__bg-shape"
          style="
            background-image: url(/assets/images/shapes/services-two-bg-shape.png);
          "
        ></div>
        <div class="container">
          <div class="section-title-two text-center">
            <div class="section-title-two__tagline-box">
              <p class="section-title-two__tagline">News and articles</p>
            </div>
            <h2 class="section-title-two__title">
              Read our latest news<br />
              and product announcements
            </h2>
          </div>
          <div class="services-two__bottom">
            <div
              class="services-two__carousel owl-carousel owl-theme thm-owl__carousel"
              data-owl-options='{
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
              }'
            >
              <!-- Services Two Single Start -->
              <div class="item">
                <div class="services-two__single">
                  <div class="services-two__img-box">
                    <div class="services-two__img">
                      <img
                        src="/assets/images/news/news-1.jpg"
                        alt="Gen 5 NVMe Host IP on AGILEX 7 R-Tile"
                      />
                    </div>
                  </div>
                  <div class="services-two__content">
                    <div class="services-two__icon">
                      <span class="icon-teamwork"></span>
                      <div class="services-two__icon-shape"></div>
                    </div>
                    <h3 class="services-two__title">
                      <a href="/news">
                        Gen 5 NVMe Host IP<br />
                        on AGILEX 7 R-Tile !
                      </a>
                    </h3>
                    <p class="services-two__text">
                      France, Gournay sur Marne, September 5th 2025 – The Gen5
                      NVME-HOST-IP on AGILEX 7 R-Tile...
                    </p>
                    <a href="/news" class="services-two__btn">
                      Read More<span class="icon-right-arrow"></span>
                    </a>
                  </div>
                </div>
              </div>
              <!-- Services Two Single End -->

              <!-- Services Two Single Start -->
              <div class="item">
                <div class="services-two__single">
                  <div class="services-two__img-box">
                    <div class="services-two__img">
                      <img
                        src="/assets/images/news/news-2.png"
                        alt="NVME Host IP on Kintex Ultra Scale Plus"
                      />
                    </div>
                  </div>
                  <div class="services-two__content">
                    <div class="services-two__icon">
                      <span class="icon-coin-stack"></span>
                      <div class="services-two__icon-shape"></div>
                    </div>
                    <h3 class="services-two__title">
                      <a href="/news">
                        NVME Host IP on<br />
                        Kintex Ultra Scale Plus !
                      </a>
                    </h3>
                    <p class="services-two__text">
                      France, Gournay sur Marne, November 14th 2024 – The
                      NVME-HOST-IP on Kintex Ultra Scale Plus...
                    </p>
                    <a href="/news" class="services-two__btn">
                      Read More<span class="icon-right-arrow"></span>
                    </a>
                  </div>
                </div>
              </div>
              <!-- Services Two Single End -->

              <!-- Services Two Single Start -->
              <div class="item">
                <div class="services-two__single">
                  <div class="services-two__img-box">
                    <div class="services-two__img">
                      <img
                        src="/assets/images/news/news-3.jpg"
                        alt="New ARINC 429 IP"
                      />
                    </div>
                  </div>
                  <div class="services-two__content">
                    <div class="services-two__icon">
                      <span class="icon-teamwork"></span>
                      <div class="services-two__icon-shape"></div>
                    </div>
                    <h3 class="services-two__title">
                      <a href="/news">New ARINC 429 IP</a>
                    </h3>
                    <p class="services-two__text">
                      France, Gournay sur Marne, November 4th 2024 – The new
                      ARINC 429 IP from Logic Design Solutions...
                    </p>
                    <a href="/news" class="services-two__btn">
                      Read More<span class="icon-right-arrow"></span>
                    </a>
                  </div>
                </div>
              </div>
              <!-- Services Two Single End -->

              <!-- Services Two Single Start -->
              <div class="item">
                <div class="services-two__single">
                  <div class="services-two__img-box">
                    <div class="services-two__img">
                      <img
                        src="/assets/images/news/news-4.jpg"
                        alt="Gen4 NVME Host IP on Artix Ultra Scale Plus"
                      />
                    </div>
                  </div>
                  <div class="services-two__content">
                    <div class="services-two__icon">
                      <span class="icon-coin-stack"></span>
                      <div class="services-two__icon-shape"></div>
                    </div>
                    <h3 class="services-two__title">
                      <a href="/news">
                        Gen4 NVME Host IP on<br />
                        Artix Ultra Scale Plus !
                      </a>
                    </h3>
                    <p class="services-two__text">
                      France, Gournay sur Marne, November 4th 2024 – The Gen4
                      NVME-HOST-IP on Artix Ultra Scale Plus...
                    </p>
                    <a href="/news" class="services-two__btn">
                      Read More<span class="icon-right-arrow"></span>
                    </a>
                  </div>
                </div>
              </div>
              <!-- Services Two Single End -->
            </div>
          </div>
        </div>
      </section>
      <!-- Services Two End -->

      <!-- Brand Two Start -->
      <section class="brand-one brand-two">
        <div class="container">
          <div class="section-title-two text-center">
            <h2 class="section-title-two__title">Trusted Technology Partners</h2>
          </div>
          <p class="brand-two__text">
            Logic Design Solutions collaborates with leading technology
            providers<br />
            to deliver cutting-edge FPGA and IP solutions
          </p>
          <div class="brand-one__inner">
            <div
              class="thm-swiper__slider swiper-container"
              data-swiper-options='{
                "spaceBetween": 100,
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
                }
              }'
            >
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img
                    src="/assets/images/brand/AMD_Embedded_Select.png"
                    alt="AMD Embedded Select Partner"
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="/assets/images/brand/Member-Badge-1-1.png"
                    alt="Intel Partner"
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="/assets/images/brand/image001.png"
                    alt="Technology Partner"
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="/assets/images/brand/AMD_Embedded_Select.png"
                    alt="AMD Embedded Select Partner"
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="/assets/images/brand/Member-Badge-1-1.png"
                    alt="Intel Partner"
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="/assets/images/brand/image001.png"
                    alt="Technology Partner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Brand Two End -->

      <!-- Google Map Start -->
      <section class="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.7967516134676!2d2.5699478999999997!3d48.8561268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e611de797bffff%3A0xea046efe8222fe8!2sLogic%20Design%20Solutions!5e0!3m2!1sfr!2sfr!4v1696521234567!5m2!1sfr!2sfr"
          class="google-map__one"
          allowfullscreen
        ></iframe>
      </section>
      <!-- Google Map End -->

      <!-- Footer -->
      <AppFooter />
    </div>
    <!-- Page Wrapper End -->

    <!-- Mobile Navigation -->
    <div class="mobile-nav__wrapper">
      <div class="mobile-nav__overlay mobile-nav__toggler"></div>
      <div class="mobile-nav__content">
        <span class="mobile-nav__close mobile-nav__toggler"
          ><i class="fa fa-times"></i
        ></span>

        <div class="logo-box">
          <a
            href="/"
            style="
              font-size: 24px;
              font-weight: 700;
              font-style: italic;
              color: #000;
            "
            >LogicDesignSolutions</a
          >
        </div>

        <div class="mobile-nav__container"></div>

        <ul class="mobile-nav__contact list-unstyled">
          <li>
            <i class="fa fa-envelope"></i>
            <a href="mailto:contact@logic-design-solutions.com"
              >contact@logic-design-solutions.com</a
            >
          </li>
          <li>
            <i class="fa fa-phone-alt"></i>
            <a href="tel:+33145922447">+33 (0)1 45 92 24 47</a>
          </li>
        </ul>

        <div class="mobile-nav__top">
          <div class="mobile-nav__social">
            <a href="#" class="fab fa-twitter"></a>
            <a href="#" class="fab fa-facebook-square"></a>
            <a href="#" class="fab fa-pinterest-p"></a>
            <a href="#" class="fab fa-instagram"></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Popup -->
    <div class="search-popup">
      <div class="search-popup__overlay search-toggler"></div>
      <div class="search-popup__content">
        <form action="#">
          <label for="search" class="sr-only">search here</label>
          <input type="text" id="search" placeholder="Search Here..." />
          <button type="submit" aria-label="search submit" class="thm-btn">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>

    <!-- Scroll to Top -->
    <a href="#" data-target="html" class="scroll-to-target scroll-to-top"
      ><i class="fas fa-arrow-up"></i
    ></a>

    <!-- Custom Cursor Component -->
    <CustomCursor />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Logic Design Solutions - FPGA Design Services & IP Solutions',
  meta: [
    {
      name: 'description',
      content:
        'Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP'
    }
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
