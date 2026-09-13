import React,{useState} from 'react';

export default function AuthPage({mode='login',go}){
 const register=mode==='register'; const forgot=mode==='forgot'; const [remember,setRemember]=useState(false);
 return <div className="auth-page"><div className="auth-glow"/><div className="auth-card">
   <button className="auth-brand" onClick={()=>go('landing')}><span className="brand-mark">G</span><b>GainiRen</b></button>
   {!forgot&&<div className="auth-tabs"><button className={!register?'active':''} onClick={()=>go('login')}>Login</button><button className={register?'active':''} onClick={()=>go('register')}>Sign Up</button></div>}
   <span className="eyebrow">{forgot?'ACCOUNT RECOVERY':register?'CREATE YOUR ACCOUNT':'WELCOME BACK'}</span>
   <h1>{forgot?'Reset your password':register?'Create your account':'Welcome Back!'}</h1>
   <p>{forgot?'Enter your email and we will guide you through the recovery process.':register?'Join GainiRen and start earning coins.':'Login to your account to continue'}</p>
   {register&&<input placeholder="Name"/>}
   <input type="email" placeholder="Email or Username"/>
   {!forgot&&<input type="password" placeholder="Password"/>}
   {!forgot&&!register&&<div className="auth-options"><label><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/><span>Remember me</span></label><button onClick={()=>go('forgot')}>Forgot password?</button></div>}
   <button className="primary auth-submit">{forgot?'Send recovery link':register?'Sign Up':'Login'} <span>→</span></button>
   {!forgot&&<><div className="auth-divider"><span>or continue with</span></div><div className="social-auth"><button><b className="google-g">G</b>Google</button><button><b>●</b>Apple</button></div></>}
   <div className="auth-links">{register?<span>Already have an account? <button onClick={()=>go('login')}>Login</button></span>:!forgot?<span>Don't have an account? <button onClick={()=>go('register')}>Sign up</button></span>:<span>Remember your password? <button onClick={()=>go('login')}>Login</button></span>}</div>
 </div></div>;
}
