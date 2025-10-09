const quotes = [
  {
    en: {
      text: "I wonder when auzubilaha will come.",
      author: "Denis",
      date: "2019",
    },
    bg: {
      text: "Аузубуляха кога ли ще дойде.",
      author: "Денис",
      date: "2019",
    },
  },
  {
    en: {
      text: "Successful - sex sex full.",
      author: "Sevgin",
      date: "2019",
    },
    bg: {
      text: "Successful секс секс фулл.",
      author: "Севгин",
      date: "2019",
    },
  },
  {
    en: {
      text: "Rope for hanging with free installation.",
      author: "Iliyan & Denis",
      date: "2019",
    },
    bg: {
      text: "Въже за бесене с безплатен монтаж.",
      author: "Илиян и Денис",
      date: "2019",
    },
  },
  {
    en: {
      text: "I can't hold my hand properly.",
      author: "Iliyan",
      date: "2019",
    },
    bg: {
      text: "Не мога да си държе ръкъть.",
      author: "Илиян",
      date: "2019",
    },
  },
  {
    en: {
      text: "Don't scream because I can't hear you when you're talking!",
      author: "Iliyan",
      date: "2019",
    },
    bg: {
      text: "Немой рука че не мога да та чуем ага думаш.",
      author: "Илиян",
      date: "2019",
    },
  },
  {
    en: {
      text: "I hope your laundry dries.",
      author: "Denis",
      date: "2019",
    },
    bg: {
      text: "Дано ти изсъхне прането.",
      author: "Денис",
      date: "2019",
    },
  },
  {
    en: {
      text: "The cold went out.",
      author: "Sevgin",
      date: "2019",
    },
    bg: {
      text: "Излезе студеното.",
      author: "Севгин",
      date: "2019",
    },
  },
  {
    en: {
      text: "Boris Dali is raining today, maybe tomorrow too.",
      author: "Denis",
      date: "2019",
    },
    bg: {
      text: "Борис Дали вали днес дали утре.",
      author: "Денис",
      date: "2019",
    },
  },
  {
    en: {
      text: "The doctors are poking me and say I have double angina.",
      author: "Sevgin",
      date: "2020",
    },
    bg: {
      text: "Докторите ма шишкат, викат че имам двойна ангина.",
      author: "Севгин",
      date: "2020",
    },
  },
  {
    en: {
      text: "You are making elevator music.",
      author: "Iliyan",
      date: "2020",
    },
    bg: {
      text: "You make алявейтор музик.",
      author: "Илиян",
      date: "2020",
    },
  },
  {
    en: {
      text: "Read it Naum. I’ll read it to Kliment.",
      author: "Denis Urkur",
      date: "2020",
    },
    bg: {
      text: "Прочети го Наум. Ше го прочета на Климент.",
      author: "Денис Уркур",
      date: "2020",
    },
  },
  {
    en: {
      text: "Sherlock Holmes, share the padlock at your home.",
      author: "Iliyan & Denis",
      date: "2020 (COVID19/2019 nCoV)",
    },
    bg: {
      text: "Sherlock Holmes - Сподели катинар удома ти.",
      author: "Илиян и Денис",
      date: "2020 (COVID19/2019 nCoV)",
    },
  },
  {
    en: {
      text: "Susulman",
      author: "Viki",
      date: "2020",
    },
    bg: {
      text: "Сюсюлман",
      author: "Вики",
      date: "2020",
    },
  },
  {
    en: {
      text: "Enimen",
      author: "Denis",
      date: "2020 (still COVID19)",
    },
    bg: {
      text: "Енимен",
      author: "Денис",
      date: "2020 (още е COVID19)",
    },
  },
  {
    en: {
      text: "Slim Shady (mischievous) – the mischievous side of Eminem.",
      author: "Denis & Iliyan",
      date: "2020",
    },
    bg: {
      text: "Slim Shady(mischievous) - миживунската страна на Енимен.",
      author: "Денис и Илиян",
      date: "2020",
    },
  },
  {
    en: {
      text: "Chronometer, thermometer.",
      author: "Iliyan",
      date: "2020",
    },
    bg: {
      text: "Хронометър, термометър.",
      author: "Илиян",
      date: "2020",
    },
  },
  {
    en: {
      text: "Zeus' triceps.",
      author: "Iliyan",
      date: "2020",
    },
    bg: {
      text: "Трицепса на Зевс",
      author: "Илиян",
      date: "2020",
    },
  },
  {
    en: {
      text: "Thenx - slim sex.",
      author: "Denis (mischievous side)",
      date: "2020",
    },
    bg: {
      text: "Thenx - тенек секс.",
      author: "Денис (mischievous side)",
      date: "2020",
    },
  },
  {
    en: {
      text: "Black and yellow – sex taxi.",
      author: "Mentaka motherfucker",
      date: "2020",
    },
    bg: {
      text: "Black and yellow - sex taxi.",
      author: "Ментька мъдъфъкъ",
      date: "2020",
    },
  },
  {
    en: {
      text: "Haissiy and Hafesto.",
      author: "Mentaka reluctantly",
      date: "2020",
    },
    bg: {
      text: "Хаисий и хафесто.",
      author: "Ментъка на зор",
      date: "2020",
    },
  },
  {
    en: {
      text: "Carabiner-karambit.",
      author: "Unknown",
      date: "2020",
    },
    bg: {
      text: "Карабинер-карамбит",
      author: "Unknown",
      date: "2020",
    },
  },
  {
    en: {
      text: "Chris Hernia – whenever and wherever.",
      author: "Iliyan & Denis",
      date: "April 2020",
    },
    bg: {
      text: "Крис Херния когано и да е, къдено и да е.",
      author: "Илиян и Денис",
      date: "Април 2020",
    },
  },
  {
    en: {
      text: "If you don't give it to us, we'll take it ourselves! (Zala's Motto)",
      author: "Zala's Motto",
      date: "2020",
    },
    bg: {
      text: "Ако ве не ни го дадете не ше си го земем. (мотото на залата)",
      author: "Мотото на залата",
      date: "2020",
    },
  },
  {
    en: {
      text: "Mentaka walks up to the Zala, stop by the window, raises his hands and shouts: 'I feel on the right, the sea on the left, I feel spring I’m just a kid, summer two steps and I shout that we’ve split the wood'",
      author: "Mentaka (aka Iliyan)",
      date: "2020",
    },
    bg: {
      text: "Метък мъдъфъкъ си върви до зъльть спира до жемъ и въснись ръките и викъ: осетъм от десно, морето от лево, осетъм пролеткъ сам дете, лето върем две крачки и викам че сме цепили дарва.",
      author: "Ментька",
      date: "2020",
    },
  },
  {
    en: {
      text: "Chunks make perfect.",
      author: "Denis",
      date: "2020",
    },
    bg: {
      text: "Шматки мейкс пърфект.",
      author: "Денис",
      date: "2020",
    },
  },
  {
    en: {
      text: "If they want me to turn on the camera, I don't have one. And if they want me to share my screen, I don't have one either.",
      author: "Mentaka",
      date: "2020",
    },
    bg: {
      text: "Ако ми искат да пусна камерата немам. Пък ако искат и екран да споделям и екран немам.",
      author: "Ментъка",
      date: "2020",
    },
  },
  {
    en: {
      text: "Osas truhale (Sevdi) – summons at 3am in front of the mirror with candles, if you say 'uzuvoevo'.",
      author: "Sevdi",
      date: "2020",
    },
    bg: {
      text: "Осас тръхале (Севди) призовава са в 3 пред огледалото с мумве ага речеш узувоево.",
      author: "Севди",
      date: "2020",
    },
  },
  {
    en: {
      text: "Prince Heria (Chris EA) (Prince Hea).",
      author: "Iliyan",
      date: "2020",
    },
    bg: {
      text: "Prince Heria (Chris EA) (Prince Hea).",
      author: "Илиян",
      date: "2020",
    },
  },
  {
    en: {
      text: "The balls don't have anything to do with the dick. Mahmud and Feik/Arif. 100 BGN, 100 grams, 100 cents. Every day he counts and counts it.",
      author: "Denis Meizinski",
      date: "2020",
    },
    bg: {
      text: "Мъдето немат нищо общо с хуя. Махмуд и Феик/Ариф. 100лв 100грама 100санта. Every day го хъсаби хъсаби.",
      author: "Денис Мейзински",
      date: "2020",
    },
  },
  {
    en: {
      text: "In sex, I am like Levski, every time the cops catch me.",
      author: "Mentaka & Denis",
      date: "2020",
    },
    bg: {
      text: "В секса съм като Левски всеки път ме хващат заптиетата.",
      author: "Ментька и Денис",
      date: "2020",
    },
  },
  {
    en: {
      text: "In sex, I’m like Elin Pelin, master of short stories. Active rest, max hold.",
      author: "Sevgin",
      date: "2020",
    },
    bg: {
      text: "В секса съм като Елин Пелин майстор на късите разкази. Active rest, max hold",
      author: "Севгин",
      date: "2020",
    },
  },
  {
    en: {
      text: "Key 10 is too big. Anko - ah try key 11 instead.",
      author: "Anko",
      date: "2020",
    },
    bg: {
      text: "Ключ 10 не влиза много е голям. Анко А, ам пробвай 11 тогава.",
      author: "Анко",
      date: "2020",
    },
  },
  {
    en: {
      text: "Fearless - Fear, yes, a lot very much.",
      author: "Iliyan",
      date: "2020",
    },
    bg: {
      text: "Fearless - Fear, yes, a lot very much.",
      author: "Илиян",
      date: "2020",
    },
  },
  {
    en: {
      text: "My speaker is cheaper than your phone, but it sounds louder.",
      author: "Denis / Bakata",
      date: "2020",
    },
    bg: {
      text: "То моята колона е по евтина от твоя телефон а пък свири по силно.",
      author: "Денис / Баката",
      date: "2020",
    },
  },
  {
    en: {
      text: "You are an egoistic dirty bitch and a pure f****t.",
      author: "Denis",
      date: "2020",
    },
    bg: {
      text: "Ти си егоист мръсна путка и педераст чист.",
      author: "Денис",
      date: "2020",
    },
  },
  {
    en: {
      text: "Max rest.",
      author: "Sevgin",
      date: "2020",
    },
    bg: {
      text: "Max rest",
      author: "Севгин",
      date: "2020",
    },
  },
  {
    en: {
      text: "Jondzhareno.",
      author: "Sevdi",
      date: "2020",
    },
    bg: {
      text: "Джонджарено",
      author: "Севди",
      date: "2020",
    },
  },
  {
    en: {
      text: "Bent over rows – beackrows.",
      author: "Iliyan",
      date: "2020",
    },
    bg: {
      text: "Bent over rows - beackrows.",
      author: "Илиян",
      date: "2020",
    },
  },
  {
    en: {
      text: "I want to eat so bad that I can’t bite.",
      author: "Denis",
      date: "2020",
    },
    bg: {
      text: "Еней ми са яде че немога да късна.",
      author: "Денис",
      date: "2020",
    },
  },
  {
    en: {
      text: "Kadri bu",
      author: "Sevdi",
      date: "2020",
    },
    bg: {
      text: "Кадри бъ",
      author: "Севди",
      date: "2020",
    },
  },
  {
    en: {
      text: "I want to put a tire on the back rope.",
      author: "Denis",
      date: "2021",
    },
    bg: {
      text: "Искам да клада гума на задното въже.",
      author: "Денис",
      date: "2021",
    },
  },
  {
    en: {
      text: "Don’t make panic.",
      author: "Italian at table 20",
      date: "2022",
    },
    bg: {
      text: "Паника нема да правиш",
      author: "Италианец на 20 маса",
      date: "2022",
    },
  },
  {
    en: {
      text: "Kerimski Pirates",
      author: "Sevdi",
      date: "2022",
    },
    bg: {
      text: "Керимски перати",
      author: "Севди",
      date: "2022",
    },
  },
  {
    en: {
      text: "They smell heavy.",
      author: "Sevdi",
      date: "2022",
    },
    bg: {
      text: "Миришат на тежко.",
      author: "Севди",
      date: "2022",
    },
  },
  {
    en: {
      text: "Mirinjada",
      author: "Sevgin",
      date: "2022",
    },
    bg: {
      text: "Миринжада",
      author: "Севгин",
      date: "2022",
    },
  },
  {
    en: {
      text: "How many burui do you need? - 4. How much is one? - 4 BGN. So about 30 BGN total.",
      author: "Sevdi",
      date: "2022 (end of year)",
    },
    bg: {
      text: "Колко буруии ти треат? 4 Колко е една? 4лв Демек към 30лв ше ти излезе.",
      author: "Севди",
      date: "2022 (накрая)",
    },
  },
  {
    en: {
      text: "Plovdiv is like Podvis.",
      author: "Sevgin",
      date: "2023",
    },
    bg: {
      text: "Пловдив е като Подвис.",
      author: "Севгин",
      date: "2023",
    },
  },
  {
    en: {
      text: "The bus is only on Saturday and Sunday. Then we’ll need to go on Wednesday.",
      author: "Sevdi",
      date: "2023",
    },
    bg: {
      text: "Рейс има само събота и неделя. Ам тогава ше треа да идем в сряда.",
      author: "Севди",
      date: "2023",
    },
  },
  {
    en: {
      text: "If you weren’t wearing a sack, you would have poisoned yourself.",
      author: "Sevdi",
      date: "2023",
    },
    bg: {
      text: "Ако не беше с чувал щеше да са отровиш.",
      author: "Севди",
      date: "2023",
    },
  },
  {
    en: {
      text: "If you don't wake up for Rome, Rome will wake up for you.",
      author: "Ramzes Duduka & Ahmed",
      date: "2024",
    },
    bg: {
      text: "Ако не станеш за Рим Рим ще стане за тебе.",
      author: "Рамзес Дудука и Ахмед",
      date: "2024",
    },
  },
  {
    en: {
      text: "If I had 100 lives today, I would have 99.",
      author: "Sevdi",
      date: "2024",
    },
    bg: {
      text: "Ако имах 100 живота днеска ще имам 99.",
      author: "Севди",
      date: "2024",
    },
  },
  {
    en: {
      text: "Shan Mednes – Merci.",
      author: "Mentka",
      date: "2024",
    },
    bg: {
      text: "Шан Меднес - Мерси.",
      author: "Ментъка",
      date: "2024",
    },
  },
  {
    en: {
      text: "If you don’t die, it’s not interesting.",
      author: "Sevdi",
      date: "2024",
    },
    bg: {
      text: "Ако не умреш не е интересно.",
      author: "Севди",
      date: "2024",
    },
  },
  {
    en: {
      text: "This is the FBI, you can take a picture.",
      author: "Sevdi",
      date: "2024",
    },
    bg: {
      text: "Тука е Гедебоб може да са снимате.",
      author: "Севди",
      date: "2024",
    },
  },
  {
    en: {
      text: "Mitsubishi 4x4.",
      author: "Dani",
      date: "2024",
    },
    bg: {
      text: "Митсубиши по 4 по 4.",
      author: "Дани",
      date: "2024",
    },
  },
  {
    en: {
      text: "The cameras found me!",
      author: "Sevdi",
      date: "2024",
    },
    bg: {
      text: "Найдаха ма камерите!",
      author: "Севди",
      date: "2024",
    },
  },
  {
    en: {
      text: "I’m not good at sex in practice, but in theory...",
      author: "Sevdi",
      date: "2024",
    },
    bg: {
      text: "В секса не съм добър в действията ама в теорията...",
      author: "Севди",
      date: "2024",
    },
  },
  {
    en: {
      text: "From third to fifth (car gears) in Xanthi.",
      author: "Sevgin & Iliyan",
      date: "2024",
    },
    bg: {
      text: "От трета в пета в Ксанти.",
      author: "Севгин и Илиян",
      date: "2024",
    },
  },
  {
    en: {
      text: "One of them had his fish drowned, the other had his pond set on fire.",
      author: "Denis",
      date: "2024",
    },
    bg: {
      text: "Единия му са удавила рибата, другия му са запалил водоема.",
      author: "Денис",
      date: "2024",
    },
  },
  {
    en: {
      text: "The magician from Beverly Hills.",
      author: "Iliyan",
      date: "2025",
    },
    bg: {
      text: "Магешника от Бевърли Хилс.",
      author: "Илиян",
      date: "2025",
    },
  },
  {
    en: {
      text: "Whoever wins, wins.",
      author: "Dani",
      date: "2025",
    },
    bg: {
      text: "Който победи печели.",
      author: "Дани",
      date: "2025",
    },
  },
  {
    en: {
      text: "Shani from Chepintsi.",
      author: "Iliyan",
      date: "2025",
    },
    bg: {
      text: "Шани от Чепинци",
      author: "Илиян",
      date: "2025",
    },
  },
  {
    en: {
      text: "Why are you lying to me, Sevdi? Because I'm fooling you.",
      author: "Sevdi & Dani (uncertain)",
      date: "2025",
    },
    bg: {
      text: "Оти ма лъжеш бре Севди. Оти та впрегам.",
      author: "Севди и Дани (не знам)",
      date: "2025",
    },
  },
  {
    en: {
      text: "How can it be expensive if it’s cheap for you?",
      author: "Shani",
      date: "2025",
    },
    bg: {
      text: "Как ще ти е скъпо ага ти е евтино?",
      author: "Шани",
      date: "2025",
    },
  },
  {
    en: {
      text: "Streetlights need to stay on all day!",
      author: "Jessica",
      date: "2025",
    },
    bg: {
      text: "Уличните трябва да светят цял ден!",
      author: "Джесика",
      date: "2025",
    },
  }
];


