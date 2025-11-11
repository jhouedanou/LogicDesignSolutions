# Déploiement sur Vercel

Ce projet est configuré pour être déployé sur Vercel depuis le dossier `nuxt-app`.

## Configuration requise

- Node.js >= 20.19.0
- npm ou yarn

## Déploiement automatique via GitHub

1. Connectez-vous sur [Vercel](https://vercel.com)
2. Cliquez sur "Import Project"
3. Importez ce dépôt GitHub
4. Configurez les paramètres suivants :

### Paramètres de build

- **Framework Preset**: Other
- **Root Directory**: `nuxt-app`
- **Build Command**: `npm run build`
- **Output Directory**: `.output/public`
- **Install Command**: `npm install`

### Variables d'environnement

Aucune variable d'environnement nécessaire pour le moment.

### Paramètres Node.js

Vercel utilisera automatiquement Node 20.19.0 grâce à :
- Le fichier `.nvmrc` dans `nuxt-app/`
- Le champ `engines` dans `package.json`

## Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd nuxt-app
vercel

# Pour la production
vercel --prod
```

## Fichiers de configuration

- `nuxt-app/vercel.json` - Configuration Vercel
- `nuxt-app/.nvmrc` - Version Node.js
- `nuxt-app/package.json` - Dépendances et scripts
- `.vercelignore` - Fichiers à ignorer

## URLs après déploiement

- Production: `https://votre-projet.vercel.app`
- Preview: `https://votre-projet-git-branch.vercel.app`

## Cache et optimisations

Les fichiers statiques sont mis en cache avec les en-têtes suivants :
- `/assets/*` - 1 an
- `/_nuxt/*` - 1 an (build immutable)

## Support

Pour toute question, consultez la [documentation Vercel](https://vercel.com/docs).
