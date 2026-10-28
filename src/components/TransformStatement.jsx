import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
  const reducedMotion = useReducedMotion();

  return (
    <section className="portfolio" id="portfolio" data-section="portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <p className="portfolio-eyebrow">Portfólio</p>
        <h2 id="portfolio-title" className="portfolio-title">Se eu fosse mostrar o que eu tenho de melhor, seria assim:</h2>
        <div className="portfolio-projects">
          {projects.map((project, index) => (
            <motion.article
              key={project.videoId}
              className={`portfolio-project${index % 2 ? ' is-reversed' : ''}`}
              aria-labelledby={`project-${project.videoId}`}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
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
                    <img src={`/assets/images/portfolio-${project.videoId}.jpg`} alt="" width="1280" height="720" loading="lazy" />
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}