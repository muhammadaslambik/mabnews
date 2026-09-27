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

  let realCount = 0; // jumlah artikel asli (tanpa kloning untuk infinite loop)

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
      // +1 karena posisi 0 di track sekarang ditempati kloning slide terakhir
      b.addEventListener("click", () => scrollToTrackIndex(i + 1, true));
      dotsWrap.appendChild(b);
    }
  }

  function scrollToTrackIndex(trackIndex, smooth) {
    const el = track.children[trackIndex];
    if (el) el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", inline: "start", block: "nearest" });
  }

  function currentTrackIndex() {
    const cards = [...track.children];
    const trackRect = track.getBoundingClientRect();
    let closest = 0, closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - trackRect.left);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
  }

  function updateActiveDotFromTrackIndex(trackIndex) {
    let realIndex = trackIndex - 1;
    if (realIndex < 0) realIndex = realCount - 1;
    if (realIndex > realCount - 1) realIndex = 0;
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle("selected", i === realIndex));
  }

  function cardWidth() {
    const first = track.children[0];
    return first ? first.getBoundingClientRect().width : track.clientWidth;
  }

  // ---------------------------------------------------------
  // Loop tak terbatas: kloning slide pertama ditaruh di akhir
  // track, kloning slide terakhir ditaruh di awal track. Begitu
  // geseran (scroll/swipe/klik panah) berhenti tepat di salah
  // satu kloning itu, posisinya "dilompat" diam-diam (tanpa
  // animasi) ke slide asli yang sepadan -> terasa muter terus,
  // baik lewat geser jari, geser trackpad, maupun klik panah.
  // ---------------------------------------------------------
  function setupInfiniteLoop() {
    const items = [...track.children];
    realCount = items.length;
    if (realCount < 2) return;

    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    // Posisikan ke slide asli pertama (track index 1, lewati
    // kloning di depan) tanpa animasi, setelah layout terhitung.
    requestAnimationFrame(() => scrollToTrackIndex(1, false));

    let scrollTimer;
    track.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const idx = currentTrackIndex();
        if (idx >= realCount + 1) {
          // di kloning slide pertama (setelah slide asli terakhir)
          scrollToTrackIndex(1, false);
          updateActiveDotFromTrackIndex(1);
        } else if (idx <= 0) {
          // di kloning slide terakhir (sebelum slide asli pertama)
          scrollToTrackIndex(realCount, false);
          updateActiveDotFromTrackIndex(realCount);
        } else {
          updateActiveDotFromTrackIndex(idx);
        }
      }, 120);
    });
  }

  async function loadFocusArticles() {
    try {
      // "Fokus" memakai artikel yang ditandai populer di CMS.
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
      setupInfiniteLoop();

      const seeAllLink = document.getElementById("focusSeeAllLink");
      if (seeAllLink) seeAllLink.href = `artikel.html?id=${items[0].slug}`;

      // Panah cuma menggeser selebar 1 kartu — logika loop di atas
      // yang menangani "lompat diam-diam" begitu geseran berhenti
      // tepat di slide kloning.
      prevBtn?.addEventListener("click", () => {
        track.scrollBy({ left: -cardWidth(), behavior: "smooth" });
      });
      nextBtn?.addEventListener("click", () => {
        track.scrollBy({ left: cardWidth(), behavior: "smooth" });
      });
    } catch (err) {
      console.error("Gagal memuat carousel Fokus:", err);
    }
  }

  loadFocusArticles();
});
