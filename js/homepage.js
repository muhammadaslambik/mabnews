/* =========================================================
   MAB-NEWS — HOMEPAGE JS
   HERO CAROUSEL + SWIPE
   ========================================================= */


/* =========================================================
   HERO ELEMENT
   ========================================================= */

const heroElement =
    document.querySelector("#mainHero");

const heroTrack =
    document.querySelector("#heroTrack");

const heroPrev =
    document.querySelector("#heroPrev");

const heroNext =
    document.querySelector("#heroNext");

const heroDotsContainer =
    document.querySelector("#heroDots");


/* =========================================================
   DATA HERO
   ========================================================= */

const popularHeroNews = [

    {
        id:
            "pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat",

        category:
            "EKONOMI",

        title:
            "Pemerintah Siapkan Strategi Baru Jaga Daya Beli Masyarakat",

        lead:
            "Berbagai langkah disiapkan untuk menjaga konsumsi dan daya beli masyarakat di tengah perubahan kondisi ekonomi global.",

        image:
            "assets/images/pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    },

    {
        id:
            "perkembangan-ai-mendorong-perubahan-cara-kerja",

        category:
            "TEKNOLOGI",

        title:
            "Perkembangan AI Mendorong Perubahan Cara Kerja",

        lead:
            "Perkembangan kecerdasan buatan terus mengubah cara individu dan organisasi menyelesaikan pekerjaan serta mengolah informasi.",

        image:
            "assets/images/perkembangan-ai-mendorong-perubahan-cara-kerja.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    },

    {
        id:
            "aparat-perkuat-pengamanan-dan-pelayanan-publik",

        category:
            "NASIONAL",

        title:
            "Aparat Perkuat Pengamanan dan Pelayanan Publik",

        lead:
            "Aparat keamanan memperkuat pengamanan sekaligus meningkatkan pelayanan publik untuk memberikan rasa aman kepada masyarakat.",

        image:
            "assets/images/aparat-perkuat-pengamanan-dan-pelayanan-publik.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    },

    {
        id:
            "industri-otomotif-mulai-beradaptasi-dengan-tren-baru",

        category:
            "OTOMOTIF",

        title:
            "Industri Otomotif Mulai Beradaptasi dengan Tren Baru",

        lead:
            "Industri otomotif terus melakukan penyesuaian menghadapi perubahan teknologi, kebutuhan konsumen, dan perkembangan pasar.",

        image:
            "assets/images/industri-otomotif-mulai-beradaptasi-dengan-tren-baru.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    },

    {
        id:
            "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada",

        category:
            "NASIONAL",

        title:
            "Aktivitas Gunung Api Kembali Dipantau, Warga Diminta Tetap Waspada",

        lead:
            "Petugas terus memantau perkembangan aktivitas gunung api dan mengimbau masyarakat mengikuti informasi resmi.",

        image:
            "assets/images/aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada.jpg",

        date:
            "6 September 2026",

        author:
            "MAB-News"
    }

];


/* =========================================================
   STATE
   ========================================================= */

let currentHero = 0;

let heroAutoSlide = null;

let isHeroInteracting = false;

let heroScrollEndTimer = null;

let heroResizeTimer = null;


/* =========================================================
   BUAT SLIDE HERO
   ========================================================= */

function createHeroSlide(article) {

    const slide =
        document.createElement("div");

    slide.className =
        "hero-slide";


    slide.innerHTML = `

        <a
            class="hero-slide-image-link"
            href="artikel.html?id=${article.id}"
            draggable="false"
        >

            <img
                class="hero-slide-image"
                src="${article.image}"
                alt="${article.title}"
                draggable="false"
            >

        </a>


        <div class="hero-slide-overlay">

            <div class="hero-slide-category">
                ${article.category}
            </div>


            <h1 class="hero-slide-title">

                <a
                    href="artikel.html?id=${article.id}"
                >
                    ${article.title}
                </a>

            </h1>


            <p class="hero-slide-lead">
                ${article.lead}
            </p>


            <div class="hero-slide-meta">

                <span>
                    ${article.date}
                </span>

                <span>•</span>

                <span>
                    ${article.author}
                </span>

            </div>

        </div>
    `;


    return slide;
}


/* =========================================================
   RENDER HERO
   ========================================================= */

function renderHero() {

    if (!heroTrack) {
        return;
    }


    heroTrack.innerHTML = "";


    popularHeroNews.forEach(
        (article) => {

            const slide =
                createHeroSlide(article);

            heroTrack.appendChild(slide);

        }
    );


    renderHeroDots();

    goToHero(0, false);

}


/* =========================================================
   RENDER DOTS
   ========================================================= */

function renderHeroDots() {

    if (!heroDotsContainer) {
        return;
    }


    heroDotsContainer.innerHTML = "";


    popularHeroNews.forEach(
        (article, index) => {

            const button =
                document.createElement("button");

            button.type =
                "button";

            button.setAttribute(
                "aria-label",
                `Berita ${index + 1}`
            );


            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    goToHero(
                        index,
                        true
                    );

                }
            );


            heroDotsContainer.appendChild(
                button
            );

        }
    );


    updateHeroDots();

}


/* =========================================================
   UPDATE DOTS
   ========================================================= */

function updateHeroDots() {

    if (!heroDotsContainer) {
        return;
    }


    const dots =
        heroDotsContainer.querySelectorAll(
            "button"
        );


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "selected",
                index === currentHero
            );

        }
    );

}


