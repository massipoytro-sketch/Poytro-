import React,{useEffect} from 'react';

export default function SplashPage({go}){
 useEffect(()=>{const t=setTimeout(()=>go('login'),1700);return()=>clearTimeout(t)},[go]);
 return <div className="splash-page"><div className="splash-grid"/><div className="splash-logo"><span>G</span><strong>GainiRen</strong><small>Play • Complete • Earn</small></div><p>Turn your time<br/>into real rewards!</p><div className="splash-progress"><i/></div></div>;
}
