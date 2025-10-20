document.addEventListener("DOMContentLoaded", () => {
  // ! Link homepage
  const homepageClick = document.getElementById("homepage-click");
  if (homepageClick) {
    homepageClick.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/html/homepage.html";
    });
  }

  // ! Link works
  const linkClick = document.getElementById("works-click");
  if (linkClick) {
    linkClick.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/html/works.html";
    });
  }

  // ! Link about me
  const aboutmeClick = document.getElementById("aboutme-click");
  if (aboutmeClick) {
    aboutmeClick.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/html/aboutme.html";
    });
  }

  // ! Animazione homepagecentre
  const homepageCentre = document.querySelector(".homepagecentre");
  if (homepageCentre) {
    homepageCentre.classList.add("show");
  }

  // ! Hamburger menu toggle
  const hamburger = document.getElementById("hamburger-checkbox");
  const navLinks = document.querySelector(".navbar-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("change", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ! Body loaded
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});
