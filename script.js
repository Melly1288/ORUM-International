const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const multi=document.querySelector('[data-multi]');const trigger=multi?.querySelector('.multi-trigger');const boxes=[...(multi?.querySelectorAll('input[type="checkbox"]')||[])];
function updateMulti(){const selected=boxes.filter(b=>b.checked).map(b=>b.value);trigger.firstChild.textContent=selected.length?`${selected.length} selected: ${selected.slice(0,2).join(', ')}${selected.length>2?'…':''}`:'Select one or more categories ';document.getElementById('category-error')?.classList.remove('show')}
trigger?.addEventListener('click',()=>{const open=multi.classList.toggle('open');trigger.setAttribute('aria-expanded',open)});boxes.forEach(b=>b.addEventListener('change',updateMulti));document.addEventListener('click',e=>{if(multi&&!multi.contains(e.target))multi.classList.remove('open')});
const form=document.querySelector('.enquiry-form');form?.addEventListener('submit',e=>{if(!boxes.some(b=>b.checked)){e.preventDefault();document.getElementById('category-error').classList.add('show');multi.classList.add('open');trigger.focus()}});


// V5.1 accessibility and privacy interactions
menuBtn?.addEventListener('click',()=>{menuBtn.setAttribute('aria-label',nav?.classList.contains('open')?'Close menu':'Open menu')});
const privacyDialog=document.getElementById('privacy-dialog');
document.querySelectorAll('.privacy-open').forEach(btn=>btn.addEventListener('click',()=>privacyDialog?.showModal()));
document.querySelector('.privacy-close')?.addEventListener('click',()=>privacyDialog?.close());
privacyDialog?.addEventListener('click',e=>{if(e.target===privacyDialog)privacyDialog.close()});


// V5.2 website sharing: native share where available, clipboard fallback on live site.
const shareBtn=document.getElementById('share-site');
const shareStatus=document.getElementById('share-status');
function showShareStatus(message){if(!shareStatus)return;shareStatus.textContent=message;window.clearTimeout(showShareStatus.timer);showShareStatus.timer=window.setTimeout(()=>{shareStatus.textContent=''},3500)}
shareBtn?.addEventListener('click',async()=>{
  if(location.protocol==='file:'){showShareStatus('Sharing activates when the website is live.');return}
  const data={title:'ORUM International',text:'ORUM International — Your Curated Sourcing Partner',url:location.href};
  try{
    if(navigator.share){await navigator.share(data);return}
    await navigator.clipboard.writeText(location.href);showShareStatus('Website link copied.');
  }catch(err){if(err?.name!=='AbortError')showShareStatus('Please copy the website address from your browser.')}
});
