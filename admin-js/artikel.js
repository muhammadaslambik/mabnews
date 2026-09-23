(() => {
  const $ = id => document.getElementById(id), body = $('articleBody');
  let page = 1, size = 10, q = '', kategori = 'all';
  let total = 0, categories = [];

  async function loadCategories() {
    try {
      const res = await apiFetch('/api/categories');
      categories = res.data || [];
      $('categoryFilter').innerHTML = '<option value="all">Semua Kategori</option>' +
        categories.map(c => `<option value="${c.key}">${c.name}</option>`).join('');
      // Kartu "Kategori" (id draftCount dipertahankan agar tidak perlu ubah HTML lama)
      if ($('draftCount')) $('draftCount').textContent = categories.length;
    } catch (e) {
      console.error('Gagal memuat kategori:', e);
    }
  }

  async function loadArticles() {
    body.innerHTML = `<tr><td colspan="8">Memuat...</td></tr>`;
    try {
      const params = new URLSearchParams({ page, limit: size });
      if (q) params.set('q', q);
      if (kategori !== 'all') params.set('kategori', kategori);

      const res = await apiFetch(`/api/articles?${params.toString()}`);
      const articles = res.data || [];
      total = res.total || 0;

      // ---- Kartu ringkasan: Populer & Ditampilkan (dari statistik server) ----
      const stats = res.stats || {};
      if ($('popularCount')) $('popularCount').textContent = stats.popular_count ?? 0;
      if ($('displayedCount')) $('displayedCount').textContent = stats.homepage_count ?? 0;

      body.innerHTML = articles.length ? articles.map((a, i) => `
        <tr>
          <td><input class="row-check" type="checkbox"></td>
          <td>${(page - 1) * size + i + 1}</td>
          <td class="title-cell"><strong>${a.title}</strong><small>${a.lead || ''}</small></td>
          <td>${(a.categories && a.categories.length ? a.categories.map(c => c.name) : [a.category?.name].filter(Boolean)).join(', ') || '-'}</td>
          <td>${a.author || '-'}</td>
          <td>${new Date(a.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
          <td>${a.is_popular ? '<span class="article-status published">Populer</span>' : '-'}</td>
          <td><div class="article-actions">
            <button title="Lihat" onclick="viewArticle('${a.slug}')">Lihat</button>
            <button class="edit" title="Edit" onclick="editArticle('${a.slug}')">Edit</button>
            <button class="delete" title="Hapus" onclick="deleteArticle('${a.slug}')">Hapus</button>
          </div></td>
        </tr>`).join('') : `<tr><td colspan="8">Tidak ada artikel.</td></tr>`;

      $('resultCount').textContent = `${total} articles`;
      if ($('totalCount')) $('totalCount').textContent = total;

      const start = (page - 1) * size;
      $('pageInfo').textContent = `Menampilkan ${total ? start + 1 : 0}–${Math.min(start + articles.length, total)} dari ${total}`;
      const pages = Math.max(1, Math.ceil(total / size));
      $('pagination').innerHTML = Array.from({ length: pages }, (_, i) =>
        `<button class="${i + 1 === page ? 'active' : ''}" onclick="goPage(${i + 1})">${i + 1}</button>`).join('');
    } catch (e) {
      console.error('Gagal memuat artikel:', e);
      body.innerHTML = `<tr><td colspan="8">Gagal memuat data dari server.</td></tr>`;
      toast('Gagal memuat artikel dari server.');
    }
  }

  let searchTimer;
  function onSearch(val) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { q = val; page = 1; loadArticles(); }, 350);
  }

  $('searchInput').addEventListener('input', e => { $('tableSearch').value = e.target.value; onSearch(e.target.value); });
  $('tableSearch').addEventListener('input', e => onSearch(e.target.value));
  $('categoryFilter').addEventListener('change', e => { kategori = e.target.value; page = 1; loadArticles(); });
  $('pageSize').addEventListener('change', e => { size = +e.target.value; page = 1; loadArticles(); });
  $('filterToggle').addEventListener('click', () => $('filterPanel').classList.toggle('show'));
  $('selectAll').addEventListener('change', e => document.querySelectorAll('.row-check').forEach(x => x.checked = e.target.checked));

  window.goPage = n => { page = n; loadArticles(); };
  window.viewArticle = slug => window.open(`${PUBLIC_ARTICLE_URL_BASE}${slug}`, '_blank');
  window.editArticle = slug => { window.location.href = `tambah-artikel.html?slug=${encodeURIComponent(slug)}`; };
  window.deleteArticle = async slug => {
    if (!confirm('Hapus artikel ini? Tindakan ini tidak bisa dibatalkan.')) return;
    try {
      await apiFetch(`/api/articles/${slug}`, { method: 'DELETE' });
      toast('Artikel berhasil dihapus');
      loadArticles();
    } catch (e) {
      toast('Gagal menghapus artikel: ' + e.message);
    }
  };

  function toast(text) { const t = $('toast'); t.textContent = text; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800); }

  loadCategories();
  loadArticles();
})();
