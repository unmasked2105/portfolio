import { useEffect, useRef } from 'react';

const CATS = [
  { icon: 'database', title: 'Data Engineering', tags: ['ETL / ELT', 'Data Warehousing', 'Data Modeling', 'Medallion Arch', 'PySpark', 'Dataform'] },
  { icon: 'cloud', title: 'Cloud & Big Data', tags: ['GCP', 'BigQuery', 'Databricks', 'Hadoop', 'Docker', 'IAM'] },
  { icon: 'code', title: 'Programming', tags: ['Python', 'SQL', 'Java', 'PHP', 'C++', 'C'] },
  { icon: 'globe', title: 'Web Development', tags: ['MERN Stack', 'Flask', 'HTML/CSS', 'REST APIs', 'Vue.js', 'Node.js'] },
  { icon: 'brain', title: 'AI / ML', tags: ['RAG', 'NLP', 'Vector Embeddings', 'PyTorch'] },
  { icon: 'tools', title: 'Tools & Core', tags: ['Docker', 'Git/GitHub', 'DSA', 'OOP', 'DBMS', 'REST APIs'] },
];

const BARS = [
  { label: 'Python / SQL', pct: 90 }, { label: 'GCP & Cloud', pct: 85 },
  { label: 'Data Engineering', pct: 85 }, { label: 'Web Development', pct: 80 },
  { label: 'PySpark / Big Data', pct: 75 }, { label: 'AI / ML', pct: 70 },
];

export default function Skills() {
  const barsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.skill-bar-fill').forEach(b => b.classList.add('animated'));
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills" data-reveal="fade-up">
      <div className="container">
        <div className="section-header" data-reveal="fade-up">
          <span className="section-num">02</span>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {CATS.map((c, i) => (
            <div key={c.title} className="skill-card" data-reveal="fade-up" data-delay={i * 60}>
              <div className="skill-card-head">
                <i className={`fas fa-${c.icon}`}></i>
                <h3>{c.title}</h3>
              </div>
              <div className="skill-card-tags">
                {c.tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="skill-bars-wrap" ref={barsRef}>
          <h3 className="skill-bars-title">Proficiency</h3>
          <div className="skill-bars">
            {BARS.map(b => (
              <div key={b.label} className="skill-bar-item">
                <div className="skill-bar-head">
                  <span>{b.label}</span>
                  <span className="skill-bar-pct">{b.pct}%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ '--w': b.pct } as React.CSSProperties}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
