document.addEventListener("DOMContentLoaded", () => {
    const homepageClick = document.getElementById("homepage-click");
    if (homepageClick) {
      homepageClick.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "/html/homepage.html";
      });
    }
  
    const linkClick = document.getElementById("works-click");
    if (linkClick) {
      linkClick.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "/html/works.html";
      });
    }
  
    const aboutmeClick = document.getElementById("aboutme-click");
    if (aboutmeClick) {
      aboutmeClick.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "/html/aboutme.html";
      });
    }
  
    const homepageCentre = document.querySelector(".homepagecentre");
    if (homepageCentre) {
      homepageCentre.classList.add("show");
    }
  
    const hamburger = document.querySelector('.hamburger-checkbox');
    const navLinks = document.querySelector('.navbar-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }
  
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");
    });
  });
  