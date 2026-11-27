// Supabase client + Firestore-style compatibility layer for the existing SuperShop scripts.
const sb = window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);
const TABLES = { products:'products', orders:'orders', offers:'offers', cards:'recharge_cards' };
const MAP = {
 products:{ts:'created_at'}, orders:{name:'customer_name',ts:'created_at'},
 offers:{owner:'owner_name',name:'item_name',cond:'condition',price:'asking_price',buy:'buy_price',ts:'created_at',ts2:'reviewed_at'},
 cards:{usedBy:'used_by',usedAt:'used_at',ts:'created_at'}
};
function mapped(table,obj={}){const m=MAP[table]||{},o={};for(const [k,v] of Object.entries(obj)){const key=m[k]||k;o[key]=(['created_at','reviewed_at'].includes(key)&&typeof v==='number')?new Date(v).toISOString():v;}return o;}
function unmapped(table,obj={}){const m=MAP[table]||{},rev=Object.fromEntries(Object.entries(m).map(([k,v])=>[v,k]));const o={};for(const [k,v] of Object.entries(obj)){const key=rev[k]||k;o[key]=(['created_at','reviewed_at'].includes(k)&&v)?new Date(v).getTime():v;}return o;}
function snap(docs){const arr=docs.map(d=>({id:d.id,data:()=>unmapped(d._table,d),ref:d._ref}));return {docs:arr,empty:!arr.length,size:arr.length,forEach:fn=>arr.forEach(fn),docChanges:()=>arr.map(doc=>({type:'added',doc}))};}
function wrapDoc(table,row){const id=row.id||row.code;return {...row,id,_table:table,_ref:docRef(table,id)};}
function docRef(table,id){const idField=table==='cards'?'code':'id';return {get:async()=>{let {data,error}=await sb.from(TABLES[table]).select('*').eq(idField,id).maybeSingle();if(error)throw error;return {exists:!!data,data:()=>unmapped(table,data),id,ref:docRef(table,id)}},update:async obj=>{let {error}=await sb.from(TABLES[table]).update(mapped(table,obj)).eq(idField,id);if(error)throw error;},set:async obj=>{let {error}=await sb.from(TABLES[table]).upsert(mapped(table,table==='cards'?{...obj,code:id}:{...obj,id}));if(error)throw error;},delete:async()=>{let {error}=await sb.from(TABLES[table]).delete().eq(idField,id);if(error)throw error;}};}
function collection(table){let filters=[],order=null;
 const q={where:(field,op,value)=>{filters.push([field,op,value]);return q;},orderBy:(field,direction='asc')=>{order=[field,direction];return q;},
 add:async obj=>{let {data,error}=await sb.from(TABLES[table]).insert(mapped(table,obj)).select('id').single();if(error)throw error;return {id:data.id,ref:docRef(table,data.id)};},
 doc:id=>docRef(table,id), get:async()=>{let query=sb.from(TABLES[table]).select('*');for(const [f,op,v] of filters){const fld=(MAP[table]||{})[f]||f;query=op==='=='?query.eq(fld,v):query; }if(order){let fld=(MAP[table]||{})[order[0]]||order[0];query=query.order(fld,{ascending:order[1]!=='desc'});}let {data,error}=await query;if(error)throw error;return snap((data||[]).map(row=>wrapDoc(table,row)));},
 onSnapshot:callback=>{let active=true,last='';const poll=async()=>{try{const s=await q.get(),signature=JSON.stringify(s.docs.map(d=>d.data()));if(active&&signature!==last){last=signature;callback(s);}}catch(err){console.warn(err)}};poll();const timer=setInterval(poll,5000);return()=>{active=false;clearInterval(timer);};}};
 return q;}
const auth={signInWithEmailAndPassword:(email,password)=>sb.auth.signInWithPassword({email,password}),signOut:()=>sb.auth.signOut(),onAuthStateChanged:cb=>{sb.auth.getSession().then(({data})=>cb(data.session?.user||null));const {data}=sb.auth.onAuthStateChange((_event,session)=>cb(session?.user||null));return()=>data.subscription.unsubscribe();}};
// Atomic recharge redemption RPC, server-side validation is required for secure wallet crediting.
async function redeemCard(code,ownerName){const {data,error}=await sb.rpc('redeem_card',{card_code:code,redeemer:ownerName});if(error)throw error;return data;}
