import { useEffect } from 'react';
export function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector('.scroll-progress') as HTMLElement;
    if (!bar) return;
    const h = () => { const s = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = `scaleX(${s > 0 ? window.scrollY / s : 0})`; };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return <div className="scroll-progress" />;
}
