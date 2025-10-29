import { _ as __nuxt_component_0 } from './nuxt-link-DuaGE48n.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_1, a as _imports_2, b as _imports_3, c as _imports_4, d as _imports_5 } from './virtual_public-DriDACYm.mjs';
import { u as useHead } from './composables-CjoCzYJX.mjs';
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

const _imports_0 = publicAssetsURL("/assets/images/news/NVME_HOST_IP-774x1024.jpg");

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Products - Logic Design Solutions",
      meta: [
        {
          name: "description",
          content: "Logic Design Solutions - FPGA IP Cores: NVMe, SATA, ARINC 429, Ethernet"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "products-page" }, _attrs))} data-v-7834bc97><section class="page-header" data-v-7834bc97><div class="page-header-bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-2.png)" })}" data-v-7834bc97></div><div class="container" data-v-7834bc97><div class="page-header__inner" data-v-7834bc97><ul class="thm-breadcrumb list-unstyled" data-v-7834bc97><li data-v-7834bc97>`);
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
      _push(`</li><li data-v-7834bc97>-</li><li data-v-7834bc97>Products</li></ul><h2 class="page-header__title" data-v-7834bc97>Our Products</h2></div></div></section><section class="news-details" data-v-7834bc97><div class="container" data-v-7834bc97><div class="row" data-v-7834bc97><div class="col-xl-8 col-lg-7" data-v-7834bc97><div class="section-title text-left" style="${ssrRenderStyle({ "margin-bottom": "40px" })}" data-v-7834bc97><div class="section-title__tagline-box" data-v-7834bc97><p class="section-title__tagline" data-v-7834bc97>IP Solutions Portfolio</p></div><h2 class="section-title__title" data-v-7834bc97>FPGA IP Cores &amp; Solutions</h2><p style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-7834bc97>Discover our comprehensive range of proven IP cores for FPGA designs. Each IP solution is thoroughly tested and optimized for performance, reliability, and ease of integration.</p></div><div class="row" data-v-7834bc97><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="NVMe Host IP" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "NVMe Host IP"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`AGILEX 7 R-Tile Gen5 NVMe Host IP`);
          } else {
            return [
              createTextVNode("AGILEX 7 R-Tile Gen5 NVMe Host IP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="Kintex NVMe" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1,
                alt: "Kintex NVMe"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kintex Ultra Scale Plus NVMe Host IP`);
          } else {
            return [
              createTextVNode("Kintex Ultra Scale Plus NVMe Host IP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_2)} alt="ARINC 429" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_2,
                alt: "ARINC 429"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`ARINC 429 IP Core`);
          } else {
            return [
              createTextVNode("ARINC 429 IP Core")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_3)} alt="ARTIX NVMe" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_3,
                alt: "ARTIX NVMe"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`ARTIX Ultra Scale Plus NVMe Host IP`);
          } else {
            return [
              createTextVNode("ARTIX Ultra Scale Plus NVMe Host IP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_4)} alt="EXFAT IP" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_4,
                alt: "EXFAT IP"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`EXFAT IP Soft Core for NVMe`);
          } else {
            return [
              createTextVNode("EXFAT IP Soft Core for NVMe")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_5)} alt="Zynq NVMe" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_5,
                alt: "Zynq NVMe"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Zynq UltraScale+ NVMe Host IP`);
          } else {
            return [
              createTextVNode("Zynq UltraScale+ NVMe Host IP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="NVMe Host IP" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "NVMe Host IP"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`AGILEX 7 R-Tile Gen5 NVMe Host IP`);
          } else {
            return [
              createTextVNode("AGILEX 7 R-Tile Gen5 NVMe Host IP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="Kintex NVMe" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1,
                alt: "Kintex NVMe"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kintex Ultra Scale Plus NVMe Host IP`);
          } else {
            return [
              createTextVNode("Kintex Ultra Scale Plus NVMe Host IP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div><div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms" data-v-7834bc97><div class="news-one__single" data-v-7834bc97><div class="news-one__img-box" data-v-7834bc97><div class="news-one__img" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_2)} alt="ARINC 429" data-v-7834bc97${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_2,
                alt: "ARINC 429"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="news-one__content" data-v-7834bc97><h3 class="news-one__title" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/product-detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`ARINC 429 IP Core`);
          } else {
            return [
              createTextVNode("ARINC 429 IP Core")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3></div></div></div></div><div class="news-page__pagination" style="${ssrRenderStyle({ "text-align": "center", "margin-top": "40px" })}" data-v-7834bc97><ul class="pg-pagination list-unstyled" style="${ssrRenderStyle({ "display": "inline-flex", "justify-content": "center", "gap": "10px" })}" data-v-7834bc97><li class="prev" data-v-7834bc97><a href="#" aria-label="Previous" data-v-7834bc97>PREV</a></li><li class="count" data-v-7834bc97><a href="#" data-v-7834bc97>01</a></li><li class="count active" data-v-7834bc97><a href="#" data-v-7834bc97>02</a></li><li class="count" data-v-7834bc97><a href="#" data-v-7834bc97>03</a></li><li class="count" data-v-7834bc97><a href="#" data-v-7834bc97>04</a></li><li class="count" data-v-7834bc97><a href="#" data-v-7834bc97>05</a></li><li class="count" data-v-7834bc97><a href="#" data-v-7834bc97>06</a></li><li class="count" data-v-7834bc97><a href="#" data-v-7834bc97>07</a></li><li class="count" data-v-7834bc97><a href="#" data-v-7834bc97>08</a></li><li class="next" data-v-7834bc97><a href="#" aria-label="Next" data-v-7834bc97>NEXT</a></li></ul></div></div><div class="col-xl-4 col-lg-5" data-v-7834bc97><div class="sidebar" data-v-7834bc97><div class="sidebar__single sidebar__category" data-v-7834bc97><h3 class="sidebar__title" data-v-7834bc97>Product Categories</h3><ul class="sidebar__category-list list-unstyled" data-v-7834bc97><li data-v-7834bc97><a href="/product-category" data-v-7834bc97>NVMe Host IP<span data-v-7834bc97>(8)</span></a></li><li data-v-7834bc97><a href="/product-category" data-v-7834bc97>SATA Host IP<span data-v-7834bc97>(6)</span></a></li><li data-v-7834bc97><a href="/product-category" data-v-7834bc97>SATA Device IP<span data-v-7834bc97>(4)</span></a></li><li data-v-7834bc97><a href="/product-category" data-v-7834bc97>ARINC 429 IP<span data-v-7834bc97>(3)</span></a></li><li data-v-7834bc97><a href="/product-category" data-v-7834bc97>Ethernet MAC IP<span data-v-7834bc97>(5)</span></a></li><li data-v-7834bc97><a href="/product-category" data-v-7834bc97>File System IP<span data-v-7834bc97>(4)</span></a></li><li data-v-7834bc97><a href="/product-category" data-v-7834bc97>Communication IP<span data-v-7834bc97>(7)</span></a></li></ul></div><div class="sidebar__single have-any-project" data-v-7834bc97><div class="have-any-project__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/contact-us-bg.jpg)" })}" data-v-7834bc97></div><h3 class="have-any-project__title" data-v-7834bc97> Need Custom<br data-v-7834bc97> IP Solution?<br data-v-7834bc97> Contact Us </h3><div class="have-any-project__btn-box" data-v-7834bc97>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "have-any-project__btn thm-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Get Quote<span class="icon-right-arrow" data-v-7834bc97${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(" Get Quote"),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="sidebar__single sidebar__tags" data-v-7834bc97><h3 class="sidebar__title" data-v-7834bc97>Popular Tags</h3><div class="sidebar__tags-list" data-v-7834bc97><a href="#" data-v-7834bc97>NVMe</a><a href="#" data-v-7834bc97>SATA</a><a href="#" data-v-7834bc97>PCIe</a><a href="#" data-v-7834bc97>ARINC 429</a><a href="#" data-v-7834bc97>Ethernet</a><a href="#" data-v-7834bc97>FAT32</a><a href="#" data-v-7834bc97>EXFAT</a><a href="#" data-v-7834bc97>Gen4</a><a href="#" data-v-7834bc97>Gen5</a><a href="#" data-v-7834bc97>10G</a></div></div></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7834bc97"]]);

export { products as default };
//# sourceMappingURL=products-DOWRYGRo.mjs.map
