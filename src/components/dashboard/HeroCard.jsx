import React from 'react';

export default function HeroCard({go}){
  return <section className="hero">
    <div className="hero-copy">
      <span className="eyebrow">GAINIREN • HOME</span>
      <h1>Hello, <em>Massi! 👋</em></h1>
      <p>Keep going! You are doing great. Complete offers, surveys and tasks to reach your next reward.</p>
      <button className="primary hero-cta" onClick={()=>go('offers')}>Earn more coins <span>→</span></button>
    </div>
    <div className="hero-art" aria-hidden="true">
      <div className="glow-orb" />
      <div className="reward-chest"><span className="chest-lid"/><span className="chest-body"/><span className="chest-lock"/></div>
      <span className="coin c1">◆</span><span className="coin c2">✦</span><span className="coin c3">◆</span>
    </div>
  </section>;
}
