import React, { useState } from 'react';
import { formatMoney } from '../utils/formatters';
import { 
  Sparkles, 
  Calendar, 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Coffee,
  Utensils,
  Bus,
  BookOpen
} from 'lucide-react';

export default function DailyBudgetAdvisor({ summary, budget, onQuickAdd }) {
  const [addedNotice, setAddedNotice] = useState('');

  // Calculate days remaining in the current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = now.getDate();
  const daysRemaining = Math.max(1, totalDaysInMonth - currentDay + 1);

  // Remaining budget
  const spent = summary?.totalExpense || 0;
  const remainingBudget = Math.max(0, budget - spent);
  
  // Recommended daily limit
  const recommendedDaily = Math.round(remainingBudget / daysRemaining);

  // Common quick expense presets
  const quickPresets = [
    { label: 'Tushlik', amount: 32000, category: 'Oziq-ovqat', icon: Utensils },
    { label: 'ATTO Metro/Avtobus', amount: 3000, category: 'Transport', icon: Bus },
    { label: 'Kofe / Choy', amount: 16000, category: "Ko'ngilochar va Dam olish", icon: Coffee },
    { label: 'Daftar / Qalam', amount: 9000, category: "Kitob va O'quv qurollari", icon: BookOpen }
  ];

  const handleAddPreset = async (preset) => {
    if (onQuickAdd) {
      await onQuickAdd(preset.amount, preset.category, `Tezkor kiritildi: ${preset.label}`);
      setAddedNotice(`✓ ${preset.label} (${formatMoney(preset.amount)}) muvaffaqiyatli qayd etildi!`);
      setTimeout(() => setAddedNotice(''), 3000);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '22px', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Smart Kunlik Byudjet & AI Maslahatchi</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
              Oy oxirigacha {daysRemaining} kun qoldi
            </span>
          </div>
        </div>

        <div style={{
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)',
          background: remainingBudget > 0 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          color: remainingBudget > 0 ? '#10b981' : '#ef4444',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          {remainingBudget > 0 ? `Qoldiq: ${formatMoney(remainingBudget)}` : 'Limit to‘liq sarflandi'}
        </div>
      </div>

      {/* Main KPI Gauge */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Bugun sarflash mumkin bo‘lgan xavfsiz me'yor:
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
            {formatMoney(recommendedDaily)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ kun</span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Agar har kuni ushbu limitdan oshmasangiz, oy oxirida byudjetdan chiqib ketmaysiz.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Rejadagi oylik byudjet</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
            {formatMoney(budget)}
          </div>
          <div style={{ fontSize: '0.74rem', color: spent > budget ? '#ef4444' : '#10b981', marginTop: '2px' }}>
            {spent > budget ? `Ortiqcha: +${formatMoney(spent - budget)}` : `Sarflangan: ${formatMoney(spent)}`}
          </div>
        </div>
      </div>

      {/* Quick 1-Click Common Student Expenses */}
      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={14} color="#f59e0b" />
          <span>Talabalar uchun 1-bosishda tezkor xarajat qayd qilish:</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
          {quickPresets.map((preset, idx) => {
            const Icon = preset.icon;
            return (
              <button
                key={idx}
                onClick={() => handleAddPreset(preset)}
                className="btn btn-secondary"
                style={{
                  padding: '9px 10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  justifyContent: 'flex-start',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease'
                }}
                title={`${preset.label} xarajatini qo'shish`}
              >
                <Icon size={16} color="#818cf8" />
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.76rem' }}>{preset.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{formatMoney(preset.amount)}</div>
                </div>
              </button>
            );
          })}
        </div>

        {addedNotice && (
          <div style={{ 
            marginTop: '8px', 
            padding: '6px 12px', 
            borderRadius: '8px', 
            background: 'rgba(16, 185, 129, 0.15)', 
            color: '#10b981', 
            fontSize: '0.76rem', 
            fontWeight: 600 
          }}>
            {addedNotice}
          </div>
        )}
      </div>

      {/* Smart Advice Alert */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 14px',
        borderRadius: '12px',
        background: 'var(--bg-subtle)',
        borderLeft: '4px solid #6366f1'
      }}>
        <Lightbulb size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.8rem', lineHeight: 1.45, color: 'var(--text-main)' }}>
          <strong>Moliyaviy Tavsiya:</strong> Haftalik oziq-ovqat va kantselyariya xaridlarini oldindan rejalashtirish mayda impulsiv xarajatlarni 25% gacha kamaytiradi.
        </div>
      </div>

    </div>
  );
}
