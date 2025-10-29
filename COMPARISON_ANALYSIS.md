# Detailed Line-by-Line Comparison: index.html vs index.vue

## FILE LOCATIONS
- **index.html**: `/Users/houedanou/Documents/GitHub/LogicDesignSolutions/index.html`
- **index.vue**: `/Users/houedanou/Documents/GitHub/LogicDesignSolutions/nuxt-app/app/pages/index.vue`

---

## SECTION 1: HEAD/METADATA (index.html only)

### Missing from index.vue (HEAD SECTION):

**index.html lines 1-43** - Entire `<head>` section is ABSENT in index.vue

1. `<!DOCTYPE html>` declaration - NOT IN VUE
2. `<html lang="en">` tag - NOT IN VUE
3. Meta charset UTF-8 - NOT IN VUE
4. Meta viewport - NOT IN VUE
5. `<title>` tag - Replaced with `useHead()` composition API call
6. All favicon links (lines 9-12) - NOT IN VUE
7. All CSS vendor links (lines 15-41):
   - Google Fonts preconnect links
   - Bootstrap CSS
   - Animate.css
   - Font Awesome CSS
   - Jarallax CSS
   - Magnific Popup CSS
   - Odometer CSS
   - Swiper CSS
   - Smartbiz Icons CSS
   - Owl Carousel CSS
   - Bootstrap Select CSS
   - jQuery UI CSS
   - Custom smartbiz.css
   - Custom smartbiz-responsive.css
   - Custom logic-custom.css
   - ALL NOT IN VUE

**index.vue replaces this entire section with:**
- `useHead()` composition API call (lines 603-614)
- Provides title dynamically
- Provides meta description dynamically
- CSS files are handled by Nuxt config (not in component)

---

## SECTION 2: BODY AND PRELOADER

### index.html (lines 45-57):
```html
<body class="custom-cursor">
  <div class="custom-cursor__cursor"></div>
  <div class="custom-cursor__cursor-two"></div>

  <!--Start Preloader-->
  <div class="loader js-preloader">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <!--End Preloader-->
```

### index.vue (lines 2-8):
```vue
<div class="custom-cursor">
  <!-- Custom Cursor -->
  <div class="custom-cursor__cursor"></div>
  <div class="custom-cursor__cursor-two"></div>

  <!-- Preloader -->
  <AppPreloader />
```

### DIFFERENCES:
- **Line 45 (html)**: `<body class="custom-cursor">` becomes `<div class="custom-cursor">` (no body tag, wrapped in template)
- **Lines 51-56 (html)**: Inline preloader HTML vs **Line 8 (vue)**: `<AppPreloader />` component import
- **Comment style**: HTML comments `<!-- -->` remain same, but vue uses clearer formatting
- **Preloader implementation**: Static HTML divs become a Vue component

---

## SECTION 3: HEADER/NAVIGATION

### index.html (lines 62-164):
All header HTML is hardcoded with `<header>`, `<nav>`, logo, menu items

### index.vue (lines 13):
```vue
<AppHeader />
```

### DIFFERENCES:
- **Lines 62-164 (html)**: Entire header with logo, navigation menu, sticky header becomes **1 line (vue)**: `<AppHeader />` component
- **Logo link (html line 113)**: `<a href="index.html">` becomes component-based routing
- **Navigation links (html lines 119-135)**:
  - `<a href="index.html">HOME</a>`
  - `<a href="profiles.html">PROFILES</a>`
  - `<a href="products.html">PRODUCTS</a>`
  - `<a href="services.html">SERVICES</a>`
  - `<a href="news.html">NEWS</a>`
  - `<a href="references.html">REFERENCES</a>`
  - All become internal routing in AppHeader component
- **Contact button (html line 157)**: `<a href="contact.html">` becomes internal routing
- **Sticky header (html lines 166-168)**: Empty sticky header still present in both, but html has explicit structure, vue inherits from component
- **NOT IN VUE**: Entire commented top bar section (html lines 63-107) with contact info and social icons

---

## SECTION 4: MAIN SLIDER

### Path Differences:

**Slide 1 - Background Image:**
- **html line 177**: `style="background-image: url(assets/images/backgrounds/logic-slider-1.png);"`
- **vue line 25**: `style="background-image: url(/assets/images/backgrounds/logic-slider-1.png);"`
- DIFFERENCE: `assets/` vs `/assets/` (leading slash added in vue)

