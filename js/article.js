document.addEventListener("DOMContentLoaded", () => {

    const articles = {

        "pemerintah-daya-beli": {
            category: "EKONOMI",
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

        "pasar-konsumen": {
            category: "EKONOMI",
            title: "Pasar dan Konsumen Menghadapi Perubahan Baru",
            lead: "Perubahan pola konsumsi masyarakat mendorong pelaku usaha untuk menyesuaikan strategi mereka menghadapi kondisi pasar.",
            date: "6 September 2026",
            time: "10:45 WIB",
            author: "MAB-News",
            image: "assets/images/card-market.jpg",
            caption: "Aktivitas perdagangan dan konsumen di pasar.",
            content: [
                "Pelaku usaha menghadapi perubahan pola konsumsi masyarakat yang terjadi dalam beberapa waktu terakhir.",
                "Konsumen semakin mempertimbangkan harga, kualitas, serta manfaat sebelum menentukan pilihan pembelian.",
                "Perubahan tersebut membuat pelaku usaha harus lebih cepat membaca kebutuhan pasar dan menyesuaikan produk yang ditawarkan.",
                "Digitalisasi juga menjadi salah satu faktor yang mengubah cara masyarakat mencari informasi dan melakukan transaksi.",
                "Dengan perubahan tersebut, kemampuan beradaptasi menjadi salah satu faktor penting bagi keberlangsungan usaha."
            ]
        },

        "pengamanan-publik": {
            category: "NASIONAL",
            title: "Aparat Perkuat Pengamanan dan Pelayanan Publik",
            lead: "Aparat meningkatkan pengamanan sekaligus pelayanan kepada masyarakat untuk memastikan aktivitas publik berjalan dengan aman.",
            date: "6 September 2026",
            time: "10:18 WIB",
            author: "MAB-News",
            image: "assets/images/card-police.jpg",
            caption: "Petugas melakukan pengamanan dan pelayanan kepada masyarakat.",
            content: [
                "Aparat memperkuat pengamanan dan pelayanan publik di sejumlah wilayah.",
                "Langkah tersebut dilakukan untuk memastikan masyarakat dapat menjalankan aktivitas sehari-hari dengan aman dan nyaman.",
                "Selain aspek keamanan, pelayanan kepada masyarakat juga menjadi perhatian melalui peningkatan koordinasi antarinstansi.",
                "Petugas di lapangan diminta mengedepankan pendekatan pelayanan dan komunikasi dengan masyarakat.",
                "Penguatan pelayanan publik diharapkan dapat meningkatkan kepercayaan masyarakat terhadap institusi negara."
            ]
        },

        "perkembangan-ai": {
            category: "TEKNOLOGI",
            title: "Perkembangan AI Mendorong Perubahan Cara Kerja",
            lead: "Perkembangan kecerdasan buatan mulai mengubah cara individu dan perusahaan menyelesaikan berbagai pekerjaan.",
            date: "6 September 2026",
            time: "09:50 WIB",
            author: "MAB-News",
            image: "assets/images/card-openai.jpg",
            caption: "Ilustrasi perkembangan teknologi kecerdasan buatan.",
            content: [
                "Teknologi kecerdasan buatan terus berkembang dan mulai digunakan dalam berbagai bidang pekerjaan.",
                "AI tidak hanya digunakan untuk menghasilkan teks dan gambar, tetapi juga membantu menganalisis data serta mengotomatisasi berbagai pekerjaan rutin.",
                "Perubahan tersebut membuat perusahaan mulai mempertimbangkan kembali cara mereka mengelola proses kerja.",
                "Meski menawarkan berbagai manfaat, penggunaan AI tetap membutuhkan pengawasan manusia agar hasil yang dihasilkan dapat digunakan secara tepat.",
                "Perkembangan teknologi tersebut diperkirakan akan terus memengaruhi dunia kerja dalam beberapa tahun mendatang."
            ]
        },

        "industri-otomotif": {
            category: "OTOMOTIF",
            title: "Industri Otomotif Mulai Beradaptasi dengan Tren Baru",
            lead: "Industri otomotif terus melakukan penyesuaian menghadapi perubahan teknologi dan kebutuhan konsumen.",
            date: "6 September 2026",
            time: "09:24 WIB",
            author: "MAB-News",
            image: "assets/images/card-auto.jpg",
            caption: "Perkembangan industri otomotif menghadapi perubahan teknologi.",
            content: [
                "Industri otomotif mulai melakukan berbagai penyesuaian untuk menghadapi perubahan kebutuhan konsumen.",
                "Teknologi kendaraan menjadi salah satu faktor utama yang mendorong perubahan tersebut.",
                "Produsen kendaraan juga mulai memperhatikan efisiensi energi dan perkembangan kendaraan berbasis listrik.",
                "Di sisi lain, konsumen semakin memperhatikan fitur keselamatan, efisiensi, dan teknologi yang tersedia pada kendaraan.",
                "Perubahan tren tersebut membuat industri otomotif harus terus berinovasi agar dapat mengikuti perkembangan pasar."
            ]
        },

        "gunung-api": {
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

        "arus-logistik": {
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
        }

    };


    // ==============================
    // AMBIL ID ARTIKEL DARI URL
    // ==============================

    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");

    const article = articles[articleId];

    if (!article) {
        window.location.href = "berita.html";
        return;
    }


    // ==============================
    // ISI DATA ARTIKEL
    // ==============================

    document.title = `${article.title} — MAB-News`;

    const category = document.querySelector(".article-category");
    const title = document.querySelector(".article-title");
    const lead = document.querySelector(".article-lead");
    const date = document.querySelector(".article-date");
    const heroImage = document.querySelector(".article-hero img");
    const caption = document.querySelector(".article-hero figcaption");
    const body = document.querySelector(".article-body");

    if (category) category.textContent = article.category;

    if (title) title.textContent = article.title;

    if (lead) lead.textContent = article.lead;

    if (date) {
        date.textContent =
            `${article.date} • ${article.time} • 5 menit baca`;
    }

    if (heroImage) {
        heroImage.src = article.image;
        heroImage.alt = article.title;
    }

    if (caption) {
        caption.textContent = article.caption;
    }


    // ==============================
    // ISI BODY ARTIKEL
    // ==============================

    if (body) {

        const tags = `
            <div class="article-tags">
                <span class="tags-label">TAGS:</span>
                <a href="#">${article.category}</a>
                <a href="#">MAB-News</a>
                <a href="#">Berita Terkini</a>
            </div>
        `;

        body.innerHTML = `
            ${article.content.map((paragraph, index) => {

                if (index === 0) {
                    return `<p><strong>MAB-News</strong> – ${paragraph}</p>`;
                }

                return `<p>${paragraph}</p>`;

            }).join("")}

            ${tags}
        `;
    }


    // ==============================
    // BREADCRUMB
    // ==============================

    const breadcrumbCategory =
        document.querySelector(".article-breadcrumb a:nth-of-type(2)");

    if (breadcrumbCategory) {

        breadcrumbCategory.textContent =
            article.category;

        breadcrumbCategory.href =
            `kategori.html?kategori=${article.category
                .toLowerCase()
                .replace(/\s+/g, "-")}`;
    }

});
