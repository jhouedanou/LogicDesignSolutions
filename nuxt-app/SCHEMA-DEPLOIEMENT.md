# 📊 Schéma de Déploiement - Ce qu'il faut transférer

## 🖥️ Sur votre machine (Mac)

```
/Users/houedanou/Documents/GitHub/LogicDesignSolutions/
└── nuxt-app/
    ├── .output/                    ← ✅ À TRANSFÉRER
    │   ├── server/
    │   │   └── index.mjs          (point d'entrée de l'app)
    │   └── public/                 (fichiers statiques)
    │       ├── _nuxt/
    │       ├── assets/
    │       └── index.html
    │
    ├── package.json                ← ✅ À TRANSFÉRER
    │
    ├── node_modules/               ← ❌ NE PAS TRANSFÉRER
    ├── app/                        ← ❌ NE PAS TRANSFÉRER
    ├── .nuxt/                      ← ❌ NE PAS TRANSFÉRER
    ├── nuxt.config.ts              ← ❌ NE PAS TRANSFÉRER
    ├── package-lock.json           ← ❌ NE PAS TRANSFÉRER
    └── [autres fichiers]           ← ❌ NE PAS TRANSFÉRER
```

---

## 🌐 Sur le serveur PlanetHoster

```
/home/votre-compte/
└── public_html/
    ├── .output/                    ← Copié depuis votre Mac
    │   ├── server/
    │   │   └── index.mjs
    │   └── public/
    │
    ├── package.json                ← Copié depuis votre Mac
    │
    ├── .htaccess                   ← ✨ À CRÉER sur le serveur
    │
    └── tmp/
        └── restart.txt             ← ✨ À CRÉER pour redémarrer
```

---

## 🔄 Processus de transfert

### 1️⃣ Build local
```bash
cd /Users/houedanou/Documents/GitHub/LogicDesignSolutions/nuxt-app
npm run build
```

**Résultat :** Crée le dossier `.output/`

---

### 2️⃣ Transfert FTP

#### Dans FileZilla (panneau de gauche = votre Mac)
```
Naviguez vers :
/Users/houedanou/Documents/GitHub/LogicDesignSolutions/nuxt-app/

Vous voyez :
├── .output/           ← Sélectionnez ce dossier
├── package.json       ← Sélectionnez ce fichier
├── node_modules/      ← NE PAS sélectionner
├── app/               ← NE PAS sélectionner
└── ...
```

#### Dans FileZilla (panneau de droite = serveur)
```
Naviguez vers :
/public_html/

Glissez-déposez depuis le panneau de gauche :
✅ .output/
✅ package.json
```

---

### 3️⃣ Fichiers créés sur le serveur (via SSH)

```bash
# Connectez-vous en SSH
ssh votre-compte@serveur.planethoster.net
cd ~/public_html

# Créez .htaccess
nano .htaccess
# [Collez le contenu depuis .htaccess.example]

# Créez le dossier tmp et restart.txt
mkdir -p tmp
touch tmp/restart.txt
```

---

## 📦 Taille des fichiers

| Fichier/Dossier | Taille approximative | Temps de transfert (estimation) |
|-----------------|---------------------|--------------------------------|
| `.output/` | ~50-100 MB | 1-5 minutes |
| `package.json` | ~2 KB | < 1 seconde |
| **Total** | **~50-100 MB** | **1-5 minutes** |

Si vous transfériez tout `nuxt-app/` par erreur :
- `node_modules/` : ~300-500 MB supplémentaires ❌
- Temps de transfert : 10-30 minutes ❌
- **Totalement inutile !**

---

## ✅ Checklist de transfert

### Avant le transfert
- [ ] J'ai fait `npm run build` localement
- [ ] Le dossier `.output/` existe dans `nuxt-app/`
- [ ] Le fichier `package.json` existe dans `nuxt-app/`

### Pendant le transfert (FTP)
- [ ] Je suis connecté au serveur PlanetHoster
- [ ] Je suis dans `/public_html/` sur le serveur
- [ ] Je transfère `.output/` (tout le dossier)
- [ ] Je transfère `package.json`
- [ ] ❌ Je NE transfère PAS `node_modules/`
- [ ] ❌ Je NE transfère PAS `app/`

### Après le transfert (SSH)
- [ ] J'ai créé `.htaccess` avec la bonne config
- [ ] J'ai créé `tmp/restart.txt`
- [ ] Le site est accessible

---

## 🎯 Pourquoi seulement .output/ et package.json ?

### .output/
C'est le **build de production** généré par Nuxt.
Il contient :
- ✅ Le code serveur compilé (`.output/server/index.mjs`)
- ✅ Les fichiers statiques (`.output/public/`)
- ✅ Tout ce dont l'app a besoin pour tourner

### package.json
Nécessaire pour :
- ✅ Identifier les dépendances Node.js
- ✅ Permettre à Passenger de comprendre que c'est une app Node.js

### Pourquoi PAS le reste ?

| Fichier/Dossier | Pourquoi ne pas le transférer ? |
|-----------------|--------------------------------|
| `node_modules/` | Déjà inclus dans `.output/` (bundlé) |
| `app/` | Code source, déjà compilé dans `.output/` |
| `.nuxt/` | Cache de dev, inutile en production |
| `nuxt.config.ts` | Config de build, déjà appliquée dans `.output/` |
| Autres fichiers | Inutiles pour la production |

---

## 🔄 Mise à jour du site

Quand vous modifiez le code :

```bash
# 1. Sur votre Mac
cd nuxt-app
npm run build

# 2. Transférez SEULEMENT .output/ (écrasez l'ancien)
# Via FTP

# 3. Sur le serveur (SSH)
touch ~/public_html/tmp/restart.txt
```

⚠️ **Pas besoin de retransférer `package.json`** si vous n'avez pas changé les dépendances.

---

## 🎉 Résumé ultra-simple

```
VOTRE MAC                          SERVEUR PLANETHOSTER
━━━━━━━━━━━                         ━━━━━━━━━━━━━━━━━━━━

nuxt-app/
  ├── .output/      ──────────────>  public_html/.output/
  └── package.json  ──────────────>  public_html/package.json

                                      + public_html/.htaccess (créé en SSH)
                                      + public_html/tmp/restart.txt (créé en SSH)
```

**C'est tout !**
