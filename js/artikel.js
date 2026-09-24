document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("id");

  if (!slug) {
    document.querySelector(".article-title").textContent = "Artikel tidak ditemukan.";
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/articles/${slug}`);
    if (!res.ok) throw new Error("Artikel tidak ditemukan.");
    const { data: a } = await res.json();

    document.title = `${a.title} — MAB-News`;

    // ---- Kategori: bisa lebih dari satu ----
    const categories = (a.categories && a.categories.length)
      ? a.categories
      : (a.category ? [a.category] : []);

    const categoryEl = document.querySelector(".article-category");
    if (categoryEl) {
      categoryEl.innerHTML = categories.length
        ? categories.map(c => `<a href="kategori.html?kategori=${c.key}">${(c.name || '').toUpperCase()}</a>`).join(' <span class="category-sep">•</span> ')
        : '';
    }

    document.querySelector(".article-title").textContent = a.title;
    document.querySelector(".article-lead").textContent = a.lead || '';
    document.querySelector(".author-name").childNodes[0].textContent = (a.author || 'MAB-News') + ' ';

    const dateStr = new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
    const timeStr = new Date(a.published_at).toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
    document.querySelector(".article-date").textContent = `${dateStr} \u00a0•\u00a0 ${timeStr} WIB`;

    const heroImg = document.querySelector(".article-hero img");
    if (heroImg) { heroImg.src = a.image_url || ''; heroImg.alt = a.title; }
    const figcaption = document.querySelector(".article-hero figcaption");
    if (figcaption) figcaption.textContent = a.caption || '';

    const bodyEl = document.querySelector(".article-body");
    const tagsEl = bodyEl.querySelector(".article-tags");
    const navEl = bodyEl.querySelector(".article-navigation");

    bodyEl.querySelectorAll("p, blockquote").forEach(el => el.remove());
    const paragraphsHtml = (a.content || []).map(p => `<p>${p}</p>`).join('');
    if (tagsEl) tagsEl.insertAdjacentHTML('beforebegin', paragraphsHtml);
    else bodyEl.insertAdjacentHTML('afterbegin', paragraphsHtml);

    // ---- Tags: sudah didukung backend, tampilkan kalau ada ----
    if (tagsEl) {
      if (Array.isArray(a.tags) && a.tags.length) {
        const tagsLabel = tagsEl.querySelector(".tags-label");
        tagsEl.querySelectorAll("a").forEach(el => el.remove());
        tagsEl.insertAdjacentHTML(
          'beforeend',
          a.tags.map(t => `<a href="search.html?q=${encodeURIComponent(t)}">${t}</a>`).join('')
        );
        tagsEl.style.display = '';
      } else {
        tagsEl.style.display = 'none';
      }
    }
    if (navEl) navEl.style.display = 'none'; // prev/next belum didukung backend

    // ---- Breadcrumb: pakai kategori utama (pertama) ----
    const breadcrumbCat = document.querySelector(".article-breadcrumb a[href='kategori.html']");
    if (breadcrumbCat && categories.length) {
      breadcrumbCat.textContent = categories[0].name;
      breadcrumbCat.href = `kategori.html?kategori=${categories[0].key}`;
    }

    // ---- Sidebar: Terpopuler & Terkait (dari database, bukan lagi contoh statis) ----
    loadPopularSidebar(a.slug);
    loadRelatedSidebar(a.slug, categories);
  } catch (error) {
    console.error("Gagal memuat artikel:", error);
    document.querySelector(".article-title").textContent = "Artikel tidak ditemukan.";
    document.querySelector(".article-lead").textContent = "Artikel yang Anda cari mungkin sudah dihapus atau tautannya salah.";
    document.querySelector(".article-hero")?.remove();
    document.querySelector(".article-body")?.remove();
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  async function loadPopularSidebar(currentSlug) {
    const list = document.querySelector(".popular-list");
    if (!list) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/articles?popular=true&limit=6`);
      if (!res.ok) throw new Error("Gagal memuat artikel populer.");
      const { data } = await res.json();
      const items = (data || []).filter(x => x.slug !== currentSlug).slice(0, 5);

      list.innerHTML = items.length ? items.map((item, i) => `
        <a href="artikel.html?id=${item.slug}" class="popular-item">
          <div class="popular-number">${i + 1}</div>
          <div class="popular-content">
            <h3>${item.title}</h3>
            <time>${formatDate(item.published_at)}</time>
          </div>
          <img src="${item.image_url || ''}" alt="">
        </a>`).join('') : '';

      if (!items.length) {
        list.closest(".sidebar-section")?.remove();
      }
    } catch (err) {
      console.error("Gagal memuat sidebar Terpopuler:", err);
    }
  }

  async function loadRelatedSidebar(currentSlug, categories) {
    const list = document.querySelector(".related-list");
    if (!list) return;
    try {
      let items = [];
      if (categories.length) {
        const res = await fetch(`${API_BASE_URL}/api/articles?kategori=${categories[0].key}&limit=6`);
        if (!res.ok) throw new Error("Gagal memuat artikel terkait.");
        const { data } = await res.json();
        items = (data || []).filter(x => x.slug !== currentSlug).slice(0, 4);
      }
      // Kalau kategori itu tidak punya artikel lain, tampilkan artikel terbaru sebagai cadangan
      if (!items.length) {
        const res = await fetch(`${API_BASE_URL}/api/articles?limit=6`);
        if (res.ok) {
          const { data } = await res.json();
          items = (data || []).filter(x => x.slug !== currentSlug).slice(0, 4);
        }
      }

      if (!items.length) {
        list.closest(".sidebar-section")?.remove();
        return;
      }

      list.innerHTML = items.map(item => `
        <a href="artikel.html?id=${item.slug}" class="related-item">
          <img src="${item.image_url || ''}" alt="">
          <div>
            <h3>${item.title}</h3>
            <time>${formatDate(item.published_at)}</time>
          </div>
        </a>`).join('');
    } catch (err) {
      console.error("Gagal memuat sidebar Terkait:", err);
    }
  }
});
