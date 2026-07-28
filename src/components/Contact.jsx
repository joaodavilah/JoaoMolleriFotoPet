import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.28.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.57 21 3 13.43 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.18 2.4.54 3.5a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" focusable="false">
      <path d="M26.8 15.3A10.8 10.8 0 0 1 10.9 25l-6.2 1.8 1.9-6A10.8 10.8 0 1 1 26.8 15.3Z" />
      <path d="M11 10c.25-.6.53-.61.94-.62h.7c.22 0 .56.08.7.52l.95 2.28c.1.25.05.5-.1.72l-.7.9c-.18.22-.14.43-.02.66.82 1.4 2 2.55 3.4 3.34.24.14.47.12.66-.1l.91-1.1c.2-.25.47-.3.74-.2l2.18 1.02c.28.13.47.22.53.36.07.13.07.78-.18 1.51-.25.73-1.48 1.4-2.05 1.48-.53.08-1.2.1-1.96-.13-.46-.15-1.04-.35-1.79-.67-3.12-1.36-5.16-4.5-5.31-4.72-.15-.22-1.26-1.68-1.26-3.2 0-1.52.8-2.28 1.07-2.6Z" />
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1];

const contactListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const contactCardVariants = {
  hidden: {
    opacity: 0,
    x: -42,
    y: 18,
    scale: 0.97,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.68,
      ease,
    },
  },
};

async function copyToClipboard(value) {
  // Primeira tentativa: API moderna do navegador.
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Continua para o fallback abaixo.
  }

  // Fallback para navegadores, redes locais e contextos sem HTTPS.
  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.setAttribute("aria-hidden", "true");
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "-9999px";
  textArea.style.width = "1px";
  textArea.style.height = "1px";
  textArea.style.opacity = "0";

  document.body.appendChild(textArea);

  try {
    textArea.focus({ preventScroll: true });
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);

    const copied = document.execCommand("copy");
    return copied;
  } catch {
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
}

export default function Contact() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("Informação copiada!");
  const [copiedField, setCopiedField] = useState("");
  const toastTimer = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current);
  }, []);

  const handleCopy = async (value, field) => {
    const copied = await copyToClipboard(value);

    setToastVisible(false);
    window.clearTimeout(toastTimer.current);

    if (copied) {
      setCopiedField(field);
      setToastMessage("Informação copiada!");
    } else {
      setCopiedField("");
      setToastMessage("Não foi possível copiar.");
    }

    window.requestAnimationFrame(() => setToastVisible(true));

    toastTimer.current = window.setTimeout(() => {
      setToastVisible(false);
      setCopiedField("");
    }, 2000);
  };

  return (
    <section className="contact" id="contato">
      <div className="section-inner">
        <motion.header
          className="section-heading contact-heading"
          initial={{
            opacity: 0,
            y: 38,
            filter: "blur(7px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.45, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.72, ease }}
        >
          <p className="section-eyebrow">Contato</p>
          <h2 className="section-title">Venha viver essa experiência</h2>
        </motion.header>

        <div className="contact-panel">
          <motion.div
            className="contact-options"
            variants={contactListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          >
            <motion.button
              type="button"
              className="contact-card contact-card--copy"
              variants={contactCardVariants}
              onClick={() => handleCopy("47 99246-2186", "phone")}
              whileHover={{
                y: -3,
                x: 4,
                transition: { duration: 0.24 },
              }}
              aria-label="Copiar telefone 47 99246-2186"
            >
              <span className="contact-icon" aria-hidden="true">
                <PhoneIcon />
              </span>

              <span className="contact-card-text">
                <span className="contact-label">Telefone</span>
                <strong className="contact-value">47 99246-2186</strong>
                <span className="contact-helper">
                  {copiedField === "phone" ? "Copiado!" : "Clique para copiar"}
                </span>
              </span>

              <span className="contact-action-icon" aria-hidden="true">
                <CopyIcon />
              </span>
            </motion.button>

            <motion.a
              href="https://www.instagram.com/joaomolleri_fotopet?igsh=MXI1NDdsbmg3cTRjbw=="
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
              variants={contactCardVariants}
              whileHover={{
                y: -3,
                x: 4,
                transition: { duration: 0.24 },
              }}
            >
              <span className="contact-icon" aria-hidden="true">
                <InstagramIcon />
              </span>

              <span className="contact-card-text">
                <span className="contact-label">Instagram</span>
                <strong className="contact-value">@joaomolleri_fotopet</strong>
                <span className="contact-helper">Abrir perfil</span>
              </span>

              <span className="contact-action-icon" aria-hidden="true">
                <ExternalIcon />
              </span>
            </motion.a>

            <motion.button
              type="button"
              className="contact-card contact-card--copy"
              variants={contactCardVariants}
              onClick={() => handleCopy("joaomollerifotopet@gmail.com", "email")}
              whileHover={{
                y: -3,
                x: 4,
                transition: { duration: 0.24 },
              }}
              aria-label="Copiar e-mail joaomollerifotopet@gmail.com"
            >
              <span className="contact-icon" aria-hidden="true">
                <MailIcon />
              </span>

              <span className="contact-card-text">
                <span className="contact-label">E-mail</span>
                <strong className="contact-value">joaomollerifotopet@gmail.com</strong>
                <span className="contact-helper">
                  {copiedField === "email" ? "Copiado!" : "Clique para copiar"}
                </span>
              </span>

              <span className="contact-action-icon" aria-hidden="true">
                <CopyIcon />
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            className="contact-whatsapp"
            initial={{
              opacity: 0,
              x: 58,
              scale: 0.95,
              filter: "blur(8px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            viewport={{ once: true, amount: 0.25, margin: "0px 0px -60px 0px" }}
            transition={{
              duration: 0.82,
              delay: 0.12,
              ease,
            }}
          >
            <motion.span
              className="contact-whatsapp-icon"
              aria-hidden="true"
              initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease,
              }}
            >
              <WhatsAppIcon />
            </motion.span>

            <div>
              <span className="contact-whatsapp-label">Atendimento direto</span>
              <h3>Vamos conversar sobre o seu pet?</h3>
            </div>

            <a
              href="https://wa.me/5547992462186"
              className="btn contact-whatsapp-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conversar pelo WhatsApp <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="copy-toast-shell" aria-hidden={!toastVisible}>
        <motion.div
          className="copy-toast"
          role="status"
          aria-live="polite"
          initial={false}
          animate={{
            opacity: toastVisible ? 1 : 0,
            y: toastVisible ? 0 : 18,
            scale: toastVisible ? 1 : 0.96,
            pointerEvents: toastVisible ? "auto" : "none",
          }}
          transition={{ duration: 0.28, ease }}
        >
          <span aria-hidden="true">✓</span>
          {toastMessage}
        </motion.div>
      </div>
    </section>
  );
}
