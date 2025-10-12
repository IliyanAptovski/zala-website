const translations = {
  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.renovation': 'Renovation',
    'nav.quotes': 'Quotes',
    'nav.stories': 'Scary Stories',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.greeting': 'Hello, {name}!',
    
    // Home page
    'hero.title': 'Welcome to The Zala',
    'hero.tagline': '“If you don\'t give it to us, we\'ll take it ourselves!”',
    
    // Page titles and content
    'page.renovation.title': 'The Evolution of the Zala',
    'page.renovation.text': 'Follow our transformation through time.',
    'page.quotes.title': 'Zala Quotes',
    'page.stories.title': 'Scary Stories from the Zala',
    
    // Footer
    'footer.text': '© Zala 2025',
    
    // Auth pages
    'auth.welcomeBack': 'Welcome Back',
    'auth.enterDark': 'We\'ve been waiting for you.',
    'auth.joinZala': 'Join the Zala',
    'auth.becomePart': 'Become one of us.',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.googleLogin': 'Login with Google',
    'auth.googleSignup': 'Sign up with Google',
    'auth.haveAccount': 'You\'re not on the list?',
    'auth.noAccount': 'So you\'re one of us now?',
    'auth.or': 'or'
  },
  'bg': {
    // Navigation
    'nav.home': 'Начало',
    'nav.renovation': 'Реновация',
    'nav.quotes': 'Цитати',
    'nav.stories': 'Страшни истории',
    'nav.login': 'Вход',
    'nav.signup': 'Регистрация',
    'nav.logout': 'Изход',
    'nav.greeting': 'Здравей, {name}!',
    
    // Home page
    'hero.title': 'Добре дошли в Залата',
    'hero.tagline': '„Ако не ни го дадеш, ще си го вземем сами!“',
    
    // Page titles and content
    'page.renovation.title': 'Ремонт на Залата',
    'page.renovation.text': 'Проследете нашата трансформация през времето.',
    'page.quotes.title': 'Цитати от Залата',
    'page.stories.title': 'Страшни истории от Залата',
    
    // Footer
    'footer.text': '© Зала 2025',
    
    // Auth pages
    'auth.welcomeBack': 'Добре дошъл отново',
    'auth.enterDark': 'Очаквахме те',
    'auth.joinZala': 'Залата те очаква',
    'auth.becomePart': 'Стани част от нас',
    'auth.email': 'Имейл',
    'auth.password': 'Парола',
    'auth.fullName': 'Пълно име',
    'auth.login': 'Вход',
    'auth.signup': 'Регистрация',
    'auth.googleLogin': 'Вход с Google',
    'auth.googleSignup': 'Регистрация с Google',
    'auth.haveAccount': 'Не си в списъка?',
    'auth.noAccount': 'Вече си един от нас?',
    'auth.or': 'или'
  }
};

// Get current language from localStorage or default to 'bg'
function getCurrentLanguage() {
  return localStorage.getItem('zala-lang') || 'bg';
}

// Set current language
function setCurrentLanguage(lang) {
  localStorage.setItem('zala-lang', lang);
  return lang;
}

// Generic translation function using data attributes
function updateDataAttributeTranslations(lang) {
  const t = translations[lang];
  
  // Update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (t[key]) {
      element.textContent = t[key];
    }
  });
  
  // Update placeholder texts
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      element.placeholder = t[key];
    }
  });
}

// Main function to set language and update UI
function setLanguage(lang) {
  const currentLang = setCurrentLanguage(lang);
  document.documentElement.lang = currentLang;
  const t = translations[currentLang];

  console.log('Setting language to:', currentLang);

  // Update navbar text (keep existing for backward compatibility)
  const navHome = document.getElementById('nav-home');
  const navRenovation = document.getElementById('nav-renovation');
  const navQuotes = document.getElementById('nav-quotes');
  const navStories = document.getElementById('nav-stories');
  const navLogin = document.getElementById('nav-login');
  const navSignup = document.getElementById('nav-signup');
  
  if (navHome) navHome.textContent = t['nav.home'];
  if (navRenovation) navRenovation.textContent = t['nav.renovation'];
  if (navQuotes) navQuotes.textContent = t['nav.quotes'];
  if (navStories) navStories.textContent = t['nav.stories'];
  if (navLogin) navLogin.textContent = t['nav.login'];
  if (navSignup) navSignup.textContent = t['nav.signup'];

  // Update data attribute translations (NEW - handles auth pages and any future pages)
  updateDataAttributeTranslations(currentLang);

  // Update footer (keep existing for backward compatibility)
  const footerText = document.getElementById('footer-text');
  if (footerText) footerText.textContent = t['footer.text'];

  // Update hero section (home page only) - keep existing
  const heroTitle = document.getElementById('hero-title');
  const heroTagline = document.getElementById('hero-tagline');
  if (heroTitle) heroTitle.textContent = t['hero.title'];
  if (heroTagline) heroTagline.textContent = t['hero.tagline'];

  // Update page-specific content - keep existing
  const bodyClass = document.body.classList;
  const pageTitle = document.getElementById('page-title');
  const pageText = document.getElementById('page-text');

  if (bodyClass.contains('renovation') && pageTitle) {
    pageTitle.textContent = t['page.renovation.title'];
    if (pageText) pageText.textContent = t['page.renovation.text'];
  }
  if (bodyClass.contains('quotes') && pageTitle) {
    pageTitle.textContent = t['page.quotes.title'];
    // Trigger quotes rendering when language changes
    if (window.renderQuotes) {
      setTimeout(() => {
        window.renderQuotes(currentLang);
      }, 100);
    }
  }
  if (bodyClass.contains('stories') && pageTitle) {
    pageTitle.textContent = t['page.stories.title'];
  }

  // Update language toggle active states
  const langEn = document.getElementById('lang-en');
  const langBg = document.getElementById('lang-bg');
  if (langEn) langEn.classList.toggle('active', currentLang === 'en');
  if (langBg) langBg.classList.toggle('active', currentLang === 'bg');

  console.log('Language update complete');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing language...');
  
  // Set initial language
  const initialLang = getCurrentLanguage();
  setLanguage(initialLang);
  
  // Add language toggle event listeners
  const langEn = document.getElementById('lang-en');
  const langBg = document.getElementById('lang-bg');
  
  if (langEn) {
    langEn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('English button clicked');
      setLanguage('en');
    });
  }
  
  if (langBg) {
    langBg.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Bulgarian button clicked');
      setLanguage('bg');
    });
  }
  
  console.log('Language system initialized');
});

// Make functions available globally for other scripts
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.updateDataAttributeTranslations = updateDataAttributeTranslations;