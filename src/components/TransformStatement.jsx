import { useEffect, useRef, useState } from 'react';
import './TransformStatement.css';

const projects = [
  { title: 'Plasvale', videoId: 'CbSL5j4cmkg', description: 'Imagens que conectam a marca ao seu público.' },
  { title: 'Leprime', videoId: 'OP3Ka3udcBw', description: 'Uma história contada com ritmo e identidade.' },
  { title: 'Incita Fashion', videoId: '1PfUrb1HzOI', description: 'Um olhar criativo para dar vida à marca.' },
  { title: 'Grupo Oceanic', videoId: 'VIk9pD13rDc', description: 'Propósito e identidade traduzidos em imagens.' },
  { title: 'Dynamis', videoId: 'tNm-9G6WmVY', description: 'Audiovisual para comunicar e inspirar.' }
];

export default function TransformStatement() {
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedProject]);

  const openVideo = project => {
    setSelectedProject(project);
    dialogRef.current.showModal();
  };

  return (
    <section className="portfolio" id="portfolio" data-section="portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <p className="portfolio-eyebrow">Portfólio</p>
        <h2 id="portfolio-title" className="portfolio-title">Se eu fosse mostrar o que eu tenho de melhor, seria assim:</h2>
        <div className="portfolio-grid">
          {projects.map(project => (
            <article className="portfolio-project" key={project.videoId}>
              <button className="portfolio-card" type="button" onClick={() => openVideo(project)} aria-label={`Assistir ao vídeo de ${project.title}`} aria-haspopup="dialog">
                <img src={`/assets/images/portfolio-${project.videoId}.jpg`} alt="" width="480" height="360" loading="lazy" />
                <span className="portfolio-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z" /></svg></span>
                <span className="portfolio-caption">
                  <span className="portfolio-category">Produção audiovisual</span>
                  <span className="portfolio-project-title">{project.title}</span>
                  <span className="portfolio-description">{project.description}</span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>
      <dialog ref={dialogRef} className="portfolio-modal" aria-labelledby="portfolio-video-title" onClose={() => setSelectedProject(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
        {selectedProject && (
          <div className="portfolio-modal-content">
            <div className="portfolio-modal-header">
              <h3 id="portfolio-video-title">{selectedProject.title}</h3>
              <button type="button" className="portfolio-modal-close" onClick={() => dialogRef.current.close()} aria-label="Fechar vídeo" autoFocus>×</button>
            </div>
            <div className="portfolio-video-frame">
              <iframe key={selectedProject.videoId} src={`https://www.youtube-nocookie.com/embed/${selectedProject.videoId}?autoplay=1&playsinline=1&rel=0&hl=pt-BR`} title={`Vídeo de ${selectedProject.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            </div>
            <a className="portfolio-youtube-link" href={`https://www.youtube.com/watch?v=${selectedProject.videoId}`} target="_blank" rel="noreferrer">Assistir no YouTube ↗</a>
          </div>
        )}
      </dialog>
    </section>
  );
}