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
  const emptyState = document.getElementById("searchEmptyState");
  const headerSearchForm = document.getElementById("headerSearch");
  const searchInput = document.getElementById("searchInput");

  const params = new URLSearchParams(window.location.search);
  let query = params.get("q") || "";
  let selectedCategory = (params.get("kategori") || "all").toLowerCase();

  if (searchInput) searchInput.value = query;
  if (categoryFilter) categoryFilter.value = selectedCategory;

  // ---- Kategori: bisa lebih dari satu ----
  function renderCard(a) {
    const categories = (a.categories && a.categories.length) ? a.categories : (a.category ? [a.category] : []);
    const categoryText = categories.length ? categories.map(c => c.name).join(', ') : '-';
    return `
      <article class="news-item">
        <a href="artikel.html?id=${a.slug}" class="news-image">
          <img src="${a.image_url || ''}" alt="${a.title}">
        </a>
        <div class="news-content">
          <span class="news-category">${categoryText}</span>
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
    tabs.forEach(tab => tab.classList.toggle("active", (tab.dataset.category || "all").toLowerCase() === selectedCategory));
  }

  async function runSearch() {
    resultsContainer.querySelectorAll(".news-item").forEach(el => el.remove());

    if (!query) {
      emptyState.style.display = "";
      emptyState.textContent = "Ketik kata kunci lalu tekan Enter atau klik ikon pencarian di atas untuk menampilkan berita.";
      resultCount.textContent = "";
      resultsTitle.textContent = "Halaman Pencarian";
      pageTitle.textContent = "Pencarian";
      updateTabs();
      return;
    }

    emptyState.style.display = "none";

    try {
      const q = new URLSearchParams({ page: 1, limit: 10, q: query });
      if (selectedCategory !== "all") q.set("kategori", selectedCategory);
      if (sortFilter && sortFilter.value === "popular") q.set("popular", "true");

      const res = await apiFetch(`/api/articles?${q.toString()}`);
      const items = res.data || [];
      const total = res.total || 0;

      resultsTitle.textContent = `Hasil untuk "${query}"`;
      pageTitle.textContent = `Pencarian: ${query}`;
      resultCount.textContent = `Menampilkan ${items.length} dari ${total} berita`;

      if (!items.length) {
        emptyState.style.display = "";
        emptyState.textContent = `Tidak ditemukan berita untuk "${query}".`;
      } else {
        resultsContainer.insertAdjacentHTML("beforeend", items.map(renderCard).join(""));
      }
      updateTabs();
    } catch (err) {
      console.error("Gagal mencari berita:", err);
      resultCount.textContent = "Gagal memuat hasil pencarian dari server.";
    }
  }

  function updateURL() {
    const url = new URL(window.location.href);
    query ? url.searchParams.set("q", query) : url.searchParams.delete("q");
    selectedCategory !== "all" ? url.searchParams.set("kategori", selectedCategory) : url.searchParams.delete("kategori");
    window.history.replaceState({}, "", url);
  }

  headerSearchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    query = searchInput.value.trim();
    updateURL();
    runSearch();
  });

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      selectedCategory = (tab.dataset.category || "all").toLowerCase();
      updateURL();
      runSearch();
    });
  });

  filterForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    selectedCategory = (categoryFilter.value || "all").toLowerCase();
    updateURL();
    runSearch();
  });

  resetFilter?.addEventListener("click", () => {
    setTimeout(() => {
      selectedCategory = "all";
      categoryFilter.value = "all";
      timeFilter.value = "all";
      sortFilter.value = "latest";
      updateURL();
      runSearch();
    }, 0);
  });

  sortFilter?.addEventListener("change", runSearch);

  updateTabs();
  runSearch();
});
