import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A soft glow that follows the pointer across the page.
 * - Uses motion values, so moving the mouse never re-renders React.
 * - Off for touch screens and for people who prefer reduced motion.
 */
export function Spotlight() {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const x = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 20, mass: 0.4 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgb(125 211 252 / 0.09), transparent 70%)`;

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    setFinePointer(query.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!finePointer || reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [finePointer, reduceMotion, x, y]);

  if (!finePointer || reduceMotion) return null;
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
}
