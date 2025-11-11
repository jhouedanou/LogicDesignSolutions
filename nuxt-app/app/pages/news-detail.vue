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
                        <li><a href="/news">News</a></li>
                        <li>-</li>
                        <li>News Details</li>
                    </ul>
                    <h2 class="page-header__title">News Details</h2>
                </div>
            </div>
        </section>
        <!--Page Header End-->

        <!--News Details Start-->
        <section class="news-details">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-7">
                        <div class="news-details__left">
                            <div class="news-details__content">
                                <h3 class="news-details__title-1">Gen 5 NVMe Host IP on AGILEX 7 R-Tile !</h3>
                                
                                <div style="float: left; width: 50%; margin-right: 30px; margin-bottom: 20px; position: relative;">
                                    <img src="/assets/images/news/nvme_host_agilex_7_r_tile-672x1024.jpg" alt="Gen 5 NVMe Host IP" style="width: 100%; height: auto;">
                                    <div class="news-details__date" style="position: absolute; top: 20px; left: 20px; background-color: var(--lds-primary); color: #ffffff; padding: 15px 20px; text-align: center; border-radius: 5px;">
                                        <p style="margin: 0; font-size: 24px; font-weight: bold; line-height: 1.2;">05<br>Sep</p>
                                    </div>
                                </div>
                                
                                <p class="news-details__text-1">France, Gournay sur Marne, September 5th 2025 – Logic Design Solutions is proud to announce the availability of its Gen5 NVME-HOST-IP on AGILEX 7 R-Tile platform. This cutting-edge IP core represents a significant advancement in high-performance storage connectivity for FPGA-based systems.</p>
                                
                                <p class="news-details__text-2">Based in Gournay-sur-Marne, France, the company continues to push the boundaries of FPGA innovation. The newly available IP core supports random, sequential, read/write, and multi-user access, delivering exceptional performance and flexibility at PCIe Gen5 speed. It is designed to simplify development for engineers seeking robust, high-throughput storage connectivity.</p>

                                <h3 class="news-details__title-2">Advanced File System Integration</h3>
                                <p class="news-details__text-2">As an option, the solution integrates a fully operational FAT32/EXFAT file system in RAID0 configuration, enabling advanced data management and redundancy. To help customers get started quickly, Logic Design Solutions provides a series of ready-to-use demonstration projects — including sequential access on one, two, or four disks (with or without FAT32/EXFAT), random access evaluations, and simultaneous read/write operations across multiple drives.</p>

                                <h3 class="news-details__title-2">Flexible Control Options</h3>
                                <p class="news-details__text-2">Each demo can be controlled either by a CPU (with C source code provided) or by a state machine (with VHDL source code included). By combining all of these capabilities into a single IP, Logic Design Solutions eliminates the need for multiple separate IP cores — offering engineers a complete, integrated, and high-performance solution for next-generation FPGA storage applications.</p>

                                <p class="news-details__text-2">For more information about our Gen5 NVMe Host IP on AGILEX 7 R-Tile, please contact our sales team or visit our products page.</p>
                            </div>

                            <div class="news-details__bottom">
                                <p class="news-details__tags">
                                    <span>Tags:</span>
                                    <a href="#">NVMe</a>
                                    <a href="#">Gen5</a>
                                    <a href="#">AGILEX 7</a>
                                    <a href="#">Intel</a>
                                    <a href="#">FPGA</a>
                                </p>
                                <div class="news-details__social-list">
                                    <a href="#"><i class="fab fa-facebook"></i></a>
                                    <a href="#"><i class="fab fa-twitter"></i></a>
                                    <a href="#"><i class="fab fa-linkedin"></i></a>
                                    <a href="#"><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>

                            <div class="news-details__pagenation-box">
                                <ul class="list-unstyled news-details__pagenation">
                                    <li>Previous Article
                                        <a href="#" style="margin-left: 10px;">NVME Host IP on Kintex Ultra Scale Plus</a>
                                    </li>
                                    <li>Next Article
                                        <a href="#" style="margin-left: 10px;">New ARINC 429 IP</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-5">
                        <div class="sidebar">
                            <div class="sidebar__single sidebar__search">
                                <form action="#" class="sidebar__search-form">
                                    <input type="search" placeholder="Search news...">
                                    <button type="submit"><i class="icon-search-1"></i></button>
                                </form>
                            </div>

                            <div class="sidebar__single have-any-project">
                                <div class="have-any-project__bg"
                                    style="background-image: url(/assets/images/backgrounds/contact-us-bg.jpg);">
                                </div>
                                <h3 class="have-any-project__title">Subscribe to
                                    <br> Our Newsletter
                                </h3>
                                <div class="have-any-project__btn-box">
                                    <a href="#" class="have-any-project__btn thm-btn">Subscribe<span
                                            class="icon-right-arrow"></span></a>
                                </div>
                            </div>

                            <div class="sidebar__single sidebar__tags">
                                <h3 class="sidebar__title">Popular Tags</h3>
                                <div class="sidebar__tags-list">
                                    <a href="#">NVMe</a>
                                    <a href="#">FPGA</a>
                                    <a href="#">IP Core</a>
                                    <a href="#">ARINC 429</a>
                                    <a href="#">Gen5</a>
                                    <a href="#">AMD</a>
                                    <a href="#">Intel</a>
                                    <a href="#">Release</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--News Details End-->
    </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Gen 5 NVMe Host IP on AGILEX 7 R-Tile - Logic Design Solutions',
  meta: [
    { name: 'description', content: 'Logic Design Solutions - News Details' }
  ]
})
</script>
