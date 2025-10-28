# Logic Design Solutions - Nuxt Application

Application web moderne construite avec Nuxt 4.2.0, Vue 3 et TypeScript.

## 🚀 Caractéristiques

- ⚡️ **Nuxt 4.2.0** - Framework Vue performant
- 🎨 **Design Moderne** - Interface responsive et élégante
- 📱 **Mobile First** - Optimisé pour tous les appareils
- 🔥 **Hot Module Replacement** - Développement rapide
- 📦 **Optimisé** - Code splitting et compression automatique
- 🎯 **TypeScript** - Type safety et autocomplétion
- 🌐 **SEO Ready** - Meta tags et optimisations SEO

## 📁 Structure du Projet

```
nuxt-app/
├── app/
│   └── app.vue              # Point d'entrée de l'application
├── assets/
│   └── css/
│       └── main.css         # Styles globaux
├── components/
│   └── layout/
│       ├── Header.vue       # En-tête navigation
│       ├── Footer.vue       # Pied de page
│       └── Preloader.vue    # Chargement initial
├── layouts/
│   └── default.vue          # Layout principal
├── pages/
│   ├── index.vue           # Page d'accueil
│   ├── about.vue           # À propos
│   ├── services.vue        # Services
│   └── contact.vue         # Contact
├── public/
│   └── data/
│       ├── menu.json       # Configuration menu
│       ├── footer.json     # Données footer
│       └── site-config.json # Config globale
├── server/
│   └── api/
│       ├── menu.get.ts     # API menu
│       ├── footer.get.ts   # API footer
│       └── site-config.get.ts # API config
└── nuxt.config.ts          # Configuration Nuxt
```

## 🛠️ Installation

```bash
npm install --legacy-peer-deps
```

## 💻 Développement

Démarrer le serveur de développement sur `http://localhost:3000`:

```bash
npm run dev
```

## 🏗️ Production

Build pour la production:

```bash
npm run build
```

Prévisualiser le build de production:

```bash
npm run preview
```

## 📝 Pages Disponibles

- `/` - Page d'accueil
- `/about` - À propos
- `/services` - Services
- `/contact` - Contact

## 🎨 Personnalisation

### Modifier le menu
Éditez `public/data/menu.json`

### Modifier le footer
Éditez `public/data/footer.json`

### Modifier la configuration du site
Éditez `public/data/site-config.json`

### Styles globaux
Modifiez `assets/css/main.css` pour personnaliser les variables CSS et styles

## 📚 Documentation

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)

## 🔧 Technologies

- Nuxt 4.2.0
- Vue 3.5.22
- TypeScript 5.7.2
- Vite (bundler)
- Nitro (server engine)
