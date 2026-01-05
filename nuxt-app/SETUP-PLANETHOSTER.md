# Configuration PlanetHoster - Guide Complet

## Structure des Dossiers

```
/home/fggxbsyg/
├── public_html/              # Dossier racine web (accessible publiquement)
│   ├── new/                  # Votre application Nuxt
│   │   ├── package.json
│   │   ├── nuxt.config.ts
│   │   ├── app/
│   │   ├── .output/
│   │   └── ...
│   ├── webhook-rebuild.php
│   └── webhook-rebuild.log
```

## Étapes d'Installation

### 1. Transférer les fichiers

Transférez tous les fichiers de votre projet dans `/home/fggxbsyg/public_html/new/`

### 2. Se connecter en SSH

```bash
ssh fggxbsyg@votre-domaine.com
```

### 3. Aller dans le dossier du projet

```bash
cd /home/fggxbsyg/public_html/new
```

### 4. Installer les dépendances

```bash
npm install
```

### 5. Builder l'application

```bash
npm run build
```

### 6. Configurer le webhook

Le webhook doit être placé dans le dossier racine (`/home/fggxbsyg/public_html/`) et configuré pour pointer vers le bon répertoire.

**Fichier: `/home/fggxbsyg/public_html/webhook-rebuild.php`**

```php
<?php
// Webhook pour déclencher le rebuild
header('Content-Type: application/json');

// Vérifier le token de sécurité
$expectedToken = 'VOTRE_TOKEN_SECRET';
$receivedToken = $_GET['token'] ?? '';

if ($receivedToken !== $expectedToken) {
    http_response_code(403);
    echo json_encode(['error' => 'Token invalide']);
    exit;
}

// Chemin vers le script de rebuild
$scriptPath = '/home/fggxbsyg/public_html/new/webhook-rebuild.sh';

// Exécuter le script en arrière-plan
$output = [];
$returnVar = 0;
exec("bash $scriptPath > /dev/null 2>&1 &", $output, $returnVar);

http_response_code(202);
echo json_encode([
    'status' => 'accepted',
    'message' => 'Rebuild déclenché',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
```

### 7. Mettre à jour le script webhook-rebuild.sh

Le script doit être placé dans `/home/fggxbsyg/public_html/new/webhook-rebuild.sh`

Assurez-vous que le script contient le bon chemin:

```bash
PROJECT_DIR="/home/fggxbsyg/public_html/new"
cd "$PROJECT_DIR" || {
    log "❌ Impossible d'accéder au dossier $PROJECT_DIR"
    rm -f "$LOCKFILE"
    exit 1
}
```

### 8. Rendre le script exécutable

```bash
chmod +x /home/fggxbsyg/public_html/new/webhook-rebuild.sh
```

## Commandes Utiles

### Builder manuellement

```bash
cd /home/fggxbsyg/public_html/new
npm run build
```

### Copier les fichiers buildés vers le dossier racine

```bash
cd /home/fggxbsyg/public_html/new
rsync -av --exclude='webhook-rebuild.php' --exclude='webhook-rebuild.log' .output/public/ /home/fggxbsyg/public_html/
```

### Vérifier les logs

```bash
tail -f /home/fggxbsyg/public_html/webhook-rebuild.log
```

### Tester le webhook

```bash
curl "https://votre-domaine.com/webhook-rebuild.php?token=VOTRE_TOKEN_SECRET"
```

## Configuration PM2 (Pour SSR)

Si vous utilisez le mode SSR au lieu de statique, vous devez utiliser PM2:

### Installer PM2 globalement

```bash
npm install -g pm2
```

### Configuration PM2 - ecosystem.config.cjs

```javascript
module.exports = {
  apps: [{
    name: 'nuxt-app',
    port: 3000,
    cwd: '/home/fggxbsyg/public_html/new',
    script: './.output/server/index.mjs',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### Démarrer l'application avec PM2

```bash
cd /home/fggxbsyg/public_html/new
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### Commandes PM2

```bash
pm2 list              # Voir les applications
pm2 logs nuxt-app     # Voir les logs
pm2 restart nuxt-app  # Redémarrer
pm2 stop nuxt-app     # Arrêter
pm2 delete nuxt-app   # Supprimer
```

## Résolution des Problèmes

### Erreur: "Could not read package.json"

**Cause:** npm cherche le package.json dans le mauvais répertoire.

**Solution:** Toujours se positionner dans le bon répertoire avant d'exécuter npm:

```bash
cd /home/fggxbsyg/public_html/new
npm run build
```

### Erreur de permissions

```bash
chmod -R 755 /home/fggxbsyg/public_html/new
chmod +x /home/fggxbsyg/public_html/new/webhook-rebuild.sh
```

### Node_modules trop lourds

```bash
cd /home/fggxbsyg/public_html/new
npm ci --omit=dev
```

### Espace disque insuffisant

```bash
# Nettoyer le cache npm
npm cache clean --force

# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

## Variables d'Environnement

Créez un fichier `.env` dans `/home/fggxbsyg/public_html/new/.env`:

```env
NODE_ENV=production
NUXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

## Configuration .htaccess (Pour déploiement statique)

Si vous déployez les fichiers statiques directement dans `public_html`, créez un fichier `.htaccess`:

```apache
RewriteEngine On
RewriteBase /

# Rediriger les erreurs 404 vers index.html
ErrorDocument 404 /index.html

# Gestion des fichiers statiques
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Compression gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache des fichiers statiques
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## Checklist de Déploiement

- [ ] Fichiers transférés dans `/home/fggxbsyg/public_html/new/`
- [ ] `npm install` exécuté
- [ ] `npm run build` réussi
- [ ] Fichiers copiés vers `public_html` (si déploiement statique)
- [ ] Webhook configuré et testé
- [ ] Script `webhook-rebuild.sh` exécutable
- [ ] Variables d'environnement configurées
- [ ] .htaccess configuré (si statique)
- [ ] PM2 configuré et démarré (si SSR)
- [ ] Logs vérifiés

## Support

Pour plus d'informations sur le déploiement PlanetHoster, consultez:
- [DEPLOY-PLANETHOSTER.md](./DEPLOY-PLANETHOSTER.md)
- [GUIDE-RAPIDE-DEPLOIEMENT.md](./GUIDE-RAPIDE-DEPLOIEMENT.md)
