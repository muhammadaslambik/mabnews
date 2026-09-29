document.addEventListener("DOMContentLoaded", () => {
  const quickNav = document.getElementById("quickNav");
  const fokusSection = document.getElementById("sectionFokus");
  const toggleBtn = document.getElementById("quickNavToggle");
  if (!quickNav || !fokusSection) return;

  // Muncul begitu bagian Fokus sudah tergulung ke atas (tenggelam)
  // saat pengguna scroll ke bawah, hilang lagi kalau di-scroll balik
  // ke atas sebelum mencapai Fokus.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sudahLewat = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        quickNav.classList.toggle("show", sudahLewat);
      });
    },
    { threshold: 0 }
  );
  observer.observe(fokusSection);

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
  // Tombol ciutkan/perbesar: kalau diciutkan, widget cuma
  // tampil sebagai bulatan logo "M" — klik lagi untuk memunculkan
  // navigasinya kembali. Status disimpan di localStorage supaya
  // tetap ingat pilihan pengguna walau halaman dibuka ulang.
  // ---------------------------------------------------------
  if (toggleBtn) {
    function applyCollapsedState(collapsed) {
      quickNav.classList.toggle("collapsed", collapsed);
      toggleBtn.textContent = collapsed ? "M" : "−";
      toggleBtn.setAttribute("aria-label", collapsed ? "Buka navigasi cepat" : "Ciutkan navigasi cepat");
      // Kembalikan ke ukuran normal (hasil resize manual sebelumnya
      // ikut disimpan lewat CSS resize, jadi tidak perlu diatur lagi)
    }

    const savedCollapsed = localStorage.getItem("mabnewsQuickNavCollapsed") === "true";
    applyCollapsedState(savedCollapsed);

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const nowCollapsed = !quickNav.classList.contains("collapsed");
      applyCollapsedState(nowCollapsed);
      localStorage.setItem("mabnewsQuickNavCollapsed", String(nowCollapsed));
    });
  }
});
