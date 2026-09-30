import React from 'react';
import { formatMoney } from '../utils/formatters';

// Category Breakdown Visualizer
export function CategoryChart({ transactions }) {
  const expenseTx = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenseTx.reduce((acc, t) => acc + t.amount, 0);

  // Group by category
  const categoryTotals = {};
  expenseTx.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const sortedCategories = Object.entries(categoryTotals)
    .map(([cat, amount]) => ({
      name: cat,
      amount,
      percentage: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0
    }))
    .sort((a, b) => b.amount - a.amount);

  const colors = [
    '#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', 
    '#8b5cf6', '#f43f5e', '#3b82f6', '#14b8a6', '#64748b'
  ];

  if (sortedCategories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-dim)' }}>
        Hozircha xarajatlar mavjud emas
      </div>
    );
  }

  return (
    <div>
      {/* Visual Multi-Segment Bar */}
      <div style={{
        height: '14px',
        width: '100%',
        borderRadius: '999px',
        overflow: 'hidden',
        display: 'flex',
        background: 'var(--bg-subtle)',
        marginBottom: '20px',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
      }}>
        {sortedCategories.map((cat, idx) => (
          <div
            key={cat.name}
            title={`${cat.name}: ${formatMoney(cat.amount)} (${cat.percentage}%)`}
            style={{
              width: `${cat.percentage}%`,
              background: colors[idx % colors.length],
              transition: 'width 0.4s ease'
            }}
          />
        ))}
      </div>

      {/* Category List with Progress Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {sortedCategories.slice(0, 6).map((cat, idx) => {
          const color = colors[idx % colors.length];
          return (
            <div key={cat.name}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
                  <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {cat.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {formatMoney(cat.amount)}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)', width: '36px', textAlign: 'right' }}>
                    {cat.percentage}%
                  </span>
                </div>
              </div>
              <div style={{ height: '6px', width: '100%', background: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${cat.percentage}%`, 
                    background: color, 
                    borderRadius: '999px' 
                  }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Weekly Spending Chart
export function WeeklyChart({ transactions }) {
  // Generate last 7 days labels
  const days = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = new Intl.DateTimeFormat('uz-UZ', { weekday: 'short' }).format(d);
    
    // Sum expenses for this date
    const dayExpense = transactions
      .filter(t => t.type === 'expense' && t.date === dateStr)
      .reduce((acc, t) => acc + t.amount, 0);

    days.push({
      dateStr,
      dayName: dayName.toUpperCase(),
      amount: dayExpense
    });
  }

  const maxAmount = Math.max(...days.map(d => d.amount), 200000);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '20px', gap: '10px' }}>
      {days.map((d) => {
        const heightPercent = maxAmount > 0 ? Math.max(Math.round((d.amount / maxAmount) * 100), 6) : 6;
        const isToday = d.dateStr === today.toISOString().split('T')[0];

        return (
          <div 
            key={d.dateStr}
            style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              height: '100%', 
              justifyContent: 'flex-end',
              gap: '8px'
            }}
          >
            {/* Amount label on hover or if > 0 */}
            <div style={{ 
              fontSize: '0.68rem', 
              color: d.amount > 0 ? 'var(--text-main)' : 'transparent', 
              fontWeight: 700, 
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}>
              {d.amount > 0 ? (d.amount >= 1000 ? `${Math.round(d.amount / 1000)}k` : d.amount) : ''}
            </div>

            {/* Vertical Bar */}
            <div 
              title={`${d.dateStr}: ${formatMoney(d.amount)}`}
              style={{
                width: '100%',
                maxWidth: '38px',
                height: `${heightPercent}%`,
                background: isToday 
                  ? 'linear-gradient(180deg, #6366f1 0%, #4338ca 100%)' 
                  : (d.amount > 0 ? 'linear-gradient(180deg, #06b6d4 0%, #0891b2 100%)' : 'rgba(255,255,255,0.06)'),
                borderRadius: '8px 8px 3px 3px',
                transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: d.amount > 0 ? '0 4px 12px rgba(6, 182, 212, 0.25)' : 'none'
              }}
            />

            {/* Day name label */}
            <span style={{ 
              fontSize: '0.72rem', 
              fontWeight: isToday ? 800 : 600, 
              color: isToday ? '#818cf8' : 'var(--text-dim)' 
            }}>
              {d.dayName}
            </span>
          </div>
        );
      })}
    </div>
  );
}
