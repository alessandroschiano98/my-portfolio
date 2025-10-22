document.addEventListener("DOMContentLoaded", () => {
  // --------------------------
  // ! FADE-IN PER LE CARD
  // --------------------------
  const fadeElements = document.querySelectorAll(".fade-in, .visualCard");
  fadeElements.forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), i * 200);
  });

  // --------------------------
  // ! LIGHTBOX
  // --------------------------

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');

  document.querySelectorAll('.clickable-img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('show');
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('show');
    }
  });

});
