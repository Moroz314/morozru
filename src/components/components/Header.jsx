import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { name: 'Обо мне и выгоды', href: '#about' },
  { name: 'Кейсы', href: '#cases' },
  { name: 'Демо-сайты', href: '#demos' },
  { name: 'Тарифы', href: '#tariffs' },
  { name: 'Контакты', href: '#contacts' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(9, 10, 15, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}>
        <div className="section-container">
          <nav style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: '72px'
          }}>
            {/* Logo */}
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div style={{
                width: '40px', height: '40px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
                fontFamily: "'Outfit', sans-serif", fontWeight: '800',
                fontSize: '1.1rem', color: 'white'
              }}>M</div>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1rem', color: '#f8fafc', lineHeight: 1 }}>Moroz314</div>
                <div style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: '500', letterSpacing: '0.05em' }}>WEB DEV</div>
              </div>
            </a>

            {/* Desktop nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href)}
                  style={{
                    padding: '8px 14px',
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#f8fafc'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* CTA button desktop */}
            <a
              href="https://t.me/Moroz_3141592"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary desktop-cta"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              <span>✈️</span> Telegram
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'none',
                padding: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                cursor: 'pointer',
                flexDirection: 'column', gap: '4px',
                alignItems: 'center', justifyContent: 'center'
              }}
              id="mobile-menu-btn"
            >
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: '20px', height: '2px',
                  background: '#94a3b8', borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'center',
                  transform: isMenuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)' :
                              isMenuOpen && i === 1 ? 'scaleX(0)' :
                              isMenuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
                  opacity: isMenuOpen && i === 1 ? 0 : 1
                }} />
              ))}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        <div style={{
          overflow: 'hidden',
          maxHeight: isMenuOpen ? '400px' : '0',
          transition: 'max-height 0.35s ease',
          background: 'rgba(9,10,15,0.97)',
          borderTop: isMenuOpen ? '1px solid rgba(255,255,255,0.07)' : 'none'
        }}>
          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map(item => (
              <a
                key={item.name}
                href={item.href}
                onClick={e => handleNavClick(e, item.href)}
                style={{
                  padding: '12px 16px',
                  color: '#94a3b8',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  display: 'block'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f8fafc'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://t.me/Moroz_3141592"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginTop: '12px', justifyContent: 'center' }}
            >
              ✈️ Написать в Telegram
            </a>
          </div>
        </div>
      </header>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
