document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("id");

  if (!slug) {
    document.querySelector(".article-title").textContent = "Artikel tidak ditemukan.";
    return;
  }

  function renderPopularItem(a, i) {
    return `
      <a href="artikel.html?id=${a.slug}" class="popular-item">
        <span class="popular-number">${i + 1}</span>
        <div class="popular-content">
          <h3>${a.title}</h3>
          <time>${new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}</time>
        </div>
        <img src="${a.image_url || ''}" alt="">
      </a>`;
  }

  function renderRelatedItem(a) {
    return `
      <a href="artikel.html?id=${a.slug}" class="related-item">
        <img src="${a.image_url || ''}" alt="">
        <div>
          <h3>${a.title}</h3>
          <time>${new Date(a.published_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}</time>
        </div>
      </a>`;
  }

  async function loadSidebar(currentSlug, categoryKey) {
    const popularList = document.getElementById("sidebarPopularList");
    const relatedList = document.getElementById("sidebarRelatedList");

    try {
      const popRes = await fetch(`${API_BASE_URL}/api/articles?popular=true&limit=6`);
      const popData = (await popRes.json()).data || [];
      const popular = popData.filter(a => a.slug !== currentSlug).slice(0, 5);
      if (popularList) {
        popularList.innerHTML = popular.length
          ? popular.map(renderPopularItem).join('')
          : `<p style="font-size:12px;color:#8992a2;">Belum ada artikel populer lain.</p>`;
      }
    } catch (err) {
      console.error("Gagal memuat sidebar populer:", err);
    }

    try {
      const relRes = await fetch(`${API_BASE_URL}/api/articles?kategori=${categoryKey || ''}&limit=5`);
      const relData = (await relRes.json()).data || [];
      const related = relData.filter(a => a.slug !== currentSlug).slice(0, 4);
      if (relatedList) {
        relatedList.innerHTML = related.length
          ? related.map(renderRelatedItem).join('')
          : `<p style="font-size:12px;color:#8992a2;">Belum ada artikel terkait.</p>`;
      }
    } catch (err) {
      console.error("Gagal memuat sidebar terkait:", err);
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/articles/${slug}`);
    if (!res.ok) throw new Error("Artikel tidak ditemukan.");
    const { data: a } = await res.json();

    document.title = `${a.title} — MAB-News`;
    document.querySelector(".article-category").textContent = (a.category?.name || '').toUpperCase();
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

    if (tagsEl) tagsEl.style.display = 'none';
    if (navEl) navEl.style.display = 'none';

    const breadcrumbCat = document.querySelector(".article-breadcrumb a[href='kategori.html']");
    if (breadcrumbCat && a.category?.name) breadcrumbCat.textContent = a.category.name;

    loadSidebar(a.slug, a.category?.key);

  } catch (error) {
    console.error("Gagal memuat artikel:", error);
    document.querySelector(".article-title").textContent = "Artikel tidak ditemukan.";
    document.querySelector(".article-lead").textContent = "Artikel yang Anda cari mungkin sudah dihapus atau tautannya salah.";
    document.querySelector(".article-hero")?.remove();
    document.querySelector(".article-body")?.remove();
  }
});