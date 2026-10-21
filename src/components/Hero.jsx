import { useEffect, useState } from 'react';
import './HeroCarousel.css';

const slides = [
  { src: '/assets/images/hero-produto.jpeg', label: 'Produção de produto', position: '58% center', shade: '.24' },
  { src: '/assets/images/hero-criativo.jpeg', label: 'Produção criativa', position: '58% center', shade: '.16' },
  { src: '/assets/images/hero-retrato.jpeg', label: 'Produção de entrevista', position: '42% center', shade: '.22' }
];

const heroTitleLines = [['Audiovisual', 'que'], ['comunica', 'e', 'encanta.']];

export default function Hero() {

  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectionVersion, setSelectionVersion] = useState(0);
  // Cada foto agenda a próxima troca; a navegação manual reinicia os 10 segundos.
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setActiveSlide(current => (current + 1) % slides.length);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [activeSlide, paused, selectionVersion]);

  return (
    <section className="hero hero--carousel" id="hero" data-section="hero" data-slide={activeSlide} aria-label="Apresentação de trabalhos audiovisuais" aria-roledescription="carrossel">
      <div className="hero-background hero-carousel-images" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`hero-photo${index === activeSlide ? ' is-active' : ''}`}
            style={{ '--photo-position': slide.position, '--photo-shade': slide.shade }}
          >
            <img src={slide.src} alt="" width="1288" height="727" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
          </div>
        ))}
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title hero-blur-title">
            {heroTitleLines.map(line => (
              <span className="hero-title-line" key={line.join('-')}>
                {line.join(' ')}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle">
            Parece que foi ontem. Mas já fazem mais de 12 anos que venho contando
            histórias no audiovisual. Vem conhecer um pouco mais de quem eu sou.
          </p>
        </div>
      </div>
      <div className="hero-carousel-controls" role="group" aria-label="Controles das fotos">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`hero-carousel-dot${index === activeSlide ? ' is-active' : ''}`}
            aria-label={`Mostrar foto ${index + 1}: ${slide.label}`}
            aria-pressed={index === activeSlide}
            onClick={() => {
              setActiveSlide(index);
              setSelectionVersion(current => current + 1);
            }}
          ><span /></button>
        ))}
          <button className="hero-carousel-pause" type="button" onClick={() => setPaused(current => !current)} aria-label={paused ? 'Retomar troca automática das fotos' : 'Pausar troca automática das fotos'}>
            {paused ? 'Reproduzir' : 'Pausar'}
          </button>
      </div>
    </section>
  );
}
