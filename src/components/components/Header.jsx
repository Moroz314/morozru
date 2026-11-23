import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { name: 'Кейсы', href: '#cases', id: 'cases' },
  { name: 'Демо-сайты', href: '#demos', id: 'demos' },
  { name: 'Этапы', href: '#process', id: 'process' },
  { name: 'Тарифы', href: '#tariffs', id: 'tariffs' },
  { name: 'Выгоды', href: '#about', id: 'about' },
  { name: 'Контакты', href: '#contacts', id: 'contacts' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
      const scrollPos = window.scrollY + 180;
      let current = '';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '10px 16px' : '14px 16px',
          transition: 'padding 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            pointerEvents: 'auto',
            borderRadius: scrolled ? '18px' : '16px',
            background: scrolled ? 'rgba(10, 12, 20, 0.82)' : 'rgba(10, 12, 20, 0.38)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: scrolled
              ? '1px solid rgba(255, 255, 255, 0.11)'
              : '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: scrolled ? '0 16px 40px -10px rgba(0, 0, 0, 0.65)' : 'none',
            padding: '0 20px',
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '64px',
              gap: '16px',
            }}
          >
            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  borderRadius: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 18px rgba(99, 102, 241, 0.45)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  color: '#ffffff',
                }}
              >
                M
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '800',
                    fontSize: '1rem',
                    color: '#f8fafc',
                    lineHeight: 1.05,
                  }}
                >
                  Moroz314
                </div>
                <div
                  style={{
                    fontSize: '0.66rem',
                    color: '#818cf8',
                    fontWeight: '600',
                    letterSpacing: '0.1em',
                  }}
                >
                  FULL-STACK STUDIO
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    style={{
                      padding: '8px 14px',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      background: isActive ? 'rgba(99, 102, 241, 0.16)' : 'transparent',
                      border: isActive ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? '600' : '500',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'all 0.22s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#f8fafc';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#94a3b8';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a
                href="https://t.me/Moroz_3141592"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '9px 18px', fontSize: '0.84rem', borderRadius: '11px' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Заказать сайт
              </a>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
              id="mobile-menu-btn"
              style={{
                display: 'none',
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                cursor: 'pointer',
                flexDirection: 'column',
                gap: '5px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '18px',
                    height: '2px',
                    background: '#e2e8f0',
                    borderRadius: '2px',
                    transition: 'all 0.28s ease',
                    transformOrigin: 'center',
                    transform:
                      isMenuOpen && i === 0
                        ? 'rotate(45deg) translate(5px, 5px)'
                        : isMenuOpen && i === 1
                          ? 'scaleX(0)'
                          : isMenuOpen && i === 2
                            ? 'rotate(-45deg) translate(5px, -5px)'
                            : 'none',
                    opacity: isMenuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </nav>

          {/* Mobile dropdown */}
          <div
            style={{
              overflow: 'hidden',
              maxHeight: isMenuOpen ? '420px' : '0',
              opacity: isMenuOpen ? 1 : 0,
              transition: 'max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease',
              borderTop: isMenuOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
          >
            <div style={{ padding: '14px 4px 18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{
                    padding: '11px 14px',
                    color: activeId === item.id ? '#ffffff' : '#94a3b8',
                    background: activeId === item.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                    fontSize: '0.94rem',
                    fontWeight: '500',
                    borderRadius: '10px',
                    textDecoration: 'none',
                  }}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="https://t.me/Moroz_3141592"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: '10px', width: '100%' }}
              >
                ✈️ Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
