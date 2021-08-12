import type { RelevantKey } from "src/typings/input/RelevantKey";
import { ACTION_KEYS } from "./ACTION_KEYS";
import { MODIFIER_KEYS } from "./MODIFIER_KEYS";
import { MOVEMENT_KEYS } from "./MOVEMENT_KEYS";
import { TURN_KEYS } from "./TURN_KEYS";

export const RELEVANT_KEYS = new Set<RelevantKey>([...ACTION_KEYS, ...MODIFIER_KEYS, ...MOVEMENT_KEYS, ...TURN_KEYS]);
