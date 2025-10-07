// ===== Shared JS for ZALA =====

// Language toggle logic (placeholder)
document.addEventListener('DOMContentLoaded', () => {
  const enBtn = document.getElementById('lang-en');
  const bgBtn = document.getElementById('lang-bg');

  if (enBtn && bgBtn) {
    enBtn.addEventListener('click', () => {
      enBtn.classList.add('active');
      bgBtn.classList.remove('active');
      console.log('Language set to English');
      // TODO: Load English text
    });

    bgBtn.addEventListener('click', () => {
      bgBtn.classList.add('active');
      enBtn.classList.remove('active');
      console.log('Language set to Bulgarian');
      // TODO: Load Bulgarian text
    });
  }
});
