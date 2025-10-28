<template>
  <div class="home-page">
    <section class="hero">
      <div class="container">
        <h1>Welcome to Logic Design Solutions</h1>
        <p>Building innovative digital solutions with cutting-edge technology</p>
        <div class="cta-buttons">
          <NuxtLink to="/services" class="btn btn-primary">Our Services</NuxtLink>
          <NuxtLink to="/contact" class="btn btn-secondary">Get in Touch</NuxtLink>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>What We Do</h2>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'Logic Design Solutions - Building innovative digital solutions' }
  ]
})

const features = ref([
  {
    icon: '🎨',
    title: 'Creative Design',
    description: 'Beautiful, modern designs that captivate your audience'
  },
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Responsive, high-performance web applications'
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile solutions'
  },
  {
    icon: '🚀',
    title: 'Digital Strategy',
    description: 'Strategic planning for digital transformation'
  }
])
</script>

<style scoped>
.home-page {
  width: 100%;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

.features {
  padding: 5rem 0;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background: #f8f9fa;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .features h2 {
    font-size: 2rem;
  }
}
</style>
