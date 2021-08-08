import { ONCE } from "./ONCE";
import { PASSIVE } from "./PASSIVE";

export const ONCE_PASSIVE: AddEventListenerOptions = {
  ...ONCE,
  ...PASSIVE,
} as const;
