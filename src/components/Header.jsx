import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const navigation = [
  ["Início", "#inicio"],
  ["Portfólio", "#portfolio"],
  ["Sobre mim", "#sobre"],
  ["Depoimentos", "#depoimentos"],
  ["Contato", "#contato"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.18,
  });

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) setActiveHref(`#${visibleSection.target.id}`);
      },
      {
        rootMargin: "-22% 0px -62% 0px",
        threshold: [0.05, 0.2, 0.45, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", closeWithEscape);
    document.body.classList.toggle("menu-is-open", menuOpen);

    return () => {
      document.removeEventListener("keydown", closeWithEscape);
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);

  return (
    <motion.header
      className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header-inner">
        <motion.a
          href="#inicio"
          className="brand"
          aria-label="João Molleri Fotopet - Início"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.22 }}
        >
          <span className="brand-name">
            João Molleri <em>Fotopet</em>
          </span>
        </motion.a>

        <nav
          className={`main-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Navegação principal"
        >
          <ul className="nav-list">
            {navigation.map(([label, href], index) => {
              const active = activeHref === href;

              return (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, delay: 0.12 + index * 0.06 }}
                >
                  <motion.a
                    href={href}
                    className={`nav-link${active ? " is-active" : ""}`}
                    aria-current={active ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span>{label}</span>

                    {active && (
                      <motion.span
                        className="nav-active-indicator"
                        layoutId="nav-active-indicator"
                        transition={{ type: "spring", stiffness: 460, damping: 34 }}
                      />
                    )}
                  </motion.a>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>
      </div>

      <motion.div
        className="scroll-progress"
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.button
            className="menu-backdrop"
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
