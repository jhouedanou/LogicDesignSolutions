# 🚀 Guide de Déploiement PlanetHoster - Solution Complète

## ⚠️ Problèmes Rencontrés et Solutions

### 1. ❌ Erreur : "Cannot find module 'merge-assets.cjs'"

**Cause :** Fichiers de build manquants sur le serveur

**Solution :** Transférer les fichiers :
- `merge-assets.cjs`
- `convert-images.cjs`
- Tout le dossier `public/`

### 2. ❌ Erreur : "Could not load the 'sharp' module"

**Cause :** Sharp est une bibliothèque native qui doit être compilée pour Linux

**Solution :** **Pré-build en local** (recommandé)

---

## ✅ Workflow de Déploiement Correct

### 🔧 Étape 1 : Préparation en Local (Mac)

```bash
cd /Users/houedanou/Documents/GitHub/LogicDesignSolutions/nuxt-app

# 1. Générer les assets fusionnés et convertir les images
npm run prebuild

# 2. Vérifier que les fichiers sont créés
ls -la public/assets/css/merged-vendors.min.css
ls -la public/assets/js/merged-vendors.min.js

# 3. Builder l'application complète
npm run build

# 4. Vérifier que .output existe
ls -la .output/
```

### 📤 Étape 2 : Transfert vers le Serveur

**Option A - Script automatique (recommandé) :**

```bash
# Éditer deploy.sh avec votre serveur
nano deploy.sh
# Remplacer: SERVER="fggxbsyg@votre-serveur.com"

# Rendre exécutable
chmod +x deploy.sh

# Déployer
./deploy.sh
```

**Option B - Commande manuelle rsync :**

```bash
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  ./ fggxbsyg@votre-serveur.com:/home/fggxbsyg/public_html/new/
```

**Option C - FTP/SFTP :**
- Utiliser FileZilla
- Transférer TOUT le contenu vers `/home/fggxbsyg/public_html/new/`
- **Important :** Inclure le dossier `public/` avec les fichiers merged

### 🖥️ Étape 3 : Sur le Serveur

```bash
# Connexion SSH
ssh fggxbsyg@votre-serveur.com

# Aller dans le dossier
cd /home/fggxbsyg/public_html/new

# Vérifier que les fichiers sont présents
ls -la merge-assets.cjs convert-images.cjs
ls -la public/assets/css/merged-vendors.min.css

# Rendre le script exécutable
chmod +x webhook-rebuild.sh

# Installer les dépendances (SANS devDependencies)
npm install --omit=dev

# Builder SANS les scripts de preprocessing
npm run build:server
```

### ✅ Étape 4 : Vérification

```bash
# Vérifier que .output existe
ls -la .output/

# Vérifier les logs (si webhook utilisé)
tail -f /home/fggxbsyg/public_html/webhook-rebuild.log

# Tester le site
curl https://votre-domaine.com
```

---

## 📋 Scripts Disponibles

| Script | Description | Où l'utiliser |
|--------|-------------|---------------|
| `npm run prebuild` | Génère assets fusionnés + convertit images | **EN LOCAL** |
| `npm run build` | Prebuild + Build Nuxt | **EN LOCAL** |
| `npm run build:server` | Build Nuxt SANS preprocessing | **SUR SERVEUR** |
| `npm run merge-assets` | Fusionne CSS et JS | Local ou Serveur |
| `npm run convert-images` | Convertit images en WebP | **EN LOCAL** |
| `npm start` | Démarre le serveur SSR | Serveur |
| `npm run start:pm2` | Démarre avec PM2 | Serveur |

---

## 🔄 Workflow Webhook (Automatique)

### Configuration Webhook

**1. Fichier webhook PHP** (`/home/fggxbsyg/public_html/webhook-rebuild.php`)

Créer ce fichier dans le dossier `public_html` (PAS dans `new/`) :

```php
<?php
header('Content-Type: application/json');

$expectedToken = 'VOTRE_TOKEN_SECRET_123';
$receivedToken = $_GET['token'] ?? '';

if ($receivedToken !== $expectedToken) {
    http_response_code(403);
    echo json_encode(['error' => 'Token invalide']);
    exit;
}

$scriptPath = '/home/fggxbsyg/public_html/new/webhook-rebuild.sh';
exec("bash $scriptPath > /dev/null 2>&1 &");

http_response_code(202);
echo json_encode([
    'status' => 'accepted',
    'message' => 'Rebuild déclenché',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
```

