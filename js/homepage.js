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
            "assets/images/hero.jpg",

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
            "assets/images/card-openai.jpg",

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
            "assets/images/card-police.jpg",

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
            "assets/images/card-auto.jpg",

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
            "assets/images/latest-volcano.jpg",

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

let isDraggingHero = false;

let touchStartX = 0;

let touchStartY = 0;

let currentDragX = 0;

let heroStartOffset = 0;

let heroDragOffset = 0;

let heroMoved = false;

const SWIPE_THRESHOLD = 50;


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

    setHeroPosition(false);

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
   HITUNG OFFSET
   ========================================================= */

function getHeroBaseOffset() {

    return -(currentHero * 100);

}


/* =========================================================
   SET POSISI HERO
   ========================================================= */

function setHeroPosition(animate = true) {

    if (!heroTrack) {
        return;
    }


    heroTrack.style.transition =
        animate
            ? "transform 0.28s cubic-bezier(.22,.61,.36,1)"
            : "none";


    heroTrack.style.transform =
        `translate3d(${getHeroBaseOffset()}%, 0, 0)`;


    heroDragOffset = 0;

}


/* =========================================================
   POSISI SAAT DRAG
   ========================================================= */

function setHeroDragPosition(deltaX) {

    if (!heroTrack) {
        return;
    }


    const width =
        heroElement
            ? heroElement.clientWidth
            : 1;


    if (!width) {
        return;
    }


    const deltaPercent =
        (deltaX / width) * 100;


    const position =
        getHeroBaseOffset() +
        deltaPercent;


    heroTrack.style.transition =
        "none";


    heroTrack.style.transform =
        `translate3d(${position}%, 0, 0)`;

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
   ========================================================= */

function goToHero(
    index,
    restartTimer = true
) {

    currentHero =
        normalizeHeroIndex(index);


    setHeroPosition(true);

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
   TOUCH START
   ========================================================= */

if (heroTrack) {

    heroTrack.addEventListener(
        "touchstart",
        (event) => {

            if (
                !event.touches ||
                !event.touches.length
            ) {
                return;
            }


            const touch =
                event.touches[0];


            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

            currentDragX =
                touch.clientX;

            heroStartOffset =
                getHeroBaseOffset();

            heroDragOffset = 0;

            heroMoved = false;

            isDraggingHero = true;


            heroTrack.classList.add(
                "dragging"
            );


            /*
             * Saat jari mulai menyentuh,
             * hentikan auto slide.
             */

            clearInterval(
                heroAutoSlide
            );


            heroTrack.style.transition =
                "none";

        },
        {
            passive:true
        }
    );


    /* =====================================================
       TOUCH MOVE
       ===================================================== */

    heroTrack.addEventListener(
        "touchmove",
        (event) => {

            if (
                !isDraggingHero ||
                !event.touches ||
                !event.touches.length
            ) {
                return;
            }


            const touch =
                event.touches[0];


            currentDragX =
                touch.clientX;


            const currentY =
                touch.clientY;


            const deltaX =
                currentDragX -
                touchStartX;


            const deltaY =
                currentY -
                touchStartY;


            /*
             * Jika gerakan lebih vertikal,
             * biarkan browser melakukan scroll.
             */

            if (
                !heroMoved &&
                Math.abs(deltaY) >
                Math.abs(deltaX) &&
                Math.abs(deltaY) > 8
            ) {

                isDraggingHero = false;

                heroTrack.classList.remove(
                    "dragging"
                );

                setHeroPosition(true);

                startHeroAutoSlide();

                return;

            }


            /*
             * Mulai dianggap horizontal
             * setelah bergerak minimal.
             */

            if (
                Math.abs(deltaX) > 5 &&
                Math.abs(deltaX) >
                Math.abs(deltaY)
            ) {

                heroMoved = true;

            }


            if (heroMoved) {

                /*
                 * INI YANG MEMBUAT SLIDE
                 * BENAR-BENAR MENGIKUTI JARI.
                 *
                 * Misalnya artikel 1 digeser
                 * 50% ke kiri,
                 * artikel 2 otomatis terlihat 50%.
                 */

                setHeroDragPosition(
                    deltaX
                );

            }

        },
        {
            passive:true
        }
    );


    /* =====================================================
       TOUCH END
       ===================================================== */

    heroTrack.addEventListener(
        "touchend",
        () => {

            if (!isDraggingHero) {
                return;
            }


            isDraggingHero = false;


            heroTrack.classList.remove(
                "dragging"
            );


            const deltaX =
                currentDragX -
                touchStartX;


            /*
             * Kalau tidak benar-benar
             * horizontal swipe,
             * kembalikan posisi.
             */

            if (
                !heroMoved ||
                Math.abs(deltaX) <
                SWIPE_THRESHOLD
            ) {

                setHeroPosition(true);

                startHeroAutoSlide();

                return;

            }


            /*
             * SWIPE KIRI
             *
             * Artikel berikutnya.
             */

            if (deltaX < 0) {

                currentHero =
                    normalizeHeroIndex(
                        currentHero + 1
                    );

            }


            /*
             * SWIPE KANAN
             *
             * Artikel sebelumnya.
             */

            else {

                currentHero =
                    normalizeHeroIndex(
                        currentHero - 1
                    );

            }


            /*
             * Setelah jari dilepas,
             * slide langsung menyelesaikan
             * perpindahannya.
             */

            setHeroPosition(true);

            updateHeroDots();

            startHeroAutoSlide();

        },
        {
            passive:true
        }
    );


    /* =====================================================
       TOUCH CANCEL
       ===================================================== */

    heroTrack.addEventListener(
        "touchcancel",
        () => {

            isDraggingHero = false;

            heroMoved = false;

            heroTrack.classList.remove(
                "dragging"
            );


            setHeroPosition(true);

            startHeroAutoSlide();

        },
        {
            passive:true
        }
    );


    /* =====================================================
       CEGah DRAG IMAGE
       ===================================================== */

    heroTrack.addEventListener(
        "dragstart",
        (event) => {

            event.preventDefault();

        }
    );

}


/* =========================================================
   CEGAH KLIK LINK SAAT SWIPE
   ========================================================= */

if (heroTrack) {

    heroTrack.addEventListener(
        "click",
        (event) => {

            if (heroMoved) {

                event.preventDefault();

                event.stopPropagation();

            }

        },
        true
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

                if (isDraggingHero) {
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

            if (!isDraggingHero) {

                startHeroAutoSlide();

            }

        }
    );

}


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


/* =========================================================
   INISIALISASI BERITA UTAMA
   ========================================================= */

updateMainNews(0);
