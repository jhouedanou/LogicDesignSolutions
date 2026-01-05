# Fichiers à Transférer vers le Serveur PlanetHoster

## Destination : `/home/fggxbsyg/public_html/new/`

## 📋 Liste Complète des Fichiers Essentiels

### 1. Fichiers de Configuration
```
✓ package.json
✓ package-lock.json
✓ nuxt.config.ts
✓ tsconfig.json
✓ ecosystem.config.cjs (si vous utilisez PM2)
```

### 2. Scripts de Build (OBLIGATOIRES)
```
✓ merge-assets.cjs          ← MANQUANT sur le serveur
✓ convert-images.cjs         ← MANQUANT sur le serveur
✓ webhook-rebuild.sh
```

### 3. Dossiers Complets
```
✓ app/                       (tout le dossier avec sous-dossiers)
  ├── app.vue
  ├── assets/
  ├── components/
  ├── composables/
  ├── layouts/
  ├── pages/
  ├── plugins/
  └── server/

✓ public/                    (tout le dossier avec assets)
  ├── assets/
  │   ├── css/
  │   ├── js/
  │   ├── images/
  │   ├── vendors/
  │   └── webfonts/
  ├── data/
  └── robots.txt

✓ types/                     (si présent)
```

### 4. Fichiers Optionnels mais Recommandés
```
□ .env                       (variables d'environnement)
□ .gitignore
□ README.md
```

## ⚠️ Fichiers MANQUANTS Actuellement

D'après l'erreur, ces fichiers sont absents :

1. **`merge-assets.cjs`** - Fusionne les CSS et JS
2. **`convert-images.cjs`** - Convertit les images en WebP

## 🚀 Commandes pour Vérifier sur le Serveur

```bash
# Se connecter en SSH
ssh fggxbsyg@votre-serveur.com

# Aller dans le dossier
cd /home/fggxbsyg/public_html/new

# Vérifier si les fichiers existent
ls -la merge-assets.cjs
ls -la convert-images.cjs

# Lister tous les fichiers
ls -la

# Vérifier le dossier public/assets
ls -la public/assets/
```

## 📤 Méthodes de Transfert

### Option 1 : FTP/SFTP (Interface Graphique)
Utilisez FileZilla ou Cyberduck :
- Hôte : votre-domaine.com
- Utilisateur : fggxbsyg
- Protocole : SFTP
- Destination : `/home/fggxbsyg/public_html/new/`

### Option 2 : SCP (Ligne de Commande)
```bash
# Transférer les fichiers manquants
scp merge-assets.cjs fggxbsyg@votre-serveur.com:/home/fggxbsyg/public_html/new/
scp convert-images.cjs fggxbsyg@votre-serveur.com:/home/fggxbsyg/public_html/new/

# Transférer tout le dossier public
scp -r public/ fggxbsyg@votre-serveur.com:/home/fggxbsyg/public_html/new/
```

### Option 3 : rsync (RECOMMANDÉ)
```bash
# Synchroniser tout le projet (exclut node_modules et .output)
rsync -avz --exclude 'node_modules' --exclude '.output' --exclude '.nuxt' \
  ./ fggxbsyg@votre-serveur.com:/home/fggxbsyg/public_html/new/
```

### Option 4 : Git (Si configuré sur le serveur)
```bash
# Sur le serveur
cd /home/fggxbsyg/public_html/new
git pull origin main
```

## ✅ Checklist Après Transfert

Une fois les fichiers transférés, exécutez :

```bash
# Se connecter en SSH
ssh fggxbsyg@votre-serveur.com

# Aller dans le dossier
cd /home/fggxbsyg/public_html/new

# Vérifier que les fichiers sont présents
ls -la merge-assets.cjs convert-images.cjs

# Rendre le script exécutable
chmod +x webhook-rebuild.sh

# Installer les dépendances
npm install

# Tester le build
npm run build
```

## 🔍 Structure Attendue Finale

```
/home/fggxbsyg/public_html/new/
├── merge-assets.cjs          ✓
├── convert-images.cjs         ✓
├── package.json               ✓
├── package-lock.json          ✓
├── nuxt.config.ts             ✓
├── tsconfig.json              ✓
├── ecosystem.config.cjs       ✓
├── webhook-rebuild.sh         ✓
├── app/                       ✓
│   ├── app.vue
│   ├── assets/
│   ├── components/
│   └── ...
├── public/                    ✓
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── vendors/
│   └── robots.txt
├── node_modules/             (généré par npm install)
└── .output/                  (généré par npm run build)
```

## 🐛 Résolution des Erreurs Courantes

### Erreur : "Cannot find module 'merge-assets.cjs'"
**Cause :** Le fichier n'a pas été transféré
**Solution :** Transférer le fichier avec SCP/FTP

### Erreur : "Permission denied"
**Cause :** Les permissions sont incorrectes
**Solution :**
```bash
chmod 755 /home/fggxbsyg/public_html/new
chmod +x webhook-rebuild.sh
```

### Erreur : "Cannot find module 'sharp'"
**Cause :** Les dépendances ne sont pas installées
**Solution :**
```bash
cd /home/fggxbsyg/public_html/new
npm install
```

## 💡 Conseil : Script de Déploiement Automatique

Créez un fichier `deploy.sh` en local pour automatiser le déploiement :

```bash
#!/bin/bash

SERVER="fggxbsyg@votre-serveur.com"
REMOTE_DIR="/home/fggxbsyg/public_html/new"

echo "📤 Déploiement vers PlanetHoster..."

# Synchroniser les fichiers
rsync -avz --exclude 'node_modules' --exclude '.output' --exclude '.nuxt' \
  --exclude '.git' --exclude '.DS_Store' \
  ./ $SERVER:$REMOTE_DIR/

echo "✅ Fichiers transférés"

# Exécuter les commandes sur le serveur
ssh $SERVER "cd $REMOTE_DIR && npm install && npm run build"

echo "🎉 Déploiement terminé!"
```

Utilisation :
```bash
chmod +x deploy.sh
./deploy.sh
```
