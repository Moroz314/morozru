import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import certificate1 from './components/proj_foto/cert1.png';
import certificate2 from './components/proj_foto/cert2.jpg';
import t_p_1 from './components/proj_foto/t-p-1.png';
import s_n_p_1 from './components/proj_foto/s-n-p-1.png';
import b_r_1 from './components/proj_foto/b-r-1.jpg';
import p_r_1 from './components/proj_foto/p-r-1.jpg';

/* ─── Helpers ─── */
function Tag({ children, color = 'indigo' }) {
  const colors = {
    indigo: { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)', text: '#a5b4fc' },
    emerald: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', text: '#6ee7b7' },
    amber: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#fcd34d' },
    violet: { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', text: '#c4b5fd' },
  };
  const c = colors[color] || colors.indigo;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 12px',
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: '100px', fontSize: '0.76rem', fontWeight: '600',
      color: c.text, whiteSpace: 'nowrap'
    }}>{children}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '6px 18px',
        background: 'rgba(99,102,241,0.1)',
        border: '1px solid rgba(99,102,241,0.25)',
        borderRadius: '100px',
        fontSize: '0.75rem', fontWeight: '700', color: '#a5b4fc',
        letterSpacing: '0.08em', textTransform: 'uppercase'
      }}>{children}</span>
    </div>
  );
}

