document.addEventListener("DOMContentLoaded", () => {
  const quickNav = document.getElementById("quickNav");
  const fokusSection = document.getElementById("sectionFokus");
  const toggleBtn = document.getElementById("quickNavToggle");
  const footer = document.querySelector(".site-footer");
  if (!quickNav || !fokusSection) return;

  // ---------------------------------------------------------
  // Muncul begitu bagian Fokus sudah tergulung ke atas (tenggelam)
  // saat pengguna scroll ke bawah, hilang lagi kalau di-scroll balik
  // ke atas sebelum mencapai Fokus.
  // ---------------------------------------------------------
  const fokusObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sudahLewat = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        quickNav.classList.toggle("show", sudahLewat);
      });
    },
    { threshold: 0 }
  );
  fokusObserver.observe(fokusSection);

  // Scroll ke JUDUL kolomnya (bukan cuma ke bagian atas section),
  // dengan jarak ekstra supaya tidak ketutupan header yang sticky.
  function scrollToSectionTitle(sectionEl) {
    const heading = sectionEl.querySelector(".section-heading") || sectionEl;
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const extraGap = 16;

    const targetTop = heading.getBoundingClientRect().top + window.scrollY - headerHeight - extraGap;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }

  quickNav.querySelectorAll("button[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) scrollToSectionTitle(target);
    });
  });

  // ---------------------------------------------------------
  // Ciutkan/perbesar manual (tombol logo). Status disimpan di
  // localStorage supaya tetap ingat pilihan pengguna.
  // ---------------------------------------------------------
  function applyCollapsedState(collapsed) {
    quickNav.classList.toggle("collapsed", collapsed);
    toggleBtn.textContent = collapsed ? "M" : "−";
    toggleBtn.setAttribute("aria-label", collapsed ? "Buka navigasi cepat" : "Ciutkan navigasi cepat");
  }

  if (toggleBtn) {
    const savedCollapsed = localStorage.getItem("mabnewsQuickNavCollapsed") === "true";
    applyCollapsedState(savedCollapsed);

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const nowCollapsed = !quickNav.classList.contains("collapsed");
      applyCollapsedState(nowCollapsed);
      localStorage.setItem("mabnewsQuickNavCollapsed", String(nowCollapsed));
      // Kalau pengguna membuka manual saat masih di area footer,
      // itu keputusan sadar dia -> jangan langsung diciutkan lagi
      // otomatis selama masih di footer yang sama.
      autoCollapsedByFooter = false;
    });
  }

  // ---------------------------------------------------------
  // Auto-ciutkan begitu area footer mulai kelihatan (supaya
  // tidak menutupi footer), lalu kembali ke keadaan semula
  // begitu footer keluar dari layar lagi. Kalau pengguna sempat
  // membuka manual selagi masih di footer, pilihan itu dihormati
  // (tidak langsung diciutkan paksa lagi).
  // ---------------------------------------------------------
  let autoCollapsedByFooter = false;

  if (footer) {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Footer mulai kelihatan -> ciutkan otomatis (kecuali
            // sedang tersembunyi karena belum sampai Fokus)
            if (!quickNav.classList.contains("collapsed")) {
              applyCollapsedState(true);
              autoCollapsedByFooter = true;
            }
          } else {
            // Sudah keluar dari area footer -> kembalikan ke
            // keadaan sebelum diciutkan otomatis
            if (autoCollapsedByFooter) {
              applyCollapsedState(false);
              autoCollapsedByFooter = false;
            }
          }
        });
      },
      { threshold: 0 }
    );
    footerObserver.observe(footer);
  }

  // ---------------------------------------------------------
  // Resize manual lewat 4 penanda sudut (bukan cuma satu sudut
  // bawaan browser). Bekerja dengan mouse maupun sentuhan jari
  // (lewat Pointer Events).
  // ---------------------------------------------------------
  const MIN_WIDTH = 140, MAX_WIDTH = 340;
  const MIN_HEIGHT = 150;

  quickNav.querySelectorAll(".quick-nav-handle").forEach((handle) => {
    handle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (quickNav.classList.contains("collapsed")) return;

      const corner = handle.dataset.corner;
      const rect = quickNav.getBoundingClientRect();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = rect.width;
      const startHeight = rect.height;
      const startTop = rect.top;
      const startLeft = rect.left;
      const maxHeight = window.innerHeight * 0.7;

      // Begitu mulai di-resize, kunci posisinya jadi absolut
      // (px pasti) supaya perhitungan sudut konsisten, lepas
      // dari transform "translateY(-50%)" bawaan.
      quickNav.classList.add("resizing", "custom-position");
      quickNav.style.transform = "none";
      quickNav.style.right = "auto";
      quickNav.style.top = startTop + "px";
      quickNav.style.left = startLeft + "px";

      function onMove(ev) {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newTop = startTop;
        let newLeft = startLeft;

        if (corner.includes("r")) {
          newWidth = Math.min(Math.max(startWidth + dx, MIN_WIDTH), MAX_WIDTH);
        }
        if (corner.includes("l")) {
          newWidth = Math.min(Math.max(startWidth - dx, MIN_WIDTH), MAX_WIDTH);
          newLeft = startLeft + (startWidth - newWidth);
        }
        if (corner.includes("b")) {
          newHeight = Math.min(Math.max(startHeight + dy, MIN_HEIGHT), maxHeight);
        }
        if (corner.includes("t")) {
          newHeight = Math.min(Math.max(startHeight - dy, MIN_HEIGHT), maxHeight);
          newTop = startTop + (startHeight - newHeight);
        }

        quickNav.style.width = newWidth + "px";
        quickNav.style.height = newHeight + "px";
        quickNav.style.top = newTop + "px";
        quickNav.style.left = newLeft + "px";
      }

      function onUp() {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        quickNav.classList.remove("resizing");
      }

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    });
  });
});
