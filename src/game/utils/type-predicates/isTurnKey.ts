import { TURN_KEYS } from 'src/game/constants/input/TURN_KEYS';
import type { TurnKey } from 'src/game/typings/keys/TurnKey';

export const isTurnKey = (t: any): t is TurnKey => TURN_KEYS.has(t);
