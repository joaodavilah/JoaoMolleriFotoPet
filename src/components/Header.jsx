import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import SpecularButton from './SpecularButton';

export default function Header() {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let animationFrame;

    const updateHeader = () => {
      setIsScrolled(window.scrollY > 24);
      animationFrame = undefined;
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToContact = () => {
    window.history.pushState(null, '', '#contato');
    document.getElementById('contato')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <header
      className={`site-header${isScrolled ? ' is-scrolled' : ''}`}
      id="topo"
    >
      <div className="header-inner">
        <motion.a
          href="#topo"
          className="logo"
          aria-label="João Vitor Molleri | Videomaker — página inicial"
          initial={shouldReduceMotion ? false : { scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={
            shouldReduceMotion ? undefined : { scale: 1.02 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        >
          <span className="brand-name">João Vitor Molleri <span className="brand-role">| Videomaker</span></span>
        </motion.a>

        <motion.div
          className="header-cta-motion"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            delay: shouldReduceMotion ? 0 : 0.2
          }}
        >
          <SpecularButton
            size="sm"
            radius={24}
            tint="#e9eaf2"
            tintOpacity={0}
            blur={0}
            textColor="#e9eaf2"
            lineColor="#e9eaf2"
            baseColor="#292d6b"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            onClick={scrollToContact}
            className="header-specular-button"
          >
            Fale conosco
          </SpecularButton>
        </motion.div>
      </div>
    </header>
  );
}
