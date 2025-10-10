// ! HOME

// ! HOMEPAGE (page)
const homepageClick = document.getElementById("homepage-click");

homepageClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "index.html";
});



// ! WORKS (page)

const linkClick = document.getElementById("works-click");

linkClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "works.html";
});

// ! ABOUTME (page)


const aboutmeClick = document.getElementById("aboutme-click");

aboutmeClick.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "aboutme.html";
});
