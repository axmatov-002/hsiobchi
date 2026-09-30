import React, { useState, useEffect } from 'react';
import { requestsApi } from '../services/api';
import { formatMoney, formatDate } from '../utils/formatters';
import { HandCoins, PlusCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function RequestsView({ onOpenNewRequest }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await requestsApi.getAll();
      if (res.success) {
        setRequests(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HandCoins size={24} color="#8b5cf6" />
            <span>Moddiy Yordam va Grant Arizalari</span>
          </h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            O‘qish, konferensiya, kitoblar va ilmiy loyihalar uchun yuborilgan so‘rovlar tarixi
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenNewRequest}>
          <PlusCircle size={16} />
          <span>Yangi Ariza Yuborish</span>
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <HandCoins size={48} color="#8b5cf6" style={{ margin: '0 auto 16px', opacity: 0.7 }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Sizda hali moddiy yordam arizalari yo‘q</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', maxWidth: '420px', margin: '6px auto 20px' }}>
            Agar sizga konferensiya chiptasi, kitob xaridi yoki favqulodda yordam zarur bo‘lsa, menejerga ariza yuborishingiz mumkin.
          </p>
          <button className="btn btn-primary" onClick={onOpenNewRequest}>
            Ariza Yuborish
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {requests.map((r) => {
            const isApproved = r.status === 'approved';
            const isRejected = r.status === 'rejected';
            const isPending = r.status === 'pending';

            return (
              <div 
                key={r.id}
                className="glass-card"
                style={{
                  padding: '20px 24px',
                  borderRadius: '14px',
                  border: isApproved 
                    ? '1px solid rgba(16, 185, 129, 0.3)' 
                    : (isRejected ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)')
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                        {r.title}
                      </h3>
                      <span className={`badge ${isApproved ? 'badge-success' : (isRejected ? 'badge-danger' : 'badge-warning')}`}>
                        {isApproved ? 'Tasdiqlangan ✅' : (isRejected ? 'Rad etilgan ❌' : 'Ko‘rib chiqilmoqda ⏳')}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                      Kategoriya: <strong style={{ color: 'var(--text-main)' }}>{r.category}</strong> • Sana: {formatDate(r.createdAt)}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>
                      {formatMoney(r.amount)}
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '12px',
                  padding: '12px 14px',
                  background: 'var(--bg-subtle)',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  color: 'var(--text-main)'
                }}>
                  <strong>Asoslash:</strong> {r.reason}
                </div>

                {r.managerNote && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px 14px',
                    background: isApproved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderLeft: `4px solid ${isApproved ? '#10b981' : '#ef4444'}`,
                    borderRadius: '6px',
                    fontSize: '0.84rem'
                  }}>
                    <strong>Menejer qarori ({r.reviewedBy}):</strong> {r.managerNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
