import React,{useEffect,useState} from 'react';
import {Sidebar,Topbar,MobileNav} from '../components/Navigation';
import {Dashboard} from '../components/Dashboard';
import {StandardPage} from '../components/Pages';
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';

export default function App(){
  const [page,setPage]=useState(location.hash.slice(1)||'dashboard');
  const go=id=>{setPage(id);location.hash=id};
  useEffect(()=>{const sync=()=>setPage(location.hash.slice(1)||'dashboard');window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[]);
  const publicPage=['landing','login','register','forgot'].includes(page);
  if(publicPage){return page==='landing'?<LandingPage go={go}/>:<AuthPage mode={page} go={go}/>}
  return <div className="app-shell"><Sidebar page={page} setPage={go}/><div className="main-shell"><Topbar page={page}/><main className="content">{page==='dashboard'?<Dashboard go={go}/>:<StandardPage type={page}/>}</main><MobileNav page={page} setPage={go}/></div></div>;
}
