import React, { useState, useRef, useCallback, useEffect } from 'react';
import DemoBar from '../../components/DemoBar';

/* ─── DESIGN TOKENS ─── */
const C = {
  bg:        '#0B0B0E',
  surface:   '#111114',
  card:      '#18181C',
  cardHover: '#1E1E24',
  border:    'rgba(255,255,255,0.07)',
  borderHot: 'rgba(255,59,48,0.4)',
  red:       '#FF3B30',
  orange:    '#FF6B00',
  white:     '#F5F5F7',
  muted:     '#6B7280',
  dim:       '#3A3A3E',
};

const gradRed    = `linear-gradient(135deg, ${C.red}, ${C.orange})`;
const gradRedSub = `linear-gradient(135deg, rgba(255,59,48,0.15), rgba(255,107,0,0.08))`;

/* ─── HELPERS ─── */
const px = (style) => ({ ...style });

function Tag({ children, color = C.red }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 12px',
      background: `${color}18`,
      border: `1px solid ${color}40`,
      borderRadius: '100px',
      fontSize: '0.75rem', fontWeight: '700',
      color, letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

/* ─── TELEGRAM MODAL ─── */
function TelegramModal({ services, carClass, total, onClose }) {
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  const dateStr = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: '420px', width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        background: '#17212B',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
        animation: 'slideUp 0.4s cubic-bezier(.16,1,.3,1) both',
      }}>
        {/* Telegram top bar */}
        <div style={{
          background: '#1C2733',
          padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #2AABEE, #229ED9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: '800', color: '#fff',
            flexShrink: 0
          }}>A</div>
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '0.95rem' }}>APEX Detailing Bot</div>
            <div style={{ color: '#6B8FA9', fontSize: '0.75rem' }}>🔒 Бот владельца • Личный чат</div>
          </div>
          <button onClick={onClose} style={{
            marginLeft: 'auto', background: 'none', border: 'none',
            color: '#6B8FA9', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1
          }}>✕</button>
        </div>

        {/* Demo label */}
        <div style={{
          background: 'rgba(42,171,238,0.12)',
          border: 'none',
          padding: '10px 20px',
          textAlign: 'center',
          fontSize: '0.78rem', color: '#2AABEE', fontWeight: '600'
        }}>
          ⚡ Так мгновенно выглядит уведомление у владельца студии
        </div>

        {/* Message bubble */}
        <div style={{ padding: '16px 16px 24px' }}>
          <div style={{
            background: '#1E2F3E',
            borderRadius: '12px 12px 12px 4px',
            padding: '14px 16px',
            maxWidth: '340px',
          }}>
            <div style={{ color: '#2AABEE', fontWeight: '700', fontSize: '0.85rem', marginBottom: '10px' }}>
              📋 Новая заявка с сайта!
            </div>
            <div style={{ color: '#E8F4FD', fontSize: '0.88rem', lineHeight: 1.7 }}>
              <div>🚗 <strong>Класс авто:</strong> {carClass}</div>
              <div style={{ marginTop: '6px' }}>🔧 <strong>Услуги:</strong></div>
              <div style={{ paddingLeft: '16px' }}>
                {services.length > 0
                  ? services.map((s, i) => <div key={i}>• {s}</div>)
                  : <div>• Не выбраны</div>
                }
              </div>
              <div style={{ marginTop: '8px', padding: '8px 10px', background: 'rgba(255,59,48,0.15)', borderRadius: '8px', border: '1px solid rgba(255,59,48,0.3)' }}>
                💰 <strong style={{ color: '#FF6B6B' }}>Итого: {total.toLocaleString('ru-RU')} ₽</strong>
              </div>
              <div style={{ marginTop: '8px', color: '#8FA9BE', fontSize: '0.8rem' }}>
                🕐 Клиент ждёт обратного звонка
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '0.72rem', color: '#6B8FA9' }}>{timeStr}</div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div style={{ fontSize: '0.82rem', color: '#6B8FA9', marginBottom: '14px', lineHeight: 1.5 }}>
              В реальном проекте владелец получает это сообщение<br />
              мгновенно и может ответить клиенту прямо из Telegram
            </div>
            <button onClick={onClose} style={{
              padding: '11px 28px',
              background: gradRed,
              border: 'none', borderRadius: '10px',
              color: '#fff', fontWeight: '700', fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(255,59,48,0.35)',
            }}>
              Понятно, впечатляет! ✓
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity:0; transform: translateY(30px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ─── BOOKING MODAL ─── */
function BookingModal({ selectedServices, carClass, total, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '' });
  const [sent, setSent] = useState(false);
  const [showTg, setShowTg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setShowTg(true); }, 600);
  };

  if (showTg) {
    return <TelegramModal services={selectedServices} carClass={carClass} total={total} onClose={onClose} />;
  }

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 8000,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}>
      <div onClick={e => e.stopPropagation()} className="apex-modal-card" style={{
        maxWidth: '480px', width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        background: C.card,
        border: `1px solid ${C.borderHot}`,
        borderRadius: '20px', padding: 'clamp(20px, 4vw, 36px)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,59,48,0.08)',
        animation: 'slideUp 0.35s cubic-bezier(.16,1,.3,1) both',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: '800', color: C.white, margin: 0 }}>
              Зафиксировать расчёт
            </h3>
            <p style={{ color: C.muted, fontSize: '0.85rem', marginTop: '4px', marginBottom: 0 }}>Цена действительна 48 часов</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '8px', color: C.muted, width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
        </div>

        {/* Summary */}
        <div style={{ background: C.surface, borderRadius: '12px', padding: '16px', marginBottom: '24px', border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: '0.78rem', color: C.muted, fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>Ваш расчёт</div>
          <div style={{ color: C.white, fontSize: '0.85rem', marginBottom: '4px' }}>🚗 {carClass}</div>
          {selectedServices.map((s, i) => <div key={i} style={{ color: '#9CA3AF', fontSize: '0.82rem' }}>• {s}</div>)}
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: C.muted, fontSize: '0.85rem' }}>Итого от:</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '800', fontSize: '1.3rem', background: gradRed, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {total.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#4ADE80', fontWeight: '600', fontSize: '1rem' }}>
            ✅ Отправляем вашу заявку…
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'name', placeholder: 'Ваше имя', type: 'text' },
              { name: 'phone', placeholder: '+7 (___) ___-__-__', type: 'tel' },
              { name: 'date', placeholder: 'Удобная дата (необязательно)', type: 'text' },
            ].map(f => (
              <input key={f.name}
                type={f.type}
                placeholder={f.placeholder}
                required={f.name !== 'date'}
                value={form[f.name]}
                onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                style={{
                  padding: '13px 16px',
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: '10px',
                  color: C.white, fontSize: '0.9rem',
                  outline: 'none', fontFamily: "'Inter', sans-serif",
                }}
              />
            ))}
            <button type="submit" style={{
              padding: '14px',
              background: gradRed,
              border: 'none', borderRadius: '10px',
              color: '#fff', fontWeight: '700', fontSize: '0.95rem',
              cursor: 'pointer', marginTop: '4px',
              boxShadow: '0 6px 24px rgba(255,59,48,0.4)',
              transition: 'transform 0.15s',
            }}>
              Записаться и зафиксировать цену →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─── CALCULATOR SECTION ─── */
