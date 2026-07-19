const CATS = [
  { icon: 'database', title: 'Data Engineering', tags: ['ETL / ELT', 'Data Warehousing', 'Data Modeling', 'Medallion Arch', 'PySpark', 'Dataform'] },
  { icon: 'cloud', title: 'Cloud & Big Data', tags: ['GCP', 'BigQuery', 'Databricks', 'Hadoop', 'Docker', 'IAM'] },
  { icon: 'code', title: 'Programming', tags: ['Python', 'SQL', 'Java', 'PHP', 'C++', 'C'] },
  { icon: 'globe', title: 'Web Development', tags: ['MERN Stack', 'Flask', 'HTML/CSS', 'REST APIs', 'Vue.js', 'Node.js'] },
  { icon: 'brain', title: 'AI / ML', tags: ['RAG', 'NLP', 'Vector Embeddings', 'PyTorch'] },
  { icon: 'tools', title: 'Tools & Core', tags: ['Docker', 'Git/GitHub', 'DSA', 'OOP', 'DBMS', 'REST APIs'] },
];

export default function Skills() {
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
                <i className={`fas fa-${c.icon}`} aria-hidden="true"></i>
                <h3>{c.title}</h3>
              </div>
              <div className="skill-card-tags">
                {c.tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
