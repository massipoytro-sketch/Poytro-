import React from 'react';

export default function HeroCard({go}){
  return <section className="hero">
    <div className="hero-copy">
      <span className="eyebrow">YOUR REWARD JOURNEY</span>
      <h1>Turn your time into <em>real rewards.</em></h1>
      <p>Complete offers, surveys and tasks you actually enjoy. Your next reward is closer than you think.</p>
      <button className="primary hero-cta" onClick={()=>go('offers')}>Explore opportunities <span>→</span></button>
    </div>
    <div className="hero-art" aria-hidden="true">
      <div className="glow-orb" />
      <div className="reward-chest"><span className="chest-lid"/><span className="chest-body"/><span className="chest-lock"/></div>
      <span className="coin c1">◆</span><span className="coin c2">✦</span><span className="coin c3">◆</span>
    </div>
  </section>;
}
