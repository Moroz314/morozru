import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import FlagshipCases from './sections/FlagshipCases';
import { ProcessSection, TariffsSection } from './sections/ConversionSections';
import {
  AnimatedCounter,
  ImageLightbox,
  ImgWithFallback,
  Reveal,
  ScrollProgressBar,
  SectionHeading,
  SpotlightCard,
} from './ui/MotionPrimitives';
import certificate1 from './components/proj_foto/cert1.png';
import certificate2 from './components/proj_foto/cert2.jpg';
import t_p_1 from './components/proj_foto/t-p-1.png';
import s_n_p_1 from './components/proj_foto/s-n-p-1.png';
import b_r_1 from './components/proj_foto/b-r-1.jpg';
import p_r_1 from './components/proj_foto/p-r-1.jpg';

const TECH_MARQUEE = [
  { icon: '⚛️', name: 'React & Vite' },
  { icon: '⚡', name: 'FastAPI / Python' },
  { icon: '💳', name: 'ЮKassa & СБП' },
  { icon: '📦', name: 'API СДЭК' },
  { icon: '📄', name: 'ЭДО Диадок / СБИС' },
  { icon: '✈️', name: 'Telegram Bots & Mini Apps' },
  { icon: '🗄️', name: 'PostgreSQL' },
  { icon: '🐳', name: 'Docker & CI/CD' },
  { icon: '🔌', name: 'WebSockets' },
  { icon: '🎨', name: 'UI/UX & Анимации' },
  { icon: '🔍', name: 'SEO-оптимизация' },
  { icon: '📱', name: 'Mobile-First Админки' },
];

