/* =========================================================
   MAB-News CMS — admin-js/media.js
   ---------------------------------------------------------
   Sumber data pustaka media di halaman ini ADA DUA, dan
   keduanya nyata (bukan data contoh):

   1. "Dari Artikel" — diambil dari GET /api/articles milik
      backend asli (mabnews-backend, database Neon). Setiap
      artikel yang punya image_url dijadikan satu item media,
      lengkap dengan tautan balik ke artikel yang memakainya.
      Item jenis ini tidak bisa dihapus dari sini karena
      berasal dari data artikel — hapus/ganti gambarnya lewat
      halaman edit artikel.

   2. "Upload Saya" — file yang benar-benar diupload lewat
      tombol "Upload Media" di halaman ini. Upload dilakukan
      langsung dari browser ke ImageKit.io asli (folder
      /mabnews/media) memakai signature dari endpoint backend
      GET /api/upload/auth (IMAGEKIT_PUBLIC_KEY & endpoint
      ImageKit sudah dikonfigurasi di js/api.js).

   Catatan jujur: backend belum punya tabel/endpoint khusus
   "media library" (list semua file di ImageKit + folder).
   Jadi supaya tetap terhubung ke data ASLI (bukan mock),
   daftar upload pada sesi ini disimpan sebagai catatan lokal
   di browser (localStorage) — tapi file & URL-nya betul-betul
   ada di akun ImageKit yang sama dengan yang dipakai artikel.
   Begitu backend punya tabel media, tinggal ganti bagian
   loadUploadedMedia()/saveUploadedMedia() di bawah ini dengan
   pemanggilan API sungguhan.
   ========================================================= */

