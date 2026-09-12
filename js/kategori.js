/* =========================================================
   MAB-NEWS
   SISTEM KATEGORI DINAMIS
========================================================= */

const categoryData = {

    nasional: {
        name: "Nasional",
        description:
            "Berita dan informasi terkini seputar peristiwa, kebijakan, dan perkembangan penting di seluruh wilayah Indonesia.",

        articles: [
            {
                category: "NASIONAL",
                title: "Pemerintah Siapkan Strategi Baru Jaga Daya Beli Masyarakat",
                description: "Pemerintah menyiapkan berbagai langkah untuk menjaga daya beli masyarakat di tengah tekanan ekonomi global dan fluktuasi harga komoditas.",
                date: "30 Mei 2025 08:45 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "EKONOMI",
                title: "Inflasi Mei 2025 Terkendali di Level 2,4 Persen",
                description: "Badan Pusat Statistik (BPS) melaporkan inflasi Mei 2025 berada di level 2,4 persen secara tahunan (yoy), lebih rendah dibanding bulan sebelumnya.",
                date: "30 Mei 2025 07:30 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "NASIONAL",
                title: "Hingga April 2025, Realisasi Investasi Capai Rp 456,8 Triliun",
                description: "Kementerian Investasi/BKPM mencatat realisasi investasi hingga April 2025 mencapai Rp 456,8 triliun, tumbuh 12,7 persen dibanding periode yang sama tahun lalu.",
                date: "29 Mei 2025 16:20 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "NASIONAL",
                title: "KAI Tambah 36 Perjalanan Jelang Libur Sekolah",
                description: "PT KAI menambah 36 perjalanan kereta api jarak jauh untuk mengantisipasi lonjakan penumpang selama libur panjang akhir Juni mendatang.",
                date: "29 Mei 2025 14:10 WIB",
                image: "assets/images/card-auto.jpg"
            },
            {
                category: "NASIONAL",
                title: "Pemerintah Dorong Digitalisasi Layanan Publik di Daerah",
                description: "Pemerintah terus mendorong percepatan digitalisasi layanan publik di seluruh daerah untuk meningkatkan efisiensi dan transparansi birokrasi.",
                date: "29 Mei 2025 11:35 WIB",
                image: "assets/images/card-police.jpg"
            }
        ]
    },


    internasional: {
        name: "Internasional",
        description:
            "Berita dan informasi terbaru dari berbagai negara mengenai politik, ekonomi, keamanan, dan perkembangan global.",

        articles: [
            {
                category: "INTERNASIONAL",
                title: "Pemimpin Dunia Bahas Tantangan Ekonomi Global",
                description: "Sejumlah pemimpin dunia membahas berbagai tantangan ekonomi global dan strategi menghadapi ketidakpastian perdagangan internasional.",
                date: "30 Mei 2025 09:20 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "INTERNASIONAL",
                title: "Negara-negara Asia Perkuat Kerja Sama Ekonomi",
                description: "Kerja sama ekonomi antarnegara Asia terus diperkuat untuk menjaga stabilitas perdagangan dan investasi kawasan.",
                date: "29 Mei 2025 18:10 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "INTERNASIONAL",
                title: "Perkembangan Politik Global Jadi Perhatian Dunia",
                description: "Perubahan politik di sejumlah negara menjadi perhatian karena berpotensi memengaruhi hubungan internasional.",
                date: "29 Mei 2025 15:40 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "INTERNASIONAL",
                title: "Forum Internasional Bahas Masa Depan Teknologi",
                description: "Forum internasional mempertemukan berbagai negara untuk membahas perkembangan teknologi dan dampaknya terhadap masyarakat.",
                date: "29 Mei 2025 12:30 WIB",
                image: "assets/images/card-openai.jpg"
            },
            {
                category: "INTERNASIONAL",
                title: "Dunia Hadapi Tantangan Perubahan Iklim",
                description: "Berbagai negara kembali menyerukan kerja sama untuk menghadapi dampak perubahan iklim.",
                date: "28 Mei 2025 20:10 WIB",
                image: "assets/images/card-police.jpg"
            }
        ]
    },


    ekonomi: {
        name: "Ekonomi",
        description:
            "Berita ekonomi terkini meliputi bisnis, keuangan, investasi, perdagangan, pasar, dan kebijakan ekonomi.",

        articles: [
            {
                category: "EKONOMI",
                title: "Inflasi Mei 2025 Terkendali di Level 2,4 Persen",
                description: "Badan Pusat Statistik melaporkan inflasi Mei 2025 tetap terkendali dan berada pada level 2,4 persen secara tahunan.",
                date: "30 Mei 2025 07:30 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "EKONOMI",
                title: "Realisasi Investasi Indonesia Terus Menguat",
                description: "Realisasi investasi nasional terus menunjukkan pertumbuhan positif seiring meningkatnya aktivitas ekonomi.",
                date: "29 Mei 2025 16:20 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "EKONOMI",
                title: "Rupiah Bergerak Stabil di Tengah Ketidakpastian Global",
                description: "Nilai tukar rupiah bergerak relatif stabil setelah pasar merespons perkembangan ekonomi global.",
                date: "29 Mei 2025 13:40 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "EKONOMI",
                title: "Pemerintah Dorong Pertumbuhan UMKM",
                description: "Pemerintah menyiapkan sejumlah kebijakan untuk memperkuat sektor usaha mikro, kecil, dan menengah.",
                date: "28 Mei 2025 17:15 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "EKONOMI",
                title: "Perdagangan Indonesia Terus Mengalami Pertumbuhan",
                description: "Aktivitas perdagangan menunjukkan perkembangan positif seiring meningkatnya permintaan sejumlah komoditas.",
                date: "28 Mei 2025 10:25 WIB",
                image: "assets/images/latest-port.jpg"
            }
        ]
    },


    metro: {
        name: "Metro",
        description:
            "Berita seputar kehidupan masyarakat, kriminalitas, transportasi, pemerintahan daerah, dan peristiwa di berbagai kota.",

        articles: [
            {
                category: "METRO",
                title: "Layanan Transportasi Kota Terus Ditingkatkan",
                description: "Pemerintah daerah meningkatkan kualitas transportasi untuk mendukung mobilitas masyarakat perkotaan.",
                date: "30 Mei 2025 09:00 WIB",
                image: "assets/images/card-auto.jpg"
            },
            {
                category: "METRO",
                title: "Sejumlah Jalan Utama Kota Mulai Ditata",
                description: "Penataan sejumlah ruas jalan dilakukan untuk meningkatkan keamanan dan kenyamanan pengguna jalan.",
                date: "29 Mei 2025 17:20 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "METRO",
                title: "Pelayanan Publik di Kota Mulai Berbasis Digital",
                description: "Pemerintah kota memperluas penggunaan layanan digital untuk memudahkan masyarakat.",
                date: "29 Mei 2025 14:00 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "METRO",
                title: "Masyarakat Diminta Waspada Cuaca Ekstrem",
                description: "Masyarakat di sejumlah wilayah perkotaan diminta meningkatkan kewaspadaan terhadap perubahan cuaca.",
                date: "28 Mei 2025 19:15 WIB",
                image: "assets/images/card-police.jpg"
            },
            {
                category: "METRO",
                title: "Ruang Publik Baru Hadir untuk Warga",
                description: "Sejumlah ruang publik baru disiapkan untuk meningkatkan kualitas lingkungan perkotaan.",
                date: "28 Mei 2025 11:10 WIB",
                image: "assets/images/hero.jpg"
            }
        ]
    },


    dunia: {
        name: "Dunia",
        description:
            "Kabar dunia terbaru mengenai geopolitik, konflik, diplomasi, kemanusiaan, dan berbagai peristiwa internasional.",

        articles: [
            {
                category: "DUNIA",
                title: "Situasi Geopolitik Dunia Terus Menjadi Perhatian",
                description: "Perkembangan geopolitik global terus menjadi perhatian berbagai negara.",
                date: "30 Mei 2025 10:20 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "DUNIA",
                title: "Negara-negara Dorong Diplomasi untuk Menjaga Perdamaian",
                description: "Upaya diplomasi kembali didorong untuk menjaga stabilitas dan perdamaian dunia.",
                date: "29 Mei 2025 18:20 WIB",
                image: "assets/images/card-police.jpg"
            },
            {
                category: "DUNIA",
                title: "PBB Bahas Tantangan Kemanusiaan Global",
                description: "Perserikatan Bangsa-Bangsa membahas sejumlah tantangan kemanusiaan yang terjadi di berbagai kawasan.",
                date: "29 Mei 2025 15:30 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "DUNIA",
                title: "Kerja Sama Antarnegara Terus Diperkuat",
                description: "Berbagai negara memperkuat kerja sama dalam menghadapi tantangan global.",
                date: "28 Mei 2025 16:10 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "DUNIA",
                title: "Perubahan Global Pengaruhi Peta Ekonomi Dunia",
                description: "Perubahan kondisi global memberikan dampak terhadap perekonomian berbagai negara.",
                date: "28 Mei 2025 09:40 WIB",
                image: "assets/images/hero.jpg"
            }
        ]
    },


    olahraga: {
        name: "Olahraga",
        description:
            "Berita olahraga terbaru dari Indonesia dan dunia, mulai dari sepak bola, bulu tangkis, basket, hingga cabang olahraga lainnya.",

        articles: [
            {
                category: "OLAHRAGA",
                title: "Timnas Indonesia Siap Hadapi Jepang di Laga Kualifikasi Piala Dunia",
                description: "Tim nasional Indonesia terus mempersiapkan diri menghadapi pertandingan penting dalam kualifikasi Piala Dunia.",
                date: "30 Mei 2025 10:15 WIB",
                image: "assets/images/popular-3.jpg"
            },
            {
                category: "OLAHRAGA",
                title: "Persiapan Tim Nasional Terus Dimatangkan",
                description: "Pelatih terus mematangkan strategi dan komposisi pemain menjelang pertandingan berikutnya.",
                date: "29 Mei 2025 19:10 WIB",
                image: "assets/images/card-auto.jpg"
            },
            {
                category: "OLAHRAGA",
                title: "Kompetisi Nasional Memasuki Fase Penentuan",
                description: "Persaingan sejumlah klub semakin ketat menjelang pertandingan penentuan.",
                date: "29 Mei 2025 15:30 WIB",
                image: "assets/images/popular-3.jpg"
            },
            {
                category: "OLAHRAGA",
                title: "Atlet Indonesia Bersiap Hadapi Kompetisi Internasional",
                description: "Sejumlah atlet nasional bersiap mengikuti kompetisi olahraga tingkat internasional.",
                date: "28 Mei 2025 13:20 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "OLAHRAGA",
                title: "Prestasi Olahraga Indonesia Terus Berkembang",
                description: "Pembinaan atlet menjadi salah satu fokus untuk meningkatkan prestasi olahraga nasional.",
                date: "28 Mei 2025 09:10 WIB",
                image: "assets/images/card-market.jpg"
            }
        ]
    },


    teknologi: {
        name: "Teknologi",
        description:
            "Berita teknologi terbaru mengenai AI, internet, gadget, startup, keamanan digital, dan inovasi teknologi.",

        articles: [
            {
                category: "TEKNOLOGI",
                title: "Perkembangan Kecerdasan Buatan Semakin Pesat",
                description: "Teknologi kecerdasan buatan terus berkembang dan mulai digunakan dalam berbagai sektor kehidupan.",
                date: "30 Mei 2025 11:00 WIB",
                image: "assets/images/card-openai.jpg"
            },
            {
                category: "TEKNOLOGI",
                title: "AI Mulai Mengubah Cara Masyarakat Bekerja",
                description: "Penggunaan AI semakin luas dan mulai mengubah berbagai proses pekerjaan.",
                date: "29 Mei 2025 16:30 WIB",
                image: "assets/images/card-openai.jpg"
            },
            {
                category: "TEKNOLOGI",
                title: "Keamanan Data Menjadi Perhatian Utama",
                description: "Perlindungan data pribadi semakin penting di tengah meningkatnya aktivitas digital.",
                date: "29 Mei 2025 14:15 WIB",
                image: "assets/images/card-police.jpg"
            },
            {
                category: "TEKNOLOGI",
                title: "Startup Indonesia Terus Mengembangkan Inovasi",
                description: "Ekosistem startup nasional terus berkembang dengan hadirnya berbagai inovasi baru.",
                date: "28 Mei 2025 17:40 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "TEKNOLOGI",
                title: "Transformasi Digital Terus Berlanjut",
                description: "Transformasi digital menjadi bagian penting dari perkembangan berbagai sektor.",
                date: "28 Mei 2025 10:30 WIB",
                image: "assets/images/hero.jpg"
            }
        ]
    },


    otomotif: {
        name: "Otomotif",
        description:
            "Berita otomotif terbaru mengenai mobil, motor, kendaraan listrik, teknologi kendaraan, dan industri otomotif.",

        articles: [
            {
                category: "OTOMOTIF",
                title: "Industri Kendaraan Listrik Indonesia Terus Berkembang",
                description: "Industri kendaraan listrik terus menunjukkan perkembangan seiring meningkatnya minat masyarakat.",
                date: "30 Mei 2025 09:45 WIB",
                image: "assets/images/card-auto.jpg"
            },
            {
                category: "OTOMOTIF",
                title: "Produsen Otomotif Siapkan Model Kendaraan Baru",
                description: "Sejumlah produsen otomotif menyiapkan model kendaraan baru untuk pasar Indonesia.",
                date: "29 Mei 2025 17:30 WIB",
                image: "assets/images/card-auto.jpg"
            },
            {
                category: "OTOMOTIF",
                title: "Teknologi Kendaraan Semakin Canggih",
                description: "Berbagai teknologi baru mulai diterapkan pada kendaraan modern.",
                date: "29 Mei 2025 13:20 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "OTOMOTIF",
                title: "Penjualan Kendaraan Mulai Menguat",
                description: "Pasar otomotif menunjukkan tanda-tanda penguatan setelah periode sebelumnya.",
                date: "28 Mei 2025 15:10 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "OTOMOTIF",
                title: "Kendaraan Ramah Lingkungan Jadi Tren Baru",
                description: "Kesadaran terhadap lingkungan mendorong perkembangan kendaraan ramah lingkungan.",
                date: "28 Mei 2025 09:30 WIB",
                image: "assets/images/card-auto.jpg"
            }
        ]
    },


    "gaya-hidup": {
        name: "Gaya Hidup",
        description:
            "Informasi seputar gaya hidup, kesehatan, kuliner, perjalanan, tren, dan perkembangan kehidupan masyarakat.",

        articles: [
            {
                category: "GAYA HIDUP",
                title: "Tren Gaya Hidup Digital Semakin Berkembang",
                description: "Perkembangan teknologi turut memengaruhi berbagai kebiasaan dan gaya hidup masyarakat.",
                date: "30 Mei 2025 10:30 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "GAYA HIDUP",
                title: "Destinasi Wisata Favorit Mulai Ramai Dikunjungi",
                description: "Sejumlah destinasi wisata kembali menjadi pilihan masyarakat untuk menghabiskan waktu liburan.",
                date: "29 Mei 2025 16:00 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "GAYA HIDUP",
                title: "Tren Kuliner Baru Menarik Perhatian Masyarakat",
                description: "Berbagai inovasi kuliner terus bermunculan dan menjadi tren baru.",
                date: "29 Mei 2025 12:30 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "GAYA HIDUP",
                title: "Masyarakat Semakin Memperhatikan Pola Hidup Seimbang",
                description: "Kesadaran masyarakat terhadap pola hidup yang lebih seimbang terus meningkat.",
                date: "28 Mei 2025 15:20 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "GAYA HIDUP",
                title: "Tren Baru di Kalangan Generasi Muda",
                description: "Berbagai tren baru berkembang seiring perubahan kebiasaan generasi muda.",
                date: "28 Mei 2025 09:15 WIB",
                image: "assets/images/card-openai.jpg"
            }
        ]
    },


    seni: {
        name: "Seni",
        description:
            "Berita dan informasi seputar seni, budaya, musik, film, pertunjukan, serta karya kreatif Indonesia.",

        articles: [
            {
                category: "SENI",
                title: "Seniman Indonesia Hadirkan Karya Baru",
                description: "Sejumlah seniman Indonesia menghadirkan karya baru yang mengangkat berbagai isu sosial dan budaya.",
                date: "30 Mei 2025 11:20 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "SENI",
                title: "Festival Seni dan Budaya Digelar di Jakarta",
                description: "Festival seni dan budaya menghadirkan berbagai pertunjukan dari seniman lokal.",
                date: "29 Mei 2025 18:30 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "SENI",
                title: "Musik Indonesia Terus Berkembang",
                description: "Industri musik Indonesia terus melahirkan musisi dan karya baru.",
                date: "29 Mei 2025 14:20 WIB",
                image: "assets/images/card-openai.jpg"
            },
            {
                category: "SENI",
                title: "Film Nasional Mendapat Perhatian Positif",
                description: "Perkembangan perfilman nasional menunjukkan pertumbuhan dan kreativitas yang semakin beragam.",
                date: "28 Mei 2025 16:00 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "SENI",
                title: "Generasi Muda Dorong Kreativitas Seni Digital",
                description: "Teknologi digital membuka ruang baru bagi generasi muda untuk berkarya.",
                date: "28 Mei 2025 10:15 WIB",
                image: "assets/images/card-openai.jpg"
            }
        ]
    },


    kolom: {
        name: "Kolom",
        description:
            "Opini, analisis, gagasan, dan perspektif dari para penulis mengenai berbagai isu penting.",

        articles: [
            {
                category: "KOLOM",
                title: "Membaca Arah Perubahan Indonesia di Era Digital",
                description: "Transformasi digital membawa perubahan besar terhadap kehidupan masyarakat dan tata kelola pemerintahan.",
                date: "30 Mei 2025 08:30 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "KOLOM",
                title: "Mengapa Transformasi Digital Menjadi Penting?",
                description: "Digitalisasi bukan hanya persoalan teknologi, tetapi juga perubahan cara berpikir dan bekerja.",
                date: "29 Mei 2025 15:10 WIB",
                image: "assets/images/card-openai.jpg"
            },
            {
                category: "KOLOM",
                title: "Tantangan Indonesia Menghadapi Ekonomi Global",
                description: "Perubahan ekonomi dunia menuntut Indonesia untuk memperkuat daya saing nasional.",
                date: "29 Mei 2025 11:30 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "KOLOM",
                title: "Membangun Masyarakat yang Melek Informasi",
                description: "Kemampuan memahami informasi menjadi semakin penting di tengah derasnya arus informasi digital.",
                date: "28 Mei 2025 17:00 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "KOLOM",
                title: "Masa Depan Media di Era Kecerdasan Buatan",
                description: "AI membawa peluang sekaligus tantangan baru bagi industri media.",
                date: "28 Mei 2025 09:20 WIB",
                image: "assets/images/card-openai.jpg"
            }
        ]
    },


    indeks: {
        name: "Indeks",
        description:
            "Indeks berita MAB-News yang memudahkan pembaca menemukan berbagai informasi berdasarkan waktu dan kategori.",

        articles: [
            {
                category: "INDEKS",
                title: "Berita Terkini MAB-News Hari Ini",
                description: "Kumpulan berita terbaru dan informasi penting yang dirangkum oleh redaksi MAB-News.",
                date: "30 Mei 2025 10:00 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "INDEKS",
                title: "Berita Nasional Terbaru",
                description: "Informasi terbaru dari berbagai wilayah Indonesia.",
                date: "29 Mei 2025 18:00 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "INDEKS",
                title: "Berita Ekonomi Terbaru",
                description: "Informasi terbaru mengenai ekonomi dan bisnis.",
                date: "29 Mei 2025 16:00 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "INDEKS",
                title: "Berita Teknologi Terbaru",
                description: "Perkembangan teknologi dan inovasi terbaru.",
                date: "29 Mei 2025 14:00 WIB",
                image: "assets/images/card-openai.jpg"
            },
            {
                category: "INDEKS",
                title: "Berita Dunia Terbaru",
                description: "Peristiwa penting yang terjadi di berbagai belahan dunia.",
                date: "29 Mei 2025 12:00 WIB",
                image: "assets/images/hero.jpg"
            }
        ]
    },


    foto: {
        name: "Foto",
        description:
            "Kumpulan foto jurnalistik MAB-News yang merekam berbagai peristiwa penting di Indonesia dan dunia.",

        articles: [
            {
                category: "FOTO",
                title: "Momen Penting Peristiwa Nasional dalam Foto",
                description: "Kumpulan foto yang merekam berbagai peristiwa penting di Indonesia.",
                date: "30 Mei 2025 10:20 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "FOTO",
                title: "Aktivitas Masyarakat dalam Lensa Fotografer",
                description: "Berbagai aktivitas masyarakat terekam dalam foto jurnalistik.",
                date: "29 Mei 2025 16:30 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "FOTO",
                title: "Potret Perkembangan Kota Indonesia",
                description: "Perkembangan kota dan aktivitas masyarakat dalam rangkaian foto.",
                date: "29 Mei 2025 13:20 WIB",
                image: "assets/images/latest-port.jpg"
            },
            {
                category: "FOTO",
                title: "Peristiwa Hari Ini dalam Foto",
                description: "Momen penting hari ini yang berhasil diabadikan fotografer.",
                date: "28 Mei 2025 17:10 WIB",
                image: "assets/images/card-police.jpg"
            },
            {
                category: "FOTO",
                title: "Indonesia dalam Bingkai Fotografi",
                description: "Berbagai sisi kehidupan Indonesia melalui karya fotografi jurnalistik.",
                date: "28 Mei 2025 11:30 WIB",
                image: "assets/images/card-auto.jpg"
            }
        ]
    },


    video: {
        name: "Video",
        description:
            "Video berita terbaru MAB-News mengenai peristiwa, wawancara, laporan langsung, dan berbagai informasi penting.",

        articles: [
            {
                category: "VIDEO",
                title: "Video: Perkembangan Transformasi Digital Indonesia",
                description: "Laporan video mengenai perkembangan transformasi digital di Indonesia.",
                date: "30 Mei 2025 10:30 WIB",
                image: "assets/images/hero.jpg"
            },
            {
                category: "VIDEO",
                title: "Video: Berita Nasional Hari Ini",
                description: "Rangkuman berita nasional terbaru dalam format video.",
                date: "29 Mei 2025 18:20 WIB",
                image: "assets/images/card-police.jpg"
            },
            {
                category: "VIDEO",
                title: "Video: Perkembangan Ekonomi Indonesia",
                description: "Informasi perkembangan ekonomi Indonesia dalam laporan video.",
                date: "29 Mei 2025 15:10 WIB",
                image: "assets/images/card-market.jpg"
            },
            {
                category: "VIDEO",
                title: "Video: Teknologi dan Kecerdasan Buatan",
                description: "Membahas perkembangan AI dan teknologi terbaru.",
                date: "28 Mei 2025 16:20 WIB",
                image: "assets/images/card-openai.jpg"
            },
            {
                category: "VIDEO",
                title: "Video: Peristiwa Penting Pekan Ini",
                description: "Rangkuman berbagai peristiwa penting dalam sepekan.",
                date: "28 Mei 2025 10:10 WIB",
                image: "assets/images/latest-port.jpg"
            }
        ]
    }
};


