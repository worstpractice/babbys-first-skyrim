import type { TurnKey } from "src/game/typings/keys/TurnKey";

type EarlyWarningSystem = {
  readonly [key in TurnKey]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  KeyA: true,
  KeyD: true,
} as const;

export const TURN_KEYS = new Set<TurnKey>(Object.keys(warnMeIfIForgotAKey));
