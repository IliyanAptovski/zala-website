export const translations = {
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
    'footer.text': '© Zala 2025',
    
    // Auth pages
    'auth.welcomeBack': 'Welcome Back',
    'auth.enterDark': 'Enter the dark — securely.',
    'auth.joinZala': 'Join the Zala',
    'auth.becomePart': 'Become part of the echo.',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.googleLogin': 'Login with Google',
    'auth.googleSignup': 'Sign up with Google',
    'auth.haveAccount': 'Don\'t have an account?',
    'auth.noAccount': 'Already a member?',
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
    'auth.welcomeBack': 'Добре дошъл обратно',
    'auth.enterDark': 'Влез в тъмнината — сигурно.',
    'auth.joinZala': 'Присъедини се към Залата',
    'auth.becomePart': 'Стани част от ехото.',
    'auth.email': 'Имейл',
    'auth.password': 'Парола',
    'auth.fullName': 'Пълно име',
    'auth.login': 'Вход',
    'auth.signup': 'Регистрация',
    'auth.googleLogin': 'Вход с Google',
    'auth.googleSignup': 'Регистрация с Google',
    'auth.haveAccount': 'Нямаш акаунт?',
    'auth.noAccount': 'Вече членуваш?',
    'auth.or': 'или'
  }
};

// Get current language from localStorage or default to 'bg'
export function getCurrentLanguage() {
  return localStorage.getItem('zala-lang') || 'bg';
}

// Set current language
export function setCurrentLanguage(lang) {
  localStorage.setItem('zala-lang', lang);
  return lang;
}

// Translate text with placeholder replacement
export function translate(key, placeholders = {}) {
  const lang = getCurrentLanguage();
  let text = translations[lang][key] || key;
  
  // Replace placeholders
  Object.keys(placeholders).forEach(placeholder => {
    text = text.replace(`{${placeholder}}`, placeholders[placeholder]);
  });
  
  return text;
}