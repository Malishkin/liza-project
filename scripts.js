document.getElementById("menu-icon").addEventListener("click", function () {
  this.classList.toggle("change");
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
});

const navLinks = document.querySelectorAll("#nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});
