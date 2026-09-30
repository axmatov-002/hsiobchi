import React from 'react';

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color = 'blue', 
  trend = null,
  onClick = null,
  image3D = null
}) {
  const colorMap = {
    blue: {
      gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.16) 0%, rgba(99, 102, 241, 0.05) 100%)',
      border: 'rgba(99, 102, 241, 0.28)',
      iconBg: 'rgba(99, 102, 241, 0.2)',
      iconColor: '#818cf8',
    },
    emerald: {
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0.05) 100%)',
      border: 'rgba(16, 185, 129, 0.3)',
      iconBg: 'rgba(16, 185, 129, 0.2)',
      iconColor: '#34d399',
    },
    rose: {
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.18) 0%, rgba(239, 68, 68, 0.05) 100%)',
      border: 'rgba(239, 68, 68, 0.3)',
      iconBg: 'rgba(239, 68, 68, 0.2)',
      iconColor: '#f87171',
    },
    amber: {
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0.05) 100%)',
      border: 'rgba(245, 158, 11, 0.3)',
      iconBg: 'rgba(245, 158, 11, 0.2)',
      iconColor: '#fbbf24',
    },
    purple: {
      gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(139, 92, 246, 0.05) 100%)',
      border: 'rgba(139, 92, 246, 0.3)',
      iconBg: 'rgba(139, 92, 246, 0.2)',
      iconColor: '#a78bfa',
    }
  };

  const currentTheme = colorMap[color] || colorMap.blue;

  return (
    <div 
      className="glass-card card-interactive" 
      onClick={onClick}
      style={{
        padding: '22px',
        background: currentTheme.gradient,
        borderColor: currentTheme.border,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px', gap: '10px' }}>
        <div>
          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {title}
          </span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px', letterSpacing: '-0.02em' }}>
            {value}
          </div>
        </div>

        {/* 3D Image or Icon */}
        {image3D ? (
          <div style={{ flexShrink: 0 }}>
            <img 
              src={image3D} 
              alt={title}
              className="float-3d"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                objectFit: 'cover',
                boxShadow: color === 'emerald' 
                  ? '0 6px 18px rgba(16, 185, 129, 0.45)' 
                  : (color === 'rose' ? '0 6px 18px rgba(239, 68, 68, 0.45)' : '0 6px 18px rgba(99, 102, 241, 0.35)'),
                border: '1.5px solid rgba(255, 255, 255, 0.25)'
              }}
            />
          </div>
        ) : (
          Icon && (
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: currentTheme.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: currentTheme.iconColor,
              flexShrink: 0
            }}>
              <Icon size={22} />
            </div>
          )
        )}
      </div>

      {subtitle && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {trend && (
            <span style={{ color: trend.type === 'up' ? '#10b981' : '#ef4444', fontWeight: 700 }}>
              {trend.text}
            </span>
          )}
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
}
