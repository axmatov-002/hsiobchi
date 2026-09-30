import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRoleLabel } from '../utils/formatters';
import { 
  Wallet, 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  ShieldAlert, 
  Briefcase, 
  GraduationCap,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ onOpenNewTransaction }) {
  const { user, logout, theme, toggleTheme, quickLoginAs } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const roleInfo = getRoleLabel(user?.role);

  return (
    <header className="navbar-container" style={{
      height: '70px',
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--bg-card)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand logo & title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
        }}>
          <Wallet size={24} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TalabaKassa
            </span>
            <span className={`badge ${roleInfo.badgeClass}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              {roleInfo.label}
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>
            {user?.institution || 'O‘quvchilar xarajatlarini hisoblash tizimi'}
          </p>
        </div>
      </div>

      {/* Right actions: Quick Demo Switcher, Theme Toggle, New Tx button, User profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* Quick Demo Switcher */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
            title="Sinov uchun rolni tezkor almashtirish"
            style={{ borderStyle: 'dashed', borderColor: 'rgba(99, 102, 241, 0.4)' }}
          >
            <span>Rolni almashtirish</span>
            <ChevronDown size={14} />
          </button>

          {roleSwitcherOpen && (
            <div 
              className="glass-panel" 
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '230px',
                padding: '8px',
                zIndex: 100,
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ padding: '6px 10px', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Test hisobiga o'tish:
              </div>
              <button 
                className="btn btn-ghost" 
                style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', fontSize: '0.84rem' }}
                onClick={() => { quickLoginAs('admin'); setRoleSwitcherOpen(false); }}
              >
                <ShieldAlert size={16} color="#ef4444" />
                <span>Administrator (Admin)</span>
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', fontSize: '0.84rem' }}
                onClick={() => { quickLoginAs('manager'); setRoleSwitcherOpen(false); }}
              >
                <Briefcase size={16} color="#8b5cf6" />
                <span>Menejer (Murabbiy)</span>
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 10px', fontSize: '0.84rem' }}
                onClick={() => { quickLoginAs('student'); setRoleSwitcherOpen(false); }}
              >
                <GraduationCap size={16} color="#3b82f6" />
                <span>O'quvchi / Talaba</span>
              </button>
            </div>
          )}
        </div>

        {/* Theme switcher */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Qorong‘i rejimga o‘tish'}
          style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%' }}
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>

        {/* User profile dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn btn-ghost"
            style={{
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ textAlign: 'left', display: 'none', md: 'block' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {user?.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {user?.email}
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-dim)" />
          </button>

          {dropdownOpen && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '240px',
                padding: '10px',
                zIndex: 100
              }}
            >
              <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{user?.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{user?.email}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {user?.faculty || user?.institution}
                </div>
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={logout}
                style={{ width: '100%', justifyContent: 'flex-start', marginTop: '6px' }}
              >
                <LogOut size={16} />
                <span>Chiqish</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
