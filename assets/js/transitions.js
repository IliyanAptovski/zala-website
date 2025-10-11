// ===== TRANSITIONS =====
class PageTransitions {
  constructor() {
    this.init();
  }

  init() {
    this.createOverlay();
    this.addLinkListeners();
    this.handlePageLoad();
  }

  createOverlay() {
    if (!document.querySelector('.page-transition')) {
      const overlay = document.createElement('div');
      overlay.className = 'page-transition';
      document.body.appendChild(overlay);
      this.overlay = overlay;
    }
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
    console.log('Starting transition to:', url);
    
    document.body.classList.remove('page-load');
    document.body.classList.add('transitioning');
    
    setTimeout(() => {
      if (this.overlay) this.overlay.classList.add('active');
    }, 100);

    setTimeout(() => {
      window.location.href = url;
    }, 900);
  }

  handlePageLoad() {
    const revealContent = () => {
      document.body.classList.remove('transitioning');
      if (this.overlay) this.overlay.classList.remove('active');
      
      document.body.classList.add('page-load');
      
      setTimeout(() => {
        document.body.classList.remove('page-load');
        this.ensureAllContentVisible();
      }, 1200);
    };

    // Hide all content initially
    const hideContentInitially = () => {
      this.hideAllContent();
    };

    window.addEventListener('load', () => {
      setTimeout(revealContent, 50);
    });

    document.addEventListener('DOMContentLoaded', () => {
      hideContentInitially();
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        setTimeout(revealContent, 50);
      }
    });

    // Safety fallback - ensure everything is visible
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.ensureAllContentVisible();
      }, 2000);
    });
  }

  hideAllContent() {
    // Select all elements that should be hidden initially
    const selectors = [
      'main.content > *',
      '.hero',
      '.hero > *',
      '.story-card',
      '.story-card > *',
      '#quotes-container',
      '#quotes-container > *',
      '.auth-container',
      '.auth-container > *',
      '.auth-form',
      '.auth-form > *',
      '.navbar',
      'footer'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.opacity = '0';
        // Remove any existing fade-in classes that might conflict
        el.classList.remove('fade-in');
      });
    });
  }

  ensureAllContentVisible() {
    // Select all elements that should be visible
    const selectors = [
      'main.content > *',
      '.hero',
      '.hero > *',
      '.story-card',
      '.story-card > *',
      '#quotes-container',
      '#quotes-container > *',
      '.auth-container',
      '.auth-container > *',
      '.auth-form',
      '.auth-form > *',
      '.navbar',
      'footer'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.filter = 'none';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PageTransitions();
});