import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import {databaseAdapter} from '../services/databaseAdapter';
import {supabase} from '../services/supabaseClient';

const MemberContext=createContext(null);

export function MemberProvider({children}){
 const [session,setSession]=useState(null);
 const [member,setMember]=useState(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const refresh=async(nextSession=session)=>{
   if(!nextSession?.user){setMember(null);return null;}
   try{setError('');const data=await databaseAdapter.getMemberData(nextSession.user.id);setMember(data);return data;}
   catch(e){setError(e?.message||'Could not load account data.');return null;}
 };
 useEffect(()=>{
   let active=true;
   if(!supabase){setLoading(false);return()=>{active=false}};
   databaseAdapter.getSession().then(async s=>{if(!active)return;setSession(s);await refresh(s);setLoading(false)}).catch(e=>{if(active){setError(e.message);setLoading(false)}});
   const {data:{subscription}}=supabase.auth.onAuthStateChange(async (_event,s)=>{setSession(s);if(s) await refresh(s);else setMember(null);});
   return()=>{active=false;subscription.unsubscribe()};
 },[]);
 const value=useMemo(()=>({session,user:session?.user||null,member,loading,error,refresh,configured:databaseAdapter.status==='configured'}),[session,member,loading,error]);
 return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>;
}
export function useMember(){const value=useContext(MemberContext);if(!value)throw new Error('useMember must be used inside MemberProvider');return value;}
