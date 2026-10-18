import React, { useState, useMemo, useEffect } from 'react';
import DemoBar from '../../components/DemoBar';

/* ─── COLOR PALETTE: MODERN FOODTECH (CREAM, ESPRESSO & BERRY) ─── */
const C = {
  bg:          '#FAF7F2', // Warm cream background
  bgAlt:       '#F3ECE2', // Warm stone secondary
  card:        '#FFFFFF', // Crisp white card
  cardHover:   '#FDFCFA', // Subtle hover
  border:      '#EADBCC', // Soft caramel-tinted border
  borderDark:  '#CDBEB0', // Active border
  espresso:    '#221C18', // Deep espresso text
  textMuted:   '#756B63', // Warm secondary text
  textLight:   '#A3978E', // Dim captions
  berry:       '#C83759', // Rich raspberry/berry brand accent
  berryDark:   '#A62846', // Deep berry
  berryLight:  '#FDEEF1', // Soft berry wash
  caramel:     '#B86B35', // Roasted coffee caramel
  caramelLight:'#F7EFE7',
  forest:      '#244D3B', // Matcha / Roastery pine green
  forestLight: '#E8F2EC',
  gold:        '#D99638', // Golden glaze
  white:       '#FFFFFF',
};

const gradBerry = `linear-gradient(135deg, ${C.berry}, #E24A6D)`;
const gradEspresso = `linear-gradient(135deg, ${C.espresso}, #3D322B)`;
const shadowCard = '0 12px 32px rgba(34, 28, 24, 0.05), 0 2px 6px rgba(34, 28, 24, 0.03)';
const shadowElevated = '0 20px 48px rgba(200, 55, 89, 0.16), 0 4px 12px rgba(34, 28, 24, 0.06)';

/* ─── CATALOG PRODUCTS DATA ─── */
const PRODUCTS = [
  {
    id: 'raf-lavender',
    category: 'Авторский кофе',
    title: 'Лавандово-черничный Раф',
    desc: 'Эспрессо из 100% арабики, натуральные сливки, лавандовый сироп собственного приготовления и пудра из сублимированной черники.',
    basePrice: 320,
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=700&q=80',
    badge: 'Хит сезона 🫐',
    calories: '280 ккал',
    hasSize: true,
    hasMilk: true,
  },
  {
    id: 'latte-pistachio',
    category: 'Авторский кофе',
    title: 'Фисташковый Латте с малиной',
    desc: 'Двойной шот спешелти эспрессо, паста из сицилийской фисташки, взбитая молочная пенка и ягодный хрустящий крамбл.',
    basePrice: 340,
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=80',
    badge: 'Шеф-рецепт ✨',
    calories: '310 ккал',
    hasSize: true,
    hasMilk: true,
  },
  {
    id: 'croissant-almond',
    category: 'Свежая выпечка',
    title: 'Круассан с миндальным кремом',
    desc: 'Классическое французское слоеное тесто на новозеландском сливочном масле 82.5%, начинка из франжипана и жареные миндальные лепестки.',
    basePrice: 280,
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&q=80',
    badge: 'Выпекаем в 7:00 🥐',
    calories: '390 ккал',
    hasPastryOptions: true,
  },
  {
    id: 'cruffin-caramel',
    category: 'Свежая выпечка',
    title: 'Краффин с соленой карамелью',
    desc: 'Гибрид круассана и маффина с хрустящей карамелизированной корочкой, жидким центром из тягучей морской карамели и дробленым пеканом.',
    basePrice: 290,
    img: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?w=700&q=80',
    badge: 'Любимец гостей 🔥',
    calories: '420 ккал',
    hasPastryOptions: true,
  },
  {
    id: 'bento-berry',
    category: 'Бенто-торты на заказ',
    title: 'Бенто-торт «Ягодный вельвет»',
    desc: 'Нежный бисквит с пропиткой ягодным сиропом, крем-чиз на маскарпоне и ягодная начинка. Упакован в эко-бокс с ложечкой и праздничной свечкой.',
    basePrice: 1190,
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=700&q=80',
    badge: 'Вес 450 г (на 2-3 чел.) 🎂',
    calories: '980 ккал',
    hasBentoOptions: true,
  },
  {
    id: 'bento-choco-mango',
    category: 'Бенто-торты на заказ',
    title: 'Бенто-торт «Шоко-Манго»',
    desc: 'Насыщенный шоколадный брауни-бисквит, воздушный мусс из манго и маракуйи с кусочками тропических фруктов и ганашем из бельгийского шоколада.',
    basePrice: 1250,
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80',
    badge: 'Авторский десерт 🥭',
    calories: '1040 ккал',
    hasBentoOptions: true,
  },
  {
    id: 'drip-ethiopia',
    category: 'Кофе в зернах (Дрипы)',
    title: 'Дрип-пакеты «Эфиопия Иргачеффе»',
    desc: 'Набор свежеобжаренного спешелти кофе в индивидуальных фильтр-пакетах. Заваривается прямо в чашке за 2 минуты без турки и кофемашины.',
    basePrice: 490,
    img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=700&q=80',
    badge: 'Ноты: жасмин, персик ☕',
    calories: '0 ккал',
    hasDripOptions: true,
  },
  {
    id: 'beans-colombia',
    category: 'Кофе в зернах (Дрипы)',
    title: 'Зерно спешелти «Колумбия Уила»',
    desc: '100% арабика мытой обработки с высокогорных плантаций региона Уила (1750 м). Свежая средняя обжарка для фильтра и домашних эспрессо-кофеварок.',
    basePrice: 750,
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80',
    badge: 'Оценка Q-грейдера: 86.5 🏆',
    calories: '0 ккал',
    hasBeanOptions: true,
  },
];

