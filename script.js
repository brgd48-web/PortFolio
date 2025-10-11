document.addEventListener("DOMContentLoaded", function () {
  console.log("JS chargé");

  // === MODALE À PROPOS ===
  const aboutTrigger = document.querySelector('.about-trigger');
  const aboutModal = document.getElementById('aboutModal');
  const aboutCloseBtn = aboutModal.querySelector('.close');

  aboutTrigger.addEventListener('click', () => {
    aboutModal.style.display = 'block';
  });

  aboutCloseBtn.addEventListener('click', () => {
    aboutModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
      aboutModal.style.display = 'none';
    }
  });

  // === MODALE PROJET ===
  document.querySelectorAll('.voir-plus-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const href = btn.getAttribute('href');

      if (href && href.startsWith("projet.html")) {
        return; // Laisse le lien fonctionner normalement
      }

      e.preventDefault();
      const card = btn.closest(".projet-card");
      const title = card.querySelector("h3").textContent;
      const description = card.querySelector("p").textContent;
      const imageSrc = card.querySelector("img").src;
      const link = btn.href;

      const modal = document.getElementById("projectModal");
      const modalTitle = document.getElementById("modalTitle");
      const modalDescription = document.getElementById("modalDescription");
      const modalImage = document.getElementById("modalImage");
      const modalLink = document.getElementById("modalLink");
      const projectCloseBtn = modal.querySelector(".close");

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalImage.src = imageSrc;
      modalLink.href = link;
      modal.style.display = "block";

      projectCloseBtn.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      };
    });
  });
});