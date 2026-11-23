import React, { useEffect, useRef, useState } from 'react';

/* ─── Top Scroll Progress Bar ─── */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />;
}

/* ─── Scroll Reveal Wrapper ─── */
export function Reveal({ children, delay = 0, style = {}, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ─── Interactive Pointer-Tracking Spotlight Card ─── */
export function SpotlightCard({
  children,
  className = '',
  style = {},
  spotlightColor = 'rgba(99, 102, 241, 0.16)',
  spotlightBorder = 'rgba(99, 102, 241, 0.38)',
  spotlightGlow = 'rgba(99, 102, 241, 0.14)',
  onClick,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`spotlight-card ${className}`}
      style={{
        '--spotlight-color': spotlightColor,
        '--spotlight-border': spotlightBorder,
        '--spotlight-glow': spotlightGlow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated Metric Counter ─── */
export function AnimatedCounter({ target, prefix = '', suffix = '', duration = 1200 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now) => {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/* ─── Pill Tag ─── */
export function Tag({ children, color = 'indigo' }) {
  const colors = {
    indigo: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.28)', text: '#a5b4fc' },
    emerald: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.28)', text: '#6ee7b7' },
    amber: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.28)', text: '#fcd34d' },
    violet: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.28)', text: '#c4b5fd' },
    kraft: { bg: 'rgba(212,163,115,0.14)', border: 'rgba(212,163,115,0.34)', text: '#f3d5b5' },
  };
  const c = colors[color] || colors.indigo;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 13px',
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '100px',
        fontSize: '0.76rem',
        fontWeight: '600',
        color: c.text,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

/* ─── Section Header ─── */
export function SectionHeading({ badge, title, highlight, highlightClass = 'gradient-text-indigo', subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '56px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 18px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.26)',
            borderRadius: '100px',
            fontSize: '0.75rem',
            fontWeight: '700',
            color: '#a5b4fc',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            boxShadow: '0 0 24px rgba(99,102,241,0.12)',
          }}
        >
          {badge}
        </span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.75rem, 4.2vw, 2.85rem)',
          fontWeight: '800',
          color: '#f8fafc',
          marginBottom: subtitle ? '16px' : '0',
          lineHeight: 1.14,
        }}
      >
        {title}{' '}
        {highlight && <span className={highlightClass}>{highlight}</span>}
      </h2>
      {subtitle && (
        <p
          style={{
            color: '#94a3b8',
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── Image With Fallback ─── */
export function ImgWithFallback({ src, alt, style, fallbackEmoji = '🖥️', fallbackText = 'Превью' }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div
        style={{
          ...style,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: 'rgba(165,180,252,0.5)',
        }}
      >
        <span style={{ fontSize: '2.2rem' }}>{fallbackEmoji}</span>
        {fallbackText && <span style={{ fontSize: '0.78rem', fontWeight: '500' }}>{fallbackText}</span>}
      </div>
    );
  }
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} loading="lazy" />;
}

/* ─── macOS Browser Mockup Frame with Zoom ─── */
export function BrowserMockup({ url, img, alt, height = '290px', onZoom }) {
  return (
    <div
      className="browser-mockup"
      onClick={() => onZoom && onZoom({ src: img, title: alt, url })}
      style={{ cursor: onZoom ? 'zoom-in' : 'default' }}
    >
      <div className="browser-mockup-bar">
        <div className="browser-mockup-dots">
          <span style={{ background: '#ef4444' }} />
          <span style={{ background: '#f59e0b' }} />
          <span style={{ background: '#10b981' }} />
        </div>
        <div className="browser-mockup-url">
          <span style={{ color: '#10b981', fontSize: '0.68rem' }}>🔒</span>
          <span>{url}</span>
        </div>
        {onZoom && (
          <span
            style={{
              fontSize: '0.7rem',
              color: '#94a3b8',
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.06)',
              whiteSpace: 'nowrap',
            }}
          >
            🔍 Увеличить
          </span>
        )}
      </div>
      <div style={{ overflow: 'hidden', position: 'relative', background: '#0b0d14' }}>
        <ImgWithFallback
          src={img}
          alt={alt}
          style={{
            width: '100%',
            height,
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
            transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Fullscreen Image Lightbox ─── */
export function ImageLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        background: 'rgba(4, 5, 9, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1080px',
          width: '100%',
          background: '#0d1018',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.75)',
        }}
      >
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: '#f8fafc', fontSize: '0.98rem' }}>
              {item.title}
            </div>
            {item.url && (
              <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontFamily: 'monospace' }}>{item.url}</div>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
              color: '#e2e8f0',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ background: '#07080d', display: 'flex', justifyContent: 'center', padding: '12px' }}>
          <img
            src={item.src}
            alt={item.title}
            style={{
              width: '100%',
              maxHeight: '78vh',
              objectFit: 'contain',
              borderRadius: '10px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
