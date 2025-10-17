setTimeout(() => {
    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = "homepage.html";
    }, 1000);
  }, 3000);
  