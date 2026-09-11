document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MODE GELAP / TERANG
     ===================================================== */

  const theme =
    document.querySelector("#themeToggle");

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

  const moonIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3
      a6.7 6.7 0 0 0 9.8 9.8z"></path>
    </svg>
  `;


  function updateThemeIcon(){

    if(!theme) return;

    const isDark =
      document.body.classList.contains("dark-preview");

    theme.innerHTML =
      isDark ? moonIcon : sunIcon;

    theme.setAttribute(
      "aria-label",
      isDark
        ? "Aktifkan mode terang"
        : "Aktifkan mode gelap"
    );

    theme.setAttribute(
      "title",
      isDark
        ? "Mode terang"
        : "Mode gelap"
    );
  }


  const savedTheme =
    localStorage.getItem("mabnews-theme");

  if(savedTheme === "dark"){
    document.body.classList.add("dark-preview");
  }else{
    document.body.classList.remove("dark-preview");
  }

  updateThemeIcon();


  if(theme){

    theme.addEventListener("click", () => {

      document.body.classList.toggle(
        "dark-preview"
      );

      const isDark =
        document.body.classList.contains(
          "dark-preview"
        );

      localStorage.setItem(
        "mabnews-theme",
        isDark ? "dark" : "light"
      );

      updateThemeIcon();

    });

  }


  /* =====================================================
     TOMBOL AKUN
     ===================================================== */

  const accountButton =
    document.querySelector(
      '[aria-label="Akun"]'
    );

  if(accountButton){

    const wrapper =
      document.createElement("div");

    wrapper.className =
      "account-wrapper";

    accountButton.parentNode.insertBefore(
      wrapper,
      accountButton
    );

    wrapper.appendChild(accountButton);


    const accountMenu =
      document.createElement("div");

    accountMenu.className =
      "account-menu";

    accountMenu.innerHTML = `
      <div class="account-menu-header">
        <strong>Akun</strong>
        <span>Menu akun MAB-News</span>
      </div>

      <a href="#" data-account-action="profile">
        Profil
      </a>

      <a href="#" data-account-action="settings">
        Pengaturan
      </a>

      <a href="#" data-account-action="login">
        Masuk
      </a>
    `;

    wrapper.appendChild(accountMenu);


    accountButton.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        accountMenu.classList.toggle("open");

      }
    );


    accountMenu.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        const item =
          event.target.closest(
            "[data-account-action]"
          );

        if(!item) return;

        event.preventDefault();

        const action =
          item.getAttribute(
            "data-account-action"
          );

        if(action === "profile"){
          alert(
            "Halaman Profil MAB-News belum tersedia."
          );
        }

        if(action === "settings"){
          alert(
            "Halaman Pengaturan belum tersedia."
          );
        }

        if(action === "login"){
          alert(
            "Fitur Masuk belum tersedia."
          );
        }

      }
    );


    document.addEventListener(
      "click",
      () => {

        accountMenu.classList.remove("open");

      }
    );

  }


  /* =====================================================
     NAVIGASI
     ===================================================== */

  const navLinks =
    document.querySelector("#navLinks");

  const mobileHome =
    document.querySelector(".mobile-home");


  /*
     Beranda selalu aktif.
     Link kategori dapat aktif ketika diklik.
  */

  if(navLinks){

    const links =
      navLinks.querySelectorAll("a");


    links.forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          links.forEach((item) => {
            item.classList.remove("active");
          });

          link.classList.add("active");

        }
      );

    });

  }


  /*
     Beranda tetap tersorot.
     Klik Beranda tidak memengaruhi link kategori.
  */

  if(mobileHome){

    mobileHome.addEventListener(
      "click",
      () => {

        if(navLinks){

          navLinks
            .querySelectorAll("a")
            .forEach((link) => {
              link.classList.remove("active");
            });

        }

        mobileHome.classList.add("active");

      }
    );

  }


  /* =====================================================
     SEARCH
     ===================================================== */

  const search =
    document.querySelector("#headerSearch");

  if(search){

    search.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const input =
          search.querySelector("input");

        const formData =
          new FormData(search);

        const q =
          formData.get("q") ||
          input?.value.trim();


        if(q){

          window.location.href =
            `search.html?q=${encodeURIComponent(q)}`;

        }

      }
    );

  }

});
