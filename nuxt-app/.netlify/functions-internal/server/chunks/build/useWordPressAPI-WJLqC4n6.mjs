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
  try {
    const response = await fetch(
      `${WP_API_BASE}/product?per_page=${perPage}&page=${page}&_embed`
    );
    if (!response.ok) {
      console.warn(`WordPress API error: ${response.status} ${response.statusText}`);
      return {
        data: [],
        error: { message: `HTTP ${response.status}`, status: response.status },
        pending: false,
        totalCount: 0,
        totalPages: 1
      };
    }
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.warn("WordPress API returned non-JSON response");
      return {
        data: [],
        error: { message: "Invalid content type" },
        pending: false,
        totalCount: 0,
        totalPages: 1
      };
    }
    const data = await response.json();
    const totalCount = parseInt(response.headers.get("X-WP-Total") || "0");
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1");
    return {
      data: data || [],
      error: null,
      pending: false,
      totalCount,
      totalPages
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
  try {
    const response = await fetch(
      `${WP_API_BASE}/product/${id}?_embed`
    );
    if (!response.ok) {
      console.warn(`WordPress API error for product ${id}: ${response.status} ${response.statusText}`);
      return {
        data: null,
        error: { message: `HTTP ${response.status}`, status: response.status },
        pending: false
      };
    }
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.warn(`WordPress API returned non-JSON response for product ${id}`);
      return {
        data: null,
        error: { message: "Invalid content type" },
        pending: false
      };
    }
    const data = await response.json();
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
  try {
    const response = await fetch(
      `${WP_API_BASE}/product_cat?per_page=100`
    );
    if (!response.ok) {
      console.warn(`WordPress API error: ${response.status} ${response.statusText}`);
      return {
        data: [],
        error: { message: `HTTP ${response.status}` },
        pending: false
      };
    }
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.warn("WordPress API returned non-JSON response for categories");
      return {
        data: [],
        error: { message: "Invalid content type" },
        pending: false
      };
    }
    const data = await response.json();
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
//# sourceMappingURL=useWordPressAPI-WJLqC4n6.mjs.map