const CAR_CLASSES = [
  { id: 'sedan',   label: 'Седан / Купе',       icon: '🚗', desc: 'BMW 3, Kia K5, Camry', coeff: 1.0 },
  { id: 'crossover', label: 'Кроссовер',         icon: '🚙', desc: 'RAV4, X5, Tucson',     coeff: 1.25 },
  { id: 'suv',     label: 'Внедорожник / Джип',  icon: '🛻', desc: 'Defender, GLS, Patrol', coeff: 1.5 },
  { id: 'sport',   label: 'Спорткар',            icon: '🏎️', desc: 'Porsche, Ferrari, GT-R', coeff: 1.7 },
];

const SERVICES = [
  { id: 'polish',   label: 'Полировка кузова + Керамика 9H',       basePrice: 32000, desc: '2–3 слоя, защита 5 лет' },
  { id: 'film',     label: 'Антигравийная оклейка зон риска',       basePrice: 28000, desc: 'Капот, фары, бампер, пороги' },
  { id: 'interior', label: 'Полная химчистка салона',               basePrice: 16000, desc: 'С консервацией кожи и тканей' },
  { id: 'glass',    label: 'Антидождь + Шумоизоляция арок',        basePrice: 9000,  desc: 'Все стёкла + 4 арки' },
];

