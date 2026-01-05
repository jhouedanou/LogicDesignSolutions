# Déploiement Nuxt avec Passenger (Phusion) sur PlanetHoster

## 🎯 Vue d'ensemble

PlanetHoster utilise **Passenger (Phusion)** pour exécuter les applications Node.js.
C'est beaucoup plus simple que PM2 !

---

## 📦 Étape 1 : Build local

```bash
cd nuxt-app
npm install
npm run build
```

Cela génère le dossier `.output/`

---

## 📤 Étape 2 : Transférer les fichiers sur le serveur

### Via FTP (FileZilla, Cyberduck, etc.)

**IMPORTANT** : Vous transférez SEULEMENT ces 2 choses (pas tout le dossier nuxt-app) :

```
📁 .output/              # ← TOUT le dossier .output
📄 package.json          # ← Le fichier package.json
```

**Depuis :** `/Users/houedanou/Documents/GitHub/LogicDesignSolutions/nuxt-app/`
**Vers :** `/home/votre-compte/public_html/`

⚠️ **NE PAS transférer :**
- ❌ Le dossier `node_modules/`
- ❌ Le dossier `app/`
- ❌ Le dossier `.nuxt/`
- ❌ Tous les autres fichiers du dossier nuxt-app

**Transférez UNIQUEMENT .output/ et package.json**

### Via SSH (si vous préférez)

```bash
# Sur votre machine locale
cd /Users/houedanou/Documents/GitHub/LogicDesignSolutions/nuxt-app

# Transférer via rsync
rsync -avz --progress .output/ votre-compte@votre-serveur.planethoster.net:~/public_html/.output/
rsync -avz package.json votre-compte@votre-serveur.planethoster.net:~/public_html/
```

### Structure finale sur le serveur

```
/home/votre-compte/public_html/
├── .output/
│   ├── server/
│   │   └── index.mjs       # ← Point d'entrée de votre app
│   └── public/             # ← Assets statiques
├── package.json
└── .htaccess               # ← On va le créer à l'étape suivante
```

---

## ⚙️ Étape 3 : Créer le fichier de configuration Passenger

Connectez-vous en SSH au serveur :

```bash
ssh votre-compte@votre-serveur.planethoster.net
```

Puis créez le fichier `.htaccess` :

```bash
cd ~/public_html
nano .htaccess
```

Collez ce contenu :

```apache
# Enable Passenger
PassengerEnabled on
PassengerAppRoot /home/votre-compte/public_html
PassengerAppType node
PassengerStartupFile .output/server/index.mjs

# Variables d'environnement
SetEnv NODE_ENV production
SetEnv NITRO_HOST 0.0.0.0
SetEnv NITRO_PORT 3000

# Redirection vers l'app Node.js
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

**IMPORTANT** : Remplacez `/home/votre-compte/public_html` par votre vrai chemin.

Pour trouver votre chemin exact :
```bash
pwd
# Affichera quelque chose comme : /home/username123/public_html
```

Sauvegardez :
- Appuyez sur `Ctrl + O` (sauvegarder)
- Appuyez sur `Entrée`
- Appuyez sur `Ctrl + X` (quitter)

---

## 🚀 Étape 4 : Démarrer l'application

### Option A : Redémarrage via fichier restart.txt

Passenger redémarre automatiquement l'app si vous créez/modifiez ce fichier :

```bash
cd ~/public_html
mkdir -p tmp
touch tmp/restart.txt
```

### Option B : Via le panneau PlanetHoster

1. Connectez-vous au **panneau World**
2. Allez dans **Sites Web** → **Applications Node.js**
3. Cliquez sur **Redémarrer**

---

## ✅ Étape 5 : Vérifier que ça fonctionne

Visitez votre site : `https://logic-design-solutions.com`

Si tout est correct, vous devriez voir votre site Nuxt !

---

## 🔄 Mise à jour du site

