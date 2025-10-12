// ===== ZALA COMPREHENSIVE TRANSITIONS =====
class PageTransitions {
  constructor() {
    this.init();
  }

  init() {
    this.addLinkListeners();
    this.handlePageLoad();
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');

      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href === '#' ||
        link.target === '_blank'
      ) return;

      link.addEventListener('click', e => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        this.startTransition(href);
      });
    });
  }

  startTransition(url) {
    document.body.classList.add('transitioning');
    
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  }

  handlePageLoad() {
    // Add page-load class to trigger animations
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('page-load');
      
      // Remove page-load after animations complete
      setTimeout(() => {
        document.body.classList.remove('page-load');
      }, 1000);
    });

    // Handle back/forward navigation
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        document.body.classList.add('page-load');
        setTimeout(() => {
          document.body.classList.remove('page-load');
        }, 1000);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PageTransitions();
});