// Function to render quotes
function renderQuotes(lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'bg') {
  const container = document.getElementById('quotes-container');
  if (!container) {
    console.log('Quotes container not found');
    return;
  }
  
  console.log('Rendering quotes in language:', lang);
  
  container.innerHTML = '';

  quotes.forEach((quote) => {
    const q = quote[lang] || quote['bg']; // Fallback to Bulgarian
    const div = document.createElement('div');
    div.className = 'quote-card';
    div.innerHTML = `
      <p class="quote-text">"${q.text}"</p>
      <p class="quote-author">— ${q.author}${q.date ? ', ' + q.date : ''}</p>
    `;
    container.appendChild(div);
  });
  
  console.log('Rendered', quotes.length, 'quotes');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Quotes.js loaded, current page:', window.location.pathname);
  
  // Only initialize if we're on the quotes page
  if (document.body.classList.contains('quotes')) {
    console.log('On quotes page, initializing quotes...');
    
    // Initial render
    const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'bg';
    renderQuotes(currentLang);
    
    // Listen for language button clicks
    document.getElementById('lang-en')?.addEventListener('click', () => {
      setTimeout(() => renderQuotes('en'), 100);
    });
    
    document.getElementById('lang-bg')?.addEventListener('click', () => {
      setTimeout(() => renderQuotes('bg'), 100);
    });
  }
});

// Make functions available globally
window.renderQuotes = renderQuotes;
