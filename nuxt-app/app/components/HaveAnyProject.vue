<template>
  <div class="sidebar__single have-any-project">
    <div class="have-any-project__bg"
      :style="bgImageUrl ? `background-image: url(${bgImageUrl});` : 'background-image: url(/assets/images/backgrounds/contact-us-bg.jpg);'">
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
        <template v-else>
          {{ title || 'Need Custom' }}
          <br> {{ subtitle || 'IP Solution?' }}
          <br> {{ cta || 'Contact Us' }}
        </template>
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
      
      if (widgetData && typeof widgetData === 'string') {
        // Extraire l'URL de l'image depuis le HTML
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/i
        const imgMatch = widgetData.match(imgRegex)
        if (imgMatch && imgMatch[1]) {
          bgImageUrl.value = imgMatch[1]
        }
        
        // Extraire le contenu du paragraphe
        const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/i
        const pMatch = widgetData.match(pRegex)
        if (pMatch && pMatch[1]) {
          titleContent.value = pMatch[1]
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement du widget sidebar:', error)
    }
  }
})
</script>
