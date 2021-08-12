import type { RelevantMouseButton } from "src/game/typings/RelevantMouseButton";

type EarlyWarningSystem = {
  readonly [key in RelevantMouseButton]: true;
};

const warnMeIfIForgotAKey: EarlyWarningSystem = {
  LMB: true,
  MMB: true,
  RMB: true,
} as const;

export const RELEVANT_MOUSE_BUTTONS = new Set<RelevantMouseButton>(Object.keys(warnMeIfIForgotAKey));
