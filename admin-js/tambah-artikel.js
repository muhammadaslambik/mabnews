document.addEventListener("DOMContentLoaded", async () => {
    const btnPublish = document.getElementById("publish");
    const selectKategori = document.getElementById("category");
    const imageInput = document.getElementById("imageInput");

    // =========================================================
    // 1. MEMUAT KATEGORI OTOMATIS DARI DATABASE NEON (ONLINE)
    // =========================================================
    try {
        // Mengambil data dari endpoint categories di Vercel backend Anda
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        if (!response.ok) throw new Error("Gagal mengambil data kategori.");
        
        const categories = await response.json();
        
        // Bersihkan opsi bawaan HTML, sisakan opsi pertama
        selectKategori.innerHTML = '<option value="">Pilih kategori</option>';
        
        // Masukkan data kategori dari Neon ke dropdown secara dinamis
        categories.forEach(kat => {
            const option = document.createElement("option");
            option.value = kat.id; // Menyimpan ID kategori asli dari DB
            option.textContent = kat.name; // Menampilkan nama kategori di UI
            selectKategori.appendChild(option);
        });
    } catch (error) {
        console.error("Gagal memuat kategori:", error);
        showToast("Gagal memuat daftar kategori dari database.", "error");
    }

    // =========================================================
    // 2. PROSES PUBLIKASI ARTIKEL (SUBMIT DATA)
    // =========================================================
    if (btnPublish) {
        btnPublish.addEventListener("click", async (e) => {
            e.preventDefault();

            // Ambil seluruh nilai komponen input dari form HTML Anda
            const judul = document.getElementById("title").value.trim();
            const categoryId = selectKategori.value;
            const ringkasan = document.getElementById("lead").value.trim();
            
            // Mengambil konten dari div contenteditable Anda
            const kontenTextarea = document.getElementById("content");
            const kontenHtml = kontenTextarea ? kontenTextarea.innerHTML.trim() : "";

            // Validasi field wajib isi
            if (!judul || !categoryId || !ringkasan || !kontenHtml) {
                showToast("Harap isi semua kolom bertanda bintang (*)", "error");
                return;
            }

            if (imageInput.files.length === 0) {
                showToast("Harap pilih gambar utama artikel terlebih dahulu!", "error");
                return;
            }

            // Kunci tombol agar tidak diklik dua kali oleh user
            btnPublish.textContent = "Sedang Mempublikasikan...";
            btnPublish.disabled = true;

            try {
                // TAHAP A: Unggah File Fisik Gambar ke Backend Vercel -> CDN ImageKit
                const formData = new FormData();
                formData.append("image", imageInput.files[0]);

                const uploadResponse = await fetch(`${API_BASE_URL}/api/upload`, {
                    method: "POST",
                    body: formData // Mengirimkan file biner mentah
                });

                if (!uploadResponse.ok) throw new Error("Gagal mengunggah gambar ke ImageKit.");
                const uploadResult = await uploadResponse.json();
                const imageUrl = uploadResult.url; // Dapatkan tautan gambar resmi

                // TAHAP B: Kirim Data Payload Konten ke Backend Vercel -> Database Neon
                const payloadArtikel = {
                    title: judul,
                    content: kontenHtml, // Mengirim teks berformat HTML dari editor
                    categoryId: parseInt(categoryId),
                    imageUrl: imageUrl
                };

                const simpanResponse = await fetch(`${API_BASE_URL}/api/articles`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payloadArtikel)
                });

                if (!simpanResponse.ok) throw new Error("Gagal menyimpan tulisan ke database Neon.");

                // Notifikasi Sukses dan Reset Halaman Form
                showToast("Artikel berita berhasil dipublikasikan secara online!", "success");
                setTimeout(() => {
                    window.location.reload(); // Refresh halaman agar form bersih kembali
                }, 2000);

            } catch (error) {
                console.error("Proses gagal:", error);
                showToast(`Terjadi kesalahan: ${error.message}`, "error");
                resetTombol();
            }
        });
    }

    // Fungsi pembantu untuk mengembalikan teks tombol publikasi
    function resetTombol() {
        btnPublish.textContent = "➤ Publikasikan Artikel";
        btnPublish.disabled = false;
    }

    // Fungsi pembantu untuk menampilkan notifikasi toast (sesuai elemen id="toast" Anda)
    function showToast(message, type = "success") {
        const toast = document.getElementById("toast");
        if (toast) {
            toast.textContent = message;
            toast.className = `toast show ${type}`;
            setTimeout(() => {
                toast.className = "toast";
            }, 3000);
        } else {
            alert(message);
        }
    }
});
