import React,{useEffect,useState} from 'react';
import {PageShell} from '../components/ui/PageShell';
import {rewards,withdrawMethods} from '../data/mock';
import {useMember} from '../app/MemberContext';
import {databaseAdapter} from '../services/databaseAdapter';

const money=n=>Number(n||0).toLocaleString();

export function WithdrawPage(){
 const [tab,setTab]=useState('Method'); const [amount,setAmount]=useState(''); const [method,setMethod]=useState(''); const [address,setAddress]=useState(''); const [busy,setBusy]=useState(false); const [notice,setNotice]=useState(''); const [error,setError]=useState('');
 const {member,user}=useMember(); const wallet=databaseAdapter.normalizeWallet(member?.wallet||{}); const history=member?.withdrawals||[];
 const submit=async()=>{setBusy(true);setNotice('');setError('');try{if(!amount||Number(amount)<=0)throw new Error('Enter a valid withdrawal amount.');if(Number(amount)>wallet.balance)throw new Error('Withdrawal amount exceeds your available balance.');if(!method)throw new Error('Choose a payout method.');const result=await databaseAdapter.submitWithdrawal({userId:user.id,amount:Number(amount),method,address});setNotice(`Withdrawal request created${result?.id?' successfully.':''}`);setAmount('');setAddress('');setMethod('');}catch(e){setError(e.message||'Could not create withdrawal.')}finally{setBusy(false)}};
 return <PageShell eyebrow="REWARDS / WITHDRAW" title="Withdraw" description="Choose a payout method for your eligible balance." action={<button className="secondary" onClick={()=>setTab('History')}>History</button>}>
  <div className="filter-bar withdraw-tabs">{['Method','History'].map(x=><button key={x} onClick={()=>setTab(x)} className={'filter '+(tab===x?'active':'')}>{x}</button>)}</div>
  {tab==='Method'?<div className="withdraw-layout"><div className="withdraw-balance"><small>YOUR BALANCE</small><strong>🪙 {money(wallet.balance)}</strong><span>Live balance from your existing account.</span><input value={amount} onChange={e=>setAmount(e.target.value)} type="number" min="1" placeholder="Amount"/><select value={method} onChange={e=>setMethod(e.target.value)}><option value="">Choose method</option>{withdrawMethods.map(m=><option key={m.title} value={m.title}>{m.title}</option>)}</select><input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Payout address / account"/><button disabled={busy} className="primary" onClick={submit}>{busy?'Submitting…':'Continue'}</button>{notice&&<small className="auth-message">{notice}</small>}{error&&<small className="auth-error">{error}</small>}</div><div className="method-grid">{withdrawMethods.map(m=><article className="method" key={m.title} onClick={()=>setMethod(m.title)}><span className="method-icon">{m.icon}</span><div><h3>{m.title}</h3><p>{m.detail}</p></div><span className="method-arrow">›</span></article>)}</div></div>:<div className="activity-card">{history.length?history.map((row,i)=><div className="activity-row" key={row.id||i}><span className="activity-icon">↗</span><div><b>{row.method||row.payout_method||'Withdrawal'}</b><small>{row.status||'pending'}</small></div><strong>🪙 {money(row.amount??row.points)}</strong><small className="time">{row.created_at?new Date(row.created_at).toLocaleDateString():''}</small></div>):<div className="empty-state">No withdrawal history yet.</div>}</div>}
 </PageShell>;
}

export function StorePage(){
 const [tab,setTab]=useState('All'); const tabs=['All','Gift Cards','Crypto','More'];
 return <PageShell eyebrow="REWARDS / STORE" title="Rewards Store" description="Redeem eligible coins for supported rewards." action={<button className="secondary">My redemptions</button>}>
  <div className="filter-bar">{tabs.map(x=><button key={x} onClick={()=>setTab(x)} className={'filter '+(tab===x?'active':'')}>{x}</button>)}</div>
  <div className="earn-list"><div className="empty-state">The existing database currently has no dedicated rewards-inventory table. No fake store inventory is being shown.</div>{rewards.slice(0,0).map(r=><article key={r.title}/>)}</div>
 </PageShell>;
}

export function LeaderboardPage(){
 const {user}=useMember(); const [tab,setTab]=useState('Weekly'); const [people,setPeople]=useState([]); const [loading,setLoading]=useState(true);
 useEffect(()=>{databaseAdapter.getLeaderboard().then(setPeople).catch(()=>setPeople([])).finally(()=>setLoading(false))},[]);
 return <PageShell eyebrow="REWARDS / LEADERBOARD" title="Leaderboard" description="Live leaderboard data from the existing member and wallet tables."><div className="filter-bar">{['Weekly','Monthly','All Time'].map(x=><button key={x} onClick={()=>setTab(x)} className={'filter '+(tab===x?'active':'')}>{x}</button>)}</div><div className="leaderboard-list">{loading?<div className="empty-state">Loading leaderboard…</div>:people.length?people.map((p,i)=>{const name=p.name||p.full_name||p.username||'Member';return <div className={'leader-row '+(p.user_id===user?.id||p.id===user?.id?'you':'')} key={p.user_id||p.id||i}><b>{i+1}</b><span className="leader-avatar">{name[0]}</span><div><strong>{name}</strong><small>{p.user_id===user?.id||p.id===user?.id?'You':'Member'}</small></div><strong>{money(p.score)} pts</strong></div>}):<div className="empty-state">No leaderboard data is available.</div>}</div></PageShell>;
}
