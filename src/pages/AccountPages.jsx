import React,{useState} from 'react';
import {PageShell} from '../components/ui/PageShell';
import {useMember} from '../app/MemberContext';
import {databaseAdapter} from '../services/databaseAdapter';
import {supabase} from '../services/supabaseClient';

const num=n=>Number(n||0).toLocaleString();

export function ReferralsPage(){
 const {member,user}=useMember(); const referrals=member?.referrals||[]; const [copied,setCopied]=useState(false);
 const link=`${location.origin}/#register?ref=${encodeURIComponent(user?.id||'')}`;
 const copy=async()=>{try{await navigator.clipboard.writeText(link);setCopied(true);setTimeout(()=>setCopied(false),1500)}catch{}};
 return <PageShell eyebrow="ACCOUNT / REFERRALS" title="Referrals" description="Invite friends and track eligible referral activity." action={<button className="primary" onClick={copy}>{copied?'Copied':'Share invite'}</button>}><div className="referral-card"><div><span className="eyebrow">INVITE FRIENDS</span><strong>Your referral link</strong><p>Share your personal link and your eligible referrals will appear here.</p><div className="ref-link"><span>{link}</span><button className="secondary" onClick={copy}>{copied?'Copied':'Copy'}</button></div></div><div className="ref-stats"><span><b>{num(referrals.length)}</b>Total Referrals</span><span><b>{num(referrals.reduce((s,r)=>s+Number(r.reward||r.points||r.amount||0),0))}</b>Total Earned</span></div><div className="ref-levels"><h3>Referral activity</h3>{referrals.length?referrals.slice(0,6).map((r,i)=><div key={r.id||i}><span>{r.status||r.level||'Referral'}</span><b>+{num(r.reward||r.points||r.amount||0)}</b></div>):<div><span>No referrals recorded yet.</span><b>—</b></div>}</div></div></PageShell>
}

export function ProfilePage(){
 const {member,user}=useMember(); const profile=member?.profile?databaseAdapter.normalizeProfile(member.profile):{}; const wallet=member?.wallet?databaseAdapter.normalizeWallet(member.wallet):{};
 return <PageShell eyebrow="ACCOUNT / PROFILE" title="Profile" description="Your live member profile and account information."><div className="profile-card"><div className="big-avatar">{(profile.name||'M').slice(0,1).toUpperCase()}</div><div><h2>{profile.name||'Member'}</h2><p>{profile.email||user?.email||'Account email'}</p></div><div className="profile-balance"><span>🪙 {num(wallet.balance)}</span><small>Balance</small><span>♛ {num(wallet.lifetime)}</span><small>Lifetime</small></div></div><div className="settings-list"><button><b>♙ Account ID</b><span>{user?.id||'—'}</span><i>›</i></button><button><b>✉ Email</b><span>{profile.email||user?.email||'—'}</span><i>›</i></button><button><b>◐ Session</b><span>Authenticated with Supabase</span><i className="toggle on">●</i></button><button><b>⌁ Privacy & Security</b><span>Protected account session</span><i>›</i></button><button onClick={()=>databaseAdapter.signOut().then(()=>{location.hash='login'})}><b>↪ Sign out</b><span>End this account session</span><i>›</i></button></div></PageShell>
}

const faqs=['How to earn coins?','When will I get my rewards?','How to withdraw money?','Why is my offer pending?'];
export function HelpPage(){return <PageShell eyebrow="SUPPORT / HELP" title="Help Center" description="Find quick answers and contact support when you need help."><div className="help-search">⌕ <span>Search for help...</span></div><div className="faq-list"><h3>Frequently Asked Questions</h3>{faqs.map(q=><button key={q}>{q}<span>›</span></button>)}</div><div className="contact-card"><h3>Contact Us</h3><div>✉ <span>Support through your configured platform channel</span></div><button className="primary small">● Live Chat</button></div></PageShell>}

export function AssistantPage(){
 const {member,user}=useMember(); const [text,setText]=useState(''); const [busy,setBusy]=useState(false); const [messages,setMessages]=useState([{role:'assistant',content:'Hello! 👋 I am GainiRen AI. I am connected to your signed-in GainiRen account and can help with your balance, offers, rewards, referrals and withdrawals.'}]);
 const send=async(value=text)=>{
   if(!value.trim()||busy)return;
   setText('');setMessages(m=>[...m,{role:'user',content:value}]);setBusy(true);
   try{
     if(!supabase)throw new Error('Supabase is not configured.');
     const {data:{session}}=await supabase.auth.getSession();
     if(!session?.access_token)throw new Error('Your session expired. Please sign in again.');
     const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},body:JSON.stringify({message:value})});
     const data=await res.json();if(!res.ok)throw new Error(data.error||'AI request failed');
     setMessages(m=>[...m,{role:'assistant',content:data.reply}]);
   }catch(e){setMessages(m=>[...m,{role:'assistant',content:`I could not reach GainiRen AI: ${e.message}`}]);}
   finally{setBusy(false)}
 };
 return <PageShell eyebrow="SUPPORT / GAINIREN AI" title="GainiRen AI" description="A private AI assistant using your authenticated account data from the existing database."><div className="chat"><div className="ai-head"><span className="ai-orb">✦</span><div><b>GainiRen AI</b><small>{busy?'Reading your account and thinking…':'Online • connected to your account'}</small></div></div><div className="chat-history">{messages.map((m,i)=><div className={'bubble '+(m.role==='user'?'user':'ai')} key={i}>{m.content}</div>)}</div><div className="chat-suggestions"><button onClick={()=>send('How can I earn more coins?')}>How can I earn more coins?</button><button onClick={()=>send('What offers are available for me?')}>What offers are available for me?</button><button onClick={()=>send('Explain my current balance')}>Explain my current balance</button></div><div className="chat-input"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type a message..."/><button disabled={busy} className="primary" onClick={()=>send()}>↗</button></div></div></PageShell>
}