/* =========================================================
   DAFTAR KATEGORI
========================================================= */

const categoryNames = [
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
    "kolom",
    "indeks",
    "foto",
    "video"
];


/* =========================================================
   AMBIL KATEGORI DARI URL
========================================================= */

const urlParams = new URLSearchParams(window.location.search);

let currentCategory =
    urlParams.get("kategori") || "nasional";

if (!categoryData[currentCategory]) {
    currentCategory = "nasional";
}

const data = categoryData[currentCategory];


/* =========================================================
   UPDATE JUDUL HALAMAN
========================================================= */

document.title =
    `${data.name} — MAB-News`;


/* =========================================================
   UPDATE HERO
========================================================= */

const heroTitle =
    document.querySelector(".category-hero h1");

const heroDescription =
    document.querySelector(".category-hero p");

if (heroTitle) {
    heroTitle.textContent = data.name;
}

if (heroDescription) {
    heroDescription.textContent = data.description;
}


/* =========================================================
   UPDATE BREADCRUMB
========================================================= */

const breadcrumbLast =
    document.querySelector(
        ".category-breadcrumb span:last-child"
    );

if (breadcrumbLast) {
    breadcrumbLast.textContent = data.name;
}


/* =========================================================
   UPDATE JUMLAH BERITA
========================================================= */

