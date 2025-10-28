<template>
  <div class="contact-page">
    <section class="hero-small">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Let's Talk</h2>
            <p>Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

            <div class="info-items">
              <div class="info-item">
                <div class="icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>contact@logicdesignsolutions.com</p>
                </div>
              </div>

              <div class="info-item">
                <div class="icon">📱</div>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div class="info-item">
                <div class="icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>123 Innovation Drive, Tech City, TC 12345</p>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                />
              </div>

              <div class="form-group">
                <label for="subject">Subject *</label>
                <input
                  v-model="form.subject"
                  type="text"
                  id="subject"
                  required
                />
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  v-model="form.message"
                  id="message"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn-submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>

              <p v-if="submitMessage" :class="submitStatus">{{ submitMessage }}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Contact',
  meta: [
    { name: 'description', content: 'Get in touch with Logic Design Solutions' }
  ]
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    submitMessage.value = 'Thank you! Your message has been sent successfully.'
    submitStatus.value = 'success'

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    submitMessage.value = 'Oops! Something went wrong. Please try again.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
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

.contact-content {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.contact-info > p {
  color: #7f8c8d;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-item .icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-item h4 {
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.info-item p {
  color: #7f8c8d;
  margin: 0;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success {
  color: #27ae60;
  margin-top: 1rem;
  text-align: center;
}

.error {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
