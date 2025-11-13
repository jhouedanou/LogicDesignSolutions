<template>
  <section class="brand-one brand-two">
    <div class="container">
      <div class="section-title-two text-center">
        <h2 class="section-title-two__title" v-html="brandsTitleWidget"></h2>
      </div>
      <p class="brand-two__text" v-html="brandsDescriptionWidget"></p>
      <div class="brand-one__inner">
        <div class="brand-one__carousel owl-carousel owl-theme thm-owl__carousel"
          data-owl-options='{"loop": true, "items": 3, "margin": 100, "dots": true, "nav": false, "autoplay": true, "autoplayTimeout": 5000, "responsive": {"0": {"items": 1, "margin": 30}, "375": {"items": 1, "margin": 30}, "575": {"items": 2, "margin": 50}, "767": {"items": 2, "margin": 50}, "991": {"items": 3, "margin": 80}, "1199": {"items": 3, "margin": 100}}}'>
          <div v-for="partner in partners" :key="partner.id" class="item">
            <img :src="partner.image" :alt="partner.title">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { fetchWidgetContent } = useWidgets()
const { partners, fetchPartners } = usePartners()

const brandsTitleWidget = ref<string>('')
const brandsDescriptionWidget = ref<string>('')

onMounted(async () => {
  try {
    // Charger les partners depuis l'API
    await fetchPartners()
    console.log('✅ Partners chargés:', partners.value.length)

    // Charger les widgets de titre et description
    const [brandsTitleContent, brandsDescriptionContent] = await Promise.all([
      fetchWidgetContent('custom_html-21', 'nouveau-template-01'), // brands title
      fetchWidgetContent('custom_html-22', 'nouveau-template-01'), // brands description
    ])

    brandsTitleWidget.value = brandsTitleContent
    brandsDescriptionWidget.value = brandsDescriptionContent

    console.log('✅ Widgets brands chargés avec succès')

    // Initialiser le carousel Owl après un court délai
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        initBrandCarousel()
      }, 500)
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des brands:', error)
  }
})

const initBrandCarousel = () => {
  const $ = (window as any).$

  if (!$ || !$.fn.owlCarousel) {
    console.warn('⚠️ Owl Carousel non disponible')
    return
  }

  try {
    const brandCarousel = $('.brand-one__carousel')

    // Détruire le carousel existant s'il existe
    if (brandCarousel.hasClass('owl-loaded')) {
      brandCarousel.trigger('destroy.owl.carousel')
    }

    // Initialiser le carousel
    brandCarousel.owlCarousel({
      loop: true,
      items: 3,
      margin: 100,
      dots: true,
      nav: false,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1000,
      responsive: {
        0: { items: 1, margin: 30 },
        375: { items: 1, margin: 30 },
        575: { items: 2, margin: 50 },
        767: { items: 2, margin: 50 },
        991: { items: 3, margin: 80 },
        1199: { items: 3, margin: 100 }
      }
    })

    console.log('✅ Brand Carousel initialisé')
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du carousel:', error)
  }
}
</script>

<style scoped>
/* Brand/Partners Carousel Height */
.brand-one__carousel .item {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-one__carousel .item img {
  max-height: 90px;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}
</style>
