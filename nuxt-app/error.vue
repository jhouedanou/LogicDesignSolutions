<template>
  <div class="error-page">
    <div class="container">
      <div class="error-content">
        <h1 class="error-code">{{ error.statusCode }}</h1>
        <h2>{{ errorTitle }}</h2>
        <p>{{ error.message }}</p>
        <div class="actions">
          <NuxtLink to="/" class="btn-primary">
            Retour à l'accueil
          </NuxtLink>
          <button @click="handleError" class="btn-secondary">
            Réessayer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

const errorTitle = computed(() => {
  if (props.error.statusCode === 404) {
    return 'Page non trouvée'
  }
  return 'Une erreur est survenue'
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
}

.container {
  max-width: 600px;
  text-align: center;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1;
  text-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.error-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.error-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
  cursor: pointer;
  border: 2px solid white;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 5rem;
  }

  .error-content h2 {
    font-size: 1.5rem;
  }

  .error-content p {
    font-size: 1rem;
  }
}
</style>
