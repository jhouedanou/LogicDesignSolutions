# 🚀 GUIDE ULTRA-RAPIDE - Déploiement PlanetHoster

## ⚡ Solution en 3 Étapes

### 📋 Ce qui a été corrigé

✅ `sass-embedded` → `sass` (compatibilité Linux)  
✅ `sharp` rendu optionnel  
✅ `webhook-rebuild.sh` avec bon chemin  
✅ Scripts de déploiement créés

---

## 🎯 CE QU'IL FAUT FAIRE MAINTENANT

### Étape 1 : Pull les derniers changements sur le serveur

```bash
# SSH vers le serveur
ssh fggxbsyg@votre-serveur.com

# Aller dans le dossier
cd /home/fggxbsyg/public_html/new

# Pull les changements
git pull origin main
```

**OU si pas de Git sur le serveur, transférez les fichiers :**

```bash
# Sur votre Mac
rsync -avz --exclude 'node_modules' --exclude '.output' \
  ./ fggxbsyg@votre-serveur.com:/home/fggxbsyg/public_html/new/
```

---

### Étape 2 : Sur le serveur - Nettoyer et réinstaller

```bash
# Supprimer l'ancien node_modules
rm -rf node_modules .output .nuxt

# Réinstaller avec la nouvelle dépendance (sass au lieu de sass-embedded)
npm install --omit=dev
```

---

### Étape 3 : Builder

```bash
# Builder l'application
npm run build:server
```

**Si ça ne fonctionne pas, installez sass explicitement :**

```bash
npm install sass
npm run build:server
```

---

## ✅ Commandes Complètes (Copy-Paste)

```bash
# Tout en une fois sur le serveur
cd /home/fggxbsyg/public_html/new && \
git pull origin main && \
rm -rf node_modules .output .nuxt && \
npm install --omit=dev && \
npm install sass && \
npm run build:server
```

---

## 🆘 Si ça ne marche toujours pas

### Option Alternative : Build en Local

```bash
# Sur votre Mac
npm install
npm run build

# Transférer SEULEMENT .output
rsync -avz .output/ fggxbsyg@serveur:/home/fggxbsyg/public_html/new/.output/

# Sur le serveur
npm start
```

---

## 📝 Vérifications

```bash
# Vérifier que sass est installé (pas sass-embedded)
npm list | grep sass

# Devrait afficher:
# ├── sass@1.83.0

# Vérifier le build
ls -la .output/

# Lancer le serveur
npm start
```

---

## 🎉 Une fois le build réussi

```bash
# Démarrer avec PM2 (recommandé)
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

# OU démarrer en mode simple
npm start
```

---

## 📚 Documentation Complète

- **Guide complet :** [DEPLOIEMENT-COMPLET.md](./DEPLOIEMENT-COMPLET.md)
- **Fix Sharp :** [FIX-SHARP-ERROR.md](./FIX-SHARP-ERROR.md)
- **Setup PlanetHoster :** [SETUP-PLANETHOSTER.md](./SETUP-PLANETHOSTER.md)

---

## 🔑 Points Clés

1. **`sass` fonctionne sur Linux** (pas `sass-embedded`)
2. **`sharp` est optionnel** (seulement pour conversion d'images)
3. **Build en local puis transférer** est toujours une option
4. **`npm run build:server`** = build sans preprocessing

---

**Dernière mise à jour :** 5 janvier 2026 - 19h15
