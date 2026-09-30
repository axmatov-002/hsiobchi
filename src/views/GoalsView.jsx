import React, { useState, useEffect } from 'react';
import { goalsApi } from '../services/api';
import { formatMoney, formatDate } from '../utils/formatters';
import { Target, PlusCircle, Trash2, Calendar, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GoalsView({ onOpenNewGoal, onOpenDepositGoal }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const res = await goalsApi.getAll();
      if (res.success) {
        setGoals(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bu maqsadni o‘chirishni xohlaysizmi?')) return;
    try {
      await goalsApi.delete(id);
      loadGoals();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target size={24} color="#6366f1" />
            <span>Moliyaviy Maqsadlar va Jamg‘armalar</span>
          </h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            O‘qish, yangi noutbuk, til o‘rganish yoki sayohat uchun rejalashtirilgan mablag‘lar
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenNewGoal}>
          <PlusCircle size={16} />
          <span>Yangi Maqsad Qo‘shish</span>
        </button>
      </div>

      {/* Grid of goals */}
      {goals.length === 0 ? (
        <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Target size={48} color="#6366f1" style={{ margin: '0 auto 16px', opacity: 0.7 }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Hozircha moliyaviy maqsadlar belgilanmagan</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', maxWidth: '400px', margin: '6px auto 20px' }}>
            O‘zingiz uchun maqsad belgilang va har oy unga mablag‘ ajratib borib, orzuyingizga erishing!
          </p>
          <button className="btn btn-primary" onClick={onOpenNewGoal}>
            Birinchi Maqsadni Belgilash
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {goals.map((g) => {
            const percent = Math.min(Math.round((g.currentAmount / g.targetAmount) * 100), 100);
            const isCompleted = percent >= 100;
            const remaining = Math.max(0, g.targetAmount - g.currentAmount);

            return (
              <div 
                key={g.id}
                className="glass-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isCompleted ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                  background: isCompleted ? 'rgba(16, 185, 129, 0.04)' : 'var(--bg-card)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                      {g.title}
                    </h3>
                    <button 
                      className="btn btn-ghost btn-sm" 
                      onClick={() => handleDelete(g.id)}
                      style={{ padding: '4px', color: 'var(--text-dim)' }}
                      title="O‘chirish"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Yig‘ilgan mablag‘:</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isCompleted ? '#10b981' : '#818cf8' }}>
                        {formatMoney(g.currentAmount)}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Maqsad:</span>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        {formatMoney(g.targetAmount)}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: '10px', width: '100%', background: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${percent}%`, 
                        background: isCompleted 
                          ? 'linear-gradient(90deg, #10b981, #059669)' 
                          : 'linear-gradient(90deg, #6366f1, #06b6d4)', 
                        borderRadius: '999px',
                        transition: 'width 0.4s ease'
                      }} 
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: '16px' }}>
                    <span>{percent}% to‘plandi</span>
                    <span>Qoldi: {formatMoney(remaining)}</span>
                  </div>

                  {g.deadline && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      <Calendar size={14} />
                      <span>Belgilangan muddat: {formatDate(g.deadline)}</span>
                    </div>
                  )}
                </div>

                <div>
                  {isCompleted ? (
                    <div style={{
                      padding: '10px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 700,
                      color: '#10b981',
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <CheckCircle2 size={16} />
                      <span>Maqsad to‘liq amalga oshdi!</span>
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                      onClick={() => onOpenDepositGoal(g)}
                    >
                      + Pul qo‘shish
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
