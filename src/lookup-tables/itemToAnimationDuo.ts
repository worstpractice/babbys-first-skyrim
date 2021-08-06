import { startAttacking, stopAttacking } from "../app/cascade/animations/attacking";
import { startIdling, stopIdling } from "../app/cascade/animations/idling";
import type { StartStopDuo } from "../app/typings/StartStopDuo";
import type { ItemName } from "../typings/ItemName";

export const itemToAnimationDuo: { readonly [key in ItemName]: StartStopDuo } = {
  /** Empty hands mean you idle on LMB. */
  "": {
    start: startIdling,
    stop: stopIdling,
  },
  sword: {
    start: startAttacking,
    stop: stopAttacking,
  },
} as const;
