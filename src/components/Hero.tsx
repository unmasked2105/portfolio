import { useEffect, useState, lazy, Suspense } from 'react';

const HeroBg = lazy(() => import('./HeroBg'));

export function Hero() {
  const phrases = ['Data Engineer', 'Full-Stack Developer', 'Cloud Enthusiast', 'Pipeline Builder'];
  const [text, setText] = useState('');
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = phrases[pi];
    const speed = del ? 35 : 75;
    const t = setTimeout(() => {
      setText(del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1));
      if (del) setCi(c => c - 1); else setCi(c => c + 1);
    }, speed);
    return () => clearTimeout(t);
  });

  useEffect(() => {
    if (!del && ci === phrases[pi].length) {
      const t = setTimeout(() => setDel(true), 1800);
      return () => clearTimeout(t);
    }
    if (del && ci === 0) {
      setDel(false);
      setPi(i => (i + 1) % phrases.length);
      setCi(0);
    }
  }, [ci, del, pi]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero" aria-label="Hero banner">
      <Suspense fallback={<div id="bg-canvas" style={{ position:'absolute', inset:0, background:'var(--bg)' }} />}>
        <HeroBg />
      </Suspense>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge" data-reveal="fade-up">
            <i className="fas fa-database" aria-hidden="true"></i>
            <span>Data Engineer &middot; Full-Stack Developer</span>
          </div>
          <h1 className="hero-title" data-reveal="fade-up">
            Hi, I'm <span className="gradient-text">Deep Shah</span>
          </h1>
          <div className="hero-typing" data-reveal="fade-up" aria-live="polite" aria-label="Typing animation">
            <span>{text}</span>
            <span className="typing-cursor" aria-hidden="true">|</span>
          </div>
          <p className="hero-desc" data-reveal="fade-up">
            I build <strong>scalable data pipelines</strong> on GCP and create full-stack applications
            that turn raw data into actionable intelligence.
          </p>
          <nav className="hero-actions" data-reveal="fade-up" aria-label="Primary actions">
            <button className="btn btn-primary" onClick={() => scrollTo('demo')}>
              <i className="fas fa-play" aria-hidden="true"></i> See the Demo
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              <i className="fas fa-envelope" aria-hidden="true"></i> Contact Me
            </button>
            <a href="https://github.com/unmasked2105" target="_blank" rel="noopener noreferrer" className="btn btn-icon" aria-label="GitHub profile">
              <i className="fab fa-github" aria-hidden="true"></i>
            </a>
            <a href="https://leetcode.com/u/deeps2004/" target="_blank" rel="noopener noreferrer" className="btn btn-icon" aria-label="LeetCode profile">
              <i className="fas fa-code" aria-hidden="true"></i>
            </a>
            <a href="https://linkedin.com/in/deep-shah-183890256" target="_blank" rel="noopener noreferrer" className="btn btn-icon" aria-label="LinkedIn profile">
              <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
          </nav>
          <div className="hero-stats" data-reveal="fade-up">
            <div className="stat-item"><span className="stat-num">4</span><span className="stat-lbl">Internships</span></div>
            <div className="stat-dot" aria-hidden="true"></div>
            <div className="stat-item"><span className="stat-num">6+</span><span className="stat-lbl">Projects</span></div>
            <div className="stat-dot" aria-hidden="true"></div>
            <div className="stat-item"><span className="stat-num">2°</span><span className="stat-lbl">Degrees</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
