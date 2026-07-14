export default function About() {
  const tags = [
    { name: 'ETL', c: '#6366f1', x: '0px', y: '-60px' },
    { name: 'GCP', c: '#06b6d4', x: '80px', y: '-30px' },
    { name: 'PySpark', c: '#a855f7', x: '-70px', y: '-10px' },
    { name: 'BigQuery', c: '#f59e0b', x: '60px', y: '20px' },
    { name: 'Docker', c: '#22c55e', x: '-50px', y: '40px' },
    { name: 'MERN', c: '#ec4899', x: '0px', y: '60px' },
  ];

  return (
    <section id="about" className="section about" data-reveal="fade-up">
      <div className="container">
        <div className="section-header" data-reveal="fade-up">
          <span className="section-num">01</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <div className="about-text-col" data-reveal="fade-right">
            <p className="about-para">
              I'm an aspiring <strong>Data Engineer</strong> and <strong>Full-Stack Developer</strong>
              {' '}completing my B.Tech in Computer Engineering at PDEU while pursuing a BS in Data Science
              at IIT Madras. I build <strong>scalable ETL pipelines</strong> on GCP with
              {' '}<strong>PySpark, Databricks, and BigQuery</strong>.
            </p>
            <p className="about-para">
              Currently at <strong>Krish TechnoLabs</strong>, I design data pipelines using
              Medallion Architecture — transforming raw data into analytics-ready assets.
            </p>
            <div className="about-details">
              <div className="about-detail"><i className="fas fa-map-marker-alt"></i> Ahmedabad, India</div>
              <div className="about-detail"><i className="fas fa-envelope"></i> dcs210504@gmail.com</div>
              <div className="about-detail"><i className="fas fa-phone"></i> +91 95128 68880</div>
            </div>
            <div className="about-cta">
              <a href="mailto:dcs210504@gmail.com" className="btn btn-primary">
                <i className="fas fa-download"></i> Download Resume
              </a>
            </div>
          </div>
          <div className="about-visual-col" data-reveal="fade-left">
            <div className="about-tag-cloud">
              <div className="about-tag-center"><i className="fas fa-database"></i></div>
              {tags.map(t => (
                <span key={t.name} className="about-tag" style={{ '--tag-color': t.c, '--tx': t.x, '--ty': t.y } as React.CSSProperties}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
