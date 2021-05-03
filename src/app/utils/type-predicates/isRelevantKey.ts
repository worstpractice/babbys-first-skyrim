import { RELEVANT_KEYS } from "../../constants/input/RELEVANT_KEYS";
import type { RelevantKey } from "../../typings/input/RelevantKey";

export const isRelevantKey = (t: any): t is RelevantKey => {
  return RELEVANT_KEYS.has(t);
};
