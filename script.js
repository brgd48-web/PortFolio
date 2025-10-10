const slide = document.querySelector('.carousel-slide');
const images = slide.querySelectorAll('img');
const btnPrev = document.querySelector('.carousel-btn.prev');
const btnNext = document.querySelector('.carousel-btn.next');

let currIndex = 0;
const total = images.length;
const radius = 600; // distance depuis le centre, ajuste pour effet 3D

// Fonction pour positionner les images en cercle
function rotateCarousel() {
  const angle = 360 / total;
  images.forEach((img, i) => {
    // Calcul de l'angle pour chaque image
    const currAngle = angle * ((i - currIndex + total) % total);
    img.style.transform = `rotateY(${currAngle}deg) translateZ(${radius}px)`;
    // L'image centrale est pleine opacité, les autres plus transparentes
    img.style.opacity = i === currIndex ? 1 : 0.4;
  });
}

// Navigation
btnNext.addEventListener('click', () => {
  currIndex = (currIndex + 1) % total;
  rotateCarousel();
});

btnPrev.addEventListener('click', () => {
  currIndex = (currIndex - 1 + total) % total;
  rotateCarousel();
});

// Initialisation
rotateCarousel();

// Optionnel : rotation automatique toutes les 5 secondes
setInterval(() => {
  currIndex = (currIndex + 1) % total;
  rotateCarousel();
 }, 5000);
