document.addEventListener("DOMContentLoaded", () => {
  // Prototype slider: klik indikator mengubah indikator aktif.
  document.querySelectorAll(".hero .dots button").forEach((dot) => {
    dot.addEventListener("click", () => {
      document.querySelectorAll(".hero .dots button").forEach(d => d.classList.remove("selected"));
      dot.classList.add("selected");
    });
  });

  document.querySelectorAll(".focus-card .dots button").forEach((dot) => {
    dot.addEventListener("click", () => {
      document.querySelectorAll(".focus-card .dots button").forEach(d => d.classList.remove("selected"));
      dot.classList.add("selected");
    });
  });
});