**Slide 1 - Shape Image:**
- **html line 181**: `<img src="assets/images/shapes/slider-v2-shape1.png" alt="">`
- **vue line 30**: `<img src="/assets/images/shapes/slider-v2-shape1.png" alt="" />`
- DIFFERENCE: `assets/` vs `/assets/` (leading slash added in vue)

**Slide 2 - Background Image:**
- **html line 198**: `style="background-image: url(assets/images/backgrounds/logic-slider-2.png);"`
- **vue line 54**: `style="background-image: url(/assets/images/backgrounds/logic-slider-2.png);"`
- DIFFERENCE: `assets/` vs `/assets/` (leading slash added in vue)

**Slide 2 - Shape Image:**
- **html line 202**: `<img src="assets/images/shapes/slider-v2-shape1.png" alt="">`
- **vue line 59**: `<img src="/assets/images/shapes/slider-v2-shape1.png" alt="" />`
- DIFFERENCE: `assets/` vs `/assets/` (leading slash added in vue)

**Slide 3 - Background Image:**
- **html line 219**: `style="background-image: url(assets/images/backgrounds/logic-slider-3.png);"`
- **vue line 83**: `style="background-image: url(/assets/images/backgrounds/logic-slider-3.png);"`
- DIFFERENCE: `assets/` vs `/assets/` (leading slash added in vue)

**Slide 3 - Shape Image:**
- **html line 223**: `<img src="assets/images/shapes/slider-v2-shape1.png" alt="">`
- **vue line 88**: `<img src="/assets/images/shapes/slider-v2-shape1.png" alt="" />`
- DIFFERENCE: `assets/` vs `/assets/` (leading slash added in vue)

### Link Differences:

**Slide 1 - CTA Button:**
- **html lines 188-189**: `<a href="products.html" class="main-slider-two__btn thm-btn">Let's Work Together<span class="icon-right-arrow"></span></a>`
- **vue lines 41-44**: `<NuxtLink to="/products" class="main-slider-two__btn thm-btn">Let's Work Together<span class="icon-right-arrow"></span></NuxtLink>`
- DIFFERENCES:
  - `<a>` tag becomes `<NuxtLink>` component
  - `href="products.html"` becomes `to="/products"`
  - Button text on same line in html, split across lines in vue (formatting)

**Slide 2 - CTA Button:**
- **html lines 209-210**: `<a href="products.html" ...>`
- **vue lines 70-73**: `<NuxtLink to="/products" ...>`
- SAME DIFFERENCES as Slide 1

**Slide 3 - CTA Button:**
- **html lines 230-231**: `<a href="products.html" ...>`
- **vue lines 99-102**: `<NuxtLink to="/products" ...>`
- SAME DIFFERENCES as Slide 1

### Structure Differences:

**Line breaks in title (html vs vue):**
- **html line 186**: `<h2 class="main-slider-two__title">Discover our <br> product lines <br> and IP solutions</h2>`
- **vue lines 35-39**:
```
<h2 class="main-slider-two__title">
  Discover our <br />
  product lines <br />
  and IP solutions
</h2>
```
- DIFFERENCE: Same content but formatted across multiple lines in vue (XML self-closing `<br />` vs HTML `<br>`)

**Comments:**
- **html line 192**: `<!-- Video hidden -->` appears in html
- **vue**: NOT PRESENT in vue (comment removed)

---

## SECTION 5: ABOUT SECTION

### Path Differences:

**Shape Image:**
- **html line 243**: `<img src="assets/images/shapes/about-v2-shape1.png" alt="">`
- **vue line 114**: `<img src="/assets/images/shapes/about-v2-shape1.png" alt="" />`
- DIFFERENCE: `assets/` vs `/assets/`

**About Image:**
- **html line 322**: `<img src="assets/images/resources/im1.jpeg" alt="Image" style="border-radius: 10px;">`
- **vue lines 219-223**: `<img src="/assets/images/resources/im1.jpeg" alt="Image" style="border-radius: 10px;" />`
- DIFFERENCE: `assets/` vs `/assets/`

### Link Differences:

