import { _ as __nuxt_component_0 } from './nuxt-link-DBddc7qB.mjs';
import { defineComponent, computed, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, toValue, reactive, getCurrentInstance, onServerPrefetch, ref, shallowRef, toRef, nextTick, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { v as hash } from '../nitro/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { _ as _export_sfc, f as fetchDefaults, u as useNuxtApp, a as asyncDataDefaults, b as useRequestFetch, c as createError } from './server.mjs';
import { debounce } from 'perfect-debounce';
import { u as useHead } from './composables-UyBDQb6S.mjs';
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

function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry?._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return;
        }
        if (asyncData._abortController?.signal.aborted) {
          return;
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return;
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true });
  }
  return controller.signal;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = [{}, arg1];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const fallbackSite = {
      siteName: "LogicDesignSolutions",
      email: "contact@logic-design-solutions.com",
      mobileContact: {
        secondaryEmail: "contact@logic-design-solutions.com",
        secondaryPhone: "+33 (0)1 45 92 24 47"
      },
      social: [
        { name: "Twitter", icon: "twitter", url: "#" },
        { name: "Facebook", icon: "facebook-square", url: "#" },
        { name: "Pinterest", icon: "pinterest-p", url: "#" },
        { name: "Instagram", icon: "instagram", url: "#" },
        { name: "LinkedIn", icon: "linkedin", url: "#" }
      ]
    };
    const { data: siteResponse } = useFetch("/api/site-config", "$IWTqfbgBdT");
    const site = computed(() => ({
      ...fallbackSite,
      ...siteResponse.value ?? {},
      mobileContact: {
        ...fallbackSite.mobileContact,
        ...siteResponse.value?.mobileContact ?? {}
      }
    }));
    const socialLinks = computed(() => site.value.social ?? fallbackSite.social);
    useHead({
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Logic Design Solutions` : "Logic Design Solutions";
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Logic Design Solutions - FPGA Design Services & IP Solutions" }
      ],
      link: [
        { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/images/favicons/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/images/favicons/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/images/favicons/favicon-16x16.png" },
        { rel: "manifest", href: "/assets/images/favicons/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap"
        },
        { rel: "stylesheet", href: "/assets/vendors/bootstrap/css/bootstrap.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/animate/animate.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/animate/custom-animate.css" },
        { rel: "stylesheet", href: "/assets/vendors/fontawesome/css/all.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/jarallax/jarallax.css" },
        { rel: "stylesheet", href: "/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css" },
        { rel: "stylesheet", href: "/assets/vendors/odometer/odometer.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/swiper/swiper.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/smartbiz-icons/style.css" },
        { rel: "stylesheet", href: "/assets/vendors/owl-carousel/owl.carousel.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/owl-carousel/owl.theme.default.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/bootstrap-select/css/bootstrap-select.min.css" },
        { rel: "stylesheet", href: "/assets/vendors/jquery-ui/jquery-ui.css" },
        { rel: "stylesheet", href: "/assets/css/smartbiz.css" },
        { rel: "stylesheet", href: "/assets/css/smartbiz-responsive.css" },
        { rel: "stylesheet", href: "/assets/css/logic-custom.css" }
      ],
      script: [
        { src: "/assets/vendors/jquery/jquery-3.6.0.min.js", body: true },
        { src: "/assets/vendors/bootstrap/js/bootstrap.bundle.min.js", body: true },
        { src: "/assets/vendors/jarallax/jarallax.min.js", body: true },
        { src: "/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js", body: true },
        { src: "/assets/vendors/jquery-appear/jquery.appear.min.js", body: true },
        { src: "/assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js", body: true },
        { src: "/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js", body: true },
        { src: "/assets/vendors/jquery-validate/jquery.validate.min.js", body: true },
        { src: "/assets/vendors/odometer/odometer.min.js", body: true },
        { src: "/assets/vendors/swiper/swiper.min.js", body: true },
        { src: "/assets/vendors/wnumb/wNumb.min.js", body: true },
        { src: "/assets/vendors/wow/wow.js", body: true },
        { src: "/assets/vendors/isotope/isotope.js", body: true },
        { src: "/assets/vendors/owl-carousel/owl.carousel.min.js", body: true },
        { src: "/assets/vendors/bootstrap-select/js/bootstrap-select.min.js", body: true },
        { src: "/assets/vendors/jquery-ui/jquery-ui.js", body: true },
        { src: "/assets/vendors/jquery.circle-type/jquery.circleType.js", body: true },
        { src: "/assets/vendors/jquery.circle-type/jquery.lettering.min.js", body: true },
        { src: "/assets/js/smartbiz.js", body: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomCursor = resolveComponent("CustomCursor");
      const _component_AppPreloader = resolveComponent("AppPreloader");
      const _component_AppHeader = resolveComponent("AppHeader");
      const _component_AppFooter = resolveComponent("AppFooter");
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-root custom-cursor" }, _attrs))} data-v-c1a9907b>`);
      _push(ssrRenderComponent(_component_CustomCursor, null, null, _parent));
      _push(ssrRenderComponent(_component_AppPreloader, null, null, _parent));
      _push(`<div class="page-wrapper" data-v-c1a9907b>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main class="main-content" data-v-c1a9907b>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div><div class="mobile-nav__wrapper" data-v-c1a9907b><div class="mobile-nav__overlay mobile-nav__toggler" data-v-c1a9907b></div><div class="mobile-nav__content" data-v-c1a9907b><span class="mobile-nav__close mobile-nav__toggler" data-v-c1a9907b><i class="fa fa-times" data-v-c1a9907b></i></span><div class="logo-box" data-v-c1a9907b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        style: { "font-size": "24px", "font-weight": "700", "font-style": "italic", "color": "#000" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(site.value.siteName)}`);
          } else {
            return [
              createTextVNode(toDisplayString(site.value.siteName), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mobile-nav__container" data-v-c1a9907b></div><ul class="mobile-nav__contact list-unstyled" data-v-c1a9907b><li data-v-c1a9907b><i class="fa fa-envelope" data-v-c1a9907b></i><a${ssrRenderAttr("href", `mailto:${site.value.email}`)} data-v-c1a9907b>${ssrInterpolate(site.value.email)}</a></li><li data-v-c1a9907b><i class="fa fa-phone-alt" data-v-c1a9907b></i><a${ssrRenderAttr("href", `tel:${site.value.mobileContact.secondaryPhone.replace(/\s/g, "")}`)} data-v-c1a9907b>${ssrInterpolate(site.value.mobileContact.secondaryPhone)}</a></li></ul><div class="mobile-nav__top" data-v-c1a9907b><div class="mobile-nav__social" data-v-c1a9907b><!--[-->`);
      ssrRenderList(socialLinks.value, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} class="${ssrRenderClass(`fab fa-${social.icon}`)}" data-v-c1a9907b></a>`);
      });
      _push(`<!--]--></div></div></div></div><div class="search-popup" data-v-c1a9907b><div class="search-popup__overlay search-toggler" data-v-c1a9907b></div><div class="search-popup__content" data-v-c1a9907b><form action="#" data-v-c1a9907b><label for="search" class="sr-only" data-v-c1a9907b>search here</label><input id="search" type="text" placeholder="Search Here..." data-v-c1a9907b><button type="submit" aria-label="search submit" class="thm-btn" data-v-c1a9907b><i class="fas fa-search" data-v-c1a9907b></i></button></form></div></div><a href="#" data-target="html" class="scroll-to-target scroll-to-top" data-v-c1a9907b><i class="fas fa-arrow-up" data-v-c1a9907b></i></a></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c1a9907b"]]);

export { _default as default };
//# sourceMappingURL=default-DIXrSkNF.mjs.map
