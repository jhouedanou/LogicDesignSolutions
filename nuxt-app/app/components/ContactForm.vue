<template>
  <form @submit.prevent="handleSubmit" class="comment-one__form contact-form-validated" novalidate>
    <div class="row">
      <div class="col-xl-6">
        <div class="comment-form__input-box">
          <input
            v-model="formData.name"
            type="text"
            placeholder="Your Name"
            name="name"
            required
          >
        </div>
      </div>
      <div class="col-xl-6">
        <div class="comment-form__input-box">
          <input
            v-model="formData.email"
            type="email"
            placeholder="Email Address"
            name="email"
            required
          >
        </div>
      </div>
      <div class="col-xl-6">
        <div class="comment-form__input-box">
          <input
            v-model="formData.phone"
            type="text"
            placeholder="Phone Number"
            name="phone"
          >
        </div>
      </div>
      <div class="col-xl-6">
        <div class="comment-form__input-box">
          <input
            v-model="formData.company"
            type="text"
            placeholder="Company Name"
            name="company"
          >
        </div>
      </div>
      <div class="col-xl-12">
        <div class="comment-form__input-box">
          <select v-model="formData.service" class="selectpicker" aria-label="Select Service">
            <option value="">Select Service</option>
            <option value="FPGA Design">FPGA Design</option>
            <option value="IP Development">IP Development</option>
            <option value="Verification Services">Verification Services</option>
            <option value="Consulting">Consulting</option>
            <option value="Technical Support">Technical Support</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="comment-form__input-box text-message-box">
          <textarea
            v-model="formData.message"
            name="message"
            placeholder="Write Message"
            required
          ></textarea>
        </div>
        <div class="comment-form__btn-box">
          <button
            type="submit"
            class="thm-btn comment-form__btn"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}<span class="icon-right-arrow"></span>
          </button>
          <p v-if="successMessage" class="success-message" style="color: green; margin-top: 10px;">
            {{ successMessage }}
          </p>
          <p v-if="errorMessage" class="error-message" style="color: red; margin-top: 10px;">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

const props = defineProps({
  contactEmail: {
    type: String,
    default: 'info@logic-design-solutions.com'
  },
  subject: {
    type: String,
    default: 'New Contact Form Submission'
  }
})

const formData = ref<FormData>({
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = () => {
  // Validate form
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    errorMessage.value = 'Please fill in all required fields'
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    errorMessage.value = 'Please enter a valid email address'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // Create mailto link with form data
  const mailtoBody = `
Name: ${formData.value.name}
Email: ${formData.value.email}
Phone: ${formData.value.phone}
Company: ${formData.value.company}
Service: ${formData.value.service}

Message:
${formData.value.message}
  `.trim()

  const mailtoLink = `mailto:${props.contactEmail}?subject=${encodeURIComponent(props.subject)}&body=${encodeURIComponent(mailtoBody)}`

  // Open mailto
  window.location.href = mailtoLink

  // Reset form
  setTimeout(() => {
    formData.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    }
    successMessage.value = 'Thank you! Your message has been sent to your email client.'
    isSubmitting.value = false
  }, 500)
}
</script>

<style scoped>
.success-message,
.error-message {
  font-size: 14px;
  margin-top: 10px;
}

.error-message {
  color: #dc3545;
}

.success-message {
  color: #28a745;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