**Learn About Us Button:**
- **html lines 308-309**: `<a href="products.html" class="thm-btn">Learn About Us<span class="icon-right-arrow"></span></a>`
- **vue lines 200-203**: `<NuxtLink to="/products" class="thm-btn">Learn About Us<span class="icon-right-arrow"></span></NuxtLink>`
- DIFFERENCES:
  - `<a>` to `<NuxtLink>`
  - `href="products.html"` to `to="/products"`

### Text Content Differences:

**About content paragraphs:**
- **html line 255**: Single line `<h3>professional activities to produce and sell goods or services for profit.</h3>`
- **vue lines 127-130**:
```
<h3>
  professional activities to produce and sell goods or
  services for profit.
</h3>
```
- DIFFERENCE: Line breaking for readability in vue

**Long paragraph wrapping:**
- **html lines 258-260**: Paragraph on fewer lines
- **vue lines 133-139**: Same paragraph broken across multiple lines for readability
- Multiple occurrences of this wrapping difference throughout the section

### Missing Elements:

- **html line 306**: Comment `<!-- Statistics removed -->` present in html
- **vue**: NO SUCH COMMENT in vue (already removed)

---

## SECTION 6: SERVICES/NEWS SECTION

### Path Differences:

**All news images have paths updated:**

**News Item 1:**
- **html line 380**: `<img src="assets/images/news/news-1.jpg" ...>`
- **vue line 289**: `<img src="/assets/images/news/news-1.jpg" ...>`
- DIFFERENCE: `assets/` vs `/assets/`

**News Item 2:**
- **html line 401**: `<img src="assets/images/news/news-2.png" ...>`
- **vue line 323**: `<img src="/assets/images/news/news-2.png" ...>`
- DIFFERENCE: `assets/` vs `/assets/`

**News Item 3:**
- **html line 422**: `<img src="assets/images/news/news-3.jpg" ...>`
- **vue line 357**: `<img src="/assets/images/news/news-3.jpg" ...>`
- DIFFERENCE: `assets/` vs `/assets/`

**News Item 4:**
- **html line 443**: `<img src="assets/images/news/news-4.jpg" ...>`
- **vue line 388**: `<img src="/assets/images/news/news-4.jpg" ...>`
- DIFFERENCE: `assets/` vs `/assets/`

**Background Shape:**
- **html line 337**: `style="background-image: url(assets/images/shapes/services-two-bg-shape.png);"`
- **vue line 239**: `style="background-image: url(/assets/images/shapes/services-two-bg-shape.png);"`
- DIFFERENCE: `assets/` vs `/assets/`

### Link Differences:

**All news item links changed from `<a>` to `<a>` (not NuxtLink):**

**News Item 1 - Title Link:**
- **html line 388**: `<h3 class="services-two__title"><a href="news.html">Gen 5 NVMe Host IP<br>on AGILEX 7 R-Tile !</a></h3>`
- **vue lines 299-304**: `<h3 class="services-two__title"><a href="/news">Gen 5 NVMe Host IP<br />on AGILEX 7 R-Tile !</a></h3>`
- DIFFERENCE: `href="news.html"` becomes `href="/news"` (still using `<a>` tag, not NuxtLink)

**News Item 1 - Read More Button:**
- **html line 390**: `<a href="news.html" class="services-two__btn">Read More...`
- **vue line 309**: `<a href="/news" class="services-two__btn">Read More...`
- DIFFERENCE: `href="news.html"` becomes `href="/news"`

**News Item 2 - Title Link:**
- **html line 409**: `<a href="news.html">NVME Host IP on<br>Kintex Ultra Scale Plus !</a>`
- **vue lines 334-337**: `<a href="/news">NVME Host IP on<br />Kintex Ultra Scale Plus !</a>`
- DIFFERENCE: `href="news.html"` becomes `href="/news"`

**News Item 2 - Read More Button:**
- **html line 411**: `<a href="news.html" class="services-two__btn">Read More...`
- **vue line 343**: `<a href="/news" class="services-two__btn">Read More...`
- DIFFERENCE: `href="news.html"` becomes `href="/news"`

**News Item 3 - Title Link:**
- **html line 430**: `<a href="news.html">New ARINC 429 IP</a>`
- **vue line 368**: `<a href="/news">New ARINC 429 IP</a>`
- DIFFERENCE: `href="news.html"` becomes `href="/news"`

