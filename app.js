import * as data from "./language.json" with { type: "json" };

function renderNavbar(lang) {
  const container = document.getElementById("navbar-links-container");
  if (!container) return;

  const navItems = data.default[lang]["nav"];

  const navHTML = navItems
    .map((item, index) => {
      const activeClass = index === 0 ? "active" : "";
      return `
            <li class="nav-item">
                <a class="nav-link" href="${item.href}">${item.text}</a>
            </li>
        `;
    })
    .join("");

  container.innerHTML = navHTML;
  initNavigation();
}

const skills = [
  { name: "Python", icon: "bi bi-code-slash" },
  { name: "FastAPI", icon: "bi bi-lightning-charge" },
  { name: "Java", icon: "bi bi-cup-hot" },
  { name: "SQL", icon: "bi bi-database" },
  { name: "AWS", icon: "bi bi-cloud-arrow-up" },
  { name: "Cybersecurity", icon: "bi bi-shield-lock" },
];

function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  const skillsHTML = skills
    .map(
      (skill) => `
        <div class="col-4 col-sm-3 col-md-2 p-1 d-flex justify-content-center">
    <div class="card text-center shadow-sm border-1 w-100 py-2 custom-card-skill">
        <div class="card-body d-flex flex-column align-items-center justify-content-center p-1">
            <i class="${skill.icon} text-warning mb-1" style="font-size: 1.8rem; -webkit-text-stroke: 0.03em;"></i>
            <h5 class="card-title m-0">
                ${skill.name.toUpperCase()}
            </h5>
        </div>
    </div>
</div>
    `,
    )
    .join("");

  container.innerHTML = skillsHTML;
}

const projects = [
  {
    title: "EnergyApp",
    tags: ["REACT", "TYPESCRIPT", "PYTHON", "FASTAPI", "POSTGRESQL"],
    image: "assets/img_energyapp2.png",
    githubUrl: "https://github.com/Leisy-App",
    description: {
      en: "A high-performance data visualization platform built for energy analysts. Focuses on clarity and speed.",
      es: "Una plataforma de visualización de datos de alto rendimiento creada para analistas energéticos. Enfocada en la claridad y velocidad.",
    },
  },
  {
    title: "Task Manager",
    tags: ["JS", "HTML", "CSS"],
    image: "assets/img_task_manager1.png",
    githubUrl: "https://github.com/Leisy17/task--manager-leisy",
    description: {
      en: "An interactive task management platform featuring robust state handling and secure batch operations for data clearing.",
      es: "Una plataforma interactiva de gestión de tareas con un manejo robusto de estados y operaciones en lote seguras para el borrado de datos.",
    },
  },
  {
    title: "Bike Parts Pro",
    tags: ["JS", "HTML", "CSS", "JAVA", "POSTGRESQL"],
    image: "assets/img_bike_parts_pro1.png",
    githubUrl: "https://github.com/AcStarPlayer/Proyecto-Bike_Parts_Pro",
    description: {
      en: "An interactive e-commerce platform for premium bicycle parts, featuring dynamic stock management and a secure, optimized checkout flow.",
      es: "Una plataforma interactiva de comercio electrónico para partes de bicicletas premium, con gestión dinámica de inventario y un flujo de pago seguro y optimizado.",
    },
  },
];

