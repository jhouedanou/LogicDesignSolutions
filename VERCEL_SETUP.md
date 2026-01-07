# Configuration Vercel pour Logic Design Solutions

## 1. Paramètres du projet sur Vercel

### Root Directory
⚠️ **LAISSER VIDE** (ne pas mettre "nuxt-app")

### Build & Development Settings

| Setting | Valeur |
|---------|--------|
| Framework Preset | **Other** (ou None) |
| Build Command | `cd nuxt-app && npm install && npm run build` |
| Output Directory | `nuxt-app/.output/public` |
| Install Command | `cd nuxt-app && npm install` |

## 2. Variables d'environnement

Ajoute ces variables dans **Project Settings → Environment Variables** :

```env
NUXT_PUBLIC_API_BASE=https://api.logic-design-solutions.com/wp-json
NUXT_PUBLIC_SITE_URL=https://logic-design-solutions.com
NUXT_PUBLIC_SITE_NAME=Logic Design Solutions
```

## 3. Fichiers du projet

### ✅ vercel.json (déjà configuré)
```json
{
  "buildCommand": "cd nuxt-app && npm install && npm run build",
  "outputDirectory": "nuxt-app/.output/public",
  "installCommand": "cd nuxt-app && npm install",
  "framework": null
}
```

### ✅ nuxt.config.ts (déjà configuré)
- `baseURL: '/'` ✅
- `nitro.preset: 'vercel'` ✅
- `site.url: 'https://logic-design-solutions.com'` ✅

## 4. Déploiement

### Option A : Via Git (Recommandé)
```bash
git add .
git commit -m "Configure Vercel deployment"
git push
```

Vercel déploiera automatiquement.

### Option B : Via CLI Vercel
```bash
cd /Users/houedanou/Documents/GitHub/LogicDesignSolutions
vercel --prod
```

## 5. Vérification après déploiement

- [ ] https://logic-design-solutions.com → Homepage
- [ ] https://logic-design-solutions.com/products → Liste produits
- [ ] https://logic-design-solutions.com/news → Articles
- [ ] Console du navigateur : pas d'erreurs CORS
- [ ] Appels API vers `api.logic-design-solutions.com` fonctionnent

## 6. Troubleshooting

### Erreur "Root Directory does not exist"
→ Dans Vercel Dashboard, **Root Directory** doit être **VIDE**

### Erreur 500 Internal Server Error
→ Vérifie les logs dans Vercel Dashboard → Deployments → View Function Logs

### CORS errors
→ Vérifie que `NUXT_PUBLIC_API_BASE` pointe vers `https://api.logic-design-solutions.com/wp-json`
