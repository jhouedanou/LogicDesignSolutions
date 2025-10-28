<template>
  <div class="services-page">
    <section class="hero-small">
      <div class="container">
        <h1>Our Services</h1>
        <p>Comprehensive digital solutions for your business</p>
      </div>
    </section>

    <section class="services">
      <div class="container">
        <div class="services-grid">
          <div v-for="service in services" :key="service.title" class="service-card">
            <div class="service-icon">{{ service.icon }}</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Services',
  meta: [
    { name: 'description', content: 'Explore our comprehensive digital services' }
  ]
})

const services = ref([
  {
    icon: '🎨',
    title: 'Web Design',
    description: 'Beautiful, user-friendly designs that convert',
    features: ['UI/UX Design', 'Responsive Design', 'Brand Identity', 'Prototyping']
  },
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Robust, scalable web applications',
    features: ['Frontend Development', 'Backend Development', 'API Integration', 'Performance Optimization']
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps',
    features: ['iOS Apps', 'Android Apps', 'React Native', 'Flutter']
  },
  {
    icon: '🛒',
    title: 'E-commerce',
    description: 'Complete online store solutions',
    features: ['Store Setup', 'Payment Integration', 'Inventory Management', 'Analytics']
  },
  {
    icon: '🚀',
    title: 'Digital Marketing',
    description: 'Strategic marketing to grow your business',
    features: ['SEO', 'Social Media', 'Content Marketing', 'PPC Advertising']
  },
  {
    icon: '🔧',
    title: 'Maintenance & Support',
    description: 'Ongoing support for your digital assets',
    features: ['Bug Fixes', 'Updates', 'Monitoring', '24/7 Support']
  }
])
</script>

<style scoped>
.hero-small {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-small h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.services {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.service-card p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  padding: 0.5rem 0;
  color: #555;
  border-bottom: 1px solid #eee;
}

.service-features li:last-child {
  border-bottom: none;
}

.service-features li:before {
  content: '✓ ';
  color: #667eea;
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>