/* ─── MODIFIER OPTIONS ─── */
const SIZES = [
  { id: '250', label: '250 мл', add: 0 },
  { id: '350', label: '350 мл', add: 60 },
  { id: '450', label: '450 мл', add: 110 },
];

const MILKS = [
  { id: 'normal',   label: 'Обычное',    add: 0 },
  { id: 'coconut',  label: 'Кокос',      add: 50 },
  { id: 'almond',   label: 'Миндаль',    add: 50 },
  { id: 'oat',      label: 'Овсяное',    add: 50 },
];

const BENTO_FILLINGS = [
  { id: 'strawberry', label: 'Клубника-Маскарпоне', add: 0 },
  { id: 'blueberry',  label: 'Черничный конфитюр', add: 100 },
  { id: 'pistachio',  label: 'Фисташка-Малина',   add: 150 },
];

const DRIP_PACKS = [
  { id: '5pack',  label: '5 шт. в боксе',  add: 0 },
  { id: '10pack', label: '10 шт. в боксе', add: 380 },
];

const BEAN_WEIGHTS = [
  { id: '250g', label: '250 грамм', add: 0 },
  { id: '1kg',  label: '1 кг пачка', add: 1150 },
];

/* ─── PRODUCT CARD COMPONENT ─── */
function ProductCard({ product, onAddToCart, cartItems }) {
  // Local modifier selections
  const [size, setSize] = useState(SIZES[1]); // default 350ml
  const [milk, setMilk] = useState(MILKS[0]);
  const [warmUp, setWarmUp] = useState(true);
  const [bentoFilling, setBentoFilling] = useState(BENTO_FILLINGS[0]);
  const [bentoText, setBentoText] = useState('Happy Birthday!');
  const [dripPack, setDripPack] = useState(DRIP_PACKS[0]);
  const [beanWeight, setBeanWeight] = useState(BEAN_WEIGHTS[0]);
  const [addedToast, setAddedToast] = useState(false);

  // Dynamic price calculation
  const calculatedPrice = useMemo(() => {
    let price = product.basePrice;
    if (product.hasSize) price += size.add;
    if (product.hasMilk) price += milk.add;
    if (product.hasBentoOptions) price += bentoFilling.add;
    if (product.hasDripOptions) price += dripPack.add;
    if (product.hasBeanOptions) price += beanWeight.add;
    return price;
  }, [product, size, milk, bentoFilling, dripPack, beanWeight]);

  // Options summary string
  const optionsSummary = useMemo(() => {
    const parts = [];
    if (product.hasSize) parts.push(size.label);
    if (product.hasMilk && milk.id !== 'normal') parts.push(`${milk.label} молоко`);
    if (product.hasPastryOptions) parts.push(warmUp ? 'Горячий' : 'Холодный');
    if (product.hasBentoOptions) parts.push(`${bentoFilling.label} («${bentoText}»)`);
    if (product.hasDripOptions) parts.push(dripPack.label);
    if (product.hasBeanOptions) parts.push(beanWeight.label);
    return parts.join(' • ');
  }, [product, size, milk, warmUp, bentoFilling, bentoText, dripPack, beanWeight]);

  // Unique key for this specific configuration
  const configKey = `${product.id}-${optionsSummary}`;

  // Current quantity of this specific configured item in cart
  const currentQtyInCart = useMemo(() => {
    const item = cartItems.find(i => i.configKey === configKey);
    return item ? item.quantity : 0;
  }, [cartItems, configKey]);

  const handleAdd = () => {
    onAddToCart({
      configKey,
      productId: product.id,
      title: product.title,
      category: product.category,
      img: product.img,
      price: calculatedPrice,
      optionsSummary,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1200);
  };

  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: '28px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: shadowCard,
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = shadowElevated; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = shadowCard; }}
    >
      {/* Product Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={product.img}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: '14px', left: '14px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(8px)',
            borderRadius: '100px',
            padding: '4px 12px',
            fontSize: '0.72rem', fontWeight: '800',
            color: C.espresso,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}>
            {product.badge}
          </div>
        )}

        {/* Calories */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: 'rgba(34, 28, 24, 0.75)',
          color: '#fff', fontSize: '0.7rem', fontWeight: '700',
          padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)',
        }}>
          {product.calories}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.72rem', color: C.berry, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
          {product.category}
        </div>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: '800',
          color: C.espresso, marginBottom: '8px', lineHeight: 1.25,
        }}>
          {product.title}
        </h3>
        <p style={{ color: C.textMuted, fontSize: '0.84rem', lineHeight: 1.55, marginBottom: '16px' }}>
          {product.desc}
        </p>

        {/* ── MODIFIERS ACCORDING TO PRODUCT TYPE ── */}
        <div style={{ marginTop: 'auto', marginBottom: '18px' }}>
          
          {/* Coffee Size Selector */}
          {product.hasSize && (
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: C.textMuted, marginBottom: '6px' }}>
                Объем порции:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {SIZES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s)}
                    style={{
                      padding: '6px 4px',
                      background: size.id === s.id ? C.espresso : C.bgAlt,
                      color: size.id === s.id ? '#FFFFFF' : C.espresso,
                      border: 'none', borderRadius: '10px',
                      fontSize: '0.75rem', fontWeight: '700',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Coffee Milk Selector */}
          {product.hasMilk && (
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: C.textMuted, marginBottom: '6px' }}>
                Выбор молока:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
                {MILKS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMilk(m)}
                    style={{
                      padding: '6px 2px',
                      background: milk.id === m.id ? 'rgba(200, 55, 89, 0.12)' : C.bgAlt,
                      color: milk.id === m.id ? C.berry : C.espresso,
                      border: `1.5px solid ${milk.id === m.id ? C.berry : 'transparent'}`,
                      borderRadius: '8px',
                      fontSize: '0.72rem', fontWeight: '700',
                      cursor: 'pointer', transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pastry Warm-Up Option */}
          {product.hasPastryOptions && (
            <div style={{
              background: C.bgAlt, borderRadius: '12px', padding: '8px 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: C.espresso }}>
                🔥 Разогреть перед доставкой:
              </span>
              <button
                onClick={() => setWarmUp(!warmUp)}
                style={{
                  padding: '4px 12px',
                  background: warmUp ? C.forest : '#DDD',
                  color: warmUp ? '#fff' : '#666',
                  border: 'none', borderRadius: '100px',
                  fontSize: '0.72rem', fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                {warmUp ? 'Да' : 'Нет'}
              </button>
            </div>
          )}

          {/* Bento Cake Options */}
          {product.hasBentoOptions && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: '700', color: C.textMuted, marginBottom: '4px' }}>
                  Начинка торта:
                </div>
                <select
                  value={bentoFilling.id}
                  onChange={e => setBentoFilling(BENTO_FILLINGS.find(f => f.id === e.target.value))}
                  style={{
                    width: '100%', padding: '7px 10px',
                    background: C.bgAlt, border: `1px solid ${C.border}`,
                    borderRadius: '8px', fontSize: '0.78rem', color: C.espresso,
                    fontWeight: '600', outline: 'none',
                  }}
                >
                  {BENTO_FILLINGS.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.label} {f.add > 0 ? `(+${f.add} ₽)` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: '700', color: C.textMuted, marginBottom: '4px' }}>
                  Надпись на торте:
                </div>
                <input
                  type="text"
                  value={bentoText}
                  onChange={e => setBentoText(e.target.value)}
                  placeholder="Ваша надпись..."
                  style={{
                    width: '100%', padding: '6px 10px',
                    background: C.bgAlt, border: `1px solid ${C.border}`,
                    borderRadius: '8px', fontSize: '0.78rem', color: C.espresso,
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          )}

          {/* Drips Pack Options */}
          {product.hasDripOptions && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {DRIP_PACKS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setDripPack(p)}
                  style={{
                    flex: 1, padding: '7px 6px',
                    background: dripPack.id === p.id ? C.espresso : C.bgAlt,
                    color: dripPack.id === p.id ? '#FFFFFF' : C.espresso,
                    border: 'none', borderRadius: '10px',
                    fontSize: '0.74rem', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          {/* Beans Weight Options */}
          {product.hasBeanOptions && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {BEAN_WEIGHTS.map(w => (
                <button
                  key={w.id}
                  onClick={() => setBeanWeight(w)}
                  style={{
                    flex: 1, padding: '7px 6px',
                    background: beanWeight.id === w.id ? C.espresso : C.bgAlt,
                    color: beanWeight.id === w.id ? '#FFFFFF' : C.espresso,
                    border: 'none', borderRadius: '10px',
                    fontSize: '0.74rem', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  {w.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Add to Cart Row */}
        <div style={{
          paddingTop: '14px', borderTop: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: C.textLight, textTransform: 'uppercase', fontWeight: '700' }}>
              Итого:
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.45rem',
              color: C.espresso, lineHeight: 1.1,
            }}>
              {calculatedPrice} ₽
            </div>
          </div>

          {/* Button: + In Cart / Quantity Counter */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={handleAdd}
              style={{
                padding: '11px 20px',
                background: currentQtyInCart > 0 ? C.forest : gradBerry,
                border: 'none', borderRadius: '12px',
                color: '#FFFFFF', fontWeight: '800', fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 6px 18px rgba(200, 55, 89, 0.3)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              {currentQtyInCart > 0 ? (
                <>✓ В корзине ({currentQtyInCart})</>
              ) : (
                <>+ В корзину</>
              )}
            </button>

            {/* Micro Toast */}
            {addedToast && (
              <div style={{
                position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                background: C.espresso, color: '#fff', fontSize: '0.72rem', fontWeight: '700',
                padding: '4px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                animation: 'fadeUp 0.3s ease both',
              }}>
                Добавлено! ✨
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DRAWER / CART & CHECKOUT ─── */
function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  mode,
  onSetMode,
  promoApplied,
  onApplyPromo,
  onCompleteOrder,
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [payMethod, setPayMethod] = useState('sbp');
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', comment: '' });

  // Calculations
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const pickupDiscount = useMemo(() => mode === 'pickup' ? Math.round(subtotal * 0.15) : 0, [mode, subtotal]);
  const promoDiscount = useMemo(() => promoApplied ? Math.round((subtotal - pickupDiscount) * 0.20) : 0, [promoApplied, subtotal, pickupDiscount]);
  const deliveryCost = useMemo(() => {
    if (mode === 'pickup') return 0;
    return subtotal >= 1500 ? 0 : 250;
  }, [mode, subtotal]);
  const total = useMemo(() => Math.max(0, subtotal - pickupDiscount - promoDiscount + deliveryCost), [subtotal, pickupDiscount, promoDiscount, deliveryCost]);
  const freeDeliveryRemaining = Math.max(0, 1500 - subtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'MOROZ') {
      onApplyPromo(true);
      setPromoError('');
    } else {
      setPromoError('Неверный промокод. Попробуйте MOROZ');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customer.phone.trim()) return;
    onCompleteOrder({
      cart,
      subtotal,
      pickupDiscount,
      promoDiscount,
      deliveryCost,
      total,
      mode,
      payMethod,
      customer,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(34, 28, 24, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex', justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '480px', height: '100%',
          background: C.bg,
          display: 'flex', flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.25)',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px', background: C.card,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.35rem', fontWeight: '900', color: C.espresso, margin: 0 }}>
              Ваша корзина
            </h2>
            <div style={{ fontSize: '0.78rem', color: C.textMuted, marginTop: '2px' }}>
              {cart.length === 0 ? 'Пусто' : `${cart.reduce((s, i) => s + i.quantity, 0)} позиции`}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: C.bgAlt, border: 'none', cursor: 'pointer',
              color: C.espresso, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Free Delivery Bar or Pickup Discount */}
        {mode === 'delivery' ? (
          <div style={{
            background: subtotal >= 1500 ? C.forestLight : C.caramelLight,
            padding: '12px 24px', borderBottom: `1px solid ${C.border}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '700', color: subtotal >= 1500 ? C.forest : C.caramel, marginBottom: '6px' }}>
              <span>{subtotal >= 1500 ? '🎉 Бесплатная доставка активна!' : `🛵 До бесплатной доставки осталось ${freeDeliveryRemaining} ₽`}</span>
              <span>{Math.min(100, Math.round((subtotal / 1500) * 100))}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.08)', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min(100, (subtotal / 1500) * 100)}%`, height: '100%',
                background: subtotal >= 1500 ? C.forest : C.caramel, borderRadius: '100px',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(200, 55, 89, 0.1)', padding: '10px 24px',
            borderBottom: `1px solid ${C.border}`, fontSize: '0.8rem', fontWeight: '700', color: C.berry,
          }}>
            ⚡ Самовывоз: скидка 15% автоматически учтена!
          </div>
        )}

        {/* Mode Switcher in Drawer */}
        <div style={{ padding: '14px 24px', background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', gap: '8px', background: C.bgAlt, padding: '4px', borderRadius: '14px' }}>
            <button
              onClick={() => onSetMode('delivery')}
              style={{
                flex: 1, padding: '8px', border: 'none', borderRadius: '10px',
                background: mode === 'delivery' ? C.card : 'transparent',
                color: mode === 'delivery' ? C.espresso : C.textMuted,
                fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer',
                boxShadow: mode === 'delivery' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              🛵 Доставка
            </button>
            <button
              onClick={() => onSetMode('pickup')}
              style={{
                flex: 1, padding: '8px', border: 'none', borderRadius: '10px',
                background: mode === 'pickup' ? C.card : 'transparent',
                color: mode === 'pickup' ? C.berry : C.textMuted,
                fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer',
                boxShadow: mode === 'pickup' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              ☕ Самовывоз (-15%)
            </button>
          </div>
        </div>

        {/* Scrollable Items & Checkout Form */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          
          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: C.textMuted }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>☕</div>
              <div style={{ fontWeight: '800', fontSize: '1.1rem', color: C.espresso }}>Корзина пуста</div>
              <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                Выберите авторский кофе, десерты или выпечку из нашего меню.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              {cart.map(item => (
                <div
                  key={item.configKey}
                  style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: '18px', padding: '14px',
                    display: 'flex', gap: '12px', alignItems: 'center',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '0.92rem', color: C.espresso, lineHeight: 1.2 }}>
                      {item.title}
                    </div>
                    {item.optionsSummary && (
                      <div style={{ fontSize: '0.74rem', color: C.textMuted, marginTop: '2px' }}>
                        {item.optionsSummary}
                      </div>
                    )}
                    <div style={{ fontWeight: '800', fontSize: '0.92rem', color: C.berry, marginTop: '4px' }}>
                      {item.price * item.quantity} ₽
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: C.bgAlt, borderRadius: '10px', padding: '4px 6px',
                  }}>
                    <button
                      onClick={() => onUpdateQty(item.configKey, -1)}
                      style={{
                        width: '24px', height: '24px', borderRadius: '6px',
                        background: C.card, border: 'none', cursor: 'pointer',
                        fontWeight: '800', color: C.espresso, fontSize: '0.9rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: C.espresso, minWidth: '16px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.configKey, 1)}
                      style={{
                        width: '24px', height: '24px', borderRadius: '6px',
                        background: C.card, border: 'none', cursor: 'pointer',
                        fontWeight: '800', color: C.espresso, fontSize: '0.9rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.configKey)}
                    style={{
                      background: 'none', border: 'none', color: C.textLight,
                      cursor: 'pointer', fontSize: '1rem', padding: '4px',
                    }}
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Promo code Section */}
          {cart.length > 0 && (
            <div style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: '18px', padding: '16px', marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: C.espresso }}>Промокод на скидку:</span>
                <span style={{ fontSize: '0.72rem', color: C.berry, fontWeight: '700' }}>MOROZ = -20%</span>
              </div>

              {promoApplied ? (
                <div style={{
                  padding: '10px 14px', background: C.forestLight,
                  border: `1px solid rgba(36, 77, 59, 0.25)`, borderRadius: '10px',
                  color: C.forest, fontWeight: '700', fontSize: '0.85rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>✅ Промокод MOROZ активен (-20%)</span>
                  <span>-{promoDiscount} ₽</span>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Введите MOROZ"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    style={{
                      flex: 1, padding: '10px 12px', background: C.bgAlt,
                      border: `1px solid ${C.border}`, borderRadius: '10px',
                      fontSize: '0.85rem', outline: 'none', textTransform: 'uppercase',
                      fontWeight: '700', color: C.espresso,
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '10px 16px', background: C.espresso,
                      border: 'none', borderRadius: '10px', color: '#fff',
                      fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer',
                    }}
                  >
                    Применить
                  </button>
                </form>
              )}

              {promoError && (
                <div style={{ color: '#DC2626', fontSize: '0.72rem', marginTop: '6px' }}>{promoError}</div>
              )}
            </div>
          )}

          {/* Delivery & Contact Information */}
          {cart.length > 0 && (
            <div style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: '18px', padding: '18px', marginBottom: '24px',
            }}>
              <div style={{ fontWeight: '800', fontSize: '0.92rem', color: C.espresso, marginBottom: '14px' }}>
                Данные для получения заказа
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  required
                  placeholder="Ваше имя"
                  value={customer.name}
                  onChange={e => setCustomer(p => ({ ...p, name: e.target.value }))}
                  style={{
                    padding: '10px 14px', background: C.bgAlt,
                    border: `1px solid ${C.border}`, borderRadius: '10px',
                    fontSize: '0.85rem', outline: 'none', color: C.espresso,
                  }}
                />
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={customer.phone}
                  onChange={e => setCustomer(p => ({ ...p, phone: e.target.value }))}
                  style={{
                    padding: '10px 14px', background: C.bgAlt,
                    border: `1px solid ${C.border}`, borderRadius: '10px',
                    fontSize: '0.85rem', outline: 'none', color: C.espresso,
                  }}
                />

                {mode === 'delivery' && (
                  <input
                    type="text"
                    required
                    placeholder="Улица, дом, квартира"
                    value={customer.address}
                    onChange={e => setCustomer(p => ({ ...p, address: e.target.value }))}
                    style={{
                      padding: '10px 14px', background: C.bgAlt,
                      border: `1px solid ${C.border}`, borderRadius: '10px',
                      fontSize: '0.85rem', outline: 'none', color: C.espresso,
                    }}
                  />
                )}

                <input
                  type="text"
                  placeholder="Комментарий (код домофона, этаж)"
                  value={customer.comment}
                  onChange={e => setCustomer(p => ({ ...p, comment: e.target.value }))}
                  style={{
                    padding: '10px 14px', background: C.bgAlt,
                    border: `1px solid ${C.border}`, borderRadius: '10px',
                    fontSize: '0.85rem', outline: 'none', color: C.espresso,
                  }}
                />
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: C.espresso, marginBottom: '8px' }}>
                  Способ оплаты:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { id: 'sbp', label: '⚡ СБП (Система быстрых платежей — 0% комиссии)' },
                    { id: 'card', label: '💳 Банковской картой онлайн (ЮKassa / T-Pay)' },
                    { id: 'cash', label: '🤝 При получении (картой или наличными)' },
                  ].map(m => (
                    <label
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '9px 12px',
                        background: payMethod === m.id ? 'rgba(200, 55, 89, 0.08)' : C.bgAlt,
                        border: `1px solid ${payMethod === m.id ? C.berry : 'transparent'}`,
                        borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem',
                        fontWeight: payMethod === m.id ? '700' : '500', color: C.espresso,
                      }}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={payMethod === m.id}
                        onChange={() => setPayMethod(m.id)}
                        style={{ accentColor: C.berry }}
                      />
                      {m.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Totals */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px 24px', background: C.card,
            borderTop: `1px solid ${C.border}`,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: C.textMuted }}>
                <span>Сумма позиций:</span>
                <span>{subtotal} ₽</span>
              </div>

              {pickupDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: C.berry, fontWeight: '700' }}>
                  <span>Скидка самовывоза (15%):</span>
                  <span>-{pickupDiscount} ₽</span>
                </div>
              )}

              {promoDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: C.forest, fontWeight: '700' }}>
                  <span>Промокод MOROZ (20%):</span>
                  <span>-{promoDiscount} ₽</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: C.textMuted }}>
                <span>Доставка:</span>
                <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                paddingTop: '8px', borderTop: `1px solid ${C.border}`,
                fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.4rem', color: C.espresso,
              }}>
                <span>Итого к оплате:</span>
                <span style={{ color: C.berry }}>{total} ₽</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: '100%', padding: '16px',
                background: gradBerry,
                border: 'none', borderRadius: '14px',
                color: '#fff', fontWeight: '800', fontSize: '1.05rem',
                cursor: 'pointer', boxShadow: '0 8px 24px rgba(200, 55, 89, 0.35)',
                transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              Оплатить заказ • {total} ₽ →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── SUCCESS ORDER SCREEN / MODAL ─── */
function OrderSuccessModal({ orderData, onClose }) {
  const [timeLeft, setTimeLeft] = useState(35 * 60); // 35 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(p => (p > 0 ? p - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const orderNum = Math.floor(1000 + Math.random() * 9000);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(34, 28, 24, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '14px',
    }}>
      <div style={{
        background: C.card, borderRadius: '28px',
        maxWidth: '520px', width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        padding: 'clamp(20px, 4vw, 36px)', textAlign: 'center',
        boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
        border: `1px solid ${C.border}`,
        position: 'relative',
        animation: 'scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}>
        {/* Animated Icon */}
        <div style={{
          width: '76px', height: '76px', borderRadius: '50%',
          background: C.forestLight, border: `2px solid rgba(36, 77, 59, 0.3)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.4rem', margin: '0 auto 20px',
        }}>
          🛵
        </div>

        <div style={{ fontSize: '0.8rem', fontWeight: '800', color: C.berry, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Заказ #{orderNum} успешно оплачен!
        </div>

        <h3 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: '900',
          color: C.espresso, marginTop: '6px', marginBottom: '12px',
        }}>
          Бариста уже варит ваш кофе
        </h3>

        {/* Live Timer */}
        <div style={{
          background: C.bgAlt, borderRadius: '18px', padding: '16px 20px',
          marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.75rem', color: C.textMuted, fontWeight: '700' }}>
              {orderData.mode === 'delivery' ? 'Расчетное время доставки:' : 'Время готовности к самовывозу:'}
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.8rem',
              color: C.forest, lineHeight: 1.1, marginTop: '2px',
            }}>
              {minutes}:{seconds.toString().padStart(2, '0')} мин
            </div>
          </div>
          <div style={{ fontSize: '2rem' }}>⏱️</div>
        </div>

        {/* Tracking Steps */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
          marginBottom: '24px', fontSize: '0.72rem', fontWeight: '700',
        }}>
          <div style={{ background: C.forestLight, color: C.forest, padding: '8px 4px', borderRadius: '8px' }}>
            ✓ 1. Принят
          </div>
          <div style={{ background: 'rgba(200, 55, 89, 0.12)', color: C.berry, padding: '8px 4px', borderRadius: '8px' }}>
            🔥 2. Готовится
          </div>
          <div style={{ background: C.bgAlt, color: C.textLight, padding: '8px 4px', borderRadius: '8px' }}>
            🛵 3. В пути
          </div>
        </div>

        {/* Order Details Recap */}
        <div style={{
          background: C.bgAlt, borderRadius: '14px', padding: '14px',
          marginBottom: '24px', textAlign: 'left', fontSize: '0.82rem',
        }}>
          <div style={{ fontWeight: '800', color: C.espresso, marginBottom: '6px' }}>Детали заказа:</div>
          <div style={{ color: C.textMuted }}>Получатель: {orderData.customer?.name} ({orderData.customer?.phone})</div>
          {orderData.mode === 'delivery' && (
            <div style={{ color: C.textMuted, marginTop: '2px' }}>Адрес: {orderData.customer?.address || 'Санкт-Петербург, Невский пр.'}</div>
          )}
          <div style={{ fontWeight: '800', color: C.espresso, marginTop: '8px', paddingTop: '8px', borderTop: `1px solid ${C.border}` }}>
            Оплачено: {orderData.total} ₽ ({orderData.payMethod.toUpperCase()})
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '14px',
            background: C.espresso, border: 'none', borderRadius: '12px',
            color: '#fff', fontWeight: '700', fontSize: '0.95rem',
            cursor: 'pointer',
          }}
        >
          Сделать новый заказ
        </button>
      </div>

      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ─── HEADER & PROMO HERO ─── */
function CoffeeHeader({ mode, onSetMode, cartCount, cartTotal, onOpenCart }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 500,
      background: 'rgba(250, 247, 242, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${C.border}`,
    }}>
      {/* Top Banner Status */}
      <div style={{
        background: C.espresso, color: '#FFFFFF',
        padding: '6px 24px', fontSize: '0.78rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
          <span>Кофейня открыта • Доставка за 35 минут</span>
        </div>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>🎁 Скидка 20% по промокоду <strong>MOROZ</strong></span>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '76px', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: gradBerry, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', color: '#fff',
              boxShadow: '0 4px 14px rgba(200, 55, 89, 0.35)',
            }}>
              ☕
            </div>
            <div>
              <div style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.25rem',
                color: C.espresso, letterSpacing: '0.04em', lineHeight: 1,
              }}>
                ROAST & <span style={{ color: C.berry }}>BERRY</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: C.textMuted, fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>
                Спешелти кофейня & пекарня
              </div>
            </div>
          </div>

          {/* Delivery / Pickup Mode Toggle */}
          <div style={{
            background: C.bgAlt, borderRadius: '100px', padding: '4px',
            display: 'flex', gap: '4px', border: `1px solid ${C.border}`,
          }} className="coffee-mode-toggle">
            <button
              onClick={() => onSetMode('delivery')}
              style={{
                padding: '8px 18px', border: 'none', borderRadius: '100px',
                background: mode === 'delivery' ? C.card : 'transparent',
                color: mode === 'delivery' ? C.espresso : C.textMuted,
                fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer',
                boxShadow: mode === 'delivery' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              🛵 Доставка
            </button>
            <button
              onClick={() => onSetMode('pickup')}
              style={{
                padding: '8px 18px', border: 'none', borderRadius: '100px',
                background: mode === 'pickup' ? C.card : 'transparent',
                color: mode === 'pickup' ? C.berry : C.textMuted,
                fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer',
                boxShadow: mode === 'pickup' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              ☕ Самовывоз (-15%)
            </button>
          </div>

          {/* Cart Trigger Button in Header */}
          <button
            onClick={onOpenCart}
            style={{
              padding: '10px 20px',
              background: cartCount > 0 ? gradBerry : C.espresso,
              border: 'none', borderRadius: '12px',
              color: '#FFFFFF', fontWeight: '800', fontSize: '0.88rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: cartCount > 0 ? '0 6px 20px rgba(200, 55, 89, 0.35)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <span>🧺</span>
            <span>{cartCount > 0 ? `${cartTotal} ₽` : 'Корзина'}</span>
            {cartCount > 0 && (
              <span style={{
                background: 'rgba(255, 255, 255, 0.25)', borderRadius: '100px',
                padding: '2px 8px', fontSize: '0.75rem',
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .coffee-mode-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}

/* ─── HERO PROMO BANNER ─── */
function HeroPromo({ mode, onSetMode, onScrollMenu }) {
  return (
    <section style={{
      padding: '48px 24px 36px',
      background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgAlt} 100%)`,
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{
          background: C.espresso,
          borderRadius: '32px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          color: '#FFFFFF',
          position: 'relative',
        }} className="coffee-hero-grid">
          
          {/* Left Text */}
          <div className="coffee-hero-text" style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ background: C.berry, color: '#fff', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '800' }}>
                ⚡ Доставка 35 минут
              </span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700' }}>
                Бесплатно от 1500 ₽
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: '900', lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              Спешелти кофе, круассаны из печи и бенто-торты с доставкой
            </h1>

            <p style={{ color: '#D4CDC5', fontSize: '1rem', lineHeight: 1.65, marginBottom: '28px', maxWidth: '520px' }}>
              Обжариваем зерно каждую неделю на ростере Giesen. Печем выпечку каждые 3 часа.
              Укажите желаемое время или закажите горячий кофе прямо к двери.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={onScrollMenu}
                style={{
                  padding: '14px 30px',
                  background: gradBerry,
                  border: 'none', borderRadius: '12px',
                  color: '#FFFFFF', fontWeight: '800', fontSize: '0.95rem',
                  cursor: 'pointer', boxShadow: '0 6px 20px rgba(200, 55, 89, 0.4)',
                }}
              >
                Перейти в меню ↓
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4CDC5', fontSize: '0.85rem' }}>
                <span>☕</span>
                <span>Самовывоз со скидкой 15%</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div style={{ height: 'clamp(200px, 45vw, 380px)', position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80"
              alt="Спешелти кофе Roast and Berry"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(34, 28, 24, 0.9) 0%, transparent 60%)',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .coffee-hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .coffee-hero-text { padding: 26px 18px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── MAIN ROAST & BERRY COMPONENT ─── */
export default function DemoCoffee() {
  const [mode, setMode] = useState('delivery'); // 'delivery' or 'pickup'
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [promoApplied, setPromoApplied] = useState(false);

  const categories = ['Все', 'Авторский кофе', 'Свежая выпечка', 'Бенто-торты на заказ', 'Кофе в зернах (Дрипы)'];

  // Add configured item to cart
  const handleAddToCart = (configuredItem) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.configKey === configuredItem.configKey);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { ...configuredItem, quantity: 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQty = (configKey, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.configKey === configKey) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  // Remove single item
  const handleRemoveItem = (configKey) => {
    setCart(prev => prev.filter(item => item.configKey !== configKey));
  };

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'Все' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  // Total cart stats
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);
  const cartTotal = useMemo(() => {
    const raw = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const pickupDisc = mode === 'pickup' ? Math.round(raw * 0.15) : 0;
    const promoDisc = promoApplied ? Math.round((raw - pickupDisc) * 0.20) : 0;
    return Math.max(0, raw - pickupDisc - promoDisc);
  }, [cart, mode, promoApplied]);

  const handleCompleteOrder = (orderData) => {
    setCompletedOrder(orderData);
    setCart([]);
    setCartOpen(false);
    setPromoApplied(false);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      background: C.bg,
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      color: C.espresso,
      paddingBottom: '120px', // Space for floating bottom cart bar
    }}>
      {/* Global typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; color: ${C.espresso}; }
      `}</style>

      {/* DemoBar back to portfolio */}
      <DemoBar projectName="Roast & Berry" />

      {/* Header */}
      <CoffeeHeader
        mode={mode}
        onSetMode={setMode}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Hero Banner */}
      <HeroPromo
        mode={mode}
        onSetMode={setMode}
        onScrollMenu={scrollToMenu}
      />

      {/* ─── CATALOG SECTION ─── */}
      <section id="menu" style={{ padding: '60px 24px', maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '20px', marginBottom: '32px',
        }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '900', margin: 0 }}>
              Меню и десерты
            </h2>
            <div style={{ color: C.textMuted, fontSize: '0.9rem', marginTop: '4px' }}>
              {filteredProducts.length} позиций доступно для заказа
            </div>
          </div>

          {/* Search Input */}
          <div style={{ width: '100%', maxWidth: '320px' }}>
            <input
              type="text"
              placeholder="🔍 Найти кофе, круассан или торт..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '12px 18px', background: C.card,
                border: `1.5px solid ${C.border}`, borderRadius: '100px',
                fontSize: '0.88rem', color: C.espresso, outline: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div style={{
          display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '36px',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 20px',
                background: activeCategory === cat ? C.espresso : C.card,
                color: activeCategory === cat ? '#FFFFFF' : C.textMuted,
                border: `1.5px solid ${activeCategory === cat ? C.espresso : C.border}`,
                borderRadius: '100px',
                fontSize: '0.88rem', fontWeight: '700',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }} className="coffee-products-grid">
          {filteredProducts.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={handleAddToCart}
              cartItems={cart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: C.textMuted }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔍</div>
            <div style={{ fontWeight: '800', fontSize: '1.2rem', color: C.espresso }}>Ничего не найдено</div>
            <p style={{ fontSize: '0.9rem' }}>Попробуйте изменить запрос поиска или категорию</p>
          </div>
        )}
      </section>

      {/* Floating Bottom Cart Bar (Appears when cart has items) */}
      {cartCount > 0 && !cartOpen && (
        <div style={{
          position: 'fixed', bottom: '72px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 8000, width: 'calc(100% - 32px)', maxWidth: '440px',
        }}>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              width: '100%', padding: '15px 20px',
              background: gradBerry,
              border: 'none', borderRadius: '100px',
              color: '#FFFFFF', fontWeight: '800', fontSize: '0.95rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 12px 32px rgba(200, 55, 89, 0.45)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🧺</span>
              <span>{cartCount} товара</span>
            </div>
            <div>Оформить заказ • {cartTotal} ₽ →</div>
          </button>
        </div>
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        mode={mode}
        onSetMode={setMode}
        promoApplied={promoApplied}
        onApplyPromo={setPromoApplied}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Order Success Modal */}
      {completedOrder && (
        <OrderSuccessModal
          orderData={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}

      <style>{`
        @media (max-width: 1100px) {
          .coffee-products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .coffee-products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