**News Item 3 - Read More Button:**
- **html line 432**: `<a href="news.html" class="services-two__btn">Read More...`
- **vue line 374**: `<a href="/news" class="services-two__btn">Read More...`
- DIFFERENCE: `href="news.html"` becomes `href="/news"`

**News Item 4 - Title Link:**
- **html line 451**: `<a href="news.html">Gen4 NVME Host IP on<br>Artix Ultra Scale Plus !</a>`
- **vue lines 399-402**: `<a href="/news">Gen4 NVME Host IP on<br />Artix Ultra Scale Plus !</a>`
- DIFFERENCE: `href="news.html"` becomes `href="/news"`

**News Item 4 - Read More Button:**
- **html line 453**: `<a href="news.html" class="services-two__btn">Read More...`
- **vue line 408**: `<a href="/news" class="services-two__btn">Read More...`
- DIFFERENCE: `href="news.html"` becomes `href="/news"`

### Structure/Formatting Differences:

**Title formatting in news section:**
- **html lines 186-187**: `<h2 class="main-slider-two__title">Discover our <br> product lines <br> and IP solutions</h2>`
- **vue lines 248-250**: Split across multiple lines with `<br />`
- All `<br>` tags become `<br />` (self-closing XML format)

**Section title formatting:**
- **html lines 343-345**: `<h2 class="section-title-two__title">Read our latest news<br> and product announcements</h2>`
- **vue lines 247-250**:
```
<h2 class="section-title-two__title">
  Read our latest news<br />
  and product announcements
</h2>
```
- DIFFERENCE: Line wrapping for readability

**Data attributes formatting:**
- **html lines 348-374**: All on multiple lines but more compact
- **vue lines 253-281**: Same structure but with different indentation/spacing for readability

---

## SECTION 7: BRAND/PARTNERS SECTION

### Missing Element:

**html line 470**: Comment `<!-- Tagline removed -->`
- **vue**: NO SUCH COMMENT in vue (section already removed)

### Path Differences:

**All brand images have paths updated:**

**Brand Image 1 (repeated 2x):**
- **html lines 511, 520**: `src="assets/images/brand/AMD_Embedded_Select.png"`
- **vue lines 475, 493**: `src="/assets/images/brand/AMD_Embedded_Select.png"`
- DIFFERENCE: `assets/` vs `/assets/`

**Brand Image 2 (repeated 2x):**
- **html lines 514, 523**: `src="assets/images/brand/Member-Badge-1-1.png"`
- **vue lines 481, 499**: `src="/assets/images/brand/Member-Badge-1-1.png"`
- DIFFERENCE: `assets/` vs `/assets/`

**Brand Image 3 (repeated 2x):**
- **html lines 517, 526**: `src="assets/images/brand/image001.png"`
- **vue lines 487, 505**: `src="/assets/images/brand/image001.png"`
- DIFFERENCE: `assets/` vs `/assets/`

### Formatting Differences:

**Self-closing tags:**
- All `<img ... >` tags in html become `<img ... />` in vue (XML-compliant)

---

## SECTION 8: GOOGLE MAP

### DIFFERENCES: NONE
- **html lines 537-539**: iframe with Google Maps embed
- **vue lines 518-522**: Same iframe, only formatting difference (line breaks)
- No URL changes, no attribute changes

---

## SECTION 9: FOOTER

### Missing from index.vue:
- **html lines 544-569**: Entire `<footer>` with site-footer-two structure
- **vue line 527**: `<AppFooter />` component replaces it

### DIFFERENCES:
- **html lines 549, 551-553**: Hardcoded footer with logo, copyright text, menu links, social icons
- **vue line 527**: All replaced with `<AppFooter />` component
- Footer implementation moved to component

---

## SECTION 10: MOBILE NAVIGATION

### Mobile Logo Link:

- **html line 581**: `<a href="index.html" style="...">`
- **vue line 541**: `<a href="/" style="...">`
- DIFFERENCE: `href="index.html"` becomes `href="/"` (home route)

### Mobile Contact Email:

- **html line 590**: `<a href="mailto:needhelp@packageName__.com">contact@logic-design-solutions.com</a>`
- **vue line 557**: `<a href="mailto:contact@logic-design-solutions.com">contact@logic-design-solutions.com</a>`
- DIFFERENCE: Email address updated from `needhelp@packageName__.com` to correct `contact@logic-design-solutions.com`

