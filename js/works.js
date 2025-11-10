document.addEventListener("DOMContentLoaded", () => {
  // ! FADE-IN
  const fadeElements = document.querySelectorAll(".fade-in, .visualCard");
  fadeElements.forEach((el, i) => setTimeout(() => el.classList.add("show"), i * 200));

  // -----------------------
  // ! VISUAL WORKS LIGHTBOX (singole immagini)
  // -----------------------
  const visualLightbox = document.getElementById("visual-lightbox");
  const visualLightboxImg = visualLightbox.querySelector("img");

  document.querySelectorAll(".visualWorks .visualCard img:not([data-gallery])").forEach(img => {
    img.addEventListener("click", () => {
      visualLightboxImg.src = img.src;
      visualLightbox.classList.add("show");
    });
  });

  visualLightbox.addEventListener("click", e => {
    if (e.target === visualLightbox) visualLightbox.classList.remove("show");
  });

  // -----------------------
  // ! BRANDING WORKS LIGHTBOX 
  // -----------------------

  document.querySelectorAll(".brandingWorks .clickable-img").forEach(img => {
    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.background = "rgba(0,0,0,0.85)";
      overlay.style.display = "flex";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";
      overlay.style.zIndex = 9999;

      const fullImg = document.createElement("img");
      fullImg.src = img.src;
      fullImg.style.maxWidth = "90%";
      fullImg.style.maxHeight = "90%";
      fullImg.style.borderRadius = "12px";

      overlay.appendChild(fullImg);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);
      });
    });
  });

});
