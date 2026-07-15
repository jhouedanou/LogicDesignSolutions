// JSON importé au build : bundlé dans le serveur, indépendant du cwd au runtime
import siteConfig from '../../../public/data/site-config.json'

export default defineEventHandler(() => siteConfig)
