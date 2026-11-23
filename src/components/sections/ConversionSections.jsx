import React from 'react';
import { Reveal, SectionHeading, SpotlightCard } from '../ui/MotionPrimitives';

/* ─── PROCESS / HOW WE WORK ─── */
export function ProcessSection() {
  const steps = [
    {
      num: '01',
      icon: '🎯',
      title: 'Разбор задачи и смета',
      time: 'За 24 часа • Бесплатно',
      desc: 'Созваниваемся или общаемся в Telegram, разбираем ваш бизнес и конкурентов. Вы получаете понятный план, точные сроки и фиксированную стоимость.',
      accent: '#6366f1',
    },
    {
      num: '02',
      icon: '🎨',
      title: 'Прототип и дизайн',
      time: '2–4 дня',
      desc: 'Проектирую структуру, которая ведёт клиента к заявке или покупке. Согласовываем визуальный стиль, акценты и мобильную версию до начала кода.',
      accent: '#a855f7',
    },
    {
      num: '03',
      icon: '⚡',
      title: 'Разработка и интеграции',
      time: '5–14 дней',
      desc: 'Пишу быстрый и чистый код на React / FastAPI. Подключаю ЮKassa, СБП, СДЭК, калькуляторы, Telegram-уведомления и делаю удобную админ-панель.',
      accent: '#10b981',
    },
    {
      num: '04',
      icon: '🚀',
      title: 'Запуск, SEO и поддержка',
      time: 'Под ключ',
      desc: 'Подключаю домен, SSL-сертификат, базовое SEO и аналитику. Показываю, как управлять сайтом с телефона, и остаюсь на связи после релиза.',
      accent: '#d4a373',
    },
  ];

  return (
    <section
      id="process"
      style={{
        padding: '105px 24px',
        background: 'linear-gradient(180deg, #06070B 0%, rgba(16,185,129,0.025) 50%, #06070B 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <SectionHeading
            badge="🧭 Прозрачный процесс"
            title="Как мы запустим ваш проект"
            highlight="без стресса и срывов"
            highlightClass="gradient-text-emerald"
            subtitle="Вы видите прогресс на каждом этапе по живой тестовой ссылке, а цена и сроки фиксируются до старта"
          />
        </Reveal>

        <div
          className="process-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '18px',
          }}
        >
          {steps.map((step, idx) => (
            <Reveal key={step.num} delay={idx * 80}>
              <SpotlightCard
                spotlightColor={`${step.accent}24`}
                spotlightBorder={`${step.accent}55`}
                spotlightGlow={`${step.accent}18`}
                style={{ padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: `${step.accent}1c`,
                      border: `1px solid ${step.accent}42`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.45rem',
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.75rem',
                      fontWeight: '800',
                      color: 'rgba(255,255,255,0.12)',
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.73rem',
                    fontWeight: '700',
                    color: step.accent,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '8px',
                  }}
                >
                  {step.time}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: '700',
                    color: '#f8fafc',
                    marginBottom: '10px',
                  }}
                >
                  {step.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.68, margin: 0, flex: 1 }}>
                  {step.desc}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── TARIFFS / PACKAGES ─── */
export function TariffsSection({ onSelectTariff }) {
  const packages = [
    {
      id: 'landing',
      name: 'Продающий лендинг',
      badge: 'Быстрый запуск заявок',
      price: 'от 25 000 ₽',
      term: 'Срок: 5–8 дней',
      desc: 'Идеально для услуг, студий, экспертов и запуска рекламы. Максимум конверсии и эффектный дизайн.',
      accent: '#818cf8',
      popular: false,
      features: [
        'Индивидуальный дизайн и плавные анимации',
        'Интерактивный калькулятор или квиз-подбор',
        'Мгновенная отправка заявок в Telegram / CRM',
        'Адаптив под все смартфоны и быстрая загрузка',
        'Подключение домена, SSL и базовое SEO',
      ],
    },
    {
      id: 'ecommerce',
      name: 'Интернет-магазин / B2B',
      badge: '🔥 Самый популярный',
      price: 'от 55 000 ₽',
      term: 'Срок: 10–20 дней',
      desc: 'Полноценная система продаж под ключ, как nampack.ru и alduin-workshop.ru. Без абонентской платы.',
      accent: '#d4a373',
      popular: true,
      features: [
        'Каталог, умный поиск, фильтры и карточки товаров',
        'Корзина, оптовые цены от тиража или модификаторы',
        'Онлайн-оплата (ЮKassa, СБП) и доставка (API СДЭК)',
        'Личный кабинет, счета для ООО/ИП, поддержка ЭДО',
        'Собственная удобная админ-панель с телефона',
        'Полная передача исходного кода и 30 дней поддержки',
      ],
    },
    {
      id: 'bot',
      name: 'Telegram-бот / Веб-сервис',
      badge: 'Автоматизация бизнеса',
      price: 'от 30 000 ₽',
      term: 'Срок: 7–14 дней',
      desc: 'Умные Telegram-боты, Mini Apps, CRM-интеграции, AI-ассистенты и нестандартные веб-сервисы.',
      accent: '#34d399',
      popular: false,
      features: [
        'Приём заказов, запись и оплата прямо в Telegram',
        'Интеграция с AI, базами данных и внешними API',
        'Авторассылки, уведомления менеджерам и статусы',
        'Веб-админка для управления базой и аналитикой',
        'Развёртывание на сервере (Docker) и техподдержка',
      ],
    },
  ];

  return (
    <section id="tariffs" style={{ padding: '110px 24px', background: '#06070B', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <SectionHeading
            badge="💎 Понятные форматы"
            title="Сколько стоит"
            highlight="разработка под ключ"
            highlightClass="gradient-text-kraft"
            subtitle="Фиксируем цену до старта, оплата поэтапно. Вы платите один раз — сайт и код навсегда остаются вашей собственностью"
          />
        </Reveal>

        <div
          className="tariffs-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '22px',
            alignItems: 'stretch',
          }}
        >
          {packages.map((pkg, idx) => (
            <Reveal key={pkg.id} delay={idx * 90}>
              <SpotlightCard
                spotlightColor={`${pkg.accent}24`}
                spotlightBorder={`${pkg.accent}66`}
                spotlightGlow={`${pkg.accent}20`}
                style={{
                  padding: '34px 28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderColor: pkg.popular ? `${pkg.accent}55` : 'rgba(255,255,255,0.08)',
                  background: pkg.popular
                    ? 'linear-gradient(180deg, rgba(212,163,115,0.09) 0%, rgba(255,255,255,0.02) 100%)'
                    : undefined,
                }}
              >
                <div style={{ marginBottom: '18px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '5px 12px',
                      borderRadius: '100px',
                      background: `${pkg.accent}1c`,
                      border: `1px solid ${pkg.accent}44`,
                      color: pkg.accent,
                      fontSize: '0.74rem',
                      fontWeight: '700',
                    }}
                  >
                    {pkg.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.38rem',
                    fontWeight: '800',
                    color: '#f8fafc',
                    marginBottom: '8px',
                  }}
                >
                  {pkg.name}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '22px' }}>
                  {pkg.desc}
                </p>

                <div
                  style={{
                    padding: '16px 18px',
                    borderRadius: '14px',
                    background: 'rgba(0,0,0,0.28)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.85rem',
                      fontWeight: '800',
                      color: '#f8fafc',
                      lineHeight: 1.1,
                      marginBottom: '4px',
                    }}
                  >
                    {pkg.price}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{pkg.term}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '28px', flex: 1 }}>
                  {pkg.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          marginTop: '2px',
                          borderRadius: '50%',
                          background: `${pkg.accent}22`,
                          color: pkg.accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.68rem',
                          fontWeight: '800',
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ color: '#e2e8f0', fontSize: '0.87rem', lineHeight: 1.45 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTariff(pkg.name)}
                  className={pkg.popular ? 'btn-kraft' : 'btn-secondary'}
                  style={{ width: '100%' }}
                >
                  Рассчитать этот формат →
                </button>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .tariffs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
