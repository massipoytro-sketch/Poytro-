import React from 'react';
import {PageShell,FilterBar} from './ui/PageShell';
import OffersPage from '../pages/OffersPage';
import {WithdrawPage,StorePage,LeaderboardPage} from '../pages/RewardsPage';
import {ReferralsPage,ProfilePage,HelpPage,AssistantPage} from '../pages/AccountPages';

const pageData={
 surveys:['Surveys','Answer research surveys and earn points for your time.'],
 tasks:['Tasks','Small actions with clear rewards and clear progress.'],
 games:['Games','Play selected games and collect rewards.']
};

function ActivityPage({type}){
 const [title,description]=pageData[type]||['Earn','Explore available opportunities.'];
 return <PageShell eyebrow={`EARN / ${type.toUpperCase()}`} title={title} description={description} action={<button className="secondary">How it works</button>}>
  <FilterBar items={['All','Highest reward','Quick','New']}/>
  <div className="resource-grid">
   {['Featured opportunity','Quick opportunity','New opportunity','Recommended'].map((name,i)=><article className="resource-card" key={name}>
    <div className="resource-brand">{type[0].toUpperCase()}</div>
    <div><span className="tag">{i===0?'Featured':'Available'}</span><h3>{name}</h3><p>Provider content will be loaded from the connected rewards system.</p></div>
    <div className="resource-footer"><strong>+{850-i*120} <i>pts</i></strong><button className="primary small">View</button></div>
   </article>)}
  </div>
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
 return <ActivityPage type={type}/>;
}
