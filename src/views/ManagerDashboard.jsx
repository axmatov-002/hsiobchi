import React, { useState, useEffect } from 'react';
import { managerApi, requestsApi, commonApi } from '../services/api';
import { formatMoney, formatDate } from '../utils/formatters';
import StatsCard from '../components/StatsCard';
import { 
  Users, 
  AlertOctagon, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Send,
  MessageSquare,
  Search,
  Filter
} from 'lucide-react';

export default function ManagerDashboard() {
  const [students, setStudents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'students'
  const [searchTerm, setSearchTerm] = useState('');

  // Manager action states
  const [selectedReq, setSelectedReq] = useState(null);
  const [managerNote, setManagerNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // New announcement modal / fields
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [annSuccess, setAnnSuccess] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [stdRes, reqRes, annRes] = await Promise.all([
        managerApi.getStudents(),
        requestsApi.getAll(),
        commonApi.getAnnouncements()
      ]);

      if (stdRes.success) setStudents(stdRes.data);
      if (reqRes.success) setRequests(reqRes.data);
      if (annRes.success) setAnnouncements(annRes.data);
    } catch (err) {
      console.error('Menejer ma\'lumotlarini olishda xatolik:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
    setActionLoading(true);
    try {
      await requestsApi.updateStatus(requestId, status, managerNote);
      setManagerNote('');
      setSelectedReq(null);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Xatolik yuz berdi');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;
    try {
      await commonApi.createAnnouncement({
        title: newAnnTitle,
        content: newAnnContent,
        badge: 'Menejer E‘loni'
      });
      setNewAnnTitle('');
      setNewAnnContent('');
      setAnnSuccess('E‘lon barcha talabalarga yuborildi!');
      setTimeout(() => setAnnSuccess(''), 4000);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Metrics
  const dangerStudents = students.filter(s => s.riskStatus === 'danger');
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const totalStudentsExpense = students.reduce((acc, s) => acc + (s.totalExpense || 0), 0);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.institution && s.institution.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.faculty && s.faculty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.12) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
          Menejer va Guruh Murabbiyi Nazorat Markazi
        </h2>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          O‘quvchilar va talabalarning xarajat limitlarini monitoring qilish va moddiy so‘rovlarini tasdiqlash
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
        <StatsCard
          title="Biriktirilgan Talabalar"
          value={`${students.length} nafar`}
          subtitle="Faol ro‘yxatdagi o‘quvchilar"
          icon={Users}
          color="purple"
        />

        <StatsCard
          title="Xavf Guruhidagi Talabalar"
          value={`${dangerStudents.length} nafar`}
          subtitle="Byudjet limitidan oshib ketganlar"
          icon={AlertOctagon}
          color={dangerStudents.length > 0 ? "rose" : "emerald"}
        />

        <StatsCard
          title="Kutilayotgan Arizalar"
          value={`${pendingRequests.length} ta`}
          subtitle="Ko‘rib chiqilishi kerak"
          icon={Clock}
          color={pendingRequests.length > 0 ? "amber" : "blue"}
        />

        <StatsCard
          title="Talabalar Jami Xarajati"
          value={formatMoney(totalStudentsExpense)}
          subtitle="Joriy oydagi umumiy aylanma"
          icon={TrendingUp}
          color="blue"
        />
      </div>

      {/* Navigation tabs between Requests and Students List */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button
          className={`btn ${activeTab === 'requests' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('requests')}
        >
          <Clock size={16} />
          <span>Talabalar Moddiy So‘rovlari ({pendingRequests.length})</span>
        </button>

        <button
          className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('students')}
        >
          <Users size={16} />
          <span>Talabalar Xarajat Monitoringi ({students.length})</span>
        </button>
      </div>

      {/* SECTION 1: REQUESTS APPROVAL PANEL */}
      {activeTab === 'requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-card" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
              Moddiy Yordam va Grant Arizalari
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '18px' }}>
              Talabalar tomonidan yuborilgan ilmiy, amaliy va favqulodda yordam arizalarini ko‘rib chiqish
            </p>

            {requests.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)' }}>
                Hozircha arizalar mavjud emas
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {requests.map((req) => {
                  const isPending = req.status === 'pending';
                  const isApproved = req.status === 'approved';
                  const isRejected = req.status === 'rejected';

                  return (
                    <div 
                      key={req.id}
                      className="glass-panel"
                      style={{
                        padding: '18px 20px',
                        borderRadius: '14px',
                        border: isPending ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                              {req.title}
                            </span>
                            <span className={`badge ${isApproved ? 'badge-success' : (isRejected ? 'badge-danger' : 'badge-warning')}`}>
                              {isApproved ? 'Tasdiqlangan' : (isRejected ? 'Rad etilgan' : 'Kutilmoqda')}
                            </span>
                          </div>
                          
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            Talaba: <strong style={{ color: 'var(--text-main)' }}>{req.userName}</strong> ({req.institution}) • {formatDate(req.createdAt)}
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                            {formatMoney(req.amount)}
                          </span>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                            Toifa: {req.category}
                          </div>
                        </div>
                      </div>

                      {/* Reason / Details */}
                      <div style={{
                        marginTop: '12px',
                        padding: '12px 14px',
                        background: 'var(--bg-subtle)',
                        borderRadius: '10px',
                        fontSize: '0.86rem',
                        color: 'var(--text-main)'
                      }}>
                        <strong>Talaba izohi:</strong> {req.reason}
                      </div>

                      {/* Manager Note if any */}
                      {req.managerNote && (
                        <div style={{
                          marginTop: '8px',
                          padding: '10px 14px',
                          background: isApproved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          borderLeft: `4px solid ${isApproved ? '#10b981' : '#ef4444'}`,
                          borderRadius: '6px',
                          fontSize: '0.83rem'
                        }}>
                          <strong>Menejer xulosasi ({req.reviewedBy}):</strong> {req.managerNote}
                        </div>
                      )}

                      {/* Action buttons if Pending */}
                      {isPending && (
                        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Menejer qarori bo‘yicha izoh (masalan: Grant ajratildi yoki Sabab yetarli emas)..."
                            value={selectedReq === req.id ? managerNote : ''}
                            onChange={(e) => {
                              setSelectedReq(req.id);
                              setManagerNote(e.target.value);
                            }}
                          />

                          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                              className="btn btn-danger btn-sm"
                              disabled={actionLoading}
                              onClick={() => {
                                setSelectedReq(req.id);
                                handleUpdateStatus(req.id, 'rejected');
                              }}
                            >
                              <XCircle size={16} />
                              <span>Rad etish</span>
                            </button>

                            <button
                              className="btn btn-success btn-sm"
                              disabled={actionLoading}
                              onClick={() => {
                                setSelectedReq(req.id);
                                handleUpdateStatus(req.id, 'approved');
                              }}
                            >
                              <CheckCircle2 size={16} />
                              <span>Tasdiqlash & Mablag‘ o‘tkazish</span>
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Announcement Post by Manager */}
          <div className="glass-card" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
              Talabalar Uchun Yangi E‘lon / Ko‘rsatma Chiqarish
            </h3>
            {annSuccess && (
              <div className="badge-success" style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '14px' }}>
                {annSuccess}
              </div>
            )}
            <form onSubmit={handleCreateAnnouncement}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="E‘lon sarlavhasi (masalan: Yangi oylik stipendiyalar tushirildi)..."
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="E‘lon matni..."
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                <Send size={15} />
                <span>E‘lonni Chop Etish</span>
              </button>
            </form>
          </div>

        </div>
      )}

      {/* SECTION 2: STUDENTS MONITORING TABLE */}
      {activeTab === 'students' && (
        <div className="glass-card" style={{ padding: '22px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                Talabalarning Moliyaviy Holati va Limit Nazorati
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', margin: 0 }}>
                Har bir talabaning oylik byudjet sarflanishi va xavf darajasi
              </p>
            </div>

            {/* Search input */}
            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Talaba ismi yoki OTM bo‘yicha qidirish..."
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
                  <th style={{ padding: '12px 14px' }}>Talaba</th>
                  <th style={{ padding: '12px 14px' }}>Muassasa / Kurs</th>
                  <th style={{ padding: '12px 14px' }}>Oylik Xarajat</th>
                  <th style={{ padding: '12px 14px' }}>Byudjet Limit</th>
                  <th style={{ padding: '12px 14px' }}>Sarflanish</th>
                  <th style={{ padding: '12px 14px' }}>Xavf Holati</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((std) => {
                  const isDanger = std.riskStatus === 'danger';
                  const isWarning = std.riskStatus === 'warning';

                  return (
                    <tr 
                      key={std.id}
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        background: isDanger ? 'rgba(239, 68, 68, 0.04)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{std.name}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{std.email}</div>
                      </td>

                      <td style={{ padding: '14px' }}>
                        <div>{std.institution || 'OTM'}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{std.faculty}</div>
                      </td>

                      <td style={{ padding: '14px', fontWeight: 700, color: '#ef4444' }}>
                        {formatMoney(std.totalExpense)}
                      </td>

                      <td style={{ padding: '14px', fontWeight: 600 }}>
                        {formatMoney(std.budget)}
                      </td>

                      <td style={{ padding: '14px', width: '160px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{std.budgetUsedPercent}%</span>
                        </div>
                        <div style={{ height: '6px', width: '100%', background: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              height: '100%', 
                              width: `${Math.min(std.budgetUsedPercent, 100)}%`, 
                              background: isDanger ? '#ef4444' : (isWarning ? '#f59e0b' : '#10b981'),
                              borderRadius: '999px'
                            }} 
                          />
                        </div>
                      </td>

                      <td style={{ padding: '14px' }}>
                        <span className={`badge ${isDanger ? 'badge-danger' : (isWarning ? 'badge-warning' : 'badge-success')}`}>
                          {isDanger ? 'Limit buzilgan ⚠️' : (isWarning ? 'Ogohlantirish' : 'Me‘yorda')}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
