/* =========================================================
   MAB-NEWS — HOMEPAGE JS (fetch dari database)
========================================================= */

const heroElement = document.querySelector("#mainHero");
const heroTrack = document.querySelector("#heroTrack");
const heroPrev = document.querySelector("#heroPrev");
const heroNext = document.querySelector("#heroNext");
const heroDotsContainer = document.querySelector("#heroDots");

let popularHeroNews = [];
let currentHero = 0;
let heroAutoSlide = null;
let isHeroInteracting = false;
let heroScrollEndTimer = null;
let heroResizeTimer = null;

function createHeroSlide(article) {
  const slide = document.createElement("div");
  slide.className = "hero-slide";
  slide.innerHTML = `
    <a class="hero-slide-image-link" href="artikel.html?id=${article.slug}" draggable="false">
      <img class="hero-slide-image" src="${article.image_url || ''}" alt="${article.title}" draggable="false">
    </a>
    <div class="hero-slide-overlay">
      <div class="hero-slide-category">${(article.category?.name || '').toUpperCase()}</div>
      <h1 class="hero-slide-title"><a href="artikel.html?id=${article.slug}">${article.title}</a></h1>
      <p class="hero-slide-lead">${article.lead || ''}</p>
      <div class="hero-slide-meta">
        <span>${new Date(article.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}</span>
        <span>•</span>
        <span>${article.author || 'MAB-News'}</span>
      </div>
    </div>`;
  return slide;
}

function renderHero() {
  if (!heroTrack) return;
  heroTrack.innerHTML = "";
  popularHeroNews.forEach((a) => heroTrack.appendChild(createHeroSlide(a)));
  renderHeroDots();
  goToHero(0, false);
}

