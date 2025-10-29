import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { u as useHead } from './composables-UyBDQb6S.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "About Us",
      meta: [
        { name: "description", content: "Learn more about Logic Design Solutions and our mission" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-43462743><section class="hero-small" data-v-43462743><div class="container" data-v-43462743><h1 data-v-43462743>About Us</h1><p data-v-43462743>Learn more about our mission and values</p></div></section><section class="content" data-v-43462743><div class="container" data-v-43462743><div class="about-content" data-v-43462743><h2 data-v-43462743>Who We Are</h2><p data-v-43462743> Logic Design Solutions is a leading digital agency specializing in web development, design, and digital strategy. With years of experience and a passion for innovation, we help businesses transform their digital presence. </p><h2 data-v-43462743>Our Mission</h2><p data-v-43462743> To deliver exceptional digital solutions that empower businesses to succeed in the modern digital landscape. We combine creativity, technology, and strategic thinking to create experiences that matter. </p><h2 data-v-43462743>Our Values</h2><div class="values-grid" data-v-43462743><div class="value-card" data-v-43462743><h3 data-v-43462743>Innovation</h3><p data-v-43462743>Constantly pushing boundaries and exploring new possibilities</p></div><div class="value-card" data-v-43462743><h3 data-v-43462743>Quality</h3><p data-v-43462743>Delivering excellence in every project we undertake</p></div><div class="value-card" data-v-43462743><h3 data-v-43462743>Collaboration</h3><p data-v-43462743>Working closely with clients to achieve shared goals</p></div><div class="value-card" data-v-43462743><h3 data-v-43462743>Integrity</h3><p data-v-43462743>Building trust through transparency and honesty</p></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43462743"]]);

export { about as default };
//# sourceMappingURL=about-D-iDnfmc.mjs.map
