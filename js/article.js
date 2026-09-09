document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       DATABASE ARTIKEL
    ========================================================= */

    const articles = {

        /* =====================================================
           1. PEMERINTAH — DAYA BELI
        ===================================================== */

        "pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat": {

            category: "NASIONAL",

            title: "Pemerintah Siapkan Strategi Baru Jaga Daya Beli Masyarakat",

            lead: "Berbagai langkah disiapkan untuk menjaga konsumsi dan daya beli masyarakat di tengah perubahan kondisi ekonomi global.",

            date: "6 September 2026",

            time: "11:00 WIB",

            author: "MAB-News",

            image: "assets/images/hero.jpg",

            caption: "Ilustrasi aktivitas ekonomi dan daya beli masyarakat.",

            content: [

                "Pemerintah menyiapkan sejumlah strategi baru untuk menjaga daya beli masyarakat di tengah perubahan kondisi ekonomi global.",

                "Kebijakan tersebut diarahkan untuk menjaga konsumsi rumah tangga sekaligus memastikan aktivitas ekonomi tetap berjalan secara stabil.",

                "Pemerintah juga terus memantau perkembangan harga kebutuhan pokok dan kondisi pasar untuk memastikan masyarakat tetap memiliki akses terhadap barang dan jasa dengan harga yang terjangkau.",

                "Selain menjaga stabilitas harga, penguatan sektor usaha dan penciptaan lapangan kerja menjadi bagian penting dalam menjaga daya beli masyarakat.",

                "Pemerintah berharap berbagai kebijakan tersebut dapat membantu masyarakat menghadapi perubahan ekonomi sekaligus mendorong pertumbuhan ekonomi nasional."

            ]
        },


        /* =====================================================
           2. INFLASI
        ===================================================== */

        "inflasi-mei-2025-terkendali-di-level-2-4-persen": {

            category: "EKONOMI",

            title: "Inflasi Mei 2025 Terkendali di Level 2,4 Persen",

            lead: "Perkembangan inflasi nasional tetap terkendali dengan sejumlah komponen harga mengalami perubahan sepanjang Mei 2025.",

            date: "9 Juni 2025",

            time: "10:45 WIB",

            author: "MAB-News",

            image: "assets/images/card-market.jpg",

            caption: "Aktivitas perdagangan dan konsumen di pasar.",

            content: [

                "Perkembangan inflasi nasional tetap menjadi perhatian pemerintah dan pelaku ekonomi untuk menjaga stabilitas harga di tengah perubahan kondisi ekonomi.",

                "Sejumlah komponen harga mengalami perubahan sepanjang periode Mei 2025 dan turut memengaruhi perkembangan inflasi nasional.",

                "Pemerintah bersama otoritas terkait terus melakukan pemantauan terhadap harga kebutuhan pokok dan berbagai komoditas yang memiliki pengaruh terhadap masyarakat.",

                "Pengendalian harga menjadi salah satu faktor penting untuk menjaga daya beli masyarakat sekaligus mendukung stabilitas perekonomian.",

                "Ke depan, perkembangan inflasi akan terus dipantau untuk memastikan stabilitas harga tetap terjaga."

            ]
        },


        /* =====================================================
           3. AUSTRALIA
        ===================================================== */

        "australia-perketat-aturan-visa-untuk-pelajar-internasional": {

            category: "INTERNASIONAL",

            title: "Australia Perketat Aturan Visa untuk Pelajar Internasional",

            lead: "Pemerintah Australia memperbarui kebijakan visa bagi pelajar internasional sebagai bagian dari pengaturan sistem migrasi.",

            date: "8 Juni 2025",

            time: "10:15 WIB",

            author: "MAB-News",

            image: "assets/images/latest-port.jpg",

            caption: "Ilustrasi aktivitas internasional dan mobilitas masyarakat.",

            content: [

                "Pemerintah Australia memperbarui sejumlah kebijakan yang berkaitan dengan visa bagi pelajar internasional.",

                "Perubahan tersebut menjadi bagian dari upaya pemerintah Australia untuk mengatur sistem migrasi dan jumlah kedatangan penduduk dari luar negeri.",

                "Kebijakan visa menjadi salah satu perhatian penting bagi pelajar internasional yang berencana melanjutkan pendidikan di Australia.",

                "Perubahan aturan tersebut membuat calon pelajar perlu memperhatikan persyaratan terbaru sebelum mengajukan permohonan visa.",

                "Pemerintah Australia menyatakan bahwa kebijakan migrasi akan terus dievaluasi sesuai dengan kondisi dan kebutuhan negara."

            ]
        },


        /* =====================================================
           4. OPENAI / GPT-5
        ===================================================== */

        "openai-luncurkan-gpt-5-ini-fitur-terbarunya": {

            category: "TEKNOLOGI",

            title: "OpenAI Luncurkan GPT-5, Ini Fitur Terbarunya",

            lead: "Perkembangan kecerdasan buatan terus menjadi perhatian setelah hadirnya generasi terbaru model AI.",

            date: "7 Juni 2025",

            time: "09:50 WIB",

            author: "MAB-News",

            image: "assets/images/card-openai.jpg",

            caption: "Ilustrasi perkembangan teknologi kecerdasan buatan.",

            content: [

                "Perkembangan teknologi kecerdasan buatan terus mengalami perubahan dan semakin banyak digunakan dalam berbagai bidang.",

                "Model AI generasi terbaru menawarkan kemampuan yang semakin luas untuk membantu pengguna menyelesaikan berbagai pekerjaan.",

                "Teknologi tersebut dapat digunakan untuk membantu menghasilkan teks, menganalisis informasi, memahami instruksi, serta mendukung berbagai aktivitas produktivitas.",

                "Penggunaan AI juga mulai berkembang di lingkungan pendidikan, bisnis, teknologi, dan berbagai sektor lainnya.",

                "Meski memberikan banyak manfaat, penggunaan kecerdasan buatan tetap membutuhkan pengawasan manusia agar teknologi digunakan secara tepat dan bertanggung jawab."

            ]
        },


        /* =====================================================
           5. TIMNAS INDONESIA
        ===================================================== */

        "timnas-indonesia-siap-hadapi-china-di-kualifikasi-piala-dunia-2026": {

            category: "OLAHRAGA",

            title: "Timnas Indonesia Siap Hadapi China di Kualifikasi Piala Dunia 2026",

            lead: "Persiapan tim nasional Indonesia terus dilakukan menjelang pertandingan penting dalam kualifikasi Piala Dunia 2026.",

            date: "6 Juni 2025",

            time: "09:15 WIB",

            author: "MAB-News",

            image: "assets/images/card-police.jpg",

            caption: "Ilustrasi persiapan pertandingan sepak bola.",

            content: [

                "Tim nasional Indonesia terus melakukan persiapan menjelang pertandingan penting dalam rangkaian kualifikasi Piala Dunia 2026.",

                "Para pemain menjalani berbagai sesi latihan untuk meningkatkan kesiapan fisik, teknik, dan strategi permainan.",

                "Pertandingan menghadapi China menjadi salah satu laga yang mendapat perhatian besar dari masyarakat dan penggemar sepak bola Indonesia.",

                "Tim pelatih terus melakukan evaluasi terhadap permainan tim untuk menentukan strategi yang akan digunakan dalam pertandingan.",

                "Dukungan masyarakat diharapkan dapat menjadi motivasi tambahan bagi para pemain untuk memberikan penampilan terbaik."

            ]
        },


        /* =====================================================
           6. GAIKINDO / OTOMOTIF
        ===================================================== */

        "gaikindo-sebut-penjualan-mobil-2025-tumbuh-moderat": {

            category: "OTOMOTIF",

            title: "Gaikindo Sebut Penjualan Mobil 2025 Tumbuh Moderat",

            lead: "Industri otomotif nasional diperkirakan masih memiliki peluang pertumbuhan meski kondisi pasar menghadapi sejumlah tantangan.",

            date: "5 Juni 2025",

            time: "08:45 WIB",

            author: "MAB-News",

            image: "assets/images/card-auto.jpg",

            caption: "Ilustrasi aktivitas industri dan pasar otomotif.",

            content: [

                "Industri otomotif nasional terus melakukan penyesuaian menghadapi kondisi pasar dan perubahan kebutuhan konsumen.",

                "Penjualan kendaraan menjadi salah satu indikator penting untuk melihat perkembangan industri otomotif nasional.",

                "Pelaku industri juga menghadapi sejumlah tantangan, mulai dari kondisi ekonomi hingga perubahan preferensi konsumen.",

                "Perkembangan teknologi kendaraan dan meningkatnya perhatian terhadap efisiensi energi turut mendorong perubahan strategi produsen.",

                "Industri otomotif diharapkan tetap mampu menjaga pertumbuhan melalui inovasi produk serta peningkatan pelayanan kepada konsumen."

            ]
        },


        /* =====================================================
           7. AKTIVITAS GUNUNG API
        ===================================================== */

        "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada": {

            category: "NASIONAL",

            title: "Aktivitas Gunung Api Kembali Dipantau, Warga Diminta Tetap Waspada",

            lead: "Petugas terus memantau perkembangan aktivitas gunung api dan mengimbau masyarakat mengikuti informasi resmi.",

            date: "6 September 2026",

            time: "08:55 WIB",

            author: "MAB-News",

            image: "assets/images/latest-volcano.jpg",

            caption: "Aktivitas gunung api terus dipantau oleh petugas.",

            content: [

                "Petugas terus melakukan pemantauan terhadap aktivitas gunung api untuk mengetahui perkembangan kondisi terkini.",

                "Masyarakat yang berada di sekitar kawasan rawan diminta tetap memperhatikan informasi resmi dari pihak berwenang.",

                "Pemantauan dilakukan secara berkala untuk memastikan perubahan aktivitas dapat diketahui sedini mungkin.",

                "Petugas juga mengingatkan masyarakat agar tidak mudah mempercayai informasi yang belum memiliki sumber resmi.",

                "Masyarakat diminta tetap tenang namun meningkatkan kewaspadaan apabila terjadi perubahan aktivitas."

            ]
        },


        /* =====================================================
           8. ARUS LOGISTIK
        ===================================================== */

        "arus-logistik-nasional-terus-diperkuat-untuk-menekan-biaya-distribusi": {

            category: "EKONOMI",

            title: "Arus Logistik Nasional Terus Diperkuat untuk Menekan Biaya Distribusi",

            lead: "Pemerintah dan pelaku usaha menyiapkan sejumlah langkah untuk meningkatkan efisiensi distribusi barang.",

            date: "6 September 2026",

            time: "08:20 WIB",

            author: "MAB-News",

            image: "assets/images/latest-port.jpg",

            caption: "Aktivitas distribusi dan logistik melalui pelabuhan.",

            content: [

                "Penguatan sistem logistik nasional terus dilakukan untuk meningkatkan efisiensi distribusi barang.",

                "Biaya logistik menjadi salah satu faktor penting yang memengaruhi harga barang di berbagai wilayah.",

                "Pemerintah mendorong peningkatan konektivitas antardaerah serta penguatan infrastruktur distribusi.",

                "Pelaku usaha juga mulai memanfaatkan teknologi untuk memantau pergerakan barang dan meningkatkan efisiensi.",

                "Penguatan sistem logistik diharapkan dapat membantu menekan biaya distribusi dan menjaga stabilitas harga."

            ]
        },


        /* =====================================================
           9. FOKUS
        ===================================================== */

        "melihat-perubahan-besar-di-balik-berita-hari-ini": {

            category: "FOKUS",

            title: "Melihat Perubahan Besar di Balik Berita Hari Ini",

            lead: "Rangkuman konteks, data, dan perspektif yang membantu pembaca memahami berbagai isu secara lebih utuh.",

            date: "6 September 2026",

            time: "08:00 WIB",

            author: "MAB-News",

            image: "assets/images/focus.jpg",

            caption: "Ilustrasi rangkuman konteks, data, dan perspektif MAB-News.",

            content: [

                "Setiap berita memiliki konteks yang perlu dipahami agar informasi yang diterima pembaca tidak berhenti pada peristiwa yang terlihat di permukaan.",

                "MAB-News menghadirkan rangkuman berbagai perkembangan dengan memperhatikan fakta, data, dan perspektif yang relevan dengan isu yang sedang berlangsung.",

                "Pendekatan tersebut membantu pembaca melihat hubungan antara sebuah peristiwa dengan kondisi yang lebih luas, baik dalam bidang ekonomi, teknologi, sosial, maupun kehidupan masyarakat.",

                "Data menjadi bagian penting dalam memahami sebuah isu karena memberikan dasar yang lebih kuat dalam melihat perubahan dan perkembangan yang terjadi.",

                "Melalui rangkuman dan perspektif yang lebih utuh, MAB-News berupaya membantu pembaca memahami bukan hanya apa yang terjadi, tetapi juga konteks di balik sebuah berita."

            ]
        }

    };

    /* =========================================================
       AMBIL ID DARI URL
    ========================================================= */

    const params =
        new URLSearchParams(window.location.search);

    const articleId =
        params.get("id");


    /* =========================================================
       JIKA ID TIDAK DITEMUKAN
    ========================================================= */

    if (!articleId || !articles[articleId]) {

        window.location.href =
            "berita.html";

        return;
    }


    /* =========================================================
       AMBIL ARTIKEL
    ========================================================= */

    const article =
        articles[articleId];


    /* =========================================================
       ELEMENT HTML
    ========================================================= */

    const categoryElement =
        document.querySelector(".article-category");

    const titleElement =
        document.querySelector(".article-title");

    const leadElement =
        document.querySelector(".article-lead");

    const dateElement =
        document.querySelector(".article-date");

    const heroImage =
        document.querySelector(".article-hero img");

    const captionElement =
        document.querySelector(".article-hero figcaption");

    const bodyElement =
        document.querySelector(".article-body");

    const authorName =
        document.querySelector(".author-name");


    /* =========================================================
       TITLE BROWSER
    ========================================================= */

    document.title =
        `${article.title} — MAB-News`;


    /* =========================================================
       CATEGORY
    ========================================================= */

    if (categoryElement) {

        categoryElement.textContent =
            article.category;

    }


    /* =========================================================
       TITLE
    ========================================================= */

    if (titleElement) {

        titleElement.textContent =
            article.title;

    }


    /* =========================================================
       LEAD
    ========================================================= */

    if (leadElement) {

        leadElement.textContent =
            article.lead;

    }


    /* =========================================================
       AUTHOR
    ========================================================= */

    if (authorName) {

        authorName.innerHTML = `
            ${article.author}
            <span class="verified">✓</span>
        `;

    }


    /* =========================================================
       DATE
    ========================================================= */

    if (dateElement) {

        dateElement.textContent =
            `${article.date} • ${article.time} • 5 menit baca`;

    }


    /* =========================================================
       HERO IMAGE
    ========================================================= */

    if (heroImage) {

        heroImage.src =
            article.image;

        heroImage.alt =
            article.title;

    }


    /* =========================================================
       CAPTION
    ========================================================= */

    if (captionElement) {

        captionElement.textContent =
            article.caption;

    }


    /* =========================================================
       BODY ARTIKEL
    ========================================================= */

    if (bodyElement) {

        const articleParagraphs =
            article.content
                .map((paragraph, index) => {

                    if (index === 0) {

                        return `
                            <p>
                                <strong>MAB-News</strong> – ${paragraph}
                            </p>
                        `;

                    }

                    return `
                        <p>${paragraph}</p>
                    `;

                })
                .join("");


        const tags = `

            <div class="article-tags">

                <span class="tags-label">
                    TAGS:
                </span>

                <a href="kategori.html?kategori=${createSlug(article.category)}">
                    ${article.category}
                </a>

                <a href="berita.html">
                    MAB-News
                </a>

                <a href="berita.html">
                    Berita Terkini
                </a>

            </div>

        `;


        bodyElement.innerHTML =
            articleParagraphs + tags;

    }


    /* =========================================================
       BREADCRUMB
    ========================================================= */

    const breadcrumbLinks =
        document.querySelectorAll(
            ".article-breadcrumb a"
        );


    if (breadcrumbLinks.length >= 2) {

        const breadcrumbCategory =
            breadcrumbLinks[1];


        breadcrumbCategory.textContent =
            article.category;


        breadcrumbCategory.href =
            `kategori.html?kategori=${createSlug(article.category)}`;

    }


    /* =========================================================
       HELPER SLUG
    ========================================================= */

    function createSlug(text) {

        return String(text)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

    }


    /* =========================================================
       MENU MOBILE
    ========================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navInner =
        document.querySelector(".nav-inner");


    if (menuToggle && navInner) {

        menuToggle.addEventListener(
            "click",
            () => {

                navInner.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    /* =========================================================
       MODE GELAP
    ========================================================= */

    const headerIcons =
        document.querySelectorAll(
            ".header-icon"
        );


    if (headerIcons.length > 0) {

        const themeButton =
            headerIcons[0];


        themeButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark-preview"
                );


                const isDark =
                    document.body.classList.contains(
                        "dark-preview"
                    );


                themeButton.textContent =
                    isDark ? "☀" : "☾";

            }
        );

    }


    /* =========================================================
       SEARCH HEADER
    ========================================================= */

    const searchInput =
        document.querySelector(
            ".header-search input"
        );


    const searchButton =
        document.querySelector(
            ".header-search button"
        );


    function performSearch() {

        if (!searchInput) {
            return;
        }


        const query =
            searchInput.value.trim();


        if (!query) {
            return;
        }


        window.location.href =
            `search.html?q=${encodeURIComponent(query)}`;

    }


    searchButton?.addEventListener(
        "click",
        performSearch
    );


    searchInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );


    /* =========================================================
       SOCIAL SHARE
    ========================================================= */

    const currentUrl =
        encodeURIComponent(
            window.location.href
        );

    const currentTitle =
        encodeURIComponent(
            article.title
        );


    const shareLinks =
        document.querySelectorAll(
            ".article-share a"
        );


    if (shareLinks.length >= 3) {

        /* Facebook */

        shareLinks[0].href =
            `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

        shareLinks[0].target =
            "_blank";

        shareLinks[0].rel =
            "noopener noreferrer";


        /* X */

        shareLinks[1].href =
            `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;

        shareLinks[1].target =
            "_blank";

        shareLinks[1].rel =
            "noopener noreferrer";


        /* WhatsApp */

        shareLinks[2].href =
            `https://wa.me/?text=${currentTitle}%20${currentUrl}`;

        shareLinks[2].target =
            "_blank";

        shareLinks[2].rel =
            "noopener noreferrer";

    }


    /* =========================================================
       SAVE ARTICLE
    ========================================================= */

    const shareButtons =
        document.querySelectorAll(
            ".article-share button"
        );


    if (shareButtons.length >= 2) {

        const saveButton =
            shareButtons[1];


        saveButton.addEventListener(
            "click",
            () => {

                const saved =
                    localStorage.getItem(
                        `mabnews-saved-${articleId}`
                    );


                if (saved) {

                    localStorage.removeItem(
                        `mabnews-saved-${articleId}`
                    );

                    saveButton.textContent =
                        "🔖";

                    alert(
                        "Artikel dihapus dari simpanan."
                    );

                } else {

                    localStorage.setItem(
                        `mabnews-saved-${articleId}`,
                        "true"
                    );

                    saveButton.textContent =
                        "📌";

                    alert(
                        "Artikel berhasil disimpan."
                    );

                }

            }
        );


        if (
            localStorage.getItem(
                `mabnews-saved-${articleId}`
            )
        ) {

            saveButton.textContent =
                "📌";

        }

    }


    /* =========================================================
       ARTIKEL SEBELUMNYA / BERIKUTNYA
    ========================================================= */

    const articleIds = [

        "pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat",

        "inflasi-mei-2025-terkendali-di-level-2-4-persen",

        "australia-perketat-aturan-visa-untuk-pelajar-internasional",

        "openai-luncurkan-gpt-5-ini-fitur-terbarunya",

        "timnas-indonesia-siap-hadapi-china-di-kualifikasi-piala-dunia-2026",

        "gaikindo-sebut-penjualan-mobil-2025-tumbuh-moderat",

        "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada",

        "arus-logistik-nasional-terus-diperkuat-untuk-menekan-biaya-distribusi"

    ];


    const currentIndex =
        articleIds.indexOf(articleId);


    const previousLink =
        document.querySelector(
            ".article-nav-card.previous"
        );


    const nextLink =
        document.querySelector(
            ".article-nav-card.next"
        );


    /* =====================================================
       PREVIOUS
    ====================================================== */

    if (previousLink) {

        if (currentIndex > 0) {

            const previousId =
                articleIds[currentIndex - 1];

            const previousArticle =
                articles[previousId];


            previousLink.href =
                `artikel.html?id=${previousId}`;


            const title =
                previousLink.querySelector(
                    "strong"
                );


            if (title) {

                title.textContent =
                    previousArticle.title;

            }

        } else {

            previousLink.style.visibility =
                "hidden";

        }

    }


    /* =====================================================
       NEXT
    ====================================================== */

    if (nextLink) {

        if (
            currentIndex >= 0 &&
            currentIndex < articleIds.length - 1
        ) {

            const nextId =
                articleIds[currentIndex + 1];

            const nextArticle =
                articles[nextId];


            nextLink.href =
                `artikel.html?id=${nextId}`;


            const title =
                nextLink.querySelector(
                    "strong"
                );


            if (title) {

                title.textContent =
                    nextArticle.title;

            }

        } else {

            nextLink.style.visibility =
                "hidden";

        }

    }


    /* =========================================================
       POPULER
    ========================================================= */

    const popularItems =
        document.querySelectorAll(
            ".article-sidebar .popular-item"
        );


    const popularArticles = [

        "pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat",

        "inflasi-mei-2025-terkendali-di-level-2-4-persen",

        "timnas-indonesia-siap-hadapi-china-di-kualifikasi-piala-dunia-2026",

        "gaikindo-sebut-penjualan-mobil-2025-tumbuh-moderat",

        "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada"

    ];


    popularItems.forEach(
        (item, index) => {

            const id =
                popularArticles[index];


            if (!id || !articles[id]) {
                return;
            }


            item.href =
                `artikel.html?id=${id}`;


            const heading =
                item.querySelector("h3");


            if (heading) {

                heading.textContent =
                    articles[id].title;

            }

        }
    );


});
