import { useState, useCallback, useRef, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import type { CartItem, Product } from '../types';

export default function PhoneDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const [_checkoutBurst, setCheckoutBurst] = useState(false);
  const [pipeline, setPipeline] = useState<Record<string, string[]>>({ raw: [], clean: [], etl: [], analytics: [] });

  const toastTimer = useRef<number>(0);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setToastKey(k => k + 1);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2500);
  }, []);

  const pushEvent = useCallback((stage: string, label: string) => {
    setPipeline(prev => ({ ...prev, [stage]: [...prev[stage], `${label} — ${new Date().toLocaleTimeString()}`] }));
  }, []);

  const simulatePipeline = useCallback((productName: string, eventType: string) => {
    pushEvent('raw', `📥 ${eventType}: ${productName}`);
    setTimeout(() => pushEvent('clean', `✓ Validated: ${productName}`), 400);
    setTimeout(() => pushEvent('etl', `⟳ Aggregated & enriched`), 900);
    setTimeout(() => pushEvent('analytics', `📊 Insight: ${productName} trending`), 1500);
  }, [pushEvent]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id);
      if (existing) return prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...product, qty: 1 }];
    });
    simulatePipeline(product.name, 'add_to_cart');
    showToast(`➕ ${product.name} added`);
  }, [simulatePipeline, showToast]);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const checkout = useCallback(() => {
    if (cart.length === 0) return;
    setCheckoutBurst(true);
    setTimeout(() => setCheckoutBurst(false), 800);
    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    simulatePipeline(`${cart.length} items ($${total.toFixed(2)})`, 'checkout');
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

  const stages: { key: string; title: string; desc: string; icon: string; color: string }[] = [
    { key: 'raw', title: 'Raw Data Collection', desc: 'Events ingested from user actions', icon: '📡', color: '#f59e0b' },
    { key: 'clean', title: 'Data Cleaning', desc: 'Validation, deduplication, formatting', icon: '🧹', color: '#06b6d4' },
    { key: 'etl', title: 'ETL Transformation', desc: 'Aggregation, enrichment, modeling', icon: '⚙️', color: '#a855f7' },
    { key: 'analytics', title: 'Analytics & Insights', desc: 'Business intelligence output', icon: '📊', color: '#22c55e' },
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
          that flows through a <strong>complete ETL pipeline</strong>.
        </p>

        <div className="demo-layout" data-reveal="fade-up">
          {/* Phone */}
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
          </div>

          {/* Pipeline */}
          <div className="pipeline-col">
            {stages.map(s => (
              <div key={s.key} className="pipeline-stage">
                <div className="pipeline-stage-header" style={{ borderLeftColor: s.color }}>
                  <div className="pipeline-stage-info">
                    <span className="pipeline-stage-title">{s.icon} {s.title}</span>
                    <span className="pipeline-stage-desc">{s.desc}</span>
                  </div>
                  <span className="pipeline-stage-count" style={{ color: s.color }}>{pipeline[s.key].length}</span>
                </div>
                <div className="pipeline-stage-body" ref={pipelineRefs[s.key as keyof typeof pipelineRefs]}>
                  {pipeline[s.key].length === 0 ? (
                    <div className="pipeline-empty"><i className="fas fa-arrow-right" /><span>Waiting for data...</span></div>
                  ) : (
                    pipeline[s.key].map((line, i) => <div key={i} className="pipeline-line">{line}</div>)
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
