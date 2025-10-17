document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 300);
    });
  });