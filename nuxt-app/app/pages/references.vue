<template>
  <div>
    
<section class="page-header">
            <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)">
            </div>
            <NuxtImg
                src="/assets/images/backgrounds/logic-slider-2.webp"
                alt="References Header Background"
                preset="lcp"
                loading="eager"
                fetchpriority="high"
                preload
                style="position: absolute; width: 100%; height: 100%; object-fit: cover; top: 0; left: 0; z-index: -1; opacity: 0;"
            />
            <div class="container">
                <div class="page-header__inner">
                    <Breadcrumb />
                    <h2 class="page-header__title">Our References</h2>
                </div>
            </div>
        </section>
        <!--Page Header End-->

        <!--References Start-->
        <section class="news-details">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-7">
                        <div class="section-title text-left" style="margin-bottom: 40px;">
                            <div class="section-title__tagline-box">
                                <p class="section-title__tagline">Our History</p>
                            </div>
                            <h2 class="section-title__title">REFERENCES</h2>
                        </div>

                        <div class="news-details__content">
                            <ClientOnly>
                                <template v-if="introText">
                                    <p style="font-size: 16px; line-height: 1.8; margin-bottom: 30px;" v-html="introText"></p>
                                </template>

                                <template v-if="leftCountries || rightCountries">
                                    <div class="row" style="margin-bottom: 40px; position: relative; padding: 30px; border-radius: 5px; overflow: hidden;">
                                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url(/assets/images/backgrounds/world-map-bg.png); background-size: cover; background-position: center; opacity: 0.12; z-index: 0;"></div>
                                        <div class="col-md-6" style="position: relative; z-index: 1;">
                                            <ul style="list-style: none; padding-left: 0; font-size: 16px; line-height: 2; color: var(--lds-primary); font-weight: bold;" v-html="leftCountries"></ul>
                                        </div>
                                        <div class="col-md-6" style="position: relative; z-index: 1;">
                                            <ul style="list-style: none; padding-left: 0; font-size: 16px; line-height: 2; color: var(--lds-primary); font-weight: bold;" v-html="rightCountries"></ul>
                                        </div>
                                    </div>
                                </template>

                                <!-- Founder Section -->
                                <template v-if="founderName || founderBio">
                                    <div class="row" style="margin-top: 50px;">
                                        <div class="col-md-12">
                                            <h3 class="news-details__title-1">Our Founder</h3>
                                            <div style="display: flex; align-items: flex-start; gap: 30px; margin-top: 20px;">
                                                <div v-if="founderImageUrl" style="flex-shrink: 0;">
                                                    <NuxtImg
                                                        :src="founderImageUrl"
                                                        :alt="founderName || 'Founder'"
                                                        width="150"
                                                        height="200"
                                                        loading="lazy"
                                                        style="width: 150px; height: auto; border: 3px solid #eeeeee;"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 style="margin-bottom: 15px;">{{ founderName }}</h4>
                                                    <div style="font-size: 16px; line-height: 1.8; color: #6e7387;" v-html="founderBio"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </ClientOnly>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-5">
                        <div class="sidebar">
                            <!-- Search and Quick Links removed -->

                            <ClientOnly>
                                <HaveAnyProject />
                            </ClientOnly>

                            <!-- Expertise tags removed -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--References End-->

        <!--Brand Two Start-->
        <BrandPartners />
        <!--Brand Two End-->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'
import { useWidgets } from '../composables/useWidgets'

const { fetchMultipleWidgets } = useWidgets()
const introText = ref<string>('')
const leftCountries = ref<string>('')
const rightCountries = ref<string>('')
const founderImageUrl = ref<string>('')
const founderName = ref<string>('')
const founderBio = ref<string>('')

onMounted(async () => {
  try {
    // Charger tous les widgets en parallèle pour optimiser les performances
    const results = await fetchMultipleWidgets(
      ['custom_html-24', 'text-4', 'text-5', 'text-6'],
      'page-reference'
    )

    // Traiter le texte d'introduction
    if (results['custom_html-24']) {
      introText.value = results['custom_html-24']
    }

    // Traiter la liste des pays
    if (results['text-4']) {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = results['text-4']
      const listItems = Array.from(tempDiv.querySelectorAll('li'))
      
      // Diviser la liste en deux colonnes
      const midpoint = Math.ceil(listItems.length / 2)
      const leftItems = listItems.slice(0, midpoint)
      const rightItems = listItems.slice(midpoint)
      
      leftCountries.value = leftItems.map(li => li.outerHTML).join('\n')
      rightCountries.value = rightItems.map(li => li.outerHTML).join('\n')
    }

    // Traiter l'image du fondateur
    if (results['text-5']) {
      const imageData = results['text-5']
      let imageHtml = ''
      
      // Si c'est un objet avec text, utiliser le text
      if (typeof imageData === 'object' && imageData.text) {
        imageHtml = imageData.text
      } 
      // Si c'est directement une string
      else if (typeof imageData === 'string') {
        imageHtml = imageData
      }
      
      // Extraire l'URL de l'image depuis le HTML
      if (imageHtml) {
        const srcRegex = /src=["']([^"']+)["']/i
        const match = imageHtml.match(srcRegex)
        if (match && match[1]) {
          founderImageUrl.value = match[1]
        }
      }
    }

    // Traiter les informations du fondateur (nom et bio)
    if (results['text-6']) {
      const founderData = results['text-6']
      // Le composable retourne maintenant l'objet complet pour les widgets Text avec title
      if (typeof founderData === 'object' && founderData.title) {
        founderName.value = founderData.title
        founderBio.value = founderData.text || ''
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
})

useHead({
  title: 'References - Logic Design Solutions',
  meta: [
    { name: 'description', content: 'Logic Design Solutions - Our References & History' }
  ]
})
</script>
