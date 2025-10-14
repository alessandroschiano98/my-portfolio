// ! HOME

// ! HOMEPAGE (page) -------------------------
const homepageClick = document.getElementById("homepage-click");

homepageClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "index.html";
});

// ! Transizione TITOLO 

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".homepagecentre").classList.add("show");
});



// ! WORKS (page) -------------------------

const linkClick = document.getElementById("works-click");

linkClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "works.html";
});

// ! ABOUTME (page) -------------------------


const aboutmeClick = document.getElementById("aboutme-click");

aboutmeClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "aboutme.html";
});





