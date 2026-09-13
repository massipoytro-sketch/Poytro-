import React,{useState} from 'react';
import {PageShell} from '../components/ui/PageShell';
import {rewards,withdrawMethods} from '../data/mock';

export function WithdrawPage(){
 const [tab,setTab]=useState('Method');
 return <PageShell eyebrow="REWARDS / WITHDRAW" title="Withdraw" description="Choose a payout method for your eligible balance." action={<button className="secondary">History</button>}>
  <div className="filter-bar"><button className={'filter '+(tab==='Method'?'active':'')} onClick={()=>setTab('Method')}>Method</button><button className={'filter '+(tab==='History'?'active':'')} onClick={()=>setTab('History')}>History</button></div>
  {tab==='Method'?<div className="withdraw-layout"><div className="withdraw-balance"><small>YOUR BALANCE</small><strong>2,480 <i>pts</i></strong><span>Preview value — live balance will come from the existing database.</span><button className="primary">Continue</button></div><div className="method-grid">{withdrawMethods.map(m=><article className="method" key={m.title}><span className="method-icon">{m.icon}</span><div><h3>{m.title}</h3><p>{m.detail}</p></div><span className="method-arrow">›</span></article>)}</div></div>:<div className="activity-card"><div className="activity-row"><span className="activity-icon">↗</span><div><b>No withdrawal history in preview</b><small>Live history will be loaded from your existing account data.</small></div><strong>—</strong></div></div>}
 </PageShell>;
}

export function StorePage(){
 const [tab,setTab]=useState('All'); const tabs=['All','Gift Cards','Crypto','More'];
 return <PageShell eyebrow="REWARDS / STORE" title="Rewards Store" description="Redeem eligible coins for supported rewards." action={<button className="secondary">My redemptions</button>}>
  <div className="filter-bar">{tabs.map(x=><button key={x} onClick={()=>setTab(x)} className={'filter '+(tab===x?'active':'')}>{x}</button>)}</div>
  <div className="earn-list">{rewards.map(r=><article className="earn-row store-row" key={r.title}><div className="earn-icon store-icon">{r.icon}</div><div className="earn-copy"><span className="tag">Available</span><h3>{r.title}</h3><p>{r.brand} reward</p></div><div className="earn-reward"><strong>🪙 {r.reward}</strong><button className="primary small">Redeem</button></div></article>)}</div>
 </PageShell>;
}

export function LeaderboardPage(){
 const people=[['1','NovaKing','58,420'],['2','CryptoRider','52,310'],['3','SkyHigh','48,760'],['4','You','12,680'],['5','FireStorm','42,190']];
 const [tab,setTab]=useState('Weekly');
 return <PageShell eyebrow="REWARDS / LEADERBOARD" title="Leaderboard" description="Compare eligible reward activity across the community."><div className="filter-bar">{['Weekly','Monthly','All Time'].map(x=><button key={x} onClick={()=>setTab(x)} className={'filter '+(tab===x?'active':'')}>{x}</button>)}</div><div className="leaderboard-list">{people.map(([rank,name,score])=><div className={'leader-row '+(name==='You'?'you':'')} key={name}><b>{rank}</b><span className="leader-avatar">{name[0]}</span><div><strong>{name}</strong><small>{name==='You'?'Your current preview position':'Top member'}</small></div><strong>{score}</strong></div>)}</div></PageShell>;
}
