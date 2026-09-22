// Normalisation canonique des URL, en une seule redirection 301 :
//   - www.logic-design-solutions.com -> logic-design-solutions.com
//   - barre oblique finale retirée (/about/ -> /about), sauf sur la racine
//
// Doublon volontaire des règles mod_rewrite du .htaccess : celles-ci interceptent en amont sur
// PlanetHoster, ce middleware prend le relais si le .htaccess est écrasé ou si l'hébergement
// change. Les deux sont idempotents — quand le .htaccess redirige, la requête n'arrive jamais ici.
//
// Les deux corrections sont fusionnées pour que www.site.com/about/ ne fasse qu'UN saut vers
// site.com/about, et non deux redirections en chaîne.
//
// La redirection http -> https reste volontairement au seul niveau du .htaccess : derrière
// Passenger, le protocole d'origine n'est pas déterminable de façon fiable, et une détection
// approximative provoquerait une boucle de redirection.

const CANONICAL_HOST = 'logic-design-solutions.com'
const WWW_HOST = `www.${CANONICAL_HOST}`

export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true })

  // Port retiré pour ne pas perturber le dev local (localhost:3000)
  const hostname = host?.split(':')[0]?.toLowerCase()
  const isWww = hostname === WWW_HOST

  const [pathname = '/', query] = event.path.split('?')

  // La racine est le seul chemin où la barre oblique finale est légitime
  const hasTrailingSlash = pathname !== '/' && pathname.endsWith('/')

  if (!isWww && !hasTrailingSlash) {
    return
  }

  const normalizedPath = hasTrailingSlash ? pathname.replace(/\/+$/, '') : pathname
  const target = `${normalizedPath}${query ? `?${query}` : ''}`

  // Sur l'hôte www on renvoie une URL absolue vers le domaine canonique ; sinon un chemin
  // relatif, pour que le dev local et les environnements de test ne soient pas renvoyés en prod.
  return sendRedirect(event, isWww ? `https://${CANONICAL_HOST}${target}` : target, 301)
})
