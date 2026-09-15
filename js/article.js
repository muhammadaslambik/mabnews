document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       DATABASE ARTIKEL
    ========================================================= */

    const articles = {

        "pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat": {
            category: "NASIONAL",
            title: "Pemerintah Siapkan Strategi Baru Jaga Daya Beli Masyarakat",
            lead: "Berbagai langkah disiapkan untuk menjaga konsumsi dan daya beli masyarakat di tengah perubahan kondisi ekonomi global.",
            date: "6 September 2026",
            time: "11:00 WIB",
            author: "MAB-News",
            image: "assets/images/pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat.jpg",
            caption: "Ilustrasi aktivitas ekonomi dan daya beli masyarakat.",
            content: [
                "Pemerintah menyiapkan sejumlah strategi baru untuk menjaga daya beli masyarakat di tengah perubahan kondisi ekonomi global.",
                "Kebijakan tersebut diarahkan untuk menjaga konsumsi rumah tangga sekaligus memastikan aktivitas ekonomi tetap berjalan secara stabil.",
                "Pemerintah juga terus memantau perkembangan harga kebutuhan pokok dan kondisi pasar untuk memastikan masyarakat tetap memiliki akses terhadap barang dan jasa dengan harga yang terjangkau.",
                "Selain menjaga stabilitas harga, penguatan sektor usaha dan penciptaan lapangan kerja menjadi bagian penting dalam menjaga daya beli masyarakat.",
                "Pemerintah berharap berbagai kebijakan tersebut dapat membantu masyarakat menghadapi perubahan ekonomi sekaligus mendorong pertumbuhan ekonomi nasional."
            ]
        },

        "pasar-dan-konsumen-menghadapi-perubahan-baru": {
            category: "EKONOMI",
            title: "Pasar dan Konsumen Menghadapi Perubahan Baru",
            lead: "Perubahan perilaku konsumen dan dinamika pasar mendorong pelaku usaha menyesuaikan strategi untuk menghadapi perkembangan ekonomi.",
            date: "6 September 2026",
            time: "10:30 WIB",
            author: "MAB-News",
            image: "assets/images/pasar-dan-konsumen-menghadapi-perubahan-baru.jpg",
            caption: "Aktivitas pasar dan konsumen di tengah perubahan ekonomi.",
            content: [
                "Pasar dan konsumen terus mengalami perubahan seiring perkembangan kondisi ekonomi dan perubahan pola kebutuhan masyarakat.",
                "Pelaku usaha perlu memahami perubahan perilaku konsumen agar produk dan layanan yang ditawarkan tetap sesuai dengan kebutuhan pasar.",
                "Perubahan pola belanja juga mendorong bisnis untuk memperkuat pemanfaatan teknologi, memperbaiki pelayanan, serta menghadirkan pilihan produk yang lebih beragam.",
                "Dari sisi konsumen, harga, kualitas, kemudahan, dan kepercayaan menjadi sejumlah pertimbangan penting sebelum mengambil keputusan pembelian.",
                "Perubahan tersebut diperkirakan akan terus berlangsung sehingga pelaku usaha perlu melakukan evaluasi secara berkala dan menyesuaikan strategi dengan perkembangan pasar."
            ]
        },

        "aparat-perkuat-pengamanan-dan-pelayanan-publik": {
            category: "NASIONAL",
            title: "Aparat Perkuat Pengamanan dan Pelayanan Publik",
            lead: "Aparat memperkuat pengamanan sekaligus meningkatkan pelayanan publik untuk memastikan masyarakat dapat beraktivitas dengan aman dan nyaman.",
            date: "6 September 2026",
            time: "10:00 WIB",
            author: "MAB-News",
            image: "assets/images/aparat-perkuat-pengamanan-dan-pelayanan-publik.jpg",
            caption: "Aparat menjalankan tugas pengamanan dan pelayanan kepada masyarakat.",
            content: [
                "Aparat memperkuat pengamanan di sejumlah titik sekaligus meningkatkan pelayanan publik kepada masyarakat.",
                "Langkah tersebut dilakukan untuk memastikan aktivitas masyarakat dapat berlangsung dengan aman, tertib, dan nyaman.",
                "Selain menjaga keamanan, petugas juga diarahkan untuk memberikan pelayanan yang cepat dan mudah diakses oleh masyarakat.",
                "Koordinasi antarpihak terus dilakukan agar pengamanan dan pelayanan publik dapat berjalan secara efektif, terutama pada lokasi dengan aktivitas masyarakat yang tinggi.",
                "Masyarakat diimbau untuk mengikuti ketentuan yang berlaku serta segera menyampaikan laporan apabila menemukan kondisi yang membutuhkan penanganan petugas."
            ]
        },

        "perkembangan-ai-mendorong-perubahan-cara-kerja": {
            category: "TEKNOLOGI",
            title: "Perkembangan AI Mendorong Perubahan Cara Kerja",
            lead: "Pemanfaatan kecerdasan buatan semakin berkembang dan mendorong perubahan cara kerja di berbagai sektor.",
            date: "6 September 2026",
            time: "09:30 WIB",
            author: "MAB-News",
            image: "assets/images/perkembangan-ai-mendorong-perubahan-cara-kerja.jpg",
            caption: "Ilustrasi pemanfaatan kecerdasan buatan dalam aktivitas kerja.",
            content: [
                "Perkembangan kecerdasan buatan atau artificial intelligence (AI) terus mendorong perubahan dalam cara masyarakat dan perusahaan menyelesaikan pekerjaan.",
                "Berbagai pekerjaan yang sebelumnya membutuhkan proses manual mulai dapat dibantu dengan teknologi AI, mulai dari pengolahan informasi hingga pembuatan dan pemeriksaan dokumen.",
                "Pemanfaatan AI juga memberikan peluang bagi perusahaan untuk meningkatkan produktivitas dengan mengurangi pekerjaan berulang dan membantu karyawan berfokus pada tugas yang membutuhkan pengambilan keputusan.",
                "Meski demikian, penerapan AI tetap membutuhkan pengawasan manusia. Akurasi informasi, keamanan data, serta penggunaan teknologi secara bertanggung jawab menjadi hal penting yang perlu diperhatikan.",
                "Perkembangan teknologi diperkirakan akan terus memengaruhi dunia kerja sehingga kemampuan beradaptasi dan memahami teknologi menjadi semakin penting."
            ]
        },

        "industri-otomotif-mulai-beradaptasi-dengan-tren-baru": {
            category: "OTOMOTIF",
            title: "Industri Otomotif Mulai Beradaptasi dengan Tren Baru",
            lead: "Pelaku industri otomotif mulai menyesuaikan strategi menghadapi perubahan teknologi, kebutuhan konsumen, dan perkembangan pasar.",
            date: "6 September 2026",
            time: "09:00 WIB",
            author: "MAB-News",
            image: "assets/images/industri-otomotif-mulai-beradaptasi-dengan-tren-baru.jpg",
            caption: "Aktivitas industri dan pasar otomotif di tengah perubahan tren kendaraan.",
            content: [
                "Industri otomotif mulai melakukan berbagai penyesuaian seiring perubahan teknologi dan kebutuhan konsumen.",
                "Perkembangan kendaraan yang semakin efisien serta meningkatnya perhatian terhadap teknologi menjadi salah satu faktor yang mendorong perubahan strategi produsen.",
                "Pelaku industri juga memperhatikan perubahan pola kebutuhan konsumen, termasuk pertimbangan mengenai harga, efisiensi penggunaan, fitur, dan layanan purnajual.",
                "Transformasi digital turut digunakan untuk meningkatkan pengalaman konsumen, mulai dari pencarian informasi kendaraan hingga pelayanan setelah pembelian.",
                "Industri otomotif diperkirakan akan terus beradaptasi melalui inovasi produk, peningkatan teknologi, dan penguatan pelayanan kepada konsumen."
            ]
        },

        "inflasi-mei-2025-terkendali-di-level-2-4-persen": {
            category: "EKONOMI",
            title: "Inflasi Mei 2025 Terkendali di Level 2,4 Persen",
            lead: "Perkembangan inflasi nasional tetap terkendali dengan sejumlah komponen harga mengalami perubahan sepanjang Mei 2025.",
            date: "9 Juni 2025",
            time: "10:45 WIB",
            author: "MAB-News",
            image: "assets/images/inflasi-mei-2025-terkendali-di-level-2-4-persen.jpg",
            caption: "Aktivitas perdagangan dan konsumen di pasar.",
            content: [
                "Perkembangan inflasi nasional tetap menjadi perhatian pemerintah dan pelaku ekonomi untuk menjaga stabilitas harga di tengah perubahan kondisi ekonomi.",
                "Sejumlah komponen harga mengalami perubahan sepanjang periode Mei 2025 dan turut memengaruhi perkembangan inflasi nasional.",
                "Pemerintah bersama otoritas terkait terus melakukan pemantauan terhadap harga kebutuhan pokok dan berbagai komoditas yang memiliki pengaruh terhadap masyarakat.",
                "Pengendalian harga menjadi salah satu faktor penting untuk menjaga daya beli masyarakat sekaligus mendukung stabilitas perekonomian.",
                "Ke depan, perkembangan inflasi akan terus dipantau untuk memastikan stabilitas harga tetap terjaga."
            ]
        },

        "australia-perketat-aturan-visa-untuk-pelajar-internasional": {
            category: "INTERNASIONAL",
            title: "Australia Perketat Aturan Visa untuk Pelajar Internasional",
            lead: "Pemerintah Australia memperbarui kebijakan visa bagi pelajar internasional sebagai bagian dari pengaturan sistem migrasi.",
            date: "8 Juni 2025",
            time: "10:15 WIB",
            author: "MAB-News",
            image: "assets/images/australia-perketat-aturan-visa-untuk-pelajar-internasional.jpg",
            caption: "Ilustrasi aktivitas internasional dan mobilitas masyarakat.",
            content: [
                "Pemerintah Australia memperbarui sejumlah kebijakan yang berkaitan dengan visa bagi pelajar internasional.",
                "Perubahan tersebut menjadi bagian dari upaya pemerintah Australia untuk mengatur sistem migrasi dan jumlah kedatangan penduduk dari luar negeri.",
                "Kebijakan visa menjadi salah satu perhatian penting bagi pelajar internasional yang berencana melanjutkan pendidikan di Australia.",
                "Perubahan aturan tersebut membuat calon pelajar perlu memperhatikan persyaratan terbaru sebelum mengajukan permohonan visa.",
                "Pemerintah Australia menyatakan bahwa kebijakan migrasi akan terus dievaluasi sesuai dengan kondisi dan kebutuhan negara."
            ]
        },

        "openai-luncurkan-gpt-5-ini-fitur-terbarunya": {
            category: "TEKNOLOGI",
            title: "OpenAI Luncurkan GPT-5, Ini Fitur Terbarunya",
            lead: "Perkembangan kecerdasan buatan terus menjadi perhatian setelah hadirnya generasi terbaru model AI.",
            date: "7 Juni 2025",
            time: "09:50 WIB",
            author: "MAB-News",
            image: "assets/images/openai-luncurkan-gpt-5-ini-fitur-terbarunya.jpg",
            caption: "Ilustrasi perkembangan teknologi kecerdasan buatan.",
            content: [
                "Perkembangan teknologi kecerdasan buatan terus mengalami perubahan dan semakin banyak digunakan dalam berbagai bidang.",
                "Model AI generasi terbaru menawarkan kemampuan yang semakin luas untuk membantu pengguna menyelesaikan berbagai pekerjaan.",
                "Teknologi tersebut dapat digunakan untuk membantu menghasilkan teks, menganalisis informasi, memahami instruksi, serta mendukung berbagai aktivitas produktivitas.",
                "Penggunaan AI juga mulai berkembang di lingkungan pendidikan, bisnis, teknologi, dan berbagai sektor lainnya.",
                "Meski memberikan banyak manfaat, penggunaan kecerdasan buatan tetap membutuhkan pengawasan manusia agar teknologi digunakan secara tepat dan bertanggung jawab."
            ]
        },

        "timnas-indonesia-siap-hadapi-china-di-kualifikasi-piala-dunia-2026": {
            category: "OLAHRAGA",
            title: "Timnas Indonesia Siap Hadapi China di Kualifikasi Piala Dunia 2026",
            lead: "Persiapan tim nasional Indonesia terus dilakukan menjelang pertandingan penting dalam kualifikasi Piala Dunia 2026.",
            date: "6 Juni 2025",
            time: "09:15 WIB",
            author: "MAB-News",
            image: "assets/images/timnas-indonesia-siap-hadapi-china-di-kualifikasi-piala-dunia-2026.jpg",
            caption: "Ilustrasi persiapan pertandingan sepak bola.",
            content: [
                "Tim nasional Indonesia terus melakukan persiapan menjelang pertandingan penting dalam rangkaian kualifikasi Piala Dunia 2026.",
                "Para pemain menjalani berbagai sesi latihan untuk meningkatkan kesiapan fisik, teknik, dan strategi permainan.",
                "Pertandingan menghadapi China menjadi salah satu laga yang mendapat perhatian besar dari masyarakat dan penggemar sepak bola Indonesia.",
                "Tim pelatih terus melakukan evaluasi terhadap permainan tim untuk menentukan strategi yang akan digunakan dalam pertandingan.",
                "Dukungan masyarakat diharapkan dapat menjadi motivasi tambahan bagi para pemain untuk memberikan penampilan terbaik."
            ]
        },

        "gaikindo-sebut-penjualan-mobil-2025-tumbuh-moderat": {
            category: "OTOMOTIF",
            title: "Gaikindo Sebut Penjualan Mobil 2025 Tumbuh Moderat",
            lead: "Industri otomotif nasional diperkirakan masih memiliki peluang pertumbuhan meski kondisi pasar menghadapi sejumlah tantangan.",
            date: "5 Juni 2025",
            time: "08:45 WIB",
            author: "MAB-News",
            image: "assets/images/gaikindo-sebut-penjualan-mobil-2025-tumbuh-moderat.jpg",
            caption: "Ilustrasi aktivitas industri dan pasar otomotif.",
            content: [
                "Industri otomotif nasional terus melakukan penyesuaian menghadapi kondisi pasar dan perubahan kebutuhan konsumen.",
                "Penjualan kendaraan menjadi salah satu indikator penting untuk melihat perkembangan industri otomotif nasional.",
                "Pelaku industri juga menghadapi sejumlah tantangan, mulai dari kondisi ekonomi hingga perubahan preferensi konsumen.",
                "Perkembangan teknologi kendaraan dan meningkatnya perhatian terhadap efisiensi energi turut mendorong perubahan strategi produsen.",
                "Industri otomotif diharapkan tetap mampu menjaga pertumbuhan melalui inovasi produk serta peningkatan pelayanan kepada konsumen."
            ]
        },

        "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada": {
            category: "NASIONAL",
            title: "Aktivitas Gunung Api Kembali Dipantau, Warga Diminta Tetap Waspada",
            lead: "Petugas terus memantau perkembangan aktivitas gunung api dan mengimbau masyarakat mengikuti informasi resmi.",
            date: "6 September 2026",
            time: "08:55 WIB",
            author: "MAB-News",
            image: "assets/images/aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada.jpg",
            caption: "Aktivitas gunung api terus dipantau oleh petugas.",
            content: [
                "Petugas terus melakukan pemantauan terhadap aktivitas gunung api untuk mengetahui perkembangan kondisi terkini.",
                "Masyarakat yang berada di sekitar kawasan rawan diminta tetap memperhatikan informasi resmi dari pihak berwenang.",
                "Pemantauan dilakukan secara berkala untuk memastikan perubahan aktivitas dapat diketahui sedini mungkin.",
                "Petugas juga mengingatkan masyarakat agar tidak mudah mempercayai informasi yang belum memiliki sumber resmi.",
                "Masyarakat diminta tetap tenang namun meningkatkan kewaspadaan apabila terjadi perubahan aktivitas."
            ]
        },

        "arus-logistik-nasional-terus-diperkuat-untuk-menekan-biaya-distribusi": {
            category: "EKONOMI",
            title: "Arus Logistik Nasional Terus Diperkuat untuk Menekan Biaya Distribusi",
            lead: "Pemerintah dan pelaku usaha menyiapkan sejumlah langkah untuk meningkatkan efisiensi distribusi barang.",
            date: "6 September 2026",
            time: "08:20 WIB",
            author: "MAB-News",
            image: "assets/images/arus-logistik-nasional-terus-diperkuat-untuk-menekan-biaya-distribusi.jpg",
            caption: "Aktivitas distribusi dan logistik melalui pelabuhan.",
            content: [
                "Penguatan sistem logistik nasional terus dilakukan untuk meningkatkan efisiensi distribusi barang.",
                "Biaya logistik menjadi salah satu faktor penting yang memengaruhi harga barang di berbagai wilayah.",
                "Pemerintah mendorong peningkatan konektivitas antardaerah serta penguatan infrastruktur distribusi.",
                "Pelaku usaha juga mulai memanfaatkan teknologi untuk memantau pergerakan barang dan meningkatkan efisiensi.",
                "Penguatan sistem logistik diharapkan dapat membantu menekan biaya distribusi dan menjaga stabilitas harga."
            ]
        },

        "melihat-perubahan-besar-di-balik-berita-hari-ini": {
            category: "FOKUS",
            title: "Melihat Perubahan Besar di Balik Berita Hari Ini",
            lead: "Rangkuman konteks, data, dan perspektif yang membantu pembaca memahami berbagai isu secara lebih utuh.",
            date: "6 September 2026",
            time: "08:00 WIB",
            author: "MAB-News",
            image: "assets/images/melihat-perubahan-besar-di-balik-berita-hari-ini.jpg",
            caption: "Ilustrasi rangkuman konteks, data, dan perspektif MAB-News.",
            content: [
                "Setiap berita memiliki konteks yang perlu dipahami agar informasi yang diterima pembaca tidak berhenti pada peristiwa yang terlihat di permukaan.",
                "MAB-News menghadirkan rangkuman berbagai perkembangan dengan memperhatikan fakta, data, dan perspektif yang relevan dengan isu yang sedang berlangsung.",
                "Pendekatan tersebut membantu pembaca melihat hubungan antara sebuah peristiwa dengan kondisi yang lebih luas, baik dalam bidang ekonomi, teknologi, sosial, maupun kehidupan masyarakat.",
                "Data menjadi bagian penting dalam memahami sebuah isu karena memberikan dasar yang lebih kuat dalam melihat perubahan dan perkembangan yang terjadi.",
                "Melalui rangkuman dan perspektif yang lebih utuh, MAB-News berupaya membantu pembaca memahami bukan hanya apa yang terjadi, tetapi juga konteks di balik sebuah berita."
            ]
        },

        "hingga-april-2025-realisasi-investasi-capai-rp-456-8-triliun": {
            category: "NASIONAL",
            title: "Hingga April 2025, Realisasi Investasi Capai Rp 456,8 Triliun",
            lead: "Realisasi investasi nasional hingga April 2025 tumbuh dibanding periode yang sama tahun sebelumnya, ditopang investasi di sejumlah sektor strategis.",
            date: "27 Mei 2025",
            time: "13:20 WIB",
            author: "MAB-News",
            image: "assets/images/hingga-april-2025-realisasi-investasi-capai-rp-456-8-triliun.jpg",
            caption: "Aktivitas investasi dan industri di sejumlah kawasan strategis.",
            content: [
                "Realisasi investasi nasional hingga April 2025 tercatat mencapai Rp 456,8 triliun, tumbuh dibanding periode yang sama pada tahun sebelumnya.",
                "Pertumbuhan tersebut ditopang oleh investasi di sejumlah sektor strategis, termasuk industri manufaktur, energi, dan infrastruktur.",
                "Pemerintah menyebut capaian ini sebagai sinyal positif di tengah dinamika ekonomi global yang masih penuh ketidakpastian.",
                "Sejumlah kebijakan kemudahan berusaha dan penyederhanaan perizinan disebut turut mendorong minat investor untuk menanamkan modal di dalam negeri.",
                "Pemerintah menargetkan realisasi investasi dapat terus tumbuh hingga akhir tahun guna mendukung penciptaan lapangan kerja dan pertumbuhan ekonomi nasional."
            ]
        },

        "kai-tambah-36-perjalanan-jelang-libur-sekolah": {
            category: "NASIONAL",
            title: "KAI Tambah 36 Perjalanan Jelang Libur Sekolah",
            lead: "PT KAI menambah puluhan perjalanan kereta api tambahan untuk mengantisipasi lonjakan penumpang menjelang masa libur sekolah.",
            date: "27 Mei 2025",
            time: "12:10 WIB",
            author: "MAB-News",
            image: "assets/images/kai-tambah-36-perjalanan-jelang-libur-sekolah.jpg",
            caption: "Aktivitas penumpang di stasiun kereta api menjelang masa libur.",
            content: [
                "PT Kereta Api Indonesia (KAI) menambah 36 perjalanan kereta api tambahan untuk mengantisipasi lonjakan penumpang menjelang masa libur sekolah.",
                "Penambahan perjalanan dilakukan pada sejumlah rute favorit yang diperkirakan mengalami peningkatan permintaan tiket secara signifikan.",
                "KAI mengimbau masyarakat untuk memesan tiket lebih awal guna memastikan ketersediaan kursi sesuai jadwal keberangkatan yang diinginkan.",
                "Selain menambah perjalanan, KAI juga meningkatkan pengawasan fasilitas dan pelayanan di stasiun untuk menjaga kenyamanan penumpang selama periode libur.",
                "Penambahan perjalanan ini diharapkan dapat membantu masyarakat mendapatkan alternatif transportasi yang aman dan nyaman selama musim libur sekolah."
            ]
        },

        "pemerintah-dorong-digitalisasi-layanan-publik-di-daerah": {
            category: "NASIONAL",
            title: "Pemerintah Dorong Digitalisasi Layanan Publik di Daerah",
            lead: "Pemerintah mempercepat digitalisasi layanan publik di berbagai daerah guna mempermudah akses masyarakat terhadap layanan pemerintahan.",
            date: "27 Mei 2025",
            time: "11:05 WIB",
            author: "MAB-News",
            image: "assets/images/pemerintah-dorong-digitalisasi-layanan-publik-di-daerah.jpg",
            caption: "Petugas membantu masyarakat mengakses layanan publik berbasis digital.",
            content: [
                "Pemerintah terus mendorong percepatan digitalisasi layanan publik di berbagai daerah untuk mempermudah akses masyarakat.",
                "Transformasi ini mencakup penyediaan layanan administrasi, perizinan, hingga pengaduan masyarakat yang dapat diakses secara daring.",
                "Sejumlah pemerintah daerah telah mulai menerapkan sistem digital terintegrasi untuk mempercepat proses pelayanan kepada warga.",
                "Pemerintah menekankan pentingnya kesiapan infrastruktur dan sumber daya manusia agar digitalisasi layanan dapat berjalan merata hingga ke daerah terpencil.",
                "Langkah ini diharapkan dapat meningkatkan efisiensi birokrasi sekaligus mendorong transparansi dalam pelayanan kepada masyarakat."
            ]
        },

        "prabowo-resmikan-proyek-strategis-nasional-di-jawa-tengah": {
            category: "NASIONAL",
            title: "Prabowo Resmikan Proyek Strategis Nasional di Jawa Tengah",
            lead: "Presiden meresmikan proyek strategis nasional di Jawa Tengah yang diharapkan mendorong pertumbuhan ekonomi kawasan.",
            date: "27 Mei 2025",
            time: "14:40 WIB",
            author: "MAB-News",
            image: "assets/images/prabowo-resmikan-proyek-strategis-nasional-di-jawa-tengah.jpg",
            caption: "Peresmian proyek strategis nasional di Jawa Tengah.",
            content: [
                "Presiden meresmikan salah satu proyek strategis nasional yang berlokasi di Jawa Tengah, sebagai bagian dari upaya percepatan pembangunan infrastruktur.",
                "Proyek tersebut diharapkan dapat meningkatkan konektivitas antarwilayah sekaligus mendorong pertumbuhan ekonomi di kawasan sekitarnya.",
                "Dalam sambutannya, pemerintah menekankan pentingnya pemerataan pembangunan infrastruktur di luar pulau Jawa maupun kawasan strategis lainnya.",
                "Proyek ini juga diharapkan mampu menyerap tenaga kerja lokal serta membuka peluang usaha baru bagi masyarakat sekitar.",
                "Pemerintah menargetkan sejumlah proyek strategis nasional lainnya dapat segera dirampungkan guna mendukung target pertumbuhan ekonomi nasional."
            ]
        },

        "harga-bbm-terbaru-per-27-mei-2025-di-seluruh-indonesia": {
            category: "EKONOMI",
            title: "Harga BBM Terbaru per 27 Mei 2025 di Seluruh Indonesia",
            lead: "Pemerintah dan badan usaha menyesuaikan harga bahan bakar minyak untuk periode terbaru di seluruh wilayah Indonesia.",
            date: "27 Mei 2025",
            time: "07:30 WIB",
            author: "MAB-News",
            image: "assets/images/harga-bbm-terbaru-per-27-mei-2025-di-seluruh-indonesia.jpg",
            caption: "Aktivitas pengisian bahan bakar di salah satu stasiun pengisian.",
            content: [
                "Sejumlah badan usaha menyesuaikan harga bahan bakar minyak (BBM) untuk periode terbaru yang berlaku di seluruh wilayah Indonesia.",
                "Penyesuaian harga tersebut mengacu pada perkembangan harga minyak dunia serta nilai tukar rupiah dalam beberapa waktu terakhir.",
                "Pemerintah menyatakan penyesuaian harga dilakukan secara berkala untuk menjaga keseimbangan antara daya beli masyarakat dan keberlanjutan penyediaan energi.",
                "Masyarakat diimbau untuk memeriksa informasi harga terbaru melalui kanal resmi guna menghindari kesalahan informasi di lapangan.",
                "Pemerintah memastikan pasokan BBM tetap terjaga di seluruh wilayah, termasuk di daerah terpencil dan kepulauan."
            ]
        },

        "timnas-indonesia-siap-hadapi-jepang-di-laga-kualifikasi-piala-dunia": {
            category: "OLAHRAGA",
            title: "Timnas Indonesia Siap Hadapi Jepang di Laga Kualifikasi Piala Dunia",
            lead: "Tim nasional Indonesia menyiapkan strategi khusus menjelang laga kualifikasi Piala Dunia melawan Jepang.",
            date: "27 Mei 2025",
            time: "16:00 WIB",
            author: "MAB-News",
            image: "assets/images/timnas-indonesia-siap-hadapi-jepang-di-laga-kualifikasi-piala-dunia.jpg",
            caption: "Sesi latihan tim nasional Indonesia menjelang laga penting.",
            content: [
                "Tim nasional Indonesia terus mematangkan persiapan menjelang laga kualifikasi Piala Dunia melawan Jepang.",
                "Pelatih menekankan pentingnya soliditas pertahanan mengingat Jepang dikenal memiliki lini serang yang tajam dan terorganisir.",
                "Para pemain menjalani sesi latihan intensif untuk meningkatkan kekompakan tim serta menyusun strategi menghadapi gaya permainan lawan.",
                "Dukungan suporter di dalam maupun luar stadion diharapkan dapat menjadi tambahan motivasi bagi skuad Garuda.",
                "Tim pelatih optimistis timnas dapat memberikan perlawanan maksimal dan meraih hasil terbaik dalam pertandingan tersebut."
            ]
        },

        "bank-indonesia-pertahankan-suku-bunga-acuan-di-level-6-25-persen": {
            category: "EKONOMI",
            title: "Bank Indonesia Pertahankan Suku Bunga Acuan di Level 6,25 Persen",
            lead: "Bank Indonesia memutuskan mempertahankan suku bunga acuan guna menjaga stabilitas nilai tukar rupiah dan pengendalian inflasi.",
            date: "27 Mei 2025",
            time: "15:30 WIB",
            author: "MAB-News",
            image: "assets/images/bank-indonesia-pertahankan-suku-bunga-acuan-di-level-6-25-persen.jpg",
            caption: "Gedung Bank Indonesia sebagai otoritas moneter nasional.",
            content: [
                "Bank Indonesia memutuskan mempertahankan suku bunga acuan atau BI-Rate di level 6,25 persen dalam rapat dewan gubernur terbaru.",
                "Keputusan tersebut diambil dengan mempertimbangkan stabilitas nilai tukar rupiah di tengah dinamika ekonomi global.",
                "Bank Indonesia menyebut kebijakan ini juga ditujukan untuk menjaga inflasi tetap berada dalam kisaran sasaran yang ditetapkan.",
                "Selain kebijakan suku bunga, Bank Indonesia turut memperkuat strategi stabilisasi nilai tukar melalui berbagai instrumen moneter lainnya.",
                "Bank Indonesia menegaskan akan terus mencermati perkembangan ekonomi global dan domestik dalam menentukan arah kebijakan moneter selanjutnya."
            ]
        },

        "gunung-lewotobi-laki-laki-erupsi-status-dinaikkan-jadi-awas": {
            category: "NASIONAL",
            title: "Gunung Lewotobi Laki-laki Erupsi, Status Dinaikkan Jadi Awas",
            lead: "Aktivitas vulkanik Gunung Lewotobi Laki-laki meningkat sehingga status kebencanaannya dinaikkan menjadi level Awas.",
            date: "27 Mei 2025",
            time: "06:45 WIB",
            author: "MAB-News",
            image: "assets/images/gunung-lewotobi-laki-laki-erupsi-status-dinaikkan-jadi-awas.jpg",
            caption: "Aktivitas vulkanik Gunung Lewotobi Laki-laki yang terus dipantau petugas.",
            content: [
                "Gunung Lewotobi Laki-laki mengalami peningkatan aktivitas vulkanik sehingga statusnya dinaikkan menjadi level Awas oleh petugas berwenang.",
                "Peningkatan status tersebut diikuti dengan perluasan zona bahaya serta imbauan agar warga di sekitar kawasan segera mengungsi ke lokasi yang lebih aman.",
                "Petugas terus memantau perkembangan aktivitas gunung secara intensif untuk mengantisipasi kemungkinan erupsi susulan.",
                "Pemerintah daerah bersama tim penanggulangan bencana telah menyiapkan jalur evakuasi serta tempat pengungsian sementara bagi warga terdampak.",
                "Masyarakat diimbau untuk tetap tenang, mengikuti arahan petugas, dan tidak mendekati kawasan yang telah ditetapkan sebagai zona berbahaya."
            ]
        },

        "pemerintah-dorong-transformasi-digital-untuk-tingkatkan-layanan-publik": {
            category: "NASIONAL",
            title: "Pemerintah Dorong Transformasi Digital untuk Tingkatkan Layanan Publik",
            lead: "Pemerintah terus mendorong transformasi digital di berbagai sektor layanan publik guna mempercepat dan mempermudah akses masyarakat.",
            date: "27 Mei 2025",
            time: "13:00 WIB",
            author: "MAB-News",
            image: "assets/images/pemerintah-dorong-transformasi-digital-untuk-tingkatkan-layanan-publik.jpg",
            caption: "Menteri Komunikasi dan Informatika saat memberikan paparan dalam forum Transformasi Digital Nasional 2025 di Jakarta. Dok. Kominfo",
            content: [
                "Pemerintah terus mendorong percepatan transformasi digital di berbagai sektor layanan publik untuk mempermudah akses masyarakat.",
                "Transformasi ini mencakup penyediaan layanan administrasi kependudukan, perizinan usaha, hingga layanan kesehatan yang terintegrasi secara digital.",
                "Dalam forum Transformasi Digital Nasional 2025, pemerintah menekankan pentingnya kolaborasi antarlembaga untuk mempercepat penerapan sistem digital yang terpadu.",
                "Selain infrastruktur teknologi, peningkatan literasi digital masyarakat turut menjadi perhatian agar manfaat transformasi ini dapat dirasakan secara merata.",
                "Pemerintah menargetkan seluruh layanan publik utama dapat diakses secara digital dalam beberapa tahun ke depan guna mendukung efisiensi birokrasi nasional."
            ]
        },

        "spbe-5-manfaat-transformasi-digital-bagi-masyarakat": {
            category: "NASIONAL",
            title: "SPBE: 5 Manfaat Transformasi Digital bagi Masyarakat",
            lead: "Penerapan Sistem Pemerintahan Berbasis Elektronik (SPBE) dinilai memberikan sejumlah manfaat nyata bagi kemudahan layanan masyarakat.",
            date: "26 Mei 2025",
            time: "10:20 WIB",
            author: "MAB-News",
            image: "assets/images/spbe-5-manfaat-transformasi-digital-bagi-masyarakat.jpg",
            caption: "Ilustrasi penerapan Sistem Pemerintahan Berbasis Elektronik.",
            content: [
                "Penerapan Sistem Pemerintahan Berbasis Elektronik (SPBE) dinilai memberikan sejumlah manfaat nyata dalam mempermudah layanan kepada masyarakat.",
                "Manfaat pertama adalah percepatan proses administrasi, karena berbagai layanan dapat diakses secara daring tanpa harus datang langsung ke kantor pemerintahan.",
                "Kedua, SPBE meningkatkan transparansi karena masyarakat dapat memantau status pengajuan layanan secara real-time melalui sistem digital.",
                "Ketiga, sistem ini membantu mengurangi potensi praktik pungutan liar karena proses layanan tercatat secara otomatis dan dapat diaudit.",
                "Keempat dan kelima, SPBE mendorong efisiensi anggaran serta memperkuat koordinasi data antarinstansi pemerintah, sehingga pelayanan kepada masyarakat menjadi lebih cepat dan akurat."
            ]
        },

        "pemerintah-targetkan-100-layanan-publik-digital-pada-2026": {
            category: "NASIONAL",
            title: "Pemerintah Targetkan 100% Layanan Publik Digital pada 2026",
            lead: "Pemerintah menargetkan seluruh layanan publik utama sudah dapat diakses secara digital pada tahun 2026.",
            date: "25 Mei 2025",
            time: "09:40 WIB",
            author: "MAB-News",
            image: "assets/images/pemerintah-targetkan-100-layanan-publik-digital-pada-2026.jpg",
            caption: "Petugas menunjukkan layanan publik berbasis aplikasi digital.",
            content: [
                "Pemerintah menargetkan seluruh layanan publik utama sudah dapat diakses secara digital pada tahun 2026 mendatang.",
                "Target tersebut mencakup layanan kependudukan, perpajakan, perizinan usaha, hingga layanan kesehatan dan pendidikan.",
                "Pemerintah menyebut integrasi data antarlembaga menjadi kunci utama untuk mewujudkan target digitalisasi layanan publik secara menyeluruh.",
                "Sejumlah pemerintah daerah telah memulai uji coba sistem layanan digital terpadu sebagai bagian dari persiapan menuju target tersebut.",
                "Pemerintah optimistis target ini dapat tercapai apabila didukung oleh kesiapan infrastruktur, regulasi, dan sumber daya manusia di seluruh tingkatan pemerintahan."
            ]
        },

        "literasi-digital-di-indonesia-masih-jadi-pr-besar": {
            category: "NASIONAL",
            title: "Literasi Digital di Indonesia Masih Jadi PR Besar",
            lead: "Tingkat literasi digital masyarakat Indonesia dinilai masih perlu ditingkatkan seiring cepatnya transformasi layanan berbasis teknologi.",
            date: "24 Mei 2025",
            time: "08:50 WIB",
            author: "MAB-News",
            image: "assets/images/literasi-digital-di-indonesia-masih-jadi-pr-besar.jpg",
            caption: "Kegiatan edukasi literasi digital bagi masyarakat.",
            content: [
                "Tingkat literasi digital masyarakat Indonesia dinilai masih menjadi pekerjaan rumah besar di tengah cepatnya transformasi layanan berbasis teknologi.",
                "Rendahnya literasi digital dikhawatirkan dapat menghambat pemerataan manfaat transformasi digital, terutama di daerah dengan akses teknologi terbatas.",
                "Pemerintah bersama sejumlah lembaga terus menggencarkan program edukasi literasi digital, mulai dari tingkat sekolah hingga masyarakat umum.",
                "Selain keterampilan teknis, edukasi juga difokuskan pada keamanan data pribadi dan kewaspadaan terhadap penipuan digital.",
                "Peningkatan literasi digital diharapkan dapat mempercepat adopsi layanan publik digital secara lebih merata di seluruh lapisan masyarakat."
            ]
        },

        "kolaborasi-pemerintah-dan-swasta-percepat-digitalisasi-daerah": {
            category: "NASIONAL",
            title: "Kolaborasi Pemerintah dan Swasta Percepat Digitalisasi Daerah",
            lead: "Kolaborasi antara pemerintah dan sektor swasta dinilai menjadi kunci untuk mempercepat pemerataan digitalisasi hingga ke daerah.",
            date: "24 Mei 2025",
            time: "14:15 WIB",
            author: "MAB-News",
            image: "assets/images/kolaborasi-pemerintah-dan-swasta-percepat-digitalisasi-daerah.jpg",
            caption: "Perwakilan pemerintah dan sektor swasta dalam forum kolaborasi digitalisasi daerah.",
            content: [
                "Kolaborasi antara pemerintah dan sektor swasta dinilai menjadi salah satu kunci penting untuk mempercepat pemerataan digitalisasi hingga ke daerah.",
                "Sektor swasta berperan dalam penyediaan infrastruktur teknologi, sementara pemerintah berfokus pada regulasi dan tata kelola layanan digital.",
                "Sejumlah proyek percontohan digitalisasi daerah telah dijalankan melalui skema kerja sama pemerintah dan badan usaha di beberapa wilayah.",
                "Kolaborasi ini diharapkan dapat mempercepat penyediaan akses internet serta perangkat pendukung layanan digital di wilayah yang masih tertinggal.",
                "Pemerintah menyatakan akan terus membuka ruang kemitraan dengan sektor swasta guna mempercepat pemerataan transformasi digital di seluruh Indonesia."
            ]
        }

    };


    /* =========================================================
       AMBIL ID DARI URL
    ========================================================= */

    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");


    /* =========================================================
       JIKA ID TIDAK DITEMUKAN
    ========================================================= */

    if (!articleId || !articles[articleId]) {
        window.location.href = "berita.html";
        return;
    }


    /* =========================================================
       AMBIL ARTIKEL
    ========================================================= */

    const article = articles[articleId];


    /* =========================================================
       ELEMENT HTML
    ========================================================= */

    const categoryElement = document.querySelector(".article-category");
    const titleElement = document.querySelector(".article-title");
    const leadElement = document.querySelector(".article-lead");
    const dateElement = document.querySelector(".article-date");
    const heroImage = document.querySelector(".article-hero img");
    const captionElement = document.querySelector(".article-hero figcaption");
    const bodyElement = document.querySelector(".article-body");
    const authorName = document.querySelector(".author-name");


    /* =========================================================
       TITLE BROWSER
    ========================================================= */

    document.title = `${article.title} — MAB-News`;


    /* =========================================================
       CATEGORY
    ========================================================= */

    if (categoryElement) {
        categoryElement.textContent = article.category;
    }


    /* =========================================================
       TITLE
    ========================================================= */

    if (titleElement) {
        titleElement.textContent = article.title;
    }


    /* =========================================================
       LEAD
    ========================================================= */

    if (leadElement) {
        leadElement.textContent = article.lead;
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
        heroImage.src = article.image;
        heroImage.alt = article.title;
    }


    /* =========================================================
       CAPTION
    ========================================================= */

    if (captionElement) {
        captionElement.textContent = article.caption;
    }


    /* =========================================================
       BODY ARTIKEL
    ========================================================= */

    if (bodyElement) {

        const articleParagraphs = article.content
            .map((paragraph, index) => {

                if (index === 0) {
                    return `
                        <p>
                            <strong>MAB-News</strong> – ${paragraph}
                        </p>
                    `;
                }

                return `<p>${paragraph}</p>`;

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
        document.querySelectorAll(".article-breadcrumb a");

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
        document.querySelectorAll(".header-icon");

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
        document.querySelector(".header-search input");

    const searchButton =
        document.querySelector(".header-search button");


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
        encodeURIComponent(window.location.href);

    const currentTitle =
        encodeURIComponent(article.title);

    const shareLinks =
        document.querySelectorAll(".article-share a");

    if (shareLinks.length >= 3) {

        /* FACEBOOK */

        shareLinks[0].href =
            `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

        shareLinks[0].target = "_blank";

        shareLinks[0].rel =
            "noopener noreferrer";


        /* X */

        shareLinks[1].href =
            `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;

        shareLinks[1].target = "_blank";

        shareLinks[1].rel =
            "noopener noreferrer";


        /* WHATSAPP */

        shareLinks[2].href =
            `https://wa.me/?text=${currentTitle}%20${currentUrl}`;

        shareLinks[2].target = "_blank";

        shareLinks[2].rel =
            "noopener noreferrer";
    }


    /* =========================================================
       SAVE ARTICLE
    ========================================================= */

    const shareButtons =
        document.querySelectorAll(".article-share button");

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

        "pasar-dan-konsumen-menghadapi-perubahan-baru",

        "aparat-perkuat-pengamanan-dan-pelayanan-publik",

        "perkembangan-ai-mendorong-perubahan-cara-kerja",

        "industri-otomotif-mulai-beradaptasi-dengan-tren-baru",

        "inflasi-mei-2025-terkendali-di-level-2-4-persen",

        "australia-perketat-aturan-visa-untuk-pelajar-internasional",

        "openai-luncurkan-gpt-5-ini-fitur-terbarunya",

        "timnas-indonesia-siap-hadapi-china-di-kualifikasi-piala-dunia-2026",

        "gaikindo-sebut-penjualan-mobil-2025-tumbuh-moderat",

        "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada",

        "arus-logistik-nasional-terus-diperkuat-untuk-menekan-biaya-distribusi",

        "melihat-perubahan-besar-di-balik-berita-hari-ini"

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


    /* =========================================================
       PREVIOUS
    ========================================================= */

    if (previousLink) {

        if (currentIndex > 0) {

            const previousId =
                articleIds[currentIndex - 1];

            const previousArticle =
                articles[previousId];


            previousLink.href =
                `artikel.html?id=${previousId}`;


            const title =
                previousLink.querySelector("strong");


            if (title) {

                title.textContent =
                    previousArticle.title;
            }

        } else {

            previousLink.style.visibility =
                "hidden";
        }
    }


    /* =========================================================
       NEXT
    ========================================================= */

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
                nextLink.querySelector("strong");


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
       BERITA POPULER
    ========================================================= */

    const popularItems =
        document.querySelectorAll(
            ".article-sidebar .popular-item"
        );


    const popularArticles = [

        "pemerintah-siapkan-strategi-baru-jaga-daya-beli-masyarakat",

        "perkembangan-ai-mendorong-perubahan-cara-kerja",

        "aparat-perkuat-pengamanan-dan-pelayanan-publik",

        "industri-otomotif-mulai-beradaptasi-dengan-tren-baru",

        "aktivitas-gunung-api-kembali-dipantau-warga-diminta-tetap-waspada"

    ];


    popularItems.forEach(
        (item, index) => {

            const id =
                popularArticles[index];


            if (!id || !articles[id]) {
                return;
            }


            /* LINK ARTIKEL */

            item.href =
                `artikel.html?id=${id}`;


            /* JUDUL */

            const heading =
                item.querySelector("h3");


            if (heading) {

                heading.textContent =
                    articles[id].title;
            }

        }
    );


});