**2. Vérifier webhook-rebuild.sh**

Le fichier doit contenir le bon chemin :

```bash
PROJECT_DIR="/home/fggxbsyg/public_html/new"
cd "$PROJECT_DIR" || exit 1
```

**3. Tester le webhook**

```bash
curl "https://votre-domaine.com/webhook-rebuild.php?token=VOTRE_TOKEN_SECRET_123"
```

---

## 🛠️ Dépannage

### Le build échoue sur le serveur

**Symptôme :** Erreur lors de `npm run build`

**Solution :**
```bash
# Utiliser build:server au lieu de build
npm run build:server
```

### Sharp ne fonctionne pas

**Solution 1 - Pré-convertir en local (recommandé) :**
```bash
# En local
npm run convert-images
git add public/assets/images/
git commit -m "Add WebP images"
git push
```

**Solution 2 - Réinstaller Sharp :**
```bash
# Sur serveur
npm rebuild sharp
```

**Solution 3 - Ignorer Sharp :**
Modifier `package.json` sur le serveur pour utiliser seulement `build:server`

### node_modules trop lourd

```bash
# Installer sans devDependencies
npm install --omit=dev

# Ou utiliser npm ci
npm ci --omit=dev
```

### Permissions incorrectes

```bash
chmod 755 /home/fggxbsyg/public_html/new
chmod +x /home/fggxbsyg/public_html/new/webhook-rebuild.sh
chmod 755 /home/fggxbsyg/public_html/new/public
```

---

## 📁 Structure Finale du Serveur

```
/home/fggxbsyg/
├── public_html/
│   ├── webhook-rebuild.php          ← Webhook endpoint
│   ├── webhook-rebuild.log          ← Logs
│   └── new/                         ← Application Nuxt
│       ├── merge-assets.cjs         ✓
│       ├── convert-images.cjs       ✓
│       ├── webhook-rebuild.sh       ✓
│       ├── package.json             ✓
│       ├── nuxt.config.ts           ✓
│       ├── app/                     ✓
│       ├── public/                  ✓
│       │   └── assets/
│       │       ├── css/
│       │       │   └── merged-vendors.min.css  ← Généré en local
│       │       └── js/
│       │           └── merged-vendors.min.js   ← Généré en local
│       ├── node_modules/            (généré)
│       └── .output/                 (généré)
```

---

## ✨ Checklist Complète

### En Local (avant déploiement)
- [ ] `npm run prebuild` exécuté
- [ ] Fichiers merged-vendors.* créés
- [ ] Images WebP créées (si nécessaire)
- [ ] `npm run build` réussi
- [ ] Fichiers committés dans Git

### Transfert
- [ ] Tous les fichiers transférés (sauf node_modules)
- [ ] Fichiers merge-assets.cjs et convert-images.cjs présents
- [ ] Dossier public/ complet avec assets fusionnés

### Sur le Serveur
- [ ] `npm install --omit=dev` réussi
- [ ] webhook-rebuild.sh exécutable (`chmod +x`)
- [ ] `npm run build:server` réussi
- [ ] Dossier .output/ créé
- [ ] Site accessible

### Webhook (optionnel)
- [ ] webhook-rebuild.php configuré
- [ ] Token secret défini
- [ ] Webhook testé avec curl

---

## 📚 Documentation Supplémentaire

- [FIX-SHARP-ERROR.md](./FIX-SHARP-ERROR.md) - Résolution détaillée du problème Sharp
- [FICHIERS-A-TRANSFERER.md](./FICHIERS-A-TRANSFERER.md) - Liste complète des fichiers
- [SETUP-PLANETHOSTER.md](./SETUP-PLANETHOSTER.md) - Configuration PlanetHoster complète

---

## 🆘 Besoin d'Aide ?

1. Vérifier les logs : `tail -f /home/fggxbsyg/public_html/webhook-rebuild.log`
2. Tester manuellement : `ssh` puis `cd` puis `npm run build:server`
3. Consulter la documentation Nuxt : https://nuxt.com/docs/getting-started/deployment
4. Support PlanetHoster : https://planethoster.com/support

---

**Dernière mise à jour :** 5 janvier 2026
