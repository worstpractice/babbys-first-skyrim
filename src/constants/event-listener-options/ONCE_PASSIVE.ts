import { ONCE } from 'src/constants/event-listener-options/ONCE';
import { PASSIVE } from 'src/constants/event-listener-options/PASSIVE';

export const ONCE_PASSIVE: AddEventListenerOptions = {
  ...ONCE,
  ...PASSIVE,
} as const;
