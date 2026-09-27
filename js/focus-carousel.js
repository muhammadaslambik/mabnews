document.addEventListener("DOMContentLoaded", async () => {
  const track = document.getElementById("focusTrack");
  const dotsWrap = document.getElementById("focusDots");
  const prevBtn = document.getElementById("focusPrev");
  const nextBtn = document.getElementById("focusNext");
  if (!track) return;

  // API_BASE_URL seharusnya sudah didefinisikan oleh js/api.js.
  // Kalau index.html Anda belum memuat js/api.js, tambahkan
  // <script src="js/api.js"></script> sebelum js/main.js.
  const base = typeof API_BASE_URL !== "undefined" ? API_BASE_URL : "";
  if (!base) {
    console.error("focus-carousel.js: API_BASE_URL tidak ditemukan. Pastikan js/api.js dimuat sebelum js/focus-carousel.js.");
    return;
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }

  function renderCard(a) {
    const categoryName = (a.categories && a.categories[0]?.name) || a.category?.name || "";
    const el = document.createElement("a");
    el.href = `artikel.html?id=${a.slug}`;
    el.className = "focus-card";
    el.innerHTML = `
      <img src="${a.image_url || ''}" alt="${a.title}">
      <div class="focus-overlay"></div>
      <div class="focus-content">
        <span class="label">${categoryName ? categoryName.toUpperCase() : 'FOKUS'}</span>
        <h3>${a.title}</h3>
        <time>${formatDate(a.published_at)}</time>
      </div>
    `;
    return el;
  }

  function renderDots(count) {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const b = document.createElement("button");
      if (i === 0) b.classList.add("selected");
      b.addEventListener("click", () => goToSlide(i));
      dotsWrap.appendChild(b);
    }
  }

  function goToSlide(index) {
    const card = track.children[index];
    if (card) card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  function updateActiveDot() {
    const cards = [...track.children];
    if (!cards.length) return;
    const trackRect = track.getBoundingClientRect();
    let closestIndex = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - trackRect.left);
      if (dist < closestDist) { closestDist = dist; closestIndex = i; }
    });
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle("selected", i === closestIndex));
  }

  async function loadFocusArticles() {
    try {
      // "Fokus" memakai artikel yang ditandai populer di CMS.
      // Bisa diganti ke filter lain kalau Anda mau kriteria berbeda.
      const res = await fetch(`${base}/api/articles?popular=true&limit=5`);
      if (!res.ok) throw new Error("Gagal memuat artikel Fokus.");
      const { data } = await res.json();
      const items = data && data.length ? data : [];

      if (!items.length) {
        document.getElementById("focusCarousel")?.closest(".sidebar-section")?.remove();
        return;
      }

      track.innerHTML = "";
      items.forEach(a => track.appendChild(renderCard(a)));
      renderDots(items.length);

      const seeAllLink = document.getElementById("focusSeeAllLink");
      if (seeAllLink) seeAllLink.href = `artikel.html?id=${items[0].slug}`;

      let scrollTimer;
      track.addEventListener("scroll", () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateActiveDot, 80);
      });

      prevBtn?.addEventListener("click", () => {
        const cards = [...track.children];
        const trackRect = track.getBoundingClientRect();
        let current = 0;
        cards.forEach((c, i) => { if (c.getBoundingClientRect().left <= trackRect.left + 5) current = i; });
        goToSlide(Math.max(0, current - 1));
      });

      nextBtn?.addEventListener("click", () => {
        const cards = [...track.children];
        const trackRect = track.getBoundingClientRect();
        let current = 0;
        cards.forEach((c, i) => { if (c.getBoundingClientRect().left <= trackRect.left + 5) current = i; });
        goToSlide(Math.min(cards.length - 1, current + 1));
      });
    } catch (err) {
      console.error("Gagal memuat carousel Fokus:", err);
    }
  }

  loadFocusArticles();
});
