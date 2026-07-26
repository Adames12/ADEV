const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");
const revealItems = document.querySelectorAll(".reveal");
const goldField = document.querySelector(".gold-field");
const customSelects = document.querySelectorAll("[data-select]");
const successPopup = document.getElementById("successPopup");
const popupCard = document.querySelector(".success-card");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

function toggleNavigationMenu() {
  if (!siteNav || !navToggle) return;

  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeNavigationMenu() {
  if (!siteNav || !navToggle) return;

  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function initializeNavigation() {
  navToggle?.addEventListener("click", toggleNavigationMenu);

  siteNav?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNavigationMenu();
    }
  });
}

function initializeCustomSelects() {
  customSelects.forEach((select) => {
    const trigger = select.querySelector(".custom-select-trigger");
    const triggerText = trigger?.querySelector("span");
    const menu = select.querySelector(".custom-select-menu");
    const hiddenInput = select.closest(".field")?.querySelector('input[type="hidden"]');
    const options = select.querySelectorAll("[data-value]");

    trigger?.addEventListener("click", () => {
      const isOpen = select.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.dataset.value || "";
        if (triggerText) triggerText.textContent = value;
        if (hiddenInput) hiddenInput.value = value;

        options.forEach((item) => item.setAttribute("aria-selected", "false"));
        option.setAttribute("aria-selected", "true");
        select.classList.remove("is-open");
        trigger?.setAttribute("aria-expanded", "false");
      });
    });

    menu?.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        select.classList.remove("is-open");
        trigger?.setAttribute("aria-expanded", "false");
        trigger?.focus();
      }
    });
  });

  document.addEventListener("click", (event) => {
    customSelects.forEach((select) => {
      if (!select.contains(event.target)) {
        select.classList.remove("is-open");
        select.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function resetFormState(button, originalText) {
  button.textContent = originalText;
  button.disabled = false;
}

function handleContactSubmit(event) {
  
  const token = turnstile.getResponse();

if (!token) {
    showNotification(
    "warning",
    "Ověření",
    "Prosím potvrďte, že nejste robot."
);
    return;
}
  
event.preventDefault();

  console.count("SUBMIT");

  const button = contactForm?.querySelector("button");

  if (!button || !contactForm) return;

  const originalText = button.textContent;

  button.textContent = "Odesílám...";
  button.disabled = true;

  if (formNote) {
    formNote.textContent = "Odesílám zprávu...";
  }

  const formData = new FormData(contactForm);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const projectType = String(formData.get("projectType") || "Webová stránka").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {

    button.textContent = "Vyplňte pole";

    if (formNote) {
      formNote.textContent =
        "Vyplňte prosím jméno, e-mail i zprávu.";
    }

    window.setTimeout(() => {
      resetFormState(button, originalText);
    }, 1800);

    return;
  }

  const initial = name.charAt(0).toUpperCase();

  Promise.all([
    
    emailjs.send(
      "service_6m00fe6",
      "template_o9uf33g",
      {
        initial: initial,
        name: name,
        email: email,
        phone: phone || "Neuvedeno",
        project_type: projectType,
        message: message
      }
    ),
    
  ])

  .then(() => {

    button.textContent = "Zpráva odeslána";

    if (formNote) {
      formNote.textContent =
        "Hotovo. Zpráva byla úspěšně odeslána.";
    }

    contactForm.reset();

    showSuccessPopup();

  })

  .catch((error) => {

    console.error(error);

    button.textContent = "Chyba odeslání";

    if (formNote) {
      formNote.textContent =
        "Nepodařilo se odeslat formulář.";
    }

  })

  .finally(() => {

    window.setTimeout(() => {
      resetFormState(button, originalText);
    }, 1800);

  });

}

function initializeRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

function initializeGoldField() {
  if (!(goldField instanceof HTMLCanvasElement)) return;

  const context = goldField.getContext("2d");
  const pointer = { x: 0, y: 0, active: false };
  let particles = [];
  let lasers = [];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  const createParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.8 + 0.4,
    speedX: (Math.random() - 0.5) * 0.28,
    speedY: Math.random() * -0.42 - 0.08,
    glow: Math.random() * 0.45 + 0.25,
    phase: Math.random() * Math.PI * 2,
  });

  const createLaser = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    length: Math.random() * 360 + 260,
    angle: -0.55 + Math.random() * 0.34,
    speed: Math.random() * 1.6 + 0.7,
    width: Math.random() * 1.6 + 0.7,
    alpha: Math.random() * 0.28 + 0.16,
    delay: Math.random() * 1200,
  });

  const resizeField = () => {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    goldField.width = Math.floor(width * pixelRatio);
    goldField.height = Math.floor(height * pixelRatio);
    goldField.style.width = `${width}px`;
    goldField.style.height = `${height}px`;
    context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.min(130, Math.max(58, Math.floor((width * height) / 15000)));
    particles = Array.from({ length: count }, createParticle);
    lasers = Array.from(
      { length: Math.min(18, Math.max(8, Math.floor(width / 120))) },
      createLaser
    );
  };

  const draw = (time) => {
    if (!context) return;

    context.clearRect(0, 0, width, height);

    const beam = context.createLinearGradient(0, 0, width, height);
    beam.addColorStop(0, "rgba(255, 215, 106, 0)");
    beam.addColorStop(0.5, "rgba(255, 215, 106, 0.08)");
    beam.addColorStop(1, "rgba(255, 215, 106, 0)");
    context.fillStyle = beam;
    context.fillRect(0, 0, width, height);

    lasers.forEach((laser) => {
      const pulse = Math.sin((time + laser.delay) * 0.0024) * 0.5 + 0.5;
      laser.x += Math.cos(laser.angle) * laser.speed;
      laser.y += Math.sin(laser.angle) * laser.speed;

      if (laser.x > width + laser.length || laser.y < -laser.length) {
        Object.assign(laser, createLaser(), {
          x: -laser.length * Math.random(),
          y: height + Math.random() * 180,
        });
      }

      const endX = laser.x + Math.cos(laser.angle) * laser.length;
      const endY = laser.y + Math.sin(laser.angle) * laser.length;
      const gradient = context.createLinearGradient(laser.x, laser.y, endX, endY);
      gradient.addColorStop(0, "rgba(255, 215, 106, 0)");
      gradient.addColorStop(0.48, `rgba(255, 239, 184, ${laser.alpha + pulse * 0.36})`);
      gradient.addColorStop(0.52, `rgba(255, 183, 42, ${laser.alpha + pulse * 0.2})`);
      gradient.addColorStop(1, "rgba(255, 215, 106, 0)");

      context.save();
      context.shadowColor = "rgba(255, 215, 106, 0.82)";
      context.shadowBlur = 22 + pulse * 26;
      context.strokeStyle = gradient;
      context.lineWidth = laser.width + pulse * 1.2;
      context.beginPath();
      context.moveTo(laser.x, laser.y);
      context.lineTo(endX, endY);
      context.stroke();
      context.restore();
    });

    particles.forEach((particle) => {
      const shimmer = Math.sin(time * 0.002 + particle.phase) * 0.35 + 0.65;
      particle.x += particle.speedX + Math.sin(time * 0.0008 + particle.phase) * 0.08;
      particle.y += particle.speedY;

      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150) {
          const push = (150 - distance) / 150;
          particle.x += (dx / Math.max(distance, 1)) * push * 1.2;
          particle.y += (dy / Math.max(distance, 1)) * push * 1.2;
        }
      }

      if (particle.y < -20 || particle.x < -30 || particle.x > width + 30) {
        Object.assign(particle, createParticle(), { y: height + 20 });
      }

      const gradient = context.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 8
      );
      gradient.addColorStop(0, `rgba(255, 232, 157, ${particle.glow * shimmer})`);
      gradient.addColorStop(0.45, `rgba(240, 185, 60, ${particle.glow * 0.34 * shimmer})`);
      gradient.addColorStop(1, "rgba(240, 185, 60, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius * 8, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resizeField);
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  });
  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  resizeField();
  requestAnimationFrame(draw);
}

