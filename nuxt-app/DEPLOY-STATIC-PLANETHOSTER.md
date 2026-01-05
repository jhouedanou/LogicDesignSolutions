# Déploiement Statique sur PlanetHoster avec Rebuild Automatique

## Architecture

```
WordPress (api.logic-design-solutions.com)
    ↓ Modification de contenu
    ↓ Webhook
Rebuild automatique
    ↓ Génération statique
Site HTML/CSS/JS (logic-design-solutions.com)
```

## Avantages de cette approche

✅ **Site ultra-rapide** : Fichiers HTML statiques
✅ **Données toujours à jour** : Rebuild automatique à chaque modification
✅ **Moins cher** : Pas besoin de Node.js en production
✅ **Facile à héberger** : Simple hébergement web suffit
✅ **SEO optimal** : Tout est pré-rendu

---

## Installation

### Étape 1 : Configuration initiale sur votre machine

```bash
cd nuxt-app
npm install
```

### Étape 2 : Tester le build localement

```bash
npm run build
```

Le site statique sera généré dans `.output/public/`

### Étape 3 : Transférer sur PlanetHoster

**Via FTP ou cPanel File Manager :**

1. Transférer le contenu de `.output/public/` vers `public_html/`
2. Créer un dossier `nuxt-app` à la racine de votre compte
3. Y transférer :
   - `package.json`
   - `nuxt.config.ts`
   - `app/` (tout le dossier)
   - `webhook-rebuild.sh`
   - Tous les fichiers du projet Nuxt

**Structure finale sur le serveur :**
```
/home/votre-compte/
├── public_html/              # Site statique généré
│   ├── index.html
│   ├── products/
│   ├── news/
│   └── webhook-rebuild.php   # ← Endpoint webhook
├── nuxt-app/                 # Source du projet
│   ├── app/
│   ├── package.json
│   ├── nuxt.config.ts
│   └── webhook-rebuild.sh    # ← Script de rebuild
```

### Étape 4 : Configuration du webhook

**A. Placer le endpoint webhook**

Copier `webhook-endpoint.php` vers `public_html/webhook-rebuild.php`

**Modifier la clé secrète :**
```php
define('WEBHOOK_SECRET', 'CHANGEZ-MOI-123456');
```

**B. Rendre le script exécutable**

Via SSH :
```bash
chmod +x ~/nuxt-app/webhook-rebuild.sh
```

**C. Tester le webhook manuellement**

```bash
curl "https://logic-design-solutions.com/webhook-rebuild.php?secret=VOTRE-CLE-SECRETE"
```

### Étape 5 : Installer le plugin WordPress

**Sur api.logic-design-solutions.com :**

1. Copier `wordpress-webhook-plugin.php` vers `wp-content/plugins/`
2. Modifier la configuration :
   ```php
   define('NUXT_WEBHOOK_URL', 'https://logic-design-solutions.com/webhook-rebuild.php');
   define('NUXT_WEBHOOK_SECRET', 'VOTRE-CLE-SECRETE');
   ```
3. Activer le plugin dans **Extensions** → **Extensions installées**

---

## Utilisation

### Rebuild automatique

Le site se rebuild automatiquement quand vous :
- ✏️ Publiez ou modifiez un produit
- 📰 Publiez ou modifiez un article
- 🎨 Modifiez un slide
- 🤝 Modifiez un partenaire
- ❓ Modifiez une FAQ

**Délai :** Le rebuild prend environ 2-5 minutes selon le nombre de pages.

### Rebuild manuel

Dans l'admin WordPress, cliquez sur **🔄 Rebuild Site Nuxt** dans la barre d'admin.

### Vérifier les logs

```bash
# Sur le serveur via SSH
tail -f ~/public_html/webhook-rebuild.log
```

---

## Optimisations

### 1. Cache du build

Pour accélérer les rebuilds, installer les dépendances une seule fois :

```bash
cd ~/nuxt-app
npm install
```

### 2. Rebuild partiel (optionnel)

Si vous avez beaucoup de pages, modifiez `webhook-rebuild.sh` pour ne rebuild que les pages modifiées.

### 3. File d'attente

Pour éviter plusieurs rebuilds simultanés, ajoutez un lock dans `webhook-endpoint.php` :

```php
$lockFile = __DIR__ . '/rebuild.lock';

if (file_exists($lockFile)) {
    die(json_encode(['status' => 'busy', 'message' => 'Rebuild déjà en cours']));
}

touch($lockFile);
exec($command);
// Le script webhook-rebuild.sh devra supprimer le lock à la fin
```

---

## Dépannage

### Le rebuild ne se déclenche pas

1. Vérifier que le plugin WordPress est activé
2. Vérifier la clé secrète dans les deux fichiers
3. Vérifier les logs WordPress : `wp-content/debug.log`
4. Tester le webhook manuellement avec `curl`

### Le build échoue

```bash
# Vérifier les erreurs
cat ~/nuxt-app/.output/build.log

# Rebuilder manuellement
cd ~/nuxt-app
npm run build
```

### Les nouvelles pages n'apparaissent pas

Vérifier que les slugs sont bien récupérés dans `nuxt.config.ts` :
- Produits : `https://api.logic-design-solutions.com/wp-json/wp/v2/product?per_page=100`
- Articles : `https://api.logic-design-solutions.com/wp-json/wp/v2/posts?per_page=100`

### Node.js n'est pas disponible sur l'hébergement

PlanetHoster World Lite/Performance inclut Node.js. Si vous avez un plan sans Node.js :

**Option 1 :** Rebuilder en local et transférer via FTP
**Option 2 :** Utiliser GitHub Actions (voir section suivante)

---

## Alternative : GitHub Actions (Recommandé)

Si vous préférez automatiser avec Git :

**1. Créer `.github/workflows/deploy.yml` :**

```yaml
name: Deploy to PlanetHoster

on:
  repository_dispatch:
    types: [wordpress-update]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install & Build
        run: |
          cd nuxt-app
          npm ci
          npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ftp.votreserveur.planethoster.net
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./nuxt-app/.output/public/
          server-dir: /public_html/
```

**2. Modifier le plugin WordPress :**

```php
// Au lieu d'appeler webhook-rebuild.php, déclencher GitHub Actions
wp_remote_post('https://api.github.com/repos/VOUS/REPO/dispatches', [
    'headers' => [
        'Authorization' => 'Bearer ' . GITHUB_TOKEN,
        'Content-Type' => 'application/json'
    ],
    'body' => json_encode([
        'event_type' => 'wordpress-update'
    ])
]);
```

---

## Comparaison des approches

| Critère | Statique + Webhook | SSR (guide précédent) |
|---------|-------------------|----------------------|
| Vitesse | ⚡⚡⚡ Ultra rapide | ⚡⚡ Rapide |
| Coût hébergement | 💰 Moins cher | 💰💰 Plus cher |
| Mise à jour | 2-5 min après modif | Instantané |
| Complexité | 🔧 Moyenne | 🔧🔧 Plus complexe |
| Node.js requis | Non (juste pour build) | Oui (en production) |

---

## Conclusion

Cette approche est **idéale** pour votre cas car :
- Vos pages ne changent pas de structure (seulement le contenu)
- Vous voulez un site ultra-rapide
- Vous pouvez attendre 2-5 minutes pour voir les mises à jour
- Vous voulez minimiser les coûts d'hébergement
