import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Check,
  Droplets,
  Hand,
  Heart,
  MapPin,
  Menu,
  Minus,
  Plus,
  Send,
  X,
} from 'lucide-react';
import DemoBar from '../../components/DemoBar';

/* ============================================================================
   ФОТОГРАФИИ
   Все изображения сайта — здесь. Чтобы подставить реальные работы Лизы,
   замените ссылки на свои (например, '/images/rusykosy/vase-1.jpg' из папки
   public или любой внешний URL). Рекомендуемые пропорции указаны в комментариях.
   ========================================================================== */
const IMAGES = {
  // Первый экран — вертикальный кадр 4:5
  hero: 'https://images.unsplash.com/photo-1525974160448-038dacadcc71?auto=format&fit=crop&w=1400&q=80',

  // Карточки каталога — вертикальные кадры 3:4 (основное фото + деталь)
  vase: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=80',
  vaseDetail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
  mug: 'https://images.unsplash.com/photo-1590422749897-47036da0b0ff?auto=format&fit=crop&w=1200&q=80',
  mugDetail: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=80',
  bowls: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1200&q=80',
  bowlsDetail: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
  ornament: 'https://images.unsplash.com/photo-1576020799627-aeac74d58064?auto=format&fit=crop&w=1200&q=80',
  ornamentDetail: 'https://images.unsplash.com/photo-1481401908818-600b7a676c0d?auto=format&fit=crop&w=1200&q=80',
  shots: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
  shotsDetail: 'https://images.unsplash.com/photo-1525974160448-038dacadcc71?auto=format&fit=crop&w=1200&q=80',
  plate: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=1200&q=80',
  plateDetail: 'https://images.unsplash.com/photo-1610701596295-4dc5d6289214?auto=format&fit=crop&w=1200&q=80',

  // «О мастере» — портрет / процесс лепки 4:5 и маленькая деталь 1:1
  master: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1400&q=80',
  masterDetail: 'https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=800&q=80',

  // Блок для ресторанов — широкий кадр 16:7
  horeca: 'https://images.unsplash.com/photo-1610701596295-4dc5d6289214?auto=format&fit=crop&w=2000&q=80',
};

/* Ссылки бренда — замените на актуальные */
const LINKS = {
  telegram: 'https://t.me/rusykosy_ceramica',
  instagram: 'https://instagram.com/rusykosy_ceramica',
  instagramHandle: '@rusykosy_ceramica',
};

/* ============================================================================
   ДАННЫЕ
   ========================================================================== */
const CATEGORIES = { birch: 'Берёза', swallows: 'Ласточки', seasonal: 'Сезонное' };

const PRODUCTS = [
  {
    id: 'vase',
    num: '№ 009',
    title: 'Ваза-берёза высокая',
    category: 'birch',
    price: 6800,
    inStock: true,
    max: 1,
    badge: 'В наличии · 1 шт',
    spec: 'Высота 22 см · каменная масса',
    size: '22 см, ⌀ 9 см',
    images: [IMAGES.vase, IMAGES.vaseDetail],
    description:
      'Высокая ваза, вылепленная как отрезок молодого ствола: с тёмными чечевичками, отслаивающейся берестой и следами сучков. Внутри — прозрачная глазурь, поэтому вазу можно использовать и для сухоцветов, и для живых букетов.',
    dishwasher: false,
  },
  {
    id: 'mug',
    num: '№ 014',
    title: 'Кружка-берёза с божьей коровкой',
    category: 'birch',
    price: 3400,
    inStock: true,
    max: 1,
    badge: 'В наличии · 1 шт',
    spec: '320 мл · керамика, пищевая глазурь',
    size: '320 мл',
    images: [IMAGES.mug, IMAGES.mugDetail],
    description:
      'Кружка-берёза с маленькой божьей коровкой, которая ползёт к краю. Ручка повторяет изгиб ветки, а рельеф коры приятно ложится в ладонь — утренний кофе превращается в короткую прогулку по лесу.',
    dishwasher: true,
  },
  {
    id: 'bowls',
    num: '№ 021',
    title: 'Пара пиал «Ласточки»',
    category: 'swallows',
    price: 4200,
    inStock: true,
    max: 2,
    badge: 'В наличии · 2 шт',
    spec: '2 × 250 мл · роспись ангобами',
    size: '2 × 250 мл',
    images: [IMAGES.bowls, IMAGES.bowlsDetail],
    description:
      'Две пиалы для чая или десертов, расписанные летящими ласточками. Птицы на пиалах смотрят друг на друга, поэтому они живут только парой — как и положено ласточкам.',
    dishwasher: true,
  },
  {
    id: 'ornament',
    num: '№ 033',
    title: 'Ёлочный шар «Рябина»',
    category: 'seasonal',
    price: 2100,
    inStock: true,
    max: 5,
    badge: 'В наличии · Лимитировано',
    spec: '⌀ 8 см · керамика, льняная лента',
    size: '⌀ 8 см',
    images: [IMAGES.ornament, IMAGES.ornamentDetail],
    description:
      'Лёгкий керамический шар с гроздью рябины на бересте. Сделан к Новому году небольшим тиражом: каждый расписан вручную, поэтому ягоды на всех шарах немного разные.',
    dishwasher: false,
  },
  {
    id: 'shots',
    num: '№ 027',
    title: 'Набор стопок-берёзок (2 шт)',
    category: 'birch',
    price: 2600,
    inStock: false,
    max: 10,
    badge: 'Под заказ · 14 дн.',
    spec: '2 × 50 мл · каменная масса',
    size: '2 × 50 мл',
    images: [IMAGES.shots, IMAGES.shotsDetail],
    description:
      'Две стопки-берёзки для настоек и наливок — будто два аккуратно спиленных полешка. Изготавливаются под заказ: лепка, сушка, роспись и два обжига занимают около 14 дней.',
    dishwasher: true,
  },
  {
    id: 'plate',
    num: '№ 018',
    title: 'Блюдо «Полосы коры»',
    category: 'birch',
    price: 4900,
    inStock: true,
    max: 1,
    badge: 'В наличии · 1 шт',
    spec: '⌀ 28 см · каменная масса',
    size: '⌀ 28 см',
    images: [IMAGES.plate, IMAGES.plateDetail],
    description:
      'Широкое сервировочное блюдо с рельефом коры по борту и гладким центром — для сыров, пирогов и фруктов. Плотная глазурь не боится ножа и горячего.',
    dishwasher: true,
  },
];

const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

const FILTERS = [
  { id: 'all', label: 'Все' },
  { id: 'stock', label: 'В наличии', dot: true },
  { id: 'birch', label: 'Берёза' },
  { id: 'swallows', label: 'Ласточки' },
  { id: 'seasonal', label: 'Сезонное' },
];

const matchFilter = (p, f) =>
  f === 'all' ? true : f === 'stock' ? p.inStock : p.category === f;

const NAV = [
  { id: 'catalog', label: 'Каталог' },
  { id: 'about', label: 'О мастере' },
  { id: 'horeca', label: 'Ресторанам' },
  { id: 'events', label: 'Афиша' },
  { id: 'club', label: 'Клуб' },
];

const CDEK_PRICE = 490;
const FREE_SHIPPING_FROM = 10000;

/* ============================================================================
   УТИЛИТЫ
   ========================================================================== */
const rub = (n) => `${new Intl.NumberFormat('ru-RU').format(n)} ₽`;
const cx = (...c) => c.filter(Boolean).join(' ');
const plural = (n, [one, few, many]) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
};

