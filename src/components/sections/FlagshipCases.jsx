import React, { useState } from 'react';
import { BrowserMockup, Reveal, SectionHeading, Tag } from '../ui/MotionPrimitives';

const NAMPACK_TABS = [
  {
    id: 0,
    label: '📦 Витрина и Каталог',
    url: 'nampack.ru/catalog',
    title: 'Современная B2B/B2C витрина и умный каталог',
    description:
      'Разработал интернет-магазин для производителя упаковочных материалов в Санкт-Петербурге с доставкой по всей РФ. Главная страница сразу транслирует преимущества собственного производства, а каталог на 23+ позиций с фильтрами по 7 категориям (гофрокороба, курьер-пакеты, Zip-Lock, БОПП, скотч, коробки для пиццы) и мгновенным поиском позволяет найти нужный размер за секунды.',
    imgs: [
      { src: '/images/nampack/hero.png', label: 'Главная страница НАМПАК', url: 'nampack.ru' },
      { src: '/images/nampack/catalog.png', label: 'Каталог с оптовыми ценами', url: 'nampack.ru/catalog' },
    ],
    features: [
      'Мгновенный поиск по размерам, маркам картона и категориям',
      'Фильтрация по 7 категориям с боковой панелью и тегами',
      'Карточки с габаритами, маркой Т-22/Т-23 и мин. партией',
      'Полная адаптивность под смартфоны и планшеты',
      'SEO-архитектура и быстрая загрузка SPA на React + Vite',
    ],
  },
  {
    id: 1,
    label: '🧮 Оптовый калькулятор и B2B',
    url: 'nampack.ru/product/korob-samosbornyj-220-165-100',
    title: 'Интерактивный расчёт тиража и личный кабинет юрлиц',
    description:
      'Главная фишка для оптовых клиентов и селлеров Wildberries / Ozon — динамическая сетка цен от объёма. Покупатель кликает на нужный тираж (от 1 шт. до 10 000+ шт.), цена за единицу и итог партии пересчитываются мгновенно. Реализованы выдвижная корзина заявки, личный кабинет с сохранением реквизитов ООО/ИП, выставление счетов и поддержка ЭДО (Диадок / СБИС).',
    imgs: [
      { src: '/images/nampack/calculator.png', label: 'Калькулятор оптового тиража в карточке товара', url: 'nampack.ru/product/...' },
    ],
    features: [
      'Автопересчёт цены за штуку и скидок до 25% от тиража',
      'Выдвижная корзина заявки + быстрый заказ в 1 клик',
      'Личный кабинет: история заказов и сохранённые реквизиты',
      'Оплата по счёту для ООО/ИП и документооборот ЭДО',
      'Блок брендирования и нанесения логотипа под заказ',
    ],
  },
  {
    id: 2,
    label: '⚙️ Админ-панель и Инфраструктура',
    url: 'nampack.ru/admin',
    title: 'Собственная панель управления и полный цикл под ключ',
    description:
      'Проект выполнен целиком под ключ: от прототипа и фирменной палитры (крафт-золото + глубокий графит) до REST API и закрытой админ-панели. Менеджеры компании сами обновляют каталог, оптовые прайсы, новости склада, галерею производства, статьи по стандартам WB/Ozon и FAQ — без программистов и без ежемесячных подписок конструкторам.',
    imgs: [
      { src: '/images/nampack/catalog.png', label: 'Динамический каталог из админ-панели', url: 'nampack.ru/catalog' },
      { src: '/images/nampack/hero.png', label: 'Витрина и быстрый заказ', url: 'nampack.ru' },
    ],
    features: [
      'Управление товарами, категориями и сетками тиражей',
      'Обработка входящих заявок и оптовых корзин в админке',
      'Разделы: Новости, Галерея, Обучение WB/Ozon, FAQ',
      'Собственный REST API + защищённая авторизация',
      'Политика 152-ФЗ, cookie-баннер и подключение мессенджеров',
    ],
  },
];

