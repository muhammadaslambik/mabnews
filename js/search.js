document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       DATA HASIL PENCARIAN
       ========================================================= */

    const articles = [

        {
            category: "EKONOMI",

            title:
                "Inflasi Mei 2025 Terkendali di Level 2,4 Persen",

            description:
                "Badan Pusat Statistik (BPS) melaporkan inflasi Mei 2025 berada di level 2,4 persen secara tahunan (yoy), lebih rendah dibanding bulan sebelumnya.",

            date:
                "30 Mei 2025",

            time:
                "07:30 WIB",

            image:
                "assets/images/card-market.jpg",

            id:
                "inflasi-mei-2025-terkendali"
        },


        {
            category: "EKONOMI",

            title:
                "Ekspor Indonesia Tumbuh 8,6 Persen pada April 2025",

            description:
                "Badan Pusat Statistik (BPS) mencatat nilai ekspor Indonesia pada April 2025 mencapai USD 23,45 miliar atau tumbuh 8,6 persen dibanding bulan sebelumnya.",

            date:
                "30 Mei 2025",

            time:
                "06:45 WIB",

            image:
                "assets/images/card-market.jpg",

            id:
                "ekspor-indonesia-tumbuh"
        },


        {
            category: "EKONOMI",

            title:
                "IHSG Ditutup Menguat, Sektor Keuangan Jadi Pendorong Utama",

            description:
                "Indeks Harga Saham Gabungan (IHSG) ditutup menguat pada perdagangan hari ini didorong penguatan di sektor keuangan dan konsumer.",

            date:
                "29 Mei 2025",

            time:
                "16:20 WIB",

            image:
                "assets/images/popular-2.jpg",

            id:
                "ihsg-ditutup-menguat"
        },


        {
            category: "EKONOMI",

            title:
                "Rupiah Menguat Tipis terhadap Dolar AS di Tengah Data Ekonomi Global",

            description:
                "Nilai tukar rupiah menguat 0,15 persen terhadap dolar AS pada perdagangan hari ini seiring pelemahan data ekonomi Amerika Serikat.",

            date:
                "29 Mei 2025",

            time:
                "15:10 WIB",

            image:
                "assets/images/card-market.jpg",

            id:
                "rupiah-menguat-tipis"
        },


        {
            category: "EKONOMI",

            title:
                "Harga BBM Terbaru per 27 Mei 2025 di Seluruh Indonesia",

            description:
                "Pertamina, Shell, dan BP-AKR kompak menyesuaikan harga BBM non subsidi per 27 Mei 2025. Berikut daftar lengkapnya di sejumlah wilayah Indonesia.",

            date:
                "27 Mei 2025",

            time:
                "10:20 WIB",

            image:
                "assets/images/popular-1.jpg",

            id:
                "harga-bbm-terbaru"
        },


        {
            category: "EKONOMI",

            title:
                "Bank Indonesia Pertahankan Suku Bunga Acuan",

            description:
                "Bank Indonesia mempertahankan suku bunga acuan untuk menjaga stabilitas ekonomi dan nilai tukar rupiah.",

            date:
                "27 Mei 2025",

            time:
                "09:40 WIB",

            image:
                "assets/images/popular-4.jpg",

            id:
                "bank-indonesia-suku-bunga"
        },


        {
            category: "EKONOMI",

            title:
                "Investasi Indonesia Tetap Tumbuh di Tengah Ketidakpastian Global",

            description:
                "Aktivitas investasi nasional menunjukkan pertumbuhan positif meskipun perekonomian global masih menghadapi sejumlah tantangan.",

            date:
                "26 Mei 2025",

            time:
                "14:30 WIB",

            image:
                "assets/images/card-market.jpg",

            id:
                "investasi-indonesia-tumbuh"
        },


        {
            category: "EKONOMI",

            title:
                "Pemerintah Siapkan Strategi Baru Jaga Daya Beli Masyarakat",

            description:
                "Pemerintah menyiapkan berbagai strategi untuk menjaga konsumsi dan daya beli masyarakat di tengah perubahan ekonomi global.",

            date:
                "25 Mei 2025",

            time:
                "12:15 WIB",

            image:
                "assets/images/popular-1.jpg",

            id:
                "pemerintah-daya-beli"
        },


        {
            category: "EKONOMI",

            title:
                "Harga Pangan Mulai Stabil Menjelang Akhir Bulan",

            description:
                "Sejumlah harga pangan mulai menunjukkan tren stabil setelah mengalami perubahan pada awal bulan.",

            date:
                "24 Mei 2025",

            time:
                "11:25 WIB",

            image:
                "assets/images/card-market.jpg",

            id:
                "harga-pangan-stabil"
        },


        {
            category: "EKONOMI",

            title:
                "Pemerintah Dorong Ekonomi Digital untuk Perkuat UMKM",

            description:
                "Penguatan ekonomi digital terus didorong untuk membantu UMKM meningkatkan produktivitas dan memperluas pasar.",

            date:
                "23 Mei 2025",

            time:
                "09:50 WIB",

            image:
                "assets/images/card-openai.jpg",

            id:
                "ekonomi-digital-umkm"
        }

    ];


    /* =========================================================
       ELEMENT
       ========================================================= */

    const resultList =
        document.querySelector("#searchResultList");

    const resultInfo =
        document.querySelector("#resultInfo");

    const searchTitle =
        document.querySelector("#searchTitle");

    const searchCount =
        document.querySelector("#searchCount");

    const pagination =
        document.querySelector("#searchPagination");

    const sortSelect =
        document.querySelector("#sortSelect");


    /* =========================================================
       QUERY
       ========================================================= */

    const params =
        new URLSearchParams(window.location.search);

    const query =
        (params.get("q") || "").trim();


    const normalizedQuery =
        query.toLowerCase();


    /* =========================================================
       TOTAL HASIL
       ========================================================= */

    let totalResultCount =
        articles.length;


    if (
        normalizedQuery === "ekonomi"
        ||
        normalizedQuery === "ekonomi "
    ) {

        totalResultCount = 128;

    }


    /* =========================================================
       JUDUL
       ========================================================= */

    if (query) {

        searchTitle.textContent =
            `Hasil Pencarian untuk “${query}”`;

    } else {

        searchTitle.textContent =
            "Hasil Pencarian";

    }


    searchCount.textContent =
        `Ditemukan ${totalResultCount} hasil`;


    /* =========================================================
       FILTER
       ========================================================= */

    function filterArticles() {

        if (!normalizedQuery) {

            return [...articles];

        }


        return articles.filter(article => {

            const searchableText = (

                article.category
                + " "
                + article.title
                + " "
                + article.description

            ).toLowerCase();


            return searchableText.includes(
                normalizedQuery
            );

        });

    }


    /* =========================================================
       RENDER RESULT
       ========================================================= */

    const itemsPerPage = 5;

    let currentPage = 1;


    function renderResults() {

        let filtered =
            filterArticles();


        /* -----------------------------------------------------
           SORT
           ----------------------------------------------------- */

        const sort =
            sortSelect
                ? sortSelect.value
                : "terbaru";


        if (sort === "terlama") {

            filtered.reverse();

        }


        if (sort === "popular") {

            filtered.sort(
                (a, b) =>
                    a.title.length -
                    b.title.length
            );

        }


        const start =
            (currentPage - 1) *
            itemsPerPage;


        const end =
            start + itemsPerPage;


        const pageItems =
            filtered.slice(start, end);


        /* -----------------------------------------------------
           EMPTY
           ----------------------------------------------------- */

        if (!pageItems.length) {

            resultList.innerHTML = `

                <div class="search-empty">

                    <h2>
                        Tidak ada hasil
                    </h2>

                    <p>
                        Tidak ditemukan berita yang
                        sesuai dengan pencarian
                        "${query}".
                    </p>

                </div>

            `;

            resultInfo.textContent =
                "Tidak ada hasil yang ditemukan";

            pagination.innerHTML = "";

            return;

        }


        /* -----------------------------------------------------
           RESULT HTML
           ----------------------------------------------------- */

        resultList.innerHTML =
            pageItems.map(article => `

                <article
                    class="search-result-item">

                    <a
                        class="search-result-image"
                        href="artikel.html?id=${article.id}">

                        <img
                            src="${article.image}"
                            alt="${article.title}"
                            loading="lazy">

                    </a>


                    <div
                        class="search-result-body">

                        <span
                            class="search-result-category">

                            ${article.category}

                        </span>


                        <h2
                            class="search-result-title">

                            <a
                                href="artikel.html?id=${article.id}">

                                ${article.title}

                            </a>

                        </h2>


                        <p
                            class="search-result-description">

                            ${article.description}

                        </p>


                        <div
                            class="search-result-meta">

                            <span>
                                ${article.date}
                                ${article.time}
                            </span>

                            <span class="separator">
                                •
                            </span>

                            <span>
                                Redaksi MAB-News
                            </span>

                        </div>

                    </div>

                </article>

            `).join("");


        /* -----------------------------------------------------
           RESULT INFO
           ----------------------------------------------------- */

        const displayStart =
            start + 1;


        const displayEnd =
            Math.min(
                end,
                filtered.length
            );


        resultInfo.textContent =
            `Menampilkan ${displayStart}–${displayEnd} dari ${totalResultCount} hasil`;


        renderPagination(
            filtered.length
        );

    }


    /* =========================================================
       PAGINATION
       ========================================================= */

    function renderPagination(
        filteredLength
    ) {

        if (!pagination) return;


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    filteredLength /
                    itemsPerPage
                )
            );


        pagination.innerHTML = "";


        /* PREVIOUS */

        const previous =
            document.createElement("button");


        previous.type =
            "button";


        previous.className =
            "search-page-button";


        previous.textContent =
            "«";


        if (currentPage === 1) {

            previous.classList.add(
                "disabled"
            );

        }


        previous.addEventListener(
            "click",
            () => {

                if (
                    currentPage > 1
                ) {

                    currentPage--;

                    renderResults();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

            }
        );


        pagination.appendChild(
            previous
        );


        /* PAGE BUTTONS */

        const visiblePages =
            Math.min(
                totalPages,
                5
            );


        for (
            let page = 1;
            page <= visiblePages;
            page++
        ) {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "search-page-button";


            button.textContent =
                page;


            if (
                page === currentPage
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    currentPage =
                        page;

                    renderResults();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );


            pagination.appendChild(
                button
            );

        }


        /* DOTS */

        if (totalPages > 5) {

            const dots =
                document.createElement(
                    "span"
                );


            dots.className =
                "search-page-dots";


            dots.textContent =
                "…";


            pagination.appendChild(
                dots
            );


            const last =
                document.createElement(
                    "button"
                );


            last.type =
                "button";


            last.className =
                "search-page-button";


            last.textContent =
                totalPages;


            last.addEventListener(
                "click",
                () => {

                    currentPage =
                        totalPages;

                    renderResults();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );


            pagination.appendChild(
                last
            );

        }


        /* NEXT */

        const next =
            document.createElement(
                "button"
            );


        next.type =
            "button";


        next.className =
            "search-page-button";


        next.textContent =
            "»";


        if (
            currentPage >= totalPages
        ) {

            next.classList.add(
                "disabled"
            );

        }


        next.addEventListener(
            "click",
            () => {

                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    renderResults();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

            }
        );


        pagination.appendChild(
            next
        );

    }


    /* =========================================================
       SORT
       ========================================================= */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            () => {

                currentPage = 1;

                renderResults();

            }
        );

    }


    /* =========================================================
       RENDER AWAL
       ========================================================= */

    renderResults();

});