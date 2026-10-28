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
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeProject, setActiveProject] = useState(0);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const activeProjectRef = useRef(0);

  useEffect(() => {
    let frame;
    const update = () => {
      frame = null;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const step = (track.offsetHeight - stage.offsetHeight) / (projects.length - 1);
      const next = Math.max(0, Math.min(projects.length - 1, Math.round(-track.getBoundingClientRect().top / Math.max(step, 1))));
      if (next !== activeProjectRef.current) {
        activeProjectRef.current = next;
        setActiveProject(next);
        setActiveVideo(null);
      }
    };
    const schedule = () => { if (frame == null) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, []);

  const navigateToProject = index => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const step = (track.offsetHeight - stage.offsetHeight) / (projects.length - 1);
    window.scrollTo({ top: window.scrollY + track.getBoundingClientRect().top + index * step, behavior: 'instant' });
  };
  const project = projects[activeProject];

  return (
    <section className="portfolio" id="portfolio" data-section="portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <p className="portfolio-eyebrow">Portfólio</p>
        <h2 id="portfolio-title" className="portfolio-title">Se eu fosse mostrar o que eu tenho de melhor, seria assim:</h2>
      </div>
      <div className="portfolio-scroll-track" ref={trackRef}>
        <div className="portfolio-stage" ref={stageRef}>
          <div className="portfolio-stage-content">
            <article className={`portfolio-project${activeProject % 2 ? ' is-reversed' : ''}`} key={project.videoId} aria-labelledby={`project-${project.videoId}`}>
              <div className="portfolio-video-frame">
                {activeVideo === project.videoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&playsinline=1&rel=0&hl=pt-BR`}
                    title={`Vídeo de ${project.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <button className="portfolio-video-cover" type="button" onClick={() => setActiveVideo(project.videoId)} aria-label={`Assistir ao vídeo de ${project.title}`}>
                    <img src={`/assets/images/portfolio-${project.videoId}.jpg`} alt="" width="480" height="360" loading="lazy" />
                    <span className="portfolio-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z" /></svg></span>
                  </button>
                )}
              </div>
              <div className="portfolio-project-copy">
                <h3 id={`project-${project.videoId}`}>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-project-actions">
                  <a href={`https://www.youtube.com/watch?v=${project.videoId}`} target="_blank" rel="noreferrer" aria-label={`Assistir ${project.title} no YouTube`}>Assistir no YouTube ↗</a>
                  {activeVideo === project.videoId && <button type="button" onClick={() => setActiveVideo(null)} aria-label={`Parar vídeo de ${project.title}`}>Parar vídeo</button>}
                </div>
              </div>
            </article>
          </div>
          <nav className="portfolio-project-nav" aria-label="Projetos do portfólio">
            {projects.map((item, index) => (
              <button key={item.videoId} type="button" onClick={() => navigateToProject(index)}
                className={index === activeProject ? 'is-active' : ''}
                aria-label={`Ver projeto ${index + 1}: ${item.title}`} aria-current={index === activeProject ? 'step' : undefined}>
                {String(index + 1).padStart(2, '0')}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}