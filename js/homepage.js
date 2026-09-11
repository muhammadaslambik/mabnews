/* =========================================================
   HERO SLIDER
   BERITA TERPOPULER
   ========================================================= */

const heroImageLink =
    document.querySelector("#heroImageLink");

const heroImage =
    document.querySelector("#heroImage");

const heroCategory =
    document.querySelector("#heroCategory");

const heroTitleLink =
    document.querySelector("#heroTitleLink");

const heroLead =
    document.querySelector("#heroLead");

const heroDate =
    document.querySelector("#heroDate");

const heroAuthor =
    document.querySelector("#heroAuthor");

const heroPrev =
    document.querySelector("#heroPrev");

const heroNext =
    document.querySelector("#heroNext");

const heroDots =
    document.querySelectorAll("#heroDots button");


/* =========================================================
   DATA BERITA TERPOPULER
   ========================================================= */

const popularHeroNews = [

    {
        id: "pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat",

        category: "EKONOMI",

        title:
            "Pemerintah Siapkan Strategi Baru Jaga Daya Beli Masyarakat",

        lead:
            "Berbagai langkah disiapkan untuk menjaga konsumsi dan daya beli masyarakat di tengah perubahan kondisi ekonomi global.",

        image:
            "assets/images/hero.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    },


    {
        id: "perkembangan-ai-mendorong-perubahan-cara-kerja",

        category: "TEKNOLOGI",

        title:
            "Perkembangan AI Mendorong Perubahan Cara Kerja",

        lead:
            "Perkembangan kecerdasan buatan terus mengubah cara individu dan organisasi menyelesaikan pekerjaan serta mengolah informasi.",

        image:
            "assets/images/card-openai.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    },


    {
        id: "aparat-perkuat-pengamanan-dan-pelayanan-publik",

        category: "NASIONAL",

        title:
            "Aparat Perkuat Pengamanan dan Pelayanan Publik",

        lead:
            "Aparat keamanan memperkuat pengamanan sekaligus meningkatkan pelayanan publik untuk memberikan rasa aman kepada masyarakat.",

        image:
            "assets/images/card-police.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    },


    {
        id: "industri-otomotif-mulai-beradaptasi-dengan-tren-baru",

        category: "OTOMOTIF",

        title:
            "Industri Otomotif Mulai Beradaptasi dengan Tren Baru",

        lead:
            "Industri otomotif terus melakukan penyesuaian menghadapi perubahan teknologi, kebutuhan konsumen, dan perkembangan pasar.",

        image:
            "assets/images/card-auto.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    },


    {
        id: "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada",

        category: "NASIONAL",

        title:
            "Aktivitas Gunung Api Kembali Dipantau, Warga Diminta Tetap Waspada",

        lead:
            "Petugas terus memantau perkembangan aktivitas gunung api dan mengimbau masyarakat mengikuti informasi resmi.",

        image:
            "assets/images/latest-volcano.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    }

];


/* =========================================================
   SLIDE AKTIF
   ========================================================= */

let currentHero = 0;


/* =========================================================
   UPDATE HERO
   ========================================================= */

function updateHero(index) {

    const article =
        popularHeroNews[index];

    if (!article) {
        return;
    }


    /* -----------------------------------------------------
       LINK GAMBAR
    ----------------------------------------------------- */

    if (heroImageLink) {

        heroImageLink.href =
            `artikel.html?id=${article.id}`;

    }


    /* -----------------------------------------------------
       GAMBAR
    ----------------------------------------------------- */

    if (heroImage) {

        heroImage.src =
            article.image;

        heroImage.alt =
            article.title;

    }


    /* -----------------------------------------------------
       KATEGORI
    ----------------------------------------------------- */

    if (heroCategory) {

        heroCategory.textContent =
            article.category;

    }


    /* -----------------------------------------------------
       JUDUL
    ----------------------------------------------------- */

    if (heroTitleLink) {

        heroTitleLink.href =
            `artikel.html?id=${article.id}`;

        heroTitleLink.textContent =
            article.title;

    }


    /* -----------------------------------------------------
       LEAD
    ----------------------------------------------------- */

    if (heroLead) {

        heroLead.textContent =
            article.lead;

    }


    /* -----------------------------------------------------
       TANGGAL
    ----------------------------------------------------- */

    if (heroDate) {

        heroDate.textContent =
            article.date;

    }


    /* -----------------------------------------------------
       PENULIS
    ----------------------------------------------------- */

    if (heroAuthor) {

        heroAuthor.textContent =
            article.author;

    }


    /* -----------------------------------------------------
       DOTS
    ----------------------------------------------------- */

    heroDots.forEach((dot, dotIndex) => {

        dot.classList.toggle(
            "selected",
            dotIndex === index
        );

    });

}


/* =========================================================
   FUNGSI HERO BERIKUTNYA
   ========================================================= */

function nextHero() {

    currentHero++;

    if (
        currentHero >=
        popularHeroNews.length
    ) {

        currentHero = 0;

    }

    updateHero(currentHero);

}


/* =========================================================
   FUNGSI HERO SEBELUMNYA
   ========================================================= */

function prevHero() {

    currentHero--;

    if (currentHero < 0) {

        currentHero =
            popularHeroNews.length - 1;

    }

    updateHero(currentHero);

}


/* =========================================================
   TOMBOL SEBELUMNYA
   ========================================================= */

if (heroPrev) {

    heroPrev.addEventListener("click", (event) => {

        event.preventDefault();

        prevHero();

        resetHeroAutoSlide();

    });

}


/* =========================================================
   TOMBOL BERIKUTNYA
   ========================================================= */

if (heroNext) {

    heroNext.addEventListener("click", (event) => {

        event.preventDefault();

        nextHero();

        resetHeroAutoSlide();

    });

}


/* =========================================================
   KLIK DOT HERO
   ========================================================= */

heroDots.forEach((dot, index) => {

    dot.addEventListener("click", (event) => {

        event.preventDefault();

        currentHero = index;

        updateHero(currentHero);

        resetHeroAutoSlide();

    });

});


/* =========================================================
   SWIPE HERO MOBILE
   GESER KIRI / KANAN PADA GAMBAR
   ========================================================= */

const heroSwipeArea =
    document.querySelector("#heroImageLink");


let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;


const swipeThreshold = 50;


if (heroSwipeArea) {

    heroSwipeArea.addEventListener(
        "touchstart",
        (event) => {

            if (!event.touches || !event.touches.length) {
                return;
            }

            touchStartX =
                event.touches[0].clientX;

            touchStartY =
                event.touches[0].clientY;

            touchEndX =
                touchStartX;

            touchEndY =
                touchStartY;

        },
        {
            passive: true
        }
    );


    heroSwipeArea.addEventListener(
        "touchmove",
        (event) => {

            if (!event.touches || !event.touches.length) {
                return;
            }

            touchEndX =
                event.touches[0].clientX;

            touchEndY =
                event.touches[0].clientY;

        },
        {
            passive: true
        }
    );


    heroSwipeArea.addEventListener(
        "touchend",
        () => {

            const deltaX =
                touchEndX - touchStartX;

            const deltaY =
                touchEndY - touchStartY;


            /* -------------------------------------------------
               Hanya dianggap swipe jika gerakan horizontal
               lebih besar daripada gerakan vertikal.
            ------------------------------------------------- */

            if (
                Math.abs(deltaX) <
                swipeThreshold
            ) {
                return;
            }


            if (
                Math.abs(deltaX) <=
                Math.abs(deltaY)
            ) {
                return;
            }


            /* -------------------------------------------------
               Geser kiri
               → artikel berikutnya
            ------------------------------------------------- */

            if (deltaX < 0) {

                nextHero();

            }


            /* -------------------------------------------------
               Geser kanan
               → artikel sebelumnya
            ------------------------------------------------- */

            else {

                prevHero();

            }


            resetHeroAutoSlide();

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   FOCUS DOTS
   ========================================================= */

document
    .querySelectorAll(".focus-card .dots button")
    .forEach((dot) => {

        dot.addEventListener("click", () => {

            document
                .querySelectorAll(
                    ".focus-card .dots button"
                )
                .forEach(d =>
                    d.classList.remove("selected")
                );

            dot.classList.add("selected");

        });

    });


/* =========================================================
   BERITA UTAMA
   GANTI BERITA LAINNYA
   ========================================================= */

const mainNewsButton =
    document.querySelector("#changeMainNews");

const mainNewsCards =
    document.querySelectorAll(
        ".top-cards .news-card"
    );


const newsGroups = [


    /* =====================================================
       KELOMPOK 1
    ===================================================== */

    [

        {
            id:
                "pasar-dan-konsumen-menghadapi-perubahan-baru",

            category:
                "EKONOMI",

            title:
                "Pasar dan Konsumen Menghadapi Perubahan Baru",

            image:
                "assets/images/card-market.jpg",

            alt:
                "Pasar dan Konsumen",

            date:
                "6 Sep 2026 · 10:45"
        },


        {
            id:
                "aparat-perkuat-pengamanan-dan-pelayanan-publik",

            category:
                "NASIONAL",

            title:
                "Aparat Perkuat Pengamanan dan Pelayanan Publik",

            image:
                "assets/images/card-police.jpg",

            alt:
                "Aparat dan Pelayanan Publik",

            date:
                "6 Sep 2026 · 10:18"
        },


        {
            id:
                "perkembangan-ai-mendorong-perubahan-cara-kerja",

            category:
                "TEKNOLOGI",

            title:
                "Perkembangan AI Mendorong Perubahan Cara Kerja",

            image:
                "assets/images/card-openai.jpg",

            alt:
                "Perkembangan AI",

            date:
                "6 Sep 2026 · 09:50"
        },


        {
            id:
                "industri-otomotif-mulai-beradaptasi-dengan-tren-baru",

            category:
                "OTOMOTIF",

            title:
                "Industri Otomotif Mulai Beradaptasi dengan Tren Baru",

            image:
                "assets/images/card-auto.jpg",

            alt:
                "Industri Otomotif",

            date:
                "6 Sep 2026 · 09:24"
        }

    ],


    /* =====================================================
       KELOMPOK 2
    ===================================================== */

    [

        {
            id:
                "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada",

            category:
                "NASIONAL",

            title:
                "Aktivitas Gunung Api Kembali Dipantau, Warga Diminta Tetap Waspada",

            image:
                "assets/images/latest-volcano.jpg",

            alt:
                "Aktivitas Gunung Api",

            date:
                "6 Sep 2026 · 08:55"
        },


        {
            id:
                "arus-logistik-nasional-terus-diperkuat-untuk-menekan-biaya-distribusi",

            category:
                "EKONOMI",

            title:
                "Arus Logistik Nasional Terus Diperkuat untuk Menekan Biaya Distribusi",

            image:
                "assets/images/latest-port.jpg",

            alt:
                "Arus Logistik Nasional",

            date:
                "6 Sep 2026 · 08:20"
        },


        {
            id:
                "inflasi-mei-2025-terkendali-di-level-2-4-persen",

            category:
                "EKONOMI",

            title:
                "Inflasi Mei 2025 Terkendali di Level 2,4 Persen",

            image:
                "assets/images/card-market.jpg",

            alt:
                "Inflasi",

            date:
                "9 Jun 2025 · 10:45"
        },


        {
            id:
                "australia-perketat-aturan-visa-untuk-pelajar-internasional",

            category:
                "INTERNASIONAL",

            title:
                "Australia Perketat Aturan Visa untuk Pelajar Internasional",

            image:
                "assets/images/latest-port.jpg",

            alt:
                "Australia",

            date:
                "8 Jun 2025 · 10:15"
        }

    ],


    /* =====================================================
       KELOMPOK 3
    ===================================================== */

    [

        {
            id:
                "timnas-indonesia-siap-hadapi-china-di-kualifikasi-piala-dunia-2026",

            category:
                "OLAHRAGA",

            title:
                "Timnas Indonesia Siap Hadapi China di Kualifikasi Piala Dunia 2026",

            image:
                "assets/images/card-police.jpg",

            alt:
                "Timnas Indonesia",

            date:
                "6 Jun 2025 · 09:15"
        },


        {
            id:
                "gaikindo-sebut-penjualan-mobil-2025-tumbuh-moderat",

            category:
                "OTOMOTIF",

            title:
                "Gaikindo Sebut Penjualan Mobil 2025 Tumbuh Moderat",

            image:
                "assets/images/card-auto.jpg",

            alt:
                "Gaikindo",

            date:
                "5 Jun 2025 · 08:45"
        },


        {
            id:
                "melihat-perubahan-besar-di-balik-berita-hari-ini",

            category:
                "FOKUS",

            title:
                "Melihat Perubahan Besar di Balik Berita Hari Ini",

            image:
                "assets/images/focus.jpg",

            alt:
                "Fokus MAB-News",

            date:
                "6 Sep 2026 · 08:00"
        },


        {
            id:
                "pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat",

            category:
                "EKONOMI",

            title:
                "Pemerintah Siapkan Strategi Baru Jaga Daya Beli Masyarakat",

            image:
                "assets/images/hero.jpg",

            alt:
                "Pemerintah",

            date:
                "6 Sep 2026 · 11:00"
        }

    ]

];


let currentGroup =
    0;


/* =========================================================
   UPDATE BERITA UTAMA
   ========================================================= */

function updateMainNews(groupIndex) {

    const group =
        newsGroups[groupIndex];

    if (!group) {
        return;
    }


    mainNewsCards.forEach((card, index) => {

        const article =
            group[index];

        if (!article) {
            return;
        }


        const imageLink =
            card.querySelector(":scope > a");


        if (imageLink) {

            imageLink.href =
                `artikel.html?id=${article.id}`;

        }


        const image =
            card.querySelector("img");


        if (image) {

            image.src =
                article.image;

            image.alt =
                article.alt;

        }


        const category =
            card.querySelector(".category");


        if (category) {

            category.textContent =
                article.category;

        }


        const titleLink =
            card.querySelector("h3 a");


        if (titleLink) {

            titleLink.href =
                `artikel.html?id=${article.id}`;

            titleLink.textContent =
                article.title;

        }


        const time =
            card.querySelector("time");


        if (time) {

            time.textContent =
                article.date;

        }

    });


    if (mainNewsButton) {

        if (
            groupIndex ===
            newsGroups.length - 1
        ) {

            mainNewsButton.innerHTML =
                `Kembali ke Berita Awal <b>↻</b>`;

        } else {

            mainNewsButton.innerHTML =
                `Ganti Berita Lainnya <b>↻</b>`;

        }

    }

}


/* =========================================================
   KLIK GANTI BERITA
   ========================================================= */

if (mainNewsButton) {

    mainNewsButton.addEventListener("click", () => {

        currentGroup++;

        if (
            currentGroup >=
            newsGroups.length
        ) {

            currentGroup = 0;

        }

        updateMainNews(currentGroup);

    });

}


/* =========================================================
   INISIALISASI HERO
   ========================================================= */

updateHero(0);


/* =========================================================
   AUTO SLIDE HERO
   GANTI BERITA SETIAP 10 DETIK
   ========================================================= */

let heroAutoSlide = null;


/* =========================================================
   MULAI AUTO SLIDE
   ========================================================= */

function startHeroAutoSlide() {

    clearInterval(heroAutoSlide);

    heroAutoSlide = setInterval(() => {

        nextHero();

    }, 10000);

}


/* =========================================================
   RESET AUTO SLIDE
   ========================================================= */

function resetHeroAutoSlide() {

    startHeroAutoSlide();

}


/* =========================================================
   PAUSE SAAT MOUSE BERADA DI HERO
   ========================================================= */

const heroElement =
    document.querySelector("#mainHero");


if (heroElement) {

    heroElement.addEventListener("mouseenter", () => {

        clearInterval(heroAutoSlide);

    });


    heroElement.addEventListener("mouseleave", () => {

        startHeroAutoSlide();

    });

}


/* =========================================================
   MULAI TIMER PERTAMA
   ========================================================= */

startHeroAutoSlide();
