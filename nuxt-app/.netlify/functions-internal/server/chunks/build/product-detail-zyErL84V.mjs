import { _ as __nuxt_component_0 } from './nuxt-link-BzAABopN.mjs';
import { b as useWPProduct, u as useWPProductCategories, a as useWPProducts, _ as __nuxt_component_1 } from './useWordPressAPI-DdR3nAdp.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useHead } from './composables-DFgJCqKW.mjs';
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
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "product-detail",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const productId = route.query.id;
    let product = null;
    let error = null;
    let pending = false;
    if (productId && productId !== "undefined" && productId.trim()) {
      const result = ([__temp, __restore] = withAsyncContext(() => useWPProduct(productId)), __temp = await __temp, __restore(), __temp);
      product = result.data;
      error = result.error;
      pending = result.pending;
    }
    const { data: allCategories } = ([__temp, __restore] = withAsyncContext(() => useWPProductCategories()), __temp = await __temp, __restore(), __temp);
    const productCategories = computed(() => {
      if (!product || !product.product_cat || !allCategories) return [];
      return allCategories.filter(
        (cat) => product.product_cat.includes(cat.id)
      );
    });
    const productImage = computed(() => {
      if (!product) return "";
      if (product._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        return product._embedded["wp:featuredmedia"][0].source_url;
      }
      return "/assets/images/news/placeholder-product.jpg";
    });
    const relatedProducts = ref([]);
    if (product && productCategories.value.length > 0) {
      const categoryId = productCategories.value[0].id;
      const { data: categoryProducts } = ([__temp, __restore] = withAsyncContext(() => useWPProducts(6, 1)), __temp = await __temp, __restore(), __temp);
      relatedProducts.value = categoryProducts.filter(
        (p) => p.id !== product.id && p.product_cat?.includes(categoryId)
      );
    }
    const getProductImage = (prod) => {
      if (prod._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        return prod._embedded["wp:featuredmedia"][0].source_url;
      }
      return "/assets/images/news/placeholder-product.jpg";
    };
    const stripHtml = (html) => {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, "");
    };
    useHead({
      title: product ? `${stripHtml(product.title.rendered)} - Logic Design Solutions` : "Product Details",
      meta: [
        {
          name: "description",
          content: product ? stripHtml(product.excerpt?.rendered || "") : "Product details"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-detail-page" }, _attrs))}><section class="page-header"><div class="page-header-bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-2.png)" })}"></div><div class="container"><div class="page-header__inner"><ul class="thm-breadcrumb list-unstyled"><li><a href="/">Home</a></li><li>-</li><li><a href="/products">Products</a></li><li>-</li><li>Product Details</li></ul><h2 class="page-header__title">Product Details</h2></div></div></section><section class="news-details"><div class="container">`);
      if (unref(pending)) {
        _push(`<div class="text-center" style="${ssrRenderStyle({ "padding": "60px" })}"><p>Loading product details...</p></div>`);
      } else if (unref(error) || !unref(product)) {
        _push(`<div class="text-center" style="${ssrRenderStyle({ "padding": "60px", "color": "red" })}"><p>Product not found or error loading details.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "thm-btn",
          style: { "margin-top": "20px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Products<span class="icon-right-arrow"${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(" Back to Products"),
                createVNode("span", { class: "icon-right-arrow" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="row"><div class="col-xl-8 col-lg-7"><div class="news-details__left"><div class="news-details__content">`);
        if (unref(productCategories).length > 0) {
          _push(`<div style="${ssrRenderStyle({ "background-color": "#f8f9fa", "padding": "20px", "border-radius": "10px", "margin-bottom": "30px" })}"><p class="news-details__text-1" style="${ssrRenderStyle({ "margin": "0" })}"><!--[-->`);
          ssrRenderList(unref(productCategories), (cat, index) => {
            _push(`<span style="${ssrRenderStyle({ "color": "var(--lds-primary)", "font-weight": "bold" })}">${ssrInterpolate(cat.name)}`);
            if (index < unref(productCategories).length - 1) {
              _push(`<span> / </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          });
          _push(`<!--]--></p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="news-details__title-1">${unref(product).title.rendered ?? ""}</h3>`);
        if (unref(productImage)) {
          _push(`<div style="${ssrRenderStyle({ "float": "left", "width": "50%", "margin-right": "30px", "margin-bottom": "20px" })}">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: unref(productImage),
            alt: stripHtml(unref(product).title.rendered),
            preset: "featured",
            loading: "eager",
            style: { "width": "100%", "height": "auto", "border-radius": "10px", "box-shadow": "0 4px 6px rgba(0,0,0,0.1)" }
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="news-details__text-1">${unref(product).content.rendered ?? ""}</div><div style="${ssrRenderStyle({ "clear": "both" })}"></div></div><div class="news-details__bottom">`);
        if (unref(productCategories).length > 0) {
          _push(`<p class="news-details__tags"><span>Categories:</span><!--[-->`);
          ssrRenderList(unref(productCategories), (cat) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: cat.id,
              to: `/products?cat=${cat.id}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(cat.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(cat.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="news-details__social-list"><a href="#"><i class="fab fa-facebook"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-linkedin"></i></a><a href="#"><i class="fab fa-link"></i></a></div></div><div class="news-details__pagenation-box"><ul class="list-unstyled news-details__pagenation"><li>Previous Product <a href="#" style="${ssrRenderStyle({ "margin-left": "10px" })}">NVME HOST ZYNQ ULTRASCALE PLUS IP</a></li><li>Next Product <a href="#" style="${ssrRenderStyle({ "margin-left": "10px" })}">ARTIX Ultra Scale Plus NVME HOST IP</a></li></ul></div></div></div><div class="col-xl-4 col-lg-5"><div class="sidebar">`);
        if (unref(relatedProducts).length > 0) {
          _push(`<div class="sidebar__single sidebar__post"><h3 class="sidebar__title">Related Products</h3><ul class="sidebar__post-list list-unstyled"><!--[-->`);
          ssrRenderList(unref(relatedProducts).slice(0, 3), (relProd) => {
            _push(`<li><div class="sidebar__post-image">`);
            _push(ssrRenderComponent(_component_NuxtImg, {
              src: getProductImage(relProd),
              alt: stripHtml(relProd.title.rendered),
              preset: "thumbnail",
              loading: "lazy",
              style: { "width": "70px", "height": "70px", "object-fit": "cover", "border-radius": "5px" }
            }, null, _parent));
            _push(`</div><div class="sidebar__post-content"><h3>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/product-detail?id=${relProd.id}`
            }, null, _parent));
            _push(`</h3></div></li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(allCategories) && unref(allCategories).length > 0) {
          _push(`<div class="sidebar__single sidebar__category"><h3 class="sidebar__title">Product Categories</h3><ul class="sidebar__category-list list-unstyled"><!--[-->`);
          ssrRenderList(unref(allCategories), (category) => {
            _push(`<li class="${ssrRenderClass({ active: unref(productCategories).some((pc) => pc.id === category.id) })}">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/products?cat=${category.id}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(category.name)}<span${_scopeId}>(${ssrInterpolate(category.count)})</span>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(category.name), 1),
                    createVNode("span", null, "(" + toDisplayString(category.count) + ")", 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="sidebar__single have-any-project"><div class="have-any-project__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/contact-us-bg.jpg)" })}"></div><h3 class="have-any-project__title">Need Custom <br> IP Solution? <br> Contact Us </h3><div class="have-any-project__btn-box">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "have-any-project__btn thm-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Get Quote<span class="icon-right-arrow"${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(" Get Quote"),
                createVNode("span", { class: "icon-right-arrow" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
        if (unref(productCategories).length > 0) {
          _push(`<div class="sidebar__single sidebar__tags"><h3 class="sidebar__title">Product Categories</h3><div class="sidebar__tags-list"><!--[-->`);
          ssrRenderList(unref(productCategories), (cat) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: cat.id,
              to: `/products?cat=${cat.id}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(cat.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(cat.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product-detail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=product-detail-zyErL84V.mjs.map
