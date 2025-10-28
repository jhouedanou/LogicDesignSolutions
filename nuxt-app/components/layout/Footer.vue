<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ footerData.company.name }}</h3>
          <p>{{ footerData.company.description }}</p>
        </div>

        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li v-for="link in footerData.quickLinks" :key="link.path">
              <NuxtLink :to="link.path">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contact</h4>
          <ul class="contact-info">
            <li>{{ footerData.contact.email }}</li>
            <li>{{ footerData.contact.phone }}</li>
            <li>{{ footerData.contact.address }}</li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a v-for="social in footerData.social" :key="social.name"
               :href="social.url"
               target="_blank"
               rel="noopener noreferrer">
              {{ social.name }}
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} {{ footerData.company.name }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerData = ref({
  company: {
    name: 'Your Company',
    description: 'Building innovative solutions for tomorrow.'
  },
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' }
  ],
  contact: {
    email: 'info@company.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, Country'
  },
  social: [
    { name: 'Facebook', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Instagram', url: '#' }
  ]
})
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: #fff;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: #3498db;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #3498db;
}

.contact-info li {
  color: #ecf0f1;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #34495e;
  color: #95a5a6;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
