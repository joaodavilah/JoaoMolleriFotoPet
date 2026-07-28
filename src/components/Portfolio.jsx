import { motion } from "framer-motion";

const photos = [
  {
    src: "/assets/images/ensaio-1.jpg",
    alt: "Cachorro preto usando bandana azul durante ensaio ao ar livre",
    layout: "tall",
    position: "center 48%",
  },
  {
    src: "/assets/images/ensaio-2.jpg",
    alt: "Cachorro pequeno preto e branco sorrindo durante ensaio externo",
    layout: "portrait",
    position: "center 40%",
  },
  {
    src: "/assets/images/ensaio-3.jpg",
    alt: "Cachorro preto sentado no sofá durante ensaio fotográfico em casa",
    layout: "portrait",
    position: "center 46%",
  },
  {
    src: "/assets/images/ensaio-4.jpg",
    alt: "Mulher e gato lado a lado em um retrato aproximado",
    layout: "wide",
    position: "center center",
  },
  {
    src: "/assets/images/ensaio-5.jpg",
    alt: "Cachorro pequeno branco e marrom posando entre os galhos de uma árvore",
    layout: "portrait",
    position: "center 46%",
  },
  {
    src: "/assets/images/ensaio-6.jpg",
    alt: "Cachorro pequeno branco e marrom em meio à natureza",
    layout: "wide",
    position: "center 46%",
  },
];

const ease = [0.22, 1, 0.36, 1];

const galleryVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    y: 76,
    x: index % 2 === 0 ? -24 : 24,
    scale: 0.93,
    rotate: index % 2 === 0 ? -1.2 : 1.2,
    filter: "blur(10px)",
    clipPath: "inset(14% 0 0 0 round 18px)",
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    clipPath: "inset(0% 0 0 0 round 18px)",
    transition: {
      duration: 0.82,
      ease,
    },
  },
};

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="section-inner">
        <motion.header
          className="section-heading"
          initial={{
            opacity: 0,
            y: 42,
            filter: "blur(7px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.4, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.78, ease }}
        >
          <p className="section-eyebrow">Portfólio</p>
          <h2 className="section-title">Ensaios que celebram cada personalidade</h2>
          <p className="section-description">
            Cada pet tem seu próprio jeito de olhar, de se mover e de demonstrar afeto.
            Os ensaios são conduzidos com calma para captar esses detalhes sem pressa,
            respeitando o ritmo de cada animal e de sua família.
          </p>
        </motion.header>

        <motion.div
          className="gallery"
          variants={galleryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
        >
          {photos.map((photo, index) => (
            <motion.figure
              className={`gallery-item gallery-item--${photo.layout}`}
              key={photo.src}
              custom={index}
              variants={cardVariants}
              whileHover={{
                y: -4,
                scale: 1.006,
                transition: { duration: 0.28, ease },
              }}
            >
              <motion.img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{ objectPosition: photo.position }}
                whileHover={{ scale: 1.045 }}
                transition={{ duration: 0.55, ease }}
              />
            </motion.figure>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
