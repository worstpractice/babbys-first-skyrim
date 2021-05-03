import { keys } from "../../../utils/object/keys";
import type { TurnKey } from "../../typings/input/TurnKey";

type EarlyWarningSystem = {
  readonly [key in TurnKey]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  KeyA: true,
  KeyD: true,
} as const;

export const TURN_KEYS = new Set<TurnKey>(keys(warnMeIfIForgotAKey));
