<template>
  <div class="page-wrapper">
    <section class="page-header">
      <div class="page-header__bg" style="background-image: url(/assets/images/backgrounds/page-header-bg.jpg);"></div>
      <div class="container">
        <div class="page-header__inner">
          <h2>{{ faq?.title }}</h2>
          <ul class="thm-breadcrumb list-unstyled">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><span>/</span></li>
            <li>{{ faq?.title }}</li>
          </ul>
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
            <div class="faq-page__single">
              <div class="accrodion-grp" data-grp-name="faq-one-accrodion">
                <div v-for="(question, index) in faq?.questions" :key="question.id" class="accrodion" :class="{ active: index === 0 }">
                  <div class="accrodion-title">
                    <h4>{{ question.question }}</h4>
                  </div>
                  <div class="accrodion-content">
                    <div class="inner">
                      <p>{{ question.answer }}</p>
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
import { useHead } from '#imports'

const { faq } = useContent()

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
  color: #1f1f25;
  margin-bottom: 20px;
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
