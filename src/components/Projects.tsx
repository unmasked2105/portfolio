import type { Project } from '../types';

const PROJECTS: Project[] = [
  { icon: 'cloud-upload-alt', cat: 'Data Engineering', title: 'Cloud Data Pipeline', desc: 'End-to-end pipeline with Bronze, Silver, Gold layers on BigQuery & Dataform.', tags: ['GCP', 'Docker', 'PySpark', 'BigQuery'], link: 'https://github.com/unmasked2105' },
  { icon: 'plug', cat: 'Data Engineering', title: 'REST API Data Extractor', desc: 'Configurable extraction framework with Cloud Run Jobs & Cloud Workflow.', tags: ['Docker', 'Cloud Run', 'BigQuery', 'GCP'], link: 'https://github.com/unmasked2105' },
  { icon: 'parking', cat: 'Full-Stack', title: 'Advanced Parking System', desc: 'Real-time parking management with Vue.js, Flask, Redis, and Celery.', tags: ['Vue.js', 'Flask', 'Redis', 'Celery'], link: 'https://github.com/unmasked2105' },
  { icon: 'chart-bar', cat: 'AI / Full-Stack', title: 'Excel Analytics Platform', desc: 'Dashboards with RAG chatbot for natural language querying via vector embeddings.', tags: ['MERN', 'RAG', 'NLP', 'Vector Embeddings'], link: 'https://github.com/unmasked2105' },
];

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header" data-reveal="fade-up">
          <span className="section-num">03</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="proj-card" data-reveal="fade-up" data-delay={i * 80}>
              <div className="proj-icon"><i className={`fas fa-${p.icon}`}></i></div>
              <span className="proj-cat">{p.cat}</span>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              <a href={p.link} className="proj-link"><i className="fab fa-github"></i> Source</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
