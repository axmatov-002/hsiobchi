import React, { useState, useEffect } from 'react';
import { transactionsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatMoney, formatDate } from '../utils/formatters';
import ReceiptModal from '../components/ReceiptModal';
import { 
  Receipt, 
  Search, 
  Download, 
  Trash2, 
  PlusCircle, 
  TrendingUp, 
  TrendingDown, 
  Filter,
  Printer
} from 'lucide-react';

export default function TransactionsView({ onOpenNewTransaction }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selected transaction for Receipt view
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const res = await transactionsApi.getAll();
      if (res.success) {
        setTransactions(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Haqiqatan ham bu amaliyotni o‘chirmoqchimisiz?')) return;
    try {
      await transactionsApi.delete(id);
      loadTransactions();
    } catch (err) {
      alert(err.message || 'Xatolik yuz berdi');
    }
  };

  // CSV Export helper
  const exportToCSV = () => {
    if (filteredList.length === 0) {
      alert('Eksport qilish uchun ma‘lumot mavjud emas');
      return;
    }

    const headers = ['Sana', 'Turi', 'Toifa', 'Summa (so‘m)', 'To‘lov turi', 'Izoh'];
    const rows = filteredList.map(t => [
      t.date,
      t.type === 'income' ? 'Daromad' : 'Xarajat',
      `"${t.category}"`,
      t.amount,
      `"${t.method || ''}"`,
      `"${(t.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `kassa_xarajatlar_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  const filteredList = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchCat = t.category.toLowerCase().includes(q);
      const matchDesc = (t.description || '').toLowerCase().includes(q);
      const matchMethod = (t.method || '').toLowerCase().includes(q);
      if (!matchCat && !matchDesc && !matchMethod) return false;
    }
    return true;
  });

  const totalFilteredExpense = filteredList.filter(t => t.type === 'expense').reduce((a, c) => a + c.amount, 0);
  const totalFilteredIncome = filteredList.filter(t => t.type === 'income').reduce((a, c) => a + c.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Xarajatlar & Kassa Tarixi</h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
            Barcha amaliyotlarni qidirish, elektron cheklarni ko‘rish va CSV yuklab olish
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={exportToCSV}
            style={{ gap: '6px' }}
          >
            <Download size={16} />
            <span>Excel / CSV</span>
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={onOpenNewTransaction}
            style={{ gap: '6px' }}
          >
            <PlusCircle size={16} />
            <span>Yangi Qayd</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Search input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Izoh, toifa yoki to‘lov turi bo‘yicha qidiring..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '38px', height: '38px' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
        </div>

        {/* Type tabs */}
        <div style={{ display: 'flex', background: 'var(--bg-subtle)', borderRadius: '10px', padding: '4px', gap: '4px' }}>
          <button
            className={`btn btn-sm ${filterType === 'all' ? 'btn-secondary' : 'btn-ghost'}`}
            onClick={() => setFilterType('all')}
            style={{ fontWeight: filterType === 'all' ? 700 : 500 }}
          >
            Barchasi
          </button>
          <button
            className={`btn btn-sm ${filterType === 'expense' ? 'btn-danger' : 'btn-ghost'}`}
            onClick={() => setFilterType('expense')}
            style={{ fontWeight: filterType === 'expense' ? 700 : 500 }}
          >
            Faqat Xarajat
          </button>
          <button
            className={`btn btn-sm ${filterType === 'income' ? 'btn-success' : 'btn-ghost'}`}
            onClick={() => setFilterType('income')}
            style={{ fontWeight: filterType === 'income' ? 700 : 500 }}
          >
            Faqat Daromad
          </button>
        </div>

        {/* Category selector */}
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: '180px' }}
        >
          <option value="all">Barcha toifalar</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

      </div>

      {/* Summary Chips */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <div className="glass-card" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/expense-3d.jpg" 
            alt="3D Xarajat" 
            style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} 
          />
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Filtrlangan Xarajat:</span>
            <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '1.05rem' }}>{formatMoney(totalFilteredExpense)}</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/income-3d.jpg" 
            alt="3D Daromad" 
            style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} 
          />
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Filtrlangan Daromad:</span>
            <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1.05rem' }}>{formatMoney(totalFilteredIncome)}</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Jami Qaydlar:</span>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.05rem' }}>{filteredList.length} ta</div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-dim)' }}>
                <th style={{ padding: '12px 14px' }}>Sana</th>
                <th style={{ padding: '12px 14px' }}>Turi</th>
                <th style={{ padding: '12px 14px' }}>Toifa</th>
                <th style={{ padding: '12px 14px' }}>Izoh</th>
                <th style={{ padding: '12px 14px' }}>To‘lov usuli</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Summa</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Fiskal Chek</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>O‘chirish</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)' }}>
                    Mos keluvchi amaliyotlar topilmadi
                  </td>
                </tr>
              ) : (
                filteredList.map((tx) => {
                  const isIncome = tx.type === 'income';

                  return (
                    <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '14px', color: 'var(--text-muted)' }}>
                        {formatDate(tx.date)}
                      </td>

                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img 
                            src={isIncome ? '/income-3d.jpg' : '/expense-3d.jpg'} 
                            alt="" 
                            style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }} 
                          />
                          <span className={`badge ${isIncome ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.72rem' }}>
                            {isIncome ? 'Daromad' : 'Xarajat'}
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                        {tx.category}
                      </td>

                      <td style={{ padding: '14px', color: 'var(--text-muted)' }}>
                        {tx.description || '-'}
                      </td>

                      <td style={{ padding: '14px', color: 'var(--text-dim)' }}>
                        {tx.method || 'Karta'}
                      </td>

                      <td style={{ padding: '14px', textAlign: 'right', fontWeight: 800, color: isIncome ? '#10b981' : '#ef4444' }}>
                        {isIncome ? '+' : '-'}{formatMoney(tx.amount)}
                      </td>

                      <td style={{ padding: '14px', textAlign: 'center' }}>
                        <button
                          onClick={() => setSelectedTxForReceipt(tx)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '5px 10px', fontSize: '0.75rem', gap: '4px' }}
                          title="Fiskal chekni ko'rish va chop etish"
                        >
                          <Receipt size={14} color="#818cf8" />
                          <span>Chek</span>
                        </button>
                      </td>

                      <td style={{ padding: '14px', textAlign: 'center' }}>
                        <button 
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleDelete(tx.id)}
                          style={{ padding: '6px', color: '#ef4444' }}
                          title="O‘chirish"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Realistic Fiscal Receipt Modal */}
      <ReceiptModal
        isOpen={Boolean(selectedTxForReceipt)}
        onClose={() => setSelectedTxForReceipt(null)}
        transaction={selectedTxForReceipt}
        user={user}
      />

    </div>
  );
}
