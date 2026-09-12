/* =========================================================
   MAB-NEWS — JAVASCRIPT HALAMAN DAFTAR BERITA
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT
    ====================================================== */

    const rows = [
        ...document.querySelectorAll(".news-item")
    ];

    const tabs = [
        ...document.querySelectorAll(".category-tab")
    ];

    const categoryFilter =
        document.getElementById("filterCategory");

    const authorFilter =
        document.getElementById("filterAuthor");

    const timeFilter =
        document.getElementById("filterTime");

    const sortFilter =
        document.getElementById("sortNews");

    const filterForm =
        document.getElementById("newsFilterForm");

    const resetFilter =
        document.getElementById("resetFilter");

    const resultCount =
        document.getElementById("resultCount");

    const resultsTitle =
        document.getElementById("resultsTitle");

    const pageTitle =
        document.getElementById("pageTitle");

    const headerSearch =
        document.getElementById("headerSearch");

    const searchInput =
        document.getElementById("searchInput");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const themeToggle =
        document.getElementById("themeToggle");

    const accountButton =
        document.getElementById("accountButton");


    /* =====================================================
       URL PARAMETER
    ====================================================== */

    const params =
        new URLSearchParams(window.location.search);

    const urlCategory =
        (params.get("kategori") || "all").toLowerCase();

    const urlSort =
        (params.get("sort") || "latest").toLowerCase();

    const urlPage =
        parseInt(params.get("page") || "1", 10);


    /* =====================================================
       STATE
    ====================================================== */

    let selectedCategory = urlCategory;


    /* =====================================================
       HELPER
    ====================================================== */

    function normalize(value) {
        return String(value || "")
            .trim()
            .toLowerCase();
    }


    function getCategoryName(category) {

        const names = {
            all: "Semua",
            nasional: "Nasional",
            internasional: "Internasional",
            ekonomi: "Ekonomi",
            metro: "Metro",
            dunia: "Dunia",
            olahraga: "Olahraga",
            teknologi: "Teknologi",
            otomotif: "Otomotif",
            "gaya-hidup": "Gaya Hidup",
            seni: "Seni",
            kolom: "Kolom"
        };

        return names[category] || "Semua";
    }


    function updateURL() {

        const url =
            new URL(window.location.href);

        url.searchParams.delete("page");

        if (
            selectedCategory &&
            selectedCategory !== "all"
        ) {
            url.searchParams.set(
                "kategori",
                selectedCategory
            );
        } else {
            url.searchParams.delete("kategori");
        }

        if (
            sortFilter.value &&
            sortFilter.value !== "latest"
        ) {
            url.searchParams.set(
                "sort",
                sortFilter.value
            );
        } else {
            url.searchParams.delete("sort");
        }

        window.history.replaceState(
            {},
            "",
            url
        );
    }


    /* =====================================================
       CATEGORY TABS
    ====================================================== */

    function updateTabs() {

        tabs.forEach(tab => {

            const category =
                normalize(
                    tab.dataset.category
                );

            tab.classList.toggle(
                "active",
                category === selectedCategory
            );

        });

    }


    /* =====================================================
       APPLY FILTER
    ====================================================== */

    function applyFilters(options = {}) {

        const {
            updateUrl = true
        } = options;


        const category =
            selectedCategory || "all";

        const author =
            normalize(
                authorFilter?.value || "all"
            );

        const time =
            normalize(
                timeFilter?.value || "all"
            );


        const visibleRows = [];


        rows.forEach(row => {

            const rowCategory =
                normalize(
                    row.dataset.category
                );

            const rowAuthor =
                normalize(
                    row.dataset.author
                );

            const rowTime =
                normalize(
                    row.dataset.time
                );


            const categoryOK =
                category === "all" ||
                rowCategory === category;


            const authorOK =
                author === "all" ||
                rowAuthor === author;


            let timeOK = true;

            if (time !== "all") {

                /*
                 * Data demo saat ini memakai
                 * data-time="today".
                 *
                 * Struktur ini sengaja dibuat agar
                 * nantinya mudah diganti dengan data
                 * tanggal dari CMS/API.
                 */

                if (time === "today") {
                    timeOK =
                        rowTime === "today";
                }

                else if (time === "week") {
                    timeOK =
                        rowTime === "today" ||
                        rowTime === "week";
                }

                else if (time === "month") {
                    timeOK =
                        rowTime === "today" ||
                        rowTime === "week" ||
                        rowTime === "month";
                }

            }


            const visible =
                categoryOK &&
                authorOK &&
                timeOK;


            row.classList.toggle(
                "is-hidden",
                !visible
            );


            if (visible) {
                visibleRows.push(row);
            }

        });


        /* =================================================
           SORT
        ================================================== */

        sortRows();


        /* =================================================
           TITLE
        ================================================== */

        const categoryName =
            getCategoryName(category);


        if (category === "all") {

            resultsTitle.textContent =
                sortFilter.value === "popular"
                    ? "Berita Terpopuler"
                    : "Berita Terbaru";

            pageTitle.textContent =
                "Berita";

        } else {

            resultsTitle.textContent =
                `Berita ${categoryName}`;

            pageTitle.textContent =
                categoryName;

        }


        /* =================================================
           RESULT COUNT
        ================================================== */

        resultCount.textContent =
            `Menampilkan ${visibleRows.length} berita`;


        /* =================================================
           TABS
        ================================================== */

        updateTabs();


        /* =================================================
           URL
        ================================================== */

        if (updateUrl) {
            updateURL();
        }

    }


    /* =====================================================
       SORT
    ====================================================== */

    function sortRows() {

        const container =
            document.querySelector(
                ".news-results"
            );

        if (!container) {
            return;
        }


        const orderedRows =
            [...rows];


        if (sortFilter.value === "latest") {

            orderedRows.sort(
                (a, b) =>
                    new Date(b.dataset.date) -
                    new Date(a.dataset.date)
            );

        }


        else if (sortFilter.value === "oldest") {

            orderedRows.sort(
                (a, b) =>
                    new Date(a.dataset.date) -
                    new Date(b.dataset.date)
            );

        }


        else if (sortFilter.value === "popular") {

            orderedRows.sort(
                (a, b) =>
                    Number(b.dataset.popular || 0) -
                    Number(a.dataset.popular || 0)
            );

        }


        const pagination =
            document.getElementById(
                "pagination"
            );


        orderedRows.forEach(row => {

            if (pagination) {
                container.insertBefore(
                    row,
                    pagination
                );
            } else {
                container.appendChild(row);
            }

        });

    }


    /* =====================================================
       FILTER FORM
    ====================================================== */

    filterForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            selectedCategory =
                normalize(
                    categoryFilter.value
                );

            applyFilters();

        }
    );


    /* =====================================================
       RESET
    ====================================================== */

    resetFilter?.addEventListener(
        "click",
        () => {

            setTimeout(() => {

                selectedCategory = "all";

                categoryFilter.value =
                    "all";

                authorFilter.value =
                    "all";

                timeFilter.value =
                    "all";

                sortFilter.value =
                    "latest";


                applyFilters();


                /*
                 * Reset URL sepenuhnya.
                 */

                window.history.replaceState(
                    {},
                    "",
                    "berita.html"
                );

            }, 0);

        }
    );


    /* =====================================================
       SORT CHANGE
    ====================================================== */

    sortFilter?.addEventListener(
        "change",
        () => {

            applyFilters();

        }
    );


    /* =====================================================
       HEADER SEARCH
    ====================================================== */

    headerSearch?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const query =
                searchInput.value.trim();


            if (!query) {
                return;
            }


            window.location.href =
                `search.html?q=${encodeURIComponent(query)}`;

        }
    );


    /* =====================================================
       NEWSLETTER
    ====================================================== */

    newsletterForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                document
                    .getElementById(
                        "newsletterEmail"
                    )
                    ?.value
                    .trim();


            if (!email) {
                return;
            }


            alert(
                "Terima kasih. Email Anda berhasil didaftarkan."
            );


            newsletterForm.reset();

        }
    );


    /* =====================================================
       THEME TOGGLE
    ====================================================== */

    themeToggle?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-preview"
            );


            const dark =
                document.body.classList.contains(
                    "dark-preview"
                );


            themeToggle.textContent =
                dark ? "☀️" : "🌙";


            themeToggle.setAttribute(
                "aria-label",
                dark
                    ? "Gunakan tema terang"
                    : "Gunakan tema gelap"
            );

        }
    );


    /* =====================================================
       ACCOUNT BUTTON
    ====================================================== */

    accountButton?.addEventListener(
        "click",
        () => {

            alert(
                "Fitur akun pengguna akan tersedia pada versi berikutnya."
            );

        }
    );


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    if (
        [
            "all",
            "nasional",
            "internasional",
            "ekonomi",
            "metro",
            "dunia",
            "olahraga",
            "teknologi",
            "otomotif",
            "gaya-hidup",
            "seni",
            "kolom"
        ].includes(urlCategory)
    ) {

        selectedCategory =
            urlCategory;

    } else {

        selectedCategory =
            "all";

    }


    if (
        [
            "latest",
            "oldest",
            "popular"
        ].includes(urlSort)
    ) {

        sortFilter.value =
            urlSort;

    } else {

        sortFilter.value =
            "latest";

    }


    if (categoryFilter) {

        categoryFilter.value =
            selectedCategory;

    }


    /*
     * Jika URL memiliki kategori,
     * otomatis aktifkan kategori tersebut.
     */

    updateTabs();


    /*
     * Terapkan filter pertama kali.
     */

    applyFilters({
        updateUrl: false
    });


    /* =====================================================
       PAGE PARAMETER
    ====================================================== */

    if (
        Number.isInteger(urlPage) &&
        urlPage > 1
    ) {

        document
            .querySelectorAll(
                ".page-number"
            )
            .forEach(link => {

                link.classList.remove(
                    "active"
                );

            });


        const currentPage =
            document.querySelector(
                `.page-number[data-page="${urlPage}"]`
            );


        currentPage?.classList.add(
            "active"
        );

    }

});
