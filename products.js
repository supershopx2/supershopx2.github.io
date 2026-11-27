// ملف الإعدادات. هذي المنتجات الافتراضية، وبعدين تدير كل شي من admin.html
const CONFIG = {
  shopName: "SuperShop",
  dailyCap: 2,          // أقصى ما يكسبه أخوك من بيسي الشغل باليوم ($)
  supabase: { url: "https://rcywmypdqgqkfrsnmqfz.supabase.co", key: "sb_publishable_AxZfJ9KJezfnQ7Or3Bgm7g_rUKjUGAD" }
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

