<template>
  <div>
    
<section class="page-header">
            <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/logic-slider-2.webp)">
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <ul class="thm-breadcrumb list-unstyled">
                        <li><a href="/">Home</a></li>
                        <li>-</li>
                        <li>Services</li>
                    </ul>
                    <h2 class="page-header__title">Our Services</h2>
                </div>
            </div>
        </section>
        <!--Page Header End-->

        <!--Services Start-->
        <section class="news-details">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-7">

                        <div class="news-details__content">
                            <h3 class="news-details__title-1">We offer you the best for :</h3>
                            <ul style="list-style: none; padding-left: 0; margin-top: 20px; font-size: 16px; line-height: 1.8;">
                                <li style="margin-bottom: 12px;">» FPGA and IP turnkey design Service.</li>
                                <li style="margin-bottom: 12px;">» FPGA and IP system architectures.</li>
                                <li style="margin-bottom: 12px;">» FPGA and IP specification and implementation.</li>
                                <li style="margin-bottom: 12px;">» IP customization and integration.</li>
                                <li style="margin-bottom: 12px;">» FPGA and IP consulting.</li>
                            </ul>
                        </div>

                    </div>

                    <!-- Sidebar removed -->
                </div>
            </div>
        </section>
        <!--Services End-->

        <!--Brand Two Start-->
        <BrandPartners />
        <!--Brand Two End-->
    </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Services - Logic Design Solutions',
  meta: [
    { name: 'description', content: 'Logic Design Solutions - FPGA Design Services & IP Solutions' }
  ]
})
</script>
