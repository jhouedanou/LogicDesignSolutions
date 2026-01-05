# Guide Rapide : Résolution du Problème Sharp

## 🔴 Problème

```
Error: Could not load the "sharp" module using the linux-x64 runtime
```

**Cause :** Sharp est une bibliothèque native qui doit être compilée pour chaque plateforme. La version installée en local (macOS) ne fonctionne pas sur Linux.

## ✅ Solution Recommandée : Pré-build en Local

### Étape 1 : En local (sur votre Mac)

```bash
# 1. Préparer les assets (fusion CSS/JS et conversion images)
npm run prebuild

# 2. Vérifier que les fichiers sont créés
ls -la public/assets/css/merged-vendors.min.css
ls -la public/assets/js/merged-vendors.min.js

# 3. Builder l'application
npm run build
```

### Étape 2 : Transférer vers le serveur

**Option A - Tout transférer (recommandé) :**
```bash
rsync -avz --exclude 'node_modules' ./ fggxbsyg@serveur:/home/fggxbsyg/public_html/new/
```

**Option B - Seulement le dossier .output (plus rapide) :**
```bash
# Transférer les fichiers nécessaires
rsync -avz .output/ fggxbsyg@serveur:/home/fggxbsyg/public_html/new/.output/
rsync -avz public/ fggxbsyg@serveur:/home/fggxbsyg/public_html/new/public/
```

### Étape 3 : Sur le serveur

Si vous avez transféré tout le projet :
```bash
cd /home/fggxbsyg/public_html/new
npm install --omit=dev
npm run build:server  # Build sans les scripts de preprocessing
```

Si vous avez seulement transféré .output :
```bash
cd /home/fggxbsyg/public_html/new
# Rien à faire, utilisez directement .output
```

## 🔧 Solutions Alternatives

### Solution B : Forcer la réinstallation de Sharp sur le serveur

```bash
# Sur le serveur
cd /home/fggxbsyg/public_html/new

# Supprimer node_modules
rm -rf node_modules

# Réinstaller avec les binaires natifs
npm install

# Si ça ne marche toujours pas
npm rebuild sharp

# Ou forcer l'installation pour Linux
npm install --os=linux --cpu=x64 sharp
```

### Solution C : Désactiver la conversion d'images

Si vous n'avez pas besoin de la conversion WebP :

**1. Modifier `package.json` :**
```json
"scripts": {
  "build": "npm run merge-assets && nuxt build",
  "build:server": "nuxt build",
}
```

**2. Ou créer un `.env` sur le serveur :**
```bash
SKIP_IMAGE_CONVERSION=true
```

**3. Modifier `convert-images.cjs` pour vérifier cette variable :**
```javascript
if (process.env.SKIP_IMAGE_CONVERSION === 'true') {
  console.log('⏭️  Conversion d\'images désactivée');
  process.exit(0);
}
```

## 📋 Checklist de Déploiement

- [ ] **En local :** Exécuter `npm run prebuild`
- [ ] **En local :** Vérifier que les fichiers merged existent
- [ ] **En local :** Builder avec `npm run build`
- [ ] **Transfert :** Envoyer les fichiers sur le serveur
- [ ] **Sur serveur :** Installer les dépendances (sans sharp si possible)
- [ ] **Sur serveur :** Utiliser `npm run build:server` au lieu de `build`
- [ ] **Test :** Vérifier que le site fonctionne

## 🎯 Workflow Idéal

```bash
# EN LOCAL (Mac)
npm run prebuild          # Prépare les assets
npm run build            # Build complet

# TRANSFERT
./deploy.sh              # Script automatique

# SUR SERVEUR
cd /home/fggxbsyg/public_html/new
npm install --omit=dev   # Sans devDependencies
npm run build:server     # Build sans preprocessing
```

## ⚡ Quick Fix Immédiat

Pour déployer MAINTENANT sans résoudre le problème Sharp :

```bash
# 1. En local - Build complet
npm run build

# 2. Transférer SEULEMENT .output et public
scp -r .output public package.json nuxt.config.ts \
  fggxbsyg@serveur:/home/fggxbsyg/public_html/new/

# 3. Sur le serveur - Démarrer directement
cd /home/fggxbsyg/public_html/new
npm start
```

## 📝 Notes Importantes

1. **Sharp est seulement nécessaire pour la conversion d'images**
2. **Si les images WebP existent déjà, Sharp n'est pas nécessaire**
3. **Le merge-assets.cjs n'utilise pas Sharp, il doit toujours fonctionner**
4. **En production, vous pouvez pré-générer tous les assets en local**

## 🆘 En cas de problème persistant

Contactez le support PlanetHoster pour :
- Vérifier que les outils de compilation sont disponibles
- S'assurer que Python est installé (requis par Sharp)
- Vérifier les permissions sur node_modules

Ou utilisez l'approche "pré-build en local" qui évite complètement le problème !
