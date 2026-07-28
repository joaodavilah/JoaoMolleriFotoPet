import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "O João teve muita paciência e conseguiu registrar exatamente a personalidade da nossa gata. O resultado ficou natural e emocionante.",
    author: "Mariana e Luna",
  },
  {
    quote:
      "Foi uma experiência muito tranquila. Nosso cachorro ficou confortável durante todo o ensaio e as fotografias superaram nossas expectativas.",
    author: "Lucas e Theo",
  },
  {
    quote:
      "As imagens ficaram delicadas e cheias de vida. Agora temos uma lembrança especial de uma fase que não volta mais.",
    author: "Camila e Nina",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (step) => {
    setDirection(step);
    setIndex((current) => (current + step + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [index]);

  return (
    <section className="testimonials" id="depoimentos">
      <div className="section-inner">
        <motion.div
          className="testimonial-carousel"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Avaliações de clientes"
          tabIndex="0"
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.975,
            filter: "blur(9px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.22, margin: "0px 0px -70px 0px" }}
          transition={{
            duration: 0.9,
            ease,
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") navigate(-1);
            if (event.key === "ArrowRight") navigate(1);
          }}
        >
          <motion.header
            className="testimonial-carousel-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.65,
              delay: 0.2,
              ease,
            }}
          >
            <p className="section-eyebrow">Avaliações</p>
            <h2 className="testimonial-carousel-title">O que os clientes sentiram</h2>
          </motion.header>

          <motion.button
            className="carousel-button carousel-button--previous"
            type="button"
            aria-label="Ver avaliação anterior"
            onClick={() => navigate(-1)}
            whileTap={{ scale: 0.88 }}
          >
            <span aria-hidden="true">←</span>
          </motion.button>

          <div className="testimonial-viewport">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.article
                className="testimonial-slide is-active"
                key={index}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction * 68,
                  y: 10,
                  scale: 0.97,
                  filter: "blur(7px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: direction * -68,
                  y: -8,
                  scale: 0.97,
                  filter: "blur(7px)",
                }}
                transition={{
                  duration: 0.58,
                  ease,
                }}
                aria-label={`Avaliação ${index + 1} de ${testimonials.length}`}
              >
                <blockquote className="testimonial-quote">
                  “{testimonials[index].quote}”
                </blockquote>

                <motion.div
                  className="testimonial-stars"
                  aria-label="Avaliação de cinco estrelas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                >
                  <span aria-hidden="true">★★★★★</span>
                </motion.div>

                <motion.p
                  className="testimonial-author"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                >
                  {testimonials[index].author}
                </motion.p>
              </motion.article>
            </AnimatePresence>
          </div>

          <motion.button
            className="carousel-button carousel-button--next"
            type="button"
            aria-label="Ver próxima avaliação"
            onClick={() => navigate(1)}
            whileTap={{ scale: 0.88 }}
          >
            <span aria-hidden="true">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
