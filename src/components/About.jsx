const biography = [
  'Desde que eu era criança, já usava uma câmera de família para registrar cada momento de alegria e felicidade que passavamos.',
  'E foi assim, que tudo evoluiu para o que sou hoje. Fazer vídeos tá no meu sangue.',
  'Me formei em Produção Audiovisual na Universidade do Vale do Itajaí e desde lá não parei. Comecei a trabalhar na área, enquanto cursava a faculdade em 2013. E fui cada vez mais me profissionalizando com cursos em São Paulo e Cuba, estudando desde Assistência de Câmera, correção de cores, qualidade de imagem à roteirização.',
  'E foi em 2018 que iniciei minha jornada solo.',
  'Aquele mesmo sentimento em recordar as imagens de família, decidi trazer para os meus clientes com o audiovisual.',
  'Registro com carinho cada um deles; seus propósitos, produtos e ideias.',
  'É através da Whale Filmes (minha marca) que dou a minha identidade nos vídeos.'
];

export default function About() {
  return (
    <section className="about" id="sobre" data-section="about">
      <div className="container about-grid about-grid--profile">
          <figure className="about-portrait about-portrait--studio">
            <img
              src="/assets/images/joao-molleri-retrato-estudio.jpg"
              alt="João Vitor Molleri segurando uma câmera em um estúdio audiovisual"
              width="1600"
              height="1067"
              loading="lazy"
            />
          </figure>
        <div className="about-body">
          <h2 className="section-title about-title">Quem sou eu?</h2>
          <p className="about-lead">Contar histórias através de imagens faz parte da minha essência.</p>
          {biography.map(paragraph => <p className="about-text" key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
