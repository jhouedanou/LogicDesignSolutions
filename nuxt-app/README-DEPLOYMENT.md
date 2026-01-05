# 🚀 Guide de Déploiement - Logic Design Solutions

## ⚡ TL;DR - Solution recommandée

**Utilisez le déploiement avec Passenger (Phusion)** (voir [DEPLOY-PHUSION-PASSENGER.md](DEPLOY-PHUSION-PASSENGER.md))

```bash
# 1. Builder
npm run build

# 2. Transférer sur PlanetHoster (FTP) :
#    - .output/
#    - package.json

# 3. Créer .htaccess avec la config Passenger

# 4. Redémarrer : touch tmp/restart.txt

# 5. C'est tout !
```

---

## 📚 Guides disponibles

### ✅ [DEPLOY-PHUSION-PASSENGER.md](DEPLOY-PHUSION-PASSENGER.md) - **RECOMMANDÉ**

**Déploiement avec Passenger (Phusion) sur PlanetHoster**

- ✅ **Le plus simple** : Juste un fichier .htaccess
- ✅ **Natif PlanetHoster** : Passenger est déjà installé
- ✅ **Mise à jour auto** : Le contenu WordPress se met à jour automatiquement (max 5 min)
- ✅ **Redémarrage facile** : `touch tmp/restart.txt`
- ⚙️ **Prérequis** : Hébergement PlanetHoster (World Lite ou supérieur)

### ℹ️ [DEPLOY-SIMPLE.md](DEPLOY-SIMPLE.md) - **Alternative avec PM2**

**Déploiement SSR avec PM2**

- ⚙️ Si vous préférez gérer manuellement avec PM2
- 📖 Plus de contrôle sur les processus

### ⚠️ [DEPLOY-STATIC-PLANETHOSTER.md](DEPLOY-STATIC-PLANETHOSTER.md) - **NON RECOMMANDÉ**

**Génération statique avec webhooks et rebuild automatique**

- ❌ **Trop complexe** pour votre cas d'usage
- ❌ **Over-engineering** : Webhooks + scripts bash + plugin WordPress custom
- ⚠️ **Problématique** : Doit pré-générer toutes les routes à chaque modification
- 🤔 **Quand l'utiliser ?** : Uniquement si vous ne pouvez vraiment pas utiliser Node.js

### ℹ️ [DEPLOY-PLANETHOSTER.md](DEPLOY-PLANETHOSTER.md) - **VERSION DÉTAILLÉE**

**Guide détaillé du déploiement SSR** (version longue de DEPLOY-SIMPLE.md)

- 📖 Plus de détails techniques
- 🔧 Options avancées (SSH, PM2 manuel)
- 🛠️ Dépannage approfondi

---

## 🎯 Pourquoi SSR plutôt que statique ?

Votre site a **deux types de pages** :

### 1. Pages statiques (peu de changements)
- `/` (accueil)
- `/about`
- `/services`
- `/contact`

→ Ces pages sont pré-rendues au build

### 2. Pages dynamiques (contenu WordPress)
- `/products/[slug]` ← Récupère les données du produit via API
- `/news/[slug]` ← Récupère les données de l'article via API
- `/products` ← Liste de tous les produits
- `/news` ← Liste de tous les articles

→ Ces pages se mettent à jour automatiquement grâce au cache SWR

**Avec la génération statique**, vous devriez :
1. ❌ Pré-générer TOUTES les routes au build
2. ❌ Rebuilder TOUT le site à chaque modification WordPress
3. ❌ Gérer des webhooks complexes
4. ❌ Maintenir des scripts de rebuild

**Avec SSR (solution recommandée)**, vous avez juste besoin de :
1. ✅ Builder une fois
2. ✅ Déployer
3. ✅ Les pages se mettent à jour automatiquement

---

## 🏗️ Architecture actuelle (SSR)

```
┌─────────────────────────────────────────┐
│  WordPress (api.logic-design-solutions.com)│
│  - Produits (Custom Post Type)          │
│  - Articles (Posts)                      │
│  - FAQ, Profiles, References             │
└─────────────────┬───────────────────────┘
                  │
                  │ REST API
                  │
                  ▼
┌─────────────────────────────────────────┐
│  Nuxt.js SSR (logic-design-solutions.com)│
│  - Node.js application                   │
│  - Cache SWR (5min pour products/news)   │
│  - Pages pré-rendues au build            │
│  - Routes dynamiques [slug]              │
└─────────────────┬───────────────────────┘
                  │
                  │ HTML + hydratation
                  │
                  ▼
           👥 Utilisateurs
```

### Comment ça fonctionne

1. **Premier chargement** : Nuxt rend la page côté serveur (SSR)
2. **Données WordPress** : Récupérées via l'API REST
3. **Cache** : Les données sont mises en cache (5 min pour products/news)
4. **Revalidation** : Le cache se rafraîchit automatiquement
5. **Hydratation** : Le JavaScript prend le relais côté client

**Résultat** : Site rapide + données fraîches + zéro maintenance

---

## 📦 Configuration actuelle

### Mode actif : **SSR** ✅

Voir [nuxt.config.ts](nuxt.config.ts:63-66) :
```typescript
nitro: {
  compressPublicAssets: true,
  // Pas de preset = SSR par défaut
}
```

