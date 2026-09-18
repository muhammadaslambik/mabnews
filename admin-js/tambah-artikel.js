document.addEventListener("DOMContentLoaded", async () => {
  // ---------------------------------------------------------
  // Elemen
  // ---------------------------------------------------------
  const titleInput = document.getElementById("title");
  const titleCount = document.getElementById("titleCount");
  const slugInput = document.getElementById("slug");
  const regenSlugBtn = document.getElementById("regenSlug");
  const authorInput = document.getElementById("author");
  const selectKategori = document.getElementById("category");
  const leadInput = document.getElementById("lead");
  const leadCount = document.getElementById("leadCount");
  const contentEl = document.getElementById("content");
  const wordCountEl = document.getElementById("wordCount");
  const formatSelect = document.getElementById("format");
  const imageInput = document.getElementById("imageInput");
  const uploadBox = document.getElementById("uploadBox");
  const uploadPlaceholder = document.getElementById("uploadPlaceholder");
  const uploadPreview = document.getElementById("uploadPreview");
  const uploadPreviewImg = document.getElementById("uploadPreviewImg");
  const uploadStatus = document.getElementById("uploadStatus");
  const removeImageBtn = document.getElementById("removeImageBtn");
  const imageUrlInput = document.getElementById("imageUrl");
  const captionInput = document.getElementById("caption");
  const tagsWrap = document.getElementById("tags");
  const tagInput = document.getElementById("tagInput");
  const metaInput = document.getElementById("meta");
  const metaCount = document.getElementById("metaCount");
  const keywordsInput = document.getElementById("keywords");
  const statusRadios = document.querySelectorAll('input[name="status"]');
  const publishDateInput = document.getElementById("publishDate");
  const homepageToggle = document.getElementById("homepageToggle");
  const allowCommentsCheck = document.getElementById("allowComments");
  const featuredCheck = document.getElementById("featured");
  const btnDraft = document.getElementById("saveDraft");
  const btnPublish = document.getElementById("publish");
  const btnPreview = document.getElementById("previewBtn");
  const toast = document.getElementById("toast");
  const publishedLink = document.getElementById("publishedLink");
  const publishedLinkAnchor = document.getElementById("publishedLinkAnchor");
  const previewModal = document.getElementById("previewModal");
  const previewBody = document.getElementById("previewBody");
  const closePreviewBtn = document.getElementById("closePreview");

  let tags = [];
  let uploadedImageUrl = "";
  let isUploadingImage = false;
  const DRAFT_STORAGE_KEY = "mabnews_draft_tambah_artikel";

  // ---------------------------------------------------------
  // Mode edit (dipanggil dari artikel.html lewat ?slug=...)
  // ---------------------------------------------------------
  const params = new URLSearchParams(location.search);
  const editSlug = params.get("slug");
  let originalArticle = null;

  // ---------------------------------------------------------
  // Util
  // ---------------------------------------------------------
  function showToast(message, type = "success") {
    if (!toast) { alert(message); return; }
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.className = "toast"; }, 3500);
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

  // ---------------------------------------------------------
  // 1. Muat kategori otomatis dari database (online)
  // ---------------------------------------------------------
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    if (!response.ok) throw new Error("Gagal mengambil data kategori.");
    const raw = await response.json();
    const categories = Array.isArray(raw) ? raw : (raw.data || raw.categories || []);
    if (!categories.length) {
      throw new Error("Daftar kategori kosong dari server.");
    }
    selectKategori.innerHTML = '<option value="">Pilih kategori</option>';
    categories.forEach((kat) => {
      const option = document.createElement("option");
      option.value = kat.key;
      option.textContent = kat.name;
      selectKategori.appendChild(option);
    });
  } catch (error) {
    console.error("Gagal memuat kategori:", error);
    showToast("Gagal memuat daftar kategori dari database.", "error");
  }

  // ---------------------------------------------------------
  // 1b. Kalau mode edit, muat data artikel yang sudah ada
  // ---------------------------------------------------------
  if (editSlug) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/articles/${editSlug}`);
      if (!res.ok) throw new Error("Artikel tidak ditemukan.");
      const { data } = await res.json();
      originalArticle = data;

      titleInput.value = data.title;
      titleCount.textContent = data.title.length;
      slugInput.value = data.slug;
      authorInput.value = data.author || "";
      leadInput.value = data.lead || "";
      leadCount.textContent = (data.lead || "").length;

      (data.content || []).forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        contentEl.appendChild(p);
      });
      updateWordCount();

      captionInput.value = data.caption || "";
      featuredCheck.checked = !!data.is_popular;
      if (data.category?.key) selectKategori.value = data.category.key;

      if (data.image_url) {
        uploadedImageUrl = data.image_url;
        imageUrlInput.value = data.image_url;
        uploadPreviewImg.src = data.image_url;
        uploadPlaceholder.hidden = true;
        uploadPreview.hidden = false;
      }

      btnPublish.textContent = "💾 Simpan Perubahan";
      const heading = document.querySelector(".heading h1");
      if (heading) heading.textContent = "Edit Artikel";
      const subHeading = document.querySelector(".heading p");
      if (subHeading) subHeading.textContent = "Perbarui artikel yang sudah dipublikasikan.";
    } catch (error) {
      console.error("Gagal memuat artikel untuk diedit:", error);
      showToast(`Gagal memuat artikel untuk diedit: ${error.message}`, "error");
    }
  }

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

  leadInput.addEventListener("input", () => {
    leadCount.textContent = leadInput.value.length;
  });

  metaInput.addEventListener("input", () => {
    metaCount.textContent = metaInput.value.length;
  });

  // ---------------------------------------------------------
  // 3. Toolbar editor konten
  // ---------------------------------------------------------
  function updateWordCount() {
    const text = contentEl.textContent.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    wordCountEl.textContent = `${words} kata`;
  }

  document.querySelectorAll(".toolbar [data-cmd]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cmd = btn.dataset.cmd;
      const value = btn.dataset.value || null;
      if (cmd === "insertTable") {
        showToast("Penyisipan tabel belum didukung di editor ini.", "error");
        return;
      }
      contentEl.focus();
      try {
        document.execCommand(cmd, false, value);
      } catch (e) {
        console.warn("Perintah editor gagal:", cmd, e);
      }
      updateWordCount();
    });
  });

  formatSelect.addEventListener("change", () => {
    contentEl.focus();
    const map = { p: "p", h2: "h2", h3: "h3" };
    document.execCommand("formatBlock", false, map[formatSelect.value] || "p");
  });

  document.getElementById("linkBtn").addEventListener("click", () => {
    const url = prompt("Masukkan URL tautan:");
    if (url) {
      contentEl.focus();
      document.execCommand("createLink", false, url);
    }
  });

  document.getElementById("imageBtn").addEventListener("click", () => {
    const url = prompt("Masukkan URL gambar untuk disisipkan ke dalam konten:");
    if (url) {
      contentEl.focus();
      document.execCommand("insertImage", false, url);
      updateWordCount();
    }
  });

  document.getElementById("videoBtn").addEventListener("click", () => {
    const url = prompt("Masukkan URL video (mis. link embed YouTube):");
    if (url) {
      contentEl.focus();
      document.execCommand(
        "insertHTML",
        false,
        `<p><iframe src="${url}" width="100%" height="315" frameborder="0" allowfullscreen></iframe></p>`
      );
    }
  });

  document.getElementById("fullscreenBtn").addEventListener("click", () => {
    contentEl.closest(".editor").classList.toggle("fullscreen");
  });

  contentEl.addEventListener("input", updateWordCount);
  updateWordCount();

  // ---------------------------------------------------------
  // 4. Tags
  // ---------------------------------------------------------
  function renderTags() {
    tagsWrap.innerHTML = "";
    tags.forEach((t, i) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.innerHTML = `${escapeHtml(t)} <button type="button" data-i="${i}" title="Hapus tag">✕</button>`;
      tagsWrap.appendChild(span);
    });
    tagsWrap.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        tags.splice(parseInt(b.dataset.i, 10), 1);
        renderTags();
      });
    });
  }

  function addTag(raw) {
    const val = raw.trim();
    if (!val || tags.includes(val)) return;
    tags.push(val);
    renderTags();
  }

  tagInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput.value);
      tagInput.value = "";
    } else if (e.key === "Backspace" && !tagInput.value && tags.length) {
      tags.pop();
      renderTags();
    }
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

  let imagekitInstance = null;
  if (typeof ImageKit !== "undefined") {
    imagekitInstance = new ImageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    });
  }

  function imagekitUpload(params) {
    return new Promise((resolve, reject) => {
      imagekitInstance.upload(params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async function uploadImageNow(file) {
    isUploadingImage = true;
    uploadStatus.textContent = "Mengunggah gambar...";
    imageUrlInput.value = "";
    uploadedImageUrl = "";

    if (!imagekitInstance) {
      uploadStatus.textContent = "Gagal: SDK ImageKit belum termuat.";
      showToast("SDK ImageKit gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.", "error");
      isUploadingImage = false;
      return;
    }

    if (IMAGEKIT_PUBLIC_KEY.startsWith("GANTI_DENGAN")) {
      uploadStatus.textContent = "Gagal: Public Key ImageKit belum diisi.";
      showToast("Isi dulu IMAGEKIT_PUBLIC_KEY & IMAGEKIT_URL_ENDPOINT di js/api.js.", "error");
      isUploadingImage = false;
      return;
    }

    try {
      const authRes = await fetch(`${API_BASE_URL}/api/upload/auth`);
      if (!authRes.ok) throw new Error("Gagal mengambil signature upload dari server.");
      const auth = await authRes.json();

      const result = await imagekitUpload({
        file,
        fileName: file.name,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
      });

      uploadedImageUrl = result.url || "";
      if (!uploadedImageUrl) throw new Error("ImageKit tidak mengembalikan URL gambar.");
      imageUrlInput.value = uploadedImageUrl;
      uploadStatus.textContent = "";
      showToast("Gambar berhasil diunggah.", "success");
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
    if (!allowed.includes(file.type)) {
      showToast("Format gambar harus JPG, PNG, atau WebP.", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran gambar maksimal 5 MB.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadPreviewImg.src = e.target.result;
      uploadPlaceholder.hidden = true;
      uploadPreview.hidden = false;
    };
    reader.readAsDataURL(file);
    uploadImageNow(file);
  }

  imageInput.addEventListener("change", () => {
    const file = imageInput.files && imageInput.files[0];
    if (file) setImageFile(file);
  });

  ["dragover", "dragenter"].forEach((evt) => {
    uploadBox.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadBox.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    uploadBox.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadBox.classList.remove("drag-over");
    });
  });

  uploadBox.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) setImageFile(file);
  });

  removeImageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetImage();
  });

  // ---------------------------------------------------------
  // 7. Kumpulkan & validasi data form
  // ---------------------------------------------------------
  function buildContentArray() {
    const blocks = [];
    const pushText = (raw) => {
      const text = raw.replace(/\s+/g, " ").trim();
      if (text) blocks.push(text);
    };
    Array.from(contentEl.childNodes).forEach((node) => {
      if (node.nodeType === 3) {
        pushText(node.textContent);
        return;
      }
      if (node.nodeType !== 1) return;
      const tag = node.tagName;
      if (tag === "UL" || tag === "OL") {
        Array.from(node.querySelectorAll("li")).forEach((li) => pushText(li.textContent));
      } else {
        pushText(node.textContent);
      }
    });
    return blocks;
  }

  function gatherFormData() {
    const categoryOption = selectKategori.options[selectKategori.selectedIndex];
    return {
      title: titleInput.value.trim(),
      lead: leadInput.value.trim(),
      content: buildContentArray(),
      image_url: uploadedImageUrl,
      caption: captionInput.value.trim(),
      author: authorInput.value.trim() || "MAB-News",
      category_key: selectKategori.value || null,
      is_popular: featuredCheck.checked,
      slugPreview: slugInput.value.trim() || slugify(titleInput.value),
      categoryName: categoryOption && selectKategori.value ? categoryOption.textContent : "",
      tags: tags.slice(),
    };
  }

  function validate(data, requireFull) {
    const errors = [];
    if (!data.title) errors.push("Judul Artikel");
    if (requireFull) {
      if (!data.author) errors.push("Penulis");
      if (!data.category_key) errors.push("Kategori");
      if (!data.lead) errors.push("Ringkasan (Lead)");
      if (!data.content.length) errors.push("Konten Artikel");
      if (!data.image_url) errors.push("Gambar Utama");
    }
    return errors;
  }

  function resetForm() {
    titleInput.value = "";
    titleCount.textContent = "0";
    slugInput.value = "";
    authorInput.value = "";
    selectKategori.value = "";
    leadInput.value = "";
    leadCount.textContent = "0";
    contentEl.innerHTML = "";
    updateWordCount();
    resetImage();
    captionInput.value = "";
    tags = [];
    renderTags();
    metaInput.value = "";
    metaCount.textContent = "0";
    keywordsInput.value = "";
    publishDateInput.value = "";
    publishDateInput.disabled = true;
    featuredCheck.checked = false;
    document.querySelector('input[name="status"][value="publish"]').checked = true;
  }

  async function submitArticle(data, button, successMessage, idleLabel) {
    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = "Memproses...";
    try {
      const serverPayload = {
        title: data.title,
        lead: data.lead,
        content: data.content,
        image_url: data.image_url,
        caption: data.caption,
        author: data.author,
        category_key: data.category_key,
        is_popular: data.is_popular,
      };

      const res = await fetch(
        editSlug ? `${API_BASE_URL}/api/articles/${editSlug}` : `${API_BASE_URL}/api/articles`,
        {
          method: editSlug ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serverPayload),
        }
      );

      if (!res.ok) {
        let detail = "";
        try { detail = (await res.json()).error || ""; } catch (_) { /* ignore */ }
        throw new Error(detail || `Gagal menyimpan artikel (status ${res.status}).`);
      }

      showToast(successMessage, "success");
      clearLocalDraft();

      if (editSlug) {
        setTimeout(() => { window.location.href = "artikel.html"; }, 800);
      } else {
        if (data.slugPreview) {
          publishedLinkAnchor.href = `${PUBLIC_ARTICLE_URL_BASE}${data.slugPreview}`;
          publishedLink.hidden = false;
        }
        resetForm();
      }
    } catch (error) {
      console.error("Proses gagal:", error);
      showToast(`Terjadi kesalahan: ${error.message}`, "error");
    } finally {
      button.disabled = false;
      button.textContent = idleLabel || originalLabel;
    }
  }

  // ---------------------------------------------------------
  // 8. Tombol Publikasikan / Simpan Perubahan
  // ---------------------------------------------------------
  btnPublish.addEventListener("click", async () => {
    if (isUploadingImage) {
      showToast("Tunggu proses unggah gambar selesai terlebih dahulu.", "error");
      return;
    }
    const data = gatherFormData();
    const errors = validate(data, true);
    if (errors.length) {
      showToast(`Harap lengkapi: ${errors.join(", ")}.`, "error");
      return;
    }
    const idleLabel = editSlug ? "💾 Simpan Perubahan" : "➤ Publikasikan Artikel";
    const successMessage = editSlug ? "Perubahan berhasil disimpan!" : "Artikel berhasil dipublikasikan!";
    await submitArticle(data, btnPublish, successMessage, idleLabel);
  });

  // ---------------------------------------------------------
  // 9. Tombol Simpan Draft (lokal saja, backend belum dukung draft)
  // ---------------------------------------------------------
  function clearLocalDraft() {
    try { localStorage.removeItem(DRAFT_STORAGE_KEY); } catch (_) { /* ignore */ }
  }

  btnDraft.addEventListener("click", () => {
    const data = gatherFormData();
    if (!data.title) {
      showToast("Isi judul artikel dulu untuk menyimpan draft.", "error");
      return;
    }
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ ...data, savedAt: Date.now() }));
      showToast("Draft disimpan di perangkat ini (backend belum mendukung draft di server).", "success");
    } catch (error) {
      console.error("Gagal menyimpan draft lokal:", error);
      showToast(`Gagal menyimpan draft: ${error.message}`, "error");
    }
  });

  function restoreLocalDraftIfAny() {
    let saved;
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!raw) return;
      saved = JSON.parse(raw);
    } catch (_) {
      return;
    }
    if (!saved || !saved.title) return;
    const savedDate = saved.savedAt ? new Date(saved.savedAt).toLocaleString("id-ID") : "";
    const wantsRestore = confirm(
      `Ditemukan draft tersimpan di perangkat ini: "${saved.title}"${savedDate ? ` (disimpan ${savedDate})` : ""}.\n\nMuat draft ini?`
    );
    if (!wantsRestore) return;

    titleInput.value = saved.title || "";
    titleCount.textContent = titleInput.value.length;
    slugInput.value = saved.slugPreview || slugify(titleInput.value);
    authorInput.value = saved.author || "";
    leadInput.value = saved.lead || "";
    leadCount.textContent = leadInput.value.length;
    contentEl.innerHTML = "";
    (saved.content || []).forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      contentEl.appendChild(p);
    });
    updateWordCount();
    captionInput.value = saved.caption || "";
    featuredCheck.checked = !!saved.is_popular;
    tags = Array.isArray(saved.tags) ? saved.tags.slice() : [];
    renderTags();
    if (saved.image_url) {
      uploadedImageUrl = saved.image_url;
      imageUrlInput.value = saved.image_url;
      uploadPreviewImg.src = saved.image_url;
      uploadPlaceholder.hidden = true;
      uploadPreview.hidden = false;
    }
    if (saved.category_key) {
      selectKategori.value = saved.category_key;
    }
    showToast("Draft berhasil dipulihkan.", "success");
  }

  // ---------------------------------------------------------
  // 10. Tombol Preview
  // ---------------------------------------------------------
  function renderPreview(data) {
    const imageHtml = data.image_url
      ? `<img class="pv-image" src="${data.image_url}" alt="">`
      : "";
    const categoryHtml = data.categoryName
      ? `<span class="pv-category">${escapeHtml(data.categoryName)}</span>`
      : "";
    const titleHtml = data.title
      ? escapeHtml(data.title)
      : '<span class="pv-empty">(Judul belum diisi)</span>';
    const dateStr = new Date().toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
    const leadHtml = data.lead ? `<p class="pv-lead">${escapeHtml(data.lead)}</p>` : "";
    const contentHtml = data.content.length
      ? data.content.map((p) => `<p>${escapeHtml(p)}</p>`).join("")
      : '<p class="pv-empty">(Konten belum diisi)</p>';
    const tagsHtml = data.tags.length
      ? `<div class="pv-tags">${data.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>`
      : "";
    const realUrl = data.slugPreview ? `${PUBLIC_ARTICLE_URL_BASE}${data.slugPreview}` : "";

    previewBody.innerHTML = `
      ${imageHtml}
      ${categoryHtml}
      <h1 class="pv-title">${titleHtml}</h1>
      <p class="pv-meta">Oleh ${escapeHtml(data.author || "-")} · ${dateStr}</p>
      ${realUrl ? `<p class="pv-meta pv-url">${escapeHtml(realUrl)}</p>` : ""}
      ${leadHtml}
      <div class="pv-content">${contentHtml}</div>
      ${tagsHtml}
    `;
  }

  btnPreview.addEventListener("click", () => {
    const data = gatherFormData();
    if (!data.title && !data.content.length) {
      showToast("Isi judul atau konten dulu sebelum melihat pratinjau.", "error");
      return;
    }
    renderPreview(data);
    previewModal.hidden = false;
  });

  closePreviewBtn.addEventListener("click", () => { previewModal.hidden = true; });
  previewModal.addEventListener("click", (e) => {
    if (e.target === previewModal) previewModal.hidden = true;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !previewModal.hidden) previewModal.hidden = true;
  });

  // ---------------------------------------------------------
  // Inisialisasi awal
  // ---------------------------------------------------------
  renderTags();
  publishDateInput.disabled = true;
  if (!editSlug) restoreLocalDraftIfAny();
});