const ALDUIN_TABS = [
  {
    id: 0,
    label: '🏪 Витрина и Каталог',
    url: 'alduin-workshop.ru',
    title: 'Клиентская витрина интернет-магазина',
    description:
      'Главная страница сайта встречает покупателей живой историей бренда и атмосферной витриной изделий из кожи, дерева и металла. Каталог с удобными фильтрами по категориям и материалам позволяет быстро найти нужное изделие. Страницы загружаются менее чем за 1 секунду.',
    imgs: [
      { src: '/images/alduin/hero.jpg', label: 'Главная страница Мастерской «Алдуин»', url: 'alduin-workshop.ru' },
      { src: '/images/alduin/catalog.jpg', label: 'Каталог изделий мастерской', url: 'alduin-workshop.ru/catalog' },
    ],
    features: [
      'Фильтрация по категориям и материалам',
      'Атмосферные карточки товаров с галереей',
      'Безупречная мобильная адаптация',
      'SEO-оптимизация и микроразметка',
      'Загрузка страниц быстрее 1 секунды',
    ],
  },
  {
    id: 1,
    label: '🚚 Оплата и СДЭК',
    url: 'alduin-workshop.ru/checkout',
    title: 'Полная автоматизация: ЮKassa + API СДЭК',
    description:
      'Покупатель выбирает пункт выдачи СДЭК прямо на интерактивной карте и сразу видит точную стоимость и сроки доставки. После оплаты через ЮKassa (карта или СБП) система автоматически создаёт накладную СДЭК и отправляет клиенту трек-номер по SMS и email. Ноль ручной рутины для владельца.',
    imgs: [
      { src: '/images/alduin/catalog.jpg', label: 'Каталог и оформление заказа со СДЭК', url: 'alduin-workshop.ru/checkout' },
    ],
    features: [
      'Интерактивная карта ПВЗ СДЭК с расчётом тарифа',
      'Онлайн-оплата через ЮKassa и СБП',
      'Автогенерация накладной сразу после оплаты',
      'Автоматические Email + SMS уведомления с трек-номером',
      'Исключение ошибок при ручном оформлении посылок',
    ],
  },
  {
    id: 2,
    label: '⚙️ Кастомная Админ-панель',
    url: 'alduin-workshop.ru/admin',
    title: 'Удобная админ-панель с телефона за 30 секунд',
    description:
      'Владелец управляет всем магазином самостоятельно. Заказы разложены по статусам («Новый / Оплачен / В изготовлении / Отправлен») и обновляются в один клик. Товары сортируются перетаскиванием (drag-and-drop), а цены, фото и настройки меняются прямо со смартфона.',
    imgs: [
      { src: '/images/alduin/admin-orders.png', label: 'Управление заказами и статусами', url: 'alduin-workshop.ru/admin/orders' },
      { src: '/images/alduin/admin-products.png', label: 'Управление товарами (drag-and-drop)', url: 'alduin-workshop.ru/admin/products' },
    ],
    features: [
      'Статусы заказов и мгновенное обновление в 1 клик',
      'Drag-and-drop сортировка карточек товаров',
      'Полноценное управление каталогом со смартфона',
      'Гибкие настройки витрины без программиста',
      'Аналитика заказов и выручки',
    ],
  },
];