### Mobile Contact Phone:

- **html line 594**: `<a href="tel:666-888-0000">+33 (0)1 45 92 24 47</a>`
- **vue line 563**: `<a href="tel:+33145922447">+33 (0)1 45 92 24 47</a>`
- DIFFERENCE: Tel link updated from dummy `666-888-0000` to correct `+33145922447`

### Formatting:

- **html lines 588-596**: Mobile nav structure with minimal formatting
- **vue lines 554-565**: Same structure with better formatting/indentation

### Missing Elements:

- **html lines 597-604**: Mobile nav top section with social links in `<div class="mobile-nav__top">`
- **vue lines 567-574**: Same structure present but simplified (no closing comments needed due to component structure)

---

## SECTION 11: SEARCH POPUP

### DIFFERENCES: MINIMAL

**Formatting:**
- **html lines 613-626**: Search popup with form
- **vue lines 579-590**: Identical structure, only line break formatting differs
- All attributes and elements identical

---

## SECTION 12: SCROLL TO TOP

### DIFFERENCES: NONE
- **html line 629**: `<a href="#" data-target="html" class="scroll-to-target scroll-to-top"><i class="fas fa-arrow-up"></i></a>`
- **vue lines 593-595**: Same element with line breaks for formatting
- No functional differences

---

## SECTION 13: SCRIPTS (index.html only)

### Missing from index.vue:

**html lines 632-655** - All JavaScript imports are ABSENT in index.vue

Included in html but NOT in vue:
1. jQuery 3.6.0
2. Bootstrap Bundle JS
3. Jarallax JS
4. jQuery AJAX Chimp
5. jQuery Appear
6. jQuery Circle Progress
7. jQuery Magnific Popup
8. jQuery Validate
9. Odometer JS
10. Swiper JS
11. wNumb JS
12. WOW JS
13. Isotope JS
14. Owl Carousel JS
15. Bootstrap Select JS
16. jQuery UI JS
17. jQuery Circle Type JS
18. jQuery Lettering JS
19. Custom smartbiz.js

**Why missing in vue:**
- These are handled by Nuxt build system and package.json dependencies
- No need for explicit script tags in Nuxt components
- Vue component lifecycle handles initialization

### Extra Element in index.vue:

**vue lines 597-598**: `<CustomCursor />` component
- MISSING from index.html static version
- This is an extra Vue component import in the page

---

## SECTION 14: CLOSING TAGS

### index.html (lines 656-658):
```html
</body>

</html>
```

### index.vue (lines 600-654):
```vue
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Logic Design Solutions - FPGA Design Services & IP Solutions',
  meta: [
    {
      name: 'description',
      content: 'Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP'
    }
  ]
})
</script>

<style scoped>
.custom-cursor {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.page-wrapper {
  width: 100%;
  overflow-x: hidden;
}

.custom-cursor__cursor,
.custom-cursor__cursor-two {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
}

.custom-cursor__cursor {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 50%;
  top: 0;
  left: 0;
}

.custom-cursor__cursor-two {
  width: 5px;
  height: 5px;
  background: #333;
  border-radius: 50%;
  top: 0;
  left: 0;
}
</style>
```

### DIFFERENCES:

**index.vue has THREE additional sections not in index.html:**

1. **Script Setup Section (lines 602-614):**
   - Uses `useHead()` composition API from Nuxt
   - Dynamically sets page title
   - Dynamically sets meta description
   - Replaces static `<head>` metadata

2. **Scoped Styles Section (lines 617-653):**
   - Defines custom cursor styling
   - Defines page wrapper styling
   - Contains layout utility styles
   - All CSS is component-scoped
   - These styles were in separate CSS files in index.html

3. **Vue Component Structure:**
   - Wrapped in `<template>` tags
   - Has `<script setup>` with TypeScript support
   - Has `<style scoped>` for component-specific styles

---

## SUMMARY OF ALL DIFFERENCES

