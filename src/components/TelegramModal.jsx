import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Check, 
  Copy, 
  Smartphone, 
  Bell, 
  ShieldCheck, 
  MessageSquare, 
  Zap 
} from 'lucide-react';

export default function TelegramModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const syncCode = `TK-${(user?.id || 'usr_demo').replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(syncCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0088cc 0%, #38bdf8 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0, 136, 204, 0.35)'
            }}>
              <Send size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                Telegram Bot Integratsiyasi
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', margin: '2px 0 0' }}>
                @TalabaKassaBot orqali tezkor xarajat yozish
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Sync Code Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 136, 204, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
          border: '1px dashed rgba(0, 136, 204, 0.4)',
          borderRadius: '16px',
          padding: '16px 20px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Sizning Maxsus Ulanish Kodingiz:
          </div>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: 800,
            letterSpacing: '3px',
            color: '#38bdf8',
            margin: '6px 0 8px',
            fontFamily: 'monospace'
          }}>
            {syncCode}
          </div>
          <button
            onClick={handleCopy}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px', margin: '0 auto', fontSize: '0.8rem' }}
          >
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copied ? 'Kopiya qilindi!' : 'Kodni nusxalash'}</span>
          </button>
        </div>

        {/* 3 Step Guide */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              1
            </div>
            <div style={{ fontSize: '0.84rem', lineHeight: 1.4 }}>
              Telegramda <strong>@TalabaKassaBot</strong> ni qidiring va <code>/start</code> buyrug‘ini bosing.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              2
            </div>
            <div style={{ fontSize: '0.84rem', lineHeight: 1.4 }}>
              Botga yuqoridagi <strong>{syncCode}</strong> kodini yuboring. Hisobingiz darhol sinxronlashadi.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              3
            </div>
            <div style={{ fontSize: '0.84rem', lineHeight: 1.4 }}>
              Endi istalgan joyda botga: <code>35000 tushlik</code> yoki <code>120000 kontrakt</code> deb yozing — saytda darhol aks etadi!
            </div>
          </div>
        </div>

        {/* Benefits Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          padding: '12px',
          background: 'var(--bg-subtle)',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <Bell size={14} color="#f59e0b" />
            <span>Kunlik 08:00 balans xabari</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <Zap size={14} color="#10b981" />
            <span>1 soniyada xarajat yozish</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            style={{ flex: 1 }}
          >
            Yopish
          </button>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ flex: 1.5, gap: '8px', justifyContent: 'center' }}
          >
            <Send size={16} />
            <span>Telegram Botga O‘tish</span>
          </a>
        </div>
      </div>
    </div>
  );
}
