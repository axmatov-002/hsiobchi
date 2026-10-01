import React from 'react';
import { formatMoney, formatDate } from '../utils/formatters';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Copy, 
  Building2, 
  CreditCard, 
  Calendar, 
  Hash, 
  User, 
  Tag, 
  QrCode 
} from 'lucide-react';

export default function ReceiptModal({ isOpen, onClose, transaction, user }) {
  if (!isOpen || !transaction) return null;

  const isIncome = transaction.type === 'income';
  const receiptNo = `TK-${transaction.id ? transaction.id.replace('tx_', '') : '84920'}-${new Date(transaction.date || Date.now()).getFullYear()}`;
  const fiscalCode = `FISC-${Math.abs(hashCode(transaction.id || 'seed')) % 899999 + 100000}`;
  const timestamp = transaction.createdAt 
    ? new Date(transaction.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '14:32:05';

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReceiptId = () => {
    navigator.clipboard.writeText(receiptNo);
    alert(`Chek raqami nusxalandi: ${receiptNo}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="glass-panel receipt-modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          padding: '0',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          position: 'relative'
        }}
      >
        {/* Actions Header Bar */}
        <div style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem' }}>🧾</span>
            <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>Elektron Fiskal Kvitansiya</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              className="btn btn-secondary btn-sm"
              title="Chop etish yoki PDF qilib saqlash"
              style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
            >
              <Printer size={15} />
              <span>Chop etish</span>
            </button>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm"
              style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div 
          id="printable-receipt"
          style={{
            padding: '28px 24px 32px',
            fontFamily: "'Courier New', Courier, monospace",
            color: 'var(--text-main)',
            position: 'relative'
          }}
        >
          {/* Top Brand & Fiscal Authority Header */}
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              color: '#ffffff',
              marginBottom: '10px'
            }}>
              <Building2 size={24} />
            </div>
            <h3 style={{ 
              fontSize: '1.15rem', 
              fontWeight: 800, 
              letterSpacing: '1px', 
              fontFamily: 'var(--font-family)',
              margin: '0 0 2px'
            }}>
              TALABAKASSA FINTECH
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: 0, letterSpacing: '0.5px' }}>
              O'ZBEKISTON YOSHLAR MOLIYAVIY KASSA TIZIMI
            </p>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)', margin: '2px 0 0' }}>
              Toshkent sh., Universitetlararo raqamli integratsiya
            </p>
          </div>

          {/* Dotted Divider */}
          <div style={{ borderBottom: '1px dashed var(--border-color)', margin: '14px 0' }} />

          {/* Transaction Status Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '20px',
            background: isIncome ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)',
            color: isIncome ? '#10b981' : '#818cf8',
            fontWeight: 700,
            fontSize: '0.8rem',
            margin: '0 auto 16px',
            width: 'fit-content'
          }}>
            <CheckCircle2 size={16} />
            <span>{isIncome ? 'MABLAG‘ TUSHUMI QAYD ETILDI' : 'XARAJAT MUVAFFAQAYATLI O‘TDI'}</span>
          </div>

          {/* Large Amount */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isIncome ? 'Tushum Miqdori' : 'To‘lov Miqdori'}
            </div>
            <div style={{
              fontSize: '1.9rem',
              fontWeight: 800,
              color: isIncome ? '#10b981' : '#f43f5e',
              fontFamily: 'var(--font-family)',
              marginTop: '4px'
            }}>
              {isIncome ? '+' : '-'}{formatMoney(transaction.amount)}
            </div>
          </div>

          {/* Itemized Info Table */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: '12px',
            padding: '14px',
            fontSize: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-dim)' }}>Chek raqami:</span>
              <span 
                onClick={handleCopyReceiptId}
                style={{ fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Nusxalash uchun bosing"
              >
                {receiptNo}
                <Copy size={12} color="var(--text-dim)" />
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Sana va vaqt:</span>
              <span style={{ fontWeight: 600 }}>{formatDate(transaction.date)} {timestamp}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Toifa:</span>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{transaction.category}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>To‘lov usuli:</span>
              <span style={{ fontWeight: 600 }}>{transaction.method || 'Karta (Humo / UzCard)'}</span>
            </div>

            {user?.name && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)' }}>Talaba:</span>
                <span style={{ fontWeight: 600 }}>{user.name}</span>
              </div>
            )}

            {user?.institution && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)' }}>OTM:</span>
                <span style={{ fontWeight: 600, maxWidth: '200px', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.institution}
                </span>
              </div>
            )}

            {transaction.description && (
              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '2px' }}>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginBottom: '2px' }}>Izoh:</div>
                <div style={{ fontWeight: 500, color: 'var(--text-main)', fontStyle: 'italic' }}>
                  "{transaction.description}"
                </div>
              </div>
            )}
          </div>

          {/* Dotted Divider */}
          <div style={{ borderBottom: '1px dashed var(--border-color)', margin: '18px 0' }} />

          {/* Fiscal QR and Authenticity Stamp */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            {/* Mock Authentic QR Code */}
            <div style={{
              background: '#ffffff',
              padding: '8px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              {/* SVG QR Code Simulation */}
              <svg width="74" height="74" viewBox="0 0 74 74" fill="none">
                <rect width="74" height="74" fill="white"/>
                {/* Top-left position marker */}
                <rect x="6" y="6" width="20" height="20" fill="black"/>
                <rect x="9" y="9" width="14" height="14" fill="white"/>
                <rect x="12" y="12" width="8" height="8" fill="black"/>
                {/* Top-right position marker */}
                <rect x="48" y="6" width="20" height="20" fill="black"/>
                <rect x="51" y="9" width="14" height="14" fill="white"/>
                <rect x="54" y="12" width="8" height="8" fill="black"/>
                {/* Bottom-left position marker */}
                <rect x="6" y="48" width="20" height="20" fill="black"/>
                <rect x="9" y="51" width="14" height="14" fill="white"/>
                <rect x="12" y="54" width="8" height="8" fill="black"/>
                {/* Data blocks */}
                <rect x="30" y="8" width="5" height="5" fill="black"/>
                <rect x="38" y="14" width="5" height="5" fill="black"/>
                <rect x="32" y="24" width="5" height="5" fill="black"/>
                <rect x="14" y="32" width="5" height="5" fill="black"/>
                <rect x="22" y="32" width="5" height="5" fill="black"/>
                <rect x="40" y="30" width="6" height="6" fill="black"/>
                <rect x="52" y="34" width="5" height="5" fill="black"/>
                <rect x="62" y="32" width="5" height="5" fill="black"/>
                <rect x="32" y="42" width="5" height="5" fill="black"/>
                <rect x="44" y="44" width="5" height="5" fill="black"/>
                <rect x="56" y="48" width="5" height="5" fill="black"/>
                <rect x="34" y="56" width="6" height="6" fill="black"/>
                <rect x="46" y="60" width="5" height="5" fill="black"/>
                <rect x="60" y="58" width="5" height="5" fill="black"/>
              </svg>
              <span style={{ fontSize: '0.55rem', color: '#090d16', fontWeight: 800, marginTop: '3px' }}>
                TEKSHIRISH
              </span>
            </div>

            {/* Fiscal metadata */}
            <div style={{ flex: 1, fontSize: '0.68rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
              <div><strong>Fiskal Modul:</strong> TK-POS-2026-v2</div>
              <div><strong>Fiskal Belgi:</strong> {fiscalCode}</div>
              <div><strong>Terminal:</strong> #UZ-9482-ONLINE</div>
              <div style={{ marginTop: '4px', color: '#10b981', fontWeight: 700 }}>
                ✓ Moliya vazirligi talablari asosida tasdiqlangan
              </div>
            </div>
          </div>

          {/* Barcode lines simulation */}
          <div style={{ marginTop: '22px', textAlign: 'center' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: '2px',
              height: '32px',
              opacity: 0.6
            }}>
              {[2,1,3,1,2,4,1,2,3,1,1,3,2,1,4,1,2,1,3,2,1,4,1,2,3,1,2,1,4,2,1,3,1,2].map((w, i) => (
                <div 
                  key={i} 
                  style={{ 
                    width: `${w * 1.5}px`, 
                    height: `${20 + (i % 5) * 2}px`, 
                    background: 'var(--text-main)' 
                  }} 
                />
              ))}
            </div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '4px', color: 'var(--text-dim)', marginTop: '4px' }}>
              {receiptNo}
            </div>
          </div>

          {/* Bottom zigzag decoration */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, var(--bg-card) 4px, var(--bg-card) 8px)'
          }} />
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: '16px 20px',
          background: 'var(--bg-subtle)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '10px'
        }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            style={{ flex: 1 }}
          >
            Yopish
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePrint}
            style={{ flex: 1.3, gap: '8px' }}
          >
            <Printer size={16} />
            <span>Kvitansiyani Chop Etish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
