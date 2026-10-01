import React, { useState } from 'react';
import { formatMoney } from '../utils/formatters';
import { 
  ArrowRightLeft, 
  TrendingUp, 
  DollarSign, 
  Euro, 
  HelpCircle,
  Coins
} from 'lucide-react';

export default function CurrencyWidget() {
  const [amount, setAmount] = useState('100');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Realistic CBU rates (Markaziy Bank)
  const rates = {
    USD: { name: 'AQSH Dollari', code: 'USD', rate: 12850, change: '+15.2' },
    EUR: { name: 'Yevro', code: 'EUR', rate: 13950, change: '-8.5' },
    RUB: { name: 'Rossiya Rubli', code: 'RUB', rate: 138.5, change: '+0.4' }
  };

  const currentRate = rates[selectedCurrency]?.rate || 12850;
  const numAmount = parseFloat(amount) || 0;
  const convertedUZS = Math.round(numAmount * currentRate);

  return (
    <div className="glass-card" style={{ padding: '20px', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Coins size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Markaziy Bank Kurslari</h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Rasmiy valyuta kursi & konvertor</span>
          </div>
        </div>

        <span className="badge badge-success" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
          Jonli CBU
        </span>
      </div>

      {/* Rates Ribbon */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {Object.entries(rates).map(([code, item]) => {
          const isSelected = selectedCurrency === code;
          return (
            <div
              key={code}
              onClick={() => setSelectedCurrency(code)}
              style={{
                padding: '10px 8px',
                borderRadius: '12px',
                background: isSelected ? 'var(--primary-light)' : 'var(--bg-subtle)',
                border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-muted)' }}>
                1 {code}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)' }}>
                {item.rate.toLocaleString('uz-UZ')}
              </div>
              <div style={{ 
                fontSize: '0.65rem', 
                fontWeight: 600, 
                color: item.change.startsWith('+') ? '#10b981' : '#ef4444', 
                marginTop: '1px' 
              }}>
                {item.change} so‘m
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Converter Box */}
      <div style={{
        background: 'var(--bg-subtle)',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)' }}>Tezkor Hisoblagich:</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            1 {selectedCurrency} = {currentRate.toLocaleString('uz-UZ')} so‘m
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Miqdor"
              style={{ paddingRight: '48px', fontSize: '0.9rem', height: '38px' }}
            />
            <span style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontWeight: 700,
              fontSize: '0.8rem',
              color: 'var(--text-dim)'
            }}>
              {selectedCurrency}
            </span>
          </div>

          <div style={{ color: 'var(--text-dim)', flexShrink: 0 }}>
            <ArrowRightLeft size={16} />
          </div>

          <div style={{
            flex: 1.4,
            padding: '8px 12px',
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontSize: '0.95rem',
            fontWeight: 800,
            color: '#10b981',
            textAlign: 'right',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {formatMoney(convertedUZS)}
          </div>
        </div>

        <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: 0, fontStyle: 'italic' }}>
          * Kurslar kontrakt to‘lovlari, texnika va chet el sertifikatlari rejalashtirish uchun qulay.
        </p>
      </div>

    </div>
  );
}
