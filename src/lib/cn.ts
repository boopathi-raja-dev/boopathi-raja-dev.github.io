import { type ClassValue, clsx } from "clsx";

/** Join conditional class names. (Components avoid conflicting utilities, so no merge step is needed.) */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
