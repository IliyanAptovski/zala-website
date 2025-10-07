const quotes = [
  { text: "Там дупката я няма ако я виждаш!", author: "Денис", date: "2019" },
  { text: "Слези на горе по стълбите.", author: "На Севди баща му", date: "2018" },
  { text: "Америка е голям град.", author: "Денис", date: "2019" },
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
