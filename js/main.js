document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MODE GELAP / TERANG
     ===================================================== */

  const theme = document.querySelector("#themeToggle");

  // SVG matahari
  const sunIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v2"></path>
      <path d="M12 19v2"></path>
      <path d="M4.22 4.22l1.42 1.42"></path>
      <path d="M18.36 18.36l1.42 1.42"></path>
      <path d="M3 12h2"></path>
      <path d="M19 12h2"></path>
      <path d="M4.22 19.78l1.42-1.42"></path>
      <path d="M18.36 5.64l1.42-1.42"></path>
      <circle cx="12" cy="12" r="4"></circle>
    </svg>
  `;

  // SVG bulan
  const moonIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3
      a6.7 6.7 0 0 0 9.8 9.8z"></path>
    </svg>
  `;


  function updateThemeIcon() {
    if (!theme) return;

    if (document.body.classList.contains("dark-preview")) {
      theme.innerHTML = moonIcon;
      theme.setAttribute("aria-label", "Aktifkan mode terang");
      theme.setAttribute("title", "Mode terang");
    } else {
      theme.innerHTML = sunIcon;
      theme.setAttribute("aria-label", "Aktifkan mode gelap");
      theme.setAttribute("title", "Mode gelap");
    }
  }


  // Ambil mode yang tersimpan
  const savedTheme = localStorage.getItem("mabnews-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-preview");
  } else {
    document.body.classList.remove("dark-preview");
  }

  updateThemeIcon();


  // Tombol mode
  theme?.addEventListener("click", () => {

    document.body.classList.toggle("dark-preview");

    const isDark =
      document.body.classList.contains("dark-preview");

    localStorage.setItem(
      "mabnews-theme",
      isDark ? "dark" : "light"
    );

    updateThemeIcon();
  });



  /* =====================================================
     TOMBOL AKUN
     ===================================================== */

  const accountButton =
    document.querySelector('[aria-label="Akun"]');

  if (accountButton) {

    // Bungkus tombol akun
    const wrapper = document.createElement("div");

    wrapper.className = "account-wrapper";

    accountButton.parentNode.insertBefore(
      wrapper,
      accountButton
    );

    wrapper.appendChild(accountButton);


    // Buat menu akun
    const accountMenu = document.createElement("div");

    accountMenu.className = "account-menu";

    accountMenu.innerHTML = `
      <div class="account-menu-header">
        <strong>Akun</strong>
        <span>Menu akun MAB-News</span>
      </div>

      <a href="javascript:void(0)" data-account-action="profile">
        Profil
      </a>

      <a href="javascript:void(0)" data-account-action="settings">
        Pengaturan
      </a>

      <a href="javascript:void(0)" data-account-action="login">
        Masuk
      </a>
    `;

    wrapper.appendChild(accountMenu);


    // Klik tombol akun
    accountButton.addEventListener("click", (event) => {

      event.stopPropagation();

      accountMenu.classList.toggle("open");

    });


    // Jangan tutup ketika klik di dalam menu
    accountMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });


    // Tutup ketika klik di luar
    document.addEventListener("click", () => {
      accountMenu.classList.remove("open");
    });


    // Tombol menu akun
    accountMenu
      .querySelectorAll("[data-account-action]")
      .forEach((item) => {

        item.addEventListener("click", () => {

          const action =
            item.getAttribute("data-account-action");

          if (action === "profile") {
            alert("Halaman Profil MAB-News belum tersedia.");
          }

          if (action === "settings") {
            alert("Halaman Pengaturan belum tersedia.");
          }

          if (action === "login") {
            alert("Fitur Masuk belum tersedia.");
          }

        });

      });

  }



  /* =====================================================
   MENU HAMBURGER
   ===================================================== */

const hamburger = document.querySelector("#hamburger");
const navLinks = document.querySelector("#navLinks");

if (hamburger && navLinks) {

  hamburger.addEventListener("click", (event) => {

    event.stopPropagation();

    const isOpen = navLinks.classList.toggle("open");

    hamburger.classList.toggle("active", isOpen);

    hamburger.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    hamburger.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );

  });


  // Tutup menu ketika link dipilih
  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");
      hamburger.classList.remove("active");

      hamburger.setAttribute(
        "aria-expanded",
        "false"
      );

      hamburger.setAttribute(
        "aria-label",
        "Buka menu"
      );

    });

  });


  // Tutup menu ketika klik di luar
  document.addEventListener("click", (event) => {

    if (
      !navLinks.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {

      navLinks.classList.remove("open");
      hamburger.classList.remove("active");

      hamburger.setAttribute(
        "aria-expanded",
        "false"
      );

      hamburger.setAttribute(
        "aria-label",
        "Buka menu"
      );

    }

  });

}


  /* =====================================================
     SEARCH
     ===================================================== */

  const search =
    document.querySelector("#headerSearch");

  search?.addEventListener("submit", (e) => {

    e.preventDefault();

    const input =
      search.querySelector("input");

    const q =
      new FormData(search).get("q") ||
      input?.value.trim();

    if (q) {

      window.location.href =
        `search.html?q=${encodeURIComponent(q)}`;

    }

  });

});
