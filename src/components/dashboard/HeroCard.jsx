import React from 'react';
import {useMember} from '../../app/MemberContext';

export default function HeroCard({go}){
  const {member,user}=useMember();
  const name=member?.profile?.name||member?.profile?.full_name||member?.profile?.username||user?.user_metadata?.name||user?.email?.split('@')[0]||'Member';
  return <section className="hero">
    <div className="hero-copy">
      <span className="eyebrow">GAINIREN • HOME</span>
      <h1>Hello, <em>{name}! 👋</em></h1>
      <p>Keep going! Complete eligible offers, surveys and tasks to reach your next reward.</p>
      <button className="primary hero-cta" onClick={()=>go('offers')}>Earn more coins <span>→</span></button>
    </div>
    <div className="hero-art" aria-hidden="true"><div className="glow-orb"/><div className="reward-chest"><span className="chest-lid"/><span className="chest-body"/><span className="chest-lock"/></div><span className="coin c1">◆</span><span className="coin c2">✦</span><span className="coin c3">◆</span></div>
  </section>;
}
