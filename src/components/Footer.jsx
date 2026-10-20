import SplitText from './SplitText';

const footerSplit = {
  tag: 'span',
  splitType: 'words',
  delay: 18,
  duration: 0.5,
  threshold: 0.08,
  rootMargin: '-20px',
  from: { opacity: 0, y: 12 },
  to: { opacity: 1, y: 0 }
};

const navigation = [
  ['Início', '#topo'],
  ['Sobre', '#sobre'],
  ['Serviços', '#servicos'],
  ['Portfólio', '#portfolio'],
  ['Contato', '#contato']
];

export default function Footer() {
  const scrollToTop = event => {
    event.preventDefault();
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}`
    );
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-panel">
          <div className="footer-inner">
            <div className="footer-brand">
              <a
                href="#topo"
                className="footer-logo"
                aria-label="João Vitor Molleri — voltar ao início"
                onClick={scrollToTop}
              >
                <span>João Vitor Molleri | Videomaker</span>
              </a>
              <SplitText
                text="Audiovisual que comunica e encanta."
                tag="p"
                className="footer-tagline"
                reveal="editorial"
                splitType="words"
                delay={16}
                duration={0.5}
                threshold={0.08}
                rootMargin="-20px"
                textAlign="left"
                from={{ opacity: 0, y: 12 }}
                to={{ opacity: 1, y: 0 }}
              />
            </div>

            <nav className="footer-nav" aria-label="Links rápidos">
              <span className="footer-column-title">Navegação</span>
              {navigation.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="footer-link"
                  onClick={href === '#topo' ? scrollToTop : undefined}
                >
                  <SplitText
                    text={label}
                    className="footer-link-split"
                    textAlign="left"
                    {...footerSplit}
                  />
                </a>
              ))}
            </nav>

            <div className="footer-meta">
              <span className="footer-column-title">Contato</span>
              <a href="mailto:whalefilmes@gmail.com" className="footer-link">
                <SplitText
                  text="whalefilmes@gmail.com"
                  className="footer-link-split"
                  textAlign="left"
                  {...footerSplit}
                />
              </a>
              <a href="tel:+5547992311409" className="footer-link">
                <SplitText
                  text="(47) 99231-1409"
                  className="footer-link-split"
                  textAlign="left"
                  {...footerSplit}
                />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <SplitText
              text="© 2026 João Vitor Molleri. Todos os direitos reservados."
              tag="p"
              className="footer-copyright"
              reveal="editorial"
              splitType="words"
              delay={12}
              duration={0.45}
              threshold={0.05}
              rootMargin="-10px"
              textAlign="left"
              from={{ opacity: 0, y: 10 }}
              to={{ opacity: 1, y: 0 }}
            />
            <a
              href="#topo"
              className="footer-back-to-top"
              onClick={scrollToTop}
            >
              Voltar ao topo <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
