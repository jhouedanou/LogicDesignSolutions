import { a as __nuxt_component_0, _ as __nuxt_component_2 } from './CustomCursor-D19TEYJI.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzAABopN.mjs';
import { u as useContent } from './useContent-DR2Pjl6_.mjs';
import { u as useHead } from './composables-DFgJCqKW.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppPreloader",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      if (isLoading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "loader js-preloader" }, _attrs))}><div></div><div></div><div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppPreloader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "AppPreloader" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, navigation, footer: footerData } = useContent();
    const footer = computed(() => {
      return {
        siteName: site.value?.siteName || "LogicDesignSolutions",
        copyright: footerData.value?.copyright || "Copyright © Logic Design Solution All Rights Reserved - Design by Digital Consulting",
        designerName: "Digital Consulting",
        designerUrl: "#",
        menuItems: navigation.value?.footerMenu || [],
        socialLinks: footerData.value?.socialLinks || []
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "site-footer-two" }, _attrs))}><div class="site-footer-two__bottom"><div class="container"><div class="site-footer-two__bottom-inner"><div class="site-footer-two__logo">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        style: { "font-size": "24px", "font-weight": "700", "font-style": "italic", "color": "#ffffff" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(footer.value.siteName)}`);
          } else {
            return [
              createTextVNode(toDisplayString(footer.value.siteName), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="site-footer-two__bottom-text">${ssrInterpolate(footer.value.copyright)} `);
      if (footer.value.designerName) {
        _push(`<a style="${ssrRenderStyle({ "color": "#999999" })}"${ssrRenderAttr("href", footer.value.designerUrl)}>${ssrInterpolate(footer.value.designerName)}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
      if (footer.value.menuItems.length) {
        _push(`<ul class="list-unstyled site-footer-two__bottom-menu"><!--[-->`);
        ssrRenderList(footer.value.menuItems, (item) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.path
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      if (footer.value.socialLinks.length) {
        _push(`<div class="site-footer-two__social" style="${ssrRenderStyle({ "display": "flex", "gap": "15px", "justify-content": "center" })}"><!--[-->`);
        ssrRenderList(footer.value.socialLinks, (social) => {
          _push(`<a${ssrRenderAttr("href", social.url)}${ssrRenderAttr("aria-label", social.name)} style="${ssrRenderStyle({ "color": "#ffffff", "font-size": "20px" })}"><i class="${ssrRenderClass(`fab fa-${social.icon}`)}"></i></a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "AppFooter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, footer } = useContent();
    const socialLinks = computed(() => footer.value?.socialLinks ?? []);
    useHead({
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Logic Design Solutions` : "Logic Design Solutions";
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Logic Design Solutions - FPGA Design Services & IP Solutions" }
      ],
      link: [
        { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/images/favicons/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/images/favicons/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/images/favicons/favicon-16x16.png" },
        { rel: "manifest", href: "/assets/images/favicons/site.webmanifest" },
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
        { src: "/assets/vendors/jquery/jquery-3.6.0.min.js", body: true },
        { src: "/assets/vendors/bootstrap/js/bootstrap.bundle.min.js", body: true },
        { src: "/assets/vendors/jarallax/jarallax.min.js", body: true },
        { src: "/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js", body: true },
        { src: "/assets/vendors/jquery-appear/jquery.appear.min.js", body: true },
        { src: "/assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js", body: true },
        { src: "/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js", body: true },
        { src: "/assets/vendors/jquery-validate/jquery.validate.min.js", body: true },
        { src: "/assets/vendors/odometer/odometer.min.js", body: true },
        { src: "/assets/vendors/swiper/swiper.min.js", body: true },
        { src: "/assets/vendors/wnumb/wNumb.min.js", body: true },
        { src: "/assets/vendors/wow/wow.js", body: true },
        { src: "/assets/vendors/isotope/isotope.js", body: true },
        { src: "/assets/vendors/owl-carousel/owl.carousel.min.js", body: true },
        { src: "/assets/vendors/bootstrap-select/js/bootstrap-select.min.js", body: true },
        { src: "/assets/vendors/jquery-ui/jquery-ui.js", body: true },
        { src: "/assets/vendors/jquery.circle-type/jquery.circleType.js", body: true },
        { src: "/assets/vendors/jquery.circle-type/jquery.lettering.min.js", body: true },
        { src: "/assets/js/smartbiz.js", body: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomCursor = __nuxt_component_0;
      const _component_AppPreloader = __nuxt_component_1;
      const _component_AppMenu = __nuxt_component_2;
      const _component_AppFooter = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-root custom-cursor" }, _attrs))} data-v-d5d316b9>`);
      _push(ssrRenderComponent(_component_CustomCursor, null, null, _parent));
      _push(ssrRenderComponent(_component_AppPreloader, null, null, _parent));
      _push(`<div class="page-wrapper" data-v-d5d316b9><header class="main-header-two" data-v-d5d316b9>`);
      _push(ssrRenderComponent(_component_AppMenu, null, null, _parent));
      _push(`</header><div class="stricky-header stricked-menu main-menu main-menu-two" data-v-d5d316b9><div class="sticky-header__content" data-v-d5d316b9></div></div><main class="main-content" data-v-d5d316b9>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div><div class="mobile-nav__wrapper" data-v-d5d316b9><div class="mobile-nav__overlay mobile-nav__toggler" data-v-d5d316b9></div><div class="mobile-nav__content" data-v-d5d316b9><span class="mobile-nav__close mobile-nav__toggler" data-v-d5d316b9><i class="fa fa-times" data-v-d5d316b9></i></span><div class="logo-box" data-v-d5d316b9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        style: { "font-size": "24px", "font-weight": "700", "font-style": "italic", "color": "#000" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(site)?.siteName)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(site)?.siteName), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mobile-nav__container" data-v-d5d316b9></div><ul class="mobile-nav__contact list-unstyled" data-v-d5d316b9><li data-v-d5d316b9><i class="fa fa-envelope" data-v-d5d316b9></i><a${ssrRenderAttr("href", `mailto:${unref(site)?.email}`)} data-v-d5d316b9>${ssrInterpolate(unref(site)?.email)}</a></li><li data-v-d5d316b9><i class="fa fa-phone-alt" data-v-d5d316b9></i><a${ssrRenderAttr("href", `tel:${unref(site)?.phone?.replace(/\s/g, "")}`)} data-v-d5d316b9>${ssrInterpolate(unref(site)?.phone)}</a></li></ul><div class="mobile-nav__top" data-v-d5d316b9><div class="mobile-nav__social" data-v-d5d316b9><!--[-->`);
      ssrRenderList(socialLinks.value, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} class="${ssrRenderClass(`fab fa-${social.icon}`)}" data-v-d5d316b9></a>`);
      });
      _push(`<!--]--></div></div></div></div><div class="search-popup" data-v-d5d316b9><div class="search-popup__overlay search-toggler" data-v-d5d316b9></div><div class="search-popup__content" data-v-d5d316b9><form action="#" data-v-d5d316b9><label for="search" class="sr-only" data-v-d5d316b9>search here</label><input id="search" type="text" placeholder="Search Here..." data-v-d5d316b9><button type="submit" aria-label="search submit" class="thm-btn" data-v-d5d316b9><i class="fas fa-search" data-v-d5d316b9></i></button></form></div></div><a href="#" data-target="html" class="scroll-to-target scroll-to-top" data-v-d5d316b9><i class="fas fa-arrow-up" data-v-d5d316b9></i></a></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5d316b9"]]);

export { _default as default };
//# sourceMappingURL=default-CbciNiy0.mjs.map
