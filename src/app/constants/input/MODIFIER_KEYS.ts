import { keys } from "../../../utils/object/keys";
import type { ModifierKey } from "../../typings/input/ModifierKey";

type EarlyWarningSystem = {
  readonly [key in ModifierKey]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  ShiftLeft: true,
} as const;

export const MODIFIER_KEYS = new Set<ModifierKey>(keys(warnMeIfIForgotAKey));
