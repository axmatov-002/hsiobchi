import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionsApi, goalsApi, commonApi, authApi } from '../services/api';
import { formatMoney, formatDate } from '../utils/formatters';
import StatsCard from '../components/StatsCard';
import { CategoryChart, WeeklyChart } from '../components/Charts';
import DailyBudgetAdvisor from '../components/DailyBudgetAdvisor';
import CurrencyWidget from '../components/CurrencyWidget';
import ReceiptModal from '../components/ReceiptModal';
import TelegramModal from '../components/TelegramModal';
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
  Award,
  Send,
  Receipt,
  RotateCcw
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

  // Modals for realism
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState(null);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);

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

  const handleResetAll = async () => {
    const confirmReset = window.confirm("Rostdan ham barcha daromad, xarajat va maqsadlarni tozalab, hisobni boshidan (0 dan) boshlamoqchimisiz?");
    if (!confirmReset) return;
    try {
      await authApi.resetData();
      await fetchData();
      alert("Barcha hisob-kitoblar tozalandi! Endi kassa daftaringizni 0 dan boshlashingiz mumkin.");
    } catch (e) {
      alert(e.message || "Xatolik yuz berdi");
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

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsTelegramModalOpen(true)}
            style={{ gap: '6px', color: '#38bdf8' }}
            title="Telegram Bot orqali ulanish"
          >
            <Send size={15} />
            <span>@TalabaKassaBot</span>
          </button>

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
          
          <button 
            className="btn btn-ghost btn-sm" 
            onClick={handleResetAll}
            style={{ gap: '6px', color: 'var(--text-muted)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
            title="Barcha ma'lumotlarni tozalab, 0 dan boshlash"
          >
            <RotateCcw size={14} />
            <span>Boshidan boshlash</span>
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
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📈 Tushumlar va Jamg‘arma
            </span>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#10b981', margin: '2px 0', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
              {summary.totalIncome > 0 ? '+' : ''}{formatMoney(summary.totalIncome)}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, whiteSpace: 'normal' }}>
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
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.78rem', color: '#f87171', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📉 Sarf-Xarajatlar Nazorati
            </span>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ef4444', margin: '2px 0', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
              {summary.totalExpense > 0 ? '-' : ''}{formatMoney(summary.totalExpense)}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, whiteSpace: 'normal' }}>
              Ijara, oziq-ovqat, transport va o‘quv qurollari
            </p>
          </div>
        </div>

      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <StatsCard
          title="Shaxsiy Balans (Kassa)"
          value={formatMoney(summary.balance)}
          subtext={summary.balance >= 0 ? 'Erkin qoldiq mavjud' : 'Kassada kamomad'}
          type={summary.balance >= 0 ? 'positive' : 'negative'}
          icon={Wallet}
        />

        <StatsCard
          title="Oylik Sarflangan"
          value={formatMoney(summary.totalExpense)}
          subtext={`Byudjetdan sarf: ${budgetUsedPercent}%`}
          type={isBudgetOver ? 'negative' : (isBudgetWarning ? 'warning' : 'neutral')}
          icon={TrendingDown}
        />

        <StatsCard
          title="Oylik Tushum"
          value={formatMoney(summary.totalIncome)}
          subtext="Jami daromadlar miqdori"
          type="positive"
          icon={TrendingUp}
        />

        <StatsCard
          title="Oylik Byudjet Chegarasi"
          value={formatMoney(budget)}
          subtext={isBudgetOver ? 'Limit oshib ketdi!' : `Qolgan: ${formatMoney(Math.max(0, budget - summary.totalExpense))}`}
          type={isBudgetOver ? 'negative' : 'neutral'}
          icon={Award}
        />
      </div>

      {/* Smart Daily Budget Advisor Widget */}
      <DailyBudgetAdvisor
        summary={summary}
        budget={budget}
        onQuickAdd={handleQuickAdd}
      />

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        <CategoryChart transactions={transactions} />
        <WeeklyChart transactions={transactions} />
      </div>

      {/* Currency Exchange & Goals Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Currency Widget */}
        <CurrencyWidget />

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

      </div>

      {/* Recent Transactions List with Receipt Trigger */}
      <div className="glass-card" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>So‘nggi Xarajatlar & Fiskal Kvitansiyalar</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0 }}>
              Har bir amaliyot yonidagi "Chek" tugmasini bosib rasmiy kvitansiyani ko‘ring
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
                    border: '1px solid var(--border-color)',
                    flexWrap: 'wrap',
                    gap: '12px'
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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

                    <button
                      onClick={() => setSelectedTxForReceipt(tx)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '4px' }}
                      title="Elektron fiskal kvitansiyani ko'rish"
                    >
                      <Receipt size={14} color="#818cf8" />
                      <span>Chek</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Realistic Fiscal Receipt Modal */}
      <ReceiptModal
        isOpen={Boolean(selectedTxForReceipt)}
        onClose={() => setSelectedTxForReceipt(null)}
        transaction={selectedTxForReceipt}
        user={user}
      />

      {/* Telegram Modal */}
      <TelegramModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        user={user}
      />

    </div>
  );
}
