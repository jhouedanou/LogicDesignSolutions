import { _ as __nuxt_component_0 } from './nuxt-link-BzAABopN.mjs';
import { u as useWPProductCategories, _ as __nuxt_component_1, a as useWPProducts } from './useWordPressAPI-DTJXHh3P.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute, a as useRouter } from './server.mjs';
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

const perPage = 9;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Products - Logic Design Solutions",
      meta: [
        {
          name: "description",
          content: "Logic Design Solutions - FPGA IP Cores: NVMe, SATA, ARINC 429, Ethernet"
        }
      ]
    });
    const route = useRoute();
    useRouter();
    const currentPage = ref(parseInt(route.query.page) || 1);
    const selectedCategory = ref(route.query.cat ? parseInt(route.query.cat) : null);
    const categoriesResult = ([__temp, __restore] = withAsyncContext(() => useWPProductCategories()), __temp = await __temp, __restore(), __temp);
    const categories = ref(categoriesResult.data || []);
    const allProducts = ref([]);
    const error = ref(null);
    const pending = ref(false);
    const totalPages = ref(1);
    const totalCount = ref(0);
    const products2 = computed(() => {
      if (!selectedCategory.value) {
        return allProducts.value;
      }
      return allProducts.value.filter((product) => {
        return product.product_cat?.includes(selectedCategory.value);
      });
    });
    const filteredCount = computed(() => products2.value.length);
    const filteredPages = computed(() => Math.ceil(filteredCount.value / perPage));
    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return products2.value.slice(start, end);
    });
    const loadProducts = async () => {
      pending.value = true;
      error.value = null;
      try {
        const result = await useWPProducts(100, 1);
        allProducts.value = result.data || [];
        totalCount.value = result.totalCount || 0;
        totalPages.value = result.totalPages || 1;
        error.value = result.error;
      } catch (e) {
        error.value = e;
      } finally {
        pending.value = false;
      }
    };
    [__temp, __restore] = withAsyncContext(() => loadProducts()), await __temp, __restore();
    const getProductImage = (product) => {
      if (product._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        return product._embedded["wp:featuredmedia"][0].source_url;
      }
      return "/assets/images/news/placeholder-product.jpg";
    };
    const stripHtml = (html) => {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, "");
    };
    const pageNumbers = computed(() => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
      let end = Math.min(filteredPages.value, start + maxVisible - 1);
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return category?.name || "Unknown";
    };
    watch(() => route.query, (newQuery) => {
      currentPage.value = parseInt(newQuery.page) || 1;
      selectedCategory.value = newQuery.cat ? parseInt(newQuery.cat) : null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "products-page" }, _attrs))} data-v-64e3cd4e><section class="page-header" data-v-64e3cd4e><div class="page-header-bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-2.png)" })}" data-v-64e3cd4e></div><div class="container" data-v-64e3cd4e><div class="page-header__inner" data-v-64e3cd4e><ul class="thm-breadcrumb list-unstyled" data-v-64e3cd4e><li data-v-64e3cd4e>`);
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
      _push(`</li><li data-v-64e3cd4e>-</li><li data-v-64e3cd4e>Products</li></ul><h2 class="page-header__title" data-v-64e3cd4e>Our Products</h2></div></div></section><section class="news-details" data-v-64e3cd4e><div class="container" data-v-64e3cd4e><div class="row" data-v-64e3cd4e><div class="col-xl-8 col-lg-7" data-v-64e3cd4e><div class="section-title text-left" style="${ssrRenderStyle({ "margin-bottom": "40px" })}" data-v-64e3cd4e><div class="section-title__tagline-box" data-v-64e3cd4e><p class="section-title__tagline" data-v-64e3cd4e>IP Solutions Portfolio</p></div><h2 class="section-title__title" data-v-64e3cd4e>FPGA IP Cores &amp; Solutions</h2><p style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-64e3cd4e>Discover our comprehensive range of proven IP cores for FPGA designs. Each IP solution is thoroughly tested and optimized for performance, reliability, and ease of integration.</p></div>`);
      if (unref(pending)) {
        _push(`<div class="text-center" style="${ssrRenderStyle({ "padding": "60px 40px" })}" data-v-64e3cd4e><div class="spinner" style="${ssrRenderStyle({ "display": "inline-block", "width": "50px", "height": "50px", "border": "4px solid #f3f3f3", "border-top": "4px solid #ff6b35", "border-radius": "50%", "animation": "spin 1s linear infinite", "margin-bottom": "20px" })}" data-v-64e3cd4e></div><p style="${ssrRenderStyle({ "color": "#666", "font-size": "16px" })}" data-v-64e3cd4e>Loading products...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center" style="${ssrRenderStyle({ "padding": "40px", "color": "red" })}" data-v-64e3cd4e><p data-v-64e3cd4e>Error loading products. Please try again later.</p></div>`);
      } else {
        _push(`<div data-v-64e3cd4e>`);
        if (unref(selectedCategory)) {
          _push(`<div class="filter-indicator" style="${ssrRenderStyle({ "margin-bottom": "20px", "padding": "15px", "background": "#f8f9fa", "border-left": "4px solid #ff6b35", "border-radius": "4px" })}" data-v-64e3cd4e><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "space-between" })}" data-v-64e3cd4e><span style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-64e3cd4e> Filtered by: ${ssrInterpolate(getCategoryName(unref(selectedCategory)))} <span style="${ssrRenderStyle({ "color": "#666" })}" data-v-64e3cd4e>(${ssrInterpolate(unref(filteredCount))} products)</span></span><a href="#" style="${ssrRenderStyle({ "color": "#ff6b35", "text-decoration": "none", "font-weight": "600" })}" data-v-64e3cd4e> Clear Filter ✕ </a></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div${ssrRenderAttrs({
          name: "fade-products",
          class: "row"
        })} data-v-64e3cd4e>`);
        ssrRenderList(unref(paginatedProducts), (product, index) => {
          _push(`<div class="col-xl-4 col-lg-6 col-md-6 product-item" data-v-64e3cd4e><div class="news-one__single" data-v-64e3cd4e><div class="news-one__img-box product-card-img-box" data-v-64e3cd4e><div class="news-one__img product-card-img" data-v-64e3cd4e>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product-detail?id=${product.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: getProductImage(product),
                  alt: stripHtml(product.title.rendered),
                  preset: "productCard",
                  loading: "lazy",
                  sizes: "xs:100vw sm:100vw md:50vw lg:33vw"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtImg, {
                    src: getProductImage(product),
                    alt: stripHtml(product.title.rendered),
                    preset: "productCard",
                    loading: "lazy",
                    sizes: "xs:100vw sm:100vw md:50vw lg:33vw"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div><div class="news-one__content" data-v-64e3cd4e><h3 class="news-one__title" data-v-64e3cd4e>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product-detail?id=${product.id}`
          }, null, _parent));
          _push(`</h3></div></div></div>`);
        });
        _push(`</div>`);
        if (unref(paginatedProducts).length === 0) {
          _push(`<div class="text-center" style="${ssrRenderStyle({ "padding": "60px 20px" })}" data-v-64e3cd4e><i class="fas fa-inbox" style="${ssrRenderStyle({ "font-size": "64px", "color": "#ddd", "margin-bottom": "20px" })}" data-v-64e3cd4e></i><h3 style="${ssrRenderStyle({ "color": "#666", "font-size": "24px", "margin-bottom": "10px" })}" data-v-64e3cd4e>No products found</h3><p style="${ssrRenderStyle({ "color": "#999" })}" data-v-64e3cd4e>Try selecting a different category</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (unref(filteredPages) > 1) {
        _push(`<div class="news-page__pagination" style="${ssrRenderStyle({ "text-align": "center", "margin-top": "40px" })}" data-v-64e3cd4e><ul class="pg-pagination list-unstyled" style="${ssrRenderStyle({ "display": "inline-flex", "justify-content": "center", "gap": "10px" })}" data-v-64e3cd4e><li class="${ssrRenderClass([{ disabled: unref(currentPage) === 1 }, "prev"])}" data-v-64e3cd4e><a href="#" aria-label="Previous" data-v-64e3cd4e>PREV</a></li><!--[-->`);
        ssrRenderList(unref(pageNumbers), (page) => {
          _push(`<li class="${ssrRenderClass([{ active: unref(currentPage) === page }, "count"])}" data-v-64e3cd4e><a href="#" data-v-64e3cd4e>${ssrInterpolate(String(page).padStart(2, "0"))}</a></li>`);
        });
        _push(`<!--]--><li class="${ssrRenderClass([{ disabled: unref(currentPage) === unref(filteredPages) }, "next"])}" data-v-64e3cd4e><a href="#" aria-label="Next" data-v-64e3cd4e>NEXT</a></li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-xl-4 col-lg-5" data-v-64e3cd4e><div class="sidebar" data-v-64e3cd4e><div class="sidebar__single sidebar__category" data-v-64e3cd4e><h3 class="sidebar__title" data-v-64e3cd4e>Product Categories</h3><ul class="sidebar__category-list list-unstyled" data-v-64e3cd4e><li class="${ssrRenderClass({ active: !unref(selectedCategory) })}" data-v-64e3cd4e><a href="#" data-v-64e3cd4e> All Products<span data-v-64e3cd4e>(${ssrInterpolate(unref(totalCount))})</span></a></li><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<li class="${ssrRenderClass({ active: unref(selectedCategory) === category.id })}" style="${ssrRenderStyle(category.count > 0 ? null : { display: "none" })}" data-v-64e3cd4e><a href="#" data-v-64e3cd4e>${ssrInterpolate(category.name)}<span data-v-64e3cd4e>(${ssrInterpolate(category.count)})</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div class="sidebar__single have-any-project" data-v-64e3cd4e><div class="have-any-project__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/contact-us-bg.jpg)" })}" data-v-64e3cd4e></div><h3 class="have-any-project__title" data-v-64e3cd4e> Need Custom<br data-v-64e3cd4e> IP Solution?<br data-v-64e3cd4e> Contact Us </h3><div class="have-any-project__btn-box" data-v-64e3cd4e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "have-any-project__btn thm-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Get Quote<span class="icon-right-arrow" data-v-64e3cd4e${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(" Get Quote"),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="sidebar__single sidebar__tags" data-v-64e3cd4e><h3 class="sidebar__title" data-v-64e3cd4e>Popular Tags</h3><div class="sidebar__tags-list" data-v-64e3cd4e><a href="#" data-v-64e3cd4e>NVMe</a><a href="#" data-v-64e3cd4e>SATA</a><a href="#" data-v-64e3cd4e>PCIe</a><a href="#" data-v-64e3cd4e>ARINC 429</a><a href="#" data-v-64e3cd4e>Ethernet</a><a href="#" data-v-64e3cd4e>FAT32</a><a href="#" data-v-64e3cd4e>EXFAT</a><a href="#" data-v-64e3cd4e>Gen4</a><a href="#" data-v-64e3cd4e>Gen5</a><a href="#" data-v-64e3cd4e>10G</a></div></div></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-64e3cd4e"]]);

export { products as default };
//# sourceMappingURL=products-BqptWYja.mjs.map