(() => {
  const $ = (id) => document.getElementById(id);
  const PAGE_SIZE = 16;
  const LOCAL_KEY = "mabnews_media_uploads";

  let articleMedia = [];   // dari /api/articles (real DB)
  let uploadedMedia = [];  // dari localStorage (real ImageKit upload)
  let filtered = [];
  let currentPage = 1;
  let view = "grid";
  let selected = new Set();
  let openMenuId = null;

  const state = {
    source: "all",   // all | artikel | upload
    type: "all",     // all | image | video | document
    q: "",
    sort: "new"      // new | old | name
  };

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function extOf(url) {
    if (!url) return "";
    const clean = url.split("?")[0].split("#")[0];
    const match = clean.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1].toLowerCase() : "";
  }

  function typeOf(ext) {
    if (["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"].includes(ext)) return "image";
    if (["mp4", "webm", "mov", "mkv"].includes(ext)) return "video";
    if (["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv"].includes(ext)) return "document";
    return "file";
  }

  function fileNameFromUrl(url, fallback) {
    if (!url) return fallback || "file";
    try {
      const clean = url.split("?")[0];
      const parts = clean.split("/");
      return decodeURIComponent(parts[parts.length - 1]) || fallback || "file";
    } catch {
      return fallback || "file";
    }
  }

  function formatSize(bytes) {
    if (!bytes && bytes !== 0) return "—";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }

  /* ---------------------------------------------------------
     1) Ambil media dari artikel ASLI (Neon, lewat backend)
     --------------------------------------------------------- */
  async function loadArticleMedia() {
    try {
      const res = await apiFetch("/api/articles?status=all&limit=100");
      const articles = res.data || [];
      const seen = new Set();
      const items = [];
      articles.forEach((a) => {
        if (!a.image_url || seen.has(a.image_url)) return;
        seen.add(a.image_url);
        const ext = extOf(a.image_url);
        items.push({
          id: "artikel-" + a.id,
          url: a.image_url,
          name: fileNameFromUrl(a.image_url, a.slug),
          ext,
          type: typeOf(ext),
          size: null,
          date: a.published_at || a.created_at,
          source: "artikel",
          articleTitle: a.title,
          articleSlug: a.slug
        });
      });
      articleMedia = items;
    } catch (err) {
      console.error("Gagal memuat media dari artikel:", err);
      articleMedia = [];
      toast("Gagal memuat media dari server. Menampilkan upload lokal saja.");
    }
  }

  /* ---------------------------------------------------------
     2) Upload tersimpan (real ImageKit, catatan lokal browser)
     --------------------------------------------------------- */
  function loadUploadedMedia() {
    try {
      uploadedMedia = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    } catch {
      uploadedMedia = [];
    }
  }

  function saveUploadedMedia() {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(uploadedMedia));
  }

  /* ---------------------------------------------------------
     Gabung, filter, urutkan
     --------------------------------------------------------- */
  function allMedia() {
    return [...uploadedMedia, ...articleMedia];
  }

  function applyFilters() {
    let list = allMedia();

    if (state.source !== "all") {
      list = list.filter((m) => m.source === state.source);
    }
    if (state.type !== "all") {
      list = list.filter((m) => m.type === state.type);
    }
    if (state.q.trim()) {
      const q = state.q.trim().toLowerCase();
      list = list.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        (m.articleTitle || "").toLowerCase().includes(q)
      );
    }

    list = list.slice().sort((a, b) => {
      if (state.sort === "name") return a.name.localeCompare(b.name);
      const da = new Date(a.date || 0).getTime();
      const db = new Date(b.date || 0).getTime();
      return state.sort === "old" ? da - db : db - da;
    });

    filtered = list;
    if (currentPage > totalPages()) currentPage = 1;
  }

  function totalPages() {
    return Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  }

  function pageItems() {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }

  /* ---------------------------------------------------------
     Render
     --------------------------------------------------------- */
  function typeBadge(m) {
    if (m.type === "file" && !m.ext) return "FILE";
    return (m.ext || m.type).toUpperCase();
  }

  function thumbHtml(m) {
    if (m.type === "image") {
      return `<img src="${escapeHtml(m.url)}" alt="${escapeHtml(m.name)}" loading="lazy">`;
    }
    if (m.type === "video") {
      return `<i class="fa-solid fa-film media-file-icon"></i><div class="media-play-btn"><i class="fa-solid fa-play"></i></div>`;
    }
    if (m.type === "document") {
      return `<i class="fa-solid fa-file-pdf media-file-icon"></i>`;
    }
    return `<i class="fa-solid fa-file media-file-icon"></i>`;
  }

  function thumbClass(m) {
    if (m.type === "document") return "media-thumb is-pdf";
    if (m.type === "video") return "media-thumb is-video";
    return "media-thumb";
  }

  function cardHtml(m) {
    const checked = selected.has(m.id) ? "checked" : "";
    const metaRight = m.source === "artikel"
      ? `Dipakai di <a href="${PUBLIC_ARTICLE_URL_BASE}${escapeHtml(m.articleSlug)}" target="_blank" rel="noopener">artikel</a>`
      : "Upload Anda";
    return `
      <div class="media-item" data-id="${m.id}">
        <div class="${thumbClass(m)}">
          <span class="media-badge-type">${escapeHtml(typeBadge(m))}</span>
          <input type="checkbox" class="media-check" data-select="${m.id}" ${checked}>
          ${thumbHtml(m)}
        </div>
        <div class="media-info">
          <div class="media-name-row">
            <label class="media-name" title="${escapeHtml(m.name)}">
              <input type="checkbox" data-select="${m.id}" ${checked}>
              <span>${escapeHtml(m.name)}</span>
            </label>
            <button type="button" class="media-more-btn" data-menu="${m.id}"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          </div>
          <div class="media-meta">${formatDate(m.date)} • ${formatSize(m.size)} • ${metaRight}</div>
        </div>
        <div class="media-menu" data-menu-panel="${m.id}">
          <button type="button" data-action="copy" data-id="${m.id}"><i class="fa-regular fa-copy"></i> Salin URL</button>
          <button type="button" data-action="open" data-id="${m.id}"><i class="fa-solid fa-arrow-up-right-from-square"></i> Buka File</button>
          <button type="button" class="media-menu-danger" data-action="delete" data-id="${m.id}" ${m.source === "artikel" ? "disabled title=\"Terhubung ke artikel, hapus lewat halaman artikel\"" : ""}>
            <i class="fa-regular fa-trash-can"></i> Hapus
          </button>
        </div>
      </div>`;
  }

  function render() {
    applyFilters();
    const grid = $("mediaGrid");
    const items = pageItems();

    if (!items.length) {
      grid.innerHTML = `<div class="media-empty"><i class="fa-regular fa-folder-open"></i><strong>Tidak ada media ditemukan</strong><div>Ubah kata pencarian atau filter, atau upload media baru.</div></div>`;
    } else {
      grid.innerHTML = items.map(cardHtml).join("");
    }
    grid.classList.toggle("is-list", view === "list");

    const total = filtered.length;
    const start = total ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
    const end = Math.min(currentPage * PAGE_SIZE, total);
    $("mediaInfo").textContent = `Menampilkan ${start} - ${end} dari ${total} media`;

    renderPager();
    renderBulkbar();
  }

  function renderPager() {
    const pages = totalPages();
    let html = `<button ${currentPage === 1 ? "disabled" : ""} data-page="${currentPage - 1}">‹</button>`;
    const maxShown = 5;
    let from = Math.max(1, currentPage - 2);
    let to = Math.min(pages, from + maxShown - 1);
    from = Math.max(1, to - maxShown + 1);
    if (from > 1) html += `<button data-page="1">1</button><span>…</span>`;
    for (let i = from; i <= to; i++) {
      html += `<button class="${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
    }
    if (to < pages) html += `<span>…</span><button data-page="${pages}">${pages}</button>`;
    html += `<button ${currentPage === pages ? "disabled" : ""} data-page="${currentPage + 1}">›</button>`;
    $("mediaPager").innerHTML = html;
  }

  function renderBulkbar() {
    const bar = $("mediaBulkbar");
    if (selected.size === 0) {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;
    bar.querySelector("#mediaSelCount").textContent = selected.size;
  }

  /* ---------------------------------------------------------
     Aksi item
     --------------------------------------------------------- */
  function findMedia(id) {
    return allMedia().find((m) => m.id === id);
  }

  function copyUrl(id) {
    const m = findMedia(id);
    if (!m) return;
    navigator.clipboard?.writeText(m.url).then(
      () => toast("URL disalin ke clipboard"),
      () => toast("Gagal menyalin URL")
    );
  }

  function openFile(id) {
    const m = findMedia(id);
    if (m) window.open(m.url, "_blank", "noopener");
  }

  function deleteOne(id) {
    const m = findMedia(id);
    if (!m || m.source !== "upload") return;
    if (!confirm(`Hapus "${m.name}" dari pustaka media?`)) return;
    uploadedMedia = uploadedMedia.filter((x) => x.id !== id);
    saveUploadedMedia();
    selected.delete(id);
    toast("Media dihapus dari pustaka");
    render();
  }

  function deleteSelected() {
    const ids = [...selected];
    const deletable = ids.filter((id) => findMedia(id)?.source === "upload");
    const skipped = ids.length - deletable.length;
    if (!deletable.length) {
      toast("Item terpilih berasal dari artikel, tidak bisa dihapus di sini");
      return;
    }
    if (!confirm(`Hapus ${deletable.length} media terpilih?`)) return;
    uploadedMedia = uploadedMedia.filter((m) => !deletable.includes(m.id));
    saveUploadedMedia();
    deletable.forEach((id) => selected.delete(id));
    toast(skipped ? `${deletable.length} media dihapus, ${skipped} dilewati (dari artikel)` : `${deletable.length} media dihapus`);
    render();
  }

  /* ---------------------------------------------------------
     Upload real ke ImageKit (pakai signature dari backend)
     --------------------------------------------------------- */
  async function uploadFileToImageKit(file, rowEl) {
    const statusEl = rowEl.querySelector(".media-upload-status");
    try {
      const auth = await apiFetch("/api/upload/auth");
      const form = new FormData();
      form.append("file", file);
      form.append("fileName", file.name);
      form.append("useUniqueFileName", "true");
      form.append("folder", "/mabnews/media");
      form.append("publicKey", IMAGEKIT_PUBLIC_KEY);
      form.append("signature", auth.signature);
      form.append("expire", auth.expire);
      form.append("token", auth.token);

      const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: form
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload ditolak ImageKit");

      const ext = extOf(data.name || file.name);
      uploadedMedia.unshift({
        id: "upload-" + (data.fileId || Date.now()),
        url: data.url,
        name: data.name || file.name,
        ext,
        type: typeOf(ext),
        size: data.size || file.size,
        date: new Date().toISOString(),
        source: "upload"
      });
      saveUploadedMedia();
      statusEl.textContent = "Berhasil";
      statusEl.className = "media-upload-status ok";
    } catch (err) {
      console.error("Upload gagal:", err);
      statusEl.textContent = "Gagal";
      statusEl.className = "media-upload-status err";
    }
  }

  async function handleFiles(fileList) {
    const files = [...fileList];
    if (!files.length) return;
    const listEl = $("mediaUploadList");
    listEl.innerHTML = "";
    for (const file of files) {
      const row = document.createElement("div");
      row.className = "media-upload-row";
      row.innerHTML = `<i class="fa-regular fa-file"></i><span class="media-upload-name">${escapeHtml(file.name)}</span><span class="media-upload-status loading">Mengupload…</span>`;
      listEl.appendChild(row);
      await uploadFileToImageKit(file, row);
    }
    render();
  }

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  let toastTimer;
  function toast(text) {
    const t = $("mediaToast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ---------------------------------------------------------
     Event wiring
     --------------------------------------------------------- */
  function wireEvents() {
    $("mediaSourceFilter").addEventListener("change", (e) => { state.source = e.target.value; currentPage = 1; render(); });
    $("mediaTypeFilter").addEventListener("change", (e) => { state.type = e.target.value; currentPage = 1; render(); });
    $("mediaSort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });

    let searchTimer;
    $("mediaSearch").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      const val = e.target.value;
      searchTimer = setTimeout(() => { state.q = val; currentPage = 1; render(); }, 300);
    });

    $("mediaSelectAll").addEventListener("change", (e) => {
      const ids = pageItems().map((m) => m.id);
      if (e.target.checked) ids.forEach((id) => selected.add(id));
      else ids.forEach((id) => selected.delete(id));
      render();
    });

    $("mediaGrid").addEventListener("change", (e) => {
      const id = e.target.dataset.select;
      if (!id) return;
      if (e.target.checked) selected.add(id); else selected.delete(id);
      renderBulkbar();
      document.querySelectorAll(`[data-select="${CSS.escape(id)}"]`).forEach((el) => { el.checked = e.target.checked; });
    });

    $("mediaGrid").addEventListener("click", (e) => {
      const menuBtn = e.target.closest("[data-menu]");
      if (menuBtn) {
        e.stopPropagation();
        const id = menuBtn.dataset.menu;
        document.querySelectorAll(".media-menu").forEach((m) => m.classList.remove("show"));
        if (openMenuId !== id) {
          const panel = document.querySelector(`[data-menu-panel="${CSS.escape(id)}"]`);
          panel.classList.add("show");
          openMenuId = id;
        } else {
          openMenuId = null;
        }
        return;
      }
      const actionBtn = e.target.closest("[data-action]");
      if (actionBtn) {
        const { action, id } = actionBtn.dataset;
        if (action === "copy") copyUrl(id);
        if (action === "open") openFile(id);
        if (action === "delete") deleteOne(id);
        document.querySelectorAll(".media-menu").forEach((m) => m.classList.remove("show"));
        openMenuId = null;
      }
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".media-menu").forEach((m) => m.classList.remove("show"));
      openMenuId = null;
    });

    $("mediaClearSelection").addEventListener("click", () => { selected.clear(); render(); });
    $("mediaBulkDelete").addEventListener("click", deleteSelected);

    $("mediaPager").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-page]");
      if (!btn || btn.disabled) return;
      currentPage = parseInt(btn.dataset.page, 10);
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    $("mediaViewGrid").addEventListener("click", () => setView("grid"));
    $("mediaViewList").addEventListener("click", () => setView("list"));

    $("btnUploadMedia").addEventListener("click", openUploadModal);
    $("mediaModalClose").addEventListener("click", closeUploadModal);
    $("mediaModalOverlay").addEventListener("click", (e) => { if (e.target === $("mediaModalOverlay")) closeUploadModal(); });

    $("mediaDropzone").addEventListener("click", () => $("mediaFileInput").click());
    $("mediaFileInput").addEventListener("change", (e) => handleFiles(e.target.files));

    ["dragenter", "dragover"].forEach((evt) =>
      $("mediaDropzone").addEventListener(evt, (e) => { e.preventDefault(); $("mediaDropzone").classList.add("is-drag"); })
    );
    ["dragleave", "drop"].forEach((evt) =>
      $("mediaDropzone").addEventListener(evt, (e) => { e.preventDefault(); $("mediaDropzone").classList.remove("is-drag"); })
    );
    $("mediaDropzone").addEventListener("drop", (e) => handleFiles(e.dataTransfer.files));

    $("btnCreateFolder").addEventListener("click", () => {
      toast("Fitur folder menyusul setelah backend punya tabel media");
    });
  }

  function setView(v) {
    view = v;
    $("mediaViewGrid").classList.toggle("active", v === "grid");
    $("mediaViewList").classList.toggle("active", v === "list");
    render();
  }

  function openUploadModal() {
    $("mediaUploadList").innerHTML = "";
    $("mediaFileInput").value = "";
    $("mediaModalOverlay").classList.add("show");
  }

  function closeUploadModal() {
    $("mediaModalOverlay").classList.remove("show");
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", async () => {
    loadUploadedMedia();
    wireEvents();
    render();
    await loadArticleMedia();
    render();
  });
})();
