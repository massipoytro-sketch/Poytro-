const styleLayers=['premium.css','design-final.css','reference-final.css'];
styleLayers.forEach(file=>{const link=document.createElement('link');link.rel='stylesheet';link.href=`./${file}`;document.head.appendChild(link);});

const screens=[...document.querySelectorAll('.screen')];
const navs=[...document.querySelectorAll('[data-nav]')];
function route(){
  let id=(location.hash||'#dashboard').slice(1);
  if(!document.getElementById(id))id='dashboard';
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  navs.forEach(n=>n.classList.toggle('active',n.dataset.nav===id));
  if(location.hash!==`#${id}`)history.replaceState(null,'',`#${id}`);
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',route);
window.addEventListener('DOMContentLoaded',route);

document.addEventListener('click',event=>{
  const copy=event.target.closest('[data-copy]');
  if(copy){
    const value=copy.dataset.copy;
    const done=()=>{const old=copy.textContent;copy.textContent='Copied';setTimeout(()=>copy.textContent=old,1200);};
    navigator.clipboard?.writeText(value).then(done).catch(()=>{});
  }
  const filter=event.target.closest('.filter');
  if(filter){
    filter.parentElement.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    filter.classList.add('active');
  }
  const toggle=event.target.closest('.toggle');
  if(toggle)toggle.classList.toggle('on');
});
