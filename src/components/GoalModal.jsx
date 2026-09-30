import React, { useState } from 'react';
import { X, Target, PlusCircle, CheckCircle2 } from 'lucide-react';
import { goalsApi } from '../services/api';
import confetti from 'canvas-confetti';

export default function GoalModal({ isOpen, onClose, onSuccess, existingGoal = null }) {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Deposit into existing goal
  const handleDeposit = async (e) => {
    e.preventDefault();
    setError('');
    const amt = Number(depositAmount);
    if (!amt || amt <= 0) {
      setError('Mablag‘ summasini to‘g‘ri kiriting');
      return;
    }

    setLoading(true);
    try {
      const res = await goalsApi.deposit(existingGoal.id, amt);
      if (res.data && res.data.currentAmount >= res.data.targetAmount) {
        // Trigger celebratory confetti!
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  // Create new goal
  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    const target = Number(targetAmount);
    if (!title.trim() || !target || target <= 0) {
      setError('Maqsad nomi va maqsadli summani to‘g‘ri kiriting');
      return;
    }

    setLoading(true);
    try {
      await goalsApi.create({
        title,
        targetAmount: target,
        currentAmount: Number(initialAmount) || 0,
        deadline,
        category: 'Jamg‘arma'
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
              <Target size={20} color="#6366f1" />
              <span>{existingGoal ? 'Maqsadga Pul Qo‘shish' : 'Yangi Moliyaviy Maqsad'}</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0 }}>
              {existingGoal 
                ? `"${existingGoal.title}" uchun jamg‘armani to‘ldiring` 
                : 'Orzuingizdagi xarid yoki safar uchun reja qiling'}
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

        {existingGoal ? (
          <form onSubmit={handleDeposit}>
            <div className="glass-card" style={{ padding: '16px', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Hozirgi jamg‘arma:</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                {new Intl.NumberFormat('uz-UZ').format(existingGoal.currentAmount)} / {new Intl.NumberFormat('uz-UZ').format(existingGoal.targetAmount)} so‘m
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Qo‘shiladigan summa (so‘m)*</label>
              <input
                type="number"
                className="form-input"
                placeholder="Masalan: 200000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                required
                style={{ fontSize: '1.2rem', fontWeight: 700 }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>
                Bekor qilish
              </button>
              <button type="submit" className="btn btn-success" disabled={loading} style={{ flex: 2 }}>
                {loading ? 'Bajarilmoqda...' : 'Jamg‘armaga Qo‘shish'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Maqsad nomi*</label>
              <input
                type="text"
                className="form-input"
                placeholder="Masalan: Yangi noutbuk yoki IELTS to‘lovi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Maqsad summasi (so‘m)*</label>
              <input
                type="number"
                className="form-input"
                placeholder="Masalan: 5000000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
                style={{ fontSize: '1.1rem', fontWeight: 700 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Boshlang‘ich summa</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Muddat (Sana)</label>
                <input
                  type="date"
                  className="form-input"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>
                Bekor qilish
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 2 }}>
                {loading ? 'Saqlanmoqda...' : 'Maqsadni Saqlash'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
