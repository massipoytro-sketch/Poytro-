import { requireSupabase, supabaseConfigured } from './supabaseClient';

const TABLES = ['profiles', 'wallets', 'offers', 'conversions', 'daily_rewards', 'points_transactions', 'referrals', 'withdrawals'];
const first = (row, keys, fallback = null) => { for (const key of keys) if (row && row[key] !== undefined && row[key] !== null) return row[key]; return fallback; };

async function rows(table, userId = null) {
  const client = requireSupabase();
  if (userId) {
    const filtered = await client.from(table).select('*').eq('user_id', userId);
    if (filtered.error) return [];
    return filtered.data || [];
  }
  const result = await client.from(table).select('*');
  if (result.error) throw result.error;
  return result.data || [];
}

export const databaseAdapter = {
  status: supabaseConfigured ? 'configured' : 'missing-env',
  tables: TABLES,
  async getSession(){const {data,error}=await requireSupabase().auth.getSession();if(error)throw error;return data.session;},
  async signIn(email,password){const {data,error}=await requireSupabase().auth.signInWithPassword({email,password});if(error)throw error;return data;},
  async signUp(email,password,metadata={}){const {data,error}=await requireSupabase().auth.signUp({email,password,options:{data:metadata}});if(error)throw error;return data;},
  async signOut(){const {error}=await requireSupabase().auth.signOut();if(error)throw error;},
  async getProfile(userId){const data=await rows('profiles',userId);return data[0]||null;},
  async getWallet(userId){const data=await rows('wallets',userId);return data[0]||null;},
  async getMemberData(userId){const [profile,wallet,offers,conversions,dailyRewards,transactions,referrals,withdrawals]=await Promise.all([this.getProfile(userId),this.getWallet(userId),rows('offers'),rows('conversions',userId),rows('daily_rewards',userId),rows('points_transactions',userId),rows('referrals',userId),rows('withdrawals',userId)]);return {profile,wallet,offers,conversions,dailyRewards,transactions,referrals,withdrawals};},
  async getLeaderboard(){
    const [profiles,wallets]=await Promise.all([rows('profiles'),rows('wallets')]);
    const walletByUser=new Map(wallets.map(w=>[w.user_id||w.profile_id||w.id,w]));
    return profiles.map(p=>{const w=walletByUser.get(p.user_id||p.id)||{};return {...p,...w,score:Number(first(w,['lifetime','lifetime_earnings','total_earned','total_points','points','coins'],0))||0};}).sort((a,b)=>b.score-a.score).slice(0,50);
  },
  async submitWithdrawal({userId,amount,method,address}){
    const client=requireSupabase();
    const candidates=[
      {user_id:userId,amount,method,address,status:'pending'},
      {user_id:userId,points:amount,method,address,status:'pending'},
      {user_id:userId,amount,method,payout_address:address,status:'pending'},
      {user_id:userId,points:amount,payout_method:method,payout_address:address,status:'pending'}
    ];
    let lastError=null;
    for(const payload of candidates){const {data,error}=await client.from('withdrawals').insert(payload).select().maybeSingle();if(!error)return data;lastError=error;}
    throw lastError||new Error('Withdrawal could not be created.');
  },
  normalizeOffer(row){return {...row,brand:first(row,['brand','provider','name','title'],'Offer'),title:first(row,['title','description','name'],'Complete this offer'),reward:Number(first(row,['reward','points','coins','amount'],0))||0,tag:first(row,['tag','category','type'],'Available'),icon:first(row,['icon','logo'],'✦'),tone:first(row,['tone','theme'],'blue')};},
  normalizeProfile(row){return {...row,name:first(row,['name','full_name','username','display_name'],'Member'),email:first(row,['email'],''),avatar:first(row,['avatar_url','avatar'],null)};},
  normalizeWallet(row){return {...row,balance:Number(first(row,['balance','points','coins'],0))||0,pending:Number(first(row,['pending','pending_points','pending_coins'],0))||0,lifetime:Number(first(row,['lifetime','lifetime_earnings','total_earned','total_points'],0))||0};}
};
