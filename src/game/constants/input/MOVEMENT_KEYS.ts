import type { MovementKey } from 'src/game/typings/keys/MovementKey';

type EarlyWarningSystem = {
  readonly [key in MovementKey]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  KeyS: true,
  KeyW: true,
} as const;

export const MOVEMENT_KEYS = new Set<MovementKey>(Object.keys(warnMeIfIForgotAKey));
