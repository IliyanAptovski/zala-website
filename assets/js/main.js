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
    'hero.title': 'Welcome to The Hall',
    'hero.tagline': '“If you don\'t give it to us, we\'ll take it ourselves!”',
    
    // Page titles and content
    'page.renovation.title': 'The Evolution of the Zala',
    'page.renovation.text': 'Follow our transformation through time.',
    'page.quotes.title': 'Zala Quotes',
    'page.stories.title': 'Scary Stories from Zala',
    
    // Footer
    'footer.text': '© Zala 2025'
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
    'footer.text': '© Зала 2025'
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

// Main function to set language and update UI
function setLanguage(lang) {
  const currentLang = setCurrentLanguage(lang);
  document.documentElement.lang = currentLang;
  const t = translations[currentLang];

  console.log('Setting language to:', currentLang); // Debug log

  // Update navbar text
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

  // Update footer
  const footerText = document.getElementById('footer-text');
  if (footerText) footerText.textContent = t['footer.text'];

  // Update hero section (home page only)
  const heroTitle = document.getElementById('hero-title');
  const heroTagline = document.getElementById('hero-tagline');
  if (heroTitle) heroTitle.textContent = t['hero.title'];
  if (heroTagline) heroTagline.textContent = t['hero.tagline'];

  // Update page-specific content
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
      window.renderQuotes(lang);
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

  console.log('Language update complete'); // Debug log
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing language...'); // Debug log
  
  // Set initial language
  const initialLang = getCurrentLanguage();
  setLanguage(initialLang);
  
  // Add language toggle event listeners
  const langEn = document.getElementById('lang-en');
  const langBg = document.getElementById('lang-bg');
  
  if (langEn) {
    langEn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('English button clicked'); // Debug log
      setLanguage('en');
    });
  }
  
  if (langBg) {
    langBg.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Bulgarian button clicked'); // Debug log
      setLanguage('bg');
    });
  }
  
  console.log('Language system initialized'); // Debug log
});

// Make setLanguage available globally for other scripts
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;