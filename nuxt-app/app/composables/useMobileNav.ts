import { computed } from 'vue'
import { useFetch, useState } from '#imports'

export interface MenuItem {
  label: string
  path: string
}

/**
 * Menu affiché immédiatement, avant la réponse de /_api/menu.
 * Partagé entre AppMenu (desktop) et AppMobileNav (mobile).
 */
export const fallbackMenu: MenuItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'PROFILES', path: '/profiles' },
  { label: 'PRODUCTS', path: '/products' },
  { label: 'SERVICES', path: '/services' },
  { label: 'NEWS', path: '/news' },
  { label: 'BLOG', path: '/blog' },
  { label: 'REFERENCES', path: '/references' }
]

/**
 * Menu principal, partagé par AppMenu (desktop) et AppMobileNav (mobile).
 *
 * Centralisé ici pour que les deux composants utilisent des options useFetch
 * strictement identiques : appeler useFetch avec la même clé mais des options
 * distinctes déclenche l'avertissement "Incompatible options detected".
 */
export const useMenuItems = () => {
  const { data } = useFetch('/_api/menu', {
    key: 'menu-config',
    default: () => ({ items: fallbackMenu })
  })

  return computed<MenuItem[]>(() => data.value?.items ?? fallbackMenu)
}

/**
 * État partagé du menu mobile.
 *
 * Le thème d'origine pilotait ce menu en jQuery (bind unique au DOMReady d'un script
 * chargé en `async`), ce qui échouait dès que Vue réhydratait ou remplaçait le DOM.
 * Vue est désormais seul propriétaire de l'ouverture/fermeture.
 *
 * Volontairement sans effets de bord : le verrou de scroll et la fermeture à la
 * navigation sont gérés une seule fois dans AppMobileNav.vue, pour éviter des
 * watchers dupliqués à chaque appel de ce composable.
 */
export const useMobileNav = () => {
  const isOpen = useState<boolean>('mobileNavOpen', () => false)

  const open = () => { isOpen.value = true }
  const close = () => { isOpen.value = false }
  const toggle = () => { isOpen.value = !isOpen.value }

  return { isOpen, open, close, toggle }
}
