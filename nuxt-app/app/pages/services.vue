<template>
  <div>
    
<section class="page-header">
            <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)">
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <Breadcrumb :items="[
                        { label: 'Home', to: '/' },
                        { label: 'Services' }
                    ]" />
                    <h2 class="page-header__title">Our Services</h2>
                </div>
            </div>
        </section>
        <!--Page Header End-->

        <!--Services Start-->
        <section class="news-details">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-7">

                        <div class="news-details__content">
                            <ClientOnly>
                                <h3 v-if="servicesTitle" class="news-details__title-1">{{ servicesTitle }}</h3>
                                <div v-if="servicesText" v-html="servicesText" style="margin-top: 20px; font-size: 16px; line-height: 1.8;"></div>
                            </ClientOnly>
                        </div>

                    </div>

                    <!-- Sidebar removed -->
                </div>
            </div>
        </section>
        <!--Services End-->

        <!--Brand Two Start-->
        <BrandPartners />
        <!--Brand Two End-->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'

const { fetchWidgetContent } = useWidgets()
const servicesTitle = ref<string>('')
const servicesText = ref<string>('')

onMounted(async () => {
  try {
    // Charger le widget text-8 depuis la sidebar "services"
    const servicesData = await fetchWidgetContent('text-8', 'services')
    
    if (servicesData && typeof servicesData === 'object' && servicesData.title) {
      servicesTitle.value = servicesData.title
      servicesText.value = servicesData.text || ''
    }
  } catch (error) {
    console.error('Erreur lors du chargement du widget services:', error)
  }
})

useHead({
  title: 'Services - Logic Design Solutions',
  meta: [
    { name: 'description', content: 'Logic Design Solutions - FPGA Design Services & IP Solutions' }
  ]
})
</script>
