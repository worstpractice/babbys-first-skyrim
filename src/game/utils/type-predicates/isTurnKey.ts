import { TURN_KEYS } from "src/constants/input/TURN_KEYS";
import type { TurnKey } from "src/typings/input/TurnKey";

export const isTurnKey = (t: any): t is TurnKey => {
  return TURN_KEYS.has(t);
};