function ImgWithFallback({ src, alt, style, fallbackEmoji = '🖼️', fallbackText = 'Скриншот скоро' }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div style={{ ...style, background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(165,180,252,0.4)' }}>
        <span style={{ fontSize: '2.5rem' }}>{fallbackEmoji}</span>
        <span style={{ fontSize: '0.78rem', fontWeight: '500' }}>{fallbackText}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} />;
}

/* ─── BLOCK 1: HERO ─── */
function HeroSection() {
  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: '120px 24px 80px',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
        {/* Badge */}
        <div className="animate-fade-in-up" style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 20px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'inline-block', flexShrink: 0 }} />
            Доступен для новых проектов &nbsp;•&nbsp; Санкт-Петербург / Онлайн
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animate-delay-100" style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
          fontWeight: '800', lineHeight: 1.1,
          textAlign: 'center', marginBottom: '24px',
          color: '#f8fafc'
        }}>
          Разрабатываю{' '}
          <span style={{ background: 'linear-gradient(135deg, #818cf8, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            продающие сайты,
          </span>{' '}
          интернет-магазины{' '}
          <span style={{ background: 'linear-gradient(135deg, #34d399, #6ee7b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            и Telegram-боты
          </span>{' '}
          под ключ для бизнеса
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animate-delay-200" style={{
          textAlign: 'center', color: '#94a3b8',
          fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
          lineHeight: 1.75, maxWidth: '720px', margin: '0 auto 40px'
        }}>
          Автоматизирую приём заказов, подключаю онлайн-оплату (ЮKassa, СБП) и доставку (СДЭК),
          создаю удобные админ-панели. <strong style={{ color: '#e2e8f0' }}>Без абонентской платы конструкторам
          и без потери клиентов в переписках.</strong>
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animate-delay-300 hero-buttons" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
          <a
            href="https://t.me/Moroz_3141592"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hero-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            Обсудить проект в Telegram
          </a>
          <button
            onClick={() => handleScrollTo('cases')}
            className="btn-secondary hero-btn"
          >
            Смотреть живые работы ↓
          </button>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in-up animate-delay-400 hero-stats-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', maxWidth: '720px', margin: '0 auto'
        }}>
          {[
            { value: '1 сек', label: 'скорость загрузки', icon: '⚡' },
            { value: '0 ₽/мес', label: 'абонентская плата за платформу', icon: '💸' },
            { value: '100%', label: 'управление через свою админ-панель', icon: '🔑' },
          ].map(stat => (
            <div key={stat.value} style={{
              padding: '18px 14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{stat.icon}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '800', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: '#f8fafc', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-btn { padding: 15px 32px; font-size: 1rem; }
        @media (max-width: 640px) {
          .hero-stats-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .hero-buttons { flex-direction: column !important; width: 100% !important; gap: 10px !important; }
          .hero-btn { width: 100% !important; padding: 13px 18px !important; font-size: 0.9rem !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── BLOCK 2: ALDUIN FLAGSHIP CASE ─── */
function AlduinCase() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: '🏪 Витрина и Каталог',
      title: 'Клиентская витрина интернет-магазина',
      description: 'Главная страница сайта встречает покупателей живой историей бренда и продуманной витриной. Каталог с удобными фильтрами по категориям и материалам позволяет быстро найти нужное изделие. Фотографии товаров хранятся в облаке, а страницы загружаются менее чем за 1 секунду благодаря серверному рендерингу.',
      imgs: ['/images/alduin/hero.jpg', '/images/alduin/catalog.jpg'],
      features: ['Фильтрация по категориям', 'Карточки товаров с фото', 'Мобильная адаптация', 'SEO-оптимизация', 'Загрузка < 1 сек']
    },
    {
      id: 1,
      label: '🚚 Оплата и СДЭК',
      title: 'Интеграция с ЮKassa и СДЭК',
      description: 'Покупатель выбирает пункт выдачи СДЭК прямо на интерактивной карте, видит точную стоимость и сроки доставки. После оплаты через ЮKassa (карта / СБП) система автоматически создаёт накладную СДЭК и отправляет клиенту трек-номер в SMS и на email. Никакой ручной работы для владельца.',
      imgs: ['/images/alduin/catalog.jpg'],
      features: ['Карта ПВЗ СДЭК', 'Оплата ЮKassa / СБП', 'Автогенерация накладной', 'Email + SMS уведомления', 'Трек-номер автоматически']
    },
    {
      id: 2,
      label: '⚙️ Кастомная Админ-панель',
      title: 'Мощная административная панель',
      description: 'Владелец управляет всем магазином без программиста. Заказы разбиты по статусам «Новый / Оплачен / В изготовлении / Отправлен» и обновляются в один клик. Товары сортируются drag-and-drop прямо на экране. Можно менять описания, цены, фото и настройки сайта со смартфона за 30 секунд.',
      imgs: ['/images/alduin/admin-orders.png', '/images/alduin/admin-products.png', '/images/alduin/admin-settings.png'],
      features: ['Статусы заказов', 'Drag-and-drop сортировка', 'Управление с телефона', 'Настройки сайта', 'Аналитика продаж']
    },
  ];

  const active = tabs[activeTab];

  return (
    <section id="cases" style={{ padding: '100px 24px', background: 'linear-gradient(180deg, #090A0F 0%, rgba(99,102,241,0.03) 50%, #090A0F 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>🏆 Флагманский коммерческий кейс</SectionLabel>

        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
          fontWeight: '800', color: '#f8fafc',
          textAlign: 'center', marginBottom: '16px'
        }}>
          Интернет-магазин и система управления заказами
          <br />
          <span style={{ background: 'linear-gradient(135deg, #818cf8, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            для мастерской «Алдуин»
          </span>
        </h2>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem', marginBottom: '24px' }}>
          alduin-workshop.ru
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '48px' }}>
          {[
            { label: 'Коммерческий проект под ключ', color: 'violet' },
            { label: 'E-commerce', color: 'indigo' },
            { label: 'ЮKassa (Эквайринг)', color: 'emerald' },
            { label: 'API СДЭК', color: 'emerald' },
            { label: 'Собственная Админ-панель', color: 'amber' },
          ].map(t => <Tag key={t.label} color={t.color}>{t.label}</Tag>)}
        </div>

        {/* Main card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          overflow: 'hidden'
        }}>
          {/* Tab buttons */}
          <div style={{
            display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)',
            overflowX: 'auto', padding: '0 4px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="alduin-tab-btn"
                style={{
                  padding: '16px 20px',
                  background: 'none', border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                  color: activeTab === tab.id ? '#818cf8' : '#64748b',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: '0.9rem', cursor: 'pointer',
                  whiteSpace: 'nowrap', transition: 'all 0.2s ease',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="alduin-card-content" style={{ padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            {/* Left: description */}
            <div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: '700', color: '#f8fafc', marginBottom: '16px' }}>
                {active.title}
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '28px', fontSize: '0.97rem' }}>
                {active.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {active.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://alduin-workshop.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', boxSizing: 'border-box', textAlign: 'center' }}
              >
                Перейти на живой сайт alduin-workshop.ru ↗
              </a>
            </div>

            {/* Right: screenshots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {active.imgs.map((img, i) => (
                <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <ImgWithFallback
                    src={img}
                    alt={`${active.title} скриншот ${i + 1}`}
                    style={{ width: '100%', height: i === 0 ? '260px' : '160px', objectFit: 'cover', display: 'block' }}
                    fallbackEmoji="🖥️"
                    fallbackText="Скриншот будет добавлен"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive tab content */}
      <style>{`
        @media (max-width: 860px) {
          .alduin-card-content {
            grid-template-columns: 1fr !important;
            padding: 20px 14px !important;
            gap: 20px !important;
          }
          .alduin-tab-btn {
            padding: 12px 14px !important;
            font-size: 0.82rem !important;
          }
        }
        @media (max-width: 480px) {
          .alduin-card-content {
            padding: 16px 10px !important;
            gap: 16px !important;
          }
          .alduin-tab-btn {
            padding: 10px 10px !important;
            font-size: 0.76rem !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── BLOCK 3: DEMO CONCEPTS ─── */
function DemoConcepts() {
  const demos = [
    {
      id: 'detailing',
      emoji: '🚗',
      title: 'Apex Detailing SPb',
      subtitle: 'Сайт детейлинг-студии',
      description: 'Премиальный сайт автосервиса с интерактивным калькулятором стоимости услуг и онлайн-записью через Telegram.',
      tags: ['Калькулятор', 'Онлайн-запись', 'Telegram'],
      path: '/demo/detailing',
      accentColor: '#6366f1',
      accentBg: 'rgba(99,102,241,0.08)',
      accentBorder: 'rgba(99,102,241,0.2)',
    },
    {
      id: 'furniture',
      emoji: '🪵',
      title: 'Nordic Loft',
      subtitle: 'Мебель на заказ',
      description: 'Сайт мебельного производства с квизом расчёта стоимости за 1 минуту и живым каталогом готовых работ.',
      tags: ['Квиз-калькулятор', 'Каталог работ', 'Заявка онлайн'],
      path: '/demo/furniture',
      accentColor: '#10b981',
      accentBg: 'rgba(16,185,129,0.08)',
      accentBorder: 'rgba(16,185,129,0.2)',
    },
    {
      id: 'coffee',
      emoji: '☕',
      title: 'Roast & Berry',
      subtitle: 'Кофейня и пекарня',
      description: 'Веб-приложение для кофейни с быстрой корзиной, модификаторами товаров и оформлением доставки.',
      tags: ['Корзина', 'Доставка', 'Онлайн-оплата'],
      path: '/demo/coffee',
      accentColor: '#f59e0b',
      accentBg: 'rgba(245,158,11,0.08)',
      accentBorder: 'rgba(245,158,11,0.2)',
    },
  ];

  return (
    <section id="demos" style={{ padding: '100px 24px', background: '#090A0F' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>🎮 Живые демо-стенды</SectionLabel>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
          fontWeight: '800', color: '#f8fafc',
          textAlign: 'center', marginBottom: '16px'
        }}>
          Готовые отраслевые решения
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 56px', lineHeight: 1.7 }}>
          Откройте любой проект прямо сейчас и протестируйте интерфейс, калькуляторы
          и корзину со своего устройства
        </p>

        <div className="demo-concepts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {demos.map((demo, idx) => (
            <div
              key={demo.id}
              className="demo-concept-card"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${demo.accentBorder}`,
                borderRadius: '20px',
                padding: '32px 28px',
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.3s ease',
                animationDelay: `${idx * 0.1}s`
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 24px 48px ${demo.accentColor}22`; e.currentTarget.style.background = demo.accentBg; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            >
              {/* Icon */}
              <div style={{
                width: '64px', height: '64px',
                background: demo.accentBg,
                border: `1px solid ${demo.accentBorder}`,
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', marginBottom: '20px'
              }}>{demo.emoji}</div>

              {/* Info */}
              <div style={{ fontSize: '0.78rem', fontWeight: '600', color: demo.accentColor, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {demo.subtitle}
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: '700', color: '#f8fafc', marginBottom: '12px' }}>
                {demo.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px', flex: 1 }}>
                {demo.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {demo.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '3px 10px',
                    background: `${demo.accentColor}15`,
                    border: `1px solid ${demo.accentColor}30`,
                    borderRadius: '100px', fontSize: '0.74rem',
                    color: demo.accentColor, fontWeight: '500'
                  }}>{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={demo.path}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '12px 20px',
                  background: `${demo.accentColor}18`,
                  border: `1px solid ${demo.accentColor}40`,
                  borderRadius: '10px',
                  color: demo.accentColor, fontWeight: '600',
                  fontSize: '0.9rem', textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${demo.accentColor}30`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${demo.accentColor}18`; }}
              >
                Открыть живое демо →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .demo-concepts-grid { grid-template-columns: 1fr !important; }
          .demo-concept-card { padding: 22px 16px !important; }
        }
        @media (min-width: 600px) and (max-width: 900px) {
          .demo-concepts-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── BLOCK 4: OTHER PROJECTS ─── */
function OtherProjects() {
  const projects = [
    {
      id: 1,
      emoji: '🎓',
      title: 'StudNet',
      subtitle: 'Веб-платформа для студентов',
      description: 'Платформа для командной работы и управления проектами: канбан-доски задач, календарь дедлайнов, ролевая модель, чаты на WebSockets.',
      stack: ['FastAPI', 'React', 'PostgreSQL', 'WebSockets', 'Docker'],
      github: 'https://github.com/Moroz314',
      img: s_n_p_1,
    },
    {
      id: 2,
      emoji: '🛒',
      title: 'T-Products',
      subtitle: 'Кейс хакатона Т-Банка',
      description: 'Маркетплейс и агрегатор корзин из разных супермаркетов с алгоритмом сравнения цен. Разработан за 48 часов на хакатоне Prod.',
      stack: ['React', 'Python', 'FastAPI'],
      github: 'https://github.com/Moroz314/T-Products',
      img: t_p_1,
    },
    {
      id: 3,
      emoji: '🤖',
      title: 'COLD NEWS',
      subtitle: 'AI-бот агрегатор новостей',
      description: 'Умный Telegram-бот с ИИ для автоматической классификации и фильтрации контента из десятков каналов. Кейс для РАНХиГС.',
      stack: ['Node.js', 'Telegram Bot API', 'AI'],
      github: 'https://github.com/Moroz314/cold_news',
      img: b_r_1,
    },
    {
      id: 4,
      emoji: '🗺️',
      title: 'BOT_APPLICANT',
      subtitle: 'Бот-навигатор для РАНХиГС',
      description: 'Интерактивный ассистент в Telegram для быстрой навигации посетителей по территории академии в день открытых дверей.',
      stack: ['JavaScript', 'Node.js', 'Telegram Bot API'],
      github: 'https://github.com/Moroz314/BOT_APPLICANT',
      img: p_r_1,
    },
  ];

  return (
    <section style={{ padding: '100px 24px', background: 'linear-gradient(180deg, #090A0F 0%, rgba(99,102,241,0.02) 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>💼 Кейсы</SectionLabel>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
          fontWeight: '800', color: '#f8fafc',
          textAlign: 'center', marginBottom: '56px'
        }}>
          Другие сложные системы и боты
        </h2>

        <div className="other-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="other-project-card"
              style={{
                display: 'flex', gap: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '18px',
                padding: '24px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(99,102,241,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Thumbnail */}
              <div style={{ width: '90px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                <ImgWithFallback
                  src={proj.img}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  fallbackEmoji={proj.emoji}
                  fallbackText=""
                />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: '600', color: '#6366f1', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {proj.subtitle}
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
                  {proj.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.83rem', lineHeight: 1.6, marginBottom: '12px' }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {proj.stack.map(s => (
                    <span key={s} style={{ padding: '2px 8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '100px', fontSize: '0.72rem', color: '#a5b4fc', fontWeight: '500' }}>{s}</span>
                  ))}
                </div>
                <a href={proj.github} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .other-projects-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .other-project-card {
            flex-direction: column !important;
            padding: 18px 16px !important;
          }
          .other-project-card > div:first-child {
            width: 100% !important;
            height: 140px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── BLOCK 5: WHY ME ─── */
function WhyMe() {
  const benefits = [
    {
      icon: '💳',
      title: 'Никаких подписок по 15 000 ₽/год',
      description: 'Код и сайт полностью принадлежат вам. Платите только за хостинг — от 300 ₽/месяц. Без Tilda, без Wix, без условий конструктора.',
      accentColor: '#6366f1'
    },
    {
      icon: '🔗',
      title: 'Любая логика и интеграции',
      description: 'СДЭК, ЮKassa, СБП, МойСклад, Telegram-боты, CRM. Нет ничего невозможного — всё что нужно бизнесу, реализуемо.',
      accentColor: '#8b5cf6'
    },
    {
      icon: '📱',
      title: 'Удобная админка без лишнего мусора',
      description: 'Меняйте цены, добавляйте товары и обновляйте контент с телефона за 30 секунд. Никаких лишних кнопок и конфигураций.',
      accentColor: '#10b981'
    },
    {
      icon: '🤝',
      title: 'Прямая связь с разработчиком',
      description: 'Без переплаты агентствам и испорченного телефона через менеджеров. Вы общаетесь напрямую и всегда знаете статус проекта.',
      accentColor: '#f59e0b'
    },
  ];

  return (
    <section id="about" style={{ padding: '100px 24px', background: '#090A0F' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>⚡ Почему выгоднее работать со мной</SectionLabel>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
          fontWeight: '800', color: '#f8fafc',
          textAlign: 'center', marginBottom: '16px'
        }}>
          Конструкторы vs. Индивидуальная разработка
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem', maxWidth: '560px', margin: '0 auto 56px', lineHeight: 1.7 }}>
          Почему бизнесу выгоднее заказать сайт у разработчика, а не платить Tilda и Wix каждый год
        </p>

        <div className="why-me-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {benefits.map((b, i) => (
            <div
              key={i}
              className="why-me-card"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '32px 28px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${b.accentColor}40`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${b.accentColor}15`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                width: '52px', height: '52px',
                background: `${b.accentColor}15`,
                border: `1px solid ${b.accentColor}30`,
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', marginBottom: '20px'
              }}>{b.icon}</div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '10px' }}>
                {b.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .why-me-grid { grid-template-columns: 1fr !important; }
          .why-me-card { padding: 22px 18px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── BLOCK 6: ACHIEVEMENTS + FOOTER/CTA ─── */
function AchievementsAndFooter() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [formData, setFormData] = useState({ name: '', contact: '', business: '' });
  const [sent, setSent] = useState(false);

  const certs = [
    {
      id: 1,
      img: certificate1,
      title: 'Благодарственное письмо',
      issuer: 'Президентская Академия РАНХиГС',
      desc: 'За помощь в разработке виртуального ассистента для дня открытых дверей',
      date: '2024', emoji: '🏆'
    },
    {
      id: 2,
      img: certificate2,
      title: 'Сертификат участника хакатона Т-Банка Prod',
      issuer: 'Т-Банк',
      desc: 'Участие в хакатоне по разработке веб-приложений международной олимпиады Prod',
      date: '2024', emoji: '🎖️'
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', contact: '', business: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      {/* Achievements */}
      <section id="tariffs" style={{ padding: '100px 24px', background: 'linear-gradient(180deg, #090A0F 0%, rgba(99,102,241,0.03) 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel>🎖️ Достижения</SectionLabel>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            fontWeight: '800', color: '#f8fafc',
            textAlign: 'center', marginBottom: '48px'
          }}>
            Сертификаты и награды
          </h2>

          <div className="certs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
            {certs.map(cert => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px', overflow: 'hidden',
                  cursor: 'pointer', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(99,102,241,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <ImgWithFallback
                    src={cert.img}
                    alt={cert.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    fallbackEmoji={cert.emoji}
                    fallbackText={cert.title}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,10,15,0.6), transparent)' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', background: 'rgba(9,10,15,0.8)', borderRadius: '100px', fontSize: '0.75rem', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>{cert.date}</div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                    <span style={{ padding: '4px 10px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '100px', fontSize: '0.72rem', color: '#a5b4fc', fontWeight: '600' }}>
                      🔍 Нажмите для просмотра
                    </span>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>{cert.title}</h3>
                  <div style={{ fontSize: '0.78rem', color: '#6366f1', fontWeight: '600', marginBottom: '6px' }}>{cert.issuer}</div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate modal */}
        {selectedCert && (
          <div
            onClick={() => setSelectedCert(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px'
            }}
          >
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '100%', background: 'rgba(15,16,26,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", color: '#f8fafc', fontWeight: '700', fontSize: '1.1rem', marginBottom: '2px' }}>{selectedCert.title}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#6366f1' }}>{selectedCert.issuer} • {selectedCert.date}</div>
                </div>
                <button onClick={() => setSelectedCert(null)} style={{ padding: '8px', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#94a3b8', fontSize: '1rem', lineHeight: 1 }}>✕</button>
              </div>
              <img src={selectedCert.img} alt={selectedCert.title} style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', background: '#111' }} />
            </div>
          </div>
        )}
      </section>

      {/* CTA + Footer */}
      <section id="contacts" style={{ padding: '100px 24px 60px', background: '#090A0F', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          {/* CTA Block */}
          <div className="cta-block" style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '24px', padding: '56px 48px',
            marginBottom: '64px', textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: '800', color: '#f8fafc', marginBottom: '16px' }}>
              Готовы обсудить ваш проект?
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 40px' }}>
              Оставьте контакт — и я бесплатно разберу текущий сайт вашего бизнеса
              и расскажу, что можно улучшить
            </p>

            {/* Quick form */}
            {sent ? (
              <div style={{ padding: '20px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '14px', color: '#6ee7b7', fontWeight: '600', marginBottom: '32px' }}>
                ✅ Отлично! Я свяжусь с вами в ближайшее время
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '600px', margin: '0 auto 32px', textAlign: 'left' }}>
                <input
                  type="text" placeholder="Ваше имя" required
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', fontSize: '0.9rem', outline: 'none', fontFamily: "'Inter', sans-serif" }}
                />
                <input
                  type="text" placeholder="Telegram или телефон" required
                  value={formData.contact}
                  onChange={e => setFormData(p => ({ ...p, contact: e.target.value }))}
                  style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', fontSize: '0.9rem', outline: 'none', fontFamily: "'Inter', sans-serif" }}
                />
                <input
                  type="text" placeholder="Сфера / тип сайта"
                  value={formData.business}
                  onChange={e => setFormData(p => ({ ...p, business: e.target.value }))}
                  style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', fontSize: '0.9rem', outline: 'none', fontFamily: "'Inter', sans-serif", gridColumn: '1 / -1' }}
                />
                <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1', justifyContent: 'center', padding: '15px' }}>
                  Оставить контакт для бесплатного разбора →
                </button>
              </form>
            )}

            {/* Contact buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              {[
                { icon: '✈️', label: 'Telegram', href: 'https://t.me/Moroz_3141592', color: '#6366f1' },
                { icon: '🐙', label: 'GitHub', href: 'https://github.com/Moroz314', color: '#8b5cf6' },
                { icon: '📞', label: '+7 (904) 612-55-59', href: 'tel:+79046125559', color: '#10b981' },
                { icon: '📧', label: 'vladmorozov2020@mail.ru', href: 'mailto:vladmorozov2020@mail.ru', color: '#f59e0b' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px',
                    background: `${c.color}10`,
                    border: `1px solid ${c.color}30`,
                    borderRadius: '10px',
                    color: '#e2e8f0', fontSize: '0.88rem', fontWeight: '500',
                    textDecoration: 'none', transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${c.color}20`; e.currentTarget.style.borderColor = `${c.color}50`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${c.color}10`; e.currentTarget.style.borderColor = `${c.color}30`; }}
                >
                  {c.icon} {c.label}
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '32px' }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1.1rem', color: '#f8fafc', marginBottom: '8px' }}>Moroz314 · Владислав Морозов</div>
            <p style={{ color: '#334155', fontSize: '0.82rem', marginBottom: '16px' }}>
              © {new Date().getFullYear()} · Веб-разработка под ключ · Санкт-Петербург / Онлайн
            </p>
            <p style={{ color: '#1e293b', fontSize: '0.75rem' }}>
              Сделано с ❤️ на React + Vite
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .certs-grid { grid-template-columns: 1fr !important; }
            .cta-block { padding: 32px 18px !important; }
            .contact-form { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}

/* ─── HOME PAGE ASSEMBLY ─── */
export default function Home() {
  return (
    <div style={{ background: '#090A0F', minHeight: '100vh' }}>
      <Header />
      <main>
        <HeroSection />
        <AlduinCase />
        <DemoConcepts />
        <OtherProjects />
        <WhyMe />
        <AchievementsAndFooter />
      </main>
    </div>
  );
}