function showSuccessPopup() {
  if (!successPopup) return;

  successPopup.classList.remove("hide");
  successPopup.classList.add("show");
  document.body.style.overflow = "hidden";

  window.setTimeout(() => {
    hideSuccessPopup();
  }, 4000);
}

function hideSuccessPopup() {
  if (!successPopup) return;

  successPopup.classList.remove("show");
  successPopup.classList.add("hide");
  document.body.style.overflow = "";

  window.setTimeout(() => {
    successPopup.classList.remove("hide");
  }, 450);
}

function initializeSuccessPopup() {
  successPopup?.addEventListener("click", (event) => {
    if (event.target === successPopup) {
      hideSuccessPopup();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideSuccessPopup();
    }
  });

  successPopup?.addEventListener("mousemove", (event) => {
    if (!popupCard) return;

    const rect = popupCard.getBoundingClientRect();
    mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
  });

  successPopup?.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });
}

function animatePopup() {
  currentX += (mouseY - currentX) * 0.04;
  currentY += (mouseX - currentY) * 0.04;

  if (popupCard) {
    popupCard.style.transform = `
      perspective(1200px)
      rotateX(${currentX}deg)
      rotateY(${currentY}deg)
      translateY(-2px)
    `;
  }

  requestAnimationFrame(animatePopup);
}

initializeNavigation();
initializeCustomSelects();
contactForm?.addEventListener("submit", handleContactSubmit);
initializeRevealObserver();
initializeGoldField();
initializeSuccessPopup();
animatePopup();

function showNotification(type, title, text){

    const container = document.getElementById("notification-container");

    const notification = document.createElement("div");

    notification.className = `notification ${type}`;

    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-text">${text}</div>
    `;

    container.appendChild(notification);

    requestAnimationFrame(()=>{
        notification.classList.add("show");
    });

    setTimeout(()=>{
        notification.classList.remove("show");

        setTimeout(()=>{
            notification.remove();
        },400);

    },5000);

}
