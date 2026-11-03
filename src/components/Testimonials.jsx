import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Suélen', company: 'Proalog', initial: 'S',
    paragraphs: [
      'Uma das coisas que mais valorizo no trabalho dele é que não se limita a produzir bons vídeos. Existe um cuidado genuíno em entender o que queremos comunicar e transformar nossas ideias em conteúdos que realmente representam a marca.',
      'Hoje, ele nos atende tanto na produção dos reels quanto na cobertura dos eventos da empresa, e em ambos os formatos consegue entregar um material muito profissional, com um olhar criativo e atenção aos detalhes.',
      'Também considero muito importante a forma como ele trabalha: é comprometido, organizado, cumpre os prazos e está sempre aberto a ouvir e construir junto. Isso torna todo o processo muito mais leve e facilita bastante o nosso dia a dia.',
      'O trabalho dele trouxe uma evolução muito perceptível para a nossa comunicação e ajudou a deixar a imagem da marca mais profissional e consistente. É um parceiro em quem confiamos e que faz diferença no resultado final das nossas entregas.'
    ]
  },
  {
    name: 'Bruna', company: 'ContraPasso Escola de Dança', initial: 'B',
    paragraphs: [
      'Eu gosto muito de produzir conteúdos com a Whale porque além da qualidade, você sempre está disposto a ouvir e acrescentar nas minhas ideias, mesmo quando são malucas.',
      'Todas as entregas são muito rápidas e eu sempre fico impressionada com a qualidade, não tem comparação o conteúdo que produzimos juntos e os que faço com o celular, por exemplo.',
      'Você também me deixa muito confortável, não fica tentando me empurrar o mais “fácil”. Você tá ali pra construir o que eu tô idealizando, mesmo que seja um “filme sobre o espaço”.',
      'Isso sem falar que nunca se incomoda de gravar várias vezes, inclusive é sempre tu que oferece pra fazer de novo, de ângulos diferentes… Então é visível que você tá ali preocupado com a entrega.',
      'Eu gosto demais do teu trabalho, por isso já estamos trabalhando juntos a 5 anos! E é um investimento que faz toda diferença porque profissionaliza ainda mais minha escola'
    ]
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const touchStart = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: 0.2 });
    observer.observe(sectionRef.current);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || !visible || !pageVisible || reducedMotion) return;
    // Tempo para ler os depoimentos completos; interações interrompem a troca.
    const timer = window.setTimeout(() => setActiveIndex(index => (index + 1) % testimonials.length), 60000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, hovered, focused, visible, pageVisible, reducedMotion]);

  const showTestimonial = index => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
    setPaused(true);
  };

  const handleTouchEnd = event => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) showTestimonial(activeIndex + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  };

  return (
    <section className="testimonials" id="depoimentos" ref={sectionRef} aria-labelledby="testimonials-title" aria-roledescription="carrossel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          showTestimonial(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }}>
      <div className="container testimonials-layout">
        <div className="testimonials-intro">
          <span className="testimonials-eyebrow">Depoimentos</span>
          <h2 id="testimonials-title">O que dizem sobre o meu trabalho.</h2>
          <p>Parcerias que vão além da entrega.</p>
          <div className="testimonials-controls" role="group" aria-label="Navegação dos depoimentos">
            <button type="button" onClick={() => showTestimonial(activeIndex - 1)} aria-label="Depoimento anterior" aria-controls="testimonials-slides"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6M8 12h13" /></svg></button>
            <button type="button" onClick={() => showTestimonial(activeIndex + 1)} aria-label="Próximo depoimento" aria-controls="testimonials-slides"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6M16 12H3" /></svg></button>
            {!reducedMotion && <button type="button" className="testimonials-autoplay" onClick={() => setPaused(current => !current)} aria-label={paused ? 'Retomar troca automática de depoimentos' : 'Pausar troca automática de depoimentos'} title={paused ? 'Retomar troca automática' : 'Pausar troca automática'}><svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="m9 6 9 6-9 6Z" /> : <path d="M8 6v12M16 6v12" />}</svg></button>}
          </div>
          <div className="testimonials-pagination">
            <span className="testimonials-count" aria-hidden="true">0{activeIndex + 1}<span> / 02</span></span>
            <div className="testimonials-dots" role="group" aria-label="Escolher depoimento">
              {testimonials.map((item, index) => <button key={item.name} type="button" onClick={() => showTestimonial(index)} aria-label={`Ver depoimento de ${item.name}`} aria-pressed={index === activeIndex}><span className={index === activeIndex ? 'is-active' : ''} /></button>)}
            </div>
          </div>
        </div>
        <div className="testimonials-slides" id="testimonials-slides" aria-live={paused ? 'polite' : 'off'}
          onTouchStart={event => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }} onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStart.current = null; }}>
          {testimonials.map((item, index) => (
            <figure key={item.name} className={`testimonials-slide${index === activeIndex ? ' is-active' : ''}`} role="group" aria-roledescription="slide" aria-label={`Depoimento ${index + 1} de ${testimonials.length}`} aria-hidden={index !== activeIndex} inert={index === activeIndex ? undefined : ''}>
              <svg className="testimonials-quote-mark" viewBox="0 0 48 40" aria-hidden="true"><path d="M3 21C3 9 10 3 21 2v6c-7 1-10 5-10 10h10v19H3Zm24 0C27 9 34 3 45 2v6c-7 1-10 5-10 10h10v19H27Z" /></svg>
              <blockquote>{item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</blockquote>
              <figcaption>
                <span className="testimonials-initial" aria-hidden="true">{item.initial}</span>
                <span className="testimonials-attribution"><strong>{item.name}</strong><span>{item.company}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}