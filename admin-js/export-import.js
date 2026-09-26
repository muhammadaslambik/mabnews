document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       KONFIGURASI
       ========================================================= */

    const API_BASE_URL = "https://mabnews-backend.vercel.app/api";

    /*
     * GANTI dengan ImageKit Public Key kamu (nilai PUBLIK, aman
     * ditaruh di kode sisi browser — bukan secret key). Cari di
     * ImageKit Dashboard > Developer Options > API Keys, atau
     * lihat file admin-js lain (tambah-artikel.js) yang sudah
     * memakainya.
     *
     * Selama nilai ini belum diganti, upload gambar saat IMPOR
     * akan gagal dan otomatis jatuh ke URL gambar asli (tidak
     * mengunggah ulang file-nya).
     */
    const IMAGEKIT_PUBLIC_KEY = "public_UTu0O5OC0Ie+08TZQHbvc8eBpRE=";
    const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

    const HISTORY_KEY = "mabnews_export_import_history";
    const MAX_FILE_SIZE = 50 * 1024 * 1024;


    /* =========================================================
       ELEMENT
       ========================================================= */

    const exportForm = document.getElementById("exportForm");
    const checkAll = document.getElementById("checkAll");
    const dropzone = document.getElementById("dropzoneContainer");
    const fileInput = document.getElementById("hiddenFileInput");
    const selectFileButton = document.getElementById("triggerFileSelect");
    const dropzoneText = document.getElementById("dropzoneText");
    const importButton = document.getElementById("btnExecuteImport");
    const importProgress = document.getElementById("importProgress");
    const historyBody = document.getElementById("historyTableRows");
    const overwriteExisting = document.getElementById("overwriteExisting");
    const importMedia = document.getElementById("importMedia");
    const safeMode = document.getElementById("safeMode");

    const countSemua = document.getElementById("countSemua");
    const countArtikel = document.getElementById("countArtikel");
    const countKategori = document.getElementById("countKategori");
    const countMedia = document.getElementById("countMedia");


    /* =========================================================
       AMBIL JUMLAH DATA ASLI DARI DATABASE (badge di daftar ekspor)
       ========================================================= */

    (async () => {
        try {
            const [categories, articles] = await Promise.all([
                fetchAllCategories(),
                fetchAllArticles()
            ]);

            const mediaCount = articles.filter((item) => Boolean(item.image_url)).length;

            if (countKategori) countKategori.textContent = `${categories.length} item`;
            if (countArtikel) countArtikel.textContent = `${articles.length} item`;
            if (countMedia) countMedia.textContent = `${mediaCount} file`;
            if (countSemua) countSemua.textContent = `${categories.length + articles.length} item`;
        } catch (error) {
            console.warn("Gagal memuat jumlah data dari server:", error);
            [countKategori, countArtikel, countMedia, countSemua].forEach((el) => {
                if (el) el.textContent = "gagal memuat";
            });
        }
    })();


    /* =========================================================
       PANGGILAN API — ARTIKEL & KATEGORI
       ========================================================= */

    async function fetchAllCategories() {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) throw new Error(`GET categories gagal (status ${response.status})`);
        const json = await response.json();
        return Array.isArray(json) ? json : (json.data || []);
    }

    async function fetchAllArticles() {
        // Ambil semua artikel dengan cara halaman per halaman,
        // supaya tetap aman walau jumlah artikelnya banyak.
        const pageSize = 100;
        let page = 1;
        let all = [];

        while (true) {
            const response = await fetch(`${API_BASE_URL}/articles?limit=${pageSize}&page=${page}`);
            if (!response.ok) throw new Error(`GET articles gagal (status ${response.status})`);
            const json = await response.json();

            const rows = Array.isArray(json) ? json : (json.data || []);
            all = all.concat(rows);

            const total = typeof json.total === "number" ? json.total : all.length;

            if (rows.length === 0 || all.length >= total || rows.length < pageSize) {
                break;
            }
            page += 1;
        }

        return all;
    }

    async function fetchArticleBySlug(slug) {
        const response = await fetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}`);
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`GET article ${slug} gagal (status ${response.status})`);
        const json = await response.json();
        return json.data || json;
    }

    async function createArticleOnServer(payload) {
        const response = await fetch(`${API_BASE_URL}/articles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.error || `POST article gagal (status ${response.status})`);
        }
        return response.json();
    }

    async function updateArticleOnServer(slug, payload) {
        const response = await fetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.error || `PUT article gagal (status ${response.status})`);
        }
        return response.json();
    }

    async function createCategoryOnServer(payload) {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.error || `POST category gagal (status ${response.status})`);
        }
        return response.json();
    }

    async function getUploadAuth() {
        const response = await fetch(`${API_BASE_URL}/upload/auth`);
        if (!response.ok) throw new Error(`GET upload/auth gagal (status ${response.status})`);
        return response.json();
    }

    async function uploadImageToImageKit(blob, fileName) {
        if (!IMAGEKIT_PUBLIC_KEY || IMAGEKIT_PUBLIC_KEY.startsWith("GANTI_")) {
            throw new Error("ImageKit Public Key belum diisi di export-import.js");
        }

        const auth = await getUploadAuth();

        const formData = new FormData();
        formData.append("file", blob, fileName);
        formData.append("fileName", fileName);
        formData.append("publicKey", IMAGEKIT_PUBLIC_KEY);
        formData.append("signature", auth.signature);
        formData.append("expire", auth.expire);
        formData.append("token", auth.token);
        formData.append("folder", "/mabnews/import");

        const response = await fetch(IMAGEKIT_UPLOAD_URL, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.message || `Upload ke ImageKit gagal (status ${response.status})`);
        }

        const json = await response.json();
        return json.url;
    }


    /* =========================================================
       CHECK ALL (hanya untuk baris yang aktif/tidak disabled)
       ========================================================= */

    const exportCheckboxes = document.querySelectorAll('input[name="export_item"]:not(:disabled)');

    if (checkAll) {
        checkAll.addEventListener("change", () => {
            exportCheckboxes.forEach((checkbox) => {
                if (checkbox === checkAll) return;
                checkbox.checked = checkAll.checked;
            });
        });
    }

    exportCheckboxes.forEach((checkbox) => {
        if (checkbox === checkAll) return;
        checkbox.addEventListener("change", () => {
            const others = Array.from(exportCheckboxes).filter((item) => item !== checkAll);
            const allChecked = others.every((item) => item.checked);
            if (checkAll) checkAll.checked = allChecked;
        });
    });


    /* =========================================================
       FORMAT RADIO
       ========================================================= */

    const formatOptions = document.querySelectorAll(".format-option");

    formatOptions.forEach((option) => {
        const radio = option.querySelector("input[type='radio']");
        if (!radio) return;

        radio.addEventListener("change", () => {
            formatOptions.forEach((item) => item.classList.remove("selected"));
            if (radio.checked) option.classList.add("selected");
        });
    });


    /* =========================================================
       FILE SELECT / DROPZONE
       ========================================================= */

    if (selectFileButton && fileInput) {
        selectFileButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            fileInput.click();
        });
    }

    if (dropzone && fileInput) {
        dropzone.addEventListener("click", (event) => {
            if (selectFileButton && (event.target === selectFileButton || selectFileButton.contains(event.target))) {
                return;
            }
            fileInput.click();
        });

        dropzone.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropzone.classList.add("dragging");
        });

        dropzone.addEventListener("dragenter", (event) => {
            event.preventDefault();
            dropzone.classList.add("dragging");
        });

        dropzone.addEventListener("dragleave", (event) => {
            if (!dropzone.contains(event.relatedTarget)) {
                dropzone.classList.remove("dragging");
            }
        });

        dropzone.addEventListener("drop", (event) => {
            event.preventDefault();
            dropzone.classList.remove("dragging");
            const files = event.dataTransfer.files;
            if (!files || !files.length) return;
            handleSelectedFile(files[0]);
        });
    }

    if (fileInput) {
        fileInput.addEventListener("change", () => {
            const file = fileInput.files?.[0];
            if (!file) return;
            handleSelectedFile(file);
        });
    }

    function handleSelectedFile(file) {
        if (file.size > MAX_FILE_SIZE) {
            alert("Ukuran file terlalu besar. Maksimum file adalah 50 MB.");
            resetFileInput();
            return;
        }

        const extension = getFileExtension(file.name);
        const supported = ["json", "xml", "csv", "zip"];

        if (!supported.includes(extension)) {
            alert("Format file tidak didukung. Gunakan JSON, ZIP, XML, atau CSV.");
            resetFileInput();
            return;
        }

        if (dropzoneText) {
            dropzoneText.textContent = `File siap: ${file.name} (${formatFileSize(file.size)})`;
        }
    }

    function resetFileInput() {
        if (fileInput) fileInput.value = "";
        if (dropzoneText) {
            dropzoneText.textContent = "Seret dan lepas file di sini atau klik untuk memilih file.";
        }
    }

    function getFileExtension(fileName) {
        const parts = fileName.toLowerCase().split(".");
        return parts.length > 1 ? parts.pop() : "";
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    }


    /* =========================================================
       EXPORT — AMBIL DATA ASLI DARI DATABASE
       ========================================================= */

    if (exportForm) {
        exportForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const selected = getSelectedExportTypes();
            if (!selected.length) {
                alert("Silakan pilih minimal satu jenis data.");
                return;
            }

            const submitButton = exportForm.querySelector('button[type="submit"]');
            const originalLabel = submitButton ? submitButton.innerHTML : "";
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengambil data...';
            }

            try {
                const includeMedia = selected.includes("media");
                const includeArtikel = selected.includes("artikel") || includeMedia;
                const includeKategori = selected.includes("kategori");

                const [categories, articles] = await Promise.all([
                    includeKategori ? fetchAllCategories() : Promise.resolve([]),
                    includeArtikel ? fetchAllArticles() : Promise.resolve([])
                ]);

                const payload = {
                    application: "MAB-News CMS",
                    version: "2.0",
                    exportedAt: new Date().toISOString(),
                    source: "database",
                    selected,
                    data: {}
                };

                if (includeKategori) payload.data.categories = categories;
                if (includeArtikel && selected.includes("artikel")) payload.data.articles = articles;

                const format = document.querySelector('input[name="file_format"]:checked')?.value || "json";
                const now = new Date();
                const timestamp = createTimestamp(now);

                let blob;
                let filename;

                if (includeMedia) {
                    if (submitButton) submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengunduh gambar...';

                    const zip = new JSZip();
                    const mediaFolder = zip.folder("media");
                    const articlesForZip = includeArtikel ? articles : await fetchAllArticles();
                    const zipArticles = [];
                    let mediaOk = 0;
                    let mediaFailed = 0;

                    for (const article of articlesForZip) {
                        const clone = { ...article };

                        if (article.image_url) {
                            try {
                                const imgResponse = await fetch(article.image_url);
                                if (!imgResponse.ok) throw new Error(`status ${imgResponse.status}`);
                                const imgBlob = await imgResponse.blob();
                                const ext = guessExtension(article.image_url, imgBlob.type);
                                const mediaFileName = `${article.slug || article.id}.${ext}`;
                                mediaFolder.file(mediaFileName, imgBlob);
                                clone._mediaFile = `media/${mediaFileName}`;
                                mediaOk += 1;
                            } catch (mediaError) {
                                console.warn(`Gagal mengunduh gambar untuk "${article.slug}":`, mediaError);
                                mediaFailed += 1;
                            }
                        }

                        zipArticles.push(clone);
                    }

                    if (selected.includes("artikel")) {
                        payload.data.articles = zipArticles;
                    } else {
                        payload.data.media = zipArticles.map((item) => ({
                            slug: item.slug,
                            title: item.title,
                            image_url: item.image_url,
                            _mediaFile: item._mediaFile
                        }));
                    }

                    zip.file("data.json", JSON.stringify(payload, null, 2));

                    if (submitButton) submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Membuat file ZIP...';
                    blob = await zip.generateAsync({ type: "blob" });
                    filename = `mabnews-backup-${timestamp}.zip`;

                    if (mediaFailed > 0) {
                        console.warn(`${mediaFailed} gambar gagal diunduh (kemungkinan CORS), ${mediaOk} berhasil.`);
                    }
                } else {
                    if (format === "json") {
                        blob = createJsonBlob(payload);
                    } else if (format === "xml") {
                        blob = createXmlBlob(payload);
                    } else {
                        blob = createCsvBlob(payload);
                    }
                    filename = `mabnews-backup-${timestamp}.${includeMedia ? "zip" : format}`;
                }

                downloadBlob(blob, filename);

                const historyItem = {
                    id: createId(),
                    type: "Export",
                    data: describeSelected(selected),
                    format: includeMedia ? "ZIP" : format.toUpperCase(),
                    size: formatFileSize(blob.size),
                    status: "Berhasil",
                    filename,
                    blobData: await blobToBase64(blob),
                    createdAt: now.toISOString()
                };

                saveHistory(historyItem);

                alert(`Ekspor berhasil.\n\nFile: ${filename}\nKategori: ${categories.length}\nArtikel: ${(payload.data.articles || []).length}`);
            } catch (error) {
                console.error("Export error:", error);
                alert(`Ekspor gagal.\n\n${error.message || "Terjadi kesalahan saat mengambil data dari server."}`);
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalLabel;
                }
            }
        });
    }

    function getSelectedExportTypes() {
        const all = checkAll?.checked === true;
        const available = ["artikel", "kategori", "media"];

        if (all) return [...available];

        return available.filter((value) => {
            const checkbox = document.querySelector(`input[name="export_item"][value="${value}"]`);
            return checkbox && checkbox.checked;
        });
    }

    function describeSelected(selected) {
        const labels = { artikel: "Artikel", kategori: "Kategori", media: "Media" };
        return selected.map((item) => labels[item] || item).join(", ") || "Semua Data";
    }

    function guessExtension(url, mimeType) {
        const fromUrl = (url.split("?")[0].split(".").pop() || "").toLowerCase();
        if (["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(fromUrl)) return fromUrl;

        const map = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
            "image/gif": "gif",
            "image/avif": "avif"
        };
        return map[mimeType] || "jpg";
    }


    /* =========================================================
       JSON / XML / CSV BUILDER (untuk ekspor tanpa media)
       ========================================================= */

    function createJsonBlob(data) {
        return new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    }

    function createXmlBlob(data) {
        const xml = objectToXml(data, "mabnews");
        return new Blob([xml], { type: "application/xml;charset=utf-8" });
    }

    function objectToXml(value, nodeName) {
        const safeName = sanitizeXmlName(nodeName);

        if (value === null || value === undefined) return `<${safeName}></${safeName}>`;
        if (typeof value !== "object") return `<${safeName}>${escapeXml(String(value))}</${safeName}>`;

        if (Array.isArray(value)) {
            return value.map((item) => objectToXml(item, "item")).join("");
        }

        let result = `<${safeName}>`;
        Object.entries(value).forEach(([key, item]) => {
            result += objectToXml(item, key);
        });
        result += `</${safeName}>`;
        return result;
    }

    function sanitizeXmlName(name) {
        return String(name).replace(/[^a-zA-Z0-9_-]/g, "_");
    }

    function escapeXml(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }

    function createCsvBlob(data) {
        const rows = [["Tipe", "Slug/Key", "Field", "Nilai"]];

        (data.data.categories || []).forEach((category) => {
            Object.entries(category).forEach(([field, value]) => {
                rows.push(["Kategori", category.key || category.id, field, stringifyCsvValue(value)]);
            });
        });

        (data.data.articles || []).forEach((article) => {
            Object.entries(article).forEach(([field, value]) => {
                rows.push(["Artikel", article.slug || article.id, field, stringifyCsvValue(value)]);
            });
        });

        const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\r\n");
        return new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    }

    function stringifyCsvValue(value) {
        return typeof value === "object" && value !== null ? JSON.stringify(value) : String(value ?? "");
    }

    function csvEscape(value) {
        return '"' + String(value ?? "").replace(/"/g, '""') + '"';
    }


    /* =========================================================
       DOWNLOAD & BASE64 HELPERS
       ========================================================= */

    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function blobToBase64(blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    function base64ToBlob(dataUrl) {
        const parts = dataUrl.split(",");
        const mime = parts[0].match(/:(.*?);/)?.[1] || "application/octet-stream";
        const binary = atob(parts[1]);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new Blob([bytes], { type: mime });
    }


    /* =========================================================
       CATAT NOTIFIKASI KE DATABASE (fire-and-forget, tidak
       menggagalkan proses utama kalau gagal)
       ========================================================= */
    function notifyServer(payload) {
        fetch(`${API_BASE_URL}/notifications`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).catch((error) => {
            console.warn("Gagal mencatat notifikasi:", error);
        });
    }


    /* =========================================================
       IMPORT — TULIS DATA SUNGGUHAN KE DATABASE
       ========================================================= */

    if (importButton) {
        importButton.addEventListener("click", async () => {
            if (!fileInput || !fileInput.files || !fileInput.files.length) {
                alert("Silakan pilih file backup terlebih dahulu.");
                return;
            }

            const file = fileInput.files[0];
            if (file.size > MAX_FILE_SIZE) {
                alert("Ukuran file melebihi batas 50 MB.");
                return;
            }

            const extension = getFileExtension(file.name);
            importButton.disabled = true;
            setProgress("Membaca file...", "");

            try {
                let payload;
                let zip = null;

                if (extension === "zip") {
                    zip = await JSZip.loadAsync(file);
                    const dataEntry = zip.file("data.json");
                    if (!dataEntry) throw new Error("File ZIP tidak berisi data.json yang valid.");
                    payload = JSON.parse(await dataEntry.async("text"));
                } else if (extension === "json") {
                    payload = JSON.parse(await file.text());
                } else if (extension === "xml") {
                    payload = parseXmlBestEffort(await file.text());
                } else if (extension === "csv") {
                    throw new Error(
                        "Impor CSV langsung ke database belum didukung (CSV cuma cocok untuk dibaca manusia). " +
                        "Gunakan file JSON atau ZIP hasil ekspor dari halaman ini."
                    );
                } else {
                    throw new Error("Format file tidak didukung.");
                }

                if (safeMode?.checked) {
                    validateBackup(payload);
                }

                const categoriesToImport = (payload.data && payload.data.categories) || [];
                const articlesToImport = (payload.data && payload.data.articles) || [];

                if (categoriesToImport.length === 0 && articlesToImport.length === 0) {
                    throw new Error("Tidak ada data artikel/kategori yang bisa diimpor dari file ini.");
                }

                const overwrite = Boolean(overwriteExisting?.checked);
                const shouldImportMedia = Boolean(importMedia?.checked) && Boolean(zip);

                /* ---------- Kategori dulu, supaya artikel bisa nyambung ---------- */
                setProgress(`Memeriksa ${categoriesToImport.length} kategori...`, "");
                const existingCategories = await fetchAllCategories();
                const existingKeys = new Set(existingCategories.map((item) => item.key));

                let categoryCreated = 0;
                let categorySkipped = 0;

                for (const category of categoriesToImport) {
                    if (!category.key) continue;

                    if (existingKeys.has(category.key)) {
                        categorySkipped += 1;
                        continue;
                    }

                    try {
                        await createCategoryOnServer({
                            key: category.key,
                            name: category.name,
                            description: category.description || null
                        });
                        existingKeys.add(category.key);
                        categoryCreated += 1;
                    } catch (error) {
                        console.warn(`Gagal membuat kategori "${category.key}":`, error);
                    }

                    setProgress(`Kategori: ${categoryCreated} dibuat, ${categorySkipped} sudah ada...`, "");
                }

                /* ---------- Artikel ---------- */
                let created = 0;
                let updated = 0;
                let skipped = 0;
                let failed = 0;
                const failedTitles = [];

                for (let i = 0; i < articlesToImport.length; i++) {
                    const article = articlesToImport[i];
                    const progressLabel = `Mengimpor artikel ${i + 1}/${articlesToImport.length}: "${article.title || article.slug || "(tanpa judul)"}"`;
                    setProgress(progressLabel, "");

                    try {
                        let imageUrl = article.image_url || null;

                        if (shouldImportMedia && article._mediaFile) {
                            const mediaEntry = zip.file(article._mediaFile);
                            if (mediaEntry) {
                                try {
                                    const mediaBlob = await mediaEntry.async("blob");
                                    const fileName = article._mediaFile.split("/").pop();
                                    imageUrl = await uploadImageToImageKit(mediaBlob, fileName);
                                } catch (uploadError) {
                                    console.warn(`Upload gambar untuk "${article.slug}" gagal, memakai URL asli:`, uploadError);
                                }
                            }
                        }

                        const categoryKey = article.category?.key || article.category_key || null;

                        const body = {
                            title: article.title,
                            lead: article.lead || "",
                            content: article.content || [],
                            image_url: imageUrl,
                            caption: article.caption || "",
                            author: article.author || "MAB-News",
                            category_key: categoryKey,
                            is_popular: Boolean(article.is_popular)
                        };

                        let existing = null;
                        if (article.slug) {
                            existing = await fetchArticleBySlug(article.slug);
                        }

                        if (existing) {
                            if (overwrite) {
                                await updateArticleOnServer(article.slug, body);
                                updated += 1;
                            } else {
                                skipped += 1;
                            }
                        } else {
                            await createArticleOnServer(body);
                            created += 1;
                        }
                    } catch (error) {
                        console.error(`Gagal mengimpor artikel "${article.title}":`, error);
                        failed += 1;
                        failedTitles.push(article.title || article.slug || "(tanpa judul)");
                    }
                }

                const summary =
                    `Kategori: ${categoryCreated} dibuat, ${categorySkipped} sudah ada.\n` +
                    `Artikel: ${created} dibuat, ${updated} diperbarui, ${skipped} dilewati, ${failed} gagal.` +
                    (failedTitles.length ? `\nGagal: ${failedTitles.slice(0, 5).join(", ")}${failedTitles.length > 5 ? ", ..." : ""}` : "");

                setProgress(summary, failed > 0 ? "is-error" : "is-success");

                const historyItem = {
                    id: createId(),
                    type: "Import",
                    data: `${categoriesToImport.length} kategori, ${articlesToImport.length} artikel`,
                    format: extension.toUpperCase(),
                    size: formatFileSize(file.size),
                    status: failed > 0 ? "Sebagian gagal" : "Berhasil",
                    filename: file.name,
                    createdAt: new Date().toISOString()
                };

                saveHistory(historyItem);

                notifyServer({
                    type: "system",
                    title: "Impor data selesai",
                    message: `${created} artikel dibuat, ${updated} diperbarui dari file ${file.name}.`,
                    link: "export-import.html"
                });

                alert(`Impor selesai.\n\n${summary}`);
                resetFileInput();
            } catch (error) {
                console.error("Import error:", error);
                setProgress(error.message || "Struktur file tidak valid.", "is-error");
                alert(`Import gagal.\n\n${error.message || "Struktur file tidak valid."}`);
            } finally {
                importButton.disabled = false;
            }
        });
    }

    function setProgress(message, statusClass) {
        if (!importProgress) return;
        importProgress.textContent = message;
        importProgress.className = "import-progress" + (statusClass ? ` ${statusClass}` : "");
    }

    function validateBackup(data) {
        if (!data || typeof data !== "object") {
            throw new Error("Data backup bukan objek yang valid.");
        }
        if (!data.data || typeof data.data !== "object") {
            throw new Error("Struktur backup MAB-News tidak ditemukan (field 'data' tidak ada).");
        }
    }

    /* Best-effort: cuma dipakai kalau ada yang nekat impor XML.
       Tidak dijamin bisa merekonstruksi struktur artikel dengan
       sempurna — disarankan pakai JSON/ZIP untuk impor sungguhan. */
    function parseXmlBestEffort(text) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");
        if (xmlDoc.querySelector("parsererror")) {
            throw new Error("XML tidak valid.");
        }
        throw new Error(
            "Impor XML ke database belum didukung sepenuhnya. Gunakan file JSON atau ZIP hasil ekspor dari halaman ini."
        );
    }


    /* =========================================================
       HISTORY (tetap disimpan di localStorage, khusus riwayat UI)
       ========================================================= */

    function getHistory() {
        try {
            const saved = localStorage.getItem(HISTORY_KEY);
            if (!saved) return [];
            const data = JSON.parse(saved);
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    function saveHistory(item) {
        const history = getHistory();
        history.unshift(item);
        const limited = history.slice(0, 30);

        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(limited));
        } catch (error) {
            console.warn("Riwayat tidak dapat disimpan:", error);
        }

        renderHistory();
    }

    function renderHistory() {
        if (!historyBody) return;

        const history = getHistory();
        historyBody.innerHTML = "";

        if (!history.length) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.colSpan = 7;
            cell.className = "empty-history";
            cell.textContent = "Belum ada riwayat Export & Import.";
            row.appendChild(cell);
            historyBody.appendChild(row);
            return;
        }

        history.forEach((item) => {
            historyBody.appendChild(createHistoryRow(item));
        });
    }

    function createHistoryRow(item) {
        const row = document.createElement("tr");

        const dateCell = document.createElement("td");
        dateCell.textContent = formatDateTime(item.createdAt);

        const typeCell = document.createElement("td");
        const typeBadge = document.createElement("span");
        typeBadge.className = `history-badge ${item.type === "Export" ? "export" : "import"}`;
        typeBadge.textContent = item.type;
        typeCell.appendChild(typeBadge);

        const dataCell = document.createElement("td");
        dataCell.textContent = item.data || "-";

        const formatCell = document.createElement("td");
        formatCell.textContent = item.format || "-";

        const sizeCell = document.createElement("td");
        sizeCell.textContent = item.size || "-";

        const statusCell = document.createElement("td");
        const status = document.createElement("span");
        status.className = "history-status";
        status.textContent = item.status || "Berhasil";
        statusCell.appendChild(status);

        const actionCell = document.createElement("td");
        const actions = document.createElement("div");
        actions.className = "history-actions";

        const downloadButton = document.createElement("button");
        downloadButton.type = "button";
        downloadButton.className = "table-download";
        downloadButton.innerHTML = '<i class="fa-solid fa-download"></i> Unduh';
        downloadButton.addEventListener("click", () => downloadHistoryItem(item));

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "table-delete";
        deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        deleteButton.title = "Hapus riwayat";
        deleteButton.addEventListener("click", () => deleteHistoryItem(item.id));

        actions.appendChild(downloadButton);
        actions.appendChild(deleteButton);
        actionCell.appendChild(actions);

        row.appendChild(dateCell);
        row.appendChild(typeCell);
        row.appendChild(dataCell);
        row.appendChild(formatCell);
        row.appendChild(sizeCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        return row;
    }

    function downloadHistoryItem(item) {
        if (!item.blobData) {
            alert("File asli untuk riwayat ini tidak tersimpan (biasanya untuk riwayat Import).");
            return;
        }

        try {
            const blob = base64ToBlob(item.blobData);
            downloadBlob(blob, item.filename || `mabnews-backup.${String(item.format).toLowerCase()}`);
        } catch (error) {
            console.warn("Backup tersimpan tidak dapat dibaca:", error);
        }
    }

    function deleteHistoryItem(id) {
        const confirmed = confirm("Apakah Anda yakin ingin menghapus riwayat ini?");
        if (!confirmed) return;

        const history = getHistory().filter((item) => item.id !== id);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        renderHistory();
    }

    function formatDateTime(iso) {
        if (!iso) return "-";
        const date = new Date(iso);
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const day = String(date.getDate()).padStart(2, "0");
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return `${day} ${month} ${year} ${hour}:${minute}`;
    }


    /* =========================================================
       UTILITIES
       ========================================================= */

    function createId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    }

    function createTimestamp(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}-${hours}${minutes}`;
    }


    /* =========================================================
       INITIAL RENDER
       ========================================================= */

    renderHistory();
});
