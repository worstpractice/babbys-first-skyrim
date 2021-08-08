import { CAPTURE } from "./CAPTURE";
import { PASSIVE } from "./PASSIVE";

export const CAPTURE_PASSIVE: AddEventListenerOptions = {
  ...CAPTURE,
  ...PASSIVE,
} as const;
