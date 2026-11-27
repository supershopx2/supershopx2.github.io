// ملف الإعدادات. هذي المنتجات الافتراضية، وبعدين تدير كل شي من admin.html
const CONFIG = {
  shopName: "SuperShop",
  dailyCap: 2,          // أقصى ما يكسبه أخوك من بيسي الشغل باليوم ($)
  firebase: { apiKey: "", authDomain: "", projectId: "", appId: "" }
};
const PRODUCTS = [
  { id: 1,  name: "قناع سلاحف النينجا", price: 4,    icon: "mask" },
  { id: 2,  name: "بخاخ منظف شاشات",    price: 2,    icon: "spray" },
  { id: 3,  name: "ملطف جو",            price: 2.5,  icon: "scent" },
  { id: 4,  name: "دبدوب",              price: 6,    icon: "bear" },
  { id: 5,  name: "مرأة",               price: 3,    icon: "mirror" },
  { id: 6,  name: "ساعة",               price: 12,   icon: "watch" },
  { id: 7,  name: "براصلي",             price: 2,    icon: "bracelet" },
  { id: 8,  name: "كفر تلفون",          price: 3,    icon: "case" },
  { id: 9,  name: "شاحن",               price: 7,    icon: "charger" },
  { id: 10, name: "دراجة motoscooter",  price: 60,   icon: "scooter" },
  { id: 11, name: "جيلات للمكسورين",    price: 1.5,  icon: "gel" },
  { id: 12, name: "سيارة سباق",         price: 3.5,  icon: "car" },
  { id: 13, name: "كرة قدم",            price: 2.5,  icon: "ball" },
  { id: 14, name: "روبوت",              price: 8,    icon: "bot" }
];
/* ===== Firebase: قواعد Firestore الجديدة (استبدل القديمة بالكامل ثم Publish، وغيّر الإيميل) =====
rules_version = '2';
service cloud.firestore { match /databases/{d}/documents {
  function owner() { return request.auth != null && request.auth.token.email == 'YOU@MAIL.COM'; }
  match /orders/{id} { allow create: if true; allow read, update: if owner(); }
  match /products/{id} { allow read: if true; allow write: if owner(); }
  match /cards/{id} { allow get: if true;
    allow update: if resource.data.used == false && request.resource.data.used == true
                  && request.resource.data.amount == resource.data.amount;
    allow create, list, delete: if owner(); }
  match /offers/{id} { allow get: if true;
    allow create: if request.resource.data.status == 'pending' && request.resource.data.credited == false;
    allow list, delete: if owner(); allow update: if owner() ||
      (resource.data.status == 'accepted' && resource.data.credited == false && request.resource.data.credited == true
       && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['credited'])); }
}}
*/
