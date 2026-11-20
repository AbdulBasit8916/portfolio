const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const sections = [...document.querySelectorAll("main section[id]")];
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}, { passive: true });

// Cursor spotlight & subtle 3D tilt on skill/project cards
const interactiveCards = document.querySelectorAll(".skill-card, .project-card");
interactiveCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    const rotateY = ((x / rect.width) - 0.5) * 5;
    const rotateX = ((y / rect.height) - 0.5) * -5;
    card.style.transform = `translateY(-7px) perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});