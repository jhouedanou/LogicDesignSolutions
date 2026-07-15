# Guide admin — Publier un article Blog

Site front : `https://logic-design-solutions.com` (Nuxt, rendu serveur)
Admin WordPress : `https://api.logic-design-solutions.com/wp-admin`

Le front lit WordPress en direct via l'API REST : **un article publié apparaît
immédiatement sur le site, aucun redéploiement nécessaire.**

---

## 1. Créer l'article

1. `wp-admin` → **Articles → Ajouter**.
2. Renseigner le **titre** (il devient le `<h1>` et le `<title>` de la page).
3. Vérifier le **permalien** (slug) : c'est l'URL finale →
   `https://logic-design-solutions.com/blog/mon-slug`.

## 2. Catégorie « blog » — obligatoire

Dans le panneau de droite → **Catégories** → cocher **blog**.

C'est elle qui pilote tout :

| Catégorie cochée | Résultat |
|---|---|
| `blog` | Article visible sur `/blog`, listé dans le sitemap sous `/blog/...`, retiré de `/news` |
| autre (ou aucune) | Article traité comme News (`/news/...`) |

Un article coché `blog` qui s'ouvre sous `/news/...` renvoie « not found » : normal, voulu.

## 3. Corps de l'article — HTML rendu tel quel

Le front affiche le contenu **sans le nettoyer** : titres Hn, tableaux,
encadrés, sommaire, FAQ, liens internes et JSON-LD passent tels quels.

Pour du HTML précis, utiliser le bloc Gutenberg **« HTML personnalisé »**
(ou l'onglet « Modifier en HTML » d'un bloc).

Balisage reconnu et stylé automatiquement par le front :

```html
<!-- Sommaire : liens d'ancres -->
<ul>
  <li><a href="#section-1">Première section</a></li>
</ul>

<!-- Titres : h2 = section (filet orange), h3/h4 = sous-sections.
     id = ancre pour le sommaire -->
<h2 id="section-1">Première section</h2>

<!-- Tableau (scroll horizontal automatique sur mobile) -->
<table>
  <thead><tr><th>FPGA</th><th>Débit</th></tr></thead>
  <tbody><tr><td>Agilex 7</td><td>Gen5 x4</td></tr></tbody>
</table>

<!-- Encadré / citation -->
<blockquote><p>Point clé à retenir.</p></blockquote>

<!-- Code -->
<pre><code>nvme_host_ip #(.LANES(4)) u0 (...);</code></pre>

<!-- FAQ dépliante -->
<details>
  <summary>Question fréquente ?</summary>
  <p>Réponse.</p>
</details>

<!-- Image avec légende -->
<figure>
  <img src="https://api.logic-design-solutions.com/wp-content/uploads/....jpg" alt="Schéma">
  <figcaption>Légende de l'image</figcaption>
</figure>
```

⚠️ **Ne pas mettre de `<h1>` dans le corps** : le titre de l'article l'est déjà.
Commencer la hiérarchie à `<h2>`.

⚠️ Les balises `<script>`/`<style>` dans le corps ne sont conservées à
l'enregistrement que si votre compte a le droit `unfiltered_html`
(rôles Éditeur/Admin — configuré). Test : enregistrer, recharger l'éditeur ;
si la balise a disparu, voir avec l'admin technique.

## 4. Image mise en avant — obligatoire

Panneau de droite → **Image mise en avant** → choisir dans la médiathèque.

Elle sert de :
- grande image d'en-tête de l'article (recadrée 16:9) ;
- vignette dans le listing `/blog` et la sidebar ;
- **image Open Graph par défaut** (partages LinkedIn/Facebook/X/WhatsApp).

Format recommandé : **1200 × 675 px minimum**, paysage 16:9.

## 5. Extrait — sert de meta description

Panneau de droite → **Extrait** : 1 à 2 phrases, **160 caractères max**.
Devient la meta description et la description Open Graph. Sans extrait,
WordPress prend le début de l'article (rarement optimal).

## 6. Champs SEO (boîte « SEO (front headless) » sous l'éditeur)

Trois champs optionnels, injectés dans le `<head>` de la page par le front :

| Champ | Usage | Si vide |
|---|---|---|
| `canonical_url` | URL canonique imposée (ex. article repris d'un autre site) | URL du site : `https://logic-design-solutions.com/blog/slug` |
| `og_image` | Image de partage spécifique — bouton **« Choisir dans la médiathèque »** | Image mise en avant |
| `seo_jsonld` | Données structurées JSON-LD | rien (ou JSON-LD du corps si présent) |

`seo_jsonld` : coller le **JSON brut, sans balise `<script>`** :

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre de l'article",
  "datePublished": "2026-07-15",
  "author": { "@type": "Organization", "name": "Logic Design Solutions" },
  "image": "https://api.logic-design-solutions.com/wp-content/uploads/....jpg"
}
```

Alternative acceptée : intégrer directement
`<script type="application/ld+json">…</script>` dans le corps de l'article
(bloc HTML personnalisé) — il est conservé et rendu tel quel.
**Ne pas faire les deux** (doublon).

## 7. Étiquettes (optionnel)

Panneau **Étiquettes** : affichées en bas d'article, cliquables.

## 8. Publier, puis vérifier

1. **Publier**.
2. Ouvrir `https://logic-design-solutions.com/blog/<slug>` — l'article doit
   s'afficher complet (titre, image, contenu mis en forme).
3. `https://logic-design-solutions.com/sitemap.xml` — l'URL `/blog/<slug>`
   doit y figurer.
4. Partage : coller l'URL dans https://www.opengraph.xyz (titre, description,
   image doivent correspondre).
5. JSON-LD : tester l'URL sur https://search.google.com/test/rich-results.

## Check-list rapide

- [ ] Titre + slug propres
- [ ] Catégorie **blog** cochée
- [ ] Corps : hiérarchie `h2/h3`, pas de `h1`
- [ ] Image mise en avant 1200×675+
- [ ] Extrait ≤ 160 caractères
- [ ] JSON-LD : champ `seo_jsonld` **ou** script dans le corps (pas les deux)
- [ ] `canonical_url` / `og_image` seulement si besoin de surcharger
- [ ] Vérification sur `/blog/<slug>` + sitemap après publication
