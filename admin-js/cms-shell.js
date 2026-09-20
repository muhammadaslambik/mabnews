/* =========================================================
   MAB-NEWS CMS — SHELL (SIDEBAR + HEADER)
   Dipakai di semua halaman admin. Cukup include file ini
   sekali di setiap halaman, sebelum script khusus halaman.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const themeToggle = document.getElementById("themeToggle");

  /* =========================================================
     BUKA / TUTUP SIDEBAR (MOBILE)
  ========================================================= */
  function openSidebar() {
    body.classList.add("sidebar-open");
  }
  function closeSidebar() {
    body.classList.remove("sidebar-open");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      body.classList.contains("sidebar-open") ? closeSidebar() : openSidebar();
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  /* =========================================================
     SUBMENU DROPDOWN
  ========================================================= */
  document.querySelectorAll(".nav-dropdown-toggle").forEach((button) => {
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

  /* =========================================================
     TANDAI HALAMAN AKTIF SECARA OTOMATIS
     (tidak perlu edit manual per halaman)
  ========================================================= */
  const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (!href || href === "#") return;

    if (href === currentPage) {
      if (link.classList.contains("nav-item")) {
        link.classList.add("active");
      } else {
        link.classList.add("active-sub-item");
        const group = link.closest(".nav-group");
        if (group) {
          group.classList.add("open");
          const arrow = group.querySelector(".nav-arrow");
          if (arrow) {
            arrow.classList.remove("fa-chevron-right");
            arrow.classList.add("fa-chevron-up");
          }
        }
      }

      // Otomatis scroll sidebar supaya menu aktif langsung terlihat
      requestAnimationFrame(() => {
        link.scrollIntoView({ block: "center", behavior: "auto" });
      });
    }
  });

  /* =========================================================
     DARK MODE
  ========================================================= */
  function updateThemeIcon() {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (!icon) return;
    const isDark = body.classList.contains("dark-mode");
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);
  }

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

  /* =========================================================
     DROPDOWN HEADER (NOTIFIKASI & USER)
  ========================================================= */
  function setupDropdown(buttonId, panelId) {
    const button = document.getElementById(buttonId);
    const panel = document.getElementById(panelId);
    if (!button || !panel) return;

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = panel.classList.contains("show");
      document.querySelectorAll(".dropdown-panel.show").forEach((p) => p.classList.remove("show"));
      document.querySelectorAll(".header-icon-btn[aria-expanded], .header-user[aria-expanded]").forEach((b) => b.setAttribute("aria-expanded", "false"));
      if (!isOpen) {
        panel.classList.add("show");
        button.setAttribute("aria-expanded", "true");
      }
    });
  }

  setupDropdown("notificationBtn", "notificationPanel");
  setupDropdown("headerUser", "userPanel");

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-dropdown-wrap")) {
      document.querySelectorAll(".dropdown-panel.show").forEach((p) => p.classList.remove("show"));
      document.querySelectorAll(".header-icon-btn[aria-expanded], .header-user[aria-expanded]").forEach((b) => b.setAttribute("aria-expanded", "false"));
    }
  });

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      if (confirm("Keluar dari CMS?")) {
        window.location.href = "login.html";
      }
    });
  }
});