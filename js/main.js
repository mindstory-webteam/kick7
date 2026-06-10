// Constants
const WHATSAPP_NUMBER = "918281610051";
const TARGET = new Date("2026-07-06T09:00:00+05:30").getTime();

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Initialize all features
  // initHeaderScroll();
  initMobileMenu();
  initParticles();
  initCountdown();
  initParallax();
  initLightbox();
  initFAQ();
  initRegistrationForm();
  initScrollAnimations();
  initSmoothScroll();
});

// 1. Header Scroll effect
// function initHeaderScroll() {
//   const header = document.getElementById("main-header");
//   const container = document.getElementById("header-container");

//   const onScroll = () => {
//     if (window.scrollY > 20) {
//       header.classList.remove("py-5");
//       header.classList.add("py-3");
//       container.classList.add("glass", "shadow-navy");
//     } else {
//       header.classList.remove("py-3");
//       header.classList.add("py-5");
//       container.classList.remove("glass", "shadow-navy");
//     }
//   };

//   window.addEventListener("scroll", onScroll);
//   onScroll(); // initial call
// }

// 2. Mobile Menu Toggle
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-nav-link");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("is-open");
    // toggle icon
    const icon = toggle.querySelector("i");
    if (!menu.classList.contains("is-open")) {
      icon.setAttribute("data-lucide", "menu");
    } else {
      icon.setAttribute("data-lucide", "x");
    }
    lucide.createIcons({ attrs: { class: "w-5 h-5" }, nameAttr: "data-lucide" });
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      const icon = toggle.querySelector("i");
      icon.setAttribute("data-lucide", "menu");
      lucide.createIcons({ attrs: { class: "w-5 h-5" }, nameAttr: "data-lucide" });
    });
  });
}

