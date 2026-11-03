import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import OptionWheel from './OptionWheel';
import './ServicesStudio.css';

const services = [
  {
    title: 'Gravação de vídeos', stage: 'Um olhar para o que importa',
    description: 'Registro sua história com um olhar atento à luz, ao enquadramento e aos detalhes que fazem a diferença.',
    tags: ['Luz', 'Enquadramento', 'Direção'], image: '/assets/images/servico-gravacao-estudio.png',
    imageAlt: 'Gravação em estúdio com câmera, iluminação e uma participante ao fundo.', imagePosition: 'center 48%'
  },
  {
    title: 'Roteirização', stage: 'Toda história começa com uma ideia',
    description: 'Transformo sua ideia em um roteiro claro e envolvente, com uma narrativa que conecta sua mensagem ao público.',
    tags: ['Ideia', 'Narrativa', 'Conexão'], image: '/assets/images/servico-roteirizacao.jpg',
    imageAlt: 'Dois profissionais conferindo uma câmera juntos.', imagePosition: 'center 25%'
  },
  {
    title: 'Edição de vídeos', stage: 'É na montagem que tudo ganha vida',
    description: 'Dou ritmo e identidade às imagens, unindo cortes, som e cor para contar sua história.',
    tags: ['Ritmo', 'Som', 'Cor'], image: '/assets/images/servico-conferencia-oficina.png',
    imageAlt: 'Profissional conferindo uma câmera durante uma filmagem em oficina.', imagePosition: 'center'
  }
];

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const service = services[selectedIndex];

  return (
    <section className="services services--studio" id="servicos" data-section="services" aria-labelledby="services-title">
      <div className="container">
        <header className="services-head">
          <span className="studio-eyebrow">Da ideia ao último frame</span>
          <h2 className="section-title" id="services-title">Posso te ajudar com:</h2>
        </header>
        <div className="services-explorer studio-console">
          <div className="studio-selector" style={{ '--studio-selected-index': selectedIndex }}>
            <div className="services-wheel-shell">
              <OptionWheel items={services.map(item => item.title)} defaultSelected={0} onChange={setSelectedIndex}
                textColor="#e9eaf2" activeColor="#c1d42f" fontSize={2} spacing={1.6}
                curve={0.5} tilt={3} blur={0.5} fade={0.08} minOpacity={0.45}
                smoothing={200} inset={30} loop={false} draggable className="services-option-wheel" />
            </div>
          </div>
          <div className="studio-screen" aria-live="polite" aria-atomic="true">
            <div className="studio-screen-top"><span aria-hidden="true">0{selectedIndex + 1} / 03</span></div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={service.title} className="studio-feature"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0.1 : 0.25 }}>
                <div className="studio-viewfinder">
                  <img src={service.image} alt={service.imageAlt} width="512" height="384" loading="lazy" decoding="async" style={{ objectPosition: service.imagePosition }} />
                  <span className="studio-frame-corner" aria-hidden="true" /><span className="studio-frame-corner" aria-hidden="true" />
                  <span className="studio-frame-corner" aria-hidden="true" /><span className="studio-frame-corner" aria-hidden="true" />
                </div>
                <h3>{service.stage}</h3>
                <p>{service.description}</p>
              </motion.div>
            </AnimatePresence>
            <div className="studio-timeline" aria-hidden="true">{services.map((item, index) => <span className={index === selectedIndex ? 'is-active' : ''} key={item.title} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
