(() => {
  "use strict";

  let data = [];
  let filtered = [];
  let page = 1;
  let per = 8;
  let deleteId = null;

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  const esc = s => String(s).replace(/[&<>'"]/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
  }[m]));
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  function msg(t) {
    $("#toast").textContent = t;
    $("#toast").classList.add("show");
    clearTimeout(msg.t);
    msg.t = setTimeout(() => $("#toast").classList.remove("show"), 2200);
  }

  function stats() {
    $("#total").textContent = data.length;
    $("#active").textContent = data.filter(x => x.status === "Aktif").length;
    $("#inactive").textContent = data.filter(x => x.status === "Nonaktif").length;
    $("#articles").textContent = data.reduce((a, x) => a + Number(x.article_count || 0), 0);
  }

  // ---------------------------------------------------------
  // Muat kategori dari database (bukan lagi localStorage)
  // ---------------------------------------------------------
  async function loadCategories() {
    $("#tbody").innerHTML = `<tr><td colspan="9">Memuat kategori dari server...</td></tr>`;
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error("Gagal mengambil kategori dari server.");
      const raw = await res.json();
      data = (Array.isArray(raw) ? raw : (raw.data || [])).map(c => ({
        id: c.id,
        name: c.name,
        key: c.key,
        description: c.description || "",
        article_count: c.article_count || 0,
        status: c.status || "Aktif",
        created_at: c.created_at,
      }));
      apply();
    } catch (e) {
      console.error("Gagal memuat kategori:", e);
      $("#tbody").innerHTML = `<tr><td colspan="9">Gagal memuat kategori dari server.</td></tr>`;
      msg("Gagal memuat kategori dari server.");
    }
  }

  function apply() {
    let q = $("#search").value.toLowerCase().trim();
    let st = $("#status").value;
    let so = $("#sort").value;
    filtered = data.filter(x =>
      (!q || `${x.name} ${x.key} ${x.description}`.toLowerCase().includes(q)) &&
      (!st || x.status === st)
    );
    filtered.sort((a, b) =>
      so === "az" ? a.name.localeCompare(b.name) :
      so === "za" ? b.name.localeCompare(a.name) :
      so === "count" ? b.article_count - a.article_count :
      (b.id || 0) - (a.id || 0)
    );
    page = 1;
    render();
  }

  function fmtDate(iso) {
    if (!iso) return "-";
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      time: d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
    };
  }

  function render() {
    let start = (page - 1) * per;
    let rows = filtered.slice(start, start + per);
    let tb = $("#tbody");
    tb.innerHTML = "";
    $("#empty").hidden = rows.length > 0;

    rows.forEach((x, i) => {
      const created = fmtDate(x.created_at);
      const createdHtml = typeof created === "object" ? `${created.date}<small>${created.time}</small>` : created;
      let tr = document.createElement("tr");
      tr.dataset.id = x.id;
      tr.innerHTML = `<td><input class="check" type="checkbox" value="${x.id}"></td><td data-label="#">${start + i + 1}</td><td data-label="Nama Kategori"><div class="category"><span class="folder">▰</span>${esc(x.name)}</div></td><td data-label="Slug"><span class="slug">${esc(x.key)}</span></td><td data-label="Deskripsi"><span class="desc">${esc(x.description)}</span></td><td data-label="Jumlah Artikel">${x.article_count}</td><td data-label="Status"><span class="status ${x.status === "Aktif" ? "active" : "inactive"}">${x.status}</span></td><td data-label="Dibuat">${createdHtml}</td><td data-label="Aksi"><div class="actions"><button class="action" data-a="view">◉</button><button class="action" data-a="edit">✎</button><button class="action delete" data-a="delete">♲</button></div></td>`;
      tb.appendChild(tr);
    });

    let pages = Math.max(1, Math.ceil(filtered.length / per));
    $("#info").textContent = filtered.length ? `Menampilkan ${start + 1} – ${Math.min(start + per, filtered.length)} dari ${filtered.length} kategori` : "Tidak ada kategori";
    $("#prev").disabled = page === 1;
    $("#next").disabled = page === pages;
    $("#pages").innerHTML = "";
    for (let i = 1; i <= pages; i++) {
      let b = document.createElement("button");
      b.textContent = i;
      b.className = i === page ? "active" : "";
      b.onclick = () => { page = i; render(); };
      $("#pages").appendChild(b);
    }
    stats();
    selectState();
  }

  function selectState() {
    let c = $$(".check"), s = c.filter(x => x.checked);
    $("#all").checked = c.length > 0 && s.length === c.length;
    $("#all").indeterminate = s.length > 0 && s.length < c.length;
    $("#sel").textContent = s.length;
    $("#bulk").hidden = !s.length;
  }

  function openForm(x) {
    $("#formTitle").textContent = x ? "Edit Kategori" : "Tambah Kategori";
    $("#id").value = x?.id || "";
    $("#name").value = x?.name || "";
    $("#slug").value = x?.key || "";
    $("#desc").value = x?.description || "";
    $("#num").value = x?.article_count || 0;
    $("#num").disabled = true; // jumlah artikel dihitung otomatis dari database
    $("#state").value = x?.status || "Aktif";
    $("#formModal").classList.add("show");
    $("#name").focus();
  }
  function closeForm() { $("#formModal").classList.remove("show"); }

  $("#add").onclick = () => openForm();
  $$("[data-close]").forEach(x => x.onclick = closeForm);
  $("#name").oninput = () => { if (!$("#id").value) $("#slug").value = slug($("#name").value); };

  $("#form").onsubmit = async e => {
    e.preventDefault();
    const id = $("#id").value;
    const payload = {
      name: $("#name").value.trim(),
      key: slug($("#slug").value.trim()),
      description: $("#desc").value.trim(),
      status: $("#state").value,
    };
    if (!payload.name || !payload.key) return msg("Nama dan slug wajib diisi.");

    try {
      const res = await fetch(
        id ? `${API_BASE_URL}/api/categories/${id}` : `${API_BASE_URL}/api/categories`,
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Gagal menyimpan kategori.");
      }
      closeForm();
      await loadCategories();
      msg(id ? "Kategori berhasil diperbarui." : "Kategori berhasil ditambahkan.");
    } catch (err) {
      msg(err.message);
    }
  };

  $("#tbody").onclick = e => {
    let b = e.target.closest("[data-a]");
    if (!b) return;
    let x = data.find(a => a.id === Number(b.closest("tr").dataset.id));
    if (b.dataset.a === "view") msg(`${x.name}: ${x.article_count} artikel`);
    if (b.dataset.a === "edit") openForm(x);
    if (b.dataset.a === "delete") {
      deleteId = x.id;
      $("#deleteText").textContent = `Kategori "${x.name}" akan dihapus.`;
      $("#deleteModal").classList.add("show");
    }
  };

  $$("[data-close-delete]").forEach(x => x.onclick = () => $("#deleteModal").classList.remove("show"));

  $("#confirmDelete").onclick = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Gagal menghapus kategori.");
      }
      $("#deleteModal").classList.remove("show");
      await loadCategories();
      msg("Kategori berhasil dihapus.");
    } catch (err) {
      $("#deleteModal").classList.remove("show");
      msg(err.message);
    }
  };

  $("#search").oninput = apply;
  $("#searchBtn").onclick = apply;
  $("#status").onchange = apply;
  $("#sort").onchange = apply;
  $("#reset").onclick = () => { $("#search").value = ""; $("#status").value = ""; $("#sort").value = "az"; apply(); };
  $("#per").onchange = e => { per = Number(e.target.value); page = 1; render(); };
  $("#prev").onclick = () => { if (page > 1) { page--; render(); } };
  $("#next").onclick = () => { if (page < Math.ceil(filtered.length / per)) { page++; render(); } };
  $("#all").onchange = e => { $$(".check").forEach(c => c.checked = e.target.checked); selectState(); };
  $("#tbody").onchange = e => { if (e.target.classList.contains("check")) selectState(); };
  $("#clear").onclick = () => { $$(".check").forEach(c => c.checked = false); selectState(); };

  $("#bulkDelete").onclick = async () => {
    let ids = $$(".check:checked").map(x => Number(x.value));
    if (!ids.length || !confirm(`Hapus ${ids.length} kategori?`)) return;
    try {
      await Promise.all(ids.map(id => fetch(`${API_BASE_URL}/api/categories/${id}`, { method: "DELETE" })));
      await loadCategories();
      msg(`${ids.length} kategori dihapus.`);
    } catch (err) {
      msg("Sebagian kategori gagal dihapus.");
    }
  };

  $("#bulkToggle").onclick = async () => {
    let ids = $$(".check:checked").map(x => Number(x.value));
    if (!ids.length) return;
    try {
      await Promise.all(ids.map(id => {
        const cat = data.find(x => x.id === id);
        const newStatus = cat.status === "Aktif" ? "Nonaktif" : "Aktif";
        return fetch(`${API_BASE_URL}/api/categories/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
      }));
      await loadCategories();
      msg("Status diperbarui.");
    } catch (err) {
      msg("Sebagian status gagal diperbarui.");
    }
  };

  // Sidebar / tema / profil
  function side(o) { $(".app").classList.toggle("side-open", o); $("#sidebar").classList.toggle("open", o); $("#backdrop").classList.toggle("show", o); }
  $("#hamb").onclick = () => side(true);
  $("#closeSide").onclick = () => side(false);
  $("#backdrop").onclick = () => side(false);
  $$(".parent").forEach(b => b.onclick = () => {
    let m = $("#" + b.dataset.menu);
    m.classList.toggle("open");
    b.querySelector("i").textContent = m.classList.contains("open") ? "⌃" : "›";
  });
  $("#profile").onclick = e => { e.stopPropagation(); $("#profileMenu").classList.toggle("show"); };
  document.onclick = () => $("#profileMenu").classList.remove("show");
  $("#profileMenu").onclick = e => e.stopPropagation();
  $("#theme").onclick = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.mabnews_theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  };
  if (localStorage.mabnews_theme === "dark") document.documentElement.classList.add("dark");

  loadCategories();
})();
