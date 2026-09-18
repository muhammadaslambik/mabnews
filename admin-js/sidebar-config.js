document.addEventListener("DOMContentLoaded", () => {
    "use strict";


    /* =========================================================
       SIDEBAR DROPDOWN
       ========================================================= */

    const dropdowns = document.querySelectorAll(".dropdown-toggle");

    dropdowns.forEach((toggle) => {

        toggle.addEventListener("click", (event) => {

            event.preventDefault();

            const parent = toggle.closest(".nav-dropdown");

            if (!parent) {
                return;
            }

            parent.classList.toggle("open");

            const menu = parent.querySelector(".dropdown-menu");

            const arrow = toggle.querySelector(".arrow-right");

            if (menu) {

                if (parent.classList.contains("open")) {

                    menu.style.display = "block";

                } else {

                    menu.style.display = "none";

                }

            }

            if (arrow) {

                if (parent.classList.contains("open")) {

                    arrow.classList.remove("fa-chevron-right");

                    arrow.classList.add("fa-chevron-down");

                } else {

                    arrow.classList.remove("fa-chevron-down");

                    arrow.classList.add("fa-chevron-right");

                }

            }

        });

    });


    /* =========================================================
       PASTIKAN DROPDOWN TERBUKA SAAT HALAMAN DIMUAT
       ========================================================= */

    document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {

        const menu = dropdown.querySelector(".dropdown-menu");

        if (menu) {
            menu.style.display = "block";
        }

    });


    /* =========================================================
       TOGGLE MENU
       ========================================================= */

    const toggles = document.querySelectorAll(
        ".menu-row input[type='checkbox']"
    );


    toggles.forEach((toggle) => {

        toggle.addEventListener("change", () => {

            const menuName = toggle.dataset.toggle;

            const preview = document.querySelector(
                `[data-preview="${menuName}"]`
            );

            if (!preview) {
                return;
            }

            if (toggle.checked) {

                preview.classList.remove("is-hidden");

            } else {

                preview.classList.add("is-hidden");

            }

        });

    });


    /* =========================================================
       DRAG & DROP
       ========================================================= */

    const menuList = document.getElementById("menuList");

    let draggedItem = null;


    if (menuList) {

        const menuRows = menuList.querySelectorAll(".menu-row");


        menuRows.forEach((row) => {

            row.addEventListener("dragstart", () => {

                draggedItem = row;

                row.classList.add("dragging");

            });


            row.addEventListener("dragend", () => {

                row.classList.remove("dragging");

                draggedItem = null;

            });


            row.addEventListener("dragover", (event) => {

                event.preventDefault();

                if (!draggedItem || draggedItem === row) {
                    return;
                }

                const rect = row.getBoundingClientRect();

                const middle =
                    rect.top + rect.height / 2;


                if (event.clientY < middle) {

                    menuList.insertBefore(
                        draggedItem,
                        row
                    );

                } else {

                    menuList.insertBefore(
                        draggedItem,
                        row.nextSibling
                    );

                }

            });

        });

    }


    /* =========================================================
       RESET
       ========================================================= */

    const resetButton =
        document.getElementById("resetButton");


    if (resetButton) {

        resetButton.addEventListener("click", () => {

            const defaultMenus = [
                "dashboard",
                "artikel",
                "kategori",
                "media",
                "pengguna",
                "pengaturan",
                "lainnya"
            ];


            toggles.forEach((toggle) => {

                toggle.checked =
                    defaultMenus.includes(toggle.dataset.toggle);

                toggle.dispatchEvent(
                    new Event("change")
                );

            });


            showToast(
                "Pengaturan sidebar berhasil direset."
            );

        });

    }


    /* =========================================================
       SIMPAN
       ========================================================= */

    const saveButton =
        document.getElementById("saveButton");


    if (saveButton) {

        saveButton.addEventListener("click", () => {

            const settings = [];


            document.querySelectorAll(".menu-row").forEach((row) => {

                const toggle =
                    row.querySelector(
                        "input[type='checkbox']"
                    );


                if (!toggle) {
                    return;
                }


                settings.push({
                    menu: row.dataset.menu,
                    enabled: toggle.checked
                });

            });


            try {

                localStorage.setItem(
                    "mabnews_sidebar_config",
                    JSON.stringify(settings)
                );

            } catch (error) {

                console.warn(
                    "Pengaturan sidebar tidak dapat disimpan.",
                    error
                );

            }


            showToast(
                "Perubahan sidebar berhasil disimpan."
            );

        });

    }


    /* =========================================================
       LOAD SETTING
       ========================================================= */

    loadSidebarSettings();


    function loadSidebarSettings() {

        let savedSettings = null;


        try {

            const saved =
                localStorage.getItem(
                    "mabnews_sidebar_config"
                );


            if (saved) {

                savedSettings =
                    JSON.parse(saved);

            }

        } catch (error) {

            console.warn(
                "Pengaturan sidebar tidak dapat dibaca.",
                error
            );

        }


        if (!Array.isArray(savedSettings)) {
            return;
        }


        savedSettings.forEach((setting) => {

            const toggle =
                document.querySelector(
                    `[data-toggle="${setting.menu}"]`
                );


            if (!toggle) {
                return;
            }


            toggle.checked =
                Boolean(setting.enabled);


            toggle.dispatchEvent(
                new Event("change")
            );

        });

    }


    /* =========================================================
       DARK / LIGHT MODE
       ========================================================= */

    const themeToggle =
        document.getElementById("themeToggle");


    const savedTheme =
        localStorage.getItem(
            "mabnews_cms_theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        updateThemeIcon();

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "mabnews_cms_theme",
                isDark ? "dark" : "light"
            );


            updateThemeIcon();

        });

    }


    function updateThemeIcon() {

        if (!themeToggle) {
            return;
        }


        const icon =
            themeToggle.querySelector("i");


        if (!icon) {
            return;
        }


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            icon.classList.remove(
                "fa-moon"
            );

            icon.classList.add(
                "fa-sun"
            );

        } else {

            icon.classList.remove(
                "fa-sun"
            );

            icon.classList.add(
                "fa-moon"
            );

        }

    }


    /* =========================================================
       ACCOUNT BUTTON
       ========================================================= */

    const accountButton =
        document.getElementById(
            "accountButton"
        );


    if (accountButton) {

        accountButton.addEventListener(
            "click",
            () => {

                showToast(
                    "Menu akun akan tersedia pada tahap berikutnya."
                );

            }
        );

    }


    /* =========================================================
       TOAST
       ========================================================= */

    function showToast(message) {

        let toast =
            document.querySelector(".toast");


        if (!toast) {

            toast =
                document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }


        toast.textContent = message;

        toast.classList.add("show");


        window.clearTimeout(
            toast.hideTimer
        );


        toast.hideTimer =
            window.setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 2500);

    }

});