const resultText =
    document.querySelector(
        ".category-results-header > span"
    );

if (resultText) {
    resultText.textContent =
        `Menampilkan 1–10 dari 120 berita`;
}

/* =========================================================
   RENDER BERITA
========================================================= */

const newsContainer =
    document.querySelector(".category-main");

const pagination =
    document.querySelector(".category-pagination");


/* =========================================================
   BUAT SLUG OTOMATIS DARI JUDUL
========================================================= */

function createArticleSlug(title) {

    return title
        .toString()
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

}


if (newsContainer) {

    const resultHeader =
        document.querySelector(
            ".category-results-header"
        );


    /* =====================================================
       HAPUS BERITA LAMA
    ===================================================== */

    document
        .querySelectorAll(".category-news-item")
        .forEach(item => item.remove());


    /* =====================================================
       TAMPILKAN BERITA
    ===================================================== */

    data.articles.forEach(article => {

        const articleElement =
            document.createElement("article");


        articleElement.className =
            "category-news-item";


        /* =================================================
           SLUG ARTIKEL
        ================================================= */

        const articleSlug =
            createArticleSlug(article.title);


        const articleUrl =
            `artikel.html?id=${articleSlug}`;


        /* =================================================
           HTML BERITA
        ================================================= */

        articleElement.innerHTML = `

            <a
                href="${articleUrl}"
                class="category-news-image"
            >

                <img
                    src="${article.image}"
                    alt="${article.title}"
                >

            </a>


            <div class="category-news-content">

                <a
                    href="kategori.html?kategori=${currentCategory}"
                    class="news-category"
                >
                    ${article.category}
                </a>


                <h2>

                    <a href="${articleUrl}">
                        ${article.title}
                    </a>

                </h2>


                <p>
                    ${article.description}
                </p>


                <div class="news-meta">

                    ${article.date}

                    <span>•</span>

                    Redaksi MAB-News

                </div>

            </div>

        `;


        /* =================================================
           MASUKKAN BERITA SEBELUM PAGINATION
        ================================================= */

        newsContainer.insertBefore(
            articleElement,
            pagination
        );

    });

}