### Quand vous modifiez le contenu WordPress

**Rien à faire !** Les changements apparaissent automatiquement (max 5 minutes).

### Quand vous modifiez le code Nuxt

```bash
# 1. Sur votre machine locale
cd nuxt-app
npm run build

# 2. Transférer .output/ sur le serveur (FTP ou rsync)

# 3. Redémarrer l'app
ssh votre-compte@serveur.planethoster.net
touch ~/public_html/tmp/restart.txt
```

---

## 🛠️ Commandes utiles

### Redémarrer l'application
```bash
touch ~/public_html/tmp/restart.txt
```

### Voir les logs Passenger
```bash
tail -f ~/public_html/log/passenger.log
```

### Voir les logs de l'application
```bash
tail -f ~/public_html/log/production.log
```

### Vérifier que l'app tourne
```bash
passenger-status
```

---

## 🚨 Dépannage

### L'application ne démarre pas

**1. Vérifier les logs :**
```bash
tail -100 ~/public_html/log/passenger.log
```

**2. Vérifier le chemin dans .htaccess :**
```bash
cd ~/public_html
cat .htaccess
# Vérifiez que PassengerAppRoot pointe vers le bon dossier
```

**3. Vérifier que le fichier index.mjs existe :**
```bash
ls -la ~/public_html/.output/server/index.mjs
```

Si le fichier n'existe pas, refaites le build local et retransférez.

### Erreur "Cannot find module"

Il manque des dépendances Node.js. Installez-les sur le serveur :

```bash
cd ~/public_html
npm install --production
touch tmp/restart.txt
```

### Erreur 503 Service Unavailable

L'app met du temps à démarrer. Attendez 30-60 secondes et réessayez.

Si ça persiste :
```bash
# Vérifier la mémoire disponible
free -m

# Redémarrer Passenger
passenger-config restart-app ~/public_html
```

### Les images ou CSS ne s'affichent pas

Vérifiez que le dossier `.output/public/` a été transféré :
```bash
ls -la ~/public_html/.output/public/
```

---

## 📊 Configuration avancée

### Augmenter la mémoire allouée

Éditez `.htaccess` et ajoutez :
```apache
PassengerNodeOptions "--max-old-space-size=512"
```

### Désactiver le mode développement

Assurez-vous que `NODE_ENV=production` est bien défini dans `.htaccess`.

### Configurer plusieurs instances

```apache
PassengerMinInstances 2
PassengerMaxPoolSize 4
```

---

## 🎯 Avantages de Passenger

| Critère | Passenger | PM2 |
|---------|-----------|-----|
| **Configuration** | ✅ Fichier .htaccess | ⚠️ Ligne de commande |
| **Redémarrage** | ✅ `touch restart.txt` | ⚠️ `pm2 restart` |
| **Logs** | ✅ Automatiques | ⚠️ Configuration manuelle |
| **Intégration PlanetHoster** | ✅ Native | ⚠️ Manuelle |
| **Mises à jour** | ✅ Simples | ⚠️ Plus complexes |

---

## 📝 Résumé complet

```bash
# === SUR VOTRE MACHINE LOCALE ===
cd nuxt-app
npm run build

# === TRANSFÉRER SUR LE SERVEUR (FTP) ===
# Transférez .output/ et package.json vers ~/public_html/

# === SUR LE SERVEUR (SSH) ===
ssh votre-compte@serveur.planethoster.net
cd ~/public_html

# Créer .htaccess (voir contenu ci-dessus)
nano .htaccess

# Installer les dépendances (si nécessaire)
npm install --production

# Redémarrer l'app
mkdir -p tmp
touch tmp/restart.txt

# Vérifier les logs
tail -f log/passenger.log
```

---

## ✨ C'est tout !

Votre site Nuxt est maintenant déployé avec Passenger sur PlanetHoster.

**Pas besoin de PM2, pas de scripts complexes, juste un fichier .htaccess !**
