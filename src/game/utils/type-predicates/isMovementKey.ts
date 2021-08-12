import { MOVEMENT_KEYS } from "src/game/constants/input/MOVEMENT_KEYS";
import type { MovementKey } from "src/game/typings/keys/MovementKey";

export const isMovementKey = (t: any): t is MovementKey => {
  return MOVEMENT_KEYS.has(t);
};
