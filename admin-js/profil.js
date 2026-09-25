/* =========================================================
   MAB-News CMS — admin-js/profil.js
   ---------------------------------------------------------
   Halaman ini memakai endpoint asli yang sama dengan halaman
   Pengguna: GET/PUT /api/users (backend mabnews-backend,
   database Neon). Tidak ada endpoint terpisah "/api/me".

   Catatan jujur: CMS ini belum punya sistem login/sesi asli
   (siapa pun yang buka /admin dianggap Admin). Supaya halaman
   "Profil Saya" tetap berarti sesuatu yang nyata (bukan data
   contoh), akun yang ditampilkan di sini ditentukan begini:
     1. Kalau browser ini sudah pernah membuka halaman ini,
        id akun yang sama dipakai lagi (disimpan di
        localStorage, mirip preferensi tema gelap/terang).
     2. Kalau belum, otomatis pakai akun ber-role Administrator
        pertama di database (atau akun pertama kalau tidak ada
        Administrator), lalu id-nya disimpan untuk kunjungan
        berikutnya.
   Begitu sistem login sungguhan dipasang, bagian resolveCurrentUser()
   di bawah ini tinggal diganti untuk memakai id dari sesi login.
   ========================================================= */

(() => {
  const $ = (id) => document.getElementById(id);
  const CURRENT_USER_KEY = "mabnews_current_user_id";

  const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const AVATAR_COLORS = [
    "#1769ff", "#7048ed", "#0aa66d", "#e0364b",
    "#f0a91a", "#0891b2", "#c026d3", "#4f46e5"
  ];

  let currentUser = null;

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

  function formatDateTime(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return "—";
    const jam = String(d.getHours()).padStart(2, "0");
    const menit = String(d.getMinutes()).padStart(2, "0");
    return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}  ${jam}:${menit}`;
  }

  async function apiSend(endpoint, method, body) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    let data = {};
    try { data = await res.json(); } catch { /* respons tanpa body */ }
    if (!res.ok) {
      throw new Error(data.error || `Gagal menghubungi server (${res.status})`);
    }
    return data;
  }

  /* ---------------------------------------------------------
     Tentukan akun mana yang dianggap "Saya" (lihat catatan di atas)
     --------------------------------------------------------- */
  async function resolveCurrentUser() {
    const res = await apiFetch("/api/users?limit=100");
    const users = res.data || [];
    if (!users.length) return null;

    const savedId = localStorage.getItem(CURRENT_USER_KEY);
    let user = savedId ? users.find((u) => String(u.id) === String(savedId)) : null;

    if (!user) {
      user = users.find((u) => u.role === "Administrator") || users[0];
      localStorage.setItem(CURRENT_USER_KEY, user.id);
    }
    return user;
  }

  function renderSummary(user) {
    $("profilAvatar").textContent = initials(user.name || user.username);
    $("profilAvatar").style.background = colorFor(user.name || user.username);
    $("profilDisplayName").textContent = user.name || user.username;
    $("profilRoleBadge").textContent = user.role || "-";
    $("profilStatus").textContent = user.status || "-";
    $("profilJoined").textContent = formatDateTime(user.created_at);
    $("profilLastActive").textContent = formatDateTime(user.last_active_at);
  }

  function fillForm(user) {
    $("profilNameInput").value = user.name || "";
    $("profilUsernameInput").value = user.username || "";
    $("profilEmailInput").value = user.email || "";
  }

  async function loadProfile() {
    try {
      currentUser = await resolveCurrentUser();
      $("profilLoading").hidden = true;

      if (!currentUser) {
        $("profilEmpty").hidden = false;
        return;
      }

      renderSummary(currentUser);
      fillForm(currentUser);
      $("profilGrid").hidden = false;
    } catch (err) {
      console.error("Gagal memuat profil:", err);
      $("profilLoading").textContent = "Gagal memuat data profil dari server. Coba muat ulang halaman.";
    }
  }

  /* ---------------------------------------------------------
     Simpan info profil (nama, username, email)
     --------------------------------------------------------- */
  function showError(el, msg) {
    el.textContent = msg;
    el.hidden = false;
  }
  function hideError(el) {
    el.hidden = true;
  }

  async function handleInfoSubmit(e) {
    e.preventDefault();
    const errorEl = $("profilInfoError");
    hideError(errorEl);

    const name = $("profilNameInput").value.trim();
    const username = $("profilUsernameInput").value.trim();
    const email = $("profilEmailInput").value.trim();

    if (!name || !username || !email) {
      showError(errorEl, "Nama, username, dan email wajib diisi");
      return;
    }

    const btn = $("profilInfoSubmit");
    btn.disabled = true;
    btn.textContent = "Menyimpan...";

    try {
      const res = await apiSend(`/api/users/${currentUser.id}`, "PUT", { name, username, email });
      currentUser = res.data;
      renderSummary(currentUser);
      toast("Profil berhasil diperbarui");
    } catch (err) {
      showError(errorEl, err.message || "Gagal menyimpan profil");
    } finally {
      btn.disabled = false;
      btn.textContent = "Simpan Perubahan";
    }
  }

  /* ---------------------------------------------------------
     Ubah password
     --------------------------------------------------------- */
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    const errorEl = $("profilPasswordError");
    hideError(errorEl);

    const p1 = $("profilPassword1").value;
    const p2 = $("profilPassword2").value;

    if (!p1 && !p2) {
      showError(errorEl, "Isi password baru terlebih dahulu");
      return;
    }
    if (p1.length < 6) {
      showError(errorEl, "Password minimal 6 karakter");
      return;
    }
    if (p1 !== p2) {
      showError(errorEl, "Konfirmasi password tidak sama");
      return;
    }

    const btn = $("profilPasswordSubmit");
    btn.disabled = true;
    btn.textContent = "Menyimpan...";

    try {
      const res = await apiSend(`/api/users/${currentUser.id}`, "PUT", { password: p1 });
      currentUser = res.data;
      $("profilPassword1").value = "";
      $("profilPassword2").value = "";
      toast("Password berhasil diubah");
    } catch (err) {
      showError(errorEl, err.message || "Gagal mengubah password");
    } finally {
      btn.disabled = false;
      btn.textContent = "Ubah Password";
    }
  }

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  let toastTimer;
  function toast(text) {
    const t = $("profilToast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("profilInfoForm").addEventListener("submit", handleInfoSubmit);
    $("profilPasswordForm").addEventListener("submit", handlePasswordSubmit);
    loadProfile();
  });
})();
