import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export default function Header() {
  const shouldReduceMotion = useReducedMotion();
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    let animationFrame;
    const updateHeader = () => {
      const hero = document.getElementById('hero');
      setIsPastHero(hero ? hero.getBoundingClientRect().bottom <= 1 : window.scrollY > 24);
      animationFrame = undefined;
    };
    const handleScroll = () => {
      if (animationFrame != null) return;
      animationFrame = requestAnimationFrame(updateHeader);
    };
    updateHeader();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrame != null) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToContact = event => {
    event.preventDefault();
    window.history.pushState(null, '', '#contato');
    document.getElementById('contato')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <header className={`site-header${isPastHero ? ' is-scrolled' : ''}`} id="topo" aria-hidden={!isPastHero} inert={isPastHero ? undefined : ''}>
      <nav className="header-inner" aria-label="Navegação principal">
        <a href="#hero" className="logo" aria-label="João Vitor Molleri | Videomaker — página inicial">
          <span className="brand-name">João Vitor Molleri <span className="brand-role">| Videomaker</span></span>
        </a>
        <a href="#contato" className="header-contact-link" onClick={scrollToContact}>Fale conosco</a>
      </nav>
    </header>
  );
}