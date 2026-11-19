import { useEffect, useState } from "react";

/**
 * True once the browser has finished its urgent work after page load.
 * Used to start non-essential animations without slowing the first paint.
 */
export function useIdle(timeout = 2000) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setIdle(true), 300);
    return () => clearTimeout(id);
  }, [timeout]);

  return idle;
}
