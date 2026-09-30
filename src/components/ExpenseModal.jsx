import React, { useState } from 'react';
import { X, TrendingDown, TrendingUp, Sparkles, Check, Zap } from 'lucide-react';
import { transactionsApi } from '../services/api';
import confetti from 'canvas-confetti';

export default function ExpenseModal({ isOpen, onClose, onSuccess }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Oziq-ovqat');
  const [method, setMethod] = useState('UzCard');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const expenseCategories = [
    'Oziq-ovqat',
    'Ijara / Yotoqxona',
    'Transport',
    'Kitob va O\'quv qurollari',
    'Ta\'lim kurslari',
    'Kiyim-kechak',
    'Aloqa va Internet',
    'Ko\'ngilochar va Dam olish',
    'Salomatlik / Dori-darmon',
    'Boshqa xarajatlar'
  ];

  const incomeCategories = [
    'Stipendiya',
    'Ota-onadan jo\'natma',
    'Ish / Freelance',
    'Repetitorlik',
    'Moddiy rag‘bat / Grant',
    'Boshqa daromad'
  ];

  // Quick One-Click Presets
  const expensePresets = [
    { label: '☕ Kofe / Nonushta', amount: 18000, cat: 'Oziq-ovqat', desc: 'Ertalabki kofe va shirinlik' },
    { label: '🍔 Tushlik', amount: 32000, cat: 'Oziq-ovqat', desc: 'Universitet oshxonasida tushlik' },
    { label: '🚌 Metro / Avtobus', amount: 6000, cat: 'Transport', desc: 'Yo‘lkira xarajati' },
    { label: '📚 Kitob / Nusxa', amount: 45000, cat: 'Kitob va O\'quv qurollari', desc: 'Darslik va konspekt' },
    { label: '📱 Mobil Internet', amount: 40000, cat: 'Aloqa va Internet', desc: 'Oylik internet paketi' },
  ];

  const incomePresets = [
    { label: '🎓 Oylik Stipendiya', amount: 1200000, cat: 'Stipendiya', desc: 'Universitet stipendiyasi' },
    { label: '❤️ Ota-onadan yordam', amount: 800000, cat: 'Ota-onadan jo\'natma', desc: 'Oylik xarajatlar uchun jo‘natma' },
    { label: '💻 Freelance / Buyurtma', amount: 500000, cat: 'Ish / Freelance', desc: 'IT / Dizayn loyihasi to‘lovi' },
    { label: '📖 Repetitorlik darsi', amount: 250000, cat: 'Repetitorlik', desc: 'Ingliz tili darsidan tushum' },
  ];

  const paymentMethods = ['UzCard', 'Humo', 'Click', 'Payme', 'Naqd pul', 'Bank o‘tkazmasi'];

  const applyPreset = (preset) => {
    setAmount(preset.amount.toString());
    setCategory(preset.cat);
    setDescription(preset.desc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setError('Iltimos, haqiqiy summani kiriting');
      return;
    }

    setLoading(true);
    try {
      await transactionsApi.create({
        type,
        amount: numAmount,
        category,
        method,
        description,
        date
      });

      // Celebration confetti for income
      if (type === 'income') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      }

      setAmount('');
      setDescription('');
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Xarajatni saqlashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-slide-up" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          padding: '24px', 
          maxWidth: '560px',
          border: type === 'income' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {type === 'expense' ? (
                <>
                  <span style={{ color: '#ef4444' }}>📉 Xarajat Qayd Etish</span>
                </>
              ) : (
                <>
                  <span style={{ color: '#10b981' }}>📈 Daromad Qo‘shish</span>
                </>
              )}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: '2px 0 0' }}>
              {type === 'income' ? 'Yangi tushumni qayd qiling va balansingizni oshiring' : 'Bugungi sarf-xarajatingizni aniq hisoblab boring'}
            </p>
          </div>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 3D Visual Hero Banner */}
        <div 
          className={type === 'income' ? 'glow-emerald' : 'glow-coral'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '14px 18px',
            borderRadius: '16px',
            background: type === 'income' 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.12) 100%)' 
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(245, 158, 11, 0.12) 100%)',
            border: type === 'income' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            marginBottom: '18px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* 3D Image */}
          <div style={{ flexShrink: 0 }}>
            <img 
              src={type === 'income' ? '/income-3d.jpg' : '/expense-3d.jpg'} 
              alt={type === 'income' ? '3D Daromad' : '3D Xarajat'}
              className="float-3d"
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '14px',
                objectFit: 'cover',
                boxShadow: type === 'income' ? '0 6px 20px rgba(16, 185, 129, 0.4)' : '0 6px 20px rgba(239, 68, 68, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ 
              fontSize: '0.96rem', 
              fontWeight: 800, 
              color: type === 'income' ? '#34d399' : '#f87171',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={16} />
              <span>{type === 'income' ? 'Barakali daromad!' : 'Aqlli xarajat rejalashtirish'}</span>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {type === 'income' 
                ? 'Har bir kiritilgan tushum shaxsiy jamg‘arma va byudjetingizni boyitadi.' 
                : 'Xarajatlaringizni toifalarga ajratib, ortiqcha sarf-xarajatning oldini oling.'}
            </p>
          </div>
        </div>

        {error && (
          <div className="badge-danger" style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.84rem' }}>
            {error}
          </div>
        )}

        {/* Type switch pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: '12px' }}>
          <button
            type="button"
            className="btn"
            style={{
              padding: '10px',
              borderRadius: '9px',
              gap: '8px',
              background: type === 'expense' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'transparent',
              color: type === 'expense' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              fontWeight: 700
            }}
            onClick={() => { setType('expense'); setCategory('Oziq-ovqat'); }}
          >
            <TrendingDown size={17} />
            <span>Xarajat Qayd Qilish</span>
          </button>

          <button
            type="button"
            className="btn"
            style={{
              padding: '10px',
              borderRadius: '9px',
              gap: '8px',
              background: type === 'income' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: type === 'income' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              fontWeight: 700
            }}
            onClick={() => { setType('income'); setCategory('Stipendiya'); }}
          >
            <TrendingUp size={17} />
            <span>Daromad Qo‘shish</span>
          </button>
        </div>

        {/* Quick 1-Click Presets */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
            <Zap size={14} color="#f59e0b" />
            <span>Tezkor tayyor qiymatlar (1 bosishda to‘ldirish):</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(type === 'expense' ? expensePresets : incomePresets).map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="quick-tag"
                onClick={() => applyPreset(p)}
                title={`Kiritish: ${new Intl.NumberFormat('uz-UZ').format(p.amount)} so‘m`}
              >
                <span>{p.label}</span>
                <span style={{ color: type === 'income' ? '#10b981' : '#f87171', fontWeight: 700 }}>
                  ({new Intl.NumberFormat('uz-UZ').format(p.amount / 1000)}k)
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Amount input */}
          <div className="form-group">
            <label className="form-label">Summa (so‘mda)*</label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                className="form-input"
                placeholder="Masalan: 35000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 800, 
                  paddingLeft: '44px',
                  color: type === 'income' ? '#10b981' : '#ef4444'
                }}
              />
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                UZS
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Toifa (Kategoriya)*</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {(type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Payment Method */}
            <div className="form-group">
              <label className="form-label">To‘lov Usuli</label>
              <select
                className="form-select"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                {paymentMethods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="form-label">Sana</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Izoh / Tafsilot</label>
            <input
              type="text"
              className="form-input"
              placeholder="Masalan: Korzinkadan shirinlik va choy"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Bekor qilish
            </button>
            <button
              type="submit"
              className={type === 'expense' ? 'btn btn-danger' : 'btn btn-success'}
              disabled={loading}
              style={{ flex: 2, gap: '8px' }}
            >
              {loading ? 'Saqlanmoqda...' : (type === 'expense' ? 'Xarajatni Saqlash' : 'Daromadni Qo‘shish 🎉')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
