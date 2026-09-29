document.addEventListener("DOMContentLoaded", async () => {
  // ---------------------------------------------------------
  // Elemen
  // ---------------------------------------------------------
  const $ = (id) => document.getElementById(id);

  const titleInput = $("title");
  const titleCount = $("titleCount");
  const slugInput = $("slug");
  const regenSlugBtn = $("regenSlug");
  const authorInput = $("author");
  const selectKategori = $("category");
  const newCategoryBtn = $("newCategoryBtn");
  const leadInput = $("lead");
  const leadCount = $("leadCount");
  const contentEl = $("content");
  const wordCountEl = $("wordCount");
  const formatSelect = $("format");
  const imageInput = $("imageInput");
  const uploadBox = $("uploadBox");
  const uploadPlaceholder = $("uploadPlaceholder");
  const uploadPreview = $("uploadPreview");
  const uploadPreviewImg = $("uploadPreviewImg");
  const uploadStatus = $("uploadStatus");
  const removeImageBtn = $("removeImageBtn");
  const imageUrlInput = $("imageUrl");
  const captionInput = $("caption");
  const tagsWrap = $("tags");
  const tagInput = $("tagInput");
  const metaInput = $("meta");
  const metaCount = $("metaCount");
  const keywordsInput = $("keywords");
  const statusRadios = document.querySelectorAll('input[name="status"]');
  const publishDateInput = $("publishDate");
  const homepageToggle = $("homepageToggle");
  const allowCommentsCheck = $("allowComments");
  const featuredCheck = $("featured");
  const btnDraft = $("saveDraft");
  const btnPublish = $("publish");
  const btnPreview = $("previewBtn");
  const toast = $("toast");
  const publishedLink = $("publishedLink");
  const publishedLinkAnchor = $("publishedLinkAnchor");
  const previewModal = $("previewModal");
  const previewBody = $("previewBody");
  const closePreviewBtn = $("closePreview");
  const pageHeadingTitle = $("pageHeadingTitle");
  const pageHeadingDesc = $("pageHeadingDesc");
  const pageHeadingCrumb = $("pageHeadingCrumb");

  let tags = [];
  let uploadedImageUrl = "";
  let isUploadingImage = false;

  // Mode edit: ?slug=... di URL -> mengedit artikel yang sudah
  // ada (dipanggil dari artikel.js / draft.js), bukan membuat baru.
  const urlParams = new URLSearchParams(window.location.search);
  const editSlug = urlParams.get("slug");
  let currentSlug = null;

  // ---------------------------------------------------------
  // Util
  // ---------------------------------------------------------
  function showToast(message, type = "success") {
    if (!toast) { alert(message); return; }
    toast.textContent = message;
    toast.className = `ta-toast show ${type === "error" ? "error" : ""}`.trim();
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.className = "ta-toast"; }, 3500);
  }

  function slugify(text) {
    return (text || "")
      .toString()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function escapeHtml(str) {
    return (str || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function formatBytes(n) {
    if (!n && n !== 0) return "";
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(0) + " KB";
    return (n / (1024 * 1024)).toFixed(1) + " MB";
  }

  // ---------------------------------------------------------
  // 1. Kategori — muat dari database, dan tambah kategori baru
  // ---------------------------------------------------------
  async function loadCategories(selectAfter) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) throw new Error("Gagal mengambil data kategori.");
      const raw = await response.json();
      const categories = Array.isArray(raw) ? raw : (raw.data || raw.categories || []);
      selectKategori.innerHTML = "";
      categories.forEach((kat) => {
        const option = document.createElement("option");
        option.value = kat.key;
        option.textContent = kat.name;
        if (selectAfter && kat.key === selectAfter) option.selected = true;
        selectKategori.appendChild(option);
      });
      if (!categories.length) throw new Error("Daftar kategori kosong dari server.");
    } catch (error) {
      console.error("Gagal memuat kategori:", error);
      showToast("Gagal memuat daftar kategori dari database.", "error");
    }
  }

  function openCategoryModal() {
    $("newCategoryName").value = "";
    $("newCategoryDesc").value = "";
    $("categoryModalStatus").textContent = "";
    $("categoryModalStatus").className = "ta-modal-status";
    $("categoryModalOverlay").classList.add("show");
    $("newCategoryName").focus();
  }
  function closeCategoryModal() { $("categoryModalOverlay").classList.remove("show"); }

  newCategoryBtn.addEventListener("click", openCategoryModal);
  $("categoryModalCancel").addEventListener("click", closeCategoryModal);
  $("categoryModalOverlay").addEventListener("click", (e) => {
    if (e.target === $("categoryModalOverlay")) closeCategoryModal();
  });

  $("categoryModalSubmit").addEventListener("click", async () => {
    const name = $("newCategoryName").value.trim();
    const description = $("newCategoryDesc").value.trim();
    const statusEl = $("categoryModalStatus");
    if (!name) {
      statusEl.textContent = "Nama kategori wajib diisi.";
      statusEl.className = "ta-modal-status is-error";
      return;
    }
    const key = slugify(name);
    const submitBtn = $("categoryModalSubmit");
    submitBtn.disabled = true;
    statusEl.textContent = "Menyimpan kategori...";
    statusEl.className = "ta-modal-status is-loading";
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, name, description: description || null })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || `Gagal menyimpan (status ${res.status})`);

      await loadCategories(key);
      showToast(`Kategori "${name}" berhasil ditambahkan.`);
      closeCategoryModal();
    } catch (error) {
      statusEl.textContent = error.message || "Gagal menyimpan kategori.";
      statusEl.className = "ta-modal-status is-error";
    } finally {
      submitBtn.disabled = false;
    }
  });

  // ---------------------------------------------------------
  // 2. Hitung karakter + slug otomatis dari judul
  // ---------------------------------------------------------
  titleInput.addEventListener("input", () => {
    titleCount.textContent = titleInput.value.length;
    slugInput.value = slugify(titleInput.value);
    if (!publishedLink.hidden) publishedLink.hidden = true;
  });

  regenSlugBtn.addEventListener("click", () => {
    slugInput.value = slugify(titleInput.value);
    if (!titleInput.value.trim()) {
      showToast("Isi judul artikel dulu untuk membuat slug.", "error");
    }
  });

  leadInput.addEventListener("input", () => { leadCount.textContent = leadInput.value.length; });
  metaInput.addEventListener("input", () => { metaCount.textContent = metaInput.value.length; });

  // ---------------------------------------------------------
  // 3. Editor — toolbar, status tombol aktif, paste bersih,
  //    sisip gambar/video/file lewat upload asli ke ImageKit
  // ---------------------------------------------------------
  function updateWordCount() {
    const text = contentEl.textContent.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    wordCountEl.textContent = `${words} kata`;
  }

  function updateToolbarState() {
    document.querySelectorAll(".ta-toolbar [data-cmd]").forEach((btn) => {
      const cmd = btn.dataset.cmd;
      if (["bold", "italic", "underline", "strikeThrough", "insertUnorderedList", "insertOrderedList"].includes(cmd)) {
        try { btn.classList.toggle("is-active", document.queryCommandState(cmd)); } catch (e) { /* noop */ }
      }
    });
  }

  // Simpan posisi kursor SEBELUM fokus pindah ke modal/dropzone,
  // supaya gambar/video/file bisa disisipkan tepat di titik itu
  // setelah proses upload selesai.
  let savedRange = null;
  function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && contentEl.contains(sel.anchorNode)) {
      savedRange = sel.getRangeAt(0).cloneRange();
    }
  }
  function restoreSelection() {
    contentEl.focus();
    const sel = window.getSelection();
    sel.removeAllRanges();
    if (savedRange) {
      sel.addRange(savedRange);
    } else {
      const r = document.createRange();
      r.selectNodeContents(contentEl);
      r.collapse(false);
      sel.addRange(r);
    }
  }
  function insertHtmlAtSaved(html) {
    restoreSelection();
    document.execCommand("insertHTML", false, html);
    updateWordCount();
  }

  document.querySelectorAll(".ta-toolbar [data-cmd]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cmd = btn.dataset.cmd;
      const value = btn.dataset.value || null;
      contentEl.focus();
      try { document.execCommand(cmd, false, value); } catch (e) { console.warn("Perintah editor gagal:", cmd, e); }
      updateWordCount();
      updateToolbarState();
    });
  });

  formatSelect.addEventListener("change", () => {
    contentEl.focus();
    const map = { p: "p", h2: "h2", h3: "h3" };
    document.execCommand("formatBlock", false, map[formatSelect.value] || "p");
  });

  $("linkBtn").addEventListener("click", () => {
    const url = prompt("Masukkan URL tautan (https://...):");
    if (url) { contentEl.focus(); document.execCommand("createLink", false, url); }
  });

  contentEl.addEventListener("input", updateWordCount);
  contentEl.addEventListener("keyup", updateToolbarState);
  contentEl.addEventListener("mouseup", updateToolbarState);
  updateWordCount();

  // ---- Tempel (paste) konten dibersihkan lewat MabContent ----
  contentEl.addEventListener("paste", (e) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");
    let insertion;
    if (html && html.trim()) {
      insertion = window.MabContent.sanitizeToBlocks(html).join("");
    } else {
      insertion = window.MabContent.plainTextToHtml(text);
    }
    if (insertion) document.execCommand("insertHTML", false, insertion);
    updateWordCount();
  });

  $("fullscreenBtn").addEventListener("click", () => {
    $("editorWrap").classList.toggle("is-fullscreen");
  });

  // ---------------------------------------------------------
  // 3b. Sisip gambar/video/file ke DALAM konten — upload asli
  //     ke ImageKit, lalu dicatat ke /api/media supaya muncul
  //     juga di halaman Media.
  // ---------------------------------------------------------
  let imagekitInstance = null;
  if (typeof ImageKit !== "undefined") {
    imagekitInstance = new ImageKit({ publicKey: IMAGEKIT_PUBLIC_KEY, urlEndpoint: IMAGEKIT_URL_ENDPOINT });
  }

  function imagekitUpload(params) {
    return new Promise((resolve, reject) => {
      imagekitInstance.upload(params, (err, result) => { if (err) reject(err); else resolve(result); });
    });
  }

  async function uploadToImageKit(file, folder) {
    if (!imagekitInstance) throw new Error("SDK ImageKit belum termuat. Periksa koneksi internet.");
    const authRes = await fetch(`${API_BASE_URL}/api/upload/auth`);
    if (!authRes.ok) throw new Error("Gagal mengambil signature upload dari server.");
    const auth = await authRes.json();
    const result = await imagekitUpload({
      file, fileName: file.name, folder,
      token: auth.token, expire: auth.expire, signature: auth.signature
    });
    if (!result.url) throw new Error("ImageKit tidak mengembalikan URL file.");
    return result;
  }

  // Dicatat ke tabel media_files supaya file yang disisipkan lewat
  // editor artikel juga muncul di halaman Media — kegagalan di sini
  // tidak membatalkan penyisipan (URL asli sudah didapat dari ImageKit).
  async function registerMedia(result, fileType) {
    try {
      await fetch(`${API_BASE_URL}/api/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_id: result.fileId || null,
          name: result.name || "file",
          url: result.url,
          file_type: fileType,
          size_bytes: result.size || null,
          folder: result.filePath ? result.filePath.replace(/\/[^/]*$/, "") : null,
          source: "artikel-editor"
        })
      });
    } catch (e) {
      console.warn("Gagal mencatat media ke database (file tetap tersimpan di ImageKit):", e);
    }
  }

  // ---- Gambar di dalam konten ----
  $("imageInsertBtn").addEventListener("click", () => {
    saveSelection();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/gif";
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      showToast("Mengunggah gambar...");
      try {
        const result = await uploadToImageKit(file, "/mabnews/artikel");
        insertHtmlAtSaved(`<figure class="mab-figure"><img src="${escapeHtml(result.url)}" alt=""></figure><p><br></p>`);
        registerMedia(result, "image");
        showToast("Gambar berhasil disisipkan.");
      } catch (error) {
        showToast(`Gagal mengunggah gambar: ${error.message}`, "error");
      }
    });
    input.click();
  });

  // ---- Video (upload file / tautan) ----
  function openVideoModal() {
    saveSelection();
    $("videoModalStatus").textContent = "";
    $("videoModalStatus").className = "ta-modal-status";
    $("videoUrlInput").value = "";
    $("videoModalOverlay").classList.add("show");
  }
  function closeVideoModal() { $("videoModalOverlay").classList.remove("show"); }

  $("videoInsertBtn").addEventListener("click", openVideoModal);
  $("videoModalCancel").addEventListener("click", closeVideoModal);
  $("videoModalOverlay").addEventListener("click", (e) => { if (e.target === $("videoModalOverlay")) closeVideoModal(); });

  $("videoDropzone").addEventListener("click", () => $("videoFileInput").click());
  ["dragover", "dragenter"].forEach((evt) => $("videoDropzone").addEventListener(evt, (e) => { e.preventDefault(); $("videoDropzone").classList.add("is-drag"); }));
  ["dragleave", "drop"].forEach((evt) => $("videoDropzone").addEventListener(evt, (e) => { e.preventDefault(); $("videoDropzone").classList.remove("is-drag"); }));
  $("videoDropzone").addEventListener("drop", (e) => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleVideoFile(file);
  });
  $("videoFileInput").addEventListener("change", () => {
    const file = $("videoFileInput").files && $("videoFileInput").files[0];
    if (file) handleVideoFile(file);
  });

  async function handleVideoFile(file) {
    if (file.size > 50 * 1024 * 1024) {
      $("videoModalStatus").textContent = "Ukuran video maksimal 50 MB.";
      $("videoModalStatus").className = "ta-modal-status is-error";
      return;
    }
    $("videoModalStatus").textContent = "Mengunggah video...";
    $("videoModalStatus").className = "ta-modal-status is-loading";
    try {
      const result = await uploadToImageKit(file, "/mabnews/artikel");
      insertHtmlAtSaved(`<figure class="mab-figure"><video src="${escapeHtml(result.url)}" controls></video></figure><p><br></p>`);
      registerMedia(result, "video");
      closeVideoModal();
      showToast("Video berhasil disisipkan.");
    } catch (error) {
      $("videoModalStatus").textContent = `Gagal mengunggah: ${error.message}`;
      $("videoModalStatus").className = "ta-modal-status is-error";
    }
  }

  $("videoUrlSubmit").addEventListener("click", () => {
    const raw = $("videoUrlInput").value.trim();
    if (!raw) { closeVideoModal(); return; }
    const embed = window.MabContent.toEmbedUrl(raw);
    if (!embed) {
      $("videoModalStatus").textContent = "Tautan harus dari YouTube atau Vimeo.";
      $("videoModalStatus").className = "ta-modal-status is-error";
      return;
    }
    insertHtmlAtSaved(`<figure class="mab-embed"><iframe src="${escapeHtml(embed)}" allowfullscreen></iframe></figure><p><br></p>`);
    closeVideoModal();
    showToast("Video berhasil disisipkan.");
  });

  // ---- Lampirkan file (PDF, dokumen, dll) ----
  $("fileInsertBtn").addEventListener("click", () => {
    saveSelection();
    $("fileAttachInput").click();
  });
  $("fileAttachInput").addEventListener("change", async () => {
    const file = $("fileAttachInput").files && $("fileAttachInput").files[0];
    $("fileAttachInput").value = "";
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      showToast("Ukuran file maksimal 25 MB.", "error");
      return;
    }
    showToast("Mengunggah file...");
    try {
      const result = await uploadToImageKit(file, "/mabnews/artikel-file");
      const label = `${file.name}${file.size ? " (" + formatBytes(file.size) + ")" : ""}`;
      insertHtmlAtSaved(`<p><a class="mab-file" href="${escapeHtml(result.url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a></p><p><br></p>`);
      registerMedia(result, window.MabContent.classifyMedia(file.name, file.type));
      showToast("File berhasil dilampirkan.");
    } catch (error) {
      showToast(`Gagal mengunggah file: ${error.message}`, "error");
    }
  });

  // ---------------------------------------------------------
  // 4. Tags
  // ---------------------------------------------------------
  function renderTags() {
    tagsWrap.innerHTML = "";
    tags.forEach((t, i) => {
      const span = document.createElement("span");
      span.className = "ta-tag";
      span.innerHTML = `${escapeHtml(t)} <button type="button" data-i="${i}" title="Hapus tag"><i class="fa-solid fa-xmark"></i></button>`;
      tagsWrap.appendChild(span);
    });
    tagsWrap.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => { tags.splice(parseInt(b.dataset.i, 10), 1); renderTags(); });
    });
  }
  function addTag(raw) {
    const val = raw.trim();
    if (!val || tags.includes(val)) return;
    tags.push(val);
    renderTags();
  }
  tagInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); addTag(tagInput.value); tagInput.value = ""; }
    else if (e.key === "Backspace" && !tagInput.value && tags.length) { tags.pop(); renderTags(); }
  });

  // ---------------------------------------------------------
  // 5. Status publikasi -> aktifkan tanggal hanya saat dijadwalkan
  // ---------------------------------------------------------
  statusRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const val = document.querySelector('input[name="status"]:checked').value;
      publishDateInput.disabled = val !== "schedule";
    });
  });

  // ---------------------------------------------------------
  // 6. Upload gambar utama (langsung diunggah saat dipilih)
  // ---------------------------------------------------------
  function resetImage() {
    imageInput.value = "";
    uploadedImageUrl = "";
    imageUrlInput.value = "";
    uploadStatus.textContent = "";
    uploadPreviewImg.src = "";
    uploadPreview.hidden = true;
    uploadPlaceholder.hidden = false;
  }

  async function uploadFeaturedImage(file) {
    isUploadingImage = true;
    uploadStatus.textContent = "Mengunggah gambar...";
    imageUrlInput.value = "";
    uploadedImageUrl = "";
    try {
      const result = await uploadToImageKit(file, "/mabnews/artikel-utama");
      uploadedImageUrl = result.url;
      imageUrlInput.value = uploadedImageUrl;
      uploadStatus.textContent = "";
      registerMedia(result, "image");
      showToast("Gambar berhasil diunggah.");
    } catch (error) {
      console.error("Gagal mengunggah gambar:", error);
      uploadStatus.textContent = "Gagal mengunggah. Klik ✕ lalu coba lagi.";
      showToast(`Gagal mengunggah gambar: ${error.message}`, "error");
    } finally {
      isUploadingImage = false;
    }
  }

  function setImageFile(file) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) { showToast("Format gambar harus JPG, PNG, atau WebP.", "error"); return; }
    if (file.size > 5 * 1024 * 1024) { showToast("Ukuran gambar maksimal 5 MB.", "error"); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadPreviewImg.src = e.target.result;
      uploadPlaceholder.hidden = true;
      uploadPreview.hidden = false;
    };
    reader.readAsDataURL(file);
    uploadFeaturedImage(file);
  }

  imageInput.addEventListener("change", () => {
    const file = imageInput.files && imageInput.files[0];
    if (file) setImageFile(file);
  });
  ["dragover", "dragenter"].forEach((evt) => uploadBox.addEventListener(evt, (e) => { e.preventDefault(); uploadBox.classList.add("is-drag"); }));
  ["dragleave", "drop"].forEach((evt) => uploadBox.addEventListener(evt, (e) => { e.preventDefault(); uploadBox.classList.remove("is-drag"); }));
  uploadBox.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) setImageFile(file);
  });
  removeImageBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); resetImage(); });

  // ---------------------------------------------------------
  // 7. Kumpulkan & validasi data form
  // ---------------------------------------------------------
  // Kolom `content` di database adalah jsonb array berisi blok
  // HTML yang sudah dibersihkan (lihat js/content-sanitizer.js).
  function buildContentArray() {
    return window.MabContent.sanitizeToBlocks(contentEl.innerHTML);
  }

  // Kebalikannya — dipakai saat memuat artikel untuk diedit.
  function fillContentArray(blocks) {
    contentEl.innerHTML = window.MabContent.blocksToHtml(blocks);
    updateWordCount();
  }

  function gatherFormData() {
    const selectedOptions = Array.from(selectKategori.selectedOptions).filter(o => o.value);
    return {
      title: titleInput.value.trim(),
      lead: leadInput.value.trim(),
      content: buildContentArray(),
      image_url: uploadedImageUrl,
      caption: captionInput.value.trim(),
      author: authorInput.value.trim() || "MAB-News",
      category_keys: selectedOptions.map(o => o.value),
      is_popular: featuredCheck.checked,
      tags: tags.slice(),
      keywords: keywordsInput.value.trim(),
      seo_meta_description: metaInput.value.trim(),
      allow_comments: allowCommentsCheck.checked,
      show_on_homepage: homepageToggle.checked,
      slugPreview: slugInput.value.trim() || slugify(titleInput.value),
      categoryNames: selectedOptions.map(o => o.textContent)
    };
  }

  function validate(data, requireFull) {
    const errors = [];
    if (!data.title) errors.push("Judul Artikel");
    if (requireFull) {
      if (!data.author) errors.push("Penulis");
      if (!data.category_keys.length) errors.push("Kategori");
      if (!data.lead) errors.push("Ringkasan (Lead)");
      if (!data.content.length) errors.push("Konten Artikel");
      if (!data.image_url) errors.push("Gambar Utama");
    }
    return errors;
  }

  function resetForm() {
    titleInput.value = ""; titleCount.textContent = "0"; slugInput.value = "";
    authorInput.value = ""; leadInput.value = ""; leadCount.textContent = "0";
    contentEl.innerHTML = ""; updateWordCount(); resetImage();
    captionInput.value = ""; tags = []; renderTags();
    Array.from(selectKategori.options).forEach(o => { o.selected = false; });
    metaInput.value = ""; metaCount.textContent = "0"; keywordsInput.value = "";
    publishDateInput.value = ""; publishDateInput.disabled = true;
    featuredCheck.checked = false; allowCommentsCheck.checked = true; homepageToggle.checked = true;
    document.querySelector('input[name="status"][value="publish"]').checked = true;
    currentSlug = null;
  }

  async function submitArticle(data, button, status, successMessage, idleLabel) {
    button.disabled = true;
    const originalLabel = button.innerHTML;
    button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;
    try {
      const serverPayload = {
        title: data.title, lead: data.lead, content: data.content, image_url: data.image_url,
        caption: data.caption, author: data.author, category_keys: data.category_keys,
        is_popular: data.is_popular, tags: data.tags, keywords: data.keywords || null,
        seo_meta_description: data.seo_meta_description || null, status,
        allow_comments: data.allow_comments, show_on_homepage: data.show_on_homepage
      };
      if (status === "scheduled" && publishDateInput.value) {
        serverPayload.scheduled_at = new Date(publishDateInput.value).toISOString();
      }

      const isEditing = !!currentSlug;
      const url = isEditing
        ? `${API_BASE_URL}/api/articles/${encodeURIComponent(currentSlug)}`
        : `${API_BASE_URL}/api/articles`;

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverPayload)
      });

      if (!res.ok) {
        let detail = "";
        try { detail = (await res.json()).error || ""; } catch (_) { /* ignore */ }
        throw new Error(detail || `Gagal menyimpan artikel (status ${res.status}).`);
      }

      const resJson = await res.json();
      const savedSlug = resJson?.data?.slug || data.slugPreview;

      showToast(successMessage);
      if (status === "published" && savedSlug) {
        publishedLinkAnchor.href = `${PUBLIC_ARTICLE_URL_BASE}${savedSlug}`;
        publishedLink.hidden = false;
      }
      resetForm();
    } catch (error) {
      console.error("Proses gagal:", error);
      showToast(`Terjadi kesalahan: ${error.message}`, "error");
    } finally {
      button.disabled = false;
      button.innerHTML = idleLabel || originalLabel;
    }
  }

  // ---------------------------------------------------------
  // 8. Tombol Publikasikan
  // ---------------------------------------------------------
  const publishIdle = `<i class="fa-solid fa-paper-plane"></i> Publikasikan Artikel`;
  btnPublish.addEventListener("click", async () => {
    if (isUploadingImage) { showToast("Tunggu proses unggah gambar selesai terlebih dahulu.", "error"); return; }
    const data = gatherFormData();
    const errors = validate(data, true);
    if (errors.length) { showToast(`Harap lengkapi: ${errors.join(", ")}.`, "error"); return; }

    const selectedStatus = document.querySelector('input[name="status"]:checked').value;
    if (selectedStatus === "schedule" && !publishDateInput.value) {
      showToast("Pilih tanggal & waktu untuk menjadwalkan artikel.", "error");
      return;
    }
    const status = selectedStatus === "schedule" ? "scheduled" : "published";
    const message = status === "scheduled" ? "Artikel berhasil dijadwalkan!" : "Artikel berhasil dipublikasikan!";
    await submitArticle(data, btnPublish, status, message, publishIdle);
  });

  // ---------------------------------------------------------
  // 9. Tombol Simpan Draft
  // ---------------------------------------------------------
  const draftIdle = `<i class="fa-regular fa-floppy-disk"></i> Simpan Draft`;
  btnDraft.addEventListener("click", async () => {
    const data = gatherFormData();
    if (!data.title) { showToast("Isi judul artikel dulu untuk menyimpan draft.", "error"); return; }
    await submitArticle(data, btnDraft, "draft", "Draft berhasil disimpan.", draftIdle);
  });

  // ---------------------------------------------------------
  // 10. Tombol Preview
  // ---------------------------------------------------------
  function renderPreview(data) {
    const imageHtml = data.image_url ? `<img class="ta-pv-image" src="${data.image_url}" alt="">` : "";
    const categoryHtml = data.categoryNames && data.categoryNames.length
      ? data.categoryNames.map(n => `<span class="ta-pv-category">${escapeHtml(n)}</span>`).join(" ")
      : "";
    const titleHtml = data.title ? escapeHtml(data.title) : '<span class="ta-pv-empty">(Judul belum diisi)</span>';
    const dateStr = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const leadHtml = data.lead ? `<p class="ta-pv-lead">${escapeHtml(data.lead)}</p>` : "";
    const contentHtml = data.content.length
      ? window.MabContent.blocksToHtml(data.content)
      : '<p class="ta-pv-empty">(Konten belum diisi)</p>';
    const tagsHtml = data.tags.length
      ? `<div class="ta-pv-tags">${data.tags.map((t) => `<span class="ta-tag">${escapeHtml(t)}</span>`).join("")}</div>`
      : "";
    const realUrl = data.slugPreview ? `${PUBLIC_ARTICLE_URL_BASE}${data.slugPreview}` : "";

    previewBody.innerHTML = `
      ${imageHtml}
      ${categoryHtml}
      <h1 class="ta-pv-title">${titleHtml}</h1>
      <p class="ta-pv-meta">Oleh ${escapeHtml(data.author || "-")} · ${dateStr}</p>
      ${realUrl ? `<p class="ta-pv-meta">${escapeHtml(realUrl)}</p>` : ""}
      ${leadHtml}
      <div class="ta-pv-content">${contentHtml}</div>
      ${tagsHtml}
    `;
  }

  btnPreview.addEventListener("click", () => {
    const data = gatherFormData();
    if (!data.title && !data.content.length) { showToast("Isi judul atau konten dulu sebelum melihat pratinjau.", "error"); return; }
    renderPreview(data);
    previewModal.classList.add("show");
  });
  closePreviewBtn.addEventListener("click", () => previewModal.classList.remove("show"));
  previewModal.addEventListener("click", (e) => { if (e.target === previewModal) previewModal.classList.remove("show"); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      previewModal.classList.remove("show");
      $("videoModalOverlay").classList.remove("show");
      $("categoryModalOverlay").classList.remove("show");
      $("editorWrap").classList.remove("is-fullscreen");
    }
  });

  // ---------------------------------------------------------
  // 11. Mode edit — muat artikel dari server berdasarkan ?slug=
  // ---------------------------------------------------------
  async function loadArticleForEdit(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/articles/${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error("Artikel tidak ditemukan di server.");
      const { data } = await res.json();

      currentSlug = data.slug;
      if (pageHeadingTitle) pageHeadingTitle.textContent = "Edit Artikel";
      if (pageHeadingDesc) pageHeadingDesc.textContent = "Perbarui artikel yang sudah dipublikasikan.";
      if (pageHeadingCrumb) pageHeadingCrumb.textContent = "Edit Artikel";
      document.title = "Edit Artikel — MAB-News CMS";

      titleInput.value = data.title || "";
      titleCount.textContent = titleInput.value.length;
      slugInput.value = data.slug || "";
      authorInput.value = data.author || "";
      leadInput.value = data.lead || "";
      leadCount.textContent = leadInput.value.length;

      fillContentArray(Array.isArray(data.content) ? data.content : []);

      captionInput.value = data.caption || "";
      featuredCheck.checked = !!data.is_popular;

      tags = Array.isArray(data.tags) ? data.tags.slice() : [];
      renderTags();

      metaInput.value = data.seo_meta_description || "";
      metaCount.textContent = metaInput.value.length;
      keywordsInput.value = data.keywords || "";

      allowCommentsCheck.checked = data.allow_comments !== false;
      homepageToggle.checked = data.show_on_homepage !== false;

      if (data.image_url) {
        uploadedImageUrl = data.image_url;
        imageUrlInput.value = data.image_url;
        uploadPreviewImg.src = data.image_url;
        uploadPlaceholder.hidden = true;
        uploadPreview.hidden = false;
      }

      const selectedKeys = Array.isArray(data.categories)
        ? data.categories.map(c => c.key)
        : (data.category && data.category.key ? [data.category.key] : []);
      Array.from(selectKategori.options).forEach((o) => { o.selected = selectedKeys.includes(o.value); });

      const status = data.status || "published";
      if (status === "draft") {
        document.querySelector('input[name="status"][value="draft"]').checked = true;
      } else if (status === "scheduled") {
        document.querySelector('input[name="status"][value="schedule"]').checked = true;
        publishDateInput.disabled = false;
        if (data.scheduled_at) {
          const d = new Date(data.scheduled_at);
          const pad = (n) => String(n).padStart(2, "0");
          publishDateInput.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
        }
      } else {
        document.querySelector('input[name="status"][value="publish"]').checked = true;
      }

      btnPublish.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Simpan Perubahan`;
      showToast("Artikel dimuat untuk diedit.");
    } catch (error) {
      console.error("Gagal memuat artikel untuk diedit:", error);
      showToast(`Gagal memuat artikel: ${error.message}`, "error");
    }
  }

  // ---------------------------------------------------------
  // Inisialisasi awal
  // ---------------------------------------------------------
  renderTags();
  publishDateInput.disabled = true;

  await loadCategories();
  if (editSlug) {
    await loadArticleForEdit(editSlug);
  }
});