const EASE = 'ease-[cubic-bezier(.2,.7,.2,1)]';

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/** Монтирует элемент заранее и даёт время на анимацию появления/исчезновения */
function usePresence(open, ms = 500) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      let r2;
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
    }
    setVisible(false);
    const t = setTimeout(() => setMounted(false), ms);
    return () => clearTimeout(t);
  }, [open, ms]);
  return { mounted, visible };
}

/** Плавное появление при прокрутке */
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return React.createElement(
    Tag,
    {
      ref,
      className: cx('rk-reveal', shown && 'is-in', className),
      style: { transitionDelay: `${delay}ms` },
      ...rest,
    },
    children,
  );
}

/* ============================================================================
   МЕЛКИЕ ЭЛЕМЕНТЫ
   ========================================================================== */
const Dot = ({ className = '' }) => (
  <span aria-hidden className={cx('inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-[#B83B2A]', className)} />
);

const Eyebrow = ({ children, className = '', light = false }) => (
  <p
    className={cx(
      'text-[11px] font-normal uppercase tracking-[0.16em]',
      light ? 'text-[#F6F3EE]/60' : 'text-[#6E685F]',
      className,
    )}
  >
    {children}
  </p>
);

const Container = ({ className = '', children }) => (
  <div className={cx('mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12', className)}>{children}</div>
);

const PrimaryButton = ({ children, className = '', light = false, ...rest }) => (
  <button
    type="button"
    className={cx(
      'group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[13px] font-normal tracking-[0.02em] transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-40',
      light
        ? 'bg-[#F6F3EE] text-[#1F1E1C] hover:bg-[#ECE7DF]'
        : 'bg-[#1F1E1C] text-[#F6F3EE] hover:bg-[#263328]',
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

/* ============================================================================
   ШАПКА
   ========================================================================== */
function Header({ count, onCart, onInStock, onNav, menuOpen, onToggleMenu }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1F1E1C]/10 bg-[#F6F3EE]/75 backdrop-blur-md">
      <Container className="grid h-16 grid-cols-[1fr_auto] items-center lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
        <button
          type="button"
          onClick={() => onNav('top')}
          className="rk-serif justify-self-start text-[19px] font-medium uppercase tracking-[0.2em] sm:text-[22px]"
          aria-label="РУСЫКОСЫ — на главную"
        >
          Русыкосы
        </button>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Основная навигация">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => onNav(n.id)}
              className="rk-link pb-0.5 text-[13px] font-normal text-[#1F1E1C]/80 transition-colors hover:text-[#1F1E1C]"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-4 sm:gap-7">
          <button
            type="button"
            onClick={onInStock}
            className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#1F1E1C]/80 transition-colors hover:text-[#1F1E1C] sm:inline-flex"
          >
            <Dot />
            <span className="rk-link pb-0.5">В наличии</span>
          </button>
          <button
            type="button"
            onClick={onCart}
            className="rk-link pb-0.5 text-[13px] font-normal"
            aria-label={`Корзина, товаров: ${count}`}
          >
            Корзина (
            <span key={count} className={cx(count > 0 && 'rk-bump text-[#B83B2A]')}>
              {count}
            </span>
            )
          </button>
          <button
            type="button"
            onClick={onToggleMenu}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
          </button>
        </div>
      </Container>
    </header>
  );
}

function MobileMenu({ open, onNav, onInStock }) {
  const { mounted, visible } = usePresence(open, 450);
  if (!mounted) return null;
  return (
    <div
      className={cx(
        'fixed inset-0 z-40 flex flex-col bg-[#F6F3EE] pt-16 transition-opacity duration-500 lg:hidden',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <Container className="flex flex-1 flex-col justify-between overflow-y-auto pb-24 pt-10">
        <nav className="flex flex-col" aria-label="Мобильная навигация">
          {NAV.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => onNav(n.id)}
              className={cx(
                'flex items-baseline justify-between border-b border-[#1F1E1C]/12 py-5 text-left transition-all duration-700',
                EASE,
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              )}
              style={{ transitionDelay: `${80 + i * 60}ms` }}
            >
              <span className="rk-serif text-[40px] font-light leading-none">{n.label}</span>
              <span className="text-[11px] tracking-[0.16em] text-[#6E685F]">0{i + 1}</span>
            </button>
          ))}
        </nav>
        <div className="mt-12 flex flex-col gap-5">
          <button
            type="button"
            onClick={onInStock}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]"
          >
            <Dot /> Смотреть изделия в наличии
          </button>
          <a href={LINKS.telegram} target="_blank" rel="noreferrer" className="text-[13px] text-[#6E685F]">
            Telegram · {LINKS.instagramHandle}
          </a>
        </div>
      </Container>
    </div>
  );
}

/* ============================================================================
   ПЕРВЫЙ ЭКРАН
   ========================================================================== */
