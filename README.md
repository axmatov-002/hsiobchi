# 🎓 TalabaKassa — O‘quvchilar va Talabalar Xarajatlarini Boshqarish Tizimi

Talabalar va o‘quvchilarning kundalik xarajatlari, oylik byudjeti, jamg‘armalari va moddiy yordam arizalarini hisobga oluvchi zamonaviy Full-Stack web platforma.

---

## 🌟 Asosiy Imkoniyatlar va Rollar

### 1. 🎓 O‘quvchi / Talaba (Student) Bo‘limi
- **Shaxsiy Balans va Kassa:** Daromadlar (stipendiya, ota-onadan jo‘natma, repetitorlik, freelance) va xarajatlarni (oziq-ovqat, ijara/yotoqxona, transport, kitoblar, kurslar, kiyim, ko‘ngilochar) qulay kiritish.
- **Oylik Byudjet Nazorati:** Belgilangan oylik limit, sarflanish foizi va limit oshib ketganda avtomatik ogohlantiruvchi indikatorlar.
- **Interaktiv Grafiklar:** Toifalar bo‘yicha xarajatlar taqsimoti va so‘nggi 7 kunlik xarajatlar dinamikasi.
- **Moliyaviy Maqsadlar (Savings Goals):** Noutbuk, til o‘rganish, sayohat uchun reja tuzish, mablag‘ qo‘shish va maqsadga erishilganda konfetti animatsiyasi.
- **Moddiy So‘rovlar (Financial Aid):** Konferensiya, kitoblar yoki grantlar uchun menejerga rasmiy ariza jo‘natish va holatini kuzatish.
- **Xarajatlar Tarixi va CSV Eksport:** Qidiruv, toifalar bo‘yicha filtr va ma’lumotlarni Excel/CSV formatida yuklab olish.

### 2. 💼 Menejer / Guruh Murabbiyi (Manager) Bo‘limi
- **Talabalar Xarajat Monitoringi:** Biriktirilgan talabalar ro‘yxati, har birining oylik xarajati, byudjet foizi va xavf darajasi (Normal, Ogohlantirish, Qizil ro‘yxat).
- **Arizalarni Ko‘rib Chiqish va Tasdiqlash:** Talabalarning moddiy so‘rovlarini tasdiqlash yoki rad etish (tasdiqlanganda mablag‘ avtomatik talaba balansiga tushadi).
- **Guruh E‘lonlari:** Talabalarga moliyaviy maslahatlar va umumiy e‘lonlar chiqarish.

### 3. 👑 Administrator (Admin) Bo‘limi
- **Tizim Analitikasi:** Jami foydalanuvchilar soni, umumiy tizim xarajatlari va daromadlari statistikasi.
- **Foydalanuvchilarni Boshqarish:** Yangi foydalanuvchilar, istalgan foydalanuvchi rolini (Admin / Menejer / Talaba) 1 bosishda o‘zgartirish, hisoblarni bloklash yoki faollashtirish, o‘chirish.

---

## 🔑 Tayyor Sinov (Demo) Hisoblari

Tizimda kirish oynasida hamda yuqori menyuda (Header) bitta bosish orqali rollarni almashtirish tugmasi mavjud:

| Rol | Email | Parol | Mas'uliyati |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | `admin@kassa.uz` | `admin123` | Barcha foydalanuvchilar va rollarni boshqarish |
| **💼 Menejer** | `manager@kassa.uz` | `manager123` | Talabalar xarajatlarini monitoring qilish, arizalarni tasdiqlash |
| **🎓 O‘quvchi** | `student@kassa.uz` | `student123` | Shaxsiy kassa, xarajat kiritish, byudjet va maqsadlar |

> *Shuningdek, **Ro‘yxatdan o‘tish** orqali yangi akkaunt yaratishingiz mumkin.*

---

## 🚀 Loyihani Ishga Tushirish

Loyihani bitta buyruq orqali ishga tushirish mumkin:

```bash
npm run dev
```

Bu buyruq backend API serverini (`http://localhost:5000`) va React frontendni (`http://localhost:5173`) bir vaqtda ishga tushiradi.

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 🛠 Texnologiyalar
- **Frontend:** React 19, Vite, Lucide React (ikonlar), Canvas Confetti, Pure CSS Glassmorphism Design System (Qorong‘i / Yorug‘ rejim).
- **Backend:** Node.js, Express 5, JWT Token autentifikatsiyasi, Bcrypt parol xesh lash, CORS.
- **Ma'lumotlar bazasi:** Faylli persistent JSON DB (`server/data/db.json`).
