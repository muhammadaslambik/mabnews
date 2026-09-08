document.addEventListener("DOMContentLoaded", () => {
  const rows = [...document.querySelectorAll(".article-row")];
  const tabs = [...document.querySelectorAll(".news-tab")];
  const categoryFilter = document.getElementById("categoryFilter");
  const authorFilter = document.getElementById("authorFilter");
  const timeFilter = document.getElementById("timeFilter");
  const sortFilter = document.getElementById("sortFilter");
  const resultCount = document.getElementById("resultCount");
  const applyFilter = document.getElementById("applyFilter");
  const resetFilter = document.getElementById("resetFilter");

  let selectedCategory = "Semua";

  function apply() {
    const category = selectedCategory === "Semua"
      ? categoryFilter.value
      : selectedCategory;

    const author = authorFilter.value;
    const time = timeFilter.value;

    rows.forEach(row => {
      const categoryOK = category === "Semua" || row.dataset.category === category;
      const authorOK = author === "Semua" || row.dataset.author === author;

      // Data demo memakai penanda "today". Untuk UI awal,
      // semua opsi waktu selain "Semua Waktu" tetap menampilkan data.
      const timeOK = time === "Semua" || row.dataset.time === "today";

      row.classList.toggle("is-hidden", !(categoryOK && authorOK && timeOK));
    });

    const visible = rows.filter(row => !row.classList.contains("is-hidden")).length;
    resultCount.textContent = `Menampilkan ${visible} berita`;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(item => item.classList.remove("active"));
      tab.classList.add("active");
      selectedCategory = tab.dataset.category;
      categoryFilter.value = selectedCategory;
      apply();
    });
  });

  applyFilter.addEventListener("click", apply);

  resetFilter.addEventListener("click", () => {
    selectedCategory = "Semua";
    categoryFilter.value = "Semua";
    authorFilter.value = "Semua";
    timeFilter.value = "Semua";
    tabs.forEach(item => item.classList.toggle(
      "active", item.dataset.category === "Semua"
    ));
    apply();
  });

  sortFilter.addEventListener("change", () => {
    const list = document.getElementById("articleList");
    const ordered = [...rows].reverse();
    if (sortFilter.value === "newest") ordered.reverse();
    ordered.forEach(row => list.appendChild(row));
  });

  const headerSearch = document.getElementById("headerSearch");
  const searchInput = document.getElementById("searchInput");

  headerSearch?.addEventListener("submit", event => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.classList.toggle("is-hidden", query && !text.includes(query));
    });

    const visible = rows.filter(row => !row.classList.contains("is-hidden")).length;
    resultCount.textContent = `Menampilkan ${visible} berita`;
  });

  document.getElementById("newsletterForm")?.addEventListener("submit", event => {
    event.preventDefault();
    alert("Terima kasih. Email Anda berhasil didaftarkan.");
    event.target.reset();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const rows = [...document.querySelectorAll(".article-row")];
  const tabs = [...document.querySelectorAll(".news-tab")];
  const categoryFilter = document.getElementById("categoryFilter");
  const authorFilter = document.getElementById("authorFilter");
  const timeFilter = document.getElementById("timeFilter");
  const sortFilter = document.getElementById("sortFilter");
  const resultCount = document.getElementById("resultCount");
  const applyFilter = document.getElementById("applyFilter");
  const resetFilter = document.getElementById("resetFilter");
  const params = new URLSearchParams(window.location.search);

  let selectedCategory = params.get("kategori") || "Semua";
  const initialSort = params.get("sort") === "popular" ? "newest" : (params.get("sort") || "newest");
  const initialQuery = (params.get("q") || "").trim().toLowerCase();

  function syncUrl(extra = {}) {
    const next = new URLSearchParams(window.location.search);
    Object.entries(extra).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "" || value === "Semua") next.delete(key);
      else next.set(key, value);
    });
    history.replaceState(null, "", `${window.location.pathname}${next.toString() ? "?" + next.toString() : ""}`);
  }

  function apply() {
    const category = selectedCategory === "Semua" ? categoryFilter.value : selectedCategory;
    const author = authorFilter.value;
    const time = timeFilter.value;
    const query = (document.getElementById("searchInput")?.value || "").trim().toLowerCase();

    rows.forEach(row => {
      const categoryOK = category === "Semua" || row.dataset.category === category;
      const authorOK = author === "Semua" || row.dataset.author === author;
      const timeOK = time === "Semua" || row.dataset.time === "today";
      const textOK = !query || row.textContent.toLowerCase().includes(query);
      row.classList.toggle("is-hidden", !(categoryOK && authorOK && timeOK && textOK));
    });

    const visible = rows.filter(row => !row.classList.contains("is-hidden")).length;
    resultCount.textContent = `Menampilkan ${visible} berita`;
  }

  function sortRows(value) {
    const list = document.getElementById("articleList");
    if (!list) return;
    const ordered = [...rows];
    if (value === "oldest") ordered.reverse();
    ordered.forEach(row => list.appendChild(row));
  }

  // Sinkronkan kategori dari URL bila tersedia.
  if (["Semua", "Nasional", "Internasional", "Ekonomi", "Olahraga", "Teknologi", "Otomotif"].includes(selectedCategory)) {
    categoryFilter.value = selectedCategory;
    tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.category === selectedCategory));
  } else {
    selectedCategory = "Semua";
  }

  sortFilter.value = ["newest", "oldest"].includes(initialSort) ? initialSort : "newest";
  sortRows(sortFilter.value);

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(item => item.classList.remove("active"));
      tab.classList.add("active");
      selectedCategory = tab.dataset.category;
      categoryFilter.value = selectedCategory;
      syncUrl({ kategori: selectedCategory === "Semua" ? null : selectedCategory.toLowerCase() });
      apply();
    });
  });

  applyFilter?.addEventListener("click", () => {
    selectedCategory = categoryFilter.value;
    tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.category === selectedCategory));
    syncUrl({ kategori: selectedCategory === "Semua" ? null : selectedCategory.toLowerCase() });
    apply();
  });

  resetFilter?.addEventListener("click", () => {
    selectedCategory = "Semua";
    categoryFilter.value = "Semua";
    authorFilter.value = "Semua";
    timeFilter.value = "Semua";
    if (document.getElementById("searchInput")) document.getElementById("searchInput").value = "";
    tabs.forEach(item => item.classList.toggle("active", item.dataset.category === "Semua"));
    syncUrl({ kategori: null, q: null });
    apply();
  });

  sortFilter?.addEventListener("change", () => {
    sortRows(sortFilter.value);
    syncUrl({ sort: sortFilter.value === "newest" ? null : sortFilter.value });
  });

  const headerSearch = document.getElementById("headerSearch");
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = params.get("q") || "";

  headerSearch?.addEventListener("submit", event => {
    event.preventDefault();
    const query = searchInput.value.trim();
    syncUrl({ q: query || null });
    apply();
  });

  document.querySelectorAll(".pagination a:not(.disabled)").forEach(link => {
    link.addEventListener("click", () => {
      const url = new URL(link.href, window.location.href);
      const page = url.searchParams.get("page");
      const current = new URLSearchParams(window.location.search);
      if (page) current.set("page", page);
      history.pushState(null, "", `${window.location.pathname}?${current.toString()}`);
    });
  });

  document.getElementById("newsletterForm")?.addEventListener("submit", event => {
    event.preventDefault();
    alert("Terima kasih. Email Anda berhasil didaftarkan.");
    event.target.reset();
  });
});

