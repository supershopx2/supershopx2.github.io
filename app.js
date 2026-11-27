const P = {
 car:'<path d="M4 16v-4l2-5h12l2 5v4zM4 12h16"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/>',
 ball:'<circle cx="12" cy="12" r="9"/><path d="M12 7l4 3-1.5 5h-5L8 10zM12 3v4M16 10l4-1M14.5 15l3 4M9.5 15l-3 4M8 10L4 9"/>',
 bot:'<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 8V5M9 13v1M15 13v1M9 17h6"/><circle cx="12" cy="4" r="1"/>',
 blocks:'<rect x="3" y="12" width="8" height="8" rx="1"/><rect x="13" y="12" width="8" height="8" rx="1"/><rect x="8" y="4" width="8" height="8" rx="1"/>',
 gun:'<path d="M3 9h13l3 2v3h-5l-1 4H8l1-4H3z"/>',
 balloon:'<ellipse cx="12" cy="9" rx="6" ry="7"/><path d="M12 16l-1 3h2zM12 19q-2 1 0 3"/>',
 mask:'<path d="M4 8c0-2 3-3 8-3s8 1 8 3v5c0 4-3 7-8 7s-8-3-8-7z"/><path d="M6 11h4v2H6zM14 11h4v2h-4zM9 17q3 2 6 0"/>',
 spray:'<rect x="7" y="10" width="9" height="11" rx="2"/><path d="M9 10V6h5v4M14 6h3M19 4l1-1M19 7h2M19 10l1 1"/>',
 scent:'<path d="M12 2v3M9 5h6l1 4H8z"/><rect x="6" y="9" width="12" height="12" rx="3"/><path d="M12 13q-2 3 0 5 2-2 0-5"/>',
 bear:'<circle cx="12" cy="13" r="7"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="6.5" r="2.5"/><circle cx="12" cy="15" r="2"/><path d="M9.5 11v.5M14.5 11v.5"/>',
 mirror:'<ellipse cx="12" cy="9" rx="6" ry="7"/><path d="M12 16v6M9 22h6M9 6q1-1.5 3-1.5"/>',
 watch:'<rect x="7" y="7" width="10" height="10" rx="3"/><path d="M9 7l1-4h4l1 4M9 17l1 4h4l1-4M12 10v2l1.5 1"/>',
 bracelet:'<ellipse cx="12" cy="12" rx="9" ry="6"/><ellipse cx="12" cy="12" rx="5" ry="2.5"/><circle cx="12" cy="18" r="1"/>',
 case:'<rect x="7" y="2" width="10" height="20" rx="3"/><circle cx="10.5" cy="6" r="1.5"/>',
 charger:'<path d="M9 2v4M15 2v4M7 6h10v5a5 5 0 0 1-10 0zM12 16v3q0 3 4 3"/>',
 scooter:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17h5l3-7h3M14 10l-1-5h3M9 17l2-5h3"/>',
 gel:'<path d="M12 3q6 7 6 11a6 6 0 0 1-12 0q0-4 6-11z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
 tag:'<path d="M3 12V3h9l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 shop:'<path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0"/>',
 laptop:'<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
 card:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
 wallet:'<path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l2-3h12M16 14h2"/>',
 on:'<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
 off:'<path d="M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6"/>',
 truck:'<path d="M2 6h11v10H2zM13 9h4l3 3v4h-7"/><circle cx="6" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>',
 check:'<path d="M4 12l5 5L20 6"/>', bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'
};
const ico = (n, s = 24) => `<svg class="ico" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; };

// الأصوات (تتولّد بالكود بدون ملفات)
let AC, muted = ls("ss_mute") === "1";
function tone(f, d = .1, t = "square", v = .05, w = 0) {
  if (muted) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain(), s = AC.currentTime + w;
    o.type = t; o.frequency.value = f; o.connect(g); g.connect(AC.destination);
    g.gain.setValueAtTime(v, s); g.gain.exponentialRampToValueAtTime(.001, s + d); o.start(s); o.stop(s + d);
  } catch (e) {}
}
const sfx = {
  click: () => tone(520, .06),
  add: () => { tone(660, .08); tone(880, .1, "square", .05, .08); },
  ok: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .16, "triangle", .08, i * .1)),
  err: () => tone(150, .3, "sawtooth"),
  coin: () => { tone(988, .07); tone(1319, .2, "square", .05, .07); }
};
document.addEventListener("click", e => { if (e.target.closest("button")) sfx.click(); });

// Firebase
let db = null;
if (CONFIG.firebase.apiKey && window.firebase) { firebase.initializeApp(CONFIG.firebase); db = firebase.firestore(); }

// الرصيد بالسنتات
const getBal = () => parseInt(ls("ss_bal") || "0", 10) || 0;
const fmt = c => "$" + (c / 100).toFixed(2);
function addBal(c) { ls("ss_bal", String(getBal() + c)); renderBal(); }
function renderBal() { const e = document.getElementById("bal"); if (e) e.textContent = fmt(getBal()); }
let NAME = ls("ss_name");

function toast(m, bad) {
  const t = document.getElementById("toast"); t.textContent = m; t.classList.add("show");
  bad ? sfx.err() : 0; clearTimeout(toast.i); toast.i = setTimeout(() => t.classList.remove("show"), 2800);
}
function modal(html) {
  const m = document.createElement("div"); m.className = "modal";
  m.innerHTML = `<div class="box">${html}</div>`; document.body.appendChild(m); return m;
}
function askName() {
  if (NAME) return;
  const m = modal(`<h2>أهلاً بك في SuperShop</h2><p>شنو اسمك؟</p><input id="nm" maxlength="20" autocomplete="off"><button class="go" id="okn">يلا ندخل</button>`);
  m.querySelector("#okn").onclick = () => {
    const v = m.querySelector("#nm").value.trim(); if (!v) return toast("اكتب اسمك أول", 1);
    NAME = v; ls("ss_name", v); m.remove(); sfx.ok(); document.querySelectorAll(".who").forEach(e => e.textContent = v);
  };
}
function redeemUI() {
  const m = modal(`<h2>شحن بطاقة</h2><p>اكتب رمز البطاقة اللي أعطاك إياها أخوك</p><input id="cd" dir="ltr" maxlength="12" autocomplete="off"><button class="go" id="rd">اشحن</button><button id="cx">إلغاء</button>`);
  m.querySelector("#cx").onclick = () => m.remove();
  m.querySelector("#rd").onclick = async () => {
    const code = m.querySelector("#cd").value.trim().toUpperCase();
    if (!db) return toast("الموقع مو مربوط بقاعدة البيانات", 1);
    try {
      const ref = db.collection("cards").doc(code), s = await ref.get();
      if (!s.exists || s.data().used) return toast("البطاقة غلط أو مستخدمة", 1);
      await ref.update({ used: true, usedBy: NAME, usedAt: Date.now() });
      addBal(Math.round(s.data().amount * 100)); m.remove(); sfx.ok(); toast(`انضاف ${fmt(s.data().amount * 100)} لرصيدك`);
    } catch (e) { toast("صار خطأ، جرب مرة ثانية", 1); }
  };
}
function topbar(a) {
  document.getElementById("top").innerHTML = `
   <a class="brand" href="index.html">${ico("bolt", 26)}${CONFIG.shopName}</a>
   <nav><a href="index.html" class="${a == "shop" ? "on" : ""}">${ico("shop", 20)}المحل</a>
        <a href="work.html" class="${a == "work" ? "on" : ""}">${ico("laptop", 20)}اشتغل</a>
        <a href="sell.html" class="${a == "sell" ? "on" : ""}">${ico("tag", 20)}بيع</a></nav>
   <div class="right"><button class="wallet" id="wl" aria-label="شحن بطاقة">${ico("wallet", 20)}<b id="bal">$0.00</b>${ico("card", 18)}</button>
   <button id="sn" class="round" aria-label="الصوت">${ico(muted ? "off" : "on", 20)}</button></div>`;
  document.getElementById("wl").onclick = redeemUI;
  document.getElementById("sn").onclick = e => { muted = !muted; ls("ss_mute", muted ? "1" : "0"); e.currentTarget.innerHTML = ico(muted ? "off" : "on", 20); };
  renderBal(); askName(); syncOffers();
}

// لما المالك يقبل عرضك، ينضاف المبلغ لرصيدك
async function syncOffers() {
  if (!db) return;
  for (const id of JSON.parse(ls("ss_offers") || "[]")) {
    try {
      const r = db.collection("offers").doc(id), d = (await r.get()).data();
      if (d && d.status == "accepted" && !d.credited) {
        await r.update({ credited: true }); addBal(Math.round(d.buy * 100)); sfx.coin();
        toast(`انقبل عرضك (${d.name})! انضاف ${fmt(d.buy * 100)}`);
      }
    } catch (e) {}
  }
}
