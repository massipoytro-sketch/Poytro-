import { createClient } from '@supabase/supabase-js';

const tables=['profiles','wallets','offers','conversions','points_transactions','referrals','withdrawals'];

async function readUserTable(client,table,userId){
  const result=await client.from(table).select('*').eq('user_id',userId).limit(25);
  if(!result.error)return result.data||[];
  return [];
}

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const geminiKey=process.env.GEMINI_API_KEY||process.env.GOOGLE_AI_API_KEY;
  const supabaseUrl=process.env.VITE_SUPABASE_URL||process.env.SUPABASE_URL;
  const supabaseKey=process.env.VITE_SUPABASE_PUBLISHABLE_KEY||process.env.VITE_SUPABASE_ANON_KEY||process.env.SUPABASE_ANON_KEY;
  if(!geminiKey)return res.status(503).json({error:'AI is not configured. Add GEMINI_API_KEY to Vercel.'});
  if(!supabaseUrl||!supabaseKey)return res.status(503).json({error:'The existing Supabase connection is not configured on Vercel.'});

  try{
    const auth=req.headers.authorization||'';
    const token=auth.startsWith('Bearer ')?auth.slice(7):'';
    if(!token)return res.status(401).json({error:'Please sign in before using GainiRen AI.'});

    const client=createClient(supabaseUrl,supabaseKey,{auth:{persistSession:false},global:{headers:{Authorization:`Bearer ${token}`}}});
    const {data:{user},error:userError}=await client.auth.getUser(token);
    if(userError||!user)return res.status(401).json({error:'Your session is invalid or expired. Please sign in again.'});

    const {message}=req.body||{};
    if(!message||typeof message!=='string')return res.status(400).json({error:'Message is required'});

    const account={};
    for(const table of tables){
      if(table==='offers'){
        const result=await client.from(table).select('*').limit(25);
        account[table]=result.error?[]:result.data||[];
      }else account[table]=await readUserTable(client,table,user.id);
    }

    const prompt=`You are GainiRen AI, the private support assistant for an authenticated member. Answer in the user's language when possible. Be concise and helpful. Never invent balances, offers, withdrawals, earnings, users, or reward status. Treat database values as factual only when present. If information is missing, clearly say that it is not available. Never reveal access tokens, internal secrets, or sensitive implementation details.\n\nAUTHENTICATED USER DATA:\n${JSON.stringify(account)}\n\nUSER QUESTION:\n${message}`;
    const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
    const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(geminiKey)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.25,maxOutputTokens:600}})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:data?.error?.message||'Gemini request failed'});
    const reply=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('').trim();
    if(!reply)return res.status(502).json({error:'AI returned an empty response'});
    return res.status(200).json({reply});
  }catch(error){return res.status(500).json({error:error?.message||'AI service error'});}
}
