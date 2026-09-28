document.addEventListener("DOMContentLoaded", async () => {
  const focusCarousel = document.getElementById("focusCarousel");
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

  let items = [];
  let realCount = 0;
  let current = 0;
  let isInteracting = false;
  let scrollEndTimer = null;
  let resizeTimer = null;

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

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    items.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Fokus ${index + 1}`);
      button.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); goTo(index, true); });
      dotsWrap.appendChild(button);
    });
    updateDots();
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll("button").forEach((dot, index) => {
      dot.classList.toggle("selected", index === current);
    });
  }

  function normalizeIndex(index) {
    if (!realCount) return 0;
    if (index < 0) return realCount - 1;
    if (index >= realCount) return 0;
    return index;
  }

  // Ada 1 kartu kloning di depan (duplikat kartu terakhir), jadi
  // posisi kartu asli ke-i di track sebenarnya ada di offset (i+1).
  function loopOffset() {
    return realCount > 1 ? 1 : 0;
  }

  function goTo(index, animate = true, restartAutoTimer = true) {
    if (!track) return;
    current = normalizeIndex(index);
    const offset = loopOffset();
    const width = track.clientWidth || 1;
    track.scrollTo({ left: (current + offset) * width, behavior: animate ? "smooth" : "auto" });
    updateDots();
  }

  function goNext() {
    const offset = loopOffset();
    const width = track.clientWidth || 1;
    if (realCount > 1 && current === realCount - 1) {
      // Geser mulus satu langkah ke kartu kloning (duplikat kartu
      // pertama) -> terasa maju terus, lalu posisinya "dilompat"
      // diam-diam ke kartu asli pertama oleh listener scroll-end.
      track.scrollTo({ left: (realCount + offset) * width, behavior: "smooth" });
      current = 0;
      updateDots();
      return;
    }
    goTo(current + 1, true);
  }

  function goPrev() {
    const width = track.clientWidth || 1;
    if (realCount > 1 && current === 0) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      current = realCount - 1;
      updateDots();
      return;
    }
    goTo(current - 1, true);
  }

  function setupInfiniteLoop() {
    if (realCount < 2) return;
    const firstClone = track.children[0].cloneNode(true);
    const lastClone = track.children[track.children.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.children[0]);
  }

  // ---------------------------------------------------------
  // Sama seperti Hero: penanda (dots) di-update LANGSUNG
  // mengikuti posisi scroll (tidak menunggu berhenti dulu).
  // Baru setelah scroll benar-benar berhenti, dicek apakah
  // posisinya jatuh di kartu kloning -> kalau iya, dilompat
  // diam-diam ke kartu asli yang sepadan.
  // ---------------------------------------------------------
  if (track) {
    track.addEventListener("scroll", () => {
      isInteracting = true;
      const width = track.clientWidth || 1;
      const offset = loopOffset();
      const rawIndex = Math.round(track.scrollLeft / width);
      const liveIndex = rawIndex - offset;
      if (liveIndex !== current && liveIndex >= 0 && liveIndex < realCount) {
        current = liveIndex;
        updateDots();
      }
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isInteracting = false;
        if (realCount > 1) {
          const settledIndex = Math.round(track.scrollLeft / width);
          if (settledIndex >= realCount + offset) {
            goTo(0, false, false);
          } else if (settledIndex <= 0) {
            goTo(realCount - 1, false, false);
          }
        }
      }, 120);
    }, { passive: true });
  }

  if (focusCarousel) {
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => goTo(current, false, false), 150);
    });
  }

  async function loadFocusArticles() {
    try {
      // "Fokus" memakai artikel yang ditandai populer di CMS.
      const res = await fetch(`${base}/api/articles?popular=true&limit=5`);
      if (!res.ok) throw new Error("Gagal memuat artikel Fokus.");
      const { data } = await res.json();
      items = data && data.length ? data : [];

      if (!items.length) {
        focusCarousel?.closest(".sidebar-section")?.remove();
        return;
      }

      track.innerHTML = "";
      items.forEach(a => track.appendChild(renderCard(a)));
      realCount = items.length;
      setupInfiniteLoop();
      renderDots();
      goTo(0, false);

      const seeAllLink = document.getElementById("focusSeeAllLink");
      if (seeAllLink) seeAllLink.href = `artikel.html?id=${items[0].slug}`;

      if (prevBtn) prevBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); goPrev(); });
      if (nextBtn) nextBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); goNext(); });
    } catch (err) {
      console.error("Gagal memuat carousel Fokus:", err);
    }
  }

  loadFocusArticles();
});
