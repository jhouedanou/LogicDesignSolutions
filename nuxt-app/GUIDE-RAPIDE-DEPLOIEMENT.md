# 🚀 Guide Rapide de Déploiement

## Étape par étape - 5 minutes chrono ⏱️

---

## 📍 Étape 1 : Builder sur votre machine

Ouvrez un terminal et exécutez :

```bash
cd /Users/houedanou/Documents/GitHub/LogicDesignSolutions/nuxt-app
npm run build
```

✅ Attendez que le build se termine (1-2 minutes)

---

## 📤 Étape 2 : Transférer sur PlanetHoster

### Via FileZilla (ou autre client FTP)

1. **Connectez-vous à votre serveur PlanetHoster**
   - Hôte : `ftp.votreserveur.planethoster.net`
   - Utilisateur : Votre nom d'utilisateur
   - Mot de passe : Votre mot de passe

2. **Naviguez vers** : `/public_html/`

3. **Sur votre machine, dans FileZilla, naviguez vers** :
   ```
   /Users/houedanou/Documents/GitHub/LogicDesignSolutions/nuxt-app/
   ```

4. **Transférez UNIQUEMENT ces 2 éléments** :
   - 📁 Le dossier `.output/` (glissez tout le dossier)
   - 📄 Le fichier `package.json` (glissez le fichier)

⚠️ **NE TRANSFÉREZ PAS** :
- ❌ Le dossier `node_modules/`
- ❌ Le dossier `app/`
- ❌ Tout autre fichier

**Juste .output/ et package.json, c'est tout !**

✅ Attendez que le transfert soit terminé

---

## ⚙️ Étape 3 : Créer le fichier .htaccess

### Via SSH

1. **Connectez-vous au serveur** :
   ```bash
   ssh votre-compte@votre-serveur.planethoster.net
   ```

2. **Allez dans public_html** :
   ```bash
   cd ~/public_html
   ```

3. **Créez le fichier .htaccess** :
   ```bash
   nano .htaccess
   ```

4. **Collez ce contenu** :
   ```apache
   # Enable Passenger
   PassengerEnabled on
   PassengerAppRoot /home/VOTRE-COMPTE/public_html
   PassengerAppType node
   PassengerStartupFile .output/server/index.mjs

   # Variables d'environnement
   SetEnv NODE_ENV production
   SetEnv NITRO_HOST 0.0.0.0
   SetEnv NITRO_PORT 3000
   ```

   ⚠️ **IMPORTANT** : Remplacez `VOTRE-COMPTE` par votre vrai nom d'utilisateur

   Pour le trouver, tapez `pwd` dans le terminal SSH

5. **Sauvegardez** :
   - `Ctrl + O` puis `Entrée`
   - `Ctrl + X`

---

## 🚀 Étape 4 : Démarrer l'application

Toujours en SSH :

```bash
mkdir -p tmp
touch tmp/restart.txt
```

✅ Votre application démarre !

---

## 🎉 Étape 5 : Vérifier

Ouvrez votre navigateur et visitez :
```
https://logic-design-solutions.com
```

Si vous voyez votre site → **C'est bon ! 🎉**

Si erreur 503 → Attendez 30 secondes et rechargez (l'app démarre)

---

## 🔄 Pour mettre à jour plus tard

Quand vous modifiez le code Nuxt :

```bash
# 1. Sur votre machine
cd nuxt-app
npm run build

# 2. Transférez .output/ via FTP (écrasez l'ancien)

# 3. En SSH sur le serveur
touch ~/public_html/tmp/restart.txt
```

---

## 📞 Aide rapide

### Voir les logs en cas d'erreur

```bash
ssh votre-compte@serveur.planethoster.net
tail -50 ~/public_html/log/passenger.log
```

### Forcer le redémarrage

```bash
touch ~/public_html/tmp/restart.txt
```

---

## ✅ Checklist

- [ ] Build local terminé (`npm run build`)
- [ ] Dossier `.output/` transféré sur le serveur
- [ ] Fichier `package.json` transféré sur le serveur
- [ ] Fichier `.htaccess` créé avec le bon chemin
- [ ] Application redémarrée (`touch tmp/restart.txt`)
- [ ] Site accessible sur `logic-design-solutions.com`

---

## 🎯 C'est tout !

Votre site Nuxt SSR est déployé avec Passenger sur PlanetHoster.

**Aucun webhook, aucun script complexe, juste 5 étapes simples !**
