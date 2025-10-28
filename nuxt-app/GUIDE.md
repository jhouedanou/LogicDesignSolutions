# Guide de Démarrage Rapide

## 🚀 Démarrage

### Installation des dépendances
```bash
npm install --legacy-peer-deps
```

### Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 📝 Structure des Fichiers

### Composants (`components/`)
Les composants réutilisables de l'application.

- **layout/Header.vue** - En-tête avec navigation responsive
- **layout/Footer.vue** - Pied de page avec liens et infos
- **layout/Preloader.vue** - Animation de chargement

### Pages (`pages/`)
Chaque fichier devient automatiquement une route.

- **index.vue** → `/`
- **about.vue** → `/about`
- **services.vue** → `/services`
- **contact.vue** → `/contact`

### Layouts (`layouts/`)
Mise en page commune pour les pages.

- **default.vue** - Layout principal avec Header et Footer

### API Server (`server/api/`)
Endpoints API pour servir les données JSON.

- **menu.get.ts** → `/api/menu`
- **footer.get.ts** → `/api/footer`
- **site-config.get.ts** → `/api/site-config`

### Données (`public/data/`)
Fichiers JSON pour le contenu récurrent.

- **menu.json** - Configuration du menu
- **footer.json** - Données du footer
- **site-config.json** - Configuration globale

## 🎨 Personnalisation

### 1. Modifier le Menu
Éditez `public/data/menu.json`:

```json
{
  "menuItems": [
    {
      "label": "Accueil",
      "path": "/",
      "icon": "home"
    }
  ]
}
```

### 2. Modifier le Footer
Éditez `public/data/footer.json`:

```json
{
  "company": {
    "name": "Votre Entreprise",
    "description": "Description..."
  },
  "contact": {
    "email": "contact@example.com",
    "phone": "+1234567890"
  }
}
```

### 3. Styles Globaux
Modifiez `assets/css/main.css` pour personnaliser:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... */
}
```

### 4. Ajouter une Nouvelle Page

1. Créez un fichier dans `pages/`:
```vue
<!-- pages/blog.vue -->
<template>
  <div>
    <h1>Mon Blog</h1>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Blog'
})
</script>
```

2. La route `/blog` sera automatiquement créée!

### 5. Créer un Nouveau Composant

```vue
<!-- components/MyComponent.vue -->
<template>
  <div class="my-component">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
const message = ref('Hello World')
</script>

<style scoped>
.my-component {
  padding: 1rem;
}
</style>
```

Utilisez-le dans vos pages:
```vue
<template>
  <MyComponent />
</template>
```

## 🔌 API Routes

### Créer un nouvel endpoint

```typescript
// server/api/posts.get.ts
export default defineEventHandler(() => {
  return {
    posts: [
      { id: 1, title: 'Article 1' },
      { id: 2, title: 'Article 2' }
    ]
  }
})
```

Accessible via: `http://localhost:3000/api/posts`

### Utiliser dans un composant

```vue
<script setup lang="ts">
const { data: posts } = await useFetch('/api/posts')
</script>

<template>
  <div v-for="post in posts" :key="post.id">
    {{ post.title }}
  </div>
</template>
```

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview

# Générer un site statique
npm run generate
```

## 📦 Déploiement

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run generate
# Uploadez le dossier .output/public
```

### Node.js Server
```bash
npm run build
node .output/server/index.mjs
```

## 🐛 Problèmes Courants

### Erreur lors de l'installation
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

### Port 3000 déjà utilisé
```bash
npm run dev -- --port 3001
```

### Erreur de build
```bash
rm -rf .nuxt
npm run dev
```

## 📚 Ressources

- [Documentation Nuxt](https://nuxt.com/docs)
- [Documentation Vue 3](https://vuejs.org/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Nuxt Examples](https://nuxt.com/docs/examples)

## 💡 Conseils

1. **Auto-import** - Nuxt importe automatiquement les composants et composables
2. **File-based routing** - Pas besoin de configurer les routes manuellement
3. **TypeScript** - Support complet sans configuration
4. **SEO** - Utilisez `useHead()` pour les meta tags
5. **Data fetching** - Utilisez `useFetch()` ou `useAsyncData()`

## 🎯 Prochaines Étapes

1. ✅ Personnaliser le contenu des pages
2. ✅ Ajouter vos images dans `public/`
3. ✅ Configurer les variables d'environnement (`.env`)
4. ✅ Ajouter des animations et transitions
5. ✅ Intégrer une base de données si nécessaire
6. ✅ Configurer le SEO et les meta tags
7. ✅ Tester et optimiser les performances
8. ✅ Déployer en production

Bon développement! 🚀
