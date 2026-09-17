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
  const previewModal = document.getElementById("previewModal");
  const previewBody = document.getElementById("previewBody");
  const closePreviewBtn = document.getElementById("closePreview");

  let tags = [];
  let slugManuallyEdited = false;
  let uploadedImageUrl = "";
  let isUploadingImage = false;

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
    const categories = await response.json();

    selectKategori.innerHTML = '<option value="">Pilih kategori</option>';
    categories.forEach((kat) => {
      const option = document.createElement("option");
      option.value = kat.id;
      option.textContent = kat.name;
      selectKategori.appendChild(option);
    });
  } catch (error) {
    console.error("Gagal memuat kategori:", error);
    showToast("Gagal memuat daftar kategori dari database.", "error");
  }

  // ---------------------------------------------------------
  // 2. Hitung karakter + slug otomatis dari judul
  // ---------------------------------------------------------
  titleInput.addEventListener("input", () => {
    titleCount.textContent = titleInput.value.length;
    if (!slugManuallyEdited) {
      slugInput.value = slugify(titleInput.value);
    }
  });

  slugInput.addEventListener("input", () => {
    slugManuallyEdited = slugInput.value.trim() !== "";
  });

  regenSlugBtn.addEventListener("click", () => {
    slugInput.value = slugify(titleInput.value);
    slugManuallyEdited = false;
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

  async function uploadImageNow(file) {
    isUploadingImage = true;
    uploadStatus.textContent = "Mengunggah gambar...";
    imageUrlInput.value = "";
    uploadedImageUrl = "";
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API_BASE_URL}/api/upload`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Server menolak unggahan gambar.");
      const result = await res.json();
      uploadedImageUrl = result.url || result.imageUrl || "";
      if (!uploadedImageUrl) throw new Error("Server tidak mengembalikan URL gambar.");
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
  function gatherFormData() {
    const status = document.querySelector('input[name="status"]:checked').value;
    const categoryOption = selectKategori.options[selectKategori.selectedIndex];
    return {
      title: titleInput.value.trim(),
      slug: (slugInput.value.trim() || slugify(titleInput.value)),
      author: authorInput.value.trim(),
      categoryId: selectKategori.value ? parseInt(selectKategori.value, 10) : null,
      categoryName: categoryOption && selectKategori.value ? categoryOption.textContent : "",
      excerpt: leadInput.value.trim(),
      content: contentEl.innerHTML.trim(),
      imageUrl: uploadedImageUrl,
      tags: tags.slice(),
      status,
      publishDate: publishDateInput.value || null,
      showOnHomepage: homepageToggle.checked,
      allowComments: allowCommentsCheck.checked,
      featured: featuredCheck.checked,
      metaDescription: metaInput.value.trim(),
      metaKeywords: keywordsInput.value.trim(),
    };
  }

  function validate(data, requireFull) {
    const errors = [];
    if (!data.title) errors.push("Judul Artikel");
    if (!data.slug) errors.push("Slug URL");
    if (requireFull) {
      if (!data.author) errors.push("Penulis");
      if (!data.categoryId) errors.push("Kategori");
      if (!data.excerpt) errors.push("Ringkasan (Lead)");
      if (!data.content) errors.push("Konten Artikel");
      if (!data.imageUrl) errors.push("Gambar Utama");
    }
    return errors;
  }

  function resetForm() {
    titleInput.value = "";
    titleCount.textContent = "0";
    slugInput.value = "";
    slugManuallyEdited = false;
    authorInput.value = "";
    selectKategori.value = "";
    leadInput.value = "";
    leadCount.textContent = "0";
    contentEl.innerHTML = "";
    updateWordCount();
    resetImage();
    tags = [];
    renderTags();
    metaInput.value = "";
    metaCount.textContent = "0";
    keywordsInput.value = "";
    publishDateInput.value = "";
    publishDateInput.disabled = true;
    document.querySelector('input[name="status"][value="publish"]').checked = true;
  }

  async function submitArticle(data, button, successMessage, idleLabel) {
    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = "Memproses...";
    try {
      const res = await fetch(`${API_BASE_URL}/api/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Gagal menyimpan artikel (status ${res.status}).`);
      showToast(successMessage, "success");
      resetForm();
    } catch (error) {
      console.error("Proses gagal:", error);
      showToast(`Terjadi kesalahan: ${error.message}`, "error");
    } finally {
      button.disabled = false;
      button.textContent = idleLabel || originalLabel;
    }
  }

  // ---------------------------------------------------------
  // 8. Tombol Publikasikan
  // ---------------------------------------------------------
  btnPublish.addEventListener("click", async () => {
    if (isUploadingImage) {
      showToast("Tunggu proses unggah gambar selesai terlebih dahulu.", "error");
      return;
    }
    const data = gatherFormData();
    data.status = "publish";
    const errors = validate(data, true);
    if (errors.length) {
      showToast(`Harap lengkapi: ${errors.join(", ")}.`, "error");
      return;
    }
    await submitArticle(data, btnPublish, "Artikel berhasil dipublikasikan!", "➤　Publikasikan Artikel");
  });

  // ---------------------------------------------------------
  // 9. Tombol Simpan Draft
  // ---------------------------------------------------------
  btnDraft.addEventListener("click", async () => {
    if (isUploadingImage) {
      showToast("Tunggu proses unggah gambar selesai terlebih dahulu.", "error");
      return;
    }
    const data = gatherFormData();
    data.status = "draft";
    const errors = validate(data, false);
    if (errors.length) {
      showToast(`Harap lengkapi: ${errors.join(", ")}.`, "error");
      return;
    }
    await submitArticle(data, btnDraft, "Draft berhasil disimpan.", "▣　Simpan Draft");
  });

  // ---------------------------------------------------------
  // 10. Tombol Preview
  // ---------------------------------------------------------
  function renderPreview(data) {
    const imageHtml = data.imageUrl
      ? `<img class="pv-image" src="${data.imageUrl}" alt="">`
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
    const leadHtml = data.excerpt ? `<p class="pv-lead">${escapeHtml(data.excerpt)}</p>` : "";
    const contentHtml = data.content || '<p class="pv-empty">(Konten belum diisi)</p>';
    const tagsHtml = data.tags.length
      ? `<div class="pv-tags">${data.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>`
      : "";

    previewBody.innerHTML = `
      ${imageHtml}
      ${categoryHtml}
      <h1 class="pv-title">${titleHtml}</h1>
      <p class="pv-meta">Oleh ${escapeHtml(data.author || "-")} · ${dateStr} · /artikel/${escapeHtml(data.slug || "-")}</p>
      ${leadHtml}
      <div class="pv-content">${contentHtml}</div>
      ${tagsHtml}
    `;
  }

  btnPreview.addEventListener("click", () => {
    const data = gatherFormData();
    if (!data.title && !data.content) {
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
});
