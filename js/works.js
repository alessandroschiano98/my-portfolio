document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 300);
    });
  });



const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

const images = document.querySelectorAll('.clickable-img');


images.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src; 
    lightbox.classList.add('show'); 
  });
});


lightbox.addEventListener('click', () => {
  lightbox.classList.remove('show');
});

// ! BLOCCO TASTO DESTRO PER EVITARE SALVATAGGI 
const imgs = document.querySelectorAll('.visualCard img, .lightbox img');

imgs.forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
});

