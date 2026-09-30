import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthView from './views/AuthView';
import StudentDashboard from './views/StudentDashboard';
import ManagerDashboard from './views/ManagerDashboard';
import AdminDashboard from './views/AdminDashboard';
import TransactionsView from './views/TransactionsView';
import GoalsView from './views/GoalsView';
import RequestsView from './views/RequestsView';
import TipsView from './views/TipsView';

// Modals
import ExpenseModal from './components/ExpenseModal';
import GoalModal from './components/GoalModal';
import RequestModal from './components/RequestModal';

export default function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Modal states
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedGoalForDeposit, setSelectedGoalForDeposit] = useState(null);

  // Refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        background: 'var(--bg-main)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '4px solid rgba(99, 102, 241, 0.2)',
          borderTopColor: '#6366f1',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          TalabaKassa tizimi yuklanmoqda...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Not logged in -> Show Auth View
  if (!user) {
    return <AuthView />;
  }

  // Render appropriate view based on activeTab and role
  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user.role === 'admin') return <AdminDashboard key={refreshKey} />;
        if (user.role === 'manager') return <ManagerDashboard key={refreshKey} />;
        return (
          <StudentDashboard
            key={refreshKey}
            onOpenNewTransaction={() => setIsExpenseModalOpen(true)}
            onOpenNewGoal={() => { setSelectedGoalForDeposit(null); setIsGoalModalOpen(true); }}
            onOpenNewRequest={() => setIsRequestModalOpen(true)}
            onOpenDepositGoal={(goal) => { setSelectedGoalForDeposit(goal); setIsGoalModalOpen(true); }}
          />
        );

      case 'transactions':
        return (
          <TransactionsView
            key={refreshKey}
            onOpenNewTransaction={() => setIsExpenseModalOpen(true)}
          />
        );

      case 'goals':
        return (
          <GoalsView
            key={refreshKey}
            onOpenNewGoal={() => { setSelectedGoalForDeposit(null); setIsGoalModalOpen(true); }}
            onOpenDepositGoal={(goal) => { setSelectedGoalForDeposit(goal); setIsGoalModalOpen(true); }}
          />
        );

      case 'requests':
        if (user.role === 'manager' || user.role === 'admin') {
          return <ManagerDashboard key={refreshKey} />;
        }
        return (
          <RequestsView
            key={refreshKey}
            onOpenNewRequest={() => setIsRequestModalOpen(true)}
          />
        );

      case 'students':
        return <ManagerDashboard key={refreshKey} />;

      case 'users':
        return <AdminDashboard key={refreshKey} />;

      case 'tips':
        return <TipsView />;

      case 'announcements':
        return <ManagerDashboard key={refreshKey} />;

      default:
        return (
          <StudentDashboard
            key={refreshKey}
            onOpenNewTransaction={() => setIsExpenseModalOpen(true)}
            onOpenNewGoal={() => { setSelectedGoalForDeposit(null); setIsGoalModalOpen(true); }}
            onOpenNewRequest={() => setIsRequestModalOpen(true)}
            onOpenDepositGoal={(goal) => { setSelectedGoalForDeposit(goal); setIsGoalModalOpen(true); }}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewTransaction={() => setIsExpenseModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar onOpenNewTransaction={() => setIsExpenseModalOpen(true)} />
        
        <main className="content-body">
          {renderCurrentView()}
        </main>
      </div>

      {/* Modals */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSuccess={triggerRefresh}
      />

      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => { setIsGoalModalOpen(false); setSelectedGoalForDeposit(null); }}
        onSuccess={triggerRefresh}
        existingGoal={selectedGoalForDeposit}
      />

      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSuccess={triggerRefresh}
      />
    </div>
  );
}
