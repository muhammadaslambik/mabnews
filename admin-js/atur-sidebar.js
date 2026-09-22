document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       DATA DEFAULT MENU SIDEBAR
       type: "main"  -> tampil langsung di level utama sidebar
       type: "child" -> tampil di dalam grup "Lainnya"
    ========================================================= */
    const DEFAULT_MENUS = [
        { id: "dashboard", label: "Dashboard", icon: "fa-house", type: "main", order: 1, active: true },
        { id: "artikel", label: "Artikel", icon: "fa-file-lines", type: "main", order: 2, active: true },
        { id: "kategori", label: "Kategori", icon: "fa-folder", type: "main", order: 3, active: true },
        { id: "media", label: "Media", icon: "fa-image", type: "main", order: 4, active: true },
        { id: "pengguna", label: "Pengguna", icon: "fa-users", type: "main", order: 5, active: true },
        { id: "pengaturan", label: "Pengaturan", icon: "fa-gear", type: "main", order: 6, active: true },
        { id: "laman", label: "Laman", icon: "fa-file-lines", type: "child", order: 7, active: true },
        { id: "statistik", label: "Statistik", icon: "fa-chart-column", type: "child", order: 8, active: true },
        { id: "iklan", label: "Iklan", icon: "fa-bullhorn", type: "child", order: 9, active: true },
        { id: "perangkat", label: "Perangkat", icon: "fa-display", type: "child", order: 10, active: true },
        { id: "domain-hosting", label: "Domain & Hosting", icon: "fa-globe", type: "child", order: 11, active: true },
        { id: "backend-api", label: "BackEnd & API", icon: "fa-code", type: "child", order: 12, active: true },
        { id: "atur-sidebar", label: "Atur Sidebar", icon: "fa-table-cells", type: "child", order: 13, active: true },
        { id: "export-impor", label: "Export & Impor", icon: "fa-file-export", type: "child", order: 14, active: true }
    ];

    const STORAGE_KEY = "mabnews_sidebar_config_v2";

    const tableBody = document.getElementById("menuTableBody");
    const previewMenu = document.getElementById("previewMenu");
    const totalMenuCount = document.getElementById("totalMenuCount");
    const resetButton = document.getElementById("resetButton");
    const saveButton = document.getElementById("saveButton");

    let menus = loadMenus();

    render();

    /* =========================================================
       LOAD / SAVE
    ========================================================= */
    function loadMenus() {
        let saved = null;

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                saved = JSON.parse(raw);
            }
        } catch (error) {
            console.warn("Pengaturan sidebar tidak dapat dibaca.", error);
        }

        if (!Array.isArray(saved) || saved.length === 0) {
            return DEFAULT_MENUS.map((menu) => ({ ...menu }));
        }

        return DEFAULT_MENUS.map((defaultMenu) => {
            const match = saved.find((item) => item.id === defaultMenu.id);
            if (!match) {
                return { ...defaultMenu };
            }
            return {
                ...defaultMenu,
                order: Number.isFinite(match.order) ? match.order : defaultMenu.order,
                active: typeof match.active === "boolean" ? match.active : defaultMenu.active
            };
        });
    }

    function saveMenus() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
            return true;
        } catch (error) {
            console.warn("Pengaturan sidebar tidak dapat disimpan.", error);
            return false;
        }
    }

    /* =========================================================
       RENDER
    ========================================================= */
    function sortedMenus() {
        return [...menus].sort((a, b) => a.order - b.order);
    }

    function render() {
        renderTable();
        renderPreview();
        totalMenuCount.textContent = menus.length;
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
            if (!row) {
                return;
            }
            const upBtn = row.querySelector('[data-move="up"]');
            const downBtn = row.querySelector('[data-move="down"]');
            if (upBtn) upBtn.disabled = index === 0;
            if (downBtn) downBtn.disabled = index === sorted.length - 1;
        });
    }

    function renderPreview() {
        previewMenu.innerHTML = "";

        const sorted = sortedMenus();
        const mains = sorted.filter((menu) => menu.type === "main");
        const children = sorted.filter((menu) => menu.type === "child");
        const activeChildren = children.filter((menu) => menu.active);

        mains.forEach((menu) => {
            if (!menu.active) {
                return;
            }
            const item = document.createElement("div");
            item.className = "preview-item" + (menu.id === "dashboard" ? " is-active" : "");
            item.innerHTML = `<i class="fa-solid ${menu.icon}"></i><span>${menu.label}</span>`;
            previewMenu.appendChild(item);
        });

        const lainnyaItem = document.createElement("div");
        lainnyaItem.className = "preview-item has-arrow";
        lainnyaItem.innerHTML = `
            <i class="fa-solid fa-ellipsis"></i>
            <span>Lainnya</span>
            <i class="fa-solid fa-chevron-up arrow"></i>
        `;
        previewMenu.appendChild(lainnyaItem);

        const group = document.createElement("div");
        group.className = "preview-submenu-group";

        if (activeChildren.length === 0) {
            group.innerHTML = `<div class="preview-empty">Belum ada menu aktif</div>`;
        } else {
            activeChildren.forEach((menu) => {
                const sub = document.createElement("div");
                sub.className = "preview-submenu-item" + (menu.id === "atur-sidebar" ? " is-active" : "");
                sub.innerHTML = `<span class="dot"></span><span>${menu.label}</span>`;
                group.appendChild(sub);
            });
        }

        previewMenu.appendChild(group);
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
                if (!Number.isFinite(value)) {
                    value = 1;
                }
                value = Math.min(Math.max(value, 1), menus.length);
                moveMenuToOrder(id, value);
            });
        });

        tableBody.querySelectorAll("[data-move]").forEach((button) => {
            button.addEventListener("click", () => {
                if (button.disabled) return;
                const id = button.dataset.id;
                const direction = button.dataset.move;
                swapMenu(id, direction);
            });
        });

        tableBody.querySelectorAll("[data-aksi-toggle]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const id = button.dataset.aksiToggle;
                const menuDropdown = tableBody.querySelector(`[data-aksi-menu="${id}"]`);
                closeAllAksiMenus(menuDropdown);
                if (menuDropdown) {
                    menuDropdown.classList.toggle("open");
                }
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
            if (menu !== except) {
                menu.classList.remove("open");
            }
        });
    }

    document.addEventListener("click", () => closeAllAksiMenus());

    /* =========================================================
       LOGIKA URUTAN
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

        menus.forEach((item) => {
            if (item.id === id) return;
            if (item.order >= defaultMenu.order && item.order > menu.order) {
                item.order += 0;
            }
        });

        menu.order = defaultMenu.order;
        menu.active = defaultMenu.active;

        const sorted = [...menus].sort((a, b) => a.order - b.order || (a.id === id ? -1 : 1));
        sorted.forEach((item, index) => {
            item.order = index + 1;
        });

        render();
        showToast(`Item "${defaultMenu.label}" dikembalikan ke pengaturan awal.`);
    }

    /* =========================================================
       RESET SEMUA
    ========================================================= */
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            menus = DEFAULT_MENUS.map((menu) => ({ ...menu }));
            render();
            showToast("Pengaturan sidebar berhasil direset.");
        });
    }

    /* =========================================================
       SIMPAN
    ========================================================= */
    if (saveButton) {
        saveButton.addEventListener("click", () => {
            const success = saveMenus();
            showToast(
                success
                    ? "Perubahan sidebar berhasil disimpan."
                    : "Gagal menyimpan perubahan sidebar."
            );
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
        }, 2500);
    }
});
