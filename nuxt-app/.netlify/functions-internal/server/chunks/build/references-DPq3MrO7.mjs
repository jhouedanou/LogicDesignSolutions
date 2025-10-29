import { _ as __nuxt_component_0 } from './client-only-Dph_g-bC.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useHead } from './composables-UyBDQb6S.mjs';
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

publicAssetsURL("/assets/images/resources/founder.gif");
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
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
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
//# sourceMappingURL=references-DPq3MrO7.mjs.map
