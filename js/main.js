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
     SEARCH DESKTOP
     ===================================================== */

  const search =
    document.querySelector("#headerSearch");

  function submitSearch(form){

    if(!form) return;

    const input =
      form.querySelector('input[name="q"]');

    const q =
      input?.value.trim();

    if(q){

      window.location.href =
        `search.html?q=${encodeURIComponent(q)}`;

    }

  }


  if(search){

    search.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        submitSearch(search);

      }
    );

  }


  /* =====================================================
     MOBILE SEARCH
     ===================================================== */

  const mobileSearchToggle =
    document.querySelector(
      "#mobileSearchToggle"
    );

  const mobileSearchPanel =
    document.querySelector(
      "#mobileSearchPanel"
    );

  const mobileSearchForm =
    document.querySelector(
      "#mobileSearchForm"
    );


  if(
    mobileSearchToggle &&
    mobileSearchPanel
  ){

    mobileSearchToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileSearchPanel.classList.toggle(
            "open"
          );

        mobileSearchToggle.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );

        if(isOpen){

          const input =
            mobileSearchForm?.querySelector(
              'input[name="q"]'
            );

          input?.focus();

        }

      }
    );

  }


  if(mobileSearchForm){

    mobileSearchForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        submitSearch(mobileSearchForm);

      }
    );

  }

  /* =====================================================
     JAM / HARI / TANGGAL
     ===================================================== */

  const desktopDate =
    document.querySelector("#desktopDate");

  const desktopTime =
    document.querySelector("#desktopTime");

  const desktopSeconds =
    document.querySelector("#desktopSeconds");

  const mobileTime =
    document.querySelector("#mobileTime");

  const mobileDate =
    document.querySelector("#mobileDate");


  function updateDateTime(){

    const now =
      new Date(
        new Date().toLocaleString(
          "en-US",
          {
            timeZone:"Asia/Jakarta"
          }
        )
      );


    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu"
    ];

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];


    const day =
      days[now.getDay()];

    const date =
      now.getDate();

    const month =
      months[now.getMonth()];

    const year =
      now.getFullYear();

    const hours =
      String(now.getHours()).padStart(2,"0");

    const minutes =
      String(now.getMinutes()).padStart(2,"0");

    const seconds =
      String(now.getSeconds()).padStart(2,"0");


    const fullDate =
      `${day}, ${date} ${month} ${year}`;


    const time =
      `${hours}:${minutes}`;


    if(desktopDate){
      desktopDate.textContent =
        fullDate;
    }

    if(desktopTime){
      desktopTime.textContent =
        time;
    }

    if(desktopSeconds){
      desktopSeconds.textContent =
        seconds;
    }

    if(mobileTime){
      mobileTime.textContent =
        time;
    }

    if(mobileDate){
      mobileDate.textContent =
        fullDate;
    }

  }


  updateDateTime();

  setInterval(
    updateDateTime,
    1000
  );


  /* =====================================================
     MOBILE SEARCH
     ===================================================== */

  const mobileSearchToggle =
    document.querySelector(
      "#mobileSearchToggle"
    );

  const siteHeader =
    document.querySelector(
      ".site-header"
    );

  const searchInput =
    document.querySelector(
      "#searchInput"
    );


  function closeMobileSearch(){

    if(!siteHeader) return;

    siteHeader.classList.remove(
      "search-open"
    );

    if(mobileSearchToggle){

      mobileSearchToggle.setAttribute(
        "aria-label",
        "Buka pencarian"
      );

      mobileSearchToggle.setAttribute(
        "title",
        "Cari"
      );

    }

  }


  function openMobileSearch(){

    if(!siteHeader) return;

    siteHeader.classList.add(
      "search-open"
    );

    if(mobileSearchToggle){

      mobileSearchToggle.setAttribute(
        "aria-label",
        "Tutup pencarian"
      );

      mobileSearchToggle.setAttribute(
        "title",
        "Tutup pencarian"
      );

    }

    setTimeout(() => {

      if(searchInput){
        searchInput.focus();
      }

    },50);

  }


  if(mobileSearchToggle){

    mobileSearchToggle.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        if(
          siteHeader &&
          siteHeader.classList.contains(
            "search-open"
          )
        ){

          closeMobileSearch();

        }else{

          openMobileSearch();

        }

      }
    );

  }


  /*
     Klik di dalam header tidak menutup
     pencarian.
  */

  if(siteHeader){

    siteHeader.addEventListener(
      "click",
      (event) => {

        if(
          event.target.closest(
            ".search-box"
          )
        ){

          return;

        }

        if(
          event.target.closest(
            "#mobileSearchToggle"
          )
        ){

          return;

        }

      }
    );

  }


  /*
     Klik di luar header menutup
     pencarian mobile.
  */

  document.addEventListener(
    "click",
    (event) => {

      if(!siteHeader) return;

      if(
        !siteHeader.classList.contains(
          "search-open"
        )
      ){

        return;

      }


      if(
        event.target.closest(
          ".site-header"
        )
      ){

        return;

      }


      closeMobileSearch();

    }
  );


  /*
     Klik berita / hero / artikel
     otomatis menutup pencarian.
  */

  document.addEventListener(
    "click",
    (event) => {

      if(!siteHeader) return;

      if(
        !siteHeader.classList.contains(
          "search-open"
        )
      ){

        return;

      }


      const newsTarget =
        event.target.closest(
          [
            ".hero",
            ".news-card",
            ".latest-item",
            ".popular-list",
            ".focus-card",
            "article a"
          ].join(",")
        );


      if(newsTarget){

        closeMobileSearch();

      }

    }
  );

});