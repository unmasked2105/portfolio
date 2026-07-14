import { useState, useEffect } from 'react';
export function BackToTop() {
  const [v, setV] = useState(false);
  useEffect(() => { const h = () => setV(window.scrollY > 400); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  return <button className={`back-to-top ${v ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><i className="fas fa-arrow-up"></i></button>;
}
