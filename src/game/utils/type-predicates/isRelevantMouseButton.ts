import { RELEVANT_MOUSE_BUTTONS } from "src/constants/input/RELEVANT_MOUSE_BUTTONS";
import type { RelevantMouseButton } from "src/typings/input/RelevantMouseButton";

export const isRelevantMouseButton = (t: any): t is RelevantMouseButton => {
  return RELEVANT_MOUSE_BUTTONS.has(t);
};
