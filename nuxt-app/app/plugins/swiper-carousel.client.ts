export default defineNuxtPlugin((nuxtApp) => {
  // Fonction pour initialiser tous les Swiper carousels
  const initSwiperCarousels = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const globalWindow = window as typeof window & { jQuery?: any; Swiper?: any }
    if (!globalWindow.jQuery || !globalWindow.Swiper) {
      return;
    }

    const $ = globalWindow.jQuery;

    // Attendre que le DOM soit prêt
    setTimeout(() => {
      if ($(".thm-swiper__slider").length) {
        $(".thm-swiper__slider").each((_: number, element: Element) => {
          const elm = $(element as HTMLElement);
          
          // Éviter la double initialisation
          if (elm.hasClass('swiper-initialized')) {
            return;
          }

          try {
            const options = elm.data('swiper-options');
            if (options) {
              new globalWindow.Swiper(elm[0], options);
              elm.addClass('swiper-initialized');
            }
          } catch (error) {
            console.error('Erreur lors de l\'initialisation du Swiper:', error);
          }
        });
      }
    }, 500);
  };

  // Initialiser au chargement de la page
  nuxtApp.hook('page:finish', () => {
    initSwiperCarousels();
  });

  // Réinitialiser après chaque navigation
  nuxtApp.hook('app:mounted', () => {
    initSwiperCarousels();
  });
});
