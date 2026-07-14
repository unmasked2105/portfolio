import { useTheme } from '../hooks/useTheme';

interface Props { onNavClick: (id: string) => void; }

export function Navbar({ onNavClick }: Props) {
  const { toggleTheme } = useTheme();
  const links = ['Live Demo', 'About', 'Skills', 'Projects', 'Contact'];
  const ids = ['demo', 'about', 'skills', 'projects', 'contact'];

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
    <nav className="navbar" role="navigation">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => onNavClick('hero')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Deep<span className="logo-accent">_</span>Shah</span>
          <span className="logo-bracket"> /&gt;</span>
        </div>
        <div className="nav-right">
          <ul className="nav-links" role="menubar">
            {links.map((l, i) => (
              <li key={l} role="none">
                <button role="menuitem" className="nav-link" onClick={() => handleLink(ids[i])}>{l}</button>
              </li>
            ))}
          </ul>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className="fas fa-moon"></i><i className="fas fa-sun"></i>
          </button>
          <button className="hamburger" onClick={handleHamburger} aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
