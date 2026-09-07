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