/* =========================================================
   UPDATE JUDUL TERPOPULER
========================================================= */

const popularTitle =
    document.querySelector(
        ".category-sidebar-title h2"
    );

if (popularTitle) {

    popularTitle.textContent =
        `Terpopuler di ${data.name}`;

}


/* =========================================================
   UPDATE KATEGORI AKTIF
========================================================= */

document
    .querySelectorAll(".category-menu-grid a")
    .forEach(link => {

        link.classList.remove("selected");

        const text =
            link.textContent
                .trim()
                .toLowerCase();

        if (
            text === data.name.toLowerCase()
        ) {
            link.classList.add("selected");
        }

    });


/* =========================================================
   UPDATE NAVIGASI AKTIF
========================================================= */

document
    .querySelectorAll(".nav-inner > a")
    .forEach(link => {

        link.classList.remove("active");

        const text =
            link.textContent
                .trim()
                .toLowerCase();

        if (
            text === data.name.toLowerCase()
        ) {
            link.classList.add("active");
        }

    });


/* =========================================================
   LINK SEMUA KATEGORI
========================================================= */

document
    .querySelectorAll(".category-menu-grid a")
    .forEach(link => {

        const text =
            link.textContent
                .trim()
                .toLowerCase();

        let slug = "";

        switch (text) {

            case "semua kategori":
                slug = "nasional";
                break;

            case "nasional":
                slug = "nasional";
                break;

            case "internasional":
                slug = "internasional";
                break;

            case "ekonomi":
                slug = "ekonomi";
                break;

            case "metro":
                slug = "metro";
                break;

            case "dunia":
                slug = "dunia";
                break;

            case "olahraga":
                slug = "olahraga";
                break;

            case "teknologi":
                slug = "teknologi";
                break;

            case "otomotif":
                slug = "otomotif";
                break;

            case "gaya hidup":
                slug = "gaya-hidup";
                break;

            case "seni":
                slug = "seni";
                break;

            case "kolom":
                slug = "kolom";
                break;

            case "indeks":
                slug = "indeks";
                break;

        }

        if (slug) {

            link.href =
                `kategori.html?kategori=${slug}`;

        }

    });


/* =========================================================
   LINK NAVIGASI
========================================================= */

document
    .querySelectorAll(".nav-inner > a")
    .forEach(link => {

        const text =
            link.textContent
                .trim()
                .toLowerCase();

        let slug = "";

        switch (text) {

            case "nasional":
                slug = "nasional";
                break;

            case "internasional":
                slug = "internasional";
                break;

            case "ekonomi":
                slug = "ekonomi";
                break;

            case "metro":
                slug = "metro";
                break;

            case "dunia":
                slug = "dunia";
                break;

            case "olahraga":
                slug = "olahraga";
                break;

            case "teknologi":
                slug = "teknologi";
                break;

            case "otomotif":
                slug = "otomotif";
                break;

            case "gaya hidup":
                slug = "gaya-hidup";
                break;

            case "seni":
                slug = "seni";
                break;

            case "kolom":
                slug = "kolom";
                break;

            case "indeks":
                slug = "indeks";
                break;

            case "foto":
                slug = "foto";
                break;

            case "video":
                slug = "video";
                break;

        }

        if (slug) {

            link.href =
                `kategori.html?kategori=${slug}`;

        }

    });
