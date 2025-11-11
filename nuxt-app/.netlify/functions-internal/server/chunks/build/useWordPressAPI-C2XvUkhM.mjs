import { defineComponent, createElementBlock, shallowRef, getCurrentInstance, provide, cloneVNode, h } from 'vue';

defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const WP_API_BASE = "https://logic-design-solutions.com/wp-json/wp/v2";
const useWPProducts = async (perPage = 100, page = 1) => {
  const url = `${WP_API_BASE}/product?per_page=${perPage}&page=${page}&_embed`;
  try {
    const data = await $fetch(url, {
      retry: 0,
      timeout: 3e4
    }).catch((err) => {
      console.warn("useWPProducts fetch error:", err?.message || err);
      return null;
    });
    if (!data || typeof data !== "object") {
      return {
        data: [],
        error: { message: "Invalid response" },
        pending: false,
        totalCount: 0,
        totalPages: 1
      };
    }
    return {
      data: Array.isArray(data) ? data : [],
      error: null,
      pending: false,
      totalCount: 0,
      totalPages: 1
    };
  } catch (err) {
    console.warn("Error fetching WordPress products:", err instanceof Error ? err.message : err);
    return {
      data: [],
      error: err,
      pending: false,
      totalCount: 0,
      totalPages: 1
    };
  }
};
const useWPProduct = async (id) => {
  if (!id || id === "undefined" || typeof id === "string" && !id.trim()) {
    console.warn("useWPProduct called with invalid/empty id:", id);
    return {
      data: null,
      error: { message: "Invalid product ID" },
      pending: false
    };
  }
  const url = `${WP_API_BASE}/product/${id}?_embed`;
  try {
    const data = await $fetch(url, {
      retry: 0,
      timeout: 3e4
    }).catch((err) => {
      console.warn(`useWPProduct fetch error for ${id}:`, err?.message || err);
      return null;
    });
    if (!data || typeof data !== "object") {
      return {
        data: null,
        error: { message: "Invalid response" },
        pending: false
      };
    }
    return {
      data: data || null,
      error: null,
      pending: false
    };
  } catch (err) {
    console.warn(`Error fetching WordPress product ${id}:`, err instanceof Error ? err.message : err);
    return {
      data: null,
      error: err,
      pending: false
    };
  }
};
const useWPProductCategories = async () => {
  const url = `${WP_API_BASE}/product_cat?per_page=100`;
  try {
    const data = await $fetch(url, {
      retry: 0,
      timeout: 3e4
    }).catch((err) => {
      console.warn("useWPProductCategories fetch error:", err?.message || err);
      return null;
    });
    if (!data || typeof data !== "object") {
      return {
        data: [],
        error: { message: "Invalid response" },
        pending: false
      };
    }
    return {
      data: Array.isArray(data) ? data : [],
      error: null,
      pending: false
    };
  } catch (err) {
    console.warn("Error fetching WordPress product categories:", err instanceof Error ? err.message : err);
    return {
      data: [],
      error: err,
      pending: false
    };
  }
};

export { useWPProducts as a, useWPProduct as b, useWPProductCategories as u };
//# sourceMappingURL=useWordPressAPI-C2XvUkhM.mjs.map
