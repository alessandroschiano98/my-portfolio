document.addEventListener("DOMContentLoaded", () => {
  // ! FADE-IN ANIMATION
  const fadeElements = document.querySelectorAll(".fade-in, .visualCard, .projectCard");
  fadeElements.forEach((el, i) => setTimeout(() => el.classList.add("show"), i * 120));

  // ! LIGHTBOX (gestisce l'apertura a schermo intero di tutte le immagini con classe .clickable-img)
  const visualLightbox = document.getElementById("visual-lightbox");
  if (visualLightbox) {
    const visualLightboxImg = visualLightbox.querySelector("img");

    document.querySelectorAll(".clickable-img").forEach(img => {
      img.addEventListener("click", () => {
        visualLightboxImg.src = img.src;
        visualLightbox.classList.add("show");
      });
    });

    visualLightbox.addEventListener("click", e => {
      if (e.target === visualLightbox) {
        visualLightbox.classList.remove("show");
      }
    });
  }
});