---

## 🔄 Workflow de mise à jour

### Modification du contenu WordPress

```bash
# Vous modifiez un produit dans WordPress
# ↓
# RIEN À FAIRE !
# ↓
# Le site se met à jour automatiquement (max 5 minutes)
```

### Modification du code Nuxt

```bash
# 1. Modifier le code en local
npm run build

# 2. Transférer .output/ sur PlanetHoster (FTP/SSH)

# 3. Redémarrer l'application Node.js
pm2 restart logic-design-solutions
# OU via le panneau World
```

---

## 📊 Performance et cache

| Route | Type | Cache | Mise à jour |
|-------|------|-------|-------------|
| `/` | Statique | Build | Au redéploiement |
| `/about` | Statique | Build | Au redéploiement |
| `/services` | Statique | Build | Au redéploiement |
| `/contact` | Statique | Build | Au redéploiement |
| `/products` | Dynamique | 5 min | Automatique |
| `/products/[slug]` | Dynamique | 5 min | Automatique |
| `/news` | Dynamique | 5 min | Automatique |
| `/news/[slug]` | Dynamique | 5 min | Automatique |
| `/faq` | Dynamique | 1h | Automatique |
| `/profiles` | Dynamique | 1h | Automatique |
| `/references` | Dynamique | 1h | Automatique |

---

## 🔧 Commandes npm

```bash
# Développement local
npm run dev

# Build pour production
npm run build

# Démarrer le serveur SSR (après build, en local)
npm run start

# Démarrer avec PM2 (sur serveur)
pm2 start ecosystem.config.cjs
```

---

## 📁 Fichiers importants

| Fichier | Usage |
|---------|-------|
| `.htaccess.example` | **Template de configuration Passenger** |
| `GUIDE-RAPIDE-DEPLOIEMENT.md` | **Guide 5 minutes** - Le plus simple ! |
| `DEPLOY-PHUSION-PASSENGER.md` | Guide complet Passenger (recommandé) |
| `DEPLOY-SIMPLE.md` | Guide PM2 (alternative) |
| `DEPLOY-PLANETHOSTER.md` | Guide détaillé PM2 |
| `ecosystem.config.cjs` | Configuration PM2 (si vous utilisez PM2) |
| `DEPLOY-STATIC-PLANETHOSTER.md` | ⚠️ Guide statique (non recommandé) |
| `webhook-rebuild.sh` | ⚠️ Non nécessaire en SSR |
| `webhook-endpoint.php` | ⚠️ Non nécessaire en SSR |
| `wordpress-webhook-plugin.php` | ⚠️ Non nécessaire en SSR |

---

## ✅ Checklist de déploiement

- [ ] Node.js >= 20 installé localement
- [ ] PlanetHoster World Lite (ou supérieur) avec support Node.js
- [ ] WordPress configuré sur `api.logic-design-solutions.com`
- [ ] Build local réussi (`npm run build`)
- [ ] Fichiers transférés sur PlanetHoster (.output/, package.json, ecosystem.config.cjs)
- [ ] Application Node.js configurée dans le panneau World
- [ ] Variables d'environnement ajoutées (NODE_ENV, NITRO_PORT, NITRO_HOST)
- [ ] Application démarrée
- [ ] Site accessible sur `logic-design-solutions.com`
- [ ] Test d'une page produit dynamique
- [ ] Test d'un article de news dynamique

---

## 🐛 Dépannage

**Problèmes de déploiement ?**
- Voir [DEPLOY-SIMPLE.md](DEPLOY-SIMPLE.md) section "Dépannage"
- Vérifier les logs : `pm2 logs logic-design-solutions`

**Problèmes de performance ?**
- Vérifier le cache dans les composables (`useFetch` avec `getCachedData`)
- Ajuster les durées de cache si nécessaire

**Problèmes avec WordPress ?**
- Vérifier que l'API REST est accessible
- Tester manuellement : `curl https://api.logic-design-solutions.com/wp-json/wp/v2/product`

---

## 📊 Comparaison : SSR vs Statique

| Critère | SSR (Recommandé) | Statique + Webhook |
|---------|------------------|-------------------|
| **Configuration** | ✅ Simple | ❌ Complexe |
| **Maintenance** | ✅ Facile | ❌ Webhooks + scripts |
| **Mise à jour contenu** | ✅ Auto (5 min) | ⚠️ Rebuild (2-5 min) |
| **Pages dynamiques** | ✅ Native | ⚠️ Pré-génération |
| **Vitesse** | ⚡⚡ Rapide | ⚡⚡⚡ Ultra rapide |
| **SEO** | ⭐⭐⭐ Parfait | ⭐⭐⭐ Parfait |
| **Complexité** | ✅ Simple | ❌ Over-engineering |

---

## 🎯 Conclusion

Pour votre site avec des pages dynamiques `/products/[slug]` et `/news/[slug]`, **le SSR est la solution la plus simple et la plus efficace**.

L'approche "statique avec webhooks" était de l'over-engineering pour votre cas d'usage.

**Recommandation finale : Suivre [DEPLOY-SIMPLE.md](DEPLOY-SIMPLE.md)**
