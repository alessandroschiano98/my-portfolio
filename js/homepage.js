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

// ! Transizione FRASE

const text = "THE EYES SHAPES VISIONS INTO PROJECTS THAT LEAVE A MARK.";
const container = document.getElementById("textPhrase");
let i = 0;

function typeWriter() {
    if (i < text.length) {
        container.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); 
    }
}

typeWriter();



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