### MISSING FROM INDEX.VUE (Elements/Sections):
1. Full `<head>` section with meta tags and CSS links
2. `<!DOCTYPE html>` declaration
3. `<html>` and `<body>` tags
4. All 19 JavaScript includes
5. Entire `<header>` navigation section (replaced with `<AppHeader />`)
6. Entire `<footer>` section (replaced with `<AppFooter />`)
7. Static preloader HTML (replaced with `<AppPreloader />`)
8. Comments: "Video hidden", "Statistics removed", "Tagline removed"

### EXTRA IN INDEX.VUE (Components/Sections):
1. `<script setup lang="ts">` with `useHead()` composition API
2. `<style scoped>` with custom cursor CSS
3. `<AppPreloader />` component
4. `<AppHeader />` component
5. `<AppFooter />` component
6. `<CustomCursor />` component
7. `<template>` wrapper for Vue component
8. `useHead()` function for dynamic metadata

### PATH DIFFERENCES (assets vs /assets):
**ALL image and background paths updated:**
- `assets/images/...` becomes `/assets/images/...`
- 20+ occurrences throughout the file
- Applies to:
  - Slider backgrounds (3 slides, 6 references)
  - About section shape and image (2 references)
  - Services section background (1 reference)
  - News item images (4 references)
  - Brand partner logos (6 references)

### LINK DIFFERENCES:
**Navigation and Menu Links:**
- `href="index.html"` becomes `href="/"` or `to="/..."`
- `href="profiles.html"` becomes component routing
- `href="products.html"` becomes `to="/products"` in NuxtLink, `/products` in `<a>` tags
- `href="news.html"` becomes `href="/news"`
- `href="services.html"` becomes component routing
- `href="references.html"` becomes component routing
- `href="contact.html"` becomes component routing

**Component vs Standard Links:**
- Slider/About buttons use `<NuxtLink to="/products">` (Vue routing)
- News links still use `<a href="/news">` (regular anchors, not NuxtLink)
- Mobile logo uses `<a href="/">` (not NuxtLink)
- Footer links moved to AppFooter component

### CONTACT INFORMATION FIXES:
1. Mobile email: `needhelp@packageName__.com` → `contact@logic-design-solutions.com`
2. Mobile phone tel: `tel:666-888-0000` → `tel:+33145922447`

### STRUCTURAL/FORMATTING DIFFERENCES:
1. All `<br>` tags become `<br />` (XML-compliant)
2. All `<img>` tags become self-closing `<img ... />`
3. Long lines broken across multiple lines for readability
4. Better indentation throughout

### TEXT CONTENT CHANGES:
- None - all text content remains identical
- Only formatting and structure changes

### ATTRIBUTE DIFFERENCES:
1. `data-target="html"` remains on scroll-to-top button (no change)
2. `allowfullscreen` attribute on iframe (no change, just formatting)
3. All class names remain identical
4. All IDs remain identical
5. All data-* attributes remain identical
6. `style` attributes content remains same, only path updates

---

## CRITICAL ROUTING CHANGES

### Files that no longer exist (routes now):
- `index.html` → `/` (or `/index`)
- `profiles.html` → `/profiles`
- `products.html` → `/products`
- `services.html` → `/services`
- `news.html` → `/news`
- `references.html` → `/references`
- `contact.html` → `/contact`
- `faq.html` → `/faq`

All navigation has been converted to Nuxt routing with both component-based (`<NuxtLink>`) and anchor-based (`<a href="/">`) links present.

---

## METADATA MANAGEMENT

### index.html (static):
- Title in `<head>` tag (line 7)
- Meta description in `<head>` tag (line 13)
- Favicons defined in `<head>` tags (lines 9-12)
- Manifest in `<head>` tag (line 12)

### index.vue (dynamic):
- Title set via `useHead()` in script (line 606)
- Meta description set via `useHead()` in script (lines 609-612)
- Favicons/manifest handled by Nuxt config (not in component)
- More flexible and maintainable approach

---

## COMPONENT ARCHITECTURE DIFFERENCES

### index.html: Monolithic static file
- All content inline
- All styles in separate CSS files
- All scripts in separate JS files
- Difficult to maintain and update

### index.vue: Modular component-based architecture
- Content uses reusable components:
  - `AppPreloader` - Preloader component
  - `AppHeader` - Header/navigation component
  - `AppFooter` - Footer component
  - `CustomCursor` - Custom cursor component
- Styles scoped to component
- Metadata managed via composition API
- Much more maintainable and reusable

