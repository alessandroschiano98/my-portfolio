document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  setTimeout(() => {
      body.style.transition = "opacity 1s";
      body.style.opacity = "0";

      setTimeout(() => {
          window.location.href = "/html/homepage.html";
      }, 1000);

  }, 3000); 
});
