import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const textContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const textItem = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.68,
      ease,
    },
  },
};

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="section-inner about-grid">
        <motion.div
          className="about-content"
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -80px 0px" }}
        >
          <motion.header className="about-heading" variants={textItem}>
            <p className="section-eyebrow">Sobre mim</p>
            <h2 className="section-title">Mais do que um fotógrafo, sou um pai de pet.</h2>
          </motion.header>

          <div className="about-text">
            <motion.p variants={textItem}>
              Todos os dias, tenho a alegria de compartilhar a vida com meus quatro gatos.
              Mas foi a partida de um deles, o Jorel, que transformou ainda mais a forma
              como enxergo a relação que construímos com nossos animais.
            </motion.p>

            <motion.p variants={textItem}>
              Sou videomaker há 13 anos e já trabalhei com diversas marcas e nichos.
              Porém, eu sentia que faltava algo. A partida do Jorel despertou em mim
              um desejo ainda maior de estar perto deles, valorizar cada momento e,
              principalmente, preservar as memórias que construímos juntos.
            </motion.p>

            <motion.p variants={textItem}>
              A ingenuidade, o amor e o carinho que cães e gatos nos oferecem têm uma
              força única. Eles iluminam nossos dias, transformam nossa rotina e deixam
              marcas que permanecem para sempre.
            </motion.p>

            <motion.p
              className="about-highlight"
              variants={{
                hidden: {
                  opacity: 0,
                  x: -26,
                  scale: 0.97,
                  filter: "blur(5px)",
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.72,
                    ease,
                  },
                },
              }}
            >
              Foi daí que nasceu o João Molleri Foto Pet: um projeto que une minha
              experiência com a imagem e o meu amor pelos animais.
            </motion.p>

            <motion.p variants={textItem}>
              Meu propósito é registrar a conexão única que existe entre cada pet e sua
              família. Seja em ensaios internos ou externos, meu trabalho respeita a
              personalidade e a individualidade de cada cãozinho e gatinho, criando uma
              experiência leve, natural e verdadeira.
            </motion.p>

            <motion.p variants={textItem}>
              Mais do que fazer fotos bonitas, quero que o ensaio seja um momento para
              você viver o presente ao lado do seu pet. Sem pressa, sem poses forçadas.
              Apenas vocês, aproveitando cada segundo juntos, enquanto eu registro tudo
              para que essa lembrança permaneça viva por muitos e muitos anos.
            </motion.p>
          </div>
        </motion.div>

        <div className="about-photo-sticky">
          <motion.figure
            className="about-photo"
            initial={{
              opacity: 0,
              x: 70,
              scale: 0.94,
              clipPath: "inset(0 0 0 35% round 24px)",
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
              clipPath: "inset(0 0 0 0% round 24px)",
              filter: "blur(0px)",
            }}
            viewport={{ once: true, amount: 0.18, margin: "0px 0px -70px 0px" }}
            transition={{
              duration: 1,
              delay: 0.12,
              ease,
            }}
          >
            <img
              src="/assets/images/sobre-joao-molleri.png"
              alt="João Molleri com um gato preto e branco sobre o ombro e uma câmera fotográfica"
              loading="lazy"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
