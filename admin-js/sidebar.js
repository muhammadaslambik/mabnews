/* =========================================================
   MAB-News CMS — sidebar.js
   Interaksi header + sidebar BERSAMA untuk semua halaman admin,
   diambil dari logika yang sama dengan admin-js/export-import.js
   supaya perilakunya identik di seluruh CMS.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const themeToggle = document.getElementById("themeToggle");

  // ---------------------------------------------------------
  // Buka/tutup sidebar (mobile)
  // ---------------------------------------------------------
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      body.classList.toggle("sidebar-open");
    });
  }

  // Tutup sidebar mobile kalau klik salah satu link navigasi
  if (sidebar) {
    sidebar.querySelectorAll(".nav-item[href], .nav-submenu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 980) {
          body.classList.remove("sidebar-open");
        }
      });
    });
  }

  // ---------------------------------------------------------
  // Dropdown submenu (Artikel, Pengaturan, Lainnya, dst)
  // ---------------------------------------------------------
  const dropdownButtons = document.querySelectorAll(".nav-dropdown-toggle");
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".nav-group");
      if (!group) return;

      group.classList.toggle("open");

      const arrow = button.querySelector(".nav-arrow");
      if (arrow) {
        arrow.classList.toggle("fa-chevron-right");
        arrow.classList.toggle("fa-chevron-up");
      }
    });
  });

  // ---------------------------------------------------------
  // Dark mode
  // ---------------------------------------------------------
  const savedTheme = localStorage.getItem("mabnews_cms_theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    updateThemeIcon();
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("mabnews_cms_theme", isDark ? "dark" : "light");
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (!icon) return;
    const isDark = body.classList.contains("dark-mode");
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);
  }
});
