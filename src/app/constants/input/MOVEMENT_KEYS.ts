import { keys } from "../../../utils/object/keys";
import type { MovementKey } from "../../typings/input/MovementKey";

type EarlyWarningSystem = {
  readonly [key in MovementKey]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  KeyS: true,
  KeyW: true,
} as const;

export const MOVEMENT_KEYS = new Set<MovementKey>(keys(warnMeIfIForgotAKey));
