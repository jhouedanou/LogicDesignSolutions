import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_1, a as _imports_2, b as _imports_3 } from './virtual_public-D37Ld3xQ.mjs';
import { u as useHead } from './composables-DFgJCqKW.mjs';
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

const _imports_0 = publicAssetsURL("/assets/images/resources/founder.gif");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "references",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "References - Logic Design Solutions",
      meta: [
        { name: "description", content: "Logic Design Solutions - Our References & History" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="page-header"><div class="page-header-bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/logic-slider-2.png)" })}"></div><div class="container"><div class="page-header__inner"><ul class="thm-breadcrumb list-unstyled"><li><a href="/">Home</a></li><li>-</li><li>References</li></ul><h2 class="page-header__title">Our References</h2></div></div></section><section class="news-details"><div class="container"><div class="row"><div class="col-xl-8 col-lg-7"><div class="section-title text-left" style="${ssrRenderStyle({ "margin-bottom": "40px" })}"><div class="section-title__tagline-box"><p class="section-title__tagline">Our History</p></div><h2 class="section-title__title">REFERENCES</h2></div><div class="news-details__content"><p style="${ssrRenderStyle({ "font-size": "16px", "line-height": "1.8", "margin-bottom": "30px" })}"><strong>1994</strong> : Foundation of Logic Design Solutions in Paris, France by Serge Sciberras, FPGA senior designer. Since then we have been making FPGA and IP turnkey designs for different customers located in different area of the world : </p><div class="row" style="${ssrRenderStyle({ "margin-bottom": "40px", "position": "relative", "padding": "30px", "border-radius": "5px", "overflow": "hidden" })}"><div style="${ssrRenderStyle({ "position": "absolute", "top": "0", "left": "0", "width": "100%", "height": "100%", "background-image": "url(/assets/images/backgrounds/world-map-bg.png)", "background-size": "cover", "background-position": "center", "opacity": "0.12", "z-index": "0" })}"></div><div class="col-md-6" style="${ssrRenderStyle({ "position": "relative", "z-index": "1" })}"><ul style="${ssrRenderStyle({ "list-style": "none", "padding-left": "0", "font-size": "16px", "line-height": "2", "color": "var(--lds-primary)", "font-weight": "bold" })}"><li>» Belgium.</li><li>» China.</li><li>» England.</li><li>» Italy.</li><li>» France.</li><li>» Germany.</li><li>» Israël.</li><li>» Italy.</li></ul></div><div class="col-md-6" style="${ssrRenderStyle({ "position": "relative", "z-index": "1" })}"><ul style="${ssrRenderStyle({ "list-style": "none", "padding-left": "0", "font-size": "16px", "line-height": "2", "color": "var(--lds-primary)", "font-weight": "bold" })}"><li>» Japan.</li><li>» Korea.</li><li>» Neverland.</li><li>» Poland.</li><li>» Spain.</li><li>» Sweden.</li><li>» Switzerland.</li><li>» USA.</li></ul></div></div><div class="row" style="${ssrRenderStyle({ "margin-top": "50px" })}"><div class="col-md-12"><h3 class="news-details__title-1">Our Founder</h3><div style="${ssrRenderStyle({ "display": "flex", "align-items": "flex-start", "gap": "30px", "margin-top": "20px" })}"><div style="${ssrRenderStyle({ "flex-shrink": "0" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Serge Sciberras" style="${ssrRenderStyle({ "width": "150px", "height": "auto", "border": "3px solid #eeeeee" })}"></div><div><h4 style="${ssrRenderStyle({ "margin-bottom": "15px" })}">Serge Sciberras</h4><p style="${ssrRenderStyle({ "font-size": "16px", "line-height": "1.8", "color": "#6e7387" })}"> FPGA Senior Designer and founder of Logic Design Solutions. With over 30 years of experience in FPGA design and IP development, Serge has led numerous successful projects for clients worldwide, establishing Logic Design Solutions as a trusted partner in the FPGA industry. </p></div></div></div></div></div></div><div class="col-xl-4 col-lg-5"><div class="sidebar"><div class="sidebar__single have-any-project"><div class="have-any-project__bg" style="${ssrRenderStyle({ "background-image": "url(/assets/images/backgrounds/contact-us-bg.jpg)" })}"></div><h3 class="have-any-project__title">Need Custom <br> IP Solution? <br> Contact Us </h3><div class="have-any-project__btn-box"><a href="/contact" class="have-any-project__btn thm-btn">Get Quote<span class="icon-right-arrow"></span></a></div></div></div></div></div></div></section><section class="brand-one brand-twoX"><div class="container"><div class="section-title-two text-center"><h2 class="section-title-two__title">Trusted Technology Partners</h2></div><p class="brand-two__text">Logic Design Solutions collaborates with leading technology providers<br> to deliver cutting-edge FPGA and IP solutions</p><div class="brand-one__inner"><div class="thm-swiper__slider swiper-container" data-swiper-options="{&quot;spaceBetween&quot;: 100,
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
                    {{ &quot;}}&quot; }}"><div class="swiper-wrapper"><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_1)} alt="AMD Embedded Select Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_2)} alt="Intel Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_3)} alt="Technology Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_1)} alt="AMD Embedded Select Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_2)} alt="Intel Partner"></div><div class="swiper-slide"><img${ssrRenderAttr("src", _imports_3)} alt="Technology Partner"></div></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/references.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=references-B80R3erh.mjs.map
