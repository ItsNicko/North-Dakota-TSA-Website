fetch("config.json")
  .then((res) => res.json())
  .then((cfg) => {
    let b = document.getElementById("bannerText");
    if (b && cfg.Banner) {
      b.textContent = cfg.Banner;
      b.href = cfg.BannerLink || "#";
      if (cfg.BannerRedirect) b.target = "_blank";
    }

    let c = cfg.Contact;
    let ft = document.querySelector(".footer-contact");
    if (ft && c) {
      ft.innerHTML = `
        <h3>Contact</h3>
        <p>${c.Name}</p>
        <p>Email: <a href="mailto:${c.Email}">${c.Email}</a></p>
        <p>Office: <a href="tel:${c.Phone}">${fmtPh(c.Phone)}</a></p>
        <p>Address: ${c.Address.join("<br />")}</p>
      `;
    }

    let l = cfg.QuickLinks;
    let ql = document.getElementById("quick-links-list");
    if (ql && Array.isArray(l)) {
      l.forEach((lk) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = lk.url;
        a.textContent = lk.title;
        li.appendChild(a);
        ql.appendChild(li);
      });
    }

    let r = cfg.Resources;
    let dr = document.querySelectorAll(".dropdown-item")[1];
    let ddm = dr ? dr.querySelector(".dropdown-menu") : null;
    if (ddm && Array.isArray(r)) {
      r.forEach((rs) => {
        let a = document.createElement("a");
        a.href = rs.url;
        a.textContent = rs.title;
        a.className = "dropdown-link";
        a.target = "_blank";
        a.rel = "noopener";
        ddm.appendChild(a);
      });
    }

    let mr = document.querySelectorAll(".mobile-dropdown-item")[1];
    let mdm = mr ? mr.querySelector(".mobile-dropdown-menu") : null;
    if (mdm && Array.isArray(r)) {
      r.forEach((rs) => {
        let a = document.createElement("a");
        a.href = rs.url;
        a.textContent = rs.title;
        a.className = "mobile-dropdown-link";
        a.target = "_blank";
        a.rel = "noopener";
        mdm.appendChild(a);
      });
    }
  });

function fmtPh(ph) {
  return ph.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
}

window.addEventListener("scroll", () => {
  let n = document.getElementById("main-nav");
  if (window.scrollY > 10) {
    n.classList.add("scrolled");
  } else {
    n.classList.remove("scrolled");
  }
});

function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("active");
  document.getElementById("hamburger").classList.toggle("active");
}

document.querySelectorAll(".mobile-dropdown-toggle").forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    let p = toggle.closest(".mobile-dropdown-item");
    p.classList.toggle("active");
  });
});

let cur = document.querySelector(".cursor");
let mx = 0,
  my = 0;
let cx = 0,
  cy = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function moveCur() {
  cx += (mx - cx) * 0.17;
  cy += (my - cy) * 0.17;
  if (cur) {
    cur.style.left = `${cx}px`;
    cur.style.top = `${cy}px`;
  }
  requestAnimationFrame(moveCur);
}

moveCur();

document
  .querySelectorAll(
    "a, button, .nav-links li, .mobile-nav li, .social-sidebar li, .social-sidebar li i"
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cur && cur.classList.add("grow"));
    el.addEventListener(
      "mouseleave",
      () => cur && cur.classList.remove("grow")
    );
  });

fetch("about.json")
  .then((res) => res.json())
  .then((ad) => {
    let atc = document.getElementById("admin-team-container");
    if (atc && ad.stateAdvisor) {
      let adv = ad.stateAdvisor;
      let td = atc.querySelector(".text");
      td.innerHTML = `
        <h2>Administrative Team</h2>
        <p><strong>State Advisor: ${adv.name}</strong></p>
        <p>
          Email: <a href="mailto:${adv.email}">${adv.email}</a> /
          <a href="mailto:${adv.email2}">${adv.email2}</a>
        </p>
        <p>Phone: <a href="tel:+1${adv.phone.replace(/[^\d]/g, "")}">${
        adv.phone
      }</a></p>
      `;
    }

    let oc = document.getElementById("officers-container");
    if (oc && ad.stateOfficers) {
      oc.innerHTML = ad.stateOfficers
        .map((o, i) => {
          let ie = i % 2 === 0;
          let ih = `<div class="image"><img src="${o.image}" alt="${o.name} - ${o.position}" /></div>`;
          let th = `
          <div class="text">
            <h3>${o.name} – ${o.position}</h3>
            <p>"${o.bio}"</p>
          </div>
        `;
          return `
          <div class="info-block">
            ${ie ? th + ih : ih + th}
          </div>
        `;
        })
        .join("");
    }
  });
