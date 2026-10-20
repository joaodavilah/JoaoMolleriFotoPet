export default function About() {
  return (
    <section className="about" id="sobre" data-section="about">
      <div className="container about-grid">
        <div className="about-head">
          <h2 className="section-title about-title">Sobre mim</h2>
          <figure className="about-portrait">
            <img
              src="/assets/images/sobre-exemplo.jpg"
              alt="Retrato ilustrativo de um homem, usado como foto de exemplo"
              width="900"
              height="1350"
              loading="lazy"
            />
            <figcaption>Foto de exemplo — será substituída pelo meu retrato.</figcaption>
          </figure>
        </div>
        <div className="about-body">
          <p className="about-lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p className="about-text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p className="about-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </section>
  );
}
