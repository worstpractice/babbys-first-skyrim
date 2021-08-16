import type { ActionKey } from 'src/game/typings/keys/ActionKey';

type EarlyWarningSystem = {
  readonly [key in ActionKey]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  KeyA: true,
  KeyD: true,
  KeyS: true,
  KeyW: true,
  Space: true,
} as const;

export const ACTION_KEYS = new Set<ActionKey>(Object.keys(warnMeIfIForgotAKey));
