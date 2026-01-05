# Déploiement Simple sur PlanetHoster avec Node.js

## 🎯 Architecture (SIMPLE)

```
WordPress API (api.logic-design-solutions.com)
           ↓
    Nuxt.js SSR avec Node.js (logic-design-solutions.com)
           ↓
    Utilisateurs
```

**Pas de webhooks, pas de rebuild, pas de complexité !**

---

## ✅ Pourquoi cette solution est meilleure

| Critère | SSR (Cette solution) | Statique avec Webhook |
|---------|---------------------|----------------------|
| **Configuration** | ✅ Très simple | ❌ Complexe (webhooks, scripts) |
| **Mise à jour contenu** | ✅ Automatique (max 5 min) | ⚠️ 2-5 min après rebuild |
| **Maintenance** | ✅ Facile | ❌ Plusieurs systèmes à gérer |
| **Prérequis PlanetHoster** | Node.js (inclus dans World Lite) | Node.js + webhooks + scripts |
| **Pages dynamiques** | ✅ Native | ⚠️ Doit tout pré-générer |

---

## 📦 Étapes de déploiement

### 1️⃣ Builder localement

```bash
cd nuxt-app
npm install
npm run build
```

Cela génère le dossier `.output/`

### 2️⃣ Transférer sur PlanetHoster

**Via FTP ou SSH, transférez ces fichiers :**

```
.output/                    # ← TOUT le dossier (obligatoire)
package.json               # ← Pour les dépendances
ecosystem.config.cjs       # ← Configuration PM2
```

**Structure finale sur le serveur :**
```
/home/votre-compte/public_html/
├── .output/
│   └── server/
│       └── index.mjs          # ← Point d'entrée de l'app
├── package.json
└── ecosystem.config.cjs
```

### 3️⃣ Configurer dans le panneau World

**Dans PlanetHoster → Applications Node.js :**

1. **Créer nouvelle application**
2. Remplir :
   - **Chemin** : `/home/votre-compte/public_html`
   - **Version Node.js** : 20.x ou +
   - **Point d'entrée** : `.output/server/index.mjs`
   - **Port** : 3000

3. **Variables d'environnement** :
   ```
   NODE_ENV=production
   NITRO_HOST=0.0.0.0
   NITRO_PORT=3000
   ```

4. **Démarrer** l'application

### 4️⃣ C'est tout ! 🎉

Votre site est maintenant en ligne sur `logic-design-solutions.com`

---

## 🔄 Comment les mises à jour fonctionnent

### Mise à jour du contenu WordPress

Quand vous modifiez un produit ou article dans WordPress :
- **Délai** : Maximum 5 minutes pour voir les changements
- **Action requise** : Aucune ! C'est automatique grâce au cache SWR

### Mise à jour du code Nuxt

Quand vous modifiez le code du site :

1. **Builder localement** :
   ```bash
   npm run build
   ```

2. **Transférer `.output/`** sur le serveur (FTP/SSH)

3. **Redémarrer l'app** :
   - Via le panneau World : Cliquez sur "Redémarrer"
   - Ou via SSH :
     ```bash
     pm2 restart logic-design-solutions
     ```

---

## 🛠️ Commandes utiles (via SSH)

### Se connecter au serveur
```bash
ssh votre-compte@votre-serveur.planethoster.net
```

### Voir les logs
```bash
cd ~/public_html
pm2 logs logic-design-solutions
```

### Redémarrer l'application
```bash
pm2 restart logic-design-solutions
```

### Voir le statut
```bash
pm2 status
```

---

## 🚨 Dépannage

### L'application ne démarre pas

**Vérifier les logs :**
```bash
pm2 logs logic-design-solutions --lines 100
```

**Causes courantes :**
- Fichier `.output/server/index.mjs` manquant → Refaire le build
- Port 3000 déjà utilisé → Changer le port dans l'ecosystem.config.cjs
- Pas assez de mémoire → Voir ci-dessous

### Erreur de mémoire

Éditer `ecosystem.config.cjs` :
```javascript
env: {
  NODE_ENV: 'production',
  NODE_OPTIONS: '--max-old-space-size=512'  // ← Ajoutez cette ligne
}
```

### Les images WordPress ne s'affichent pas

Vérifier que WordPress autorise les requêtes CORS depuis `logic-design-solutions.com`

**Dans WordPress, ajouter dans `.htaccess` ou dans un plugin :**
```php
header('Access-Control-Allow-Origin: https://logic-design-solutions.com');
```

---

## 📊 Performance et cache

Le site utilise le **cache SWR (Stale-While-Revalidate)** :

| Type de page | Durée du cache | Mise à jour |
|-------------|----------------|-------------|
| `/products`, `/products/[slug]` | 5 minutes | Automatique |
| `/news`, `/news/[slug]` | 5 minutes | Automatique |
| `/faq`, `/profiles`, `/references` | 1 heure | Automatique |
| `/`, `/about`, `/services`, `/contact` | Build | Au redéploiement |

**Avantage** : Site rapide + données fraîches sans webhook !

---

## 💰 Coûts PlanetHoster

**Plan minimum requis** : World Lite ou N0lit (support Node.js)
- Inclut Node.js
- Inclut PM2 pour gérer l'application
- Pas de coût supplémentaire

---

## 📝 Comparaison avec l'approche "Statique + Webhook"

| Vous AVIEZ besoin de : | Avec SSR (cette solution) |
|------------------------|--------------------------|
| ❌ Webhook PHP | ✅ Pas besoin |
| ❌ Script bash de rebuild | ✅ Pas besoin |
| ❌ Plugin WordPress custom | ✅ Pas besoin |
| ❌ GitHub Actions (optionnel) | ✅ Pas besoin |
| ❌ Pré-générer toutes les routes | ✅ Pas besoin |
| ✅ Node.js sur PlanetHoster | ✅ Toujours nécessaire |

**Résultat** : Configuration 10x plus simple !

---

## 🎯 Conclusion

Cette approche SSR est **parfaite pour votre cas** car :

✅ Vos pages `/products/[slug]` et `/news/[slug]` chargent des données dynamiques
✅ Pas besoin de régénérer tout le site à chaque modification WordPress
✅ Configuration ultra-simple : build → transfert → démarrage
✅ Maintenance minimale : pas de webhooks à gérer
✅ Performance excellente grâce au cache SWR

**La génération statique avec webhooks était de l'over-engineering pour votre besoin !**
