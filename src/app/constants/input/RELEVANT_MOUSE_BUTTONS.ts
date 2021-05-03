import { keys } from "../../../utils/object/keys";
import type { RelevantMouseButton } from "../../typings/input/RelevantMouseButton";

type EarlyWarningSystem = {
  readonly [key in RelevantMouseButton]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  LMB: true,
  MMB: true,
  RMB: true,
} as const;

export const RELEVANT_MOUSE_BUTTONS = new Set<RelevantMouseButton>(keys(warnMeIfIForgotAKey));
