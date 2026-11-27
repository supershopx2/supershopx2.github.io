// أدوات مشتركة بين الصفحات
const KEY = "toyshop_balance";
function getBal() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === null) { setBal(CONFIG.startBalance); return CONFIG.startBalance; }
    return parseInt(v, 10) || 0;
  } catch (e) { return CONFIG.startBalance; }
}
function setBal(n) { try { localStorage.setItem(KEY, String(n)); } catch (e) {} }
function addBal(n) { const b = getBal() + n; setBal(b); renderBal(); return b; }
function renderBal() {
  const el = document.getElementById("bal");
  if (el) el.textContent = getBal();
}
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove("show"), 2600);
}
function topbar(active) {
  document.getElementById("top").innerHTML =
    `<a class="brand" href="index.html">${CONFIG.shopName}</a>
     <nav>
       <a href="index.html" class="${active === "shop" ? "on" : ""}">🛒 المحل</a>
       <a href="work.html" class="${active === "work" ? "on" : ""}">💪 اشتغل</a>
     </nav>
     <div class="wallet">🪙 <b id="bal">0</b> ${CONFIG.coin}</div>`;
  renderBal();
}