/* ─── BLOCK 1: HERO ─── */
function HeroSection() {
  const heroRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 50, y: 35 });

  const handleMouseMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '132px 24px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Interactive cursor spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(640px circle at ${cursor.x}% ${cursor.y}%, rgba(99,102,241,0.13), transparent 55%)`,
          pointerEvents: 'none',
          transition: 'background 0.15s ease-out',
        }}
      />

      {/* Architectural grid */}
      <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Animated Aurora Orbs */}
      <div
        className="animate-aurora-1"
        style={{
          position: 'absolute',
          top: '-12%',
          left: '-6%',
          width: '680px',
          height: '680px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 68%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(12px)',
        }}
      />
      <div
        className="animate-aurora-2"
        style={{
          position: 'absolute',
          bottom: '-14%',
          right: '-6%',
          width: '620px',
          height: '620px',
          background: 'radial-gradient(circle, rgba(212,163,115,0.11) 0%, transparent 68%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(14px)',
        }}
      />
      <div
        className="animate-float-slow"
        style={{
          position: 'absolute',
          top: '36%',
          right: '16%',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 2, maxWidth: '960px', margin: '0 auto' }}>
        {/* Live Availability Badge */}
        <div className="animate-fade-in-up" style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(255,255,255,0.11)',
              borderRadius: '100px',
              fontSize: '0.84rem',
              color: '#cbd5e1',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="radar-dot" />
            Открыт для новых проектов &nbsp;•&nbsp; Санкт-Петербург / Весь мир
          </span>
        </div>

        {/* Display Headline */}
        <h1
          className="animate-fade-in-up animate-delay-100"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.15rem, 5.8vw, 4.1rem)',
            fontWeight: '900',
            lineHeight: 1.07,
            textAlign: 'center',
            marginBottom: '24px',
            color: '#f8fafc',
            letterSpacing: '-0.03em',
          }}
        >
          Создаю{' '}
          <span className="gradient-text-indigo">продающие сайты,</span>{' '}
          интернет-магазины{' '}
          <span className="gradient-text-emerald">и Telegram-боты</span>{' '}
          под ключ
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up animate-delay-200"
          style={{
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: 'clamp(1rem, 2.2vw, 1.18rem)',
            lineHeight: 1.72,
            maxWidth: '730px',
            margin: '0 auto 38px',
          }}
        >
          Разрабатываю быстрые веб-системы, которые реально продают: оптовые и розничные каталоги,
          калькуляторы, <strong style={{ color: '#e2e8f0' }}>ЮKassa, СБП, СДЭК, ЭДО</strong> и удобные админ-панели.{' '}
          <strong style={{ color: '#f3d5b5' }}>Без подписок конструкторам и потери заявок.</strong>
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up animate-delay-300 hero-buttons"
          style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <a
            href="https://t.me/Moroz_3141592"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hero-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Обсудить проект в Telegram
          </a>
          <button onClick={() => handleScrollTo('cases')} className="btn-secondary hero-btn">
            Смотреть реальные кейсы ↓
          </button>
        </div>

        {/* Animated KPI Strip */}
        <div
          className="animate-fade-in-up animate-delay-400 hero-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px',
            maxWidth: '860px',
            margin: '0 auto 54px',
          }}
        >
          {[
            { render: () => '< 1 сек', label: 'скорость загрузки сайта', icon: '⚡', color: '#818cf8' },
            { render: () => '0 ₽/мес', label: 'плата конструкторам', icon: '💸', color: '#34d399' },
            { render: () => <AnimatedCounter target={100} suffix="%" />, label: 'код и админка ваши', icon: '🔑', color: '#d4a373' },
            { render: () => <AnimatedCounter target={24} suffix=" ч" />, label: 'бесплатная смета', icon: '🚀', color: '#c084fc' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '20px 14px',
                textAlign: 'center',
                borderRadius: '18px',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = `${stat.color}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.075)';
              }}
            >
              <div style={{ fontSize: '1.35rem', marginBottom: '6px' }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '800',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)',
                  color: '#f8fafc',
                  marginBottom: '4px',
                }}
              >
                {stat.render()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.35 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Tech & Integrations Marquee */}
      <div
        className="animate-fade-in-up animate-delay-500"
        style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', width: '100%', margin: '0 auto' }}
      >
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#cbd5e1',
                  fontSize: '0.82rem',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-btn { padding: 15px 30px; font-size: 0.98rem; }
        @media (max-width: 768px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
        @media (max-width: 520px) {
          .hero-buttons { flex-direction: column !important; width: 100% !important; gap: 10px !important; }
          .hero-btn { width: 100% !important; padding: 14px 18px !important; font-size: 0.92rem !important; }
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
      subtitle: 'Детейлинг-студия',
      description:
        'Премиальный сайт автосервиса с интерактивным калькулятором стоимости услуг по классу авто и онлайн-записью через Telegram.',
      tags: ['Калькулятор', 'Онлайн-запись', 'Telegram'],
      path: '/demo/detailing',
      accentColor: '#818cf8',
    },
    {
      id: 'furniture',
      emoji: '🪵',
      title: 'Nordic Loft',
      subtitle: 'Мебель на заказ',
      description:
        'Сайт мебельного производства с квизом расчёта стоимости за 1 минуту, подбором материалов и живым каталогом готовых работ.',
      tags: ['Квиз-калькулятор', 'Каталог работ', 'Заявка онлайн'],
      path: '/demo/furniture',
      accentColor: '#34d399',
    },
    {
      id: 'coffee',
      emoji: '☕',
      title: 'Roast & Berry',
      subtitle: 'Кофейня и пекарня',
      description:
        'Веб-приложение для кофейни с быстрой корзиной, модификаторами напитков (молоко, сиропы, объём) и оформлением доставки.',
      tags: ['Корзина', 'Модификаторы', 'Онлайн-оплата'],
      path: '/demo/coffee',
      accentColor: '#f59e0b',
    },
  ];

  return (
    <section id="demos" style={{ padding: '105px 24px', background: '#06070B' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <SectionHeading
            badge="🎮 Интерактивные демо-стенды"
            title="Протестируйте интерфейс"
            highlight="прямо сейчас"
            subtitle="Откройте любой демо-проект и покликайте калькуляторы, квизы и корзину — точно так же будет работать сайт вашего бизнеса"
          />
        </Reveal>

        <div className="demo-concepts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {demos.map((demo, idx) => (
            <Reveal key={demo.id} delay={idx * 90}>
              <SpotlightCard
                spotlightColor={`${demo.accentColor}24`}
                spotlightBorder={`${demo.accentColor}58`}
                spotlightGlow={`${demo.accentColor}1c`}
                style={{
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      background: `${demo.accentColor}18`,
                      border: `1px solid ${demo.accentColor}3c`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.9rem',
                    }}
                  >
                    {demo.emoji}
                  </div>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      background: 'rgba(16,185,129,0.1)',
                      border: '1px solid rgba(16,185,129,0.28)',
                      color: '#6ee7b7',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                    }}
                  >
                    ● LIVE DEMO
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    color: demo.accentColor,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {demo.subtitle}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.38rem',
                    fontWeight: '700',
                    color: '#f8fafc',
                    marginBottom: '12px',
                  }}
                >
                  {demo.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.68, marginBottom: '22px', flex: 1 }}>
                  {demo.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 11px',
                        background: `${demo.accentColor}14`,
                        border: `1px solid ${demo.accentColor}30`,
                        borderRadius: '100px',
                        fontSize: '0.73rem',
                        color: demo.accentColor,
                        fontWeight: '600',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={demo.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '13px 20px',
                    background: `${demo.accentColor}1c`,
                    border: `1px solid ${demo.accentColor}45`,
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${demo.accentColor}34`;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${demo.accentColor}1c`;
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  Открыть живое демо →
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .demo-concepts-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 620px) and (max-width: 960px) {
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
      subtitle: 'Веб-платформа для команд',
      description:
        'Платформа для командной работы и управления проектами: канбан-доски задач, календарь дедлайнов, ролевая модель, чаты в реальном времени на WebSockets.',
      stack: ['FastAPI', 'React', 'PostgreSQL', 'WebSockets', 'Docker'],
      github: 'https://github.com/Moroz314',
      img: s_n_p_1,
    },
    {
      id: 2,
      emoji: '🛒',
      title: 'T-Products',
      subtitle: 'Кейс хакатона Т-Банка',
      description:
        'Маркетплейс и агрегатор корзин из разных супермаркетов с алгоритмом сравнения цен. Разработан за 48 часов на международном хакатоне Prod.',
      stack: ['React', 'Python', 'FastAPI'],
      github: 'https://github.com/Moroz314/T-Products',
      img: t_p_1,
    },
    {
      id: 3,
      emoji: '🤖',
      title: 'COLD NEWS',
      subtitle: 'AI-бот агрегатор новостей',
      description:
        'Умный Telegram-бот с ИИ для автоматической классификации и фильтрации контента из десятков каналов. Кейс для РАНХиГС.',
      stack: ['Node.js', 'Telegram Bot API', 'AI'],
      github: 'https://github.com/Moroz314/cold_news',
      img: b_r_1,
    },
    {
      id: 4,
      emoji: '🗺️',
      title: 'BOT_APPLICANT',
      subtitle: 'Бот-навигатор для РАНХиГС',
      description:
        'Интерактивный ассистент в Telegram для быстрой навигации посетителей по территории академии в день открытых дверей.',
      stack: ['JavaScript', 'Node.js', 'Telegram Bot API'],
      github: 'https://github.com/Moroz314/BOT_APPLICANT',
      img: p_r_1,
    },
  ];

  return (
    <section
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #06070B 0%, rgba(99,102,241,0.03) 50%, #06070B 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <SectionHeading
            badge="💼 Технический бэкграунд"
            title="Другие сложные"
            highlight="системы и боты"
            subtitle="Опыт создания высоконагруженных платформ, AI-ботов и сервисов с нуля подтверждает, что технически реализуема любая ваша идея"
          />
        </Reveal>

        <div className="other-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {projects.map((proj, idx) => (
            <Reveal key={proj.id} delay={idx * 75}>
              <SpotlightCard
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '24px',
                  height: '100%',
                }}
                className="other-project-card"
              >
                <div
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <ImgWithFallback
                    src={proj.img}
                    alt={proj.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    fallbackEmoji={proj.emoji}
                    fallbackText=""
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: '#818cf8',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    {proj.subtitle}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      color: '#f8fafc',
                      marginBottom: '8px',
                    }}
                  >
                    {proj.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '14px', flex: 1 }}>
                    {proj.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {proj.stack.map((s) => (
                      <span
                        key={s}
                        style={{
                          padding: '3px 9px',
                          background: 'rgba(99,102,241,0.1)',
                          border: '1px solid rgba(99,102,241,0.22)',
                          borderRadius: '100px',
                          fontSize: '0.72rem',
                          color: '#a5b4fc',
                          fontWeight: '500',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      width: 'fit-content',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Смотреть на GitHub ↗
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
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
            height: 150px !important;
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
      description:
        'Код и сайт полностью принадлежат вам. Платите только за недорогой хостинг — от 300 ₽/мес. Никаких ограничений Tilda или Wix.',
      accentColor: '#818cf8',
    },
    {
      icon: '🔗',
      title: 'Любая логика и интеграции',
      description:
        'СДЭК, ЮKassa, СБП, оптовые калькуляторы тиражей, ЭДО, МойСклад, Telegram-боты и CRM. Сделаем именно так, как удобно вашему бизнесу.',
      accentColor: '#a855f7',
    },
    {
      icon: '📱',
      title: 'Удобная админка без лишнего мусора',
      description:
        'Меняйте цены, добавляйте товары и обрабатывайте заявки с телефона за 30 секунд. Простой интерфейс без сотен лишних кнопок.',
      accentColor: '#34d399',
    },
    {
      icon: '🤝',
      title: 'Прямая связь без агентских наценок',
      description:
        'Вы общаетесь напрямую с разработчиком, без менеджеров-посредников и переплаты x2 за бренд студии. Всегда знаете статус задачи.',
      accentColor: '#d4a373',
    },
  ];

  return (
    <section id="about" style={{ padding: '105px 24px', background: '#06070B' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <SectionHeading
            badge="⚡ Почему выгодно работать со мной"
            title="Конструкторы vs."
            highlight="Индивидуальная разработка"
            subtitle="Инвестиция в собственный сайт окупается быстрее, работает в разы шустрее и не привязывает ваш бизнес к чужой платформе"
          />
        </Reveal>

        <div className="why-me-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 75}>
              <SpotlightCard
                spotlightColor={`${b.accentColor}22`}
                spotlightBorder={`${b.accentColor}52`}
                spotlightGlow={`${b.accentColor}16`}
                style={{ padding: '32px 28px', height: '100%' }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    background: `${b.accentColor}18`,
                    border: `1px solid ${b.accentColor}38`,
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    marginBottom: '20px',
                  }}
                >
                  {b.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.16rem',
                    fontWeight: '700',
                    color: '#f8fafc',
                    marginBottom: '10px',
                  }}
                >
                  {b.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{b.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .why-me-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── BLOCK 6: ACHIEVEMENTS + SMART CTA + FOOTER ─── */
function AchievementsAndFooter({ selectedTopic, setSelectedTopic, onZoom }) {
  const [formData, setFormData] = useState({ name: '', contact: '', details: '', website: '' });
  const [sending, setSending] = useState(false);
  const [sentMode, setSentMode] = useState(''); // 'bot' | 'fallback' | ''
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState('');

  const quickTopics = [
    'Интернет-магазин',
    'B2B-портал (как nampack.ru)',
    'Продающий лендинг',
    'Telegram-бот / Mini App',
    'Доработка / Консультация',
  ];

  const certs = [
    {
      id: 1,
      img: certificate1,
      title: 'Благодарственное письмо',
      issuer: 'Президентская Академия РАНХиГС',
      desc: 'За помощь в разработке виртуального ассистента для дня открытых дверей',
      date: '2024',
      emoji: '🏆',
    },
    {
      id: 2,
      img: certificate2,
      title: 'Сертификат участника хакатона Т-Банка Prod',
      issuer: 'Т-Банк',
      desc: 'Участие в хакатоне по разработке веб-приложений международной олимпиады Prod',
      date: '2024',
      emoji: '🎖️',
    },
  ];

  const openTelegramFallback = () => {
    const lines = [
      'Здравствуйте, Владислав! Хочу обсудить проект:',
      selectedTopic ? `Тип: ${selectedTopic}` : '',
      `Имя: ${formData.name}`,
      `Контакт: ${formData.contact}`,
      formData.details ? `Задача: ${formData.details}` : '',
    ].filter(Boolean);
    const tgUrl = `https://t.me/Moroz_3141592?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(tgUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          topic: selectedTopic,
          details: formData.details,
          website: formData.website,
          pageUrl: window.location.href,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSentMode('bot');
        setFormData({ name: '', contact: '', details: '', website: '' });
      } else if (data.code === 'NOT_CONFIGURED' || res.status === 404 || res.status === 503) {
        openTelegramFallback();
        setSentMode('fallback');
        setFormData({ name: '', contact: '', details: '', website: '' });
      } else {
        setErrorMsg(data.error || 'Не удалось отправить заявку. Попробуйте написать напрямую в Telegram.');
      }
    } catch {
      openTelegramFallback();
      setSentMode('fallback');
      setFormData({ name: '', contact: '', details: '', website: '' });
    } finally {
      setSending(false);
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <>
      {/* Achievements */}
      <section
        style={{
          padding: '95px 24px',
          background: 'linear-gradient(180deg, #06070B 0%, rgba(99,102,241,0.03) 100%)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <SectionHeading badge="🎖️ Достижения и награды" title="Подтверждённая" highlight="экспертиза" />
          </Reveal>

          <div
            className="certs-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              maxWidth: '840px',
              margin: '0 auto',
            }}
          >
            {certs.map((cert, idx) => (
              <Reveal key={cert.id} delay={idx * 90}>
                <SpotlightCard
                  onClick={() => onZoom({ src: cert.img, title: `${cert.title} — ${cert.issuer}` })}
                  style={{ cursor: 'zoom-in', height: '100%' }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <ImgWithFallback
                      src={cert.img}
                      alt={cert.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      fallbackEmoji={cert.emoji}
                      fallbackText={cert.title}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(6,7,11,0.72), transparent 60%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '4px 10px',
                        background: 'rgba(6,7,11,0.82)',
                        borderRadius: '100px',
                        fontSize: '0.74rem',
                        color: '#cbd5e1',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      {cert.date}
                    </div>
                    <div style={{ position: 'absolute', bottom: '12px', left: '14px' }}>
                      <span
                        style={{
                          padding: '5px 11px',
                          background: 'rgba(99,102,241,0.22)',
                          border: '1px solid rgba(99,102,241,0.45)',
                          borderRadius: '100px',
                          fontSize: '0.72rem',
                          color: '#c7d2fe',
                          fontWeight: '600',
                          backdropFilter: 'blur(6px)',
                        }}
                      >
                        🔍 Увеличить документ
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '22px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        color: '#f8fafc',
                        marginBottom: '6px',
                      }}
                    >
                      {cert.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: '600', marginBottom: '8px' }}>
                      {cert.issuer}
                    </div>
                    <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>{cert.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Footer */}
      <section
        id="contacts"
        style={{
          padding: '100px 24px 56px',
          background: '#06070B',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '760px',
            height: '440px',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '940px', margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <div
              className="cta-block"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(99,102,241,0.04) 100%)',
                border: '1px solid rgba(99,102,241,0.28)',
                borderRadius: '28px',
                padding: '54px 44px',
                marginBottom: '64px',
                textAlign: 'center',
                boxShadow: '0 30px 80px -20px rgba(0,0,0,0.75), 0 0 60px -24px rgba(99,102,241,0.28)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.32)',
                  color: '#6ee7b7',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  marginBottom: '20px',
                }}
              >
                <span className="radar-dot" style={{ width: '7px', height: '7px' }} />
                Отвечаю лично в течение 1–2 часов
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 4.2vw, 2.7rem)',
                  fontWeight: '800',
                  color: '#f8fafc',
                  marginBottom: '14px',
                }}
              >
                Готовы запустить <span className="gradient-text-indigo">сильный сайт</span> для вашего бизнеса?
              </h2>
              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  maxWidth: '580px',
                  margin: '0 auto 30px',
                }}
              >
                Выберите формат задачи и оставьте контакт — я бесплатно разберу ваш проект и подготовлю
                точную смету со сроками.
              </p>

              {/* Quick topic selector chips */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center',
                  marginBottom: '26px',
                }}
              >
                {quickTopics.map((topic) => {
                  const active = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(active ? '' : topic)}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '100px',
                        border: active
                          ? '1px solid rgba(129,140,248,0.7)'
                          : '1px solid rgba(255,255,255,0.1)',
                        background: active ? 'rgba(99,102,241,0.22)' : 'rgba(255,255,255,0.035)',
                        color: active ? '#ffffff' : '#94a3b8',
                        fontSize: '0.82rem',
                        fontWeight: active ? '600' : '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-main)',
                      }}
                    >
                      {active ? '✓ ' : ''}
                      {topic}
                    </button>
                  );
                })}
              </div>

              {/* Smart Form -> Sends directly via Telegram Bot API (/api/lead) with TG fallback */}
              {sentMode ? (
                <div
                  style={{
                    padding: '24px',
                    background: 'rgba(16,185,129,0.12)',
                    border: '1px solid rgba(16,185,129,0.32)',
                    borderRadius: '16px',
                    color: '#6ee7b7',
                    fontWeight: '600',
                    marginBottom: '32px',
                    lineHeight: 1.6,
                  }}
                >
                  {sentMode === 'bot' ? (
                    <>
                      ✅ Заявка успешно отправлена! Я уже получил уведомление в Telegram и свяжусь с вами в
                      ближайшее время.
                    </>
                  ) : (
                    <>
                      ✅ Текст заявки подготовлен и открыт в Telegram! Если окно не открылось — напишите
                      напрямую{' '}
                      <a
                        href="https://t.me/Moroz_3141592"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#ffffff', textDecoration: 'underline' }}
                      >
                        @Moroz_3141592
                      </a>
                    </>
                  )}
                  <div style={{ marginTop: '14px' }}>
                    <button
                      type="button"
                      onClick={() => setSentMode('')}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(110,231,183,0.35)',
                        background: 'rgba(16,185,129,0.14)',
                        color: '#ecfdf5',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Отправить ещё одну заявку
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '14px',
                    maxWidth: '640px',
                    margin: '0 auto 32px',
                    textAlign: 'left',
                  }}
                >
                  {/* Hidden anti-spam honeypot */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    disabled={sending}
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Telegram или телефон"
                    required
                    disabled={sending}
                    className="form-input"
                    value={formData.contact}
                    onChange={(e) => setFormData((p) => ({ ...p, contact: e.target.value }))}
                  />
                  <input
                    type="text"
                    disabled={sending}
                    placeholder={
                      selectedTopic
                        ? `Выбрано: ${selectedTopic} — добавьте детали (необязательно)`
                        : 'Кратко о задаче или ссылка на текущий сайт'
                    }
                    className="form-input"
                    style={{ gridColumn: '1 / -1' }}
                    value={formData.details}
                    onChange={(e) => setFormData((p) => ({ ...p, details: e.target.value }))}
                  />
                  {errorMsg && (
                    <div
                      style={{
                        gridColumn: '1 / -1',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(239,68,68,0.12)',
                        border: '1px solid rgba(239,68,68,0.35)',
                        color: '#fca5a5',
                        fontSize: '0.84rem',
                      }}
                    >
                      ⚠️ {errorMsg}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary"
                    style={{
                      gridColumn: '1 / -1',
                      padding: '16px',
                      fontSize: '0.98rem',
                      opacity: sending ? 0.72 : 1,
                      cursor: sending ? 'wait' : 'pointer',
                    }}
                  >
                    {sending ? 'Отправляем заявку...' : 'Отправить заявку и получить смету →'}
                  </button>
                </form>
              )}

              {/* Direct contact buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                <a
                  href="https://t.me/Moroz_3141592"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.32)',
                    borderRadius: '11px',
                    color: '#e2e8f0',
                    fontSize: '0.86rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                  }}
                >
                  ✈️ @Moroz_3141592
                </a>
                <a
                  href="https://github.com/Moroz314"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.32)',
                    borderRadius: '11px',
                    color: '#e2e8f0',
                    fontSize: '0.86rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                  }}
                >
                  🐙 GitHub
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('+79046125559', 'phone')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    borderRadius: '11px',
                    color: '#e2e8f0',
                    fontSize: '0.86rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-main)',
                  }}
                >
                  📞 {copied === 'phone' ? 'Скопировано!' : '+7 (904) 612-55-59'}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy('vladmorozov2020@mail.ru', 'email')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    background: 'rgba(212,163,115,0.12)',
                    border: '1px solid rgba(212,163,115,0.32)',
                    borderRadius: '11px',
                    color: '#e2e8f0',
                    fontSize: '0.86rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-main)',
                  }}
                >
                  📧 {copied === 'email' ? 'Скопировано!' : 'vladmorozov2020@mail.ru'}
                </button>
              </div>
            </div>
          </Reveal>

          {/* Footer */}
          <footer
            style={{
              textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              paddingTop: '32px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '800',
                fontSize: '1.12rem',
                color: '#f8fafc',
                marginBottom: '8px',
              }}
            >
              Moroz314 · Владислав Морозов
            </div>
            <p style={{ color: '#64748b', fontSize: '0.84rem', marginBottom: '12px' }}>
              © {new Date().getFullYear()} · Веб-разработка под ключ · Санкт-Петербург / Онлайн
            </p>
            <p style={{ color: '#334155', fontSize: '0.76rem', margin: 0 }}>
              React + Vite · Индивидуальная разработка без шаблонов
            </p>
          </footer>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .certs-grid { grid-template-columns: 1fr !important; }
            .cta-block { padding: 34px 20px !important; }
            .contact-form { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}

/* ─── HOME PAGE ASSEMBLY ─── */
export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);

  const handleSelectProject = (topic) => {
    setSelectedTopic(topic);
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#06070B', minHeight: '100vh', position: 'relative' }}>
      <ScrollProgressBar />
      <Header />
      <main>
        <HeroSection />
        <FlagshipCases onSelectProject={handleSelectProject} onZoom={setLightboxItem} />
        <DemoConcepts />
        <ProcessSection />
        <TariffsSection onSelectTariff={handleSelectProject} />
        <OtherProjects />
        <WhyMe />
        <AchievementsAndFooter
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          onZoom={setLightboxItem}
        />
      </main>
      <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}
