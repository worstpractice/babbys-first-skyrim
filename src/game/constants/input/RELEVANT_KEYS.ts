import { ACTION_KEYS } from "src/game/constants/input/ACTION_KEYS";
import { MODIFIER_KEYS } from "src/game/constants/input/MODIFIER_KEYS";
import { MOVEMENT_KEYS } from "src/game/constants/input/MOVEMENT_KEYS";
import { TURN_KEYS } from "src/game/constants/input/TURN_KEYS";
import type { RelevantKey } from "src/game/typings/keys/RelevantKey";

const allKeys = [
  //
  ...ACTION_KEYS,
  ...MODIFIER_KEYS,
  ...MOVEMENT_KEYS,
  ...TURN_KEYS,
] as const;

export const RELEVANT_KEYS = new Set<RelevantKey>(allKeys);
