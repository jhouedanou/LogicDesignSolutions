// JSON importé au build : bundlé dans le serveur, indépendant du cwd au runtime
import footer from '../../../public/data/footer.json'

export default defineEventHandler(() => footer)
