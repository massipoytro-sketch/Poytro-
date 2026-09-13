import React,{useState} from 'react';
import {PageShell} from './ui/PageShell';
import OffersPage from '../pages/OffersPage';
import {WithdrawPage,StorePage,LeaderboardPage} from '../pages/RewardsPage';
import {ReferralsPage,ProfilePage,HelpPage,AssistantPage} from '../pages/AccountPages';
import {useMember} from '../app/MemberContext';

const configs={
 surveys:{title:'Surveys',eyebrow:'EARN / SURVEYS',description:'Share your opinion and earn coins for eligible research surveys.'},
 tasks:{title:'Tasks',eyebrow:'EARN / TASKS',description:'Complete simple actions and collect coins when the task is verified.'},
 games:{title:'Games',eyebrow:'EARN / GAMES',description:'Play selected games and earn coins as you complete eligible milestones.'}
};

function EarnRows({type}){
 const cfg=configs[type]; const [tab,setTab]=useState('All'); const {member}=useMember();
 const tabs=['All','Popular','Short','High Pay'];
 const source=(member?.offers||[]).filter(row=>{const kind=String(row.type||row.category||row.kind||'').toLowerCase();return type==='surveys'?kind.includes('survey'):type==='games'?kind.includes('game'):kind.includes('task')||!kind});
 const data=source.map((row,i)=>({...row,brand:row.brand||row.provider||row.name||'Opportunity',title:row.title||row.description||'Complete this opportunity',reward:Number(row.reward??row.points??row.coins??row.amount??0),icon:row.icon||'✦',tag:row.tag||row.category||'Available',tone:row.tone||['blue','purple','green'][i%3]}));
 const filtered=tab==='All'?data:data.filter(x=>String(x.tag).toLowerCase().includes(tab.toLowerCase()));
 return <PageShell eyebrow={cfg.eyebrow} title={cfg.title} description={cfg.description} action={<button className="secondary">How it works</button>}>
   <div className="filter-bar">{tabs.map(item=><button key={item} onClick={()=>setTab(item)} className={'filter '+(tab===item?'active':'')}>{item}</button>)}</div>
   <div className="earn-list">{filtered.length?filtered.map((item,i)=><article className={'earn-row '+item.tone} key={item.id||item.brand+i}><div className="earn-icon">{item.icon}</div><div className="earn-copy"><span className="tag">{item.tag}</span><h3>{item.brand}</h3><p>{item.title}</p></div><div className="earn-reward"><strong>🪙 {item.reward.toLocaleString()}</strong><button className="primary small">Start</button></div></article>):<div className="empty-state">No live {cfg.title.toLowerCase()} are available for your account right now.</div>}</div>
 </PageShell>;
}

export function StandardPage({type}){
 if(type==='offers') return <OffersPage/>;
 if(type==='withdraw') return <WithdrawPage/>;
 if(type==='store') return <StorePage/>;
 if(type==='leaderboard') return <LeaderboardPage/>;
 if(type==='referrals') return <ReferralsPage/>;
 if(type==='profile') return <ProfilePage/>;
 if(type==='help') return <HelpPage/>;
 if(type==='assistant') return <AssistantPage/>;
 return <EarnRows type={configs[type]?type:'tasks'}/>;
}
