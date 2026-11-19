import { type RefObject, useEffect, useState } from "react";

/**
 * Becomes true the first time the element is at least `amount` visible, then stays true.
 * A tiny IntersectionObserver wrapper (no animation library needed).
 */
export function useInView(ref: RefObject<Element | null>, amount = 0.4) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: amount },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, amount, inView]);

  return inView;
}