function Calculator({ onBook }) {
  const [carClass, setCarClass] = useState('sedan');
  const [checked, setChecked] = useState({});

  const coeff = CAR_CLASSES.find(c => c.id === carClass)?.coeff || 1;
  const total  = SERVICES.reduce((sum, s) => checked[s.id] ? sum + Math.round(s.basePrice * coeff) : sum, 0);
  const selectedServiceLabels = SERVICES.filter(s => checked[s.id]).map(s => s.label);
  const carLabel = CAR_CLASSES.find(c => c.id === carClass)?.label || '';

  const toggle = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));

  return (
    <section id="calc" style={{ padding: '100px 24px', background: C.surface, position: 'relative', overflow: 'hidden', scrollMarginTop: '80px' }}>
      <div id="калькулятор" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      {/* Carbon grid bg */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Tag>⚡ Онлайн-калькулятор</Tag>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '900', color: C.white,
            marginTop: '16px', marginBottom: '12px', lineHeight: 1.1,
          }}>
            Рассчитайте стоимость онлайн
            <br />
            <span style={{ background: gradRed, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              за 30 секунд
            </span>
          </h2>
          <p style={{ color: C.muted, fontSize: '1rem' }}>Без звонков и ожидания. Цена зафиксируется договором.</p>
        </div>

        <div className="calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px', alignItems: 'start' }}>
          {/* Left: steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Step 1 */}
            <div className="calc-card" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '18px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: gradRed, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', color: '#fff', flexShrink: 0 }}>1</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: '700', color: C.white, margin: 0 }}>Класс вашего автомобиля</h3>
              </div>
              <div className="car-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {CAR_CLASSES.map(c => (
                  <button key={c.id} onClick={() => setCarClass(c.id)} style={{
                    padding: '16px',
                    background: carClass === c.id ? gradRedSub : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${carClass === c.id ? C.red : C.border}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}>
                    <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{c.icon}</div>
                    <div style={{ color: carClass === c.id ? C.white : '#9CA3AF', fontWeight: '700', fontSize: '0.88rem', fontFamily: "'Outfit', sans-serif" }}>{c.label}</div>
                    <div style={{ color: C.muted, fontSize: '0.73rem', marginTop: '2px' }}>{c.desc}</div>
                    {carClass === c.id && (
                      <div style={{ marginTop: '8px', fontSize: '0.73rem', color: C.red, fontWeight: '700' }}>
                        Коэф. ×{c.coeff.toFixed(2)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="calc-card" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '18px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: gradRed, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', color: '#fff', flexShrink: 0 }}>2</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: '700', color: C.white, margin: 0 }}>Выберите услуги</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SERVICES.map(s => {
                  const price = Math.round(s.basePrice * coeff);
                  const active = !!checked[s.id];
                  return (
                    <label key={s.id} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '14px',
                      padding: '16px',
                      background: active ? gradRedSub : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${active ? C.red + '60' : C.border}`,
                      borderRadius: '12px', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '2px',
                        background: active ? C.red : 'transparent',
                        border: `2px solid ${active ? C.red : C.dim}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}>
                        {active && <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: '900' }}>✓</span>}
                      </div>
                      <input type="checkbox" style={{ display: 'none' }} checked={active} onChange={() => toggle(s.id)} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: active ? C.white : '#D1D5DB', fontWeight: '600', fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif" }}>{s.label}</div>
                        <div style={{ color: C.muted, fontSize: '0.78rem', marginTop: '2px' }}>{s.desc}</div>
                      </div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '800', fontSize: '1rem', color: active ? C.red : C.muted, whiteSpace: 'nowrap' }}>
                        от {price.toLocaleString('ru-RU')} ₽
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: summary */}
          <div style={{ position: 'sticky', top: '24px', background: C.card, border: `1px solid ${C.borderHot}`, borderRadius: '18px', padding: '24px', boxShadow: '0 0 40px rgba(255,59,48,0.07)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: C.red, marginBottom: '16px' }}>📋 Итоговая смета</div>

            <div style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ color: C.muted, fontSize: '0.75rem', marginBottom: '4px' }}>Класс авто</div>
              <div style={{ color: C.white, fontWeight: '600', fontSize: '0.9rem' }}>
                {CAR_CLASSES.find(c => c.id === carClass)?.icon} {carLabel}
              </div>
            </div>

            <div style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ color: C.muted, fontSize: '0.75rem', marginBottom: '8px' }}>Выбранные услуги</div>
              {selectedServiceLabels.length === 0
                ? <div style={{ color: C.dim, fontSize: '0.82rem', fontStyle: 'italic' }}>Выберите хотя бы одну услугу</div>
                : selectedServiceLabels.map((l, i) => (
                    <div key={i} style={{ display: 'flex', gap: '6px', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ color: C.red }}>✓</span> {l}
                    </div>
                  ))
              }
            </div>

            {/* Total */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ color: C.muted, fontSize: '0.75rem', marginBottom: '4px' }}>Итого от:</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '2.2rem', background: gradRed, WebkitBackgroundClip: 'text', WebkitTextFillColor: total > 0 ? 'transparent' : C.dim }}>
                {total > 0 ? total.toLocaleString('ru-RU') + ' ₽' : '0 ₽'}
              </div>
            </div>

            {/* Gift */}
            {total > 0 && (
              <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '10px', padding: '10px 12px', marginBottom: '16px' }}>
                <div style={{ color: '#4ADE80', fontSize: '0.78rem', fontWeight: '700' }}>🎁 Подарок при записи сегодня</div>
                <div style={{ color: '#9CA3AF', fontSize: '0.75rem', marginTop: '2px' }}>Мойка двигателя + Озонация салона</div>
              </div>
            )}

            <button
              onClick={() => total > 0 && onBook(selectedServiceLabels, carLabel, total)}
              style={{
                width: '100%', padding: '14px',
                background: total > 0 ? gradRed : C.dim,
                border: 'none', borderRadius: '12px',
                color: '#fff', fontWeight: '700', fontSize: '0.9rem',
                cursor: total > 0 ? 'pointer' : 'not-allowed',
                boxShadow: total > 0 ? '0 6px 24px rgba(255,59,48,0.35)' : 'none',
                transition: 'all 0.2s',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {total > 0 ? 'Зафиксировать цену и записаться →' : 'Выберите услуги выше'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '10px', color: C.muted, fontSize: '0.72rem' }}>
              🔒 Цена фиксируется в договоре. Без скрытых доп. работ.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .calc-grid { grid-template-columns: 1fr !important; }
          .calc-grid > div:last-child { position: static !important; }
        }
        @media (max-width: 600px) {
          .car-grid { grid-template-columns: 1fr !important; }
          .calc-card { padding: 18px 14px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── BEFORE / AFTER SECTION ─── */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseMove = useCallback((e) => { if (dragging) updatePos(e.clientX); }, [dragging, updatePos]);
  const onTouchMove = useCallback((e) => { e.preventDefault(); updatePos(e.touches[0].clientX); }, [updatePos]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', () => setDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', () => setDragging(false));
    };
  }, [dragging, onMouseMove]);

  const cases = [
    { car: 'Porsche 911 GT3', services: ['Полировка кузова', 'Керамика 9H (3 слоя)', 'Полировка оптики'], time: '4 дня', price: '87 000 ₽', emoji: '🏎️' },
    { car: 'BMW M5 Competition', services: ['Антигравийная оклейка (полная)', 'Химчистка салона Nappa'], time: '6 дней', price: '124 000 ₽', emoji: '🚗' },
    { car: 'Mercedes-Benz G63', services: ['Полировка', 'Керамика', 'Шумоизоляция арок', 'Антидождь'], time: '5 дней', price: '112 000 ₽', emoji: '🛻' },
    { car: 'Zeekr 001', services: ['Защитная плёнка ПУ (полный кузов)', 'Химчистка', 'Тонировка'], time: '7 дней', price: '98 000 ₽', emoji: '⚡' },
  ];

  return (
    <section id="portfolio" style={{ padding: '100px 24px', background: C.bg, position: 'relative', scrollMarginTop: '80px' }}>
      <div id="работы" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <div id="cases" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Tag>🔍 До и После</Tag>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '900', color: C.white,
            marginTop: '16px', marginBottom: '12px',
          }}>
            Посмотрите разницу своими глазами
          </h2>
          <p style={{ color: C.muted, fontSize: '1rem' }}>Потяните ползунок влево или вправо</p>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          onMouseDown={(e) => { setDragging(true); updatePos(e.clientX); }}
          onTouchStart={(e) => updatePos(e.touches[0].clientX)}
          onTouchMove={onTouchMove}
          style={{
            position: 'relative', width: '100%', height: 'clamp(240px, 45vw, 420px)',
            borderRadius: '20px', overflow: 'hidden',
            cursor: 'ew-resize', userSelect: 'none',
            border: `1px solid ${C.border}`,
            marginBottom: '60px',
          }}
        >
          {/* BEFORE — dull gray car */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80"
              alt="До полировки"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.3) brightness(0.75) contrast(1.1)' }}
            />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', padding: '6px 14px', background: 'rgba(0,0,0,0.7)', borderRadius: '100px', color: '#fff', fontSize: '0.8rem', fontWeight: '700', backdropFilter: 'blur(4px)' }}>ДО</div>
          </div>

          {/* AFTER — shiny car */}
          <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img
              src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80"
              alt="После полировки"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.6) brightness(1.1) contrast(1.05)' }}
            />
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '6px 14px', background: gradRed, borderRadius: '100px', color: '#fff', fontSize: '0.8rem', fontWeight: '700' }}>ПОСЛЕ</div>
          </div>

          {/* Divider */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0,
            left: `${pos}%`,
            transform: 'translateX(-50%)',
            width: '3px', background: '#fff',
            boxShadow: '0 0 12px rgba(255,255,255,0.8)',
            zIndex: 10,
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', color: '#333',
            }}>⟺</div>
          </div>
        </div>

        {/* Cases */}
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', fontWeight: '800', color: C.white, marginBottom: '28px', textAlign: 'center' }}>
          Выполненные работы
        </h3>
        <div className="cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
          {cases.map((c, i) => (
            <div key={i} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: '16px', padding: '22px',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.red + '50'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '2rem' }}>{c.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '800', color: C.white, fontSize: '1rem' }}>{c.car}</div>
                  <div style={{ color: C.muted, fontSize: '0.75rem' }}>{c.time}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.1rem', background: gradRed, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {c.price}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {c.services.map(s => (
                  <span key={s} style={{ padding: '3px 10px', background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', borderRadius: '100px', fontSize: '0.72rem', color: '#F87171', fontWeight: '500' }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── HEADER ─── */
function ApexHeader({ onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Услуги', id: 'services' },
    { label: 'Калькулятор', id: 'calc' },
    { label: 'Работы', id: 'portfolio' },
    { label: 'Контакты', id: 'contacts' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = id.toLowerCase();
    const el = document.getElementById(targetId) ||
               document.getElementById(id) ||
               (targetId === 'calc' || targetId === 'калькулятор' ? document.getElementById('calc') : null) ||
               (targetId === 'portfolio' || targetId === 'работы' ? document.getElementById('portfolio') : null) ||
               (targetId === 'services' || targetId === 'услуги' ? document.getElementById('services') : null) ||
               (targetId === 'contacts' || targetId === 'контакты' ? document.getElementById('contacts') : null);
    if (el) {
      const headerHeight = 70;
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
      background: 'rgba(11,11,14,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '68px', gap: '20px', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', background: gradRed, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif", fontWeight: '900', color: '#fff', fontSize: '1rem' }}>A</div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1rem', color: C.white, letterSpacing: '0.06em', lineHeight: 1 }}>APEX</div>
              <div style={{ fontSize: '0.6rem', color: C.muted, fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase' }}>DETAILING SPb</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '6px' }} className="apex-nav">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => handleNavClick(e, item.id)}
                style={{
                  padding: '8px 14px',
                  color: C.muted,
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = C.white; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="apex-rating">
              <span style={{ color: '#FBBF24', fontSize: '0.85rem' }}>⭐</span>
              <span style={{ color: C.white, fontWeight: '700', fontSize: '0.85rem' }}>5.0</span>
              <span style={{ color: C.muted, fontSize: '0.75rem' }}>Яндекс.Карты (148)</span>
            </div>

            {/* CTA */}
            <button onClick={onBook} style={{
              padding: '9px 20px',
              background: gradRed,
              border: 'none', borderRadius: '9px',
              color: '#fff', fontWeight: '700', fontSize: '0.82rem',
              cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 4px 16px rgba(255,59,48,0.35)',
              fontFamily: "'Inter', sans-serif",
              whiteSpace: 'nowrap'
            }}>
              Записаться
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="apex-burger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${C.border}`,
                borderRadius: '8px',
                color: C.white,
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                lineHeight: 1,
              }}
              aria-label="Меню"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div style={{
            padding: '12px 0 18px',
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
                  padding: '10px 14px',
                  color: C.white,
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.04)',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .apex-nav { display: none !important; }
          .apex-rating { display: none !important; }
          .apex-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
}

/* ─── HERO SECTION ─── */
function HeroSection({ onBook }) {
  return (
    <section style={{
      minHeight: '90vh',
      display: 'flex', alignItems: 'center',
      padding: '80px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&q=80"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.25 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,11,14,0.97) 40%, rgba(11,11,14,0.7) 100%)' }} />
      </div>

      {/* Glow */}
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,59,48,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: '680px' }}>
          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
            {['Оклейка ПУ-плёнкой', 'Керамика в 3 слоя', 'Химчистка с разбором'].map(b => <Tag key={b}>{b}</Tag>)}
          </div>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontWeight: '900', lineHeight: 1.05,
            color: C.white, marginBottom: '24px',
          }}>
            Вернём вашему авто<br />
            <span style={{ background: gradRed, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              состояние нового
            </span>{' '}
            из салона<br />
            и защитим кузов на 5 лет
          </h1>

          <p style={{ color: '#9CA3AF', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '36px', maxWidth: '520px' }}>
            Гарантия по договору. Используем только сертифицированные материалы
            GYEON, Ceramic Pro и 3M. Студия в Санкт-Петербурге, ул. Лиговский пр., 43.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button onClick={onBook} style={{
              padding: '15px 32px',
              background: gradRed,
              border: 'none', borderRadius: '12px',
              color: '#fff', fontWeight: '700', fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 8px 28px rgba(255,59,48,0.4)',
              fontFamily: "'Inter', sans-serif",
            }}>
              ⚡ Записаться в 1 клик
            </button>
            <button
              onClick={() => document.getElementById('calc')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '15px 32px',
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                color: C.white, fontWeight: '600', fontSize: '1rem',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Рассчитать стоимость →
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { value: '11 лет', label: 'на рынке' },
              { value: '2 400+', label: 'авто обработано' },
              { value: '5 лет', label: 'гарантия по договору' },
            ].map(s => (
              <div key={s.value}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.6rem', background: gradRed, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
                <div style={{ color: C.muted, fontSize: '0.8rem', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES SECTION ─── */
function ServicesSection() {
  const services = [
    { icon: '✨', title: 'Полировка + Керамика 9H', desc: 'Полная машинная полировка кузова с устранением царапин, окислов и голограмм. Нанесение жидкой керамики в 3 слоя с защитой на 5 лет.', price: 'от 32 000 ₽', time: '2–3 дня' },
    { icon: '🛡️', title: 'Антигравийная оклейка ПУ', desc: 'Прозрачная полиуретановая плёнка на зоны риска или весь кузов. Самовосстанавливающееся покрытие толщиной 200 мкм. Гарантия 10 лет.', price: 'от 28 000 ₽', time: '3–6 дней' },
    { icon: '🧽', title: 'Химчистка салона', desc: 'Полный разбор салона, паровая чистка, консервация кожи Leather Master, устранение запахов. Результат как у нового автомобиля.', price: 'от 16 000 ₽', time: '1–2 дня' },
    { icon: '💧', title: 'Антидождь + Тонировка', desc: 'Нанофобное покрытие на все стёкла с эффектом самоочищения. Тонировка плёнкой Llumar с защитой от ультрафиолета до 99%.', price: 'от 9 000 ₽', time: '1 день' },
  ];

  return (
    <section id="services" style={{ padding: '100px 24px', background: C.surface, position: 'relative', scrollMarginTop: '80px' }}>
      <div id="услуги" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Tag>🔧 Услуги студии</Tag>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '900', color: C.white, marginTop: '16px' }}>
            Что мы делаем
          </h2>
        </div>
        <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: '18px', padding: '28px',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.red}50`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 40px rgba(255,59,48,0.08)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: '800', color: C.white, marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ color: C.muted, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '18px' }}>{s.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.1rem', background: gradRed, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.price}</span>
                <span style={{ color: C.muted, fontSize: '0.78rem', background: 'rgba(255,255,255,0.04)', padding: '3px 10px', borderRadius: '100px', border: `1px solid ${C.border}` }}>⏱ {s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .svc-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ─── REVIEWS ─── */
function Reviews() {
  const reviews = [
    { name: 'Андрей К.', car: 'BMW M5', rating: 5, text: 'Отдал машину в идеальном состоянии, забрал в ещё более идеальном. Керамика нанесена безупречно — вода скатывается как будто по воску. Рекомендую!', date: '2 нед. назад' },
    { name: 'Мария П.', car: 'Porsche Cayenne', rating: 5, text: 'Химчистка салона — шедевр. Стойкий запах кожи ушёл полностью, кожа теперь мягкая и приятная. Работали аккуратно, сдали в срок.', date: '1 мес. назад' },
    { name: 'Сергей В.', car: 'Mercedes GLS', rating: 5, text: 'Оклеили весь кузов ПУ-плёнкой. Результат выше всяких похвал. Видно, что ребята профессионалы — каждый стык идеален.', date: '3 нед. назад' },
  ];

  return (
    <section style={{ padding: '80px 24px', background: C.bg }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Tag>⭐ Отзывы</Tag>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: '900', color: C.white, marginTop: '16px' }}>
            148 отзывов на Яндекс.Картах — рейтинг 5.0
          </h2>
        </div>
        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '22px' }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                {[...Array(r.rating)].map((_, j) => <span key={j} style={{ color: '#FBBF24', fontSize: '0.9rem' }}>★</span>)}
              </div>
              <p style={{ color: '#D1D5DB', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '16px' }}>"{r.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: C.white, fontWeight: '700', fontSize: '0.85rem' }}>{r.name}</div>
                  <div style={{ color: C.muted, fontSize: '0.75rem' }}>{r.car}</div>
                </div>
                <div style={{ color: C.muted, fontSize: '0.72rem' }}>{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .reviews-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ─── FOOTER ─── */
function ApexFooter({ onBook }) {
  return (
    <footer id="contacts" style={{ padding: '80px 24px 40px', background: C.surface, borderTop: `1px solid ${C.border}`, position: 'relative', scrollMarginTop: '80px' }}>
      <div id="контакты" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="apex-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '56px' }}>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '900', fontSize: '1.5rem', color: C.white, marginBottom: '8px' }}>
              APEX <span style={{ background: gradRed, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DETAILING</span>
            </div>
            <p style={{ color: C.muted, fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '300px', marginBottom: '20px' }}>
              Студия премиального детейлинга и оклейки авто в Санкт-Петербурге. Работаем по договору с гарантией 5 лет.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: '📍', text: 'Лиговский пр., 43, Санкт-Петербург' },
                { icon: '📞', text: '+7 (812) 000-00-00' },
                { icon: '🕐', text: 'Пн–Сб: 9:00–20:00' },
              ].map(c => (
                <div key={c.text} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span>{c.icon}</span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: '800', color: C.white, marginBottom: '12px' }}>
              Готовы записать вашу машину?
            </h3>
            <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.6 }}>
              Оставьте заявку — мы перезвоним в течение 15 минут и ответим на все вопросы
            </p>
            <button onClick={onBook} style={{
              padding: '15px 28px',
              background: gradRed,
              border: 'none', borderRadius: '12px',
              color: '#fff', fontWeight: '700', fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255,59,48,0.35)',
              fontFamily: "'Inter', sans-serif",
              alignSelf: 'flex-start',
            }}>
              ⚡ Записаться онлайн
            </button>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ color: C.muted, fontSize: '0.78rem' }}>© 2024 APEX Detailing SPb · Все права защищены</div>
          <div style={{ color: '#374151', fontSize: '0.72rem' }}>Демо-сайт из портфолио Владислава Морозова</div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .apex-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function DemoDetailing() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingServices, setBookingServices] = useState([]);
  const [bookingCarClass, setBookingCarClass] = useState('Седан / Купе');
  const [bookingTotal, setBookingTotal] = useState(0);

  const openBooking = (services = [], carClass = 'Седан / Купе', total = 0) => {
    setBookingServices(services);
    setBookingCarClass(carClass);
    setBookingTotal(total);
    setBookingOpen(true);
  };

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'Inter', sans-serif", paddingBottom: '80px' }}>
      {/* Global font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
      `}</style>

      <DemoBar projectName="Apex Detailing SPb" />

      <ApexHeader onBook={() => openBooking()} />
      <HeroSection onBook={() => openBooking()} />
      <ServicesSection />
      <Calculator onBook={openBooking} />
      <BeforeAfter />
      <Reviews />
      <ApexFooter onBook={() => openBooking()} />

      {bookingOpen && (
        <BookingModal
          selectedServices={bookingServices}
          carClass={bookingCarClass}
          total={bookingTotal}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  );
}
