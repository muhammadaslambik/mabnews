(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("mobileOverlay");
  const accountButton = document.getElementById("accountButton");

  const savedTheme = localStorage.getItem("mabnews-cms-theme");
  if (savedTheme === "dark") root.classList.add("dark");

  themeToggle?.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem(
      "mabnews-cms-theme",
      root.classList.contains("dark") ? "dark" : "light"
    );
  });

  const closeMobileMenu = () => {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("show");
  };

  mobileMenu?.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
    overlay?.classList.toggle("show");
  });

  overlay?.addEventListener("click", closeMobileMenu);

  sidebar?.querySelectorAll(".nav-parent").forEach((parent) => {
    const submenuId = parent.dataset.submenu;
    const submenu = document.getElementById(submenuId);
    if (!submenu) return;

    parent.setAttribute("aria-expanded", submenu.classList.contains("open") ? "true" : "false");

    parent.addEventListener("click", (event) => {
      event.preventDefault();
      const willOpen = !submenu.classList.contains("open");

      // Hanya satu kelompok sidebar yang terbuka pada satu waktu.
      sidebar.querySelectorAll(".nav-submenu.open").forEach((other) => {
        if (other !== submenu) other.classList.remove("open");
      });
      sidebar.querySelectorAll(".nav-parent").forEach((other) => {
        if (other !== parent) other.setAttribute("aria-expanded", "false");
      });

      submenu.classList.toggle("open", willOpen);
      parent.setAttribute("aria-expanded", String(willOpen));
    });
  });

  sidebar?.querySelectorAll(".nav-submenu a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.querySelectorAll(".nav-submenu a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      if (window.innerWidth <= 760) closeMobileMenu();
    });
  });

  sidebar?.querySelectorAll(".sidebar-nav > .nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      sidebar.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
      if (window.innerWidth <= 760) closeMobileMenu();
    });
  });

  accountButton?.addEventListener("click", () => {
    const expanded = accountButton.getAttribute("aria-expanded") === "true";
    accountButton.setAttribute("aria-expanded", String(!expanded));
  });

  document.querySelectorAll(".row-actions button, .panel-link, .panel-footer-link, .date-filter, .small-filter").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (button.tagName === "A" && button.getAttribute("href") !== "#") return;
      event.preventDefault();
      button.animate(
        [{ transform: "scale(1)" }, { transform: "scale(.97)" }, { transform: "scale(1)" }],
        { duration: 150 }
      );
    });
  });
})();
