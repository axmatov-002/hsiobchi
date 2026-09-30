import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionsApi, goalsApi, commonApi } from '../services/api';
import { formatMoney, formatDate } from '../utils/formatters';
import StatsCard from '../components/StatsCard';
import { CategoryChart, WeeklyChart } from '../components/Charts';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  AlertTriangle, 
  CheckCircle, 
  PlusCircle, 
  Target, 
  Bell, 
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudentDashboard({ onOpenNewTransaction, onOpenNewGoal, onOpenNewRequest, onOpenDepositGoal }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0, monthlyBudget: 1800000 });
  const [goals, setGoals] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [txRes, goalsRes, annRes] = await Promise.all([
        transactionsApi.getAll(),
        goalsApi.getAll(),
        commonApi.getAnnouncements()
      ]);

      if (txRes.success) {
        setTransactions(txRes.data);
        setSummary(txRes.summary);
      }
      if (goalsRes.success) {
        setGoals(goalsRes.data);
      }
      if (annRes.success) {
        setAnnouncements(annRes.data);
      }
    } catch (err) {
      console.error('Ma\'lumotlarni yuklashda xatolik:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // Quick 1-click expense recorder directly from dashboard
  const handleQuickAdd = async (amount, category, description) => {
    try {
      await transactionsApi.create({
        type: 'expense',
        amount,
        category,
        method: 'UzCard',
        description,
        date: new Date().toISOString().split('T')[0]
      });
      fetchData();
    } catch (e) {
      alert(e.message);
    }
  };

  // Budget calculations
  const budget = user?.monthlyBudget || summary.monthlyBudget || 1800000;
  const budgetUsedPercent = Math.min(Math.round((summary.totalExpense / budget) * 100), 100);
  const isBudgetOver = summary.totalExpense > budget;
  const isBudgetWarning = budgetUsedPercent >= 80 && !isBudgetOver;

  // Financial Health Score
  let healthScore = { label: 'A‘lo (Tejamkor)', color: '#10b981', badgeClass: 'badge-success' };
  if (isBudgetOver) {
    healthScore = { label: 'Xavfli (Limit oshgan)', color: '#ef4444', badgeClass: 'badge-danger' };
  } else if (isBudgetWarning) {
    healthScore = { label: 'Ehtiyotkor (80%+)', color: '#f59e0b', badgeClass: 'badge-warning' };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-slide-up">
      
      {/* Welcome Banner */}
      <div className="glass-card" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.12) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>👋</span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>
              Salom, {user?.name || 'Talaba'}!
            </h2>
            <span className={`badge ${healthScore.badgeClass}`}>
              Moliyaviy Holat: {healthScore.label}
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {user?.institution} • {user?.faculty || 'O‘quvchi'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => setShowGuide(!showGuide)}
            style={{ gap: '6px' }}
          >
            <HelpCircle size={15} />
            <span>Qo‘llanma</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onOpenNewRequest}>
            Moddiy So‘rov
          </button>
          <button className="btn btn-primary btn-sm" onClick={onOpenNewTransaction} style={{ gap: '6px' }}>
            <PlusCircle size={16} />
            <span>Yangi Qayd</span>
          </button>
        </div>
      </div>

      {/* Interactive Step-by-Step Guide for beginners */}
      {showGuide && (
        <div className="glass-card" style={{ padding: '20px 24px', border: '1px solid rgba(99, 102, 241, 0.4)', background: 'rgba(18, 24, 38, 0.95)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#818cf8" />
            <span>TalabaKassa tizimidan qanday foydalaniladi?</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-subtle)' }}>
              <div style={{ fontWeight: 700, color: '#10b981', fontSize: '0.9rem', marginBottom: '4px' }}>
                1. Daromadlarni kiriting
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Oylik stipendiya, ota-onadan jo‘natma yoki freelans daromadini yashil tugma orqali qo‘shing.
              </p>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-subtle)' }}>
              <div style={{ fontWeight: 700, color: '#ef4444', fontSize: '0.9rem', marginBottom: '4px' }}>
                2. Har bir xarajatni yozing
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Tushlik, transport, kitoblar xarajatini 1 bosishda kiritib boring. Kassa darhol hisoblaydi.
              </p>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-subtle)' }}>
              <div style={{ fontWeight: 700, color: '#8b5cf6', fontSize: '0.9rem', marginBottom: '4px' }}>
                3. Maqsad va byudjet
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Oylik limitdan oshmaslikka harakat qiling va orzuingizdagi noutbuk uchun pul jamg‘aring!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3D Highlight Visual Banner: 3D Income vs 3D Expense */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* 3D Income Showcase Card */}
        <div 
          className="glass-card card-interactive glow-emerald"
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(6, 182, 212, 0.08) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '18px'
          }}
        >
          <img 
            src="/income-3d.jpg" 
            alt="3D Daromad" 
            className="float-3d"
            style={{
              width: '82px',
              height: '82px',
              borderRadius: '16px',
              objectFit: 'cover',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.45)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              flexShrink: 0
            }}
          />
          <div>
            <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📈 Tushumlar va Jamg‘arma
            </span>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#10b981', margin: '2px 0' }}>
              +{formatMoney(summary.totalIncome)}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Stipendiya, repetitorlik va ota-ona ko‘magi
            </p>
          </div>
        </div>

        {/* 3D Expense Showcase Card */}
        <div 
          className="glass-card card-interactive glow-coral"
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.16) 0%, rgba(245, 158, 11, 0.08) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '18px'
          }}
        >
          <img 
            src="/expense-3d.jpg" 
            alt="3D Xarajat" 
            className="float-3d"
            style={{
              width: '82px',
              height: '82px',
              borderRadius: '16px',
              objectFit: 'cover',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.45)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              flexShrink: 0
            }}
          />
          <div>
            <span style={{ fontSize: '0.78rem', color: '#f87171', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📉 Sarf-Xarajatlar Nazorati
            </span>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ef4444', margin: '2px 0' }}>
              -{formatMoney(summary.totalExpense)}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Oziq-ovqat, transport, yotoqxona va boshqalar
            </p>
          </div>
        </div>

      </div>

      {/* Quick 1-Click Action Chips on Dashboard */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} color="#f59e0b" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Tezkor xarajat kiritish:</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className="quick-tag" 
            onClick={() => handleQuickAdd(15000, 'Oziq-ovqat', 'Qahva va yegulik')}
            title="15,000 so‘m xarajat kiritish"
          >
            ☕ Kofe 15k
          </button>
          <button 
            className="quick-tag" 
            onClick={() => handleQuickAdd(28000, 'Oziq-ovqat', 'Tushlik taom')}
            title="28,000 so‘m xarajat kiritish"
          >
            🍔 Tushlik 28k
          </button>
          <button 
            className="quick-tag" 
            onClick={() => handleQuickAdd(5000, 'Transport', 'Metro / Avtobus')}
            title="5,000 so‘m xarajat kiritish"
          >
            🚌 Yo‘lkira 5k
          </button>
          <button 
            className="quick-tag" 
            onClick={() => handleQuickAdd(35000, 'Kitob va O\'quv qurollari', 'Darslik va daftarlar')}
            title="35,000 so‘m xarajat kiritish"
          >
            📚 Kitob 35k
          </button>
        </div>
      </div>

      {/* Budget Warning Banner if over/warning */}
      {isBudgetOver && (
        <div className="glass-card" style={{
          padding: '16px 20px',
          background: 'rgba(239, 68, 68, 0.18)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <AlertTriangle size={26} color="#ef4444" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: '#f87171', fontSize: '0.98rem' }}>
              Diqqat! Siz belgilangan oylik byudjet limitidan oshib ketdingiz!
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Oylik limit: {formatMoney(budget)}. Hozirgi xarajat: {formatMoney(summary.totalExpense)} (+{formatMoney(summary.totalExpense - budget)} ortiqcha sarf).
            </p>
          </div>
        </div>
      )}

      {isBudgetWarning && (
        <div className="glass-card" style={{
          padding: '16px 20px',
          background: 'rgba(245, 158, 11, 0.18)',
          border: '1px solid rgba(245, 158, 11, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <AlertTriangle size={26} color="#f59e0b" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.98rem' }}>
              Ehtiyot bo‘ling! Oylik byudjetingizning {budgetUsedPercent}% qismi sarflandi.
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Oylik byudjetdan qolgan mablag‘: {formatMoney(Math.max(0, budget - summary.totalExpense))}.
            </p>
          </div>
        </div>
      )}

      {/* 4 Stats Cards with 3D Images */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
        <StatsCard
          title="Shaxsiy Sof Balans"
          value={formatMoney(summary.balance)}
          subtitle={summary.balance >= 0 ? "Kassada yetarli mablag‘ bor" : "Qarzdorlik / limitdan oshish"}
          icon={Wallet}
          color="blue"
        />

        <StatsCard
          title="Jami Tushum (Daromad)"
          value={formatMoney(summary.totalIncome)}
          subtitle="Barcha qayd etilgan tushumlar"
          image3D="/income-3d.jpg"
          color="emerald"
        />

        <StatsCard
          title="Jami Chiqim (Xarajat)"
          value={formatMoney(summary.totalExpense)}
          subtitle={`${transactions.filter(t => t.type === 'expense').length} ta to‘lov amalga oshirilgan`}
          image3D="/expense-3d.jpg"
          color="rose"
        />

        <StatsCard
          title="Oylik Byudjet Limit"
          value={`${budgetUsedPercent}%`}
          subtitle={`Limit: ${formatMoney(budget)}`}
          icon={PieChart}
          color={isBudgetOver ? 'rose' : (isBudgetWarning ? 'amber' : 'purple')}
        />
      </div>

      {/* Budget Progress Bar Card */}
      <div className="glass-card" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Oylik Byudjet Limitining Sarflanishi</span>
            <span className={`badge ${isBudgetOver ? 'badge-danger' : (isBudgetWarning ? 'badge-warning' : 'badge-success')}`}>
              {isBudgetOver ? 'Limit oshdi ⚠️' : `${budgetUsedPercent}% sarflandi`}
            </span>
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-muted)' }}>
            {formatMoney(summary.totalExpense)} / {formatMoney(budget)}
          </div>
        </div>

        <div style={{ height: '12px', width: '100%', background: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${budgetUsedPercent}%`, 
              background: isBudgetOver 
                ? 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)' 
                : 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }} 
          />
        </div>
      </div>

      {/* Two Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Category Breakdown */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Xarajatlar Toifalar Bo‘yicha</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Ulush foizida</span>
          </div>
          <CategoryChart transactions={transactions} />
        </div>

        {/* Weekly Trend */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>So‘nggi 7 Kunlik Xarajatlar</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Dinamika</span>
          </div>
          <WeeklyChart transactions={transactions} />
        </div>

      </div>

      {/* Goals & Announcements Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Savings Goals */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={20} color="#6366f1" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Moliyaviy Maqsadlar</h3>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onOpenNewGoal} style={{ fontSize: '0.8rem' }}>
              + Yangi Maqsad
            </button>
          </div>

          {goals.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textAlign: 'center', padding: '20px 0' }}>
              Hozircha maqsadlar qo‘shilmagan
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {goals.map(g => {
                const percent = Math.min(Math.round((g.currentAmount / g.targetAmount) * 100), 100);
                const isComplete = percent >= 100;
                return (
                  <div key={g.id} className="glass-panel" style={{ padding: '14px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                          {g.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                          {formatMoney(g.currentAmount)} / {formatMoney(g.targetAmount)}
                        </div>
                      </div>
                      <span className={`badge ${isComplete ? 'badge-success' : 'badge-primary'}`}>
                        {isComplete ? 'Erishildi 🎉' : `${percent}%`}
                      </span>
                    </div>

                    <div style={{ height: '7px', width: '100%', background: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          width: `${percent}%`, 
                          background: isComplete ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #6366f1, #06b6d4)', 
                          borderRadius: '999px' 
                        }} 
                      />
                    </div>

                    {!isComplete && (
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => onOpenDepositGoal(g)}
                        style={{ width: '100%', fontSize: '0.78rem', padding: '6px' }}
                      >
                        + Pul qo‘shish
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Announcements & Financial Tips */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Bell size={20} color="#f59e0b" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>E‘lonlar va Maslahatlar</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {announcements.map(ann => (
              <div key={ann.id} style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="badge badge-warning" style={{ fontSize: '0.68rem' }}>
                    {ann.badge || 'E‘lon'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{formatDate(ann.date)}</span>
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '4px' }}>
                  {ann.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  {ann.content}
                </p>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '8px', fontStyle: 'italic' }}>
                  {ann.author}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Transactions List with 3D Badges */}
      <div className="glass-card" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>So‘nggi Xarajatlar va Daromadlar</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0 }}>
              Har bir amaliyot yonida 3D grafik belgilar bilan
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Jami: {transactions.length} ta
          </span>
        </div>

        {transactions.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-dim)' }}>
            Amaliyotlar topilmadi
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {transactions.slice(0, 6).map(tx => {
              const isIncome = tx.type === 'income';
              return (
                <div 
                  key={tx.id}
                  className="card-interactive"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    borderRadius: '14px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* 3D Image badge */}
                    <img 
                      src={isIncome ? '/income-3d.jpg' : '/expense-3d.jpg'} 
                      alt={isIncome ? '3D Daromad' : '3D Xarajat'}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        objectFit: 'cover',
                        border: isIncome ? '1.5px solid #10b981' : '1.5px solid #ef4444',
                        boxShadow: isIncome ? '0 2px 10px rgba(16, 185, 129, 0.3)' : '0 2px 10px rgba(239, 68, 68, 0.3)'
                      }}
                    />

                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                        {tx.category}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {tx.description || tx.method} • {formatDate(tx.date)}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: isIncome ? '#10b981' : '#ef4444'
                    }}>
                      {isIncome ? '+' : '-'}{formatMoney(tx.amount)}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      {tx.method}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
