/* MAB-News CMS - umum.js */
document.addEventListener("DOMContentLoaded",()=>{"use strict";
const form=document.getElementById("generalSettingsForm"),toast=document.getElementById("settingsToast"),button=document.getElementById("saveChanges");
if(!form)return;
const key="mabnews_general_settings";
const ids=["siteName","siteDescription","siteUrl","defaultLanguage","adminName","adminEmail","timezone","dateFormat","timeFormat","maintenanceMode","commentsEnabled","activityLog"];
const field=id=>document.getElementById(id);
function settings(){const data={};ids.forEach(id=>{const el=field(id);if(el)data[id]=el.type==="checkbox"?el.checked:el.value});return data}
function notify(message){if(!toast)return;toast.textContent=message;toast.classList.add("show");clearTimeout(notify.timer);notify.timer=setTimeout(()=>toast.classList.remove("show"),1800)}
function load(){try{const data=JSON.parse(localStorage.getItem(key)||"null");if(!data)return;ids.forEach(id=>{const el=field(id);if(!el||!(id in data))return;el.type==="checkbox"?el.checked=Boolean(data[id]):el.value=data[id]})}catch(error){console.warn("Gagal membaca pengaturan umum.",error)}}
load();
form.addEventListener("submit",event=>{event.preventDefault();try{localStorage.setItem(key,JSON.stringify(settings()));notify("Perubahan berhasil disimpan.");if(button){const old=button.innerHTML;button.disabled=true;button.innerHTML='<i class="fa-solid fa-check"></i><span>Tersimpan</span>';setTimeout(()=>{button.disabled=false;button.innerHTML=old},1400)}}catch(error){console.warn("Gagal menyimpan pengaturan umum.",error);notify("Perubahan tidak dapat disimpan.")}});
});
