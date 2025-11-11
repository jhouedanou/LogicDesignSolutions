export default defineNuxtPlugin(() => {
  // This plugin initializes Owl Carousel on client side
  // It will run after jQuery and Owl Carousel scripts are loaded

  if (process.client) {
    const initOwlCarousels = () => {
      if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn.owlCarousel) {
        const $ = (window as any).$

        // Initialize all carousels with data-owl-options attribute
        $('.thm-owl__carousel').each((_: number, element: Element) => {
          const $this = $(element as HTMLElement)
          
          // Check if already initialized
          if ($this.hasClass('owl-loaded')) {
            return
          }

          const options = $this.data('owl-options')
          if (options) {
            try {
              $this.owlCarousel(options)
              console.log('✅ Owl Carousel initialized:', $this.attr('class'))
            } catch (error) {
              console.error('❌ Error initializing Owl Carousel:', error)
            }
          }
        })
      }
    }

    // Try to initialize carousels when the page is ready
    const tryInitialize = () => {
      if ((window as any).$ && (window as any).$.fn.owlCarousel) {
        initOwlCarousels()
      } else {
        // Retry after 100ms if jQuery or Owl Carousel is not loaded yet
        setTimeout(tryInitialize, 100)
      }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(tryInitialize, 500)
      })
    } else {
      setTimeout(tryInitialize, 500)
    }

    // Also reinitialize on route change
    if ((window as any).addEventListener) {
      (window as any).addEventListener('nuxt:page:finish', () => {
        setTimeout(tryInitialize, 500)
      })
    }
  }
})
