// JSON importé au build : bundlé dans le serveur, indépendant du cwd au runtime
import menu from '../../../public/data/menu.json'

export default defineEventHandler(() => menu)
