import React,{useState} from 'react';
import {PageShell} from '../components/ui/PageShell';
import {useMember} from '../app/MemberContext';
import {databaseAdapter} from '../services/databaseAdapter';

export default function OffersPage(){
 const [tab,setTab]=useState('All'); const {member}=useMember();
 const tabs=['All','Popular','Trending','New'];
 const offers=(member?.offers||[]).map(databaseAdapter.normalizeOffer);
 const filtered=tab==='All'?offers:offers.filter(o=>String(o.tag||o.category||'').toLowerCase().includes(tab.toLowerCase())||String(o.type||'').toLowerCase().includes(tab.toLowerCase()));
 return <PageShell eyebrow="EARN / OFFERS" title="Offers" description="Complete eligible partner offers and collect coins after verification." action={<button className="secondary">How it works</button>}>
   <div className="filter-bar">{tabs.map(x=><button key={x} onClick={()=>setTab(x)} className={'filter '+(tab===x?'active':'')}>{x}</button>)}</div>
   <div className="earn-list">{filtered.length?filtered.map((o,i)=><article className={'earn-row '+(o.tone||['blue','purple','green'][i%3])} key={o.id||o.brand+i}><div className="earn-icon">{o.icon}</div><div className="earn-copy"><span className="tag">{o.tag}</span><h3>{o.brand}</h3><p>{o.title}</p></div><div className="earn-reward"><strong>🪙 {Number(o.reward||0).toLocaleString()}</strong><button className="primary small">Start</button></div></article>):<div className="empty-state">No live offers are available for your account right now.</div>}</div>
 </PageShell>;
}
