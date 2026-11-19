import type { CSSProperties } from "react";

/** Staggers the CSS `.reveal` scroll animation for items that enter the viewport together. */
export const stagger = (index: number) => ({ "--reveal-i": index % 4 }) as CSSProperties;
