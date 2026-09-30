import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, DollarSign, Lightbulb } from 'lucide-react';

export default function TipsView() {
  const tips = [
    {
      title: '50/30/20 Qoidasiga Amal Qiling',
      tag: 'Moliyaviy Formula',
      desc: 'Oylik daromadingiz (stipendiya yoki ota-onadan pul) ning 50% qismini zaruriy ehtiyojlarga (ovqat, yotoqxona, transport), 30% ini xohish-istaklarga (kiyim, dam olish), 20% ini esa jamg‘arma (savings) ga ajrating.'
    },
    {
      title: 'ATTO Talaba Tarifidan Foydalaning',
      tag: 'Transport',
      desc: 'Toshkent shahar jamoat transportida talabalar uchun maxsus imtiyozli oylik tariflar mavjud. Har kuni alohida to‘lagandan ko‘ra, oylik tarif sotib olsangiz 40% gacha tejab qolasiz.'
    },
    {
      title: 'Kutubxona va Raqamli Resurslar',
      tag: 'Kitob va O‘qish',
      desc: 'Qimmat ilmiy kitoblarni darhol sotib olish shart emas. Universitet kutubxonasi, Alisher Navoiy nomidagi Milliy kutubxona yoki Z-Library kabi elektron resurslardan bepul foydalaning.'
    },
    {
      title: 'Tushlikni Rejalashtiring (Meal Prep)',
      tag: 'Oziq-ovqat',
      desc: 'Kafeda har kuni fastfood yoki taomlanish oylik byudjetingizning eng katta qismini olib ketadi. Talabalar turar joyida yoki uyda taom tayyorlash sizga oyiga kamida 400,000 - 600,000 so‘m tejamkorlik beradi.'
    },
    {
      title: 'Hissiy Xaridlardan Ehtiyot Bo‘ling (24 Soat Qoidasi)',
      tag: 'Psixologiya',
      desc: 'Biror qimmat yoki rejalashtirilmagan narsani sotib olmoqchi bo‘lsangiz, darhol to‘lov qilmang. O‘zingizga 24 soat vaqt bering. 24 soatdan so‘ng ham bu narsa haqiqatdan zarurligiga amin bo‘lsangizgina oling.'
    },
    {
      title: 'Keshbek va Foydali Bank Ilovalari',
      tag: 'Fintech',
      desc: 'Xaridlarni amalga oshirganda Soliq ilovasida chekni skaner qilib 1% keshbek oling. Shuningdek bank kartalari (Anorbank, TBC, Ipak Yo‘li) beradigan keshbeklardan unumli foydalaning.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.12) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.3)'
      }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lightbulb size={24} color="#06b6d4" />
          <span>Talabalar Uchun Moliyaviy Savodxonlik va Maslahatlar</span>
        </h2>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Pulni to‘g‘ri taqsimlash, tejamkorlik va talabalik davrida kapital to‘plash bo‘yicha tavsiyalar
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {tips.map((tip, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-primary" style={{ fontSize: '0.72rem', marginBottom: '10px' }}>
                {tip.tag}
              </span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '6px 0 10px', color: 'var(--text-main)' }}>
                {tip.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
