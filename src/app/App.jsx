import React,{useEffect,useState} from 'react';
import {Sidebar,Topbar,MobileNav} from '../components/Navigation';
import {Dashboard} from '../components/Dashboard';
import {StandardPage} from '../components/Pages';
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import SplashPage from '../pages/SplashPage';
import {MemberProvider,useMember} from './MemberContext';

function AppContent(){
 const [page,setPage]=useState(location.hash.slice(1)||'splash');
 const {session,loading}=useMember();
 const go=id=>{setPage(id);location.hash=id};
 useEffect(()=>{const sync=()=>setPage(location.hash.slice(1)||'splash');window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[]);
 const publicPage=['splash','landing','login','register','forgot'].includes(page);
 useEffect(()=>{if(loading||publicPage)return;if(!session)go('login')},[loading,session,page,publicPage]);
 if(publicPage){if(page==='splash')return <SplashPage go={go}/>;return page==='landing'?<LandingPage go={go}/>:<AuthPage mode={page} go={go}/>}
 if(loading)return <div className="app-loading"><div><span className="brand-mark">G</span><b>GainiRen</b><small>Loading your account…</small></div></div>;
 if(!session)return null;
 return <div className="app-shell"><Sidebar page={page} setPage={go}/><div className="main-shell"><Topbar page={page}/><main className="content">{page==='dashboard'?<Dashboard go={go}/>:<StandardPage type={page}/>}</main><MobileNav page={page} setPage={go}/></div></div>;
}
export default function App(){return <MemberProvider><AppContent/></MemberProvider>}
