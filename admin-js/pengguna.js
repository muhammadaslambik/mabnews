/* =========================================================
   MAB-News CMS — admin-js/pengguna.js
   ---------------------------------------------------------
   Halaman ini terhubung langsung ke backend asli:
     GET    /api/users   -> daftar pengguna (paging, cari, filter)
     POST   /api/users   -> tambah pengguna
     PUT    /api/users/:id -> ubah pengguna
     DELETE /api/users/:id -> hapus pengguna
   Backend (mabnews-backend, di Vercel) yang menyimpan data ini
   ke tabel admin_users di database Neon. API_BASE_URL sudah
   dikonfigurasi di js/api.js.

   Catatan: "Terakhir Aktif" saat ini mencatat kapan akun
   dibuat/terakhir diubah — otomatis mengikuti waktu login
   sungguhan begitu sistem login CMS sudah terhubung ke tabel
   ini (kolom last_active_at sudah disiapkan di database).
   ========================================================= */

(() => {
  const $ = (id) => document.getElementById(id);
  const PAGE_SIZE = 10;

  const state = {
    role: "all",
    status: "all",
    q: "",
    page: 1,
    total: 0,
    editingId: null
  };

  const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const AVATAR_COLORS = [
    "#1769ff", "#7048ed", "#0aa66d", "#e0364b",
    "#f0a91a", "#0891b2", "#c026d3", "#4f46e5"
  ];

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function initials(name) {
    const parts = String(name || "?").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "?";
    const first = parts[0][0] || "";
    const second = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + second).toUpperCase();
  }

  function colorFor(name) {
    let hash = 0;
    const str = String(name || "");
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
  }

  function roleClass(role) {
    return "pengguna-badge-" + String(role || "").toLowerCase().replace(/\s+/g, "-");
  }

  function statusClass(status) {
    return "pengguna-status-" + String(status || "").toLowerCase().replace(/\s+/g, "-");
  }

  function formatDateTime(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return "—";
    const jam = String(d.getHours()).padStart(2, "0");
    const menit = String(d.getMinutes()).padStart(2, "0");
    return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}  ${jam}:${menit}`;
  }

  /* ---------------------------------------------------------
     Kirim request ke backend dan tangkap pesan error asli
     (bukan cuma "API Error 4xx" generik dari apiFetch).
     --------------------------------------------------------- */
  async function apiSend(endpoint, method, body) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    let data = {};
    try { data = await res.json(); } catch { /* respons tanpa body (mis. 204) */ }
    if (!res.ok) {
      throw new Error(data.error || `Gagal menghubungi server (${res.status})`);
    }
    return data;
  }

  /* ---------------------------------------------------------
     Muat & render daftar pengguna
     --------------------------------------------------------- */
  async function loadUsers() {
    const tbody = $("userTbody");
    tbody.innerHTML = `<tr class="pengguna-loading-row"><td colspan="7">Memuat data pengguna dari server...</td></tr>`;
    $("userEmpty").hidden = true;

    const params = new URLSearchParams({
      page: state.page,
      limit: PAGE_SIZE
    });
    if (state.role !== "all") params.set("role", state.role);
    if (state.status !== "all") params.set("status", state.status);
    if (state.q.trim()) params.set("q", state.q.trim());

    try {
      const res = await apiFetch(`/api/users?${params.toString()}`);
      state.total = res.total || 0;
      renderRows(res.data || []);
      renderInfoAndPager();
    } catch (err) {
      console.error("Gagal memuat pengguna:", err);
      tbody.innerHTML = `<tr class="pengguna-loading-row"><td colspan="7">Gagal memuat data dari server. Coba muat ulang halaman.</td></tr>`;
      $("userInfo").textContent = "Gagal memuat data pengguna";
    }
  }

  function renderRows(users) {
    const tbody = $("userTbody");
    if (!users.length) {
      tbody.innerHTML = "";
      $("userEmpty").hidden = false;
      return;
    }
    $("userEmpty").hidden = true;

    const start = (state.page - 1) * PAGE_SIZE;
    tbody.innerHTML = users.map((u, i) => `
      <tr data-id="${u.id}">
        <td class="pengguna-col-num">${start + i + 1}</td>
        <td>
          <div class="pengguna-user-cell">
            <span class="pengguna-avatar" style="${u.avatar_url ? "" : `background:${colorFor(u.name || u.username)}`}">${u.avatar_url ? `<img src="${escapeHtml(u.avatar_url)}" alt="">` : escapeHtml(initials(u.name || u.username))}</span>
            <div class="pengguna-user-text">
              <strong>${escapeHtml(u.name || u.username)}</strong>
              <span>${escapeHtml(u.role || "-")}</span>
            </div>
          </div>
        </td>
        <td>${escapeHtml(u.email || "-")}</td>
        <td><span class="pengguna-badge ${roleClass(u.role)}">${escapeHtml(u.role || "-")}</span></td>
        <td><span class="pengguna-status ${statusClass(u.status)}">${escapeHtml(u.status || "-")}</span></td>
        <td class="pengguna-meta-time">${formatDateTime(u.last_active_at)}</td>
        <td>
          <div class="pengguna-actions">
            <button type="button" class="pengguna-action-btn pengguna-action-edit" data-edit="${u.id}" aria-label="Edit pengguna"><i class="fa-regular fa-pen-to-square"></i></button>
            <button type="button" class="pengguna-action-btn pengguna-action-delete" data-delete="${u.id}" aria-label="Hapus pengguna"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      </tr>
    `).join("");

    tbody.dataset.cache = JSON.stringify(users);
  }

  function renderInfoAndPager() {
    const total = state.total;
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (state.page > pages) state.page = pages;

    const start = total ? (state.page - 1) * PAGE_SIZE + 1 : 0;
    const end = Math.min(state.page * PAGE_SIZE, total);
    $("userInfo").textContent = `Menampilkan ${start} - ${end} dari ${total} pengguna`;

    let html = `<button ${state.page === 1 ? "disabled" : ""} data-page="${state.page - 1}">‹</button>`;
    const maxShown = 5;
    let from = Math.max(1, state.page - 2);
    let to = Math.min(pages, from + maxShown - 1);
    from = Math.max(1, to - maxShown + 1);
    for (let i = from; i <= to; i++) {
      html += `<button class="${i === state.page ? "active" : ""}" data-page="${i}">${i}</button>`;
    }
    html += `<button ${state.page === pages ? "disabled" : ""} data-page="${state.page + 1}">›</button>`;
    $("userPager").innerHTML = html;
  }

  function getCachedUser(id) {
    try {
      const cache = JSON.parse($("userTbody").dataset.cache || "[]");
      return cache.find((u) => String(u.id) === String(id));
    } catch {
      return null;
    }
  }

  /* ---------------------------------------------------------
     Modal tambah/edit
     --------------------------------------------------------- */
  function openModalForCreate() {
    state.editingId = null;
    $("userModalTitle").textContent = "Tambah Pengguna";
    $("userForm").reset();
    $("userId").value = "";
    $("userRole").value = "Penulis";
    $("userStatus").value = "Aktif";
    $("userUsername").disabled = false;
    $("userPasswordLabel").textContent = "Password";
    $("userPassword").required = true;
    $("userPassword").placeholder = "Minimal 6 karakter";
    $("userPasswordHint").hidden = true;
    hideFormError();
    $("userModalOverlay").classList.add("show");
  }

  function openModalForEdit(id) {
    const u = getCachedUser(id);
    if (!u) return;
    state.editingId = id;
    $("userModalTitle").textContent = "Edit Pengguna";
    $("userId").value = u.id;
    $("userName").value = u.name || "";
    $("userUsername").value = u.username || "";
    $("userEmail").value = u.email || "";
    $("userRole").value = u.role || "Penulis";
    $("userStatus").value = u.status || "Aktif";
    $("userPassword").value = "";
    $("userPassword").required = false;
    $("userPasswordLabel").textContent = "Password Baru";
    $("userPassword").placeholder = "Kosongkan jika tidak diubah";
    $("userPasswordHint").hidden = false;
    hideFormError();
    $("userModalOverlay").classList.add("show");
  }

  function closeModal() {
    $("userModalOverlay").classList.remove("show");
  }

  function showFormError(msg) {
    const el = $("userFormError");
    el.textContent = msg;
    el.hidden = false;
  }

  function hideFormError() {
    $("userFormError").hidden = true;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    hideFormError();

    const name = $("userName").value.trim();
    const username = $("userUsername").value.trim();
    const email = $("userEmail").value.trim();
    const role = $("userRole").value;
    const status = $("userStatus").value;
    const password = $("userPassword").value;

    if (!name || !username || !email) {
      showFormError("Nama, username, dan email wajib diisi");
      return;
    }
    if (!state.editingId && !password) {
      showFormError("Password wajib diisi untuk pengguna baru");
      return;
    }
    if (password && password.length < 6) {
      showFormError("Password minimal 6 karakter");
      return;
    }

    const payload = { name, username, email, role, status };
    if (password) payload.password = password;

    const submitBtn = $("userModalSubmit");
    submitBtn.disabled = true;
    submitBtn.textContent = "Menyimpan...";

    try {
      if (state.editingId) {
        await apiSend(`/api/users/${state.editingId}`, "PUT", payload);
        toast("Pengguna berhasil diperbarui");
      } else {
        await apiSend("/api/users", "POST", payload);
        toast("Pengguna baru berhasil ditambahkan");
      }
      closeModal();
      loadUsers();
    } catch (err) {
      showFormError(err.message || "Gagal menyimpan data pengguna");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Simpan";
    }
  }

  async function handleDelete(id) {
    const u = getCachedUser(id);
    const label = u ? (u.name || u.username) : "pengguna ini";
    if (!confirm(`Hapus akun "${label}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await apiSend(`/api/users/${id}`, "DELETE");
      toast("Pengguna berhasil dihapus");
      loadUsers();
    } catch (err) {
      toast(err.message || "Gagal menghapus pengguna");
    }
  }

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  let toastTimer;
  function toast(text) {
    const t = $("userToast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------------------------------------------------------
     Event wiring
     --------------------------------------------------------- */
  function wireEvents() {
    $("userRoleFilter").addEventListener("change", (e) => {
      state.role = e.target.value;
      state.page = 1;
      loadUsers();
    });
    $("userStatusFilter").addEventListener("change", (e) => {
      state.status = e.target.value;
      state.page = 1;
      loadUsers();
    });

    let searchTimer;
    $("userSearch").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      const val = e.target.value;
      searchTimer = setTimeout(() => {
        state.q = val;
        state.page = 1;
        loadUsers();
      }, 350);
    });

    $("userPager").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-page]");
      if (!btn || btn.disabled) return;
      state.page = parseInt(btn.dataset.page, 10);
      loadUsers();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    $("userTbody").addEventListener("click", (e) => {
      const editBtn = e.target.closest("[data-edit]");
      if (editBtn) { openModalForEdit(editBtn.dataset.edit); return; }
      const delBtn = e.target.closest("[data-delete]");
      if (delBtn) { handleDelete(delBtn.dataset.delete); }
    });

    $("btnAddUser").addEventListener("click", openModalForCreate);
    $("userModalClose").addEventListener("click", closeModal);
    $("userModalOverlay").addEventListener("click", (e) => {
      if (e.target === $("userModalOverlay")) closeModal();
    });
    $("userForm").addEventListener("submit", handleFormSubmit);
  }

  document.addEventListener("DOMContentLoaded", () => {
    wireEvents();
    loadUsers();
  });
})();
