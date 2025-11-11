import { ref } from 'vue';

const useContent = () => {
  const hero = ref({
    title: "Innovative FPGA Solutions",
    subtitle: "Custom Digital Design Services",
    description: "Expert FPGA design and verification services",
    cta: "Get Started",
    image: "/assets/images/hero-bg.jpg"
  });
  const about = ref({
    tagline: "About Us",
    title: "Leading Provider of FPGA Design Solutions",
    contentTitle: "Excellence in Digital Design",
    description: "We provide cutting-edge FPGA design services and IP solutions for various industries.",
    features: [
      { id: 1, title: "Custom FPGA Design", description: "Tailored solutions for your needs" },
      { id: 2, title: "IP Core Development", description: "Reusable and optimized IP cores" },
      { id: 3, title: "Verification Services", description: "Comprehensive testing and validation" },
      { id: 4, title: "Technical Support", description: "24/7 expert assistance" }
    ],
    cta: "Learn More",
    award: "Award Winning",
    companyName: "Logic Design Solutions"
  });
  const news = ref([]);
  const brands = ref({
    title: "Trusted Technology Partners",
    description: "We work with industry-leading technology partners",
    partners: []
  });
  const site = ref({
    siteName: "LogicDesignSolutions",
    email: "contact@logic-design-solutions.com",
    phone: "+33 (0)1 45 92 24 47",
    address: "123 Tech Street, Innovation City",
    description: "FPGA Design Services & IP Solutions",
    callLabel: "Call Us",
    contactButtonText: "Contact Us"
  });
  const navigation = ref({
    mainMenu: [
      { label: "HOME", path: "/" },
      { label: "PROFILES", path: "/profiles" },
      { label: "PRODUCTS", path: "/products" },
      { label: "SERVICES", path: "/services" },
      { label: "NEWS", path: "/news" },
      { label: "REFERENCES", path: "/references" },
      { label: "CONTACT", path: "/contact" }
    ],
    footerMenu: [
      { title: "Home", url: "/" },
      { title: "About", url: "/about" },
      { title: "Services", url: "/services" },
      { title: "Products", url: "/products" },
      { title: "Contact", url: "/contact" }
    ]
  });
  const footer = ref({
    copyright: `© ${(/* @__PURE__ */ new Date()).getFullYear()} Logic Design Solutions. All rights reserved.`,
    socialLinks: [
      { name: "Facebook", url: "https://facebook.com", icon: "fab fa-facebook" },
      { name: "Twitter", url: "https://twitter.com", icon: "fab fa-twitter" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "fab fa-linkedin" },
      { name: "Instagram", url: "https://instagram.com", icon: "fab fa-instagram" }
    ]
  });
  return {
    hero,
    about,
    news,
    brands,
    site,
    navigation,
    footer
  };
};

export { useContent as u };
//# sourceMappingURL=useContent-DR2Pjl6_.mjs.map
