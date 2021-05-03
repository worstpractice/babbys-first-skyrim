import { RELEVANT_MOUSE_BUTTONS } from "../../constants/input/RELEVANT_MOUSE_BUTTONS";
import type { RelevantMouseButton } from "../../typings/input/RelevantMouseButton";

export const isRelevantMouseButton = (t: any): t is RelevantMouseButton => {
  return RELEVANT_MOUSE_BUTTONS.has(t);
};
