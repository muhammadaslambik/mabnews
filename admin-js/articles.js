(() => {
const data=[
'Pemerintah Siapkan Strategi Baru Jaga Daya Beli Masyarakat','Inflasi Terkendali, Ekonomi Nasional Tetap Tumbuh','Perkembangan Teknologi AI Mendorong Transformasi Digital','Timnas Indonesia Bersiap Menghadapi Pertandingan Berikutnya','Industri Otomotif Nasional Catat Pertumbuhan Positif'
];
const cats=['Ekonomi','Teknologi','Nasional','Olahraga','Internasional'];
const authors=['MAB-News','Muhammad Aslambik','Redaksi MAB-News'];
let articles=Array.from({length:24},(_,i)=>({id:i+1,title:data[i%5],category:cats[i%5],author:authors[i%3],date:`${String(i%28+1).padStart(2,'0')} September 2026`,status:i<18?'Published':i<22?'Draft':'Archived'}));
let filtered=[...articles],page=1,size=10;
const $=id=>document.getElementById(id), body=$('articleBody');
function render(){
 const start=(page-1)*size, rows=filtered.slice(start,start+size);
 body.innerHTML=rows.map((a,i)=>`<tr><td><input class="row-check" type="checkbox"></td><td>${start+i+1}</td><td class="title-cell"><strong>${a.title}</strong><small>Content article MAB-News</small></td><td>${a.category}</td><td>${a.author}</td><td>${a.date}</td><td><span class="article-status ${a.status.toLowerCase()}">${a.status}</span></td><td><div class="article-actions"><button title="Lihat" onclick="viewArticle(${a.id})">Lihat</button><button class="edit" title="Edit" onclick="editArticle(${a.id})">Edit</button><button class="delete" title="Hapus" onclick="deleteArticle(${a.id})">Hapus</button></div></td></tr>`).join('');
 $('resultCount').textContent=`${filtered.length} articles`;
 $('pageInfo').textContent=`Menampilkan ${filtered.length?start+1:0}–${Math.min(start+rows.length,filtered.length)} dari ${filtered.length}`;
 const pages=Math.max(1,Math.ceil(filtered.length/size));$('pagination').innerHTML=Array.from({length:pages},(_,i)=>`<button class="${i+1===page?'active':''}" onclick="goPage(${i+1})">${i+1}</button>`).join('');
 updateStats();
}
function updateStats(){$('totalCount').textContent=articles.length;$('publishedCount').textContent=articles.filter(a=>a.status==='Published').length;$('draftCount').textContent=articles.filter(a=>a.status==='Draft').length;$('archivedCount').textContent=articles.filter(a=>a.status==='Archived').length}
function filter(){
 const q=$('tableSearch').value.toLowerCase(), s=$('statusFilter').value,c=$('categoryFilter').value;
 filtered=articles.filter(a=>(!q||`${a.title} ${a.category} ${a.author}`.toLowerCase().includes(q))&&(s==='all'||a.status===s)&&(c==='all'||a.category===c));page=1;render()
}
$('searchInput').addEventListener('input',e=>{$('tableSearch').value=e.target.value;filter()});$('tableSearch').addEventListener('input',filter);
$('statusFilter').addEventListener('change',filter);$('categoryFilter').addEventListener('change',filter);
$('pageSize').addEventListener('change',e=>{size=+e.target.value;page=1;render()});
$('filterToggle').addEventListener('click',()=>$('filterPanel').classList.toggle('show'));
$('selectAll').addEventListener('change',e=>document.querySelectorAll('.row-check').forEach(x=>x.checked=e.target.checked));
window.goPage=n=>{page=n;render()};window.viewArticle=id=>toast(`Melihat Article #${id}`);window.editArticle=id=>toast(`Mengedit Article #${id}`);
window.deleteArticle=id=>{if(!confirm('Hapus article ini?'))return;articles=articles.filter(a=>a.id!==id);filter();toast('Article berhasil dihapus')};
function toast(text){const t=$('toast');t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
render();
})();