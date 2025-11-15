<template>
  <div>

<section class="page-header">
            <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)">
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <Breadcrumb />
                    <h2 class="page-header__title">{{ profileData.page_title || 'Company Profile' }}</h2>
                </div>
            </div>
        </section>
        <!--Page Header End-->

        <!--Company Profile Start-->
        <section class="news-details">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-7">
                        <div class="news-details__left">
                            <div class="news-details__img-box">
                                <div class="news-details__img">
                                    <img :src="profileData.intro_image || '/assets/images/resources/im1.jpeg'" alt="" style="border-radius: 10px;">
                                </div>
                                <div class="news-details__tag">
                                    <span v-for="tag in introTags" :key="tag" style="font-size: 29px;">{{ tag }}</span>
                                </div>
                            </div>
                            <div class="news-details__content">
                                <h3 class="news-details__title-1">
                                    {{ profileData.intro_title || 'FPGA Design Excellence Since 1994' }}
                                </h3>
                                <p class="news-details__text-1"><span>Company Profile</span> / Founded 1994 / 30+ Years Experience</p>

                                <p class="news-details__text-2">{{ profileData.intro_description_1 }}</p>

                                <p class="news-details__text-3">{{ profileData.intro_description_2 }}</p>

                                <h3 class="news-details__title-2">Our Core Competencies</h3>
                                <p class="news-details__text-4">{{ profileData.competencies_description }}</p>

                                <div class="news-details__img-and-content">
                                    <div class="row">
                                        <div class="col-xl-6">
                                            <div class="news-details__content-img-left">
                                                <div class="news-details__content-img">
                                                    <img :src="profileData.innovation_image || '/assets/images/resources/about-two-img-1.jpg'" alt="">
                                                </div>
                                                <p class="news-details__content-img-sub-title">{{ profileData.innovation_subtitle || 'Innovation & Technology Leadership' }}</p>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="news-details__img-content">
                                                <p class="news-details__img-text-1">{{ profileData.innovation_text_1 }}</p>
                                                <p class="news-details__img-text-2">{{ profileData.innovation_text_2 }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3 class="news-details__title-2">Our Product Portfolio</h3>
                                <p class="news-details__text-5">{{ profileData.portfolio_description }}</p>

                                <ul class="news-details__points list-unstyled">
                                    <li v-for="point in portfolioPoints" :key="point">
                                        <div class="news-details__points-shape"></div>
                                        <p>{{ point }}</p>
                                    </li>
                                </ul>

                                <h3 class="news-details__title-3">Quality & Reliability</h3>
                                <p class="news-details__text-7">{{ profileData.quality_description }}</p>

                                <div class="news-details__quote-box">
                                    <div class="news-details__quote">
                                        <span class="icon-text"></span>
                                    </div>
                                    <div class="news-details__quote-content">
                                        <p>{{ profileData.quote_text }}</p>
                                        <span>{{ profileData.quote_author || 'Logic Design Solutions Team' }}</span>
                                    </div>
                                </div>

                                <h3 class="news-details__title-4">Global Reach, Local Support</h3>
                                <p class="news-details__text-8">{{ profileData.closing_description_1 }}</p>

                                <p class="news-details__text-9">{{ profileData.closing_description_2 }}</p>

                                <div class="news-details__tag-box">
                                    <div class="icon">
                                        <span class="icon-tag"></span>
                                    </div>
                                    <a v-for="(tag, index) in closingTags" :key="tag" href="#">
                                        {{ tag }}<span v-if="index < closingTags.length - 1">,</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-5">
                        <div class="sidebar">
                            <!-- Search, Quick Links and Statistics removed -->
                            <ClientOnly>
                                <HaveAnyProject 
                                  title="Have Any"
                                  subtitle="Project?"
                                  cta="Contact Us"
                                  buttonText="Contact Us"
                                />
                            </ClientOnly>
                            <!-- Technologies section removed -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--Company Profile End-->
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '#imports'

interface ProfileData {
  page_title: string
  meta_description: string
  intro_image: string
  intro_tags: string
  intro_title: string
  intro_description_1: string
  intro_description_2: string
  competencies_description: string
  innovation_image: string
  innovation_subtitle: string
  innovation_text_1: string
  innovation_text_2: string
  portfolio_description: string
  portfolio_points: string
  quality_description: string
  quote_text: string
  quote_author: string
  closing_description_1: string
  closing_description_2: string
  closing_tags: string
  [key: string]: any
}

const profileData = ref<ProfileData>({
  page_title: '',
  meta_description: '',
  intro_image: '',
  intro_tags: '',
  intro_title: '',
  intro_description_1: '',
  intro_description_2: '',
  competencies_description: '',
  innovation_image: '',
  innovation_subtitle: '',
  innovation_text_1: '',
  innovation_text_2: '',
  portfolio_description: '',
  portfolio_points: '',
  quality_description: '',
  quote_text: '',
  quote_author: '',
  closing_description_1: '',
  closing_description_2: '',
  closing_tags: ''
})

const introTags = computed(() => {
  return profileData.value.intro_tags
    .split(',')
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag.length > 0)
})

const portfolioPoints = computed(() => {
  return profileData.value.portfolio_points
    .split('\n')
    .map((point: string) => point.trim())
    .filter((point: string) => point.length > 0)
})

const closingTags = computed(() => {
  return profileData.value.closing_tags
    .split(',')
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag.length > 0)
})

// Fetch profile data from API
const fetchProfileData = async () => {
  try {
    const response = await $fetch<{ profile: Array<{ content: ProfileData }> }>('https://logic-design-solutions.com/wp-json/custom/v1/widgets')
    if (response?.profile && response.profile.length > 0) {
      const profileContent = response.profile[0].content
      Object.assign(profileData.value, profileContent)
    }
  } catch (error) {
    console.error('Error fetching profile data:', error)
  }
}

onMounted(() => {
  fetchProfileData()
})

useHead({
  title: 'Company Profile - Logic Design Solutions',
  meta: [
    { name: 'description', content: 'Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP' }
  ]
})
</script>
