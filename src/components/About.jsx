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
      <div className="container about-grid">
        <div className="about-head">
          <h2 className="section-title about-title">Sobre mim</h2>
          <figure className="about-portrait about-portrait--studio">
            <img
              src="/assets/images/joao-molleri-estudio.jpeg"
              alt="João Vitor Molleri sentado em um estúdio de produção audiovisual"
              width="1026"
              height="700"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="about-body">
          <p className="about-lead">Contar histórias através de imagens faz parte da minha essência.</p>
          {biography.map(paragraph => <p className="about-text" key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}