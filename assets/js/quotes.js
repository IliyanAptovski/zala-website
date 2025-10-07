const quotes = [
  { text: "Bro, who turned off the lights?!", author: "Alex", date: "2024-12-10" },
  { text: "Zala doesn’t sleep. It waits.", author: "Mira" },
  { text: "We built this place from chaos.", author: "Niki" },
];

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('quotes-container');
  if (container) {
    quotes.forEach(q => {
      const div = document.createElement('div');
      div.className = 'quote-card';
      div.innerHTML = `
        <p>“${q.text}”</p>
        <small>— ${q.author}${q.date ? ` (${q.date})` : ''}</small>
      `;
      container.appendChild(div);
    });
  }
});
