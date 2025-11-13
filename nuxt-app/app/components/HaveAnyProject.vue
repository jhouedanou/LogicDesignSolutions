<template>
  <div class="sidebar__single have-any-project">
    <div class="have-any-project__bg"
      :style="bgImageUrl ? `background-image: url(${bgImageUrl});` : ''">
    </div>
    <ClientOnly>
      <NuxtImg
        v-if="bgImageUrl"
        :src="bgImageUrl"
        alt="Contact Background"
        width="1248"
        height="1088"
        loading="lazy"
        style="position: absolute; width: 100%; height: 100%; object-fit: cover; top: 0; left: 0; z-index: -1; opacity: 0;"
      />
    </ClientOnly>
    <h3 class="have-any-project__title">
      <ClientOnly>
        <span v-if="titleContent" v-html="titleContent"></span>
      </ClientOnly>
    </h3>
    <div class="have-any-project__btn-box">
      <NuxtLink :to="buttonLink || '/contact'" class="have-any-project__btn thm-btn">
        {{ buttonText || 'Get Quote' }}<span class="icon-right-arrow"></span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  cta?: string
  buttonText?: string
  buttonLink?: string
  loadFromApi?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Need Custom',
  subtitle: 'IP Solution?',
  cta: 'Contact Us',
  buttonText: 'Get Quote',
  buttonLink: '/contact',
  loadFromApi: true
})

const { fetchWidgetContent } = useWidgets()
const titleContent = ref<string>('')
const bgImageUrl = ref<string>('')

onMounted(async () => {
  if (props.loadFromApi) {
    try {
      const widgetData = await fetchWidgetContent('text-7', 'sidebar-right')
      
      // Le widget text-7 peut être un objet avec une propriété 'text' ou une string
      let htmlContent = ''
      if (typeof widgetData === 'object' && widgetData.text) {
        htmlContent = widgetData.text
      } else if (typeof widgetData === 'string') {
        htmlContent = widgetData
      }
      
      if (htmlContent) {
        // Extraire l'URL de l'image depuis le HTML
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/i
        const imgMatch = htmlContent.match(imgRegex)
        if (imgMatch && imgMatch[1]) {
          bgImageUrl.value = imgMatch[1]
        }
        
        // Extraire le contenu texte en enlevant TOUTES les balises img et p qui contiennent des images
        let textContent = htmlContent
          // Enlever les balises <p> qui contiennent des images
          .replace(/<p[^>]*>[\s\S]*?<img[\s\S]*?<\/p>/gi, '')
          // Enlever toutes les balises <img> restantes
          .replace(/<img[^>]*>/gi, '')
          // Enlever les balises <p> vides
          .replace(/<p[^>]*>\s*<\/p>/gi, '')
        
        if (textContent && textContent.trim()) {
          // Nettoyer: supprimer les \r\n au début et à la fin, puis convertir les \r\n internes en <br>
          const cleanText = textContent.trim()
            .replace(/^\s+|\s+$/g, '') // Enlever espaces début/fin
            .replace(/\r\n\r\n/g, '<br>') // Double saut = <br>
            .replace(/\r\n/g, '<br>') // Simple saut = <br>
            .replace(/\n\n/g, '<br>') // Double \n = <br>
            .replace(/\n/g, '<br>') // Simple \n = <br>
          
          titleContent.value = cleanText
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement du widget sidebar:', error)
    }
  }
})
</script>
