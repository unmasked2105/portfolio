import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import PhoneDemo from './components/PhoneDemo';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperienceSection from './components/ExperienceSection';
import Contact from './components/Contact';
import './index.css';

function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to section from URL path on load
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '') || 'hero';
    const validSections = ['hero', 'demo', 'about', 'skills', 'projects', 'experience', 'contact'];
    const target = validSections.includes(path) ? path : 'hero';
    setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar onNavClick={scrollTo} />
      <Hero />
      <PhoneDemo />
      <About />
      <Skills />
      <Projects />
      <ExperienceSection />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