// 3. Floating Particles Generator
function initParticles() {
  const container = document.getElementById("particles-container");
  if (!container) return;
  const count = 28;

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 8;
    const isGold = i % 3 === 0;

    const span = document.createElement("span");
    span.className = "particle absolute rounded-full";
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${left}%`;
    span.style.top = `${top}%`;
    span.style.animationDelay = `${delay}s`;
    span.style.background = isGold ? "var(--gold)" : "rgba(255,255,255,0.7)";
    span.style.boxShadow = isGold ? "0 0 12px var(--gold)" : "0 0 8px rgba(255,255,255,0.6)";

    container.appendChild(span);
  }
}

// 4. Scoreboard countdown
function initCountdown() {
  function diff() {
    const d = Math.max(0, TARGET - Date.now());
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d / 3600000) % 24),
      minutes: Math.floor((d / 60000) % 60),
      seconds: Math.floor((d / 1000) % 60),
    };
  }

  function update() {
    const t = diff();
    document.getElementById("cd-days").textContent = String(t.days).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(t.hours).padStart(2, "0");
    document.getElementById("cd-minutes").textContent = String(t.minutes).padStart(2, "0");
    document.getElementById("cd-seconds").textContent = String(t.seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// 5. Mouse Parallax for Hero Background
function initParallax() {
  const bg = document.getElementById("hero-parallax-bg");
  if (!bg) return;

  window.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const percentX = (e.clientX - centerX) / centerX;
    const percentY = (e.clientY - centerY) / centerY;

    const intensity = 18;
    const x = percentX * intensity;
    const y = percentY * intensity;

    bg.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
  });
}

// 6. Venue Image Lightbox Modal
function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const close = document.getElementById("lightbox-close");
  const triggers = document.querySelectorAll(".lightbox-btn");

  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      img.setAttribute("src", src);
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden"; // disable scroll
    });
  });

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = ""; // restore scroll
  };

  close.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// 7. Accordion logic for FAQ
function initFAQ() {
  const triggers = document.querySelectorAll(".faq-trigger");

  // Open the first item by default (index 0)
  const firstTrigger = document.querySelector('.faq-trigger[data-index="0"]');
  if (firstTrigger) {
    const firstContent = firstTrigger.nextElementSibling;
    const firstIcon = firstTrigger.querySelector(".faq-icon");
    firstContent.classList.add("is-open");
    firstIcon.classList.add("is-open");
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling;
      const icon = trigger.querySelector(".faq-icon");
      const isOpened = !!content.classList.contains("is-open");

      // Close all FAQ contents
      document.querySelectorAll(".faq-content").forEach(el => el.classList.remove("is-open"));
      document.querySelectorAll(".faq-icon").forEach(el => el.classList.remove("is-open"));

      // Toggle this clicked item
      if (!isOpened) {
        content.classList.add("is-open");
        icon.classList.add("is-open");
      }
    });
  });
}

// 8. Custom Premium Toast Notification System
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    container.style.cssText = 'position:fixed;top:1.25rem;left:50%;transform:translateX(-50%);z-index:100;display:flex;flex-direction:column;gap:0.5rem;pointer-events:none;width:100%;max-width:24rem;padding:0 1rem;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'glass';
  toast.style.cssText = `border-radius:0.75rem;padding:1rem;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.4);pointer-events:auto;transform:translateY(-20px);opacity:0;transition:all 0.3s;border:1px solid ${type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'
    }`;

  const text = document.createElement('span');
  text.style.cssText = 'font-size:0.875rem;font-weight:500;color:#fff;';
  text.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = 'color:rgba(255,255,255,0.6);margin-left:0.75rem;font-size:1.125rem;font-weight:700;line-height:1;background:none;border:none;cursor:pointer;';
  closeBtn.innerHTML = '&times;';
  closeBtn.onmouseover = () => { closeBtn.style.color = '#fff'; };
  closeBtn.onmouseout = () => { closeBtn.style.color = 'rgba(255,255,255,0.6)'; };
  closeBtn.onclick = () => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  };

  toast.appendChild(text);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);

  // Auto dismiss
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.transform = 'translateY(-20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// 9. Registration form validation and WhatsApp submission
function initRegistrationForm() {
  const form = document.getElementById("registration-form");
  if (!form) return;

  const fields = [
    "teamName",
    "captainName",
    "mobile",
    "whatsapp",
    "email",
    "district",
    "players",
    "jersey",
    "notes"
  ];

  const validators = {
    teamName: (val) =>
      val.trim().length >= 2 && val.trim().length <= 80
        ? null
        : "Team name must be between 2 and 80 characters",

    captainName: (val) =>
      val.trim().length >= 2 && val.trim().length <= 80
        ? null
        : "Captain name must be between 2 and 80 characters",

    mobile: (val) =>
      /^[0-9+\-\s]{7,15}$/.test(val.trim())
        ? null
        : "Enter a valid mobile number",

    whatsapp: (val) =>
      /^[0-9+\-\s]{7,15}$/.test(val.trim())
        ? null
        : "Enter a valid WhatsApp number",

    email: (val) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) &&
      val.trim().length <= 255
        ? null
        : "Enter a valid email address",

    district: (val) =>
      val.trim().length >= 2 && val.trim().length <= 80
        ? null
        : "District must be between 2 and 80 characters",

    players: (val) =>
      /^\d{1,2}$/.test(val.trim())
        ? null
        : "Enter number of players",

    jersey: (val) =>
      val.trim().length >= 2 && val.trim().length <= 40
        ? null
        : "Jersey color must be between 2 and 40 characters",

    notes: (val) =>
      val.trim().length <= 500
        ? null
        : "Notes must be under 500 characters"
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let hasErrors = false;
    const data = {};

    fields.forEach((field) => {
      const inputEl = document.getElementById(`form-${field}`);
      const errorEl = document.getElementById(`error-${field}`);

      if (!inputEl || !errorEl) return;

      const val = inputEl.value;
      const errorMsg = validators[field](val);

      if (errorMsg) {
        hasErrors = true;
        errorEl.textContent = errorMsg;
        errorEl.classList.remove("hidden");
        inputEl.classList.add("border-red-500");
      } else {
        errorEl.classList.add("hidden");
        inputEl.classList.remove("border-red-500");
        data[field] = val.trim();
      }
    });

    if (hasErrors) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    const message = `Hello Kick7 Super Cup Team,

I would like to register for Kick7 Super Cup '26.

Team Name: ${data.teamName}
Captain Name: ${data.captainName}
Mobile Number: ${data.mobile}
WhatsApp Number: ${data.whatsapp}
Email: ${data.email}
District: ${data.district}
Players: ${data.players}
Jersey Color: ${data.jersey}
${data.notes ? `Notes: ${data.notes}\n` : ""}

Please contact us regarding registration.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
    showToast(
      "Opening WhatsApp to complete your registration...",
      "success"
    );

    form.reset();
  });

  fields.forEach((field) => {
    const inputEl = document.getElementById(`form-${field}`);
    const errorEl = document.getElementById(`error-${field}`);

    if (!inputEl || !errorEl) return;

    inputEl.addEventListener("input", () => {
      errorEl.classList.add("hidden");
      inputEl.classList.remove("border-red-500");
    });
  });
}

// 10. Scroll trigger reveal animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}
// 11. Smooth scroll without URL hash
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Remove hash from URL
        history.replaceState(null, "", window.location.pathname);
      }
    });
  });

  // Remove hash if page loads with one
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
  }
}