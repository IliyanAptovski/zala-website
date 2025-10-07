// ===== ZALA MULTILINGUAL SYSTEM =====

const translations = {
  en: {
    nav: {
      home: "Home",
      renovation: "Renovation",
      quotes: "Quotes",
      stories: "Scary Stories",
    },
    heroTitle: "Welcome to the Zala",
    tagline: "“If you don't give it to us, we'll take it ourselves!”",
    page: {
      renovation: {
        title: "The Evolution of the Zala",
        text: "Follow our transformation through time.",
      },
      quotes: { title: "Zala Quotes" },
      stories: { title: "Scary Stories from Zala" },
    },
    footer: "© Zala 2025",
  },
  bg: {
    nav: {
      home: "Начало",
      renovation: "Реновация",
      quotes: "Цитати",
      stories: "Страшни истории",
    },
    heroTitle: "Добре дошли в Залата",
    tagline: "„Ако не ни го дадеш, ще си го вземем сами!“",
    page: {
      renovation: {
        title: "Ремонт на Залата",
        text: "Проследете нашата трансформация през времето.",
      },
      quotes: { title: "Цитати от Залата" },
      stories: { title: "Страшни истории от Залата" },
    },
    footer: "© Зала 2025",
  },
};

let currentLang = "bg";

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  const t = translations[lang];

  // Navbar
  document.getElementById("nav-home").textContent = t.nav.home;
  document.getElementById("nav-renovation").textContent = t.nav.renovation;
  document.getElementById("nav-quotes").textContent = t.nav.quotes;
  document.getElementById("nav-stories").textContent = t.nav.stories;

  // Footer
  document.getElementById("footer-text").textContent = t.footer;

  // Hero (only exists on home)
  const heroTitle = document.getElementById("hero-title");
  const heroTagline = document.getElementById("hero-tagline");
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  if (heroTagline) heroTagline.textContent = t.tagline;

  // Page-specific
  const bodyClass = document.body.classList;
  if (bodyClass.contains("renovation")) {
    document.getElementById("page-title").textContent = t.page.renovation.title;
    document.getElementById("page-text").textContent = t.page.renovation.text;
  }
  if (bodyClass.contains("quotes")) {
    document.getElementById("page-title").textContent = t.page.quotes.title;
  }
  if (bodyClass.contains("stories")) {
    document.getElementById("page-title").textContent = t.page.stories.title;
  }

  // Language toggle active states
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
  document.getElementById("lang-bg").classList.toggle("active", lang === "bg");
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
  document.getElementById("lang-en").addEventListener("click", () => setLanguage("en"));
  document.getElementById("lang-bg").addEventListener("click", () => setLanguage("bg"));
});
