import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import './HeroCarousel.css';

const slides = [
  { src: '/assets/images/hero-produto.jpeg', label: 'Produção de produto', position: '58% center', shade: '.76' },
  { src: '/assets/images/hero-criativo.jpeg', label: 'Produção criativa', position: '58% center', shade: '.58' },
  { src: '/assets/images/hero-retrato.jpeg', label: 'Produção de entrevista', position: '42% center', shade: '.74' }
];

const heroTitleLines = [['Audiovisual', 'que'], ['comunica', 'e', 'encanta.']];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectionVersion, setSelectionVersion] = useState(0);
  // Cada foto agenda a próxima troca; a navegação manual reinicia os 10 segundos.
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setActiveSlide(current => (current + 1) % slides.length);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [activeSlide, paused, selectionVersion]);
  const revealProps = delay => ({
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 8 : 22,
      filter: `blur(${shouldReduceMotion ? 1 : 4}px)`
    },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)'
    },
    viewport: { once: false, amount: 0.4 },
    transition: {
      duration: shouldReduceMotion ? 0.26 : 0.62,
      delay: shouldReduceMotion ? Math.min(delay, 0.08) : delay,
      ease: [0.22, 1, 0.36, 1]
    }
  });

  const blurWordProps = delay => ({
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? -8 : -50,
      filter: `blur(${shouldReduceMotion ? 1 : 10}px)`
    },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)'
    },
    viewport: { once: true, amount: 0.4 },
    transition: {
      duration: shouldReduceMotion ? 0.26 : 0.7,
      delay: shouldReduceMotion ? Math.min(delay, 0.08) : delay,
      ease: [0.22, 1, 0.36, 1]
    }
  });


  return (
    <section className="hero hero--carousel" id="hero" data-section="hero" data-slide={activeSlide} aria-label="Apresentação de trabalhos audiovisuais" aria-roledescription="carrossel">
      <div className="hero-background hero-carousel-images" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`hero-photo${index === activeSlide ? ' is-active' : ''}`}
            style={{ '--photo-position': slide.position, '--photo-shade': slide.shade }}
          >
            <img src={slide.src} alt="" width="1288" height="727" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
          </div>
        ))}
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title hero-blur-title">
            {heroTitleLines.map((line, lineIndex) => (
              <span className="hero-title-line" key={line.join('-')}>
                {line.map((word, wordIndex) => {
                  const previousWords = lineIndex === 0 ? 0 : heroTitleLines[0].length;
                  const animationIndex = previousWords + wordIndex;

                  return (
                    <motion.span
                      className="hero-title-word"
                      key={word}
                      {...blurWordProps(0.12 + animationIndex * 0.14)}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-subtitle reveal-text"
            data-animate="fade-up"
            {...revealProps(0.7)}
          >
            Parece que foi ontem. Mas já fazem mais de 12 anos que venho contando
            histórias no audiovisual. Vem conhecer um pouco mais de quem eu sou.
          </motion.p>
        </div>
      </div>
      <div className="hero-carousel-controls" role="group" aria-label="Controles das fotos">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`hero-carousel-dot${index === activeSlide ? ' is-active' : ''}`}
            aria-label={`Mostrar foto ${index + 1}: ${slide.label}`}
            aria-pressed={index === activeSlide}
            onClick={() => {
              setActiveSlide(index);
              setSelectionVersion(current => current + 1);
            }}
          ><span /></button>
        ))}
          <button className="hero-carousel-pause" type="button" onClick={() => setPaused(current => !current)} aria-label={paused ? 'Retomar troca automática das fotos' : 'Pausar troca automática das fotos'}>
            {paused ? 'Reproduzir' : 'Pausar'}
          </button>
      </div>
    </section>
  );
}
