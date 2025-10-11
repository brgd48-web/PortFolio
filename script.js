console.log("JS chargé")
document.addEventListener("DOMContentLoaded", function() {
// Récupérer la modale et le bouton fermer
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");
const modalLink = document.getElementById("modalLink");
const closeBtn = document.querySelector(".close");

// Fonction pour ouvrir la modale avec contenu dynamique
function openModal(title, description, imageSrc, link) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalImage.src = imageSrc;
  modalLink.href = link;
  modal.style.display = "block";
}

// Fermer la modale en cliquant sur la croix ou en dehors
closeBtn.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if(event.target == modal) {
    modal.style.display = "none";
  }
}

// Ajouter un écouteur sur chaque bouton "Voir le projet"
document.querySelectorAll(".projet-card a").forEach((btn, index) => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    const card = btn.closest(".projet-card");
    const title = card.querySelector("h3").textContent;
    const description = card.querySelector("p").textContent;
    const imageSrc = card.querySelector("img").src;
    const link = btn.href; // ou "#" si pas de lien externe
    openModal(title, description, imageSrc, link);
  });
});
});
