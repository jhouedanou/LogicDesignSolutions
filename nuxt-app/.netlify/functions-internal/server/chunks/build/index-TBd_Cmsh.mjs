import { _ as __nuxt_component_2, a as __nuxt_component_0$1 } from './CustomCursor-D19TEYJI.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BzAABopN.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { _ as _imports_0$1 } from './virtual_public-BdpABuC_.mjs';
import { _ as _imports_1$1, a as _imports_2, b as _imports_3$1 } from './virtual_public-D37Ld3xQ.mjs';
import { u as useContent } from './useContent-DR2Pjl6_.mjs';
import { u as useHead } from './composables-DFgJCqKW.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

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
    const { about, brands } = useContent();
    const isLoading = ref(true);
    useHead({
      title: "Logic Design Solutions - FPGA Design Services & IP Solutions",
      meta: [
        {
          name: "description",
          content: "Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP"
        }
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        },
        { rel: "stylesheet", href: "/assets/vendors/bootstrap/css/bootstrap.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/animate/animate.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/animate/custom-animate.css" },
        { rel: "stylesheet", href: "/assets/vendors/fontawesome/css/all.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/jarallax/jarallax.css" },
        { rel: "stylesheet", href: "/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css" },
        { rel: "stylesheet", href: "/assets/vendors/odometer/odometer.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/swiper/swiper.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/smartbiz-icons/style.css" },
        { rel: "stylesheet", href: "/assets/vendors/owl-carousel/owl.carousel.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/owl-carousel/owl.theme.default.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/bootstrap-select/css/bootstrap-select.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/jquery-ui/jquery-ui.css" },
        { rel: "stylesheet", href: "/assets/css/smartbiz.css" },
        { rel: "stylesheet", href: "/assets/css/smartbiz-responsive.css" },
        { rel: "stylesheet", href: "/assets/css/logic-custom.css" }
      ],
      script: [
        { src: "/assets/vendors/jquery/jquery-3.6.0.min.js" },
        { src: "/assets/vendors/bootstrap/js/bootstrap.bundle.min.js" },
        { src: "/assets/vendors/jarallax/jarallax.min.js" },
        { src: "/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js" },
        { src: "/assets/vendors/jquery-appear/jquery.appear.min.js" },
        { src: "/assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js" },
        { src: "/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js" },
        { src: "/assets/vendors/jquery-validate/jquery.validate.min.js" },
        { src: "/assets/vendors/odometer/odometer.min.js" },
        { src: "/assets/vendors/swiper/swiper.min.js" },
        { src: "/assets/vendors/wnumb/wNumb.min.js" },
        { src: "/assets/vendors/wow/wow.js" },
        { src: "/assets/vendors/isotope/isotope.js" },
        { src: "/assets/vendors/owl-carousel/owl.carousel.min.js" },
        { src: "/assets/vendors/bootstrap-select/js/bootstrap-select.min.js" },
        { src: "/assets/vendors/jquery-ui/jquery-ui.js" },
        { src: "/assets/vendors/jquery.circle-type/jquery.circleType.js" },
        { src: "/assets/vendors/jquery.circle-type/jquery.lettering.min.js" },
        { src: "/assets/js/smartbiz.js" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppMenu = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CustomCursor = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "custom-cursor" }, _attrs))} data-v-8aec84e0>`);
      if (isLoading.value) {
        _push(`<div class="loader js-preloader" data-v-8aec84e0><div data-v-8aec84e0></div><div data-v-8aec84e0></div><div data-v-8aec84e0></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="page-wrapper" data-v-8aec84e0><header class="main-header-two" data-v-8aec84e0>`);
      _push(ssrRenderComponent(_component_AppMenu, null, null, _parent));
      _push(`</header><div class="stricky-header stricked-menu main-menu main-menu-two" data-v-8aec84e0><div class="sticky-header__content" data-v-8aec84e0></div></div><section class="main-slider-two" data-v-8aec84e0><div class="main-slider-two__carousel owl-carousel owl-theme thm-owl__carousel" data-owl-options="{&quot;loop&quot;: true, &quot;items&quot;: 1, &quot;navText&quot;: [&quot;&lt;span class=\\&quot;icon-left-arrow\\&quot;&gt;&lt;/span&gt;&quot;,&quot;&lt;span class=\\&quot;icon-right-arrow\\&quot;&gt;&lt;/span&gt;&quot;], &quot;margin&quot;: 0, &quot;dots&quot;: true, &quot;nav&quot;: false, &quot;animateOut&quot;: &quot;slideOutDown&quot;, &quot;animateIn&quot;: &quot;fadeIn&quot;, &quot;active&quot;: true, &quot;smartSpeed&quot;: 1000, &quot;autoplay&quot;: true, &quot;autoplayTimeout&quot;: 7000, &quot;autoplayHoverPause&quot;: false}" data-v-8aec84e0><div class="item main-slider-two__slide-1" data-v-8aec84e0><div class="main-slider-two__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-1.webp)" })}" data-v-8aec84e0></div><div class="main-slider-two__shape-1" data-v-8aec84e0></div><div class="main-slider-two__shape-2" data-v-8aec84e0></div><div class="main-slider-two__shape-3" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-8aec84e0></div><div class="container" data-v-8aec84e0><div class="main-slider-two__content" data-v-8aec84e0><p class="main-slider-two__sub-title" data-v-8aec84e0>FPGA Design Services</p><h2 class="main-slider-two__title" data-v-8aec84e0>Discover our <br data-v-8aec84e0> product lines <br data-v-8aec84e0> and IP solutions</h2><div class="main-slider-two__btn-box" data-v-8aec84e0><a href="/products" class="main-slider-two__btn thm-btn" data-v-8aec84e0>Let&#39;s Work Together<span class="icon-right-arrow" data-v-8aec84e0></span></a></div></div></div></div><div class="item main-slider-two__slide-2" data-v-8aec84e0><div class="main-slider-two__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-2.webp)" })}" data-v-8aec84e0></div><div class="main-slider-two__shape-1" data-v-8aec84e0></div><div class="main-slider-two__shape-2" data-v-8aec84e0></div><div class="main-slider-two__shape-3" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-8aec84e0></div><div class="container" data-v-8aec84e0><div class="main-slider-two__content" data-v-8aec84e0><p class="main-slider-two__sub-title" data-v-8aec84e0>FPGA Design Services</p><h2 class="main-slider-two__title" data-v-8aec84e0>Discover our <br data-v-8aec84e0> product lines <br data-v-8aec84e0> and IP solutions</h2><div class="main-slider-two__btn-box" data-v-8aec84e0><a href="/products" class="main-slider-two__btn thm-btn" data-v-8aec84e0>Let&#39;s Work Together<span class="icon-right-arrow" data-v-8aec84e0></span></a></div></div></div></div><div class="item main-slider-two__slide-3" data-v-8aec84e0><div class="main-slider-two__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-3.webp)" })}" data-v-8aec84e0></div><div class="main-slider-two__shape-1" data-v-8aec84e0></div><div class="main-slider-two__shape-2" data-v-8aec84e0></div><div class="main-slider-two__shape-3" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-8aec84e0></div><div class="container" data-v-8aec84e0><div class="main-slider-two__content" data-v-8aec84e0><p class="main-slider-two__sub-title" data-v-8aec84e0>FPGA Design Services</p><h2 class="main-slider-two__title" data-v-8aec84e0>Discover our <br data-v-8aec84e0> product lines <br data-v-8aec84e0> and IP solutions</h2><div class="main-slider-two__btn-box" data-v-8aec84e0><a href="/products" class="main-slider-two__btn thm-btn" data-v-8aec84e0>Let&#39;s Work Together<span class="icon-right-arrow" data-v-8aec84e0></span></a></div></div></div></div></div></section><section class="about-two" data-v-8aec84e0><div class="shape1 rotate-me" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-8aec84e0></div><div class="container" data-v-8aec84e0><div class="row" data-v-8aec84e0><div class="col-xl-6" data-v-8aec84e0><div class="about-two__content" data-v-8aec84e0><div class="section-title text-left" data-v-8aec84e0><div class="section-title__tagline-box" data-v-8aec84e0><p class="section-title__tagline" data-v-8aec84e0>${ssrInterpolate(unref(about)?.tagline)}</p></div><h2 class="section-title__title" data-v-8aec84e0>${ssrInterpolate(unref(about)?.title)}</h2></div><div class="about-two__content-title" data-v-8aec84e0><h3 data-v-8aec84e0>${ssrInterpolate(unref(about)?.contentTitle)}</h3></div><div class="about-two__content-text" data-v-8aec84e0><p data-v-8aec84e0>${ssrInterpolate(unref(about)?.description)}</p></div><div class="about-two__content-inner" data-v-8aec84e0><div class="row" data-v-8aec84e0><div class="col-xl-6 col-lg-6 col-md-6" data-v-8aec84e0><ul class="about-two__list list-unstyled" data-v-8aec84e0><!--[-->`);
      ssrRenderList(unref(about)?.features?.slice(0, 2), (feature) => {
        _push(`<li data-v-8aec84e0><div class="icon" data-v-8aec84e0><span class="icon-arrows" data-v-8aec84e0></span></div><div class="text" data-v-8aec84e0><p align="justify" data-v-8aec84e0>${ssrInterpolate(feature.description)}</p></div></li>`);
      });
      _push(`<!--]--></ul></div><div class="col-xl-6 col-lg-6 col-md-6" data-v-8aec84e0><ul class="about-two__list two list-unstyled" data-v-8aec84e0><!--[-->`);
      ssrRenderList(unref(about)?.features?.slice(2, 4), (feature) => {
        _push(`<li data-v-8aec84e0><div class="icon" data-v-8aec84e0><span class="icon-arrows" data-v-8aec84e0></span></div><div class="text" data-v-8aec84e0><p align="justify" data-v-8aec84e0>${ssrInterpolate(feature.description)}</p></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="about-two__content-btn" data-v-8aec84e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "thm-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(about)?.cta)}<span class="icon-right-arrow" data-v-8aec84e0${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(about)?.cta), 1),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="col-xl-6" data-v-8aec84e0><div class="about-two__img" data-v-8aec84e0><div class="about-two__img-award" data-v-8aec84e0><div class="icon" data-v-8aec84e0><span class="icon-badge" data-v-8aec84e0></span></div><h3 data-v-8aec84e0>${ssrInterpolate(unref(about)?.award)} <br data-v-8aec84e0>${ssrInterpolate(unref(about)?.companyName)}</h3></div><div class="about-two__img-inner" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_0$1)} alt="Image" style="${ssrRenderStyle({ "border-radius": "10px" })}" data-v-8aec84e0><div class="about-two__img-line about-two__img-line1" data-v-8aec84e0></div><div class="about-two__img-line about-two__img-line2" data-v-8aec84e0></div></div></div></div></div></div></section><section class="services-two" data-v-8aec84e0><div class="services-two__bg-shape" style="${ssrRenderStyle({ "background-image": "url(/assets/images/shapes/services-two-bg-shape.png)" })}" data-v-8aec84e0></div><div class="container" data-v-8aec84e0><div class="section-title-two text-center" data-v-8aec84e0><div class="section-title-two__tagline-box" data-v-8aec84e0><p class="section-title-two__tagline" data-v-8aec84e0>What we do</p></div><h2 class="section-title-two__title" data-v-8aec84e0>Recent <span data-v-8aec84e0>News</span> From <br data-v-8aec84e0> Blog Latest News </h2></div><div class="services-two__bottom" data-v-8aec84e0><div class="services-two__carousel owl-carousel owl-theme thm-owl__carousel" data-owl-options="{
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
            }" data-v-8aec84e0><div class="item" data-v-8aec84e0><div class="services-two__single" data-v-8aec84e0><div class="services-two__img-box" data-v-8aec84e0><div class="services-two__img" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_3)} alt="Gen 5 NVMe Host IP on AGILEX 7 R-Tile" data-v-8aec84e0></div></div><div class="services-two__content" data-v-8aec84e0><div class="services-two__icon" data-v-8aec84e0><span class="icon-teamwork" data-v-8aec84e0></span><div class="services-two__icon-shape" data-v-8aec84e0></div></div><h3 class="services-two__title" data-v-8aec84e0><a href="/news" data-v-8aec84e0>Gen 5 NVMe Host IP<br data-v-8aec84e0>on AGILEX 7 R-Tile !</a></h3><p class="services-two__text" data-v-8aec84e0>France, Gournay sur Marne, September 5th 2025 – The Gen5 NVME-HOST-IP on AGILEX 7 R-Tile...</p><a href="/news" class="services-two__btn" data-v-8aec84e0>Read More<span class="icon-right-arrow" data-v-8aec84e0></span></a></div></div></div><div class="item" data-v-8aec84e0><div class="services-two__single" data-v-8aec84e0><div class="services-two__img-box" data-v-8aec84e0><div class="services-two__img" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_4)} alt="NVME Host IP on Kintex Ultra Scale Plus" data-v-8aec84e0></div></div><div class="services-two__content" data-v-8aec84e0><div class="services-two__icon" data-v-8aec84e0><span class="icon-coin-stack" data-v-8aec84e0></span><div class="services-two__icon-shape" data-v-8aec84e0></div></div><h3 class="services-two__title" data-v-8aec84e0><a href="/news" data-v-8aec84e0>NVME Host IP on<br data-v-8aec84e0>Kintex Ultra Scale Plus !</a></h3><p class="services-two__text" data-v-8aec84e0>France, Gournay sur Marne, November 14th 2024 – The NVME-HOST-IP on Kintex Ultra Scale Plus...</p><a href="/news" class="services-two__btn" data-v-8aec84e0>Read More<span class="icon-right-arrow" data-v-8aec84e0></span></a></div></div></div><div class="item" data-v-8aec84e0><div class="services-two__single" data-v-8aec84e0><div class="services-two__img-box" data-v-8aec84e0><div class="services-two__img" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_5)} alt="New ARINC 429 IP" data-v-8aec84e0></div></div><div class="services-two__content" data-v-8aec84e0><div class="services-two__icon" data-v-8aec84e0><span class="icon-teamwork" data-v-8aec84e0></span><div class="services-two__icon-shape" data-v-8aec84e0></div></div><h3 class="services-two__title" data-v-8aec84e0><a href="/news" data-v-8aec84e0>New ARINC 429 IP</a></h3><p class="services-two__text" data-v-8aec84e0>France, Gournay sur Marne, November 4th 2024 – The new ARINC 429 IP from Logic Design Solutions...</p><a href="/news" class="services-two__btn" data-v-8aec84e0>Read More<span class="icon-right-arrow" data-v-8aec84e0></span></a></div></div></div><div class="item" data-v-8aec84e0><div class="services-two__single" data-v-8aec84e0><div class="services-two__img-box" data-v-8aec84e0><div class="services-two__img" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_6)} alt="Gen4 NVME Host IP on Artix Ultra Scale Plus" data-v-8aec84e0></div></div><div class="services-two__content" data-v-8aec84e0><div class="services-two__icon" data-v-8aec84e0><span class="icon-coin-stack" data-v-8aec84e0></span><div class="services-two__icon-shape" data-v-8aec84e0></div></div><h3 class="services-two__title" data-v-8aec84e0><a href="/news" data-v-8aec84e0>Gen4 NVME Host IP on<br data-v-8aec84e0>Artix Ultra Scale Plus !</a></h3><p class="services-two__text" data-v-8aec84e0>France, Gournay sur Marne, November 4th 2024 – The Gen4 NVME-HOST-IP on Artix Ultra Scale Plus...</p><a href="/news" class="services-two__btn" data-v-8aec84e0>Read More<span class="icon-right-arrow" data-v-8aec84e0></span></a></div></div></div></div></div></div></section><section class="brand-one brand-two" data-v-8aec84e0><div class="container" data-v-8aec84e0><div class="section-title-two text-center" data-v-8aec84e0><h2 class="section-title-two__title" data-v-8aec84e0>${ssrInterpolate(unref(brands)?.title)}</h2></div><p class="brand-two__text" data-v-8aec84e0>${ssrInterpolate(unref(brands)?.description)}</p><div class="brand-one__inner" data-v-8aec84e0><div class="thm-swiper__slider swiper-container" data-swiper-options="{&quot;spaceBetween&quot;: 100,
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
            }}" data-v-8aec84e0><div class="swiper-wrapper" data-v-8aec84e0><div class="swiper-slide" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_1$1)} alt="AMD Embedded Select Partner" data-v-8aec84e0></div><div class="swiper-slide" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_2)} alt="Intel Partner" data-v-8aec84e0></div><div class="swiper-slide" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_3$1)} alt="Technology Partner" data-v-8aec84e0></div><div class="swiper-slide" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_1$1)} alt="AMD Embedded Select Partner" data-v-8aec84e0></div><div class="swiper-slide" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_2)} alt="Intel Partner" data-v-8aec84e0></div><div class="swiper-slide" data-v-8aec84e0><img${ssrRenderAttr("src", _imports_3$1)} alt="Technology Partner" data-v-8aec84e0></div></div></div></div></div></section><section class="google-map" data-v-8aec84e0><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.7967516134676!2d2.5699478999999997!3d48.8561268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e611de797bffff%3A0xea046efe8222fe8!2sLogic%20Design%20Solutions!5e0!3m2!1sfr!2sfr!4v1696521234567!5m2!1sfr!2sfr" class="google-map__one" allowfullscreen data-v-8aec84e0></iframe></section><footer class="site-footer-two" data-v-8aec84e0><div class="site-footer-two__bottom" data-v-8aec84e0><div class="container" data-v-8aec84e0><div class="site-footer-two__bottom-inner" data-v-8aec84e0><div class="site-footer-two__logo" data-v-8aec84e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        style: { "font-size": "24px", "font-weight": "700", "font-style": "italic", "color": "#ffffff" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`LogicDesignSolutions`);
          } else {
            return [
              createTextVNode("LogicDesignSolutions")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="site-footer-two__bottom-text" data-v-8aec84e0>Copyright © Logic Design Solution All Rights Reserved - Design by <a style="${ssrRenderStyle({ "color": "#999999" })}" href="" data-v-8aec84e0>Digital Consulting</a></p><ul class="list-unstyled site-footer-two__bottom-menu" data-v-8aec84e0><li data-v-8aec84e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/profiles" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Profiles`);
          } else {
            return [
              createTextVNode("Profiles")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-8aec84e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Products`);
          } else {
            return [
              createTextVNode("Products")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-8aec84e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/faq" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FAQ`);
          } else {
            return [
              createTextVNode("FAQ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="site-footer-two__social" style="${ssrRenderStyle({ "display": "flex", "gap": "15px", "justify-content": "center" })}" data-v-8aec84e0><a href="#" style="${ssrRenderStyle({ "color": "#ffffff", "font-size": "20px" })}" data-v-8aec84e0><i class="fab fa-facebook" data-v-8aec84e0></i></a><a href="#" style="${ssrRenderStyle({ "color": "#ffffff", "font-size": "20px" })}" data-v-8aec84e0><i class="fab fa-twitter" data-v-8aec84e0></i></a><a href="#" style="${ssrRenderStyle({ "color": "#ffffff", "font-size": "20px" })}" data-v-8aec84e0><i class="fab fa-linkedin" data-v-8aec84e0></i></a><a href="#" style="${ssrRenderStyle({ "color": "#ffffff", "font-size": "20px" })}" data-v-8aec84e0><i class="fab fa-instagram" data-v-8aec84e0></i></a></div></div></div></div></footer></div><div class="mobile-nav__wrapper" data-v-8aec84e0><div class="mobile-nav__overlay mobile-nav__toggler" data-v-8aec84e0></div><div class="mobile-nav__content" data-v-8aec84e0><span class="mobile-nav__close mobile-nav__toggler" data-v-8aec84e0><i class="fa fa-times" data-v-8aec84e0></i></span><div class="logo-box" data-v-8aec84e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        style: { "font-size": "24px", "font-weight": "700", "font-style": "italic", "color": "#000" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`LogicDesignSolutions`);
          } else {
            return [
              createTextVNode("LogicDesignSolutions")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mobile-nav__container" data-v-8aec84e0></div><ul class="mobile-nav__contact list-unstyled" data-v-8aec84e0><li data-v-8aec84e0><i class="fa fa-envelope" data-v-8aec84e0></i><a href="mailto:contact@logic-design-solutions.com" data-v-8aec84e0>contact@logic-design-solutions.com</a></li><li data-v-8aec84e0><i class="fa fa-phone-alt" data-v-8aec84e0></i><a href="tel:+33145922447" data-v-8aec84e0>+33 (0)1 45 92 24 47</a></li></ul><div class="mobile-nav__top" data-v-8aec84e0><div class="mobile-nav__social" data-v-8aec84e0><a href="#" class="fab fa-twitter" data-v-8aec84e0></a><a href="#" class="fab fa-facebook-square" data-v-8aec84e0></a><a href="#" class="fab fa-pinterest-p" data-v-8aec84e0></a><a href="#" class="fab fa-instagram" data-v-8aec84e0></a></div></div></div></div><div class="search-popup" data-v-8aec84e0><div class="search-popup__overlay search-toggler" data-v-8aec84e0></div><div class="search-popup__content" data-v-8aec84e0><form action="#" data-v-8aec84e0><label for="search" class="sr-only" data-v-8aec84e0>search here</label><input type="text" id="search" placeholder="Search Here..." data-v-8aec84e0><button type="submit" aria-label="search submit" class="thm-btn" data-v-8aec84e0><i class="fas fa-search" data-v-8aec84e0></i></button></form></div></div><a href="#" data-target="html" class="scroll-to-target scroll-to-top" data-v-8aec84e0><i class="fas fa-arrow-up" data-v-8aec84e0></i></a>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8aec84e0"]]);

export { index as default };
//# sourceMappingURL=index-TBd_Cmsh.mjs.map