function CaseStudyCard({
  badgeText,
  badgeColor,
  title,
  highlight,
  highlightClass,
  domain,
  liveUrl,
  tags,
  metrics,
  tabs,
  accentHex,
  buttonClass,
  onOrderSimilar,
  onZoom,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

  return (
    <div
      className="case-shell"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.014) 100%)',
        border: `1px solid ${accentHex}38`,
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: `0 28px 70px -20px rgba(0, 0, 0, 0.7), 0 0 50px -20px ${accentHex}28`,
        position: 'relative',
      }}
    >
      {/* Top glow accent line */}
      <div
        style={{
          height: '3px',
          width: '100%',
          background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)`,
          opacity: 0.9,
        }}
      />

      {/* Case Header */}
      <div className="case-header-pad" style={{ padding: '36px 40px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              background: `${badgeColor}1a`,
              border: `1px solid ${badgeColor}48`,
              color: badgeColor,
              fontSize: '0.76rem',
              fontWeight: '700',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {badgeText}
          </span>

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 14px',
              borderRadius: '100px',
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#e2e8f0',
              fontSize: '0.82rem',
              fontWeight: '600',
              textDecoration: 'none',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${accentHex}70`;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#e2e8f0';
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            {domain} ↗
          </a>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.45rem, 3.2vw, 2.25rem)',
            fontWeight: '800',
            color: '#f8fafc',
            marginBottom: '18px',
            lineHeight: 1.18,
          }}
        >
          {title} <span className={highlightClass}>{highlight}</span>
        </h3>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {tags.map((t) => (
            <Tag key={t.label} color={t.color}>
              {t.label}
            </Tag>
          ))}
        </div>

        {/* Business Impact KPI Strip */}
        <div
          className="case-metrics-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                padding: '14px 16px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '800',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  color: '#f8fafc',
                  marginBottom: '3px',
                }}
              >
                {m.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.35 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs bar */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          padding: '12px 32px',
          background: 'rgba(0,0,0,0.22)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="case-tab-btn"
              style={{
                padding: '10px 18px',
                borderRadius: '11px',
                border: isActive ? `1px solid ${accentHex}60` : '1px solid transparent',
                background: isActive ? `${accentHex}1f` : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                fontWeight: isActive ? '600' : '500',
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.22s ease',
                fontFamily: 'var(--font-main)',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Body */}
      <div
        key={activeTab}
        className="case-body-grid animate-tab-in"
        style={{
          padding: '36px 40px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '36px',
          alignItems: 'start',
        }}
      >
        {/* Left: Description & Actions */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: '700',
              color: '#f8fafc',
              marginBottom: '14px',
            }}
          >
            {active.title}
          </h4>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '24px', fontSize: '0.95rem' }}>
            {active.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '30px' }}>
            {active.features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    marginTop: '2px',
                    borderRadius: '50%',
                    background: `${accentHex}24`,
                    border: `1px solid ${accentHex}55`,
                    color: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.45 }}>{f}</span>
              </div>
            ))}
          </div>

          <div className="case-actions-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
              style={{ flex: '1 1 200px' }}
            >
              Открыть {domain} ↗
            </a>
            <button
              type="button"
              onClick={onOrderSimilar}
              className="btn-secondary"
              style={{ flex: '1 1 180px' }}
            >
              Хочу похожий проект →
            </button>
          </div>
        </div>

        {/* Right: Browser Mockup Screenshots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {active.imgs.map((imgObj, i) => (
            <BrowserMockup
              key={`${active.id}-${i}`}
              url={imgObj.url}
              img={imgObj.src}
              alt={imgObj.label}
              height={active.imgs.length === 1 ? '340px' : i === 0 ? '245px' : '195px'}
              onZoom={onZoom}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FlagshipCases({ onSelectProject, onZoom }) {
  return (
    <section
      id="cases"
      style={{
        padding: '110px 24px',
        position: 'relative',
        background: 'linear-gradient(180deg, #06070B 0%, rgba(99,102,241,0.035) 50%, #06070B 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <SectionHeading
            badge="🏆 Реальные коммерческие проекты"
            title="Сайты, которые уже"
            highlight="приносят заказы клиентам"
            subtitle="Не шаблоны из конструкторов, а полноценные веб-системы под ключ: с каталогами, калькуляторами, онлайн-оплатой, доставкой и удобными админ-панелями"
          />
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          {/* CASE 1: NAMPACK.RU (NEWEST FLAGSHIP) */}
          <Reveal delay={60}>
            <CaseStudyCard
              badgeText="🔥 Новый коммерческий проект • 2026"
              badgeColor="#f3d5b5"
              title="B2B/B2C интернет-магазин и оптовый портал"
              highlight="для компании «НАМПАК»"
              highlightClass="gradient-text-kraft"
              domain="nampack.ru"
              liveUrl="https://nampack.ru/"
              accentHex="#d4a373"
              buttonClass="btn-kraft"
              tags={[
                { label: 'Коммерческий проект под ключ', color: 'kraft' },
                { label: 'B2B & B2C E-commerce', color: 'indigo' },
                { label: 'Оптовый калькулятор тиража', color: 'emerald' },
                { label: 'Личный кабинет + ЭДО', color: 'violet' },
                { label: 'Собственная Админ-панель', color: 'amber' },
              ]}
              metrics={[
                { value: '23+ позиций', label: 'в 7 категориях каталога' },
                { value: 'До −25%', label: 'автопересчёт оптовых скидок' },
                { value: 'B2B + B2C', label: 'счета юрлицам, ЭДО и розница' },
                { value: '0 ₽/мес', label: 'подписок конструкторам' },
              ]}
              tabs={NAMPACK_TABS}
              onOrderSimilar={() => onSelectProject('B2B-портал / Оптовый магазин (как nampack.ru)')}
              onZoom={onZoom}
            />
          </Reveal>

          {/* CASE 2: ALDUIN WORKSHOP */}
          <Reveal delay={100}>
            <CaseStudyCard
              badgeText="🏆 Флагманский E-commerce кейс"
              badgeColor="#a5b4fc"
              title="Интернет-магазин и система управления заказами"
              highlight="для мастерской «Алдуин»"
              highlightClass="gradient-text-indigo"
              domain="alduin-workshop.ru"
              liveUrl="https://alduin-workshop.ru"
              accentHex="#6366f1"
              buttonClass="btn-primary"
              tags={[
                { label: 'Коммерческий проект под ключ', color: 'violet' },
                { label: 'E-commerce', color: 'indigo' },
                { label: 'ЮKassa + СБП', color: 'emerald' },
                { label: 'API СДЭК (автонакладные)', color: 'emerald' },
                { label: 'Drag & Drop Админка', color: 'amber' },
              ]}
              metrics={[
                { value: '< 1 сек', label: 'скорость загрузки страниц' },
                { value: 'Авто СДЭК', label: 'карта ПВЗ и создание накладной' },
                { value: 'ЮKassa + СБП', label: 'мгновенный приём оплаты' },
                { value: '30 сек', label: 'обновление цен со смартфона' },
              ]}
              tabs={ALDUIN_TABS}
              onOrderSimilar={() => onSelectProject('Интернет-магазин с ЮKassa и СДЭК (как Алдуин)')}
              onZoom={onZoom}
            />
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .case-body-grid {
            grid-template-columns: 1fr !important;
            padding: 24px 20px 28px !important;
            gap: 24px !important;
          }
          .case-header-pad {
            padding: 24px 20px 22px !important;
          }
          .case-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 520px) {
          .case-header-pad {
            padding: 20px 16px 18px !important;
          }
          .case-body-grid {
            padding: 20px 16px 24px !important;
          }
          .case-tab-btn {
            padding: 9px 12px !important;
            font-size: 0.8rem !important;
          }
          .case-actions-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