function renderProjects(lang) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const btnText = data.default[lang]["viewGitHub"];

  const projectsHTML = projects
    .map((project) => {
      const tagsHTML = project.tags
        .map(
          (tag) => `
            <span class="badge text-muted p-0 mr-3 mb-1 font-weight-light text-warning" style="letter-spacing: 0.08em; font-size: 0.68rem; background: none; opacity: 0.8;">
                ${tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
            </span>
        `,
        )
        .join("");

      return `
            <div class="col-12 col-sm-6 col-md-4 p-2 d-flex justify-content-center">
                <div class="card border-1 custom-card-project w-100">
                    
                    <div class="project-img-container d-flex justify-content-center align-items-center">
                        <img src="${project.image}" class="img-fluid rounded-sm" alt="${project.title}">
                    </div>
                    
                    <div class="card-body px-3 py-3 d-flex flex-column">
                        <h4 class="project-title text-warning font-weight-normal">
                            ${project.title.toUpperCase()}
                        </h4>
                        
                        <div class="project-tags mb-2 d-flex flex-wrap">
                            ${tagsHTML}
                        </div>
                        
                        <p class="project-desc font-weight-light text-muted mb-3 small">
                            ${project.description[lang]}
                        </p>
                        
                        <div class="mt-auto pt-3">
                          <a href="${project.githubUrl}" target="_blank" 
                            class="btn text-uppercase d-inline-flex align-items-center custom-btn-link">
                              <span class="mr-2">${btnText}</span>
                              <i class="bi bi-arrow-right text-warning"></i>
                          </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
    .join("");

  container.innerHTML = projectsHTML;
}

function viewPDF(lang) {
  const file =
    lang === "es"
      ? "assets/CV - Leisy Sánchez - es.pdf"
      : "assets/Resume - Leisy Sánchez - en.pdf";

  window.open(file, "_blank");
}

const contactLinks = [
  {
    id: "cv",
    label: {
      es: "DESCARGAR CV",
      en: "DOWNLOAD CV",
    },
    value: {
      es: "Hoja de vida / Portafolio",
      en: "Resume / Portfolio",
    },
    icon: "bi-file-earmark-arrow-down",
  },
  {
    id: "email",
    label: "EMAIL",
    value: "leisysado@gmail.com",
    url: "mailto:leisysado@gmail.com",
    icon: "bi-envelope",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: "https://www.linkedin.com/in/leisy-sanchez",
    url: "https://www.linkedin.com/in/leisy-sanchez",
    icon: "bi-share",
  },
  {
    id: "github",
    label: "GITHUB",
    value: "https://github.com/Leisy17",
    url: "https://github.com/Leisy17",
    icon: "bi-terminal",
  },
];

function renderContactLinks(lang) {
  const container = document.getElementById("contact-container");
  if (!container) return;

  const contactHTML = contactLinks
    .map((link) => {
      if (link.id === "cv") {
        return `
        <a
          href=""
          onclick="event.preventDefault(); viewPDF('${lang}');"
          class="d-flex align-items-center justify-content-between px-5 p-3 mb-3 w-100 custom-cv-card"
          id="content-to-print"
        >
          
          <div class="d-flex align-items-center w-100">

            <div class="mr-3 text-muted">
              <i class="bi ${link.icon}"></i>
            </div>

            <div class="d-flex flex-column text-start">

              <span class="text-secondary custom-label">
                ${
                  typeof link.label === "object" ? link.label[lang] : link.label
                }
              </span>

              <span id="link-value" class="text-warning font-weight-light">
                ${
                  typeof link.value === "object" ? link.value[lang] : link.value
                }
              </span>

            </div>
          </div>

          <div class="text-warning custom-arrow-icon">
            <i class="bi bi-arrow-up-right"></i>
          </div>

        </a>
      `;
      }
      return `
            <a href="${link.url}" target="${link.id === "email" ? "_self" : "_blank"}" rel="noopener noreferrer" 
               class="d-flex align-items-center justify-content-between px-5 p-3 mb-3 w-100 custom-contact-card">
                
                <div class="d-flex align-items-center w-100">
                    <div class="mr-3 text-muted">
                        <i class="bi ${link.icon}"></i>
                    </div>
                    
                    <div class="d-flex flex-column text-start">
                        <span class="text-secondary custom-label">
                            ${link.label}
                        </span>
                        <span id="link-value" class="text-warning font-weight-light">
                            ${link.value}
                        </span>
                    </div>
                </div>

                <div class="text-warning custom-arrow-icon">
                    <i class="bi bi-arrow-up-right"></i>
                </div>
            </a>
        `;
    })
    .join("");

  container.innerHTML = contactHTML;
}

function renderFooterLinks() {
  const container = document.getElementById("footer-links-container");
  if (!container) return;

  const footerHTML = contactLinks
    .map((link, index) => {
      if(link.id == 'cv') {
        return;
      }
      const marginClass = index === contactLinks.length - 1 ? "ml-3" : "mx-3";

      const formattedLabel =
        link.label.charAt(0).toUpperCase() + link.label.slice(1).toLowerCase();

      return `
            <a href="${link.url}" 
               target="${link.id === "email" ? "_self" : "_blank"}" 
               rel="noopener noreferrer" 
               class="${marginClass} text-decoration-none custom-footer-link">
                ${formattedLabel}
            </a>
        `;
    })
    .join("");

  container.innerHTML = footerHTML;
}

function renderTextByLang(lang) {
  renderNavbar(lang);
  let brand = document.getElementById("brand");
  brand.innerText = data.default[lang]["brand"];
  let resume = document.getElementById("resume");
  resume.innerText = data.default[lang]["resume"];
  let stack = document.getElementById("stack");
  stack.innerText = data.default[lang]["stack"];
  renderProjects(lang);
  let projects = document.getElementById("projects-title");
  projects.innerText = data.default[lang]["projects"];
  let quota = document.getElementById("quota");
  quota.innerText = data.default[lang]["quota"];
  let connect = document.getElementById("connect");
  connect.innerText = data.default[lang]["connect"];
  let footer = document.getElementById("footerMsg");
  footer.innerText = data.default[lang]["footer"];
  renderContactLinks(lang);
  renderFooterLinks();
}

function toggleBtn(element) {
  const group = element.parentElement;
  group
    .querySelectorAll(".btn-outline-warning")
    .forEach((btn) => btn.classList.remove("active"));
  element.classList.add("active");
  localStorage.setItem("lang", element.value);
  renderTextByLang(element.value);
}

function initNavigation() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => {
        l.classList.remove("active");
        if (l.parentElement) l.parentElement.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
  /* Tomado de Gemini */
  const selector = Array.from(navLinks)
    .map((link) => link.getAttribute("href"))
    .filter((href) => href && href.startsWith("#"))
    .join(", ");

  if (!selector) return;

  const sections = document.querySelectorAll(selector);
  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -55% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            navLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  window.addEventListener(
    "scroll",
    () => {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 10;
      if (atBottom) {
        navLinks.forEach((l) => {
          l.classList.remove("active");
          if (l.parentElement) l.parentElement.classList.remove("active");
        });
        const lastLink = navLinks[navLinks.length - 1];
        if (lastLink) lastLink.classList.add("active");
      }
    },
    { passive: true },
  );
}

function applyTheme(isDark) {
  const icon = document.querySelector("#theme-toggle i");
  if (icon) icon.className = isDark ? "bi bi-sun" : "bi bi-moon-stars";
  const logoSrc = isDark ? "assets/signature_960x640_dark.png" : "assets/signature_960x640.png";
  document.querySelectorAll(".logo-img").forEach(img => img.src = logoSrc);
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "");
  applyTheme(isDark);
}

window.toggleBtn = toggleBtn;
window.viewPDF = viewPDF;
window.toggleTheme = toggleTheme;

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    applyTheme(true);
  }

  renderSkills();
  initNavigation();
  const savedLang = localStorage.getItem("lang") || "en";
  const activeBtn = document.querySelector(
    `.btn-group button[value="${savedLang}"]`,
  );
  if (activeBtn) {
    document
      .querySelectorAll(".btn-outline-warning")
      .forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
  }
  renderTextByLang(savedLang);
});

window.addEventListener("scroll", () => {
  const footer = document.getElementById("footer");
  const button = document.getElementById("theme-toggle");

  const rect = footer.getBoundingClientRect();

  if (rect.top < window.innerHeight) {
    button.style.display = "none";
  } else {
    button.style.display = "block";
  }
});
