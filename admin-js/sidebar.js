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

    /* menu_key -> file halaman sungguhan di /admin */
    const HREF_MAP = {
        dashboard: "index.html",
        "semua-artikel": "artikel.html",
        "tambah-artikel": "tambah-artikel.html",
        draft: "draft.html",
        kategori: "kategori.html",
        media: "media.html",
        pengguna: "pengguna.html",
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
       Dropdown notifikasi
    --------------------------------------------------------- */
    if (notificationBtn) {
        const panel = document.createElement("div");
        panel.className = "header-dropdown notification-dropdown";
        panel.innerHTML = `
            <div class="header-dropdown-title">Notifikasi</div>
            <a href="#" class="header-dropdown-item">
                <i class="fa-solid fa-file-lines"></i>
                <div><strong>Artikel baru dipublikasikan</strong><span>5 menit lalu</span></div>
            </a>
            <a href="#" class="header-dropdown-item">
                <i class="fa-solid fa-comment"></i>
                <div><strong>Komentar baru masuk</strong><span>1 jam lalu</span></div>
            </a>
            <a href="#" class="header-dropdown-item">
                <i class="fa-solid fa-folder"></i>
                <div><strong>Kategori diperbarui</strong><span>Kemarin</span></div>
            </a>
        `;
        notificationBtn.appendChild(panel);

        notificationBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            closeAllHeaderDropdowns(panel);
            panel.classList.toggle("open");
        });
    }

    /* ---------------------------------------------------------
       Dropdown akun
    --------------------------------------------------------- */
    if (headerUser) {
        const panel = document.createElement("div");
        panel.className = "header-dropdown account-dropdown";
        panel.innerHTML = `
            <a href="profil.html" class="header-dropdown-item simple"><i class="fa-solid fa-user"></i> Profil Saya</a>
            <a href="#" class="header-dropdown-item simple"><i class="fa-solid fa-gear"></i> Pengaturan Akun</a>
            <div class="header-dropdown-divider"></div>
            <a href="#" class="header-dropdown-item simple logout"><i class="fa-solid fa-right-from-bracket"></i> Keluar</a>
        `;
        headerUser.appendChild(panel);

        headerUser.addEventListener("click", (event) => {
            event.stopPropagation();
            closeAllHeaderDropdowns(panel);
            panel.classList.toggle("open");
        });
    }

    function closeAllHeaderDropdowns(except) {
        document.querySelectorAll(".header-dropdown.open").forEach((el) => {
            if (el !== except) el.classList.remove("open");
        });
    }

    document.addEventListener("click", () => closeAllHeaderDropdowns());
});
