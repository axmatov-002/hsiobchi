import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/api';
import { formatMoney, formatDate, getRoleLabel } from '../utils/formatters';
import StatsCard from '../components/StatsCard';
import { 
  Users, 
  ShieldAlert, 
  DollarSign, 
  Activity, 
  Trash2, 
  Lock, 
  Unlock, 
  UserCheck, 
  Search,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [msg, setMsg] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [uRes, sRes] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getStats()
      ]);
      if (uRes.success) setUsers(uRes.data);
      if (sRes.success) setStats(sRes.data);
    } catch (err) {
      console.error('Admin yuklashda xatolik:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminApi.updateUser(userId, { role: newRole });
      setMsg('Foydalanuvchi roli o‘zgartirildi');
      setTimeout(() => setMsg(''), 3000);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleStatus = async (user) => {
    const nextStatus = user.status === 'active' ? 'blocked' : 'active';
    try {
      await adminApi.updateUser(user.id, { status: nextStatus });
      setMsg(`Foydalanuvchi holati ${nextStatus === 'blocked' ? 'bloklandi' : 'faollashtirildi'}`);
      setTimeout(() => setMsg(''), 3000);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Haqiqatan ham "${userName}" foydalanuvchisini o‘chirmoqchimisiz?`)) return;
    try {
      await adminApi.deleteUser(userId);
      setMsg('Foydalanuvchi tizimdan o‘chirildi');
      setTimeout(() => setMsg(''), 3000);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.institution && u.institution.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Banner */}
      <div className="glass-card" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
          👑 Bosh Administrator Paneli (Admin Portal)
        </h2>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Tizim foydalanuvchilari huquqlarini belgilash, global kassa oqimi va xavfsizlik nazorati
        </p>
      </div>

      {msg && (
        <div className="badge-success" style={{ padding: '12px 18px', borderRadius: '10px', fontSize: '0.9rem' }}>
          {msg}
        </div>
      )}

      {/* 4 Stats Cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          <StatsCard
            title="Jami Foydalanuvchilar"
            value={`${stats.totalUsers} ta`}
            subtitle={`O‘quvchilar: ${stats.studentsCount} • Menejerlar: ${stats.managersCount}`}
            icon={Users}
            color="blue"
          />

          <StatsCard
            title="Tizim Jami Xarajatlari"
            value={formatMoney(stats.totalSystemExpense)}
            subtitle={`${stats.totalTransactions} ta qayd etilgan amaliyot`}
            icon={DollarSign}
            color="rose"
          />

          <StatsCard
            title="Tizim Jami Daromadlari"
            value={formatMoney(stats.totalSystemIncome)}
            subtitle="Stipendiya, grant va ko‘maklar"
            icon={Activity}
            color="emerald"
          />

          <StatsCard
            title="Kutilayotgan Arizalar"
            value={`${stats.pendingRequestsCount} ta`}
            subtitle="Moddiy ko‘mak arizalari"
            icon={ShieldAlert}
            color="amber"
          />
        </div>
      )}

      {/* Users Management Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              Foydalanuvchilar va Rollar Boshqaruvi
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', margin: 0 }}>
              Admin, Menejer yoki O‘quvchi rollarini darhol o‘zgartirishingiz mumkin
            </p>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Foydalanuvchi yoki email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px', fontSize: '0.86rem' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-dim)' }}>
                <th style={{ padding: '12px 14px' }}>Foydalanuvchi</th>
                <th style={{ padding: '12px 14px' }}>Muassasa / Bo‘lim</th>
                <th style={{ padding: '12px 14px' }}>Amaldagi Rol</th>
                <th style={{ padding: '12px 14px' }}>Rolni O‘zgartirish</th>
                <th style={{ padding: '12px 14px' }}>Holat</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const roleInfo = getRoleLabel(u.role);
                const isBlocked = u.status === 'blocked';

                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{u.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{u.email}</div>
                      {u.phone && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{u.phone}</div>}
                    </td>

                    <td style={{ padding: '14px' }}>
                      <div>{u.institution || 'Mavjud emas'}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{u.faculty}</div>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <span className={`badge ${roleInfo.badgeClass}`}>
                        {roleInfo.label}
                      </span>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <select
                        className="form-select"
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        style={{ padding: '6px 10px', fontSize: '0.82rem', width: '150px' }}
                      >
                        <option value="student">🎓 O‘quvchi / Talaba</option>
                        <option value="manager">💼 Menejer</option>
                        <option value="admin">👑 Administrator</option>
                      </select>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <span className={`badge ${isBlocked ? 'badge-danger' : 'badge-success'}`}>
                        {isBlocked ? 'Bloklangan' : 'Faol'}
                      </span>
                    </td>

                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          title={isBlocked ? "Faollashtirish" : "Bloklash"}
                          onClick={() => handleToggleStatus(u)}
                          style={{ padding: '6px 10px' }}
                        >
                          {isBlocked ? <Unlock size={14} color="#10b981" /> : <Lock size={14} color="#f59e0b" />}
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          title="Foydalanuvchini o‘chirish"
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          style={{ padding: '6px 10px' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
