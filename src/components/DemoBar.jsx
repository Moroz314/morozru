import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared floating bar used on all /demo/* pages.
 * Shows a badge that this is a demo and provides a link back to the portfolio.
 */
export default function DemoBar({ projectName }) {
  return (
    <div className="demo-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <span className="demo-badge" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '4px 10px',
          background: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '100px',
          fontSize: '0.72rem', fontWeight: '700', color: '#a5b4fc',
          textTransform: 'uppercase', letterSpacing: '0.05em',
          flexShrink: 0,
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 6px #10b981' }}></span>
          Демо-стенд
        </span>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.88rem' }}>
          Это интерактивный демо-макет из портфолио{' '}
          <strong style={{ color: '#e2e8f0' }}>Владислава Морозова</strong>
          {projectName && <span style={{ color: '#6366f1' }}> — {projectName}</span>}
        </p>
      </div>
      <Link
        to="/"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '8px 18px',
          background: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.35)',
          borderRadius: '10px',
          color: '#a5b4fc', fontSize: '0.88rem', fontWeight: '600',
          textDecoration: 'none', whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          flexShrink: 0
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.28)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; }}
      >
        <span className="demo-bar-desktop-text">← Вернуться в портфолио</span>
        <span className="demo-bar-mobile-text">← Портфолио</span>
      </Link>
    </div>
  );
}
