import React from 'react';

export default function LandingPage({go}){
  return <div className="landing-page">
    <div className="landing-glow" />
    <header className="landing-top"><div className="brand"><span className="brand-mark">G</span><span>GainiRen</span></div><div className="landing-actions"><button className="secondary" onClick={()=>go('login')}>Log in</button><button className="primary small" onClick={()=>go('register')}>Get started</button></div></header>
    <main className="landing-main">
      <span className="eyebrow">THE REWARD PLATFORM</span>
      <h1>Earn more from the things <em>you already do.</em></h1>
      <p>Discover offers, surveys, tasks and games in one premium rewards experience.</p>
      <div className="landing-cta"><button className="primary" onClick={()=>go('register')}>Start earning <span>→</span></button><button className="secondary" onClick={()=>go('offers')}>Explore rewards</button></div>
      <div className="landing-preview"><div className="preview-bar"><span>GainiRen</span><span>● ● ●</span></div><div className="preview-balance"><small>YOUR BALANCE</small><strong>2,450 <i>pts</i></strong><span>↗ Keep earning today</span></div><div className="preview-cards"><span>Offers</span><span>Surveys</span><span>Tasks</span></div></div>
    </main>
  </div>;
}
