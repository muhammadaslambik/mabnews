document.addEventListener("DOMContentLoaded", () => {
  const quickNav = document.getElementById("quickNav");
  const fokusSection = document.getElementById("sectionFokus");
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

  quickNav.querySelectorAll("button[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
