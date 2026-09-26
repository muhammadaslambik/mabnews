/* =========================================================
   MAB-News CMS — sidebar.js
   Interaksi header + sidebar BERSAMA untuk semua halaman admin.

   Yang ditangani di sini:
   1. Buka/tutup sidebar (mobile)
   2. Dropdown submenu (Artikel, Pengaturan, Lainnya, dst) —
      status buka/tutup & posisi scroll dipertahankan supaya
      tidak "lompat" saat data dari server datang.
   3. Dark mode
   4. Dropdown notifikasi & akun
   5. Sidebar kiri dibangun otomatis dari data sidebar_menu di
      backend, berlaku di SEMUA halaman CMS.
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const body = document.body;
    const menuToggle = document.getElementById("menuToggle");
    const sidebarEl = document.getElementById("sidebar");
    const themeToggle = document.getElementById("themeToggle");
    const notificationBtn = document.querySelector(".notification-btn");
    const headerUser = document.getElementById("headerUser");
    const sidebarNav = sidebarEl ? sidebarEl.querySelector(".sidebar-nav") : null;

    /* =========================================================
       KONFIGURASI API
       Samakan dengan API_BASE_URL di admin-js/atur-sidebar.js
    ========================================================= */
    const API_BASE_URL = "https://mabnews-backend.vercel.app/api";
    const SIDEBAR_MENU_ENDPOINT = `${API_BASE_URL}/sidebar-menu`;
    const NOTIFICATIONS_ENDPOINT = `${API_BASE_URL}/notifications`;
    const USERS_ENDPOINT = `${API_BASE_URL}/users`;
    const MESSAGES_ENDPOINT = `${API_BASE_URL}/messages`;
    const CURRENT_USER_KEY = "mabnews_current_user_id";

    /* menu_key -> file halaman sungguhan di /admin */
    const HREF_MAP = {
        dashboard: "index.html",
        "semua-artikel": "artikel.html",
        "tambah-artikel": "tambah-artikel.html",
        draft: "draft.html",
        kategori: "kategori.html",
        media: "media.html",
        pengguna: "users.html",
        umum: "umum.html",
        website: "website.html",
        tampilan: "tampilan.html",
        seo: "seo.html",
        email: "email.html",
        backup: "backup.html",
        keamanan: "keamanan.html",
        laman: "laman.html",
        statistik: "statistik.html",
        iklan: "iklan.html",
        perangkat: "perangkat.html",
        "domain-hosting": "domain-hosting.html",
        "backend-api": "backend-api.html",
        "atur-sidebar": "atur-sidebar.html",
        "export-impor": "export-import.html"
    };

    /* Menu utama yang punya anak (dirender sebagai grup dropdown) */
    const NESTED_MAIN_GROUPS = ["artikel", "pengaturan"];

    /* Fallback kalau API belum bisa diakses — harus sinkron dengan
       DEFAULT_MENUS di admin-js/atur-sidebar.js & backend */
    const DEFAULT_MENUS = [
        { id: "dashboard", label: "Dashboard", icon: "fa-house", type: "main", parentGroup: null, order: 1, active: true },
        { id: "artikel", label: "Artikel", icon: "fa-file-lines", type: "main", parentGroup: null, order: 2, active: true },
        { id: "semua-artikel", label: "Semua Artikel", icon: "fa-list", type: "child", parentGroup: "artikel", order: 3, active: true },
        { id: "tambah-artikel", label: "Tambah Artikel", icon: "fa-plus", type: "child", parentGroup: "artikel", order: 4, active: true },
        { id: "draft", label: "Draft", icon: "fa-file-pen", type: "child", parentGroup: "artikel", order: 5, active: true },
        { id: "kategori", label: "Kategori", icon: "fa-folder", type: "main", parentGroup: null, order: 6, active: true },
        { id: "media", label: "Media", icon: "fa-image", type: "main", parentGroup: null, order: 7, active: true },
        { id: "pengguna", label: "Pengguna", icon: "fa-users", type: "main", parentGroup: null, order: 8, active: true },
        { id: "pengaturan", label: "Pengaturan", icon: "fa-gear", type: "main", parentGroup: null, order: 9, active: true },
        { id: "umum", label: "Umum", icon: "fa-sliders", type: "child", parentGroup: "pengaturan", order: 10, active: true },
        { id: "website", label: "Website", icon: "fa-globe", type: "child", parentGroup: "pengaturan", order: 11, active: true },
        { id: "tampilan", label: "Tampilan", icon: "fa-palette", type: "child", parentGroup: "pengaturan", order: 12, active: true },
        { id: "seo", label: "SEO", icon: "fa-magnifying-glass", type: "child", parentGroup: "pengaturan", order: 13, active: true },
        { id: "email", label: "Email", icon: "fa-envelope", type: "child", parentGroup: "pengaturan", order: 14, active: true },
        { id: "backup", label: "Backup", icon: "fa-database", type: "child", parentGroup: "pengaturan", order: 15, active: true },
        { id: "keamanan", label: "Keamanan", icon: "fa-shield-halved", type: "child", parentGroup: "pengaturan", order: 16, active: true },
        { id: "laman", label: "Laman", icon: "fa-file-lines", type: "child", parentGroup: "lainnya", order: 17, active: true },
        { id: "statistik", label: "Statistik", icon: "fa-chart-column", type: "child", parentGroup: "lainnya", order: 18, active: true },
        { id: "iklan", label: "Iklan", icon: "fa-bullhorn", type: "child", parentGroup: "lainnya", order: 19, active: true },
        { id: "perangkat", label: "Perangkat", icon: "fa-display", type: "child", parentGroup: "lainnya", order: 20, active: true },
        { id: "domain-hosting", label: "Domain & Hosting", icon: "fa-globe", type: "child", parentGroup: "lainnya", order: 21, active: true },
        { id: "backend-api", label: "BackEnd & API", icon: "fa-code", type: "child", parentGroup: "lainnya", order: 22, active: true },
        { id: "atur-sidebar", label: "Atur Sidebar", icon: "fa-table-cells", type: "child", parentGroup: "lainnya", order: 23, active: true },
        { id: "export-impor", label: "Export & Import", icon: "fa-file-export", type: "child", parentGroup: "lainnya", order: 24, active: true }
    ];

    let currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (currentPage === "") currentPage = "index.html";

    /* Menyimpan grup mana saja yang sudah dibuka manual oleh
       pengguna, supaya tidak ke-reset saat sidebar dibangun ulang
       (misalnya sesudah data dari server datang). */
    const manualOpenGroups = new Set();

    /* Supaya menu yang sedang aktif tidak ketutup/di luar layar
       saat halaman pertama kali dibuka, sidebar akan discroll
       otomatis ke posisi menu itu SEKALI SAJA di render pertama.
       Setelah itu, render berikutnya tidak akan menggeser scroll
       lagi (supaya tidak terasa "lompat" saat berinteraksi). */
    let hasScrolledToActive = false;

    /* ---------------------------------------------------------
       SIDEBAR DINAMIS — dibangun dari data sidebar_menu
    --------------------------------------------------------- */
    if (sidebarNav) {
        buildSidebarNav(DEFAULT_MENUS);

        fetch(SIDEBAR_MENU_ENDPOINT)
            .then((response) => {
                if (!response.ok) throw new Error(`Status ${response.status}`);
                return response.json();
            })
            .then((json) => {
                const rows = json && json.data;
                if (Array.isArray(rows) && rows.length > 0) {
                    buildSidebarNav(normalizeMenus(rows));
                }
            })
            .catch((error) => {
                console.warn("Gagal memuat konfigurasi sidebar dari server, memakai menu default.", error);
            });
    }

    function normalizeMenus(rows) {
        return rows.map((row) => ({
            id: row.id,
            label: row.label,
            icon: row.icon,
            type: row.type === "child" ? "child" : "main",
            parentGroup: row.parentGroup || null,
            order: Number(row.order),
            active: row.active === true || row.active === "true" || row.active === 1
        }));
    }

    function sortByOrder(list) {
        return [...list].sort((a, b) => a.order - b.order);
    }

    function buildSidebarNav(menus) {
        const sorted = sortByOrder(menus);
        const mains = sorted.filter((menu) => menu.type === "main" && menu.active);
        const childrenOf = (groupKey) =>
            sorted.filter((menu) => menu.type === "child" && menu.parentGroup === groupKey && menu.active);

        let html = "";

        mains.forEach((menu) => {
            if (NESTED_MAIN_GROUPS.includes(menu.id)) {
                html += renderGroup(menu.id, menu.label, menu.icon, childrenOf(menu.id));
            } else {
                html += renderMainLink(menu);
            }
        });

        html += renderGroup("lainnya", "Lainnya", "fa-ellipsis", childrenOf("lainnya"));

        /* Simpan & kembalikan posisi scroll supaya tidak lompat
           ke atas saat konten diganti. */
        const previousScrollTop = sidebarNav.scrollTop;
        sidebarNav.innerHTML = html;
        sidebarNav.scrollTop = previousScrollTop;

        if (!hasScrolledToActive) {
            const activeEl = sidebarNav.querySelector(".nav-item.active, .active-sub-item");
            if (activeEl) {
                activeEl.scrollIntoView({ block: "nearest" });
            }
            hasScrolledToActive = true;
        }

        bindNavInteractivity();
    }

    function renderMainLink(menu) {
        const href = HREF_MAP[menu.id] || "#";
        const isActive = href.toLowerCase() === currentPage;
        return `
            <a href="${href}" class="nav-item${isActive ? " active" : ""}">
                <i class="fa-solid ${menu.icon}"></i>
                <span>${menu.label}</span>
            </a>
        `;
    }

    function renderGroup(groupKey, label, icon, children) {
        const childrenHtml = children
            .map((child) => {
                const href = HREF_MAP[child.id] || "#";
                const isActive = href.toLowerCase() === currentPage;
                return `
                    <a href="${href}"${isActive ? ' class="active-sub-item"' : ""}>
                        <i class="fa-solid ${child.icon}"></i>
                        <span>${child.label}</span>
                    </a>
                `;
            })
            .join("");

        const hasActiveChild = children.some((child) => (HREF_MAP[child.id] || "").toLowerCase() === currentPage);
        const isOpen = hasActiveChild || manualOpenGroups.has(groupKey);
        const openClass = isOpen ? " open" : "";
        const arrowIcon = isOpen ? "fa-chevron-up" : "fa-chevron-right";

        return `
            <div class="nav-group${openClass}" data-group="${groupKey}">
                <button type="button" class="nav-item nav-dropdown-toggle">
                    <span class="nav-item-main">
                        <i class="fa-solid ${icon}"></i>
                        <span>${label}</span>
                    </span>
                    <i class="fa-solid ${arrowIcon} nav-arrow"></i>
                </button>
                <div class="nav-submenu">
                    ${childrenHtml || '<span class="nav-submenu-empty">Tidak ada menu aktif</span>'}
                </div>
            </div>
        `;
    }

    function bindNavInteractivity() {
        sidebarNav.querySelectorAll(".nav-item[href], .nav-submenu a").forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 980) {
                    body.classList.remove("sidebar-open");
                }
            });
        });

        sidebarNav.querySelectorAll(".nav-dropdown-toggle").forEach((button) => {
            button.addEventListener("click", (event) => {
                /* Klik grup dropdown TIDAK boleh memicu browser
                   menggeser/scroll ke mana pun. */
                event.preventDefault();

                const group = button.closest(".nav-group");
                if (!group) return;

                group.classList.toggle("open");
                const isOpen = group.classList.contains("open");
                const key = group.dataset.group;
                if (key) {
                    if (isOpen) {
                        manualOpenGroups.add(key);
                    } else {
                        manualOpenGroups.delete(key);
                    }
                }

                const arrow = button.querySelector(".nav-arrow");
                if (arrow) {
                    arrow.classList.toggle("fa-chevron-right");
                    arrow.classList.toggle("fa-chevron-up");
                }

                /* Hilangkan fokus supaya browser tidak berusaha
                   men-scroll tombol ini ke posisi tertentu. */
                button.blur();
            });
        });
    }

    /* ---------------------------------------------------------
       Buka/tutup sidebar (mobile) + overlay gelap + tombol Escape
       Overlay dibuat otomatis lewat JS (atau dipakai ulang kalau
       halamannya kebetulan sudah punya <div id="sidebarOverlay">
       dari markup lama) — jadi tidak perlu ubah HTML per halaman.
    --------------------------------------------------------- */
    let sidebarOverlay = document.getElementById("sidebarOverlay");
    if (!sidebarOverlay && sidebarEl) {
        sidebarOverlay = document.createElement("div");
        sidebarOverlay.id = "sidebarOverlay";
        document.body.appendChild(sidebarOverlay);
    }
    if (sidebarOverlay) {
        sidebarOverlay.classList.add("sidebar-overlay");
        sidebarOverlay.addEventListener("click", () => {
            body.classList.remove("sidebar-open");
        });
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            body.classList.toggle("sidebar-open");
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            body.classList.remove("sidebar-open");
        }
    });

    /* ---------------------------------------------------------
       Dark mode
    --------------------------------------------------------- */
    const savedTheme = localStorage.getItem("mabnews_cms_theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        updateThemeIcon();
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            const isDark = body.classList.contains("dark-mode");
            localStorage.setItem("mabnews_cms_theme", isDark ? "dark" : "light");
            updateThemeIcon();
        });
    }

    function updateThemeIcon() {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector("i");
        if (!icon) return;
        const isDark = body.classList.contains("dark-mode");
        icon.classList.toggle("fa-moon", !isDark);
        icon.classList.toggle("fa-sun", isDark);
    }

    /* ---------------------------------------------------------
       IDENTITAS PENGGUNA SAAT INI
       Belum ada sistem login sungguhan di CMS ini, jadi "siapa
       saya" ditentukan lewat pemilih identitas yang disimpan di
       browser (localStorage). ini BUKAN keamanan sungguhan —
       cuma supaya data pesan/notifikasi bisa diuji dengan benar
       sampai sistem login asli dibuat.
    --------------------------------------------------------- */
    let allUsers = [];
    let currentUser = null;

    async function initCurrentUser() {
        try {
            const response = await fetch(USERS_ENDPOINT);
            if (!response.ok) throw new Error(`Status ${response.status}`);
            const json = await response.json();
            allUsers = Array.isArray(json.data) ? json.data : [];
        } catch (error) {
            console.warn("Gagal memuat daftar pengguna:", error);
            allUsers = [];
        }

        if (allUsers.length === 0) return;

        const savedId = parseInt(localStorage.getItem(CURRENT_USER_KEY), 10);
        currentUser = allUsers.find((user) => user.id === savedId) || allUsers[0];
        localStorage.setItem(CURRENT_USER_KEY, String(currentUser.id));

        applyCurrentUserToUi();
    }

    function applyCurrentUserToUi() {
        if (!currentUser) return;

        document.querySelectorAll(".sidebar-profile-info strong").forEach((el) => {
            el.textContent = currentUser.display_name;
        });
        document.querySelectorAll(".header-user-name").forEach((el) => {
            el.textContent = currentUser.display_name.split(" ")[0];
        });
    }

    function switchCurrentUser(userId) {
        const user = allUsers.find((item) => item.id === Number(userId));
        if (!user) return;
        currentUser = user;
        localStorage.setItem(CURRENT_USER_KEY, String(user.id));
        applyCurrentUserToUi();
        loadNotifications();
        loadMessagePreview();
    }

    /* ---------------------------------------------------------
       WAKTU RELATIF ("5 menit lalu", dst)
    --------------------------------------------------------- */
    function timeAgo(iso) {
        if (!iso) return "";
        const diffMs = Date.now() - new Date(iso).getTime();
        const minute = 60000;
        const hour = 60 * minute;
        const day = 24 * hour;

        if (diffMs < minute) return "Baru saja";
        if (diffMs < hour) return `${Math.floor(diffMs / minute)} menit lalu`;
        if (diffMs < day) return `${Math.floor(diffMs / hour)} jam lalu`;
        if (diffMs < 7 * day) return `${Math.floor(diffMs / day)} hari lalu`;
        return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    }

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text == null ? "" : String(text);
        return div.innerHTML;
    }

    /* ---------------------------------------------------------
       DROPDOWN NOTIFIKASI — data ASLI dari database
    --------------------------------------------------------- */
    let notificationPanel = null;

    if (notificationBtn) {
        notificationPanel = document.createElement("div");
        notificationPanel.className = "header-dropdown notification-dropdown";
        notificationPanel.innerHTML = `<div class="header-dropdown-title">Notifikasi</div><div class="header-dropdown-empty">Memuat...</div>`;
        notificationBtn.appendChild(notificationPanel);

        notificationBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            closeAllHeaderDropdowns(notificationPanel);
            notificationPanel.classList.toggle("open");
        });
    }

    async function loadNotifications() {
        if (!notificationBtn || !notificationPanel) return;

        try {
            const response = await fetch(NOTIFICATIONS_ENDPOINT);
            if (!response.ok) throw new Error(`Status ${response.status}`);
            const json = await response.json();
            const items = Array.isArray(json.data) ? json.data : [];

            renderNotifications(items);
        } catch (error) {
            console.warn("Gagal memuat notifikasi:", error);
            notificationPanel.innerHTML = `
                <div class="header-dropdown-title">Notifikasi</div>
                <div class="header-dropdown-empty">Tidak bisa memuat notifikasi.</div>
            `;
        }
    }

    function renderNotifications(items) {
        const unreadCount = items.filter((item) => !item.is_read).length;
        const badge = notificationBtn.querySelector(".notification-count");
        if (badge) {
            badge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
            badge.style.display = unreadCount > 0 ? "flex" : "none";
        }

        if (items.length === 0) {
            notificationPanel.innerHTML = `
                <div class="header-dropdown-title">Notifikasi</div>
                <div class="header-dropdown-empty">Belum ada notifikasi.</div>
            `;
            return;
        }

        const iconByType = {
            article: "fa-file-lines",
            message: "fa-comment",
            system: "fa-circle-info"
        };

        const itemsHtml = items
            .slice(0, 8)
            .map((item) => {
                const icon = iconByType[item.type] || "fa-circle-info";
                return `
                    <button type="button" class="header-dropdown-item notif-item${item.is_read ? "" : " unread"}"
                        data-id="${item.id}" data-link="${item.link ? escapeHtml(item.link) : ""}">
                        <i class="fa-solid ${icon}"></i>
                        <div>
                            <strong>${escapeHtml(item.title)}</strong>
                            ${item.message ? `<span>${escapeHtml(item.message)}</span>` : ""}
                            <span class="notif-time">${timeAgo(item.created_at)}</span>
                        </div>
                    </button>
                `;
            })
            .join("");

        notificationPanel.innerHTML = `
            <div class="header-dropdown-title">
                Notifikasi
                <button type="button" class="mark-all-read" id="markAllReadBtn">Tandai semua dibaca</button>
            </div>
            ${itemsHtml}
        `;

        notificationPanel.querySelectorAll(".notif-item").forEach((el) => {
            el.addEventListener("click", async () => {
                const id = el.dataset.id;
                const link = el.dataset.link;
                try {
                    await fetch(`${NOTIFICATIONS_ENDPOINT}/${id}/read`, { method: "PUT" });
                } catch (error) {
                    console.warn("Gagal menandai notifikasi:", error);
                }
                if (link) {
                    window.location.href = link;
                } else {
                    loadNotifications();
                }
            });
        });

        const markAllBtn = notificationPanel.querySelector("#markAllReadBtn");
        if (markAllBtn) {
            markAllBtn.addEventListener("click", async (event) => {
                event.stopPropagation();
                try {
                    await fetch(`${NOTIFICATIONS_ENDPOINT}/read-all`, { method: "POST" });
                } catch (error) {
                    console.warn("Gagal menandai semua notifikasi:", error);
                }
                loadNotifications();
            });
        }
    }

    /* ---------------------------------------------------------
       TOMBOL PESAN — dibuat otomatis lewat JS di sebelah tombol
       notifikasi & mode gelap/terang, tidak perlu ubah HTML di
       halaman manapun.
    --------------------------------------------------------- */
    let messageBtn = document.getElementById("messageBtn");
    let messagePanel = null;

    if (!messageBtn && notificationBtn && notificationBtn.parentElement) {
        messageBtn = document.createElement("button");
        messageBtn.type = "button";
        messageBtn.id = "messageBtn";
        messageBtn.className = "header-icon-btn message-btn";
        messageBtn.setAttribute("aria-label", "Pesan");
        messageBtn.innerHTML = `
            <i class="fa-regular fa-comment-dots"></i>
            <span class="notification-count" style="display:none;">0</span>
        `;
        notificationBtn.parentElement.insertBefore(messageBtn, notificationBtn);
    }

    if (messageBtn) {
        messagePanel = document.createElement("div");
        messagePanel.className = "header-dropdown message-dropdown";
        messagePanel.innerHTML = `<div class="header-dropdown-title">Pesan</div><div class="header-dropdown-empty">Memuat...</div>`;
        messageBtn.appendChild(messagePanel);

        messageBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            closeAllHeaderDropdowns(messagePanel);
            messagePanel.classList.toggle("open");
        });
    }

    async function loadMessagePreview() {
        if (!messageBtn || !messagePanel || !currentUser) return;

        try {
            const [convResponse, unreadResponse] = await Promise.all([
                fetch(`${MESSAGES_ENDPOINT}/conversations?user_id=${currentUser.id}`),
                fetch(`${MESSAGES_ENDPOINT}/unread-count?user_id=${currentUser.id}`)
            ]);

            const convJson = convResponse.ok ? await convResponse.json() : { data: [] };
            const unreadJson = unreadResponse.ok ? await unreadResponse.json() : { data: { count: 0 } };

            const conversations = Array.isArray(convJson.data) ? convJson.data : [];
            const unreadTotal = (unreadJson.data && unreadJson.data.count) || 0;

            const badge = messageBtn.querySelector(".notification-count");
            if (badge) {
                badge.textContent = unreadTotal > 9 ? "9+" : String(unreadTotal);
                badge.style.display = unreadTotal > 0 ? "flex" : "none";
            }

            renderMessagePreview(conversations);
        } catch (error) {
            console.warn("Gagal memuat pesan:", error);
            messagePanel.innerHTML = `
                <div class="header-dropdown-title">Pesan</div>
                <div class="header-dropdown-empty">Tidak bisa memuat pesan.</div>
            `;
        }
    }

    function renderMessagePreview(conversations) {
        if (conversations.length === 0) {
            messagePanel.innerHTML = `
                <div class="header-dropdown-title">Pesan</div>
                <div class="header-dropdown-empty">Belum ada percakapan.</div>
                <a href="pesan.html" class="header-dropdown-footer-link">
                    <i class="fa-solid fa-pen-to-square"></i> Mulai pesan baru
                </a>
            `;
            return;
        }

        const itemsHtml = conversations
            .slice(0, 6)
            .map((conv) => {
                const isFromMe = currentUser && conv.last_sender_id === currentUser.id;
                const prefix = isFromMe ? "Anda: " : "";
                return `
                    <a href="pesan.html?with=${conv.user_id}" class="header-dropdown-item${conv.unread_count > 0 ? " unread" : ""}">
                        <i class="fa-solid fa-circle-user"></i>
                        <div>
                            <strong>${escapeHtml(conv.name)}</strong>
                            <span>${escapeHtml(prefix + (conv.last_body || ""))}</span>
                            <span class="notif-time">${timeAgo(conv.last_created_at)}</span>
                        </div>
                    </a>
                `;
            })
            .join("");

        messagePanel.innerHTML = `
            <div class="header-dropdown-title">Pesan</div>
            ${itemsHtml}
            <a href="pesan.html" class="header-dropdown-footer-link">
                <i class="fa-solid fa-inbox"></i> Buka Semua Pesan
            </a>
        `;
    }

    /* ---------------------------------------------------------
       Dropdown akun (+ pemilih identitas sementara)
    --------------------------------------------------------- */
    if (headerUser) {
        const panel = document.createElement("div");
        panel.className = "header-dropdown account-dropdown";
        panel.innerHTML = `
            <div class="header-dropdown-title">Login sebagai</div>
            <div class="user-switcher">
                <select id="userSwitcherSelect"></select>
            </div>
            <div class="header-dropdown-divider"></div>
            <a href="#" class="header-dropdown-item simple"><i class="fa-solid fa-user"></i> Profil Saya</a>
            <a href="#" class="header-dropdown-item simple"><i class="fa-solid fa-gear"></i> Pengaturan Akun</a>
            <div class="header-dropdown-divider"></div>
            <a href="#" class="header-dropdown-item simple logout"><i class="fa-solid fa-right-from-bracket"></i> Keluar</a>
        `;
        headerUser.appendChild(panel);

        headerUser.addEventListener("click", (event) => {
            event.stopPropagation();
            closeAllHeaderDropdowns(panel);
            panel.classList.toggle("open");

            const select = panel.querySelector("#userSwitcherSelect");
            if (select && select.options.length === 0 && allUsers.length > 0) {
                select.innerHTML = allUsers
                    .map((user) => `<option value="${user.id}">${escapeHtml(user.display_name)}</option>`)
                    .join("");
                if (currentUser) select.value = String(currentUser.id);

                select.addEventListener("click", (e) => e.stopPropagation());
                select.addEventListener("change", () => {
                    switchCurrentUser(select.value);
                });
            }
        });
    }

    function closeAllHeaderDropdowns(except) {
        document.querySelectorAll(".header-dropdown.open").forEach((el) => {
            if (el !== except) el.classList.remove("open");
        });
    }

    document.addEventListener("click", () => closeAllHeaderDropdowns());

    /* ---------------------------------------------------------
       INISIALISASI: identitas pengguna -> notifikasi & pesan
    --------------------------------------------------------- */
    initCurrentUser().then(() => {
        loadNotifications();
        loadMessagePreview();
    });
});
