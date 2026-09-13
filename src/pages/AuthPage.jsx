import React,{useState} from 'react';
import {databaseAdapter} from '../services/databaseAdapter';

export default function AuthPage({mode='login',go}){
 const register=mode==='register'; const forgot=mode==='forgot';
 const [remember,setRemember]=useState(false);
 const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
 const [busy,setBusy]=useState(false); const [message,setMessage]=useState(''); const [error,setError]=useState('');
 const submit=async()=>{
   setBusy(true); setError(''); setMessage('');
   try{
     if(forgot){
       const {supabase}=await import('../services/supabaseClient');
       const client=supabase;
       if(!client) throw new Error('Supabase is not configured.');
       const {error:resetError}=await client.auth.resetPasswordForEmail(email,{redirectTo:`${location.origin}/#profile`});
       if(resetError) throw resetError;
       setMessage('Recovery email sent. Check your inbox.');
     } else if(register){
       const data=await databaseAdapter.signUp(email,password,{name,full_name:name});
       if(!data.session) setMessage('Account created. Check your email if confirmation is enabled.');
       else go('dashboard');
     } else {
       await databaseAdapter.signIn(email,password);
       go('dashboard');
     }
   }catch(e){setError(e?.message||'Something went wrong.');}
   finally{setBusy(false)}
 };
 return <div className="auth-page"><div className="auth-glow"/><div className="auth-card">
   <button className="auth-brand" onClick={()=>go('landing')}><span className="brand-mark">G</span><b>GainiRen</b></button>
   {!forgot&&<div className="auth-tabs"><button className={!register?'active':''} onClick={()=>go('login')}>Login</button><button className={register?'active':''} onClick={()=>go('register')}>Sign Up</button></div>}
   <span className="eyebrow">{forgot?'ACCOUNT RECOVERY':register?'CREATE YOUR ACCOUNT':'WELCOME BACK'}</span>
   <h1>{forgot?'Reset your password':register?'Create your account':'Welcome Back!'}</h1>
   <p>{forgot?'Enter your email and we will guide you through the recovery process.':register?'Join GainiRen and start earning coins.':'Login to your account to continue'}</p>
   {register&&<input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" autoComplete="name"/>}
   <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" autoComplete="email"/>
   {!forgot&&<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" autoComplete={register?'new-password':'current-password'}/>} 
   {!forgot&&!register&&<div className="auth-options"><label><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/><span>Remember me</span></label><button onClick={()=>go('forgot')}>Forgot password?</button></div>}
   {error&&<div className="auth-error">{error}</div>}
   {message&&<div className="auth-message">{message}</div>}
   <button disabled={busy} className="primary auth-submit" onClick={submit}>{busy?'Please wait…':forgot?'Send recovery link':register?'Sign Up':'Login'} <span>→</span></button>
   {!forgot&&<><div className="auth-divider"><span>or continue with</span></div><div className="social-auth"><button type="button" onClick={()=>setError('Google sign-in will be enabled when its provider is configured in the existing Supabase project.')}><b className="google-g">G</b>Google</button><button type="button" onClick={()=>setError('Apple sign-in will be enabled when its provider is configured in the existing Supabase project.')}><b>●</b>Apple</button></div></>}
   <div className="auth-links">{register?<span>Already have an account? <button onClick={()=>go('login')}>Login</button></span>:!forgot?<span>Don't have an account? <button onClick={()=>go('register')}>Sign up</button></span>:<span>Remember your password? <button onClick={()=>go('login')}>Login</button></span>}</div>
 </div></div>;
}
