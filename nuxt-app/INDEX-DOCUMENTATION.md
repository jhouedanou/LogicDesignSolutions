# 📚 Index de la Documentation

## 🚀 DÉPLOIEMENT (Commencez ici !)

### 🎯 Pour déployer sur PlanetHoster

| Fichier | Description | Priorité |
|---------|-------------|----------|
| **[DEPLOIEMENT-PLANETHOSTER.txt](DEPLOIEMENT-PLANETHOSTER.txt)** | 📋 Résumé visuel en 5 étapes | ⭐⭐⭐ LISEZ-MOI EN PREMIER |
| **[GUIDE-RAPIDE-DEPLOIEMENT.md](GUIDE-RAPIDE-DEPLOIEMENT.md)** | 🚀 Guide 5 minutes chrono | ⭐⭐⭐ RECOMMANDÉ |
| **[SCHEMA-DEPLOIEMENT.md](SCHEMA-DEPLOIEMENT.md)** | 📊 Schéma : quoi transférer ? | ⭐⭐⭐ IMPORTANT |
| [DEPLOY-PHUSION-PASSENGER.md](DEPLOY-PHUSION-PASSENGER.md) | 📖 Guide complet Passenger | ⭐⭐ Si besoin de détails |
| [README-DEPLOYMENT.md](README-DEPLOYMENT.md) | 📚 Vue d'ensemble déploiement | ⭐ Référence |

### 🛠️ Fichiers utiles

| Fichier | Description |
|---------|-------------|
| [.htaccess.example](.htaccess.example) | Template de configuration Passenger |
| [ecosystem.config.cjs](ecosystem.config.cjs) | Config PM2 (si vous utilisez PM2) |

### 📖 Guides alternatifs (optionnels)

| Fichier | Description | Quand l'utiliser ? |
|---------|-------------|-------------------|
| [DEPLOY-SIMPLE.md](DEPLOY-SIMPLE.md) | Déploiement avec PM2 | Si vous préférez PM2 à Passenger |
| [DEPLOY-PLANETHOSTER.md](DEPLOY-PLANETHOSTER.md) | Guide détaillé PM2 | Version longue de DEPLOY-SIMPLE |
| [DEPLOY-STATIC-PLANETHOSTER.md](DEPLOY-STATIC-PLANETHOSTER.md) | ⚠️ Statique + Webhooks | ❌ NON RECOMMANDÉ (trop complexe) |

---

## 🏗️ DÉVELOPPEMENT

| Fichier | Description |
|---------|-------------|
| [README.md](README.md) | Introduction générale du projet |
| [GUIDE.md](GUIDE.md) | Guide de développement |

---

## ⚡ OPTIMISATIONS & PERFORMANCE

| Fichier | Description |
|---------|-------------|
| [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) | Résumé des optimisations |
| [LCP_FCP_OPTIMIZATION.md](LCP_FCP_OPTIMIZATION.md) | Optimisation LCP/FCP |
| [HYDRATION_FIX_SUMMARY.md](HYDRATION_FIX_SUMMARY.md) | Corrections d'hydratation |

---

## 🔧 ANALYSES TECHNIQUES

| Fichier | Description |
|---------|-------------|
| [PINIA_ANALYSIS.md](PINIA_ANALYSIS.md) | Analyse de l'utilisation de Pinia |

---

## 📦 DÉPLOIEMENTS SPÉCIALISÉS

| Fichier | Description |
|---------|-------------|
| [NETLIFY_READY.md](NETLIFY_READY.md) | Déploiement sur Netlify |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Guide de déploiement général |

---

## 🎯 Par cas d'usage

### "Je veux déployer sur PlanetHoster MAINTENANT"
1. 👉 Lisez [DEPLOIEMENT-PLANETHOSTER.txt](DEPLOIEMENT-PLANETHOSTER.txt)
2. 👉 Suivez [GUIDE-RAPIDE-DEPLOIEMENT.md](GUIDE-RAPIDE-DEPLOIEMENT.md)
3. ✅ C'est tout !

### "Je veux comprendre l'architecture avant de déployer"
1. Lisez [README-DEPLOYMENT.md](README-DEPLOYMENT.md)
2. Puis [DEPLOY-PHUSION-PASSENGER.md](DEPLOY-PHUSION-PASSENGER.md)

### "Je veux développer localement"
1. Lisez [README.md](README.md)
2. Puis [GUIDE.md](GUIDE.md)

### "J'ai des problèmes de performance"
1. Consultez [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)
2. Pour LCP/FCP : [LCP_FCP_OPTIMIZATION.md](LCP_FCP_OPTIMIZATION.md)

### "J'ai des erreurs d'hydratation"
1. Consultez [HYDRATION_FIX_SUMMARY.md](HYDRATION_FIX_SUMMARY.md)

---

## 📋 Structure recommandée de lecture

```
DÉMARRAGE RAPIDE
├── DEPLOIEMENT-PLANETHOSTER.txt       (2 min)
├── GUIDE-RAPIDE-DEPLOIEMENT.md        (5 min)
└── [Déployez votre site !]

SI BESOIN DE PLUS DE DÉTAILS
├── README-DEPLOYMENT.md               (10 min)
└── DEPLOY-PHUSION-PASSENGER.md        (15 min)

DÉVELOPPEMENT
├── README.md
└── GUIDE.md

OPTIMISATIONS
├── OPTIMIZATION_SUMMARY.md
├── LCP_FCP_OPTIMIZATION.md
└── HYDRATION_FIX_SUMMARY.md
```

---

## 🔑 Fichiers de configuration importants

| Fichier | Description |
|---------|-------------|
| `nuxt.config.ts` | Configuration Nuxt (SSR activé) |
| `.htaccess.example` | Template Passenger |
| `ecosystem.config.cjs` | Configuration PM2 (optionnel) |
| `package.json` | Dépendances du projet |

---

## ✅ Checklist avant déploiement

- [ ] J'ai lu [DEPLOIEMENT-PLANETHOSTER.txt](DEPLOIEMENT-PLANETHOSTER.txt)
- [ ] J'ai fait `npm run build` localement
- [ ] J'ai transféré `.output/` sur le serveur
- [ ] J'ai transféré `package.json` sur le serveur
- [ ] J'ai créé `.htaccess` avec la bonne config
- [ ] J'ai redémarré avec `touch tmp/restart.txt`
- [ ] Mon site est accessible

---

## 🆘 Aide & Support

**En cas de problème :**
1. Consultez la section "Dépannage" dans [DEPLOY-PHUSION-PASSENGER.md](DEPLOY-PHUSION-PASSENGER.md)
2. Vérifiez les logs : `tail -f ~/public_html/log/passenger.log`
3. Relisez [DEPLOIEMENT-PLANETHOSTER.txt](DEPLOIEMENT-PLANETHOSTER.txt)

---

## 🎉 Déploiement réussi ?

Une fois votre site en ligne :
- Les modifications WordPress se mettent à jour automatiquement (max 5 min)
- Pour mettre à jour le code : rebuild → transfert → `touch tmp/restart.txt`
- C'est tout ! Pas de webhooks, pas de complexité !
