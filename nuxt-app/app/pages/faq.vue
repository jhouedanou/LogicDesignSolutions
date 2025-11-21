<template>
  <div>
    <section class="page-header">
      <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)"></div>
      <div class="container">
        <div class="page-header__inner">
          <Breadcrumb :items="[
            { label: 'Home', to: '/' },
            { label: faq?.title || 'FAQ' }
          ]" />
          <h2 class="page-header__title">{{ faq?.title }}</h2>
        </div>
      </div>
    </section>

    <section class="faq-page">
      <div class="container">
        <div class="section-title text-center">
          <div class="section-title__tagline-box">
            <p class="section-title__tagline">{{ faq?.tagline }}</p>
          </div>
          <h2 class="section-title__title">{{ faq?.description }}</h2>
        </div>

        <div class="row">
          <div class="col-xl-12">
            <div v-if="loading" class="text-center" style="padding: 60px;">
              <div class="spinner" style="display: inline-block; width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #f02b59; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
              <p style="color: #666; font-size: 16px;">Loading FAQ...</p>
            </div>

            <div v-else-if="error" class="text-center" style="padding: 60px; color: red;">
              <p>Error loading FAQ entries. Please try again later.</p>
            </div>

            <div v-else class="faq-page__single">
              <div class="accrodion-grp" data-grp-name="faq-one-accrodion">
                <div 
                  v-for="(entry, index) in entries" 
                  :key="entry.id" 
                  class="accrodion" 
                  :class="{ active: index === activeIndex }"
                >
                  <div class="accrodion-title" @click="toggleAccordion(index)">
                    <h4>{{ stripHtml(entry.title.rendered) }}</h4>
                  </div>
                  <div class="accrodion-content">
                    <div class="inner">
                      <div v-html="entry.content.rendered"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'

const { entries, loading, error, fetchFAQEntries, stripHtml } = useFAQ()
const activeIndex = ref<number>(0)

const faq = ref({
  title: 'FAQ',
  tagline: 'Frequently Asked Questions',
  description: 'Find answers to common questions'
})

const toggleAccordion = (index: number) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}

onMounted(async () => {
  await fetchFAQEntries()
})

useHead({
  title: 'FAQ - Frequently Asked Questions',
  meta: [
    {
      name: 'description',
      content: 'Frequently asked questions about Logic Design Solutions FPGA Design Services and IP solutions'
    }
  ]
})
</script>

<style scoped>
.faq-page {
  padding: 120px 0 90px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.accrodion-grp {
  margin-top: 50px;
}

.accrodion {
  margin-bottom: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  overflow: hidden;
}

.accrodion-title {
  padding: 25px 30px;
  background: #f8f8f8;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.accrodion-title:hover {
  background: #f02b59;
}

.accrodion-title:hover h4 {
  color: #ffffff;
}

.accrodion-title h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f1f25;
  transition: all 0.3s ease;
  padding-right: 40px;
}

.accrodion-title::after {
  content: '+';
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  font-weight: 300;
  color: #1f1f25;
  transition: all 0.3s ease;
}

.accrodion.active .accrodion-title {
  background: #f02b59;
}

.accrodion.active .accrodion-title h4 {
  color: #ffffff;
}

.accrodion.active .accrodion-title::after {
  content: '-';
  color: #ffffff;
}

.accrodion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accrodion.active .accrodion-content {
  max-height: 500px;
}

.accrodion-content .inner {
  padding: 30px;
  background: #ffffff;
}

.accrodion-content p {
  margin: 0;
  color: #717173;
  line-height: 26px;
}

.page-header {
  position: relative;
  padding: 120px 0 100px;
  text-align: center;
}

.page-header__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.page-header__inner {
  position: relative;
  z-index: 1;
}

.page-header h2 {
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
}

.page-header__title {
  color: #ffffff !important;
}

.thm-breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.thm-breadcrumb li {
  color: #717173;
  font-size: 16px;
}

.thm-breadcrumb a {
  color: #f02b59;
  text-decoration: none;
  transition: all 0.3s ease;
}

.thm-breadcrumb a:hover {
  color: #1f1f25;
}
</style>
