document.addEventListener("DOMContentLoaded", () => {
  const theme = document.querySelector(".theme-toggle");
  theme?.addEventListener("click", () => {
    document.body.classList.toggle("dark-preview");
  });

  const menu = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");
  menu?.addEventListener("click", () => nav?.classList.toggle("mobile-open"));

  const search = document.querySelector("#headerSearch");
  search?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = new FormData(search).get("q") || search.querySelector("input").value.trim();
    if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
  });
});