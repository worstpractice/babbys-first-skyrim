import { MOVEMENT_KEYS } from "src/constants/input/MOVEMENT_KEYS";
import type { MovementKey } from "src/typings/input/MovementKey";

export const isMovementKey = (t: any): t is MovementKey => {
  return MOVEMENT_KEYS.has(t);
};
