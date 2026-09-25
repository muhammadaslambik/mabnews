/* =========================================================
   MAB-News CMS — umum.js
   Interaksi halaman Pengaturan > Umum.
   Data halaman disimpan lokal di browser untuk saat ini.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const form = document.getElementById("generalSettingsForm");
    const toast = document.getElementById("settingsToast");

    if (!form) return;

    const STORAGE_KEY = "mabnews_general_settings";

    const fields = [
        "siteName",
        "siteDescription",
        "siteUrl",
        "defaultLanguage",
        "adminName",
        "adminEmail",
        "timezone",
        "dateFormat",
        "timeFormat",
        "maintenanceMode",
        "commentsEnabled",
        "activityLog"
    ];

    const getField = (id) => document.getElementById(id);

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(() => {
            toast.classList.remove("show");
        }, 1800);
    }

    function getSettings() {
        const settings = {};

        fields.forEach((id) => {
            const field = getField(id);
            if (!field) return;

            if (field.type === "checkbox") {
                settings[id] = field.checked;
            } else {
                settings[id] = field.value;
            }
        });

        return settings;
    }

    function saveSettings(showMessage = true) {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(getSettings())
            );

            if (showMessage) {
                showToast("Pengaturan berhasil disimpan.");
            }
        } catch (error) {
            console.warn(
                "Pengaturan Umum tidak dapat disimpan ke localStorage.",
                error
            );
        }
    }

    function loadSettings() {
        let savedSettings = null;

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            savedSettings = raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.warn(
                "Data Pengaturan Umum tersimpan tidak dapat dibaca.",
                error
            );
        }

        if (!savedSettings || typeof savedSettings !== "object") {
            return;
        }

        fields.forEach((id) => {
            const field = getField(id);

            if (!field || !(id in savedSettings)) {
                return;
            }

            if (field.type === "checkbox") {
                field.checked = Boolean(savedSettings[id]);
            } else {
                field.value = savedSettings[id];
            }
        });
    }

    loadSettings();

    fields.forEach((id) => {
        const field = getField(id);

        if (!field) return;

        field.addEventListener("change", () => {
            saveSettings(true);
        });

        if (field.matches("input[type='text'], input[type='url'], input[type='email'], textarea")) {
            field.addEventListener("blur", () => {
                saveSettings(false);
            });
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        saveSettings(true);
    });
});
