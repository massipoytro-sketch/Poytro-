import React from 'react';
import {PageShell,FilterBar} from '../components/ui/PageShell';
import {offers} from '../data/mock';

export default function OffersPage(){
  return <PageShell eyebrow="EARN / OFFERS" title="Discover offers" description="Choose an opportunity and complete it according to the partner rules." action={<button className="secondary">How it works</button>}>
    <FilterBar/>
    <div className="resource-grid offers-page-grid">{offers.map((o,i)=><article className={'resource-card '+o.tone} key={o.brand}>
      <div className="resource-brand">{o.brand[0]}</div>
      <div><span className="tag">{o.tag}</span><h3>{o.title}</h3><p>{o.brand} partner opportunity. Reward shown is presentation data until live provider data is connected.</p></div>
      <div className="resource-footer"><strong>+{o.reward} <i>pts</i></strong><button className="primary small">View offer</button></div>
    </article>)}</div>
  </PageShell>;
}
