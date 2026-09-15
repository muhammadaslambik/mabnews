const $=id=>document.getElementById(id);
const title=$("title"),slug=$("slug"),lead=$("lead"),meta=$("meta"),content=$("content"),tagsBox=$("tags"),tagInput=$("tagInput");
function slugify(v){return v.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}
let manualSlug=false;
title.addEventListener("input",()=>{ $("titleCount").textContent=title.value.length;if(!manualSlug)slug.value=slugify(title.value)});
slug.addEventListener("input",()=>manualSlug=true);
$("regenSlug").onclick=()=>{manualSlug=false;slug.value=slugify(title.value)};
lead.addEventListener("input",()=>$("leadCount").textContent=lead.value.length);
meta.addEventListener("input",()=>$("metaCount").textContent=meta.value.length);
content.addEventListener("input",()=>{$("wordCount").textContent=(content.innerText.trim().match(/\S+/g)||[]).length+" kata"});
document.querySelectorAll(".toolbar button[data-cmd]").forEach(b=>b.onclick=()=>{content.focus();document.execCommand(b.dataset.cmd,false,b.dataset.value||null);content.dispatchEvent(new Event("input"))});
$("linkBtn").onclick=()=>{const u=prompt("Masukkan URL:");if(u){content.focus();document.execCommand("createLink",false,u)}};
$("imageBtn").onclick=()=>{const u=prompt("URL gambar:");if(u){content.focus();document.execCommand("insertImage",false,u)}};
$("videoBtn").onclick=()=>showToast("Fitur video siap diintegrasikan dengan Media CMS.");
$("fullscreenBtn").onclick=()=>document.querySelector(".editor").classList.toggle("fullscreen");
$("tagInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&tagInput.value.trim()){e.preventDefault();addTag(tagInput.value.trim())}});
function addTag(t){const el=document.createElement("span");el.className="tag";el.innerHTML=`${t}<button type="button">×</button>`;el.querySelector("button").onclick=()=>el.remove();tagsBox.appendChild(el);tagInput.value=""}
$("imageInput").addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;if(f.size>5*1024*1024){showToast("Ukuran gambar maksimal 5 MB.");e.target.value="";return}const r=new FileReader();r.onload=()=>{$("preview").style.display="block";$("preview").innerHTML=`<img src="${r.result}" alt="Preview gambar utama">`};r.readAsDataURL(f)});
document.querySelectorAll(".nav-group").forEach(btn=>btn.addEventListener("click",()=>{const m=$(btn.dataset.menu);m.classList.toggle("open");btn.classList.toggle("open");btn.querySelector("b").textContent=m.classList.contains("open")?"⌃":"⌄"}));
$("menuBtn").onclick=()=>$("sidebar").classList.toggle("open");
$("themeBtn").onclick=()=>{document.body.classList.toggle("dark");showToast("Mode tampilan diubah.")};
$("saveDraft").onclick=()=>save("draft");
$("publish").onclick=()=>save("publish");
function save(type){if(!title.value.trim()){showToast("Judul Artikel wajib diisi.");title.focus();return}if(!slug.value.trim()){showToast("Slug URL wajib diisi.");slug.focus();return}if(type==="publish"&&!content.innerText.trim()){showToast("Konten Artikel wajib diisi.");content.focus();return}showToast(type==="draft"?"Artikel disimpan sebagai draft.":"Artikel siap dipublikasikan.");}
function showToast(t){const x=$("toast");x.textContent=t;x.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>x.classList.remove("show"),2200)}
