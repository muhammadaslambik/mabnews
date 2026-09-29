/* =========================================================
   MAB-News — js/content-sanitizer.js
   ---------------------------------------------------------
   Dipakai BERSAMA oleh:
     - editor CMS   (admin/tambah-artikel.html)
     - halaman artikel publik (artikel.html)

   Kolom `content` di database adalah jsonb ARRAY berisi string.
   Dulu tiap string = paragraf teks polos, sehingga bold, italic,
   enter, gambar, dll hilang. Sekarang tiap string = SATU BLOK HTML
   yang sudah dibersihkan, mis.:
       "<p>Halo <strong>dunia</strong></p>"
       "<h2>Judul bagian</h2>"
       "<figure class=\"mab-figure\"><img src=\"https://...\"></figure>"
   Artikel lama (string teks polos tanpa tag) tetap tampil normal
   sebagai paragraf.

   Fungsi utama:
     sanitizeToBlocks(html)  -> string[]   (dipakai saat menyimpan)
     blocksToHtml(blocks)    -> string     (dipakai saat menampilkan/mengedit)
     plainTextToHtml(text)   -> string     (untuk paste teks polos)
     toEmbedUrl(url)         -> string|""  (YouTube/Vimeo -> URL embed)
     classifyMedia(name,type)-> 'image'|'video'|'audio'|'document'|'file'
   ========================================================= */
