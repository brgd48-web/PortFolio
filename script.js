// === Gestion de la galerie et du lightbox ===
(function() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let currentIndex = -1;

  function openAt(index) {
    const it = items[index];
    if (!it) return;
    const full = it.dataset.full || it.querySelector('.gallery-thumb').src;
    const title = it.dataset.title || '';
    const desc = it.dataset.desc || '';
    lbImg.src = full;
    lbImg.alt = title;
    lbCaption.textContent = title + (desc ? ' — ' + desc : '');
    lb.classList.add('open');
    currentIndex = index;
    document.body.style.overflow = 'hidden';
  }

  function closeLB() {
    lb.classList.remove('open');
    lbImg.src = '';
    currentIndex = -1;
    document.body.style.overflow = '';
  }

  function showNext(dir) {
    if (currentIndex < 0) return;
    let next = currentIndex + dir;
    if (next < 0) next = items.length - 1;
    if (next >= items.length) next = 0;
    openAt(next);
  }

  // Ouvrir sur clic ou touche entrée/espace
  items.forEach((el, idx) => {
    el.addEventListener('click', () => openAt(idx));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAt(idx);
      }
    });
  });

  // Boutons de navigation
  lbClose.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', () => showNext(-1));
  lbNext.addEventListener('click', () => showNext(1));

  // Fermer en cliquant à l’extérieur
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLB();
  });

  // Contrôles clavier
  document.addEventListener('keydown', (e) => {
    if (lb.classList.contains('open')) {
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') showNext(-1);
      if (e.key === 'ArrowRight') showNext(1);
    }
  });
})();
