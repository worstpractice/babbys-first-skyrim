import { RELEVANT_KEYS } from "src/constants/input/RELEVANT_KEYS";
import type { RelevantKey } from "src/typings/input/RelevantKey";

export const isRelevantKey = (t: any): t is RelevantKey => {
  return RELEVANT_KEYS.has(t);
};
