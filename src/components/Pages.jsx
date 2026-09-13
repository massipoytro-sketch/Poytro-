import React,{useState} from 'react';
import {PageShell} from './ui/PageShell';
import {surveys,tasks,games} from '../data/mock';
import OffersPage from '../pages/OffersPage';
import {WithdrawPage,StorePage,LeaderboardPage} from '../pages/RewardsPage';
import {ReferralsPage,ProfilePage,HelpPage,AssistantPage} from '../pages/AccountPages';

const configs={
 surveys:{title:'Surveys',eyebrow:'EARN / SURVEYS',description:'Share your opinion and earn coins for eligible research surveys.',tabs:['All','Popular','Short','High Pay'],data:surveys},
 tasks:{title:'Tasks',eyebrow:'EARN / TASKS',description:'Complete simple actions and collect coins when the task is verified.',tabs:['All','Social Media','App Install','Sign Up'],data:tasks},
 games:{title:'Games',eyebrow:'EARN / GAMES',description:'Play selected games and earn coins as you complete eligible milestones.',tabs:['All','Instant','Puzzle','Arcade'],data:games}
};

function EarnRows({type}){
 const cfg=configs[type]; const [tab,setTab]=useState(cfg.tabs[0]);
 return <PageShell eyebrow={cfg.eyebrow} title={cfg.title} description={cfg.description} action={<button className="secondary">How it works</button>}>
   <div className="filter-bar">{cfg.tabs.map(item=><button key={item} onClick={()=>setTab(item)} className={'filter '+(tab===item?'active':'')}>{item}</button>)}</div>
   <div className="earn-list">{cfg.data.map(item=><article className={'earn-row '+(item.tone||'blue')} key={item.brand+item.title}>
      <div className="earn-icon">{item.icon}</div>
      <div className="earn-copy"><span className="tag">{item.tag||'Available'}</span><h3>{item.brand}</h3><p>{item.title}</p></div>
      <div className="earn-reward"><strong>🪙 {item.reward}</strong><button className="primary small">{item.action||'Start'}</button></div>
   </article>)}</div>
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
