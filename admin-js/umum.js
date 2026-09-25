/* =========================================================
   MAB-News CMS — umum.js
   Pengaturan Umum
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const saveButton = document.getElementById("saveSettings");

    const settingsKey = "mabnews_general_settings";


    /* =====================================================
       ELEMEN FORM
    ===================================================== */

    const fields = {

        siteName:
            document.getElementById("siteName"),

        siteDescription:
            document.getElementById("siteDescription"),

        siteUrl:
            document.getElementById("siteUrl"),

        adminEmail:
            document.getElementById("adminEmail"),

        adminName:
            document.getElementById("adminName"),

        adminRole:
            document.getElementById("adminRole"),

        timezone:
            document.getElementById("timezone"),

        dateFormat:
            document.getElementById("dateFormat"),

        timeFormat:
            document.getElementById("timeFormat"),

        maintenanceMode:
            document.getElementById("maintenanceMode"),

        allowComments:
            document.getElementById("allowComments"),

        activityLog:
            document.getElementById("activityLog")

    };


    /* =====================================================
       LOAD SETTINGS
    ===================================================== */

    function loadSettings() {

        try {

            const saved =
                localStorage.getItem(settingsKey);

            if (!saved) {
                return;
            }

            const settings =
                JSON.parse(saved);


            Object.keys(fields).forEach((key) => {

                const element =
                    fields[key];

                if (!element) {
                    return;
                }


                if (element.type === "checkbox") {

                    if (
                        typeof settings[key] ===
                        "boolean"
                    ) {

                        element.checked =
                            settings[key];

                    }

                    return;
                }


                if (
                    settings[key] !== undefined &&
                    settings[key] !== null
                ) {

                    element.value =
                        settings[key];

                }

            });

        } catch (error) {

            console.error(
                "Gagal memuat pengaturan:",
                error
            );

        }

    }


    /* =====================================================
       SAVE SETTINGS
    ===================================================== */

    function saveSettings() {

        const settings = {};


        Object.keys(fields).forEach((key) => {

            const element =
                fields[key];

            if (!element) {
                return;
            }


            if (element.type === "checkbox") {

                settings[key] =
                    element.checked;

                return;

            }


            settings[key] =
                element.value;

        });


        try {

            localStorage.setItem(
                settingsKey,
                JSON.stringify(settings)
            );


            showSavedState();

            showToast(
                "Perubahan berhasil disimpan."
            );

        } catch (error) {

            console.error(
                "Gagal menyimpan pengaturan:",
                error
            );

            showToast(
                "Gagal menyimpan perubahan."
            );

        }

    }


    /* =====================================================
       BUTTON SAVED STATE
    ===================================================== */

    function showSavedState() {

        if (!saveButton) {
            return;
        }


        const originalHTML =
            saveButton.innerHTML;


        saveButton.classList.add("saved");


        saveButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            <span>Tersimpan</span>
        `;


        setTimeout(() => {

            saveButton.classList.remove(
                "saved"
            );

            saveButton.innerHTML =
                originalHTML;

        }, 1800);

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        let toast =
            document.querySelector(
                ".settings-toast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.className =
                "settings-toast";


            toast.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                <span></span>
            `;


            document.body.appendChild(
                toast
            );

        }


        const messageElement =
            toast.querySelector("span");


        if (messageElement) {

            messageElement.textContent =
                message;

        }


        toast.classList.add("show");


        clearTimeout(
            toast._timeout
        );


        toast._timeout =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 2500);

    }


    /* =====================================================
       EVENT SAVE
    ===================================================== */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            saveSettings
        );

    }


    /* =====================================================
       LOAD
    ===================================================== */

    loadSettings();

});