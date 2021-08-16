import type { ModifierKey } from 'src/game/typings/keys/ModifierKey';

type EarlyWarningSystem = {
  readonly [key in ModifierKey]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  ShiftLeft: true,
} as const;

export const MODIFIER_KEYS = new Set<ModifierKey>(Object.keys(warnMeIfIForgotAKey));
