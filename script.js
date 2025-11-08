// Load config.json once
fetch("config.json")
  .then((response) => response.json())
  .then((config) => {
    // Banner logic
    const banner = document.getElementById("bannerText");
    if (banner && config.Banner) {
      banner.textContent = config.Banner;
      banner.setAttribute("href", config.BannerLink || "#");
      if (config.BannerRedirect) {
        banner.setAttribute("target", "_blank");
      }
    }

    // Footer contact logic
    const contact = config.Contact;
    const footer = document.querySelector(".footer-contact");
    if (footer && contact) {
      footer.innerHTML = `
        <h3>Contact</h3>
        <p>${contact.Name}</p>
        <p>Email: <a href="mailto:${contact.Email}">${contact.Email}</a></p>
        <p>Office: <a href="tel:${contact.Phone}">${formatPhone(
        contact.Phone
      )}</a></p>
        <p>Address: ${contact.Address.join("<br />")}</p>
      `;
    }

    // Quick Links logic
    const links = config.QuickLinks;
    const quickLinksList = document.getElementById("quick-links-list");
    if (quickLinksList && Array.isArray(links)) {
      links.forEach((link) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.title;
        li.appendChild(a);
        quickLinksList.appendChild(li);
      });
    }
  })
  .catch((error) => console.error("Error loading config.json:", error));

// Helper to format phone number
function formatPhone(phone) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
}

// Sticky navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("main-nav");
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

// Mobile nav toggle
function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("active");
  document.getElementById("hamburger").classList.toggle("active");
}

// Custom cursor logic
const cursor = document.querySelector(".cursor");
let mouseX = 0,
  mouseY = 0;
let currentX = 0,
  currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.17;
  currentY += (mouseY - currentY) * 0.17;
  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Grow effect on hover
document
  .querySelectorAll(
    "a, button, .nav-links li, .mobile-nav li, .social-sidebar li, .social-sidebar li i"
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("grow"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
  });
