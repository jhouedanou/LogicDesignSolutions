import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_1, a as _imports_2, b as _imports_3 } from './virtual_public-D37Ld3xQ.mjs';
import { u as useHead } from './composables-DFgJCqKW.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './server.mjs';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "services",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Services - Logic Design Solutions",
      meta: [
        { name: "description", content: "Logic Design Solutions - FPGA Design Services & IP Solutions" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="page-header"><div class="page-header-bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-2.png)" })}"></div><div class="container"><div class="page-header__inner"><ul class="thm-breadcrumb list-unstyled"><li><a href="/">Home</a></li><li>-</li><li>Services</li></ul><h2 class="page-header__title">Our Services</h2></div></div></section><section class="news-details"><div class="container"><div class="row"><div class="col-xl-8 col-lg-7"><div class="news-details__content"><h3 class="news-details__title-1">We offer you the best for :</h3><ul style="${ssrRenderStyle({ "list-style": "none", "padding-left": "0", "margin-top": "20px", "font-size": "16px", "line-height": "1.8" })}"><li style="${ssrRenderStyle({ "margin-bottom": "12px" })}">» FPGA and IP turnkey design Service.</li><li style="${ssrRenderStyle({ "margin-bottom": "12px" })}">» FPGA and IP system architectures.</li><li style="${ssrRenderStyle({ "margin-bottom": "12px" })}">» FPGA and IP specification and implementation.</li><li style="${ssrRenderStyle({ "margin-bottom": "12px" })}">» IP customization and integration.</li><li style="${ssrRenderStyle({ "margin-bottom": "12px" })}">» FPGA and IP consulting.</li></ul></div></div></div></div></section><section class="brand-one brand-twoX"><div class="container"><div class="section-title-two text-center"><h2 class="section-title-two__title">Trusted Technology Partners</h2></div><p class="brand-two__text">Logic Design Solutions collaborates with leading technology providers<br> to deliver cutting-edge FPGA and IP solutions</p><div class="brand-one__inner"><div class="thm-swiper__slider swiper-container" data-swiper-options="{&quot;spaceBetween&quot;: 100,
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
                    }}"><div class="swiper-wrapper"><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_1)} alt="AMD Embedded Select Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_2)} alt="Intel Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_3)} alt="Technology Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_1)} alt="AMD Embedded Select Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_2)} alt="Intel Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_3)} alt="Technology Partner"></div></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=services-DFrV-eDm.mjs.map
