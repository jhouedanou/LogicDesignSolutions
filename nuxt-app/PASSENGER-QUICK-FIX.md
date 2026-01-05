# ⚡ QUICK FIX - Erreur Passenger

## 🔴 Erreur

```
Web application could not be started by Phusion Passenger
Error ID: 3ddd23e9
```

---

## ✅ Solution en 3 Commandes

### Sur le serveur (SSH)

```bash
# 1. Aller dans le dossier
cd /home/fggxbsyg/public_html/new

# 2. Vérifier le build
ls -la .output/server/index.mjs

# Si le fichier n'existe pas, builder:
npm run build:server

# 3. Configurer Passenger et redémarrer
mkdir -p tmp log && touch tmp/restart.txt && chmod 755 tmp log
```

---

## 📋 Vérifier la Configuration

### 1. Le fichier `.htaccess` doit exister

Créer `/home/fggxbsyg/public_html/new/.htaccess` :

```apache
PassengerEnabled on
PassengerAppRoot /home/fggxbsyg/public_html/new
PassengerAppType node
PassengerStartupFile app.js
PassengerNodejs /home/fggxbsyg/nodevenv/public_html/new/22/bin/node
SetEnv NODE_ENV production
PassengerFriendlyErrorPages on
```

### 2. Le fichier `app.js` doit exister

Créer `/home/fggxbsyg/public_html/new/app.js` :

```javascript
import('./.output/server/index.mjs');
```

### 3. Redémarrer Passenger

```bash
touch tmp/restart.txt
```

---

## 🚀 Script Automatique

**Copier-coller cette commande complète :**

```bash
cd /home/fggxbsyg/public_html/new && \
mkdir -p tmp log && \
echo "import('./.output/server/index.mjs');" > app.js && \
cat > .htaccess << 'EOF'
PassengerEnabled on
PassengerAppRoot /home/fggxbsyg/public_html/new
PassengerAppType node
PassengerStartupFile app.js
PassengerNodejs /home/fggxbsyg/nodevenv/public_html/new/22/bin/node
SetEnv NODE_ENV production
PassengerFriendlyErrorPages on
PassengerMinInstances 1
PassengerMaxPoolSize 2
EOF
chmod 644 .htaccess app.js && \
chmod 755 tmp log && \
touch tmp/restart.txt && \
echo "✅ Configuration terminée, rechargez votre site"
```

---

## 🔍 Si ça ne marche toujours pas

### Activer les messages d'erreur détaillés

Éditer `.htaccess`, changer :

```apache
PassengerFriendlyErrorPages on
```

Puis recharger la page pour voir l'erreur complète.

### Vérifier les logs

```bash
# Logs de l'application
tail -f /home/fggxbsyg/public_html/new/log/production.log

# Logs système (si accessible)
tail -f /var/log/httpd/error_log
```

### Test manuel

```bash
cd /home/fggxbsyg/public_html/new
node .output/server/index.mjs
```

Si ça démarre, le problème est dans la config Passenger.
Si ça ne démarre pas, il y a un problème avec le build.

---

## 🆘 Solution Alternative : PM2

Si Passenger ne fonctionne pas, utilisez PM2 :

```bash
# Installer PM2
npm install -g pm2

# Démarrer l'app
cd /home/fggxbsyg/public_html/new
pm2 start .output/server/index.mjs --name nuxt-app
pm2 save
pm2 startup

# Puis dans .htaccess, faire un proxy:
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## 📞 Support

Si rien ne fonctionne :
1. Notez l'Error ID : `3ddd23e9`
2. Contactez le support PlanetHoster
3. Donnez-leur :
   - Chemin : `/home/fggxbsyg/public_html/new`
   - Type : Application Nuxt.js SSR
   - Node : v22.13.1

---

## ✅ Checklist Finale

- [ ] `.output/server/index.mjs` existe
- [ ] `app.js` créé
- [ ] `.htaccess` configuré
- [ ] `tmp/` et `log/` créés
- [ ] `tmp/restart.txt` touché
- [ ] Permissions correctes (755/644)
- [ ] Site rechargé dans le navigateur

---

**Dernière mise à jour :** 5 janvier 2026
