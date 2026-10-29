import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import './HeroVideo.css';

const heroTitleLines = ['Audiovisual que', 'comunica e encanta.'];

export default function Hero() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [playbackPreference, setPlaybackPreference] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wantsPlayback = playbackPreference ?? !reducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;
    let visible = hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < window.innerHeight;
    const syncPlayback = () => {
      if (!wantsPlayback || !visible || document.hidden) {
        video.pause();
        return;
      }
      // Alguns navegadores bloqueiam autoplay; o controle permite iniciar manualmente.
      video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncPlayback();
    });
    observer.observe(hero);
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [wantsPlayback]);

  return (
    <section className="hero hero--video" id="hero" data-section="hero" ref={heroRef} aria-label="Apresentação de trabalhos audiovisuais">
      <div className="hero-background hero-video-background" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-background-video"
          autoPlay={wantsPlayback}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/images/hero-broll-poster.jpg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/assets/videos/hero-broll.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title hero-blur-title">
            {heroTitleLines.map(line => <span className="hero-title-line" key={line}>{line}</span>)}
          </h1>
          <p className="hero-subtitle">
            Parece que foi ontem. Mas já fazem mais de 12 anos que venho contando
            histórias no audiovisual. Vem conhecer um pouco mais de quem eu sou.
          </p>
        </div>
      </div>
      <button className="hero-video-toggle" type="button" onClick={() => setPlaybackPreference(!isPlaying)} aria-label={isPlaying ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}>
        <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▷'}</span>
        {isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
      </button>
    </section>
  );
}