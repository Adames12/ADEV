const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");
const revealItems = document.querySelectorAll(".reveal");
const goldField = document.querySelector(".gold-field");
const customSelects = document.querySelectorAll("[data-select]");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

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

  document.addEventListener("click", (event) => {
    if (!select.contains(event.target)) {
      select.classList.remove("is-open");
      trigger?.setAttribute("aria-expanded", "false");
    }
  });

  menu?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      select.classList.remove("is-open");
      trigger?.setAttribute("aria-expanded", "false");
      trigger?.focus();
    }
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector("button");
  if (!button) return;

  const originalText = button.textContent;
  button.textContent = "Odesilam...";
  button.disabled = true;
  if (formNote) {
    formNote.textContent = "Odesilam zpravu...";
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const projectType = String(formData.get("projectType") || "Webova stranka").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    button.textContent = "Vyplnte pole";
    if (formNote) {
      formNote.textContent = "Vyplnte prosim jmeno, e-mail i zpravu.";
    }
    window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1800);
    return;
  }

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_key: "VLOZTE_SEM_WEB3FORMS_ACCESS_KEY",
      subject: `Nova poptavka Team ADEV - ${projectType}`,
      from_name: "Team ADEV - kontaktni formular",
      name: `Jmeno: ${name}`,
      email,
      phone: phone || "Neuvedeno",
      project_type: projectType,
      message: [
        "Nova zprava z webu Team ADEV",
        "",
        `Jmeno: ${name}`,
        `E-mail: ${email}`,
        `Telefon: ${phone || "Neuvedeno"}`,
        `Typ projektu: ${projectType}`,
        "",
        "Zprava:",
        message,
        "",
        "Rychla odpoved:",
        phone ? "Zavolat nebo odpovedet na e-mail." : "Odpovedet na e-mail.",
      ].join("\n"),
    }),
  })
    .then(async (response) => {
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Zpravu se nepodarilo odeslat.");
      }

      button.textContent = "Zprava odeslana";
      if (formNote) {
        formNote.textContent = "Hotovo. Zprava byla uspesne odeslana.";
      }
      contactForm.reset();
    })
    .catch((error) => {
      button.textContent = "Chyba odeslani";
      if (formNote) {
        formNote.textContent = `Duvod: ${error.message || "Zkontrolujte Web3Forms access key."}`;
      }
    })
    .finally(() => {
      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1800);
    });
});

if ("IntersectionObserver" in window) {
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
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (goldField instanceof HTMLCanvasElement) {
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
    lasers = Array.from({ length: Math.min(18, Math.max(8, Math.floor(width / 120))) }, createLaser);
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
