export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const key=process.env.GEMINI_API_KEY||process.env.GOOGLE_AI_API_KEY;
 if(!key) return res.status(503).json({error:'AI is not configured on Vercel yet. Add GEMINI_API_KEY to the project environment.'});
 try{
  const {message,context}=req.body||{};
  if(!message||typeof message!=='string') return res.status(400).json({error:'Message is required'});
  const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
  const prompt=`You are GainiRen AI, the support assistant inside a rewards platform. Answer clearly and briefly. Never invent balances, offers, withdrawals, earnings, users, or reward status. Use the supplied account context only when relevant. If data is missing, say so. Do not expose internal IDs or secrets.\n\nACCOUNT CONTEXT:\n${JSON.stringify(context||{})}\n\nUSER QUESTION:\n${message}`;
  const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.3,maxOutputTokens:500}})});
  const data=await response.json();
  if(!response.ok) return res.status(response.status).json({error:data?.error?.message||'Gemini request failed'});
  const reply=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('').trim();
  if(!reply) return res.status(502).json({error:'AI returned an empty response'});
  return res.status(200).json({reply});
 }catch(error){return res.status(500).json({error:error?.message||'AI service error'});}
}
