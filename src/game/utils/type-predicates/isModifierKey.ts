import { MODIFIER_KEYS } from "src/constants/input/MODIFIER_KEYS";
import type { ModifierKey } from "src/typings/input/ModifierKey";

export const isModifierKey = (t: any): t is ModifierKey => {
  return MODIFIER_KEYS.has(t);
};
