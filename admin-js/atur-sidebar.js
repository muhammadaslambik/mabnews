document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       KONFIGURASI API
       Ganti URL di bawah ini dengan alamat backend mabnews-backend
       kamu yang sudah di-deploy (contoh: Vercel).
    ========================================================= */
    const API_BASE_URL = "https://mabnews-backend.vercel.app/api";
    const SIDEBAR_MENU_ENDPOINT = `${API_BASE_URL}/sidebar-menu`;

    /* =========================================================
       DATA DEFAULT (fallback)
       type: "main" -> tampil langsung di level utama sidebar
             "child" -> anak dari salah satu grup (lihat parentGroup)
       parentGroup: null | "artikel" | "pengaturan" | "lainnya"
    ========================================================= */
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
        { id: "export-import", label: "Export & Impor", icon: "fa-file-export", type: "child", parentGroup: "lainnya", order: 24, active: true }
    ];

    const NESTED_MAIN_GROUPS = ["artikel", "pengaturan"];

    const tableBody = document.getElementById("menuTableBody");
    const previewMenu = document.getElementById("previewMenu");
    const totalMenuCount = document.getElementById("totalMenuCount");
    const resetButton = document.getElementById("resetButton");
    const saveButton = document.getElementById("saveButton");

    let menus = DEFAULT_MENUS.map((menu) => ({ ...menu }));
    let isLoading = true;
    let isSaving = false;
    let draggedId = null;

    init();

    async function init() {
        setTableLoading(true);
        try {
            const data = await fetchSidebarMenu();
            if (Array.isArray(data) && data.length > 0) {
                menus = normalizeMenus(data);
            }
        } catch (error) {
            console.warn("Gagal memuat pengaturan sidebar dari server, memakai data default.", error);
            showToast("Tidak bisa terhubung ke server, menampilkan data default.");
        } finally {
            isLoading = false;
            setTableLoading(false);
            render();
        }
    }

    /* =========================================================
       NORMALISASI DATA DARI API
    ========================================================= */
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

    /* =========================================================
       PANGGILAN API
    ========================================================= */
    async function fetchSidebarMenu() {
        const response = await fetch(SIDEBAR_MENU_ENDPOINT, { method: "GET" });
        if (!response.ok) throw new Error(`GET sidebar-menu gagal (status ${response.status})`);
        const json = await response.json();
        return json.data;
    }

    async function persistSidebarMenu() {
        const response = await fetch(SIDEBAR_MENU_ENDPOINT, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ menus })
        });
        if (!response.ok) {
            const json = await response.json().catch(() => ({}));
            throw new Error(json.error || `PUT sidebar-menu gagal (status ${response.status})`);
        }
        const json = await response.json();
        return json.data;
    }

    async function resetSidebarMenuOnServer() {
        const response = await fetch(`${SIDEBAR_MENU_ENDPOINT}/reset`, { method: "POST" });
        if (!response.ok) {
            const json = await response.json().catch(() => ({}));
            throw new Error(json.error || `POST sidebar-menu/reset gagal (status ${response.status})`);
        }
        const json = await response.json();
        return json.data;
    }

    /* =========================================================
       RENDER
    ========================================================= */
    function sortedMenus() {
        return [...menus].sort((a, b) => a.order - b.order);
    }

    function getLevelKey(menu) {
        return menu.type === "main" ? "main" : `child:${menu.parentGroup}`;
    }

    function render() {
        renderTable();
        renderPreview();
        totalMenuCount.textContent = menus.length;
    }

    function setTableLoading(loading) {
        if (loading) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; padding:24px; color:#64748b;">
                        Memuat pengaturan sidebar...
                    </td>
                </tr>
            `;
        }
    }

    function renderTable() {
        tableBody.innerHTML = "";

        sortedMenus().forEach((menu) => {
            const row = document.createElement("tr");
            row.dataset.id = menu.id;
            row.className = menu.active ? "" : "is-inactive";

            row.innerHTML = `
                <td>
                    <label class="switch">
                        <input type="checkbox" data-toggle="${menu.id}" ${menu.active ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td class="menu-name-label">${menu.label}</td>
                <td class="menu-icon-col"><i class="fa-solid ${menu.icon}"></i></td>
                <td>
                    <div class="urutan-field">
                        <input type="number" class="urutan-input" data-order="${menu.id}"
                            value="${menu.order}" min="1" max="${menus.length}">
                        <div class="urutan-buttons">
                            <button type="button" class="urutan-btn" data-move="up" data-id="${menu.id}" title="Naikkan urutan">
                                <i class="fa-solid fa-chevron-up"></i>
                            </button>
                            <button type="button" class="urutan-btn" data-move="down" data-id="${menu.id}" title="Turunkan urutan">
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td class="col-aksi">
                    <div class="aksi-dropdown">
                        <button type="button" class="aksi-toggle" data-aksi-toggle="${menu.id}" aria-label="Aksi menu">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div class="aksi-menu" data-aksi-menu="${menu.id}">
                            <button type="button" data-action="top" data-id="${menu.id}">
                                <i class="fa-solid fa-angles-up"></i> Pindahkan ke atas
                            </button>
                            <button type="button" data-action="bottom" data-id="${menu.id}">
                                <i class="fa-solid fa-angles-down"></i> Pindahkan ke bawah
                            </button>
                            <button type="button" data-action="reset" data-id="${menu.id}">
                                <i class="fa-solid fa-rotate-left"></i> Reset item ini
                            </button>
                        </div>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

        updateOrderButtonState();
        bindTableEvents();
    }

    function updateOrderButtonState() {
        const sorted = sortedMenus();
        sorted.forEach((menu, index) => {
            const row = tableBody.querySelector(`tr[data-id="${menu.id}"]`);
            if (!row) return;
            const upBtn = row.querySelector('[data-move="up"]');
            const downBtn = row.querySelector('[data-move="down"]');
            if (upBtn) upBtn.disabled = index === 0;
            if (downBtn) downBtn.disabled = index === sorted.length - 1;
        });
    }

    /* =========================================================
       PREVIEW SIDEBAR
       - Grup anak (Artikel, Pengaturan, Lainnya) dirender bersarang
         tepat di bawah menu utama induknya.
       - Setiap item bisa di-drag untuk mengubah urutan. Drag hanya
         berlaku SESAMA level yang sama (sesama menu utama, atau
         sesama anak dalam grup yang sama) supaya strukturnya tetap
         masuk akal.
    ========================================================= */
    function renderPreview() {
        previewMenu.innerHTML = "";

        const sorted = sortedMenus();
        const mains = sorted.filter((menu) => menu.type === "main");
        const childrenByGroup = (groupKey) =>
            sorted.filter((menu) => menu.type === "child" && menu.parentGroup === groupKey);

        mains.forEach((menu) => {
            if (!menu.active) return;

            if (NESTED_MAIN_GROUPS.includes(menu.id)) {
                appendPreviewItem(menu, { hasArrow: true });
                appendChildGroup(childrenByGroup(menu.id));
                return;
            }

            appendPreviewItem(menu, { isActive: menu.id === "dashboard" });
        });

        appendPreviewItem({ id: null, label: "Lainnya", icon: "fa-ellipsis" }, { hasArrow: true, draggable: false });
        appendChildGroup(childrenByGroup("lainnya"));
    }

    function appendPreviewItem(menu, options) {
        const opts = options || {};
        const item = document.createElement("div");
        item.className = "preview-item" + (opts.isActive ? " is-active" : "") + (opts.hasArrow ? " has-arrow" : "");

        item.innerHTML = `
            <i class="fa-solid ${menu.icon}"></i>
            <span>${menu.label}</span>
            ${opts.hasArrow ? '<i class="fa-solid fa-chevron-up arrow"></i>' : ""}
        `;

        if (menu.id && opts.draggable !== false) {
            makeDraggable(item, menu.id);
        }

        previewMenu.appendChild(item);
    }

    function appendChildGroup(children) {
        const activeChildren = children.filter((menu) => menu.active);
        const group = document.createElement("div");
        group.className = "preview-submenu-group";

        if (activeChildren.length === 0) {
            group.innerHTML = `<div class="preview-empty">Belum ada menu aktif</div>`;
        } else {
            activeChildren.forEach((menu) => {
                const sub = document.createElement("div");
                sub.className = "preview-submenu-item" + (menu.id === "atur-sidebar" ? " is-active" : "");
                sub.innerHTML = `<span class="dot"></span><span>${menu.label}</span>`;
                makeDraggable(sub, menu.id);
                group.appendChild(sub);
            });
        }

        previewMenu.appendChild(group);
    }

    /* =========================================================
       DRAG & DROP DI PREVIEW SIDEBAR
    ========================================================= */
    function makeDraggable(element, menuId) {
        element.draggable = true;
        element.dataset.id = menuId;

        element.addEventListener("dragstart", (event) => {
            draggedId = menuId;
            element.classList.add("dragging");
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", menuId);
        });

        element.addEventListener("dragend", () => {
            draggedId = null;
            element.classList.remove("dragging");
            previewMenu.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
        });

        element.addEventListener("dragover", (event) => {
            if (!draggedId || draggedId === menuId) return;
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            element.classList.add("drag-over");
        });

        element.addEventListener("dragleave", () => {
            element.classList.remove("drag-over");
        });

        element.addEventListener("drop", (event) => {
            event.preventDefault();
            element.classList.remove("drag-over");

            const sourceId = event.dataTransfer.getData("text/plain") || draggedId;
            if (!sourceId || sourceId === menuId) return;

            const rect = element.getBoundingClientRect();
            const dropAfter = event.clientY - rect.top > rect.height / 2;

            reorderByDrag(sourceId, menuId, dropAfter);
        });
    }

    function reorderByDrag(sourceId, targetId, insertAfter) {
        const draggedMenu = menus.find((item) => item.id === sourceId);
        const targetMenu = menus.find((item) => item.id === targetId);
        if (!draggedMenu || !targetMenu) return;

        if (getLevelKey(draggedMenu) !== getLevelKey(targetMenu)) {
            showToast("Menu cuma bisa dipindah di dalam grup yang sama.");
            return;
        }

        const sorted = sortedMenus();
        const withoutDragged = sorted.filter((item) => item.id !== sourceId);
        const targetIndex = withoutDragged.findIndex((item) => item.id === targetId);
        if (targetIndex === -1) return;

        const insertIndex = insertAfter ? targetIndex + 1 : targetIndex;
        withoutDragged.splice(insertIndex, 0, draggedMenu);

        withoutDragged.forEach((item, index) => {
            item.order = index + 1;
        });

        render();
        showToast(`Urutan "${draggedMenu.label}" diperbarui. Jangan lupa klik "Simpan Perubahan".`);
    }

    /* =========================================================
       EVENTS — TABEL
    ========================================================= */
    function bindTableEvents() {
        tableBody.querySelectorAll("input[data-toggle]").forEach((toggle) => {
            toggle.addEventListener("change", () => {
                const menu = menus.find((item) => item.id === toggle.dataset.toggle);
                if (!menu) return;
                menu.active = toggle.checked;
                const row = toggle.closest("tr");
                if (row) row.classList.toggle("is-inactive", !menu.active);
                renderPreview();
            });
        });

        tableBody.querySelectorAll(".urutan-input").forEach((input) => {
            input.addEventListener("change", () => {
                const id = input.dataset.order;
                let value = parseInt(input.value, 10);
                if (!Number.isFinite(value)) value = 1;
                value = Math.min(Math.max(value, 1), menus.length);
                moveMenuToOrder(id, value);
            });
        });

        tableBody.querySelectorAll("[data-move]").forEach((button) => {
            button.addEventListener("click", () => {
                if (button.disabled) return;
                swapMenu(button.dataset.id, button.dataset.move);
            });
        });

        tableBody.querySelectorAll("[data-aksi-toggle]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const id = button.dataset.aksiToggle;
                const menuDropdown = tableBody.querySelector(`[data-aksi-menu="${id}"]`);
                closeAllAksiMenus(menuDropdown);
                if (menuDropdown) menuDropdown.classList.toggle("open");
            });
        });

        tableBody.querySelectorAll("[data-action]").forEach((button) => {
            button.addEventListener("click", () => {
                const id = button.dataset.id;
                const action = button.dataset.action;

                if (action === "top") {
                    moveMenuToOrder(id, 1);
                } else if (action === "bottom") {
                    moveMenuToOrder(id, menus.length);
                } else if (action === "reset") {
                    resetSingleMenu(id);
                }

                closeAllAksiMenus();
            });
        });
    }

    function closeAllAksiMenus(except) {
        document.querySelectorAll(".aksi-menu.open").forEach((menu) => {
            if (menu !== except) menu.classList.remove("open");
        });
    }

    document.addEventListener("click", () => closeAllAksiMenus());

    /* =========================================================
       LOGIKA URUTAN (lokal, sebelum disimpan)
    ========================================================= */
    function swapMenu(id, direction) {
        const sorted = sortedMenus();
        const index = sorted.findIndex((menu) => menu.id === id);
        if (index === -1) return;

        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sorted.length) return;

        const current = sorted[index];
        const target = sorted[targetIndex];
        const tempOrder = current.order;
        current.order = target.order;
        target.order = tempOrder;

        render();
    }

    function moveMenuToOrder(id, newOrder) {
        const sorted = sortedMenus();
        const menu = menus.find((item) => item.id === id);
        if (!menu) return;

        const withoutMenu = sorted.filter((item) => item.id !== id);
        const insertIndex = Math.min(Math.max(newOrder - 1, 0), withoutMenu.length);
        withoutMenu.splice(insertIndex, 0, menu);

        withoutMenu.forEach((item, index) => {
            item.order = index + 1;
        });

        render();
    }

    function resetSingleMenu(id) {
        const defaultMenu = DEFAULT_MENUS.find((item) => item.id === id);
        const menu = menus.find((item) => item.id === id);
        if (!defaultMenu || !menu) return;

        menu.order = defaultMenu.order;
        menu.active = defaultMenu.active;

        const sorted = [...menus].sort((a, b) => a.order - b.order || (a.id === id ? -1 : 1));
        sorted.forEach((item, index) => {
            item.order = index + 1;
        });

        render();
        showToast(`Item "${defaultMenu.label}" dikembalikan ke pengaturan awal. Klik "Simpan Perubahan" untuk menyimpan.`);
    }

    /* =========================================================
       RESET SEMUA (ke server)
    ========================================================= */
    if (resetButton) {
        resetButton.addEventListener("click", async () => {
            if (isLoading || isSaving) return;

            const confirmed = window.confirm("Reset seluruh pengaturan sidebar ke default?");
            if (!confirmed) return;

            resetButton.disabled = true;
            try {
                const data = await resetSidebarMenuOnServer();
                menus = normalizeMenus(data);
                render();
                showToast("Pengaturan sidebar berhasil direset.");
            } catch (error) {
                console.error(error);
                menus = DEFAULT_MENUS.map((menu) => ({ ...menu }));
                render();
                showToast("Gagal reset ke server, tampilan dikembalikan ke default (belum tersimpan).");
            } finally {
                resetButton.disabled = false;
            }
        });
    }

    /* =========================================================
       SIMPAN (ke server)
    ========================================================= */
    if (saveButton) {
        saveButton.addEventListener("click", async () => {
            if (isLoading || isSaving) return;

            isSaving = true;
            saveButton.disabled = true;
            const originalLabel = saveButton.innerHTML;
            saveButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...`;

            try {
                const data = await persistSidebarMenu();
                menus = normalizeMenus(data);
                render();
                showToast("Perubahan sidebar berhasil disimpan.");
            } catch (error) {
                console.error(error);
                showToast(error.message || "Gagal menyimpan perubahan sidebar.");
            } finally {
                isSaving = false;
                saveButton.disabled = false;
                saveButton.innerHTML = originalLabel;
            }
        });
    }

    /* =========================================================
       TOAST
    ========================================================= */
    function showToast(message) {
        let toast = document.querySelector(".toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "toast";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add("show");
        window.clearTimeout(toast.hideTimer);
        toast.hideTimer = window.setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
});
