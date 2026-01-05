# 🚂 Configuration Phusion Passenger pour Nuxt

## 🔴 Erreur Actuelle

```
Web application could not be started by the Phusion Passenger(R) application server.
Error ID: 3ddd23e9
```

**Cause :** Passenger ne sait pas comment démarrer votre application Nuxt.

---

## ✅ Solutions

### Solution 1 : Configuration avec .htaccess (RECOMMANDÉ)

**Étape 1 : Vérifier que le build est terminé**

```bash
ssh fggxbsyg@votre-serveur.com
cd /home/fggxbsyg/public_html/new

# Vérifier que .output existe
ls -la .output/server/index.mjs
```

**Étape 2 : Créer/Vérifier le fichier .htaccess**

Fichier : `/home/fggxbsyg/public_html/new/.htaccess`

```apache
PassengerEnabled on
PassengerAppRoot /home/fggxbsyg/public_html/new
PassengerAppType node
PassengerStartupFile app.js
PassengerNodejs /home/fggxbsyg/nodevenv/public_html/new/22/bin/node

SetEnv NODE_ENV production
SetEnv PORT 3000

PassengerFriendlyErrorPages on
```

**Étape 3 : Vérifier le fichier app.js**

Fichier : `/home/fggxbsyg/public_html/new/app.js`

```javascript
import('./.output/server/index.mjs');
```

**Étape 4 : Redémarrer Passenger**

```bash
# Créer/toucher un fichier pour redémarrer
touch /home/fggxbsyg/public_html/new/tmp/restart.txt

# Ou utiliser la commande passenger
passenger-config restart-app /home/fggxbsyg/public_html/new
```

---

### Solution 2 : Vérifier la Configuration PlanetHoster

**Via le panneau de contrôle PlanetHoster :**

1. Aller dans **Node.js Selector**
2. Sélectionner votre application
3. Configurer :
   - **Application Root :** `/home/fggxbsyg/public_html/new`
   - **Application Startup File :** `app.js`
   - **Node.js Version :** 22.x
4. Cliquer sur **Restart**

---

### Solution 3 : Vérifier les Logs Passenger

```bash
# Trouver le fichier de log
find /var/log -name "*passenger*" 2>/dev/null

# Ou chercher l'erreur spécifique
grep -r "3ddd23e9" /var/log/ 2>/dev/null

# Logs de l'application
tail -f /home/fggxbsyg/public_html/new/log/production.log
```

---

### Solution 4 : Mode Debug

**Activer les messages d'erreur détaillés :**

Modifier `.htaccess` :

```apache
PassengerFriendlyErrorPages on
PassengerAppEnv development
```

Puis redémarrer et recharger la page pour voir l'erreur détaillée.

**⚠️ Important :** Remettre en `production` après debug !

---

### Solution 5 : Structure des Dossiers

Vérifier la structure :

```bash
cd /home/fggxbsyg/public_html/new

# Structure attendue
.
├── .htaccess              ✓ Configuré pour Passenger
├── app.js                 ✓ Point d'entrée
├── package.json           ✓
├── .output/               ✓ Généré par npm run build
│   └── server/
│       └── index.mjs      ✓ Le serveur Nuxt
├── tmp/
│   └── restart.txt        ← Créer pour redémarrer
└── log/                   ← Logs de l'app
```

Créer les dossiers manquants :

```bash
mkdir -p tmp log
touch tmp/restart.txt
```

---

## 🔍 Checklist de Débogage

### 1. Vérifier que le build existe

```bash
cd /home/fggxbsyg/public_html/new
ls -la .output/server/index.mjs
```

Si le fichier n'existe pas :
```bash
npm run build:server
```

### 2. Vérifier les permissions

```bash
chmod 755 /home/fggxbsyg/public_html/new
chmod 644 /home/fggxbsyg/public_html/new/.htaccess
chmod 644 /home/fggxbsyg/public_html/new/app.js
chmod -R 755 /home/fggxbsyg/public_html/new/.output
```

### 3. Vérifier Node.js

```bash
# Quelle version de Node ?
node --version

# Le chemin vers Node utilisé par Passenger
which node

# Devrait être : /home/fggxbsyg/nodevenv/public_html/new/22/bin/node
```

### 4. Tester manuellement

```bash
cd /home/fggxbsyg/public_html/new
node .output/server/index.mjs
```

Si ça fonctionne, le problème est dans la config Passenger.

### 5. Redémarrer Passenger

```bash
# Méthode 1
touch tmp/restart.txt

# Méthode 2
mkdir -p tmp
touch tmp/restart.txt

# Méthode 3 (si disponible)
passenger-config restart-app /home/fggxbsyg/public_html/new
```

---

## 🎯 Configuration Complète Recommandée

### Fichier .htaccess

```apache
# Passenger Configuration
PassengerEnabled on
PassengerAppRoot /home/fggxbsyg/public_html/new
PassengerAppType node
PassengerStartupFile app.js

# Node.js Configuration
PassengerNodejs /home/fggxbsyg/nodevenv/public_html/new/22/bin/node

# Environment
SetEnv NODE_ENV production
SetEnv HOST 0.0.0.0
SetEnv PORT 3000

# Debug (désactiver en production)
# PassengerFriendlyErrorPages on
# PassengerAppEnv development

# Performance
PassengerMinInstances 1
PassengerMaxPoolSize 2
PassengerMaxRequests 1000
```

### Fichier app.js

```javascript
import('./.output/server/index.mjs');
```

### Structure tmp/

```bash
mkdir -p tmp log
chmod 755 tmp log
```

---

## 🆘 Si rien ne fonctionne

### Option A : Utiliser PM2 au lieu de Passenger

```bash
# Installer PM2
npm install -g pm2

# Démarrer l'application
cd /home/fggxbsyg/public_html/new
pm2 start .output/server/index.mjs --name nuxt-app

# Sauvegarder la config
pm2 save
pm2 startup
```

Ensuite, dans `.htaccess`, faire un reverse proxy vers PM2 :

```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

### Option B : Mode Statique (si vous n'avez pas besoin de SSR)

```bash
# Générer en mode statique
npm run generate

# Copier vers public_html
rsync -av .output/public/ /home/fggxbsyg/public_html/
```

Puis un `.htaccess` simple :

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

---

## 📞 Support PlanetHoster

Si le problème persiste, contactez le support avec :

1. L'Error ID : `3ddd23e9`
2. Le chemin de votre application : `/home/fggxbsyg/public_html/new`
3. La version de Node.js : `22.13.1`
4. Type d'application : `Nuxt.js SSR`

Ils pourront :
- Vérifier les logs Passenger complets
- Ajuster la configuration serveur
- Activer les modules nécessaires

---

## ✅ Commandes Rapides de Dépannage

```bash
# Tout en une fois
cd /home/fggxbsyg/public_html/new && \
mkdir -p tmp log && \
chmod 755 tmp log && \
touch tmp/restart.txt && \
ls -la .output/server/index.mjs && \
echo "✅ Configuration vérifiée, rechargez votre navigateur"
```

---

**Dernière mise à jour :** 5 janvier 2026
