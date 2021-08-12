import { keys } from "src/utils/object/keys";
import type { ActionKey } from "src/typings/input/ActionKey";

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

export const ACTION_KEYS = new Set<ActionKey>(keys(warnMeIfIForgotAKey));
