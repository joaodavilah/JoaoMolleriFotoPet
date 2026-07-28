import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["lembranças", "histórias", "afetos", "conexões", "momentos"];

const heroImages = [
  {
    src: "/assets/images/hero-gato.jpg",
    alt: "Gato branco e tigrado deitado tranquilamente perto de uma janela iluminada",
    position: "center 30%",
  },
  {
    src: "/assets/images/hero-gato-alternativa.jpg",
    alt: "Gato claro limpando a pata durante um momento espontâneo do ensaio",
    position: "center 44%",
  },
];

const wordTransition = {
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1],
};

const imageTransition = {
  duration: 1.5,
  ease: [0.22, 1, 0.36, 1],
};

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const wordInterval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 3000);

    return () => window.clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    const imageInterval = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % heroImages.length);
    }, 10000);

    return () => window.clearInterval(imageInterval);
  }, []);

  const currentImage = heroImages[imageIndex];

  return (
    <section className="hero" id="inicio">
      <AnimatePresence initial={false}>
        <motion.div
          className="hero-media"
          key={currentImage.src}
          role="img"
          aria-label={currentImage.alt}
          style={{
            backgroundImage: `url("${currentImage.src}")`,
            backgroundPosition: currentImage.position,
          }}
          initial={{
            opacity: 0,
            scale: 1.045,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={imageTransition}
        />
      </AnimatePresence>

      <div className="hero-overlay" aria-hidden="true" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="hero-title">
          Fotos que guardam

          <span className="hero-word-wrap" aria-live="polite">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                className="hero-word"
                key={words[wordIndex]}
                initial={{
                  opacity: 0,
                  y: 52,
                  scale: 0.94,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -46,
                  scale: 0.96,
                  filter: "blur(8px)",
                }}
                transition={wordTransition}
              >
                {words[wordIndex]}

                <motion.span
                  className="hero-word-underline"
                  aria-hidden="true"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.6 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="hero-description">
          Registros espontâneos, delicados e cheios de personalidade para transformar
          momentos ao lado do seu pet em memórias permanentes.
        </p>

        <div className="hero-actions">
          <a href="#contato" className="btn btn-primary hero-contact-button">
            Entre em contato
          </a>
        </div>
      </motion.div>

      <a href="#portfolio" className="scroll-hint" aria-label="Rolar para o portfólio">
        <span />
      </a>
    </section>
  );
}
