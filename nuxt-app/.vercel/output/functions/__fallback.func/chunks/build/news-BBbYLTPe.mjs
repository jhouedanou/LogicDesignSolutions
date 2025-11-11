import { _ as __nuxt_component_0 } from './nuxt-link-BzAABopN.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-Zd5sWGY8.mjs';
import { _ as _imports_1, a as _imports_2, b as _imports_3, c as _imports_4, d as _imports_5 } from './virtual_public-CHcqiHb4.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "news",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "News - Logic Design Solutions",
      meta: [
        { name: "description", content: "Logic Design Solutions - Latest News & Updates" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "news-page" }, _attrs))} data-v-f9e0d7c2><section class="page-header" data-v-f9e0d7c2><div class="page-header-bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-2.webp)" })}" data-v-f9e0d7c2></div><div class="container" data-v-f9e0d7c2><div class="page-header__inner" data-v-f9e0d7c2><ul class="thm-breadcrumb list-unstyled" data-v-f9e0d7c2><li data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f9e0d7c2>-</li><li data-v-f9e0d7c2>News</li></ul><h2 class="page-header__title" data-v-f9e0d7c2>Latest News</h2></div></div></section><section class="news-details" data-v-f9e0d7c2><div class="container" data-v-f9e0d7c2><div class="row" data-v-f9e0d7c2><div class="col-xl-8 col-lg-7" data-v-f9e0d7c2><div class="section-title text-left" style="${ssrRenderStyle({ "margin-bottom": "40px" })}" data-v-f9e0d7c2><div class="section-title__tagline-box" data-v-f9e0d7c2><p class="section-title__tagline" data-v-f9e0d7c2>Latest Updates</p></div><h2 class="section-title__title" data-v-f9e0d7c2>News &amp; Announcements</h2></div><div class="row" data-v-f9e0d7c2><div class="col-xl-6 col-lg-12 wow fadeInUp" data-wow-delay="100ms" style="${ssrRenderStyle({ "margin-bottom": "30px" })}" data-v-f9e0d7c2><div class="row" style="${ssrRenderStyle({ "border": "1px solid #eeeeee", "padding": "0", "margin": "0", "height": "100%" })}" data-v-f9e0d7c2><div class="col-xl-4 col-lg-4" style="${ssrRenderStyle({ "padding": "10px" })}" data-v-f9e0d7c2><div class="news-one__img" style="${ssrRenderStyle({ "height": "100%" })}" data-v-f9e0d7c2><img${ssrRenderAttr("src", _imports_0)} alt="Gen 5 NVMe Host IP" style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}" data-v-f9e0d7c2></div></div><div class="col-xl-8 col-lg-8" style="${ssrRenderStyle({ "padding": "20px" })}" data-v-f9e0d7c2><ul class="news-one__meta list-unstyled" data-v-f9e0d7c2><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>September 5, 2025</a></li><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>NEWS</a></li></ul><h3 class="news-one__title" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Gen 5 NVMe Host IP on AGILEX 7 R-Tile !`);
          } else {
            return [
              createTextVNode("Gen 5 NVMe Host IP on AGILEX 7 R-Tile !")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><p class="news-one__text" data-v-f9e0d7c2>France, Gournay sur Marne, September 5th 2025...</p><div class="news-one__bottom" data-v-f9e0d7c2><div class="news-one__read-more" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Read More <span class="icon-right-arrow" data-v-f9e0d7c2${_scopeId}></span>`);
          } else {
            return [
              createTextVNode("Read More "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="col-xl-6 col-lg-12 wow fadeInUp" data-wow-delay="200ms" style="${ssrRenderStyle({ "margin-bottom": "30px" })}" data-v-f9e0d7c2><div class="row" style="${ssrRenderStyle({ "border": "1px solid #eeeeee", "padding": "0", "margin": "0", "height": "100%" })}" data-v-f9e0d7c2><div class="col-xl-4 col-lg-4" style="${ssrRenderStyle({ "padding": "0" })}" data-v-f9e0d7c2><div class="news-one__img" style="${ssrRenderStyle({ "height": "100%" })}" data-v-f9e0d7c2><img${ssrRenderAttr("src", _imports_1)} alt="Kintex NVMe" style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}" data-v-f9e0d7c2></div></div><div class="col-xl-8 col-lg-8" style="${ssrRenderStyle({ "padding": "20px" })}" data-v-f9e0d7c2><ul class="news-one__meta list-unstyled" data-v-f9e0d7c2><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>November 14, 2024</a></li><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>NEWS</a></li></ul><h3 class="news-one__title" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`NVME Host IP on Kintex Ultra Scale Plus !`);
          } else {
            return [
              createTextVNode("NVME Host IP on Kintex Ultra Scale Plus !")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><p class="news-one__text" data-v-f9e0d7c2>France, Gournay sur Marne, November 14th 2024...</p><div class="news-one__bottom" data-v-f9e0d7c2><div class="news-one__read-more" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Read More <span class="icon-right-arrow" data-v-f9e0d7c2${_scopeId}></span>`);
          } else {
            return [
              createTextVNode("Read More "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="col-xl-6 col-lg-12 wow fadeInUp" data-wow-delay="300ms" style="${ssrRenderStyle({ "margin-bottom": "30px" })}" data-v-f9e0d7c2><div class="row" style="${ssrRenderStyle({ "border": "1px solid #eeeeee", "padding": "0", "margin": "0", "height": "100%" })}" data-v-f9e0d7c2><div class="col-xl-4 col-lg-4" style="${ssrRenderStyle({ "padding": "0" })}" data-v-f9e0d7c2><div class="news-one__img" style="${ssrRenderStyle({ "height": "100%" })}" data-v-f9e0d7c2><img${ssrRenderAttr("src", _imports_2)} alt="ARINC 429" style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}" data-v-f9e0d7c2></div></div><div class="col-xl-8 col-lg-8" style="${ssrRenderStyle({ "padding": "20px" })}" data-v-f9e0d7c2><ul class="news-one__meta list-unstyled" data-v-f9e0d7c2><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>November 4, 2024</a></li><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>NEWS</a></li></ul><h3 class="news-one__title" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`New ARINC 429 IP`);
          } else {
            return [
              createTextVNode("New ARINC 429 IP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><p class="news-one__text" data-v-f9e0d7c2>France, Gournay sur Marne, November 4th 2024...</p><div class="news-one__bottom" data-v-f9e0d7c2><div class="news-one__read-more" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Read More <span class="icon-right-arrow" data-v-f9e0d7c2${_scopeId}></span>`);
          } else {
            return [
              createTextVNode("Read More "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="col-xl-6 col-lg-12 wow fadeInUp" data-wow-delay="100ms" style="${ssrRenderStyle({ "margin-bottom": "30px" })}" data-v-f9e0d7c2><div class="row" style="${ssrRenderStyle({ "border": "1px solid #eeeeee", "padding": "0", "margin": "0", "height": "100%" })}" data-v-f9e0d7c2><div class="col-xl-4 col-lg-4" style="${ssrRenderStyle({ "padding": "0" })}" data-v-f9e0d7c2><div class="news-one__img" style="${ssrRenderStyle({ "height": "100%" })}" data-v-f9e0d7c2><img${ssrRenderAttr("src", _imports_3)} alt="Artix NVMe" style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}" data-v-f9e0d7c2></div></div><div class="col-xl-8 col-lg-8" style="${ssrRenderStyle({ "padding": "20px" })}" data-v-f9e0d7c2><ul class="news-one__meta list-unstyled" data-v-f9e0d7c2><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>November 4, 2024</a></li><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>NEWS</a></li></ul><h3 class="news-one__title" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Gen4 NVME Host IP on Artix Ultra Scale Plus !`);
          } else {
            return [
              createTextVNode("Gen4 NVME Host IP on Artix Ultra Scale Plus !")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><p class="news-one__text" data-v-f9e0d7c2>France, Gournay sur Marne, November 4th 2024...</p><div class="news-one__bottom" data-v-f9e0d7c2><div class="news-one__read-more" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Read More <span class="icon-right-arrow" data-v-f9e0d7c2${_scopeId}></span>`);
          } else {
            return [
              createTextVNode("Read More "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="col-xl-6 col-lg-12 wow fadeInUp" data-wow-delay="200ms" style="${ssrRenderStyle({ "margin-bottom": "30px" })}" data-v-f9e0d7c2><div class="row" style="${ssrRenderStyle({ "border": "1px solid #eeeeee", "padding": "0", "margin": "0", "height": "100%" })}" data-v-f9e0d7c2><div class="col-xl-4 col-lg-4" style="${ssrRenderStyle({ "padding": "0" })}" data-v-f9e0d7c2><div class="news-one__img" style="${ssrRenderStyle({ "height": "100%" })}" data-v-f9e0d7c2><img${ssrRenderAttr("src", _imports_4)} alt="EXFAT IP" style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}" data-v-f9e0d7c2></div></div><div class="col-xl-8 col-lg-8" style="${ssrRenderStyle({ "padding": "20px" })}" data-v-f9e0d7c2><ul class="news-one__meta list-unstyled" data-v-f9e0d7c2><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>October 22, 2024</a></li><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>NEWS</a></li></ul><h3 class="news-one__title" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`EXFAT IP Soft Core for NVMe Host`);
          } else {
            return [
              createTextVNode("EXFAT IP Soft Core for NVMe Host")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><p class="news-one__text" data-v-f9e0d7c2>France, Gournay sur Marne, October 22nd 2024...</p><div class="news-one__bottom" data-v-f9e0d7c2><div class="news-one__read-more" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Read More <span class="icon-right-arrow" data-v-f9e0d7c2${_scopeId}></span>`);
          } else {
            return [
              createTextVNode("Read More "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="col-xl-6 col-lg-12 wow fadeInUp" data-wow-delay="300ms" style="${ssrRenderStyle({ "margin-bottom": "30px" })}" data-v-f9e0d7c2><div class="row" style="${ssrRenderStyle({ "border": "1px solid #eeeeee", "padding": "0", "margin": "0", "height": "100%" })}" data-v-f9e0d7c2><div class="col-xl-4 col-lg-4" style="${ssrRenderStyle({ "padding": "0" })}" data-v-f9e0d7c2><div class="news-one__img" style="${ssrRenderStyle({ "height": "100%" })}" data-v-f9e0d7c2><img${ssrRenderAttr("src", _imports_5)} alt="Zynq NVMe" style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}" data-v-f9e0d7c2></div></div><div class="col-xl-8 col-lg-8" style="${ssrRenderStyle({ "padding": "20px" })}" data-v-f9e0d7c2><ul class="news-one__meta list-unstyled" data-v-f9e0d7c2><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>September 15, 2024</a></li><li data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>NEWS</a></li></ul><h3 class="news-one__title" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Zynq UltraScale+ NVMe Host IP Release`);
          } else {
            return [
              createTextVNode("Zynq UltraScale+ NVMe Host IP Release")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><p class="news-one__text" data-v-f9e0d7c2>France, Gournay sur Marne, September 15th 2024...</p><div class="news-one__bottom" data-v-f9e0d7c2><div class="news-one__read-more" data-v-f9e0d7c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Read More <span class="icon-right-arrow" data-v-f9e0d7c2${_scopeId}></span>`);
          } else {
            return [
              createTextVNode("Read More "),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></div><div class="news-page__pagination" style="${ssrRenderStyle({ "text-align": "center", "margin-top": "40px" })}" data-v-f9e0d7c2><ul class="pg-pagination list-unstyled" style="${ssrRenderStyle({ "display": "inline-flex", "justify-content": "center", "gap": "10px" })}" data-v-f9e0d7c2><li class="prev" data-v-f9e0d7c2><a href="#" aria-label="Previous" data-v-f9e0d7c2>PREV</a></li><li class="count active" data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>01</a></li><li class="count" data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>02</a></li><li class="count" data-v-f9e0d7c2><a href="#" data-v-f9e0d7c2>03</a></li><li class="next" data-v-f9e0d7c2><a href="#" aria-label="Next" data-v-f9e0d7c2>NEXT</a></li></ul></div></div><div class="col-xl-4 col-lg-5" data-v-f9e0d7c2><div class="sidebar" data-v-f9e0d7c2><div class="sidebar__single have-any-project" data-v-f9e0d7c2><div class="have-any-project__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/contact-us-bg.jpg)" })}" data-v-f9e0d7c2></div><h3 class="have-any-project__title" data-v-f9e0d7c2> Subscribe to<br data-v-f9e0d7c2> Our Newsletter </h3><div class="have-any-project__btn-box" data-v-f9e0d7c2><a href="#" class="have-any-project__btn thm-btn" data-v-f9e0d7c2> Subscribe<span class="icon-right-arrow" data-v-f9e0d7c2></span></a></div></div></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const news = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f9e0d7c2"]]);

export { news as default };
//# sourceMappingURL=news-BBbYLTPe.mjs.map
