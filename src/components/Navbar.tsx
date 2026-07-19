import { useTheme } from '../hooks/useTheme';

interface Props { onNavClick: (id: string) => void; }

export function Navbar({ onNavClick }: Props) {
  const { toggleTheme } = useTheme();
  const links = ['Live Demo', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];
  const ids = ['demo', 'about', 'skills', 'experience', 'projects', 'contact'];

  const handleHamburger = () => {
    document.querySelector('.nav-links')?.classList.toggle('open');
    document.querySelector('.hamburger')?.classList.toggle('active');
  };

  const handleLink = (id: string) => {
    document.querySelector('.nav-links')?.classList.remove('open');
    document.querySelector('.hamburger')?.classList.remove('active');
    onNavClick(id);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="nav-container">
        <button className="nav-logo" onClick={() => onNavClick('hero')} aria-label="Scroll to top">
          <span className="logo-bracket" aria-hidden="true">&lt;</span>
          <span className="logo-name">Deep<span className="logo-accent">_</span>Shah</span>
          <span className="logo-bracket" aria-hidden="true"> /&gt;</span>
        </button>
        <div className="nav-right">
          <ul className="nav-links">
            {links.map((l, i) => (
              <li key={l}>
                <button className="nav-link" onClick={() => handleLink(ids[i])}>{l}</button>
              </li>
            ))}
          </ul>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className="fas fa-moon" aria-hidden="true"></i><i className="fas fa-sun" aria-hidden="true"></i>
          </button>
          <button className="hamburger" onClick={handleHamburger} aria-label="Toggle menu" aria-expanded="false">
            <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
