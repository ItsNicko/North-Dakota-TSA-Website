      // Load banner text from config.json
      fetch("config.json")
        .then((response) => response.json())
        .then((config) => {
          const banner = document.getElementById("bannerText");
          banner.textContent = config.Banner;

          if (config.BannerRedirect && config.BannerLink) {
            banner.setAttribute("href", config.BannerLink);
            banner.setAttribute("target", "_blank"); // optional: open in new tab
          } else {
            banner.setAttribute("href", config.BannerLink);
          }
        })
        .catch((error) => {
          console.error("Error loading config:", error);
        });

        fetch('config.json')
  .then(response => response.json())
  .then(config => {
    // Populate footer contact
    const contact = config.Contact;
    const footer = document.querySelector('.footer-contact');
    if (footer && contact) {
      footer.innerHTML = `
        <h3>Contact</h3>
        <p>${contact.Name}</p>
        <p>Email: <a href="mailto:${contact.Email}">${contact.Email}</a></p>
        <p>Office: <a href="tel:${contact.Phone}">${formatPhone(contact.Phone)}</a></p>
        <p>Address: ${contact.Address[0]}<br />
        ${contact.Address[1]}<br />
        ${contact.Address[2]}</p>
      `;
    }

  })
  .catch(error => console.error('Error loading config.json:', error));

// Helper to format phone number
function formatPhone(phone) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3');
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
          el.addEventListener("mouseleave", () =>
            cursor.classList.remove("grow")
          );
        });