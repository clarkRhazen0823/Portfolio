// script.js

// Select the necessary DOM elements
const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");

// Toggle the mobile menu and change the icon when clicked
menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Toggles the hamburger icon to an 'X' (assuming you are using FontAwesome)
  menuIcon.classList.toggle("fa-xmark");
});

// Close the menu automatically when a navigation link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuIcon.classList.remove("fa-xmark");
  });
});
