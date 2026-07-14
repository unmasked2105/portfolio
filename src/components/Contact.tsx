export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header" data-reveal="fade-up">
          <span className="section-num">05</span>
          <h2 className="section-title">Get in Touch</h2>
          <div className="section-line" />
        </div>
        <div className="contact-wrap" data-reveal="fade-up">
          <p className="contact-desc">
            Looking for a <strong>Data Engineer</strong> or <strong>Full-Stack Developer</strong>?
            Let's talk.
          </p>
          <div className="contact-grid">
            <a href="mailto:dcs210504@gmail.com" className="c-card">
              <i className="fas fa-envelope"></i>
              <span className="c-label">Email</span>
              <span className="c-value">dcs210504@gmail.com</span>
            </a>
            <a href="tel:+919512868880" className="c-card">
              <i className="fas fa-phone"></i>
              <span className="c-label">Phone</span>
              <span className="c-value">+91 95128 68880</span>
            </a>
            <a href="https://linkedin.com/in/deep-shah-183890256" target="_blank" rel="noopener" className="c-card">
              <i className="fab fa-linkedin-in"></i>
              <span className="c-label">LinkedIn</span>
              <span className="c-value">linkedin.com/in/deep-shah-183890256</span>
            </a>
            <a href="https://github.com/unmasked2105" target="_blank" rel="noopener" className="c-card">
              <i className="fab fa-github"></i>
              <span className="c-label">GitHub</span>
              <span className="c-value">github.com/unmasked2105</span>
            </a>
            <a href="https://leetcode.com/u/deeps2004/" target="_blank" rel="noopener" className="c-card c-card-full">
              <i className="fas fa-code"></i>
              <span className="c-label">LeetCode</span>
              <span className="c-value">leetcode.com/u/deeps2004</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
