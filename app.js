const screens=[...document.querySelectorAll('.screen')];
const navs=[...document.querySelectorAll('[data-nav]')];

function route(){
  let id=(location.hash||'#dashboard').slice(1);
  if(!document.getElementById(id)) id='dashboard';
  screens.forEach(screen=>screen.classList.toggle('active',screen.id===id));
  navs.forEach(nav=>nav.classList.toggle('active',nav.dataset.nav===id));
  if(location.hash!==`#${id}`) history.replaceState(null,'',`#${id}`);
  window.scrollTo({top:0,behavior:'instant'});
}

window.addEventListener('hashchange',route);
window.addEventListener('DOMContentLoaded',route);

// Small prototype interactions kept separate from the visual layer.
document.addEventListener('click',event=>{
  const copy=event.target.closest('[data-copy]');
  if(copy){
    const value=copy.dataset.copy;
    navigator.clipboard?.writeText(value).then(()=>{
      const old=copy.textContent;
      copy.textContent='Copied';
      setTimeout(()=>copy.textContent=old,1200);
    });
  }
});
