import { _ as __nuxt_component_0 } from './nuxt-link-DBddc7qB.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useHead } from './composables-UyBDQb6S.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _imports_2 = publicAssetsURL("/assets/images/resources/im1.jpeg");

const _imports_7 = publicAssetsURL("/assets/images/brand/AMD_Embedded_Select.png");
const _imports_8 = publicAssetsURL("/assets/images/brand/Member-Badge-1-1.png");
const _imports_9 = publicAssetsURL("/assets/images/brand/image001.png");

const _imports_0 = publicAssetsURL("/assets/images/shapes/slider-v2-shape1.png");
const _imports_1 = publicAssetsURL("/assets/images/shapes/about-v2-shape1.png");
const _imports_3 = publicAssetsURL("/assets/images/news/news-1.jpg");
const _imports_4 = publicAssetsURL("/assets/images/news/news-2.png");
const _imports_5 = publicAssetsURL("/assets/images/news/news-3.jpg");
const _imports_6 = publicAssetsURL("/assets/images/news/news-4.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Logic Design Solutions - FPGA Design Services & IP Solutions",
      meta: [
        {
          name: "description",
          content: "Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppPreloader = resolveComponent("AppPreloader");
      const _component_AppHeader = resolveComponent("AppHeader");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_AppFooter = resolveComponent("AppFooter");
      const _component_CustomCursor = resolveComponent("CustomCursor");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "custom-cursor" }, _attrs))} data-v-830ad1bb><div class="custom-cursor__cursor" data-v-830ad1bb></div><div class="custom-cursor__cursor-two" data-v-830ad1bb></div>`);
      _push(ssrRenderComponent(_component_AppPreloader, null, null, _parent));
      _push(`<div class="page-wrapper" data-v-830ad1bb>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<section class="main-slider-two" data-v-830ad1bb><div class="main-slider-two__carousel owl-carousel owl-theme thm-owl__carousel" data-owl-options="{&quot;loop&quot;: true, &quot;items&quot;: 1, &quot;navText&quot;: [&quot;&lt;span class=\\&quot;icon-left-arrow\\&quot;&gt;&lt;/span&gt;&quot;,&quot;&lt;span class=\\&quot;icon-right-arrow\\&quot;&gt;&lt;/span&gt;&quot;], &quot;margin&quot;: 0, &quot;dots&quot;: true, &quot;nav&quot;: false, &quot;animateOut&quot;: &quot;slideOutDown&quot;, &quot;animateIn&quot;: &quot;fadeIn&quot;, &quot;active&quot;: true, &quot;smartSpeed&quot;: 1000, &quot;autoplay&quot;: true, &quot;autoplayTimeout&quot;: 7000, &quot;autoplayHoverPause&quot;: false}" data-v-830ad1bb><div class="item main-slider-two__slide-1" data-v-830ad1bb><div class="main-slider-two__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-1.png)" })}" data-v-830ad1bb></div><div class="main-slider-two__shape-1" data-v-830ad1bb></div><div class="main-slider-two__shape-2" data-v-830ad1bb></div><div class="main-slider-two__shape-3" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-830ad1bb></div><div class="container" data-v-830ad1bb><div class="main-slider-two__content" data-v-830ad1bb><p class="main-slider-two__sub-title" data-v-830ad1bb>FPGA Design Services</p><h2 class="main-slider-two__title" data-v-830ad1bb> Discover our <br data-v-830ad1bb> product lines <br data-v-830ad1bb> and IP solutions </h2><div class="main-slider-two__btn-box" data-v-830ad1bb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "main-slider-two__btn thm-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Let&#39;s Work Together <span class="icon-right-arrow" data-v-830ad1bb${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(" Let's Work Together "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="item main-slider-two__slide-2" data-v-830ad1bb><div class="main-slider-two__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-2.png)" })}" data-v-830ad1bb></div><div class="main-slider-two__shape-1" data-v-830ad1bb></div><div class="main-slider-two__shape-2" data-v-830ad1bb></div><div class="main-slider-two__shape-3" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-830ad1bb></div><div class="container" data-v-830ad1bb><div class="main-slider-two__content" data-v-830ad1bb><p class="main-slider-two__sub-title" data-v-830ad1bb>FPGA Design Services</p><h2 class="main-slider-two__title" data-v-830ad1bb> Discover our <br data-v-830ad1bb> product lines <br data-v-830ad1bb> and IP solutions </h2><div class="main-slider-two__btn-box" data-v-830ad1bb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "main-slider-two__btn thm-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Let&#39;s Work Together <span class="icon-right-arrow" data-v-830ad1bb${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(" Let's Work Together "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="item main-slider-two__slide-3" data-v-830ad1bb><div class="main-slider-two__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-3.png)" })}" data-v-830ad1bb></div><div class="main-slider-two__shape-1" data-v-830ad1bb></div><div class="main-slider-two__shape-2" data-v-830ad1bb></div><div class="main-slider-two__shape-3" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-830ad1bb></div><div class="container" data-v-830ad1bb><div class="main-slider-two__content" data-v-830ad1bb><p class="main-slider-two__sub-title" data-v-830ad1bb>FPGA Design Services</p><h2 class="main-slider-two__title" data-v-830ad1bb> Discover our <br data-v-830ad1bb> product lines <br data-v-830ad1bb> and IP solutions </h2><div class="main-slider-two__btn-box" data-v-830ad1bb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "main-slider-two__btn thm-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Let&#39;s Work Together <span class="icon-right-arrow" data-v-830ad1bb${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(" Let's Work Together "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></section><section class="about-two" data-v-830ad1bb><div class="shape1 rotate-me" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-830ad1bb></div><div class="container" data-v-830ad1bb><div class="row" data-v-830ad1bb><div class="col-xl-6" data-v-830ad1bb><div class="about-two__content" data-v-830ad1bb><div class="section-title text-left" data-v-830ad1bb><div class="section-title__tagline-box" data-v-830ad1bb><p class="section-title__tagline" data-v-830ad1bb>About Us</p></div><h2 class="section-title__title" data-v-830ad1bb>We help to get Solutions!</h2></div><div class="about-two__content-title" data-v-830ad1bb><h3 data-v-830ad1bb> professional activities to produce and sell goods or services for profit. </h3></div><div class="about-two__content-text" data-v-830ad1bb><p data-v-830ad1bb> Logic Design Solutions provides FPGA Design Services, NVMe IP, SATA IP, RECORDER IP, ARINC 429 IP, and DO254 methodology to FPGA customers. We engage our self to be your high standard quality solutions provider for FPGA IP and Design Services. </p></div><div class="about-two__content-inner" data-v-830ad1bb><div class="row" data-v-830ad1bb><div class="col-xl-6 col-lg-6 col-md-6" data-v-830ad1bb><ul class="about-two__list list-unstyled" data-v-830ad1bb><li data-v-830ad1bb><div class="icon" data-v-830ad1bb><span class="icon-arrows" data-v-830ad1bb></span></div><div class="text" data-v-830ad1bb><p align="justify" data-v-830ad1bb> Logic Design Solutions has a deep knowledge of FPGA &amp; IP design... </p></div></li><li data-v-830ad1bb><div class="icon" data-v-830ad1bb><span class="icon-arrows" data-v-830ad1bb></span></div><div class="text" data-v-830ad1bb><p align="justify" data-v-830ad1bb> Logic Design Solutions develops IP for FPGA, like NVMe IP, SATA IP, Recorder IP... </p></div></li></ul></div><div class="col-xl-6 col-lg-6 col-md-6" data-v-830ad1bb><ul class="about-two__list two list-unstyled" data-v-830ad1bb><li data-v-830ad1bb><div class="icon" data-v-830ad1bb><span class="icon-arrows" data-v-830ad1bb></span></div><div class="text" data-v-830ad1bb><p align="justify" data-v-830ad1bb> Customers&#39; Logic Design Solutions are provided with a phone hotline and e-mail support to answer... </p></div></li><li data-v-830ad1bb><div class="icon" data-v-830ad1bb><span class="icon-arrows" data-v-830ad1bb></span></div><div class="text" data-v-830ad1bb><p align="justify" data-v-830ad1bb> Logic Design Solutions&#39; IP are an excellent value. Our competitive pricing enables customers to decide... </p></div></li></ul></div></div></div><div class="about-two__content-btn" data-v-830ad1bb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "thm-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Learn About Us <span class="icon-right-arrow" data-v-830ad1bb${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(" Learn About Us "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="col-xl-6" data-v-830ad1bb><div class="about-two__img" data-v-830ad1bb><div class="about-two__img-award" data-v-830ad1bb><div class="icon" data-v-830ad1bb><span class="icon-badge" data-v-830ad1bb></span></div><h3 data-v-830ad1bb> Since 1994 <br data-v-830ad1bb> Logic Design Solutions </h3></div><div class="about-two__img-inner" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_2)} alt="Image" style="${ssrRenderStyle({ "border-radius": "10px" })}" data-v-830ad1bb><div class="about-two__img-line about-two__img-line1" data-v-830ad1bb></div><div class="about-two__img-line about-two__img-line2" data-v-830ad1bb></div></div></div></div></div></div></section><section class="services-two" data-v-830ad1bb><div class="services-two__bg-shape" style="${ssrRenderStyle({ "background-image": "url(/assets/images/shapes/services-two-bg-shape.png)" })}" data-v-830ad1bb></div><div class="container" data-v-830ad1bb><div class="section-title-two text-center" data-v-830ad1bb><div class="section-title-two__tagline-box" data-v-830ad1bb><p class="section-title-two__tagline" data-v-830ad1bb>News and articles</p></div><h2 class="section-title-two__title" data-v-830ad1bb> Read our latest news<br data-v-830ad1bb> and product announcements </h2></div><div class="services-two__bottom" data-v-830ad1bb><div class="services-two__carousel owl-carousel owl-theme thm-owl__carousel" data-owl-options="{
                &quot;loop&quot;: true,
                &quot;autoplay&quot;: true,
                &quot;margin&quot;: 30,
                &quot;nav&quot;: true,
                &quot;dots&quot;: false,
                &quot;smartSpeed&quot;: 500,
                &quot;autoplayTimeout&quot;: 10000,
                &quot;navText&quot;: [&quot;&lt;span class=\\&quot;icon-left-arrow\\&quot;&gt;&lt;/span&gt;&quot;,&quot;&lt;span class=\\&quot;icon-right-arrow\\&quot;&gt;&lt;/span&gt;&quot;],
                &quot;responsive&quot;: {
                  &quot;0&quot;: {
                    &quot;items&quot;: 1
                  },
                  &quot;768&quot;: {
                    &quot;items&quot;: 1
                  },
                  &quot;992&quot;: {
                    &quot;items&quot;: 1
                  },
                  &quot;1200&quot;: {
                    &quot;items&quot;: 1
                  },
                  &quot;1350&quot;: {
                    &quot;items&quot;: 2
                  }
                }
              }" data-v-830ad1bb><div class="item" data-v-830ad1bb><div class="services-two__single" data-v-830ad1bb><div class="services-two__img-box" data-v-830ad1bb><div class="services-two__img" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_3)} alt="Gen 5 NVMe Host IP on AGILEX 7 R-Tile" data-v-830ad1bb></div></div><div class="services-two__content" data-v-830ad1bb><div class="services-two__icon" data-v-830ad1bb><span class="icon-teamwork" data-v-830ad1bb></span><div class="services-two__icon-shape" data-v-830ad1bb></div></div><h3 class="services-two__title" data-v-830ad1bb><a href="/news" data-v-830ad1bb> Gen 5 NVMe Host IP<br data-v-830ad1bb> on AGILEX 7 R-Tile ! </a></h3><p class="services-two__text" data-v-830ad1bb> France, Gournay sur Marne, September 5th 2025 – The Gen5 NVME-HOST-IP on AGILEX 7 R-Tile... </p><a href="/news" class="services-two__btn" data-v-830ad1bb> Read More<span class="icon-right-arrow" data-v-830ad1bb></span></a></div></div></div><div class="item" data-v-830ad1bb><div class="services-two__single" data-v-830ad1bb><div class="services-two__img-box" data-v-830ad1bb><div class="services-two__img" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_4)} alt="NVME Host IP on Kintex Ultra Scale Plus" data-v-830ad1bb></div></div><div class="services-two__content" data-v-830ad1bb><div class="services-two__icon" data-v-830ad1bb><span class="icon-coin-stack" data-v-830ad1bb></span><div class="services-two__icon-shape" data-v-830ad1bb></div></div><h3 class="services-two__title" data-v-830ad1bb><a href="/news" data-v-830ad1bb> NVME Host IP on<br data-v-830ad1bb> Kintex Ultra Scale Plus ! </a></h3><p class="services-two__text" data-v-830ad1bb> France, Gournay sur Marne, November 14th 2024 – The NVME-HOST-IP on Kintex Ultra Scale Plus... </p><a href="/news" class="services-two__btn" data-v-830ad1bb> Read More<span class="icon-right-arrow" data-v-830ad1bb></span></a></div></div></div><div class="item" data-v-830ad1bb><div class="services-two__single" data-v-830ad1bb><div class="services-two__img-box" data-v-830ad1bb><div class="services-two__img" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_5)} alt="New ARINC 429 IP" data-v-830ad1bb></div></div><div class="services-two__content" data-v-830ad1bb><div class="services-two__icon" data-v-830ad1bb><span class="icon-teamwork" data-v-830ad1bb></span><div class="services-two__icon-shape" data-v-830ad1bb></div></div><h3 class="services-two__title" data-v-830ad1bb><a href="/news" data-v-830ad1bb>New ARINC 429 IP</a></h3><p class="services-two__text" data-v-830ad1bb> France, Gournay sur Marne, November 4th 2024 – The new ARINC 429 IP from Logic Design Solutions... </p><a href="/news" class="services-two__btn" data-v-830ad1bb> Read More<span class="icon-right-arrow" data-v-830ad1bb></span></a></div></div></div><div class="item" data-v-830ad1bb><div class="services-two__single" data-v-830ad1bb><div class="services-two__img-box" data-v-830ad1bb><div class="services-two__img" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_6)} alt="Gen4 NVME Host IP on Artix Ultra Scale Plus" data-v-830ad1bb></div></div><div class="services-two__content" data-v-830ad1bb><div class="services-two__icon" data-v-830ad1bb><span class="icon-coin-stack" data-v-830ad1bb></span><div class="services-two__icon-shape" data-v-830ad1bb></div></div><h3 class="services-two__title" data-v-830ad1bb><a href="/news" data-v-830ad1bb> Gen4 NVME Host IP on<br data-v-830ad1bb> Artix Ultra Scale Plus ! </a></h3><p class="services-two__text" data-v-830ad1bb> France, Gournay sur Marne, November 4th 2024 – The Gen4 NVME-HOST-IP on Artix Ultra Scale Plus... </p><a href="/news" class="services-two__btn" data-v-830ad1bb> Read More<span class="icon-right-arrow" data-v-830ad1bb></span></a></div></div></div></div></div></div></section><section class="brand-one brand-two" data-v-830ad1bb><div class="container" data-v-830ad1bb><div class="section-title-two text-center" data-v-830ad1bb><h2 class="section-title-two__title" data-v-830ad1bb>Trusted Technology Partners</h2></div><p class="brand-two__text" data-v-830ad1bb> Logic Design Solutions collaborates with leading technology providers<br data-v-830ad1bb> to deliver cutting-edge FPGA and IP solutions </p><div class="brand-one__inner" data-v-830ad1bb><div class="thm-swiper__slider swiper-container" data-swiper-options="{
                &quot;spaceBetween&quot;: 100,
                &quot;slidesPerView&quot;: 3,
                &quot;loop&quot;: true,
                &quot;navigation&quot;: {
                  &quot;nextEl&quot;: &quot;#brand-one__swiper-button-next&quot;,
                  &quot;prevEl&quot;: &quot;#brand-one__swiper-button-prev&quot;
                },
                &quot;autoplay&quot;: { &quot;delay&quot;: 5000 },
                &quot;breakpoints&quot;: {
                  &quot;0&quot;: {
                    &quot;spaceBetween&quot;: 30,
                    &quot;slidesPerView&quot;: 1
                  },
                  &quot;375&quot;: {
                    &quot;spaceBetween&quot;: 30,
                    &quot;slidesPerView&quot;: 1
                  },
                  &quot;575&quot;: {
                    &quot;spaceBetween&quot;: 50,
                    &quot;slidesPerView&quot;: 2
                  },
                  &quot;767&quot;: {
                    &quot;spaceBetween&quot;: 50,
                    &quot;slidesPerView&quot;: 2
                  },
                  &quot;991&quot;: {
                    &quot;spaceBetween&quot;: 80,
                    &quot;slidesPerView&quot;: 3
                  },
                  &quot;1199&quot;: {
                    &quot;spaceBetween&quot;: 100,
                    &quot;slidesPerView&quot;: 3
                  }
                }
              }" data-v-830ad1bb><div class="swiper-wrapper" data-v-830ad1bb><div class="swiper-slide" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_7)} alt="AMD Embedded Select Partner" data-v-830ad1bb></div><div class="swiper-slide" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_8)} alt="Intel Partner" data-v-830ad1bb></div><div class="swiper-slide" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_9)} alt="Technology Partner" data-v-830ad1bb></div><div class="swiper-slide" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_7)} alt="AMD Embedded Select Partner" data-v-830ad1bb></div><div class="swiper-slide" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_8)} alt="Intel Partner" data-v-830ad1bb></div><div class="swiper-slide" data-v-830ad1bb><img${ssrRenderAttr("src", _imports_9)} alt="Technology Partner" data-v-830ad1bb></div></div></div></div></div></section><section class="google-map" data-v-830ad1bb><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.7967516134676!2d2.5699478999999997!3d48.8561268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e611de797bffff%3A0xea046efe8222fe8!2sLogic%20Design%20Solutions!5e0!3m2!1sfr!2sfr!4v1696521234567!5m2!1sfr!2sfr" class="google-map__one" allowfullscreen data-v-830ad1bb></iframe></section>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div><div class="mobile-nav__wrapper" data-v-830ad1bb><div class="mobile-nav__overlay mobile-nav__toggler" data-v-830ad1bb></div><div class="mobile-nav__content" data-v-830ad1bb><span class="mobile-nav__close mobile-nav__toggler" data-v-830ad1bb><i class="fa fa-times" data-v-830ad1bb></i></span><div class="logo-box" data-v-830ad1bb><a href="/" style="${ssrRenderStyle({ "font-size": "24px", "font-weight": "700", "font-style": "italic", "color": "#000" })}" data-v-830ad1bb>LogicDesignSolutions</a></div><div class="mobile-nav__container" data-v-830ad1bb></div><ul class="mobile-nav__contact list-unstyled" data-v-830ad1bb><li data-v-830ad1bb><i class="fa fa-envelope" data-v-830ad1bb></i><a href="mailto:contact@logic-design-solutions.com" data-v-830ad1bb>contact@logic-design-solutions.com</a></li><li data-v-830ad1bb><i class="fa fa-phone-alt" data-v-830ad1bb></i><a href="tel:+33145922447" data-v-830ad1bb>+33 (0)1 45 92 24 47</a></li></ul><div class="mobile-nav__top" data-v-830ad1bb><div class="mobile-nav__social" data-v-830ad1bb><a href="#" class="fab fa-twitter" data-v-830ad1bb></a><a href="#" class="fab fa-facebook-square" data-v-830ad1bb></a><a href="#" class="fab fa-pinterest-p" data-v-830ad1bb></a><a href="#" class="fab fa-instagram" data-v-830ad1bb></a></div></div></div></div><div class="search-popup" data-v-830ad1bb><div class="search-popup__overlay search-toggler" data-v-830ad1bb></div><div class="search-popup__content" data-v-830ad1bb><form action="#" data-v-830ad1bb><label for="search" class="sr-only" data-v-830ad1bb>search here</label><input type="text" id="search" placeholder="Search Here..." data-v-830ad1bb><button type="submit" aria-label="search submit" class="thm-btn" data-v-830ad1bb><i class="fas fa-search" data-v-830ad1bb></i></button></form></div></div><a href="#" data-target="html" class="scroll-to-target scroll-to-top" data-v-830ad1bb><i class="fas fa-arrow-up" data-v-830ad1bb></i></a>`);
      _push(ssrRenderComponent(_component_CustomCursor, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-830ad1bb"]]);

export { index as default };
//# sourceMappingURL=index-CmQo2hyg.mjs.map
