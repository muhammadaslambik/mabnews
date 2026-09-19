document.addEventListener("DOMContentLoaded", () => {
  const categoryNames = {
    nasional: "Nasional", internasional: "Internasional", ekonomi: "Ekonomi",
    metro: "Metro", dunia: "Dunia", olahraga: "Olahraga", teknologi: "Teknologi",
    otomotif: "Otomotif", "gaya-hidup": "Gaya Hidup", seni: "Seni", kolom: "Kolom",
    indeks: "Indeks", foto: "Foto", video: "Video"
  };

  const params = new URLSearchParams(window.location.search);
  const kategori = (params.get("kategori") || "nasional").toLowerCase();
  const categoryName = categoryNames[kategori] || "Kategori";
  let currentPage = parseInt(params.get("page") || "1", 10) || 1;
  const sortSelect = document.getElementById("sortNews");

  document.title = `${categoryName} — MAB-News`;
  document.getElementById("categoryTitle").textContent = categoryName;
  document.getElementById("categoryDesc").textContent =
    `Berita dan informasi terkini seputar ${categoryName.toLowerCase()}.`;
  document.getElementById("breadcrumbCategory").textContent = categoryName;
  document.getElementById("popularCategoryTitle").textContent = `Terpopuler di ${categoryName}`;

  document.querySelectorAll(".category-menu-grid a[data-kategori]").forEach(a => {
    a.classList.toggle("selected", a.dataset.kategori === kategori);
  });
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `kategori.html?kategori=${kategori}`);
  });

  function renderArticleCard(a) {
    return `
      <article class="category-news-item">
        <a href="artikel.html?id=${a.slug}" class="category-news-image">
          <img src="${a.image_url || ''}" alt="${a.title}">
        </a>
        <div class="category-news-content">
          <a href="kategori.html?kategori=${kategori}" class="news-category">${(a.category?.name || '').toUpperCase()}</a>
          <h2><a href="artikel.html?id=${a.slug}">${a.title}</a></h2>
          <p>${a.lead || ''}</p>
          <div class="news-meta">
            ${new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })} ${new Date(a.published_at).toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' })} WIB
            <span>•</span>
            ${a.author || 'MAB-News'}
          </div>
        </div>
      </article>`;
  }

  function renderPopularItem(a, i) {
    return `
      <a href="artikel.html?id=${a.slug}" class="national-popular-item">
        <span class="popular-number">${i + 1}</span>
        <div class="popular-text">
          <h3>${a.title}</h3>
          <time>${new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}</time>
        </div>
        <img src="${a.image_url || ''}" alt="">
      </a>`;
  }

  async function loadCategoryArticles() {
    const container = document.getElementById("categoryArticles");
    const pagination = document.getElementById("categoryPagination");
    container.innerHTML = `<p>Memuat berita...</p>`;
    try {
      const query = new URLSearchParams({ page: currentPage, limit: 5, kategori });
      if (sortSelect && sortSelect.value === "popular") query.set("popular", "true");
      const res = await apiFetch(`/api/articles?${query.toString()}`);
      const items = res.data || [];
      const total = res.total || 0;

      document.getElementById("resultCount").textContent = total
        ? `Menampilkan ${(currentPage - 1) * 5 + 1}–${Math.min(currentPage * 5, total)} dari ${total} berita`
        : "Belum ada artikel di kategori ini.";

      container.innerHTML = items.length ? items.map(renderArticleCard).join('') : `<p>Belum ada artikel di kategori ini.</p>`;

      const pages = Math.max(1, Math.ceil(total / 5));
      let html = `<a href="#" class="pagination-arrow" data-page="${Math.max(1, currentPage - 1)}">«</a>`;
      for (let i = 1; i <= pages; i++) {
        html += `<a href="#" class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
      }
      html += `<a href="#" class="pagination-arrow" data-page="${Math.min(pages, currentPage + 1)}">»</a>`;
      pagination.innerHTML = html;

      pagination.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = parseInt(a.dataset.page, 10);
          const url = new URL(window.location.href);
          url.searchParams.set("page", currentPage);
          window.history.replaceState({}, "", url);
          loadCategoryArticles();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });
    } catch (err) {
      console.error("Gagal memuat artikel kategori:", err);
      container.innerHTML = `<p>Gagal memuat berita dari server.</p>`;
    }
  }

  async function loadPopularSidebar() {
    const list = document.getElementById("categoryPopularList");
    try {
      let res = await apiFetch(`/api/articles?kategori=${kategori}&popular=true&limit=5`);
      if (!res.data || !res.data.length) {
        res = await apiFetch(`/api/articles?kategori=${kategori}&limit=5`);
      }
      list.innerHTML = (res.data || []).map(renderPopularItem).join('');
    } catch (err) {
      console.error("Gagal memuat populer sidebar:", err);
    }
  }

  if (sortSelect) sortSelect.addEventListener("change", () => { currentPage = 1; loadCategoryArticles(); });

  loadCategoryArticles();
  loadPopularSidebar();
});