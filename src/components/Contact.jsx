import { useEffect, useRef, useState } from 'react';
import SplitText from './SplitText';

const phoneDisplay = '(47) 99231-1409';
const phoneHref = '+5547992311409';
const email = 'whalefilmes@gmail.com';

const IconPhone = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 2.8 9.1 7a1.7 1.7 0 0 1-.2 1.9l-1.4 1.6a15.2 15.2 0 0 0 6 6l1.6-1.4a1.7 1.7 0 0 1 1.9-.2l4.2 2.5a1.7 1.7 0 0 1 .8 1.8l-.4 2a2.4 2.4 0 0 1-2.4 1.9C9.2 23.1.9 14.8.9 4.8a2.4 2.4 0 0 1 1.9-2.4l2-.4a1.7 1.7 0 0 1 1.8.8Z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 5.5h18a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 21 18.5H3A1.5 1.5 0 0 1 1.5 17V7A1.5 1.5 0 0 1 3 5.5Zm0 1.8 9 6.1 9-6.1" />
  </svg>
);

const IconCopy = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="8" y="8" width="10" height="10" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState('');
  const [copyError, setCopyError] = useState(false);
  const feedbackTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
    },
    []
  );

  const writeToClipboard = async value => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = value;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const copiedSuccessfully = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (!copiedSuccessfully) {
      throw new Error('Não foi possível copiar o conteúdo.');
    }
  };

  const copyValue = async (value, key) => {
    try {
      await writeToClipboard(value);
      setCopyError(false);
      setCopied(key);
      if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = window.setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('');
      setCopyError(true);
      if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = window.setTimeout(() => setCopyError(false), 2600);
    }
  };

  return (
    <section className="contact" id="contato" data-section="contact">
      <div className="container">
        <h2 className="section-title contact-heading">Vem contar a sua história.</h2>
        <div className="contact-shell contact-shell--simple">
          <div className="contact-list">
            <article className="contact-card">
              <div className="contact-icon"><IconPhone /></div>
              <div className="contact-card-copy">
                <SplitText text="Telefone e WhatsApp" tag="span" className="contact-card-label" splitType="chars" delay={20} duration={0.5} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} />
                <a href={`tel:${phoneHref}`} className="contact-card-value">
                  <SplitText text={phoneDisplay} tag="span" className="contact-value-split" splitType="chars" delay={18} duration={0.52} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 12 }} to={{ opacity: 1, y: 0 }} />
                </a>
                <SplitText text="Clique no ícone para copiar" tag="span" className="contact-card-hint" splitType="words" delay={14} duration={0.45} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 8 }} to={{ opacity: 1, y: 0 }} />
              </div>
              <button className={`contact-copy-btn${copied === 'phone' ? ' is-copied' : ''}`} type="button" onClick={() => copyValue(phoneDisplay, 'phone')} aria-label="Copiar telefone">
                <IconCopy />
              </button>
            </article>

            <article className="contact-card">
              <div className="contact-icon"><IconMail /></div>
              <div className="contact-card-copy">
                <SplitText text="E-mail" tag="span" className="contact-card-label" splitType="chars" delay={20} duration={0.5} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} />
                <a href={`mailto:${email}`} className="contact-card-value">
                  <SplitText text={email} tag="span" className="contact-value-split" splitType="chars" delay={12} duration={0.5} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 12 }} to={{ opacity: 1, y: 0 }} />
                </a>
                <SplitText text="Clique no ícone para copiar" tag="span" className="contact-card-hint" splitType="words" delay={14} duration={0.45} threshold={0.1} rootMargin="-30px" textAlign="left" from={{ opacity: 0, y: 8 }} to={{ opacity: 1, y: 0 }} />
              </div>
              <button className={`contact-copy-btn${copied === 'email' ? ' is-copied' : ''}`} type="button" onClick={() => copyValue(email, 'email')} aria-label="Copiar e-mail">
                <IconCopy />
              </button>
            </article>
            <article className="contact-card">
              <div className="contact-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" /></svg></div>
              <div className="contact-card-copy">
                <span className="contact-card-label">Instagram</span>
                <a href="https://www.instagram.com/whalefilmes/" target="_blank" rel="noreferrer" className="contact-card-value">@whalefilmes</a>
              </div>
            </article>
            <a className="contact-whatsapp-link" href="https://wa.me/5547992311409" target="_blank" rel="noreferrer">Conversar pelo WhatsApp ↗</a>
          </div>
        </div>
      </div>

      <div
        className={`copy-toast${copied || copyError ? ' is-visible' : ''}${copyError ? ' is-error' : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="copy-toast__check" aria-hidden="true">
          {copyError ? '!' : '✓'}
        </span>
        {copyError
          ? 'Não foi possível copiar. Selecione o contato manualmente.'
          : copied === 'phone'
            ? 'Telefone copiado!'
            : 'E-mail copiado!'}
      </div>
    </section>
  );
}
