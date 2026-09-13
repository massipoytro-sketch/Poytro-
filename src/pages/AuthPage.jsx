import React from 'react';

export default function AuthPage({mode='login',go}){
  const register=mode==='register';
  const forgot=mode==='forgot';
  return <div className="auth-page"><div className="auth-glow"/><div className="auth-card"><button className="auth-brand" onClick={()=>go('landing')}><span className="brand-mark">G</span><b>GainiRen</b></button><span className="eyebrow">{forgot?'ACCOUNT RECOVERY':register?'CREATE YOUR ACCOUNT':'WELCOME BACK'}</span><h1>{forgot?'Reset your password':register?'Start earning with GainiRen':'Sign in to GainiRen'}</h1><p>{forgot?'Enter your email and we will guide you through the recovery process.':register?'Join the premium rewards experience.':'Continue your reward journey.'}</p>{!forgot&&register&&<input placeholder="Full name"/>}<input type="email" placeholder="Email address"/>{!forgot&&<input type="password" placeholder="Password"/>}<button className="primary auth-submit">{forgot?'Send recovery link':register?'Create account':'Log in'} <span>→</span></button><div className="auth-links">{!register&&!forgot&&<button onClick={()=>go('forgot')}>Forgot password?</button>}{register?<span>Already have an account? <button onClick={()=>go('login')}>Log in</button></span>:<span>New to GainiRen? <button onClick={()=>go('register')}>Create account</button></span>}</div></div></div>;
}
