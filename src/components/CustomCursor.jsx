import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = [
  "a",
  "button",
  "[role='button']",
  ".gallery-item",
  ".contact-card",
  ".testimonial-carousel",
].join(",");

export default function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const smoothX = useSpring(pointerX, {
    stiffness: 760,
    damping: 45,
    mass: 0.08,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 760,
    damping: 45,
    mass: 0.08,
  });

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (hover: hover)");

    const updateAvailability = () => {
      setEnabled(media.matches);
      document.documentElement.classList.toggle(
        "has-custom-cursor",
        media.matches
      );
    };

    updateAvailability();
    media.addEventListener?.("change", updateAvailability);

    return () => {
      media.removeEventListener?.("change", updateAvailability);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const moveCursor = (event) => {
      // O ponto central da pata fica exatamente sobre o local real do clique.
      pointerX.set(event.clientX - 22);
      pointerY.set(event.clientY - 22);
      setVisible(true);
    };

    const updateInteractiveState = (event) => {
      setInteractive(Boolean(event.target.closest?.(interactiveSelector)));
    };

    const clearInteractiveState = (event) => {
      const nextTarget = event.relatedTarget;
      setInteractive(Boolean(nextTarget?.closest?.(interactiveSelector)));
    };

    const hideCursor = () => setVisible(false);
    const showCursor = () => setVisible(true);
    const pressCursor = () => setPressed(true);
    const releaseCursor = () => setPressed(false);

    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerover", updateInteractiveState, {
      passive: true,
    });
    document.addEventListener("pointerout", clearInteractiveState, {
      passive: true,
    });
    document.addEventListener("pointerdown", pressCursor, { passive: true });
    document.addEventListener("pointerup", releaseCursor, { passive: true });
    document.documentElement.addEventListener("mouseenter", showCursor);
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", updateInteractiveState);
      document.removeEventListener("pointerout", clearInteractiveState);
      document.removeEventListener("pointerdown", pressCursor);
      document.removeEventListener("pointerup", releaseCursor);
      document.documentElement.removeEventListener("mouseenter", showCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`custom-cursor${interactive ? " is-interactive" : ""}${
        pressed ? " is-pressed" : ""
      }`}
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: pressed ? 0.82 : interactive ? 1.18 : 1,
        rotate: interactive ? -8 : -14,
      }}
      transition={{
        opacity: { duration: 0.14 },
        scale: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <svg
        className="custom-cursor-paw"
        viewBox="0 0 64 64"
        focusable="false"
      >
        <ellipse className="paw-toe paw-toe--one" cx="17" cy="18" rx="7" ry="10" />
        <ellipse className="paw-toe paw-toe--two" cx="31" cy="12" rx="7" ry="10" />
        <ellipse className="paw-toe paw-toe--three" cx="46" cy="17" rx="7" ry="10" />
        <ellipse className="paw-toe paw-toe--four" cx="53" cy="31" rx="6" ry="9" />
        <path
          className="paw-pad"
          d="M31.8 24.6c-7.3 0-18.6 10.2-18.6 20.1 0 6.2 5 9.3 10.2 8.2 3.2-.7 5.6-2.5 8.4-2.5 2.7 0 5.1 1.8 8.3 2.5 5.2 1.1 10.2-2 10.2-8.2 0-9.9-11.2-20.1-18.5-20.1Z"
        />
      </svg>

      <span className="custom-cursor-glow" />
    </motion.div>
  );
}
