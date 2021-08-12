import { CAPTURE } from "src/constants/event-listener-options/CAPTURE";
import { PASSIVE } from "src/constants/event-listener-options/PASSIVE";

export const CAPTURE_PASSIVE: AddEventListenerOptions = {
  ...CAPTURE,
  ...PASSIVE,
} as const;
