import React from 'react';
import { activities } from '../data/mock';
import { useMember } from '../app/MemberContext';
import HeroCard from './dashboard/HeroCard';

const quick=[['offers','✦','Offers','High-value opportunities'],['surveys','◈','Surveys','Share your opinion'],['tasks','✓','Tasks','Quick actions'],['games','◉','Games','Play & earn']];
const fmt=n=>Number(n||0).toLocaleString();

export function Hero({go}){return <HeroCard go={go}/>}

export function StatCards(){
 const {member}=useMember(); const wallet=member?.wallet?{...member.wallet}:{};
 const balance=Number(wallet.balance||0),pending=Number(wallet.pending||0),lifetime=Number(wallet.lifetime||0);
 return <div className="stats"><div className="stat balance"><span className="stat-icon">◆</span><div><small>YOUR BALANCE</small><strong>{fmt(balance)} <i>pts</i></strong><span className="trend">● Live account balance</span></div><button onClick={()=>location.hash='withdraw'}>Withdraw →</button></div><div className="stat"><span className="stat-icon pending">◷</span><div><small>PENDING</small><strong>{fmt(pending)} <i>pts</i></strong><span className="muted">Live pending rewards</span></div></div><div className="stat"><span className="stat-icon lifetime">♛</span><div><small>LIFETIME</small><strong>{fmt(lifetime)} <i>pts</i></strong><span className="muted">Live account total</span></div></div></div>
}

export function QuickActions({go}){return <section><div className="section-head"><div><span className="eyebrow">GET STARTED</span><h2>Quick Actions</h2></div><button className="text-btn" onClick={()=>go('offers')}>View all →</button></div><div className="quick-grid">{quick.map(([id,icon,t,d])=><button className="quick" key={id} onClick={()=>go(id)}><span>{icon}</span><b>{t}</b><small>{d}</small><i>→</i></button>)}</div></section>}

export function Featured({go}){
 const {member}=useMember(); const offers=(member?.offers||[]).slice(0,3);
 return <section><div className="section-head"><div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>Featured Offers</h2></div><button className="text-btn" onClick={()=>go('offers')}>See all →</button></div><div className="offer-grid">{offers.length?offers.map((raw,i)=>{const o={...raw};const brand=o.brand||o.provider||o.name||o.title||'Offer';const reward=Number(o.reward??o.points??o.coins??o.amount??0);return <article className={'offer '+(o.tone||['blue','purple','green'][i%3])} key={o.id||brand+i}><div className="offer-top"><span className="provider"><b className="mini-logo">{o.icon||'✦'}</b>{brand}</span><span className="tag">{o.tag||o.category||'Available'}</span></div><h3>{o.title||o.description||'Complete this offer'}</h3><div className="offer-bottom"><strong>+{fmt(reward)} <i>pts</i></strong><button onClick={()=>go('offers')}>Start</button></div></article>}) : <div className="empty-state">No live offers are available for this account yet.</div>}</div></section>
}

export function Activity(){
 const {member}=useMember(); const tx=member?.transactions||[];
 return <section className="activity"><div className="section-head"><div><span className="eyebrow">YOUR ACCOUNT</span><h2>Recent Activity</h2></div><button className="text-btn">View history →</button></div><div className="activity-card">{tx.length?tx.slice(0,5).map((row,i)=>{const amount=Number(row.amount??row.points??row.coins??0);const label=row.description||row.title||row.type||'Points transaction';return <div className="activity-row" key={row.id||i}><span className="activity-icon">✓</span><div><b>{label}</b><small>{row.status||'Recorded in your account'}</small></div><strong className={amount<0?'negative':''}>{amount>=0?'+':''}{fmt(amount)} <i>pts</i></strong><small className="time">{row.created_at?new Date(row.created_at).toLocaleDateString():''}</small></div>}) : <div className="empty-state">No account activity yet.</div>}</div></section>
}

export function Dashboard({go}){return <><Hero go={go}/><StatCards/><QuickActions go={go}/><Featured go={go}/><Activity/></>}
