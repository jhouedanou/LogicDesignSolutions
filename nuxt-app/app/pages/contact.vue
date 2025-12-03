<template>
  <div>
    <section class="page-header">
            <div class="page-header-bg" style="background-image: url(/assets/images/backgrounds/contact-header-bg.png)">
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <Breadcrumb />
                    <h2 class="page-header__title">Contact Us</h2>
                </div>
            </div>
        </section>
        <!--Page Header End-->

        <!--Contact Page Start-->
        <section class="contact-page">
            <div class="container">
                <div class="section-title text-center" style="margin-bottom: 50px;">
                    <div class="section-title__tagline-box">
                        <p class="section-title__tagline">Get In Touch</p>
                    </div>
                    <h2 class="section-title__title">Let's Work Together</h2>
                </div>
                <div class="row">
                    <div class="col-xl-8 col-lg-7">
                        <div class="contact-page__form">
                            <ContactForm
                                :contactEmail="'info@logic-design-solutions.com'"
                                :subject="'New Contact Form Submission from Logic Design Solutions'"
                            />
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-5">
                        <div class="contact-page__right">
                            <div class="contact-page__info">
                                <h3 class="contact-page__info-title">Contact Information</h3>
                                <ul class="contact-page__info-list list-unstyled">
                                    <li>
                                        <div class="icon">
                                            <span class="icon-telephone-call"></span>
                                        </div>
                                        <div class="content">
                                            <p>Phone</p>
                                            <h4 style="font-size: 16px;"><a href="tel:+33145922447">+33 (0)1 45 92 24 47</a></h4>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <span class="icon-email"></span>
                                        </div>
                                        <div class="content">
                                            <p>Email</p>
                                            <h4 style="font-size: 16px;"><a href="mailto:info@logic-design-solutions.com">info@logic-design-solutions.com</a></h4>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <span class="icon-location"></span>
                                        </div>
                                        <div class="content">
                                            <p>Address</p>
                                            <h4 style="font-size: 14px; line-height: 1.8;">Logic Design Solutions<br>
                                            106 Boulevard de la Résistance<br>
                                            93460 Gournay sur Marne<br>
                                            France</h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="contact-page__social">
                                <h3 class="contact-page__social-title">Follow Us</h3>
                                <div class="contact-page__social-box" style="display: flex; gap: 15px;">
                                    <a href="#" style="font-size: 28px;"><i class="fab fa-facebook"></i></a>
                                    <a href="#" style="font-size: 28px;"><i class="fab fa-twitter"></i></a>
                                    <a href="#" style="font-size: 28px;"><i class="fab fa-linkedin"></i></a>
                                    <a href="#" style="font-size: 28px;"><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--Contact Page End-->

        <!--Google Map Start-->
        <section class="google-map-one">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.8461926120654!2d2.5707!3d48.8611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e612b1e7e1e1e1%3A0x1e1e1e1e1e1e1e1e!2s106%20Boulevard%20de%20la%20R%C3%A9sistance%2C%2093460%20Gournay-sur-Marne%2C%20France!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                class="google-map__one" allowfullscreen></iframe>
        </section>
        <!--Google Map End-->
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Contact Us - Logic Design Solutions',
  meta: [
    { name: 'description', content: 'Contact Logic Design Solutions - Get in touch with our FPGA experts' }
  ]
})
</script>

