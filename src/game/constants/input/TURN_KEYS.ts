import { keys } from "src/utils/object/keys";
import type { TurnKey } from "src/typings/input/TurnKey";

type EarlyWarningSystem = {
  readonly [key in TurnKey]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  KeyA: true,
  KeyD: true,
} as const;

export const TURN_KEYS = new Set<TurnKey>(keys(warnMeIfIForgotAKey));
