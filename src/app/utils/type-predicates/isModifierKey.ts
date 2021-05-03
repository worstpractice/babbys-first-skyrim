import { MODIFIER_KEYS } from "../../constants/input/MODIFIER_KEYS";
import type { ModifierKey } from "../../typings/input/ModifierKey";

export const isModifierKey = (t: any): t is ModifierKey => {
  return MODIFIER_KEYS.has(t);
};
