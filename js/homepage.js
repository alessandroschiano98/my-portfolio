// ! HOME

// ! HOMEPAGE (page) -------------------------
const homepageClick = document.getElementById("homepage-click");

homepageClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/html/homepage.html";
});


// ! Transizione TITOLO 

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".homepagecentre").classList.add("show");
});


// ! WORKS (page) -------------------------

const linkClick = document.getElementById("works-click");

linkClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/html/works.html";
});

// ! ABOUTME (page) -------------------------


const aboutmeClick = document.getElementById("aboutme-click");

aboutmeClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/html/aboutme.html";
});



  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // ! BURGER MENU
const toggler = document.querySelector('.navbar-toggler');
const navLinks = document.querySelector('.navbar-links');

toggler.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});




