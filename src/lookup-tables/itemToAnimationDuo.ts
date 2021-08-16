import { startAttacking, stopAttacking } from 'src/game/cascade/animations/attacking';
import { startIdling, stopIdling } from 'src/game/cascade/animations/idling';
import type { StartStopDuo } from 'src/game/typings/StartStopDuo';
import type { ItemName } from 'src/typings/ItemName';

export const itemToAnimationDuo: { readonly [key in ItemName]: StartStopDuo } = {
  /** Empty hands mean you idle on LMB. */
  '': {
    start: startIdling,
    stop: stopIdling,
  },
  sword: {
    start: startAttacking,
    stop: stopAttacking,
  },
} as const;
