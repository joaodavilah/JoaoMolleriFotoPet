import { motion, useReducedMotion } from 'motion/react';
import SoftAurora from './SoftAurora';

const heroTitleLines = [['Audiovisual', 'que'], ['comunica', 'e', 'encanta.']];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
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

  const scrollToAbout = () => {
    document.getElementById('sobre')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <section className="hero" id="hero" data-section="hero">
      <div className="hero-background" aria-hidden="true">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.0}
          color1="#196a67"
          color2="#030930"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>

      <div className="hero-overlay" aria-hidden="true" />

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

          <motion.div
            className="hero-actions reveal-text"
            data-animate="fade-up"
            {...revealProps(0.92)}
          >
            <a
              href="#sobre"
              className="hero-scroll-cue"
              onClick={event => { event.preventDefault(); scrollToAbout(); }}
            >
              <span>Role para conhecer</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v17m-7-7 7 7 7-7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
