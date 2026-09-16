(() => {
  "use strict";

  const makeImage = (title, hue) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="120">
      <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="${hue}"/><stop offset="1" stop-color="#0a2747"/></linearGradient></defs>
      <rect width="180" height="120" fill="url(#g)"/>
      <circle cx="142" cy="25" r="28" fill="rgba(255,255,255,.13)"/>
      <rect x="24" y="35" width="80" height="10" rx="5" fill="rgba(255,255,255,.82)"/>
      <rect x="24" y="53" width="108" height="8" rx="4" fill="rgba(255,255,255,.38)"/>
      <rect x="24" y="69" width="74" height="8" rx="4" fill="rgba(255,255,255,.28)"/>
      <text x="24" y="103" fill="white" font-size="10" font-family="Arial">${title.slice(0,22)}</text>
    </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  };

  const drafts = [
    {id:1,title:"Peran AI dalam Transformasi Digital di Indonesia",excerpt:"Kecerdasan buatan (AI) kini menjadi salah satu...",category:"Teknologi",author:"Muhammad Aslambik",created:"18 Mei 2025",createdTime:"10:32 WIB",updated:"19 Mei 2025",updatedTime:"14:20 WIB",img:makeImage("AI & Digital","#0874ff")},
    {id:2,title:"5 Strategi Meningkatkan Produktivitas dengan Teknologi",excerpt:"Otomatisasi bukan lagi sekadar tren, tetapi...",category:"Bisnis",author:"Muhammad Aslambik",created:"17 Mei 2025",createdTime:"09:15 WIB",updated:"18 Mei 2025",updatedTime:"11:40 WIB",img:makeImage("Produktivitas","#7040d7")},
    {id:3,title:"Panduan Lengkap Menggunakan n8n untuk Pemula",excerpt:"n8n adalah platform otomasi workflow yang...",category:"Tutorial",author:"Muhammad Aslambik",created:"16 Mei 2025",createdTime:"16:45 WIB",updated:"17 Mei 2025",updatedTime:"10:22 WIB",img:makeImage("n8n Workflow","#16a7b8")},
    {id:4,title:"Tips Memilih Domain dan Hosting Terbaik",excerpt:"Domain dan hosting adalah fondasi utama untuk...",category:"Website",author:"Muhammad Aslambik",created:"15 Mei 2025",createdTime:"12:30 WIB",updated:"16 Mei 2025",updatedTime:"09:18 WIB",img:makeImage("Hosting","#e86e2b")},
    {id:5,title:"Data dan Statistik: Kunci dalam Pengambilan Keputusan",excerpt:"Data, yang akurat akan membantu kita membuat...",category:"Statistik",author:"Muhammad Aslambik",created:"14 Mei 2025",createdTime:"15:10 WIB",updated:"15 Mei 2025",updatedTime:"13:47 WIB",img:makeImage("Data","#337bd5")},
    {id:6,title:"Cara Efektif Beriklan di Era Digital",excerpt:"Iklan digital memberikan peluang besar untuk...",category:"Iklan",author:"Muhammad Aslambik",created:"13 Mei 2025",createdTime:"11:20 WIB",updated:"14 Mei 2025",updatedTime:"08:33 WIB",img:makeImage("Digital Ads","#e24954")},
    {id:7,title:"Memaksimalkan Perangkat untuk Produktivitas Kerja",excerpt:"Perangkat yang tepat dapat meningkatkan efisiensi...",category:"Perangkat",author:"Muhammad Aslambik",created:"12 Mei 2025",createdTime:"14:55 WIB",updated:"13 Mei 2025",updatedTime:"10:12 WIB",img:makeImage("Perangkat","#168e91")},
    {id:8,title:"Mengenal Lebih Dekat Tentang Cloud Hosting",excerpt:"Cloud hosting memberikan fleksibilitas dan...",category:"Website",author:"Muhammad Aslambik",created:"11 Mei 2025",createdTime:"09:40 WIB",updated:"12 Mei 2025",updatedTime:"14:26 WIB",img:makeImage("Cloud Hosting","#0874ff")}
  ];

  let rows = JSON.parse(localStorage.getItem("mabnewsDrafts") || "null") || drafts.map(x => ({...x}));
  let filtered = [...rows];
  let currentPage = 1;
  const perPage = 8;
  let pendingDeleteId = null;

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

  function save() {
    localStorage.setItem("mabnewsDrafts", JSON.stringify(rows));
  }

  function catClass(cat) {
    return "cat-" + cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-");
  }

  function render() {
    const start = (currentPage - 1) * perPage;
    const pageRows = filtered.slice(start, start + perPage);
    tbody.innerHTML = "";

    empty.hidden = pageRows.length !== 0;
    pageRows.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.dataset.id = item.id;
      tr.innerHTML = `
        <td><input class="row-check" type="checkbox" value="${item.id}" aria-label="Pilih artikel"></td>
        <td data-label="No">${start + index + 1}</td>
        <td data-label="Judul Artikel">
          <div class="article-cell">
            <img class="thumb" src="${item.img}" alt="">
            <div>
              <div class="article-title" title="${item.title}">${item.title}</div>
              <div class="article-excerpt">${item.excerpt}</div>
            </div>
          </div>
        </td>
        <td data-label="Kategori"><span class="badge ${catClass(item.category)}">${item.category}</span></td>
        <td data-label="Penulis"><span class="meta">♟ &nbsp;${item.author}</span></td>
        <td data-label="Tanggal Dibuat"><span class="meta">◷ &nbsp;${item.created}<small>${item.createdTime}</small></span></td>
        <td data-label="Terakhir Diubah"><span class="meta">◷ &nbsp;${item.updated}<small>${item.updatedTime}</small></span></td>
        <td data-label="Status"><span class="badge status">Draft</span></td>
        <td data-label="Aksi">
          <div class="actions">
            <button class="action-btn edit" type="button" data-action="edit" title="Edit">✎</button>
            <button class="action-btn" type="button" data-action="preview" title="Preview">◉</button>
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
    for(let p=1;p<=pages;p++){
      const b=document.createElement("button");
      b.className="page-btn"+(p===currentPage?" active":""); b.textContent=p;
      b.onclick=()=>{currentPage=p;render()};
      pagination.appendChild(b);
    }
    const next=document.createElement("button");
    next.className="page-btn"; next.textContent="›"; next.disabled=currentPage===pages;
    next.onclick=()=>{currentPage++;render()};
    pagination.appendChild(next);
  }

  function applyFilters() {
    const q = $("#searchInput").value.trim().toLowerCase();
    const cat = $("#categoryFilter").value;
    const author = $("#authorFilter").value;
    filtered = rows.filter(item => {
      const hay = `${item.title} ${item.category} ${item.author}`.toLowerCase();
      return (!q || hay.includes(q)) && (!cat || item.category === cat) && (!author || item.author === author);
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
    if(e.target.classList.contains("row-check")) updateSelectAll();
  });

  tbody.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if(!btn) return;
    const id = Number(btn.closest("tr").dataset.id);
    const item = rows.find(x => x.id === id);
    if(btn.dataset.action === "edit"){
      localStorage.setItem("mabnewsEditDraft", JSON.stringify(item));
      window.location.href = `tambah-artikel.html?edit=${id}`;
    } else if(btn.dataset.action === "preview"){
      notify(`Preview: ${item.title}`);
    } else if(btn.dataset.action === "delete"){
      pendingDeleteId = id;
      $("#confirmModal").classList.add("show");
      $("#confirmModal").setAttribute("aria-hidden","false");
    }
  });

  function closeModal(){
    $("#confirmModal").classList.remove("show");
    $("#confirmModal").setAttribute("aria-hidden","true");
    pendingDeleteId = null;
  }
  document.querySelectorAll("[data-close-modal]").forEach(b => b.addEventListener("click", closeModal));
  $("#confirmModal").addEventListener("click", e => { if(e.target.id === "confirmModal") closeModal(); });

  $("#confirmDelete").addEventListener("click", () => {
    if(pendingDeleteId !== null){
      rows = rows.filter(x => x.id !== pendingDeleteId);
      save(); closeModal(); applyFilters(); notify("Artikel draft berhasil dihapus.");
    }
  });

  $("#bulkDelete").addEventListener("click", () => {
    const ids = [...document.querySelectorAll(".row-check:checked")].map(c => Number(c.value));
    if(!ids.length) return;
    if(confirm(`Hapus ${ids.length} artikel draft yang dipilih?`)){
      rows = rows.filter(x => !ids.includes(x.id));
      save(); applyFilters(); notify(`${ids.length} artikel berhasil dihapus.`);
    }
  });
  $("#clearSelection").addEventListener("click", () => {
    document.querySelectorAll(".row-check").forEach(c => c.checked=false);
    updateSelectAll();
  });

  // Sidebar / navigation
  const sidebar = $("#sidebar"), backdrop = $("#sidebarBackdrop");
  function toggleSidebar(force){
    const open = typeof force === "boolean" ? force : !sidebar.classList.contains("open");
    sidebar.classList.toggle("open", open);
    backdrop.classList.toggle("show", open);
    $("#hamburger").setAttribute("aria-expanded", String(open));
  }
  $("#hamburger").addEventListener("click", () => toggleSidebar());
  $("#sidebarClose").addEventListener("click", () => toggleSidebar(false));
  backdrop.addEventListener("click", () => toggleSidebar(false));
  document.querySelectorAll(".sidebar-nav a").forEach(a => a.addEventListener("click", () => { if(innerWidth <= 800) toggleSidebar(false); }));
  document.querySelectorAll(".nav-parent").forEach(btn => {
    btn.addEventListener("click", () => {
      const menu = document.getElementById(btn.dataset.submenu);
      const open = !menu.classList.contains("collapsed");
      menu.classList.toggle("collapsed", open);
      btn.classList.toggle("open", !open);
      btn.setAttribute("aria-expanded", String(!open));
      const chevron = btn.querySelector(".chevron");
      if(chevron) chevron.textContent = open ? "⌄" : "⌃";
    });
  });

  // Profile menu
  $("#profileBtn").addEventListener("click", e => { e.stopPropagation(); $("#profileMenu").classList.toggle("show"); });
  document.addEventListener("click", () => $("#profileMenu").classList.remove("show"));
  $("#profileMenu").addEventListener("click", e => e.stopPropagation());

  // Theme toggle (persisted)
  const savedTheme = localStorage.getItem("mabnewsTheme");
  if(savedTheme === "dark") document.documentElement.classList.add("dark");
  $("#themeToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("mabnewsTheme", document.documentElement.classList.contains("dark") ? "dark" : "light");
    notify(document.documentElement.classList.contains("dark") ? "Mode gelap diaktifkan." : "Mode terang diaktifkan.");
  });

  render();
})(); 
