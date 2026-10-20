import './TransformStatement.css';

// Exemplos temporários: substituir pelas imagens e informações dos trabalhos reais.
const projects = [
  { title: 'Entre paisagens', category: 'Filme de marca', description: 'Uma narrativa visual que conecta uma marca à beleza de seus caminhos.', image: '/assets/images/portfolio-paisagem.svg' },
  { title: 'Encontros', category: 'Histórias e celebrações', description: 'Pequenos gestos e grandes momentos, contados com um olhar sensível.', image: '/assets/images/portfolio-encontros.svg' },
  { title: 'Em movimento', category: 'Campanha audiovisual', description: 'Ritmo, luz e movimento para dar vida a uma ideia.', image: '/assets/images/portfolio-movimento.svg' }
];

export default function TransformStatement() {
  return (
    <section className="portfolio" id="portfolio" data-section="portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <p className="portfolio-eyebrow">Portfólio</p>
        <h2 id="portfolio-title" className="portfolio-title">Se eu fosse mostrar o que eu tenho de melhor, seria assim:</h2>
        <p className="portfolio-note">Uma prévia ilustrativa. Em breve, meus filmes por aqui.</p>
        <div className="portfolio-grid">
          {projects.map(project => (
            <article className="portfolio-card" key={project.title} tabIndex={0} aria-label={`${project.title}. Exemplo de ${project.category.toLowerCase()}. ${project.description}`}>
              <img src={project.image} alt={`Ilustração de exemplo: ${project.title}`} width="960" height="720" loading="lazy" />
              <span className="portfolio-example">Exemplo</span>
              <span className="portfolio-play" aria-hidden="true">▷</span>
              <div className="portfolio-caption">
                <span className="portfolio-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}