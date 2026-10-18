import React, { useState, useMemo } from 'react';
import DemoBar from '../../components/DemoBar';

/* ─── COLOR TOKENS: SCANDINAVIAN WARM LOFT ─── */
const C = {
  bg:          '#F7F5F0', // Warm light stone/linen background
  bgAlt:       '#EFECE6', // Secondary tinted background
  card:        '#FFFFFF', // Pure crisp card background
  cardHover:   '#FAF9F6', // Subtle warm hover
  border:      '#E5E0D5', // Soft organic border
  borderDark:  '#C9C3B6', // Emphasized border
  text:        '#1C1B18', // Deep graphite charcoal text
  textMuted:   '#6E6A63', // Warm secondary text
  textLight:   '#9C978D', // Light helper text
  terracotta:  '#B86B35', // Noble warm oak / terracotta primary accent
  terracottaDark: '#934F22',
  terracottaLight: '#EAD7C7',
  forest:      '#2C4A3E', // Deep nordic pine green for luxury badges
  forestLight: '#E6EFEA',
  gold:        '#D49B5B', // Warm honey / oak
  white:       '#FFFFFF',
};

const gradTerra = `linear-gradient(135deg, ${C.terracotta}, #C87A45)`;
const shadowCard = '0 12px 36px rgba(28, 27, 24, 0.05), 0 2px 6px rgba(28, 27, 24, 0.03)';
const shadowHover = '0 24px 50px rgba(184, 107, 53, 0.12), 0 4px 12px rgba(28, 27, 24, 0.06)';

