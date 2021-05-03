import { startAttacking, stopAttacking } from "../app/cascade/animations/attacking";
import { startIdling, stopIdling } from "../app/cascade/animations/idling";
import type { StartStopDuo } from "../app/typings/StartStopDuo";
import type { ItemName } from "../typings/ItemName";

export const itemToAnimationDuo = new Map<ItemName, StartStopDuo>();

// Empty hands mean you idle on LMB
itemToAnimationDuo.set("", {
  start: startIdling,
  stop: stopIdling,
});

itemToAnimationDuo.set("sword", {
  start: startAttacking,
  stop: stopAttacking,
});
