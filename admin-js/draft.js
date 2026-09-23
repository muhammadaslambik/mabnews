(() => {
  "use strict";

  let rows = [];
  let filtered = [];
  let categories = [];
  let currentPage = 1;
  const perPage = 8;
  let pendingDeleteSlug = null;

  const $ = s => document.querySelector(s);
  const tbody = $("#draftTableBody");
  const empty = $("#emptyState");
  const pagination = $("#pagination");
  const toast = $("#toast");

  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function catClass(cat) {
    return "cat-" + (cat || "-").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
  }

  function fmtDate(iso) {
    if (!iso) return { date: "-", time: "" };
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      time: d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
    };
  }

  // ---------------------------------------------------------
  // Muat kategori (untuk dropdown filter) dari database
  // ---------------------------------------------------------
  async function loadCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error("Gagal memuat kategori.");
      const raw = await res.json();
      categories = Array.isArray(raw) ? raw : (raw.data || []);
      const select = $("#categoryFilter");
      select.innerHTML = '<option value="">Semua Kategori</option>' +
        categories.map(c => `<option value="${c.key}">${c.name}</option>`).join("");
    } catch (e) {
      console.error("Gagal memuat kategori:", e);
    }
  }

  // ---------------------------------------------------------
  // Muat artikel berstatus draft dari database (bukan lagi
  // data contoh yang di-hardcode)
  // ---------------------------------------------------------
  async function loadDrafts() {
    tbody.innerHTML = `<tr><td colspan="9">Memuat draft dari server...</td></tr>`;
    try {
      const res = await fetch(`${API_BASE_URL}/api/articles?status=draft&limit=100`);
      if (!res.ok) throw new Error("Gagal mengambil draft dari server.");
      const { data } = await res.json();
      rows = (data || []).map(a => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.lead || "",
        image_url: a.image_url || "",
        categories: (a.categories && a.categories.length ? a.categories.map(c => c.name) : [a.category?.name].filter(Boolean)),
        author: a.author || "-",
        created: fmtDate(a.created_at),
        updated: fmtDate(a.updated_at),
      }));
      applyFilters();
    } catch (e) {
      console.error("Gagal memuat draft:", e);
      tbody.innerHTML = `<tr><td colspan="9">Gagal memuat draft dari server.</td></tr>`;
      notify("Gagal memuat draft dari server.");
    }
  }

  function render() {
    const start = (currentPage - 1) * perPage;
    const pageRows = filtered.slice(start, start + perPage);
    tbody.innerHTML = "";
    empty.hidden = pageRows.length !== 0;

    pageRows.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.dataset.slug = item.slug;
      tr.innerHTML = `
        <td><input class="row-check" type="checkbox" value="${item.slug}" aria-label="Pilih artikel"></td>
        <td data-label="No">${start + index + 1}</td>
        <td data-label="Judul Artikel">
          <div class="article-cell">
            <img class="thumb" src="${item.image_url || ""}" alt="">
            <div>
              <div class="article-title" title="${item.title}">${item.title}</div>
              <div class="article-excerpt">${item.excerpt}</div>
            </div>
          </div>
        </td>
        <td data-label="Kategori">${(item.categories.length ? item.categories : ['-']).map(c => `<span class="badge ${catClass(c)}">${c}</span>`).join(' ')}</td>
        <td data-label="Penulis"><span class="meta">♟ &nbsp;${item.author}</span></td>
        <td data-label="Tanggal Dibuat"><span class="meta">◷ &nbsp;${item.created.date}<small>${item.created.time}</small></span></td>
        <td data-label="Terakhir Diubah"><span class="meta">◷ &nbsp;${item.updated.date}<small>${item.updated.time}</small></span></td>
        <td data-label="Status"><span class="badge status">Draft</span></td>
        <td data-label="Aksi">
          <div class="actions">
            <button class="action-btn edit" type="button" data-action="edit" title="Edit">✎</button>
            <button class="action-btn delete" type="button" data-action="delete" title="Hapus">♲</button>
          </div>
        </td>`;
      tbody.appendChild(tr);
    });

    renderPagination();
    $("#resultInfo").textContent = filtered.length
      ? `Menampilkan ${start + 1}–${Math.min(start + perPage, filtered.length)} dari ${filtered.length} artikel (draft)`
      : "Tidak ada artikel yang sesuai";
    updateSelectAll();
  }

  function renderPagination() {
    const pages = Math.max(1, Math.ceil(filtered.length / perPage));
    currentPage = Math.min(currentPage, pages);
    pagination.innerHTML = "";

    const prev = document.createElement("button");
    prev.className = "page-btn"; prev.textContent = "‹"; prev.disabled = currentPage === 1;
    prev.onclick = () => { currentPage--; render(); };
    pagination.appendChild(prev);

    for (let p = 1; p <= pages; p++) {
      const b = document.createElement("button");
      b.className = "page-btn" + (p === currentPage ? " active" : ""); b.textContent = p;
      b.onclick = () => { currentPage = p; render(); };
      pagination.appendChild(b);
    }

    const next = document.createElement("button");
    next.className = "page-btn"; next.textContent = "›"; next.disabled = currentPage === pages;
    next.onclick = () => { currentPage++; render(); };
    pagination.appendChild(next);
  }

  function applyFilters() {
    const q = $("#searchInput").value.trim().toLowerCase();
    const cat = $("#categoryFilter").value; // berisi "key" kategori
    const catName = cat ? (categories.find(c => c.key === cat)?.name || "") : "";
    filtered = rows.filter(item => {
      const hay = `${item.title} ${item.categories.join(' ')} ${item.author}`.toLowerCase();
      return (!q || hay.includes(q)) && (!catName || item.categories.includes(catName));
    });
    currentPage = 1;
    render();
  }

  function updateSelectAll() {
    const checks = [...document.querySelectorAll(".row-check")];
    const checked = checks.filter(c => c.checked);
    $("#selectAll").checked = checks.length > 0 && checked.length === checks.length;
    $("#selectAll").indeterminate = checked.length > 0 && checked.length < checks.length;
    $("#selectedCount").textContent = checked.length;
    $("#bulkbar").hidden = checked.length === 0;
  }

  $("#searchInput").addEventListener("input", applyFilters);
  $("#searchBtn").addEventListener("click", applyFilters);
  $("#categoryFilter").addEventListener("change", applyFilters);
  $("#authorFilter").addEventListener("change", applyFilters);
  $("#dateFilter").addEventListener("change", applyFilters);

  $("#selectAll").addEventListener("change", e => {
    document.querySelectorAll(".row-check").forEach(c => c.checked = e.target.checked);
    updateSelectAll();
  });
  tbody.addEventListener("change", e => {
    if (e.target.classList.contains("row-check")) updateSelectAll();
  });

  tbody.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const slug = btn.closest("tr").dataset.slug;

    if (btn.dataset.action === "edit") {
      window.location.href = `tambah-artikel.html?slug=${encodeURIComponent(slug)}`;
    } else if (btn.dataset.action === "delete") {
      const item = rows.find(x => x.slug === slug);
      pendingDeleteSlug = slug;
      $("#confirmModal").classList.add("show");
      $("#confirmModal").setAttribute("aria-hidden", "false");
    }
  });

  function closeModal() {
    $("#confirmModal").classList.remove("show");
    $("#confirmModal").setAttribute("aria-hidden", "true");
    pendingDeleteSlug = null;
  }
  document.querySelectorAll("[data-close-modal]").forEach(b => b.addEventListener("click", closeModal));
  $("#confirmModal").addEventListener("click", e => { if (e.target.id === "confirmModal") closeModal(); });

  $("#confirmDelete").addEventListener("click", async () => {
    if (pendingDeleteSlug === null) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/articles/${encodeURIComponent(pendingDeleteSlug)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus draft di server.");
      closeModal();
      notify("Artikel draft berhasil dihapus.");
      await loadDrafts();
    } catch (e) {
      notify(`Gagal menghapus: ${e.message}`);
      closeModal();
    }
  });

  $("#bulkDelete").addEventListener("click", async () => {
    const slugs = [...document.querySelectorAll(".row-check:checked")].map(c => c.value);
    if (!slugs.length) return;
    if (!confirm(`Hapus ${slugs.length} artikel draft yang dipilih?`)) return;
    try {
      await Promise.all(slugs.map(slug =>
        fetch(`${API_BASE_URL}/api/articles/${encodeURIComponent(slug)}`, { method: "DELETE" })
      ));
      notify(`${slugs.length} artikel berhasil dihapus.`);
      await loadDrafts();
    } catch (e) {
      notify(`Gagal menghapus sebagian artikel: ${e.message}`);
    }
  });

  $("#clearSelection").addEventListener("click", () => {
    document.querySelectorAll(".row-check").forEach(c => c.checked = false);
    updateSelectAll();
  });

  // Sidebar / navigation
  const sidebar = $("#sidebar"), backdrop = $("#sidebarBackdrop");
  function toggleSidebar(force) {
    const open = typeof force === "boolean" ? force : !sidebar.classList.contains("open");
    sidebar.classList.toggle("open", open);
    backdrop.classList.toggle("show", open);
    $("#hamburger").setAttribute("aria-expanded", String(open));
  }
  $("#hamburger").addEventListener("click", () => toggleSidebar());
  $("#sidebarClose").addEventListener("click", () => toggleSidebar(false));
  backdrop.addEventListener("click", () => toggleSidebar(false));
  document.querySelectorAll(".sidebar-nav a").forEach(a => a.addEventListener("click", () => { if (innerWidth <= 800) toggleSidebar(false); }));
  document.querySelectorAll(".nav-parent").forEach(btn => {
    btn.addEventListener("click", () => {
      const menu = document.getElementById(btn.dataset.submenu);
      const open = !menu.classList.contains("collapsed");
      menu.classList.toggle("collapsed", open);
      btn.classList.toggle("open", !open);
      btn.setAttribute("aria-expanded", String(!open));
      const chevron = btn.querySelector(".chevron");
      if (chevron) chevron.textContent = open ? "⌄" : "⌃";
    });
  });

  // Profile menu
  $("#profileBtn").addEventListener("click", e => { e.stopPropagation(); $("#profileMenu").classList.toggle("show"); });
  document.addEventListener("click", () => $("#profileMenu").classList.remove("show"));
  $("#profileMenu").addEventListener("click", e => e.stopPropagation());

  // Theme toggle (persisted)
  const savedTheme = localStorage.getItem("mabnewsTheme");
  if (savedTheme === "dark") document.documentElement.classList.add("dark");
  $("#themeToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("mabnewsTheme", document.documentElement.classList.contains("dark") ? "dark" : "light");
    notify(document.documentElement.classList.contains("dark") ? "Mode gelap diaktifkan." : "Mode terang diaktifkan.");
  });

  loadCategories();
  loadDrafts();
})();
