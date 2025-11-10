document.addEventListener("DOMContentLoaded", () => {
  // ! FADE-IN
  const fadeElements = document.querySelectorAll(".fade-in, .visualCard");
  fadeElements.forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), i * 200);
  });

  // ! GALLERIE DEI PROGETTI
  const galleries = {
    tokko: [
      "/img/branding1.webp",
      "/img/branding2.webp",
      "/img/branding3.webp",
      "/img/branding4.webp",
      "/img/branding5.webp",
      "/img/branding6.webp",
      "/img/branding7.webp"
    ],
    exxxplicit: [
      "/img/exxxplicit1.webp",
      "/img/exxxplicit2.webp",
      "/img/exxxplicit3.webp",
      "/img/exxxplicit4.webp",
      "/img/exxxplicit5.webp",
      "/img/exxxplicit6.webp",
      "/img/exxxplicit7.webp"
    ]
  };

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");

  let currentGallery = [];
  let currentIndex = 0;

  document.querySelectorAll(".visualCard").forEach(card => {
    card.addEventListener("click", () => {
      const galleryName = card.dataset.gallery;
      if (!galleries[galleryName]) return;

      currentGallery = galleries[galleryName];
      currentIndex = 0;
      lightboxImg.src = currentGallery[currentIndex];
      lightbox.classList.add("show");
    });
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });

    // ! NAVIGAZIONE IMMAGINI
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
  
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % currentGallery.length;
      lightboxImg.src = currentGallery[currentIndex];
    });
  
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      lightboxImg.src = currentGallery[currentIndex];
    });
  
});
