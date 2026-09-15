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
        },

        "inflasi-mei-2025-terkendali-di-level-24-persen": {
            category: "EKONOMI",
            title: "Inflasi Mei 2025 Terkendali di Level 2,4 Persen",
            lead: "Badan Pusat Statistik (BPS) melaporkan inflasi Mei 2025 berada di level 2,4 persen secara tahunan (yoy), lebih rendah dibanding bulan sebelumnya.",
            date: "30 Mei 2025",
            time: "07:30 WIB",
            author: "MAB-News",
            image: "assets/images/inflasi-mei-2025-terkendali-di-level-24-persen.jpg",
            caption: "Ilustrasi Inflasi Mei 2025 Terkendali di Level 2,4 Persen.",
            content: [
                "Badan Pusat Statistik (BPS) melaporkan inflasi Mei 2025 berada di level 2,4 persen secara tahunan (yoy), lebih rendah dibanding bulan sebelumnya.",
                "Pemerintah menyebut langkah ini sebagai bagian dari upaya menjaga stabilitas dan kesejahteraan masyarakat secara menyeluruh.",
                "Sejumlah pemangku kepentingan turut dilibatkan agar kebijakan yang diambil dapat berjalan efektif hingga ke tingkat daerah.",
                "Pemerintah menegaskan akan terus memantau perkembangan di lapangan dan melakukan penyesuaian kebijakan apabila diperlukan.",
                "Nasional terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "hingga-april-2025-realisasi-investasi-capai-rp-4568-triliun": {
            category: "NASIONAL",
            title: "Hingga April 2025, Realisasi Investasi Capai Rp 456,8 Triliun",
            lead: "Kementerian Investasi/BKPM mencatat realisasi investasi hingga April 2025 mencapai Rp 456,8 triliun, tumbuh 12,7 persen dibanding periode yang sama tahun lalu.",
            date: "29 Mei 2025",
            time: "16:20 WIB",
            author: "MAB-News",
            image: "assets/images/hingga-april-2025-realisasi-investasi-capai-rp-4568-triliun.jpg",
            caption: "Ilustrasi Hingga April 2025, Realisasi Investasi Capai Rp 456,8 Triliun.",
            content: [
                "Kementerian Investasi/BKPM mencatat realisasi investasi hingga April 2025 mencapai Rp 456,8 triliun, tumbuh 12,7 persen dibanding periode yang sama tahun lalu.",
                "Pemerintah menyebut langkah ini sebagai bagian dari upaya menjaga stabilitas dan kesejahteraan masyarakat secara menyeluruh.",
                "Sejumlah pemangku kepentingan turut dilibatkan agar kebijakan yang diambil dapat berjalan efektif hingga ke tingkat daerah.",
                "Pemerintah menegaskan akan terus memantau perkembangan di lapangan dan melakukan penyesuaian kebijakan apabila diperlukan.",
                "Nasional terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "pemimpin-dunia-bahas-tantangan-ekonomi-global": {
            category: "INTERNASIONAL",
            title: "Pemimpin Dunia Bahas Tantangan Ekonomi Global",
            lead: "Sejumlah pemimpin dunia membahas berbagai tantangan ekonomi global dan strategi menghadapi ketidakpastian perdagangan internasional.",
            date: "30 Mei 2025",
            time: "09:20 WIB",
            author: "MAB-News",
            image: "assets/images/pemimpin-dunia-bahas-tantangan-ekonomi-global.jpg",
            caption: "Ilustrasi Pemimpin Dunia Bahas Tantangan Ekonomi Global.",
            content: [
                "Sejumlah pemimpin dunia membahas berbagai tantangan ekonomi global dan strategi menghadapi ketidakpastian perdagangan internasional.",
                "Sejumlah negara menyatakan komitmennya untuk terus memperkuat kerja sama demi menjaga stabilitas di kawasan maupun secara global.",
                "Isu ini turut menjadi perhatian berbagai pihak mengingat dampaknya yang dapat memengaruhi hubungan antarnegara secara luas.",
                "Para pengamat menilai perkembangan ini perlu terus dicermati mengingat implikasinya terhadap dinamika politik dan ekonomi dunia.",
                "Internasional terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "negara-negara-asia-perkuat-kerja-sama-ekonomi": {
            category: "INTERNASIONAL",
            title: "Negara-negara Asia Perkuat Kerja Sama Ekonomi",
            lead: "Kerja sama ekonomi antarnegara Asia terus diperkuat untuk menjaga stabilitas perdagangan dan investasi kawasan.",
            date: "29 Mei 2025",
            time: "18:10 WIB",
            author: "MAB-News",
            image: "assets/images/negara-negara-asia-perkuat-kerja-sama-ekonomi.jpg",
            caption: "Ilustrasi Negara-negara Asia Perkuat Kerja Sama Ekonomi.",
            content: [
                "Kerja sama ekonomi antarnegara Asia terus diperkuat untuk menjaga stabilitas perdagangan dan investasi kawasan.",
                "Sejumlah negara menyatakan komitmennya untuk terus memperkuat kerja sama demi menjaga stabilitas di kawasan maupun secara global.",
                "Isu ini turut menjadi perhatian berbagai pihak mengingat dampaknya yang dapat memengaruhi hubungan antarnegara secara luas.",
                "Para pengamat menilai perkembangan ini perlu terus dicermati mengingat implikasinya terhadap dinamika politik dan ekonomi dunia.",
                "Internasional terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "perkembangan-politik-global-jadi-perhatian-dunia": {
            category: "INTERNASIONAL",
            title: "Perkembangan Politik Global Jadi Perhatian Dunia",
            lead: "Perubahan politik di sejumlah negara menjadi perhatian karena berpotensi memengaruhi hubungan internasional.",
            date: "29 Mei 2025",
            time: "15:40 WIB",
            author: "MAB-News",
            image: "assets/images/perkembangan-politik-global-jadi-perhatian-dunia.jpg",
            caption: "Ilustrasi Perkembangan Politik Global Jadi Perhatian Dunia.",
            content: [
                "Perubahan politik di sejumlah negara menjadi perhatian karena berpotensi memengaruhi hubungan internasional.",
                "Sejumlah negara menyatakan komitmennya untuk terus memperkuat kerja sama demi menjaga stabilitas di kawasan maupun secara global.",
                "Isu ini turut menjadi perhatian berbagai pihak mengingat dampaknya yang dapat memengaruhi hubungan antarnegara secara luas.",
                "Para pengamat menilai perkembangan ini perlu terus dicermati mengingat implikasinya terhadap dinamika politik dan ekonomi dunia.",
                "Internasional terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "forum-internasional-bahas-masa-depan-teknologi": {
            category: "INTERNASIONAL",
            title: "Forum Internasional Bahas Masa Depan Teknologi",
            lead: "Forum internasional mempertemukan berbagai negara untuk membahas perkembangan teknologi dan dampaknya terhadap masyarakat.",
            date: "29 Mei 2025",
            time: "12:30 WIB",
            author: "MAB-News",
            image: "assets/images/forum-internasional-bahas-masa-depan-teknologi.jpg",
            caption: "Ilustrasi Forum Internasional Bahas Masa Depan Teknologi.",
            content: [
                "Forum internasional mempertemukan berbagai negara untuk membahas perkembangan teknologi dan dampaknya terhadap masyarakat.",
                "Sejumlah negara menyatakan komitmennya untuk terus memperkuat kerja sama demi menjaga stabilitas di kawasan maupun secara global.",
                "Isu ini turut menjadi perhatian berbagai pihak mengingat dampaknya yang dapat memengaruhi hubungan antarnegara secara luas.",
                "Para pengamat menilai perkembangan ini perlu terus dicermati mengingat implikasinya terhadap dinamika politik dan ekonomi dunia.",
                "Internasional terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "dunia-hadapi-tantangan-perubahan-iklim": {
            category: "INTERNASIONAL",
            title: "Dunia Hadapi Tantangan Perubahan Iklim",
            lead: "Berbagai negara kembali menyerukan kerja sama untuk menghadapi dampak perubahan iklim.",
            date: "28 Mei 2025",
            time: "20:10 WIB",
            author: "MAB-News",
            image: "assets/images/dunia-hadapi-tantangan-perubahan-iklim.jpg",
            caption: "Ilustrasi Dunia Hadapi Tantangan Perubahan Iklim.",
            content: [
                "Berbagai negara kembali menyerukan kerja sama untuk menghadapi dampak perubahan iklim.",
                "Sejumlah negara menyatakan komitmennya untuk terus memperkuat kerja sama demi menjaga stabilitas di kawasan maupun secara global.",
                "Isu ini turut menjadi perhatian berbagai pihak mengingat dampaknya yang dapat memengaruhi hubungan antarnegara secara luas.",
                "Para pengamat menilai perkembangan ini perlu terus dicermati mengingat implikasinya terhadap dinamika politik dan ekonomi dunia.",
                "Internasional terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "realisasi-investasi-indonesia-terus-menguat": {
            category: "EKONOMI",
            title: "Realisasi Investasi Indonesia Terus Menguat",
            lead: "Realisasi investasi nasional terus menunjukkan pertumbuhan positif seiring meningkatnya aktivitas ekonomi.",
            date: "29 Mei 2025",
            time: "16:20 WIB",
            author: "MAB-News",
            image: "assets/images/realisasi-investasi-indonesia-terus-menguat.jpg",
            caption: "Ilustrasi Realisasi Investasi Indonesia Terus Menguat.",
            content: [
                "Realisasi investasi nasional terus menunjukkan pertumbuhan positif seiring meningkatnya aktivitas ekonomi.",
                "Sejumlah pelaku usaha menyambut positif perkembangan ini karena dinilai dapat memberikan dampak baik terhadap iklim usaha nasional.",
                "Pemerintah menyebut kebijakan yang diambil bertujuan menjaga stabilitas ekonomi sekaligus mendorong pertumbuhan yang berkelanjutan.",
                "Ke depan, pemerintah dan pelaku usaha diharapkan dapat terus bersinergi guna menghadapi tantangan ekonomi yang dinamis.",
                "Ekonomi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "rupiah-bergerak-stabil-di-tengah-ketidakpastian-global": {
            category: "EKONOMI",
            title: "Rupiah Bergerak Stabil di Tengah Ketidakpastian Global",
            lead: "Nilai tukar rupiah bergerak relatif stabil setelah pasar merespons perkembangan ekonomi global.",
            date: "29 Mei 2025",
            time: "13:40 WIB",
            author: "MAB-News",
            image: "assets/images/rupiah-bergerak-stabil-di-tengah-ketidakpastian-global.jpg",
            caption: "Ilustrasi Rupiah Bergerak Stabil di Tengah Ketidakpastian Global.",
            content: [
                "Nilai tukar rupiah bergerak relatif stabil setelah pasar merespons perkembangan ekonomi global.",
                "Sejumlah pelaku usaha menyambut positif perkembangan ini karena dinilai dapat memberikan dampak baik terhadap iklim usaha nasional.",
                "Pemerintah menyebut kebijakan yang diambil bertujuan menjaga stabilitas ekonomi sekaligus mendorong pertumbuhan yang berkelanjutan.",
                "Ke depan, pemerintah dan pelaku usaha diharapkan dapat terus bersinergi guna menghadapi tantangan ekonomi yang dinamis.",
                "Ekonomi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "pemerintah-dorong-pertumbuhan-umkm": {
            category: "EKONOMI",
            title: "Pemerintah Dorong Pertumbuhan UMKM",
            lead: "Pemerintah menyiapkan sejumlah kebijakan untuk memperkuat sektor usaha mikro, kecil, dan menengah.",
            date: "28 Mei 2025",
            time: "17:15 WIB",
            author: "MAB-News",
            image: "assets/images/pemerintah-dorong-pertumbuhan-umkm.jpg",
            caption: "Ilustrasi Pemerintah Dorong Pertumbuhan UMKM.",
            content: [
                "Pemerintah menyiapkan sejumlah kebijakan untuk memperkuat sektor usaha mikro, kecil, dan menengah.",
                "Sejumlah pelaku usaha menyambut positif perkembangan ini karena dinilai dapat memberikan dampak baik terhadap iklim usaha nasional.",
                "Pemerintah menyebut kebijakan yang diambil bertujuan menjaga stabilitas ekonomi sekaligus mendorong pertumbuhan yang berkelanjutan.",
                "Ke depan, pemerintah dan pelaku usaha diharapkan dapat terus bersinergi guna menghadapi tantangan ekonomi yang dinamis.",
                "Ekonomi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "perdagangan-indonesia-terus-mengalami-pertumbuhan": {
            category: "EKONOMI",
            title: "Perdagangan Indonesia Terus Mengalami Pertumbuhan",
            lead: "Aktivitas perdagangan menunjukkan perkembangan positif seiring meningkatnya permintaan sejumlah komoditas.",
            date: "28 Mei 2025",
            time: "10:25 WIB",
            author: "MAB-News",
            image: "assets/images/perdagangan-indonesia-terus-mengalami-pertumbuhan.jpg",
            caption: "Ilustrasi Perdagangan Indonesia Terus Mengalami Pertumbuhan.",
            content: [
                "Aktivitas perdagangan menunjukkan perkembangan positif seiring meningkatnya permintaan sejumlah komoditas.",
                "Sejumlah pelaku usaha menyambut positif perkembangan ini karena dinilai dapat memberikan dampak baik terhadap iklim usaha nasional.",
                "Pemerintah menyebut kebijakan yang diambil bertujuan menjaga stabilitas ekonomi sekaligus mendorong pertumbuhan yang berkelanjutan.",
                "Ke depan, pemerintah dan pelaku usaha diharapkan dapat terus bersinergi guna menghadapi tantangan ekonomi yang dinamis.",
                "Ekonomi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "layanan-transportasi-kota-terus-ditingkatkan": {
            category: "METRO",
            title: "Layanan Transportasi Kota Terus Ditingkatkan",
            lead: "Pemerintah daerah meningkatkan kualitas transportasi untuk mendukung mobilitas masyarakat perkotaan.",
            date: "30 Mei 2025",
            time: "09:00 WIB",
            author: "MAB-News",
            image: "assets/images/layanan-transportasi-kota-terus-ditingkatkan.jpg",
            caption: "Ilustrasi Layanan Transportasi Kota Terus Ditingkatkan.",
            content: [
                "Pemerintah daerah meningkatkan kualitas transportasi untuk mendukung mobilitas masyarakat perkotaan.",
                "Pemerintah kota menyebut langkah ini sebagai bagian dari upaya meningkatkan kenyamanan dan kualitas hidup warga di perkotaan.",
                "Sejumlah warga menyambut baik perkembangan ini karena dinilai dapat mempermudah aktivitas sehari-hari di tengah kota.",
                "Pemerintah kota berkomitmen untuk terus mengevaluasi dan meningkatkan pelayanan demi kenyamanan bersama.",
                "Metro terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "sejumlah-jalan-utama-kota-mulai-ditata": {
            category: "METRO",
            title: "Sejumlah Jalan Utama Kota Mulai Ditata",
            lead: "Penataan sejumlah ruas jalan dilakukan untuk meningkatkan keamanan dan kenyamanan pengguna jalan.",
            date: "29 Mei 2025",
            time: "17:20 WIB",
            author: "MAB-News",
            image: "assets/images/sejumlah-jalan-utama-kota-mulai-ditata.jpg",
            caption: "Ilustrasi Sejumlah Jalan Utama Kota Mulai Ditata.",
            content: [
                "Penataan sejumlah ruas jalan dilakukan untuk meningkatkan keamanan dan kenyamanan pengguna jalan.",
                "Pemerintah kota menyebut langkah ini sebagai bagian dari upaya meningkatkan kenyamanan dan kualitas hidup warga di perkotaan.",
                "Sejumlah warga menyambut baik perkembangan ini karena dinilai dapat mempermudah aktivitas sehari-hari di tengah kota.",
                "Pemerintah kota berkomitmen untuk terus mengevaluasi dan meningkatkan pelayanan demi kenyamanan bersama.",
                "Metro terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "pelayanan-publik-di-kota-mulai-berbasis-digital": {
            category: "METRO",
            title: "Pelayanan Publik di Kota Mulai Berbasis Digital",
            lead: "Pemerintah kota memperluas penggunaan layanan digital untuk memudahkan masyarakat.",
            date: "29 Mei 2025",
            time: "14:00 WIB",
            author: "MAB-News",
            image: "assets/images/pelayanan-publik-di-kota-mulai-berbasis-digital.jpg",
            caption: "Ilustrasi Pelayanan Publik di Kota Mulai Berbasis Digital.",
            content: [
                "Pemerintah kota memperluas penggunaan layanan digital untuk memudahkan masyarakat.",
                "Pemerintah kota menyebut langkah ini sebagai bagian dari upaya meningkatkan kenyamanan dan kualitas hidup warga di perkotaan.",
                "Sejumlah warga menyambut baik perkembangan ini karena dinilai dapat mempermudah aktivitas sehari-hari di tengah kota.",
                "Pemerintah kota berkomitmen untuk terus mengevaluasi dan meningkatkan pelayanan demi kenyamanan bersama.",
                "Metro terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "masyarakat-diminta-waspada-cuaca-ekstrem": {
            category: "METRO",
            title: "Masyarakat Diminta Waspada Cuaca Ekstrem",
            lead: "Masyarakat di sejumlah wilayah perkotaan diminta meningkatkan kewaspadaan terhadap perubahan cuaca.",
            date: "28 Mei 2025",
            time: "19:15 WIB",
            author: "MAB-News",
            image: "assets/images/masyarakat-diminta-waspada-cuaca-ekstrem.jpg",
            caption: "Ilustrasi Masyarakat Diminta Waspada Cuaca Ekstrem.",
            content: [
                "Masyarakat di sejumlah wilayah perkotaan diminta meningkatkan kewaspadaan terhadap perubahan cuaca.",
                "Pemerintah kota menyebut langkah ini sebagai bagian dari upaya meningkatkan kenyamanan dan kualitas hidup warga di perkotaan.",
                "Sejumlah warga menyambut baik perkembangan ini karena dinilai dapat mempermudah aktivitas sehari-hari di tengah kota.",
                "Pemerintah kota berkomitmen untuk terus mengevaluasi dan meningkatkan pelayanan demi kenyamanan bersama.",
                "Metro terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "ruang-publik-baru-hadir-untuk-warga": {
            category: "METRO",
            title: "Ruang Publik Baru Hadir untuk Warga",
            lead: "Sejumlah ruang publik baru disiapkan untuk meningkatkan kualitas lingkungan perkotaan.",
            date: "28 Mei 2025",
            time: "11:10 WIB",
            author: "MAB-News",
            image: "assets/images/ruang-publik-baru-hadir-untuk-warga.jpg",
            caption: "Ilustrasi Ruang Publik Baru Hadir untuk Warga.",
            content: [
                "Sejumlah ruang publik baru disiapkan untuk meningkatkan kualitas lingkungan perkotaan.",
                "Pemerintah kota menyebut langkah ini sebagai bagian dari upaya meningkatkan kenyamanan dan kualitas hidup warga di perkotaan.",
                "Sejumlah warga menyambut baik perkembangan ini karena dinilai dapat mempermudah aktivitas sehari-hari di tengah kota.",
                "Pemerintah kota berkomitmen untuk terus mengevaluasi dan meningkatkan pelayanan demi kenyamanan bersama.",
                "Metro terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "situasi-geopolitik-dunia-terus-menjadi-perhatian": {
            category: "DUNIA",
            title: "Situasi Geopolitik Dunia Terus Menjadi Perhatian",
            lead: "Perkembangan geopolitik global terus menjadi perhatian berbagai negara.",
            date: "30 Mei 2025",
            time: "10:20 WIB",
            author: "MAB-News",
            image: "assets/images/situasi-geopolitik-dunia-terus-menjadi-perhatian.jpg",
            caption: "Ilustrasi Situasi Geopolitik Dunia Terus Menjadi Perhatian.",
            content: [
                "Perkembangan geopolitik global terus menjadi perhatian berbagai negara.",
                "Perkembangan ini turut mendapat sorotan dari berbagai negara mengingat dampaknya terhadap stabilitas kawasan maupun global.",
                "Sejumlah pihak internasional menekankan pentingnya dialog dan kerja sama untuk menghadapi tantangan yang ada bersama-sama.",
                "Situasi ini diperkirakan akan terus berkembang dan menjadi perhatian utama dalam berbagai forum internasional mendatang.",
                "Dunia terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "negara-negara-dorong-diplomasi-untuk-menjaga-perdamaian": {
            category: "DUNIA",
            title: "Negara-negara Dorong Diplomasi untuk Menjaga Perdamaian",
            lead: "Upaya diplomasi kembali didorong untuk menjaga stabilitas dan perdamaian dunia.",
            date: "29 Mei 2025",
            time: "18:20 WIB",
            author: "MAB-News",
            image: "assets/images/negara-negara-dorong-diplomasi-untuk-menjaga-perdamaian.jpg",
            caption: "Ilustrasi Negara-negara Dorong Diplomasi untuk Menjaga Perdamaian.",
            content: [
                "Upaya diplomasi kembali didorong untuk menjaga stabilitas dan perdamaian dunia.",
                "Perkembangan ini turut mendapat sorotan dari berbagai negara mengingat dampaknya terhadap stabilitas kawasan maupun global.",
                "Sejumlah pihak internasional menekankan pentingnya dialog dan kerja sama untuk menghadapi tantangan yang ada bersama-sama.",
                "Situasi ini diperkirakan akan terus berkembang dan menjadi perhatian utama dalam berbagai forum internasional mendatang.",
                "Dunia terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "pbb-bahas-tantangan-kemanusiaan-global": {
            category: "DUNIA",
            title: "PBB Bahas Tantangan Kemanusiaan Global",
            lead: "Perserikatan Bangsa-Bangsa membahas sejumlah tantangan kemanusiaan yang terjadi di berbagai kawasan.",
            date: "29 Mei 2025",
            time: "15:30 WIB",
            author: "MAB-News",
            image: "assets/images/pbb-bahas-tantangan-kemanusiaan-global.jpg",
            caption: "Ilustrasi PBB Bahas Tantangan Kemanusiaan Global.",
            content: [
                "Perserikatan Bangsa-Bangsa membahas sejumlah tantangan kemanusiaan yang terjadi di berbagai kawasan.",
                "Perkembangan ini turut mendapat sorotan dari berbagai negara mengingat dampaknya terhadap stabilitas kawasan maupun global.",
                "Sejumlah pihak internasional menekankan pentingnya dialog dan kerja sama untuk menghadapi tantangan yang ada bersama-sama.",
                "Situasi ini diperkirakan akan terus berkembang dan menjadi perhatian utama dalam berbagai forum internasional mendatang.",
                "Dunia terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "kerja-sama-antarnegara-terus-diperkuat": {
            category: "DUNIA",
            title: "Kerja Sama Antarnegara Terus Diperkuat",
            lead: "Berbagai negara memperkuat kerja sama dalam menghadapi tantangan global.",
            date: "28 Mei 2025",
            time: "16:10 WIB",
            author: "MAB-News",
            image: "assets/images/kerja-sama-antarnegara-terus-diperkuat.jpg",
            caption: "Ilustrasi Kerja Sama Antarnegara Terus Diperkuat.",
            content: [
                "Berbagai negara memperkuat kerja sama dalam menghadapi tantangan global.",
                "Perkembangan ini turut mendapat sorotan dari berbagai negara mengingat dampaknya terhadap stabilitas kawasan maupun global.",
                "Sejumlah pihak internasional menekankan pentingnya dialog dan kerja sama untuk menghadapi tantangan yang ada bersama-sama.",
                "Situasi ini diperkirakan akan terus berkembang dan menjadi perhatian utama dalam berbagai forum internasional mendatang.",
                "Dunia terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "perubahan-global-pengaruhi-peta-ekonomi-dunia": {
            category: "DUNIA",
            title: "Perubahan Global Pengaruhi Peta Ekonomi Dunia",
            lead: "Perubahan kondisi global memberikan dampak terhadap perekonomian berbagai negara.",
            date: "28 Mei 2025",
            time: "09:40 WIB",
            author: "MAB-News",
            image: "assets/images/perubahan-global-pengaruhi-peta-ekonomi-dunia.jpg",
            caption: "Ilustrasi Perubahan Global Pengaruhi Peta Ekonomi Dunia.",
            content: [
                "Perubahan kondisi global memberikan dampak terhadap perekonomian berbagai negara.",
                "Perkembangan ini turut mendapat sorotan dari berbagai negara mengingat dampaknya terhadap stabilitas kawasan maupun global.",
                "Sejumlah pihak internasional menekankan pentingnya dialog dan kerja sama untuk menghadapi tantangan yang ada bersama-sama.",
                "Situasi ini diperkirakan akan terus berkembang dan menjadi perhatian utama dalam berbagai forum internasional mendatang.",
                "Dunia terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "persiapan-tim-nasional-terus-dimatangkan": {
            category: "OLAHRAGA",
            title: "Persiapan Tim Nasional Terus Dimatangkan",
            lead: "Pelatih terus mematangkan strategi dan komposisi pemain menjelang pertandingan berikutnya.",
            date: "29 Mei 2025",
            time: "19:10 WIB",
            author: "MAB-News",
            image: "assets/images/persiapan-tim-nasional-terus-dimatangkan.jpg",
            caption: "Ilustrasi Persiapan Tim Nasional Terus Dimatangkan.",
            content: [
                "Pelatih terus mematangkan strategi dan komposisi pemain menjelang pertandingan berikutnya.",
                "Tim pelatih terus memantapkan strategi dan performa atlet menjelang laga maupun kompetisi mendatang.",
                "Dukungan dari suporter dinilai menjadi salah satu faktor penting yang dapat meningkatkan motivasi para atlet di lapangan.",
                "Semua pihak berharap performa yang ditunjukkan dapat membawa hasil terbaik bagi olahraga Indonesia ke depannya.",
                "Olahraga terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "kompetisi-nasional-memasuki-fase-penentuan": {
            category: "OLAHRAGA",
            title: "Kompetisi Nasional Memasuki Fase Penentuan",
            lead: "Persaingan sejumlah klub semakin ketat menjelang pertandingan penentuan.",
            date: "29 Mei 2025",
            time: "15:30 WIB",
            author: "MAB-News",
            image: "assets/images/kompetisi-nasional-memasuki-fase-penentuan.jpg",
            caption: "Ilustrasi Kompetisi Nasional Memasuki Fase Penentuan.",
            content: [
                "Persaingan sejumlah klub semakin ketat menjelang pertandingan penentuan.",
                "Tim pelatih terus memantapkan strategi dan performa atlet menjelang laga maupun kompetisi mendatang.",
                "Dukungan dari suporter dinilai menjadi salah satu faktor penting yang dapat meningkatkan motivasi para atlet di lapangan.",
                "Semua pihak berharap performa yang ditunjukkan dapat membawa hasil terbaik bagi olahraga Indonesia ke depannya.",
                "Olahraga terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "atlet-indonesia-bersiap-hadapi-kompetisi-internasional": {
            category: "OLAHRAGA",
            title: "Atlet Indonesia Bersiap Hadapi Kompetisi Internasional",
            lead: "Sejumlah atlet nasional bersiap mengikuti kompetisi olahraga tingkat internasional.",
            date: "28 Mei 2025",
            time: "13:20 WIB",
            author: "MAB-News",
            image: "assets/images/atlet-indonesia-bersiap-hadapi-kompetisi-internasional.jpg",
            caption: "Ilustrasi Atlet Indonesia Bersiap Hadapi Kompetisi Internasional.",
            content: [
                "Sejumlah atlet nasional bersiap mengikuti kompetisi olahraga tingkat internasional.",
                "Tim pelatih terus memantapkan strategi dan performa atlet menjelang laga maupun kompetisi mendatang.",
                "Dukungan dari suporter dinilai menjadi salah satu faktor penting yang dapat meningkatkan motivasi para atlet di lapangan.",
                "Semua pihak berharap performa yang ditunjukkan dapat membawa hasil terbaik bagi olahraga Indonesia ke depannya.",
                "Olahraga terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "prestasi-olahraga-indonesia-terus-berkembang": {
            category: "OLAHRAGA",
            title: "Prestasi Olahraga Indonesia Terus Berkembang",
            lead: "Pembinaan atlet menjadi salah satu fokus untuk meningkatkan prestasi olahraga nasional.",
            date: "28 Mei 2025",
            time: "09:10 WIB",
            author: "MAB-News",
            image: "assets/images/prestasi-olahraga-indonesia-terus-berkembang.jpg",
            caption: "Ilustrasi Prestasi Olahraga Indonesia Terus Berkembang.",
            content: [
                "Pembinaan atlet menjadi salah satu fokus untuk meningkatkan prestasi olahraga nasional.",
                "Tim pelatih terus memantapkan strategi dan performa atlet menjelang laga maupun kompetisi mendatang.",
                "Dukungan dari suporter dinilai menjadi salah satu faktor penting yang dapat meningkatkan motivasi para atlet di lapangan.",
                "Semua pihak berharap performa yang ditunjukkan dapat membawa hasil terbaik bagi olahraga Indonesia ke depannya.",
                "Olahraga terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "perkembangan-kecerdasan-buatan-semakin-pesat": {
            category: "TEKNOLOGI",
            title: "Perkembangan Kecerdasan Buatan Semakin Pesat",
            lead: "Teknologi kecerdasan buatan terus berkembang dan mulai digunakan dalam berbagai sektor kehidupan.",
            date: "30 Mei 2025",
            time: "11:00 WIB",
            author: "MAB-News",
            image: "assets/images/perkembangan-kecerdasan-buatan-semakin-pesat.jpg",
            caption: "Ilustrasi Perkembangan Kecerdasan Buatan Semakin Pesat.",
            content: [
                "Teknologi kecerdasan buatan terus berkembang dan mulai digunakan dalam berbagai sektor kehidupan.",
                "Perkembangan ini dinilai dapat membawa dampak signifikan terhadap cara masyarakat mengakses dan memanfaatkan teknologi sehari-hari.",
                "Sejumlah pelaku industri menilai inovasi tersebut berpotensi mendorong efisiensi sekaligus membuka peluang baru di berbagai sektor.",
                "Ke depan, adopsi teknologi ini diperkirakan akan terus berkembang seiring meningkatnya kebutuhan masyarakat akan solusi digital.",
                "Teknologi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "ai-mulai-mengubah-cara-masyarakat-bekerja": {
            category: "TEKNOLOGI",
            title: "AI Mulai Mengubah Cara Masyarakat Bekerja",
            lead: "Penggunaan AI semakin luas dan mulai mengubah berbagai proses pekerjaan.",
            date: "29 Mei 2025",
            time: "16:30 WIB",
            author: "MAB-News",
            image: "assets/images/ai-mulai-mengubah-cara-masyarakat-bekerja.jpg",
            caption: "Ilustrasi AI Mulai Mengubah Cara Masyarakat Bekerja.",
            content: [
                "Penggunaan AI semakin luas dan mulai mengubah berbagai proses pekerjaan.",
                "Perkembangan ini dinilai dapat membawa dampak signifikan terhadap cara masyarakat mengakses dan memanfaatkan teknologi sehari-hari.",
                "Sejumlah pelaku industri menilai inovasi tersebut berpotensi mendorong efisiensi sekaligus membuka peluang baru di berbagai sektor.",
                "Ke depan, adopsi teknologi ini diperkirakan akan terus berkembang seiring meningkatnya kebutuhan masyarakat akan solusi digital.",
                "Teknologi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "keamanan-data-menjadi-perhatian-utama": {
            category: "TEKNOLOGI",
            title: "Keamanan Data Menjadi Perhatian Utama",
            lead: "Perlindungan data pribadi semakin penting di tengah meningkatnya aktivitas digital.",
            date: "29 Mei 2025",
            time: "14:15 WIB",
            author: "MAB-News",
            image: "assets/images/keamanan-data-menjadi-perhatian-utama.jpg",
            caption: "Ilustrasi Keamanan Data Menjadi Perhatian Utama.",
            content: [
                "Perlindungan data pribadi semakin penting di tengah meningkatnya aktivitas digital.",
                "Perkembangan ini dinilai dapat membawa dampak signifikan terhadap cara masyarakat mengakses dan memanfaatkan teknologi sehari-hari.",
                "Sejumlah pelaku industri menilai inovasi tersebut berpotensi mendorong efisiensi sekaligus membuka peluang baru di berbagai sektor.",
                "Ke depan, adopsi teknologi ini diperkirakan akan terus berkembang seiring meningkatnya kebutuhan masyarakat akan solusi digital.",
                "Teknologi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "startup-indonesia-terus-mengembangkan-inovasi": {
            category: "TEKNOLOGI",
            title: "Startup Indonesia Terus Mengembangkan Inovasi",
            lead: "Ekosistem startup nasional terus berkembang dengan hadirnya berbagai inovasi baru.",
            date: "28 Mei 2025",
            time: "17:40 WIB",
            author: "MAB-News",
            image: "assets/images/startup-indonesia-terus-mengembangkan-inovasi.jpg",
            caption: "Ilustrasi Startup Indonesia Terus Mengembangkan Inovasi.",
            content: [
                "Ekosistem startup nasional terus berkembang dengan hadirnya berbagai inovasi baru.",
                "Perkembangan ini dinilai dapat membawa dampak signifikan terhadap cara masyarakat mengakses dan memanfaatkan teknologi sehari-hari.",
                "Sejumlah pelaku industri menilai inovasi tersebut berpotensi mendorong efisiensi sekaligus membuka peluang baru di berbagai sektor.",
                "Ke depan, adopsi teknologi ini diperkirakan akan terus berkembang seiring meningkatnya kebutuhan masyarakat akan solusi digital.",
                "Teknologi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "transformasi-digital-terus-berlanjut": {
            category: "TEKNOLOGI",
            title: "Transformasi Digital Terus Berlanjut",
            lead: "Transformasi digital menjadi bagian penting dari perkembangan berbagai sektor.",
            date: "28 Mei 2025",
            time: "10:30 WIB",
            author: "MAB-News",
            image: "assets/images/transformasi-digital-terus-berlanjut.jpg",
            caption: "Ilustrasi Transformasi Digital Terus Berlanjut.",
            content: [
                "Transformasi digital menjadi bagian penting dari perkembangan berbagai sektor.",
                "Perkembangan ini dinilai dapat membawa dampak signifikan terhadap cara masyarakat mengakses dan memanfaatkan teknologi sehari-hari.",
                "Sejumlah pelaku industri menilai inovasi tersebut berpotensi mendorong efisiensi sekaligus membuka peluang baru di berbagai sektor.",
                "Ke depan, adopsi teknologi ini diperkirakan akan terus berkembang seiring meningkatnya kebutuhan masyarakat akan solusi digital.",
                "Teknologi terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "industri-kendaraan-listrik-indonesia-terus-berkembang": {
            category: "OTOMOTIF",
            title: "Industri Kendaraan Listrik Indonesia Terus Berkembang",
            lead: "Industri kendaraan listrik terus menunjukkan perkembangan seiring meningkatnya minat masyarakat.",
            date: "30 Mei 2025",
            time: "09:45 WIB",
            author: "MAB-News",
            image: "assets/images/industri-kendaraan-listrik-indonesia-terus-berkembang.jpg",
            caption: "Ilustrasi Industri Kendaraan Listrik Indonesia Terus Berkembang.",
            content: [
                "Industri kendaraan listrik terus menunjukkan perkembangan seiring meningkatnya minat masyarakat.",
                "Produsen menyebut perkembangan ini sebagai bagian dari upaya menghadirkan produk yang sesuai dengan kebutuhan pasar saat ini.",
                "Konsumen dinilai semakin selektif dalam memilih kendaraan, terutama yang menawarkan efisiensi dan teknologi terkini.",
                "Ke depan, industri otomotif nasional diperkirakan masih akan terus bertumbuh seiring meningkatnya permintaan pasar.",
                "Otomotif terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "produsen-otomotif-siapkan-model-kendaraan-baru": {
            category: "OTOMOTIF",
            title: "Produsen Otomotif Siapkan Model Kendaraan Baru",
            lead: "Sejumlah produsen otomotif menyiapkan model kendaraan baru untuk pasar Indonesia.",
            date: "29 Mei 2025",
            time: "17:30 WIB",
            author: "MAB-News",
            image: "assets/images/produsen-otomotif-siapkan-model-kendaraan-baru.jpg",
            caption: "Ilustrasi Produsen Otomotif Siapkan Model Kendaraan Baru.",
            content: [
                "Sejumlah produsen otomotif menyiapkan model kendaraan baru untuk pasar Indonesia.",
                "Produsen menyebut perkembangan ini sebagai bagian dari upaya menghadirkan produk yang sesuai dengan kebutuhan pasar saat ini.",
                "Konsumen dinilai semakin selektif dalam memilih kendaraan, terutama yang menawarkan efisiensi dan teknologi terkini.",
                "Ke depan, industri otomotif nasional diperkirakan masih akan terus bertumbuh seiring meningkatnya permintaan pasar.",
                "Otomotif terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "teknologi-kendaraan-semakin-canggih": {
            category: "OTOMOTIF",
            title: "Teknologi Kendaraan Semakin Canggih",
            lead: "Berbagai teknologi baru mulai diterapkan pada kendaraan modern.",
            date: "29 Mei 2025",
            time: "13:20 WIB",
            author: "MAB-News",
            image: "assets/images/teknologi-kendaraan-semakin-canggih.jpg",
            caption: "Ilustrasi Teknologi Kendaraan Semakin Canggih.",
            content: [
                "Berbagai teknologi baru mulai diterapkan pada kendaraan modern.",
                "Produsen menyebut perkembangan ini sebagai bagian dari upaya menghadirkan produk yang sesuai dengan kebutuhan pasar saat ini.",
                "Konsumen dinilai semakin selektif dalam memilih kendaraan, terutama yang menawarkan efisiensi dan teknologi terkini.",
                "Ke depan, industri otomotif nasional diperkirakan masih akan terus bertumbuh seiring meningkatnya permintaan pasar.",
                "Otomotif terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "penjualan-kendaraan-mulai-menguat": {
            category: "OTOMOTIF",
            title: "Penjualan Kendaraan Mulai Menguat",
            lead: "Pasar otomotif menunjukkan tanda-tanda penguatan setelah periode sebelumnya.",
            date: "28 Mei 2025",
            time: "15:10 WIB",
            author: "MAB-News",
            image: "assets/images/penjualan-kendaraan-mulai-menguat.jpg",
            caption: "Ilustrasi Penjualan Kendaraan Mulai Menguat.",
            content: [
                "Pasar otomotif menunjukkan tanda-tanda penguatan setelah periode sebelumnya.",
                "Produsen menyebut perkembangan ini sebagai bagian dari upaya menghadirkan produk yang sesuai dengan kebutuhan pasar saat ini.",
                "Konsumen dinilai semakin selektif dalam memilih kendaraan, terutama yang menawarkan efisiensi dan teknologi terkini.",
                "Ke depan, industri otomotif nasional diperkirakan masih akan terus bertumbuh seiring meningkatnya permintaan pasar.",
                "Otomotif terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "kendaraan-ramah-lingkungan-jadi-tren-baru": {
            category: "OTOMOTIF",
            title: "Kendaraan Ramah Lingkungan Jadi Tren Baru",
            lead: "Kesadaran terhadap lingkungan mendorong perkembangan kendaraan ramah lingkungan.",
            date: "28 Mei 2025",
            time: "09:30 WIB",
            author: "MAB-News",
            image: "assets/images/kendaraan-ramah-lingkungan-jadi-tren-baru.jpg",
            caption: "Ilustrasi Kendaraan Ramah Lingkungan Jadi Tren Baru.",
            content: [
                "Kesadaran terhadap lingkungan mendorong perkembangan kendaraan ramah lingkungan.",
                "Produsen menyebut perkembangan ini sebagai bagian dari upaya menghadirkan produk yang sesuai dengan kebutuhan pasar saat ini.",
                "Konsumen dinilai semakin selektif dalam memilih kendaraan, terutama yang menawarkan efisiensi dan teknologi terkini.",
                "Ke depan, industri otomotif nasional diperkirakan masih akan terus bertumbuh seiring meningkatnya permintaan pasar.",
                "Otomotif terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "tren-gaya-hidup-digital-semakin-berkembang": {
            category: "GAYA HIDUP",
            title: "Tren Gaya Hidup Digital Semakin Berkembang",
            lead: "Perkembangan teknologi turut memengaruhi berbagai kebiasaan dan gaya hidup masyarakat.",
            date: "30 Mei 2025",
            time: "10:30 WIB",
            author: "MAB-News",
            image: "assets/images/tren-gaya-hidup-digital-semakin-berkembang.jpg",
            caption: "Ilustrasi Tren Gaya Hidup Digital Semakin Berkembang.",
            content: [
                "Perkembangan teknologi turut memengaruhi berbagai kebiasaan dan gaya hidup masyarakat.",
                "Tren ini dinilai mencerminkan perubahan gaya hidup masyarakat yang semakin dinamis di tengah perkembangan zaman.",
                "Sejumlah kalangan menilai perkembangan ini turut membuka peluang baru bagi pelaku usaha di sektor terkait.",
                "Fenomena ini diperkirakan akan terus berkembang seiring meningkatnya minat masyarakat terhadap gaya hidup baru tersebut.",
                "Gaya Hidup terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "destinasi-wisata-favorit-mulai-ramai-dikunjungi": {
            category: "GAYA HIDUP",
            title: "Destinasi Wisata Favorit Mulai Ramai Dikunjungi",
            lead: "Sejumlah destinasi wisata kembali menjadi pilihan masyarakat untuk menghabiskan waktu liburan.",
            date: "29 Mei 2025",
            time: "16:00 WIB",
            author: "MAB-News",
            image: "assets/images/destinasi-wisata-favorit-mulai-ramai-dikunjungi.jpg",
            caption: "Ilustrasi Destinasi Wisata Favorit Mulai Ramai Dikunjungi.",
            content: [
                "Sejumlah destinasi wisata kembali menjadi pilihan masyarakat untuk menghabiskan waktu liburan.",
                "Tren ini dinilai mencerminkan perubahan gaya hidup masyarakat yang semakin dinamis di tengah perkembangan zaman.",
                "Sejumlah kalangan menilai perkembangan ini turut membuka peluang baru bagi pelaku usaha di sektor terkait.",
                "Fenomena ini diperkirakan akan terus berkembang seiring meningkatnya minat masyarakat terhadap gaya hidup baru tersebut.",
                "Gaya Hidup terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "tren-kuliner-baru-menarik-perhatian-masyarakat": {
            category: "GAYA HIDUP",
            title: "Tren Kuliner Baru Menarik Perhatian Masyarakat",
            lead: "Berbagai inovasi kuliner terus bermunculan dan menjadi tren baru.",
            date: "29 Mei 2025",
            time: "12:30 WIB",
            author: "MAB-News",
            image: "assets/images/tren-kuliner-baru-menarik-perhatian-masyarakat.jpg",
            caption: "Ilustrasi Tren Kuliner Baru Menarik Perhatian Masyarakat.",
            content: [
                "Berbagai inovasi kuliner terus bermunculan dan menjadi tren baru.",
                "Tren ini dinilai mencerminkan perubahan gaya hidup masyarakat yang semakin dinamis di tengah perkembangan zaman.",
                "Sejumlah kalangan menilai perkembangan ini turut membuka peluang baru bagi pelaku usaha di sektor terkait.",
                "Fenomena ini diperkirakan akan terus berkembang seiring meningkatnya minat masyarakat terhadap gaya hidup baru tersebut.",
                "Gaya Hidup terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "masyarakat-semakin-memperhatikan-pola-hidup-seimbang": {
            category: "GAYA HIDUP",
            title: "Masyarakat Semakin Memperhatikan Pola Hidup Seimbang",
            lead: "Kesadaran masyarakat terhadap pola hidup yang lebih seimbang terus meningkat.",
            date: "28 Mei 2025",
            time: "15:20 WIB",
            author: "MAB-News",
            image: "assets/images/masyarakat-semakin-memperhatikan-pola-hidup-seimbang.jpg",
            caption: "Ilustrasi Masyarakat Semakin Memperhatikan Pola Hidup Seimbang.",
            content: [
                "Kesadaran masyarakat terhadap pola hidup yang lebih seimbang terus meningkat.",
                "Tren ini dinilai mencerminkan perubahan gaya hidup masyarakat yang semakin dinamis di tengah perkembangan zaman.",
                "Sejumlah kalangan menilai perkembangan ini turut membuka peluang baru bagi pelaku usaha di sektor terkait.",
                "Fenomena ini diperkirakan akan terus berkembang seiring meningkatnya minat masyarakat terhadap gaya hidup baru tersebut.",
                "Gaya Hidup terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "tren-baru-di-kalangan-generasi-muda": {
            category: "GAYA HIDUP",
            title: "Tren Baru di Kalangan Generasi Muda",
            lead: "Berbagai tren baru berkembang seiring perubahan kebiasaan generasi muda.",
            date: "28 Mei 2025",
            time: "09:15 WIB",
            author: "MAB-News",
            image: "assets/images/tren-baru-di-kalangan-generasi-muda.jpg",
            caption: "Ilustrasi Tren Baru di Kalangan Generasi Muda.",
            content: [
                "Berbagai tren baru berkembang seiring perubahan kebiasaan generasi muda.",
                "Tren ini dinilai mencerminkan perubahan gaya hidup masyarakat yang semakin dinamis di tengah perkembangan zaman.",
                "Sejumlah kalangan menilai perkembangan ini turut membuka peluang baru bagi pelaku usaha di sektor terkait.",
                "Fenomena ini diperkirakan akan terus berkembang seiring meningkatnya minat masyarakat terhadap gaya hidup baru tersebut.",
                "Gaya Hidup terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "seniman-indonesia-hadirkan-karya-baru": {
            category: "SENI",
            title: "Seniman Indonesia Hadirkan Karya Baru",
            lead: "Sejumlah seniman Indonesia menghadirkan karya baru yang mengangkat berbagai isu sosial dan budaya.",
            date: "30 Mei 2025",
            time: "11:20 WIB",
            author: "MAB-News",
            image: "assets/images/seniman-indonesia-hadirkan-karya-baru.jpg",
            caption: "Ilustrasi Seniman Indonesia Hadirkan Karya Baru.",
            content: [
                "Sejumlah seniman Indonesia menghadirkan karya baru yang mengangkat berbagai isu sosial dan budaya.",
                "Karya ini mendapat apresiasi positif dari berbagai kalangan karena dinilai menghadirkan perspektif baru yang segar.",
                "Para pelaku seni menilai perkembangan ini dapat menjadi ruang baru bagi eksplorasi kreativitas di tanah air.",
                "Dukungan terhadap perkembangan seni dan budaya nasional diharapkan terus tumbuh dari berbagai pihak ke depannya.",
                "Seni terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "festival-seni-dan-budaya-digelar-di-jakarta": {
            category: "SENI",
            title: "Festival Seni dan Budaya Digelar di Jakarta",
            lead: "Festival seni dan budaya menghadirkan berbagai pertunjukan dari seniman lokal.",
            date: "29 Mei 2025",
            time: "18:30 WIB",
            author: "MAB-News",
            image: "assets/images/festival-seni-dan-budaya-digelar-di-jakarta.jpg",
            caption: "Ilustrasi Festival Seni dan Budaya Digelar di Jakarta.",
            content: [
                "Festival seni dan budaya menghadirkan berbagai pertunjukan dari seniman lokal.",
                "Karya ini mendapat apresiasi positif dari berbagai kalangan karena dinilai menghadirkan perspektif baru yang segar.",
                "Para pelaku seni menilai perkembangan ini dapat menjadi ruang baru bagi eksplorasi kreativitas di tanah air.",
                "Dukungan terhadap perkembangan seni dan budaya nasional diharapkan terus tumbuh dari berbagai pihak ke depannya.",
                "Seni terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "musik-indonesia-terus-berkembang": {
            category: "SENI",
            title: "Musik Indonesia Terus Berkembang",
            lead: "Industri musik Indonesia terus melahirkan musisi dan karya baru.",
            date: "29 Mei 2025",
            time: "14:20 WIB",
            author: "MAB-News",
            image: "assets/images/musik-indonesia-terus-berkembang.jpg",
            caption: "Ilustrasi Musik Indonesia Terus Berkembang.",
            content: [
                "Industri musik Indonesia terus melahirkan musisi dan karya baru.",
                "Karya ini mendapat apresiasi positif dari berbagai kalangan karena dinilai menghadirkan perspektif baru yang segar.",
                "Para pelaku seni menilai perkembangan ini dapat menjadi ruang baru bagi eksplorasi kreativitas di tanah air.",
                "Dukungan terhadap perkembangan seni dan budaya nasional diharapkan terus tumbuh dari berbagai pihak ke depannya.",
                "Seni terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "film-nasional-mendapat-perhatian-positif": {
            category: "SENI",
            title: "Film Nasional Mendapat Perhatian Positif",
            lead: "Perkembangan perfilman nasional menunjukkan pertumbuhan dan kreativitas yang semakin beragam.",
            date: "28 Mei 2025",
            time: "16:00 WIB",
            author: "MAB-News",
            image: "assets/images/film-nasional-mendapat-perhatian-positif.jpg",
            caption: "Ilustrasi Film Nasional Mendapat Perhatian Positif.",
            content: [
                "Perkembangan perfilman nasional menunjukkan pertumbuhan dan kreativitas yang semakin beragam.",
                "Karya ini mendapat apresiasi positif dari berbagai kalangan karena dinilai menghadirkan perspektif baru yang segar.",
                "Para pelaku seni menilai perkembangan ini dapat menjadi ruang baru bagi eksplorasi kreativitas di tanah air.",
                "Dukungan terhadap perkembangan seni dan budaya nasional diharapkan terus tumbuh dari berbagai pihak ke depannya.",
                "Seni terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "generasi-muda-dorong-kreativitas-seni-digital": {
            category: "SENI",
            title: "Generasi Muda Dorong Kreativitas Seni Digital",
            lead: "Teknologi digital membuka ruang baru bagi generasi muda untuk berkarya.",
            date: "28 Mei 2025",
            time: "10:15 WIB",
            author: "MAB-News",
            image: "assets/images/generasi-muda-dorong-kreativitas-seni-digital.jpg",
            caption: "Ilustrasi Generasi Muda Dorong Kreativitas Seni Digital.",
            content: [
                "Teknologi digital membuka ruang baru bagi generasi muda untuk berkarya.",
                "Karya ini mendapat apresiasi positif dari berbagai kalangan karena dinilai menghadirkan perspektif baru yang segar.",
                "Para pelaku seni menilai perkembangan ini dapat menjadi ruang baru bagi eksplorasi kreativitas di tanah air.",
                "Dukungan terhadap perkembangan seni dan budaya nasional diharapkan terus tumbuh dari berbagai pihak ke depannya.",
                "Seni terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "membaca-arah-perubahan-indonesia-di-era-digital": {
            category: "KOLOM",
            title: "Membaca Arah Perubahan Indonesia di Era Digital",
            lead: "Transformasi digital membawa perubahan besar terhadap kehidupan masyarakat dan tata kelola pemerintahan.",
            date: "30 Mei 2025",
            time: "08:30 WIB",
            author: "MAB-News",
            image: "assets/images/membaca-arah-perubahan-indonesia-di-era-digital.jpg",
            caption: "Ilustrasi Membaca Arah Perubahan Indonesia di Era Digital.",
            content: [
                "Transformasi digital membawa perubahan besar terhadap kehidupan masyarakat dan tata kelola pemerintahan.",
                "Perspektif ini penting untuk dicermati mengingat dampaknya yang dapat memengaruhi arah kebijakan maupun pandangan publik.",
                "Berbagai sudut pandang perlu dipertimbangkan agar pembahasan suatu isu dapat dipahami secara lebih utuh dan berimbang.",
                "Diskusi mengenai topik ini diharapkan dapat terus berkembang guna memperkaya wawasan masyarakat secara luas.",
                "Kolom terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "mengapa-transformasi-digital-menjadi-penting": {
            category: "KOLOM",
            title: "Mengapa Transformasi Digital Menjadi Penting?",
            lead: "Digitalisasi bukan hanya persoalan teknologi, tetapi juga perubahan cara berpikir dan bekerja.",
            date: "29 Mei 2025",
            time: "15:10 WIB",
            author: "MAB-News",
            image: "assets/images/mengapa-transformasi-digital-menjadi-penting.jpg",
            caption: "Ilustrasi Mengapa Transformasi Digital Menjadi Penting?.",
            content: [
                "Digitalisasi bukan hanya persoalan teknologi, tetapi juga perubahan cara berpikir dan bekerja.",
                "Perspektif ini penting untuk dicermati mengingat dampaknya yang dapat memengaruhi arah kebijakan maupun pandangan publik.",
                "Berbagai sudut pandang perlu dipertimbangkan agar pembahasan suatu isu dapat dipahami secara lebih utuh dan berimbang.",
                "Diskusi mengenai topik ini diharapkan dapat terus berkembang guna memperkaya wawasan masyarakat secara luas.",
                "Kolom terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "tantangan-indonesia-menghadapi-ekonomi-global": {
            category: "KOLOM",
            title: "Tantangan Indonesia Menghadapi Ekonomi Global",
            lead: "Perubahan ekonomi dunia menuntut Indonesia untuk memperkuat daya saing nasional.",
            date: "29 Mei 2025",
            time: "11:30 WIB",
            author: "MAB-News",
            image: "assets/images/tantangan-indonesia-menghadapi-ekonomi-global.jpg",
            caption: "Ilustrasi Tantangan Indonesia Menghadapi Ekonomi Global.",
            content: [
                "Perubahan ekonomi dunia menuntut Indonesia untuk memperkuat daya saing nasional.",
                "Perspektif ini penting untuk dicermati mengingat dampaknya yang dapat memengaruhi arah kebijakan maupun pandangan publik.",
                "Berbagai sudut pandang perlu dipertimbangkan agar pembahasan suatu isu dapat dipahami secara lebih utuh dan berimbang.",
                "Diskusi mengenai topik ini diharapkan dapat terus berkembang guna memperkaya wawasan masyarakat secara luas.",
                "Kolom terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "membangun-masyarakat-yang-melek-informasi": {
            category: "KOLOM",
            title: "Membangun Masyarakat yang Melek Informasi",
            lead: "Kemampuan memahami informasi menjadi semakin penting di tengah derasnya arus informasi digital.",
            date: "28 Mei 2025",
            time: "17:00 WIB",
            author: "MAB-News",
            image: "assets/images/membangun-masyarakat-yang-melek-informasi.jpg",
            caption: "Ilustrasi Membangun Masyarakat yang Melek Informasi.",
            content: [
                "Kemampuan memahami informasi menjadi semakin penting di tengah derasnya arus informasi digital.",
                "Perspektif ini penting untuk dicermati mengingat dampaknya yang dapat memengaruhi arah kebijakan maupun pandangan publik.",
                "Berbagai sudut pandang perlu dipertimbangkan agar pembahasan suatu isu dapat dipahami secara lebih utuh dan berimbang.",
                "Diskusi mengenai topik ini diharapkan dapat terus berkembang guna memperkaya wawasan masyarakat secara luas.",
                "Kolom terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "masa-depan-media-di-era-kecerdasan-buatan": {
            category: "KOLOM",
            title: "Masa Depan Media di Era Kecerdasan Buatan",
            lead: "AI membawa peluang sekaligus tantangan baru bagi industri media.",
            date: "28 Mei 2025",
            time: "09:20 WIB",
            author: "MAB-News",
            image: "assets/images/masa-depan-media-di-era-kecerdasan-buatan.jpg",
            caption: "Ilustrasi Masa Depan Media di Era Kecerdasan Buatan.",
            content: [
                "AI membawa peluang sekaligus tantangan baru bagi industri media.",
                "Perspektif ini penting untuk dicermati mengingat dampaknya yang dapat memengaruhi arah kebijakan maupun pandangan publik.",
                "Berbagai sudut pandang perlu dipertimbangkan agar pembahasan suatu isu dapat dipahami secara lebih utuh dan berimbang.",
                "Diskusi mengenai topik ini diharapkan dapat terus berkembang guna memperkaya wawasan masyarakat secara luas.",
                "Kolom terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "berita-terkini-mab-news-hari-ini": {
            category: "INDEKS",
            title: "Berita Terkini MAB-News Hari Ini",
            lead: "Kumpulan berita terbaru dan informasi penting yang dirangkum oleh redaksi MAB-News.",
            date: "30 Mei 2025",
            time: "10:00 WIB",
            author: "MAB-News",
            image: "assets/images/berita-terkini-mab-news-hari-ini.jpg",
            caption: "Ilustrasi Berita Terkini MAB-News Hari Ini.",
            content: [
                "Kumpulan berita terbaru dan informasi penting yang dirangkum oleh redaksi MAB-News.",
                "Rangkuman ini menghadirkan berbagai perkembangan terkini yang perlu diketahui pembaca dari berbagai bidang.",
                "MAB-News berupaya menghadirkan informasi yang akurat dan mudah dipahami bagi seluruh pembaca.",
                "Pembaca dapat terus mengikuti perkembangan berita terbaru melalui kanal resmi MAB-News.",
                "Indeks terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "berita-nasional-terbaru": {
            category: "INDEKS",
            title: "Berita Nasional Terbaru",
            lead: "Informasi terbaru dari berbagai wilayah Indonesia.",
            date: "29 Mei 2025",
            time: "18:00 WIB",
            author: "MAB-News",
            image: "assets/images/berita-nasional-terbaru.jpg",
            caption: "Ilustrasi Berita Nasional Terbaru.",
            content: [
                "Informasi terbaru dari berbagai wilayah Indonesia.",
                "Rangkuman ini menghadirkan berbagai perkembangan terkini yang perlu diketahui pembaca dari berbagai bidang.",
                "MAB-News berupaya menghadirkan informasi yang akurat dan mudah dipahami bagi seluruh pembaca.",
                "Pembaca dapat terus mengikuti perkembangan berita terbaru melalui kanal resmi MAB-News.",
                "Indeks terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "berita-ekonomi-terbaru": {
            category: "INDEKS",
            title: "Berita Ekonomi Terbaru",
            lead: "Informasi terbaru mengenai ekonomi dan bisnis.",
            date: "29 Mei 2025",
            time: "16:00 WIB",
            author: "MAB-News",
            image: "assets/images/berita-ekonomi-terbaru.jpg",
            caption: "Ilustrasi Berita Ekonomi Terbaru.",
            content: [
                "Informasi terbaru mengenai ekonomi dan bisnis.",
                "Rangkuman ini menghadirkan berbagai perkembangan terkini yang perlu diketahui pembaca dari berbagai bidang.",
                "MAB-News berupaya menghadirkan informasi yang akurat dan mudah dipahami bagi seluruh pembaca.",
                "Pembaca dapat terus mengikuti perkembangan berita terbaru melalui kanal resmi MAB-News.",
                "Indeks terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "berita-teknologi-terbaru": {
            category: "INDEKS",
            title: "Berita Teknologi Terbaru",
            lead: "Perkembangan teknologi dan inovasi terbaru.",
            date: "29 Mei 2025",
            time: "14:00 WIB",
            author: "MAB-News",
            image: "assets/images/berita-teknologi-terbaru.jpg",
            caption: "Ilustrasi Berita Teknologi Terbaru.",
            content: [
                "Perkembangan teknologi dan inovasi terbaru.",
                "Rangkuman ini menghadirkan berbagai perkembangan terkini yang perlu diketahui pembaca dari berbagai bidang.",
                "MAB-News berupaya menghadirkan informasi yang akurat dan mudah dipahami bagi seluruh pembaca.",
                "Pembaca dapat terus mengikuti perkembangan berita terbaru melalui kanal resmi MAB-News.",
                "Indeks terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "berita-dunia-terbaru": {
            category: "INDEKS",
            title: "Berita Dunia Terbaru",
            lead: "Peristiwa penting yang terjadi di berbagai belahan dunia.",
            date: "29 Mei 2025",
            time: "12:00 WIB",
            author: "MAB-News",
            image: "assets/images/berita-dunia-terbaru.jpg",
            caption: "Ilustrasi Berita Dunia Terbaru.",
            content: [
                "Peristiwa penting yang terjadi di berbagai belahan dunia.",
                "Rangkuman ini menghadirkan berbagai perkembangan terkini yang perlu diketahui pembaca dari berbagai bidang.",
                "MAB-News berupaya menghadirkan informasi yang akurat dan mudah dipahami bagi seluruh pembaca.",
                "Pembaca dapat terus mengikuti perkembangan berita terbaru melalui kanal resmi MAB-News.",
                "Indeks terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "momen-penting-peristiwa-nasional-dalam-foto": {
            category: "FOTO",
            title: "Momen Penting Peristiwa Nasional dalam Foto",
            lead: "Kumpulan foto yang merekam berbagai peristiwa penting di Indonesia.",
            date: "30 Mei 2025",
            time: "10:20 WIB",
            author: "MAB-News",
            image: "assets/images/momen-penting-peristiwa-nasional-dalam-foto.jpg",
            caption: "Ilustrasi Momen Penting Peristiwa Nasional dalam Foto.",
            content: [
                "Kumpulan foto yang merekam berbagai peristiwa penting di Indonesia.",
                "Momen ini diabadikan untuk memberikan gambaran nyata mengenai perkembangan yang terjadi di lapangan.",
                "Melalui rangkaian foto ini, pembaca diharapkan dapat lebih memahami konteks dari peristiwa yang berlangsung.",
                "MAB-News akan terus menghadirkan dokumentasi visual dari berbagai peristiwa penting di tanah air.",
                "Foto terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "aktivitas-masyarakat-dalam-lensa-fotografer": {
            category: "FOTO",
            title: "Aktivitas Masyarakat dalam Lensa Fotografer",
            lead: "Berbagai aktivitas masyarakat terekam dalam foto jurnalistik.",
            date: "29 Mei 2025",
            time: "16:30 WIB",
            author: "MAB-News",
            image: "assets/images/aktivitas-masyarakat-dalam-lensa-fotografer.jpg",
            caption: "Ilustrasi Aktivitas Masyarakat dalam Lensa Fotografer.",
            content: [
                "Berbagai aktivitas masyarakat terekam dalam foto jurnalistik.",
                "Momen ini diabadikan untuk memberikan gambaran nyata mengenai perkembangan yang terjadi di lapangan.",
                "Melalui rangkaian foto ini, pembaca diharapkan dapat lebih memahami konteks dari peristiwa yang berlangsung.",
                "MAB-News akan terus menghadirkan dokumentasi visual dari berbagai peristiwa penting di tanah air.",
                "Foto terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "potret-perkembangan-kota-indonesia": {
            category: "FOTO",
            title: "Potret Perkembangan Kota Indonesia",
            lead: "Perkembangan kota dan aktivitas masyarakat dalam rangkaian foto.",
            date: "29 Mei 2025",
            time: "13:20 WIB",
            author: "MAB-News",
            image: "assets/images/potret-perkembangan-kota-indonesia.jpg",
            caption: "Ilustrasi Potret Perkembangan Kota Indonesia.",
            content: [
                "Perkembangan kota dan aktivitas masyarakat dalam rangkaian foto.",
                "Momen ini diabadikan untuk memberikan gambaran nyata mengenai perkembangan yang terjadi di lapangan.",
                "Melalui rangkaian foto ini, pembaca diharapkan dapat lebih memahami konteks dari peristiwa yang berlangsung.",
                "MAB-News akan terus menghadirkan dokumentasi visual dari berbagai peristiwa penting di tanah air.",
                "Foto terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "peristiwa-hari-ini-dalam-foto": {
            category: "FOTO",
            title: "Peristiwa Hari Ini dalam Foto",
            lead: "Momen penting hari ini yang berhasil diabadikan fotografer.",
            date: "28 Mei 2025",
            time: "17:10 WIB",
            author: "MAB-News",
            image: "assets/images/peristiwa-hari-ini-dalam-foto.jpg",
            caption: "Ilustrasi Peristiwa Hari Ini dalam Foto.",
            content: [
                "Momen penting hari ini yang berhasil diabadikan fotografer.",
                "Momen ini diabadikan untuk memberikan gambaran nyata mengenai perkembangan yang terjadi di lapangan.",
                "Melalui rangkaian foto ini, pembaca diharapkan dapat lebih memahami konteks dari peristiwa yang berlangsung.",
                "MAB-News akan terus menghadirkan dokumentasi visual dari berbagai peristiwa penting di tanah air.",
                "Foto terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "indonesia-dalam-bingkai-fotografi": {
            category: "FOTO",
            title: "Indonesia dalam Bingkai Fotografi",
            lead: "Berbagai sisi kehidupan Indonesia melalui karya fotografi jurnalistik.",
            date: "28 Mei 2025",
            time: "11:30 WIB",
            author: "MAB-News",
            image: "assets/images/indonesia-dalam-bingkai-fotografi.jpg",
            caption: "Ilustrasi Indonesia dalam Bingkai Fotografi.",
            content: [
                "Berbagai sisi kehidupan Indonesia melalui karya fotografi jurnalistik.",
                "Momen ini diabadikan untuk memberikan gambaran nyata mengenai perkembangan yang terjadi di lapangan.",
                "Melalui rangkaian foto ini, pembaca diharapkan dapat lebih memahami konteks dari peristiwa yang berlangsung.",
                "MAB-News akan terus menghadirkan dokumentasi visual dari berbagai peristiwa penting di tanah air.",
                "Foto terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "video-perkembangan-transformasi-digital-indonesia": {
            category: "VIDEO",
            title: "Video: Perkembangan Transformasi Digital Indonesia",
            lead: "Laporan video mengenai perkembangan transformasi digital di Indonesia.",
            date: "30 Mei 2025",
            time: "10:30 WIB",
            author: "MAB-News",
            image: "assets/images/video-perkembangan-transformasi-digital-indonesia.jpg",
            caption: "Ilustrasi Video: Perkembangan Transformasi Digital Indonesia.",
            content: [
                "Laporan video mengenai perkembangan transformasi digital di Indonesia.",
                "Liputan ini menghadirkan gambaran menyeluruh mengenai perkembangan terkini melalui format visual yang lebih mudah dipahami.",
                "Melalui tayangan ini, pembaca dan pemirsa dapat mengikuti perkembangan secara lebih interaktif.",
                "MAB-News akan terus menghadirkan liputan video dari berbagai peristiwa penting bagi pemirsa di tanah air.",
                "Video terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "video-berita-nasional-hari-ini": {
            category: "VIDEO",
            title: "Video: Berita Nasional Hari Ini",
            lead: "Rangkuman berita nasional terbaru dalam format video.",
            date: "29 Mei 2025",
            time: "18:20 WIB",
            author: "MAB-News",
            image: "assets/images/video-berita-nasional-hari-ini.jpg",
            caption: "Ilustrasi Video: Berita Nasional Hari Ini.",
            content: [
                "Rangkuman berita nasional terbaru dalam format video.",
                "Liputan ini menghadirkan gambaran menyeluruh mengenai perkembangan terkini melalui format visual yang lebih mudah dipahami.",
                "Melalui tayangan ini, pembaca dan pemirsa dapat mengikuti perkembangan secara lebih interaktif.",
                "MAB-News akan terus menghadirkan liputan video dari berbagai peristiwa penting bagi pemirsa di tanah air.",
                "Video terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "video-perkembangan-ekonomi-indonesia": {
            category: "VIDEO",
            title: "Video: Perkembangan Ekonomi Indonesia",
            lead: "Informasi perkembangan ekonomi Indonesia dalam laporan video.",
            date: "29 Mei 2025",
            time: "15:10 WIB",
            author: "MAB-News",
            image: "assets/images/video-perkembangan-ekonomi-indonesia.jpg",
            caption: "Ilustrasi Video: Perkembangan Ekonomi Indonesia.",
            content: [
                "Informasi perkembangan ekonomi Indonesia dalam laporan video.",
                "Liputan ini menghadirkan gambaran menyeluruh mengenai perkembangan terkini melalui format visual yang lebih mudah dipahami.",
                "Melalui tayangan ini, pembaca dan pemirsa dapat mengikuti perkembangan secara lebih interaktif.",
                "MAB-News akan terus menghadirkan liputan video dari berbagai peristiwa penting bagi pemirsa di tanah air.",
                "Video terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "video-teknologi-dan-kecerdasan-buatan": {
            category: "VIDEO",
            title: "Video: Teknologi dan Kecerdasan Buatan",
            lead: "Membahas perkembangan AI dan teknologi terbaru.",
            date: "28 Mei 2025",
            time: "16:20 WIB",
            author: "MAB-News",
            image: "assets/images/video-teknologi-dan-kecerdasan-buatan.jpg",
            caption: "Ilustrasi Video: Teknologi dan Kecerdasan Buatan.",
            content: [
                "Membahas perkembangan AI dan teknologi terbaru.",
                "Liputan ini menghadirkan gambaran menyeluruh mengenai perkembangan terkini melalui format visual yang lebih mudah dipahami.",
                "Melalui tayangan ini, pembaca dan pemirsa dapat mengikuti perkembangan secara lebih interaktif.",
                "MAB-News akan terus menghadirkan liputan video dari berbagai peristiwa penting bagi pemirsa di tanah air.",
                "Video terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
            ]
        },

        "video-peristiwa-penting-pekan-ini": {
            category: "VIDEO",
            title: "Video: Peristiwa Penting Pekan Ini",
            lead: "Rangkuman berbagai peristiwa penting dalam sepekan.",
            date: "28 Mei 2025",
            time: "10:10 WIB",
            author: "MAB-News",
            image: "assets/images/video-peristiwa-penting-pekan-ini.jpg",
            caption: "Ilustrasi Video: Peristiwa Penting Pekan Ini.",
            content: [
                "Rangkuman berbagai peristiwa penting dalam sepekan.",
                "Liputan ini menghadirkan gambaran menyeluruh mengenai perkembangan terkini melalui format visual yang lebih mudah dipahami.",
                "Melalui tayangan ini, pembaca dan pemirsa dapat mengikuti perkembangan secara lebih interaktif.",
                "MAB-News akan terus menghadirkan liputan video dari berbagai peristiwa penting bagi pemirsa di tanah air.",
                "Video terus menjadi perhatian MAB-News dalam menghadirkan informasi terkini bagi pembaca."
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