/* =========================================================
   Membuat carousel Hero (#heroTrack) bisa digeser terus-
   menerus (dari slide terakhir balik ke slide pertama, dan
   sebaliknya), baik lewat geser jari, geser trackpad, maupun
   klik tombol panah #heroPrev / #heroNext.

   Script ini SENGAJA dibuat terpisah dari js/homepage.js
   (bukan menulis ulang isinya) — supaya logika pengambilan
   data & pengisian slide Hero yang sudah ada di homepage.js
   tidak perlu diubah/diganggu sama sekali. Script ini cuma
   "menumpang" setelah slide-slide Hero selesai dibuat, lalu
   menambahkan perilaku loop di atasnya.

   Taruh setelah <script src="js/homepage.js"></script>.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("heroTrack");
  if (!track) return;

  let ready = false;

  function cardWidth() {
    const first = track.children[0];
    return first ? first.getBoundingClientRect().width : track.clientWidth;
  }

  function scrollToTrackIndex(trackIndex, smooth) {
    const el = track.children[trackIndex];
    if (el) el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", inline: "start", block: "nearest" });
  }

  function currentTrackIndex() {
    const cards = [...track.children];
    const trackRect = track.getBoundingClientRect();
    let closest = 0, closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - trackRect.left);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
  }

  function setupInfiniteLoop() {
    if (ready) return; // jangan dobel-setup
    const items = [...track.children].filter(el => !el.dataset.heroLoopClone);
    const realCount = items.length;
    if (realCount < 2) return;
    ready = true;

    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);
    firstClone.dataset.heroLoopClone = "true";
    lastClone.dataset.heroLoopClone = "true";
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    requestAnimationFrame(() => scrollToTrackIndex(1, false));

    let scrollTimer;
    track.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const idx = currentTrackIndex();
        if (idx >= realCount + 1) {
          scrollToTrackIndex(1, false);
        } else if (idx <= 0) {
          scrollToTrackIndex(realCount, false);
        }
      }, 120);
    });

    // Tombol panah bawaan Hero biasanya sudah menggeser dengan
    // scrollBy/scrollIntoView satu slide — kalau tombolnya cuma
    // mengubah scrollLeft langsung (bukan lewat elemen), logika
    // loop di atas tetap menangkapnya lewat event "scroll" begitu
    // geserannya berhenti di slide kloning.
  }

  // Hero pada homepage.js kemungkinan mengisi slide secara
  // asinkron (setelah fetch data), jadi ditunggu dulu sampai
  // ada isinya, baru loop-nya dipasang.
  const interval = setInterval(() => {
    if (track.children.length > 0) {
      clearInterval(interval);
      setupInfiniteLoop();
    }
  }, 200);
  // Jaga-jaga kalau Hero gagal terisi, hentikan pengecekan
  // setelah 10 detik supaya tidak jalan selamanya.
  setTimeout(() => clearInterval(interval), 10000);
});
