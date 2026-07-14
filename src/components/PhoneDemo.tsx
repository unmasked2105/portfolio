import { useState, useCallback, useRef, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import type { CartItem, Product } from '../types';

/* ───── helpers ───── */
const sid = 'sess_' + Math.random().toString(36).slice(2, 8);
let seq = 0;
const ts = () => new Date().toLocaleTimeString('en-IN', { hour12: false }) + '.' + String(Date.now() % 1000).padStart(3, '0');

type PipelineStage = 'raw' | 'clean' | 'etl' | 'analytics';

/* ───── realistic pipeline payloads ───── */
function rawEvent(eventType: string, product: Product, qty: number) {
  return [
    `{ "event": "${eventType}", "session": "${sid}", "seq": ${++seq},`,
    `  "product_id": ${product.id}, "name": "${product.name}",`,
    `  "category": "${product.category}", "price": ${product.price},`,
    `  "qty": ${qty}, "ts": "${ts()}", "source": "web" }`,
  ].join('\n');
}

function cleanValidation(product: Product, issue?: string) {
  const checks = [
    `✓ schema: event${issue ? '' : ', product_id, ts'} → OK`,
    `✓ type: price=${typeof product.price}, id=${typeof product.id}`,
    `✓ range: price ${product.price > 0 ? '> 0' : '≤ 0'} — ${product.price > 0 ? 'PASS' : 'FAIL'}`,
    `✓ nullable: name="${product.name}" — NOT NULL`,
  ];
  if (issue) checks.push(`⚠  ${issue}`);
  checks.push(`▸ row_size: ${80 + product.name.length + product.category.length} B`);
  return checks.join('\n');
}

function etlTransform(product: Product, allCart: CartItem[]) {
  const catTotal = allCart.filter(c => c.category === product.category).reduce((s, c) => s + c.price * c.qty, 0);
  const totalRev = allCart.reduce((s, c) => s + c.price * c.qty, 0);
  const pct = totalRev > 0 ? ((catTotal / totalRev) * 100).toFixed(1) : '0.0';
  return [
    `── JOIN products ON cart.product_id = products.id ──`,
    `  enriched: { product: "${product.name}", category: "${product.category}", brand: "N/A" }`,
    `── AGG ${product.category} (SUM(price*qty)) ──`,
    `  cat_revenue: $${catTotal.toFixed(2)}  (${pct}% of cart)`,
    `── WINDOW RANK() OVER(PARTITION BY category ORDER BY revenue DESC) ──`,
    `  rank #1 in ${product.category}`,
  ].join('\n');
}

function analyticsInsight(product: Product, allCart: CartItem[]) {
  const avg = allCart.length ? (allCart.reduce((s, c) => s + c.price, 0) / allCart.length) : 0;
  return [
    `📈 KPI: ${product.category} contributes $${(allCart.filter(c => c.category === product.category).reduce((s, c) => s + c.price * c.qty, 0)).toFixed(2)} revenue`,
    `📊 avg_order_value: $${avg.toFixed(2)}`,
    `🏆 top_product: "${product.name}" — $${(product.price).toFixed(2)}/unit`,
    `💡 insight: "${product.category}" trending — recommend cross-sell: ${
      product.category === 'Footwear' ? 'Accessories' :
      product.category === 'Audio' ? 'Wearables' :
      product.category === 'Wearables' ? 'Accessories' :
      product.category === 'Accessories' ? 'Laptops' :
      'Footwear'} bundle`,
  ].join('\n');
}

/* ───── component ───── */
export default function PhoneDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const [pipeline, setPipeline] = useState<Record<PipelineStage, string[]>>({ raw: [], clean: [], etl: [], analytics: [] });

  const toastTimer = useRef<number>(0);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setToastKey(k => k + 1);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2500);
  }, []);

  const pushEvent = useCallback((stage: PipelineStage, payload: string) => {
    setPipeline(prev => ({ ...prev, [stage]: [...prev[stage], payload] }));
  }, []);

  const simulatePipeline = useCallback((product: Product, eventType: string, qty: number, allCart: CartItem[]) => {
    /* raw  ── instant */
    pushEvent('raw', rawEvent(eventType, product, qty));
    /* clean ── 600 ms */
    setTimeout(() => {
      pushEvent('clean', cleanValidation(product));
    }, 600);
    /* etl   ── 1200 ms */
    setTimeout(() => {
      pushEvent('etl', etlTransform(product, allCart));
    }, 1200);
    /* analytics ── 2000 ms */
    setTimeout(() => {
      pushEvent('analytics', analyticsInsight(product, allCart));
    }, 2000);
  }, [pushEvent]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      } else {
        next = [...prev, { ...product, qty: 1 }];
      }
      simulatePipeline(product, 'add_to_cart', next.find(c => c.id === product.id)!.qty, next);
      return next;
    });
    showToast(`➕ ${product.name} added`);
  }, [simulatePipeline, showToast]);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const checkout = useCallback(() => {
    if (cart.length === 0) return;
    const snapshot = [...cart];
    /* simulate a 'checkout' event through the pipe */
    snapshot.forEach(item => {
      const p = PRODUCTS.find(x => x.id === item.id)!;
      simulatePipeline(p, 'checkout', item.qty, snapshot);
    });
    setCart([]);
    setCartOpen(false);
    showToast('✅ Order placed!');
  }, [cart, simulatePipeline, showToast]);

  const pipelineRefs = {
    raw: useRef<HTMLDivElement>(null),
    clean: useRef<HTMLDivElement>(null),
    etl: useRef<HTMLDivElement>(null),
    analytics: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    Object.values(pipelineRefs).forEach(ref => {
      if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    });
  }, [pipeline]);

  const stages: { key: PipelineStage; title: string; subt: string; icon: string; badge: string; color: string }[] = [
    { key: 'raw',   title: 'Bronze — Raw Ingestion',  subt: 'Unprocessed event stream from source',              icon: '📡', badge: 'SOURCE',  color: '#f59e0b' },
    { key: 'clean', title: 'Silver — Data Quality',    subt: 'Schema validation, type checks, dedup, profiling', icon: '🧹',  badge: 'VALIDATE', color: '#06b6d4' },
    { key: 'etl',   title: 'Gold — ETL Transform',     subt: 'JOIN, AGG, WINDOW — execution plan',               icon: '⚙️',  badge: 'TRANSFORM',color: '#a855f7' },
    { key: 'analytics', title: 'Insights — BI Ready',  subt: 'Business metrics, KPIs, recommendations',           icon: '📊', badge: 'REPORT',  color: '#22c55e' },
  ];

  return (
    <section id="demo" className="section demo" data-reveal="fade-up">
      <div className="container">
        <div className="section-header" data-reveal="fade-up">
          <span className="section-num">✦</span>
          <h2 className="section-title">Data Engineering <span className="gradient-text">in Action</span></h2>
          <div className="section-line" />
        </div>
        <p className="demo-intro" data-reveal="fade-up">
          Tap around the shop below. Watch how every click generates real data
          that flows through a <strong>complete ETL pipeline</strong> —
          <strong> Bronze → Silver → Gold → Insights</strong>.
        </p>

        <div className="demo-layout" data-reveal="fade-up">
          {/* ─── Phone ─── */}
          <div className="phone-col">
            <div className="phone-frame">
              <div className="phone-dynamic-island" />
              <div className="phone-screen">
                <div className="app-header">
                  <div className="app-logo"><i className="fas fa-store" /> ShopFlow</div>
                  <button className="app-cart-btn" onClick={() => setCartOpen(o => !o)} aria-label="Cart">
                    <i className="fas fa-shopping-bag" />
                    {cart.length > 0 && <span className="app-cart-count">{cart.reduce((s, c) => s + c.qty, 0)}</span>}
                  </button>
                </div>
                <div className="app-products">
                  {PRODUCTS.map(p => (
                    <div key={p.id} className="prod-card">
                      <div className="prod-emoji">{p.emoji}</div>
                      <div className="prod-info">
                        <span className="prod-name">{p.name}</span>
                        <span className="prod-price">${p.price.toFixed(2)}</span>
                      </div>
                      <button className="prod-add-btn" onClick={() => addToCart(p)} aria-label={`Add ${p.name}`}>+</button>
                    </div>
                  ))}
                </div>

                {cartOpen && (
                  <div className="app-cart-overlay open" onClick={() => setCartOpen(false)}>
                    <div className="app-cart-panel" onClick={e => e.stopPropagation()}>
                      <div className="cart-panel-header">
                        <h3>Your Cart</h3>
                        <button className="cart-close" onClick={() => setCartOpen(false)}><i className="fas fa-times" /></button>
                      </div>
                      <div className="cart-panel-body">
                        {cart.length === 0 ? (
                          <div className="cart-empty"><i className="fas fa-shopping-bag" /><p>Cart is empty</p></div>
                        ) : (
                          cart.map(item => (
                            <div key={item.id} className="cart-item">
                              <span>{item.emoji} {item.name} x{item.qty}</span>
                              <span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
                              <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}><i className="fas fa-times" /></button>
                            </div>
                          ))
                        )}
                      </div>
                      {cart.length > 0 && (
                        <div className="cart-panel-footer">
                          <div className="cart-total">
                            <span>Total</span>
                            <span>${cart.reduce((s, c) => s + c.price * c.qty, 0).toFixed(2)}</span>
                          </div>
                          <button className="cart-checkout" onClick={checkout}><i className="fas fa-rocket" /> Checkout</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="phone-home-bar" />
            </div>

            <div className="phone-legend">
              <span><span className="legend-dot source" /> Event Source</span>
              <span><span className="legend-dot pipe" /> ETL Pipeline</span>
              <span><span className="legend-dot sink" /> BI Output</span>
            </div>
          </div>

          {/* ─── Pipeline ─── */}
          <div className="pipeline-col">
            {stages.map(s => (
              <div key={s.key} className="pipeline-stage">
                <div className="pipeline-stage-header" style={{ borderLeftColor: s.color }}>
                  <div className="pipeline-stage-info">
                    <span className="pipeline-stage-title">
                      {s.icon} {s.title}
                      <span className="pipeline-badge" style={{ background: s.color + '22', color: s.color }}>{s.badge}</span>
                    </span>
                    <span className="pipeline-stage-desc">{s.subt}</span>
                  </div>
                  <span className="pipeline-stage-count" style={{ color: s.color }}>{pipeline[s.key].length}</span>
                </div>
                <div className="pipeline-stage-body" ref={pipelineRefs[s.key as keyof typeof pipelineRefs]}>
                  {pipeline[s.key].length === 0 ? (
                    <div className="pipeline-empty"><i className="fas fa-arrow-right" /><span>Waiting for data...</span></div>
                  ) : (
                    pipeline[s.key].map((line, i) => (
                      <div key={i} className="pipeline-block">
                        <span className="pipeline-line-num">{String(i + 1).padStart(2, '0')}</span>
                        <pre className="pipeline-pre">{line}</pre>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {toast && <div key={toastKey} className="app-toast show">{toast}</div>}
      </div>
    </section>
  );
}