function Hero({ onCatalog, onStory, onOpenFeatured }) {
  const trust = ['100% ручная лепка', 'Показано на ТНТ', 'Коллаборации с музеями', 'Доставка СДЭК по всей России'];
  return (
    <section id="top" className="relative">
      <Container>
        <div className="grid items-center gap-14 pb-16 pt-12 sm:pt-16 lg:min-h-[calc(90vh-5rem)] lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-6">
            <div className="rk-fade" style={{ animationDelay: '80ms' }}>
              <Eyebrow>Авторская керамика · Москва</Eyebrow>
            </div>
            <h1
              className="rk-fade mt-7 text-[44px] font-light leading-[1.05] tracking-[-0.015em] sm:text-[60px] lg:text-[68px] xl:text-[76px]"
              style={{ animationDelay: '180ms' }}
            >
              Посуда, которую не&nbsp;отличить от <em className="font-normal italic">живой берёзы</em>
            </h1>
            <p
              className="rk-fade mt-8 max-w-[31rem] text-[15px] font-light leading-[1.75] text-[#6E685F] sm:text-[16px]"
              style={{ animationDelay: '300ms' }}
            >
              Каждая трещинка коры вылеплена и расписана вручную. Штучные изделия в единственном экземпляре для
              дома, подарков и ресторанов.
            </p>
            <div
              className="rk-fade mt-11 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-9"
              style={{ animationDelay: '420ms' }}
            >
              <PrimaryButton onClick={onCatalog}>
                Смотреть наличие
                <ArrowRight size={15} strokeWidth={1.25} className="transition-transform duration-500 group-hover:translate-x-1" />
              </PrimaryButton>
              <button
                type="button"
                onClick={onStory}
                className="group inline-flex items-center gap-2 text-[13px] text-[#1F1E1C]"
              >
                <span className="rk-link pb-0.5">История мастерской</span>
                <ArrowRight size={15} strokeWidth={1.25} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="rk-fade lg:col-span-5 lg:col-start-8" style={{ animationDelay: '260ms' }}>
            <figure className="relative">
              <span className="pointer-events-none absolute -left-10 top-1/2 hidden origin-center -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10px] uppercase tracking-[0.24em] text-[#6E685F] xl:block">
                Глина · ангобы · глазурь
              </span>
              <button
                type="button"
                onClick={onOpenFeatured}
                className="group block w-full border border-[#1F1E1C]/10 bg-[#ECE7DF] p-3 text-left sm:p-5 lg:p-6"
                aria-label="Открыть: Кружка-берёза с божьей коровкой"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#E3DDD3]">
                  <img
                    src={IMAGES.hero}
                    alt="Кружка-берёза с божьей коровкой"
                    className={cx('h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-[1.035]', EASE)}
                    fetchPriority="high"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-[#1F1E1C]/12 pt-3 sm:mt-5">
                  <span className="text-[10px] uppercase leading-[1.6] tracking-[0.16em] text-[#1F1E1C] sm:text-[11px]">
                    № 014 / Кружка-берёза с божьей коровкой · 320 мл
                  </span>
                  <span className="rk-serif shrink-0 text-[15px] italic text-[#6E685F]">2026</span>
                </figcaption>
              </button>
            </figure>
          </div>
        </div>

        <div className="border-t border-[#1F1E1C]/12 py-6">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.16em] text-[#6E685F] md:flex md:flex-wrap md:items-center md:justify-between">
            {trust.map((t, i) => (
              <li key={t} className="flex items-center gap-6">
                <span>{t}</span>
                {i < trust.length - 1 && <span aria-hidden className="hidden text-[#1F1E1C]/25 md:inline">·</span>}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   КАТАЛОГ
   ========================================================================== */
function ProductCard({ product, onOpen, index }) {
  return (
    <Reveal as="article" delay={(index % 3) * 110}>
      <button type="button" onClick={() => onOpen(product)} className="group block w-full text-left">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-[#ECE7DF]">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className={cx('h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.045]', EASE)}
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-[2px] bg-[#F6F3EE]/90 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#1F1E1C] backdrop-blur-sm">
            {product.inStock && <Dot />}
            {product.badge}
          </span>
          <span
            className={cx(
              'absolute inset-x-3 bottom-3 hidden translate-y-3 items-center justify-between rounded-[2px] bg-[#F6F3EE]/92 px-4 py-3 text-[11px] uppercase tracking-[0.16em] opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:flex',
              EASE,
            )}
          >
            Быстрый просмотр
            <ArrowUpRight size={14} strokeWidth={1.25} />
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">
              {product.num} · {CATEGORIES[product.category]}
            </p>
            <h3 className="mt-2 text-[22px] font-normal leading-[1.15] transition-colors duration-300 group-hover:text-[#263328]">
              {product.title}
            </h3>
            <p className="mt-1.5 text-[13px] font-light text-[#6E685F]">{product.spec}</p>
          </div>
          <p className="shrink-0 whitespace-nowrap pt-[26px] text-[14px] font-normal">{rub(product.price)}</p>
        </div>
      </button>
    </Reveal>
  );
}

function Catalog({ filter, setFilter, onOpen }) {
  const list = useMemo(() => PRODUCTS.filter((p) => matchFilter(p, filter)), [filter]);
  return (
    <section id="catalog" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-10 border-b border-[#1F1E1C]/12 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow>01 — Каталог</Eyebrow>
            <h2 className="mt-5 text-[40px] font-light leading-[1.05] tracking-[-0.01em] sm:text-[52px] lg:text-[60px]">
              Наличие <em className="font-normal italic">и под заказ</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div
              role="tablist"
              aria-label="Фильтр каталога"
              className="flex flex-wrap items-center gap-x-6 gap-y-3 whitespace-nowrap sm:gap-x-7"
            >
              {FILTERS.map((f) => {
                const active = filter === f.id;
                const n = PRODUCTS.filter((p) => matchFilter(p, f.id)).length;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.id)}
                    className={cx(
                      'rk-link inline-flex items-center gap-2 pb-1 text-[13px] transition-colors duration-300',
                      active ? 'is-active text-[#1F1E1C]' : 'text-[#6E685F] hover:text-[#1F1E1C]',
                    )}
                  >
                    {f.dot && <Dot />}
                    {f.label}
                    <sup className="text-[9px] text-[#6E685F]">{n}</sup>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="flex items-center justify-between py-5 text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">
          <span>
            {list.length} {plural(list.length, ['изделие', 'изделия', 'изделий'])}
          </span>
          <span className="hidden sm:inline">Каждое — в единственном экземпляре</span>
        </div>

        <div key={filter} className="mt-6 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} />
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-[#1F1E1C]/12 pt-8 sm:flex-row sm:items-center">
          <p className="rk-serif max-w-xl text-[24px] font-light italic leading-[1.3] text-[#1F1E1C]">
            Не нашли свою берёзку? Повторю любимую форму под заказ — с вашей божьей коровкой.
          </p>
          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 text-[13px]"
          >
            <span className="rk-link pb-0.5">Написать Лизе</span>
            <ArrowUpRight size={15} strokeWidth={1.25} />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================================
   БЫСТРЫЙ ПРОСМОТР ТОВАРА
   ========================================================================== */
function QuickView({ product, open, onClose, onAdd, qtyInCart, onOpenCart }) {
  const { mounted, visible } = usePresence(open, 500);
  const [img, setImg] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    setImg(0);
    setJustAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (visible) closeRef.current?.focus({ preventScroll: true });
  }, [visible]);

  useEffect(() => {
    if (!justAdded) return undefined;
    const t = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(t);
  }, [justAdded]);

  if (!mounted || !product) return null;
  const atMax = qtyInCart >= product.max;

  const handleAdd = () => {
    if (atMax) {
      onOpenCart();
      return;
    }
    onAdd(product.id);
    setJustAdded(true);
  };

  const rows = [
    ['Размер', product.size],
    ['Материал', product.spec.split(' · ')[1] || 'Керамика'],
    ['Техника', 'Ручная лепка, роспись ангобами, два обжига'],
    ['Статус', product.inStock ? product.badge : 'Изготовление под заказ · около 14 дней'],
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center md:items-center md:p-8">
      <div
        className={cx('absolute inset-0 bg-[#1F1E1C]/45 backdrop-blur-[3px] transition-opacity duration-500', visible ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        className={cx(
          'relative max-h-[94vh] w-full overflow-y-auto rounded-t-[6px] bg-[#F6F3EE] transition-all duration-500 md:max-h-[88vh] md:max-w-[1080px] md:rounded-[2px]',
          EASE,
          visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F3EE]/85 backdrop-blur-sm transition-colors hover:bg-[#ECE7DF] md:right-5 md:top-5"
          aria-label="Закрыть"
        >
          <X size={18} strokeWidth={1.25} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="self-start bg-[#ECE7DF] p-4 sm:p-6 md:sticky md:top-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] md:aspect-[3/4]">
              {product.images.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`${product.title} — фото ${i + 1}`}
                  className={cx(
                    'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
                    img === i ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setImg(i)}
                    className={cx(
                      'h-[68px] w-[54px] overflow-hidden rounded-[2px] border transition-all duration-300',
                      img === i ? 'border-[#1F1E1C]' : 'border-transparent opacity-60 hover:opacity-100',
                    )}
                    aria-label={`Фото ${i + 1}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">
                0{img + 1} / 0{product.images.length}
              </span>
            </div>
          </div>

          <div className="flex flex-col p-6 pb-10 sm:p-10">
            <Eyebrow>
              {product.num} · {CATEGORIES[product.category]}
            </Eyebrow>
            <h3 className="mt-4 pr-10 text-[34px] font-light leading-[1.05] sm:text-[42px]">{product.title}</h3>

            <div className="mt-6 flex items-center justify-between border-y border-[#1F1E1C]/12 py-4">
              <span className="text-[20px] font-normal">{rub(product.price)}</span>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#1F1E1C]">
                {product.inStock ? <Dot /> : <span className="inline-block h-[6px] w-[6px] rounded-full border border-[#1F1E1C]/50" />}
                {product.badge}
              </span>
            </div>

            <p className="mt-6 text-[15px] font-light leading-[1.75] text-[#1F1E1C]/85">{product.description}</p>

            <dl className="mt-8 border-t border-[#1F1E1C]/12">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 border-b border-[#1F1E1C]/12 py-3 text-[13px]">
                  <dt className="text-[#6E685F]">{k}</dt>
                  <dd className="font-light">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex gap-4 rounded-[2px] bg-[#ECE7DF]/80 p-5">
              {product.dishwasher ? (
                <Droplets size={20} strokeWidth={1.1} className="mt-0.5 shrink-0 text-[#263328]" />
              ) : (
                <Hand size={20} strokeWidth={1.1} className="mt-0.5 shrink-0 text-[#263328]" />
              )}
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em]">
                  {product.dishwasher ? 'Можно мыть в посудомойке' : 'Бережный ручной уход'}
                </p>
                <p className="mt-2 text-[13px] font-light leading-[1.65] text-[#6E685F]">
                  {product.dishwasher
                    ? 'Пищевая глазурь без свинца. Избегайте резких перепадов температур — не ставьте из морозилки сразу в горячую воду.'
                    : 'Протирайте мягкой влажной тканью или мойте тёплой водой без абразивов. Роспись любит деликатность.'}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <PrimaryButton onClick={handleAdd} className="w-full">
                {justAdded ? (
                  <>
                    Добавлено в корзину <Check size={15} strokeWidth={1.5} />
                  </>
                ) : atMax ? (
                  <>
                    Уже в корзине · перейти <ArrowRight size={15} strokeWidth={1.25} />
                  </>
                ) : product.inStock ? (
                  'Добавить в корзину'
                ) : (
                  'Заказать · 14 дней'
                )}
              </PrimaryButton>
              <p className="mt-4 text-center text-[12px] font-light text-[#6E685F]">
                Упаковка в крафт и бумажную стружку · отправка за 1–3 дня
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   КОРЗИНА
   ========================================================================== */
function CartDrawer({ open, onClose, items, setQty, remove, onCheckout, done, onBrowse }) {
  const { mounted, visible } = usePresence(open, 550);
  const [delivery, setDelivery] = useState('cdek');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const subtotal = items.reduce((s, it) => s + PRODUCT_MAP[it.id].price * it.qty, 0);
  const count = items.reduce((s, it) => s + it.qty, 0);
  const shipping = delivery === 'cdek' ? (subtotal >= FREE_SHIPPING_FROM ? 0 : CDEK_PRICE) : 0;
  const total = subtotal + shipping;
  const leftForFree = Math.max(0, FREE_SHIPPING_FROM - subtotal);

  if (!mounted) return null;

  const submit = () => {
    if (contact.trim().length < 4) {
      setError('Оставьте Telegram или телефон — Лиза напишет, чтобы подтвердить заказ');
      return;
    }
    setError('');
    onCheckout({ total, delivery });
    setContact('');
  };

  const options = [
    {
      id: 'cdek',
      title: 'СДЭК по всей России',
      note: '2–6 дней до пункта выдачи',
      price: subtotal >= FREE_SHIPPING_FROM ? 'Бесплатно' : rub(CDEK_PRICE),
    },
    { id: 'pickup', title: 'Самовывоз в Москве', note: 'Из мастерской, по договорённости', price: 'Бесплатно' },
  ];

  return (
    <div className="fixed inset-0 z-[10000]">
      <div
        className={cx('absolute inset-0 bg-[#1F1E1C]/40 backdrop-blur-[2px] transition-opacity duration-500', visible ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className={cx(
          'absolute right-0 top-0 flex h-full w-full flex-col bg-[#F6F3EE] transition-transform duration-[550ms] sm:max-w-[460px] sm:border-l sm:border-[#1F1E1C]/10',
          EASE,
          visible ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#1F1E1C]/12 px-6 sm:px-8 lg:h-20">
          <div className="flex items-baseline gap-3">
            <h3 className="text-[28px] font-light leading-none">Корзина</h3>
            {count > 0 && !done && (
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">
                {count} {plural(count, ['изделие', 'изделия', 'изделий'])}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#ECE7DF]"
            aria-label="Закрыть корзину"
          >
            <X size={18} strokeWidth={1.25} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-1 flex-col items-start justify-center px-6 sm:px-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1F1E1C]/20">
              <Check size={20} strokeWidth={1.25} />
            </span>
            <h4 className="mt-8 text-[38px] font-light leading-[1.05]">
              Спасибо, <em className="italic">заказ принят</em>
            </h4>
            <p className="mt-5 text-[14px] font-light leading-[1.7] text-[#6E685F]">
              Заказ {done.number} на сумму {rub(done.total)}. Лиза напишет вам в течение дня, чтобы подтвердить детали
              и {done.delivery === 'cdek' ? 'отправить посылку СДЭК' : 'договориться о самовывозе'}.
            </p>
            <button type="button" onClick={onBrowse} className="group mt-10 inline-flex items-center gap-2 text-[13px]">
              <span className="rk-link pb-0.5">Вернуться в каталог</span>
              <ArrowRight size={15} strokeWidth={1.25} />
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-6 sm:px-8">
            <Eyebrow>Корзина пуста</Eyebrow>
            <h4 className="mt-5 text-[38px] font-light italic leading-[1.05]">Пока здесь только лесная тишина</h4>
            <p className="mt-5 max-w-sm text-[14px] font-light leading-[1.7] text-[#6E685F]">
              Загляните в наличие — изделия существуют в единственном экземпляре и быстро находят своих хозяев.
            </p>
            <PrimaryButton onClick={onBrowse} className="mt-10">
              Смотреть наличие
            </PrimaryButton>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 sm:px-8">
              {delivery === 'cdek' && (
                <div className="border-b border-[#1F1E1C]/12 py-5">
                  <p className="text-[12px] font-light text-[#6E685F]">
                    {leftForFree > 0 ? (
                      <>
                        До бесплатной доставки СДЭК — <span className="text-[#1F1E1C]">{rub(leftForFree)}</span>
                      </>
                    ) : (
                      <span className="text-[#1F1E1C]">Доставка СДЭК — в подарок от мастерской</span>
                    )}
                  </p>
                  <div className="mt-3 h-px w-full bg-[#1F1E1C]/12">
                    <div
                      className={cx('h-px bg-[#1F1E1C] transition-all duration-700', EASE)}
                      style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <ul>
                {items.map((it) => {
                  const p = PRODUCT_MAP[it.id];
                  const atMax = it.qty >= p.max;
                  return (
                    <li key={it.id} className="flex gap-4 border-b border-[#1F1E1C]/12 py-6">
                      <img src={p.images[0]} alt={p.title} className="h-[104px] w-20 shrink-0 rounded-[2px] object-cover" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-[19px] font-normal leading-[1.15]">{p.title}</h4>
                          <span className="shrink-0 whitespace-nowrap text-[14px]">{rub(p.price * it.qty)}</span>
                        </div>
                        <p className="mt-1 text-[12px] font-light text-[#6E685F]">{p.badge}</p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="inline-flex h-9 items-center rounded-full border border-[#1F1E1C]/15">
                            <button
                              type="button"
                              onClick={() => setQty(it.id, it.qty - 1)}
                              disabled={it.qty <= 1}
                              className="inline-flex h-9 w-9 items-center justify-center transition-opacity disabled:opacity-25"
                              aria-label="Уменьшить количество"
                            >
                              <Minus size={13} strokeWidth={1.25} />
                            </button>
                            <span className="w-6 text-center text-[13px] tabular-nums">{it.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(it.id, it.qty + 1)}
                              disabled={atMax}
                              className="inline-flex h-9 w-9 items-center justify-center transition-opacity disabled:opacity-25"
                              aria-label="Увеличить количество"
                            >
                              <Plus size={13} strokeWidth={1.25} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(it.id)}
                            className="text-[11px] uppercase tracking-[0.16em] text-[#6E685F] transition-colors hover:text-[#1F1E1C]"
                          >
                            Удалить
                          </button>
                        </div>
                        {atMax && (
                          <p className="mt-2 text-[11px] font-light text-[#6E685F]">
                            {p.max === 1 ? 'Единственный экземпляр' : `Доступно не больше ${p.max} шт.`}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <fieldset className="py-7">
                <legend className="text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">Доставка</legend>
                <div className="mt-4 flex flex-col gap-3">
                  {options.map((o) => {
                    const active = delivery === o.id;
                    return (
                      <label
                        key={o.id}
                        className={cx(
                          'flex cursor-pointer items-center gap-4 rounded-[2px] border px-4 py-4 transition-colors duration-300',
                          active ? 'border-[#1F1E1C]/70 bg-[#ECE7DF]/60' : 'border-[#1F1E1C]/12 hover:border-[#1F1E1C]/30',
                        )}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          value={o.id}
                          checked={active}
                          onChange={() => setDelivery(o.id)}
                          className="sr-only"
                        />
                        <span
                          className={cx(
                            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                            active ? 'border-[#1F1E1C]' : 'border-[#1F1E1C]/30',
                          )}
                        >
                          {active && <span className="h-2 w-2 rounded-full bg-[#1F1E1C]" />}
                        </span>
                        <span className="flex-1">
                          <span className="block text-[14px]">{o.title}</span>
                          <span className="mt-0.5 block text-[12px] font-light text-[#6E685F]">{o.note}</span>
                        </span>
                        <span className="text-[13px]">{o.price}</span>
                      </label>
                    );
                  })}
                </div>

                <label className="mt-7 block">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">Как с вами связаться</span>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="@telegram или +7 …"
                    className="mt-2 w-full border-0 border-b border-[#1F1E1C]/25 bg-transparent px-0 py-3 text-[15px] font-light outline-none transition-colors placeholder:text-[#6E685F]/70 focus:border-[#1F1E1C]"
                  />
                </label>
              </fieldset>
            </div>

            <div className="shrink-0 border-t border-[#1F1E1C]/12 bg-[#ECE7DF]/50 px-6 pb-7 pt-5 sm:px-8">
              <dl className="space-y-2 text-[13px]">
                <div className="flex justify-between text-[#6E685F]">
                  <dt>Изделия</dt>
                  <dd>{rub(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-[#6E685F]">
                  <dt>Доставка</dt>
                  <dd>{shipping === 0 ? 'Бесплатно' : rub(shipping)}</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-[#1F1E1C]/12 pt-3">
                  <dt className="text-[11px] uppercase tracking-[0.16em]">Итого</dt>
                  <dd className="rk-serif text-[30px] font-normal leading-none">{rub(total)}</dd>
                </div>
              </dl>
              {error && <p className="rk-fade mt-4 text-[12px] leading-[1.5] text-[#B83B2A]">{error}</p>}
              <PrimaryButton onClick={submit} className="mt-5 w-full">
                Оформить заказ
                <ArrowRight size={15} strokeWidth={1.25} className="transition-transform duration-500 group-hover:translate-x-1" />
              </PrimaryButton>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ============================================================================
   О МАСТЕРЕ
   ========================================================================== */
function About() {
  const facts = [
    ['Лепка', 'Только вручную, без форм'],
    ['Обжиг', 'Дважды, до 1 240 °C'],
    ['Упаковка', 'С запиской от руки'],
  ];
  return (
    <section id="about" className="border-t border-[#1F1E1C]/12 py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#ECE7DF]">
            <img src={IMAGES.master} alt="Лиза за работой в мастерской" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-10 right-4 hidden w-[38%] bg-[#F6F3EE] p-2 sm:block lg:-right-10">
            <div className="aspect-square overflow-hidden rounded-[2px]">
              <img src={IMAGES.masterDetail} alt="Инструменты керамиста" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">Мастерская · Москва</p>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
          <Reveal>
            <Eyebrow>02 — О мастере</Eyebrow>
            <h2 className="mt-5 text-[40px] font-light leading-[1.05] tracking-[-0.01em] sm:text-[52px] lg:text-[58px]">
              От комочка глины до <em className="font-normal italic">последнего обжига</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 space-y-6 text-[15px] font-light leading-[1.8] text-[#1F1E1C]/85 sm:text-[16px]">
            <p>
              Меня зовут Лиза, и всё, что вы видите на этом сайте, я делаю сама. Сама выбираю глину, леплю каждую
              берестинку, прорисовываю чечевички и трещинки коры — так, чтобы кружку хотелось погладить, как ствол
              настоящей берёзы.
            </p>
            <p>
              Ни одна вещь не повторяется: у каждой своя кора, свой изгиб и свой характер. После двух обжигов я сама
              заворачиваю изделие в бумагу, кладу записку и отношу посылку в СДЭК. Никаких складов и конвейеров —
              только мастерская, печь и я.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="rk-serif mt-8 text-[26px] font-light italic">— Лиза, РУСЫКОСЫ</p>
          </Reveal>

          <Reveal delay={220} className="mt-12 grid grid-cols-3 border-y border-[#1F1E1C]/12">
            {facts.map(([k, v], i) => (
              <div key={k} className={cx('py-5 pr-3', i > 0 && 'border-l border-[#1F1E1C]/12 pl-4')}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">{k}</p>
                <p className="mt-2 text-[13px] font-light leading-[1.45]">{v}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={260} className="mt-10 flex gap-4 rounded-[2px] border border-[#1F1E1C]/15 p-5 sm:p-6">
            <Heart size={18} strokeWidth={1.1} className="mt-0.5 shrink-0 text-[#1F1E1C]" />
            <p className="text-[13px] font-light leading-[1.7] text-[#6E685F]">
              Часть средств и внимания мастерской направляется на поддержку приюта для животных. Спасибо, что
              каждая берёзка помогает кому-то хвостатому найти свой дом.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   ДЛЯ РЕСТОРАНОВ И МУЗЕЕВ
   ========================================================================== */
function Horeca({ onContact }) {
  const cols = [
    ['01', 'Индивидуальные формы', 'Разрабатываю посуду под меню и интерьер: от кружек для кофейни до подачи фирменного блюда на «срезе берёзы».'],
    ['02', 'Износостойкая глазурь для HoReCa', 'Высокотемпературный обжиг и плотная глазурь выдерживают профессиональные посудомойки и ежедневный сервис.'],
    ['03', 'Тиражи от 15 изделий', 'Небольшие серии для ресторанов, музейных лавок и подарков гостям — каждое изделие всё равно расписано вручную.'],
  ];
  const audience = ['Рестораны русской кухни', 'Кофейни', 'Концепт-сторы', 'Музейные лавки'];
  return (
    <section id="horeca" className="relative bg-[#263328] py-24 text-[#F6F3EE] md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow light>03 — Русский культурный код для ресторанов и музеев</Eyebrow>
            <h2 className="mt-6 text-[42px] font-light leading-[1.05] tracking-[-0.01em] sm:text-[56px] lg:text-[68px]">
              Спецпроекты для заведений <em className="font-normal italic">с характером</em>
            </h2>
          </Reveal>
          <Reveal delay={140} className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="text-[15px] font-light leading-[1.8] text-[#F6F3EE]/75">
              Создаю уникальную посуду-берёзу под концепцию ресторанов русской кухни, кофеен, концепт-сторов и музейных
              лавок. Берёза — один из самых узнаваемых образов русской культуры, и на столе она становится частью
              истории, которую вы рассказываете гостям.
            </p>
            <div className="mt-9">
              <PrimaryButton light onClick={onContact}>
                Обсудить сотрудничество
                <ArrowRight size={15} strokeWidth={1.25} className="transition-transform duration-500 group-hover:translate-x-1" />
              </PrimaryButton>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE]/55 md:mt-20">
          {audience.map((a, i) => (
            <span key={a} className="flex items-center gap-6">
              {a}
              {i < audience.length - 1 && <span aria-hidden className="text-[#F6F3EE]/25">·</span>}
            </span>
          ))}
        </Reveal>

        <div className="mt-8 grid border-t border-[#F6F3EE]/15 md:grid-cols-3">
          {cols.map(([n, t, d], i) => (
            <Reveal
              key={n}
              delay={i * 120}
              className={cx(
                'border-b border-[#F6F3EE]/15 py-10 md:border-b-0 md:pr-10',
                i > 0 && 'md:border-l md:border-[#F6F3EE]/15 md:pl-10',
              )}
            >
              <p className="rk-serif text-[56px] font-light leading-none text-[#F6F3EE]/35">{n}</p>
              <h3 className="mt-6 text-[26px] font-normal leading-[1.15]">{t}</h3>
              <p className="mt-4 text-[14px] font-light leading-[1.75] text-[#F6F3EE]/65">{d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 md:mt-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] sm:aspect-[16/7]">
            <img src={IMAGES.horeca} alt="Сервировка с авторской керамикой" loading="lazy" className="h-full w-full object-cover saturate-[.85]" />
          </div>
          <div className="mt-4 flex justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE]/55">
            <span>Сервировка для ресторана · пример спецпроекта</span>
            <span className="hidden sm:inline">Срок разработки — от 3 недель</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function HorecaModal({ open, onClose }) {
  const { mounted, visible } = usePresence(open, 500);
  const [form, setForm] = useState({ name: '', place: '', contact: '', type: 'Ресторан', run: '15–30', note: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSent(false);
        setError('');
      }, 600);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  if (!mounted) return null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.contact.trim().length < 4) {
      setError('Пожалуйста, укажите имя и контакт для связи');
      return;
    }
    setError('');
    setSent(true);
  };

  const field =
    'w-full border-0 border-b border-[#F6F3EE]/25 bg-transparent px-0 py-3 text-[15px] font-light text-[#F6F3EE] outline-none transition-colors placeholder:text-[#F6F3EE]/35 focus:border-[#F6F3EE]';
  const chip = (active) =>
    cx(
      'rounded-full border px-4 py-2 text-[12px] transition-colors duration-300',
      active ? 'border-[#F6F3EE] bg-[#F6F3EE] text-[#1F1E1C]' : 'border-[#F6F3EE]/25 text-[#F6F3EE]/80 hover:border-[#F6F3EE]/60',
    );

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center md:items-center md:p-8">
      <div
        className={cx('absolute inset-0 bg-[#1F1E1C]/55 backdrop-blur-[3px] transition-opacity duration-500', visible ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Обсудить сотрудничество"
        className={cx(
          'relative max-h-[94vh] w-full overflow-y-auto rounded-t-[6px] bg-[#263328] p-6 pb-10 text-[#F6F3EE] transition-all duration-500 sm:p-10 md:max-w-[640px] md:rounded-[2px] md:p-12',
          EASE,
          visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#F6F3EE]/10 md:right-5 md:top-5"
          aria-label="Закрыть"
        >
          <X size={18} strokeWidth={1.25} />
        </button>

        {sent ? (
          <div className="py-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#F6F3EE]/30">
              <Check size={20} strokeWidth={1.25} />
            </span>
            <h3 className="mt-8 text-[40px] font-light leading-[1.05]">
              Спасибо, <em className="italic">{form.name.trim().split(' ')[0]}</em>
            </h3>
            <p className="mt-5 max-w-md text-[15px] font-light leading-[1.75] text-[#F6F3EE]/70">
              Лиза изучит запрос для «{form.place.trim() || 'вашего заведения'}» и ответит в течение двух рабочих дней —
              с идеями форм, сроками и примерной стоимостью тиража.
            </p>
            <button type="button" onClick={onClose} className="mt-10 text-[13px]">
              <span className="rk-link pb-0.5">Закрыть</span>
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <Eyebrow light>Спецпроекты · HoReCa</Eyebrow>
            <h3 className="mt-4 pr-10 text-[36px] font-light leading-[1.05] sm:text-[44px]">
              Расскажите <em className="italic">о вашем месте</em>
            </h3>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <input className={field} placeholder="Ваше имя *" value={form.name} onChange={set('name')} />
              <input className={field} placeholder="Заведение / проект" value={form.place} onChange={set('place')} />
              <input className={cx(field, 'sm:col-span-2')} placeholder="Telegram или телефон *" value={form.contact} onChange={set('contact')} />
            </div>

            <p className="mt-9 text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE]/55">Формат</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Ресторан', 'Кофейня', 'Музейная лавка', 'Концепт-стор', 'Другое'].map((t) => (
                <button key={t} type="button" onClick={() => set('type')(t)} className={chip(form.type === t)}>
                  {t}
                </button>
              ))}
            </div>

            <p className="mt-7 text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE]/55">Тираж</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['15–30', '30–100', '100+'].map((t) => (
                <button key={t} type="button" onClick={() => set('run')(t)} className={chip(form.run === t)}>
                  {t} изделий
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              className={cx(field, 'mt-8 resize-none')}
              placeholder="Пара слов о концепции и сроках"
              value={form.note}
              onChange={set('note')}
            />

            {error && <p className="mt-4 text-[12px] text-[#F0A397]">{error}</p>}

            <PrimaryButton light type="submit" className="mt-9 w-full sm:w-auto">
              Отправить запрос
              <ArrowRight size={15} strokeWidth={1.25} className="transition-transform duration-500 group-hover:translate-x-1" />
            </PrimaryButton>
          </form>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   АФИША
   ========================================================================== */
const BARCODE = [1, 2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 1, 2, 1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 1, 2];

function Events() {
  const meta = [
    ['Где', 'Москва, Хлебозавод'],
    ['Что', 'Маркет Flowwow'],
    ['Когда', 'Сб — Вс, 19–20 декабря'],
  ];
  return (
    <section id="events" className="py-24 md:py-32">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>04 — Афиша</Eyebrow>
            <h2 className="mt-5 text-[40px] font-light leading-[1.05] tracking-[-0.01em] sm:text-[52px] lg:text-[60px]">
              Живые встречи <em className="font-normal italic">и маркеты</em>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] font-light leading-[1.7] text-[#6E685F]">
            Несколько раз в год мастерская выезжает на маркеты — с изделиями, которых нет на сайте.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="relative mt-14 grid overflow-hidden rounded-[2px] border border-[#1F1E1C]/15 md:mt-20 md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]"
        >
          {/* корешок билета */}
          <div className="relative flex flex-col justify-between gap-10 border-b border-dashed border-[#1F1E1C]/25 p-7 sm:p-10 md:border-b-0 md:border-r lg:p-14">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">
              <span>Ближайшее событие</span>
              <span>№ 1219</span>
            </div>
            <div>
              <p className="rk-serif text-[96px] font-light leading-[0.85] tracking-[-0.03em] sm:text-[124px] lg:text-[148px]">19–20</p>
              <p className="mt-5 text-[12px] uppercase tracking-[0.3em]">Декабря · 2026</p>
            </div>
            <div className="flex h-9 items-end gap-[3px] opacity-70" aria-hidden>
              {BARCODE.map((w, i) => (
                <span key={i} className="h-full bg-[#1F1E1C]" style={{ width: `${w}px` }} />
              ))}
            </div>
            {/* вырезы-перфорация */}
            <span aria-hidden className="absolute -right-[11px] -top-[11px] hidden h-[22px] w-[22px] rounded-full border border-[#1F1E1C]/15 bg-[#F6F3EE] md:block" />
            <span aria-hidden className="absolute -bottom-[11px] -right-[11px] hidden h-[22px] w-[22px] rounded-full border border-[#1F1E1C]/15 bg-[#F6F3EE] md:block" />
            <span aria-hidden className="absolute -bottom-[11px] -left-[11px] h-[22px] w-[22px] rounded-full border border-[#1F1E1C]/15 bg-[#F6F3EE] md:hidden" />
            <span aria-hidden className="absolute -bottom-[11px] -right-[11px] h-[22px] w-[22px] rounded-full border border-[#1F1E1C]/15 bg-[#F6F3EE] md:hidden" />
          </div>

          {/* основная часть */}
          <div className="flex flex-col p-7 sm:p-10 lg:p-14">
            <dl className="grid gap-5 border-b border-[#1F1E1C]/12 pb-8 sm:grid-cols-3">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">{k}</dt>
                  <dd className="mt-2 text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="rk-serif mt-10 text-[26px] font-light italic leading-[1.3] sm:text-[32px]">
              «Приходите подержать берёзки в руках, выбрать подарки к Новому году и познакомиться лично»
            </p>
            <p className="mt-4 flex items-center gap-2 text-[13px] font-light text-[#6E685F]">
              <MapPin size={14} strokeWidth={1.25} /> Новодмитровская ул., 1 · стенд мастерской РУСЫКОСЫ
            </p>
            <div className="mt-auto flex flex-col items-start gap-5 pt-12 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#1F1E1C] px-8 py-4 text-[13px] text-[#F6F3EE] transition-colors duration-500 hover:bg-[#263328]"
              >
                <Send size={14} strokeWidth={1.25} />
                Перейти в Telegram-канал
                <ArrowUpRight size={14} strokeWidth={1.25} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="text-[12px] font-light text-[#6E685F]">Вход свободный</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================================
   КЛУБ И КУРСЫ
   ========================================================================== */
function Club() {
  const [value, setValue] = useState('');
  const [state, setState] = useState('idle'); // idle | error | done

  const submit = (e) => {
    e.preventDefault();
    const v = value.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isTg = /^@?[a-zA-Z0-9_]{4,32}$/.test(v) || /t\.me\//.test(v);
    if (!isEmail && !isTg) {
      setState('error');
      return;
    }
    setState('done');
  };

  const perks = ['Видеоуроки лепки коры', 'Живые эфиры из мастерской', 'Закрытый чат для своих'];

  return (
    <section id="club" className="bg-[#ECE7DF] py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">
            <span className="h-px w-8 bg-[#1F1E1C]/25" /> Скоро · 05 — Клуб <span className="h-px w-8 bg-[#1F1E1C]/25" />
          </p>
          <h2 className="mx-auto mt-6 max-w-[860px] text-[40px] font-light leading-[1.05] tracking-[-0.01em] sm:text-[56px] lg:text-[66px]">
            Лепим вместе: закрытый клуб и <em className="font-normal italic">онлайн-курсы</em>
          </h2>
          <p className="mx-auto mt-7 max-w-[34rem] text-[15px] font-light leading-[1.8] text-[#6E685F]">
            Покажу, как из комочка глины появляется кора с трещинками, как подбирать ангобы и не бояться обжига.
            Первыми об открытии узнают те, кто оставит контакт.
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-12 w-full max-w-[520px]">
          {state === 'done' ? (
            <div className="rk-fade flex flex-col items-center gap-3 border-b border-[#1F1E1C]/25 py-4">
              <p className="rk-serif inline-flex items-center gap-3 text-[30px] font-light italic">
                Вы в списке <Check size={22} strokeWidth={1.25} />
              </p>
              <p className="text-[12px] font-light text-[#6E685F]">Напишу вам за неделю до старта — с ранней ценой.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-end">
              <label className="flex-1 text-left">
                <span className="sr-only">Telegram или Email</span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (state === 'error') setState('idle');
                  }}
                  placeholder="@telegram или email"
                  className={cx(
                    'w-full border-0 border-b bg-transparent px-0 py-3 text-[16px] font-light outline-none transition-colors placeholder:text-[#6E685F]/70',
                    state === 'error' ? 'border-[#B83B2A]' : 'border-[#1F1E1C]/30 focus:border-[#1F1E1C]',
                  )}
                />
              </label>
              <PrimaryButton type="submit" className="shrink-0">
                Узнать об открытии первой
              </PrimaryButton>
            </form>
          )}
          {state === 'error' && (
            <p className="mt-3 text-left text-[12px] text-[#B83B2A]">Укажите @ник в Telegram или адрес почты</p>
          )}
        </Reveal>

        <Reveal delay={200} className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.16em] text-[#6E685F]">
          {perks.map((p, i) => (
            <span key={p} className="flex items-center gap-8">
              {p}
              {i < perks.length - 1 && <span aria-hidden className="hidden text-[#1F1E1C]/25 sm:inline">·</span>}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================================
   ФУТЕР
   ========================================================================== */
function Footer({ onNav, onInfo }) {
  const buyers = ['Доставка СДЭК', 'Уход за керамикой', 'Оплата'];
  const colTitle = 'text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE]/50';
  const linkCls = 'rk-link pb-0.5 text-left text-[14px] font-light text-[#F6F3EE]/85 transition-colors hover:text-[#F6F3EE]';
  return (
    <footer className="overflow-hidden bg-[#263328] text-[#F6F3EE]">
      <Container className="grid gap-14 pb-16 pt-20 md:grid-cols-12 md:gap-8 md:pt-24">
        <div className="md:col-span-4">
          <p className="rk-serif text-[22px] font-medium uppercase tracking-[0.2em]">Русыкосы</p>
          <p className="mt-5 max-w-xs text-[14px] font-light leading-[1.75] text-[#F6F3EE]/60">
            Авторская керамика ручной работы из Москвы. Каждая берёзка — в единственном экземпляре.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8">
          <div>
            <p className={colTitle}>Навигация</p>
            <ul className="mt-5 flex flex-col items-start gap-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => onNav(n.id)} className={linkCls}>
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={colTitle}>Покупателям</p>
            <ul className="mt-5 flex flex-col items-start gap-3">
              {buyers.map((b) => (
                <li key={b}>
                  <button type="button" onClick={() => onInfo(b)} className={linkCls}>
                    {b}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className={colTitle}>Контакты</p>
            <ul className="mt-5 flex flex-col items-start gap-3 text-[14px] font-light text-[#F6F3EE]/85">
              <li className="flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.25} /> Москва
              </li>
              <li>
                <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="rk-link inline-flex items-center gap-2 pb-0.5">
                  <AtSign size={14} strokeWidth={1.25} /> {LINKS.instagramHandle.replace('@', '')}
                </a>
              </li>
              <li>
                <a href={LINKS.telegram} target="_blank" rel="noreferrer" className="rk-link inline-flex items-center gap-2 pb-0.5">
                  <Send size={14} strokeWidth={1.25} /> Telegram-канал
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-[#F6F3EE]/12">
        <div
          aria-hidden
          className="rk-serif select-none whitespace-nowrap pt-6 text-center text-[16.5vw] font-light uppercase leading-[0.8] tracking-[0.02em] text-[#F6F3EE]/[0.09]"
        >
          Русыкосы
        </div>
      </div>

      <Container className="flex flex-col gap-2 border-t border-[#F6F3EE]/12 pb-24 pt-6 text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE]/45 sm:flex-row sm:justify-between">
        <span>© 2026 РУСЫКОСЫ · Все изделия сделаны вручную</span>
        <span>Москва · с любовью к берёзам</span>
      </Container>
    </footer>
  );
}

/* ============================================================================
   ТОСТ
   ========================================================================== */
function Toast({ toast }) {
  const { mounted, visible } = usePresence(Boolean(toast), 400);
  const [last, setLast] = useState(toast);
  useEffect(() => {
    if (toast) setLast(toast);
  }, [toast]);
  if (!mounted || !last) return null;
  return (
    <div
      role="status"
      className={cx(
        'fixed bottom-20 left-1/2 z-[10002] flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-[#1F1E1C] px-5 py-3 text-[12px] text-[#F6F3EE] transition-all duration-500',
        EASE,
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
      )}
    >
      <Dot /> {last.msg}
    </div>
  );
}

/* ============================================================================
   СТРАНИЦА
   ========================================================================== */
export default function DemoCeramics() {
  const [filter, setFilter] = useState('all');
  const [cart, setCart] = useState([]); // [{ id, qty }]
  const [cartOpen, setCartOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(null);
  const [quick, setQuick] = useState(null);
  const [quickOpen, setQuickOpen] = useState(false);
  const [horecaOpen, setHorecaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  /* Шрифты, заголовок вкладки, цвет фона браузера */
  useEffect(() => {
    const id = 'rk-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Manrope:wght@300;400;500&display=swap';
      document.head.appendChild(link);
    }
    const prevTitle = document.title;
    document.title = 'РУСЫКОСЫ — авторская керамика-берёза ручной работы';
    const html = document.documentElement;
    const prevHtmlBg = html.style.backgroundColor;
    const prevBodyBg = document.body.style.backgroundColor;
    html.style.backgroundColor = '#F6F3EE';
    document.body.style.backgroundColor = '#F6F3EE';
    const meta = document.querySelector('meta[name="theme-color"]');
    const prevTheme = meta?.getAttribute('content');
    meta?.setAttribute('content', '#F6F3EE');
    return () => {
      document.title = prevTitle;
      html.style.backgroundColor = prevHtmlBg;
      document.body.style.backgroundColor = prevBodyBg;
      if (meta && prevTheme) meta.setAttribute('content', prevTheme);
    };
  }, []);

  /* Блокировка прокрутки под модалками */
  const anyOverlay = cartOpen || quickOpen || horecaOpen || menuOpen;
  useEffect(() => {
    const html = document.documentElement;
    if (!anyOverlay) return undefined;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, [anyOverlay]);

  /* Escape закрывает верхний слой */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (horecaOpen) setHorecaOpen(false);
      else if (quickOpen) setQuickOpen(false);
      else if (cartOpen) setCartOpen(false);
      else if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [horecaOpen, quickOpen, cartOpen, menuOpen]);

  /* Тост */
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);
  const showToast = useCallback((msg) => setToast({ msg, key: Date.now() }), []);

  const scrollToId = useCallback((id) => {
    setMenuOpen(false);
    setTimeout(() => {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      const offset = window.innerWidth >= 1024 ? 80 : 64;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset + 1, behavior: 'smooth' });
    }, 30);
  }, []);

  const showInStock = useCallback(() => {
    setFilter('stock');
    scrollToId('catalog');
  }, [scrollToId]);

  const openQuick = useCallback((p) => {
    setQuick(p);
    setQuickOpen(true);
  }, []);

  const addToCart = useCallback(
    (id) => {
      const p = PRODUCT_MAP[id];
      setCart((c) => {
        const ex = c.find((it) => it.id === id);
        if (ex) return c.map((it) => (it.id === id ? { ...it, qty: Math.min(p.max, it.qty + 1) } : it));
        return [...c, { id, qty: 1 }];
      });
      setOrderDone(null);
      showToast(`«${p.title}» в корзине`);
    },
    [showToast],
  );

  const setQty = useCallback((id, qty) => {
    const p = PRODUCT_MAP[id];
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty: Math.max(1, Math.min(p.max, qty)) } : it)));
  }, []);

  const removeItem = useCallback((id) => setCart((c) => c.filter((it) => it.id !== id)), []);

  const checkout = useCallback(({ total, delivery }) => {
    const number = `№ RK-${String(Date.now()).slice(-4)}`;
    setOrderDone({ number, total, delivery });
    setCart([]);
  }, []);

  const openCart = useCallback(() => {
    setQuickOpen(false);
    setMenuOpen(false);
    setCartOpen(true);
  }, []);

  const qtyInCart = quick ? cart.find((it) => it.id === quick.id)?.qty || 0 : 0;

  return (
    <div className="rk relative min-h-screen">
      <style>{CSS}</style>

      {/* текстура бумаги / необожжённой глины */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] opacity-[0.025]" style={{ backgroundImage: NOISE }} />

      <DemoBar projectName="РУСЫКОСЫ · авторская керамика" />

      <Header
        count={cartCount}
        onCart={openCart}
        onInStock={showInStock}
        onNav={scrollToId}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />
      <MobileMenu open={menuOpen} onNav={scrollToId} onInStock={showInStock} />

      <main className="pt-16 lg:pt-20">
        <Hero
          onCatalog={showInStock}
          onStory={() => scrollToId('about')}
          onOpenFeatured={() => openQuick(PRODUCT_MAP.mug)}
        />
        <Catalog filter={filter} setFilter={setFilter} onOpen={openQuick} />
        <About />
        <Horeca onContact={() => setHorecaOpen(true)} />
        <Events />
        <Club />
      </main>

      <Footer onNav={scrollToId} onInfo={(t) => showToast(`Раздел «${t}» появится в полной версии сайта`)} />

      <QuickView
        product={quick}
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
        onAdd={addToCart}
        qtyInCart={qtyInCart}
        onOpenCart={openCart}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        setQty={setQty}
        remove={removeItem}
        onCheckout={checkout}
        done={orderDone}
        onBrowse={() => {
          setCartOpen(false);
          setOrderDone(null);
          scrollToId('catalog');
        }}
      />
      <HorecaModal open={horecaOpen} onClose={() => setHorecaOpen(false)} />
      <Toast toast={toast} />
    </div>
  );
}

/* ============================================================================
   СТИЛИ (изолированы классом .rk, чтобы не конфликтовать с остальным сайтом)
   ========================================================================== */
const CSS = `
.rk {
  font-family: 'Manrope', ui-sans-serif, system-ui, -apple-system, sans-serif;
  background-color: #F6F3EE;
  color: #1F1E1C;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  text-rendering: optimizeLegibility;
}
.rk :is(h1, h2, h3, h4, h5, h6) {
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
  line-height: revert-layer;
  letter-spacing: revert-layer;
}
.rk .rk-serif { font-family: 'Cormorant Garamond', 'Times New Roman', serif; }
.rk img { max-width: revert-layer; height: revert-layer; }
.rk ::selection { background: #263328; color: #F6F3EE; }
.rk input, .rk textarea { border-radius: 0; -webkit-appearance: none; appearance: none; }

.rk-reveal {
  opacity: 0;
  transform: translate3d(0, 28px, 0);
  transition: opacity 1.1s cubic-bezier(.2,.7,.2,1), transform 1.1s cubic-bezier(.2,.7,.2,1);
  will-change: opacity, transform;
}
.rk-reveal.is-in { opacity: 1; transform: none; }

@keyframes rk-fade { from { opacity: 0; transform: translate3d(0, 16px, 0); } to { opacity: 1; transform: none; } }
.rk-fade { animation: rk-fade 1s cubic-bezier(.2,.7,.2,1) both; }

@keyframes rk-bump { 0% { transform: scale(1); } 40% { transform: scale(1.4); } 100% { transform: scale(1); } }
.rk-bump { display: inline-block; animation: rk-bump .5s ease; }

.rk-link {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size .5s cubic-bezier(.2,.7,.2,1), color .3s ease;
}
.rk-link:hover, .rk-link.is-active, .group:hover > .rk-link { background-size: 100% 1px; }

.rk-noscroll { scrollbar-width: none; }
.rk-noscroll::-webkit-scrollbar { display: none; }

@media (prefers-reduced-motion: reduce) {
  .rk-reveal { opacity: 1; transform: none; transition: none; }
  .rk *, .rk *::before, .rk *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;
