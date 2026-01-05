# Déploiement sur PlanetHoster

## Prérequis

- Hébergement PlanetHoster avec **Node.js** (N0lit ou World Lite/Performance)
- Accès SSH
- Node.js >= 20.x

## Option 1 : Via le panneau World (Recommandé)

### Étape 1 : Préparer le build localement

```bash
cd nuxt-app
npm install
npm run build
```

### Étape 2 : Fichiers à transférer sur PlanetHoster

Transférez ces fichiers/dossiers via FTP ou SSH :

```
.output/           # Dossier généré par le build (OBLIGATOIRE)
package.json       # Pour les dépendances
ecosystem.config.cjs  # Configuration PM2
```

### Étape 3 : Configurer l'application Node.js

1. Connectez-vous au **panneau World** de PlanetHoster
2. Allez dans **Sites Web** → **Applications Node.js**
3. Créez une nouvelle application :
   - **Chemin racine** : `/home/votre-compte/public_html` (ou le dossier de votre site)
   - **Version Node.js** : 20.x ou supérieur
   - **Point d'entrée** : `.output/server/index.mjs`
   - **Port** : 3000 (sera automatiquement redirigé)

### Étape 4 : Variables d'environnement

Dans le panneau World, ajoutez ces variables :

```
NODE_ENV=production
NITRO_HOST=0.0.0.0
NITRO_PORT=3000
```

### Étape 5 : Démarrer l'application

Cliquez sur "Démarrer" dans le panneau Node.js.

---

## Option 2 : Via SSH avec PM2

### Étape 1 : Se connecter en SSH

```bash
ssh votre-compte@votre-serveur.planethoster.net
```

### Étape 2 : Transférer les fichiers

```bash
# Sur votre machine locale
rsync -avz --progress .output/ votre-compte@serveur:~/public_html/.output/
scp package.json ecosystem.config.cjs votre-compte@serveur:~/public_html/
```

### Étape 3 : Installer PM2 et démarrer

```bash
# Sur le serveur
cd ~/public_html
npm install pm2 -g
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

---

## Configuration du domaine

### Fichier .htaccess (si Apache en front)

Créez un fichier `.htaccess` dans le dossier public :

```apache
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

### Ou via le panneau World

Configurez le **proxy inverse** pour rediriger le trafic vers le port 3000.

---

## Mise à jour du site

Quand vous mettez à jour le contenu WordPress, le site Nuxt se met à jour automatiquement grâce au cache SWR :

| Page | Délai de mise à jour |
|------|---------------------|
| `/products`, `/products/*` | 5 minutes max |
| `/news`, `/news/*` | 5 minutes max |
| `/faq`, `/profiles`, `/references` | 1 heure max |
| `/`, `/about`, `/services`, `/contact` | Au prochain déploiement |

### Pour forcer une mise à jour immédiate

Redémarrez l'application Node.js via le panneau ou :

```bash
pm2 restart logic-design-solutions
```

---

## Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
pm2 logs logic-design-solutions

# Vérifier que le port n'est pas utilisé
lsof -i :3000
```

### Erreur de mémoire

Augmentez la mémoire dans `ecosystem.config.cjs` :

```javascript
env: {
  NODE_OPTIONS: '--max-old-space-size=512'
}
```

### Les images ne s'affichent pas

Vérifiez que l'API WordPress autorise les requêtes CORS depuis `logic-design-solutions.com`.

---

## Architecture finale

```
WordPress (api.logic-design-solutions.com)
           ↓ API REST
Nuxt.js SSR (logic-design-solutions.com)
           ↓ Cache SWR
     Utilisateurs
```

Les données sont toujours fraîches avec un délai maximum de 5 minutes pour les pages dynamiques.
