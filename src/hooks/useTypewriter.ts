import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Options = {
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds before the first character. */
  startDelay?: number;
  /** Typing waits until this is true (e.g. once the element is in view). */
  enabled?: boolean;
};

/**
 * Reveals `text` one character at a time.
 * - Pauses a little longer at line breaks so it reads like a person typing.
 * - With reduced motion turned on, shows the full text immediately.
 */
export function useTypewriter(
  text: string,
  { speed = 28, startDelay = 400, enabled = true }: Options = {},
) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (reduceMotion) {
      setCount(text.length);
      return;
    }

    let typed = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      typed += 1;
      setCount(typed);
      if (typed < text.length) {
        const justTypedNewline = text[typed - 1] === "\n";
        timer = setTimeout(tick, justTypedNewline ? speed * 6 : speed);
      }
    };

    setCount(0);
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay, enabled, reduceMotion]);

  return { output: text.slice(0, count), done: count >= text.length };
}
