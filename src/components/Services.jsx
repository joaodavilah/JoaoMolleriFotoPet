import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import OptionWheel from './OptionWheel';
import SplitText from './SplitText';
import BorderGlow from './BorderGlow';

const services = [
  {
    title: 'Gravação de vídeos',
    description: 'Registro sua história com um olhar atento à luz, ao enquadramento e aos detalhes que fazem a diferença.'
  },
  {
    title: 'Roteirização',
    description: 'Transformo sua ideia em um roteiro claro e envolvente, com uma narrativa que conecta sua mensagem ao público.'
  },
  {
    title: 'Edição de vídeos',
    description: 'Dou ritmo e identidade às imagens, unindo cortes, som e cor para contar sua história.'
  }
];

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedService = services[selectedIndex];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="services" id="servicos" data-section="services">
      <div className="container">
        <header className="services-head">
          <SplitText
            text="Posso te ajudar com:"
            tag="h2"
            className="section-title services-title-split"
            reveal="editorial"
            splitType="words"
            delay={45}
            duration={0.7}
            threshold={0.12}
            rootMargin="-45px"
            textAlign="left"
            from={{ opacity: 0, y: 28 }}
            to={{ opacity: 1, y: 0 }}
          />
        </header>

        <div className="services-explorer">
          <div className="services-wheel-shell" aria-label="Selecione um serviço">
            <OptionWheel
              items={services.map(service => service.title)}
              defaultSelected={0}
              onChange={index => setSelectedIndex(index)}
              textColor="#e9eaf2"
              activeColor="#c1d42f"
              side="left"
              fontSize={2.15}
              spacing={1.48}
              curve={1}
              tilt={6}
              blur={1.35}
              fade={0.20}
              minOpacity={0.10}
              smoothing={200}
              inset={44}
              loop={false}
              draggable
              className="services-option-wheel"
            />
          </div>

          <BorderGlow
            className="service-detail"
            edgeSensitivity={30}
            glowColor="69 75 74"
            backgroundColor="#292d6b"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={0.9}
            coneSpread={25}
            animated={false}
            colors={['#c1d42f', '#c1d42f', '#e9eaf2']}
            fillOpacity={0.34}
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.title}
                className="service-detail-inner"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0, y: 4, filter: 'blur(1px)' }
                    : { opacity: 0, y: 14, filter: 'blur(6px)' }
                }
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0, y: -4, filter: 'blur(1px)' }
                    : { opacity: 0, y: -10, filter: 'blur(4px)' }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.18 : 0.32,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <SplitText
                  key={`split-${selectedService.title}`}
                  text={selectedService.description}
                  tag="p"
                  className="service-detail-description"
                  splitType="words"
                  delay={10}
                  duration={0.5}
                  threshold={0.05}
                  rootMargin="0px"
                  textAlign="left"
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </motion.div>
            </AnimatePresence>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
