/* =========================================================
   MAB-News CMS — admin-js/artikel.js  (halaman Semua Artikel)
   Data asli dari backend (Vercel + Neon):
     GET    /api/articles?page&limit&q&kategori  -> daftar + statistik
     GET    /api/categories                      -> pilihan filter
     DELETE /api/articles/:slug                  -> hapus artikel
   apiFetch, PUBLIC_ARTICLE_URL_BASE berasal dari js/api.js.
   ========================================================= */
(() => {
  const $ = (id) => document.getElementById(id);
  const body = $('articleBody');

  let page = 1;
  let size = 10;
  let q = '';
  let kategori = 'all';
  let total = 0;

  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function formatDate(iso) {
    if (!iso) return '-';
    const d = new Date(iso);
    if (isNaN(d)) return '-';
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function categoryNames(a) {
    if (a.categories && a.categories.length) return a.categories.map((c) => c.name);
    return [a.category && a.category.name].filter(Boolean);
  }

  /* ---------------------------------------------------------
     Kategori (filter + kartu ringkasan)
     --------------------------------------------------------- */
  async function loadCategories() {
    try {
      const res = await apiFetch('/api/categories');
      const categories = res.data || [];
      $('categoryFilter').innerHTML =
        '<option value="all">Semua Kategori</option>' +
        categories.map((c) => `<option value="${escapeHtml(c.key)}">${escapeHtml(c.name)}</option>`).join('');
      if ($('categoryCount')) $('categoryCount').textContent = categories.length;
    } catch (e) {
      console.error('Gagal memuat kategori:', e);
    }
  }

  /* ---------------------------------------------------------
     Artikel
     --------------------------------------------------------- */
  function rowHtml(a, i) {
    const cats = categoryNames(a).map(escapeHtml).join(', ') || '-';
    const thumb = a.image_url
      ? `<img class="artikel-thumb" src="${escapeHtml(a.image_url)}" alt="" loading="lazy">`
      : `<span class="artikel-thumb"></span>`;
    const slug = escapeHtml(a.slug);

    return `
      <tr>
        <td><input class="row-check" type="checkbox" aria-label="Pilih artikel"></td>
        <td class="artikel-col-num">${(page - 1) * size + i + 1}</td>
        <td>
          <div class="artikel-title-cell">
            ${thumb}
            <div class="artikel-title-text">
              <strong>${escapeHtml(a.title)}</strong>
              <small>${escapeHtml(a.lead || '')}</small>
            </div>
          </div>
        </td>
        <td>${cats}</td>
        <td>${escapeHtml(a.author || '-')}</td>
        <td class="artikel-muted-cell">${formatDate(a.published_at)}</td>
        <td>${a.is_popular ? '<span class="artikel-badge popular">Populer</span>' : '<span class="artikel-muted-cell">-</span>'}</td>
        <td>
          <div class="artikel-actions">
            <button type="button" class="view" title="Lihat di website" aria-label="Lihat artikel" data-action="view" data-slug="${slug}"><i class="fa-regular fa-eye"></i></button>
            <button type="button" class="edit" title="Edit" aria-label="Edit artikel" data-action="edit" data-slug="${slug}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button type="button" class="delete" title="Hapus" aria-label="Hapus artikel" data-action="delete" data-slug="${slug}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      </tr>`;
  }

  function stateRow(text) {
    return `<tr><td colspan="8" class="artikel-state-cell">${escapeHtml(text)}</td></tr>`;
  }

  async function loadArticles() {
    body.innerHTML = stateRow('Memuat artikel dari server...');
    $('selectAll').checked = false;

    try {
      const params = new URLSearchParams({ page, limit: size });
      if (q) params.set('q', q);
      if (kategori !== 'all') params.set('kategori', kategori);

      const res = await apiFetch(`/api/articles?${params.toString()}`);
      const articles = res.data || [];
      total = res.total || 0;

      const stats = res.stats || {};
      $('popularCount').textContent = stats.popular_count ?? 0;
      $('displayedCount').textContent = stats.homepage_count ?? 0;
      $('totalCount').textContent = total;
      $('resultCount').textContent = `${total} artikel`;

      body.innerHTML = articles.length
        ? articles.map(rowHtml).join('')
        : stateRow(q || kategori !== 'all' ? 'Tidak ada artikel yang cocok dengan pencarian/filter.' : 'Belum ada artikel.');

      const start = (page - 1) * size;
      $('pageInfo').textContent =
        `Menampilkan ${total ? start + 1 : 0} - ${Math.min(start + articles.length, total)} dari ${total} artikel`;
      renderPager();
    } catch (e) {
      console.error('Gagal memuat artikel:', e);
      body.innerHTML = stateRow('Gagal memuat data dari server. Coba muat ulang halaman.');
      toast('Gagal memuat artikel dari server.');
    }
  }

  function renderPager() {
    const pages = Math.max(1, Math.ceil(total / size));
    if (page > pages) page = pages;

    const maxShown = 5;
    let from = Math.max(1, page - 2);
    let to = Math.min(pages, from + maxShown - 1);
    from = Math.max(1, to - maxShown + 1);

    let html = `<button type="button" ${page === 1 ? 'disabled' : ''} data-page="${page - 1}" aria-label="Sebelumnya">‹</button>`;
    if (from > 1) html += `<button type="button" data-page="1">1</button>${from > 2 ? '<span>…</span>' : ''}`;
    for (let i = from; i <= to; i++) {
      html += `<button type="button" class="${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    if (to < pages) html += `${to < pages - 1 ? '<span>…</span>' : ''}<button type="button" data-page="${pages}">${pages}</button>`;
    html += `<button type="button" ${page === pages ? 'disabled' : ''} data-page="${page + 1}" aria-label="Berikutnya">›</button>`;
    $('pagination').innerHTML = html;
  }

  /* ---------------------------------------------------------
     Aksi
     --------------------------------------------------------- */
  async function deleteArticle(slug) {
    if (!confirm('Hapus artikel ini? Tindakan ini tidak bisa dibatalkan.')) return;
    try {
      await apiFetch(`/api/articles/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      toast('Artikel berhasil dihapus');
      loadArticles();
    } catch (e) {
      toast('Gagal menghapus artikel: ' + e.message);
    }
  }

  let toastTimer;
  function toast(text) {
    const t = $('toast');
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  /* ---------------------------------------------------------
     Event
     --------------------------------------------------------- */
  let searchTimer;
  function onSearch(val) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { q = val.trim(); page = 1; loadArticles(); }, 350);
  }

  $('searchInput').addEventListener('input', (e) => { $('tableSearch').value = e.target.value; onSearch(e.target.value); });
  $('tableSearch').addEventListener('input', (e) => { $('searchInput').value = e.target.value; onSearch(e.target.value); });
  $('categoryFilter').addEventListener('change', (e) => { kategori = e.target.value; page = 1; loadArticles(); });
  $('pageSize').addEventListener('change', (e) => { size = +e.target.value; page = 1; loadArticles(); });
  $('filterToggle').addEventListener('click', () => {
    const open = $('filterPanel').classList.toggle('show');
    $('filterToggle').classList.toggle('is-active', open);
  });
  $('selectAll').addEventListener('change', (e) =>
    document.querySelectorAll('.row-check').forEach((x) => { x.checked = e.target.checked; }));

  $('pagination').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-page]');
    if (!btn || btn.disabled) return;
    page = parseInt(btn.dataset.page, 10);
    loadArticles();
  });

  body.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const slug = btn.dataset.slug;
    if (btn.dataset.action === 'view') window.open(`${PUBLIC_ARTICLE_URL_BASE}${encodeURIComponent(slug)}`, '_blank');
    if (btn.dataset.action === 'edit') window.location.href = `tambah-artikel.html?slug=${encodeURIComponent(slug)}`;
    if (btn.dataset.action === 'delete') deleteArticle(slug);
  });

  loadCategories();
  loadArticles();
})();
