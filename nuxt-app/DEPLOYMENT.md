# Guide de Déploiement Netlify

Ce guide vous explique comment déployer votre application Nuxt sur Netlify.

## 📋 Prérequis

- Un compte [Netlify](https://www.netlify.com/) (gratuit)
- Un dépôt Git (GitHub, GitLab, ou Bitbucket)
- Le code de votre projet poussé sur le dépôt

## 🚀 Méthode 1: Déploiement via l'interface Netlify (Recommandé)

### Étape 1: Préparer le dépôt Git

```bash
# Si ce n'est pas déjà fait, initialisez Git
git init
git add .
git commit -m "Initial commit - Ready for Netlify deployment"

# Créez un dépôt sur GitHub/GitLab et poussez le code
git remote add origin <votre-url-git>
git branch -M main
git push -u origin main
```

### Étape 2: Connecter à Netlify

1. Allez sur [https://app.netlify.com/](https://app.netlify.com/)
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Choisissez votre fournisseur Git (GitHub, GitLab, Bitbucket)
4. Autorisez Netlify à accéder à vos dépôts
5. Sélectionnez votre dépôt **nuxt-app**

### Étape 3: Configuration du build

Netlify détectera automatiquement les paramètres grâce au fichier `netlify.toml`, mais vérifiez:

```
Build command: npm run build
Publish directory: .output/public
```

### Étape 4: Variables d'environnement (Optionnel)

Si vous avez des variables d'environnement:

1. Allez dans **Site settings** → **Environment variables**
2. Ajoutez vos variables:
   - `NUXT_PUBLIC_API_BASE`
   - `NUXT_PUBLIC_SITE_URL`
   - etc.

### Étape 5: Déployer

1. Cliquez sur **"Deploy site"**
2. Attendez que le build se termine (2-5 minutes)
3. Votre site est en ligne! 🎉

## 🔧 Méthode 2: Déploiement via Netlify CLI

### Installation

```bash
npm install -g netlify-cli
```

### Connexion

```bash
netlify login
```

### Initialisation

```bash
netlify init
```

Suivez les instructions:
- Choisissez **"Create & configure a new site"**
- Sélectionnez votre équipe
- Choisissez un nom de site (ou laissez vide pour un nom automatique)

### Déploiement

```bash
# Build
npm run build

# Déploiement en production
netlify deploy --prod
```

## 📁 Structure de Déploiement

Après le build, Netlify utilisera:

```
.output/
├── public/           # ← Fichiers statiques (publié par Netlify)
└── server/           # ← Fonctions serverless (API routes)
```

## 🔄 Déploiement Continu

Une fois connecté à Git, Netlify déploie automatiquement:

- ✅ **Push sur main** → Déploiement en production
- ✅ **Pull Request** → Preview deployment
- ✅ **Rollback** possible depuis l'interface

## 🌐 Domaine Personnalisé

### Ajouter un domaine

1. Allez dans **Site settings** → **Domain management**
2. Cliquez sur **"Add custom domain"**
3. Entrez votre domaine (ex: `monsite.com`)
4. Suivez les instructions pour configurer le DNS

### Configuration DNS

Ajoutez ces enregistrements chez votre registrar:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: <votre-site>.netlify.app
```

## 🔒 HTTPS

Netlify active automatiquement HTTPS gratuit avec Let's Encrypt!

## ⚙️ Configuration Avancée

### Redirections

Le fichier `netlify.toml` contient déjà:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Headers de Sécurité

Déjà configurés dans `netlify.toml`:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Cache-Control pour les assets

### Fonctions Serverless

Les routes API Nuxt (`/api/*`) deviennent automatiquement des fonctions Netlify.

## 🐛 Dépannage

### Build échoue

```bash
# Localement, vérifiez que le build fonctionne
npm run build

# Si erreur, nettoyez et réinstallez
rm -rf node_modules .nuxt .output
npm install --legacy-peer-deps
npm run build
```

### Erreur 404 sur les routes

Vérifiez que le fichier `netlify.toml` est présent avec les redirections.

### Variables d'environnement ne fonctionnent pas

1. Vérifiez qu'elles sont définies dans Netlify UI
2. Elles doivent commencer par `NUXT_PUBLIC_` pour être accessibles côté client
3. Redéployez après avoir ajouté des variables

### Build trop long

Activez le cache dans **Site settings** → **Build & deploy** → **Build settings**:
```bash
Cache node_modules between builds
```

## 📊 Monitoring

### Analytics

Netlify Analytics (payant) ou intégrez:
- Google Analytics
- Plausible
- Umami

### Logs

Allez dans **Deploys** → Cliquez sur un déploiement → **Deploy log**

## 🔄 Rollback

1. Allez dans **Deploys**
2. Trouvez un déploiement précédent
3. Cliquez sur **"Publish deploy"**

## 💡 Bonnes Pratiques

### 1. Prévisualisations

Chaque PR crée un preview deployment unique:
```
https://preview-<pr-number>--<site>.netlify.app
```

### 2. Branch Deploys

Déployez automatiquement d'autres branches:
- **Site settings** → **Build & deploy** → **Branch deploys**

### 3. Build Hooks

Créez des webhooks pour déclencher des builds:
- **Site settings** → **Build & deploy** → **Build hooks**

### 4. Split Testing

Testez A/B avec Netlify Split Testing:
- **Site settings** → **Split Testing**

## 📈 Optimisation

### Cache

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Compression

Déjà activé avec `compressPublicAssets: true` dans `nuxt.config.ts`

### Prerendering

Les routes sont pré-rendues au build:
```typescript
prerender: {
  routes: ['/', '/about', '/services', '/contact']
}
```

## 🆘 Support

- [Documentation Netlify](https://docs.netlify.com/)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment#netlify)
- [Community Forum](https://answers.netlify.com/)

## 📝 Checklist de Déploiement

- [ ] Code poussé sur Git
- [ ] `netlify.toml` présent
- [ ] `nuxt.config.ts` avec `preset: 'netlify'`
- [ ] Variables d'environnement configurées
- [ ] Build local réussi
- [ ] Site connecté à Netlify
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] HTTPS activé
- [ ] Tests post-déploiement effectués

---

🎉 **Votre site est maintenant prêt pour Netlify!**

Pour déployer maintenant:
```bash
git add .
git commit -m "Configure for Netlify deployment"
git push
```

Puis suivez la **Méthode 1** ci-dessus pour connecter à Netlify.
