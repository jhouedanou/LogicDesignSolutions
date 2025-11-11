export const useContent = () => {
  const site = ref({
    siteName: 'Logic Design Solutions',
    email: 'contact@logic-design-solutions.com',
    phone: '+1 234 567 8900',
    address: '123 Tech Street, Innovation City',
    description: 'FPGA Design Services & IP Solutions'
  })

  const navigation = ref({
    footerMenu: [
      { title: 'Home', url: '/' },
      { title: 'About', url: '/about' },
      { title: 'Services', url: '/services' },
      { title: 'Products', url: '/products' },
      { title: 'Contact', url: '/contact' }
    ]
  })

  const footer = ref({
    copyright: `© ${new Date().getFullYear()} Logic Design Solutions. All rights reserved.`,
    socialLinks: [
      { name: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook' },
      { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
      { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin' },
      { name: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram' }
    ]
  })

  return {
    site,
    navigation,
    footer
  }
}
