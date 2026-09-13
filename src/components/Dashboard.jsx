import React from 'react';
import { offers, activities } from '../data/mock';
import HeroCard from './dashboard/HeroCard';

const quick=[['offers','✦','Offers','High-value opportunities'],['surveys','◈','Surveys','Share your opinion'],['tasks','✓','Tasks','Quick actions'],['games','◉','Games','Play & earn']];

export function Hero({go}){return <HeroCard go={go}/>}

export function StatCards(){return <div className="stats"><div className="stat balance"><span className="stat-icon">◆</span><div><small>YOUR BALANCE</small><strong>2,480 <i>pts</i></strong><span className="trend">● Preview balance</span></div><button>Withdraw →</button></div><div className="stat"><span className="stat-icon pending">◷</span><div><small>PENDING</small><strong>320 <i>pts</i></strong><span className="muted">3 processing</span></div></div><div className="stat"><span className="stat-icon lifetime">♛</span><div><small>LIFETIME</small><strong>12,680 <i>pts</i></strong><span className="muted">Preview total</span></div></div></div>}

export function QuickActions({go}){return <section><div className="section-head"><div><span className="eyebrow">GET STARTED</span><h2>Quick Actions</h2></div><button className="text-btn" onClick={()=>go('offers')}>View all →</button></div><div className="quick-grid">{quick.map(([id,icon,t,d])=><button className="quick" key={id} onClick={()=>go(id)}><span>{icon}</span><b>{t}</b><small>{d}</small><i>→</i></button>)}</div></section>}

export function Featured({go}){return <section><div className="section-head"><div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>Featured Offers</h2></div><button className="text-btn" onClick={()=>go('offers')}>See all →</button></div><div className="offer-grid">{offers.slice(0,3).map(o=><article className={'offer '+o.tone} key={o.brand}><div className="offer-top"><span className="provider"><b className="mini-logo">{o.icon}</b>{o.brand}</span><span className="tag">{o.tag}</span></div><h3>{o.title}</h3><div className="offer-bottom"><strong>+{o.reward} <i>pts</i></strong><button onClick={()=>go('offers')}>Start</button></div></article>)}</div></section>}

export function Activity(){return <section className="activity"><div className="section-head"><div><span className="eyebrow">YOUR ACCOUNT</span><h2>Recent Activity</h2></div><button className="text-btn">View history →</button></div><div className="activity-card">{activities.map(([a,b,c,d])=><div className="activity-row" key={a}><span className="activity-icon">✓</span><div><b>{a}</b><small>{b}</small></div><strong className={c.startsWith('−')?'negative':''}>{c} <i>pts</i></strong><small className="time">{d}</small></div>)}</div></section>}

export function Dashboard({go}){return <><Hero go={go}/><StatCards/><QuickActions go={go}/><Featured go={go}/><Activity/></>}
