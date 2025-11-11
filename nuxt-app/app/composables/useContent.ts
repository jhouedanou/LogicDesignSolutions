import contentData from '../server/utils/translations.json'

export const useContent = () => {
  // For now, using static import instead of dynamic fetch
  // This data can be easily replaced with a dynamic fetch when API works
  const content = ref(contentData)
  const pending = ref(false)
  const error = ref(null)

  const site = computed(() => content.value?.site)
  const navigation = computed(() => content.value?.navigation)
  const hero = computed(() => content.value?.hero)
  const about = computed(() => content.value?.about)
  const news = computed(() => content.value?.news)
  const brands = computed(() => content.value?.brands)
  const footer = computed(() => content.value?.footer)
  const faq = computed(() => content.value?.faq)

  return {
    content,
    pending,
    error,
    site,
    navigation,
    hero,
    about,
    news,
    brands,
    footer,
    faq
  }
}
