import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "~/hooks/useReducedMotion";

/**
 * A soft glow that follows the pointer across the page.
 * - Eases toward the pointer with requestAnimationFrame and writes CSS variables
 *   directly, so moving the mouse never re-renders React.
 * - Off for touch screens and for people who prefer reduced motion.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    setFinePointer(query.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer || reduceMotion) return;

    const target = { x: -1000, y: -1000 };
    const pos = { ...target };
    let frame = 0;

    const tick = () => {
      // Move 20% of the remaining distance each frame: a smooth, spring-like follow.
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      el.style.setProperty("--x", `${pos.x}px`);
      el.style.setProperty("--y", `${pos.y}px`);
      const settled = Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [finePointer, reduceMotion]);

  if (!finePointer || reduceMotion) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(520px_circle_at_var(--x,-1000px)_var(--y,-1000px),rgb(125_211_252/0.09),transparent_70%)]"
    />
  );
}
