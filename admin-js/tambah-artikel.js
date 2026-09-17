document.addEventListener("DOMContentLoaded", async () => {
    const btnPublish = document.getElementById("publish");
    const selectKategori = document.getElementById("category");
    const imageInput = document.getElementById("imageInput");

    // =========================================================
    // 1. MEMUAT KATEGORI OTOMATIS DARI DATABASE NEON (ONLINE)
    // =========================================================
    try {
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        if (!response.ok) throw new Error("Gagal mengambil data kategori.");
        
        const categories = await response.json();
        selectKategori.innerHTML = '<option value="">Pilih kategori</option>';
        
        categories.forEach(kat => {
            const option = document.createElement("option");
            option.value = kat.id;
            option.textContent = kat.name;
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

            // Mengambil data dari element HTML yang sesuai screenshot Anda
            const judul = document.getElementById("title").value.trim();
            const categoryId = selectKategori.value;
            const ringkasan = document.getElementById("lead").value.trim();
            const kontenTextarea = document.getElementById("content");
            const kontenHtml = kontenTextarea ? kontenTextarea.innerHTML.trim() : "";

            // Validasi input teks wajib isi
            if (!judul || !categoryId || !ringkasan || !kontenHtml) {
                showToast("Harap isi semua kolom bertanda bintang (*)", "error");
                return;
            }

            // Validasi gambar wajib diisi agar tidak memicu 'Failed to fetch'
            if (!imageInput.files || imageInput.files.length === 0) {
                showToast("Harap klik dan unggah gambar utama terlebih dahulu!", "error");
                return;
            }

            // Kunci tombol saat proses kirim data berlangsung
            btnPublish.textContent = "Sedang Mempublikasikan...";
            btnPublish.disabled = true;

            try {
                // TAHAP A: Unggah File Fisik Gambar ke ImageKit
                const formData = new FormData();
                formData.append("image", imageInput.files[0]); // Ambil file pertama

                const uploadResponse = await fetch(`${API_BASE_URL}/api/upload`, {
                    method: "POST",
                    body: formData
                });

                if (!uploadResponse.ok) throw new Error("Gagal mengunggah gambar ke ImageKit.");
                const uploadResult = await uploadResponse.json();
                const imageUrl = uploadResult.url;

                // TAHAP B: Kirim Payload Data Berita Lengkap ke Neon
                const payloadArtikel = {
                    title: judul,
                    content: kontenHtml,
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

                showToast("Artikel berita berhasil dipublikasikan secara online!", "success");
                
                // Kosongkan editor setelah sukses
                document.getElementById("title").value = "";
                document.getElementById("lead").value = "";
                if(kontenTextarea) kontenTextarea.innerHTML = "";
                imageInput.value = "";
                document.getElementById("preview").innerHTML = "";
                selectKategori.value = "";

            } catch (error) {
                console.error("Proses gagal:", error);
                showToast(`Terjadi kesalahan: ${error.message}`, "error");
            } finally {
                resetTombol();
            }
        });
    }

    function resetTombol() {
        btnPublish.innerHTML = "➤　Publikasikan Artikel";
        btnPublish.disabled = false;
    }

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
