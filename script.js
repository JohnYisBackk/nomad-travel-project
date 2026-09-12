"use strict";

// ===============================
// LUCIDE ICONS
// ===============================

lucide.createIcons();

// ===============================
// SELECT ELEMENTS
// ===============================

const header = document.getElementById("header");
const navLinks = document.querySelectorAll("#nav .nav-link");
const sections = document.querySelectorAll("section");

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const revealElements = document.querySelectorAll(
  `
  .stays-category-text,
  .stays-heading,
  .stays-text,
  .stays-btn,
  .stays-location-info, 
  .experiences-main-photo,
  .experiences-pre-heading,
  .experiences-heading,
  .experiences-text,
  .experiences-btn,
  .experiences-stats,
  .destinations-heading,
  .destinations-main-text,
  .destinations-small-text,
  .destinations-btn,
  .destination-view-img,
.contact-text,
.contact-brand,
.footer-heading,
.footer-text,
.contact-form 
  `,
);

// ===============================
// STATE
// ===============================

// ===============================
// FUNCTIONS
// ===============================

function handleHeaderScroll() {
  if (window.scrollY > 60) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

function toggleMenu() {
  const isOpen = nav.classList.toggle("open");

  menuBtn.classList.toggle("active", isOpen);

  menuBtn.setAttribute("aria-expanded", isOpen);

  menuBtn.setAttribute(
    "arial-label",
    isOpen ? "Close navigation" : "Open navigation",
  );

  document.body.classList.toggle("menu-open", isOpen);
}

function closeMenu() {
  nav.classList.remove("open");
  menuBtn.classList.remove("active");

  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open navigation");

  document.body.classList.remove("menu-open");
}

// ===============================
// INTERSECTION OBSERVER
// ===============================

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;

        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.5,
  },
);

sections.forEach((section) => {
  navObserver.observe(section);
});

// ===============================
// ANIMATIONS
// ===============================

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ===============================
// EVENT LISTENERS
// ===============================

window.addEventListener("scroll", handleHeaderScroll);

menuBtn.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (!nav.classList.contains("open")) return;

  if (!nav.contains(event.target) && !menuBtn.contains(event.target)) {
    closeMenu();
  }
});

// ===============================
// INITIALIZE APP
// ===============================
