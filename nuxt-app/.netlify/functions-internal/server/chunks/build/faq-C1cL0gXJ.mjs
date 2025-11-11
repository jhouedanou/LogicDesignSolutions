import { _ as __nuxt_component_0 } from './nuxt-link-BzAABopN.mjs';
import { defineComponent, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    const { faq: faq2 } = useContent();
    useHead({
      title: "FAQ - Frequently Asked Questions",
      meta: [
        {
          name: "description",
          content: "Frequently asked questions about Logic Design Solutions FPGA Design Services and IP solutions"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0bc5154b><section class="page-header" data-v-0bc5154b><div class="page-header__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/page-header-bg.jpg)" })}" data-v-0bc5154b></div><div class="container" data-v-0bc5154b><div class="page-header__inner" data-v-0bc5154b><h2 data-v-0bc5154b>${ssrInterpolate(unref(faq2)?.title)}</h2><ul class="thm-breadcrumb list-unstyled" data-v-0bc5154b><li data-v-0bc5154b>`);
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
      _push(`</li><li data-v-0bc5154b><span data-v-0bc5154b>/</span></li><li data-v-0bc5154b>${ssrInterpolate(unref(faq2)?.title)}</li></ul></div></div></section><section class="faq-page" data-v-0bc5154b><div class="container" data-v-0bc5154b><div class="section-title text-center" data-v-0bc5154b><div class="section-title__tagline-box" data-v-0bc5154b><p class="section-title__tagline" data-v-0bc5154b>${ssrInterpolate(unref(faq2)?.tagline)}</p></div><h2 class="section-title__title" data-v-0bc5154b>${ssrInterpolate(unref(faq2)?.description)}</h2></div><div class="row" data-v-0bc5154b><div class="col-xl-12" data-v-0bc5154b><div class="faq-page__single" data-v-0bc5154b><div class="accrodion-grp" data-grp-name="faq-one-accrodion" data-v-0bc5154b><!--[-->`);
      ssrRenderList(unref(faq2)?.questions, (question, index) => {
        _push(`<div class="${ssrRenderClass([{ active: index === 0 }, "accrodion"])}" data-v-0bc5154b><div class="accrodion-title" data-v-0bc5154b><h4 data-v-0bc5154b>${ssrInterpolate(question.question)}</h4></div><div class="accrodion-content" data-v-0bc5154b><div class="inner" data-v-0bc5154b><p data-v-0bc5154b>${ssrInterpolate(question.answer)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0bc5154b"]]);

export { faq as default };
//# sourceMappingURL=faq-C1cL0gXJ.mjs.map
