import { MODIFIER_KEYS } from 'src/game/constants/input/MODIFIER_KEYS';
import type { ModifierKey } from 'src/game/typings/keys/ModifierKey';

export const isModifierKey = (t: any): t is ModifierKey => {
  return MODIFIER_KEYS.has(t);
};
