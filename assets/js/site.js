(() => {
  const script = document.currentScript;
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('pref-theme', theme); } catch {}
  });
  const topLink = document.querySelector('#top-link');
  if (topLink) {
    const update = () => topLink.classList.toggle('hidden', window.scrollY <= window.innerHeight);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
  if (!script.dataset.copy) return;
  document.querySelectorAll('pre > code').forEach((code) => {
    if (!navigator.clipboard) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = script.dataset.copy;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = script.dataset.copied;
        setTimeout(() => { button.textContent = script.dataset.copy; }, 2000);
      } catch { button.textContent = script.dataset.copy; }
    });
    (code.closest('.highlight') || code.parentElement).appendChild(button);
  });
})();
