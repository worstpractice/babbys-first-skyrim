import { TURN_KEYS } from "../../constants/input/TURN_KEYS";
import type { TurnKey } from "../../typings/input/TurnKey";

export const isTurnKey = (t: any): t is TurnKey => {
  return TURN_KEYS.has(t);
};
