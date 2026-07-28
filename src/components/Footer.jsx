import { motion } from "framer-motion";

const navigation = [
  ["Início", "#inicio"],
  ["Portfólio", "#portfolio"],
  ["Sobre mim", "#sobre"],
  ["Depoimentos", "#depoimentos"],
  ["Contato", "#contato"],
];

const ease = [0.22, 1, 0.36, 1];

const footerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const footerItem = {
  hidden: {
    opacity: 0,
    y: 34,
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

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-accent" aria-hidden="true" />

      <motion.div
        className="section-inner footer-inner"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18, margin: "0px 0px -40px 0px" }}
      >
        <motion.div className="footer-brand" variants={footerItem}>
          <span className="footer-kicker">Fotografia pet</span>

          <span className="footer-name">
            João Molleri <em>Fotopet</em>
          </span>

          <p className="footer-description">
            Fotografia autoral e afetiva para preservar a conexão entre cada pet e sua família.
          </p>
        </motion.div>

        <motion.div className="footer-column" variants={footerItem}>
          <h3>Contato</h3>

          <div className="footer-links footer-contact">
            <a href="tel:+5547992462186">☎ 47 99246-2186</a>
            <a href="mailto:joaomollerifotopet@gmail.com">✉ joaomollerifotopet@gmail.com</a>
            <a
              href="https://www.instagram.com/joaomolleri_fotopet?igsh=MXI1NDdsbmg3cTRjbw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              ◎ @joaomolleri_fotopet
            </a>
          </div>
        </motion.div>

        <motion.div className="footer-column" variants={footerItem}>
          <h3>Navegação</h3>

          <nav className="footer-links footer-nav" aria-label="Links do rodapé">
            {navigation.map(([label, href]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </nav>
        </motion.div>

        <motion.div className="footer-column footer-action" variants={footerItem}>
          <h3>Comece por aqui</h3>

          <p>Entre em contato para conversar sobre o ensaio e a história do seu pet.</p>

          <a
            href="https://wa.me/5547992462186"
            className="footer-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chamar no WhatsApp <span aria-hidden="true">↗</span>
          </a>

          <a href="#inicio" className="back-to-top">
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="section-inner footer-bottom"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.55, delay: 0.28, ease }}
      >
        <p>© {new Date().getFullYear()} João Molleri Fotopet. Todos os direitos reservados.</p>
        <p>Fotografia feita com respeito ao tempo e à personalidade de cada pet.</p>
      </motion.div>
    </footer>
  );
}