/* =========================================================
   NORMALISASI INDEX
   ========================================================= */

function normalizeHeroIndex(index) {

    const total =
        popularHeroNews.length;


    if (!total) {
        return 0;
    }


    if (index < 0) {
        return total - 1;
    }


    if (index >= total) {
        return 0;
    }


    return index;
}


/* =========================================================
   PINDAH HERO

   Memakai native horizontal scroll (persis seperti strip
   navigasi kategori) — jadi geser 2 jari di trackpad, swipe
   di layar sentuh, maupun shift+scroll mouse, semuanya
   otomatis langsung ditangani browser tanpa simulasi JS,
   sehingga responsifnya sama seperti scroll bawaan browser.
   ========================================================= */

function goToHero(
    index,
    animate = true,
    restartTimer = true
) {

    if (!heroTrack) {
        return;
    }


    currentHero =
        normalizeHeroIndex(index);


    heroTrack.scrollTo({
        left:
            currentHero *
            heroTrack.clientWidth,
        behavior:
            animate ? "smooth" : "auto"
    });


    updateHeroDots();


    if (restartTimer) {

        resetHeroAutoSlide();

    }

}


/* =========================================================
   NEXT
   ========================================================= */

function showNextHero() {

    goToHero(
        currentHero + 1,
        true
    );

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function showPreviousHero() {

    goToHero(
        currentHero - 1,
        true
    );

}


/* =========================================================
   TOMBOL PREV
   ========================================================= */

if (heroPrev) {

    heroPrev.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            showPreviousHero();

        }
    );

}


/* =========================================================
   TOMBOL NEXT
   ========================================================= */

if (heroNext) {

    heroNext.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            showNextHero();

        }
    );

}


/* =========================================================
   SINKRONKAN INDEX SAAT USER SCROLL SENDIRI
   (geser 2 jari trackpad, swipe layar sentuh, dst.)
   ========================================================= */

if (heroTrack) {

    heroTrack.addEventListener(
        "scroll",
        () => {

            isHeroInteracting = true;

            clearInterval(
                heroAutoSlide
            );


            /*
             * Update dot SEKARANG JUGA, mengikuti
             * posisi scroll saat ini secara langsung
             * (live), tanpa menunggu scroll berhenti.
             */

            const width =
                heroTrack.clientWidth ||
                1;

            const liveIndex =
                normalizeHeroIndex(
                    Math.round(
                        heroTrack.scrollLeft /
                        width
                    )
                );

            if (liveIndex !== currentHero) {

                currentHero = liveIndex;

                updateHeroDots();

            }


            /*
             * Debounce ini hanya dipakai untuk tahu
             * kapan scroll benar-benar berhenti —
             * supaya auto-slide bisa dijalankan lagi.
             * Tidak lagi menunda update dot.
             */

            clearTimeout(
                heroScrollEndTimer
            );

            heroScrollEndTimer =
                setTimeout(
                    () => {

                        isHeroInteracting = false;

                        startHeroAutoSlide();

                    },
                    100
                );

        },
        {
            passive:true
        }
    );

}


/* =========================================================
   AUTO SLIDE
   ========================================================= */

function startHeroAutoSlide() {

    clearInterval(
        heroAutoSlide
    );


    heroAutoSlide =
        setInterval(
            () => {

                if (isHeroInteracting) {
                    return;
                }


                showNextHero();

            },
            10000
        );

}


/* =========================================================
   RESET AUTO SLIDE
   ========================================================= */

function resetHeroAutoSlide() {

    startHeroAutoSlide();

}


/* =========================================================
   PAUSE MOUSE DESKTOP
   ========================================================= */

if (heroElement) {

    heroElement.addEventListener(
        "mouseenter",
        () => {

            clearInterval(
                heroAutoSlide
            );

        }
    );


    heroElement.addEventListener(
        "mouseleave",
        () => {

            if (!isHeroInteracting) {

                startHeroAutoSlide();

            }

        }
    );

}