/* ─── TAG BADGE ─── */
function Badge({ children, variant = 'terracotta' }) {
  const styles = {
    terracotta: { bg: 'rgba(184, 107, 53, 0.1)', color: C.terracotta, border: 'rgba(184, 107, 53, 0.25)' },
    forest:     { bg: 'rgba(44, 74, 62, 0.08)',  color: C.forest,     border: 'rgba(44, 74, 62, 0.2)' },
    gold:       { bg: 'rgba(212, 155, 91, 0.12)', color: '#A06B26',   border: 'rgba(212, 155, 91, 0.3)' },
    neutral:    { bg: 'rgba(28, 27, 24, 0.05)',   color: C.textMuted,  border: 'rgba(28, 27, 24, 0.12)' },
  }[variant] || {};

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '5px 14px',
      background: styles.bg,
      border: `1px solid ${styles.border}`,
      borderRadius: '100px',
      fontSize: '0.75rem', fontWeight: '700',
      color: styles.color, letterSpacing: '0.04em',
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

/* ─── HEADER ─── */
function NordicHeader({ onOpenQuiz }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Калькулятор / Квиз', id: 'quiz' },
    { label: 'Каталог работ', id: 'catalog' },
    { label: 'О производстве', id: 'production' },
    { label: 'Отзывы', id: 'reviews' },
    { label: 'Шоурум и Контакты', id: 'contacts' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = id.toLowerCase();
    const el = document.getElementById(targetId) ||
               document.getElementById(id) ||
               (targetId === 'quiz' || targetId === 'квиз' ? document.getElementById('quiz') : null) ||
               (targetId === 'catalog' || targetId === 'каталог' ? document.getElementById('catalog') : null) ||
               (targetId === 'production' || targetId === 'производство' ? document.getElementById('production') : null) ||
               (targetId === 'contacts' || targetId === 'контакты' ? document.getElementById('contacts') : null);
    if (el) {
      const headerHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - headerHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 500,
      background: 'rgba(247, 245, 240, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '76px', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flexShrink: 0 }}
          >
            <div style={{
              width: '42px', height: '42px',
              background: gradTerra,
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', fontSize: '1.2rem', fontWeight: '900',
              fontFamily: "'Outfit', sans-serif",
              boxShadow: '0 4px 14px rgba(184, 107, 53, 0.35)',
            }}>
              NL
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.2rem', color: C.text, letterSpacing: '0.08em', lineHeight: 1 }}>
                NORDIC LOFT
              </div>
              <div style={{ fontSize: '0.65rem', color: C.textMuted, fontWeight: '600', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '3px' }}>
                Мастерская авторской мебели • СПб
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '4px' }} className="nordic-nav">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => handleNavClick(e, item.id)}
                style={{
                  padding: '8px 14px',
                  color: C.textMuted,
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = C.terracotta; e.currentTarget.style.background = 'rgba(184, 107, 53, 0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.background = 'transparent'; }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contacts & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <div style={{ textAlign: 'right' }} className="nordic-contacts">
              <a href="tel:+78123854020" style={{ color: C.text, fontWeight: '700', fontSize: '0.92rem', textDecoration: 'none', display: 'block' }}>
                +7 (812) 385-40-20
              </a>
              <span style={{ fontSize: '0.72rem', color: C.textMuted }}>Красногвардейская пл., 3E</span>
            </div>

            <button
              onClick={onOpenQuiz}
              style={{
                padding: '11px 22px',
                background: gradTerra,
                border: 'none',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(184, 107, 53, 0.3)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(184, 107, 53, 0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(184, 107, 53, 0.3)'; }}
            >
              Рассчитать проект (-10%)
            </button>

            {/* Mobile Hamburger */}
            <button
              className="nordic-burger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                background: 'rgba(28, 27, 24, 0.06)',
                border: `1px solid ${C.border}`,
                borderRadius: '8px',
                color: C.text,
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                lineHeight: 1,
              }}
              aria-label="Меню"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div style={{
            padding: '14px 0 20px',
            borderTop: `1px solid ${C.border}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => handleNavClick(e, item.id)}
                style={{
                  padding: '12px 16px',
                  color: C.text,
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  background: 'rgba(28, 27, 24, 0.03)',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .nordic-nav { display: none !important; }
          .nordic-contacts { display: none !important; }
          .nordic-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
}

/* ─── HERO SECTION ─── */
function HeroSection({ onOpenQuiz, onScrollCatalog }) {
  return (
    <section style={{
      padding: '80px 24px 100px',
      background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgAlt} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative grain / subtle pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'radial-gradient(#1C1B18 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '56px',
          alignItems: 'center',
        }} className="nordic-hero-grid">
          
          {/* Left Column */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              <Badge variant="terracotta">🪵 Собственное производство в СПб</Badge>
              <Badge variant="forest">🌿 Слэбы карагача и дуб 8% влажности</Badge>
            </div>

            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: '900',
              color: C.text,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}>
              Создаем столы из массива, кухни и мебель в стиле{' '}
              <span style={{
                background: gradTerra,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Loft</span>{' '}
              по вашим размерам за 14 дней
            </h1>

            <p style={{
              color: C.textMuted,
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: 1.75,
              marginBottom: '36px',
              maxWidth: '580px',
            }}>
              Кавказский горный дуб, карагач с эпоксидной смолой и металлокаркас с порошковой покраской.
              Бесплатный 3D-проект под интерьер вашей квартиры или бизнеса до заключения договора.
            </p>

            {/* Badges / Guarantees Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
              marginBottom: '40px',
            }} className="nordic-features-2col">
              {[
                { icon: '📐', title: '3D-проект бесплатно', desc: 'Визуализация в вашем интерьере за 24 часа' },
                { icon: '🏭', title: 'Свой цех 850 м²', desc: 'Без посредников и салонных наценок' },
                { icon: '📦', title: 'Доставка по РФ', desc: 'В жесткой упаковке со сборкой на месте' },
                { icon: '🛡️', title: 'Гарантия 5 лет', desc: 'Официальный договор и паспорт изделия' },
              ].map(f => (
                <div key={f.title} style={{
                  display: 'flex', gap: '12px', alignItems: 'flex-start',
                  background: 'rgba(255, 255, 255, 0.7)',
                  border: `1px solid ${C.border}`,
                  borderRadius: '14px', padding: '14px 16px',
                  backdropFilter: 'blur(8px)',
                }}>
                  <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem', color: C.text }}>{f.title}</div>
                    <div style={{ color: C.textMuted, fontSize: '0.78rem', marginTop: '2px' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={onOpenQuiz}
                style={{
                  padding: '16px 36px',
                  background: gradTerra,
                  border: 'none',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(184, 107, 53, 0.35)',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(184, 107, 53, 0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(184, 107, 53, 0.35)'; }}
              >
                Пройти тест и получить расчет (-10%) →
              </button>

              <button
                onClick={onScrollCatalog}
                style={{
                  padding: '16px 28px',
                  background: '#FFFFFF',
                  border: `1px solid ${C.borderDark}`,
                  borderRadius: '12px',
                  color: C.text,
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.terracotta; e.currentTarget.style.color = C.terracotta; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderDark; e.currentTarget.style.color = C.text; }}
              >
                Смотреть каталог изделий ↓
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '14px',
              boxShadow: '0 24px 60px rgba(28, 27, 24, 0.1)',
              border: `1px solid ${C.border}`,
              position: 'relative',
            }}>
              <div style={{ borderRadius: '18px', overflow: 'hidden', height: 'clamp(260px, 55vw, 480px)', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1200&q=80"
                  alt="Обеденный стол из массива дуба и металла Nordic Loft"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(28, 27, 24, 0.7) 100%)',
                }} />

                {/* Overlaid caption */}
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', color: '#FFFFFF' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C7' }}>
                    Флагманская работа мастерской
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '800', fontSize: '1.25rem' }}>
                    Стол «Koster River» из слэба карагача с эпоксидной смолой
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="nordic-floating-badge-top" style={{
                position: 'absolute', top: '-18px', right: '-18px',
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 12px 30px rgba(28, 27, 24, 0.12)',
                border: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ fontSize: '1.8rem' }}>⭐</div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1.1rem', color: C.text }}>4.9 из 5.0</div>
                  <div style={{ fontSize: '0.75rem', color: C.textMuted }}>210+ отзывов на Яндекс</div>
                </div>
              </div>

              {/* Floating metrics badge */}
              <div className="nordic-floating-badge-bottom" style={{
                position: 'absolute', bottom: '-20px', left: '30px',
                background: C.text,
                borderRadius: '14px',
                padding: '12px 20px',
                color: '#FFFFFF',
                display: 'flex', gap: '20px', alignItems: 'center',
                boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              }}>
                <div>
                  <div style={{ fontWeight: '900', fontSize: '1.1rem', color: C.gold }}>14 дней</div>
                  <div style={{ fontSize: '0.72rem', color: '#A09C94' }}>срок работы</div>
                </div>
                <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />
                <div>
                  <div style={{ fontWeight: '900', fontSize: '1.1rem', color: C.gold }}>1 850+</div>
                  <div style={{ fontSize: '0.72rem', color: '#A09C94' }}>столов создано</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .nordic-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 640px) {
          .nordic-floating-badge-top {
            top: 10px !important;
            right: 10px !important;
            padding: 8px 12px !important;
          }
          .nordic-floating-badge-bottom {
            position: static !important;
            margin-top: 14px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            justify-content: space-around !important;
            padding: 10px 14px !important;
          }
        }
        @media (max-width: 580px) {
          .nordic-features-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── QUIZ DATA & LOGIC ─── */
const QUIZ_ITEMS = [
  {
    id: 'table',
    title: 'Обеденный или рабочий стол',
    desc: 'Слэбы, цельный массив дуба или ясеня, прямой или живой край',
    img: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&q=80',
    basePrice: 38000,
  },
  {
    id: 'kitchen',
    title: 'Кухня или барная стойка',
    desc: 'Массив, шпон, монолитные острова и барные зоны в стиле Loft',
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80',
    basePrice: 65000,
  },
  {
    id: 'shelf',
    title: 'Стеллаж или гардеробная',
    desc: 'Стальной цельносварной профиль и полки из натурального дерева',
    img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80',
    basePrice: 32000,
  },
  {
    id: 'business',
    title: 'Меблировка бизнеса и кафе',
    desc: 'Рестораны, бары, коворкинги и офисы под ключ по брендбуку',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    basePrice: 95000,
  },
];

const QUIZ_MATERIALS = [
  {
    id: 'karagach_epoxy',
    title: 'Массив карагача с эпоксидной смолой',
    desc: 'Эффект горной реки, живой край Live Edge, толщина 45–55 мм',
    badge: 'Хит продаж',
    multiplier: 1.45,
    img: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?w=600&q=80',
  },
  {
    id: 'oak',
    title: 'Цельноламельный кавказский дуб',
    desc: 'Сорт Extra, глубокая текстура, максимальная плотность и твердость',
    badge: 'Премиум классика',
    multiplier: 1.25,
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
  },
  {
    id: 'ash',
    title: 'Благородный горный ясень',
    desc: 'Шелковистая поверхность, выразительный узор волокон, стойкость к ударам',
    badge: 'Сканди стиль',
    multiplier: 1.15,
    img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80',
  },
  {
    id: 'egger_mix',
    title: 'ЛДСП Egger премиум + массив',
    desc: 'Австрийские эко-плиты с кромкой PUR и вставками из массива',
    badge: 'Практичный выбор',
    multiplier: 0.90,
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
  },
];

const QUIZ_BASES = [
  { id: 'spider',   label: 'Паук Spider',    price: 9000, icon: '🕷️', desc: 'Брутальный металлический акцент' },
  { id: 'trapeze',  label: 'Лофт Трапеция',  price: 6000, icon: '📐', desc: 'Устойчивая классическая геометрия' },
  { id: 'x_shape',  label: 'X-образное',     price: 7500, icon: '⚔️', desc: 'Скрещенные балки 80×40 мм' },
  { id: 'u_shape',  label: 'П-образные ноги', price: 5500, icon: '🪜', desc: 'Скандинавский лаконичный стиль' },
];

/* ─── QUIZ COMPONENT ─── */
function QuizSection() {
  const [step, setStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(QUIZ_ITEMS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(QUIZ_MATERIALS[0]);
  const [length, setLength] = useState(180);
  const [width, setWidth] = useState(90);
  const [selectedBase, setSelectedBase] = useState(QUIZ_BASES[0]);
  const [messenger, setMessenger] = useState('Telegram');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Dynamic price calculation
  const calculatedPrice = useMemo(() => {
    const base = selectedItem.basePrice;
    const matCoeff = selectedMaterial.multiplier;
    const sizeCoeff = (length / 180) * (width / 90);
    const baseAdd = selectedItem.id === 'table' ? selectedBase.price : 0;
    const rawTotal = Math.round((base * matCoeff * sizeCoeff + baseAdd) / 500) * 500;
    const discounted = Math.round(rawTotal * 0.9 / 100) * 100;
    return { rawTotal, discounted, savings: rawTotal - discounted };
  }, [selectedItem, selectedMaterial, length, width, selectedBase]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactPhone.trim()) return;
    setIsCompleted(true);
  };

  const resetQuiz = () => {
    setIsCompleted(false);
    setStep(1);
    setContactName('');
    setContactPhone('');
  };

  return (
    <section id="quiz" style={{
      padding: '100px 24px',
      background: C.card,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      position: 'relative',
    }}>
      <div id="калькулятор" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <div id="квиз" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Badge variant="terracotta">⚡ Интерактивный калькулятор за 1 минуту</Badge>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '900',
            color: C.text,
            marginTop: '16px',
            marginBottom: '14px',
            lineHeight: 1.15,
          }}>
            Пройдите тест из 4 шагов и получите точный расчет стоимости изделия
          </h2>
          <p style={{ color: C.textMuted, fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            После теста вы получите <strong>3D-эскиз в масштабе вашей комнаты</strong> и зафиксируете{' '}
            <strong style={{ color: C.terracotta }}>персональную скидку 10%</strong>
          </p>
        </div>

        {/* Quiz Wrapper */}
        <div style={{
          background: C.bgAlt,
          border: `1px solid ${C.border}`,
          borderRadius: '24px',
          padding: '36px',
          boxShadow: shadowCard,
        }} className="nordic-quiz-box">

          {!isCompleted ? (
            <>
              {/* Progress Bar */}
              <div style={{ marginBottom: '36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: C.terracotta, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Шаг {step} из 4: {
                      step === 1 ? 'Тип изделия' :
                      step === 2 ? 'Материал и фактура' :
                      step === 3 ? 'Габариты и подстолье' : 'Контакты для 3D-проекта'
                    }
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: '800', color: C.text }}>
                    {step * 25}% завершено
                  </span>
                </div>

                <div style={{ width: '100%', height: '8px', background: '#DDD7CB', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${step * 25}%`,
                    height: '100%',
                    background: gradTerra,
                    borderRadius: '100px',
                    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }} />
                </div>
              </div>

              {/* STEP 1: ITEM TYPE */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.35rem', fontWeight: '800', color: C.text, marginBottom: '20px' }}>
                    1. Что именно нужно изготовить?
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="nordic-quiz-grid2">
                    {QUIZ_ITEMS.map(item => {
                      const isSel = selectedItem.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          style={{
                            background: C.card,
                            border: `2px solid ${isSel ? C.terracotta : C.border}`,
                            borderRadius: '18px',
                            padding: '16px',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center',
                            transition: 'all 0.2s ease',
                            boxShadow: isSel ? '0 8px 24px rgba(184, 107, 53, 0.15)' : 'none',
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <div style={{ fontWeight: '800', fontSize: '1rem', color: isSel ? C.terracotta : C.text }}>
                                {item.title}
                              </div>
                              <div style={{
                                width: '22px', height: '22px', borderRadius: '50%',
                                border: `2px solid ${isSel ? C.terracotta : C.borderDark}`,
                                background: isSel ? C.terracotta : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontSize: '0.75rem', flexShrink: 0,
                              }}>
                                {isSel && '✓'}
                              </div>
                            </div>
                            <div style={{ color: C.textMuted, fontSize: '0.8rem', lineHeight: 1.4 }}>
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: MATERIAL */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.35rem', fontWeight: '800', color: C.text, marginBottom: '20px' }}>
                    2. Выберите материал столешницы или фасадов:
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="nordic-quiz-grid2">
                    {QUIZ_MATERIALS.map(mat => {
                      const isSel = selectedMaterial.id === mat.id;
                      return (
                        <div
                          key={mat.id}
                          onClick={() => setSelectedMaterial(mat)}
                          style={{
                            background: C.card,
                            border: `2px solid ${isSel ? C.terracotta : C.border}`,
                            borderRadius: '18px',
                            padding: '16px',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center',
                            transition: 'all 0.2s ease',
                            boxShadow: isSel ? '0 8px 24px rgba(184, 107, 53, 0.15)' : 'none',
                          }}
                        >
                          <img
                            src={mat.img}
                            alt={mat.title}
                            style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: C.terracotta, background: 'rgba(184,107,53,0.1)', padding: '2px 8px', borderRadius: '100px' }}>
                                {mat.badge}
                              </span>
                              <div style={{
                                width: '20px', height: '20px', borderRadius: '50%',
                                border: `2px solid ${isSel ? C.terracotta : C.borderDark}`,
                                background: isSel ? C.terracotta : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontSize: '0.7rem', marginLeft: 'auto', flexShrink: 0,
                              }}>
                                {isSel && '✓'}
                              </div>
                            </div>
                            <div style={{ fontWeight: '800', fontSize: '0.95rem', color: isSel ? C.terracotta : C.text, marginBottom: '4px' }}>
                              {mat.title}
                            </div>
                            <div style={{ color: C.textMuted, fontSize: '0.78rem', lineHeight: 1.4 }}>
                              {mat.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: DIMENSIONS & BASE */}
              {step === 3 && (
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.35rem', fontWeight: '800', color: C.text, marginBottom: '20px' }}>
                    3. Укажите примерные габариты и подстолье:
                  </h3>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr',
                    gap: '28px',
                    alignItems: 'start',
                  }} className="nordic-quiz-step3">
                    
                    {/* Sliders Box */}
                    <div style={{ background: C.card, borderRadius: '18px', padding: '24px', border: `1px solid ${C.border}` }}>
                      {/* Length */}
                      <div style={{ marginBottom: '28px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.95rem', color: C.text }}>Длина изделия:</span>
                          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.3rem', color: C.terracotta }}>
                            {length} см
                          </span>
                        </div>
                        <input
                          type="range"
                          min="100" max="300" step="10"
                          value={length}
                          onChange={e => setLength(Number(e.target.value))}
                          style={{
                            width: '100%', accentColor: C.terracotta, cursor: 'pointer', height: '6px',
                          }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: C.textLight, marginTop: '6px' }}>
                          <span>100 см (Компакт)</span>
                          <span>180 см (Стандарт)</span>
                          <span>300 см (Большой)</span>
                        </div>
                      </div>

                      {/* Width */}
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.95rem', color: C.text }}>Ширина / глубина:</span>
                          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.3rem', color: C.terracotta }}>
                            {width} см
                          </span>
                        </div>
                        <input
                          type="range"
                          min="60" max="120" step="5"
                          value={width}
                          onChange={e => setWidth(Number(e.target.value))}
                          style={{
                            width: '100%', accentColor: C.terracotta, cursor: 'pointer', height: '6px',
                          }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: C.textLight, marginTop: '6px' }}>
                          <span>60 см</span>
                          <span>90 см (Оптимум)</span>
                          <span>120 см (Широкий)</span>
                        </div>
                      </div>

                      {/* Sub-choice: Base type */}
                      {selectedItem.id === 'table' && (
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '0.9rem', color: C.text, marginBottom: '10px' }}>
                            Форма металлического подстолья:
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                            {QUIZ_BASES.map(b => (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => setSelectedBase(b)}
                                style={{
                                  padding: '10px 12px',
                                  background: selectedBase.id === b.id ? 'rgba(184, 107, 53, 0.1)' : '#F5F3ED',
                                  border: `1.5px solid ${selectedBase.id === b.id ? C.terracotta : C.border}`,
                                  borderRadius: '10px',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  display: 'flex', alignItems: 'center', gap: '8px',
                                  transition: 'all 0.15s',
                                }}
                              >
                                <span>{b.icon}</span>
                                <div>
                                  <div style={{ fontWeight: '700', fontSize: '0.8rem', color: C.text }}>{b.label}</div>
                                  <div style={{ fontSize: '0.7rem', color: C.textMuted }}>+{b.price.toLocaleString('ru-RU')} ₽</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Live Price Estimation Card */}
                    <div style={{
                      background: C.card,
                      borderRadius: '18px',
                      padding: '24px',
                      border: `2px solid ${C.terracotta}`,
                      boxShadow: '0 12px 30px rgba(184, 107, 53, 0.12)',
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.terracotta, marginBottom: '8px' }}>
                        ⚡ Мгновенный перерасчет цены
                      </div>
                      <div style={{ color: C.textMuted, fontSize: '0.82rem', marginBottom: '16px' }}>
                        Ориентировочная стоимость с учетом выбранных параметров:
                      </div>

                      <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: '0.85rem', color: C.textLight, textDecoration: 'line-through' }}>
                          {calculatedPrice.rawTotal.toLocaleString('ru-RU')} ₽
                        </div>
                        <div style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: '900',
                          fontSize: '2.2rem',
                          color: C.terracotta,
                          lineHeight: 1,
                          marginTop: '4px',
                        }}>
                          {calculatedPrice.discounted.toLocaleString('ru-RU')} ₽
                        </div>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          background: 'rgba(44, 74, 62, 0.1)',
                          border: '1px solid rgba(44, 74, 62, 0.25)',
                          borderRadius: '100px',
                          padding: '4px 10px',
                          color: C.forest,
                          fontWeight: '700',
                          fontSize: '0.75rem',
                          marginTop: '10px',
                        }}>
                          🎁 Ваша экономия: {calculatedPrice.savings.toLocaleString('ru-RU')} ₽ (-10%)
                        </div>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: C.textMuted, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div>✓ Покрытие бельгийским эко-маслом Rubio</div>
                        <div>✓ Бесплатный 3D-эскиз по вашим размерам</div>
                        <div>✓ Договор с фиксацией цены и сроков</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT & 3D DELIVERY */}
              {step === 4 && (
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.35rem', fontWeight: '800', color: C.text, marginBottom: '10px' }}>
                    4. Куда прислать расчет и 3D-макет?
                  </h3>
                  <p style={{ color: C.textMuted, fontSize: '0.9rem', marginBottom: '24px' }}>
                    Пришлем точный PDF-расчет со сметой материалов и 3D-модель вашего изделия в течение 20 минут.
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Messenger selector */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: C.text, marginBottom: '8px' }}>
                        Удобный способ связи:
                      </label>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {['Telegram', 'WhatsApp'].map(m => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMessenger(m)}
                            style={{
                              flex: 1, padding: '12px',
                              background: messenger === m ? C.text : C.card,
                              color: messenger === m ? '#fff' : C.text,
                              border: `1.5px solid ${messenger === m ? C.text : C.border}`,
                              borderRadius: '12px',
                              fontWeight: '700', fontSize: '0.9rem',
                              cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                              transition: 'all 0.2s',
                            }}
                          >
                            <span>{m === 'Telegram' ? '✈️' : '💬'}</span>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }} className="nordic-quiz-inputs">
                      <div>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: C.text, marginBottom: '6px' }}>
                          Ваше имя:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Иван"
                          value={contactName}
                          onChange={e => setContactName(e.target.value)}
                          style={{
                            width: '100%', padding: '14px 16px',
                            background: C.card, border: `1px solid ${C.border}`,
                            borderRadius: '12px', fontSize: '0.95rem', color: C.text,
                            outline: 'none', boxSizing: 'border-box',
                            fontFamily: "'Inter', sans-serif",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: C.text, marginBottom: '6px' }}>
                          Телефон (с {messenger}):
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (999) 000-00-00"
                          value={contactPhone}
                          onChange={e => setContactPhone(e.target.value)}
                          style={{
                            width: '100%', padding: '14px 16px',
                            background: C.card, border: `1px solid ${C.border}`,
                            borderRadius: '12px', fontSize: '0.95rem', color: C.text,
                            outline: 'none', boxSizing: 'border-box',
                            fontFamily: "'Inter', sans-serif",
                          }}
                        />
                      </div>
                    </div>

                    {/* Summary badge */}
                    <div style={{
                      background: C.card, border: `1px solid ${C.border}`,
                      borderRadius: '14px', padding: '16px 20px', marginBottom: '24px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
                    }}>
                      <div>
                        <div style={{ fontSize: '0.78rem', color: C.textLight, textTransform: 'uppercase', fontWeight: '700' }}>Ваш выбор:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem', color: C.text, marginTop: '2px' }}>
                          {selectedItem.title} • {selectedMaterial.title} ({length}×{width} см)
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.78rem', color: C.forest, fontWeight: '700' }}>Скидка 10% учтена</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.4rem', color: C.terracotta }}>
                          {calculatedPrice.discounted.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%', padding: '16px',
                        background: gradTerra,
                        border: 'none', borderRadius: '12px',
                        color: '#FFFFFF', fontWeight: '800', fontSize: '1.05rem',
                        cursor: 'pointer',
                        boxShadow: '0 8px 28px rgba(184, 107, 53, 0.4)',
                        transition: 'all 0.2s',
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                    >
                      Получить точный расчет и 3D-эскиз в {messenger} →
                    </button>
                  </form>
                </div>
              )}

              {/* Navigation buttons: Prev / Next */}
              <div style={{
                marginTop: '32px', paddingTop: '24px',
                borderTop: `1px solid ${C.border}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    style={{
                      padding: '10px 20px',
                      background: 'none', border: `1px solid ${C.borderDark}`,
                      borderRadius: '10px', color: C.text,
                      fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    ← Назад
                  </button>
                ) : <div />}

                {step < 4 && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    style={{
                      padding: '12px 28px',
                      background: C.text,
                      border: 'none', borderRadius: '10px',
                      color: '#FFFFFF', fontWeight: '700', fontSize: '0.92rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(28, 27, 24, 0.2)',
                      transition: 'all 0.15s',
                    }}
                  >
                    Далее: {step === 1 ? 'Материал' : step === 2 ? 'Размеры' : 'Контакты'} →
                  </button>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS STATE */
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'rgba(44, 74, 62, 0.12)', border: '2px solid rgba(44, 74, 62, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.2rem', margin: '0 auto 20px',
              }}>
                🎉
              </div>

              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2rem', fontWeight: '900', color: C.text, marginBottom: '10px' }}>
                Заявка #{Math.floor(1000 + Math.random() * 9000)} успешно принята!
              </h3>
              <p style={{ color: C.textMuted, fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto 28px', lineHeight: 1.6 }}>
                Спасибо, <strong>{contactName || 'клиент'}</strong>! Мастер цеха Nordic Loft уже приступил к расчёту спецификации и 3D-эскиза.
                Мы напишем вам в <strong>{messenger}</strong> на номер <strong>{contactPhone}</strong> в течение 15 минут.
              </p>

              {/* Order Summary Card */}
              <div style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: '20px',
                padding: '24px',
                maxWidth: '560px',
                margin: '0 auto 28px',
                textAlign: 'left',
              }}>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: C.text, marginBottom: '14px', borderBottom: `1px solid ${C.border}`, paddingBottom: '10px' }}>
                  📋 Сводка вашего проекта:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ color: C.textMuted }}>Изделие:</div>
                  <div style={{ fontWeight: '700', color: C.text }}>{selectedItem.title}</div>

                  <div style={{ color: C.textMuted }}>Материал:</div>
                  <div style={{ fontWeight: '700', color: C.text }}>{selectedMaterial.title}</div>

                  <div style={{ color: C.textMuted }}>Габариты:</div>
                  <div style={{ fontWeight: '700', color: C.text }}>{length} × {width} см</div>

                  {selectedItem.id === 'table' && (
                    <>
                      <div style={{ color: C.textMuted }}>Подстолье:</div>
                      <div style={{ fontWeight: '700', color: C.text }}>{selectedBase.label}</div>
                    </>
                  )}

                  <div style={{ color: C.textMuted }}>Итого со скидкой:</div>
                  <div style={{ fontWeight: '900', color: C.terracotta, fontSize: '1.1rem' }}>
                    {calculatedPrice.discounted.toLocaleString('ru-RU')} ₽
                  </div>
                </div>

                <div style={{
                  marginTop: '16px', paddingTop: '12px', borderTop: `1px solid ${C.border}`,
                  fontSize: '0.78rem', color: C.forest, fontWeight: '700',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  🔒 Скидка 10% и бесплатный 3D-проект зафиксированы за вашим номером на 48 часов
                </div>
              </div>

              <button
                onClick={resetQuiz}
                style={{
                  padding: '12px 28px',
                  background: 'none', border: `1.5px solid ${C.borderDark}`,
                  borderRadius: '10px', color: C.text, fontWeight: '700', fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                ← Рассчитать другое изделие
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nordic-quiz-box { padding: 20px 14px !important; }
          .nordic-quiz-grid2 { grid-template-columns: 1fr !important; }
          .nordic-quiz-step3 { grid-template-columns: 1fr !important; }
          .nordic-quiz-inputs { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── CATALOG PRODUCTS & QUICK VIEW ─── */
const WOOD_COLORS = [
  { id: 'natural', name: 'Натуральный дуб', hex: '#D49B5B' },
  { id: 'walnut',  name: 'Тёмный орех',     hex: '#5D3A1A' },
  { id: 'charcoal', name: 'Угольный графит', hex: '#242220' },
];

const PRODUCTS = [
  {
    id: 1,
    title: 'Стол из карагача «Koster River»',
    category: 'Столы из слэбов',
    dimensions: '200 × 95 × 75 см',
    material: 'Цельный слэб карагача, дымчатая эпоксидная смола, масло Rubio Monocoat',
    price: 79000,
    oldPrice: 88000,
    time: '12–14 дней',
    img: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&q=80',
    description: 'Флагманский обеденный стол с глубоким прозрачным руслом из эпоксидной смолы. Живой край слэба Live Edge сохраняет естественную кору и геометрию дерева.',
    specs: ['Толщина столешницы: 48 мм', 'Подстолье: Spider из стали 80×40 мм', 'Влажность древесины: 8% (сушильная камера)', 'Покрытие: 2 слоя масла Rubio (Бельгия)'],
  },
  {
    id: 2,
    title: 'Рабочая станция «Oslo Workstation»',
    category: 'Рабочие станции',
    dimensions: '160 × 80 × 75 см',
    material: 'Цельноламельный кавказский дуб сорт Extra, скрытый кабель-канал',
    price: 46000,
    oldPrice: 52000,
    time: '10 дней',
    img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    description: 'Эргономичный рабочий стол для IT-специалистов, дизайнеров и руководителей. Встроенная ниша для скрытой проводки проводов и розеточный блок.',
    specs: ['Толщина столешницы: 40 мм', 'Подстолье: П-образное усиленное', 'Нагрузка: до 250 кг', 'Скругление кромок: R3'],
  },
  {
    id: 3,
    title: 'Лофт-стеллаж «Bergen Tower»',
    category: 'Стеллажи',
    dimensions: '190 × 100 × 35 см',
    material: 'Стальной цельносварной профиль 40×20, массив ясеня 28 мм',
    price: 38000,
    oldPrice: 43000,
    time: '7–10 дней',
    img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80',
    description: 'Вместительный открытый стеллаж для книг, декора и зонирования пространства студий. Каждая полка способна нести до 60 кг распределенного веса.',
    specs: ['Количество полок: 5 штук', 'Покраска: матовый муар RAL 9005', 'Регулируемые ножки для неровных полов', 'Крепление к стене в комплекте'],
  },
  {
    id: 4,
    title: 'Круглый обеденный стол «Malmo Round»',
    category: 'Столы из слэбов',
    dimensions: 'Диаметр 120 см, высота 75 см',
    material: 'Радиальный спил дуба с выразительными годовыми кольцами',
    price: 54000,
    oldPrice: 61000,
    time: '12 дней',
    img: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80',
    description: 'Уютный круглый стол на 4–6 персон. За счет центральной опоры удобно рассаживать гостей без помех для ног.',
    specs: ['Диаметр: 120 см (для 4-6 персон)', 'Толщина: 42 мм', 'Опора: конусная пирамида из металла', 'Влагостойкая пропитка от горячего и пятен'],
  },
  {
    id: 5,
    title: 'Барная стойка «Aarhus Bistro»',
    category: 'Для ресторанов',
    dimensions: '240 × 60 × 105 см',
    material: 'Массив ясеня с глубоким брашированием, латунный упор для ног',
    price: 68000,
    oldPrice: 76000,
    time: '14 дней',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    description: 'Коммерческая барная стойка для баров, кофеен и загородных кухонь. Повышенная износостойкость к истиранию и спиртосодержащим жидкостям.',
    specs: ['Высота столешницы: 105 см (под барные стулья)', 'Покрытие: 3 слоя полиуретанового лака Renner', 'Встроенный латунный рейл для ног', 'Сертификат пожаробезопасности КМ2'],
  },
  {
    id: 6,
    title: 'Комплект столов для кафе «Copenhagen Set»',
    category: 'Для ресторанов',
    dimensions: '80 × 80 × 75 см (партия от 4 шт.)',
    material: 'Срощенный кавказский дуб сорт A/B, чугунное тяжелое подножие',
    price: 82000,
    oldPrice: 92000,
    time: '10–12 дней',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    description: 'Комплект из 4 столов для ресторанов и кофеен. Чугунная опора весом 16 кг исключает раскачивание даже при активной посадке.',
    specs: ['Размер: 80×80 см (на 2–4 персоны)', 'Материал: дуб 36 мм с фаской', 'Чугунное основание: вес 16 кг', 'Возможен брендинг гравировкой логотипа'],
  },
];

/* ─── QUICK VIEW MODAL ─── */
function QuickViewModal({ product, selectedColor, onSelectColor, onClose, onBookProduct }) {
  const [formSent, setFormSent] = useState(false);
  const [phone, setPhone] = useState('');

  const handleOrder = (e) => {
    e.preventDefault();
    if (!phone) return;
    setFormSent(true);
    setTimeout(() => {
      onBookProduct(product, selectedColor, phone);
      onClose();
    }, 1800);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(28, 27, 24, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.card,
          borderRadius: '24px',
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          border: `1px solid ${C.border}`,
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '18px', right: '18px', zIndex: 10,
            background: 'rgba(28, 27, 24, 0.08)',
            border: 'none', borderRadius: '50%',
            width: '36px', height: '36px',
            cursor: 'pointer', fontSize: '1rem',
            color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '36px',
        }} className="nordic-modal-grid">
          
          {/* Left: Image */}
          <div>
            <div style={{ borderRadius: '18px', overflow: 'hidden', height: '340px', marginBottom: '16px' }}>
              <img
                src={product.img}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Specs box */}
            <div style={{ background: C.bgAlt, borderRadius: '14px', padding: '16px', border: `1px solid ${C.border}` }}>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: C.text, marginBottom: '8px' }}>
                Характеристики изделия:
              </div>
              <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.8rem', color: C.textMuted, lineHeight: 1.6 }}>
                {product.specs.map((sp, i) => <li key={i}>{sp}</li>)}
              </ul>
            </div>
          </div>

          {/* Right: Info & Action */}
          <div>
            <Badge variant="terracotta">{product.category}</Badge>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: '900', color: C.text, marginTop: '10px', marginBottom: '8px' }}>
              {product.title}
            </h3>

            <div style={{ fontSize: '0.85rem', color: C.textMuted, marginBottom: '16px' }}>
              📏 Размеры: <strong>{product.dimensions}</strong> &nbsp;•&nbsp; ⏱ Срок: <strong>{product.time}</strong>
            </div>

            <p style={{ color: C.textMuted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Color Swatches */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: C.text, marginBottom: '8px' }}>
                Цвет масла: <span style={{ color: C.terracotta }}>{selectedColor.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {WOOD_COLORS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => onSelectColor(c)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '6px 14px',
                      background: selectedColor.id === c.id ? 'rgba(184, 107, 53, 0.1)' : '#F5F3ED',
                      border: `1.5px solid ${selectedColor.id === c.id ? C.terracotta : C.border}`,
                      borderRadius: '100px', cursor: 'pointer',
                    }}
                  >
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: c.hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: C.text }}>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Row */}
            <div style={{
              background: C.bgAlt, borderRadius: '16px', padding: '16px 20px', marginBottom: '24px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: C.textLight, textDecoration: 'line-through' }}>
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.8rem', color: C.terracotta, lineHeight: 1 }}>
                  {product.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: C.forest, background: C.forestLight, padding: '4px 10px', borderRadius: '100px' }}>
                В наличии / под заказ
              </div>
            </div>

            {/* Order Form */}
            {formSent ? (
              <div style={{
                padding: '20px', background: C.forestLight, border: `1px solid rgba(44, 74, 62, 0.3)`,
                borderRadius: '12px', textAlign: 'center', color: C.forest, fontWeight: '700', fontSize: '0.95rem',
              }}>
                ✅ Заявка на {product.title} принята! Скоро свяжемся.
              </div>
            ) : (
              <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__ ваш телефон"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    padding: '13px 16px', background: C.card,
                    border: `1.5px solid ${C.border}`, borderRadius: '10px',
                    fontSize: '0.92rem', color: C.text, outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '14px', background: gradTerra,
                    border: 'none', borderRadius: '10px',
                    color: '#fff', fontWeight: '700', fontSize: '0.95rem',
                    cursor: 'pointer', boxShadow: '0 6px 20px rgba(184, 107, 53, 0.35)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Заказать изготовление со скидкой →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nordic-modal-grid { grid-template-columns: 1fr !important; padding: 24px 18px !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── CATALOG SECTION ─── */
function CatalogSection({ onSelectProductForModal }) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [cardColors, setCardColors] = useState({});

  const categories = ['Все', 'Столы из слэбов', 'Рабочие станции', 'Стеллажи', 'Для ресторанов'];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Все') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleColorChange = (prodId, color) => {
    setCardColors(prev => ({ ...prev, [prodId]: color }));
  };

  return (
    <section id="catalog" style={{
      padding: '100px 24px',
      background: C.bg,
      position: 'relative',
    }}>
      <div id="каталог" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <div id="работы" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Badge variant="terracotta">🪑 Живой каталог готовых изделий</Badge>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '900',
            color: C.text,
            marginTop: '16px',
            marginBottom: '12px',
          }}>
            Авторская мебель ручной работы
          </h2>
          <p style={{ color: C.textMuted, fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Любую модель адаптируем под ваши точные размеры, выберем нужный слэб в шоуруме
            и подберем цвет металлического подстолья.
          </p>
        </div>

        {/* Filter Categories */}
        <div style={{
          display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 20px',
                background: activeCategory === cat ? C.text : C.card,
                color: activeCategory === cat ? '#FFFFFF' : C.textMuted,
                border: `1.5px solid ${activeCategory === cat ? C.text : C.border}`,
                borderRadius: '100px',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat ? '0 4px 14px rgba(28,27,24,0.15)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid (6 cards) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="nordic-catalog-grid">
          {filteredProducts.map(prod => {
            const currentColor = cardColors[prod.id] || WOOD_COLORS[0];

            return (
              <div
                key={prod.id}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: shadowCard,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = shadowHover;
                  e.currentTarget.style.borderColor = C.borderDark;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = shadowCard;
                  e.currentTarget.style.borderColor = C.border;
                }}
              >
                {/* Image + Quick view overlay trigger */}
                <div
                  style={{ position: 'relative', height: '240px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => onSelectProductForModal(prod, currentColor)}
                >
                  <img
                    src={prod.img}
                    alt={prod.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />

                  {/* Category tag */}
                  <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                    <span style={{
                      padding: '4px 12px', background: 'rgba(255, 255, 255, 0.92)',
                      borderRadius: '100px', fontSize: '0.72rem', fontWeight: '800',
                      color: C.text, backdropFilter: 'blur(4px)',
                    }}>
                      {prod.category}
                    </span>
                  </div>

                  {/* Hover Quick view badge */}
                  <div style={{
                    position: 'absolute', bottom: '12px', right: '12px',
                    background: 'rgba(28, 27, 24, 0.85)',
                    color: '#fff', fontSize: '0.75rem', fontWeight: '700',
                    padding: '6px 12px', borderRadius: '8px', backdropFilter: 'blur(4px)',
                  }}>
                    🔍 Быстрый просмотр
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    onClick={() => onSelectProductForModal(prod, currentColor)}
                    style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem',
                      fontWeight: '800', color: C.text, marginBottom: '6px', cursor: 'pointer',
                    }}
                  >
                    {prod.title}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: C.textMuted, marginBottom: '14px' }}>
                    📏 {prod.dimensions}
                  </div>

                  {/* Interactive Color Swatches Inside Card */}
                  <div style={{
                    background: C.bgAlt, borderRadius: '12px', padding: '10px 14px', marginBottom: '18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: C.textMuted }}>
                      Цвет: <span style={{ color: C.terracotta }}>{currentColor.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {WOOD_COLORS.map(c => (
                        <div
                          key={c.id}
                          onClick={() => handleColorChange(prod.id, c)}
                          title={c.name}
                          style={{
                            width: '18px', height: '18px', borderRadius: '50%',
                            background: c.hex, cursor: 'pointer',
                            border: currentColor.id === c.id ? `2px solid ${C.terracotta}` : '1px solid rgba(0,0,0,0.2)',
                            transform: currentColor.id === c.id ? 'scale(1.2)' : 'none',
                            transition: 'all 0.15s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Price + Button */}
                  <div style={{
                    marginTop: 'auto', paddingTop: '14px', borderTop: `1px solid ${C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: C.textLight, textDecoration: 'line-through' }}>
                        {prod.oldPrice.toLocaleString('ru-RU')} ₽
                      </div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.35rem', color: C.terracotta, lineHeight: 1 }}>
                        {prod.price.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProductForModal(prod, currentColor)}
                      style={{
                        padding: '10px 18px',
                        background: C.text,
                        border: 'none', borderRadius: '10px',
                        color: '#FFFFFF', fontWeight: '700', fontSize: '0.85rem',
                        cursor: 'pointer', transition: 'all 0.2s',
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = C.terracotta}
                      onMouseLeave={e => e.currentTarget.style.background = C.text}
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .nordic-catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .nordic-catalog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── PRODUCTION & CRAFTSMANSHIP SECTION ─── */
function ProductionSection() {
  const steps = [
    {
      num: '01',
      title: 'Подбор древесины и слэбов',
      desc: 'Камерная сушка до 8% влажности в конвекционных камерах. Никаких внутренних напряжений — мебель не треснет через 2 года.',
      badge: 'Камерная сушка 8%',
    },
    {
      num: '02',
      title: 'Лазерная геометрия и фрезеровка',
      desc: 'Выравниваем плоскость с точностью до 0.5 мм на ЧПУ-станках. Ручная доводка волокон шлифовкой зерном до 320 grit.',
      badge: 'ЧПУ точность',
    },
    {
      num: '03',
      title: 'Эко-масло Rubio Monocoat',
      desc: 'Органическое бельгийское масло на основе льняных масел без растворителей и VOC. Безопасно для детей и контакта с едой.',
      badge: '0% летучих веществ',
    },
    {
      num: '04',
      title: 'Свой цех металлообработки',
      desc: 'Аргонодуговая сварка с невидимыми зачищенными швами и полимерная порошковая покраска в термокамере при 200°C.',
      badge: 'Порошковый муар',
    },
  ];

  return (
    <section id="production" style={{
      padding: '100px 24px',
      background: C.bgAlt,
      borderTop: `1px solid ${C.border}`,
      position: 'relative',
    }}>
      <div id="производство" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Badge variant="forest">🏭 Честные стандарты качества</Badge>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '900',
            color: C.text,
            marginTop: '16px',
            marginBottom: '12px',
          }}>
            Как устроено наше производство в Санкт-Петербурге
          </h2>
          <p style={{ color: C.textMuted, fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            Мы не покупаем готовую мебель в Китае. Все этапы — от распила ствола дерева
            до варки стального каркаса — происходят под контролем главного мастера.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '56px',
        }} className="nordic-prod-grid">
          {steps.map(s => (
            <div
              key={s.num}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: '20px',
                padding: '28px 24px',
                boxShadow: shadowCard,
                position: 'relative',
              }}
            >
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '2.8rem',
                fontWeight: '900',
                color: 'rgba(184, 107, 53, 0.2)',
                lineHeight: 1,
                marginBottom: '14px',
              }}>
                {s.num}
              </div>

              <div style={{
                fontSize: '0.72rem', fontWeight: '700', color: C.forest,
                background: C.forestLight, padding: '3px 8px', borderRadius: '6px',
                display: 'inline-block', marginBottom: '10px',
              }}>
                {s.badge}
              </div>

              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '800', fontSize: '1.15rem', color: C.text, marginBottom: '10px' }}>
                {s.title}
              </h3>

              <p style={{ color: C.textMuted, fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live workshop showcase banner */}
        <div style={{
          background: C.text,
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          color: '#FFFFFF',
        }} className="nordic-workshop-banner">
          <div className="nordic-workshop-text" style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Badge variant="gold">Экскурсия на производство</Badge>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2rem', fontWeight: '900', marginTop: '16px', marginBottom: '16px' }}>
              Приезжайте в мастерскую и выберите слэб лично
            </h3>
            <p style={{ color: '#C9C3B6', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '28px', maxWidth: '480px' }}>
              В наличии более 80 спилов дуба, карагача и ясеня. Вместе приложим образцы масел,
              выберем форму подстолья и выпьем кофе.
            </p>
            <div>
              <a
                href="#contacts"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', background: gradTerra, borderRadius: '10px',
                  color: '#fff', fontWeight: '700', fontSize: '0.92rem', textDecoration: 'none',
                }}
              >
                Записаться на визит в цех →
              </a>
            </div>
          </div>

          <div style={{ height: '360px', position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80"
              alt="Столярный цех Nordic Loft"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .nordic-prod-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nordic-workshop-banner { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .nordic-workshop-text { padding: 24px 18px !important; }
        }
        @media (max-width: 540px) {
          .nordic-prod-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── REVIEWS SECTION ─── */
function ReviewsSection() {
  const reviews = [
    {
      name: 'Екатерина Романова',
      role: 'Дизайнер интерьеров, студия ArtSpace',
      city: 'Санкт-Петербург',
      text: 'Заказывала для проекта квартиры на Крестовском острове обеденный стол 240 см из слэба карагача с эпоксидной смолой. Клиенты в абсолютном восторге! Качество шлифовки и геометрия швов на металле — европейский уровень.',
      product: 'Стол «Koster River» 240 см',
      rating: 5,
    },
    {
      name: 'Михаил и Ольга Семеновы',
      role: 'Владельцы загородного дома',
      city: 'Репино, Ленобласть',
      text: 'Искали стол на 8 персон больше полугода. В салонах либо шпон за космические деньги, либо кривые кустарные слэбы. В Nordic Loft приехали в цех, лично выбрали спил дерева. Через 13 дней стол уже стоял в гостиной!',
      product: 'Стол из дуба «Malmo» 220 см',
      rating: 5,
    },
    {
      name: 'Денис Волков',
      role: 'Управляющий кофейни «Nord»',
      city: 'Санкт-Петербург, Петроградская',
      text: 'Оборудовали барную стойку и 6 столиков для кофейни. Проходимость 300+ человек в день. За 8 месяцев покрытие маслом Rubio держится безупречно, кофе и лимонады не оставляют следов. Рекомендую как надежных партнеров!',
      product: 'Барная стойка + столы для кафе',
      rating: 5,
    },
  ];

  return (
    <section id="reviews" style={{
      padding: '100px 24px',
      background: C.bg,
      position: 'relative',
    }}>
      <div id="отзывы" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Badge variant="terracotta">⭐ Репутация и отзывы</Badge>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '900',
            color: C.text,
            marginTop: '16px',
            marginBottom: '12px',
          }}>
            Что говорят заказчики о нашей мебели
          </h2>
          <p style={{ color: C.textMuted, fontSize: '1.05rem' }}>
            Более 210 честных отзывов на Яндекс.Картах и в профильных сообществах дизайнеров
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
        }} className="nordic-reviews-grid">
          {reviews.map((r, i) => (
            <div
              key={i}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: '20px',
                padding: '28px',
                boxShadow: shadowCard,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[...Array(r.rating)].map((_, idx) => (
                  <span key={idx} style={{ color: '#F59E0B', fontSize: '1rem' }}>★</span>
                ))}
              </div>

              <p style={{ color: C.text, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '20px', flex: 1, fontStyle: 'italic' }}>
                «{r.text}»
              </p>

              <div style={{ paddingTop: '16px', borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontWeight: '800', fontSize: '0.95rem', color: C.text }}>{r.name}</div>
                <div style={{ fontSize: '0.78rem', color: C.textMuted, marginTop: '2px' }}>{r.role} • {r.city}</div>
                <div style={{
                  display: 'inline-block', marginTop: '8px', fontSize: '0.74rem',
                  fontWeight: '700', color: C.terracotta, background: 'rgba(184,107,53,0.08)',
                  padding: '3px 8px', borderRadius: '6px',
                }}>
                  Заказ: {r.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .nordic-reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── SHOWROOM & CONTACTS SECTION ─── */
function ContactsSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', note: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', note: '' });
  };

  return (
    <footer id="contacts" style={{
      padding: '100px 24px 60px',
      background: C.bgAlt,
      borderTop: `1px solid ${C.border}`,
      position: 'relative',
    }}>
      <div id="контакты" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <div id="шоурум" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', marginBottom: '72px',
        }} className="nordic-contacts-grid">
          
          {/* Left: Info */}
          <div>
            <Badge variant="terracotta">📍 Шоурум и Мастерская в СПб</Badge>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: '900',
              color: C.text,
              marginTop: '16px',
              marginBottom: '16px',
            }}>
              Приглашаем в гости на чашку кофе
            </h2>
            <p style={{ color: C.textMuted, fontSize: '1rem', lineHeight: 1.7, marginBottom: '32px' }}>
              В нашем шоуруме представлены образцы всех пород дерева, выкрасы масел и готовые столы.
              Поможем подобрать идеальные размеры под ваш план расстановки мебели.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {[
                { icon: '📍', label: 'Адрес шоурума:', val: 'Санкт-Петербург, Красногвардейская пл., 3E (Artplay)' },
                { icon: '🏭', label: 'Адрес производства:', val: 'Санкт-Петербург, ул. Химиков, 28 (цех №4)' },
                { icon: '📞', label: 'Телефон мастерской:', val: '+7 (812) 385-40-20' },
                { icon: '🕐', label: 'Режим работы:', val: 'Ежедневно с 10:00 до 21:00 (без выходных)' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: C.textLight, textTransform: 'uppercase', fontWeight: '700' }}>{c.label}</div>
                    <div style={{ color: C.text, fontWeight: '700', fontSize: '0.95rem', marginTop: '2px' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct messengers */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/Moroz_3141592"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px', background: '#2AABEE', borderRadius: '10px',
                  color: '#fff', fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <span>✈️</span> Telegram мастера
              </a>
              <a
                href="tel:+78123854020"
                style={{
                  padding: '10px 20px', background: C.card, border: `1.5px solid ${C.borderDark}`,
                  borderRadius: '10px', color: C.text, fontWeight: '700', fontSize: '0.88rem',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <span>📞</span> Позвонить в цех
              </a>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="nordic-contacts-card" style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: '24px',
            padding: '36px',
            boxShadow: shadowCard,
          }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: '800', color: C.text, marginBottom: '8px' }}>
              Записаться на примерку образцов в шоурум
            </h3>
            <p style={{ color: C.textMuted, fontSize: '0.88rem', marginBottom: '24px' }}>
              Или оставьте контакт, если вам удобнее заказать бесплатный выезд замерщика с чемоданом образцов дерева на дом.
            </p>

            {sent ? (
              <div style={{
                padding: '24px', background: C.forestLight, border: '1px solid rgba(44, 74, 62, 0.3)',
                borderRadius: '14px', textAlign: 'center', color: C.forest, fontWeight: '700',
              }}>
                ✅ Спасибо за заявку! Мастер перезвонит в течение 15 минут для подтверждения времени визита.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: C.text, marginBottom: '6px' }}>
                    Ваше имя:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Александр"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    style={{
                      width: '100%', padding: '13px 16px', background: C.bgAlt,
                      border: `1px solid ${C.border}`, borderRadius: '10px',
                      fontSize: '0.92rem', color: C.text, outline: 'none', boxSizing: 'border-box',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: C.text, marginBottom: '6px' }}>
                    Телефон для связи:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    style={{
                      width: '100%', padding: '13px 16px', background: C.bgAlt,
                      border: `1px solid ${C.border}`, borderRadius: '10px',
                      fontSize: '0.92rem', color: C.text, outline: 'none', boxSizing: 'border-box',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: C.text, marginBottom: '6px' }}>
                    Что вас интересует (необязательно):
                  </label>
                  <input
                    type="text"
                    placeholder="Обеденный стол со слэбом 200 см, стеллаж в спальню..."
                    value={form.note}
                    onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                    style={{
                      width: '100%', padding: '13px 16px', background: C.bgAlt,
                      border: `1px solid ${C.border}`, borderRadius: '10px',
                      fontSize: '0.92rem', color: C.text, outline: 'none', boxSizing: 'border-box',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '15px', background: gradTerra,
                    border: 'none', borderRadius: '12px',
                    color: '#fff', fontWeight: '700', fontSize: '0.95rem',
                    cursor: 'pointer', marginTop: '6px',
                    boxShadow: '0 8px 24px rgba(184, 107, 53, 0.35)',
                    transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  Записаться на визит / вызвать замерщика →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div style={{
          paddingTop: '28px', borderTop: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.1rem', color: C.text }}>
              NORDIC LOFT • САНКТ-ПЕТЕРБУРГ
            </div>
            <div style={{ fontSize: '0.78rem', color: C.textMuted, marginTop: '2px' }}>
              © 2016–{new Date().getFullYear()} Мастерская авторской мебели. Все права защищены.
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: C.textLight }}>
            Демо-проект из портфолио Владислава Морозова
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .nordic-contacts-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 640px) {
          .nordic-contacts-card { padding: 24px 18px !important; }
        }
      `}</style>
    </footer>
  );
}

/* ─── MAIN NORDIC LOFT COMPONENT ─── */
export default function DemoFurniture() {
  const [modalProduct, setModalProduct] = useState(null);
  const [modalColor, setModalColor] = useState(WOOD_COLORS[0]);

  const openQuiz = () => {
    const el = document.getElementById('quiz') || document.getElementById('калькулятор');
    if (el) {
      const headerHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - headerHeight),
        behavior: 'smooth'
      });
    }
  };

  const scrollCatalog = () => {
    const el = document.getElementById('catalog') || document.getElementById('каталог');
    if (el) {
      const headerHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - headerHeight),
        behavior: 'smooth'
      });
    }
  };

  const openProductModal = (product, color) => {
    setModalProduct(product);
    setModalColor(color || WOOD_COLORS[0]);
  };

  const closeProductModal = () => {
    setModalProduct(null);
  };

  return (
    <div style={{
      background: C.bg,
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      color: C.text,
      paddingBottom: '80px',
    }}>
      {/* Global typography injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; color: ${C.text}; }
      `}</style>

      {/* Floating back-to-portfolio DemoBar */}
      <DemoBar projectName="Nordic Loft" />

      {/* Header */}
      <NordicHeader onOpenQuiz={openQuiz} />

      {/* Hero */}
      <HeroSection onOpenQuiz={openQuiz} onScrollCatalog={scrollCatalog} />

      {/* Feature 1: Quiz / Configurator */}
      <QuizSection />

      {/* Feature 2: Interactive Catalog with Filters and Quick View */}
      <CatalogSection onSelectProductForModal={openProductModal} />

      {/* Production & Standards */}
      <ProductionSection />

      {/* Reviews */}
      <ReviewsSection />

      {/* Contacts & Showroom */}
      <ContactsSection />

      {/* Quick View Modal */}
      {modalProduct && (
        <QuickViewModal
          product={modalProduct}
          selectedColor={modalColor}
          onSelectColor={setModalColor}
          onClose={closeProductModal}
          onBookProduct={(p, c, phone) => {
            console.log('Booked product:', p.title, c.name, phone);
          }}
        />
      )}
    </div>
  );
}
