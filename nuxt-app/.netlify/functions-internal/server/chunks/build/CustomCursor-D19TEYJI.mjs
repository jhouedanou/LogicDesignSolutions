import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useContent } from './useContent-DR2Pjl6_.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, navigation } = useContent();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "main-menu main-menu-two" }, _attrs))} data-v-e2c85082><div class="main-menu-two__wrapper" data-v-e2c85082><div class="main-menu-two__wrapper-inner" data-v-e2c85082><div class="main-menu-two__left" data-v-e2c85082><div class="main-menu-two__logo" data-v-e2c85082><a href="/" style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "700", "font-style": "italic", "color": "#000" })}" data-v-e2c85082>${ssrInterpolate(unref(site)?.siteName)}</a></div><div class="main-menu-two__main-menu-box" data-v-e2c85082><a href="#" class="mobile-nav__toggler" data-v-e2c85082><i class="fa fa-bars" data-v-e2c85082></i></a><ul class="main-menu__list" data-v-e2c85082><!--[-->`);
      ssrRenderList(unref(navigation)?.mainMenu, (item) => {
        _push(`<li data-v-e2c85082><a${ssrRenderAttr("href", item.path)} data-v-e2c85082>${ssrInterpolate(item.label)}</a></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="main-menu-two__right" data-v-e2c85082><div class="main-menu-two__call" data-v-e2c85082><div class="main-menu-two__call-icon" data-v-e2c85082><span class="icon-telephone-call" data-v-e2c85082></span></div><div class="main-menu-two__call-content" data-v-e2c85082><p class="main-menu-two__call-sub-title" data-v-e2c85082>${ssrInterpolate(unref(site)?.callLabel)}</p><h5 class="main-menu-two__call-number" data-v-e2c85082><a${ssrRenderAttr("href", `tel:${unref(site)?.phone?.replace(/\s/g, "")}`)} data-v-e2c85082>${ssrInterpolate(unref(site)?.phone)}</a></h5></div></div><div class="main-menu-two__btn-box" data-v-e2c85082><a href="/contact" class="main-menu-two__btn thm-btn" data-v-e2c85082>${ssrInterpolate(unref(site)?.contactButtonText)}<span class="icon-right-arrow" data-v-e2c85082></span></a></div></div></div></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-e2c85082"]]), { __name: "AppMenu" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomCursor",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-80f5c69f><div class="custom-cursor__cursor" data-v-80f5c69f></div><div class="custom-cursor__cursor-two" data-v-80f5c69f></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CustomCursor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-80f5c69f"]]), { __name: "CustomCursor" });

export { __nuxt_component_2 as _, __nuxt_component_0 as a };
//# sourceMappingURL=CustomCursor-D19TEYJI.mjs.map