/* =========================================================
   RAPIKAN POSISI SAAT UKURAN LAYAR BERUBAH
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            heroResizeTimer
        );

        heroResizeTimer =
            setTimeout(
                () => {

                    goToHero(
                        currentHero,
                        false,
                        false
                    );

                },
                150
            );

    }
);



/* =========================================================
   FOCUS DOTS
   ========================================================= */

document
    .querySelectorAll(
        ".focus-card .dots button"
    )
    .forEach(
        (dot) => {

            dot.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".focus-card .dots button"
                        )
                        .forEach(
                            (d) => {

                                d.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    dot.classList.add(
                        "selected"
                    );

                }
            );

        }
    );


/* =========================================================
   BERITA UTAMA
   ========================================================= */

const mainNewsButton =
    document.querySelector(
        "#changeMainNews"
    );

const mainNewsCards =
    document.querySelectorAll(
        ".top-cards .news-card"
    );


/* =========================================================
   DATA KELOMPOK BERITA UTAMA
   ========================================================= */

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
                "assets/images/pasar-dan-konsumen-menghadapi-perubahan-baru.jpg",

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
                "assets/images/aparat-perkuat-pengamanan-dan-pelayanan-publik.jpg",

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
                "assets/images/perkembangan-ai-mendorong-perubahan-cara-kerja.jpg",

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
                "assets/images/industri-otomotif-mulai-beradaptasi-dengan-tren-baru.jpg",

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
                "assets/images/aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada.jpg",

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
                "assets/images/arus-logistik-nasional-terus-diperkuat-untuk-menekan-biaya-distribusi.jpg",

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
                "assets/images/inflasi-mei-2025-terkendali-di-level-2-4-persen.jpg",

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
                "assets/images/australia-perketat-aturan-visa-untuk-pelajar-internasional.jpg",

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
                "assets/images/timnas-indonesia-siap-hadapi-china-di-kualifikasi-piala-dunia-2026.jpg",

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
                "assets/images/gaikindo-sebut-penjualan-mobil-2025-tumbuh-moderat.jpg",

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
                "assets/images/melihat-perubahan-besar-di-balik-berita-hari-ini.jpg",

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
                "assets/images/pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat.jpg",

            alt:
                "Pemerintah",

            date:
                "6 Sep 2026 · 11:00"
        }

    ]

];


let currentGroup = 0;


/* =========================================================
   UPDATE BERITA UTAMA
   ========================================================= */

function updateMainNews(groupIndex) {

    const group =
        newsGroups[groupIndex];

    if (!group) {
        return;
    }


    mainNewsCards.forEach(
        (card, index) => {

            const article =
                group[index];

            if (!article) {
                return;
            }


            /* ---------------------------------------------
               LINK GAMBAR
               --------------------------------------------- */

            const imageLink =
                card.querySelector(
                    ":scope > a"
                );

            if (imageLink) {

                imageLink.href =
                    `artikel.html?id=${article.id}`;

            }


            /* ---------------------------------------------
               GAMBAR
               --------------------------------------------- */

            const image =
                card.querySelector("img");

            if (image) {

                image.src =
                    article.image;

                image.alt =
                    article.alt;

            }


            /* ---------------------------------------------
               KATEGORI
               --------------------------------------------- */

            const category =
                card.querySelector(
                    ".category"
                );

            if (category) {

                category.textContent =
                    article.category;

            }


            /* ---------------------------------------------
               JUDUL
               --------------------------------------------- */

            const titleLink =
                card.querySelector(
                    "h3 a"
                );

            if (titleLink) {

                titleLink.href =
                    `artikel.html?id=${article.id}`;

                titleLink.textContent =
                    article.title;

            }


            /* ---------------------------------------------
               TANGGAL
               --------------------------------------------- */

            const time =
                card.querySelector("time");

            if (time) {

                time.textContent =
                    article.date;

            }

        }
    );


    /* =====================================================
       UPDATE TOMBOL
       ===================================================== */

    if (mainNewsButton) {

        if (
            groupIndex ===
            newsGroups.length - 1
        ) {

            mainNewsButton.innerHTML =
                'Kembali ke Berita Awal <b>↻</b>';

        }
        else {

            mainNewsButton.innerHTML =
                'Ganti Berita Lainnya <b>↻</b>';

        }

    }

}


/* =========================================================
   KLIK GANTI BERITA
   ========================================================= */

if (mainNewsButton) {

    mainNewsButton.addEventListener(
        "click",
        () => {

            currentGroup++;

            if (
                currentGroup >=
                newsGroups.length
            ) {

                currentGroup = 0;

            }

            updateMainNews(
                currentGroup
            );

        }
    );

}


/* =========================================================
   INISIALISASI HERO
   ========================================================= */

renderHero();

startHeroAutoSlide();


/* =========================================================
   INISIALISASI BERITA UTAMA
   ========================================================= */

updateMainNews(0);