function renderHeroDots() {
  if (!heroDotsContainer) return;
  heroDotsContainer.innerHTML = "";
  popularHeroNews.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Berita ${index + 1}`);
    button.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); goToHero(index, true); });
    heroDotsContainer.appendChild(button);
  });
  updateHeroDots();
}

function updateHeroDots() {
  if (!heroDotsContainer) return;
  heroDotsContainer.querySelectorAll("button").forEach((dot, index) => {
    dot.classList.toggle("selected", index === currentHero);
  });
}

function normalizeHeroIndex(index) {
  const total = popularHeroNews.length;
  if (!total) return 0;
  if (index < 0) return total - 1;
  if (index >= total) return 0;
  return index;
}

function goToHero(index, animate = true, restartTimer = true) {
  if (!heroTrack) return;
  currentHero = normalizeHeroIndex(index);
  heroTrack.scrollTo({ left: currentHero * heroTrack.clientWidth, behavior: animate ? "smooth" : "auto" });
  updateHeroDots();
  if (restartTimer) resetHeroAutoSlide();
}

function showNextHero() { goToHero(currentHero + 1, true); }
function showPreviousHero() { goToHero(currentHero - 1, true); }

if (heroPrev) heroPrev.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); showPreviousHero(); });
if (heroNext) heroNext.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); showNextHero(); });

if (heroTrack) {
  heroTrack.addEventListener("scroll", () => {
    isHeroInteracting = true;
    clearInterval(heroAutoSlide);
    const width = heroTrack.clientWidth || 1;
    const liveIndex = normalizeHeroIndex(Math.round(heroTrack.scrollLeft / width));
    if (liveIndex !== currentHero) { currentHero = liveIndex; updateHeroDots(); }
    clearTimeout(heroScrollEndTimer);
    heroScrollEndTimer = setTimeout(() => { isHeroInteracting = false; startHeroAutoSlide(); }, 100);
  }, { passive: true });
}

function startHeroAutoSlide() {
  clearInterval(heroAutoSlide);
  heroAutoSlide = setInterval(() => { if (!isHeroInteracting) showNextHero(); }, 10000);
}
function resetHeroAutoSlide() { startHeroAutoSlide(); }

if (heroElement) {
  heroElement.addEventListener("mouseenter", () => clearInterval(heroAutoSlide));
  heroElement.addEventListener("mouseleave", () => { if (!isHeroInteracting) startHeroAutoSlide(); });
}

window.addEventListener("resize", () => {
  clearTimeout(heroResizeTimer);
  heroResizeTimer = setTimeout(() => goToHero(currentHero, false, false), 150);
});

/* =========================================================
   BERITA UTAMA (4 kartu, tombol "Ganti Berita Lainnya")
========================================================= */
const mainNewsButton = document.querySelector("#changeMainNews");
const topCardsContainer = document.querySelector(".top-cards");
let mainNewsPool = [];
let mainNewsIndex = 0;

function renderMainNewsCards(items) {
  if (!topCardsContainer) return;
  topCardsContainer.innerHTML = items.map(a => `
    <article class="news-card">
      <a href="artikel.html?id=${a.slug}"><img src="${a.image_url || ''}" alt="${a.title}"></a>
      <div class="card-body">
        <span class="category">${(a.category?.name || '').toUpperCase()}</span>
        <h3><a href="artikel.html?id=${a.slug}">${a.title}</a></h3>
        <time>${new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' })}</time>
      </div>
    </article>`).join('');
}

function showNextMainNewsGroup() {
  if (!mainNewsPool.length) return;
  const group = [];
  for (let i = 0; i < 4; i++) {
    group.push(mainNewsPool[(mainNewsIndex + i) % mainNewsPool.length]);
  }
  mainNewsIndex = (mainNewsIndex + 4) % mainNewsPool.length;
  renderMainNewsCards(group);
}

if (mainNewsButton) mainNewsButton.addEventListener("click", showNextMainNewsGroup);

/* =========================================================
   BERITA TERBARU (list ".latest-list")
========================================================= */
function renderLatestList(items) {
  const container = document.querySelector(".latest-list");
  if (!container) return;
  container.innerHTML = items.map(a => `
    <article class="latest-item">
      <a href="artikel.html?id=${a.slug}"><img src="${a.image_url || ''}" alt="${a.title}"></a>
      <div>
        <span class="category">${(a.category?.name || '').toUpperCase()}</span>
        <h3><a href="artikel.html?id=${a.slug}">${a.title}</a></h3>
        <p>${a.lead || ''}</p>
        <time>${new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })} · ${new Date(a.published_at).toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' })}</time>
      </div>
    </article>`).join('');
}

/* =========================================================
   TERPOPULER (sidebar ".popular-list")
========================================================= */
function renderPopularSidebar(items) {
  const container = document.querySelector(".popular-list");
  if (!container) return;
  container.innerHTML = items.map((a, i) => `
    <li>
      <span class="rank">${i + 1}</span>
      <a class="popular-copy" href="artikel.html?id=${a.slug}">
        <h3>${a.title}</h3>
        <time>${new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}</time>
      </a>
      <a href="artikel.html?id=${a.slug}"><img src="${a.image_url || ''}" alt="${a.title}"></a>
    </li>`).join('');
}

/* =========================================================
   FOKUS (sidebar)
========================================================= */
function renderFocus(a) {
  const section = document.getElementById('focusSection');
  if (!a || !section) return;
  document.getElementById('focusCard').href = `artikel.html?id=${a.slug}`;
  document.getElementById('focusMoreLink').href = `artikel.html?id=${a.slug}`;
  section.querySelector('img').src = a.image_url || '';
  document.getElementById('focusTitle').textContent = a.title;
  document.getElementById('focusLead').textContent = a.lead || '';
  document.getElementById('focusDate').textContent = new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
  section.style.display = '';
}

/* =========================================================
   INIT — ambil semua data dari backend
========================================================= */
async function initHomepage() {
  try {
    const [latestRes, popularRes] = await Promise.all([
      apiFetch('/api/articles?limit=20&page=1'),
      apiFetch('/api/articles?popular=true&limit=8'),
    ]);

    const latest = latestRes.data || [];
    const popular = popularRes.data && popularRes.data.length ? popularRes.data : latest;

    popularHeroNews = popular.slice(0, 5);
    renderHero();

    mainNewsPool = latest;
    showNextMainNewsGroup();

    renderLatestList(latest.slice(4, 6));
    renderPopularSidebar(popular.slice(0, 5));
    renderFocus(latest[6] || latest[latest.length - 1]);
  } catch (err) {
    console.error('Gagal memuat data beranda:', err);
  }
}

document.addEventListener("DOMContentLoaded", initHomepage);