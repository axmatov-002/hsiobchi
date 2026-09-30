import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Wallet, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  School, 
  ArrowRight 
} from 'lucide-react';

export default function AuthView() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [faculty, setFaculty] = useState('');
  const [role, setRole] = useState('student');
  const [monthlyBudget, setMonthlyBudget] = useState('1800000');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register({
          name,
          email,
          password,
          phone,
          institution,
          faculty,
          role,
          monthlyBudget: Number(monthlyBudget)
        });
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      background: 'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 45%), #090d16'
    }}>
      <div style={{ width: '100%', maxWidth: isRegister ? '540px' : '460px' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.45)',
            marginBottom: '16px'
          }}>
            <Wallet size={32} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TalabaKassa
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            O‘quvchilar va talabalar uchun oylik xarajatlar va byudjet tizimi
          </p>
        </div>


        {/* Main Auth Card */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          
          {/* Tab Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); }}
              style={{
                padding: '10px',
                borderRadius: '9px',
                background: !isRegister ? 'var(--primary)' : 'transparent',
                color: !isRegister ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Kirish (Login)
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); }}
              style={{
                padding: '10px',
                borderRadius: '9px',
                background: isRegister ? 'var(--primary)' : 'transparent',
                color: isRegister ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Ro‘yxatdan o‘tish
            </button>
          </div>

          {error && (
            <div className="badge-danger" style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="form-group">
                  <label className="form-label">To‘liq Ism va Familiya*</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Jasur Karimov"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{ paddingLeft: '40px' }}
                    />
                    <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Telefon raqam</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="+998 90 123 45 67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ paddingLeft: '40px' }}
                      />
                      <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tizimdagi Rol</label>
                    <select
                      className="form-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="student">🎓 O‘quvchi / Talaba</option>
                      <option value="manager">💼 Menejer / Murabbiy</option>
                      <option value="admin">👑 Administrator</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ta‘lim muassasasi (Maktab / Litsey / OTM)</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="TATU yoki 1-son maktab"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      style={{ paddingLeft: '40px' }}
                    />
                    <School size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Sinf yoki Fakultet / Kurs</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Masalan: 3-kurs yoki 11-A"
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Oylik xarajat byudjeti (so‘m)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Elektron pochta (Email)*</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="student@kassa.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: '40px' }}
                />
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Parol*</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '40px' }}
                />
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%', marginTop: '20px', gap: '10px' }}
            >
              <span>{loading ? 'Kutilmoqda...' : (isRegister ? 'Ro‘yxatdan O‘tish' : 'Tizimga Kirish')}</span>
              <ArrowRight size={18} />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
