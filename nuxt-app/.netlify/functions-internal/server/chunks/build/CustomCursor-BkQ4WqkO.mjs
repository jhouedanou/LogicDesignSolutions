import { _ as __nuxt_component_0$1 } from './nuxt-link-DuaGE48n.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useContent } from './useContent-C26r8GDb.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, navigation } = useContent();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "main-menu main-menu-two" }, _attrs))}><div class="main-menu-two__wrapper"><div class="main-menu-two__wrapper-inner"><div class="main-menu-two__left"><div class="main-menu-two__logo">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        style: { "font-size": "32px", "font-weight": "700", "font-style": "italic", "color": "#000" }
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
      _push(`</div><div class="main-menu-two__main-menu-box"><a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a><ul class="main-menu__list"><!--[-->`);
      ssrRenderList(unref(navigation)?.mainMenu, (item) => {
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
      _push(`<!--]--></ul></div></div><div class="main-menu-two__right"><div class="main-menu-two__call"><div class="main-menu-two__call-icon"><span class="icon-telephone-call"></span></div><div class="main-menu-two__call-content"><p class="main-menu-two__call-sub-title">${ssrInterpolate(unref(site)?.callLabel)}</p><h5 class="main-menu-two__call-number"><a${ssrRenderAttr("href", `tel:${unref(site)?.phone.replace(/\s/g, "")}`)}>${ssrInterpolate(unref(site)?.phone)}</a></h5></div></div><div class="main-menu-two__btn-box">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "main-menu-two__btn thm-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(site)?.contactButtonText)} <span class="icon-right-arrow"${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(site)?.contactButtonText) + " ", 1),
              createVNode("span", { class: "icon-right-arrow" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "AppMenu" });
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
//# sourceMappingURL=CustomCursor-BkQ4WqkO.mjs.map