(function (global) {
  "use strict";

  const TEXT_ALIGN = ["left", "center", "right", "justify"];
  const FIGURE_CLASSES = ["mab-figure", "mab-embed"];
  const LINK_CLASSES = ["mab-file"];
  const EMBED_HOSTS = {
    "www.youtube.com": /^\/embed\/[\w-]{6,}/,
    "youtube.com": /^\/embed\/[\w-]{6,}/,
    "www.youtube-nocookie.com": /^\/embed\/[\w-]{6,}/,
    "player.vimeo.com": /^\/video\/\d+/
  };

  // Tag yang dianggap "blok" (berdiri sendiri di level atas)
  const BLOCK_OUT = new Set([
    "p", "h2", "h3", "blockquote", "ul", "ol", "figure", "table", "hr"
  ]);
  const BLOCK_IN = new Set([
    "P", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "LI",
    "BLOCKQUOTE", "TABLE", "FIGURE", "PRE", "HR", "SECTION", "ARTICLE"
  ]);
  const DROP_WITH_CONTENT = new Set([
    "SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "OBJECT", "EMBED", "FORM",
    "INPUT", "BUTTON", "SELECT", "TEXTAREA", "LINK", "META", "SVG", "MATH",
    "CANVAS", "TITLE", "HEAD", "APPLET", "FRAME", "FRAMESET"
  ]);
  const SIMPLE_MAP = {
    B: "strong", STRONG: "strong", I: "em", EM: "em", U: "u",
    S: "s", STRIKE: "s", DEL: "s", SUB: "sub", SUP: "sup",
    H1: "h2", H2: "h2", H3: "h3", H4: "h3", H5: "h3", H6: "h3",
    P: "p", BLOCKQUOTE: "blockquote", UL: "ul", OL: "ol", LI: "li",
    BR: "br", HR: "hr", FIGCAPTION: "figcaption",
    TABLE: "table", THEAD: "thead", TBODY: "tbody", TR: "tr", TH: "th", TD: "td"
  };

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------------------------------------------------
     URL aman
     --------------------------------------------------------- */
  function safeHttpUrl(value) {
    const v = String(value || "").trim();
    return /^https?:\/\//i.test(v) ? v : "";
  }

  function safeLinkUrl(value) {
    const v = String(value || "").trim();
    if (!v) return "";
    if (/^(https?:|mailto:|tel:)/i.test(v)) return v;
    if (/^[a-z][a-z0-9+.-]*:/i.test(v)) return ""; // javascript:, data:, dll
    return v; // relatif / anchor
  }

  function safeEmbedUrl(value) {
    try {
      const u = new URL(String(value || "").trim());
      if (u.protocol !== "https:" && u.protocol !== "http:") return "";
      const rule = EMBED_HOSTS[u.hostname.toLowerCase()];
      if (!rule || !rule.test(u.pathname)) return "";
      return "https://" + u.hostname + u.pathname + (u.search || "");
    } catch (e) {
      return "";
    }
  }

  function toEmbedUrl(raw) {
    const v = String(raw || "").trim();
    if (!v) return "";
    const direct = safeEmbedUrl(v);
    if (direct) return direct;
    try {
      const u = new URL(v);
      const host = u.hostname.replace(/^www\./, "").toLowerCase();
      if (host === "youtu.be") {
        const id = u.pathname.slice(1);
        return id ? "https://www.youtube.com/embed/" + id : "";
      }
      if (host === "youtube.com" || host === "m.youtube.com") {
        if (u.pathname === "/watch" && u.searchParams.get("v")) {
          return "https://www.youtube.com/embed/" + u.searchParams.get("v");
        }
        const m = u.pathname.match(/^\/(shorts|live)\/([\w-]+)/);
        if (m) return "https://www.youtube.com/embed/" + m[2];
      }
      if (host === "vimeo.com") {
        const m = u.pathname.match(/^\/(\d+)/);
        if (m) return "https://player.vimeo.com/video/" + m[1];
      }
    } catch (e) { /* bukan URL */ }
    return "";
  }

  function classifyMedia(nameOrUrl, mime) {
    const m = String(mime || "").toLowerCase();
    if (m.indexOf("image/") === 0) return "image";
    if (m.indexOf("video/") === 0) return "video";
    if (m.indexOf("audio/") === 0) return "audio";
    const ext = (String(nameOrUrl || "").split("?")[0].match(/\.([a-z0-9]+)$/i) || [])[1];
    const e = (ext || "").toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"].indexOf(e) > -1) return "image";
    if (["mp4", "webm", "mov", "m4v", "ogv"].indexOf(e) > -1) return "video";
    if (["mp3", "wav", "ogg", "m4a", "aac"].indexOf(e) > -1) return "audio";
    if (["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv", "rtf", "odt", "ods"].indexOf(e) > -1) return "document";
    return "file";
  }

  /* ---------------------------------------------------------
     Pembersih DOM (allowlist)
     --------------------------------------------------------- */
  function parseHtml(html) {
    const doc = new DOMParser().parseFromString(
      "<!DOCTYPE html><html><body>" + String(html || "") + "</body></html>",
      "text/html"
    );
    return doc;
  }

  function alignOf(el) {
    const st = (el.getAttribute && el.getAttribute("style")) || "";
    const m = st.match(/text-align\s*:\s*(left|center|right|justify)/i);
    if (m) return m[1].toLowerCase();
    const attr = (el.getAttribute && el.getAttribute("align")) || "";
    return TEXT_ALIGN.indexOf(attr.toLowerCase()) > -1 ? attr.toLowerCase() : "";
  }

  function applyAlign(from, to) {
    const a = alignOf(from);
    if (a && a !== "left") to.setAttribute("style", "text-align:" + a);
  }

  function hasBlockChild(el) {
    for (let i = 0; i < el.children.length; i++) {
      if (BLOCK_IN.has(el.children[i].tagName)) return true;
    }
    return false;
  }

  // Bungkus anak-anak dengan strong/em/u/s berdasarkan style inline
  // (hasil paste dari Word / Google Docs memakai <span style="...">)
  function styleWrappers(el) {
    const st = ((el.getAttribute && el.getAttribute("style")) || "").toLowerCase();
    const tags = [];
    if (/font-weight\s*:\s*(bold|[6-9]00)/.test(st)) tags.push("strong");
    if (/font-style\s*:\s*italic/.test(st)) tags.push("em");
    if (/text-decoration[^;]*underline/.test(st)) tags.push("u");
    if (/text-decoration[^;]*line-through/.test(st)) tags.push("s");
    return tags;
  }

  function cleanChildren(src, dest, doc) {
    for (let n = src.firstChild; n; n = n.nextSibling) {
      const out = cleanNode(n, doc);
      if (out) dest.appendChild(out);
    }
  }

  function cleanNode(node, doc) {
    if (node.nodeType === 3) return doc.createTextNode(node.nodeValue);
    if (node.nodeType !== 1) return null;

    const tag = node.tagName;
    if (DROP_WITH_CONTENT.has(tag)) return null;

    // ---- DIV: jadi paragraf, kecuali membungkus blok lain ----
    if (tag === "DIV") {
      const frag = doc.createDocumentFragment();
      if (hasBlockChild(node)) {
        cleanChildren(node, frag, doc);
        return frag;
      }
      const p = doc.createElement("p");
      applyAlign(node, p);
      cleanChildren(node, p, doc);
      return p;
    }

    // ---- Tag sederhana ----
    if (SIMPLE_MAP[tag]) {
      const out = doc.createElement(SIMPLE_MAP[tag]);
      if (["P", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "LI", "TH", "TD"].indexOf(tag) > -1) {
        applyAlign(node, out);
      }
      if (tag === "TH" || tag === "TD") {
        ["colspan", "rowspan"].forEach(function (a) {
          const v = parseInt(node.getAttribute(a), 10);
          if (v > 1 && v <= 20) out.setAttribute(a, String(v));
        });
      }
      if (tag === "TABLE") out.setAttribute("class", "mab-table");
      if (tag === "BR" || tag === "HR") return out;
      cleanChildren(node, out, doc);
      return out;
    }

    // ---- Tautan ----
    if (tag === "A") {
      const href = safeLinkUrl(node.getAttribute("href"));
      const frag = doc.createDocumentFragment();
      if (!href) { cleanChildren(node, frag, doc); return frag; }
      const a = doc.createElement("a");
      a.setAttribute("href", href);
      if (/^https?:/i.test(href)) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
      const cls = (node.getAttribute("class") || "").split(/\s+/).filter(function (c) { return LINK_CLASSES.indexOf(c) > -1; });
      if (cls.length) a.setAttribute("class", cls.join(" "));
      cleanChildren(node, a, doc);
      return a;
    }

    // ---- Gambar ----
    if (tag === "IMG") {
      const src = safeHttpUrl(node.getAttribute("src"));
      if (!src) return null;
      const img = doc.createElement("img");
      img.setAttribute("src", src);
      img.setAttribute("alt", node.getAttribute("alt") || "");
      img.setAttribute("loading", "lazy");
      return img;
    }

    // ---- Video / audio ----
    if (tag === "VIDEO" || tag === "AUDIO") {
      const el = doc.createElement(tag.toLowerCase());
      const src = safeHttpUrl(node.getAttribute("src"));
      if (src) el.setAttribute("src", src);
      el.setAttribute("controls", "");
      el.setAttribute("preload", "metadata");
      if (tag === "VIDEO") {
        const poster = safeHttpUrl(node.getAttribute("poster"));
        if (poster) el.setAttribute("poster", poster);
        el.setAttribute("playsinline", "");
      }
      let hasSource = !!src;
      Array.prototype.forEach.call(node.querySelectorAll("source"), function (s) {
        const ssrc = safeHttpUrl(s.getAttribute("src"));
        if (!ssrc) return;
        const so = doc.createElement("source");
        so.setAttribute("src", ssrc);
        if (s.getAttribute("type")) so.setAttribute("type", s.getAttribute("type"));
        el.appendChild(so);
        hasSource = true;
      });
      return hasSource ? el : null;
    }
    if (tag === "SOURCE") return null;

    // ---- Iframe: hanya YouTube / Vimeo ----
    if (tag === "IFRAME") {
      const src = safeEmbedUrl(node.getAttribute("src"));
      if (!src) return null;
      const f = doc.createElement("iframe");
      f.setAttribute("src", src);
      f.setAttribute("loading", "lazy");
      f.setAttribute("allowfullscreen", "");
      f.setAttribute("frameborder", "0");
      f.setAttribute("title", "Video");
      return f;
    }

    // ---- Figure ----
    if (tag === "FIGURE") {
      const fig = doc.createElement("figure");
      const cls = (node.getAttribute("class") || "").split(/\s+/).filter(function (c) { return FIGURE_CLASSES.indexOf(c) > -1; });
      fig.setAttribute("class", cls.length ? cls.join(" ") : "mab-figure");
      cleanChildren(node, fig, doc);
      if (!fig.querySelector("img,video,audio,iframe")) return null;
      return fig;
    }

    // ---- Tag lain (span, font, section, pre, code, ...): buka bungkusnya ----
    const wrappers = styleWrappers(node);
    if (wrappers.length) {
      let outer = null, inner = null;
      wrappers.forEach(function (w) {
        const el = doc.createElement(w);
        if (!outer) outer = el; else inner.appendChild(el);
        inner = el;
      });
      cleanChildren(node, inner, doc);
      return outer;
    }
    const frag = doc.createDocumentFragment();
    if (tag === "PRE") {
      // pertahankan baris baru pada blok kode/pre sebagai paragraf
      const text = node.textContent || "";
      text.split(/\r?\n/).forEach(function (line) {
        if (!line.trim()) return;
        const p = doc.createElement("p");
        p.textContent = line;
        frag.appendChild(p);
      });
      return frag;
    }
    cleanChildren(node, frag, doc);
    return frag;
  }

  /* ---------------------------------------------------------
     Normalisasi level atas -> daftar blok
     --------------------------------------------------------- */
  function isBlankBlock(el) {
    if (el.querySelector && el.querySelector("img,video,audio,iframe,table,hr")) return false;
    if (el.tagName === "HR") return false;
    return !(el.textContent || "").replace(/\u00a0/g, " ").trim();
  }

  function trimBr(el) {
    while (el.lastChild && el.lastChild.nodeName === "BR") el.removeChild(el.lastChild);
    while (el.firstChild && el.firstChild.nodeName === "BR") el.removeChild(el.firstChild);
  }

  function sanitizeToBlocks(html) {
    const doc = parseHtml(html);
    const cleaned = doc.createElement("div");
    cleanChildren(doc.body, cleaned, doc);
    cleaned.normalize();

    const blocks = [];
    let run = null; // paragraf penampung untuk inline di level atas

    function flushRun() {
      if (!run) return;
      trimBr(run);
      if (!isBlankBlock(run)) blocks.push(run.outerHTML);
      run = null;
    }

    Array.prototype.forEach.call(cleaned.childNodes, function (node) {
      if (node.nodeType === 1 && BLOCK_OUT.has(node.tagName.toLowerCase())) {
        flushRun();
        if (node.tagName === "P" || /^H[23]$/.test(node.tagName) || node.tagName === "BLOCKQUOTE") trimBr(node);
        if (node.tagName === "UL" || node.tagName === "OL") {
          if (!node.querySelector("li")) return;
        }
        if (!isBlankBlock(node)) blocks.push(node.outerHTML);
        return;
      }
      if (node.nodeType === 3 && !node.nodeValue.trim() && !run) return;
      if (node.nodeType === 1 && node.tagName === "IFRAME") {
        flushRun();
        blocks.push('<figure class="mab-embed">' + node.outerHTML + "</figure>");
        return;
      }
      if (node.nodeType === 1 && (node.tagName === "VIDEO" || node.tagName === "AUDIO")) {
        flushRun();
        blocks.push('<figure class="mab-figure">' + node.outerHTML + "</figure>");
        return;
      }
      if (node.nodeType === 1 && node.tagName === "IMG") {
        flushRun();
        blocks.push('<figure class="mab-figure">' + node.outerHTML + "</figure>");
        return;
      }
      if (!run) run = doc.createElement("p");
      run.appendChild(node.cloneNode(true));
    });
    flushRun();
    return blocks;
  }

  /* ---------------------------------------------------------
     Blok -> HTML (untuk tampilan & editor)
     --------------------------------------------------------- */
  const HTML_BLOCK_START = /^\s*<(p|h[1-6]|ul|ol|blockquote|figure|table|div|iframe|hr)\b/i;

  function blocksToHtml(blocks) {
    return (Array.isArray(blocks) ? blocks : []).map(function (raw) {
      const s = String(raw == null ? "" : raw);
      if (!s.trim()) return "";
      const html = HTML_BLOCK_START.test(s) ? s : "<p>" + s + "</p>"; // artikel lama
      return sanitizeToBlocks(html).join("");
    }).join("");
  }

  function plainTextToHtml(text) {
    return String(text || "")
      .split(/\r?\n/)
      .map(function (l) { return l.trim(); })
      .filter(Boolean)
      .map(function (l) { return "<p>" + escapeHtml(l) + "</p>"; })
      .join("");
  }

  global.MabContent = {
    sanitizeToBlocks: sanitizeToBlocks,
    blocksToHtml: blocksToHtml,
    plainTextToHtml: plainTextToHtml,
    toEmbedUrl: toEmbedUrl,
    classifyMedia: classifyMedia,
    escapeHtml: escapeHtml
  };
})(typeof window !== "undefined" ? window : this);
