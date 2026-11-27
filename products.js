// ✏️ هذا الملف الوحيد اللي تعدله: منتجاتك وإعداداتك
const CONFIG = {
  shopName: "دكان أبو علي",       // اسم المحل
  whatsapp: "9647700000000",       // رقمك بصيغة دولية بدون + (مثال العراق 964770...)
  pin: "1234",                     // رمزك السري لتأكيد الشغلات
  coin: "نقطة",                    // اسم العملة
  startBalance: 20                 // رصيد البداية لأخوك
};

// price = السعر بالنقاط | emoji = تكدر بدله تحط صورة: img:"img/car.jpg"
const PRODUCTS = [
  { id: 1, name: "سيارة سباق",  price: 50,  emoji: "🏎️" },
  { id: 2, name: "كرة قدم",     price: 40,  emoji: "⚽" },
  { id: 3, name: "روبوت",       price: 120, emoji: "🤖" },
  { id: 4, name: "ليغو صغير",   price: 80,  emoji: "🧱" },
  { id: 5, name: "دباب مائي",   price: 30,  emoji: "🔫" },
  { id: 6, name: "بالونات",     price: 10,  emoji: "🎈" }
];

// الشغلات اللي يكسب منها أخوك نقاط (تأكيدها برمزك السري)
const JOBS = [
  { id: "j1", name: "رتّب غرفتك",       reward: 20, emoji: "🛏️" },
  { id: "j2", name: "ساعد بغسل الصحون", reward: 15, emoji: "🍽️" },
  { id: "j3", name: "اقرأ 15 دقيقة",    reward: 25, emoji: "📖" },
  { id: "j4", name: "ذاكر دروسك",       reward: 30, emoji: "✏️" }
];
