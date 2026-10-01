import React, { useState } from 'react';
import { X, HandCoins } from 'lucide-react';
import { requestsApi } from '../services/api';

export default function RequestModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Moddiy yordam');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const categories = [
    'Moddiy yordam',
    'Konferensiya / Hakaton',
    'Olimpiada xarajatlari',
    'Sertifikat imtihoni to‘lovi',
    'Kitob va ta\'lim granti',
    'Favqulodda ehtiyoj'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const numAmount = Number(amount);
    if (!title.trim() || !numAmount || numAmount <= 0 || !reason.trim()) {
      setError('Iltimos, barcha maydonlarni to‘liq to‘ldiring');
      return;
    }
    if (numAmount > 1000000000) {
      setError('Maksimal summa 1,000,000,000 so‘mdan oshmasligi kerak');
      return;
    }

    setLoading(true);
    try {
      await requestsApi.create({
        title,
        amount: numAmount,
        category,
        reason
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HandCoins size={22} color="#8b5cf6" />
              <span>Moddiy Yordam / Grant So‘rovi</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0 }}>
              Universitet menejeri yoki murabbiyiga moliyaviy yordam arizasini jo‘nating
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

        {error && (
          <div className="badge-danger" style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Ariza / So‘rov mavzusi*</label>
            <input
              type="text"
              className="form-input"
              placeholder="Masalan: Respublika konferensiyasiga yo‘l chiptasi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">So‘ralayotgan summa (so‘m)*</label>
              <input
                type="number"
                className="form-input"
                placeholder="500000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{ fontWeight: 700 }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kategoriya</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Batafsil asoslash / Sababi*</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Nima uchun bu mablag‘ zarur ekanligini, natijasi qanday bo‘lishini tushuntirib yozing..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Bekor qilish
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 2 }}>
              {loading ? 'Yuborilmoqda...' : 'Menejerga Yuborish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
