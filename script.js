function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "";
}

function setLink(id, href, label) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href;
  if (label) el.textContent = label;
}

function applyConfig() {
  const c = SITE_CONFIG;

  document.title = `${c.site.name} — ${c.site.location}`;

  setText("site-name", c.site.name);

  setText("hero-eyebrow", c.hero.eyebrow);
  setText("hero-title", c.hero.title);
  setText("hero-text", c.hero.text);

  setText("about-eyebrow", c.about.eyebrow);
  setText("about-title", c.about.title);
  setText("about-text", c.about.text);

  const tags = document.getElementById("about-tags");
  if (tags) {
    tags.innerHTML = "";
    c.about.tags.forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      tags.appendChild(span);
    });
  }

  setText("craft-eyebrow", c.craft.eyebrow);
  setText("craft-title", c.craft.title);
  setText("craft-text", c.craft.text);
  setText("craft-one-title", c.craft.one.title);
  setText("craft-one-text", c.craft.one.text);
  setText("craft-two-title", c.craft.two.title);
  setText("craft-two-text", c.craft.two.text);
  setText("craft-three-title", c.craft.three.title);
  setText("craft-three-text", c.craft.three.text);

  setText("meetings-eyebrow", c.meetings.eyebrow);
  setText("meetings-title", c.meetings.title);
  setText("meetings-intro", c.meetings.intro);
  setText("meeting-day", c.meetings.day);
  setText("meeting-frequency", c.meetings.frequency);
  setText("meeting-hours", c.meetings.hours);
  setText("meeting-place", c.meetings.place);
  setText("meeting-address", c.meetings.address);

  setText("gallery-eyebrow", c.gallery.eyebrow);
  setText("gallery-title", c.gallery.title);
  setText("gallery-intro", c.gallery.intro);

  setText("cta-eyebrow", c.cta.eyebrow);
  setText("cta-title", c.cta.title);
  setText("cta-text", c.cta.text);

  setText("footer-name", `© ${new Date().getFullYear()} ${c.site.name}`);
  setText("footer-location", c.footer.location);

  setLink("nav-discord", c.discord.url);
  setLink("hero-discord", c.discord.url);
  setLink("meeting-button", c.discord.url, c.meetings.button);
  setLink("cta-button", c.discord.url, c.cta.button);
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const counter = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox || !lightboxImage) return;

  // La galerie principale sert de référence afin d'éviter les doublons
  // avec les mêmes photos présentes dans le hero.
  const galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));

  if (!galleryImages.length) return;

  // Les images du hero peuvent elles aussi ouvrir le carrousel.
  const clickableImages = Array.from(
    document.querySelectorAll(".gallery-item img, .hero-gallery figure img")
  );

  let currentIndex = 0;
  let touchStartX = null;

  const normalizeSrc = (src) => {
    const url = new URL(src, window.location.href);
    return url.pathname;
  };

  function updateImage() {
    const image = galleryImages[currentIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Photo de l'association Socle à Socle";
    counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  }

  function openAt(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    updateImage();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
  }

  function previous() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateImage();
  }

  function next() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateImage();
  }

  clickableImages.forEach(image => {
    image.classList.add("lightbox-trigger");
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", "Agrandir la photo");

    const openImage = () => {
      const target = normalizeSrc(image.src);
      const index = galleryImages.findIndex(item => normalizeSrc(item.src) === target);
      openAt(index >= 0 ? index : 0);
    };

    image.addEventListener("click", openImage);
    image.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImage();
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", previous);
  nextBtn.addEventListener("click", next);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-stage")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") previous();
    if (event.key === "ArrowRight") next();
  });

  lightbox.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", event => {
    if (touchStartX === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;

    if (Math.abs(deltaX) < 50) return;
    if (deltaX > 0) previous();
    else next();
  }, { passive: true });
}

applyConfig();
initLightbox();
