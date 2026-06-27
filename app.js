const KEY='centrepoint_cos_v05';
const demo={
 projects:[
  {title:'Front Stairs',status:'ACTIVE',owner:'Council / APM',notes:'Engineering, quotes, approval record, owner updates, funding source, closeout documents.'},
  {title:'Boiler / Mechanical',status:'ACTIVE',owner:'Council / APM',notes:'Track Sunset West, special levy / CRF reconciliation, inspection, warranty, final closeout.'},
  {title:'Guest Suite Calendar',status:'PLANNING',owner:'Council',notes:'Public calendar shows unavailable only. Council can see booking details privately.'}
 ],
 motions:[
  {title:'Council Operational Manual',status:'APPROVED',owner:'Council',notes:'Council members access portal weekly. Email only for urgent/necessary matters.'},
  {title:'APM Portal Owner Letter',status:'APPROVED',owner:'APM',notes:'APM sends Council letter to owners on Council-branded letterhead.'}
 ],
 tasks:[
  {title:'Create project register',status:'OPEN',owner:'Elias',notes:'First live register for all major active projects.'},
  {title:'Prepare owner portal notice',status:'OPEN',owner:'Council',notes:'Explain new platform and transparency purpose.'}
 ],
 meetings:[{title:'Next Council Meeting',status:'DRAFT',owner:'Secretary',notes:'Use COS to collect agenda items and motions before meeting.'}],
 contractors:[
  {title:'Sunset West Mechanical',status:'ACTIVE',owner:'APM',notes:'Mechanical / boiler project file.'},
  {title:'NLD Consulting',status:'SELECTED',owner:'APM',notes:'Insurance appraisal program, 3-year option.'}
 ],
 documents:[{title:'Governance Review',status:'REFERENCE',owner:'Council',notes:'Governance, financial, and operational review.'}],
 financials:[{title:'March 2026 controls',status:'FOLLOW-UP',owner:'Treasurer',notes:'Explain AP aging, CRF due-to/from, levy roll-forward, and cash forecast.'}]
};
let data=load();
function load(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(demo)}catch(e){return structuredClone(demo)}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));render()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-screen]');if(b)show(b.dataset.screen)});
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0);render()}
function render(){['projects','motions','tasks','meetings','contractors','documents','financials'].forEach(renderList);document.getElementById('statProjects').textContent=data.projects.filter(x=>x.status!='DONE').length;document.getElementById('statMotions').textContent=data.motions.filter(x=>x.status!='APPROVED').length;document.getElementById('statTasks').textContent=data.tasks.filter(x=>x.status!='DONE').length;}
function renderList(type){const el=document.getElementById(type+'List'); if(!el)return; el.innerHTML=(data[type]||[]).map((x,i)=>`<div class="card"><b>${esc(String(i+1).padStart(3,'0'))} ${esc(x.title)}</b><br>Status: <span class="tag">${esc(x.status||'')}</span><br>Owner: ${esc(x.owner||'')}<br>${nl(x.notes||'')}<div class="row"><button onclick="editItem('${type}',${i})">EDIT</button><button onclick="deleteItem('${type}',${i})">DELETE</button></div></div>`).join('')||'<div class="card dim">No records yet.</div>'}
function addItem(type){const title=prompt('Title?'); if(!title)return; const status=prompt('Status?','OPEN')||'OPEN'; const owner=prompt('Owner / responsible?','Council')||'Council'; const notes=prompt('Notes?','')||''; data[type].push({title,status,owner,notes}); save()}
function editItem(type,i){const x=data[type][i]; const title=prompt('Title',x.title); if(title===null)return; x.title=title; x.status=prompt('Status',x.status)||x.status; x.owner=prompt('Owner',x.owner)||x.owner; const notes=prompt('Notes',x.notes); if(notes!==null)x.notes=notes; save()}
function deleteItem(type,i){if(confirm('Delete this record?')){data[type].splice(i,1);save()}}
function runSearch(){const q=document.getElementById('searchBox').value.toLowerCase().trim();const out=[]; if(q){for(const [type,arr] of Object.entries(data)){arr.forEach((x,i)=>{const hay=JSON.stringify(x).toLowerCase(); if(hay.includes(q))out.push(`<div class="card"><b>${type.toUpperCase()} ${i+1}: ${esc(x.title)}</b><br>${esc(x.status)}<br>${nl(x.notes||'')}</div>`)})}} document.getElementById('searchResults').innerHTML=out.join('')||'<div class="card dim">No matches yet.</div>'}
function exportData(){const text=JSON.stringify(data,null,2);navigator.clipboard?.writeText(text);document.getElementById('importBox').value=text;alert('Data exported. It is also shown in the box and copied if your browser allows it.');}
function importData(){try{data=JSON.parse(document.getElementById('importBox').value);save();alert('Imported.')}catch(e){alert('Import failed. Check the pasted text.')}}
function resetData(){if(confirm('Reset to demo data?')){data=structuredClone(demo);save()}}
function esc(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function nl(s){return esc(s).replace(/\n/g,'<br>')}
render();
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{})}
