import { ref, computed } from 'vue';

const site = { "siteName": "LogicDesignSolutions", "tagline": "FPGA & IP Design Experts", "callLabel": "Call Us", "phone": "+33 (0)1 45 92 24 47", "contactButtonText": "Contact Us", "email": "contact@logic-design-solutions.com" };
const navigation = { "mainMenu": [{ "label": "HOME", "path": "/" }, { "label": "PROFILES", "path": "/profiles" }, { "label": "PRODUCTS", "path": "/products" }, { "label": "SERVICES", "path": "/services" }, { "label": "NEWS", "path": "/news" }, { "label": "REFERENCES", "path": "/references" }, { "label": "CONTACT", "path": "/contact" }], "footerMenu": [{ "label": "Profiles", "path": "/profiles" }, { "label": "Products", "path": "/products" }, { "label": "FAQ", "path": "/faq" }] };
const hero = { "title": "Discover our product lines and IP solutions", "subtitle": "FPGA Design Services", "cta": "Let's Work Together", "slides": [{ "id": 1, "subtitle": "FPGA Design Services", "title": "Discover our <br> product lines <br> and IP solutions", "cta": "Let's Work Together", "image": "/assets/images/backgrounds/logic-slider-1.png" }, { "id": 2, "subtitle": "FPGA Design Services", "title": "Discover our <br> product lines <br> and IP solutions", "cta": "Let's Work Together", "image": "/assets/images/backgrounds/logic-slider-2.png" }, { "id": 3, "subtitle": "FPGA Design Services", "title": "Discover our <br> product lines <br> and IP solutions", "cta": "Let's Work Together", "image": "/assets/images/backgrounds/logic-slider-3.png" }] };
const about = { "tagline": "About Us", "title": "We help to get Solutions!", "contentTitle": "professional activities to produce and sell goods or services for profit.", "description": "Logic Design Solutions provides FPGA Design Services, NVMe IP, SATA IP, RECORDER IP, ARINC 429 IP, and DO254 methodology to FPGA customers. We engage our self to be your high standard quality solutions provider for FPGA IP and Design Services.", "features": [{ "id": 1, "text": "Logic Design Solutions has a deep knowledge of FPGA & IP design..." }, { "id": 2, "text": "Logic Design Solutions develops IP for FPGA, like NVMe IP, SATA IP, Recorder IP..." }, { "id": 3, "text": "Customers' Logic Design Solutions are provided with a phone hotline and e-mail support to answer..." }, { "id": 4, "text": "Logic Design Solutions' IP are an excellent value. Our competitive pricing enables customers to decide..." }], "award": "Since 1994", "companyName": "Logic Design Solutions", "cta": "Learn About Us" };
const news = { "tagline": "News and articles", "title": "Read our latest news and product announcements", "articles": [{ "id": 1, "title": "Gen 5 NVMe Host IP on AGILEX 7 R-Tile !", "description": "France, Gournay sur Marne, September 5th 2025 – The Gen5 NVME-HOST-IP on AGILEX 7 R-Tile...", "cta": "Read More", "image": "/assets/images/news/news-1.jpg" }, { "id": 2, "title": "NVME Host IP on Kintex Ultra Scale Plus !", "description": "France, Gournay sur Marne, November 14th 2024 – The NVME-HOST-IP on Kintex Ultra Scale Plus...", "cta": "Read More", "image": "/assets/images/news/news-2.png" }, { "id": 3, "title": "New ARINC 429 IP", "description": "France, Gournay sur Marne, November 4th 2024 – The new ARINC 429 IP from Logic Design Solutions...", "cta": "Read More", "image": "/assets/images/news/news-3.jpg" }, { "id": 4, "title": "Gen4 NVME Host IP on Artix Ultra Scale Plus !", "description": "France, Gournay sur Marne, November 4th 2024 – The Gen4 NVME-HOST-IP on Artix Ultra Scale Plus...", "cta": "Read More", "image": "/assets/images/news/news-4.jpg" }] };
const brands = { "title": "Trusted Technology Partners", "description": "Logic Design Solutions collaborates with leading technology providers to deliver cutting-edge FPGA and IP solutions", "partners": ["AMD Embedded Select Partner", "Intel Partner", "Technology Partner"] };
const footer = { "copyright": "Copyright © Logic Design Solution All Rights Reserved - Design by Digital Consulting", "address": "105 Boulevard de la Résistance, 93460 Gournay sur Marne, France", "socialLinks": [{ "name": "Facebook", "icon": "facebook", "url": "#" }, { "name": "Twitter", "icon": "twitter", "url": "#" }, { "name": "LinkedIn", "icon": "linkedin", "url": "#" }, { "name": "Instagram", "icon": "instagram", "url": "#" }] };
const faq = { "title": "FAQ", "tagline": "Frequently Asked Questions", "description": "Questions & Answers", "questions": [{ "id": 1, "question": "What services does Logic Design Solutions provide?", "answer": "Logic Design Solutions provides FPGA Design Services, NVMe IP, SATA IP, RECORDER IP, ARINC 429 IP, and DO254 methodology to FPGA customers. We engage ourselves to be your high standard quality solutions provider for FPGA IP and Design Services." }, { "id": 2, "question": "Which FPGA platforms do you support?", "answer": "We support major FPGA platforms including Intel (Altera) and AMD (Xilinx) devices. Our IPs are compatible with various FPGA families including Agilex, Stratix, Cyclone, Kintex UltraScale+, Artix UltraScale+, and more." }, { "id": 3, "question": "What is your IP licensing model?", "answer": "We offer flexible licensing options including perpetual licenses, project-based licenses, and evaluation licenses. Please contact us for detailed pricing and licensing information tailored to your specific needs." }, { "id": 4, "question": "Do you provide technical support?", "answer": "Yes, we provide comprehensive technical support including phone hotline and email support. Our customers receive dedicated assistance to ensure successful integration and deployment of our IP solutions." }, { "id": 5, "question": "What is DO-254 compliance?", "answer": "DO-254 is a guidance document for the design assurance of airborne electronic hardware. Logic Design Solutions follows DO-254 methodology to ensure that our FPGA designs meet the highest standards required for aerospace and defense applications." }, { "id": 6, "question": "How can I get started with your IP solutions?", "answer": "Getting started is easy! Simply contact us through our contact page or call us at +33 (0)1 45 92 24 47. Our team will discuss your requirements and provide you with the appropriate IP solution, documentation, and support to begin your project." }] };
const contentData = {
  site,
  navigation,
  hero,
  about,
  news,
  brands,
  footer,
  faq
};
const useContent = () => {
  const content = ref(contentData);
  const pending = ref(false);
  const error = ref(null);
  const site2 = computed(() => content.value?.site);
  const navigation2 = computed(() => content.value?.navigation);
  const hero2 = computed(() => content.value?.hero);
  const about2 = computed(() => content.value?.about);
  const news2 = computed(() => content.value?.news);
  const brands2 = computed(() => content.value?.brands);
  const footer2 = computed(() => content.value?.footer);
  const faq2 = computed(() => content.value?.faq);
  return {
    content,
    pending,
    error,
    site: site2,
    navigation: navigation2,
    hero: hero2,
    about: about2,
    news: news2,
    brands: brands2,
    footer: footer2,
    faq: faq2
  };
};

export { useContent as u };
//# sourceMappingURL=useContent-C26r8GDb.mjs.map
