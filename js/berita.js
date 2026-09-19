document.addEventListener("DOMContentLoaded", () => {
  const tabs = [...document.querySelectorAll(".category-tab")];
  const categoryFilter = document.getElementById("filterCategory");
  const timeFilter = document.getElementById("filterTime");
  const sortFilter = document.getElementById("sortNews");
  const filterForm = document.getElementById("newsFilterForm");
  const resetFilter = document.getElementById("resetFilter");
  const resultCount = document.getElementById("resultCount");
  const resultsTitle = document.getElementById("resultsTitle");
  const pageTitle = document.getElementById("pageTitle");
  const resultsContainer = document.querySelector(".news-results");

  const params = new URLSearchParams(window.location.search);
  let selectedCategory = (params.get("kategori") || "all").toLowerCase();
  let currentPage = parseInt(params.get("page") || "1", 10) || 1;

  const categoryNames = {
    all: "Semua", nasional: "Nasional", internasional: "Internasional",
    ekonomi: "Ekonomi", metro: "Metro", dunia: "Dunia", olahraga: "Olahraga",
    teknologi: "Teknologi", otomotif: "Otomotif", "gaya-hidup": "Gaya Hidup",
    seni: "Seni", kolom: "Kolom"
  };

  function renderCard(a) {
    return `
      <article class="news-item">
        <a href="artikel.html?id=${a.slug}" class="news-image">
          <img src="${a.image_url || ''}" alt="${a.title}">
        </a>
        <div class="news-content">
          <span class="news-category">${a.category?.name || '-'}</span>
          <h3><a href="artikel.html?id=${a.slug}">${a.title}</a></h3>
          <p>${a.lead || ''}</p>
          <div class="news-meta">
            <span>${new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}</span>
            <span>•</span>
            <span>${a.author || 'MAB-News'}</span>
          </div>
        </div>
      </article>`;
  }

  function updateTabs() {
    tabs.forEach(tab => tab.classList.toggle("active", (tab.dataset.category || "").toLowerCase() === selectedCategory));
  }

  async function loadNews() {
    resultsContainer.querySelectorAll('.news-item').forEach(el => el.remove());
    try {
      const query = new URLSearchParams({ page: currentPage, limit: 10 });
      if (selectedCategory !== 'all') query.set('kategori', selectedCategory);
      if (sortFilter.value === 'popular') query.set('popular', 'true');

      const res = await apiFetch(`/api/articles?${query.toString()}`);
      const items = res.data || [];
      const total = res.total || 0;

      const categoryName = categoryNames[selectedCategory] || "Semua";
      resultsTitle.textContent = selectedCategory === 'all'
        ? (sortFilter.value === 'popular' ? "Berita Terpopuler" : "Berita Terbaru")
        : `Berita ${categoryName}`;
      pageTitle.textContent = selectedCategory === 'all' ? "Berita" : categoryName;
      resultCount.textContent = `Menampilkan ${items.length} dari ${total} berita`;

      const pagination = document.getElementById('pagination');
      const html = items.map(renderCard).join('');
      pagination.insertAdjacentHTML('beforebegin', html);

      const pages = Math.max(1, Math.ceil(total / 10));
      pagination.innerHTML = Array.from({ length: pages }, (_, i) =>
        `<a href="#" class="${i + 1 === currentPage ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`).join('');
      pagination.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          currentPage = parseInt(a.dataset.page, 10);
          updateURL();
          loadNews();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });

      updateTabs();
    } catch (err) {
      console.error('Gagal memuat berita:', err);
      resultCount.textContent = 'Gagal memuat berita dari server.';
    }
  }

  function updateURL() {
    const url = new URL(window.location.href);
    currentPage > 1 ? url.searchParams.set("page", currentPage) : url.searchParams.delete("page");
    selectedCategory !== "all" ? url.searchParams.set("kategori", selectedCategory) : url.searchParams.delete("kategori");
    sortFilter.value !== "latest" ? url.searchParams.set("sort", sortFilter.value) : url.searchParams.delete("sort");
    window.history.replaceState({}, "", url);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      selectedCategory = (tab.dataset.category || 'all').toLowerCase();
      currentPage = 1;
      updateURL();
      loadNews();
    });
  });

  filterForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    selectedCategory = (categoryFilter.value || 'all').toLowerCase();
    currentPage = 1;
    updateURL();
    loadNews();
  });

  resetFilter?.addEventListener("click", () => {
    setTimeout(() => {
      selectedCategory = "all";
      categoryFilter.value = "all";
      timeFilter.value = "all";
      sortFilter.value = "latest";
      currentPage = 1;
      window.history.replaceState({}, "", "berita.html");
      loadNews();
    }, 0);
  });

  sortFilter?.addEventListener("change", () => { currentPage = 1; updateURL(); loadNews(); });

  if (categoryFilter) categoryFilter.value = selectedCategory;
  const urlSort = (params.get("sort") || "latest").toLowerCase();
  if (["latest", "oldest", "popular"].includes(urlSort)) sortFilter.value = urlSort;

  loadNews();
});