import type { Experience } from '../types';

const EXP: Experience[] = [
  { role: 'AI Intern (Data Engineering)', company: 'Krish TechnoLabs', location: 'Ahmedabad', date: 'Jan 2026 – Present', current: true, desc: ['Designed scalable ETL pipelines using Medallion Architecture (Bronze, Silver, Gold).', 'Built ETL/ELT workflows on GCP with Docker containerization.', 'Orchestrated Databricks pipelines for automated data processing.'], tech: ['GCP', 'PySpark', 'Databricks', 'BigQuery'] },
  { role: 'Full-Stack Developer Intern', company: 'Zidio Development', date: 'May 2025 – July 2025', desc: ['Developed MERN-based web applications with secure REST APIs.', 'Implemented authentication, testing, and deployment workflows.'], tech: ['MERN', 'REST APIs', 'Auth', 'Deployment'] },
  { role: 'Flask Web Developer Intern', company: 'MiG Arch', location: 'Vadodara', date: 'May 2024 – June 2024', desc: ['Developed Flask-based web apps using HTML, CSS, and Python.', 'Assisted with deployment and debugging.'], tech: ['Flask', 'Python', 'HTML/CSS'] },
  { role: 'Web Development Intern', company: 'Dolphin Web Solution', location: 'Ahmedabad', date: 'May 2023 – June 2023', desc: ['Contributed to front-end and back-end web development.', 'Resolved technical issues and implemented features.'], tech: ['HTML/CSS', 'JavaScript', 'Web Dev'] },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section experience" data-reveal="fade-up">
      <div className="container">
        <div className="section-header" data-reveal="fade-up">
          <span className="section-num">04</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>
        <div className="exp-timeline">
          {EXP.map((e, i) => (
            <div key={i} className="exp-item" data-reveal="fade-up">
              <div className={`exp-dot ${e.current ? 'current-dot' : ''}`} aria-hidden="true" />
              <div className="exp-card">
                {e.current && <span className="exp-badge current">Current</span>}
                <h3 className="exp-role">{e.role}</h3>
                <div className="exp-company">
                  <i className="fas fa-building" aria-hidden="true"></i> {e.company}
                  {e.location && <span className="exp-loc"><i className="fas fa-map-marker-alt" aria-hidden="true"></i> {e.location}</span>}
                </div>
                <span className="exp-date"><i className="far fa-calendar-alt" aria-hidden="true"></i> {e.date}</span>
                <ul className="exp-desc">
                  {e.desc.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
                <div className="exp-tech">
                  {e.tech.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="edu-cert-section" data-reveal="fade-up">
          <div className="edu-row">
            <a href="https://drive.google.com/file/d/17QDD-WbACf4NaDlE_1ZsN0IZH5kxr_kj/view" target="_blank" rel="noopener noreferrer" className="edu-card-single">
              <div className="edu-icon"><i className="fas fa-graduation-cap" aria-hidden="true"></i></div>
              <div>
                <h4>B.Tech Computer Engineering <i className="fas fa-external-link-alt" aria-hidden="true" style={{ fontSize: '0.65rem', color: 'var(--a1)', opacity: 0.6 }}></i></h4>
                <p className="edu-school">PDEU, Gandhinagar</p>
                <span className="edu-meta">CGPA: 8.35 &middot; Sept 2022 – June 2026</span>
              </div>
            </a>
            <div className="edu-card-single">
              <div className="edu-icon"><i className="fas fa-laptop-code" aria-hidden="true"></i></div>
              <div>
                <h4>BS Data Science &amp; Applications</h4>
                <p className="edu-school">IIT Madras (Online)</p>
                <span className="edu-meta">CGPA: 7.07 (Diploma) &middot; Jan 2023 – Present</span>
              </div>
            </div>
          </div>
          <div className="cert-row">
            <h4 className="cert-heading"><i className="fas fa-certificate" aria-hidden="true"></i> Certifications</h4>
            <div className="cert-list">
              <a href="https://drive.google.com/file/d/1n5AEcn0ipVKhQjNyOwwQr5T3se4eOR3Y/view" target="_blank" rel="noopener noreferrer"><i className="fas fa-check-circle" aria-hidden="true"></i> Programming Diploma – IIT Madras</a>
              <a href="https://drive.google.com/file/d/1njTQXxonOXXYDEDSFBMbuc89_aAoXnZp/view" target="_blank" rel="noopener noreferrer"><i className="fas fa-check-circle" aria-hidden="true"></i> Deep Learning using PyTorch – IIT Madras</a>
              <a href="https://drive.google.com/file/d/1viQcqvMd-gaYkI3wakXCpzpbM9tlNzUY/view" target="_blank" rel="noopener noreferrer"><i className="fas fa-check-circle" aria-hidden="true"></i> Understanding GCP – IIT Madras</a>
              <a href="https://drive.google.com/file/d/1Le8yv-fhBKwF_dt0RglH6XdTwTgDCAJn/view" target="_blank" rel="noopener noreferrer"><i className="fas fa-check-circle" aria-hidden="true"></i> Dynamic Programming – IIT Madras</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
