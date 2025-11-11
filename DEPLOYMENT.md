# Logic Design Solutions - Configuration de Déploiement

## Structure du Projet

Ce projet utilise **Nuxt 4** pour la partie application web moderne.

```
/
├── nuxt-app/          # Application Nuxt principale (à déployer)
│   ├── app/           # Code source Vue/Nuxt
│   ├── public/        # Assets statiques
│   ├── package.json
│   └── nuxt.config.ts
├── assets/            # Assets HTML statiques (ancienne version)
├── *.html             # Pages HTML statiques (ancienne version)
└── netlify.toml       # Configuration de déploiement
```

## Déploiement

### Netlify

Le fichier `netlify.toml` à la racine configure Netlify pour travailler directement
depuis le sous-dossier `nuxt-app` :
- **Base directory** : `nuxt-app` (Netlify exécute `npm install` et les commandes dans ce dossier)
- **Commande de build** : `npm run build`
- **Répertoire publié** : `.output/public`
- **Version de Node** : `20.19.0` (compatible avec Nuxt 4.2+)

Pensez à mettre à jour la variable d’environnement `NODE_VERSION` dans l’interface Netlify
si nécessaire, puis relancez un déploiement avec le cache nettoyé si vous aviez déjà
fait une tentative avec Node 18.

### Variables d'Environnement

Définissez ces variables dans Netlify :
- `NODE_VERSION`: `18`
- `NPM_FLAGS`: `--legacy-peer-deps`

## Développement Local

```bash
cd nuxt-app
npm install
npm run dev
```

Le serveur de développement démarre sur `http://localhost:3000`

## Build de Production

```bash
cd nuxt-app
npm run build
npm run preview
```

## Notes Importantes

- Les carousels (Owl Carousel & Swiper) sont auto-initialisés via des plugins
- Les assets statiques sont dans `nuxt-app/public/assets/`
- Le routage est géré automatiquement par Nuxt
