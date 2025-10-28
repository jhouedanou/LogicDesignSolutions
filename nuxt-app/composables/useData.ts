export const useMenu = async () => {
  return await useFetch('/api/menu')
}

export const useFooterData = async () => {
  return await useFetch('/api/footer')
}

export const useSiteConfig = async () => {
  return await useFetch('/api/site-config')
}
