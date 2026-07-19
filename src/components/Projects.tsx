import { PROJECTS } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="section projects" data-reveal="fade-up">
      <div className="container">
        <div className="section-header" data-reveal="fade-up">
          <span className="section-num">03</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <article key={p.title} className="proj-card" data-reveal="fade-up" data-delay={i * 80}>
              <div className="proj-icon"><i className={`fas fa-${p.icon}`} aria-hidden="true"></i></div>
              <span className="proj-cat">{p.cat}</span>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              <a href={p.link} className="proj-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" aria-hidden="true"></i> Source</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
