<template>
  <div class="about-page">
    <section class="hero-small">
      <div class="container">
        <h1>About Us</h1>
        <p>Learn more about our mission and values</p>
      </div>
    </section>

    <section class="content">
      <div class="container">
        <div class="about-content">
          <h2>Who We Are</h2>
          <p>
            Logic Design Solutions is a leading digital agency specializing in web development,
            design, and digital strategy. With years of experience and a passion for innovation,
            we help businesses transform their digital presence.
          </p>

          <h2>Our Mission</h2>
          <p>
            To deliver exceptional digital solutions that empower businesses to succeed in
            the modern digital landscape. We combine creativity, technology, and strategic
            thinking to create experiences that matter.
          </p>

          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries and exploring new possibilities</p>
            </div>
            <div class="value-card">
              <h3>Quality</h3>
              <p>Delivering excellence in every project we undertake</p>
            </div>
            <div class="value-card">
              <h3>Collaboration</h3>
              <p>Working closely with clients to achieve shared goals</p>
            </div>
            <div class="value-card">
              <h3>Integrity</h3>
              <p>Building trust through transparency and honesty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About Us',
  meta: [
    { name: 'description', content: 'Learn more about Logic Design Solutions and our mission' }
  ]
})
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

.content {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-content h2 {
  color: #2c3e50;
  margin: 2rem 0 1rem;
  font-size: 2rem;
}

.about-content p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.value-card {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.value-card h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.value-card p {
  margin: 0;
  font-size: 1rem;
}
</style>
