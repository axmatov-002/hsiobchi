import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Receipt, 
  Target, 
  HandCoins, 
  Users, 
  ShieldCheck, 
  Bell, 
  PlusCircle, 
  BarChart3,
  BookOpen
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenNewTransaction }) {
  const { user } = useAuth();
  const role = user?.role || 'student';

  const studentNavItems = [
    { id: 'dashboard', label: 'Mening Kassam', icon: LayoutDashboard },
    { id: 'transactions', label: 'Xarajatlar Tarixi', icon: Receipt },
    { id: 'goals', label: 'Moliyaviy Maqsadlar', icon: Target },
    { id: 'requests', label: 'Moddiy So‘rovlar', icon: HandCoins },
    { id: 'tips', label: 'Moliyaviy Maslahatlar', icon: BookOpen },
  ];

  const managerNavItems = [
    { id: 'dashboard', label: 'Menejer Paneli', icon: LayoutDashboard },
    { id: 'students', label: 'Talabalar Nazorati', icon: Users },
    { id: 'requests', label: 'Arizalarni Tasdiqlash', icon: HandCoins },
    { id: 'transactions', label: 'Shaxsiy Xarajatlar', icon: Receipt },
    { id: 'announcements', label: 'E‘lon Yuborish', icon: Bell },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Tizim Boshqaruvi', icon: BarChart3 },
    { id: 'users', label: 'Foydalanuvchilar', icon: ShieldCheck },
    { id: 'students', label: 'Talabalar Nazorati', icon: Users },
    { id: 'requests', label: 'Barcha So‘rovlar', icon: HandCoins },
    { id: 'transactions', label: 'Xarajatlar & Kassa', icon: Receipt },
  ];

  let items = studentNavItems;
  if (role === 'manager') items = managerNavItems;
  if (role === 'admin') items = adminNavItems;

  return (
    <aside style={{
      width: '260px',
      borderRight: '1px solid var(--border-color)',
      background: 'var(--bg-card)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      flexShrink: 0
    }}>
      <div>
        {/* Quick Action Button */}
        <div style={{ marginBottom: '24px' }}>
          <button 
            className="btn btn-primary"
            style={{ width: '100%', gap: '8px', padding: '12px' }}
            onClick={onOpenNewTransaction}
          >
            <PlusCircle size={18} />
            <span>Yangi Harajat / Daromad</span>
          </button>
        </div>

        {/* Navigation list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ padding: '6px 12px', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
            Asosiy Bo'limlar
          </div>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  padding: '11px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? '#818cf8' : 'var(--text-muted)',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  gap: '12px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={18} color={isActive ? '#818cf8' : 'currentColor'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer info card */}
      <div className="glass-card" style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>Tizim Holati: Faol</span>
        </div>
        <p style={{ fontSize: '0.74rem', color: 'var(--text-dim)', margin: 0 }}>
          TalabaKassa v2.5 • Toshkent
        </p>
      </div>
    </aside>
  );
}
