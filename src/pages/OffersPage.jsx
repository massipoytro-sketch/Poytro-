import React,{useState} from 'react';
import {PageShell} from '../components/ui/PageShell';
import {offers} from '../data/mock';

export default function OffersPage(){
 const [tab,setTab]=useState('All');
 const tabs=['All','Popular','Trending','New'];
 return <PageShell eyebrow="EARN / OFFERS" title="Offers" description="Complete eligible partner offers and collect coins after verification." action={<button className="secondary">How it works</button>}>
   <div className="filter-bar">{tabs.map(x=><button key={x} onClick={()=>setTab(x)} className={'filter '+(tab===x?'active':'')}>{x}</button>)}</div>
   <div className="earn-list">{offers.map(o=><article className={'earn-row '+o.tone} key={o.brand}>
     <div className="earn-icon">{o.icon}</div>
     <div className="earn-copy"><span className="tag">{o.tag}</span><h3>{o.brand}</h3><p>{o.title}</p></div>
     <div className="earn-reward"><strong>🪙 {o.reward}</strong><button className="primary small">Start</button></div>
   </article>)}</div>
 </PageShell>;
}
