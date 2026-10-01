import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatMoney } from '../utils/formatters';
import { 
  Wallet, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Receipt, 
  Target, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Sun, 
  Moon, 
  Play, 
  Star, 
  HelpCircle, 
  Laptop, 
  BookOpen, 
  Award, 
  Lock, 
  Zap,
  Building,
  School
} from 'lucide-react';

export default function LandingView({ onOpenAuth, onQuickDemo }) {
  const { theme, toggleTheme, quickLoginAs } = useAuth();

  // Budget Calculator States
  const [incomeStipend, setIncomeStipend] = useState(1200000);
  const [incomeParents, setIncomeParents] = useState(800000);
  const [incomeSide, setIncomeSide] = useState(500000);

  const [expenseRent, setExpenseRent] = useState(600000);
  const [expenseFood, setExpenseFood] = useState(500000);
  const [expenseTransport, setExpenseTransport] = useState(120000);
  const [expenseMobile, setExpenseMobile] = useState(70000);
  const [expenseFun, setExpenseFun] = useState(150000);

  // Active feature tab showcase
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('kassa');

  // FAQ open states
  const [openFaq, setOpenFaq] = useState(0);

  // Quick Demo Dropdown modal
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  // Calculator sums
  const totalIncome = incomeStipend + incomeParents + incomeSide;
  const totalExpense = expenseRent + expenseFood + expenseTransport + expenseMobile + expenseFun;
  const monthlySavings = totalIncome - totalExpense;
  const yearlySavings = Math.max(0, monthlySavings * 10); // 10 academic months
  const dailyLimit = Math.max(0, Math.round(totalExpense / 30));

  // Preset calculator profiles
  const applyPreset = (type) => {
    if (type === 'tashkent-rent') {
      setIncomeStipend(1200000);
      setIncomeParents(1000000);
      setIncomeSide(800000);
      setExpenseRent(900000);
      setExpenseFood(700000);
      setExpenseTransport(150000);
      setExpenseMobile(80000);
      setExpenseFun(200000);
    } else if (type === 'dorm') {
      setIncomeStipend(1200000);
      setIncomeParents(500000);
      setIncomeSide(300000);
      setExpenseRent(350000);
      setExpenseFood(500000);
      setExpenseTransport(80000);
      setExpenseMobile(60000);
      setExpenseFun(100000);
    } else if (type === 'freelance') {
      setIncomeStipend(1200000);
      setIncomeParents(0);
      setIncomeSide(2500000);
      setExpenseRent(1000000);
      setExpenseFood(800000);
      setExpenseTransport(120000);
      setExpenseMobile(100000);
      setExpenseFun(350000);
    }
  };

  // FAQ Data
  const faqs = [
    {
      q: "TalabaKassa platformasidan foydalanish bepulmi?",
      a: "Ha, tizim barcha o‘quvchi va talabalar uchun 100% bepul. Siz istalgan vaqtda ro‘yxatdan o‘tib, barcha imkoniyatlardan cheklovlarsiz foydalanishingiz mumkin."
    },
    {
      q: "Mening shaxsiy xarajatlarimni boshqalar yoki murabbiy ko‘ra oladimi?",
      a: "Yo‘q! Har bir talabaning kundalik xarajatlari va kassasi to‘liq shaxsiy va maxfiy hisoblanadi. Guruh murabbiyi faqat umumiy oylik foiz va xavf indikatorini, shuningdek siz rasman yuborgan moddiy yordam arizalarinigina ko‘ra oladi."
    },
    {
      q: "Universitetdan moddiy yordam yoki grant so‘rash qanday ishlaydi?",
      a: "Siz 'Moddiy So‘rovlar' bo‘limidan konferensiya, kitoblar yoki sertifikat imtihoni uchun so‘rov kiritasiz. Guruh murabbiyi yoki OTM mas'uli buni ko‘rib chiqib tasdiqlaydi. Tasdiqlanganda, mablag‘ avtomatik sizning shaxsiy balansingizga qo‘shiladi."
    },
    {
      q: "Elektron kvitansiya (fiskal chek) nima uchun kerak?",
      a: "Har bir qayd etilgan xarajat uchun haqiqiy QR-kodli va ma'lumotli elektron chek shakllanadi. Buni chop etishingiz, PDF qilib saqlashingiz yoki ota-onangizga hisobot sifatida ko‘rsatishingiz mumkin."
    },
    {
      q: "Telegram boti bilan qanday bog‘lanadi?",
      a: "Tizimga kirganingizdan so‘ng sizga maxsus 6 xonali ulanish kodi beriladi. @TalabaKassaBot ga ushbu kodni yuborsangiz, har kuni Telegram orqali 1 soniyada xarajat yozishingiz mumkin."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-main)' }}>
      
      {/* ==================== 1. TOP NAVBAR ==================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 24px',
        height: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(99, 102, 241, 0.45)'
          }}>
            <Wallet size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                TalabaKassa
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '2px 8px', letterSpacing: '0.5px' }}>
                FINTECH
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: 0 }}>
              Talabalar & O‘quvchilar Moliya Tizimi
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="d-desktop-flex">
          <a href="#hero" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>Asosiy</a>
          <a href="#calculator" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>Byudjet Kalkulyatori</a>
          <a href="#showcase" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>Imkoniyatlar</a>
          <a href="#testimonials" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sharhlar</a>
          <a href="#faq" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>FAQ</a>
        </nav>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm"
            title="Mavzuni almashtirish"
            style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%' }}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* Quick Demo Picker */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="btn btn-secondary btn-sm"
              style={{
                borderStyle: 'dashed',
                borderColor: 'rgba(99, 102, 241, 0.5)',
                color: 'var(--text-main)',
                gap: '6px'
              }}
            >
              <Zap size={15} color="#f59e0b" />
              <span>1-Bosishda Demo</span>
              <ChevronDown size={14} />
            </button>

            {demoMenuOpen && (
              <div 
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '240px',
                  padding: '8px',
                  zIndex: 200,
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Rolni tanlang va kiring:
                </div>
                <button
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', fontSize: '0.84rem' }}
                  onClick={() => { quickLoginAs('student'); setDemoMenuOpen(false); }}
                >
                  <span style={{ fontSize: '1.1rem' }}>🎓</span>
                  <span>O‘quvchi / Talaba</span>
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', fontSize: '0.84rem' }}
                  onClick={() => { quickLoginAs('manager'); setDemoMenuOpen(false); }}
                >
                  <span style={{ fontSize: '1.1rem' }}>💼</span>
                  <span>Menejer / Murabbiy</span>
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', fontSize: '0.84rem' }}
                  onClick={() => { quickLoginAs('admin'); setDemoMenuOpen(false); }}
                >
                  <span style={{ fontSize: '1.1rem' }}>👑</span>
                  <span>Administrator (Admin)</span>
                </button>
              </div>
            )}
          </div>

          {/* Login / Register buttons */}
          <button
            onClick={() => onOpenAuth(false)}
            className="btn btn-ghost btn-sm"
            style={{ fontWeight: 700, padding: '8px 14px' }}
          >
            Kirish
          </button>
          <button
            onClick={() => onOpenAuth(true)}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 700, padding: '8px 16px', gap: '6px' }}
          >
            <span>Ro‘yxatdan o‘tish</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </header>


      {/* ==================== 2. HERO SECTION ==================== */}
      <section id="hero" style={{
        padding: '70px 24px 60px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Glow backdrop aura */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(6, 182, 212, 0.12) 40%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />

        {/* Top Eyebrow Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          marginBottom: '24px'
        }}>
          <Sparkles size={16} color="#818cf8" />
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#818cf8' }}>
            O‘zbekiston talabalari va o‘quvchilari uchun #1 moliyaviy platforma
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          maxWidth: '960px',
          margin: '0 auto 20px',
          background: 'linear-gradient(135deg, var(--text-main) 0%, #cbd5e1 50%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Talabalik yillaringizda har bir so‘m maqsad sari va erkinlik uchun ishlasin
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.22rem)',
          color: 'var(--text-muted)',
          maxWidth: '780px',
          margin: '0 auto 36px',
          lineHeight: 1.6
        }}>
          Stipendiya, ota-ona ko‘magi, kassa nazorati, oylik limitlar va noutbuk yoki til kurslari uchun jamg‘arma rejasi. Barcha xarajatlaringizga haqiqiy elektron fiskal chek oling va byudjetdan chiqib ketmang.
        </p>

        {/* Hero CTA buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          <button
            onClick={() => onOpenAuth(true)}
            className="btn btn-primary btn-lg glow-indigo"
            style={{ padding: '14px 28px', fontSize: '1.05rem', fontWeight: 800, gap: '10px' }}
          >
            <span>Bepul Hisob Ochish</span>
            <ArrowRight size={20} />
          </button>

          <a
            href="#calculator"
            className="btn btn-secondary btn-lg"
            style={{ padding: '14px 26px', fontSize: '1rem', fontWeight: 700, gap: '8px' }}
          >
            <Coins size={18} color="#f59e0b" />
            <span>Byudjetni Hisoblash</span>
          </a>

          <button
            onClick={() => quickLoginAs('student')}
            className="btn btn-ghost btn-lg"
            style={{
              padding: '14px 24px',
              fontSize: '0.96rem',
              fontWeight: 700,
              border: '1px solid var(--border-color)',
              gap: '8px'
            }}
          >
            <Play size={16} color="#10b981" />
            <span>Jonli Demo Sinov</span>
          </button>
        </div>

        {/* Live Social Proof Stats Strip */}
        <div style={{
          maxWidth: '920px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>5,400+</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Faol O‘quvchi & Talaba</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981' }}>1.4 mlrd+</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>So‘m Tejalgan Mablag‘</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#06b6d4' }}>24+</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>OTM va Litseylar A’zosi</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b' }}>4.9 ★</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Foydalanuvchilar Bahosi</div>
          </div>
        </div>
      </section>


      {/* ==================== 3. INTERACTIVE BUDGET & SAVINGS CALCULATOR ==================== */}
      <section id="calculator" style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.04) 50%, transparent 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.78rem', marginBottom: '12px' }}>
              Interaktiv Simulyator
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
              Talaba Oylik Xarajat va Jamg‘arma Kalkulyatori
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '650px', margin: '8px auto 0' }}>
              O‘z xarajatlaringizni kiriting va oy oxirida qancha tejab qolishingizni hamda kunlik xavfsiz me'yoringizni darhol bilib oling!
            </p>

            {/* Quick Presets */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '18px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: '6px' }}>
                Tayyor namunalar:
              </span>
              <button
                type="button"
                onClick={() => applyPreset('tashkent-rent')}
                className="btn btn-secondary btn-sm"
              >
                🏠 Toshkentda ijara talabasi
              </button>
              <button
                type="button"
                onClick={() => applyPreset('dorm')}
                className="btn btn-secondary btn-sm"
              >
                🏢 Yotoqxona (TTJ) talabasi
              </button>
              <button
                type="button"
                onClick={() => applyPreset('freelance')}
                className="btn btn-secondary btn-sm"
              >
                💻 Ishlovchi / IT talabasi
              </button>
            </div>
          </div>

          {/* Calculator Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'start'
          }}>
            
            {/* Input Controls Card */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Coins size={20} color="#10b981" />
                <span>1. Oylik Daromadlar (so‘m)</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>Stipendiya:</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatMoney(incomeStipend)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000000"
                    step="50000"
                    value={incomeStipend}
                    onChange={(e) => setIncomeStipend(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>Ota-onadan jo‘natma:</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatMoney(incomeParents)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000000"
                    step="50000"
                    value={incomeParents}
                    onChange={(e) => setIncomeParents(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>Repetitorlik / Ish / Freelance:</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatMoney(incomeSide)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="100000"
                    value={incomeSide}
                    onChange={(e) => setIncomeSide(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Receipt size={20} color="#f43f5e" />
                <span>2. Oylik Xarajatlar (so‘m)</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>Ijara / Yotoqxona:</span>
                    <span style={{ color: '#f43f5e', fontWeight: 700 }}>{formatMoney(expenseRent)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000000"
                    step="50000"
                    value={expenseRent}
                    onChange={(e) => setExpenseRent(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>Oziq-ovqat va oshxona:</span>
                    <span style={{ color: '#f43f5e', fontWeight: 700 }}>{formatMoney(expenseFood)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2500000"
                    step="50000"
                    value={expenseFood}
                    onChange={(e) => setExpenseFood(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>ATTO Metro & Avtobus transport:</span>
                    <span style={{ color: '#f43f5e', fontWeight: 700 }}>{formatMoney(expenseTransport)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="10000"
                    value={expenseTransport}
                    onChange={(e) => setExpenseTransport(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>Mobil internet & aloqa:</span>
                    <span style={{ color: '#f43f5e', fontWeight: 700 }}>{formatMoney(expenseMobile)}</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="300000"
                    step="10000"
                    value={expenseMobile}
                    onChange={(e) => setExpenseMobile(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>Kofe, dam olish va kiyim:</span>
                    <span style={{ color: '#f43f5e', fontWeight: 700 }}>{formatMoney(expenseFun)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1500000"
                    step="25000"
                    value={expenseFun}
                    onChange={(e) => setExpenseFun(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>

            {/* Results Live Feedback Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="glass-panel glow-indigo" style={{ padding: '28px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  Hisob-Kitob Natijasi:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '16px 0 24px' }}>
                  <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Jami Oylik Tushum:</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                      {formatMoney(totalIncome)}
                    </div>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Jami Oylik Xarajat:</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f43f5e', marginTop: '2px' }}>
                      {formatMoney(totalExpense)}
                    </div>
                  </div>
                </div>

                {/* Monthly Savings Result */}
                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: monthlySavings >= 0 ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)' : 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${monthlySavings >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Oylik Erkin Qoldiq (Jamg‘arma):</span>
                    <span className={`badge ${monthlySavings >= 0 ? 'badge-success' : 'badge-danger'}`}>
                      {monthlySavings >= 0 ? 'Ijobiy Balans' : 'Kassada Kamomad'}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: monthlySavings >= 0 ? '#10b981' : '#ef4444',
                    marginTop: '6px'
                  }}>
                    {formatMoney(monthlySavings)}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '6px 0 0' }}>
                    {monthlySavings >= 0 
                      ? `Agar ushbu rejimda yashasangiz, 1 o‘quv yilida ${formatMoney(yearlySavings)} sof pul jamg‘arasiz!`
                      : "Diqqat: Xarajatlaringiz daromadingizdan oshib ketmoqda. Ayrim xarajatlarni qisqartirish zarur!"}
                  </p>
                </div>

                {/* Daily Safe Limit */}
                <div style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Tavsiya etilgan kunlik limit:</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
                      {formatMoney(dailyLimit)} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ kun</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Moliyaviy salomatlik:</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: monthlySavings > 400000 ? '#10b981' : (monthlySavings >= 0 ? '#f59e0b' : '#ef4444') }}>
                      {monthlySavings > 400000 ? '⭐ A‘lo (Tejamkor)' : (monthlySavings >= 0 ? '👍 Me‘yorda' : '⚠️ Xavfli')}
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <button
                  onClick={() => onOpenAuth(true)}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', gap: '10px', justifyContent: 'center' }}
                >
                  <span>Ushbu Byudjet Asosida Hisob Ochish</span>
                  <ArrowRight size={18} />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ==================== 4. INTERACTIVE PRODUCT SHOWCASE TABS ==================== */}
      <section id="showcase" style={{ padding: '80px 24px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.78rem', marginBottom: '12px' }}>
            Jonli Tizim Ko‘rinishi
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
            TalabaKassa Platformasi Qanday Ishlaydi?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', maxWidth: '600px', margin: '8px auto 0' }}>
            Real hayotda har bir talaba va guruh murabbiyi qulay foydalanishi uchun ishlab chiqilgan zamonaviy vositalar.
          </p>

          {/* Tabs Selector */}
          <div style={{
            display: 'inline-flex',
            gap: '6px',
            background: 'var(--bg-subtle)',
            padding: '6px',
            borderRadius: '16px',
            marginTop: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {[
              { id: 'kassa', label: '🎓 Shaxsiy Kassa', icon: Wallet },
              { id: 'receipt', label: '🧾 Fiskal Cheklar', icon: Receipt },
              { id: 'goals', label: '🎯 Maqsadlar & Konfetti', icon: Target },
              { id: 'manager', label: '💼 Murabbiy Monitoringi', icon: Users },
              { id: 'telegram', label: '🤖 Telegram Bot', icon: Send }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeShowcaseTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveShowcaseTab(tab.id)}
                  className="btn"
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    gap: '8px'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Cards */}
        <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px' }}>
          {activeShowcaseTab === 'kassa' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div className="badge badge-success" style={{ marginBottom: '12px' }}>Talaba Portali</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '14px' }}>
                  Daromad va Xarajatlarni 1 Soniyada Qayd Qilish
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Stipendiya, ota-onadan pul, repetitorlik tushumlari va oziq-ovqat, ijara, transport xarajatlarini toifalar (UzCard, Humo, Click, Payme, Naqd) bo‘yicha tartibga soling.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Real-time balans va oylik byudjet ko‘rsatkichi</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Toifalar bo‘yicha interaktiv doiraviy grafiklar</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Limit 80% dan oshganda avtomatik ogohlantirish</span>
                  </div>
                </div>
              </div>

              {/* Mock Dashboard Card */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: '18px',
                padding: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Jasur Karimov (TATU, 3-kurs)</div>
                  <span className="badge badge-success">Moliyaviy Holat: A‘lo</span>
                </div>
                <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Mavjud Kassa Balansi:</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>2,450,000 so‘m</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Sentabr Byudjeti: 1,800,000</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>Sarflangan: 68%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden', marginTop: '6px' }}>
                  <div style={{ width: '68%', height: '100%', background: '#6366f1', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'receipt' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div className="badge badge-primary" style={{ marginBottom: '12px' }}>Fiskal Intizom</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '14px' }}>
                  Har Qanday Xarajatga Haqiqiy Elektron Chek
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Qayd etilgan har bir amaliyot uchun rasmiy QR-kodli elektron kvitansiya generatsiya qilinadi. Talaba istalgan vaqtda kvitansiyani ko‘rishi, printer orqali chop etishi yoki PDF formatida yuklab olishi mumkin.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Haqiqiy QR-kod va fiskal modul kodi</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>To‘lov usuli: UzCard, Humo, Click, Payme, ATTO</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>1 bosishda chop etish (Print / PDF) imkoniyati</span>
                  </div>
                </div>
              </div>

              {/* Mock Receipt Visual */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: '18px',
                padding: '24px',
                border: '1px solid var(--border-color)',
                fontFamily: 'monospace',
                maxWidth: '380px',
                margin: '0 auto',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-family)' }}>TALABAKASSA FINTECH</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>ELEKTRON FISKAL KVITANSIYA</div>
                </div>
                <div style={{ borderBottom: '1px dashed var(--border-color)', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span>Chek No:</span>
                  <span style={{ fontWeight: 700 }}>TK-91823-2026</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span>Toifa:</span>
                  <span>Oziq-ovqat (Tushlik)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span>To‘lov usuli:</span>
                  <span>UzCard / Payme</span>
                </div>
                <div style={{ textAlign: 'center', margin: '14px 0', fontSize: '1.4rem', fontWeight: 800, color: '#f43f5e', fontFamily: 'var(--font-family)' }}>
                  -32,000 so‘m
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                  ✓ MUVAFFAQAYATLI O‘TKAZILDI
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'goals' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div className="badge badge-warning" style={{ marginBottom: '12px' }}>Orzular Sari Reja</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '14px' }}>
                  Noutbuk, Til Kursi yoki Sayohat Uchun Jamg‘arish
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Orzuingizdagi maqsadni qo‘ying, muddatni belgilang va har safar erkin pul tushganda kassa orqali mablag‘ qo‘shing. Maqsadga erishilganda esa quvonchli konfetti animatsiyasi kutmoqda!
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Har bir maqsad uchun alohida progress indikatori</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Tezkor depozit qo‘shish (50,000, 100,000, 500,000 so‘m)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Muvaffaqiyat konfettisi va motivatsiya</span>
                  </div>
                </div>
              </div>

              {/* Mock Goal Card */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: '18px',
                padding: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Laptop size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>Yangi Dasturlash Noutbuki</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Kutilayotgan: 8,500,000 so‘m</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Jamg‘arildi: 5,100,000 so‘m</span>
                  <span style={{ color: 'var(--primary)' }}>60%</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: 'var(--bg-subtle)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4)', borderRadius: '5px' }} />
                </div>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>+ Mablag‘ Qo‘shish</button>
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'manager' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div className="badge badge-purple" style={{ marginBottom: '12px' }}>OTM & Guruh Murabbiyi</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '14px' }}>
                  Talabalar Holatini Kuzatish va Moddiy Yordam Ajratish
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Murabbiylar talabalarning byudjet xavf darajasini (Normal, 80%+ Ogohlantirish, Qizil ro‘yxat) ko‘rib, zarur hollarda universitet fondidan bir martalik grant yoki moddiy rag‘bat ajrata oladilar.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Arizalarni 1 bosishda tasdiqlash yoki rad etish</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Tasdiqlanganda pul avtomatik talaba balansiga tushadi</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Guruh talabalariga umumiy e‘lon va maslahatlar chiqarish</span>
                  </div>
                </div>
              </div>

              {/* Mock Manager Card */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: '18px',
                padding: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Guruh Monitoringi (TATU, 3-kurs)</div>
                  <span className="badge badge-primary">Menejer: Nodira S.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '10px', fontSize: '0.82rem' }}>
                    <span>Jasur Karimov</span>
                    <span className="badge badge-success">68% Normal</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '10px', fontSize: '0.82rem' }}>
                    <span>Madina Aliyeva</span>
                    <span className="badge badge-warning">84% Ogohlantirish</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '10px', fontSize: '0.82rem' }}>
                    <span>Bobur Mirzayev</span>
                    <span className="badge badge-danger">105% Qizil ro‘yxat</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'telegram' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div className="badge badge-primary" style={{ marginBottom: '12px' }}>Telegram Bot</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '14px' }}>
                  Yo‘lda va Kafe-Oshxonalarda 1 Soniyada Xarajat Yozish
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Ilovani ochib o‘tirmasdan, Telegramdagi <strong>@TalabaKassaBot</strong> ga shunchaki: <code>35000 tushlik</code> deb yozing. U veb-platformadagi shaxsiy balansingizga avtomatik qo‘shiladi!
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Har kuni ertalab 08:00 da balans va kunlik limit xabari</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Maxsus 6 xonali kod bilan bir zumda ulanish</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Internet kam sarflaydigan yengil Telegram interfeysi</span>
                  </div>
                </div>
              </div>

              {/* Mock Chat Bubble Visual */}
              <div style={{
                background: '#0e1621',
                borderRadius: '18px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'var(--shadow-lg)',
                color: '#fff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0088cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Send size={18} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>TalabaKassa Bot</div>
                    <div style={{ fontSize: '0.7rem', color: '#6ab2f2' }}>bot • onlayn</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                  <div style={{ alignSelf: 'flex-end', background: '#2b5278', padding: '8px 12px', borderRadius: '12px 12px 2px 12px' }}>
                    35000 tushlik
                  </div>
                  <div style={{ alignSelf: 'flex-start', background: '#182533', padding: '10px 14px', borderRadius: '12px 12px 12px 2px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    ✅ <strong>35,000 so‘m</strong> "Oziq-ovqat" toifasiga muvaffaqiyatli qayd etildi!<br/>
                    💰 Qolgan kassa balansingiz: <strong>2,415,000 so‘m</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ==================== 5. CORE FEATURES GRID ==================== */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-subtle)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.78rem', marginBottom: '12px' }}>
              Barcha Afzalliklar
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
              Talabalar Hayotini Osonlashtiruvchi 6 Ta Kuchli Imkoniyat
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            <div className="glass-panel card-interactive" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '18px' }}>
                <Wallet size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Tezkor Kassa & Boshqaruv</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Barcha daromadlar (stipendiya, ota-ona, repetitorlik) va xarajatlarni UzCard, Humo, Click, Payme orqali daqiqalarda kiriting.
              </p>
            </div>

            <div className="glass-panel card-interactive" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '18px' }}>
                <Receipt size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Elektron Fiskal Cheklar</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Har bir amaliyot uchun rasmiy QR-kodli elektron chek oling, chop eting va ota-onangizga shaffof hisobot bering.
              </p>
            </div>

            <div className="glass-panel card-interactive" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '18px' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Smart Kunlik Limit & AI</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Oy oxirigacha qolgan kunlarni hisoblab, har kuni sarflash mumkin bo‘lgan xavfsiz me'yorni avtomatik hisoblab beradi.
              </p>
            </div>

            <div className="glass-panel card-interactive" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899', marginBottom: '18px' }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Moliyaviy Maqsadlar</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Noutbuk, til sertifikati (IELTS) yoki sayohat uchun jamg‘arma rejasini tuzing va yakunda konfetti bilan nishonlang.
              </p>
            </div>

            <div className="glass-panel card-interactive" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', marginBottom: '18px' }}>
                <School size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Universitet Moddiy Yordami</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Hakaton, konferensiya yoki dori-darmon uchun murabbiyga onlayn ariza yuboring va tasdiqlanganda mablag‘ni balansingizga oling.
              </p>
            </div>

            <div className="glass-panel card-interactive" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', marginBottom: '18px' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>100% Xavfsiz & Bepul</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Shaxsiy ma'lumotlaringiz maxfiy saqlanadi. Excel / CSV formatida eksport qiling yoki hisobingizni istalgan paytda boshqaring.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ==================== 6. REALISTIC STUDENT TESTIMONIALS ==================== */}
      <section id="testimonials" style={{ padding: '80px 24px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="badge badge-warning" style={{ padding: '6px 14px', fontSize: '0.78rem', marginBottom: '12px' }}>
            Foydalanuvchilar Tajribasi
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
            Talabalar va Murabbiylar Nima Deyishadi?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', maxWidth: '600px', margin: '8px auto 0' }}>
            Toshkent va viloyat OTMlarida o‘qiydigan haqiqiy talabalar va o‘qituvchilarning real sharhlari.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6, fontSize: '0.92rem' }}>
                "Ilgari stipendiya tushishi bilan 10 kunda tugab qolardi va qayerga ketganini bilmasdim. TalabaKassa yordamida kunlik limit qo‘ydim va 4 oyda yangi noutbuk uchun 4.5 mln so‘m yig‘dim!"
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                J
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Jasur Karimov</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>TATU, Dasturiy Injiniring, 3-kurs</div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6, fontSize: '0.92rem' }}>
                "IELTS imtihoni to‘lovi uchun pul ajratishda qiyinchilik bo‘lardi. 'Moliyaviy Maqsadlar' bo‘limi va har kungi kvitansiyalar menga har bir tushlik xarajatini me'yorida ushlashni o‘rgatdi."
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                M
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Madina Aliyeva</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Jahon Tillari Universiteti, 2-kurs</div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6, fontSize: '0.92rem' }}>
                "Guruh murabbiyi sifatida qaysi talaba moddiy qiynalayotganini va kimga grant kerakligini shaffof bilishimiz osonlashdi. Talabalarimizning moliyaviy savodxonligi sezilarli oshdi."
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                N
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Nodira Salimova</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>O‘zMU, Iqtisodiyot kafedrasi murabbiyi</div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ==================== 7. FAQ ACCORDION ==================== */}
      <section id="faq" style={{ padding: '80px 24px', background: 'var(--bg-subtle)' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.78rem', marginBottom: '12px' }}>
              Savol-Javoblar
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800 }}>
              Tez-Tez Beriladigan Savollar
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.96rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} color="var(--text-dim)" />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 22px 20px',
                      color: 'var(--text-muted)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '14px'
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ==================== 8. FINAL CALL TO ACTION ==================== */}
      <section style={{
        padding: '90px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.12) 50%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.03em' }}>
            Moliyaviy Erkinlik Va Tejamkorlikni Bugun Boshlang!
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
            Ro‘yxatdan o‘tish atigi 1 daqiqa vaqt oladi. Barcha xarajatlaringizni nazorat qiling va orzularingizga erishing.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenAuth(true)}
              className="btn btn-primary btn-lg glow-indigo"
              style={{ padding: '14px 32px', fontSize: '1.05rem', fontWeight: 800, gap: '10px' }}
            >
              <span>Bepul Ro‘yxatdan O‘tish</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => quickLoginAs('student')}
              className="btn btn-secondary btn-lg"
              style={{ padding: '14px 26px', fontSize: '1rem', fontWeight: 700, gap: '8px' }}
            >
              <Zap size={18} color="#f59e0b" />
              <span>1-Bosishda Demo Sinov</span>
            </button>
          </div>
        </div>
      </section>


      {/* ==================== 9. FOOTER ==================== */}
      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '50px 24px 30px'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Wallet size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>TalabaKassa</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              O‘zbekiston o‘quvchi va talabalari uchun yaratilgan raqamli kassa va shaxsiy byudjet boshqaruv platformasi.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Bo‘limlar
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <a href="#calculator" style={{ color: 'var(--text-muted)' }}>Byudjet Kalkulyatori</a>
              <a href="#showcase" style={{ color: 'var(--text-muted)' }}>Imkoniyatlar</a>
              <a href="#testimonials" style={{ color: 'var(--text-muted)' }}>Talabalar Sharhlari</a>
              <a href="#faq" style={{ color: 'var(--text-muted)' }}>Savol-Javoblar</a>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Tezkor Sinov
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <span onClick={() => quickLoginAs('student')} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>🎓 Talaba sifatida kirish</span>
              <span onClick={() => quickLoginAs('manager')} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>💼 Menejer sifatida kirish</span>
              <span onClick={() => quickLoginAs('admin')} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>👑 Admin sifatida kirish</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Aloqa & Telegram
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', margin: '0 0 10px' }}>
              Rasmiy bot: @TalabaKassaBot
            </p>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', margin: 0 }}>
              Toshkent sh., Oliy Ta'lim integratsiyasi
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.78rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © 2026 TalabaKassa. Barcha huquqlar himoyalangan.
          </div>
          <div>
            O‘zbekiston Respublikasi yoshlari moliyaviy savodxonligi loyihasi
          </div>
        </div>
      </footer>

    </div>
  );
}
