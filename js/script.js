document.addEventListener("DOMContentLoaded", function () {
  console.log("JS chargé");
  document.addEventListener("scroll", () => {
  const layers = document.querySelectorAll(".parallax-layer");
  layers.forEach((layer, index) => {
    const speed = (index + 1) * 0.2; // couche arrière = lent, avant = rapide
    const offset = window.pageYOffset * speed;
    layer.style.transform = `translateY(${offset}px)`;
  });
});

  
const target = document.getElementById("about-text");
if (target) {
  target.textContent = `Étudiant en informatique en L3 MIAGE, je développe des projets depuis mon enfance, ce qui m’a permis de bâtir des compétences techniques solides et diversifiées. Curieux et motivé, je cherche à approfondir mes connaissances tout en contribuant activement au succès d’une équipe. Mes expériences professionnelles m’ont familiarisé avec le fonctionnement des entreprises et m’ont permis de développer de bonnes compétences relationnelles et organisationnelles. Pour en savoir plus sur mon parcours et mes réalisations, je vous invite à consulter mon CV.`;
  target.classList.add("fade-in");
}


  // === MODALE À PROPOS ===
  const aboutTrigger = document.querySelector('.about-trigger');
  const aboutModal = document.getElementById('aboutModal');
  const aboutCloseBtn = aboutModal ? aboutModal.querySelector('.close') : null;

  if (aboutTrigger && aboutModal) {
    aboutTrigger.addEventListener('click', () => {
      aboutModal.style.display = 'block';
    });
  }
  if (aboutCloseBtn && aboutModal) {
    aboutCloseBtn.addEventListener('click', () => {
      aboutModal.style.display = 'none';
    });
  }
  // fermeture par clic en dehors (ajout via addEventListener pour ne pas écraser d'autres handlers)
  if (aboutModal) {
    window.addEventListener('click', (e) => {
      if (e.target === aboutModal) {
        aboutModal.style.display = 'none';
      }
    });
  }

  // === MODALE PROJET (si utilisée) ===
  document.querySelectorAll('.voir-plus-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // récupère l'attribut href directement (pas la propriété .href qui donne l'URL absolue)
      const hrefAttr = btn.getAttribute('href');
      // si le lien est destiné à une page projet complète, laisse le comportement par défaut
      if (hrefAttr && hrefAttr.startsWith("projet.html")) return;

      e.preventDefault();

      const card = btn.closest(".projet-card");
      if (!card) return;

      const titleEl = card.querySelector("h3");
      const descEl = card.querySelector("p");
      const imgEl = card.querySelector("img");

      const title = titleEl ? titleEl.textContent : "Projet";
      const description = descEl ? descEl.textContent : "";
      const imageSrc = imgEl ? imgEl.src : "";
      const link = btn.href || hrefAttr || "#";

      const modal = document.getElementById("projectModal");
      if (!modal) return;

      const modalTitle = modal.querySelector("#modalTitle");
      const modalDescription = modal.querySelector("#modalDescription");
      const modalImage = modal.querySelector("#modalImage");
      const modalLink = modal.querySelector("#modalLink");
      const projectCloseBtn = modal.querySelector(".close");

      if (modalTitle) modalTitle.textContent = title;
      if (modalDescription) modalDescription.textContent = description;
      if (modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = title;
      }
      if (modalLink) modalLink.href = link;

      modal.style.display = "block";

      if (projectCloseBtn) {
        projectCloseBtn.onclick = function () {
          modal.style.display = "none";
        };
      }

      // fermeture par clic en dehors (n'écrase pas d'autres handlers)
      window.addEventListener('click', function handler(event) {
        if (event.target === modal) {
          modal.style.display = "none";
          // retirer ce handler facultatif si on veut éviter accumulation : on peut le laisser, 
          // mais pour ne pas accumuler handlers, on le supprime après la première exécution
          window.removeEventListener('click', handler);
        }
      });
    });
  });

  // === SIDEBAR COMPÉTENCES ===
  fetch('projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur de chargement du fichier JSON");
      }
      return response.json();
    })
    .then(projets => {
      initialiserSidebar(projets);
      // éventuellement initialiser une page projet si on a un ID query param
      initialiserProjectPageIfNeeded(projets);
    })
    .catch(error => {
      console.error("Erreur lors du chargement des projets :", error);
    });

  function initialiserSidebar(projets) {
    function ouvrirSidebar(skill) {
      const sidebar = document.getElementById("sidebar");
      const liste = document.getElementById("sidebar-projects");
      if (!sidebar || !liste) return;
      liste.innerHTML = "";

      const projetsFiltres = projets.filter(p => Array.isArray(p.languages) && p.languages.includes(skill));

      if (projetsFiltres.length > 0) {
        projetsFiltres.forEach(p => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="projet.html?id=${encodeURIComponent(p.id)}">${p.title}</a>`;
          liste.appendChild(li);
        });
        sidebar.classList.add("open");
      } else {
        liste.innerHTML = `<li>Aucun projet pour ${skill}</li>`;
        sidebar.classList.add("open");
      }
    }

    document.querySelectorAll("[data-skill]").forEach(el => {
      el.addEventListener("click", () => {
        const skill = el.getAttribute("data-skill");
        ouvrirSidebar(skill);
      });
    });

    const closeBtn = document.querySelector(".close-sidebar");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.remove("open");
      });
    }
  }

  // === PAGE PROJET : affichage galerie si "projet" est présent (récupère l'ID depuis l'URL) ===
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function initialiserProjectPageIfNeeded(projets) {
    const id = getQueryParam('id');
    if (!id) return;

    const project = projets.find(p => String(p.id) === String(id));
    if (!project) return;

    const gallery = document.getElementById("projectGallery");
    if (project.images && Array.isArray(project.images) && gallery) {
      gallery.innerHTML = ""; // nettoyer
      project.images.forEach(imgSrc => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = project.title || "Image projet";
        img.classList.add("gallery-item");
        gallery.appendChild(img);
      });
    }

    // Remplir d'autres champs si présents
    const titleEl = document.getElementById("projectTitle");
    if (titleEl) titleEl.textContent = project.title || "";
    const descEl = document.getElementById("projectDescription");
    if (descEl) descEl.textContent = project.description || "";
  }

  // === ENVOI FORMULAIRE (Formspree) avec gestion d'erreurs ===
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const form = document.getElementById("contactForm");
      if (!form) return;

      const formData = new FormData(form);
      sendBtn.disabled = true;
      sendBtn.textContent = "Envoi...";

      try {
        const response = await fetch("https://formspree.io/f/manpakdn", {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          // reset du formulaire si souhaité
          form.reset();
          alert("✅ Message envoyé !");
        } else {
          const data = await response.json().catch(() => ({}));
          console.error("Formspree error response:", data);
          alert("❌ Erreur lors de l’envoi.");
        }
      } catch (err) {
        console.error("Erreur réseau lors de l'envoi du formulaire :", err);
        alert("❌ Erreur réseau lors de l’envoi.");
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Envoyer";
      }
    });
  }
});
