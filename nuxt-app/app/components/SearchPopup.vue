<template>
  <div class="search-popup" :class="{ active: isOpen }">
    <div class="search-popup__overlay search-toggler" @click="closeSearch"></div>
    <div class="search-popup__content">
      <form @submit.prevent="handleSearch">
        <label for="search" class="sr-only">Rechercher</label>
        <input 
          id="search" 
          v-model="searchQuery" 
          type="text" 
          placeholder="Rechercher..." 
          @input="onSearchInput"
          autocomplete="off"
        />
        <button type="submit" aria-label="search submit" class="thm-btn">
          <i class="fas fa-search"></i>
        </button>
      </form>
      
      <!-- Résultats de recherche -->
      <div v-if="searchQuery.length >= 2" class="search-results">
        <div v-if="isSearching" class="search-results__loading">
          Recherche en cours...
        </div>
        
        <div v-else-if="filteredResults.length > 0" class="search-results__list">
          <a 
            v-for="result in filteredResults" 
            :key="result.id" 
            :href="result.url" 
            class="search-results__item"
            @click="closeSearch"
          >
            <span class="search-results__type">{{ result.type }}</span>
            <span class="search-results__title">{{ result.title }}</span>
          </a>
        </div>
        
        <div v-else class="search-results__empty">
          Aucun résultat trouvé pour "{{ searchQuery }}"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface SearchItem {
  id: number | string
  title: string
  url: string
  type: 'Product' | 'News' | 'Page'
}

const searchQuery = ref('')
const isOpen = ref(false)
const isSearching = ref(false)
const allItems = ref<SearchItem[]>([])

// Pages statiques
const staticPages: SearchItem[] = [
  { id: 'home', title: 'Home', url: '/', type: 'Page' },
  { id: 'profiles', title: 'Profiles', url: '/profiles', type: 'Page' },
  { id: 'services', title: 'Services', url: '/services', type: 'Page' },
  { id: 'products', title: 'Products', url: '/products', type: 'Page' },
  { id: 'news', title: 'News', url: '/news', type: 'Page' },
  { id: 'references', title: 'References', url: '/references', type: 'Page' },
  { id: 'contact', title: 'Contact', url: '/contact', type: 'Page' },
  { id: 'faq', title: 'FAQ', url: '/faq', type: 'Page' }
]

// Filtrer les résultats basés sur la recherche
const filteredResults = computed(() => {
  if (searchQuery.value.length < 2) return []
  
  const query = searchQuery.value.toLowerCase()
  return allItems.value
    .filter(item => item.title.toLowerCase().includes(query))
    .slice(0, 10) // Limiter à 10 résultats
})

// Charger les données depuis les APIs
const loadSearchData = async () => {
  try {
    // Charger les produits
    const productsResponse = await fetch(
      'https://api.logic-design-solutions.com/wp-json/wp/v2/product?per_page=100&_fields=id,title,slug'
    )
    if (productsResponse.ok) {
      const products = await productsResponse.json()
      const productItems: SearchItem[] = products.map((p: any) => ({
        id: p.id,
        title: p.title?.rendered || p.title || 'Sans titre',
        url: `/products?product=${p.slug}`,
        type: 'Product' as const
      }))
      allItems.value = [...allItems.value, ...productItems]
    }

    // Charger les posts/news
    const postsResponse = await fetch(
      'https://api.logic-design-solutions.com/wp-json/wp/v2/posts?per_page=100&_fields=id,title,slug'
    )
    if (postsResponse.ok) {
      const posts = await postsResponse.json()
      const postItems: SearchItem[] = posts.map((p: any) => ({
        id: p.id,
        title: p.title?.rendered || p.title || 'Sans titre',
        url: `/news/${p.slug}`,
        type: 'News' as const
      }))
      allItems.value = [...allItems.value, ...postItems]
    }

    // Ajouter les pages statiques
    allItems.value = [...allItems.value, ...staticPages]
    
  } catch (error) {
    console.error('Erreur lors du chargement des données de recherche:', error)
    // En cas d'erreur, au moins avoir les pages statiques
    allItems.value = [...staticPages]
  }
}

const onSearchInput = () => {
  // La recherche se fait en temps réel via le computed
}

const handleSearch = () => {
  const firstResult = filteredResults.value[0]
  if (firstResult) {
    // Naviguer vers le premier résultat
    window.location.href = firstResult.url
    closeSearch()
  }
}

const closeSearch = () => {
  isOpen.value = false
  searchQuery.value = ''
}

const openSearch = () => {
  isOpen.value = true
}

// Exposer les méthodes pour le parent
defineExpose({
  openSearch,
  closeSearch
})

onMounted(() => {
  loadSearchData()
  
  // Écouter les clics sur les togglers de recherche
  document.querySelectorAll('.search-toggler').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      if (isOpen.value) {
        closeSearch()
      } else {
        openSearch()
      }
    })
  })
})
</script>

<style scoped>
.search-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 150px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.search-popup.active {
  opacity: 1;
  visibility: visible;
}

.search-popup__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
}

.search-popup__content {
  position: relative;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
  z-index: 1;
}

.search-popup__content form {
  display: flex;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
}

.search-popup__content input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  font-size: 16px;
  outline: none;
}

.search-popup__content .thm-btn {
  padding: 15px 25px;
  border: none;
  cursor: pointer;
}

.search-results {
  margin-top: 10px;
  background: #fff;
  border-radius: 5px;
  max-height: 400px;
  overflow-y: auto;
}

.search-results__loading,
.search-results__empty {
  padding: 20px;
  text-align: center;
  color: #666;
}

.search-results__list {
  padding: 10px 0;
}

.search-results__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  text-decoration: none;
  color: #333;
  transition: background 0.2s;
}

.search-results__item:hover {
  background: #f5f5f5;
}

.search-results__type {
  font-size: 11px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 3px;
  background: #e8e8e8;
  color: #666;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

.search-results__item:hover .search-results__type {
  background: #ff6b35;
  color: #fff;
}

.search-results__title {
  flex: 1;
  font-size: 14px;
}
</style>
