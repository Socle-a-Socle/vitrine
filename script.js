(() => {
  const c = SITE_CONFIG;
  const images = Array.isArray(GALLERY_IMAGES) ? GALLERY_IMAGES : [];

  document.title = c.site.name;
  document.querySelector('meta[name="description"]').content = c.site.description;

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "";
  };

  set("hero-eyebrow", c.hero.eyebrow);
  set("hero-title", c.hero.title);
  set("hero-text", c.hero.text);

  set("about-eyebrow", c.about.eyebrow);
  set("about-title", c.about.title);
  set("about-text", c.about.text);

  set("craft-eyebrow", c.craft.eyebrow);
  set("craft-title", c.craft.title);
  set("craft-text", c.craft.text);
  set("craft-one-title", c.craft.one.title);
  set("craft-one-text", c.craft.one.text);
  set("craft-two-title", c.craft.two.title);
  set("craft-two-text", c.craft.two.text);
  set("craft-three-title", c.craft.three.title);
  set("craft-three-text", c.craft.three.text);

  set("meetings-eyebrow", c.meetings.eyebrow);
  set("meetings-title", c.meetings.title);
  set("meetings-intro", c.meetings.intro);
  set("meeting-day", c.meetings.day);
  set("meeting-frequency", c.meetings.frequency);
  set("meeting-hours", c.meetings.hours);
  set("meeting-place", c.meetings.place);
  set("meeting-address", c.meetings.address);

  set("gallery-eyebrow", c.gallery.eyebrow);
  set("gallery-title", c.gallery.title);
  set("gallery-intro", c.gallery.intro);
  set("gallery-empty", c.gallery.empty);

  set("cta-eyebrow", c.cta.eyebrow);
  set("cta-title", c.cta.title);
  set("cta-text", c.cta.text);
  set("cta-discord", c.cta.button);
  set("meeting-discord", c.meetings.button);
  set("footer-name", c.site.name);
  set("footer-location", c.footer.location);

  document.querySelectorAll("#nav-discord, #hero-discord, #cta-discord, #meeting-discord")
    .forEach(el => el.href = c.discord.url);

  const tags = document.getElementById("about-tags");
  (c.about.tags || []).forEach(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    tags.appendChild(span);
  });

  const hero = document.getElementById("hero-photos");
  const heroImages = images.slice(0, Math.min(c.hero.imageLimit || 4, 4));

  if (heroImages.length) {
    heroImages.forEach((src, i) => {
      const item = document.createElement("button");
      item.className = "hero-photo hero-photo-" + (i + 1);
      item.type = "button";
      item.innerHTML = `<img src="${src}" alt="${c.site.name} — photo ${i + 1}">`;
      item.addEventListener("click", () => openLightbox(i));
      hero.appendChild(item);
    });
  } else {
    hero.classList.add("no-photos");
    hero.innerHTML = `
      <div class="photo-placeholder">
        <span>VOS PHOTOS</span>
        <strong>Ajoutez vos images dans<br>le dossier <code>images/</code></strong>
        <small>Elles apparaîtront automatiquement ici.</small>
      </div>`;
  }

  const grid = document.getElementById("gallery-grid");
  const empty = document.getElementById("gallery-empty");

  if (!images.length) {
    empty.hidden = false;
  } else {
    empty.hidden = true;
    images.forEach((src, index) => {
      const button = document.createElement("button");
      button.className = "gallery-item";
      button.type = "button";
      button.innerHTML = `<img src="${src}" alt="${c.site.name} — photo ${index + 1}" loading="lazy">`;
      button.addEventListener("click", () => openLightbox(index));
      grid.appendChild(button);
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  let current = 0;

  function show(index) {
    if (!images.length) return;
    current = (index + images.length) % images.length;
    lightboxImage.src = images[current];
    lightboxImage.alt = `${c.site.name} — photo ${current + 1}`;
  }

  function openLightbox(index) {
    if (!images.length) return;
    show(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => show(current - 1));
  document.getElementById("lightbox-next").addEventListener("click", () => show(current + 1));

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
